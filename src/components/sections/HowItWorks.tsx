"use client";

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
    <section id="how-it-works" className="py-24 px-6 section-mesh-alt relative overflow-hidden">
      <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <h2 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            How It <span className="text-[#0BB158]">Works</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Get started in three simple steps.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[1px]"
            style={{
              background: "linear-gradient(90deg, rgba(11,177,88,0.1), rgba(11,177,88,0.4), rgba(11,177,88,0.1))",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.step} delay={index * 0.2} className="h-full">
                  <div
                    className="relative text-center glass p-8 group h-full flex flex-col items-center hover:-translate-y-1 transition-transform duration-300"
                  >
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div
                        className="w-8 h-8 bg-[#0BB158] text-background text-sm font-bold flex items-center justify-center"
                      >
                        {step.step}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 icon-bg-cyan text-accent-cyan text-3xl mb-6 mt-4"
                    >
                      <Icon />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold uppercase tracking-normal text-base text-text-primary mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                      {step.description}
                    </p>

                    {/* Stat highlight */}
                    <div className="border-t border-card-border pt-4 mt-auto w-full">
                      <div className="text-2xl font-bold text-[#0BB158]">
                        {step.stat}
                      </div>
                      <div className="text-xs text-text-muted uppercase tracking-normal mt-1">
                        {step.statLabel}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0BB158] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider at bottom */}
      <div className="divider-gradient mt-24" />
    </section>
  );
}
