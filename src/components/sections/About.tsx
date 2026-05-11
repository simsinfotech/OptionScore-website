"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="heading text-3xl md:text-4xl text-text-primary mb-6">
            About <span className="text-accent-cyan">OptionScore</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            OptionScore was built by traders, for traders. We believe that
            everyone deserves access to institutional-grade market analysis —
            without the complexity or the price tag.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            Our AI engine processes millions of data points in real-time,
            distilling complex market dynamics into a single, actionable score.
            No noise. No guesswork. Just clarity.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="text-text-muted text-base">
            Based in the United States. Trusted by thousands of active traders
            worldwide.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
