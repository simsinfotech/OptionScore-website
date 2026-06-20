import { NextResponse } from "next/server";
import { postToSheet } from "@/lib/server/sheet";

export const runtime = "nodejs";

const ACADEMY_SHEET_ENV = "APPS_SCRIPT_URL_ACADEMY";

export async function POST(req: Request) {
  try {
    const { name, mobile, email, course, format, query, source } =
      await req.json();

    if (!name || !mobile || !email) {
      return NextResponse.json(
        { ok: false, error: "Name, mobile and email are required." },
        { status: 400 }
      );
    }

    await postToSheet(
      {
        action: "enquiry",
        name,
        mobile,
        email,
        course: course || "",
        format: format || "",
        query: query || "",
        source: source || "academy",
      },
      ACADEMY_SHEET_ENV
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/academy-enquiry error", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit your enquiry. Please try again." },
      { status: 500 }
    );
  }
}
