import { NextResponse } from "next/server";
import { MASTERCLASS_FEE_PAISE } from "@/lib/masterclass";

export const runtime = "nodejs";

export async function POST() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes("xxxx")) {
    return NextResponse.json(
      { ok: false, error: "Razorpay is not configured yet." },
      { status: 500 }
    );
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: MASTERCLASS_FEE_PAISE,
        currency: "INR",
        receipt: `mc_${Date.now()}`,
        notes: { purpose: "masterclass-registration" },
      }),
    });

    const order = await res.json();

    if (!res.ok) {
      console.error("Razorpay order error", order);
      return NextResponse.json(
        { ok: false, error: order?.error?.description || "Order creation failed." },
        { status: 502 }
      );
    }

    // keyId (public) is returned so the client can open Checkout.
    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err) {
    console.error("/api/razorpay/order error", err);
    return NextResponse.json(
      { ok: false, error: "Could not start payment. Please try again." },
      { status: 500 }
    );
  }
}
