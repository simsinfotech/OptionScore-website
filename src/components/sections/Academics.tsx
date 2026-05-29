"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Academics() {
  return (
    <section id="academics" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="section-chip">Learn</span>
          <h2 className="font-bold uppercase tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            <span className="gradient-text-cyan-violet">Academics</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Learn trading concepts, strategies, and market analysis to sharpen your edge.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
