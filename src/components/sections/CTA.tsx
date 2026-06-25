"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

const STATS = [
  { value: "10K+", label: "Traders" },
  { value: "4.8★", label: "Rating" },
  { value: "7 Day", label: "Free Trial (iOS)" },
];

export function CTA() {
  return (
    <section className="relative overflow-hidden section-mesh-cyan">
      {/* Divider at top */}
      <div className="divider-gradient" />

      <div className="py-24 px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl lg:max-w-none lg:px-14 mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-bold tracking-normal text-3xl md:text-5xl text-text-primary mb-6">
              Ready to Trade
              <br />
              <span className="text-[#0BB158]">Smarter?</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Join thousands of traders using AI-powered insights to make better
              decisions every day.
            </p>
          </AnimatedSection>

          {/* Stats strip */}
          <AnimatedSection delay={0.15}>
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-accent-cyan">{stat.value}</div>
                  <div className="text-xs text-text-muted uppercase tracking-normal">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
              <Button size="lg" variant="gradient" href={APP_STORE_URL} className="w-full sm:w-auto">
                <FaApple className="mr-2 text-xl" />
                App Store
              </Button>
              <Button size="lg" variant="secondary" href={PLAY_STORE_URL} className="w-full sm:w-auto">
                <FaGooglePlay className="mr-2 text-lg" />
                Google Play
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
