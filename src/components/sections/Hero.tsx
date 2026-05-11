"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="download"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading text-4xl md:text-6xl lg:text-7xl text-text-primary mb-6 glow-text"
        >
          Trade Smarter
          <br />
          <span className="text-accent-cyan">With AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Real-time market scoring, AI-driven insights, and professional trading
          tools — all in one powerful mobile app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" href={APP_STORE_URL}>
            App Store
          </Button>
          <Button size="lg" variant="secondary" href={PLAY_STORE_URL}>
            Google Play
          </Button>
        </motion.div>

        {/* Phone mockup placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 mx-auto w-64 h-[500px] border-2 border-accent-cyan/30 bg-card/50 flex items-center justify-center"
        >
          <span className="text-text-muted text-sm uppercase tracking-heading">
            App Preview
          </span>
        </motion.div>
      </div>
    </section>
  );
}
