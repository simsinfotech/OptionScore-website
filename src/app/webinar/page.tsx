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
  HiChevronRight,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

// Rs. 299 hosted payment link. Same-tab navigation so Razorpay can redirect
// the buyer back to /webinar/confirmed (set that as the link's callback URL).
const RAZORPAY_URL = "https://rzp.io/rzp/nRF8OrN";

const WHATSAPP_URL = "https://wa.me/919036317765?text=Hi%2C%20I%20have%20a%20question%20about%20the%20OptionScore%20webinar.";

/* ─── Fascination Bullets ─── */
const WHAT_YOU_LEARN = [
  {
    title: 'The "Liquidity Sweep" Pattern',
    desc: "Why price spikes past obvious highs and lows before reversing — and how to stop being the trader who gets swept.",
  },
  {
    title: "Why Your Stop-Loss Is a Gift to Smart Money",
    desc: "The structural approach professionals use instead — and why your current stop placement is doing exactly what institutions want.",
  },
  {
    title: "The 3-Layer Confluence Framework",
    desc: "How we filter out 80% of trades — so you stop overtrading and start waiting for setups that actually make structural sense.",
  },
  {
    title: "How to Read a Naked Chart",
    desc: "No RSI, no MACD, no 6-indicator clutter. Just price, structure, and levels that matter.",
  },
  {
    title: "The Top-Down Timeframe Method",
    desc: "The method that tells you the market's story before you even think about an entry.",
  },
  {
    title: "Live Chart Breakdowns",
    desc: "We'll dissect real recent moves in Nifty, Bank Nifty, and Gold so you see the framework applied, not just explained.",
  },
  {
    title: "Why Breakout Trading Fails for Retail",
    desc: "The exact reason breakout entries fail — and what the candle is really telling you at those levels.",
  },
  {
    title: "A First Look at Algorithmic Thinking",
    desc: "How a rules-based framework becomes something a machine can execute. This is where trading is going — and where our advanced students end up.",
  },
];

/* ─── Value Stack ─── */
const VALUE_STACK = [
  { label: "2-hour live webinar — market structure, liquidity, and confluence framework", note: "courses teaching this charge ₹15,000+" },
  { label: "Live Q&A — bring your worst losing trade and we'll break down what actually happened", note: "" },
  { label: "48-hour replay access — rewatch and take notes", note: "" },
  { label: "The Confluence Checklist PDF — the pre-trade filter framework, yours to keep", note: "" },
  { label: "Access to the next-step invitation — attendees get first access to our 2-day Trading Marathon", note: "details revealed in session" },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "I'm a complete beginner. Will I understand this?", a: "Yes. We build from structure upward — no jargon without explanation. Beginners often do better here because they have less to unlearn." },
  { q: "I've been trading for years. Is this too basic?", a: "If you already trade liquidity sweeps, order blocks, and top-down confluence profitably — skip this. If you've heard those terms but your results don't reflect understanding, this session connects the dots." },
  { q: "Is this about stock tips or calls?", a: "No. We don't give tips, calls, or recommendations — ever. This is education: frameworks and skills. If you want someone to tell you what to buy, this isn't for you." },
  { q: "Will you teach the algo stuff here?", a: "You'll get an introduction to how rules-based frameworks become algorithms. The full build-your-own-algo training is part of our advanced program — the webinar shows you the foundation it's built on." },
  { q: "What if I can't attend live?", a: "You get the replay for 48 hours. But live is better — the Q&A on your own losing trades is where the biggest lightbulbs go off." },
  { q: "What if it's not for me?", a: "24-hour no-questions refund. You're risking nothing except two hours." },
  { q: "Is my payment secure? Will I get a confirmation?", a: "Yes — instant confirmation on WhatsApp and email with your Zoom link and calendar invite. Payment is processed securely via Razorpay." },
];

/* ─── Chart Strip Frames ─── */
const CHART_FRAMES = [
  { label: "What you see", caption: "Looks like support. You buy here.", color: "text-[#6b7280]" },
  { label: "What happens", caption: "Stop-loss hunted. Sound familiar?", color: "text-red-400" },
  { label: "What smart money saw", caption: "This was visible the whole time. We'll teach you to see it.", color: "text-[#0bb158]" },
];

export default function WebinarPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  /* ─── Sticky bar scroll listener ─── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setShowStickyBar(scrollPct > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCta = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "center" });
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
            Reserve Seat
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full relative z-[1]">

        {/* ═══════════ SECTION 1 — ABOVE THE FOLD ═══════════ */}
        <section className="py-10 md:py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            {/* Call-out bar */}
            <div className="mb-5 md:mb-8">
              <span className="inline-block bg-[rgba(11,177,88,0.12)] text-[#0bb158] text-[0.6rem] md:text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-[rgba(11,177,88,0.25)] leading-tight">
                For traders tired of courses, tips, and indicators that never explain WHY
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-bold text-[1.4rem] md:text-[2.6rem] leading-[1.15] text-white mb-4 md:mb-6">
              Stopped Out Again — Right Before the Reversal?{" "}
              <span className="text-[#0bb158]">There&apos;s a Reason. It&apos;s Called Liquidity.</span>
            </h1>

            <p className="text-[0.88rem] md:text-[1.15rem] text-[#9CA3AF] max-w-2xl mx-auto mb-6 md:mb-8 leading-[1.6] md:leading-[1.7]">
              In 2 hours, learn to read market structure the way smart money does — no indicators, no tips, no ₹50,000 course. Just ₹299.
            </p>

            {/* VSL placeholder */}
            <div className="max-w-xl mx-auto mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden border border-[rgba(11,177,88,0.2)] bg-black aspect-video flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[rgba(11,177,88,0.15)] border border-[rgba(11,177,88,0.3)] flex items-center justify-center mx-auto mb-3">
                  <HiChevronRight className="text-[#0bb158] ml-0.5" size={28} />
                </div>
                <p className="text-[0.75rem] md:text-[0.85rem] text-[#9CA3AF]">Watch: why your stop-loss keeps getting hunted (3 min)</p>
              </div>
            </div>

            {/* CTA */}
            <a href={RAZORPAY_URL} className="inline-block bg-[#0bb158] text-black font-bold text-[0.95rem] md:text-[1.2rem] py-4 md:py-5 px-10 md:px-16 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(11,177,88,0.25)]">
              RESERVE MY SEAT — ₹299 <HiArrowRight className="inline ml-1" size={18} />
            </a>
            <p className="mt-3 text-[0.72rem] md:text-[0.82rem] text-[#6b7280]">
              Live on Zoom · Saturday, 12 July at 10:00 AM IST · 100 seats
            </p>
          </div>
        </section>

        {/* ═══════════ SECTION 1B — EARLY PROOF ═══════════ */}
        <section className="pb-10 md:pb-16 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-xl p-5 md:p-7 text-center">
              <div className="flex justify-center gap-0.5 mb-3">{Array.from({length:5}).map((_,i)=><HiStar key={i} className="text-yellow-400" size={16} />)}</div>
              <blockquote className="text-[0.88rem] md:text-[1.05rem] text-[#d1d5db] italic leading-[1.7] mb-3">
                &ldquo;I&apos;d already paid for two courses before this. This was the first time someone showed me WHY a setup works instead of just what to click. Completely different way of seeing a chart.&rdquo;
              </blockquote>
              <p className="text-[0.75rem] md:text-[0.85rem] text-[#6b7280]">— Verified OptionScore Student</p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 — PAIN AGITATION ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <h2 className="font-bold text-[1.2rem] md:text-[2rem] text-white leading-tight mb-6 md:mb-8 text-center md:text-left">
              Let me guess what your trading looks like right now...
            </h2>

            <div className="space-y-4 text-[0.85rem] md:text-[0.98rem] text-[#9CA3AF] leading-[1.7] md:leading-[1.8]">
              <p>You enter a trade. It immediately goes against you.</p>
              <p>
                You get stopped out. Then — almost like the market was <em>watching you</em> — price reverses and runs exactly where you said it would. Without you.
              </p>
              <p>You&apos;ve got 6 indicators on your chart and they all disagree with each other.</p>
              <p>
                You&apos;ve joined 3 Telegram channels, watched 400 YouTube videos, maybe even paid for a course — and you still can&apos;t answer one simple question:
              </p>
              <p className="text-white font-bold text-[1rem] md:text-[1.15rem] text-center py-2">
                &ldquo;WHY did price move there?&rdquo;
              </p>
              <p>
                So you do what every retail trader does. You blame the market. You blame manipulation. You blame your broker. You take a break, come back, and lose the same way again.
              </p>
              <p>Here&apos;s the uncomfortable truth nobody selling you indicators wants you to hear:</p>
            </div>

            <h3 className="font-bold text-[1.1rem] md:text-[1.6rem] text-white mt-8 mb-4 text-center">
              The market isn&apos;t random.{" "}
              <span className="text-[#0bb158]">You&apos;ve just been taught to read it wrong.</span>
            </h3>

            <div className="space-y-4 text-[0.85rem] md:text-[0.98rem] text-[#9CA3AF] leading-[1.7] md:leading-[1.8]">
              <p>
                Every &ldquo;obvious&rdquo; support level you buy at, every &ldquo;confirmed breakout&rdquo; you chase — there&apos;s a reason those setups fail with such painful consistency. Your stop-loss isn&apos;t unlucky. <strong className="text-white">It&apos;s liquidity.</strong> And the traders on the other side of your trade can see it from a mile away.
              </p>
              <p>
                Once you see the market through the lens of liquidity and structure, you can never unsee it. Old charts that looked like chaos suddenly read like a story. That&apos;s not a promise of profits — it&apos;s a promise of <em>clarity</em>. And clarity is the one thing no indicator has ever given you.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2B — VISUAL PROOF STRIP ═══════════ */}
        <section className="py-10 md:py-16 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {CHART_FRAMES.map((frame, i) => (
                <div key={i} className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-xl overflow-hidden">
                  {/* Chart placeholder */}
                  <div className="aspect-[4/3] bg-[#080808] flex items-center justify-center border-b border-[rgba(11,177,88,0.1)]">
                    <div className="text-center px-4">
                      <div className={`text-[0.7rem] md:text-[0.8rem] font-bold uppercase tracking-wider mb-1 ${frame.color}`}>
                        Frame {i + 1}
                      </div>
                      <div className="text-white text-[0.85rem] md:text-[0.95rem] font-bold">{frame.label}</div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-[0.78rem] md:text-[0.85rem] text-[#9CA3AF] italic leading-relaxed">&ldquo;{frame.caption}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 — WHAT YOU'LL DISCOVER ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white leading-tight">
                Here&apos;s exactly what you&apos;ll learn<br />
                <span className="text-[#0bb158]">in this 2-hour live session:</span>
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {WHAT_YOU_LEARN.map((item, i) => (
                <div key={i} className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-xl p-5 md:p-6 flex items-start gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[rgba(11,177,88,0.12)] text-[#0bb158] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiCheck size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[0.9rem] md:text-[1.05rem] text-white mb-1">{item.title}</h3>
                    <p className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a href={RAZORPAY_URL} className="inline-block bg-[#0bb158] text-black font-bold text-[0.88rem] md:text-[1.1rem] py-3.5 md:py-4 px-8 md:px-12 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(11,177,88,0.25)]">
                YES — SHOW ME HOW THE MARKET REALLY WORKS → ₹299
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 — WHO IS TEACHING THIS ═══════════ */}
        <section className="py-12 md:py-20 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white">Who&apos;s behind this?</h2>
            </div>

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
                  <div className="font-bold text-white text-[1rem] md:text-[1.2rem]">Shamiq</div>
                  <div className="text-[0.75rem] md:text-[0.85rem] text-[#0bb158]">Trader · OptionScore Founder · 15 Years Active</div>
                </div>
              </div>

              <div className="space-y-4 text-[0.85rem] md:text-[0.95rem] text-[#9CA3AF] leading-[1.7]">
                <p>
                  I&apos;m Shamiq — trader, founder of OptionScore, and probably the least exciting trading educator you&apos;ll find on Instagram.
                </p>
                <p>
                  I don&apos;t post Lamborghinis. I don&apos;t post P&L screenshots. I don&apos;t promise you&apos;ll double your account by Diwali.
                </p>
                <p>
                  What I do is teach <strong className="text-white">process</strong>: the CRT, Smart Money Concepts, and Fibonacci confluence framework I&apos;ve refined over 15 years of trading forex, gold, and Indian F&O — the same framework my students use to finally understand what they&apos;re looking at when they open a chart.
                </p>
                <p>
                  I built OptionScore on one belief: <strong className="text-white">retail traders don&apos;t fail because they&apos;re stupid. They fail because they were taught by people who profit from keeping them confused.</strong> Indicators lag. Tips create dependence. Courses that promise returns are legally lying to you.
                </p>
                <p>
                  This webinar is 2 hours of what actually took me years to figure out. No fluff, no pitch-fest — you&apos;ll learn real, usable frameworks in the session itself.
                </p>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-6 pt-5 border-t border-[rgba(11,177,88,0.15)]">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.82rem] md:text-[0.92rem] text-[#25D366] hover:text-[#4ae97f] transition-colors font-semibold">
                  <FaWhatsapp size={18} /> Questions before you book? WhatsApp us →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 — SOCIAL PROOF WALL ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.1em] uppercase text-[#0bb158] mb-2">Student Experiences</div>
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white">What students say after the webinar</h2>
            </div>

            <div className="space-y-4 md:space-y-5">
              {/* Testimonial angles: structure realization, indicator detox, stop-loss clarity, fewer-but-better trades */}
              {[
                {
                  angle: "Structure Realization",
                  quote: "I'd already paid for two courses before this. This was the first time someone showed me WHY a setup works instead of just what to click. Completely different way of seeing a chart.",
                  name: "Arjun P.", location: "Bangalore",
                },
                {
                  angle: "Indicator Detox",
                  quote: "I had 6 indicators on my chart and they all disagreed. After this session I stripped them all off. Just price and structure. For the first time, charts made sense without the clutter.",
                  name: "Priya S.", location: "Chennai",
                },
                {
                  angle: "Stop-Loss Clarity",
                  quote: "Every trade I took got stopped out right before the reversal. I thought it was bad luck. Turns out my stop was sitting exactly where institutions needed the liquidity. Once you see it, you can't unsee it.",
                  name: "Rahul K.", location: "Mumbai",
                },
                {
                  angle: "Fewer But Better Trades",
                  quote: "I used to take 8-10 trades a day. After understanding the confluence framework, I take 2-3. My win rate went up, my stress went down, and I finally feel like I'm trading with a process instead of gut feel.",
                  name: "Deepak M.", location: "Hyderabad",
                },
                {
                  angle: "Working Professional",
                  quote: "I trade part-time around a full-time job. The top-down timeframe method means I don't need to stare at charts all day. I check the higher timeframe, wait for the setup, and execute. Changed my entire routine.",
                  name: "Sneha V.", location: "Pune",
                },
              ].map((t, i) => (
                <div key={i} className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-xl p-5 md:p-7">
                  <div className="flex gap-0.5 mb-3">{Array.from({length:5}).map((_,j)=><HiStar key={j} className="text-yellow-400" size={14} />)}</div>
                  <blockquote className="text-[0.85rem] md:text-[0.95rem] text-[#d1d5db] italic leading-[1.7] mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.08)] text-[#d1d5db] flex items-center justify-center font-semibold text-[0.72rem]">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
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

        {/* ═══════════ SECTION 6 — VALUE STACK / WHY ₹299 / GUARANTEE ═══════════ */}
        <section id="register" className="py-12 md:py-20 relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white">Everything you get for ₹299:</h2>
            </div>

            {/* Value stack */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 max-w-xl mx-auto">
              {VALUE_STACK.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <HiCheckCircle className="text-[#22c55e] mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <span className="text-[0.85rem] md:text-[0.95rem] text-white font-semibold">{item.label}</span>
                    {item.note && <span className="text-[0.75rem] md:text-[0.82rem] text-[#6b7280] italic ml-1">({item.note})</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Why so cheap */}
            <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.15)] rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
              <h3 className="font-bold text-[1rem] md:text-[1.2rem] text-white mb-4">
                &ldquo;Why so cheap? What&apos;s the catch?&rdquo;
              </h3>
              <div className="space-y-3 text-[0.85rem] md:text-[0.95rem] text-[#9CA3AF] leading-[1.7]">
                <p>Fair question — everyone in this industry has trained you to look for the catch.</p>
                <p>
                  Here it is, honestly: <strong className="text-white">the ₹299 is a filter, not a business model.</strong> Free webinars attract freebie collectors who don&apos;t show up and don&apos;t pay attention. ₹299 attracts people serious enough to invest the price of a movie ticket in their own education. Those are the people I want in the room.
                </p>
                <p>
                  And yes — at the end, I&apos;ll tell you about our 2-day Trading Marathon for those who want to go deeper. No pressure, no dark-pattern countdown timers on your soul. The webinar delivers standalone value whether you ever spend another rupee with us or not. That&apos;s the deal.
                </p>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.25)] rounded-2xl p-6 md:p-8 mb-8 md:mb-10 text-center">
              <HiShieldCheck className="text-[#0bb158] mx-auto mb-3" size={28} />
              <h3 className="font-bold text-[1rem] md:text-[1.2rem] text-white mb-3">
                And if it doesn&apos;t deliver? You don&apos;t pay.
              </h3>
              <p className="text-[0.85rem] md:text-[0.95rem] text-[#9CA3AF] leading-[1.7] max-w-lg mx-auto">
                Attend the full session. If you don&apos;t walk away seeing charts differently, message us on WhatsApp within 24 hours and we&apos;ll refund your ₹299 — no questions, no forms, no hard feelings.
              </p>
            </div>

            {/* Pricing CTA */}
            <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.3)] rounded-2xl overflow-hidden max-w-lg mx-auto">
              <div className="bg-[#0bb158] text-black text-center py-3 md:py-4 text-[0.9rem] md:text-[1.1rem] font-bold">
                2-Hour Live Webinar · All Inclusive
              </div>
              <div className="p-6 md:p-8 text-center">
                <div className="text-[#0bb158] text-4xl md:text-5xl font-extrabold mb-1">₹299</div>
                <div className="text-[#6b7280] text-[0.78rem] md:text-[0.88rem] mb-6">One-time · Inclusive of all taxes · 24-hour refund guarantee</div>

                <a
                  href={RAZORPAY_URL}
                  className="block w-full bg-[#0bb158] text-black font-bold text-[0.95rem] md:text-[1.15rem] py-4 md:py-5 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(11,177,88,0.25)]"
                >
                  RESERVE MY SEAT — ₹299 <HiArrowRight className="inline ml-1" size={18} />
                </a>

                <div className="flex justify-center gap-3 md:gap-4 flex-wrap mt-4 text-[0.7rem] md:text-[0.8rem] text-[#6b7280]">
                  <span><HiLockClosed className="inline align-middle mr-0.5" size={12} /> 256-bit SSL</span>
                  <span><HiCheckCircle className="inline align-middle mr-0.5 text-[#22c55e]" size={12} /> Razorpay</span>
                  <span><HiCreditCard className="inline align-middle mr-0.5" size={12} /> UPI, Cards</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 — HONEST URGENCY ═══════════ */}
        <section className="py-10 md:py-16 bg-[rgba(2,10,5,0.5)] border-y border-[rgba(11,177,88,0.12)] relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
            <h2 className="font-bold text-[1.1rem] md:text-[1.6rem] text-white mb-3 md:mb-4">
              One session per week. 100 seats. That&apos;s real, not marketing.
            </h2>
            <p className="text-[0.85rem] md:text-[0.95rem] text-[#6b7280] leading-[1.7] max-w-xl mx-auto mb-6">
              We keep sessions capped so the Q&A stays useful — 500 people asking questions helps nobody. When a session fills, the next slot is the following week.
            </p>

            {/* Countdown */}
            <div className="inline-block bg-[#050505] border border-[rgba(11,177,88,0.3)] rounded-xl px-6 md:px-10 py-4 md:py-5 mb-5">
              <div className="text-[0.7rem] md:text-[0.8rem] text-[#6b7280] uppercase tracking-[0.1em] font-semibold mb-2">Next session: Saturday, 12 July · 10:00 AM IST</div>
              <CountdownTimer />
            </div>

            <div className="flex items-center justify-center gap-2 text-red-400 text-[0.8rem] md:text-[0.9rem] font-semibold">
              <HiFire size={16} />
              Booking closes when 100 seats fill
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 — FAQ ═══════════ */}
        <section className="py-12 md:py-20 relative z-[1]">
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

        {/* ═══════════ SECTION 9 — FINAL CTA ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(2,10,5,0.5)] border-t border-[rgba(11,177,88,0.12)] text-center relative z-[1]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <h2 className="font-bold text-[1.2rem] md:text-[2rem] text-white mb-4 md:mb-6 leading-tight">
              Two hours. ₹299.<br />
              <span className="text-[#0bb158]">A completely different way of seeing every chart you&apos;ll ever open.</span>
            </h2>

            <div className="space-y-3 text-[0.85rem] md:text-[1rem] text-[#6b7280] leading-[1.7] max-w-xl mx-auto mb-8">
              <p>
                You can keep doing what you&apos;re doing — the indicators, the Telegram tips, the &ldquo;one more course&rdquo; cycle. The market will keep teaching you the expensive way.
              </p>
              <p>
                Or you can spend less than a pizza on finally understanding the <em>mechanics</em> of why price moves. With a full refund if it doesn&apos;t deliver.
              </p>
            </div>

            <a href={RAZORPAY_URL} className="inline-block bg-[#0bb158] text-black font-bold text-[0.95rem] md:text-[1.2rem] py-4 md:py-5 px-10 md:px-16 rounded-lg hover:bg-[#0ed668] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(11,177,88,0.25)]">
              RESERVE MY SEAT FOR ₹299 <HiArrowRight className="inline ml-1" size={18} />
            </a>

            <p className="mt-4 text-[0.78rem] md:text-[0.88rem] text-[#6b7280]">
              Next live session: Saturday, 12 July at 10:00 AM IST
            </p>
          </div>
        </section>
      </main>

      {/* ═══════════ Footer — Compliance ═══════════ */}
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
          <Link href="/refund-policy" className="hover:text-[#0bb158]">Refund Policy</Link>
          <Link href="/contact" className="hover:text-[#0bb158]">Contact</Link>
        </div>
        <div className="text-[0.65rem] md:text-[0.75rem] mb-3">&copy; 2026 OptionScore Academy. All rights reserved.</div>
        <div className="text-[0.55rem] md:text-[0.65rem] text-[#6b7280] max-w-[700px] mx-auto border-t border-[rgba(11,177,88,0.2)] pt-3 leading-relaxed">
          <strong>Disclaimer:</strong> This webinar is for educational purposes only. Nothing in this session constitutes investment advice, a recommendation, or a solicitation to buy or sell any security or financial instrument. Trading in securities and derivatives markets involves substantial risk of loss and is not suitable for every investor. Past performance of any framework, strategy, or individual does not guarantee future results. Student testimonials reflect individual learning experiences and do not represent typical outcomes or imply future trading profits. Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
        </div>
      </footer>

      {/* ═══════════ Sticky Bottom Bar (mobile) ═══════════ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[999] md:hidden transition-transform duration-300 ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-[rgba(8,8,8,0.95)] backdrop-blur-[12px] border-t border-[rgba(255,255,255,0.08)] py-2.5 px-4">
          <div className="flex justify-between items-center gap-3">
            <div>
              <span className="text-[0.75rem] text-white font-semibold block">Sat, 12 July · 10 AM</span>
              <span className="text-[0.65rem] text-[#6b7280]">100 seats · ₹299</span>
            </div>
            <a href={RAZORPAY_URL} className="bg-[#0bb158] hover:bg-[#0ed668] text-black font-bold text-[0.78rem] py-2.5 px-5 rounded-lg transition-colors flex-shrink-0">
              Reserve Seat →
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════ Floating WhatsApp ═══════════ */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-14 md:bottom-4 right-3 md:right-6 z-[998] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
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

/* ═══════════════════════════════════════════════════
   Countdown Timer
   ═══════════════════════════════════════════════════ */

function CountdownTimer() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    // Webinar: Saturday, 12 July 2026 at 10:00 AM IST (UTC+5:30)
    const end = new Date("2026-07-12T04:30:00Z").getTime();

    const update = () => {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setDisplay(
        `${String(d).padStart(2, "0")}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!display) return null;

  return (
    <div className="flex justify-center gap-2 md:gap-3.5">
      {display.split(" ").map((unit) => {
        const num = unit.slice(0, -1);
        const label = unit.slice(-1) === "d" ? "Days" : unit.slice(-1) === "h" ? "Hours" : unit.slice(-1) === "m" ? "Min" : "Sec";
        return (
          <div key={label} className="text-center">
            <div className="inline-block bg-[#0a0a0a] text-white text-[0.95rem] md:text-[1.4rem] font-extrabold px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg min-w-[38px] md:min-w-[52px] border border-[rgba(11,177,88,0.2)]">
              {num}
            </div>
            <div className="text-[0.55rem] md:text-[0.65rem] uppercase text-[#6b7280] tracking-[0.1em] mt-1">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
