import { NextResponse } from "next/server";
import { postToSheet } from "@/lib/server/sheet";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, mobile, email, experience, source } = await req.json();

    if (!name || !mobile || !email) {
      return NextResponse.json(
        { ok: false, error: "Name, mobile and email are required." },
        { status: 400 }
      );
    }

    await postToSheet({
      action: "reserve",
      name,
      mobile,
      email,
      experience: experience || "",
      source: source || "",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/lead error", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your details. Please try again." },
      { status: 500 }
    );
  }
}
