import Image from "next/image";
import { SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="OptionScore logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h3 className="text-xl font-bold tracking-heading uppercase text-accent-cyan">
                OptionScore
              </h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              AI-powered trading analysis for the modern trader. Make smarter
              decisions with real-time market scoring.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-heading text-text-primary mb-4">
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
              <li>
                <a
                  href="/account-deletion"
                  className="text-sm text-text-muted hover:text-accent-cyan transition-colors"
                >
                  Account Deletion
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-heading text-text-primary mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted hover:text-accent-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-card-border text-center">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} OptionScore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
