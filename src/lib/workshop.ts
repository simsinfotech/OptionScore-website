/**
 * Editable configuration for the 2-Day Live Intensive Workshop funnel.
 *
 * Pages that use this:
 *   /workshop            -> registration form (step 1)
 *   /workshop/offer      -> long-form sales landing page + payment (step 2)
 *   /workshop/confirmed  -> confirmation / thank-you
 *
 * Leads are saved to a SEPARATE Google Sheet from the masterclass (see
 * APPS_SCRIPT_URL_WORKSHOP in the env). Fill in the [PLACEHOLDER] values
 * before going live — they render in amber on the pages so they're easy to spot.
 */

/** Ticket price, in rupees. Razorpay charges in paise (₹5,999 = 599900 paise). */
export const WORKSHOP_FEE_RUPEES = 5999;
export const WORKSHOP_FEE_PAISE = WORKSHOP_FEE_RUPEES * 100;

export const WORKSHOP = {
  /* ─── Branding ─── */
  badge: "2-Day Live Intensive Workshop",
  title: "2-Day Live Intensive Workshop",

  /* ─── Announcement bar ─── */
  announcement: {
    date: "[PLACEHOLDER — e.g. Sat 12 & Sun 13 July]",
    seats: "[PLACEHOLDER — e.g. 60]",
  },

  /* ─── Hero ─── */
  hero: {
    eyebrow: "OptionScore 2-Day Live Intensive Workshop",
    headline: [
      "Stop Guessing.",
      "Start Scoring.",
      "Trade With Institutional Clarity.",
    ],
    subHeadline:
      "The only workshop that gives you a complete, repeatable, data-driven framework to evaluate any option trade in under 60 seconds — before you risk a single rupee.",
    vslUrl: "[PLACEHOLDER — YouTube/Vimeo embed URL]",
  },

  heroStats: [
    { value: "5,000+", label: "Traders Trained" },
    { value: "4.8/5", label: "Average Rating" },
    { value: "200+", label: "Live Chart Reviews" },
    { value: "60", label: "Max Seats" },
  ] as const,

  /* ─── Experience Cards ─── */
  experienceCards: [
    {
      icon: "📊",
      tag: "Day 1",
      title: "The Framework",
      body: "Build your complete trade-evaluation system from scratch — learn to score setups, filter noise, and identify only the highest-probability opportunities.",
      items: [
        "OptionScore methodology",
        "Setup scoring system",
        "Noise filtering framework",
        "Risk-first evaluation",
      ],
      duration: "3+ hours live",
    },
    {
      icon: "📈",
      tag: "Day 2",
      title: "Live Trading Application",
      body: "Watch the framework applied in real-time on live charts. See exactly how institutional-grade decisions are made under pressure.",
      items: [
        "Live market application",
        "Real-time scoring",
        "Entry/exit execution",
        "Position sizing in action",
      ],
      duration: "3+ hours live",
    },
    {
      icon: "🔍",
      tag: "Bonus",
      title: "Chart Review Sessions",
      body: "Submit your own charts and trades for detailed review. Get personalized feedback on your scoring and decision-making process.",
      items: [
        "Personal chart review",
        "Trade feedback",
        "Scoring improvement tips",
        "Q&A with instructor",
      ],
      duration: "Included",
    },
  ] as const,

  /* ─── Schedule ─── */
  schedule: {
    day1: {
      label: "Day 1 — The Framework",
      sessions: [
        {
          time: "7:00 PM",
          title: "Welcome & Market Context",
          description:
            "Setting the stage: why most traders fail and what separates consistent performers.",
          tag: "Foundation",
        },
        {
          time: "7:20 PM",
          title: "The OptionScore Methodology",
          description:
            "Core philosophy: scoring every setup before entry. The 5-factor evaluation system.",
          tag: "Core",
        },
        {
          time: "7:50 PM",
          title: "Setup Identification",
          description:
            "How to scan 50+ setups and narrow down to 3-5 high-score opportunities in minutes.",
          tag: "Practical",
        },
        {
          time: "8:15 PM",
          title: "Noise Filtering Framework",
          description:
            "Eliminate low-probability trades before they drain your capital. Red flags and disqualifiers.",
          tag: "Risk",
        },
        {
          time: "8:40 PM",
          title: "Risk-First Position Sizing",
          description:
            "Never risk more than you should. Dynamic position sizing based on setup score.",
          tag: "Risk",
        },
        {
          time: "9:05 PM",
          title: "Building Your Scoring Dashboard",
          description:
            "Hands-on: set up your personal trade-scoring dashboard using the OptionScore tools.",
          tag: "Hands-on",
        },
        {
          time: "9:30 PM",
          title: "Day 1 Q&A",
          description:
            "Open floor for questions, clarifications, and personalized guidance.",
          tag: "Interactive",
        },
      ],
    },
    day2: {
      label: "Day 2 — Live Application",
      sessions: [
        {
          time: "7:00 PM",
          title: "Day 1 Recap & Pre-Market Prep",
          description:
            "Quick review of the framework and how to prepare before the market opens.",
          tag: "Review",
        },
        {
          time: "7:20 PM",
          title: "Live Market Scanning",
          description:
            "Watch the instructor scan and score live setups in real-time. See the framework in action.",
          tag: "Live",
        },
        {
          time: "7:50 PM",
          title: "Trade Execution Walkthrough",
          description:
            "Step-by-step execution: from high-score setup identification to entry, stop, and target.",
          tag: "Live",
        },
        {
          time: "8:15 PM",
          title: "Managing Open Positions",
          description:
            "How to manage trades once live — trailing stops, partial exits, and re-scoring.",
          tag: "Practical",
        },
        {
          time: "8:40 PM",
          title: "Chart Review — Your Trades",
          description:
            "Submit your own charts. Get real-time scoring and feedback on your decision-making.",
          tag: "Interactive",
        },
        {
          time: "9:05 PM",
          title: "Building Your Trading Routine",
          description:
            "How to integrate the OptionScore framework into your daily routine for consistency.",
          tag: "Practical",
        },
        {
          time: "9:30 PM",
          title: "Final Q&A & Next Steps",
          description:
            "Closing session: ongoing support, community access, and your action plan.",
          tag: "Interactive",
        },
      ],
    },
  },

  /* ─── Value Stack ─── */
  valueStack: [
    { label: "2-Day Live Intensive Workshop", value: 14999 },
    { label: "OptionScore Framework Workbook", value: 4999 },
    { label: "Trade Scoring Dashboard Template", value: 5999 },
    { label: "Live Chart Review Sessions", value: 7999 },
    { label: "Private Community Access (3 months)", value: 4999 },
    { label: "Recorded Session Replays (30 days)", value: 5999 },
    { label: "Pre-Market Prep Checklist", value: 2999 },
    { label: "Post-Workshop Support (WhatsApp)", value: 3499 },
  ] as const,

  /* ─── Problem Section ─── */
  problem: {
    headline: "Why 90% of Retail Traders Lose Money",
    body: "It's not because the market is rigged. It's because retail traders make decisions based on tips, emotions, and incomplete information — while institutions use systematic frameworks to evaluate every single trade.",
    contrastTable: [
      {
        retail: "Trade based on tips & social media",
        institutional: "Score every setup with a framework",
      },
      {
        retail: "Enter on FOMO, exit on fear",
        institutional: "Pre-defined entry/exit rules",
      },
      {
        retail: "Risk random amounts each trade",
        institutional: "Position size based on setup quality",
      },
      {
        retail: "Review P&L, not process",
        institutional: "Review decisions, not just outcomes",
      },
      {
        retail: "Chase every moving stock",
        institutional: "Filter 90% of setups as noise",
      },
      {
        retail: "No daily routine or checklist",
        institutional: "Systematic pre-market preparation",
      },
    ] as const,
  },

  /* ─── Who It's For ─── */
  whoItsFor: {
    greenChecks: [
      "You want a repeatable, data-driven process for every trade",
      "You're tired of second-guessing your entries and exits",
      "You know multiple strategies but can't apply them consistently",
      "You want to filter noise and focus on high-probability setups",
      "You're serious about treating trading as a profession",
      "You want accountability and structured feedback on your trades",
      "You've been trading 6+ months and want to level up",
      "You want to understand how institutional traders think",
    ],
    redXMarks: [
      "You're looking for get-rich-quick tips or guaranteed returns",
      "You want someone to give you trades to copy blindly",
      "You're not willing to put in the work to learn a framework",
      "You expect profits without managing risk",
      "You think one workshop will make you a millionaire overnight",
      "You're looking for free signals or Telegram channel tips",
    ],
  },

  /* ─── Instructor ─── */
  instructor: {
    name: "Sathya Narayanan",
    title: "Founder, OptionScore · Doctorate in Finance",
    bio: "Sathya has spent over a decade in quantitative market analysis and options trading. After building proprietary scoring systems for institutional trading desks, he created OptionScore to bring the same data-driven framework to retail traders. He has personally trained 5,000+ traders and reviewed 10,000+ charts.",
    stats: [
      { value: "10+", label: "Years in Markets" },
      { value: "5,000+", label: "Traders Trained" },
      { value: "10,000+", label: "Charts Reviewed" },
    ],
    credentials: [
      "Doctorate in Finance",
      "Ex-Institutional Quant",
      "Published Researcher",
      "OptionScore Creator",
    ],
  },

  /* ─── Testimonials ─── */
  testimonials: [
    {
      name: "[PLACEHOLDER — Student Name]",
      role: "[PLACEHOLDER — e.g. Options Trader, 2 years]",
      quote:
        "[PLACEHOLDER — e.g. The scoring framework completely changed how I evaluate trades. I went from 40% win rate to consistently above 60% in 3 months.]",
      rating: 5,
    },
    {
      name: "[PLACEHOLDER — Student Name]",
      role: "[PLACEHOLDER — e.g. Software Engineer & Part-time Trader]",
      quote:
        "[PLACEHOLDER — e.g. Finally, a system that removes emotion from my trading. The live chart reviews were worth the entire workshop fee alone.]",
      rating: 5,
    },
    {
      name: "[PLACEHOLDER — Student Name]",
      role: "[PLACEHOLDER — e.g. Full-time Trader, 5 years]",
      quote:
        "[PLACEHOLDER — e.g. I've taken dozens of courses. This is the first one that gave me a concrete, daily-usable framework instead of vague concepts.]",
      rating: 5,
    },
    {
      name: "[PLACEHOLDER — Student Name]",
      role: "[PLACEHOLDER — e.g. CA & Swing Trader]",
      quote:
        "[PLACEHOLDER — e.g. The risk-first approach and position sizing methodology alone saved me from 3 bad trades in the first week after the workshop.]",
      rating: 5,
    },
  ],

  /* ─── Contrast Section ─── */
  contrast: {
    hardWay: [
      "Spend years learning from random YouTube videos",
      "Blow up 2-3 trading accounts before finding consistency",
      "Rely on tips, signals, and social media hype",
      "Risk random amounts with no position-sizing system",
      "Review only your P&L, never your decision process",
      "Trade emotionally — FOMO entries, panic exits",
    ],
    optionScoreWay: [
      "Learn a complete framework in 2 intensive days",
      "Score every setup before risking a single rupee",
      "Use data-driven evaluation instead of opinions",
      "Size positions based on setup quality score",
      "Review your scoring process, not just outcomes",
      "Execute with rules — remove emotion from the equation",
    ],
  },

  /* ─── FAQs (expanded to 12) ─── */
  faqs: [
    {
      q: "Is this live or pre-recorded?",
      a: "Both days are conducted live online with interactive Q&A. This is not a pre-recorded course — you participate in real time.",
    },
    {
      q: "Do I need any prior trading experience?",
      a: "Some basic familiarity with markets helps, but the framework is taught from first principles. It works for traders at any level — from 6-month beginners to 5+ year veterans.",
    },
    {
      q: "What do I need to attend?",
      a: "A laptop or phone with a stable internet connection. The joining details are emailed to you after registration and shared again before each session.",
    },
    {
      q: "Will I get recordings?",
      a: "Yes. All registered participants get access to session replays for 30 days after the workshop. You can rewatch at your own pace.",
    },
    {
      q: "Is this only for options traders?",
      a: "The scoring framework works for any instrument — stocks, futures, options. The principles of evaluating setup quality and managing risk are universal.",
    },
    {
      q: "What if I can't attend both days?",
      a: "We strongly recommend attending both days live for the full experience. However, you'll have access to replays, so you can catch up on any missed sessions.",
    },
    {
      q: "How is this different from other trading courses?",
      a: "Most courses teach strategies. We teach a decision-making framework — a scoring system you apply to any strategy. It's the difference between giving someone fish and teaching them to evaluate which fish are worth catching.",
    },
    {
      q: "Will you give me trades to take?",
      a: "No. This workshop teaches you how to evaluate and score trades yourself. We build your independent decision-making ability, not dependency on someone else's calls.",
    },
    {
      q: "What is the OptionScore framework exactly?",
      a: "It's a 5-factor scoring system that evaluates setup quality, risk/reward, market context, timing, and execution probability. Every trade gets a score — you only take trades above your threshold.",
    },
    {
      q: "Is this investment advice?",
      a: "No. OptionScore is a market analytics & education tool. The workshop is purely educational and is not investment advice. Trading involves risk.",
    },
    {
      q: "What is the refund policy?",
      a: "Please review our refund & cancellation policy for the workshop terms. Reach out to support if you have any questions before registering.",
    },
    {
      q: "How do I contact support?",
      a: "You can reach us at support@optionscore.app or via the WhatsApp button on this page. We typically respond within a few hours.",
    },
  ],

  /* ─── Guarantee ─── */
  guarantee:
    "If you attend both days, complete the exercises, and don't feel the framework is worth 10x what you paid — email us within 48 hours of the workshop and we'll issue a full refund. No questions asked.",

  /* ─── Post-Register Steps ─── */
  postRegister: [
    "Check your email for the joining link and workshop prep guide",
    "Join the private WhatsApp group for updates and pre-workshop resources",
    "Complete the pre-workshop self-assessment (sent via email)",
    "Show up 5 minutes early on Day 1 with a notebook ready",
  ],

  /* ─── WhatsApp ─── */
  whatsappNumber: "919876543210",
  whatsappMessage:
    "Hi, I'm interested in the OptionScore 2-Day Workshop. Can you share more details?",

  /* ─── Social Proof Popup Names ─── */
  socialProofNames: [
    "Rahul from Mumbai",
    "Priya from Bangalore",
    "Amit from Delhi",
    "Sneha from Pune",
    "Vikram from Chennai",
    "Ananya from Hyderabad",
    "Karthik from Kochi",
    "Deepa from Jaipur",
  ],

  /* ─── Existing fields (used by /workshop and /workshop/confirmed) ─── */
  headlineTop: "You Don't Need Another Strategy.",
  headlineBottom: "You Need A Better Decision-Making Framework.",
  intro: [
    "Most traders spend years searching for the perfect setup.",
    "Very few learn how to filter bad decisions before they happen.",
    "Over two live sessions, you'll learn the complete framework behind disciplined trade evaluation, opportunity selection, and structured execution.",
  ],
  forYou: [
    "You constantly second-guess your decisions",
    "You know multiple concepts but struggle to apply them consistently",
    "You want a repeatable process instead of random execution",
    "You are serious about improving your approach",
  ],
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
  details: {
    duration: "2 Days",
    format: "Live Online Workshop",
    access: "Interactive Sessions + Q&A",
    investment: `₹${WORKSHOP_FEE_RUPEES.toLocaleString("en-IN")}`,
  },

  whatsappGroupUrl:
    "https://chat.whatsapp.com/CfuP5c2qahw2M8j8vB2X58?s=em&p=a&mlu=2",

  session: {
    dateTime: "[TO BE FILLED — e.g. Sat 12 & Sun 13 July 2026 · 7:00 PM IST]",
    duration: "2 Days",
    format: "Live Online Workshop",
    access: "Interactive Sessions + Q&A",
    host: "[TO BE FILLED — host name]",
    joinLink: "[TO BE FILLED — live join link, or leave for follow-up email]",
  },

  defaultSource: "workshop-direct",
} as const;

/** True when a value is still an unfilled placeholder. */
export function isWsPlaceholder(value: string): boolean {
  return value.startsWith("[TO BE FILLED") || value.startsWith("[PLACEHOLDER");
}
