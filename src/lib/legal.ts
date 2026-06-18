/**
 * Single source of truth for all legal / business details used across the
 * legal pages (Terms, Privacy, Refund, Shipping, Contact) and the footer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚠️  ACTION REQUIRED BEFORE GOING LIVE / APPLYING TO RAZORPAY
 * ─────────────────────────────────────────────────────────────────────────
 * Replace every value below that starts with "[TO BE FILLED" with your real,
 * verifiable business details. Razorpay's automated checks + manual review
 * read these pages, and the LEGAL ENTITY NAME here MUST match the name on your
 * PAN / GST / bank account exactly, otherwise the application is flagged for a
 * name mismatch.
 *
 * These are the only places you need to edit — every page reads from here.
 */

export const COMPANY = {
  /** Public brand name shown to users. */
  brandName: "OptionScore",

  /**
   * Registered legal entity name — MUST match PAN / GST / bank account.
   * You indicated this differs from "OptionScore" (e.g. it may be the company
   * that owns the brand). Put the exact registered name here.
   */
  legalEntityName: "SIMS Infotech",

  /** Full registered business address (required by Razorpay for verification). */
  registeredAddress: "[TO BE FILLED — full registered address incl. city, state, PIN code]",

  /** GST Identification Number, if registered. Leave the placeholder if none. */
  gstin: "[TO BE FILLED — GSTIN, or remove this line if not GST-registered]",

  /** Primary support contact. */
  supportEmail: "support@optionscore.app",

  /** Business / legal contact email. */
  legalEmail: "support@optionscore.app",

  /** Working phone number with country code (required by Razorpay). */
  phone: "+91 90363 17765",

  /** Customer support hours, shown on the Contact page. */
  businessHours: "Monday – Friday, 10:00 AM – 6:00 PM IST",

  /** Canonical website URL. */
  website: "https://optionscore.app",

  /**
   * Grievance / Nodal Officer — mandatory under the Consumer Protection
   * (E-Commerce) Rules and RBI guidelines. Name, designation, email and phone
   * must be published. This can be the founder.
   */
  grievanceOfficer: {
    name: "Shamique Hussain",
    designation: "Grievance Officer",
    email: "shamique@simsinfotech.com",
    phone: "+91 90363 17765",
  },
} as const;

/**
 * "Last updated" date stamped on every legal page. Update when you revise the
 * policies. Format: human-readable.
 */
export const LEGAL_LAST_UPDATED = "18 June 2026";

/** Helper: true when a value is still an unfilled placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.startsWith("[TO BE FILLED");
}
