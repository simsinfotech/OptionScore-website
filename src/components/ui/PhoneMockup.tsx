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
      <div
        className="phone-frame relative overflow-hidden"
        style={{
          borderRadius: "36px",
          aspectRatio: "9 / 19.5",
          border: "3px solid #333",
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-[8px]">
          <div
            className="w-[70px] h-[20px] bg-black"
            style={{ borderRadius: "20px" }}
          />
        </div>

        {/* Screenshot */}
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 300px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-background">
            <span className="text-text-muted text-xs uppercase tracking-heading">
              Screenshot
            </span>
          </div>
        )}

        {/* Home indicator */}
        <div className="absolute bottom-[6px] left-0 right-0 flex justify-center z-10">
          <div
            className="w-[80px] h-[4px] bg-white/40"
            style={{ borderRadius: "4px" }}
          />
        </div>
      </div>
    </div>
  );
}
