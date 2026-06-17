"use client";

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

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <MarketTicker />
      <main className="relative z-[1]">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <About />
        <Academics />
        <FAQ />
        <Privacy />
        <CTA />
      </main>
      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
}
