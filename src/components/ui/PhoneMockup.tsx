"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function PhoneMockup({ src, alt = "App screenshot", className = "" }: PhoneMockupProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ aspectRatio: "9 / 19.5", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
      whileHover={{
        y: -16,
        filter: "drop-shadow(0 30px 50px rgba(0,188,212,0.3))",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 50vw, 300px"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-text-muted text-xs uppercase tracking-heading">
            Screenshot
          </span>
        </div>
      )}
    </motion.div>
  );
}
