import { NextResponse } from "next/server";
import crypto from "crypto";
import { postToSheet } from "@/lib/server/sheet";
import {
  sendConfirmationEmail,
  sendWorkshopConfirmationEmail,
} from "@/lib/server/email";
import { resolveProduct } from "@/lib/server/products";
import { resolveRazorpayCredentials } from "@/lib/server/razorpay";

export const runtime = "nodejs";

/**
 * Verify the return trip from a Razorpay *hosted Payment Link*.
 *
 * Unlike the Orders API (order_id|payment_id), a Payment Link callback is
 * signed over four fields, in this exact order:
 *   payment_link_id | payment_link_reference_id | payment_link_status | payment_id
 *
 * Razorpay appends razorpay_payment_id, razorpay_payment_link_id,
 * razorpay_payment_link_reference_id, razorpay_payment_link_status and
 * razorpay_signature to the callback URL after a successful payment. We
 * re-compute the HMAC and only report success when it matches AND the link
 * status is "paid" — this is what gates the confirmation page.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_payment_link_id,
      razorpay_payment_link_reference_id,
      razorpay_payment_link_status,
      razorpay_signature,
      lead,
      product,
    } = body;

    const productConfig = resolveProduct(product);

    const cred = resolveRazorpayCredentials();
    if (!cred.ok) {
      console.error("Razorpay config error:", cred.error);
      return NextResponse.json({ ok: false, error: cred.error }, { status: 500 });
    }
    const keySecret = cred.keySecret;

    if (
      !razorpay_payment_id ||
      !razorpay_payment_link_id ||
      !razorpay_payment_link_status ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing payment fields." },
        { status: 400 }
      );
    }

    // 1. Verify the signature — proves the callback genuinely came from Razorpay.
    const payload = [
      razorpay_payment_link_id,
      razorpay_payment_link_reference_id ?? "",
      razorpay_payment_link_status,
      razorpay_payment_id,
    ].join("|");

    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(payload)
      .digest("hex");

    const valid =
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(razorpay_signature)
      );

    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Payment verification failed." },
        { status: 400 }
      );
    }

    if (razorpay_payment_link_status !== "paid") {
      return NextResponse.json(
        { ok: false, error: "Payment not completed." },
        { status: 400 }
      );
    }

    // 2. Send the confirmation email (best-effort; don't fail the payment).
    //    Webinar has no dedicated template yet, so we skip email for it.
    let emailSent = false;
    if (lead?.email && productConfig.id !== "webinar") {
      try {
        if (productConfig.id === "workshop") {
          await sendWorkshopConfirmationEmail(lead);
        } else {
          await sendConfirmationEmail(lead);
        }
        emailSent = true;
      } catch (e) {
        console.error("Confirmation email failed", e);
      }
    }

    // 3. Mark the row Paid in the sheet (best-effort).
    try {
      await postToSheet(
        {
          action: "paid",
          name: lead?.name,
          mobile: lead?.mobile,
          email: lead?.email,
          experience: lead?.experience,
          source: lead?.source,
          paymentId: razorpay_payment_id,
          paymentLinkId: razorpay_payment_link_id,
          reference: razorpay_payment_link_reference_id ?? "",
          emailSent,
        },
        productConfig.sheetUrlEnv
      );
    } catch (e) {
      console.error("Sheet 'paid' update failed", e);
    }

    return NextResponse.json({ ok: true, emailSent });
  } catch (err) {
    console.error("/api/razorpay/verify-link error", err);
    return NextResponse.json(
      { ok: false, error: "Verification error. Please contact support." },
      { status: 500 }
    );
  }
}
