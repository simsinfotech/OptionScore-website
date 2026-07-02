"use client";

import Image from "next/image";

const SLIDES = [
  { src: "/images/preview-1.jpg", alt: "OptionScore command center" },
  { src: "/images/preview-2.jpg", alt: "OptionScore market overview" },
  { src: "/images/preview-3.jpg", alt: "OptionScore options intelligence" },
];

export function MobilePhoneSlider() {
  return (
    <div className="md:hidden mt-12">
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-[calc(50%-100px)] pb-4 no-scrollbar">
        {SLIDES.map((slide, i) => (
          <div key={slide.src} className="flex-shrink-0 w-[200px] snap-center">
            <div className="w-[200px] overflow-hidden rounded-2xl">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={400}
                height={800}
                className="w-full h-auto rounded-2xl"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="200px"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {SLIDES.map((slide) => (
          <div
            key={slide.src}
            className="w-1.5 h-1.5 rounded-full bg-white/30"
          />
        ))}
      </div>
    </div>
  );
}
