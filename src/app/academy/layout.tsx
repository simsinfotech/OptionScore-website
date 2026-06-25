import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Academy | OptionScore",
  description:
    "OptionScore Academy — Learn institutional trading with live workshops, courses, and personal mentorship. Master order flow, CRT, and market structure across Indian equity, forex, gold & crypto.",
  openGraph: {
    title: "Trading Academy | OptionScore",
    description:
      "Learn institutional trading with live workshops, courses, and personal mentorship from OptionScore Academy.",
    url: "https://optionscore.app/academy",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Academy | OptionScore",
    description:
      "Learn institutional trading with live workshops, courses, and personal mentorship from OptionScore Academy.",
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
