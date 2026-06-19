/** Server-only helpers to send funnel confirmation emails via Resend. */

import { MASTERCLASS, isMcPlaceholder } from "@/lib/masterclass";
import { WORKSHOP, isWsPlaceholder } from "@/lib/workshop";

export type Lead = {
  name?: string;
  email: string;
  mobile?: string;
  experience?: string;
};

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL || "OptionScore <onboarding@resend.dev>";

  if (!apiKey || apiKey.includes("xxxx")) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!res.ok) {
    throw new Error(`Resend failed: ${await res.text()}`);
  }
  return res.json();
}

export async function sendConfirmationEmail(lead: Lead) {
  return sendEmail(
    lead.email,
    "You're registered — OptionScore Live Masterclass",
    confirmationHtml(lead.name || "there")
  );
}

export async function sendWorkshopConfirmationEmail(lead: Lead) {
  return sendEmail(
    lead.email,
    `You're registered — OptionScore ${WORKSHOP.title}`,
    workshopConfirmationHtml(lead.name || "there")
  );
}

function row(label: string, value: string): string {
  const safe = isMcPlaceholder(value) ? "To be shared shortly" : value;
  return `<tr><td style="padding:4px 12px 4px 0;color:#9ca3af;">${label}</td><td style="padding:4px 0;color:#111;font-weight:600;">${safe}</td></tr>`;
}

function confirmationHtml(name: string): string {
  const s = MASTERCLASS.session;
  const whatsapp = isMcPlaceholder(MASTERCLASS.whatsappGroupUrl)
    ? ""
    : `<p style="margin:24px 0;">
        <a href="${MASTERCLASS.whatsappGroupUrl}"
           style="background:#0bb158;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:700;display:inline-block;">
          Join the WhatsApp Group
        </a>
      </p>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#111;">
    <h1 style="font-size:22px;">You're in, ${name}! ✅</h1>
    <p style="font-size:15px;line-height:1.6;color:#374151;">
      Your registration for the OptionScore <strong>${MASTERCLASS.title}</strong>
      is confirmed. Here are your session details:
    </p>
    <table style="font-size:14px;border-collapse:collapse;margin:16px 0;">
      ${row("Date &amp; Time", s.dateTime)}
      ${row("Duration", s.duration)}
      ${row("Format", s.format)}
      ${row("Access", s.access)}
      ${row("Host", s.host)}
      ${!isMcPlaceholder(s.joinLink) ? row("Join Link", s.joinLink) : ""}
    </table>
    ${whatsapp}
    <p style="font-size:13px;color:#6b7280;line-height:1.6;">
      Add this email to your contacts so you don't miss the reminders.
      See you live!
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="font-size:12px;color:#9ca3af;">
      OptionScore is a market analytics &amp; education tool. This session is
      educational and is not investment advice.
    </p>
  </div>`;
}

function wsRow(label: string, value: string): string {
  const safe = isWsPlaceholder(value) ? "To be shared shortly" : value;
  return `<tr><td style="padding:4px 12px 4px 0;color:#9ca3af;">${label}</td><td style="padding:4px 0;color:#111;font-weight:600;">${safe}</td></tr>`;
}

function workshopConfirmationHtml(name: string): string {
  const s = WORKSHOP.session;
  const whatsapp = isWsPlaceholder(WORKSHOP.whatsappGroupUrl)
    ? ""
    : `<p style="margin:24px 0;">
        <a href="${WORKSHOP.whatsappGroupUrl}"
           style="background:#0bb158;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:700;display:inline-block;">
          Join the WhatsApp Group
        </a>
      </p>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#111;">
    <h1 style="font-size:22px;">Your seat is confirmed, ${name}! ✅</h1>
    <p style="font-size:15px;line-height:1.6;color:#374151;">
      Thank you for registering for the OptionScore <strong>${WORKSHOP.title}</strong>.
      Here are your workshop details:
    </p>
    <table style="font-size:14px;border-collapse:collapse;margin:16px 0;">
      ${wsRow("Date &amp; Time", s.dateTime)}
      ${wsRow("Duration", s.duration)}
      ${wsRow("Format", s.format)}
      ${wsRow("Access", s.access)}
      ${wsRow("Host", s.host)}
      ${!isWsPlaceholder(s.joinLink) ? wsRow("Join Link", s.joinLink) : ""}
    </table>
    ${whatsapp}
    <p style="font-size:13px;color:#6b7280;line-height:1.6;">
      Add this email to your contacts so you don't miss the reminders.
      We'll send the joining link again before each session. See you live!
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="font-size:12px;color:#9ca3af;">
      OptionScore is a market analytics &amp; education tool. This workshop is
      educational and is not investment advice. Trading involves risk.
    </p>
  </div>`;
}
