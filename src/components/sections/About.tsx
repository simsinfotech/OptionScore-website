"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiUsers, HiStar, HiChartBar, HiClock } from "react-icons/hi2";
import { HiLockClosed, HiGift, HiCurrencyDollar, HiXCircle } from "react-icons/hi2";

const STATS = [
  { value: "10K+", label: "Active Traders", icon: HiUsers, color: "cyan" },
  { value: "4.8", label: "App Rating", icon: HiStar, color: "violet" },
  { value: "50+", label: "Instruments", icon: HiChartBar, color: "lime" },
  { value: "99.9%", label: "Uptime", icon: HiClock, color: "cyan" },
];

const TRUST_BADGES = [
  { icon: HiLockClosed, label: "AES-256 Encrypted" },
  { icon: HiGift, label: "7-Day Free Trial" },
  { icon: HiCurrencyDollar, label: "No Hidden Fees" },
  { icon: HiXCircle, label: "Cancel Anytime" },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6 section-mesh-cyan relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="section-chip">About Us</span>
          <h2 className="font-bold uppercase tracking-normaltext-3xl md:text-4xl text-text-primary mb-4">
            About <span className="gradient-text-cyan-violet">OptionScore</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Built by traders, for traders. Institutional-grade analysis made accessible.
          </p>
        </AnimatedSection>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <AnimatedSection delay={0.1}>
            <div>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                OptionScore was built by traders, for traders. We believe that
                everyone deserves access to institutional-grade market analysis —
                without the complexity or the price tag.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Our AI engine processes millions of data points in real-time,
                distilling complex market dynamics into a single, actionable score.
                No noise. No guesswork. Just clarity.
              </p>
              <p className="text-text-muted text-base">
                Based in the United States. Trusted by thousands of active traders
                worldwide.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats grid */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                const iconBg = stat.color === "cyan" ? "icon-bg-cyan" : stat.color === "violet" ? "icon-bg-violet" : "icon-bg-lime";
                const textColor = stat.color === "cyan" ? "text-accent-cyan" : stat.color === "violet" ? "text-accent-violet" : "text-accent-lime";
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4, boxShadow: "0 0 20px rgba(11,177,88,0.15)" }}
                    transition={{ duration: 0.3 }}
                    className="glass p-5 text-center cursor-pointer"
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 ${iconBg} mb-3`}>
                      <Icon className={`text-xl ${textColor}`} />
                    </div>
                    <div className={`text-2xl font-bold ${textColor} mb-1`}>{stat.value}</div>
                    <div className="text-text-muted text-xs uppercase tracking-normal">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Trust badges */}
        <AnimatedSection delay={0.3} className="mt-16">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-6">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-3 py-2 glass text-text-secondary text-xs sm:text-sm"
                >
                  <Icon className="text-accent-cyan text-base flex-shrink-0" />
                  {badge.label}
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
