"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { Privacy } from "@/components/sections/Privacy";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Global background effects */}
        <div className="bg-effects" aria-hidden="true">
          {/* Floating particles */}
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />
          <div className="particle particle-5" />
          <div className="particle particle-6" />
          {/* Aurora blobs */}
          <div className="aurora aurora-cyan" />
          <div className="aurora aurora-violet" />
          <div className="aurora aurora-lime" />
        </div>
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <About />
        <Privacy />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
