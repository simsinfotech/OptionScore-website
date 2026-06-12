"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MarketTicker } from "@/components/ui/MarketTicker";

import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Academics } from "@/components/sections/Academics";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Privacy } from "@/components/sections/Privacy";
import { CTA } from "@/components/sections/CTA";

function SectionGlow({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, rgba(11,177,88,0.55) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(11,177,88,0.55) 0%, transparent 50%)
          `,
        }}
      />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <MarketTicker />
      <main className="relative z-[1]">
        <SectionGlow><Hero /></SectionGlow>
        <SectionGlow><Features /></SectionGlow>
        <SectionGlow><HowItWorks /></SectionGlow>
        <SectionGlow><Pricing /></SectionGlow>
        <SectionGlow><Testimonials /></SectionGlow>
        <SectionGlow><Academics /></SectionGlow>
        <SectionGlow><About /></SectionGlow>
        <SectionGlow><FAQ /></SectionGlow>
        <SectionGlow><Privacy /></SectionGlow>
        <SectionGlow><CTA /></SectionGlow>
      </main>
      <div className="relative z-[1]">
        <SectionGlow><Footer /></SectionGlow>
      </div>
    </div>
  );
}
