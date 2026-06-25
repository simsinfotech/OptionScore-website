"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiUsers, HiStar, HiChartBar, HiClock } from "react-icons/hi2";
import { FounderProfile } from "@/components/sections/FounderProfile";

const STATS = [
  { value: "10K+", label: "Active Traders", icon: HiUsers, color: "cyan" },
  { value: "4.8", label: "App Rating", icon: HiStar, color: "violet" },
  { value: "50+", label: "Instruments", icon: HiChartBar, color: "lime" },
  { value: "99.9%", label: "Uptime", icon: HiClock, color: "cyan" },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6 section-mesh-cyan relative overflow-hidden">
      <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            About <span className="text-[#0BB158]">OptionScore</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Built by traders, for traders. Institutional-grade analysis made accessible.
          </p>
        </AnimatedSection>

        {/* About Company */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection delay={0.1}>
            <div>
              <h3 className="font-bold uppercase tracking-normal text-xl text-text-primary mb-4">
                The <span className="text-[#0BB158]">Company</span>
              </h3>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                OptionScore is an Indian trading technology company on a mission to
                democratize institutional-grade market analysis. We believe every
                trader — from beginners to professionals — deserves powerful tools
                without the complexity or the price tag.
              </p>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                Our AI engine processes millions of data points in real-time,
                distilling complex market dynamics into a single, actionable score.
                No noise. No guesswork. Just clarity.
              </p>
              <p className="text-text-muted text-base">
                Based in India. Trusted by thousands of active traders across the country.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats grid */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                const iconBg = stat.color === "cyan" ? "icon-bg-cyan" : stat.color === "violet" ? "icon-bg-violet" : "icon-bg-lime";
                const textColor = stat.color === "cyan" ? "text-accent-cyan" : stat.color === "violet" ? "text-accent-violet" : "text-accent-lime";
                return (
                  <div
                    key={stat.label}
                    className="glass p-5 text-center hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 ${iconBg} mb-3`}>
                      <Icon className={`text-xl ${textColor}`} />
                    </div>
                    <div className={`text-2xl font-bold ${textColor} mb-1`}>{stat.value}</div>
                    <div className="text-text-muted text-xs uppercase tracking-normal">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Founder bio + trust badges (shared with the Academy page) */}
        <FounderProfile />
      </div>
    </section>
  );
}
