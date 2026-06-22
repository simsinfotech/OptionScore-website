import Image from "next/image";
import Link from "next/link";

/** Minimal, distraction-free shell for the masterclass funnel pages. */
export function FunnelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col">
      <header className="border-b border-card-border">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="OptionScore logo"
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
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full">{children}</main>

      <footer className="border-t border-card-border">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-text-muted text-[11px] leading-relaxed text-center">
            OptionScore is a market analytics &amp; education platform. This
            session is purely educational and does not constitute investment
            advice. Trading in financial markets involves substantial risk of
            loss and is not suitable for all investors. Past performance does not
            guarantee future results.
          </p>
        </div>
      </footer>
    </div>
  );
}
