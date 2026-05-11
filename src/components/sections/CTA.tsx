"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

export function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-accent-cyan/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="heading text-3xl md:text-5xl text-text-primary mb-6 glow-text">
            Ready to Trade
            <br />
            <span className="text-accent-cyan">Smarter?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Join thousands of traders using AI-powered insights to make better
            decisions every day.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" href={APP_STORE_URL}>
              App Store
            </Button>
            <Button size="lg" variant="secondary" href={PLAY_STORE_URL}>
              Google Play
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
