import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
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
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head />
      <body className="font-sans antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
