import Image from "next/image";
import { SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";
import { FaXTwitter, FaDiscord, FaInstagram } from "react-icons/fa6";

const BRAND_TAGS = ["AI-Powered", "Real-Time Scores", "Mobile-First"];

export function Footer() {
  return (
    <footer className="bg-background/90 relative">
      {/* Shimmer divider at top */}
      <div className="divider-shimmer" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="OptionScore icon"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <Image
                src="/images/logo-text.png"
                alt="OptionScore"
                width={160}
                height={28}
                className="h-6 w-auto"
              />
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-2">
              AI-powered trading analysis for the modern trader. Make smarter
              decisions with real-time market scoring.
            </p>
            {/* Brand tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {BRAND_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-normal px-2 py-1 border border-card-border text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-text-muted text-sm font-semibold">
              SEBI Registration - <span className="text-accent-cyan">Applied For</span>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-normal text-text-primary mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-normal text-text-primary mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const icons: Record<string, React.ReactNode> = {
                  Twitter: <FaXTwitter size={18} />,
                  Discord: <FaDiscord size={18} />,
                  Instagram: <FaInstagram size={18} />,
                };
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 icon-bg-cyan text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
                    aria-label={link.label}
                  >
                    {icons[link.label]}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-card-border text-center">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()}{" "}
            <span className="gradient-text-cyan-violet font-semibold">OptionScore</span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
