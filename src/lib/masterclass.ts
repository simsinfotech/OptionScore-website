/**
 * Editable configuration for the ₹9 Masterclass funnel.
 *
 * Pages that use this:
 *   /masterclass-reserve  → lead capture form
 *   /masterclass          → ₹9 sales page + Razorpay checkout
 *   /masterclass/thank-you → confirmation
 *
 * Fill in the [TO BE FILLED ...] values before going live. They render in
 * amber on the pages so they're easy to spot (same pattern as legal.ts).
 */

/** Registration fee, in rupees. Razorpay charges in paise (₹9 = 900 paise). */
export const MASTERCLASS_FEE_RUPEES = 9;
export const MASTERCLASS_FEE_PAISE = MASTERCLASS_FEE_RUPEES * 100;

export const MASTERCLASS = {
  /** Shown across the funnel. */
  title: "Live Online Masterclass",

  /** WhatsApp group invite link shown on the confirmation page + email. */
  whatsappGroupUrl: "https://chat.whatsapp.com/LLMDcHkqSnv6HahjOe73yw?s=em&p=a&mlu=2",

  /** Live session details. */
  session: {
    dateTime: "[TO BE FILLED — e.g. Sunday, 6 July 2026 · 7:00 PM IST]",
    duration: "90 Minutes",
    format: "Interactive Online Session",
    access: "Live Only",
    host: "[TO BE FILLED — host name, e.g. Sathya Narayanan]",
    /** Optional: the live join link (Zoom/Meet). Can also be sent later. */
    joinLink: "[TO BE FILLED — live join link, or leave for follow-up email]",
  },

  /** Default value written to the "Source" column when no UTM is present. */
  defaultSource: "masterclass-direct",
} as const;

/** True when a value is still an unfilled placeholder. */
export function isMcPlaceholder(value: string): boolean {
  return value.startsWith("[TO BE FILLED");
}
