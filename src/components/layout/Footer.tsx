import Image from "next/image";
import { SOCIAL_LINKS, NAV_LINKS, LEGAL_LINKS } from "@/lib/constants";
import { FaInstagram } from "react-icons/fa6";

const BRAND_TAGS = ["AI-Powered", "Real-Time Scores", "Mobile-First"];

export function Footer() {
  return (
    <footer className="relative" style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(11,177,88,0.55) 0%, transparent 50%), #050505" }}>
      {/* Shimmer divider at top */}
      <div className="divider-shimmer" />

      <div className="max-w-7xl lg:max-w-none mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo-sm.png"
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
              AI-powered market analytics &amp; education for the modern trader.
              Make smarter decisions with real-time market scoring.
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
            <p className="text-text-muted text-xs leading-relaxed">
              Market analytics &amp; education tool. Not a SEBI-registered
              investment adviser. Not investment advice.
            </p>

            {/* Credentials */}
            <div className="mt-4 space-y-1">
              <p className="text-text-secondary text-xs font-semibold">
                NISM XV Research Analyst Certified
              </p>
              <p className="text-text-muted text-xs">
                SEBI RA License: Applied for
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-normal text-text-primary mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.filter((link) => link.href.includes("#")).map((link) => (
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

          {/* Academy */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-normal text-text-primary mb-4">
              Academy
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/academy" className="text-sm text-text-muted hover:text-accent-cyan transition-colors">
                  OptionScore Academy
                </a>
              </li>
              <li>
                <a href="/workshop" className="text-sm text-text-muted hover:text-accent-cyan transition-colors">
                  Live Trading Workshop
                </a>
              </li>
              <li>
                <a href="/master-class" className="text-sm text-text-muted hover:text-accent-cyan transition-colors">
                  Master Class
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-normal text-text-primary mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
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

        {/* Risk / advisory disclaimer */}
        <div className="mt-12 pt-8 border-t border-card-border">
          <p className="text-text-muted text-[11px] leading-relaxed max-w-4xl">
            <span className="font-semibold text-text-secondary">Disclaimer:</span>{" "}
            OptionScore is a market data, analytics and educational tool. It does
            not provide investment advice, recommendations, or solicitations to
            buy or sell any security. OptionScore is not a SEBI-registered
            investment adviser, research analyst, or stockbroker. Trading and
            investing in securities and derivatives involve substantial risk of
            loss; past and back-tested performance is not indicative of future
            results. All decisions are made solely by you, at your own risk.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-card-border text-center">
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
