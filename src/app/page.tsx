"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MarketTicker } from "@/components/ui/MarketTicker";
import { Hero } from "@/components/sections/Hero";

// Lazy load below-fold sections to defer framer-motion bundle
const Features = dynamic(() => import("@/components/sections/Features").then(m => ({ default: m.Features })), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(m => ({ default: m.HowItWorks })), { ssr: true });
const Pricing = dynamic(() => import("@/components/sections/Pricing").then(m => ({ default: m.Pricing })), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })), { ssr: true });
const Academics = dynamic(() => import("@/components/sections/Academics").then(m => ({ default: m.Academics })), { ssr: true });
const About = dynamic(() => import("@/components/sections/About").then(m => ({ default: m.About })), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })), { ssr: true });
const Privacy = dynamic(() => import("@/components/sections/Privacy").then(m => ({ default: m.Privacy })), { ssr: true });
const CTA = dynamic(() => import("@/components/sections/CTA").then(m => ({ default: m.CTA })), { ssr: true });

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
