# ₹9 Masterclass Funnel — Setup

Flow: **Meta ad → `/master-class` (lead form) → `/master-class/offer` (₹9 page + Razorpay) → `/master-class/confirmed` (thank-you + WhatsApp)**

> Funnel protection: `/offer` and `/confirmed` redirect back to the form if the
> visitor hasn't gone through it (no lead in storage). For the **static payment
> link**, set the link's redirect/callback URL to
> `https://optionscore.app/master-class/confirmed` so payers land
> on the confirmation + WhatsApp screen.

Lead is saved to a Google Sheet as **Reserved** on the form, then upgraded to
**Paid** + a confirmation email is sent after the payment signature is verified.

---

## What you need to provide

### 1. Razorpay keys (TEST first)
Dashboard → Settings → API Keys → generate **Test** keys.
Put them in `.env.local` (local) and Vercel env (prod):
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxx
```
Verify the ₹9 flow with a test card, then repeat with **Live** keys.

### 2. Google Sheet + Apps Script
1. Create a **new** Google Sheet (any name).
2. Extensions → Apps Script. Delete the sample, paste `apps-script/Code.gs`.
3. Set `SHARED_TOKEN` in the script to a long random string.
4. Deploy → New deployment → **Web app**: *Execute as = Me*, *Who has access = Anyone*. Authorize when prompted.
5. Copy the `/exec` URL.
6. Put both in env:
```
APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
APPS_SCRIPT_TOKEN=<same long random string as SHARED_TOKEN>
```
The script auto-creates a `Leads` tab with the right columns.

### 3. Resend email
- Verify your sending domain (e.g. `optionscore.app`) in Resend → set
  `RESEND_FROM_EMAIL="OptionScore <noreply@optionscore.app>"`.
- For quick local testing without a verified domain, keep
  `onboarding@resend.dev` (delivers only to your own Resend account email).
- ⚠️ The key shared in chat should be **rotated** in Resend once tested.
```
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=OptionScore <noreply@optionscore.app>
```

### 4. Masterclass content — `src/lib/masterclass.ts`
Fill the `[TO BE FILLED]` values (they render amber on the pages until set):
- `whatsappGroupUrl` — WhatsApp group invite link
- `session.dateTime`, `session.host`, optional `session.joinLink`

---

## Files
- Pages: `src/app/master-class` (form), `.../offer` (₹9), `.../confirmed` (thank-you)
- API: `src/app/api/lead`, `src/app/api/razorpay/order`, `src/app/api/razorpay/verify`
- Server helpers: `src/lib/server/sheet.ts`, `src/lib/server/email.ts`
- Client/config: `src/lib/funnel-client.ts`, `src/lib/masterclass.ts`
- Sheet script: `apps-script/Code.gs`

## Test checklist
1. `npm run dev`, open `/master-class`, submit → row appears in Sheet as **Reserved**.
2. On `/master-class/offer`, click Complete Registration → pay with a Razorpay **test card**.
3. Confirm: lands on `/confirmed` with the WhatsApp button; row flips to **Paid** with payment ID, `Email Sent = Yes`, and the email arrives (Paid+email require the deployed webhook for the static link, or embedded checkout locally).
4. Swap test keys → live keys and re-test with a real ₹9.
