"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiLockClosed, HiShieldCheck, HiEye, HiDocumentText } from "react-icons/hi2";

const PRIVACY_POINTS = [
  {
    title: "Your Data, Your Control",
    description:
      "We never sell your personal information to third parties. You can export or delete your data at any time.",
    icon: HiEye,
    color: "cyan",
  },
  {
    title: "Bank-Level Encryption",
    description:
      "All data is encrypted in transit and at rest using AES-256. Brokerage credentials are never stored on our servers.",
    icon: HiLockClosed,
    color: "violet",
  },
  {
    title: "Minimal Collection",
    description:
      "We only collect what's necessary to deliver your scores and insights. No unnecessary tracking or profiling.",
    icon: HiShieldCheck,
    color: "lime",
  },
  {
    title: "Transparent Practices",
    description:
      "Our privacy policy is written in plain language. No legal jargon, no hidden clauses.",
    icon: HiDocumentText,
    color: "cyan",
  },
];

export function Privacy() {
  return (
    <section id="privacy" className="py-24 px-6 section-mesh-alt relative overflow-hidden">
      <div className="max-w-5xl lg:max-w-none lg:px-14 mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="section-chip">Trust & Security</span>
          <h2 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            Your <span className="gradient-text-cyan-violet">Privacy</span> Matters
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We built OptionScore with privacy as a core principle — not an
            afterthought.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIVACY_POINTS.map((point, index) => {
            const Icon = point.icon;
            const iconBg = point.color === "cyan" ? "icon-bg-cyan" : point.color === "violet" ? "icon-bg-violet" : "icon-bg-lime";
            const textColor = point.color === "cyan" ? "text-accent-cyan" : point.color === "violet" ? "text-accent-violet" : "text-accent-lime";
            const accentBg = point.color === "cyan" ? "bg-accent-cyan" : point.color === "violet" ? "bg-accent-violet" : "bg-accent-lime";
            return (
              <AnimatedSection key={point.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: "0 0 20px rgba(11,177,88,0.1), 0 10px 30px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="glass p-6 h-full cursor-pointer group relative overflow-hidden"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 ${iconBg} mb-4`}>
                    <Icon className={`text-xl ${textColor}`} />
                  </div>
                  <h3 className="font-bold uppercase tracking-normal text-base text-text-primary mb-3">
                    {point.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {point.description}
                  </p>
                  {/* Accent line on hover */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.4} className="mt-10 text-center">
          <p className="text-text-muted text-sm">
            Want to delete your account and all associated data?{" "}
            <a
              href="/account-deletion"
              className="text-accent-cyan hover:underline"
            >
              Request account deletion
            </a>
          </p>
        </AnimatedSection>
      </div>

      {/* Shimmer divider at bottom */}
      <div className="divider-shimmer mt-24" />
    </section>
  );
}
