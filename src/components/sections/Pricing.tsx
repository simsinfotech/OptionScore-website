"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { getStoreUrl } from "@/lib/constants";
import { HiCheck } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";

const PLANS = [
  {
    name: "Starter",
    badge: null,
    monthlyPrice: "₹299",
    annualPrice: "₹2,999",
    features: [
      "Full Command Center",
      "Score Engine (all instruments)",
      "Recommended F&O Setups",
      "Full Options Chain + Greeks",
      "ScoreAI (25 queries/day)",
    ],
  },
  {
    name: "Intermediate",
    badge: "POPULAR",
    monthlyPrice: "₹699",
    annualPrice: "₹6,799",
    features: [
      "Everything in Starter",
      "Alpha Stocks Zones",
      "Live Zone Alerts",
      "ScoreAI (unlimited)",
      "Real-time Score Engine",
      "Custom Watchlists",
    ],
  },
  {
    name: "Pro",
    badge: "BEST VALUE",
    monthlyPrice: "₹1,499",
    annualPrice: "₹14,999",
    features: [
      "Everything in Intermediate",
      "Smart Money & Dealer Flow",
      "Backtested Performance",
      "Advanced Options Strategies",
      "Custom Alerts",
      "Priority Data Refresh",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden section-mesh-violet">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="section-chip">Transparent Pricing</span>
          <h2 className="font-bold uppercase tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            Choose Your <span className="gradient-text-violet-lime">Plan</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include core market
            analysis features.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4">
            <span
              className={`text-sm uppercase tracking-normal transition-colors ${
                !annual ? "text-text-primary" : "text-text-muted"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-7 border border-accent-cyan/40 bg-card transition-colors"
              aria-label="Toggle billing period"
            >
              <motion.div
                animate={{ x: annual ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-[3px] w-5 h-5 bg-accent-cyan"
              />
            </button>
            <span
              className={`text-sm uppercase tracking-normal transition-colors ${
                annual ? "text-text-primary" : "text-text-muted"
              }`}
            >
              Annual
            </span>
            {annual && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-accent-lime bg-accent-lime/10 border border-accent-lime/30 px-2 py-1"
              >
                SAVE 20%
              </motion.span>
            )}
          </div>
        </AnimatedSection>

        {/* 7-day free trial banner */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-accent-lime/30 bg-accent-lime/5 text-accent-lime text-sm font-semibold badge-shimmer">
              <HiStar className="text-base" />
              7-Day Free Trial on All Plans
              <HiStar className="text-base" />
            </span>
          </div>
        </AnimatedSection>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, index) => {
            const isPopular = plan.badge === "POPULAR";
            const isBest = plan.badge === "BEST VALUE";

            return (
              <AnimatedSection key={plan.name} delay={index * 0.15} className="flex">
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: isPopular
                      ? "0 0 50px rgba(11,177,88,0.25), 0 0 30px rgba(11,177,88,0.15), 0 20px 40px rgba(0,0,0,0.3)"
                      : "0 0 30px rgba(11,177,88,0.15), 0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative p-6 cursor-pointer flex flex-col w-full border border-[rgba(11,177,88,0.2)] hover:border-[rgba(11,177,88,0.4)] transition-colors duration-300"
                  style={{
                    background: "linear-gradient(145deg, rgba(11,177,88,0.1) 0%, #050505 50%, rgba(11,177,88,0.06) 100%)",
                  }}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-normal flex items-center gap-1 badge-shimmer ${
                        isPopular
                          ? "bg-accent-cyan text-background"
                          : "bg-accent-lime text-background"
                      }`}
                    >
                      {isBest && <HiStar className="text-sm" />}
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className="font-bold uppercase tracking-normal text-xl text-text-primary mb-2 mt-2 text-center">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-1">
                    <span className="text-3xl font-bold text-text-primary">
                      {annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-text-muted text-sm ml-1">
                      /{annual ? "year" : "month"}
                    </span>
                  </div>

                  {/* Free trial note */}
                  <p className="text-center text-xs text-accent-lime mb-2">
                    7 days free trial
                  </p>

                  {/* Divider */}
                  <div className="divider-gradient my-4" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-text-secondary"
                      >
                        <HiCheck className="text-accent-cyan mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    size="md"
                    variant={isPopular ? "gradient" : "secondary"}
                    onClick={() => { window.location.href = getStoreUrl(); }}
                    className="w-full mt-auto"
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Credits info */}
        <AnimatedSection delay={0.5} className="mt-16">
          <div className="glass p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold uppercase tracking-normal text-base text-text-primary mb-4">
                  Credit-Based <span className="gradient-text-cyan-violet">AI Features</span>
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  AI-powered features like ScoreAI, Heatmaps, and Market Analysis
                  use credits. All users receive <span className="text-text-primary font-semibold">100 free credits/month</span> to
                  get started.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="glass p-3 text-center">
                    <div className="text-accent-cyan font-bold">1 credit</div>
                    <div className="text-text-muted text-xs mt-1">ScoreAI Chat</div>
                  </div>
                  <div className="glass p-3 text-center">
                    <div className="text-accent-cyan font-bold">1 credit</div>
                    <div className="text-text-muted text-xs mt-1">Market Heatmap</div>
                  </div>
                  <div className="glass p-3 text-center">
                    <div className="text-accent-violet font-bold">2 credits</div>
                    <div className="text-text-muted text-xs mt-1">Image Analysis</div>
                  </div>
                  <div className="glass p-3 text-center">
                    <div className="text-accent-lime font-bold">FREE</div>
                    <div className="text-text-muted text-xs mt-1">Trade Journal</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold uppercase tracking-normal text-base text-text-primary mb-4">
                  Partner <span className="gradient-text-cyan-lime">Commission</span>
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Earn recurring monthly commissions + first-month bonuses for every active client you refer.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between glass p-3">
                    <div>
                      <span className="text-text-primary text-sm font-semibold">Starter</span>
                      <span className="text-text-muted text-xs ml-2">1–5 clients</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-cyan text-sm font-bold">10%</span>
                      <span className="text-text-muted text-xs ml-1">recurring</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between glass p-3">
                    <div>
                      <span className="text-text-primary text-sm font-semibold">Bronze</span>
                      <span className="text-text-muted text-xs ml-2">6–15 clients</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-cyan text-sm font-bold">15%</span>
                      <span className="text-text-muted text-xs ml-1">+ 5% bonus</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between glass p-3">
                    <div>
                      <span className="text-text-primary text-sm font-semibold">Silver</span>
                      <span className="text-text-muted text-xs ml-2">16–30 clients</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-cyan text-sm font-bold">20%</span>
                      <span className="text-text-muted text-xs ml-1">+ 10% bonus</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between glass p-3">
                    <div>
                      <span className="text-text-primary text-sm font-semibold">Gold</span>
                      <span className="text-text-muted text-xs ml-2">31–75 clients</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-cyan text-sm font-bold">25%</span>
                      <span className="text-text-muted text-xs ml-1">+ 15% bonus</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between glass p-3">
                    <div>
                      <span className="text-text-primary text-sm font-semibold">Platinum</span>
                      <span className="text-text-muted text-xs ml-2">76–150 clients</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-cyan text-sm font-bold">30%</span>
                      <span className="text-text-muted text-xs ml-1">+ 20% bonus</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border border-accent-lime/30 bg-accent-lime/5 p-3">
                    <div>
                      <span className="text-text-primary text-sm font-semibold">Diamond</span>
                      <span className="text-text-muted text-xs ml-2">150+ clients</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-lime text-sm font-bold">35%</span>
                      <span className="text-text-muted text-xs ml-1">+ 25% bonus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Shimmer divider at bottom */}
      <div className="divider-shimmer mt-24" />
    </section>
  );
}
