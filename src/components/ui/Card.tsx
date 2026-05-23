"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  if (!hover) {
    return (
      <div className={twMerge(clsx("bg-card border border-card-border p-6", className))}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: -6,
        borderColor: "rgba(0, 188, 212, 0.4)",
        boxShadow: "0 0 30px rgba(0, 188, 212, 0.2), 0 20px 40px rgba(0, 0, 0, 0.3)",
      }}
      transition={{ duration: 0.3 }}
      className={twMerge(
        clsx(
          "bg-card border border-card-border p-6 cursor-pointer",
          "transition-colors duration-300",
          className
        )
      )}
    >
      {children}
    </motion.div>
  );
}
