"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiChartBar } from "react-icons/hi2";
import { RiBrainFill } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { FiLink } from "react-icons/fi";

const FEATURE_ICONS = [
  HiChartBar,
  RiBrainFill,
  BsLightningChargeFill,
  HiUsers,
  FiLink,
];

const ICON_COLORS = [
  { bg: "icon-bg-cyan", text: "text-accent-cyan", accent: "bg-accent-cyan" },
  { bg: "icon-bg-violet", text: "text-accent-violet", accent: "bg-accent-violet" },
  { bg: "icon-bg-lime", text: "text-accent-lime", accent: "bg-accent-lime" },
  { bg: "icon-bg-cyan", text: "text-accent-cyan", accent: "bg-accent-cyan" },
  { bg: "icon-bg-violet", text: "text-accent-violet", accent: "bg-accent-violet" },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden section-mesh-cyan">
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="section-chip">Platform Features</span>
          <h2 className="font-bold uppercase tracking-normaltext-3xl md:text-4xl text-text-primary mb-4">
            Powerful <span className="gradient-text-cyan-violet">Features</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Everything you need to analyze markets and execute trades with
            confidence.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[index];
            const color = ICON_COLORS[index];
            const cardVariant = index % 2 === 0 ? "gradient-border" as const : "glass" as const;
            return (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <Card className="h-full group relative overflow-hidden" variant={cardVariant}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`inline-flex items-center justify-center w-12 h-12 ${color.bg} mb-4`}
                  >
                    <Icon className={`text-2xl ${color.text}`} />
                  </motion.div>
                  <h3 className="font-bold uppercase tracking-normaltext-lg text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  {/* Colored bottom accent line on hover */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${color.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </Card>
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
