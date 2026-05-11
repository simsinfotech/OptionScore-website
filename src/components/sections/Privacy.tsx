"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

const PRIVACY_POINTS = [
  {
    title: "Your Data, Your Control",
    description:
      "We never sell your personal information to third parties. You can export or delete your data at any time.",
  },
  {
    title: "Bank-Level Encryption",
    description:
      "All data is encrypted in transit and at rest using AES-256. Brokerage credentials are never stored on our servers.",
  },
  {
    title: "Minimal Collection",
    description:
      "We only collect what's necessary to deliver your scores and insights. No unnecessary tracking or profiling.",
  },
  {
    title: "Transparent Practices",
    description:
      "Our privacy policy is written in plain language. No legal jargon, no hidden clauses.",
  },
];

export function Privacy() {
  return (
    <section id="privacy" className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="heading text-3xl md:text-4xl text-text-primary mb-4">
            Your <span className="text-accent-cyan">Privacy</span> Matters
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We built OptionScore with privacy as a core principle — not an
            afterthought.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIVACY_POINTS.map((point, index) => (
            <AnimatedSection key={point.title} delay={index * 0.1}>
              <div className="border border-card-border bg-card p-6 h-full transition-all duration-300 hover:border-accent-cyan/40">
                <h3 className="heading text-base text-text-primary mb-3">
                  {point.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-10 text-center">
          <p className="text-text-muted text-sm">
            Want to delete your account and all associated data?{" "}
            <a
              href="/account-deletion"
              className="text-accent-cyan hover:underline"
            >
              Request account deletion
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
