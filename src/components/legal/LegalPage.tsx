import Image from "next/image";
import Link from "next/link";
import { LEGAL_LAST_UPDATED, isPlaceholder } from "@/lib/legal";
import { BackButton } from "./BackButton";

/**
 * Shared layout for all legal pages (Terms, Privacy, Refund, Shipping, Contact).
 * Server component — these pages are static text.
 */
export function LegalPage({
  title,
  accentWord,
  intro,
  children,
}: {
  /** Plain part of the title, e.g. "Privacy" */
  title: string;
  /** Highlighted word appended to the title, e.g. "Policy" */
  accentWord?: string;
  /** Short intro paragraph shown under the heading. */
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-card-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center justify-center w-9 h-9 border border-card-border hover:border-accent-cyan/40 transition-colors" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
          </Link>
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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-3">
          {title}
          {accentWord && <span className="text-accent-cyan"> {accentWord}</span>}
        </h1>
        <p className="text-text-muted text-xs mb-8">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>

        {intro && (
          <div className="text-text-secondary text-sm leading-relaxed mb-10 space-y-4">
            {intro}
          </div>
        )}

        <div className="space-y-10">{children}</div>

        <div className="mt-16 pt-8 border-t border-card-border">
          <BackButton className="text-sm text-accent-cyan hover:underline">
            &larr; Back
          </BackButton>
        </div>
      </main>
    </div>
  );
}

/** A titled section within a legal page. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-bold tracking-normal text-lg text-text-primary mb-3">
        {heading}
      </h2>
      <div className="text-text-secondary text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

/** Bulleted list styled to match the site. */
export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-accent-cyan mt-0.5 flex-shrink-0">&#x2022;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Renders a business-detail value. If the value is still an unfilled
 * placeholder, it is highlighted in amber so you can spot what's left to edit.
 */
export function Val({ children }: { children: string }) {
  if (isPlaceholder(children)) {
    return (
      <span className="text-amber-400 bg-amber-400/10 px-1 rounded-sm font-mono text-[0.85em]">
        {children}
      </span>
    );
  }
  return <span className="text-text-primary">{children}</span>;
}
