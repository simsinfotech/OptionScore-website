import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";
import { HiUsers, HiStar, HiBolt } from "react-icons/hi2";

const TRUST_BADGES = [
  { icon: HiUsers, label: "10,000+ Traders" },
  { icon: HiStar, label: "4.8★ Rating" },
  { icon: HiBolt, label: "Real-Time AI" },
];

export function Hero() {

  return (
    <section
      id="download"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 section-mesh-cyan"
    >

      <div className="relative z-[10] w-full mx-auto px-6 lg:px-20 py-20 md:py-32 text-center overflow-hidden">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 tracking-normal md:whitespace-nowrap"
        >
          Trade Smarter<br className="md:hidden" />{" "}
          <span className="text-[#0BB158]">With OptionScore</span>
        </h1>

        <p
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 px-4 sm:px-2"
        >
          Market scores, options chains, and trade setups
          on your phone. Built for Indian F&O traders.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto md:animate-fade-in md:[animation-delay:400ms]"
        >
          <Button size="lg" variant="gradient" href={APP_STORE_URL} className="w-full sm:w-auto">
            <FaApple className="mr-2 text-xl" />
            App Store
          </Button>
          <Button size="lg" variant="secondary" href={PLAY_STORE_URL} className="w-full sm:w-auto">
            <FaGooglePlay className="mr-2 text-lg" />
            Google Play
          </Button>
        </div>

        {/* Trust badge strip */}
        <div
          className="flex items-center justify-center gap-3 sm:gap-6 mt-8 flex-wrap md:animate-fade-in md:[animation-delay:600ms]"
        >
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-center gap-1.5 text-text-muted text-xs">
                <Icon className="text-accent-cyan text-sm" />
                {badge.label}
              </div>
            );
          })}
        </div>

        {/* Desktop: 3-phone staggered layout */}
        <div className="hidden md:flex mt-20 items-end justify-center gap-10">
          <div className="self-end mt-12 animate-float-delayed animate-fade-in [animation-delay:700ms]">
            <PhoneMockup src="/images/preview-2.jpg" alt="OptionScore market overview" className="w-[200px]" />
          </div>

          <div className="animate-float animate-fade-in [animation-delay:600ms]">
            <PhoneMockup src="/images/preview-1.jpg" alt="OptionScore command center" className="w-[260px]" priority />
          </div>

          <div className="self-end mt-12 animate-float-delayed animate-fade-in [animation-delay:700ms]" style={{ animationDelay: "1s" }}>
            <PhoneMockup src="/images/preview-3.jpg" alt="OptionScore options intelligence" className="w-[200px]" />
          </div>
        </div>

        {/* Mobile: single hero image, no slider */}
        <div className="md:hidden mt-12 flex justify-center">
          <PhoneMockup src="/images/preview-1.jpg" alt="OptionScore command center" className="w-[200px]" priority />
        </div>
      </div>

      {/* Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 divider-gradient" />
    </section>
  );
}
