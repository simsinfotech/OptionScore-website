"use client";

import { useEffect, useState } from "react";
import {
  HiCheck,
  HiXMark,
  HiClock,
  HiUser,
  HiPresentationChartLine,
  HiBolt,
  HiLockClosed,
  HiCheckCircle,
  HiCreditCard,
  HiStar,
  HiXCircle,
  HiShieldCheck,
  HiPlus,
  HiMinus,
  HiArrowRight,
  HiFire,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

// Rs. 299 hosted payment link. Same-tab navigation so Razorpay can redirect
// the buyer back to /webinar/confirmed (set that as the link's callback URL).
const RAZORPAY_URL = "https://rzp.io/rzp/nRF8OrN";

/* ─── Page Data ─── */

const HERO_STATS = [
  { value: "500+", label: "Traders Trained" },
  { value: "4.9/5", label: "Rating" },
  { value: "90 Min", label: "Live Session" },
  { value: "Limited", label: "Seats" },
];

const DETAILS = [
  { icon: HiClock, label: "Date & Time", value: "Saturday, 12 July · 10:00 AM IST" },
  { icon: HiUser, label: "Hosted By", value: "Shamiq, OptionScore Academy" },
  { icon: HiPresentationChartLine, label: "Format", value: "Live Online Webinar" },
  { icon: HiBolt, label: "Duration", value: "90 Minutes" },
];

const WHAT_YOU_LEARN = [
  {
    title: "How Institutions Hunt Your Stop Loss",
    desc: "The exact mechanism institutions use to trigger retail stop losses and fill their own orders. Once you see this, you'll never place a stop the same way again.",
  },
  {
    title: "The CRT (Candle Range Theory) Framework",
    desc: "A complete framework for reading price through the lens of institutional activity. Identify the range, anticipate the sweep, read the reversal.",
  },
  {
    title: "Why Your Perfect Setups Keep Getting Stopped Out",
    desc: "Your technical analysis isn't wrong — you're just on the wrong side of the trade. Learn why institutions need your stop loss to fill their orders.",
  },
  {
    title: "How to Read Market Structure Shifts Before They Happen",
    desc: "Break of structure. Change of character. The signals that tell you institutions have shifted direction — before price confirms it on your indicator.",
  },
  {
    title: "Retail Thinking vs Institutional Thinking",
    desc: "The fundamental difference between how retail traders read a chart and how institutions read the same chart. This one shift changes everything.",
  },
  {
    title: "Live Chart Walkthrough",
    desc: "Real charts. Real examples. Shamiq walks through actual setups showing exactly where institutions were positioned and how you can read it in real time.",
  },
];

const RETAIL_VS_INSTITUTIONAL = {
  retail: [
    "Look for entry signals on indicators",
    "Buy at support, sell at resistance",
    "Follow RSI, MACD, moving averages",
    "React after the candle closes",
    'Enter when the setup "looks right"',
    "Wonder why the market moved against them",
  ],
  institutional: [
    "Look for your stop loss to fill orders",
    "Sweep below support to accumulate",
    "Read order flow before price moves",
    "Create the candle movement",
    "Enter after retail traders are trapped",
    "Know exactly where retail is positioned",
  ],
};

const TESTIMONIALS = [
  {
    headline: "First time someone showed me what was ABOUT to happen.",
    quote: "I've bought 4 courses before this. All of them showed me recorded charts and told me what happened. This was the first time someone sat in front of a live market and showed me what was about to happen. That's the difference.",
    initials: "AP",
    name: "Arjun P.",
    location: "Bangalore",
  },
  {
    headline: "Finally understood WHY I was losing.",
    quote: "I've been trading for 2 years and losing consistently. After the session I finally understood why. The institutional framework completely changed how I read charts.",
    initials: "PS",
    name: "Priya S.",
    location: "Chennai",
  },
  {
    headline: "Worth 100x the price.",
    quote: "The session on how institutions hunt stop losses was worth 100x what I paid. I could immediately see it on my charts the very next trading day. My entries changed overnight.",
    initials: "RK",
    name: "Rahul K.",
    location: "Mumbai",
  },
  {
    headline: "Best trading education I've found.",
    quote: "No fluff, no hype. Shamiq explained exactly how institutions move price and showed it on real charts. Clear, practical, and immediately applicable.",
    initials: "DM",
    name: "Deepak M.",
    location: "Hyderabad",
  },
];

const WHO_ITS_FOR = [
  "You've been trading for 3+ months but not consistently profitable",
  "You want to understand how institutions actually move price",
  "You're tired of indicator-based strategies that keep failing",
  "You get stopped out on setups that then go exactly where you thought",
  "You're considering the 2-day workshop but want to experience the framework first",
  "You're ready to unlearn retail thinking",
];

const WHO_ITS_NOT_FOR = [
  "You're looking for trade signals or hot tips",
  "You've never seen a candlestick chart before",
  "You want a get-rich-quick scheme",
  "You're not willing to question your current approach",
];

const FAQS = [
  { q: "What exactly will be covered in 90 minutes?", a: "The session covers how institutions move price, the CRT (Candle Range Theory) framework, why retail setups get stopped out, reading market structure shifts, and live chart walkthroughs. It's a condensed version of the core institutional framework." },
  { q: "Do I need prior trading experience?", a: "Basic familiarity with candlestick charts is enough. If you've been trading for a few months and understand what a candlestick is, you'll follow along. Complete beginners may find it fast-paced." },
  { q: "Which markets does this cover?", a: "The institutional framework applies to all markets — Indian equity (Nifty, Bank Nifty), forex, XAUUSD (gold), and crypto. The same logic works everywhere because institutions operate across all markets." },
  { q: "Will this be recorded?", a: "No. This is a live-only session. No recordings will be provided. This is intentional — live sessions create urgency and focus that recordings cannot replicate." },
  { q: "How is this different from YouTube videos?", a: "YouTube shows you finished charts with hindsight analysis. This webinar walks through the institutional framework with real chart examples and live explanation. You can ask questions. You see the reasoning, not just the result." },
  { q: "What's the difference between this webinar and the 2-day workshop?", a: "The webinar is a 90-minute introduction to the institutional framework. The 2-day workshop goes much deeper — full framework teaching on Day 1, live market trading on Day 2, and personal chart review for every participant. The webinar is the perfect starting point." },
  { q: "Is this about trade signals or recommendations?", a: "No. This is purely educational. You learn a framework for reading price independently. No signals, no tips, no personalised recommendations. Educational content only." },
  { q: "What if I can't make it on the day?", a: "There are no recordings and no replays. If you can't attend live, you'll need to wait for the next session. Seats are limited and sessions fill up." },
];

export default function WebinarPage() {
  const scrollToCta = () => {
    document
      .getElementById("register")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-[#020a05] text-[#d1d5db] flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_90%_at_50%_-10%,rgba(11,177,88,0.4)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_50%,rgba(11,177,88,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(11,177,88,0.15)_0%,transparent_50%)]" />
      </div>

      {/* ═══════════ Navbar ═══════════ */}
      <nav className="sticky top-0 z-[1000] bg-black border-b border-[rgba(11,177,88,0.15)] py-2 md:py-3">
        <div className="max-w-full mx-auto px-4 md:px-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="OptionScore" width={64} height={64} className="h-6 w-6 md:h-8 md:w-8" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={320} height={56} className="h-4 md:h-5 w-auto" />
          </Link>
          <button onClick={scrollToCta} className="bg-[#0bb158] text-black text-[0.7rem] md:text-xs font-bold px-3 md:px-5 py-1.5 md:py-2 rounded-md hover:bg-[#0ed668] transition-colors">
            Register Now
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full relative z-[1]">

        {/* ═══════════ HERO ═══════════ */}
        <section className="py-10 md:py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            {/* Badge */}
            <span className="inline-block bg-[rgba(11,177,88,0.12)] text-[#0bb158] text-[0.6rem] md:text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-3 md:px-5 py-1.5 md:py-2 rounded-full mb-5 md:mb-8 border border-[rgba(11,177,88,0.25)]">
              Live Webinar · Saturday, 12 July · 10:00 AM IST
            </span>

            {/* Headline */}
            <h1 className="font-bold text-[1.5rem] md:text-[2.8rem] leading-[1.15] text-white mb-4 md:mb-6">
              Learn the Institutional Framework<br />
              <span className="text-[#0bb158]">That 500+ Traders Used to Stop Losing</span>
            </h1>

            <p className="text-[0.88rem] md:text-[1.15rem] text-[#9CA3AF] max-w-2xl mx-auto mb-6 md:mb-8 leading-[1.6] md:leading-[1.7]">
              Join a 90-minute live session where Shamiq breaks down how institutions
              move price, why retail traders keep losing, and the exact framework
              that changed everything for 500+ traders.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-8 md:mb-10">
              {HERO_STATS.map((s) => (
                <span key={s.label} className="text-[0.75rem] md:text-[0.88rem] text-[#6b7280] flex items-center gap-1">
                  <HiCheck className="text-[#22c55e] flex-shrink-0" size={14} />
                  <strong className="text-white">{s.value}</strong> {s.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a href={RAZORPAY_URL} className="inline-block bg-[#0bb158] text-black font-bold text-[0.95rem] md:text-[1.2rem] py-4 md:py-5 px-10 md:px-16 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(11,177,88,0.25)]">
              Register Now — Rs. 299
            </a>
            <div className="mt-3 text-[0.72rem] md:text-[0.82rem] text-[#6b7280]">
              <HiLockClosed className="inline align-middle mr-0.5" size={12} /> Secure payment via Razorpay · UPI, Cards
            </div>

            {/* Urgency */}
            <div className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] px-4 py-2 rounded-full">
              <HiFire className="text-red-500" size={14} />
              <span className="text-red-400 text-[0.75rem] md:text-[0.85rem] font-semibold">Limited seats. Live session only. No recordings.</span>
            </div>
          </div>
        </section>

        {/* ═══════════ SOCIAL PROOF BAR ═══════════ */}
        <section className="border-y border-[rgba(11,177,88,0.12)] bg-[rgba(2,10,5,0.5)] py-6 md:py-8 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8 flex justify-center gap-6 md:gap-12 flex-wrap">
            <div className="text-center">
              <div className="text-[1.2rem] md:text-[1.6rem] font-extrabold text-[#0bb158]">500+</div>
              <div className="text-[0.65rem] md:text-[0.75rem] text-[#6b7280] uppercase tracking-wide">Traders Trained</div>
            </div>
            <div className="text-center">
              <div className="text-[1.2rem] md:text-[1.6rem] font-extrabold text-[#0bb158] flex items-center justify-center gap-1">
                4.9 <span className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><HiStar key={i} className="text-yellow-400" size={14} />)}</span>
              </div>
              <div className="text-[0.65rem] md:text-[0.75rem] text-[#6b7280] uppercase tracking-wide">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-[1.2rem] md:text-[1.6rem] font-extrabold text-[#0bb158]">96%</div>
              <div className="text-[0.65rem] md:text-[0.75rem] text-[#6b7280] uppercase tracking-wide">Recommend It</div>
            </div>
          </div>
        </section>

        {/* ═══════════ PERSONAL STORY ═══════════ */}
        <section className="py-12 md:py-20 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-2xl p-6 md:p-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[rgba(11,177,88,0.15)]">
                <Image
                  src="/founder.jpg"
                  alt="Shamiq"
                  width={80}
                  height={80}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-[rgba(255,255,255,0.1)]"
                />
                <div>
                  <div className="font-bold text-white text-[1rem] md:text-[1.2rem]">A message from Shamiq</div>
                  <div className="text-[0.75rem] md:text-[0.85rem] text-[#0bb158]">Institutional Trader · 15 Years Active · OptionScore Founder</div>
                </div>
              </div>

              <div className="space-y-4 text-[0.85rem] md:text-[0.95rem] text-[#9CA3AF] leading-[1.7]">
                <p>
                  I spent 3 years losing money consistently before I understood what was actually moving price.
                </p>
                <p>
                  I had discipline. I had rules. I had a system — I thought. RSI, MACD, support and resistance. The same tools every retail trader uses. And I was still losing.
                </p>
                <p>
                  The shift came when I stopped asking <strong className="text-white">&ldquo;where do I enter?&rdquo;</strong> and started asking <strong className="text-white">&ldquo;where are the institutions building their position?&rdquo;</strong>
                </p>
                <p>
                  That single question changed everything. Suddenly, the &ldquo;random&rdquo; stop hunts made sense. The &ldquo;fake breakouts&rdquo; had a pattern. The market wasn&apos;t random — it was designed. And once I understood the design, I could read it.
                </p>
                <p>
                  For 15 years I&apos;ve traded using this institutional framework across XAUUSD, forex majors, Indian equity, and F&O. I&apos;ve trained 500+ traders using the same framework.
                </p>
                <p className="text-white font-semibold">
                  This 90-minute webinar is the exact starting point. I&apos;ll show you the framework that changed everything — for just Rs. 299.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 md:gap-2 mt-6 pt-6 border-t border-[rgba(11,177,88,0.15)]">
                {["CRT Framework", "Institutional Order Flow", "XAUUSD", "Indian F&O", "Forex", "15 Years Active"].map((c) => (
                  <span key={c} className="text-[0.65rem] md:text-[0.72rem] font-semibold px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-[rgba(11,177,88,0.1)] text-[#0bb158]">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ THE PROBLEM ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.1em] uppercase text-[#0bb158] mb-2">Why You Keep Losing</div>
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white leading-tight mb-4">
                The Market Isn&apos;t Random.<br />
                It&apos;s Designed to Take Your Money.
              </h2>
              <p className="text-[0.85rem] md:text-[1rem] text-[#6b7280] max-w-2xl mx-auto leading-[1.6]">
                Every time you get stopped out on a perfect setup, the institution on the other side of that trade knew exactly where your stop was. You&apos;re using RSI, MACD, support and resistance — the same tools 95% of retail traders use. And 95% of retail traders lose money. That&apos;s not a coincidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.15)] rounded-2xl p-5 md:p-7">
                <h4 className="font-bold text-[0.88rem] md:text-[1.05rem] text-red-500 mb-4 pb-3 border-b border-[rgba(239,68,68,0.15)] flex items-center gap-2">
                  <HiXCircle size={16} className="flex-shrink-0" /> What Retail Traders Do
                </h4>
                <ul className="space-y-2">
                  {RETAIL_VS_INSTITUTIONAL.retail.map((item) => (
                    <li key={item} className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] flex items-start gap-2">
                      <HiXMark className="text-red-500 mt-0.5 flex-shrink-0" size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-2xl p-5 md:p-7">
                <h4 className="font-bold text-[0.88rem] md:text-[1.05rem] text-[#0bb158] mb-4 pb-3 border-b border-[rgba(11,177,88,0.15)] flex items-center gap-2">
                  <HiCheckCircle size={16} className="flex-shrink-0" /> What Institutions Do
                </h4>
                <ul className="space-y-2">
                  {RETAIL_VS_INSTITUTIONAL.institutional.map((item) => (
                    <li key={item} className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] flex items-start gap-2">
                      <HiCheck className="text-[#0bb158] mt-0.5 flex-shrink-0" size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center text-[0.88rem] md:text-[1.05rem] text-[#6b7280] leading-[1.8]">
              You don&apos;t have a discipline problem.<br />
              You don&apos;t have a capital problem.<br />
              <strong className="text-[#0bb158] text-[0.95rem] md:text-[1.1rem]">You have a framework problem.</strong><br /><br />
              And a framework can be learned in 90 minutes.
            </div>

            {/* Mid-page CTA */}
            <div className="text-center mt-8 md:mt-10">
              <a href={RAZORPAY_URL} className="inline-block bg-[#0bb158] text-black font-bold text-[0.88rem] md:text-[1.1rem] py-3.5 md:py-4 px-8 md:px-12 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5">
                Register Now — Rs. 299 <HiArrowRight className="inline ml-1" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ WHAT YOU'LL LEARN ═══════════ */}
        <section className="py-12 md:py-20 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.1em] uppercase text-[#0bb158] mb-2">What&apos;s Inside</div>
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white leading-tight">
                Here&apos;s What You&apos;ll Learn<br />in 90 Minutes
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {WHAT_YOU_LEARN.map((item, i) => (
                <div key={i} className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-xl p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[rgba(11,177,88,0.12)] text-[#0bb158] rounded-lg flex items-center justify-center flex-shrink-0 text-[0.75rem] md:text-[0.85rem] font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-[0.9rem] md:text-[1.05rem] text-white mb-1">{item.title}</h3>
                      <p className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] leading-[1.6]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[rgba(11,177,88,0.06)] border border-[rgba(11,177,88,0.2)] rounded-xl p-4 md:p-5 text-center text-[0.85rem] md:text-[1rem] text-[#0ed668] font-semibold">
              All of this in a single 90-minute live session. No fluff. No filler. Pure institutional framework.
            </div>
          </div>
        </section>

        {/* ═══════════ SESSION DETAILS ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white leading-tight">Session Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
              {DETAILS.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.label} className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.12)] rounded-xl p-4 md:p-5">
                    <Icon className="text-[#0bb158] mb-2" size={22} />
                    <div className="text-[#6b7280] text-[0.65rem] uppercase tracking-wider mb-1">{d.label}</div>
                    <div className="text-white text-[0.82rem] md:text-[0.95rem] font-semibold">{d.value}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a href={RAZORPAY_URL} className="inline-block bg-[#0bb158] text-black font-bold text-[0.88rem] md:text-[1.1rem] py-3.5 md:py-4 px-8 md:px-12 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5">
                Register Now — Rs. 299 <HiArrowRight className="inline ml-1" size={16} />
              </a>
              <p className="text-[#6b7280] text-[0.72rem] md:text-[0.8rem] mt-3">Live session only. No recordings. Limited seats.</p>
            </div>
          </div>
        </section>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <section className="py-12 md:py-20 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.1em] uppercase text-[#0bb158] mb-2">What Traders Say</div>
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white leading-tight">
                <span className="inline-flex gap-0.5 align-middle mr-2">{Array.from({length:5}).map((_,i)=><HiStar key={i} className="text-yellow-400" size={18} />)}</span>
                4.9/5 Average Rating
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-xl p-5 md:p-6 flex flex-col">
                  <div className="flex gap-0.5 mb-2">{Array.from({length:5}).map((_,j)=><HiStar key={j} className="text-yellow-400" size={13} />)}</div>
                  <div className="font-bold text-[0.85rem] md:text-[0.95rem] text-white mb-2">&ldquo;{t.headline}&rdquo;</div>
                  <p className="text-[0.8rem] md:text-[0.88rem] text-[#9CA3AF] leading-[1.6] mb-4 flex-1">{t.quote}</p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                    <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.08)] text-[#d1d5db] flex items-center justify-center font-semibold text-[0.72rem]">{t.initials}</div>
                    <div>
                      <div className="font-semibold text-[0.78rem] text-white">{t.name}</div>
                      <div className="text-[0.68rem] text-[#6b7280]">{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ WHO IT'S FOR ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.1em] uppercase text-[#0bb158] mb-2">Is This For You?</div>
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white leading-tight">Who This Webinar Is For</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div>
                <h3 className="font-semibold text-[0.92rem] md:text-[1.1rem] text-[#0bb158] mb-4 pb-3 border-b border-[rgba(11,177,88,0.25)]">
                  This is for you if:
                </h3>
                <ul className="space-y-2.5">
                  {WHO_ITS_FOR.map((item) => (
                    <li key={item} className="text-[0.8rem] md:text-[0.9rem] text-[#9CA3AF] flex items-start gap-2.5">
                      <HiCheckCircle className="text-[#22c55e] mt-0.5 flex-shrink-0" size={15} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[0.92rem] md:text-[1.1rem] text-red-400 mb-4 pb-3 border-b border-[rgba(239,68,68,0.25)]">
                  This is NOT for you if:
                </h3>
                <ul className="space-y-2.5">
                  {WHO_ITS_NOT_FOR.map((item) => (
                    <li key={item} className="text-[0.8rem] md:text-[0.9rem] text-[#9CA3AF] flex items-start gap-2.5">
                      <HiXCircle className="text-red-500 mt-0.5 flex-shrink-0" size={15} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ PRICING / REGISTER ═══════════ */}
        <section id="register" className="py-12 md:py-20 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white leading-tight mb-3">
                Register for the Live Webinar
              </h2>
              <p className="text-[0.85rem] md:text-[1rem] text-[#6b7280]">Saturday, 12 July · 10:00 AM IST · 90 Minutes Live</p>
            </div>

            <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.25)] rounded-2xl overflow-hidden max-w-lg mx-auto">
              <div className="bg-[#0bb158] text-black text-center py-3 md:py-4 text-[0.9rem] md:text-[1.1rem] font-bold">
                90-Minute Live Webinar · All Inclusive
              </div>
              <div className="p-6 md:p-8 text-center">
                <div className="text-[#6b7280] text-sm line-through mb-1">Rs. 999</div>
                <div className="text-[#0bb158] text-4xl md:text-5xl font-extrabold mb-1">Rs. 299</div>
                <div className="text-[#6b7280] text-[0.78rem] md:text-[0.88rem] mb-6">One-time payment · Inclusive of all taxes</div>

                <div className="text-left space-y-2.5 mb-6">
                  {[
                    "90 minutes live with Shamiq",
                    "Complete CRT framework introduction",
                    "Live chart walkthroughs",
                    "Q&A session included",
                    "Institutional framework explained",
                    "Pathway to 2-day workshop",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-[0.8rem] md:text-[0.88rem] text-[#d1d5db]">
                      <HiCheck className="text-[#0bb158] flex-shrink-0" size={15} />
                      {item}
                    </div>
                  ))}
                </div>

                <a
                  href={RAZORPAY_URL}
                  className="block w-full bg-[#0bb158] text-black font-bold text-[0.95rem] md:text-[1.15rem] py-4 md:py-5 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(11,177,88,0.25)]"
                >
                  Register Now for Rs. 299
                </a>

                <div className="flex justify-center gap-3 md:gap-4 flex-wrap mt-4 text-[0.7rem] md:text-[0.8rem] text-[#6b7280]">
                  <span><HiLockClosed className="inline align-middle mr-0.5" size={12} /> 256-bit SSL</span>
                  <span><HiCheckCircle className="inline align-middle mr-0.5 text-[#22c55e]" size={12} /> Razorpay</span>
                  <span><HiCreditCard className="inline align-middle mr-0.5" size={12} /> Cards, UPI</span>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="max-w-lg mx-auto mt-5">
              <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.12)] rounded-xl p-4 md:p-5 text-center">
                <HiShieldCheck className="text-[#0bb158] mx-auto mb-2" size={24} />
                <p className="text-[0.78rem] md:text-[0.88rem] text-[#6b7280] leading-[1.6]">
                  If the webinar doesn&apos;t completely change how you read price, message us within 24 hours for a full refund. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              {FAQS.map((f, i) => (
                <Faq key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section className="py-12 md:py-20 border-t border-[rgba(11,177,88,0.1)] text-center relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white mb-4 md:mb-6">
              Stop Trading Against Institutions.<br />
              <span className="text-[#0bb158]">Start Trading With Them.</span>
            </h2>

            <p className="text-[0.85rem] md:text-[1rem] text-[#6b7280] max-w-xl mx-auto mb-8 leading-[1.7]">
              90 minutes. One framework. The shift from retail thinking to institutional thinking. Join 500+ traders who&apos;ve already made the change.
            </p>

            <a href={RAZORPAY_URL} className="inline-block bg-[#0bb158] text-black font-bold text-[0.95rem] md:text-[1.2rem] py-4 md:py-5 px-10 md:px-16 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(11,177,88,0.25)]">
              Register Now — Rs. 299
            </a>

            <div className="flex justify-center gap-6 md:gap-10 flex-wrap mt-8">
              <div className="text-center">
                <div className="text-[1rem] md:text-[1.3rem] font-extrabold text-[#0bb158]">500+</div>
                <div className="text-[0.68rem] md:text-[0.75rem] text-[#6b7280]">Traders Trained</div>
              </div>
              <div className="text-center">
                <div className="text-[1rem] md:text-[1.3rem] font-extrabold text-[#0bb158]">4.9/5</div>
                <div className="text-[0.68rem] md:text-[0.75rem] text-[#6b7280]">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-[1rem] md:text-[1.3rem] font-extrabold text-[#0bb158]">Rs. 299</div>
                <div className="text-[0.68rem] md:text-[0.75rem] text-[#6b7280]">One-Time</div>
              </div>
            </div>

            <p className="text-[0.78rem] md:text-[0.88rem] text-[#6b7280] italic mt-6 max-w-lg mx-auto">
              P.S. This is a live-only session. No recordings. Limited seats. If you&apos;re considering it, register now before seats fill up.
            </p>
          </div>
        </section>
      </main>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="bg-[rgba(1,1,1,0.7)] text-[#6b7280] text-center py-8 md:py-10 px-4 md:px-6 border-t border-[rgba(11,177,88,0.1)] relative z-[1]">
        <div className="flex justify-center mb-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="OptionScore" width={64} height={64} className="h-6 w-6 md:h-8 md:w-8" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={320} height={56} className="h-4 md:h-5 w-auto" />
          </Link>
        </div>
        <div className="flex justify-center gap-3 md:gap-6 flex-wrap mb-3 text-[0.7rem] md:text-[0.8rem]">
          <Link href="/privacy-policy" className="hover:text-[#0bb158]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#0bb158]">Terms</Link>
          <Link href="/contact" className="hover:text-[#0bb158]">Contact</Link>
        </div>
        <div className="text-[0.65rem] md:text-[0.75rem] mb-3">&copy; 2026 OptionScore Academy. All rights reserved.</div>
        <div className="text-[0.6rem] md:text-[0.7rem] text-[#6b7280] max-w-[600px] mx-auto border-t border-[rgba(11,177,88,0.2)] pt-3 leading-relaxed">
          DISCLAIMER: This webinar is for educational purposes only. It does not include trade signals, tips, or personalised investment recommendations. No financial advice is provided. Trading involves risk. Past performance is not indicative of future results.
        </div>
      </footer>

      {/* ═══════════ Floating WhatsApp ═══════════ */}
      <a
        href="https://wa.me/919036317765?text=Hi%2C%20I%20have%20a%20question%20about%20the%20OptionScore%20webinar."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-3 md:right-6 z-[998] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
        title="Questions? Chat with us"
      >
        <FaWhatsapp size={24} className="text-white md:!w-7 md:!h-7" />
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ Accordion
   ═══════════════════════════════════════════════════ */

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-xl mb-2 md:mb-2.5 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 text-left hover:bg-[#0a0a0a] transition-colors"
      >
        <span className="text-white text-[0.82rem] md:text-[0.95rem] font-semibold">{q}</span>
        {open ? <HiMinus className="text-[#0bb158] flex-shrink-0" size={16} /> : <HiPlus className="text-[#0bb158] flex-shrink-0" size={16} />}
      </button>
      {open && (
        <p className="px-4 md:px-5 pb-3 md:pb-4 text-[#6b7280] text-[0.78rem] md:text-[0.9rem] leading-[1.6] md:leading-[1.7]">{a}</p>
      )}
    </div>
  );
}
