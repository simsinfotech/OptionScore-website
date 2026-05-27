"use client";

import { motion } from "framer-motion";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function PhoneMockup({ src, alt = "App screenshot", className = "" }: PhoneMockupProps) {
  return (
    <motion.div
      className={`${className}`}
      style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
      whileHover={{
        y: -16,
        filter: "drop-shadow(0 30px 50px rgba(11,177,88,0.3))",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          style={{ borderRadius: "18px", overflow: "hidden" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-text-muted text-xs uppercase tracking-normal">
            Screenshot
          </span>
        </div>
      )}
    </motion.div>
  );
}
