"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiArrowDownTray, HiChartBarSquare, HiRocketLaunch } from "react-icons/hi2";

const STEPS = [
  {
    step: 1,
    title: "Download & Connect",
    description:
      "Get OptionScore from the App Store or Google Play and link your brokerage account in under 60 seconds.",
    icon: HiArrowDownTray,
    stat: "60s",
    statLabel: "Setup Time",
  },
  {
    step: 2,
    title: "Get Your Score",
    description:
      "Our AI analyzes the market in real-time and delivers a clear score so you know exactly when to trade.",
    icon: HiChartBarSquare,
    stat: "0–100",
    statLabel: "Market Score",
  },
  {
    step: 3,
    title: "Trade With Confidence",
    description:
      "Execute trades backed by data-driven insights and track your performance over time.",
    icon: HiRocketLaunch,
    stat: "24/7",
    statLabel: "AI Monitoring",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-card/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/3 blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <h2 className="heading text-3xl md:text-4xl text-text-primary mb-4">
            How It <span className="text-accent-cyan">Works</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Get started in three simple steps.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[1px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="w-full h-full origin-left"
              style={{
                background: "linear-gradient(90deg, rgba(0,188,212,0.1), rgba(0,188,212,0.4), rgba(0,188,212,0.1))",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.step} delay={index * 0.2}>
                  <motion.div
                    whileHover={{
                      y: -8,
                      boxShadow: "0 0 40px rgba(0,188,212,0.15), 0 20px 40px rgba(0,0,0,0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative text-center border border-card-border bg-card/80 backdrop-blur-sm p-8 cursor-pointer group"
                  >
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-accent-cyan text-background text-sm font-bold flex items-center justify-center"
                      >
                        {step.step}
                      </motion.div>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-flex items-center justify-center w-16 h-16 border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan text-3xl mb-6 mt-4 group-hover:border-accent-cyan/50 transition-colors duration-300"
                    >
                      <Icon />
                    </motion.div>

                    {/* Title */}
                    <h3 className="heading text-base text-text-primary mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Stat highlight */}
                    <div className="border-t border-card-border pt-4">
                      <div className="text-2xl font-bold text-accent-cyan glow-text">
                        {step.stat}
                      </div>
                      <div className="text-xs text-text-muted uppercase tracking-heading mt-1">
                        {step.statLabel}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan/0 group-hover:bg-accent-cyan transition-all duration-500"
                    />
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
