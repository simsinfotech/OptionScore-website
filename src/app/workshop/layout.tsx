import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Trading Workshop | OptionScore Academy",
  description:
    "2-Day Live Intensive Workshop: Learn the institutional trading framework, watch live market trades, and get personal chart reviews. Indian equity, F&O, forex, gold & crypto. Rs. 5,999.",
  openGraph: {
    title: "Live Trading Workshop | OptionScore Academy",
    description:
      "2-Day Live Intensive Workshop: Learn institutional order flow, CRT, and market structure. Watch Shamiq trade live on Day 2. Personal chart review for every participant.",
    url: "https://optionscore.app/workshop",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Trading Workshop | OptionScore Academy",
    description:
      "2-Day Live Workshop: Institutional framework + live market trading + personal chart review. Rs. 5,999.",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "2-Day Live Intensive Trading Workshop",
  description:
    "Learn the institutional trading framework with live market trading and personal chart reviews. Covers Indian equity, F&O, forex, gold, and crypto.",
  provider: {
    "@type": "Organization",
    name: "OptionScore Academy",
    url: "https://optionscore.app",
  },
  offers: {
    "@type": "Offer",
    price: "5999",
    priceCurrency: "INR",
    availability: "https://schema.org/LimitedAvailability",
    url: "https://optionscore.app/workshop",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need prior trading experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You should have basic familiarity with charts. If you've opened a trading account and understand what candlesticks are, you're good. If you've been trading for 3+ months, you're in the right place.",
      },
    },
    {
      "@type": "Question",
      name: "Which markets does this cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The framework is taught on Indian equity and F&O (Nifty, Bank Nifty), XAUUSD (gold), and forex majors. The same institutional logic applies to crypto. One framework. All markets.",
      },
    },
    {
      "@type": "Question",
      name: "Is this about signals or trade recommendations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This is purely educational. You learn a framework for reading price independently. No signals, no tips, no personalised recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "Will sessions be recorded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Full recordings of both days are included. However, the live chart review where Shamiq reviews your personal analysis on screen only happens during the live session.",
      },
    },
    {
      "@type": "Question",
      name: "What is the refund policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Attend Day 1 fully. If you don't feel the framework has completely changed how you read price, contact us within 24 hours and we will refund you in full. No questions asked.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from YouTube or other courses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This workshop has a live market open on Day 2 with real-time trade analysis and personal chart review for every participant. That experience is not available anywhere else at this price point.",
      },
    },
  ],
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
