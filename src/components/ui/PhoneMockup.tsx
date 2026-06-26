import Image from "next/image";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function PhoneMockup({ src, alt = "App screenshot", className = "", priority = false }: PhoneMockupProps) {
  return (
    <div
      className={`${className} overflow-hidden rounded-2xl phone-mockup-shadow`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={520}
          height={1040}
          className="w-full h-auto rounded-2xl"
          priority={priority}
          sizes="(max-width: 768px) 180px, 260px"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-text-muted text-xs uppercase tracking-normal">
            Screenshot
          </span>
        </div>
      )}
    </div>
  );
}
