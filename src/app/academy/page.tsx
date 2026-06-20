"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiCheck,
  HiCheckCircle,
  HiPlus,
  HiMinus,
  HiAcademicCap,
  HiClock,
  HiBookOpen,
  HiBuildingLibrary,
  HiBolt,
  HiCpuChip,
  HiArrowRight,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Academics } from "@/components/sections/Academics";
import { FounderProfile } from "@/components/sections/FounderProfile";
import { EnquiryModal } from "@/components/academy/EnquiryModal";
import {
  ACADEMY_TAGLINE,
  ACADEMY_PILLARS,
  ACADEMY_LEVELS,
  ACADEMY_BUNDLE,
  ACADEMY_FOUNDATION,
  ACADEMY_CURRICULUM,
  ACADEMY_FORMAT,
  ACADEMY_CERTIFICATIONS,
  ACADEMY_BONUSES,
  ACADEMY_FAQS,
  ACADEMY_COURSE_OPTIONS,
  type CurriculumLevel,
} from "@/lib/academy";

/** Per-level accent classes. Full strings so Tailwind keeps them. */
const ACCENT: Record<
  "cyan" | "amber" | "rose",
  { text: string; border: string; bar: string; soft: string }
> = {
  cyan: {
    text: "text-accent-cyan",
    border: "border-accent-cyan/40",
    bar: "bg-accent-cyan",
    soft: "bg-accent-cyan/10",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-400/40",
    bar: "bg-amber-400",
    soft: "bg-amber-400/10",
  },
  rose: {
    text: "text-rose-400",
    border: "border-rose-400/40",
    bar: "bg-rose-400",
    soft: "bg-rose-400/10",
  },
};

const PILLAR_ICONS: IconType[] = [HiBuildingLibrary, HiBolt, HiCpuChip];

const HERO_STATS = [
  { value: "3", label: "Levels" },
  { value: "41", label: "Modules" },
  { value: "18", label: "Weeks" },
  { value: "Lifetime", label: "Access" },
];

export default function AcademyPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryCourse, setEnquiryCourse] = useState<string>(
    ACADEMY_COURSE_OPTIONS[ACADEMY_COURSE_OPTIONS.length - 1]
  );

  const openEnquiry = (course: string) => {
    setEnquiryCourse(course);
    setEnquiryOpen(true);
  };

  return (
    <div className="relative">
      <Navbar />
      <main className="relative z-[1] pt-16">
        {/* ───────────── Hero ───────────── */}
        <section className="section-mesh-violet relative overflow-hidden border-b border-card-border">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-chip">OptionScore Academy</span>
              <p className="font-mono text-accent-cyan text-[11px] md:text-xs uppercase tracking-[0.22em] mt-5 mb-5">
                {ACADEMY_TAGLINE}
              </p>
              <h1 className="font-bold tracking-tight text-4xl md:text-6xl text-text-primary mb-6 leading-[1.08]">
                Learn Trading the way{" "}
                <span className="gradient-text-cyan-violet">Institutions trade them</span>
              </h1>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-9">
                A three-level program that takes you from market basics to
                professional-grade options trading — built on institutional
                frameworks and the OptionScore scoring system.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="gradient" size="lg" href="#curriculum">
                  Explore the Curriculum
                </Button>
                <Button variant="secondary" size="lg" href="#levels">
                  Levels &amp; Pricing
                </Button>
              </div>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-4 gap-px bg-card-border border border-card-border mt-14 max-w-2xl mx-auto"
            >
              {HERO_STATS.map((s) => (
                <div key={s.label} className="bg-background px-2 py-5">
                  <div className="text-xl md:text-2xl font-bold text-accent-cyan">
                    {s.value}
                  </div>
                  <div className="text-text-muted text-[10px] md:text-xs uppercase tracking-normal mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───────────── The Framework Gap ───────────── */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedSection>
                <span className="section-chip">The Problem</span>
                <h2 className="font-bold tracking-tight text-3xl md:text-4xl text-text-primary mt-4 mb-6 leading-tight">
                  It&apos;s not a knowledge gap.
                  <br />
                  <span className="gradient-text-violet-lime">It&apos;s a framework gap.</span>
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Most retail traders learn options as a speculation tool.
                    Institutions treat them as risk instruments — scoring the
                    environment before they ever take a position.
                  </p>
                  <p>
                    OptionScore Academy bridges that gap. We teach the
                    institutional frameworks risk desks and prop firms actually
                    use, adapted for Indian F&amp;O markets, paired with real
                    execution and the OptionScore market-scoring system.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.12}>
                <div className="grad-border-static p-10 md:p-12 text-center">
                  <div className="text-6xl md:text-7xl font-bold gradient-text-cyan-violet leading-none">
                    9<span className="text-text-muted text-4xl md:text-5xl"> / </span>10
                  </div>
                  <p className="text-text-primary font-semibold mt-5 mb-1">
                    retail options traders in India lose money
                  </p>
                  <p className="text-text-muted text-xs">
                    Source: SEBI study on individual F&amp;O traders
                  </p>
                  <div className="divider-gradient my-7" />
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Our entire curriculum is built to put you in the other 10% —
                    through process, not prediction.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ───────────── Three Pillars ───────────── */}
        <section className="py-20 md:py-28 px-6 section-mesh-cyan relative overflow-hidden border-y border-card-border">
          <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
            <SectionHeader
              chip="How We Teach"
              titlePlain="Built On"
              titleAccent="Three Pillars"
              accentClass="gradient-text-cyan-violet"
              subtitle="Every module sits on the same foundation — institutional thinking, real execution, and a scoring system that comes before the trade."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ACADEMY_PILLARS.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i];
                return (
                  <AnimatedSection key={pillar.title} delay={i * 0.1} className="flex">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="glass p-8 h-full w-full"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 icon-bg-cyan mb-6">
                        <Icon className="text-accent-cyan text-xl" />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs text-text-muted">
                          0{i + 1}
                        </span>
                        <h3 className="font-bold tracking-tight text-lg text-text-primary">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {pillar.what}
                      </p>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Levels & Pricing ───────────── */}
        <section id="levels" className="py-20 md:py-28 px-6">
          <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto">
            <SectionHeader
              chip="The Program"
              titlePlain="Three Levels, One"
              titleAccent="Journey"
              accentClass="gradient-text-violet-lime"
              subtitle="Start as a beginner and finish trading like a professional. Take a single level on its own, or the full program as a bundle."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-stretch">
              {ACADEMY_LEVELS.map((lvl, i) => {
                const a = ACCENT[lvl.accent];
                return (
                  <AnimatedSection key={lvl.level} delay={i * 0.12} className="flex">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="grad-border-static p-7 flex flex-col w-full"
                    >
                      <div className={`h-1 w-12 ${a.bar} mb-6`} />
                      <div className="flex items-center justify-between mb-3">
                        <p className={`font-mono text-xs uppercase tracking-[0.15em] ${a.text}`}>
                          {lvl.level}
                        </p>
                        <span className="text-text-muted text-[11px] font-mono">
                          {lvl.modules}
                        </span>
                      </div>
                      <h3 className="font-bold tracking-tight text-xl text-text-primary mb-3">
                        {lvl.name}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                        {lvl.focus}
                      </p>

                      <div className="flex items-center gap-2 text-text-muted text-xs mb-6">
                        <HiClock className={a.text} />
                        <span>{lvl.duration}</span>
                      </div>

                      <div className="border-t border-card-border pt-5 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <span className="text-text-muted text-xs uppercase tracking-normal">
                            Recorded
                          </span>
                          <span className="text-text-secondary font-semibold">
                            {lvl.recorded}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-text-primary text-xs uppercase tracking-normal font-semibold">
                            Live Cohort
                          </span>
                          <span className={`text-2xl font-bold ${a.text}`}>
                            {lvl.cohort}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full mt-5"
                        onClick={() => openEnquiry(ACADEMY_COURSE_OPTIONS[i])}
                      >
                        Enquire
                      </Button>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Bundle */}
            <AnimatedSection delay={0.1}>
              <div className="grad-border-card p-7 md:p-9">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-1">
                    <span className="inline-block badge-shimmer bg-accent-lime text-background text-[10px] font-bold uppercase tracking-normal px-3 py-1 mb-4">
                      Best Value
                    </span>
                    <h3 className="font-bold tracking-tight text-2xl md:text-3xl text-text-primary mb-3">
                      {ACADEMY_BUNDLE.name}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-5 max-w-xl">
                      {ACADEMY_BUNDLE.focus}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-text-muted text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <HiClock className="text-accent-cyan" /> {ACADEMY_BUNDLE.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <HiBookOpen className="text-accent-cyan" /> {ACADEMY_BUNDLE.modules}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <HiAcademicCap className="text-accent-cyan" /> 3 certifications
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-64 lg:border-l lg:border-card-border lg:pl-8">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-text-muted text-xs uppercase tracking-normal">
                        Recorded
                      </span>
                      <span className="text-text-secondary font-semibold">
                        {ACADEMY_BUNDLE.recorded}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mb-5">
                      <span className="text-text-primary text-xs uppercase tracking-normal font-semibold">
                        Live Cohort
                      </span>
                      <span className="text-3xl font-bold gradient-text-cyan-violet">
                        {ACADEMY_BUNDLE.cohort}
                      </span>
                    </div>
                    <Button
                      variant="gradient"
                      size="md"
                      className="w-full"
                      onClick={() => openEnquiry("Full Program Bundle")}
                    >
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ───────────── Module 0 — Foundation ───────────── */}
        <section className="py-20 md:py-28 px-6 section-mesh-alt relative overflow-hidden border-y border-card-border">
          <div className="max-w-4xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="grad-border-static p-8 md:p-12">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-7">
                  <span className="inline-flex items-center justify-center w-14 h-14 icon-bg-cyan flex-shrink-0">
                    <HiAcademicCap className="text-accent-cyan text-2xl" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-cyan mb-1">
                      {ACADEMY_FOUNDATION.code} · {ACADEMY_FOUNDATION.hours} · Mandatory
                    </p>
                    <h2 className="font-bold tracking-tight text-2xl md:text-3xl text-text-primary">
                      {ACADEMY_FOUNDATION.title}
                    </h2>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed mb-7 max-w-2xl">
                  {ACADEMY_FOUNDATION.blurb}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {ACADEMY_FOUNDATION.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                      <HiCheckCircle className="text-accent-cyan mt-0.5 flex-shrink-0" size={18} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ───────────── Full Curriculum ───────────── */}
        <section id="curriculum" className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              chip="Curriculum"
              titlePlain="Every Module,"
              titleAccent="Mapped Out"
              accentClass="gradient-text-cyan-violet"
              subtitle="41 modules across three levels — from market structure to building your own scoring system. Expand each level to see what's inside."
            />

            <div className="space-y-4">
              {ACADEMY_CURRICULUM.map((level, i) => (
                <AnimatedSection key={level.id} delay={i * 0.08}>
                  <LevelAccordion level={level} defaultOpen={i === 0} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Session Format ───────────── */}
        <section className="py-20 md:py-28 px-6 section-mesh-cyan relative overflow-hidden border-y border-card-border">
          <div className="max-w-5xl mx-auto relative z-10">
            <SectionHeader
              chip="How It Runs"
              titlePlain="The Cohort"
              titleAccent="Rhythm"
              accentClass="gradient-text-violet-lime"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACADEMY_FORMAT.map((item, i) => (
                <AnimatedSection key={item} delay={i * 0.06}>
                  <div className="flex items-start gap-4 glass p-5 h-full">
                    <span className="icon-bg-cyan flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <HiCheck className="text-accent-cyan" size={16} />
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Certification ───────────── */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              chip="Certification"
              titlePlain="Earn Your"
              titleAccent="Credentials"
              accentClass="gradient-text-cyan-violet"
              subtitle="Each level ends with a graded project, evaluated by faculty against institutional standards. Pass and you earn verifiable, tiered certification. Re-submissions are free."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ACADEMY_CERTIFICATIONS.map((cert, i) => {
                const a = ACCENT[ACADEMY_LEVELS[i].accent];
                return (
                  <AnimatedSection key={cert.level} delay={i * 0.1} className="flex">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="grad-border-static p-8 text-center h-full w-full"
                    >
                      <span className="inline-flex items-center justify-center w-14 h-14 icon-bg-cyan mb-5">
                        <HiAcademicCap className="text-accent-cyan text-2xl" />
                      </span>
                      <div className={`h-0.5 w-8 ${a.bar} mx-auto mb-4`} />
                      <p className={`font-mono text-xs uppercase tracking-[0.15em] ${a.text} mb-2`}>
                        {cert.level}
                      </p>
                      <h3 className="font-bold tracking-tight text-base text-text-primary">
                        {cert.title}
                      </h3>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Bonuses ───────────── */}
        <section className="py-20 md:py-28 px-6 section-mesh-alt relative overflow-hidden border-y border-card-border">
          <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
            <SectionHeader
              chip="Included With The Bundle"
              titlePlain="Bonuses &"
              titleAccent="Add-Ons"
              accentClass="gradient-text-violet-lime"
              subtitle="The full program comes loaded with everything you need to stay consistent long after the cohort ends."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ACADEMY_BONUSES.map((bonus, i) => (
                <AnimatedSection key={bonus.title} delay={(i % 4) * 0.08} className="flex">
                  <div className="glass p-6 h-full w-full">
                    <div className="w-9 h-9 icon-bg-cyan flex items-center justify-center mb-4">
                      <HiCheck className="text-accent-cyan" size={16} />
                    </div>
                    <h3 className="font-bold tracking-tight text-sm text-text-primary mb-2 leading-snug">
                      {bonus.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed">
                      {bonus.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── About the Founder & Faculty (together, as on the homepage) ───────────── */}
        <section className="py-20 md:py-28 px-6 section-mesh-violet relative overflow-hidden border-y border-card-border">
          <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
            <FounderProfile />
          </div>
        </section>
        <Academics />

        {/* ───────────── FAQ ───────────── */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              chip="Questions"
              titlePlain="Frequently"
              titleAccent="Asked"
              accentClass="gradient-text-cyan-violet"
            />
            <div className="space-y-3">
              {ACADEMY_FAQS.map((faq, i) => (
                <Faq key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── CTA ───────────── */}
        <section className="py-20 md:py-28 px-6 section-mesh-violet relative overflow-hidden border-t border-card-border">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <AnimatedSection>
              <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-text-primary mb-5 leading-tight">
                Score The Market{" "}
                <span className="gradient-text-violet-lime">Before You Trade</span>
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-9">
                Join OptionScore Academy and learn the frameworks that separate the
                10% from the 90%. Have a question first? Talk to our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() => openEnquiry(ACADEMY_COURSE_OPTIONS[ACADEMY_COURSE_OPTIONS.length - 1])}
                >
                  <span className="inline-flex items-center gap-2">
                    Talk To Our Team <HiArrowRight />
                  </span>
                </Button>
                <Button variant="secondary" size="lg" href="#levels">
                  View Levels &amp; Pricing
                </Button>
              </div>
              <p className="text-text-muted text-[11px] leading-relaxed max-w-xl mx-auto mt-10">
                OptionScore Academy is an educational program. It is not investment
                advice and makes no performance or guaranteed-return claims. Trading
                in securities and derivatives involves substantial risk of loss.
              </p>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <div className="relative z-[1]">
        <Footer />
      </div>

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultCourse={enquiryCourse}
      />
    </div>
  );
}

/* ───────────── Shared section header ───────────── */

function SectionHeader({
  chip,
  titlePlain,
  titleAccent,
  accentClass,
  subtitle,
}: {
  chip: string;
  titlePlain: string;
  titleAccent: string;
  accentClass: string;
  subtitle?: string;
}) {
  return (
    <AnimatedSection className="text-center mb-14 md:mb-16">
      <span className="section-chip">{chip}</span>
      <h2 className="font-bold tracking-tight text-3xl md:text-4xl text-text-primary mt-4 mb-4 leading-tight">
        {titlePlain} <span className={accentClass}>{titleAccent}</span>
      </h2>
      {subtitle && (
        <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}

/* ───────────── Curriculum accordion ───────────── */

function LevelAccordion({
  level,
  defaultOpen,
}: {
  level: CurriculumLevel;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  const a = ACCENT[level.accent];

  return (
    <div className={`bg-card border ${open ? a.border : "border-card-border"} transition-colors`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-5 md:px-6 py-5 text-left"
      >
        <div className={`h-12 w-1 ${a.bar} flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className={`font-mono text-[11px] uppercase tracking-[0.15em] ${a.text} mb-1.5`}>
            {level.level} · {level.duration} · {level.modules.length} modules
          </p>
          <h3 className="font-bold tracking-tight text-lg text-text-primary truncate">
            {level.name}
          </h3>
        </div>
        <span
          className={`flex-shrink-0 w-9 h-9 flex items-center justify-center border ${a.border} ${open ? a.soft : ""}`}
        >
          {open ? (
            <HiMinus className={a.text} size={18} />
          ) : (
            <HiPlus className={a.text} size={18} />
          )}
        </span>
      </button>

      {open && (
        <div className="px-5 md:px-6 pb-6">
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {level.blurb}
          </p>
          {level.prerequisite && (
            <p className="text-text-muted text-xs mb-5">
              <span className="font-semibold text-text-secondary">Prerequisite:</span>{" "}
              {level.prerequisite}
            </p>
          )}
          <ul className="border-t border-card-border">
            {level.modules.map((m) => (
              <li
                key={m.code}
                className="flex items-center gap-4 py-3 border-b border-card-border/60"
              >
                <span
                  className={`font-mono text-xs ${a.text} ${a.soft} px-2 py-1 flex-shrink-0 w-12 text-center`}
                >
                  {m.code}
                </span>
                <span className="text-text-secondary text-sm flex-1 leading-snug">
                  {m.title}
                </span>
                <span className="text-text-muted text-xs flex-shrink-0 font-mono">
                  {m.hours}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div className="flex items-baseline gap-2">
              <span className="text-text-muted text-xs uppercase tracking-normal">
                Recorded
              </span>
              <span className="text-text-secondary font-semibold">{level.recorded}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-text-primary text-xs uppercase tracking-normal font-semibold">
                Live Cohort
              </span>
              <span className={`text-xl font-bold ${a.text}`}>{level.cohort}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────── FAQ accordion ───────────── */

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-card border ${open ? "border-accent-cyan/40" : "border-card-border"} transition-colors`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-text-primary text-sm font-semibold leading-snug">{q}</span>
        {open ? (
          <HiMinus className="text-accent-cyan flex-shrink-0" size={18} />
        ) : (
          <HiPlus className="text-accent-cyan flex-shrink-0" size={18} />
        )}
      </button>
      {open && (
        <p className="px-5 pb-4 text-text-secondary text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}
