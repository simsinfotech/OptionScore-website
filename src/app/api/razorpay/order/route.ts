import { NextResponse } from "next/server";
import { resolveProduct } from "@/lib/server/products";
import { resolveRazorpayCredentials } from "@/lib/server/razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const cred = resolveRazorpayCredentials();
  if (!cred.ok) {
    console.error("Razorpay config error:", cred.error);
    return NextResponse.json({ ok: false, error: cred.error }, { status: 500 });
  }
  const { keyId, keySecret } = cred;

  // Body is optional — masterclass posts none, so default to that product.
  let product: string | undefined;
  try {
    const body = await req.json();
    product = body?.product;
  } catch {
    /* no body — fine */
  }
  const { feePaise, receiptPrefix, notesPurpose } = resolveProduct(product);

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: feePaise,
        currency: "INR",
        receipt: `${receiptPrefix}_${Date.now()}`,
        notes: { purpose: notesPurpose },
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
