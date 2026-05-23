"use client";

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

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="heading text-3xl md:text-4xl text-text-primary mb-4">
            Powerful <span className="text-accent-cyan">Features</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Everything you need to analyze markets and execute trades with
            confidence.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[index];
            return (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <Card className="h-full">
                  <div className="text-accent-cyan text-3xl mb-4">
                    <Icon />
                  </div>
                  <h3 className="heading text-lg text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
