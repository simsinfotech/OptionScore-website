"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#010101] ${
        scrolled
          ? "border-b border-white/5 shadow-[0_4px_20px_rgba(11,177,88,0.06)]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
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
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm uppercase tracking-heading text-text-secondary hover:text-accent-cyan transition-colors group"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                style={{ background: "linear-gradient(90deg, #0BB158, #7C3AED)" }}
              />
            </a>
          ))}
          <Button size="sm" variant="gradient" href="#download">
            Download
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong px-6 pb-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm uppercase tracking-heading text-text-secondary hover:text-accent-cyan"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" variant="gradient" href="#download" className="mt-4 w-full">
            Download
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
}
