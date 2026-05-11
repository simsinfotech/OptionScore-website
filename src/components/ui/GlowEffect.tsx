"use client";

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowEffect({ children, className = "" }: GlowEffectProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-1 bg-accent-cyan/20 blur-xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
