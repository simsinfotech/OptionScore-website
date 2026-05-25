"use client";

import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";
import { HiUsers, HiStar, HiBolt } from "react-icons/hi2";

const TRUST_BADGES = [
  { icon: HiUsers, label: "10,000+ Traders" },
  { icon: HiStar, label: "4.8★ Rating" },
  { icon: HiBolt, label: "Real-Time AI" },
];

export function Hero() {
  return (
    <section
      id="download"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Animated cyan glow blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan blur-[120px] rounded-full"
      />

      {/* Violet glow blob */}
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-violet blur-[120px] rounded-full"
      />

      {/* Orbiting dots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
        <div className="orbit-dot">
          <div className="w-1 h-1 bg-accent-cyan/30 rounded-full" />
        </div>
        <div className="orbit-dot-reverse">
          <div className="w-1.5 h-1.5 bg-accent-cyan/20 rounded-full" />
        </div>
        {/* Additional violet orbit dot */}
        <div className="orbit-dot" style={{ animationDuration: "25s", animationDirection: "reverse" }}>
          <div className="w-1 h-1 bg-accent-violet/25 rounded-full" />
        </div>
      </div>

      {/* Scanning line */}
      <div className="scan-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading text-4xl md:text-6xl lg:text-7xl text-text-primary mb-6 glow-text"
        >
          Trade Smarter
          <br />
          <span className="gradient-text-cyan-violet">With AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 px-2"
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
          <Button size="lg" variant="gradient" href={APP_STORE_URL}>
            <FaApple className="mr-2 text-xl" />
            App Store
          </Button>
          <Button size="lg" variant="secondary" href={PLAY_STORE_URL}>
            <FaGooglePlay className="mr-2 text-lg" />
            Google Play
          </Button>
        </motion.div>

        {/* Trust badge strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-3 sm:gap-6 mt-8 flex-wrap"
        >
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-center gap-1.5 text-text-muted text-xs">
                <Icon className="text-accent-cyan text-sm" />
                {badge.label}
              </div>
            );
          })}
        </motion.div>

        {/* Three-phone mockup layout */}
        <div className="mt-12 md:mt-20 flex items-end justify-center gap-3 sm:gap-6 md:gap-10">
          {/* Left phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="self-end mt-6 md:mt-12 animate-float-delayed"
          >
            <PhoneMockup src="/images/app-screenshot-2.jpg" alt="OptionScore market overview" className="w-[100px] sm:w-[140px] md:w-[200px]" />
          </motion.div>

          {/* Center phone (main, elevated) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="animate-float"
          >
            <PhoneMockup src="/images/app-screenshot-1.jpg" alt="OptionScore command center" className="w-[130px] sm:w-[180px] md:w-[260px]" />
          </motion.div>

          {/* Right phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="self-end mt-6 md:mt-12 animate-float-delayed"
            style={{ animationDelay: "1s" }}
          >
            <PhoneMockup src="/images/app-screenshot-3.jpg" alt="OptionScore AI stock insights" className="w-[100px] sm:w-[140px] md:w-[200px]" />
          </motion.div>
        </div>
      </div>

      {/* Shimmer divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 divider-shimmer" />
    </section>
  );
}
