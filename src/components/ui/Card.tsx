"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "gradient-border" | "glass";
}

export function Card({ children, className, hover = true, variant = "default" }: CardProps) {
  const variantClasses = {
    default: "bg-gradient-to-br from-[rgba(11,177,88,0.08)] via-[#050505] to-[rgba(11,177,88,0.05)] border border-card-border",
    "gradient-border": "grad-border-static",
    glass: "glass",
  };

  return (
    <div
      className={twMerge(
        clsx(
          variantClasses[variant],
          "p-6",
          hover && "hover:-translate-y-1 transition-transform duration-300",
          className
        )
      )}
    >
      {children}
    </div>
  );
}
