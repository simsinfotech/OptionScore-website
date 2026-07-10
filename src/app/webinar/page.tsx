"use client";

import { useEffect, useState } from "react";
import {
  HiCheck,
  HiArrowRight,
  HiLockClosed,
  HiCheckCircle,
  HiCreditCard,
  HiStar,
  HiShieldCheck,
  HiPlus,
  HiMinus,
  HiFire,
  HiChevronRight,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const RAZORPAY_URL = "https://rzp.io/rzp/nRF8OrN";
const WHATSAPP_URL = "https://wa.me/919036317765?text=Hi%2C%20I%20have%20a%20question%20about%20the%20OptionScore%20webinar.";

/* ─── FAQs ─── */
const FAQS = [
  { q: "I'm a complete beginner. Will I understand this?", a: "Yes. We build from structure upward, no jargon without explanation. Beginners often do better here because they have less to unlearn." },
  { q: "I've been trading for years. Is this too basic?", a: "If you already trade liquidity sweeps, order blocks, and top-down confluence profitably, skip this. If you've heard those terms but your results don't reflect understanding, this session connects the dots." },
  { q: "Is this about stock tips or calls?", a: "No. We don't give tips, calls, or recommendations. Ever. This is education: frameworks and skills. If you want someone to tell you what to buy, this isn't for you." },
  { q: "Will you teach the algo stuff here?", a: "You'll get an introduction to how rules-based frameworks become algorithms. The full build-your-own-algo training is part of our advanced program. The webinar shows you the foundation it's built on." },
  { q: "What if I can't attend live?", a: "You get the replay for 48 hours. But live is better. The Q&A on your own losing trades is where the biggest lightbulbs go off." },
  { q: "What if it's not for me?", a: "24-hour no-questions refund. You're risking nothing except two hours." },
  { q: "Is my payment secure? Will I get a confirmation?", a: "Yes. Instant confirmation on WhatsApp and email with your Zoom link and calendar invite. Payment is processed securely via Razorpay." },
];

/* Full CTA with urgency text + stock bar */
function HeroCtaBlock({ className = "" }: { className?: string }) {
  const totalBlocks = 30;
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <a
        href={RAZORPAY_URL}
        className="block w-full max-w-[520px] bg-[#111111] text-white font-extrabold text-[1.05rem] md:text-[1.35rem] py-[18px] md:py-[22px] px-8 rounded-xl text-center uppercase tracking-wide border border-[rgba(255,255,255,0.1)] hover:bg-[#1a1a1a] transition-all hover:-translate-y-0.5 shadow-[0_6px_25px_rgba(0,0,0,0.5)]"
      >
        Reserve My Seat for ₹299 →
      </a>
      <p className="mt-3 md:mt-4 text-[0.78rem] md:text-[0.88rem] font-bold uppercase tracking-wide text-center text-red-400">
        Hurry! Seats As Of July 12 Are Running Low
      </p>
      <div className="w-[90%] max-w-sm mx-auto mt-2.5 md:mt-3">
        <div className="flex gap-[3px] justify-center">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`w-[6px] md:w-[8px] h-[18px] md:h-[22px] rounded-[1px] ${
                i < 28 ? "bg-[#2a2a2a]" : "bg-[#0bb158]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Simple CTA button */
function CtaBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <a
        href={RAZORPAY_URL}
        className="inline-block w-full max-w-[520px] bg-[#111111] text-white font-extrabold text-[1.05rem] md:text-[1.35rem] py-[18px] md:py-[22px] px-8 rounded-xl text-center uppercase tracking-wide border border-[rgba(255,255,255,0.1)] hover:bg-[#1a1a1a] transition-all hover:-translate-y-0.5 shadow-[0_6px_25px_rgba(0,0,0,0.5)]"
      >
        Reserve My Seat for ₹299 →
      </a>
    </div>
  );
}

export default function WebinarPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setShowStickyBar(scrollPct > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030a06] text-[#d1d5db] flex flex-col relative overflow-x-hidden">

      {/* ═══════════ Navbar ═══════════ */}
      <nav className="sticky top-0 z-[1000] bg-black border-b border-[rgba(11,177,88,0.15)] py-3 md:py-4">
        <div className="w-full px-5 md:px-12 lg:px-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="OptionScore" width={64} height={64} className="h-8 w-8 md:h-10 md:w-10" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={320} height={56} className="h-5 md:h-7 w-auto" />
          </Link>
          <a href={RAZORPAY_URL} className="bg-[#0bb158] text-black text-[0.75rem] md:text-sm font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-md hover:bg-[#0ed668] transition-colors">
            Reserve Seat
          </a>
        </div>
      </nav>

      {/* ═══════════ Hero ═══════════ */}
      <section className="relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-20%,rgba(11,177,88,0.45)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_50%,rgba(11,177,88,0.12)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(11,177,88,0.12)_0%,transparent_60%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 pt-10 md:pt-20 pb-12 md:pb-20 text-center">
          {/* Top badge */}
          <div className="mb-4 md:mb-6">
            <span className="inline-block bg-[rgba(11,177,88,0.15)] text-[#0bb158] text-[0.65rem] md:text-[0.8rem] font-bold tracking-[0.08em] uppercase px-4 md:px-6 py-2 rounded-full border border-[rgba(11,177,88,0.3)]">
              Live Webinar · ₹299 Only · Saturday, 12 July
            </span>
          </div>

          {/* Star rating */}
          <div className="flex items-center justify-center gap-1.5 mb-5 md:mb-7">
            <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><HiStar key={i} className="text-yellow-400" size={16} />)}</div>
            <span className="text-[0.75rem] md:text-[0.85rem] text-[#9CA3AF]">4.9 from 500+ students</span>
          </div>

          {/* Headline */}
          <h1 className="font-extrabold text-[1.8rem] sm:text-[2.4rem] md:text-[3.6rem] lg:text-[4.2rem] leading-[1.08] text-white mb-5 md:mb-7 uppercase tracking-tight">
            Stopped Out Again?<br className="hidden md:block" /> Right Before the Reversal?{" "}
            <br /><span className="text-[#0bb158]">There&apos;s a Reason.</span>
            <br /><span className="text-[#0bb158]">It&apos;s Called Liquidity.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-[1rem] md:text-[1.4rem] text-[#b0b0b0] max-w-3xl mx-auto mb-8 md:mb-10 leading-[1.6]">
            <strong className="text-white">In 2 hours, learn to read market structure the way smart money does.</strong> No indicators, no tips, no ₹50,000 course. Just ₹299.
          </p>

          {/* VSL embed placeholder */}
          <div className="max-w-2xl mx-auto mb-8 md:mb-10 rounded-xl overflow-hidden border-2 border-[rgba(11,177,88,0.25)] bg-black aspect-video flex items-center justify-center cursor-pointer group">
            <div className="text-center p-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgba(11,177,88,0.2)] border-2 border-[#0bb158] flex items-center justify-center mx-auto mb-3 group-hover:bg-[rgba(11,177,88,0.3)] transition-colors">
                <HiChevronRight className="text-[#0bb158] ml-1" size={32} />
              </div>
              <p className="text-[0.8rem] md:text-[0.95rem] text-[#9CA3AF]">Watch: why your stop-loss keeps getting hunted (3 min)</p>
            </div>
          </div>

          {/* Primary CTA */}
          <HeroCtaBlock />

          {/* Session info below CTA */}
          <p className="mt-4 text-[0.72rem] md:text-[0.82rem] text-[#6b7280]">
            <HiLockClosed className="inline align-middle mr-0.5" size={12} /> Live on Zoom · Saturday, 12 July at 10:00 AM IST · 100 seats only
          </p>
        </div>
      </section>

      {/* ═══════════ Early Proof ═══════════ */}
      <section className="border-y border-[rgba(11,177,88,0.15)] bg-[rgba(0,0,0,0.4)] py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <div className="flex justify-center gap-0.5 mb-4">{Array.from({length:5}).map((_,i)=><HiStar key={i} className="text-yellow-400" size={18} />)}</div>
          <blockquote className="text-[1rem] md:text-[1.3rem] text-white italic leading-[1.6] mb-4 max-w-2xl mx-auto">
            &ldquo;I&apos;d already paid for two courses before this. This was the first time someone showed me WHY a setup works instead of just what to click. Completely different way of seeing a chart.&rdquo;
          </blockquote>
          <p className="text-[0.8rem] md:text-[0.9rem] text-[#6b7280]">Verified OptionScore Student</p>
        </div>
      </section>

      {/* ═══════════ Pain Agitation ═══════════ */}
      <section className="py-14 md:py-24">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="font-extrabold text-[1.4rem] md:text-[2.4rem] text-white leading-[1.15] mb-8 md:mb-10 text-center uppercase tracking-tight">
            Let me guess what your trading looks like right now...
          </h2>

          <div className="space-y-5 text-[0.92rem] md:text-[1.08rem] text-[#b0b0b0] leading-[1.8]">
            <p>You enter a trade. It immediately goes against you.</p>

            <p>
              You get stopped out. Then, almost like the market was <em className="text-white">watching you</em>, price reverses and runs exactly where you said it would. Without you.
            </p>

            <p>You&apos;ve got 6 indicators on your chart and they all disagree with each other.</p>

            <p>
              You&apos;ve joined 3 Telegram channels, watched 400 YouTube videos, maybe even paid for a course. And you still can&apos;t answer one simple question:
            </p>

            <p className="text-white font-extrabold text-[1.2rem] md:text-[1.6rem] text-center py-4 uppercase">
              &ldquo;WHY did price move there?&rdquo;
            </p>

            <p>
              So you do what every retail trader does. You blame the market. You blame manipulation. You blame your broker. You take a break, come back, and lose the same way again.
            </p>

            <p>Here&apos;s the uncomfortable truth nobody selling you indicators wants you to hear:</p>
          </div>

          <h3 className="font-extrabold text-[1.3rem] md:text-[2rem] text-white mt-10 mb-5 text-center uppercase tracking-tight leading-[1.2]">
            The market isn&apos;t random.{" "}
            <span className="text-[#0bb158]">You&apos;ve just been taught to read it wrong.</span>
          </h3>

          <div className="space-y-5 text-[0.92rem] md:text-[1.08rem] text-[#b0b0b0] leading-[1.8]">
            <p>
              Every &ldquo;obvious&rdquo; support level you buy at, every &ldquo;confirmed breakout&rdquo; you chase... there&apos;s a reason those setups fail with such painful consistency. Your stop-loss isn&apos;t unlucky. <strong className="text-white">It&apos;s liquidity.</strong> And the traders on the other side of your trade can see it from a mile away.
            </p>

            <p>
              Once you see the market through the lens of liquidity and structure, you can never unsee it. Old charts that looked like chaos suddenly read like a story. That&apos;s not a promise of profits. It&apos;s a promise of <em className="text-white">clarity</em>. And clarity is the one thing no indicator has ever given you.
            </p>
          </div>

          {/* CTA */}
          <CtaBlock className="mt-10 md:mt-14" />
        </div>
      </section>

      {/* ═══════════ Visual Proof Strip ═══════════ */}
      <section className="py-10 md:py-16 border-y border-[rgba(11,177,88,0.1)] bg-[rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {[
              { label: "What you see", caption: "Looks like support. You buy here.", border: "border-[rgba(107,114,128,0.3)]" },
              { label: "What happens", caption: "Stop-loss hunted. Sound familiar?", border: "border-red-500/30" },
              { label: "What smart money saw", caption: "This was visible the whole time.", border: "border-[#0bb158]/30" },
            ].map((frame, i) => (
              <div key={i} className={`bg-[#080808] border ${frame.border} rounded-lg overflow-hidden`}>
                <div className="aspect-[4/3] flex items-center justify-center p-3">
                  <div className="text-center">
                    <div className="text-[0.55rem] md:text-[0.7rem] font-bold uppercase tracking-wider text-[#6b7280] mb-1">Frame {i + 1}</div>
                    <div className="text-white text-[0.7rem] md:text-[0.9rem] font-bold">{frame.label}</div>
                  </div>
                </div>
                <div className="px-2 pb-2 md:px-3 md:pb-3">
                  <p className="text-[0.6rem] md:text-[0.78rem] text-[#9CA3AF] italic text-center">{frame.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ What You'll Discover ═══════════ */}
      <section className="py-14 md:py-24">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="font-extrabold text-[1.4rem] md:text-[2.4rem] text-white leading-[1.15] mb-10 md:mb-14 text-center uppercase tracking-tight">
            Here&apos;s exactly what you&apos;ll learn in this 2-hour live session:
          </h2>

          {/* Bullet list */}
          <div className="space-y-6 md:space-y-8 mb-10 md:mb-14">
            {[
              { title: 'The "Liquidity Sweep" pattern', desc: "that explains why price spikes past obvious highs and lows before reversing, and how to stop being the trader who gets swept" },
              { title: "Why your stop-loss placement is a gift to smart money", desc: "and the structural approach professionals use instead" },
              { title: "The 3-layer confluence framework", desc: "we use to filter out 80% of trades so you stop overtrading and start waiting for setups that actually make structural sense" },
              { title: "How to read a naked chart", desc: "no RSI, no MACD, no 6-indicator clutter. Just price, structure, and levels that matter" },
              { title: "The top-down timeframe method", desc: "that tells you the market's story before you even think about an entry" },
              { title: "Live chart breakdowns", desc: "we'll dissect real recent moves in Nifty, Bank Nifty, and Gold so you see the framework applied, not just explained" },
              { title: 'The exact reason "breakout trading" fails for retail traders', desc: "and what the candle is really telling you at those levels" },
              { title: "A first look at algorithmic thinking", desc: "how a rules-based framework becomes something a machine can execute (this is where trading is going, and where our advanced students end up)" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 md:gap-4">
                <HiCheck className="text-[#0bb158] mt-1 flex-shrink-0" size={20} />
                <p className="text-[0.92rem] md:text-[1.08rem] text-[#b0b0b0] leading-[1.7]">
                  <strong className="text-white">{item.title}</strong> {item.desc}
                </p>
              </div>
            ))}
          </div>

          <CtaBlock />
        </div>
      </section>

      {/* ═══════════ Authority ═══════════ */}
      <section className="py-14 md:py-24 border-y border-[rgba(11,177,88,0.1)] bg-[rgba(0,0,0,0.3)]">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="font-extrabold text-[1.4rem] md:text-[2.4rem] text-white leading-[1.15] mb-10 md:mb-14 text-center uppercase tracking-tight">
            Who&apos;s behind this?
          </h2>

          {/* Photo + name */}
          <div className="flex flex-col items-center mb-8 md:mb-10">
            <Image
              src="/founder.jpg"
              alt="Shamiq"
              width={160}
              height={160}
              className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-[rgba(11,177,88,0.3)] mb-4"
            />
            <h3 className="font-bold text-[1.1rem] md:text-[1.4rem] text-white">Shamiq</h3>
            <p className="text-[0.8rem] md:text-[0.95rem] text-[#0bb158] font-semibold">Trader · OptionScore Founder · 15 Years Active</p>
          </div>

          {/* Bio copy */}
          <div className="space-y-5 text-[0.92rem] md:text-[1.08rem] text-[#b0b0b0] leading-[1.8]">
            <p>
              I&apos;m Shamiq, trader, founder of OptionScore, and probably the least exciting trading educator you&apos;ll find on Instagram.
            </p>

            <p>
              I don&apos;t post Lamborghinis. I don&apos;t post P&L screenshots. I don&apos;t promise you&apos;ll double your account by Diwali.
            </p>

            <p>
              What I do is teach <strong className="text-white">process</strong>: the CRT, Smart Money Concepts, and Fibonacci confluence framework I&apos;ve refined over 15 years of trading forex, gold, and Indian F&O. The same framework my students use to finally understand what they&apos;re looking at when they open a chart.
            </p>

            <p>
              I built OptionScore on one belief: <strong className="text-white">retail traders don&apos;t fail because they&apos;re stupid. They fail because they were taught by people who profit from keeping them confused.</strong> Indicators lag. Tips create dependence. Courses that promise returns are legally lying to you.
            </p>

            <p>
              This webinar is 2 hours of what actually took me years to figure out. No fluff, no pitch-fest. You&apos;ll learn real, usable frameworks in the session itself.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6 text-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.88rem] md:text-[1rem] text-[#25D366] hover:text-[#4ae97f] transition-colors font-bold">
              <FaWhatsapp size={20} /> Questions before you book? WhatsApp us →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ Social Proof ═══════════ */}
      <section className="py-14 md:py-24">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="font-extrabold text-[1.4rem] md:text-[2.4rem] text-white leading-[1.15] mb-10 md:mb-14 text-center uppercase tracking-tight">
            What students say after the webinar
          </h2>

          {/* Testimonials */}
          <div className="space-y-8 md:space-y-10">
            {[
              {
                quote: "I'd already paid for two courses before this. This was the first time someone showed me WHY a setup works instead of just what to click. Completely different way of seeing a chart.",
                name: "Arjun P.", location: "Bangalore", angle: "Structure Realization",
              },
              {
                quote: "I had 6 indicators on my chart and they all disagreed. After this session I stripped them all off. Just price and structure. For the first time, charts made sense without the clutter.",
                name: "Priya S.", location: "Chennai", angle: "Indicator Detox",
              },
              {
                quote: "Every trade I took got stopped out right before the reversal. I thought it was bad luck. Turns out my stop was sitting exactly where institutions needed the liquidity. Once you see it, you can't unsee it.",
                name: "Rahul K.", location: "Mumbai", angle: "Stop-Loss Clarity",
              },
              {
                quote: "I used to take 8-10 trades a day. After understanding the confluence framework, I take 2-3. My win rate went up, my stress went down, and I finally feel like I'm trading with a process instead of gut feel.",
                name: "Deepak M.", location: "Hyderabad", angle: "Fewer But Better Trades",
              },
              {
                quote: "I trade part-time around a full-time job. The top-down timeframe method means I don't need to stare at charts all day. I check the higher timeframe, wait for the setup, and execute. Changed my entire routine.",
                name: "Sneha V.", location: "Pune", angle: "Working Professional",
              },
            ].map((t, i) => (
              <div key={i} className="border-l-4 border-[#0bb158] pl-5 md:pl-7">
                <div className="flex gap-0.5 mb-2">{Array.from({length:5}).map((_,j)=><HiStar key={j} className="text-yellow-400" size={14} />)}</div>
                <blockquote className="text-[0.95rem] md:text-[1.1rem] text-white italic leading-[1.7] mb-3">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="text-[0.8rem] md:text-[0.9rem] text-[#6b7280]">
                  <strong className="text-[#b0b0b0]">{t.name}</strong>, {t.location}
                </p>
              </div>
            ))}
          </div>

          <CtaBlock className="mt-12 md:mt-16" />
        </div>
      </section>

      {/* ═══════════ Value Stack + Guarantee ═══════════ */}
      <section id="register" className="py-14 md:py-24 border-y border-[rgba(11,177,88,0.1)] bg-[rgba(0,0,0,0.3)]">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="font-extrabold text-[1.4rem] md:text-[2.4rem] text-white leading-[1.15] mb-10 md:mb-14 text-center uppercase tracking-tight">
            Everything you get for ₹299:
          </h2>

          {/* Value stack */}
          <div className="space-y-5 md:space-y-6 mb-10 md:mb-14">
            {[
              { label: "2-hour live webinar: market structure, liquidity, and confluence framework", note: "courses teaching this charge ₹15,000+" },
              { label: "Live Q&A: bring your worst losing trade and we'll break down what actually happened" },
              { label: "48-hour replay access: rewatch and take notes" },
              { label: "The Confluence Checklist PDF: the pre-trade filter framework, yours to keep" },
              { label: "Access to the next-step invitation: attendees get first access to our 2-day Trading Marathon", note: "details revealed in session" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 md:gap-4">
                <HiCheckCircle className="text-[#0bb158] mt-0.5 flex-shrink-0" size={22} />
                <p className="text-[0.92rem] md:text-[1.08rem] leading-[1.6]">
                  <strong className="text-white">{item.label}</strong>
                  {item.note && <span className="text-[#6b7280] italic text-[0.82rem] md:text-[0.92rem]"> ({item.note})</span>}
                </p>
              </div>
            ))}
          </div>

          {/* Why so cheap */}
          <h3 className="font-extrabold text-[1.2rem] md:text-[1.8rem] text-white mb-6 text-center uppercase tracking-tight">
            &ldquo;Why so cheap? What&apos;s the catch?&rdquo;
          </h3>

          <div className="space-y-5 text-[0.92rem] md:text-[1.08rem] text-[#b0b0b0] leading-[1.8] mb-10 md:mb-14">
            <p>Fair question. Everyone in this industry has trained you to look for the catch.</p>

            <p>
              Here it is, honestly: <strong className="text-white">the ₹299 is a filter, not a business model.</strong> Free webinars attract freebie collectors who don&apos;t show up and don&apos;t pay attention. ₹299 attracts people serious enough to invest the price of a movie ticket in their own education. Those are the people I want in the room.
            </p>

            <p>
              And yes, at the end I&apos;ll tell you about our 2-day Trading Marathon for those who want to go deeper. No pressure, no dark-pattern countdown timers on your soul. The webinar delivers standalone value whether you ever spend another rupee with us or not. That&apos;s the deal.
            </p>
          </div>

          {/* Guarantee */}
          <div className="text-center mb-10 md:mb-14">
            <HiShieldCheck className="text-[#0bb158] mx-auto mb-3" size={40} />
            <h3 className="font-extrabold text-[1.2rem] md:text-[1.8rem] text-white mb-4 uppercase tracking-tight">
              And if it doesn&apos;t deliver? You don&apos;t pay.
            </h3>
            <p className="text-[0.92rem] md:text-[1.08rem] text-[#b0b0b0] leading-[1.8] max-w-lg mx-auto">
              Attend the full session. If you don&apos;t walk away seeing charts differently, message us on WhatsApp within 24 hours and we&apos;ll refund your ₹299. No questions, no forms, no hard feelings.
            </p>
          </div>

          {/* Pricing block */}
          <div className="text-center mb-3">
            <div className="text-[#0bb158] text-5xl md:text-7xl font-extrabold mb-2">₹299</div>
            <div className="text-[#6b7280] text-[0.85rem] md:text-[1rem] mb-6">One-time · Inclusive of all taxes · 24-hour refund guarantee</div>
          </div>

          <CtaBlock />

          <div className="flex justify-center gap-4 md:gap-6 flex-wrap mt-5 text-[0.72rem] md:text-[0.82rem] text-[#6b7280]">
            <span><HiLockClosed className="inline align-middle mr-0.5" size={13} /> 256-bit SSL</span>
            <span><HiCheckCircle className="inline align-middle mr-0.5 text-[#22c55e]" size={13} /> Razorpay</span>
            <span><HiCreditCard className="inline align-middle mr-0.5" size={13} /> UPI, Cards</span>
          </div>
        </div>
      </section>

      {/* ═══════════ Urgency ═══════════ */}
      <section className="py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-extrabold text-[1.3rem] md:text-[2rem] text-white mb-4 md:mb-6 uppercase tracking-tight">
            One session per week. 100 seats.<br />That&apos;s real, not marketing.
          </h2>

          <p className="text-[0.92rem] md:text-[1.05rem] text-[#b0b0b0] leading-[1.7] max-w-xl mx-auto mb-8">
            We keep sessions capped so the Q&A stays useful. 500 people asking questions helps nobody. When a session fills, the next slot is the following week.
          </p>

          {/* Countdown */}
          <div className="inline-block bg-[#050505] border-2 border-[rgba(11,177,88,0.3)] rounded-xl px-6 md:px-12 py-5 md:py-6 mb-6">
            <div className="text-[0.72rem] md:text-[0.82rem] text-[#6b7280] uppercase tracking-[0.12em] font-bold mb-3">Booking closes in</div>
            <CountdownTimer />
          </div>

          <div className="flex items-center justify-center gap-2">
            <HiFire className="text-red-500" size={18} />
            <span className="text-red-400 text-[0.85rem] md:text-[0.95rem] font-bold">Saturday, 12 July · 10:00 AM IST · 100 seats only</span>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-14 md:py-24 border-y border-[rgba(11,177,88,0.1)] bg-[rgba(0,0,0,0.3)]">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="font-extrabold text-[1.4rem] md:text-[2.4rem] text-white leading-[1.15] mb-10 md:mb-14 text-center uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          {FAQS.map((f, i) => (
            <Faq key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ═══════════ Final CTA ═══════════ */}
      <section className="py-14 md:py-24 text-center">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="font-extrabold text-[1.4rem] md:text-[2.6rem] text-white leading-[1.15] mb-6 md:mb-8 uppercase tracking-tight">
            Two hours. ₹299.<br />
            <span className="text-[#0bb158]">A completely different way of seeing every chart you&apos;ll ever open.</span>
          </h2>

          <div className="space-y-4 text-[0.92rem] md:text-[1.08rem] text-[#b0b0b0] leading-[1.8] max-w-xl mx-auto mb-10">
            <p>
              You can keep doing what you&apos;re doing. The indicators, the Telegram tips, the &ldquo;one more course&rdquo; cycle. The market will keep teaching you the expensive way.
            </p>
            <p>
              Or you can spend less than a pizza on finally understanding the <em className="text-white">mechanics</em> of why price moves. With a full refund if it doesn&apos;t deliver.
            </p>
          </div>

          <CtaBlock />

          <p className="mt-6 text-[0.82rem] md:text-[0.92rem] text-[#6b7280]">
            Next live session: Saturday, 12 July at 10:00 AM IST
          </p>
        </div>
      </section>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="bg-black text-[#6b7280] text-center py-8 md:py-10 px-5 md:px-8 border-t border-[rgba(11,177,88,0.1)]">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="OptionScore" width={64} height={64} className="h-6 w-6 md:h-8 md:w-8" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={320} height={56} className="h-4 md:h-5 w-auto" />
          </Link>
        </div>
        <div className="flex justify-center gap-4 md:gap-6 flex-wrap mb-4 text-[0.7rem] md:text-[0.8rem]">
          <Link href="/privacy-policy" className="hover:text-[#0bb158]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#0bb158]">Terms</Link>
          <Link href="/refund-policy" className="hover:text-[#0bb158]">Refund Policy</Link>
          <Link href="/contact" className="hover:text-[#0bb158]">Contact</Link>
        </div>
        <div className="text-[0.6rem] md:text-[0.7rem] text-[#555] max-w-[700px] mx-auto leading-relaxed">
          <strong>Disclaimer:</strong> This webinar is for educational purposes only. Nothing in this session constitutes investment advice, a recommendation, or a solicitation to buy or sell any security or financial instrument. Trading in securities and derivatives markets involves substantial risk of loss and is not suitable for every investor. Past performance of any framework, strategy, or individual does not guarantee future results. Student testimonials reflect individual learning experiences and do not represent typical outcomes or imply future trading profits. Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
        </div>
      </footer>

      {/* ═══════════ Sticky Bottom Bar ═══════════ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[999] md:hidden transition-transform duration-300 ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-[rgba(3,10,6,0.97)] backdrop-blur-md border-t border-[rgba(11,177,88,0.2)] py-2.5 px-4">
          <div className="flex justify-between items-center gap-3">
            <div>
              <span className="text-[0.75rem] text-white font-bold block">Sat, 12 July · 10 AM IST</span>
              <span className="text-[0.65rem] text-[#6b7280]">100 seats · ₹299</span>
            </div>
            <a href={RAZORPAY_URL} className="bg-[#0bb158] hover:bg-[#0ed668] text-black font-extrabold text-[0.78rem] py-2.5 px-5 rounded-lg transition-colors flex-shrink-0 uppercase tracking-wide">
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
        className="fixed bottom-14 md:bottom-5 right-3 md:right-6 z-[998] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
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
    <div className="border-b border-[rgba(11,177,88,0.12)] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"
      >
        <span className="text-white text-[0.88rem] md:text-[1.05rem] font-bold">{q}</span>
        {open ? <HiMinus className="text-[#0bb158] flex-shrink-0" size={18} /> : <HiPlus className="text-[#0bb158] flex-shrink-0" size={18} />}
      </button>
      {open && (
        <p className="pb-5 md:pb-6 text-[#b0b0b0] text-[0.85rem] md:text-[1rem] leading-[1.7]">{a}</p>
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
    const end = new Date("2026-07-12T04:30:00Z").getTime();
    const update = () => {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setDisplay(`${String(d).padStart(2,"0")}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!display) return null;

  return (
    <div className="flex justify-center gap-2.5 md:gap-4">
      {display.split(" ").map((unit) => {
        const num = unit.slice(0, -1);
        const label = unit.slice(-1) === "d" ? "Days" : unit.slice(-1) === "h" ? "Hours" : unit.slice(-1) === "m" ? "Min" : "Sec";
        return (
          <div key={label} className="text-center">
            <div className="inline-block bg-[#0a0a0a] text-white text-[1.1rem] md:text-[1.6rem] font-extrabold px-3 md:px-4 py-2 md:py-2.5 rounded-lg min-w-[42px] md:min-w-[56px] border border-[rgba(11,177,88,0.25)]">
              {num}
            </div>
            <div className="text-[0.55rem] md:text-[0.65rem] uppercase text-[#6b7280] tracking-[0.12em] mt-1.5">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
