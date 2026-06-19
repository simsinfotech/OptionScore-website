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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      lead,
      product,
    } = body;

    const productConfig = resolveProduct(product);

    const cred = resolveRazorpayCredentials();
    if (!cred.ok) {
      console.error("Razorpay config error:", cred.error);
      return NextResponse.json(
        { ok: false, error: cred.error },
        { status: 500 }
      );
    }
    const keySecret = cred.keySecret;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { ok: false, error: "Missing payment fields." },
        { status: 400 }
      );
    }

    // 1. Verify the signature — proves the payment is genuine.
    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json(
        { ok: false, error: "Payment verification failed." },
        { status: 400 }
      );
    }

    // 2. Send the confirmation email (best-effort; don't fail the payment).
    let emailSent = false;
    if (lead?.email) {
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
          amount: productConfig.feeRupees,
          emailSent,
        },
        productConfig.sheetUrlEnv
      );
    } catch (e) {
      console.error("Sheet 'paid' update failed", e);
    }

    return NextResponse.json({ ok: true, emailSent });
  } catch (err) {
    console.error("/api/razorpay/verify error", err);
    return NextResponse.json(
      { ok: false, error: "Verification error. Please contact support." },
      { status: 500 }
    );
  }
}
