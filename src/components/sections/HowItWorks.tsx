"use client";

import { STEPS } from "@/lib/constants";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="heading text-3xl md:text-4xl text-text-primary mb-4">
            How It <span className="text-accent-cyan">Works</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Get started in three simple steps.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <AnimatedSection key={step.step} delay={index * 0.15}>
              <div className="text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-accent-cyan text-accent-cyan text-2xl font-bold mb-6">
                  {step.step}
                </div>

                <h3 className="heading text-lg text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Phone frame placeholder */}
                <div className="mt-8 mx-auto w-40 h-72 border border-card-border bg-card/50 flex items-center justify-center">
                  <span className="text-text-muted text-xs uppercase tracking-heading">
                    Screenshot
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
