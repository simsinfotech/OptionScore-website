"use client";

import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

export function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[800px] h-[400px] bg-accent-cyan blur-[100px]" />
      </motion.div>

      {/* Secondary glow */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2"
      >
        <div className="w-[400px] h-[400px] bg-accent-lime blur-[120px]" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="heading text-3xl md:text-5xl text-text-primary mb-6 glow-text">
            Ready to Trade
            <br />
            <span className="text-accent-cyan">Smarter?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Join thousands of traders using AI-powered insights to make better
            decisions every day.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" href={APP_STORE_URL} className="animate-pulse-glow">
                <FaApple className="mr-2 text-xl" />
                App Store
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="secondary" href={PLAY_STORE_URL}>
                <FaGooglePlay className="mr-2 text-lg" />
                Google Play
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
