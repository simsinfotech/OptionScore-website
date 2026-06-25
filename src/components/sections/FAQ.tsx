"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiChevronDown } from "react-icons/hi2";

const FAQ_ITEMS = [
  {
    question: "What is OptionScore?",
    answer:
      "OptionScore is a trading app that scores every stock and index from 0 to 100. It also gives you options chains with Greeks, F&O setup ideas, and alerts. Available on iOS and Android.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. We use AES-256 encryption for all data at rest and in transit. We never share your personal information or trading data with third parties. Your privacy is our top priority.",
  },
  {
    question: "Which brokers are supported?",
    answer:
      "OptionScore works independently of your broker. You can use it alongside any Indian broker like Zerodha, Groww, Angel One, Upstox, and more. We provide analysis and insights; you execute trades on your preferred platform.",
  },
  {
    question: "How does the scoring algorithm work?",
    answer:
      "The score is based on price action, volume, open interest, option Greeks, and institutional flow. All of these are combined into a single number from 0 to 100 for each instrument. A higher score means a stronger setup.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time with no hidden fees or penalties. Your access continues until the end of your current billing period.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Every plan comes with a 7-day free trial so you can explore all features risk-free. The free trial is available for iOS users only. No credit card required to start.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden section-mesh-violet">
      <div className="max-w-3xl lg:max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            Frequently Asked{" "}
            <span className="text-[#0BB158]">Questions</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about OptionScore.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.08}>
              <div className="glass overflow-hidden">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <span className="text-text-primary font-semibold text-sm md:text-base pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <HiChevronDown className="text-accent-cyan text-xl" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <div className="divider-gradient mb-4" />
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <div className="divider-gradient mt-24" />
    </section>
  );
}
