"use client";

import Image from "next/image";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function PhoneMockup({ src, alt = "App screenshot", className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone frame */}
      <div className="relative bg-[#1a1a1a] border-[3px] border-[#333] overflow-hidden" style={{ borderRadius: "36px", aspectRatio: "9/19.5" }}>
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-2">
          <div className="w-[90px] h-[25px] bg-black" style={{ borderRadius: "0 0 16px 16px" }} />
        </div>

        {/* Screen content */}
        <div className="w-full h-full overflow-hidden bg-background">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 300px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-text-muted text-xs uppercase tracking-heading">
                Screenshot
              </span>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center pb-1 z-10">
          <div className="w-[100px] h-[4px] bg-white/30" style={{ borderRadius: "4px" }} />
        </div>
      </div>
    </div>
  );
}
