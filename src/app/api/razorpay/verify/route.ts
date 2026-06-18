import { NextResponse } from "next/server";
import crypto from "crypto";
import { postToSheet } from "@/lib/server/sheet";
import { sendConfirmationEmail } from "@/lib/server/email";
import { MASTERCLASS_FEE_RUPEES } from "@/lib/masterclass";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      lead,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { ok: false, error: "Razorpay is not configured." },
        { status: 500 }
      );
    }

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
        await sendConfirmationEmail(lead);
        emailSent = true;
      } catch (e) {
        console.error("Confirmation email failed", e);
      }
    }

    // 3. Mark the row Paid in the sheet (best-effort).
    try {
      await postToSheet({
        action: "paid",
        name: lead?.name,
        mobile: lead?.mobile,
        email: lead?.email,
        experience: lead?.experience,
        source: lead?.source,
        paymentId: razorpay_payment_id,
        amount: MASTERCLASS_FEE_RUPEES,
        emailSent,
      });
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
