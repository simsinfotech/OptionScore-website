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
      className={`relative cursor-pointer ${className}`}
      style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
      whileHover={{
        y: -16,
        filter: "drop-shadow(0 30px 50px rgba(0,188,212,0.3))",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Cyan glow ring — hidden by default, visible on hover */}
      <motion.div
        className="absolute -inset-[2px] opacity-0"
        style={{
          borderRadius: "46px",
          background: "linear-gradient(135deg, rgba(0,188,212,0.6), rgba(236,255,140,0.3), rgba(0,188,212,0.6))",
          backgroundSize: "200% 200%",
          zIndex: -1,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Outer iPhone body */}
      <div
        style={{
          borderRadius: "44px",
          aspectRatio: "9 / 19.5",
          padding: "12px",
          background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #0f0f12 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Edge highlight (left) */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: 0,
            bottom: "10%",
            width: "1px",
            background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, transparent 100%)",
          }}
        />

        {/* Edge highlight (right) */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: 0,
            bottom: "10%",
            width: "1px",
            background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)",
          }}
        />

        {/* Side button — power (right) */}
        <div
          style={{
            position: "absolute",
            right: "-2px",
            top: "22%",
            width: "3px",
            height: "44px",
            background: "linear-gradient(90deg, #333, #444)",
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Side buttons — volume (left) */}
        <div
          style={{
            position: "absolute",
            left: "-2px",
            top: "18%",
            width: "3px",
            height: "28px",
            background: "linear-gradient(270deg, #333, #444)",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-2px",
            top: "26%",
            width: "3px",
            height: "28px",
            background: "linear-gradient(270deg, #333, #444)",
            borderRadius: "2px 0 0 2px",
          }}
        />

        {/* Silent switch (left) */}
        <div
          style={{
            position: "absolute",
            left: "-2px",
            top: "13%",
            width: "3px",
            height: "16px",
            background: "linear-gradient(270deg, #333, #444)",
            borderRadius: "2px 0 0 2px",
          }}
        />

        {/* Screen area */}
        <div
          style={{
            borderRadius: "32px",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            background: "#010101",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "72px",
              height: "20px",
              background: "#000",
              borderRadius: "20px",
              zIndex: 10,
            }}
          />

          {/* Screenshot */}
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              style={{ borderRadius: "32px" }}
              sizes="(max-width: 768px) 50vw, 300px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-text-muted text-xs uppercase tracking-heading">
                Screenshot
              </span>
            </div>
          )}

          {/* Home indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              background: "rgba(255,255,255,0.4)",
              borderRadius: "4px",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
