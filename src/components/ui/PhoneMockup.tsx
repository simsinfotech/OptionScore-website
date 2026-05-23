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
      {/* iPhone outer shell */}
      <div
        className="phone-frame relative bg-[#1c1c1e] overflow-hidden"
        style={{
          borderRadius: "40px",
          aspectRatio: "9 / 19.5",
          padding: "10px",
          boxShadow:
            "0 0 0 2px #333, 0 0 0 4px #1a1a1a, 0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Side button — right (power) */}
        <div
          className="absolute -right-[3px] top-[25%] w-[3px] h-[40px] bg-[#333]"
          style={{ borderRadius: "0 2px 2px 0" }}
        />

        {/* Side buttons — left (volume) */}
        <div
          className="absolute -left-[3px] top-[20%] w-[3px] h-[24px] bg-[#333]"
          style={{ borderRadius: "2px 0 0 2px" }}
        />
        <div
          className="absolute -left-[3px] top-[28%] w-[3px] h-[24px] bg-[#333]"
          style={{ borderRadius: "2px 0 0 2px" }}
        />

        {/* Screen area */}
        <div
          className="relative w-full h-full overflow-hidden bg-background"
          style={{ borderRadius: "30px" }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-[8px]">
            <div
              className="w-[80px] h-[22px] bg-black"
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
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-text-muted text-xs uppercase tracking-heading">
                Screenshot
              </span>
            </div>
          )}

          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-0 right-0 flex justify-center z-10">
            <div
              className="w-[90px] h-[4px] bg-white/40"
              style={{ borderRadius: "4px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
