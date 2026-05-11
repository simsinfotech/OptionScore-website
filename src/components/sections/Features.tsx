"use client";

import { FEATURES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="heading text-3xl md:text-4xl text-text-primary mb-4">
            Powerful <span className="text-accent-cyan">Features</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Everything you need to analyze markets and execute trades with
            confidence.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1}>
              <Card className="h-full">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="heading text-lg text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
