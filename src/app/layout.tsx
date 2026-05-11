import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://optionscore.app"),
  title: "OptionScore — AI-Powered Trading Analysis",
  description:
    "Get real-time market scoring, AI-driven insights, and professional trading tools in one powerful mobile app.",
  openGraph: {
    title: "OptionScore — AI-Powered Trading Analysis",
    description:
      "Get real-time market scoring, AI-driven insights, and professional trading tools in one powerful mobile app.",
    type: "website",
    url: "https://optionscore.app",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OptionScore — AI-Powered Trading Analysis",
    description:
      "Get real-time market scoring, AI-driven insights, and professional trading tools in one powerful mobile app.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="font-urbanist antialiased">{children}</body>
    </html>
  );
}
