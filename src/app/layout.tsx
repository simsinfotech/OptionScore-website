import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <head />
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
