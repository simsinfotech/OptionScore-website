"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiLockClosed, HiGift, HiCurrencyDollar, HiXCircle } from "react-icons/hi2";
import Image from "next/image";

const TRUST_BADGES = [
  { icon: HiLockClosed, label: "AES-256 Encrypted" },
  { icon: HiGift, label: "7-Day Free Trial (iOS)" },
  { icon: HiCurrencyDollar, label: "No Hidden Fees" },
  { icon: HiXCircle, label: "Cancel Anytime" },
];

/**
 * Founder bio card + trust badges. Shared by the homepage About section and the
 * Academy page so the copy stays in one place. Render inside a section/container.
 */
export function FounderProfile() {
  return (
    <>
      {/* Founder Section — centered circular photo */}
      <AnimatedSection delay={0.3} className="mb-16">
        <div className="glass p-8 md:p-12">
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-bold uppercase tracking-normal text-xl text-text-primary mb-6 text-center">
              About the <span className="text-[#0BB158]">Founder</span>
            </h3>
            <div className="relative mb-4">
              <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden border-2 border-accent-cyan/30 rounded-full">
                <Image
                  src="/founder.jpg"
                  alt="Shamique Hussain - Founder of OptionScore"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-cyan text-background text-xs font-bold uppercase tracking-normal">
                Founder
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-text-primary mb-1 mt-4">
              Shamique Hussain
            </p>
            <p className="text-accent-cyan text-sm font-semibold">
              Founder & CEO, OptionScore
            </p>
          </div>
          <p className="text-text-secondary text-base leading-relaxed mb-4 max-w-4xl mx-auto text-center">
            Shamique Hussain is the visionary behind OptionScore — with over{" "}
            <span className="text-accent-cyan font-semibold">15 years of experience</span> in trading and technology. Driven by
            the belief that every Indian trader deserves access to
            institutional-grade market intelligence, he built OptionScore to
            bridge the gap between complex market data and actionable insights.
          </p>
          <p className="text-text-secondary text-base leading-relaxed max-w-4xl mx-auto text-center">
            His mission is simple: empower traders with AI-driven tools that
            cut through the noise and deliver clarity — making smarter
            trading decisions accessible to everyone.
          </p>
        </div>
      </AnimatedSection>

      {/* Trust badges */}
      <AnimatedSection delay={0.4} className="mt-16">
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
    </>
  );
}
