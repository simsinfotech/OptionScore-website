import { NextResponse } from "next/server";
import crypto from "crypto";
import { postToSheet } from "@/lib/server/sheet";
import { sendConfirmationEmail } from "@/lib/server/email";

export const runtime = "nodejs";

/**
 * Razorpay webhook — fires when a payment link is paid (works in production,
 * not on localhost). Configure it in Dashboard → Settings → Webhooks with
 * events: payment_link.paid and payment.captured, and the secret set as
 * RAZORPAY_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook secret not configured." },
      { status: 500 }
    );
  }

  // Raw body is required for signature verification.
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto
    .createHmac("sha256", secret)
    .update(raw)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature." },
      { status: 400 }
    );
  }

  let body: RazorpayWebhook;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON." }, { status: 400 });
  }

  const isPaid =
    body.event === "payment_link.paid" || body.event === "payment.captured";

  if (!isPaid) {
    // Acknowledge other events so Razorpay doesn't retry.
    return NextResponse.json({ ok: true, ignored: body.event });
  }

  const payment = body.payload?.payment?.entity;
  if (!payment) {
    return NextResponse.json({ ok: true, ignored: "no payment entity" });
  }

  const email = payment.email || "";
  const mobile = payment.contact || "";
  const paymentId = payment.id || "";
  const amount = payment.amount ? payment.amount / 100 : "";

  // Send the confirmation email (best-effort).
  let emailSent = false;
  if (email) {
    try {
      await sendConfirmationEmail({ email });
      emailSent = true;
    } catch (e) {
      console.error("Webhook email failed", e);
    }
  }

  // Upgrade the lead's row to Paid (matched by phone in the Apps Script).
  try {
    await postToSheet({
      action: "paid",
      mobile,
      email,
      paymentId,
      amount,
      emailSent,
    });
  } catch (e) {
    console.error("Webhook sheet update failed", e);
  }

  return NextResponse.json({ ok: true });
}

type RazorpayWebhook = {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        amount?: number;
        email?: string;
        contact?: string;
      };
    };
  };
};
