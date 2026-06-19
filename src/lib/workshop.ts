/**
 * Editable configuration for the ₹5,999 2-Day Live Intensive Workshop funnel.
 *
 * Pages that use this:
 *   /workshop            → long-form sales landing page + registration modal + pay
 *   /workshop/confirmed  → confirmation / thank-you
 *
 * Leads are saved to a SEPARATE Google Sheet from the masterclass (see
 * APPS_SCRIPT_URL_WORKSHOP in the env). Fill in the [TO BE FILLED ...] values
 * before going live — they render in amber on the pages so they're easy to spot.
 */

/** Ticket price, in rupees. Razorpay charges in paise (₹5,999 = 599900 paise). */
export const WORKSHOP_FEE_RUPEES = 5999;
export const WORKSHOP_FEE_PAISE = WORKSHOP_FEE_RUPEES * 100;

export const WORKSHOP = {
  /** Short badge shown above the hero headline. */
  badge: "2-Day Live Intensive Workshop",

  /** Shown across the funnel + emails. */
  title: "2-Day Live Intensive Workshop",

  /** Hero headline (two lines — the second renders in the gradient style). */
  headlineTop: "You Don't Need Another Strategy.",
  headlineBottom: "You Need A Better Decision-Making Framework.",

  /** Hero supporting paragraphs. */
  intro: [
    "Most traders spend years searching for the perfect setup.",
    "Very few learn how to filter bad decisions before they happen.",
    "Over two live sessions, you'll learn the complete framework behind disciplined trade evaluation, opportunity selection, and structured execution.",
  ],

  /** "This program is for you if" checklist. */
  forYou: [
    "You constantly second-guess your decisions",
    "You know multiple concepts but struggle to apply them consistently",
    "You want a repeatable process instead of random execution",
    "You are serious about improving your approach",
  ],

  /** Two-day curriculum. */
  curriculum: [
    {
      day: "Day 1",
      topics: [
        "Understanding Market Context",
        "Identifying High-Quality Opportunities",
        "Filtering Low-Probability Setups",
        "Building A Structured Evaluation Process",
      ],
    },
    {
      day: "Day 2",
      topics: [
        "Decision-Making Under Pressure",
        "Execution Frameworks",
        "Risk Awareness Principles",
        "Real Market Case Studies",
        "Live Q&A",
      ],
    },
  ],

  /** Program details grid. */
  details: {
    duration: "2 Days",
    format: "Live Online Workshop",
    access: "Interactive Sessions + Q&A",
    investment: `₹${WORKSHOP_FEE_RUPEES.toLocaleString("en-IN")}`,
  },

  /** Frequently asked questions shown near the bottom of the page. */
  faqs: [
    {
      q: "Is this live or pre-recorded?",
      a: "Both days are conducted live online with interactive Q&A. This is not a pre-recorded course — you participate in real time.",
    },
    {
      q: "Do I need any prior experience?",
      a: "No. The workshop is built around a decision-making framework, so it helps both newer participants and those who already know multiple concepts but struggle to apply them consistently.",
    },
    {
      q: "What do I need to attend?",
      a: "A laptop or phone with a stable internet connection. The joining details are emailed to you after registration and shared again before each session.",
    },
    {
      q: "Is this investment advice?",
      a: "No. OptionScore is a market analytics & education tool. The workshop is purely educational and is not investment advice. Trading involves risk.",
    },
    {
      q: "What is the refund policy?",
      a: "Please review our refund & cancellation policy for the workshop terms. Reach out to support if you have any questions before registering.",
    },
  ],

  /** WhatsApp group invite link shown on the confirmation page + email. */
  whatsappGroupUrl: "https://chat.whatsapp.com/CfuP5c2qahw2M8j8vB2X58?s=em&p=a&mlu=2",

  /** Live session details (filled before going live). */
  session: {
    dateTime: "[TO BE FILLED — e.g. Sat 12 & Sun 13 July 2026 · 7:00 PM IST]",
    duration: "2 Days",
    format: "Live Online Workshop",
    access: "Interactive Sessions + Q&A",
    host: "[TO BE FILLED — host name]",
    joinLink: "[TO BE FILLED — live join link, or leave for follow-up email]",
  },

  /** Default value written to the "Source" column when no UTM is present. */
  defaultSource: "workshop-direct",
} as const;

/** True when a value is still an unfilled placeholder. */
export function isWsPlaceholder(value: string): boolean {
  return value.startsWith("[TO BE FILLED");
}
