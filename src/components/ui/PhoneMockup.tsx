"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function PhoneMockup({ src, alt = "App screenshot", className = "", priority = false }: PhoneMockupProps) {
  return (
    <motion.div
      className={`${className} overflow-hidden rounded-2xl`}
      style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
      whileHover={{
        y: -16,
        filter: "drop-shadow(0 30px 50px rgba(11,177,88,0.3))",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={520}
          height={1040}
          className="w-full h-auto rounded-2xl"
          priority={priority}
          sizes="(max-width: 768px) 180px, 260px"
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
