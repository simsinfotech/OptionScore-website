/**
 * Editable configuration for the 2-Day Live Trading Workshop funnel.
 *
 * Pages that use this:
 *   /workshop            -> registration form (step 1)
 *   /workshop/offer      -> long-form sales landing page + payment (step 2)
 *   /workshop/confirmed  -> confirmation / thank-you
 */

/** Ticket price, in rupees. Razorpay charges in paise. */
export const WORKSHOP_FEE_RUPEES = 5999;
export const WORKSHOP_FEE_PAISE = WORKSHOP_FEE_RUPEES * 100;

export const WORKSHOP = {
  /* ─── Branding ─── */
  badge: "2-Day Live Intensive Workshop",
  title: "2-Day Live Intensive Workshop",

  /* ─── Announcement bar ─── */
  announcement: {
    date: "July 1st Week",
    seats: "19",
  },

  /* ─── Hero ─── */
  hero: {
    badge: "LIVE 2-DAY ONLINE WORKSHOP · INDIAN EQUITY · FOREX · GOLD · CRYPTO",
    headline: [
      "Watch Me Trade. ",
      "Live. In Front of You.",
      "Real Market. Real Time.",
    ],
    sub: "Most trading educators show you recorded charts and tell you what they saw. In this workshop I open the live market on Day 2 — and trade while you watch. Every decision. Every reason. Before the move happens.",
    vslText: "Watch: Why I Trade Live In Front of You — And What That Changes",
  },

  heroStats: [
    { value: "500+", label: "Traders Trained" },
    { value: "4.9/5", label: "Rating" },
    { value: "Live", label: "Chart Reviews" },
    { value: "Max 19", label: "Seats" },
  ] as const,

  /* ─── Experience Cards ─── */
  experienceCards: [
    {
      tag: "DAY 1",
      title: "Day 1 — The Institutional Framework",
      meta: ["Indian Equity", "Forex", "Gold", "Crypto"],
      body: "Everything you need to read price the way institutions do. Liquidity pools, CRT mechanics, order flow, market structure shifts. Applied to Indian equity, F&O, forex, gold, and crypto. Live chart examples throughout every session. You leave Day 1 understanding why price moves — not just when to click buy.",
      items: [
        "How institutions hunt your stop loss",
        "CRT — Candle Range Theory framework",
        "Reading market structure shifts",
        "Entry, stop placement, and target logic",
      ],
      duration: "6 Hours Live",
    },
    {
      tag: "DAY 2",
      title: "Day 2 — I Trade Live In Front of You",
      meta: ["Live Market", "Real Time", "Day 2"],
      body: "This is the day no other trading educator offers. I open the live market at 9:15am. Real charts. Real session. Real decisions. You watch me identify institutional setups, call the liquidity sweep, and execute — while explaining every single thought out loud.",
      items: [
        "Live market open — Nifty, Bank Nifty, or XAUUSD",
        "Real-time setup identification and execution",
        "You apply the framework to your own charts",
        "Your analysis reviewed by Shamiq live on screen",
      ],
      duration: "6 Hours Live",
    },
    {
      tag: "REVIEW",
      title: "Your Chart Review — Personal & Live",
      meta: ["Personal", "Live", "Your Charts"],
      body: "Every registered participant gets their chart analysis reviewed personally by Shamiq — live on screen, in front of the group. Not generic feedback. Your actual chart. Your actual trade idea. Your exact mistake — identified and corrected in real time. This is why seats are capped. Personal review requires a small group.",
      items: [
        "Submit your chart analysis from the morning session",
        "Shamiq reviews it live on screen",
        "Specific feedback — what you read right and where you drifted",
        "Walk away knowing exactly what to fix",
      ],
      duration: "Included in Day 2",
    },
  ] as const,

  buildSummary:
    "By the end of Day 2: You will have identified a live institutional setup, read the order flow, and made a trading decision using the framework — with Shamiq watching. That is not something you can get from a video.",

  /* ─── Schedule ─── */
  schedule: {
    day1: {
      header: "DAY 1 — Saturday, July 5 · 10:00 AM to 5:00 PM IST",
      sessions: [
        { time: "10:00 AM – 10:15 AM", duration: "15 min", title: "Welcome & Setup", description: "Introductions, platform check, overview of the two days ahead.", tag: "", type: "default" as const },
        { time: "10:15 AM – 11:30 AM", duration: "75 min", title: "Session 1 — How Institutions Move Price", description: "Liquidity pools. Stop hunts. Why retail traders are always on the wrong side. Live chart examples on Nifty and XAUUSD throughout.", tag: "LIVE TEACHING", type: "live" as const },
        { time: "11:30 AM – 11:45 AM", duration: "15 min", title: "Break + Q&A", description: "Questions on Session 1. Clarify before we go deeper.", tag: "BREAK", type: "break" as const },
        { time: "11:45 AM – 1:15 PM", duration: "90 min", title: "Session 2 — CRT: Candle Range Theory", description: "The complete CRT framework. Identifying the range, anticipating the sweep, reading the reversal. Applied to equity, forex, gold, and crypto.", tag: "LIVE TEACHING", type: "live" as const },
        { time: "1:15 PM – 2:00 PM", duration: "45 min", title: "Lunch Break", description: "Rest. Review your notes. Come back ready for structure.", tag: "LUNCH BREAK", type: "break" as const },
        { time: "2:00 PM – 3:30 PM", duration: "90 min", title: "Session 3 — Market Structure & Order Flow", description: "Market structure shifts. Break of structure. Change of character. How to read institutional intent before the move plays out.", tag: "LIVE TEACHING", type: "live" as const },
        { time: "3:30 PM – 3:45 PM", duration: "15 min", title: "Break + Q&A", description: "", tag: "BREAK", type: "break" as const },
        { time: "3:45 PM – 4:45 PM", duration: "60 min", title: "Session 4 — Entry, Stop, Target", description: "The complete trade plan. Where institutions have already been. Where they're going. How to position with them — not against them.", tag: "LIVE TEACHING", type: "live" as const },
        { time: "4:45 PM – 5:00 PM", duration: "15 min", title: "End of Day Q&A", description: "Every question from Day 1 answered before Day 2.", tag: "Q&A", type: "default" as const },
      ],
    },
    day2: {
      header: "DAY 2 — Sunday, July 6 · 9:00 AM to 3:00 PM IST",
      sessions: [
        { time: "9:00 AM – 9:15 AM", duration: "15 min", title: "Day 2 Briefing", description: "Recap of Day 1 framework. What we're watching for in today's session.", tag: "", type: "default" as const },
        { time: "9:15 AM – 11:30 AM", duration: "135 min", title: "LIVE MARKET OPEN — Shamiq Trades Live", description: "9:15am. Charts open. Real market. Real session. Shamiq calls setups live — identifying liquidity, calling the sweep, executing — while explaining every decision out loud. You watch, ask questions, and see the framework in action on today's market.", tag: "LIVE MARKET", type: "live" as const },
        { time: "11:30 AM – 11:45 AM", duration: "15 min", title: "Break", description: "Process what you watched. Prepare your own chart analysis.", tag: "BREAK", type: "break" as const },
        { time: "11:45 AM – 1:00 PM", duration: "75 min", title: "Your Turn — Apply the Framework", description: "You apply the institutional framework to charts from the morning session. Identify the liquidity pool. Call the sweep. Mark the structure shift. Prepare your trade plan. Shamiq reviews.", tag: "HANDS ON", type: "live" as const },
        { time: "1:00 PM – 2:00 PM", duration: "60 min", title: "Live Chart Reviews — Every Participant", description: "Shamiq reviews every participant's analysis live on screen. Your chart. Your trade idea. Exact feedback on what you read right and exactly where you went wrong. This is the session that changes everything.", tag: "PERSONAL REVIEW", type: "live" as const },
        { time: "2:00 PM – 2:45 PM", duration: "45 min", title: "Building Your Daily Trading Plan", description: "Pre-market checklist. Entry rules. Stop placement process. How to apply this framework every single trading day — systematised.", tag: "LIVE TEACHING", type: "live" as const },
        { time: "2:45 PM – 3:00 PM", duration: "15 min", title: "Final Q&A + Next Steps", description: "Last questions. What comes next. Special offer for workshop attendees who want to go deeper.", tag: "CLOSE", type: "default" as const },
      ],
    },
  },

  /* ─── Problem Section ─── */
  problem: {
    label: "Why You Keep Losing Even When You're Right",
    headline: "The Market Isn't Random.\nIt's Designed to Take Your Money.",
    body: "Every time you get stopped out on a perfect setup — the institution on the other side of that trade knew exactly where your stop was. You're using RSI, MACD, support and resistance. The same tools 95% of retail traders use. And 95% of retail traders lose money. That's not a coincidence.",
    retail: [
      "Look for entry signals",
      "Buy at support",
      "Use indicators that lag price",
      "React to the candle",
      "Follow the pattern",
      'Enter when it "looks right"',
    ],
    institutional: [
      "Look for your stop loss",
      "Sweep below support to fill orders",
      "Read order flow before price moves",
      "Create the candle",
      "Set the trap",
      "Enter after retail traders are trapped",
    ],
    closing: [
      "You don't have a discipline problem.",
      "You don't have a capital problem.",
      "You have a framework problem.",
      "",
      "And a framework is fixable in two days.",
    ],
  },

  /* ─── Value Stack ─── */
  valueStack: [
    { label: "Day 1 Full Framework (6 hrs live)", value: 15000 },
    { label: "Day 2 Live Market Session (6 hrs live)", value: 20000 },
    { label: "Personal Chart Review (every participant)", value: 10000 },
    { label: "Full Recordings — Both Days", value: 3000 },
    { label: "Pre-Workshop Preparation Material", value: 1000 },
    { label: "Private Telegram Community", value: 2000 },
    { label: "Certificate of Completion", value: 500 },
  ] as const,

  totalValue: 51500,

  /* ─── Who It's For ─── */
  whoItsFor: {
    perfect: [
      "Have been trading for 3+ months and still not consistently profitable",
      "Have bought courses before and felt something was still missing",
      "Get stopped out on perfect setups and don't understand why",
      "Want to understand WHY price moves — not just when to click buy",
      "Trade Indian equity, F&O, forex, gold, or crypto — or want to",
      "Are willing to unlearn retail thinking completely",
      "Can commit to being fully present for both days live",
      "Want someone to watch you trade and tell you exactly what you're doing wrong",
    ],
    notFor: [
      "You're looking for trade signals or hot tips",
      "You want someone to manage your money or trade for you",
      "You're not willing to apply a completely new framework",
      "You expect overnight results without practice",
      "You cannot attend both days live",
      "You've never seen a candlestick chart before",
    ],
  },

  /* ─── Instructor ─── */
  instructor: {
    name: "Shamiq",
    title: "Institutional Trader · OptionScore Academy Founder · 15 Years Active",
    bio: [
      "I spent 3 years losing money consistently before I understood what was actually moving price. I had discipline. I had rules. I had a system — I thought. And I was still losing.",
      'The shift came when I stopped asking "where do I enter?" and started asking "where are the institutions building their position?" That question changed everything.',
      "For 15 years I've traded using institutional order flow, CRT, and Fibonacci confluence across XAUUSD, forex majors, Indian equity, and F&O. I've refined the same framework through every market condition — bull runs, crashes, sideways chop, high volatility.",
      "This workshop is built around exactly what I use. Not what sounds good in theory. What works on a live chart every single trading day. I don't teach what I used to do. I teach what I do now — live, in front of you.",
    ],
    stats: [
      { value: "15 Years", label: "Active Trader" },
      { value: "500+", label: "Traders Trained" },
      { value: "4.9/5", label: "Workshop Rating" },
    ],
    credentials: [
      "CRT Framework",
      "Institutional Order Flow",
      "XAUUSD",
      "Indian F&O",
      "Forex Majors",
      "Gold",
      "Crypto",
      "OptionScore Academy Founder",
    ],
  },

  /* ─── Testimonials ─── */
  testimonials: [
    {
      headline: "Day 2 changed everything.",
      quote: "Day 2 was unlike anything I've experienced in any trading course. Shamiq called a liquidity sweep on Bank Nifty live — explained exactly what he was looking for — and it played out exactly as he described. I've never seen anyone teach like this.",
      initials: "RK",
      name: "Rahul K.",
      location: "Mumbai · 3 weeks ago",
    },
    {
      headline: "First time someone showed me what was ABOUT to happen.",
      quote: "I've bought 4 courses before this. All of them showed me recorded charts and told me what happened. This was the first time someone sat in front of a live market and showed me what was about to happen. That's the difference.",
      initials: "AP",
      name: "Arjun P.",
      location: "Bangalore · 5 weeks ago",
    },
    {
      headline: "The chart review was worth the entire Rs. 5,999.",
      quote: "The chart review on Day 2 was what did it for me. Shamiq looked at my analysis and told me exactly where I was reading it right and where I slipped back into retail logic. That one feedback session was worth the entire Rs. 5,999.",
      initials: "DM",
      name: "Deepak M.",
      location: "Hyderabad · 4 weeks ago",
    },
    {
      headline: "Finally understood WHY I was losing.",
      quote: "I've been trading for 2 years and losing consistently. After Day 1 I finally understood why. After Day 2 I finally knew what to do about it. Best investment I've made in my trading career.",
      initials: "PS",
      name: "Priya S.",
      location: "Chennai · 2 weeks ago",
    },
  ],

  testimonialHighlights: [
    { value: '"Best Rs. 5,999 investment"', label: "mentioned 12+ times" },
    { value: "96%", label: "attend both days" },
    { value: "40%", label: "upgrade to full course" },
  ],

  /* ─── FAQs ─── */
  faqs: [
    { q: "Do I need prior trading experience?", a: "You should have basic familiarity with charts — you've opened a trading account and understand what candlesticks are. If you've been trading for 3+ months, you're in the right place. Complete beginners may find Day 1 fast-paced but all concepts are explained from the ground up." },
    { q: "Which markets does this cover?", a: "The framework is taught on Indian equity and F&O (Nifty, Bank Nifty), XAUUSD (gold), and forex majors. The same institutional logic applies to crypto and we cover that specifically. One framework. All markets." },
    { q: "Is this about signals or trade recommendations?", a: "No. This is purely educational — you learn a framework for reading price independently. No signals, no tips, no personalised recommendations. Educational content only. Not SEBI-regulated investment advice." },
    { q: "What if I can't attend one of the two days?", a: "Both days are essential. Day 2 builds directly on Day 1. We strongly recommend attending both days live. Recordings are provided but the personal chart review on Day 2 cannot be replicated from a recording." },
    { q: "Will sessions be recorded?", a: "Yes. Full recordings of both days are included. However, the live chart review — where Shamiq reviews your personal analysis on screen — only happens during the live session. That cannot be replicated in a replay." },
    { q: "How is this different from YouTube or other courses?", a: "YouTube and other courses show you finished charts — clean, obvious, already done. This workshop has a live market open on Day 2 with real-time trade analysis and personal chart review for every participant. That experience is not available anywhere else at this price point." },
    { q: "What is the refund policy?", a: "Attend Day 1 fully. If you don't feel the framework has completely changed how you read price — contact us within 24 hours and we will refund you in full. No questions asked." },
    { q: "Is EMI available?", a: "Yes. Razorpay EMI available at checkout. Full access from Day 1 regardless of payment plan." },
    { q: "How do I access the workshop after payment?", a: "Immediately after payment you receive a confirmation email with the Zoom link, pre-workshop material, and Telegram community invite. Everything sent to your registered email within 5 minutes." },
    { q: "Will Shamiq personally review my charts?", a: "Yes. Every registered participant gets their chart analysis reviewed by Shamiq live on screen during Day 2. This is the reason seats are capped — personal review requires a small group." },
    { q: "What's the difference between the workshop and the full course?", a: "Workshop: 2 days live, complete institutional framework, live market session, personal chart review — Rs. 5,999. Full Course: 6 months of weekly live sessions with Shamiq, monthly personal chart reviews, complete 3-level curriculum, lifetime access — Rs. 74,999. Workshop is the perfect starting point. 68% of workshop attendees enroll in the full course." },
    { q: "Can I upgrade to the full course after the workshop?", a: "Yes. Workshop attendees get a special rate on the full course — shared at the end of Day 2." },
  ],

  /* ─── Guarantee ─── */
  guarantee:
    "Attend Day 1 fully. If you don't feel the framework has completely changed how you read price — contact us within 24 hours and I'll refund every rupee. No questions asked. — Shamiq, OptionScore Academy",

  /* ─── Post-Register Steps ─── */
  postRegister: [
    "Instant confirmation email with Zoom link",
    "Pre-workshop preparation material sent 48 hours before",
    "Reminder emails + WhatsApp message before each day",
    "Join on July 5 at 10:00 AM IST — Day 1 begins",
  ],

  /* ─── Contrast Section ─── */
  contrast: {
    hardWay: [
      "Spend months watching YouTube and still losing",
      "Buy another course that shows you perfect hindsight charts",
      "Get stopped out on setups that then go exactly where you thought",
      "Never understand WHY price moved the way it did",
      'Keep asking "where do I enter?" instead of "where are institutions positioned?"',
      "Continue paying for your education through losing trades",
    ],
    optionScoreWay: [
      "2 days this July 5–6",
      "Watch institutional order flow called live — before the move",
      "Apply the framework on your own charts with Shamiq watching",
      "Get your analysis reviewed personally — on screen, live",
      "Leave with a framework that works on every market, every day",
      "Stop trading against institutions and start trading with them",
    ],
  },

  finalStats: [
    { value: "500+", label: "Traders Trained" },
    { value: "4.9/5", label: "Rating" },
    { value: "96%", label: "Attend Both Days" },
  ],

  finalPS:
    "P.S. — I cap seats because I review every participant's chart personally. The last batch closed before the scheduled date. If you're considering it — register now.",

  /* ─── WhatsApp ─── */
  whatsappNumber: "919036317765",
  whatsappMessage:
    "Hi, I have a question about the OptionScore Academy workshop.",

  /* ─── Social Proof Names ─── */
  socialProofNames: [
    { name: "Rahul", city: "Mumbai" },
    { name: "Priya", city: "Bengaluru" },
    { name: "Amit", city: "Delhi" },
    { name: "Sneha", city: "Hyderabad" },
    { name: "Vikram", city: "Pune" },
    { name: "Ananya", city: "Chennai" },
    { name: "Karthik", city: "Kolkata" },
    { name: "Deepa", city: "Ahmedabad" },
  ],

  /* ─── Footer ─── */
  footer: {
    disclaimer:
      "DISCLAIMER: This workshop is for educational purposes only. It does not include trade signals, tips, or personalised investment recommendations. No financial advice is provided. Trading involves risk. Past performance is not indicative of future results.",
  },

  /* ─── Backward-compat fields used by /workshop and /workshop/confirmed ─── */
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
    { day: "Day 1", topics: ["Understanding Market Context", "Identifying High-Quality Opportunities", "Filtering Low-Probability Setups", "Building A Structured Evaluation Process"] },
    { day: "Day 2", topics: ["Decision-Making Under Pressure", "Execution Frameworks", "Risk Awareness Principles", "Real Market Case Studies", "Live Q&A"] },
  ],
  details: {
    duration: "2 Days",
    format: "Live Online Workshop",
    access: "Interactive Sessions + Q&A",
    investment: `₹${WORKSHOP_FEE_RUPEES.toLocaleString("en-IN")}`,
  },
  whatsappGroupUrl: "https://chat.whatsapp.com/CfuP5c2qahw2M8j8vB2X58?s=em&p=a&mlu=2",
  session: {
    dateTime: "Sat 5 & Sun 6 July 2026 · 10:00 AM IST",
    duration: "2 Days",
    format: "Live Online Workshop",
    access: "Interactive Sessions + Q&A",
    host: "Shamiq",
    joinLink: "",
  },
  defaultSource: "workshop-direct",
} as const;

/** True when a value is still an unfilled placeholder. */
export function isWsPlaceholder(value: string): boolean {
  return value.startsWith("[TO BE FILLED") || value.startsWith("[PLACEHOLDER");
}
