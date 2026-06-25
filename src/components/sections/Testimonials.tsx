"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiStar } from "react-icons/hi2";

const TESTIMONIALS = [
  {
    quote:
      "I used to spend hours reading charts before market open. Now I check OptionScore's market score, pick my setups, and I'm done in 15 minutes.",
    author: "Rajesh M.",
    role: "Options Trader, Mumbai",
    stars: 5,
  },
  {
    quote:
      "The options chain view with Greeks is what sold me. I was paying ₹2,500/month for a desktop terminal that did the same thing.",
    author: "Priya S.",
    role: "Swing Trader, Bangalore",
    stars: 4,
  },
  {
    quote:
      "Finally an app that doesn't just throw buy/sell signals. The scoring helps me stay out of bad trades, which is half the battle.",
    author: "Amit K.",
    role: "F&O Trader, Delhi",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 relative overflow-hidden section-mesh-alt">
      <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            Trusted by{" "}
            <span className="text-[#0BB158]">Traders</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Hear from traders who use OptionScore every day.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <AnimatedSection key={t.author} delay={index * 0.15} className="flex">
              <div
                className="glass p-6 flex flex-col w-full hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <HiStar key={i} className="text-accent-cyan text-lg" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="divider-gradient mb-4" />
                <div>
                  <div className="text-text-primary font-semibold text-sm">
                    {t.author}
                  </div>
                  <div className="text-text-muted text-xs uppercase tracking-wider">
                    {t.role}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <div className="divider-gradient mt-24" />
    </section>
  );
}
