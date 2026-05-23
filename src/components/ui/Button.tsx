"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = twMerge(
    clsx(
      "inline-flex items-center justify-center font-semibold uppercase tracking-heading transition-all duration-300 hover:scale-105 active:scale-95",
      {
        "bg-accent-cyan text-background hover:shadow-glow hover:bg-accent-cyan/90":
          variant === "primary",
        "border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10":
          variant === "secondary",
        "text-text-secondary hover:text-accent-cyan": variant === "ghost",
      },
      {
        "px-4 py-2 text-xs": size === "sm",
        "px-6 py-3 text-sm": size === "md",
        "px-8 py-4 text-base": size === "lg",
      },
      className
    )
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
