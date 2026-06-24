"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheck,
  HiXMark,
  HiPlus,
  HiMinus,
  HiPlay,
  HiExclamationTriangle,
  HiLockClosed,
  HiCreditCard,
  HiShieldCheck,
  HiFire,
  HiUser,
  HiClock,
  HiStar,
  HiCheckCircle,
  HiXCircle,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiPresentationChartLine,
  HiPencilSquare,
  HiAcademicCap,
  HiBolt,
  HiArrowRight,
} from "react-icons/hi2";
import { PiCoffeeBold } from "react-icons/pi";
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
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_90%_at_50%_-10%,rgba(11,177,88,0.5)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_50%,rgba(11,177,88,0.25)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(11,177,88,0.25)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_110%,rgba(11,177,88,0.4)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,177,88,0.1)_0%,transparent_30%,transparent_70%,rgba(11,177,88,0.1)_100%)]" />
      </div>

      {/* ═══════════ Navbar ═══════════ */}
      <nav className="sticky top-0 z-[1000] bg-black border-b border-[rgba(11,177,88,0.15)] py-2 md:py-3">
        <div className="max-w-full mx-auto px-4 md:px-16 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 cursor-pointer">
            <Image src="/images/logo.png" alt="OptionScore" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={120} height={20} className="h-4 md:h-5 w-auto" />
          </button>
          <button onClick={scrollToCta} className="bg-[#0bb158] text-black text-[0.7rem] md:text-xs font-bold px-3 md:px-5 py-1.5 md:py-2 rounded-md hover:bg-[#0ed668] transition-colors">
            Reserve Seat
          </button>
        </div>
      </nav>

      {/* ═══════════ Marquee Announcement Bar ═══════════ */}
      <div className="bg-[rgba(11,177,88,0.05)] border-b border-[rgba(11,177,88,0.12)] overflow-hidden whitespace-nowrap py-1.5 md:py-2 text-[0.7rem] md:text-[0.8rem] text-[#9CA3AF] relative z-[1]">
        <div className="inline-flex animate-[marquee_20s_linear_infinite]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex-shrink-0">
              Next Batch: {WORKSHOP.announcement.date} &nbsp;·&nbsp; {WORKSHOP.announcement.seats} seats remaining &nbsp;·&nbsp; Rs. {WORKSHOP_FEE_RUPEES.toLocaleString("en-IN")}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <main className="flex-1 w-full relative z-[1]">
        {/* ═══════════ Hero ═══════════ */}
        <section ref={heroRef} className="py-8 md:py-16 text-center">
          <div className="max-w-full mx-auto px-4 md:px-16">
            <span className="inline-block bg-[rgba(11,177,88,0.12)] text-[#0bb158] text-[0.6rem] md:text-[0.75rem] font-semibold tracking-[0.08em] md:tracking-[0.1em] uppercase px-3 md:px-5 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 border border-[rgba(11,177,88,0.25)] leading-tight">
              {WORKSHOP.hero.badge}
            </span>

            <TypeWriter
              segments={[
                { text: "Watch Me Trade. ", mobileBr: true },
                { text: "Live. In Front of You.", green: true, br: true },
                { text: "Real Market. Real Time." },
              ]}
              className="font-bold text-[1.3rem] md:text-[2.6rem] leading-[1.2] md:leading-[1.15] text-white mb-3 md:mb-4"
            />

            <p className="text-[0.85rem] md:text-[1.1rem] text-[#6b7280] max-w-[900px] mx-auto mb-6 md:mb-8 leading-[1.6] md:leading-[1.7]">
              {WORKSHOP.hero.sub}
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:flex md:justify-center gap-3 md:gap-8 mb-5 md:mb-6">
              {WORKSHOP.heroStats.map((s) => (
                <span key={s.label} className="text-[0.75rem] md:text-[0.88rem] text-[#6b7280] flex items-center gap-1">
                  <HiCheck className="text-[#22c55e] flex-shrink-0" size={14} />
                  <strong className="text-white">{s.value}</strong> {s.label}
                </span>
              ))}
            </div>

            {/* Price Box */}
            <div className="inline-block bg-[#050505] border border-[rgba(11,177,88,0.3)] rounded-xl md:rounded-2xl px-6 md:px-12 py-4 md:py-6 mb-5 md:mb-6 text-center">
              <div className="text-[0.82rem] md:text-[0.95rem] text-[#6b7280] line-through">Rs. {WORKSHOP.totalValue.toLocaleString("en-IN")}</div>
              <div className="text-[1.8rem] md:text-[3rem] font-extrabold text-[#0bb158]">
                {PRICE}
              </div>
              <div className="text-[0.75rem] md:text-[0.85rem] text-[#6b7280] mt-1 md:mt-2">for the full 2-day workshop</div>
              <CountdownTimer />
            </div>

            <br />
            <button onClick={scrollToCta} className="cta-button inline-block">
              Reserve My Seat — {PRICE}
            </button>
            <div className="text-center mt-2 md:mt-3 text-[0.7rem] md:text-[0.82rem] text-[#6b7280]">
              Secure payment via Razorpay · UPI, Cards, EMI
            </div>
            <div className="mt-3 md:mt-4 text-[0.78rem] md:text-[0.88rem] text-[#9CA3AF]">
              Only {WORKSHOP.announcement.seats} spots left for the {WORKSHOP.announcement.date} batch
            </div>
          </div>
        </section>

        {/* ═══════════ Experience Cards ═══════════ */}
        <WSection label="What Happens Inside This Workshop" title={<>Not Theory. Not Slides.<br />Live Markets. Live Feedback. Live Trading.</>} alt>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-7 mb-4 md:mb-7">
            {WORKSHOP.experienceCards.map((card) => (
              <div key={card.title} className="ws-card p-5 md:p-8">
                <span className="inline-block text-[#0bb158] text-[0.7rem] md:text-[0.75rem] font-semibold mb-2 md:mb-3 uppercase tracking-wide">
                  {card.tag}
                </span>
                <h3 className="font-bold text-[1rem] md:text-[1.25rem] text-white mb-2">{card.title}</h3>
                <p className="text-[0.82rem] md:text-[0.92rem] text-[#9CA3AF] mb-2 md:mb-3">{card.body}</p>
                <ul>
                  {card.items.map((item) => (
                    <li key={item} className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] py-0.5 md:py-1 flex items-start gap-2">
                      <HiCheck className="text-[#0bb158] mt-0.5 flex-shrink-0" size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 md:mt-3 text-[0.72rem] md:text-[0.8rem] text-[#9CA3AF] flex items-center gap-1"><HiClock size={12} /> {card.duration}</p>
              </div>
            ))}
          </div>
          <div className="text-center bg-[rgba(11,177,88,0.06)] border border-[rgba(11,177,88,0.2)] rounded-xl md:rounded-2xl p-4 md:p-5 font-semibold text-[0.82rem] md:text-[1rem] text-[#0ed668]">
            {WORKSHOP.buildSummary}
          </div>
        </WSection>

        {/* ═══════════ Schedule ═══════════ */}
        <WSection label="The 2-Day Schedule" title={<>Every Hour. Mapped.<br />Nothing Left to Chance.</>}>
          {[WORKSHOP.schedule.day1, WORKSHOP.schedule.day2].map((day) => (
            <div key={day.header} className="mb-8 md:mb-12">
              <div className="text-center text-[0.75rem] md:text-[1.1rem] font-bold text-[#0bb158] bg-[rgba(11,177,88,0.08)] border border-[rgba(11,177,88,0.2)] rounded-lg py-2.5 md:py-3.5 px-3 md:px-6 mb-6 md:mb-8 tracking-wide">
                {day.header}
              </div>
              <div className="relative ml-4 md:ml-6 border-l-[2px] md:border-l-[3px] border-[rgba(255,255,255,0.06)]">
                {day.sessions.map((s, i) => (
                  <div key={i} className="flex gap-3 md:gap-6 pb-4 md:pb-5 relative pl-6 md:pl-8">
                    <div className={`absolute left-[-7px] md:left-[-9px] top-1 w-[36px] h-[36px] md:w-[50px] md:h-[50px] rounded-full border-2 flex items-center justify-center flex-shrink-0 z-[1] ${
                      s.type === "live" ? "border-[#0bb158] bg-[rgba(11,177,88,0.08)] text-[#0bb158]" : s.type === "break" ? "border-[rgba(11,177,88,0.3)] bg-[rgba(11,177,88,0.05)] text-[#0ed668]" : "border-[rgba(255,255,255,0.08)] bg-[#050505] text-[#6b7280]"
                    }`}>
                      <TimelineIcon tag={s.tag} type={s.type} />
                    </div>
                    <div className="flex-1 ml-6 md:ml-10 pt-0.5 md:pt-1">
                      <div className="text-[0.7rem] md:text-[0.8rem] font-bold text-[#0bb158] uppercase tracking-wide mb-0.5 md:mb-1">{s.time}</div>
                      <h4 className="font-bold text-[0.85rem] md:text-[1.05rem] text-white mb-0.5 md:mb-1">
                        {s.title}
                        {s.tag && (
                          <span className={`hidden md:inline-block text-[0.65rem] md:text-[0.7rem] font-bold px-2 md:px-2.5 py-0.5 rounded-full ml-2 ${
                            s.type === "live" ? "bg-[rgba(11,177,88,0.15)] text-[#0bb158]" : "bg-[rgba(11,177,88,0.1)] text-[#0ed668]"
                          }`}>
                            {s.tag}
                          </span>
                        )}
                      </h4>
                      {s.description && <p className="text-[0.78rem] md:text-[0.88rem] text-[#6b7280]">{s.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </WSection>

        {/* ═══════════ Problem Section ═══════════ */}
        <WSection label={WORKSHOP.problem.label} title={<>{WORKSHOP.problem.headline.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</>} dark>
          <p className="text-center text-[0.82rem] md:text-[1rem] text-[#6b7280] max-w-[700px] mx-auto mb-8 md:mb-12">{WORKSHOP.problem.body}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="ws-card-red p-5 md:p-7">
              <h4 className="font-bold text-[0.88rem] md:text-[1.05rem] text-red-500 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[rgba(11,177,88,0.2)] flex items-center gap-2">
                <HiXCircle size={16} className="text-red-500 flex-shrink-0" /> What Retail Traders Do
              </h4>
              <ul>
                {WORKSHOP.problem.retail.map((item) => (
                  <li key={item} className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] py-1 md:py-1.5 flex items-start gap-2">
                    <HiXMark className="text-red-500 mt-0.5 flex-shrink-0" size={13} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ws-card p-5 md:p-7">
              <h4 className="font-bold text-[0.88rem] md:text-[1.05rem] text-[#0bb158] mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[rgba(11,177,88,0.2)] flex items-center gap-2">
                <HiCheckCircle size={16} className="text-[#0bb158] flex-shrink-0" /> What Institutions Do
              </h4>
              <ul>
                {WORKSHOP.problem.institutional.map((item) => (
                  <li key={item} className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] py-1 md:py-1.5 flex items-start gap-2">
                    <HiCheck className="text-[#0bb158] mt-0.5 flex-shrink-0" size={13} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center text-[0.88rem] md:text-[1.05rem] text-[#6b7280] leading-[1.7] md:leading-[1.8] max-w-[500px] mx-auto">
            {WORKSHOP.problem.closing.map((line, i) => (
              <span key={i}>
                {line.startsWith("You have") ? <strong className="text-[#0bb158] text-[0.95rem] md:text-[1.1rem]">{line}</strong> : line}
                {i < WORKSHOP.problem.closing.length - 1 && <br />}
              </span>
            ))}
          </div>
        </WSection>

        {/* ═══════════ Value Stack ═══════════ */}
        <WSection title={`Everything Included in Your ${PRICE} Workshop Seat`} alt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-8">
            {WORKSHOP.valueStack.map((item) => (
              <div key={item.label} className="ws-card flex gap-3 md:gap-4 p-3.5 md:p-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgba(11,177,88,0.08)] text-[#0bb158] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiCheck size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[0.8rem] md:text-[0.95rem] text-white mb-0.5 leading-tight">{item.label}</h4>
                  <span className="text-[0.72rem] md:text-[0.8rem] text-[#6b7280] line-through">Rs. {item.value.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
            {/* Alumni pricing card */}
            <div className="ws-card flex gap-3 md:gap-4 p-3.5 md:p-5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgba(11,177,88,0.08)] text-[#0bb158] rounded-lg flex items-center justify-center flex-shrink-0">
                <HiStar size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[0.8rem] md:text-[0.95rem] text-white mb-0.5 leading-tight">Alumni Pricing on Future Workshops &amp; Courses</h4>
                <span className="text-[0.72rem] md:text-[0.8rem] text-[#0bb158] font-semibold">Priceless</span>
              </div>
            </div>
          </div>
          <div className="ws-card text-center p-5 md:p-8">
            <div className="text-[0.85rem] md:text-[1rem] text-[#6b7280]">All of the above for just</div>
            <div className="text-[2rem] md:text-[3rem] font-extrabold text-[#0bb158] my-1 md:my-2">{PRICE}</div>
            <div className="text-[0.75rem] md:text-[0.85rem] text-[#6b7280]">
              instead of Rs. {WORKSHOP.totalValue.toLocaleString("en-IN")} if purchased separately
            </div>
          </div>
          <div className="text-center mt-6 md:mt-8">
            <button onClick={scrollToCta} className="cta-button">Register Now — {PRICE}</button>
          </div>
        </WSection>

        {/* ═══════════ Who It's For ═══════════ */}
        <WSection label="Is This For You?" title="Who Should Attend">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div>
              <h3 className="font-semibold text-[0.92rem] md:text-[1.15rem] text-[#0bb158] mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[rgba(11,177,88,0.3)]">
                Good fit if you:
              </h3>
              <ul>
                {WORKSHOP.whoItsFor.perfect.map((item) => (
                  <li key={item} className="text-[0.8rem] md:text-[0.92rem] text-[#6b7280] py-1.5 md:py-2 flex items-start gap-2">
                    <HiCheckCircle className="text-[#22c55e] mt-0.5 flex-shrink-0" size={14} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[0.92rem] md:text-[1.15rem] text-red-400 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[rgba(239,68,68,0.3)]">
                Not the right fit if you:
              </h3>
              <ul>
                {WORKSHOP.whoItsFor.notFor.map((item) => (
                  <li key={item} className="text-[0.8rem] md:text-[0.92rem] text-[#6b7280] py-1.5 md:py-2 flex items-start gap-2">
                    <HiXCircle className="text-red-500 mt-0.5 flex-shrink-0" size={14} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </WSection>

        {/* ═══════════ Instructor ═══════════ */}
        <WSection label="Your Instructor" title="Who's Teaching This Workshop?" alt>
          <div className="ws-card flex flex-col items-center text-center p-6 md:p-12">
            {/* Photo */}
            <Image
              src="/founder.jpg"
              alt={WORKSHOP.instructor.name}
              width={180}
              height={180}
              className="w-[100px] h-[100px] md:w-[160px] md:h-[160px] rounded-full object-cover border-[3px] border-[rgba(255,255,255,0.1)] mb-4 md:mb-5"
            />
            {/* Name & Title */}
            <h3 className="font-bold text-[1.15rem] md:text-[1.5rem] text-white mb-1">{WORKSHOP.instructor.name}</h3>
            <div className="text-[0.78rem] md:text-[0.9rem] text-[#0bb158] font-semibold mb-4 md:mb-6">{WORKSHOP.instructor.title}</div>
            {/* Stats row */}
            <div className="flex gap-6 md:gap-10 mb-5 md:mb-7 flex-wrap justify-center">
              {WORKSHOP.instructor.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[1.2rem] md:text-[1.6rem] font-extrabold text-[#0bb158]">{stat.value}</div>
                  <div className="text-[0.65rem] md:text-[0.75rem] text-[#6b7280] uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
            {/* Bio */}
            <div className="max-w-[700px]">
              {WORKSHOP.instructor.bio.map((p, i) => (
                <p key={i} className="text-[0.8rem] md:text-[0.92rem] text-[#6b7280] leading-[1.6] md:leading-[1.7] mb-2 md:mb-3">{p}</p>
              ))}
            </div>
            {/* Credential tags */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4 justify-center">
              {WORKSHOP.instructor.credentials.map((c) => (
                <span key={c} className="text-[0.65rem] md:text-[0.75rem] font-semibold px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-[rgba(11,177,88,0.1)] text-[#0bb158]">{c}</span>
              ))}
            </div>
          </div>
        </WSection>

        {/* ═══════════ Testimonials ═══════════ */}
        <WSection label="What Traders Say" title={<><span className="inline-flex gap-0.5 align-middle">{Array.from({length:5}).map((_,i)=><HiStar key={i} className="text-yellow-400" size={16} />)}</span> 4.9/5 Average Rating</>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {WORKSHOP.testimonials.map((t, i) => (
              <div key={i} className="ws-card p-4 md:p-6 flex flex-col">
                <div className="flex gap-0.5 mb-2">{Array.from({length:5}).map((_,j)=><HiStar key={j} className="text-yellow-400" size={13} />)}</div>
                <div className="font-bold text-[0.82rem] md:text-[0.95rem] text-white mb-1.5 md:mb-2">&ldquo;{t.headline}&rdquo;</div>
                <p className="text-[0.78rem] md:text-[0.88rem] text-[#9CA3AF] leading-[1.5] md:leading-[1.6] mb-3 md:mb-4 flex-1">{t.quote}</p>
                <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[rgba(255,255,255,0.08)] text-[#d1d5db] flex items-center justify-center font-semibold text-[0.7rem] md:text-[0.8rem]">{t.initials}</div>
                  <div>
                    <div className="font-semibold text-[0.78rem] md:text-[0.85rem] text-white">{t.name}</div>
                    <div className="text-[0.68rem] md:text-[0.75rem] text-[#6b7280]">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ws-card flex justify-center gap-6 md:gap-10 flex-wrap p-4 md:p-5">
            {WORKSHOP.testimonialHighlights.map((h) => (
              <div key={h.label} className="text-center">
                <div className="text-[1rem] md:text-[1.3rem] font-extrabold text-[#0bb158]">{h.value}</div>
                <div className="text-[0.68rem] md:text-[0.78rem] text-[#6b7280]">{h.label}</div>
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
        <section id="register" className="py-12 md:py-20 relative z-[1]">
          <div className="max-w-full mx-auto px-4 md:px-16">
            <h2 className="font-bold text-[1.3rem] md:text-[2.2rem] text-white text-center mb-2 md:mb-3">
              Register for the Workshop
            </h2>
            <p className="text-center text-[0.78rem] md:text-[1rem] text-[#6b7280] mb-6 md:mb-8">
              {WORKSHOP.announcement.date} · {WORKSHOP.announcement.seats} seats available
            </p>

            <div className="ws-card max-w-[700px] mx-auto border border-[rgba(11,177,88,0.25)] overflow-hidden">
              <div className="bg-[#0bb158] text-white text-center py-3 md:py-5 text-[0.95rem] md:text-[1.2rem] font-bold">
                2-Day Live Workshop — All Inclusive
              </div>
              <div className="p-5 md:p-9 text-center">
                <div className="text-left mb-4 md:mb-6">
                  {WORKSHOP.valueStack.map((item) => (
                    <div key={item.label} className="flex justify-between py-2 md:py-2.5 border-b border-[rgba(11,177,88,0.2)] text-[0.78rem] md:text-[0.88rem] text-[#d1d5db] gap-2">
                      <span className="min-w-0">{item.label}</span>
                      <span className="text-[#6b7280] line-through text-[0.72rem] md:text-[0.82rem] flex-shrink-0">Rs. {item.value.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2.5 md:py-3.5 border-t-2 border-[rgba(11,177,88,0.2)] font-bold text-white text-[0.82rem] md:text-[1rem]">
                    <span>Total Value</span>
                    <span className="text-[#6b7280] line-through">Rs. {WORKSHOP.totalValue.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="my-4 md:my-5">
                  <div className="text-[2.2rem] md:text-[3.5rem] font-extrabold text-[#0bb158]">{PRICE}</div>
                  <div className="text-[0.75rem] md:text-[0.85rem] text-[#6b7280]">one-time · no recurring charges</div>
                </div>

                {error && (
                  <div className="bg-[#0a0a0a] border border-red-500/30 p-3 mb-4 rounded">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="cta-button w-full !text-[0.95rem] md:!text-[1.2rem] !py-4 md:!py-5 my-4 md:my-5 disabled:opacity-70"
                >
                  {paying ? "Processing..." : `Reserve My Seat — ${PRICE}`}
                </button>

                <div className="flex justify-center gap-3 md:gap-4 flex-wrap mb-4 md:mb-6 text-[0.7rem] md:text-[0.8rem] text-[#6b7280]">
                  <span><HiLockClosed className="inline align-middle mr-0.5" size={12} /> 256-bit SSL</span>
                  <span><HiCheckCircle className="inline align-middle mr-0.5 text-[#22c55e]" size={12} /> Razorpay</span>
                  <span><HiCreditCard className="inline align-middle mr-0.5" size={12} /> Cards, UPI, EMI</span>
                </div>

                <div className="bg-[rgba(5,5,5,0.85)] border border-[rgba(11,177,88,0.12)] rounded-lg p-4 md:p-5 text-left mb-4 md:mb-5">
                  <h4 className="font-bold text-[0.82rem] md:text-[0.95rem] text-white mb-1.5 md:mb-2 flex items-center gap-2"><HiShieldCheck size={16} className="text-[#0bb158]" /> My Personal Guarantee</h4>
                  <p className="text-[0.78rem] md:text-[0.85rem] text-[#6b7280] leading-[1.5] md:leading-[1.6]">{WORKSHOP.guarantee}</p>
                </div>
              </div>
            </div>

            {/* Post-register steps */}
            <div className="text-center mt-6 md:mt-8 max-w-[600px] mx-auto">
              <p className="text-[0.78rem] md:text-[0.88rem] text-[#6b7280] leading-relaxed">
                After payment you&apos;ll get an instant confirmation email with the Zoom link, plus preparation material 48 hours before the workshop.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ Contrast / Final CTA ═══════════ */}
        <section className="py-12 md:py-20 bg-[rgba(1,1,1,0.6)] border-t border-[rgba(11,177,88,0.1)] text-center relative z-[1]">
          <div className="max-w-full mx-auto px-4 md:px-16">
            <h2 className="font-bold text-[1.2rem] md:text-[2.2rem] text-white mb-6 md:mb-10">Don&apos;t Keep Trading the Hard Way.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="ws-card-red p-5 md:p-7 text-left">
                <h4 className="font-bold text-[0.88rem] md:text-[1.05rem] text-[#6b7280] mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[rgba(11,177,88,0.2)] flex items-center gap-2">
                  <HiXCircle size={16} className="text-red-500 flex-shrink-0" /> The Hard Way:
                </h4>
                <ul>
                  {WORKSHOP.contrast.hardWay.map((item) => (
                    <li key={item} className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] py-1 md:py-1.5 flex items-start gap-2">
                      <HiXMark className="text-[#6b7280] mt-0.5 flex-shrink-0" size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ws-card p-5 md:p-7 text-left">
                <h4 className="font-bold text-[0.88rem] md:text-[1.05rem] text-[#0bb158] mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[rgba(11,177,88,0.2)] flex items-center gap-2">
                  <HiCheckCircle size={16} className="text-[#0bb158] flex-shrink-0" /> The OptionScore Way:
                </h4>
                <ul>
                  {WORKSHOP.contrast.optionScoreWay.map((item) => (
                    <li key={item} className="text-[0.8rem] md:text-[0.88rem] text-[#6b7280] py-1 md:py-1.5 flex items-start gap-2">
                      <HiCheck className="text-[#0bb158] mt-0.5 flex-shrink-0" size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center gap-6 md:gap-10 flex-wrap mb-6 md:mb-10">
              {WORKSHOP.finalStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[1rem] md:text-[1.3rem] font-extrabold text-[#0bb158]">{s.value}</div>
                  <div className="text-[0.68rem] md:text-[0.78rem] text-[#6b7280]">{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={scrollToCta} className="cta-button mb-3">Register Now — {PRICE}</button>
            <div className="text-[0.75rem] md:text-[0.85rem] text-[#9CA3AF] mt-2">Only {WORKSHOP.announcement.seats} spots left for {WORKSHOP.announcement.date} batch</div>
            <div className="mt-3 md:mt-4 text-[0.78rem] md:text-[0.88rem] text-[#6b7280] italic px-2">{WORKSHOP.finalPS}</div>
          </div>
        </section>
      </main>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="bg-[rgba(1,1,1,0.7)] text-[#6b7280] text-center py-8 md:py-10 px-4 md:px-6 border-t border-[rgba(11,177,88,0.1)] relative z-[1]">
        <div className="flex justify-center mb-3">
          <button onClick={() => router.back()} className="flex items-center gap-2 cursor-pointer">
            <Image src="/images/logo.png" alt="OptionScore" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8" />
            <Image src="/images/logo-text.png" alt="OptionScore" width={120} height={20} className="h-4 md:h-5 w-auto" />
          </button>
        </div>
        <div className="flex justify-center gap-3 md:gap-6 flex-wrap mb-3 text-[0.7rem] md:text-[0.8rem]">
          <Link href="/privacy-policy" className="hover:text-[#0bb158]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#0bb158]">Terms</Link>
          <Link href="/contact" className="hover:text-[#0bb158]">Contact</Link>
          <a href={`https://wa.me/${WORKSHOP.whatsappNumber}?text=${encodeURIComponent(WORKSHOP.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0bb158]">WhatsApp</a>
        </div>
        <div className="text-[0.65rem] md:text-[0.75rem] mb-3">&copy; 2026 OptionScore Academy. All rights reserved.</div>
        <div className="text-[0.6rem] md:text-[0.7rem] text-[#6b7280] max-w-[600px] mx-auto border-t border-[rgba(11,177,88,0.2)] pt-3 md:pt-4 leading-relaxed">
          {WORKSHOP.footer.disclaimer}
        </div>
      </footer>

      {/* ═══════════ Sticky Bottom Bar ═══════════ */}
      <div className={`fixed bottom-0 left-0 right-0 z-[999] transition-transform duration-300 ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-[rgba(8,8,8,0.95)] backdrop-blur-[12px] border-t border-[rgba(255,255,255,0.08)] py-2.5 md:py-3 px-4 md:px-8">
          <div className="max-w-5xl mx-auto flex justify-between items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-[1rem] md:text-[1.2rem] text-[#0bb158] font-bold">{PRICE}</span>
              <span className="text-[0.7rem] md:text-[0.82rem] text-[#6b7280]">· {WORKSHOP.announcement.seats} seats left</span>
            </div>
            <button onClick={scrollToCta} className="bg-[#0bb158] hover:bg-[#0ed668] text-[#010101] font-bold text-[0.75rem] md:text-[0.9rem] py-2.5 md:py-3 px-5 md:px-8 rounded-lg cursor-pointer border-none transition-colors">
              Reserve Now
            </button>
          </div>
        </div>
      </div>


      {/* ═══════════ Floating WhatsApp ═══════════ */}
      <a
        href={`https://wa.me/${WORKSHOP.whatsappNumber}?text=${encodeURIComponent(WORKSHOP.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 md:bottom-20 right-3 md:right-6 z-[998] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
        title="Questions? Chat with us"
      >
        <FaWhatsapp size={24} className="text-white md:!w-7 md:!h-7" />
      </a>

      {/* ═══════════ Custom Styles ═══════════ */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
        .cta-button {
          display: inline-block;
          background: #0bb158;
          color: #010101;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 14px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        @media (min-width: 768px) {
          .cta-button {
            font-size: 1.15rem;
            padding: 18px 48px;
          }
        }
        .cta-button:hover {
          background: #0ed668;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(11,177,88,0.3);
        }
        .cta-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .ws-card {
          background: rgba(5,5,5,0.85);
          border: 1px solid rgba(11,177,88,0.15);
          border-radius: 12px;
          transition: all 0.3s;
        }
        @media (min-width: 768px) {
          .ws-card { border-radius: 16px; }
        }
        .ws-card:hover {
          border-color: rgba(11,177,88,0.25);
        }
        .ws-card-red {
          background: rgba(239,68,68,0.05);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 12px;
        }
        @media (min-width: 768px) {
          .ws-card-red { border-radius: 16px; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TypeWriter effect
   ═══════════════════════════════════════════════════ */

/**
 * Segments: each has text, optional green styling, and optional breakpoints.
 * `mobileBr` = show <br> on mobile only (hidden on md+)
 * `desktopBr` = show <br> on desktop only (hidden below md)
 * `br` = always break
 */
type TypeSegment = {
  text: string;
  green?: boolean;
  mobileBr?: boolean;
  desktopBr?: boolean;
  br?: boolean;
};

function TypeWriter({ segments, className }: { segments: TypeSegment[]; className?: string }) {
  // Flatten all text into one string for typing
  const allText = segments.map((s) => s.text).join("");
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typed < allText.length) {
      const speed = 35 + Math.random() * 25;
      const t = setTimeout(() => setTyped((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [typed, allText.length]);

  // Build rendered output
  let consumed = 0;
  const rendered = segments.map((seg, i) => {
    const segStart = consumed;
    const segEnd = segStart + seg.text.length;
    consumed = segEnd;

    // How much of this segment is visible
    const visibleLen = Math.max(0, Math.min(typed - segStart, seg.text.length));
    const display = seg.text.slice(0, visibleLen);
    const isCurrent = typed >= segStart && typed < segEnd;

    const content = seg.green ? (
      <span className="text-[#0bb158]">
        {display}
      </span>
    ) : (
      display
    );

    // Determine line break: only show once this segment is fully typed
    const segFullyTyped = typed >= segEnd;
    let lineBreak = null;
    if (segFullyTyped || done) {
      if (seg.mobileBr) lineBreak = <br className="md:hidden" />;
      else if (seg.desktopBr) lineBreak = <br className="hidden md:block" />;
      else if (seg.br) lineBreak = <br />;
    }

    return (
      <span key={i}>
        {content}
        {isCurrent && !done && (
          <span className="inline-block w-[2px] md:w-[3px] h-[1.1em] bg-[#0bb158] align-middle ml-[2px] animate-blink" />
        )}
        {lineBreak}
      </span>
    );
  });

  return (
    <h1 className={className}>
      {rendered}
      {done && (
        <span className="inline-block w-[2px] md:w-[3px] h-[1.1em] bg-[#0bb158] align-middle ml-[2px] animate-blink" />
      )}
    </h1>
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
    <section className={`py-10 md:py-20 relative z-[1] ${alt ? "bg-[rgba(2,10,5,0.4)]" : ""} ${dark ? "bg-[rgba(2,10,5,0.6)]" : ""}`}>
      <div className="max-w-full mx-auto px-4 md:px-16">
        {label && (
          <div className="text-center text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase text-[#0bb158] mb-2 md:mb-3">
            {label}
          </div>
        )}
        <h2 className="font-bold text-center text-[1.15rem] md:text-[2.2rem] text-white mb-2 md:mb-3 leading-tight">
          {title}
        </h2>
        <div className="mb-6 md:mb-12" />
        {children}
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ws-card mb-2 md:mb-2.5 overflow-hidden">
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

function TimelineIcon({ tag, type }: { tag: string; type: string }) {
  const size = 18;
  const t = tag.toUpperCase();
  if (t.includes("BREAK") || t.includes("LUNCH")) return <PiCoffeeBold size={size} />;
  if (t.includes("Q&A") || t.includes("CLOSE")) return <HiChatBubbleLeftRight size={size} />;
  if (t.includes("LIVE MARKET")) return <HiChartBar size={size} />;
  if (t.includes("HANDS ON") || t.includes("PERSONAL REVIEW")) return <HiPencilSquare size={size} />;
  if (t.includes("LIVE TEACHING")) return <HiPresentationChartLine size={size} />;
  if (type === "live") return <HiBolt size={size} />;
  return <HiAcademicCap size={size} />;
}

function CountdownTimer() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    // Workshop starts July 5, 2026 at 10:00 AM IST (UTC+5:30)
    const end = new Date("2026-07-05T04:30:00Z").getTime();

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
    <div className="flex justify-center gap-2 md:gap-3.5 my-3 md:my-4">
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
