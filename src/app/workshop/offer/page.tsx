"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheck, HiXMark, HiPlus, HiMinus } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  getLead,
  isPaid,
  setPaid,
  loadRazorpay,
  openRazorpay,
  type StoredLead,
  type RazorpayResponse,
} from "@/lib/funnel-client";
import { trackInitiateCheckout, trackPurchase } from "@/lib/fbpixel";
import { WORKSHOP, WORKSHOP_FEE_RUPEES } from "@/lib/workshop";

const WS_LEAD_KEY = "os_ws_lead";
const PRODUCT = "workshop";
const PRICE = `Rs. ${WORKSHOP_FEE_RUPEES.toLocaleString("en-IN")}`;

export default function WorkshopOfferPage() {
  const router = useRouter();
  const [lead, setLeadState] = useState<StoredLead | null>(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [socialProof, setSocialProof] = useState<{
    name: string;
    city: string;
  } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ─── Funnel protection ─── */
  useEffect(() => {
    const stored = getLead(WS_LEAD_KEY);
    if (!stored) {
      router.replace("/workshop");
      return;
    }
    if (isPaid(WS_LEAD_KEY)) {
      router.replace("/workshop/confirmed");
      return;
    }
    setLeadState(stored);
  }, [router]);

  /* ─── Sticky bar scroll listener ─── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setShowStickyBar(scrollPct > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ─── Social proof popup ─── */
  useEffect(() => {
    const names = WORKSHOP.socialProofNames;
    let idx = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const show = () => {
      const person = names[idx % names.length];
      idx++;
      setSocialProof(person);
      setTimeout(() => setSocialProof(null), 4000);
      timeout = setTimeout(show, 45000 + Math.random() * 45000);
    };
    timeout = setTimeout(show, 30000);
    return () => clearTimeout(timeout);
  }, []);

  /* ─── Payment handler ─── */
  const handlePay = useCallback(async () => {
    if (!lead) return;
    setError("");
    setPaying(true);
    trackInitiateCheckout(WORKSHOP_FEE_RUPEES);

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Could not load the payment window. Check your connection.");
      setPaying(false);
      return;
    }

    try {
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: PRODUCT }),
      });
      const order = await orderRes.json();
      if (!order.ok) {
        setError(order.error || "Could not start payment.");
        setPaying(false);
        return;
      }

      openRazorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "OptionScore",
        description: `${WORKSHOP.title} Registration`,
        image: `${window.location.origin}/images/logo.png`,
        prefill: { name: lead.name, email: lead.email, contact: lead.mobile },
        notes: { purpose: "workshop-registration" },
        theme: { color: "#0bb158" },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, lead, product: PRODUCT }),
            });
            const verify = await verifyRes.json();
            if (verify.ok) {
              setPaid(WS_LEAD_KEY, response.razorpay_payment_id);
              trackPurchase(WORKSHOP_FEE_RUPEES);
              router.push("/workshop/confirmed");
            } else {
              setError(verify.error || "Payment could not be verified.");
              setPaying(false);
            }
          } catch {
            setError("Payment verification error. Please contact support.");
            setPaying(false);
          }
        },
        modal: { ondismiss: () => setPaying(false) },
      });
    } catch {
      setError("Something went wrong. Please try again.");
      setPaying(false);
    }
  }, [lead, router]);

  const scrollToCta = () => {
    document
      .getElementById("register")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (!lead) return null;

  return (
    <div className="min-h-screen bg-[#020a05] text-[#d1d5db] flex flex-col relative overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(11,177,88,0.25)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_120%,rgba(11,177,88,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_0%_50%,rgba(11,177,88,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_100%_50%,rgba(11,177,88,0.12)_0%,transparent_50%)]" />
      </div>

      {/* ═══════════ Navbar ═══════════ */}
      <nav className="sticky top-0 z-[1000] bg-black border-b border-[rgba(11,177,88,0.15)] py-3">
        <div className="max-w-full mx-auto px-4 md:px-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="OptionScore" width={32} height={32} className="h-8 w-8" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={120} height={20} className="h-5 w-auto" />
          </Link>
          <button onClick={scrollToCta} className="bg-[#0bb158] text-black text-xs font-bold px-5 py-2 rounded-md hover:bg-[#0ed668] transition-colors font-mono">
            Reserve Seat →
          </button>
        </div>
      </nav>

      {/* ═══════════ Marquee Announcement Bar ═══════════ */}
      <div className="bg-[rgba(11,177,88,0.08)] border-b border-[rgba(11,177,88,0.2)] overflow-hidden whitespace-nowrap py-2 text-[0.8rem] font-semibold text-white relative z-[1]">
        <div className="inline-flex animate-[marquee_20s_linear_infinite]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex-shrink-0">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 align-middle mr-1" /> NEXT BATCH: {WORKSHOP.announcement.date} &nbsp;·&nbsp; Only {WORKSHOP.announcement.seats} Seats Remaining &nbsp;·&nbsp;{" "}
              <button onClick={scrollToCta} className="text-[#0bb158] font-bold underline">Reserve Now →</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <main className="flex-1 w-full relative z-[1]">
        {/* ═══════════ Hero ═══════════ */}
        <section ref={heroRef} className="py-12 md:py-16 text-center">
          <div className="max-w-full mx-auto px-4 md:px-16">
            <span className="inline-block bg-[#0bb158] text-white text-[0.75rem] font-bold tracking-[0.1em] uppercase px-5 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(11,177,88,0.3)] font-mono">
              {WORKSHOP.hero.badge}
            </span>

            <h1 className="font-mono font-bold text-[1.75rem] md:text-[2.6rem] leading-[1.15] text-white mb-4 whitespace-normal md:whitespace-nowrap">
              {WORKSHOP.hero.headline[0]}
              <span className="text-[#0bb158] [text-shadow:0_0_20px_rgba(11,177,88,0.5),0_0_40px_rgba(11,177,88,0.25)]">
                {WORKSHOP.hero.headline[1]}
              </span>
              <br />
              {WORKSHOP.hero.headline[2]}
            </h1>

            <p className="text-[1.1rem] text-[#6b7280] max-w-[900px] mx-auto mb-8 leading-[1.7]">
              {WORKSHOP.hero.sub}
            </p>

            {/* VSL Placeholder */}
            <div className="max-w-[800px] mx-auto mb-10 bg-[#0a0a0a] border border-[rgba(11,177,88,0.2)] rounded-2xl aspect-video flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-[#0bb158] flex items-center justify-center mb-4 text-2xl shadow-[0_0_30px_rgba(11,177,88,0.5)]">
                ▶
              </div>
              <p className="text-[1rem] text-[#6b7280]">{WORKSHOP.hero.vslText}</p>
            </div>

            {/* Hero Stats */}
            <div className="flex justify-center gap-8 flex-wrap mb-6">
              {WORKSHOP.heroStats.map((s) => (
                <span key={s.label} className="text-[0.88rem] text-[#6b7280]">
                  <HiCheck className="inline align-middle text-[#22c55e] mr-1" size={16} />
                  <strong className="text-white">{s.value}</strong> {s.label}
                </span>
              ))}
            </div>

            {/* Price Box */}
            <div className="inline-block bg-[#050505] border-2 border-[#0bb158] rounded-2xl px-12 py-6 mb-6 shadow-[0_0_20px_rgba(11,177,88,0.25),0_0_40px_rgba(11,177,88,0.1)] text-center">
              <div className="text-[1.1rem] text-[#6b7280] line-through">Rs. {WORKSHOP.totalValue.toLocaleString("en-IN")}</div>
              <div className="text-[2.2rem] md:text-[3rem] font-extrabold text-[#0bb158] [text-shadow:0_0_20px_rgba(11,177,88,0.4)]">
                {PRICE} <span className="inline-block bg-[#0bb158] text-white text-[0.8rem] font-bold px-3 py-1 rounded-full align-super ml-2">88% OFF</span>
              </div>
              <div className="text-[0.85rem] text-[#6b7280] mt-2">Workshop Price</div>
              <CountdownTimer />
            </div>

            <br />
            <button onClick={scrollToCta} className="cta-button inline-block">
              RESERVE MY SEAT — {PRICE} →
            </button>
            <div className="text-center mt-3 text-[0.82rem] text-[#6b7280]">
              Razorpay · Secure Payment · Instant Confirmation · EMI Available
            </div>
            <div className="mt-4 text-[0.95rem] text-[#0bb158] font-bold [text-shadow:0_0_15px_rgba(11,177,88,0.4)]">
              ⚠ Only {WORKSHOP.announcement.seats} spots left · Last batch closed before the scheduled date
            </div>
          </div>
        </section>

        {/* ═══════════ Experience Cards ═══════════ */}
        <WSection label="What Happens Inside This Workshop" title={<>Not Theory. Not Slides.<br />Live Markets. Live Feedback. Live Trading.</>} alt>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-7">
            {WORKSHOP.experienceCards.map((card) => (
              <div key={card.title} className="ws-card p-8 relative overflow-hidden">
                <div className="ws-card-glow" />
                <span className="inline-block bg-[#0bb158] text-white text-[0.75rem] font-bold px-3.5 py-1 rounded-full mb-4">
                  {card.tag}
                </span>
                <h3 className="font-mono font-bold text-[1.25rem] text-white mb-2">{card.title}</h3>
                <div className="flex gap-3 flex-wrap mb-3">
                  {card.meta.map((m) => (
                    <span key={m} className="text-[0.78rem] font-semibold px-3 py-1 rounded-full bg-[#0a0a0a] text-[#6b7280]">{m}</span>
                  ))}
                </div>
                <p className="text-[0.92rem] text-[#6b7280] mb-3">{card.body}</p>
                <ul>
                  {card.items.map((item) => (
                    <li key={item} className="text-[0.88rem] text-[#6b7280] py-1 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#0bb158] before:font-bold">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.8rem] text-[#9CA3AF]">⏱ {card.duration}</p>
              </div>
            ))}
          </div>
          <div className="text-center bg-[rgba(11,177,88,0.08)] border-2 border-[#0bb158] rounded-2xl p-5 font-semibold text-[#0ed668] relative overflow-hidden">
            <div className="ws-card-glow" />
            {WORKSHOP.buildSummary}
          </div>
        </WSection>

        {/* ═══════════ Schedule ═══════════ */}
        <WSection label="The 2-Day Schedule" title={<>Every Hour. Mapped.<br />Nothing Left to Chance.</>}>
          {[WORKSHOP.schedule.day1, WORKSHOP.schedule.day2].map((day) => (
            <div key={day.header} className="mb-12">
              <div className="text-center font-mono text-[1.1rem] font-bold text-[#0bb158] bg-[rgba(11,177,88,0.08)] border border-[rgba(11,177,88,0.2)] rounded-lg py-3.5 px-6 mb-8 tracking-wide">
                {day.header}
              </div>
              <div className="relative ml-6 border-l-[3px] border-[rgba(255,255,255,0.06)]">
                {day.sessions.map((s, i) => (
                  <div key={i} className="flex gap-6 pb-5 relative pl-8">
                    <div className={`absolute left-[-9px] top-1 w-[50px] h-[50px] rounded-full border-2 flex items-center justify-center flex-shrink-0 z-[1] text-[#6b7280] ${
                      s.type === "live" ? "border-[#0bb158] bg-[rgba(11,177,88,0.08)] text-[#0bb158]" : s.type === "break" ? "border-[rgba(11,177,88,0.3)] bg-[rgba(11,177,88,0.05)] text-[#0ed668]" : "border-[rgba(255,255,255,0.08)] bg-[#050505]"
                    }`}>
                      <span className="text-[0.7rem] font-mono font-bold">{s.duration}</span>
                    </div>
                    <div className="flex-1 ml-10 pt-1">
                      <div className="text-[0.8rem] font-bold text-[#0bb158] uppercase tracking-wide mb-1">{s.time}</div>
                      <h4 className="font-mono font-bold text-[1.05rem] text-white mb-1">
                        {s.title}
                        {s.tag && (
                          <span className={`inline-block text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full ml-2 ${
                            s.type === "live" ? "bg-[rgba(11,177,88,0.15)] text-[#0bb158]" : "bg-[rgba(11,177,88,0.1)] text-[#0ed668]"
                          }`}>
                            {s.tag}
                          </span>
                        )}
                      </h4>
                      {s.description && <p className="text-[0.88rem] text-[#6b7280]">{s.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </WSection>

        {/* ═══════════ Problem Section ═══════════ */}
        <WSection label={WORKSHOP.problem.label} title={<>{WORKSHOP.problem.headline.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</>} dark>
          <p className="text-center text-[#6b7280] max-w-[700px] mx-auto mb-12">{WORKSHOP.problem.body}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="ws-card-red p-7 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(239,68,68,0.12)_0%,transparent_40%,transparent_60%,rgba(239,68,68,0.12)_100%)] pointer-events-none" />
              <h4 className="font-mono font-bold text-[1.05rem] text-red-500 mb-4 pb-3 border-b border-[rgba(11,177,88,0.2)]">
                ✗ What Retail Traders Do
              </h4>
              <ul>
                {WORKSHOP.problem.retail.map((item) => (
                  <li key={item} className="text-[0.88rem] text-[#6b7280] py-1.5 pl-6 relative before:content-['✗'] before:absolute before:left-0 before:text-red-500 before:font-bold">{item}</li>
                ))}
              </ul>
            </div>
            <div className="ws-card p-7 relative overflow-hidden">
              <div className="ws-card-glow" />
              <h4 className="font-mono font-bold text-[1.05rem] text-[#0bb158] mb-4 pb-3 border-b border-[rgba(11,177,88,0.2)]">
                ✓ What Institutions Do
              </h4>
              <ul>
                {WORKSHOP.problem.institutional.map((item) => (
                  <li key={item} className="text-[0.88rem] text-[#6b7280] py-1.5 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#0bb158] before:font-bold">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center text-[1.05rem] text-[#6b7280] leading-[1.8] max-w-[500px] mx-auto">
            {WORKSHOP.problem.closing.map((line, i) => (
              <span key={i}>
                {line.startsWith("You have") ? <strong className="text-[#0bb158] text-[1.1rem]">{line}</strong> : line}
                {i < WORKSHOP.problem.closing.length - 1 && <br />}
              </span>
            ))}
          </div>
        </WSection>

        {/* ═══════════ Value Stack ═══════════ */}
        <WSection title={`Everything Included in Your ${PRICE} Workshop Seat`} alt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {WORKSHOP.valueStack.map((item) => (
              <div key={item.label} className="ws-card flex gap-4 p-5 relative overflow-hidden">
                <div className="ws-card-glow" />
                <div className="w-12 h-12 bg-[rgba(11,177,88,0.1)] text-[#0bb158] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiCheck size={20} />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-[0.95rem] text-white mb-0.5">{item.label}</h4>
                  <span className="text-[0.8rem] text-[#6b7280] line-through">Rs. {item.value.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
            {/* Alumni pricing card */}
            <div className="ws-card flex gap-4 p-5 relative overflow-hidden">
              <div className="ws-card-glow" />
              <div className="w-12 h-12 bg-[rgba(11,177,88,0.1)] text-[#0bb158] rounded-lg flex items-center justify-center flex-shrink-0">
                ★
              </div>
              <div>
                <h4 className="font-mono font-bold text-[0.95rem] text-white mb-0.5">Alumni Pricing on Future Workshops &amp; Courses</h4>
                <span className="text-[0.8rem] text-[#0bb158] font-semibold">Priceless</span>
              </div>
            </div>
          </div>
          <div className="ws-card text-center p-8 relative overflow-hidden">
            <div className="ws-card-glow" />
            <div className="text-[1.1rem] text-[#6b7280] line-through">Total Value: Rs. {WORKSHOP.totalValue.toLocaleString("en-IN")}</div>
            <div className="text-[2.4rem] md:text-[3rem] font-extrabold text-[#0bb158] my-2 [text-shadow:0_0_20px_rgba(11,177,88,0.4)]">{PRICE}</div>
            <div className="inline-block bg-[#0bb158] text-white px-4 py-1 rounded-full font-bold text-[0.85rem]">
              You Save Rs. {(WORKSHOP.totalValue - WORKSHOP_FEE_RUPEES).toLocaleString("en-IN")} (88% OFF)
            </div>
          </div>
          <div className="text-center mt-8">
            <button onClick={scrollToCta} className="cta-button">RESERVE MY SEAT — {PRICE} →</button>
            <div className="flex justify-center gap-4 flex-wrap mt-4 text-[0.8rem] text-[#6b7280]">
              <span>🔒 256-bit SSL</span>
              <span>✓ Powered by Razorpay</span>
              <span>💳 Cards, UPI, Net Banking, EMI</span>
            </div>
            <p className="text-[0.88rem] text-[#6b7280] mt-4 max-w-[500px] mx-auto">
              Most traders lose more than Rs. 5,999 in a single bad trade. This workshop fixes the reason those trades keep happening.
            </p>
          </div>
        </WSection>

        {/* ═══════════ Who It's For ═══════════ */}
        <WSection label="Is This Workshop Right For You?" title={<>Serious Traders Only.<br />Not Everyone Should Register.</>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-mono font-bold text-[1.15rem] text-[#0bb158] mb-4 pb-3 border-b-2 border-[#0bb158]">
                ✓ This Workshop is PERFECT if you:
              </h3>
              <ul>
                {WORKSHOP.whoItsFor.perfect.map((item) => (
                  <li key={item} className="text-[0.92rem] text-[#6b7280] py-2 pl-7 relative">
                    <span className="absolute left-0">✅</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono font-bold text-[1.15rem] text-red-500 mb-4 pb-3 border-b-2 border-red-500">
                ✗ This is NOT for you if:
              </h3>
              <ul>
                {WORKSHOP.whoItsFor.notFor.map((item) => (
                  <li key={item} className="text-[0.92rem] text-[#6b7280] py-2 pl-7 relative">
                    <span className="absolute left-0">❌</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </WSection>

        {/* ═══════════ Instructor ═══════════ */}
        <WSection label="Your Instructor" title="Who's Teaching This Workshop?" alt>
          <div className="ws-card flex flex-col md:flex-row gap-12 items-start p-10 md:p-12 relative overflow-hidden">
            <div className="ws-card-glow" />
            <Image
              src="/images/instructor.png"
              alt={WORKSHOP.instructor.name}
              width={180}
              height={180}
              className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-full object-cover flex-shrink-0 border-[3px] border-[rgba(11,177,88,0.3)] shadow-[0_0_30px_rgba(11,177,88,0.3)] mx-auto md:mx-0"
            />
            <div>
              <h3 className="font-mono font-bold text-[1.5rem] text-white mb-1">{WORKSHOP.instructor.name}</h3>
              <div className="text-[0.9rem] text-[#0bb158] font-semibold mb-4">{WORKSHOP.instructor.title}</div>
              {WORKSHOP.instructor.bio.map((p, i) => (
                <p key={i} className="text-[0.92rem] text-[#6b7280] leading-[1.7] mb-3">{p}</p>
              ))}
              <div className="flex gap-7 mt-4 flex-wrap">
                {WORKSHOP.instructor.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[1.4rem] font-extrabold text-[#0bb158]">{stat.value}</div>
                    <div className="text-[0.75rem] text-[#6b7280] uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {WORKSHOP.instructor.credentials.map((c) => (
                  <span key={c} className="text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[rgba(11,177,88,0.1)] text-[#0bb158]">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </WSection>

        {/* ═══════════ Testimonials ═══════════ */}
        <WSection label="What Traders Say" title={<>★★★★★ 4.9/5 Average Rating ([X] Reviews)</>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {WORKSHOP.testimonials.map((t, i) => (
              <div key={i} className="ws-card p-6 flex flex-col relative overflow-hidden">
                <div className="ws-card-glow" />
                <div className="text-yellow-400 mb-2">★★★★★</div>
                <div className="font-bold text-[0.95rem] text-white mb-2">{t.headline}</div>
                <blockquote className="text-[0.88rem] text-[#6b7280] italic leading-[1.6] mb-3 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-2.5 mt-auto">
                  <div className="w-9 h-9 rounded-full bg-[rgba(11,177,88,0.15)] text-[#0bb158] flex items-center justify-center font-bold text-[0.8rem]">{t.initials}</div>
                  <div>
                    <div className="font-bold text-[0.85rem] text-white">{t.name}</div>
                    <div className="text-[0.75rem] text-[#6b7280]">{t.location}</div>
                    <div className="text-[0.7rem] text-[#0bb158] font-semibold">✓ Verified Workshop Attendee</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ws-card flex justify-center gap-10 flex-wrap p-5">
            {WORKSHOP.testimonialHighlights.map((h) => (
              <div key={h.label} className="text-center">
                <div className="text-[1.3rem] font-extrabold text-[#0bb158]">{h.value}</div>
                <div className="text-[0.78rem] text-[#6b7280]">{h.label}</div>
              </div>
            ))}
          </div>
        </WSection>

        {/* ═══════════ FAQ ═══════════ */}
        <WSection title="Frequently Asked Questions" alt>
          <div className="max-w-[800px] mx-auto">
            {WORKSHOP.faqs.map((f, i) => (
              <Faq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </WSection>

        {/* ═══════════ Register / Pricing ═══════════ */}
        <section id="register" className="py-20 relative z-[1]">
          <div className="max-w-full mx-auto px-4 md:px-16">
            <CountdownTimer />
            <h2 className="font-mono font-bold text-[2.2rem] text-white text-center mb-3">
              Reserve Your Seat ({WORKSHOP.announcement.seats} Spots Left)
            </h2>
            <p className="text-center text-[#6b7280] mb-8">
              ⚠ Workshop is {WORKSHOP.announcement.date} · Last batch closed before scheduled date
            </p>

            <div className="ws-card max-w-[700px] mx-auto border-2 border-[rgba(11,177,88,0.3)] shadow-[0_0_30px_rgba(11,177,88,0.1),0_0_60px_rgba(11,177,88,0.05)] overflow-hidden relative">
              <div className="ws-card-glow" />
              <div className="bg-[#0bb158] text-white text-center py-5 text-[1.2rem] font-bold font-mono">
                2-Day Live Workshop — All Inclusive
              </div>
              <div className="p-8 md:p-9 text-center">
                <div className="text-left mb-6">
                  {WORKSHOP.valueStack.map((item) => (
                    <div key={item.label} className="flex justify-between py-2.5 border-b border-[rgba(11,177,88,0.2)] text-[0.88rem] text-[#d1d5db]">
                      <span>{item.label}</span>
                      <span className="text-[#6b7280] line-through text-[0.82rem]">Rs. {item.value.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-3.5 border-t-2 border-[rgba(11,177,88,0.2)] font-bold text-white">
                    <span>Total Value</span>
                    <span className="text-[#6b7280] line-through">Rs. {WORKSHOP.totalValue.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="my-5">
                  <div className="text-[0.85rem] text-[#6b7280] uppercase tracking-wide font-semibold">Your Investment Today</div>
                  <div className="text-[2.6rem] md:text-[3.5rem] font-extrabold text-[#0bb158] [text-shadow:0_0_20px_rgba(11,177,88,0.4)]">{PRICE}</div>
                  <div className="inline-block bg-[rgba(11,177,88,0.15)] text-[#0bb158] px-3.5 py-1 rounded-full font-bold text-[0.85rem]">
                    Save Rs. {(WORKSHOP.totalValue - WORKSHOP_FEE_RUPEES).toLocaleString("en-IN")} (88% OFF)
                  </div>
                </div>

                {error && (
                  <div className="bg-[#0a0a0a] border border-red-500/30 p-3 mb-4 rounded">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="cta-button w-full text-[1.2rem] py-5 my-5 disabled:opacity-70"
                >
                  {paying ? "Processing..." : `RESERVE MY SEAT — ${PRICE} →`}
                </button>

                <div className="flex justify-center gap-4 flex-wrap mb-6 text-[0.8rem] text-[#6b7280]">
                  <span>🔒 256-bit SSL</span>
                  <span>✓ Powered by Razorpay</span>
                  <span>💳 Cards, UPI, Net Banking, EMI</span>
                </div>

                <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.12)] rounded-lg p-5 text-left mb-5">
                  <h4 className="font-mono font-bold text-[0.95rem] text-white mb-2">🛡 My Personal Guarantee</h4>
                  <p className="text-[0.85rem] text-[#6b7280] leading-[1.6]">{WORKSHOP.guarantee}</p>
                </div>
              </div>
            </div>

            {/* Post-register steps */}
            <div className="text-center mt-8">
              <h4 className="text-[1.05rem] font-bold text-white mb-4">What Happens After You Register:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[700px] mx-auto text-left">
                {WORKSHOP.postRegister.map((step, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#0bb158] text-white flex items-center justify-center font-bold text-[0.8rem] flex-shrink-0">{i + 1}</div>
                    <span className="text-[0.82rem] text-[#6b7280] pt-1">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ Contrast / Final CTA ═══════════ */}
        <section className="py-20 bg-[rgba(1,1,1,0.6)] border-t border-[rgba(11,177,88,0.1)] text-center relative z-[1]">
          <div className="max-w-full mx-auto px-4 md:px-16">
            <h2 className="font-mono font-bold text-[1.5rem] md:text-[2.2rem] text-white mb-10">Don&apos;t Keep Trading the Hard Way.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-7 text-left relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,transparent_40%,transparent_60%,rgba(255,255,255,0.05)_100%)] pointer-events-none" />
                <h4 className="font-mono font-bold text-[1.05rem] text-[#6b7280] mb-4 pb-3 border-b border-[rgba(11,177,88,0.2)]">✗ The Hard Way:</h4>
                <ul>
                  {WORKSHOP.contrast.hardWay.map((item) => (
                    <li key={item} className="text-[0.88rem] text-[#6b7280] py-1.5 pl-6 relative before:content-['✗'] before:absolute before:left-0 before:text-[#6b7280]">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="ws-card p-7 text-left relative overflow-hidden">
                <div className="ws-card-glow" />
                <h4 className="font-mono font-bold text-[1.05rem] text-[#0bb158] mb-4 pb-3 border-b border-[rgba(11,177,88,0.2)]">✓ The OptionScore Way:</h4>
                <ul>
                  {WORKSHOP.contrast.optionScoreWay.map((item) => (
                    <li key={item} className="text-[0.88rem] text-[#6b7280] py-1.5 pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#0bb158] before:font-bold">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center gap-10 flex-wrap mb-10">
              {WORKSHOP.finalStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[1.3rem] font-extrabold text-[#0bb158]">{s.value}</div>
                  <div className="text-[0.78rem] text-[#6b7280]">{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={scrollToCta} className="cta-button mb-3">YES — RESERVE MY SEAT — {PRICE} →</button>
            <div className="text-[0.85rem] text-[#9CA3AF] mt-2">Only {WORKSHOP.announcement.seats} spots left for {WORKSHOP.announcement.date} batch</div>
            <div className="mt-4 text-[0.88rem] text-[#6b7280] italic">{WORKSHOP.finalPS}</div>
          </div>
        </section>
      </main>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="bg-[rgba(1,1,1,0.7)] text-[#6b7280] text-center py-10 px-6 border-t border-[rgba(11,177,88,0.1)] relative z-[1]">
        <div className="flex justify-center mb-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="OptionScore" width={32} height={32} className="h-8 w-8" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={120} height={20} className="h-5 w-auto" />
          </Link>
        </div>
        <div className="text-[12px] text-[#6b7280] mb-3">{WORKSHOP.footer.rera}</div>
        <div className="flex justify-center gap-6 mb-3 text-[0.8rem]">
          <Link href="/privacy-policy" className="hover:text-[#0bb158]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#0bb158]">Terms &amp; Conditions</Link>
          <Link href="/contact" className="hover:text-[#0bb158]">Contact Us</Link>
          <a href={`https://wa.me/${WORKSHOP.whatsappNumber}?text=${encodeURIComponent(WORKSHOP.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0bb158]">WhatsApp</a>
        </div>
        <div className="text-[0.75rem] mb-3">&copy; 2026 OptionScore Academy. All rights reserved.</div>
        <div className="text-[0.7rem] text-[#6b7280] max-w-[600px] mx-auto border-t border-[rgba(11,177,88,0.2)] pt-4">
          {WORKSHOP.footer.disclaimer}
        </div>
      </footer>

      {/* ═══════════ Sticky Bottom Bar ═══════════ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[999] bg-[rgba(5,5,5,0.95)] border-t border-[rgba(11,177,88,0.2)] py-3 px-6 flex justify-center items-center gap-5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] backdrop-blur-[12px] transition-transform duration-400 ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <span className="text-[0.9rem] text-[#6b7280]">🔥 {WORKSHOP.announcement.seats} seats left · <strong className="text-[1.2rem] text-[#0bb158] font-extrabold">{PRICE}</strong></span>
        <button onClick={scrollToCta} className="cta-button !py-3 !px-8 !text-[0.95rem]">Reserve Now →</button>
      </div>

      {/* ═══════════ Social Proof Toast ═══════════ */}
      <AnimatePresence>
        {socialProof && (
          <motion.div
            initial={{ x: -120 }}
            animate={{ x: 0 }}
            exit={{ x: -120 }}
            className="fixed bottom-20 left-6 z-[998] bg-[rgba(5,5,5,0.95)] border border-[rgba(11,177,88,0.15)] rounded-lg px-5 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center gap-2.5 max-w-[300px] text-[0.82rem] text-[#d1d5db]"
          >
            <span className="text-[#6b7280]">👤</span>
            <span><strong>{socialProof.name}</strong> from {socialProof.city} just registered</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ Floating WhatsApp ═══════════ */}
      <a
        href={`https://wa.me/${WORKSHOP.whatsappNumber}?text=${encodeURIComponent(WORKSHOP.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 z-[998] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
        title="Questions? Chat with us"
      >
        <FaWhatsapp size={28} className="text-white" />
      </a>

      {/* ═══════════ Custom Styles ═══════════ */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes btn-gradient-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes btn-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(11,177,88,0.25), 0 0 40px rgba(11,177,88,0.1); }
          50% { box-shadow: 0 0 30px rgba(11,177,88,0.35), 0 0 60px rgba(11,177,88,0.15); }
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #0bb158, #0ed668, #0bb158);
          background-size: 200% 200%;
          color: #010101;
          font-size: 1.15rem;
          font-weight: 700;
          padding: 18px 48px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 0 20px rgba(11,177,88,0.25), 0 0 40px rgba(11,177,88,0.1);
          text-transform: uppercase;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          animation: btn-gradient-shimmer 3s ease infinite, btn-glow-pulse 2s ease-in-out infinite;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(11,177,88,0.4), 0 0 60px rgba(11,177,88,0.2);
        }
        .cta-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .ws-card {
          background: rgba(5,5,5,0.85);
          border: 1px solid rgba(11,177,88,0.15);
          border-radius: 16px;
          transition: all 0.3s;
        }
        .ws-card:hover {
          transform: translateY(-2px);
          border-color: rgba(11,177,88,0.3);
          box-shadow: 0 4px 30px rgba(11,177,88,0.12);
        }
        .ws-card-glow {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, rgba(11,177,88,0.22) 0%, transparent 40%, transparent 60%, rgba(11,177,88,0.22) 100%);
          pointer-events: none;
        }
        .ws-card-red {
          background: rgba(239,68,68,0.05);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Presentational helpers
   ═══════════════════════════════════════════════════ */

function WSection({
  label,
  title,
  children,
  alt,
  dark,
}: {
  label?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  alt?: boolean;
  dark?: boolean;
}) {
  return (
    <section className={`py-20 relative z-[1] ${alt ? "bg-[rgba(2,10,5,0.4)]" : ""} ${dark ? "bg-[rgba(2,10,5,0.6)]" : ""}`}>
      <div className="max-w-full mx-auto px-4 md:px-16">
        {label && (
          <div className="text-center text-[0.8rem] font-bold tracking-[0.1em] uppercase text-[#0bb158] mb-3">
            {label}
          </div>
        )}
        <h2 className="font-mono font-bold text-center text-[1.5rem] md:text-[2.2rem] text-white mb-3">
          {title}
        </h2>
        <div className="mb-12" />
        {children}
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ws-card mb-2.5 overflow-hidden relative">
      <div className="ws-card-glow" />
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4.5 text-left hover:bg-[#0a0a0a] transition-colors"
      >
        <span className="text-white text-[0.95rem] font-semibold">{q}</span>
        <span className={`text-[#0bb158] text-[1.2rem] flex-shrink-0 ml-4 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <p className="px-5 pb-4.5 text-[#6b7280] text-[0.9rem] leading-[1.7]">{a}</p>
      )}
    </div>
  );
}

function CountdownTimer() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let stored = localStorage.getItem("optionscore_countdown_end");
    if (!stored) {
      stored = String(Date.now() + 48 * 3600000);
      localStorage.setItem("optionscore_countdown_end", stored);
    }
    const end = parseInt(stored);

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
    <div className="flex justify-center gap-3.5 my-4">
      {display.split(" ").map((unit) => {
        const num = unit.slice(0, -1);
        const label = unit.slice(-1) === "d" ? "Days" : unit.slice(-1) === "h" ? "Hours" : unit.slice(-1) === "m" ? "Min" : "Sec";
        return (
          <div key={label} className="text-center">
            <div className="inline-block bg-[#0a0a0a] text-white text-[1.1rem] md:text-[1.4rem] font-extrabold px-3 md:px-3.5 py-2 rounded-lg min-w-[42px] md:min-w-[52px] border border-[rgba(11,177,88,0.2)]">
              {num}
            </div>
            <div className="text-[0.65rem] uppercase text-[#6b7280] tracking-[0.1em] mt-1">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
