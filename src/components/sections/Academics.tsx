"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HiBriefcase, HiAcademicCap, HiChartBar, HiUserGroup } from "react-icons/hi2";
import Image from "next/image";

const HIGHLIGHTS = [
  {
    icon: HiBriefcase,
    value: "30+",
    label: "Years of Experience",
  },
  {
    icon: HiAcademicCap,
    value: "MBB",
    label: "Master Black Belt",
  },
  {
    icon: HiUserGroup,
    value: "5,000+",
    label: "Professionals Trained",
  },
  {
    icon: HiChartBar,
    value: "7+",
    label: "Global Corporations",
  },
];

const ORGANISATIONS = [
  "World Bank",
  "Tata",
  "McGraw-Hill",
  "Hinduja Group",
  "Pfizer India",
  "Centrodorstroy",
  "VVR Laboratories",
];

export function Academics() {
  return (
    <section id="academics" className="py-24 px-6 section-mesh-cyan relative overflow-hidden">
      <div className="max-w-6xl lg:max-w-none lg:px-14 mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mb-4">
            OptionScore <span className="text-[#0BB158]">Academy</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Learn options the right way with structured thinking, disciplined frameworks, and measurable outcomes.
          </p>
        </AnimatedSection>

        {/* Faculty Director — side-by-side layout */}
        <AnimatedSection delay={0.1} className="mb-12">
          <div className="glass p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
              {/* Faculty Director Photo */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden border-2 border-accent-cyan/30">
                    <Image
                      src="/images/faculty-director.jpg"
                      alt="Sathya Narayanan - Faculty Director, OptionScore Academy"
                      width={224}
                      height={224}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-cyan text-background text-xs font-bold uppercase tracking-normal whitespace-nowrap">
                    Faculty Director
                  </div>
                </div>
              </div>

              {/* Faculty Director Details */}
              <div>
                <h3 className="font-bold uppercase tracking-normal text-2xl text-text-primary mb-1 text-center md:text-left">
                  Sathya Narayanan
                </h3>
                <p className="text-accent-cyan text-sm font-semibold mb-4 text-center md:text-left">
                  Master Black Belt | Director of Faculty, OptionScore Academy
                </p>
                <p className="text-text-secondary text-base leading-relaxed mb-4">
                  Sathya Narayanan is a Commerce professional with a{" "}
                  <span className="text-accent-cyan font-semibold">Doctorate in Finance from France</span>{" "}
                  and over three decades of hands-on experience spanning global corporations,
                  multinational conglomerates, and high-stakes turnaround mandates across industries.
                </p>
                <p className="text-text-secondary text-base leading-relaxed">
                  He carries the distinction of a Lean Six Sigma Master Black Belt and has personally
                  trained over 5,000 professionals. A certified NISM Research Analyst XV.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.15} className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4, boxShadow: "0 0 20px rgba(11,177,88,0.15)" }}
                  transition={{ duration: 0.3 }}
                  className="glass p-5 text-center cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 icon-bg-cyan mb-3">
                    <Icon className="text-xl text-accent-cyan" />
                  </div>
                  <div className="text-2xl font-bold text-accent-cyan mb-1">{item.value}</div>
                  <div className="text-text-muted text-xs uppercase tracking-normal">{item.label}</div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Background */}
          <AnimatedSection delay={0.2}>
            <div className="glass p-8 h-full">
              <h4 className="font-bold uppercase tracking-normal text-base text-text-primary mb-4">
                The <span className="text-accent-cyan">Professional</span>
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Sathya Narayanan is a Commerce professional with a{" "}
                <span className="text-accent-cyan font-semibold">Doctorate in Finance from France</span>{" "}
                and over three decades of hands-on experience spanning global corporations,
                multinational conglomerates, and high-stakes turnaround mandates across industries.
                His career is a testament to what disciplined, process-driven thinking can achieve at scale.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                He has held senior roles at institutions of considerable stature, building a rare
                cross-sector command of operations, finance, and organisational performance that few
                professionals in India can claim.
              </p>
              <div className="flex flex-wrap gap-2">
                {ORGANISATIONS.map((org) => (
                  <span
                    key={org}
                    className="text-[10px] uppercase tracking-normal px-2 py-1 border border-card-border text-text-muted"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Turnaround Specialist */}
          <AnimatedSection delay={0.3}>
            <div className="glass p-8 h-full">
              <h4 className="font-bold uppercase tracking-normal text-base text-text-primary mb-4">
                The Turnaround <span className="text-accent-cyan">Specialist</span>
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Sathya Narayanan carries the distinction of a Lean Six Sigma Master Black Belt —
                the highest tier of operational excellence certification globally. Over his career,
                he has applied this framework not in classrooms, but in the field: diagnosing
                underperforming and sick business units and engineering their return to profitability
                in record time.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                He has personally trained over 5,000 professionals at the Green Belt and Black Belt
                levels, many of whom have gone on to lead transformations in their own organisations.
              </p>
              <p className="text-accent-cyan text-sm font-semibold">
                Certified NISM Research Analyst XV
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Why OptionScore Academy */}
        <AnimatedSection delay={0.4}>
          <div className="glass p-8 md:p-12">
            <h4 className="font-bold uppercase tracking-normal text-base text-text-primary mb-4 text-center">
              Why <span className="text-[#0BB158]">OptionScore Academy</span>
            </h4>
            <p className="text-text-secondary text-base leading-relaxed mb-4 max-w-4xl mx-auto text-center">
              At OptionScore Academy, Sathya Narayanan brings the same rigour that governed boardroom
              decisions and enterprise turnarounds to the world of financial markets education. His
              philosophy is simple: <span className="text-text-primary font-semibold">markets reward process, not impulse.</span>
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-4xl mx-auto text-center">
              Every module he leads is built on structured thinking, disciplined frameworks, and
              measurable outcomes, not noise.
            </p>
            <p className="text-accent-cyan text-sm font-semibold text-center">
              For serious traders and analysts who want to learn options the right way, there is no better guide.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
