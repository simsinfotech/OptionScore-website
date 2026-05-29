"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Academics } from "@/components/sections/Academics";
import { About } from "@/components/sections/About";
import { Privacy } from "@/components/sections/Privacy";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="relative">
      {/* Starfield background — covers entire page */}
      <div className="starfield" aria-hidden="true">
        {/* Star layers at different depths */}
        <div className="stars stars-small" />
        <div className="stars stars-medium" />
        <div className="stars stars-large" />
        {/* Nebula clouds */}
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
        {/* Shooting stars */}
        <div className="shooting-star shooting-star-1" />
        <div className="shooting-star shooting-star-2" />
        <div className="shooting-star shooting-star-3" />
      </div>
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Academics />
        <About />
        <Privacy />
        <CTA />
      </main>
      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
}
