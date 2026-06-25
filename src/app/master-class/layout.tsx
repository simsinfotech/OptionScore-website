import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Class | OptionScore Academy",
  description:
    "Join the OptionScore Live Online Masterclass — an interactive 90-minute session on institutional trading concepts. Limited seats available.",
  openGraph: {
    title: "Master Class | OptionScore Academy",
    description:
      "Live Online Masterclass — 90 minutes of interactive institutional trading education from OptionScore Academy.",
    url: "https://optionscore.app/master-class",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Class | OptionScore Academy",
    description:
      "Live Online Masterclass — 90 minutes of interactive institutional trading education from OptionScore Academy.",
  },
};

export default function MasterClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
