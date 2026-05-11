"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-card border border-card-border p-6",
          hover && "transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-glow",
          className
        )
      )}
    >
      {children}
    </div>
  );
}
