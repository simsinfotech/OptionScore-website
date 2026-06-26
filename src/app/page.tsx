import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MarketTicker } from "@/components/ui/MarketTicker";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";

const Pricing = dynamic(() => import("@/components/sections/Pricing").then(m => ({ default: m.Pricing })));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const Academics = dynamic(() => import("@/components/sections/Academics").then(m => ({ default: m.Academics })));
const About = dynamic(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })));
const Privacy = dynamic(() => import("@/components/sections/Privacy").then(m => ({ default: m.Privacy })));
const CTA = dynamic(() => import("@/components/sections/CTA").then(m => ({ default: m.CTA })));

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
