// ─────────────────────────────────────────────────────────────────────────
// OptionScore Academy — customer-facing curriculum data
// Source: internal course outline v1.2. Internal-only sections (production
// notes, faculty allocation, cohort-1 discounts, build order, versioning) are
// intentionally NOT included here — this file powers the public /academy page.
// ─────────────────────────────────────────────────────────────────────────

export const ACADEMY_TAGLINE = "Score The Market Before You Trade™";

export const ACADEMY_INTRO = [
  "Most retail options traders in India lose money — SEBI data puts the figure at roughly 9 out of 10. We believe that is not a knowledge gap. It is a framework gap.",
  "OptionScore Academy teaches the institutional frameworks risk desks and prop firms actually use — adapted for Indian F&O markets, paired with real execution, and built around the OptionScore market-scoring system.",
];

export interface Pillar {
  title: string;
  what: string;
}

export const ACADEMY_PILLARS: Pillar[] = [
  {
    title: "Institutional Frameworks",
    what: "How risk desks, market makers, and prop firms actually think about options, risk, and portfolios — across Greeks, volatility, and portfolio construction.",
  },
  {
    title: "Active Execution",
    what: "How institutional thinking translates into real Indian retail trades — broker mechanics, taxation, live trading rooms, option playbooks, and trade management.",
  },
  {
    title: "The OptionScore System",
    what: "A market-scoring engine that classifies regime, structure, volatility, liquidity, and positioning before any trade — so you score the market first, then act.",
  },
];

export interface LevelSummary {
  level: string;
  name: string;
  focus: string;
  duration: string;
  modules: string;
  recorded: string;
  cohort: string;
  accent: "cyan" | "amber" | "rose";
}

// Public price list (₹). These are customer-facing — standard pricing only.
export const ACADEMY_LEVELS: LevelSummary[] = [
  {
    level: "Level 1",
    name: "Beginner — Stocks",
    focus: "Market literacy & risk foundation before you touch options.",
    duration: "4 weeks",
    modules: "12 modules",
    recorded: "₹2,499",
    cohort: "₹9,999",
    accent: "cyan",
  },
  {
    level: "Level 2",
    name: "Intermediate — Options Foundation",
    focus: "Where options become a real instrument, not a lottery ticket.",
    duration: "6 weeks",
    modules: "15 modules",
    recorded: "₹4,999",
    cohort: "₹24,999",
    accent: "amber",
  },
  {
    level: "Level 3",
    name: "Advanced — Options Pro",
    focus: "Trade options the way institutions manage risk, adapted for Indian F&O.",
    duration: "8 weeks",
    modules: "13 modules",
    recorded: "₹9,999",
    cohort: "₹49,999",
    accent: "rose",
  },
];

export const ACADEMY_BUNDLE = {
  name: "Full Program Bundle",
  focus: "All three levels + every bonus — the complete journey, beginner to professional.",
  duration: "18 weeks",
  modules: "41 modules + bonuses",
  recorded: "₹14,999",
  cohort: "₹74,999",
};

export interface ModuleEntry {
  code: string;
  title: string;
  hours: string;
}

export interface CurriculumLevel {
  id: string;
  level: string;
  name: string;
  blurb: string;
  duration: string;
  recorded: string;
  cohort: string;
  prerequisite?: string;
  accent: "cyan" | "amber" | "rose";
  modules: ModuleEntry[];
}

// Module 0 — onboarding (mandatory pre-Level-1)
export const ACADEMY_FOUNDATION = {
  code: "Module 0",
  title: "The Professional Trader Mindset",
  hours: "4 hrs · 2 sessions",
  blurb:
    "Delivered before any technical content begins. The trainer's 24-year journey, how professionals think differently, and why OptionScore exists — because transformation starts with the right mental frame, not a strategy.",
  highlights: [
    "The 24-year journey — institutions, World Bank years, markets traded, and the mistakes that taught the most",
    "How professionals frame opportunities, losses, and the trades they skip",
    "Why institutions never trade without scoring the environment first",
    "The conviction-before-execution principle the whole academy is built on",
  ],
};

export const ACADEMY_CURRICULUM: CurriculumLevel[] = [
  {
    id: "level-1",
    level: "Level 1",
    name: "Beginner — Stocks",
    blurb: "The market literacy and risk foundation every trader needs before touching options.",
    duration: "4 weeks",
    recorded: "₹2,499",
    cohort: "₹9,999",
    accent: "cyan",
    modules: [
      { code: "1.1", title: "Introduction to Indian Financial Markets", hours: "2 hrs" },
      { code: "1.2", title: "Broker Setup & Platform Mastery", hours: "2 hrs" },
      { code: "1.3", title: "Chart Reading Foundations", hours: "3 hrs" },
      { code: "1.4", title: "Technical Analysis Essentials", hours: "3 hrs" },
      { code: "1.5", title: "OptionScore Foundations — How The Score Works", hours: "4 hrs" },
      { code: "1.6", title: "Why 9 Out of 10 Retail Traders Lose", hours: "2 hrs" },
      { code: "1.7", title: "Risk Management Foundations", hours: "3 hrs" },
      { code: "1.8", title: "Trading Psychology Basics", hours: "2 hrs" },
      { code: "1.9", title: "OptionScore Philosophy in Practice", hours: "2 hrs" },
      { code: "1.10", title: "Building Your First Trading Plan", hours: "3 hrs" },
      { code: "1.11", title: "Paper-Trading Discipline", hours: "2 hrs" },
      { code: "1.12", title: "Final Project & Level 1 Certification", hours: "4 hrs" },
    ],
  },
  {
    id: "level-2",
    level: "Level 2",
    name: "Intermediate — Options Foundation",
    blurb: "Where options become a real instrument, not a lottery ticket.",
    duration: "6 weeks",
    recorded: "₹4,999",
    cohort: "₹24,999",
    prerequisite: "Level 1 or equivalent market experience",
    accent: "amber",
    modules: [
      { code: "2.1", title: "Options Market Fundamentals", hours: "2 hrs" },
      { code: "2.2", title: "Option Pricing & Black-Scholes Intuition", hours: "3 hrs" },
      { code: "2.3", title: "The Greeks — Delta, Gamma, Theta, Vega", hours: "4 hrs" },
      { code: "2.4", title: "Implied Volatility & IV Rank", hours: "3 hrs" },
      { code: "2.5", title: "Open Interest Analysis", hours: "3 hrs" },
      { code: "2.6", title: "F&O Taxation & Turnover", hours: "2 hrs" },
      { code: "2.7", title: "Broker Mechanics for F&O", hours: "2 hrs" },
      { code: "2.8", title: "OptionScore Regime Model", hours: "3 hrs" },
      { code: "2.9", title: "Directional Option Buying", hours: "3 hrs" },
      { code: "2.10", title: "Directional Option Selling", hours: "3 hrs" },
      { code: "2.11", title: "Option Playbooks", hours: "4 hrs" },
      { code: "2.12", title: "Trade Management", hours: "3 hrs" },
      { code: "2.13", title: "Professional Trade Reviews — 50 Historical Trades", hours: "8 hrs" },
      { code: "2.14", title: "Live Case Studies", hours: "4 hrs" },
      { code: "2.15", title: "Final Project & Level 2 Certification", hours: "6 hrs" },
    ],
  },
  {
    id: "level-3",
    level: "Level 3",
    name: "Advanced — Options Pro",
    blurb: "Trading options the way institutions manage risk, adapted for Indian F&O markets.",
    duration: "8 weeks",
    recorded: "₹9,999",
    cohort: "₹49,999",
    prerequisite: "Level 2",
    accent: "rose",
    modules: [
      { code: "3.1", title: "Institutional Market Structure", hours: "3 hrs" },
      { code: "3.2", title: "Advanced Greeks — Second-Order & Cross-Effects", hours: "3 hrs" },
      { code: "3.3", title: "Volatility Trading", hours: "4 hrs" },
      { code: "3.4", title: "Advanced Option Strategies", hours: "5 hrs" },
      { code: "3.5", title: "Portfolio Construction", hours: "4 hrs" },
      { code: "3.6", title: "Professional Risk Architecture", hours: "4 hrs" },
      { code: "3.7", title: "Advanced OptionScore Engine", hours: "4 hrs" },
      { code: "3.8", title: "Professional Market Scoring", hours: "3 hrs" },
      { code: "3.9", title: "Build Your Own OptionScore System", hours: "6 hrs" },
      { code: "3.10", title: "Performance Analytics", hours: "3 hrs" },
      { code: "3.11", title: "Live Trading Room", hours: "12 hrs" },
      { code: "3.12", title: "Trading Business Blueprint", hours: "4 hrs" },
      { code: "3.13", title: "Capstone Project & Level 3 Certification", hours: "8 hrs" },
    ],
  },
];

export const ACADEMY_FORMAT = [
  "3 live sessions per week — 2 teaching sessions (90 min) + 1 live trading room (60 min)",
  "All sessions recorded — students retain lifetime access",
  "Weekly assignments — practical exercises with faculty review",
  "Private, moderated, faculty-active community",
  "End-of-level project — gated certification",
  "Time commitment: 6–8 hours per week (live + self-paced)",
];

export interface Certification {
  level: string;
  title: string;
}

export const ACADEMY_CERTIFICATIONS: Certification[] = [
  { level: "Level 1", title: "OS Certified Trader" },
  { level: "Level 2", title: "OS Certified Options Practitioner" },
  { level: "Level 3", title: "OS Certified Options Professional" },
];

export interface Bonus {
  title: string;
  description: string;
}

export const ACADEMY_BONUSES: Bonus[] = [
  {
    title: "90-Day Consistency Challenge",
    description:
      "Daily check-ins, weekly journal reviews, and an accountability cohort — built to fix the #1 problem in retail trading: inconsistency.",
  },
  {
    title: "Trading Psychology Deep Dive",
    description:
      "A 4-session intensive on drawdown psychology, tilt management, and protecting your long-term mental capital.",
  },
  {
    title: "Trade Journal Templates",
    description:
      "Pre-built Excel and Notion journals aligned to the OS framework — pre-trade checklist, post-trade review, weekly analytics.",
  },
  {
    title: "Risk Management Calculator",
    description:
      "A browser-based position-sizing and risk-allocation tool aligned to OptionScore engine outputs.",
  },
  {
    title: "OptionScore App — 6 Months Pro",
    description:
      "Six months of OS Pro bundled with the cohort, so you apply academy frameworks using the live engine.",
  },
  {
    title: "Weekly Market Outlook Sessions",
    description:
      "Live faculty-led sessions every Sunday — the week ahead, OS engine pre-read, and watchlist construction. Recorded for catch-up.",
  },
  {
    title: "Private Community Access",
    description:
      "A moderated, faculty-active community with cohort-specific channels and lifetime access for cohort students.",
  },
  {
    title: "Joint Faculty Office Hours",
    description:
      "Monthly live Q&A with the faculty. Recorded for those who can't attend.",
  },
];

// Enquiry form options. `value` is what gets written to the sheet.
export const ACADEMY_COURSE_OPTIONS = [
  "Level 1 — Beginner (Stocks)",
  "Level 2 — Intermediate (Options Foundation)",
  "Level 3 — Advanced (Options Pro)",
  "Full Program Bundle",
  "Not sure yet",
] as const;

export const ACADEMY_FORMAT_OPTIONS = [
  "Live Cohort",
  "Recorded",
  "Not sure",
] as const;

export interface AcademyFaq {
  q: string;
  a: string;
}

export const ACADEMY_FAQS: AcademyFaq[] = [
  {
    q: "Do I need any prior experience to start?",
    a: "No. Level 1 (Beginner — Stocks) assumes zero background and builds market literacy and risk foundations from scratch. Level 2 expects Level 1 or equivalent market experience, and Level 3 expects Level 2.",
  },
  {
    q: "What's the difference between the Recorded and Cohort options?",
    a: "Recorded gives you the structured video curriculum at your own pace. The Cohort is the full live experience — 3 live sessions a week, live trading rooms, weekly faculty review, the private community, gated certification, and bonuses.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. Each level ends with a graded project. Passing students earn tiered, verifiable certification — OS Certified Trader (Level 1), OS Certified Options Practitioner (Level 2), and OS Certified Options Professional (Level 3). Re-submissions are free.",
  },
  {
    q: "How much time does it take each week?",
    a: "Plan for 6–8 hours per week across live sessions and self-paced work. All live sessions are recorded, so you keep lifetime access and can catch up anytime.",
  },
  {
    q: "Is this investment advice or a tips service?",
    a: "No. OptionScore Academy is an education program. We teach frameworks and process — not buy/sell calls or guaranteed returns. Trading involves substantial risk of loss, and all decisions are your own.",
  },
];
