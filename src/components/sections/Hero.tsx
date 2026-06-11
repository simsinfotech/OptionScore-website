"use client";

import { useRef, useEffect } from "react";
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
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to center card (Command Center) on mount
    const slider = sliderRef.current;
    if (slider && slider.children.length > 1) {
      const centerCard = slider.children[1] as HTMLElement;
      const scrollLeft = centerCard.offsetLeft - slider.offsetWidth / 2 + centerCard.offsetWidth / 2;
      slider.scrollLeft = scrollLeft;
    }
  }, []);

  return (
    <section
      id="download"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay on top of video */}
      <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" style={{ zIndex: 2 }} />

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

      <div className="relative z-[10] max-w-7xl mx-auto px-6 py-20 md:py-32 text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 glow-text tracking-normal"
        >
          Trade Smarter
          <br />
          <span className="gradient-text-cyan-violet">With AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 px-4 sm:px-2"
        >
          Real-time market scoring, AI-driven insights, and professional trading
          tools — all in one powerful mobile app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto"
        >
          <Button size="lg" variant="gradient" href={APP_STORE_URL} className="w-full sm:w-auto">
            <FaApple className="mr-2 text-xl" />
            App Store
          </Button>
          <Button size="lg" variant="secondary" href={PLAY_STORE_URL} className="w-full sm:w-auto">
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

        {/* Phone mockups — slider on mobile, flex on desktop */}
        {/* Desktop: 3-phone staggered layout */}
        <div className="hidden md:flex mt-20 items-end justify-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="self-end mt-12 animate-float-delayed"
          >
            <PhoneMockup src="/images/preview-2.png" alt="OptionScore market overview" className="w-[200px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="animate-float"
          >
            <PhoneMockup src="/images/preview-1.png" alt="OptionScore command center" className="w-[260px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="self-end mt-12 animate-float-delayed"
            style={{ animationDelay: "1s" }}
          >
            <PhoneMockup src="/images/preview-3.png" alt="OptionScore options intelligence" className="w-[200px]" />
          </motion.div>
        </div>

        {/* Mobile: swipeable slider with all 3 visible, center default */}
        <div className="md:hidden mt-12 -mx-6">
          <div ref={sliderRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-[calc(50vw-90px)] pb-4 scrollbar-hide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex-shrink-0 snap-center"
            >
              <PhoneMockup src="/images/preview-2.png" alt="OptionScore market overview" className="w-[180px]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex-shrink-0 snap-center"
            >
              <PhoneMockup src="/images/preview-1.png" alt="OptionScore command center" className="w-[180px]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex-shrink-0 snap-center"
            >
              <PhoneMockup src="/images/preview-3.png" alt="OptionScore options intelligence" className="w-[180px]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shimmer divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 divider-shimmer" />
    </section>
  );
}
