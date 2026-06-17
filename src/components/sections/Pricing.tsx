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
      <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="section-chip">Transparent Pricing</span>
          <h2 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            Choose Your <span className="gradient-text-violet-lime">Plan</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include core market
            analysis features.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 text-sm font-semibold uppercase tracking-normal transition-all duration-300 ${
                !annual
                  ? "bg-accent-cyan text-background shadow-[0_0_20px_rgba(11,177,88,0.3)]"
                  : "bg-card border border-card-border text-text-muted hover:text-text-primary hover:border-accent-cyan/40"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 text-sm font-semibold uppercase tracking-normal transition-all duration-300 relative ${
                annual
                  ? "bg-accent-cyan text-background shadow-[0_0_20px_rgba(11,177,88,0.3)]"
                  : "bg-card border border-card-border text-text-muted hover:text-text-primary hover:border-accent-cyan/40"
              }`}
            >
              Annual
              {annual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2.5 -right-3 text-[10px] font-bold text-background bg-accent-lime px-1.5 py-0.5 rounded-sm"
                >
                  -20%
                </motion.span>
              )}
            </button>
          </div>
        </AnimatedSection>

        {/* 7-day free trial banner */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-accent-lime/30 bg-accent-lime/5 text-accent-lime text-sm font-semibold badge-shimmer">
              <HiStar className="text-base" />
              7-Day Free Trial on All Plans (iOS only)
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
                  className={`relative p-6 cursor-pointer flex flex-col w-full ${
                    isPopular
                      ? "grad-border-card"
                      : isBest
                      ? "grad-border-static"
                      : "grad-border-static"
                  }`}
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
                    7 days free trial (iOS only)
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

      </div>

      {/* Shimmer divider at bottom */}
      <div className="divider-shimmer mt-24" />
    </section>
  );
}
