"use client";

import { HiCheck, HiClock, HiUser, HiPresentationChartLine, HiBolt, HiLockClosed, HiCheckCircle, HiCreditCard } from "react-icons/hi2";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { WORKSHOP } from "@/lib/workshop";

const RAZORPAY_URL = "https://rzp.io/rzp/vvLHj0gp";

const WHAT_YOU_LEARN = [
  "How institutions move price and hunt your stop loss",
  "The CRT (Candle Range Theory) framework explained live",
  "Why your perfect setups keep getting stopped out",
  "How to read market structure shifts before they happen",
  "The difference between retail thinking and institutional thinking",
];

const DETAILS = [
  { icon: HiClock, label: "Date & Time", value: "Saturday, 11 July · 10:00 AM IST" },
  { icon: HiUser, label: "Hosted By", value: "Shamiq, OptionScore Academy" },
  { icon: HiPresentationChartLine, label: "Format", value: "Live Online Webinar" },
  { icon: HiBolt, label: "Duration", value: "90 Minutes" },
];

export default function WebinarPage() {
  return (
    <FunnelShell>
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">

        {/* Badge */}
        <div className="text-center mb-6">
          <span className="inline-block text-[#0bb158] text-xs font-bold uppercase tracking-[0.15em] border border-[#0bb158]/30 px-3 py-1 rounded-full">
            Live Webinar · Rs. 299
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-4">
          Learn the Institutional Framework<br className="md:hidden" />{" "}
          <span className="text-[#0bb158]">That Changed Everything</span>
        </h1>

        <p className="text-center text-[#9CA3AF] text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Join a 90-minute live session where Shamiq breaks down how institutions
          move price, why retail traders keep losing, and the exact framework
          used by 500+ trained traders.
        </p>

        {/* Session details */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
          {DETAILS.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.label} className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.12)] rounded-xl p-4">
                <Icon className="text-[#0bb158] mb-2" size={20} />
                <div className="text-[#6b7280] text-[0.65rem] uppercase tracking-wider mb-1">{d.label}</div>
                <div className="text-white text-sm font-semibold">{d.value}</div>
              </div>
            );
          })}
        </div>

        {/* What you'll learn */}
        <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.12)] rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-white font-bold text-lg md:text-xl mb-5">
            What You&apos;ll Learn in 90 Minutes
          </h2>
          <ul className="space-y-3.5">
            {WHAT_YOU_LEARN.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <HiCheck className="text-[#0bb158] mt-0.5 flex-shrink-0" size={18} />
                <span className="text-[#d1d5db] text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing card */}
        <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.25)] rounded-2xl p-6 md:p-8 text-center mb-8">
          <div className="text-[#6b7280] text-sm line-through mb-1">Rs. 999</div>
          <div className="text-[#0bb158] text-4xl md:text-5xl font-extrabold mb-1">Rs. 299</div>
          <div className="text-[#6b7280] text-sm mb-6">for the live 90-minute webinar · Inclusive of all taxes</div>

          <a
            href={RAZORPAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#0bb158] text-black font-bold text-base md:text-lg py-4 rounded-xl hover:bg-[#0ed668] transition-colors"
          >
            Register Now for Rs. 299
          </a>

          <div className="flex justify-center gap-3 md:gap-4 flex-wrap mt-4 text-[0.7rem] md:text-[0.8rem] text-[#6b7280]">
            <span><HiLockClosed className="inline align-middle mr-0.5" size={12} /> 256-bit SSL</span>
            <span><HiCheckCircle className="inline align-middle mr-0.5 text-[#22c55e]" size={12} /> Razorpay</span>
            <span><HiCreditCard className="inline align-middle mr-0.5" size={12} /> Cards, UPI</span>
          </div>
        </div>

        {/* Who it's for */}
        <div className="text-center mb-8">
          <h3 className="text-white font-bold text-base md:text-lg mb-3">This Webinar Is For You If...</h3>
          <ul className="inline-block text-left space-y-2.5">
            {[
              "You've been trading but not consistently profitable",
              "You want to understand how institutions actually move price",
              "You're considering the 2-day workshop but want a taste first",
              "You're tired of indicator-based strategies that don't work",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[#9CA3AF] text-sm">
                <HiCheck className="text-[#0bb158] mt-0.5 flex-shrink-0" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href={RAZORPAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0bb158] text-black font-bold text-base md:text-lg px-10 py-4 rounded-xl hover:bg-[#0ed668] transition-colors"
          >
            Register Now for Rs. 299
          </a>
          <p className="text-[#6b7280] text-xs mt-3">
            Limited seats. Live session only. No recordings.
          </p>
        </div>

      </div>
    </FunnelShell>
  );
}
