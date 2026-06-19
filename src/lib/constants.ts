export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Academics", href: "#academics" },
  { label: "About", href: "#about" },
  { label: "Privacy", href: "#privacy" },
  { label: "Account Deletion", href: "/account-deletion" },
];

export const FEATURES = [
  {
    title: "Market Scoring",
    description:
      "Real-time proprietary scoring algorithm that rates market conditions from 0-100, helping you identify optimal entry and exit points.",
  },
  {
    title: "ScoreAI",
    description:
      "AI-powered analysis engine that processes thousands of data points to deliver actionable trading insights in seconds.",
  },
  {
    title: "Trading Tools",
    description:
      "Professional-grade charting, options flow tracking, and risk calculators — all optimized for mobile.",
  },
  {
    title: "Community",
    description:
      "Connect with thousands of traders sharing strategies, alerts, and real-time market commentary.",
  },
  {
    title: "Broker Integration",
    description:
      "Seamlessly connect your brokerage account to execute trades directly from OptionScore with one tap.",
  },
];

export const STEPS = [
  {
    step: 1,
    title: "Download & Connect",
    description:
      "Get OptionScore from the App Store or Google Play and link your brokerage account in under 60 seconds.",
  },
  {
    step: 2,
    title: "Get Your Score",
    description:
      "Our AI analyzes the market in real-time and delivers a clear score so you know exactly when to trade.",
  },
  {
    step: 3,
    title: "Trade With Confidence",
    description:
      "Execute trades backed by data-driven insights and track your performance over time.",
  },
];

export const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund & Cancellation", href: "/refund-policy" },
  { label: "Shipping & Delivery", href: "/shipping-policy" },
  { label: "Contact Us", href: "/contact" },
  { label: "Account Deletion", href: "/account-deletion" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/optionscore.app?igsh=MXNrNDE5OW83NWMycQ==" },
];

export const APP_STORE_URL = "https://apps.apple.com/in/app/optionscore/id6764321805";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.maheshsimsinfotech.optionscore";

export function getStoreUrl(): string {
  if (typeof navigator === "undefined") return APP_STORE_URL;
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod|macintosh/.test(ua) && "ontouchend" in document) {
    return APP_STORE_URL;
  }
  if (/android/.test(ua)) {
    return PLAY_STORE_URL;
  }
  // Desktop — default to App Store
  return APP_STORE_URL;
}
