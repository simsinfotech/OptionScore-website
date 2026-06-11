"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiStar } from "react-icons/hi2";

const TESTIMONIALS = [
  {
    quote:
      "OptionScore completely changed how I approach the market. The scoring system gives me confidence in every trade I make.",
    author: "Rajesh M.",
    role: "Options Trader",
    stars: 5,
  },
  {
    quote:
      "The AI scoring is incredibly accurate. I've seen a noticeable improvement in my win rate since I started using it.",
    author: "Priya S.",
    role: "Swing Trader",
    stars: 5,
  },
  {
    quote:
      "Best trading app I've used in years. The real-time alerts and options chain analysis are game-changers.",
    author: "Amit K.",
    role: "Day Trader",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 relative overflow-hidden section-mesh-alt">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="section-chip">What Traders Say</span>
          <h2 className="font-bold uppercase tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            Trusted by{" "}
            <span className="gradient-text-cyan-violet">Traders</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Thousands of traders trust OptionScore for smarter, data-driven
            decisions every day.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <AnimatedSection key={t.author} delay={index * 0.15} className="flex">
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 0 30px rgba(11,177,88,0.15), 0 20px 40px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 flex flex-col w-full cursor-pointer card-hover-gradient"
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
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <div className="divider-shimmer mt-24" />
    </section>
  );
}
