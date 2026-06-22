"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheck,
  HiXMark,
  HiPlus,
  HiMinus,
  HiClock,
  HiStar,
  HiAcademicCap,
  HiChartBar,
  HiShieldCheck,
} from "react-icons/hi2";
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
import { WORKSHOP, WORKSHOP_FEE_RUPEES, isWsPlaceholder } from "@/lib/workshop";

const WS_LEAD_KEY = "os_ws_lead";
const PRODUCT = "workshop";
const PRICE = `₹${WORKSHOP_FEE_RUPEES.toLocaleString("en-IN")}`;
const TOTAL_VALUE = WORKSHOP.valueStack.reduce((s, i) => s + i.value, 0);

export default function WorkshopOfferPage() {
  const router = useRouter();
  const [lead, setLeadState] = useState<StoredLead | null>(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [socialProof, setSocialProof] = useState<string | null>(null);
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
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setShowStickyBar(heroBottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ─── Social proof popup ─── */
  useEffect(() => {
    const names = WORKSHOP.socialProofNames;
    let timeout: ReturnType<typeof setTimeout>;
    const show = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      setSocialProof(name);
      setTimeout(() => setSocialProof(null), 4000);
      timeout = setTimeout(show, 45000 + Math.random() * 45000);
    };
    timeout = setTimeout(show, 10000);
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
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!lead) return null;

  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col">
      {/* ═══════════ 1. Announcement Bar ═══════════ */}
      <div className="sticky top-0 z-50 bg-[#0bb158] text-background text-center py-2 px-4">
        <p className="text-xs md:text-sm font-bold tracking-wide uppercase">
          Next Batch: {WORKSHOP.announcement.date} · Only{" "}
          {WORKSHOP.announcement.seats} Seats
        </p>
      </div>

      {/* ═══════════ Header ═══════════ */}
      <header className="border-b border-card-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-center">
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

      <main className="flex-1 w-full">
        {/* ═══════════ 2. Hero ═══════════ */}
        <section ref={heroRef} className="section-mesh-violet">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-chip">{WORKSHOP.hero.eyebrow}</span>

              <h1 className="font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl text-text-primary mt-6 mb-6 leading-tight">
                {WORKSHOP.hero.headline[0]}
                <br />
                <span className="gradient-text-violet-lime">
                  {WORKSHOP.hero.headline[1]}
                </span>
                <br />
                {WORKSHOP.hero.headline[2]}
              </h1>

              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                {WORKSHOP.hero.subHeadline}
              </p>

              {/* VSL Embed */}
              {!isWsPlaceholder(WORKSHOP.hero.vslUrl) && (
                <div className="relative aspect-video max-w-3xl mx-auto mb-10 bg-card border border-card-border overflow-hidden">
                  <iframe
                    src={`${WORKSHOP.hero.vslUrl}?autoplay=1&mute=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Workshop introduction video"
                  />
                </div>
              )}

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
                {WORKSHOP.heroStats.map((stat) => (
                  <div key={stat.label} className="bg-card border border-card-border p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold text-accent-cyan">
                      {stat.value}
                    </p>
                    <p className="text-text-muted text-xs uppercase tracking-wide mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="w-full sm:w-auto text-lg"
                onClick={scrollToCta}
              >
                Reserve My Seat — {PRICE}
              </Button>
              <p className="text-accent-cyan text-xs uppercase tracking-[0.15em] font-mono mt-4">
                ★ Limited to {WORKSHOP.announcement.seats} seats per batch
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ 3. Experience Cards ═══════════ */}
        <Section title="What You'll Experience" id="experience">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKSHOP.experienceCards.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grad-border-static p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{card.icon}</span>
                  <span className="section-chip text-[10px]">{card.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                  {card.body}
                </p>
                <ul className="space-y-2 mb-4">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-text-secondary text-sm"
                    >
                      <HiCheck className="text-accent-cyan mt-0.5 flex-shrink-0" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-3 border-t border-card-border">
                  <p className="text-accent-cyan text-xs font-mono uppercase flex items-center gap-1">
                    <HiClock size={12} /> {card.duration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ═══════════ 4. Schedule Timeline ═══════════ */}
        <Section title="Complete Workshop Schedule" mesh="section-mesh-cyan" id="schedule">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[WORKSHOP.schedule.day1, WORKSHOP.schedule.day2].map((day) => (
              <div key={day.label}>
                <h3 className="text-lg font-bold text-accent-cyan mb-6">
                  {day.label}
                </h3>
                <div className="space-y-0">
                  {day.sessions.map((session, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 pb-6 relative"
                    >
                      {/* Timeline line */}
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-accent-cyan flex-shrink-0 mt-1" />
                        {idx < day.sessions.length - 1 && (
                          <div className="w-px flex-1 bg-accent-cyan/20 mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-accent-cyan text-xs font-mono">
                            {session.time}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-mono uppercase">
                            {session.tag}
                          </span>
                        </div>
                        <h4 className="text-text-primary font-semibold text-sm mb-1">
                          {session.title}
                        </h4>
                        <p className="text-text-muted text-xs leading-relaxed">
                          {session.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════ 5. Value Stack ═══════════ */}
        <Section title="Everything You Get" id="value">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-3 mb-6">
              {WORKSHOP.valueStack.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-card border border-card-border px-5 py-3"
                >
                  <span className="flex items-center gap-3 text-text-primary text-sm">
                    <HiCheck className="text-accent-cyan flex-shrink-0" size={16} />
                    {item.label}
                  </span>
                  <span className="text-text-muted text-sm line-through">
                    ₹{item.value.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="grad-border-static p-6 text-center">
              <p className="text-text-muted text-sm mb-1">
                Total Value:{" "}
                <span className="line-through">
                  ₹{TOTAL_VALUE.toLocaleString("en-IN")}
                </span>
              </p>
              <p className="text-3xl md:text-4xl font-bold text-text-primary mb-1">
                You Pay: {PRICE}
              </p>
              <p className="text-accent-cyan text-sm font-semibold mb-6">
                You save ₹
                {(TOTAL_VALUE - WORKSHOP_FEE_RUPEES).toLocaleString("en-IN")} (
                {Math.round(
                  ((TOTAL_VALUE - WORKSHOP_FEE_RUPEES) / TOTAL_VALUE) * 100
                )}
                % off)
              </p>
              <Button variant="gradient" size="lg" className="w-full sm:w-auto" onClick={scrollToCta}>
                Reserve My Seat — {PRICE}
              </Button>
            </div>
          </div>
        </Section>

        {/* ═══════════ 6. Problem Section ═══════════ */}
        <Section
          title={WORKSHOP.problem.headline}
          mesh="section-mesh-alt"
          id="problem"
        >
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            {WORKSHOP.problem.body}
          </p>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-red-400 font-semibold uppercase text-xs tracking-wide border-b border-card-border">
                    ❌ Retail Trader
                  </th>
                  <th className="text-left py-3 px-4 text-accent-cyan font-semibold uppercase text-xs tracking-wide border-b border-card-border">
                    ✅ Institutional Approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {WORKSHOP.problem.contrastTable.map((row, i) => (
                  <tr key={i} className="border-b border-card-border/50">
                    <td className="py-3 px-4 text-text-muted">{row.retail}</td>
                    <td className="py-3 px-4 text-text-primary">{row.institutional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ═══════════ 7. Who It's For ═══════════ */}
        <Section title="Is This Workshop For You?" id="who">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-accent-cyan font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <HiCheck size={18} /> This is for you if...
              </h3>
              <ul className="space-y-3">
                {WORKSHOP.whoItsFor.greenChecks.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-text-secondary text-sm"
                  >
                    <span className="icon-bg-cyan flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
                      <HiCheck className="text-accent-cyan" size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-red-400 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <HiXMark size={18} /> This is NOT for you if...
              </h3>
              <ul className="space-y-3">
                {WORKSHOP.whoItsFor.redXMarks.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-text-secondary text-sm"
                  >
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5 bg-red-500/10 border border-red-500/20">
                      <HiXMark className="text-red-400" size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ═══════════ 8. Instructor Bio ═══════════ */}
        <Section title="Meet Your Instructor" mesh="section-mesh-violet" id="instructor">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 bg-card border border-card-border flex items-center justify-center mx-auto md:mx-0">
              <HiAcademicCap className="text-accent-cyan" size={64} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary mb-1">
                {WORKSHOP.instructor.name}
              </h3>
              <p className="text-accent-cyan text-sm mb-4">
                {WORKSHOP.instructor.title}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {WORKSHOP.instructor.bio}
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                {WORKSHOP.instructor.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-accent-cyan">{stat.value}</p>
                    <p className="text-text-muted text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {WORKSHOP.instructor.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="section-chip text-[10px]"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════ 9. Testimonials ═══════════ */}
        <Section title="What Our Students Say" id="testimonials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {WORKSHOP.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-card-border p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <HiStar key={j} className="text-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-text-primary text-sm font-semibold">{t.name}</p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-10">
            {WORKSHOP.heroStats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-accent-cyan">{stat.value}</p>
                <p className="text-text-muted text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════ 12. Contrast Section (Hard Way vs OptionScore Way) ═══════════ */}
        <Section title="Two Paths to Consistent Trading" mesh="section-mesh-alt" id="contrast">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-red-500/20 p-6">
              <h3 className="text-red-400 font-bold text-sm uppercase tracking-wide mb-4">
                ❌ The Hard Way
              </h3>
              <ul className="space-y-3">
                {WORKSHOP.contrast.hardWay.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-text-muted text-sm"
                  >
                    <HiXMark className="text-red-400 mt-0.5 flex-shrink-0" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grad-border-static p-6">
              <h3 className="text-accent-cyan font-bold text-sm uppercase tracking-wide mb-4">
                ✅ The OptionScore Way
              </h3>
              <ul className="space-y-3">
                {WORKSHOP.contrast.optionScoreWay.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-text-primary text-sm"
                  >
                    <HiCheck className="text-accent-cyan mt-0.5 flex-shrink-0" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button variant="gradient" size="lg" onClick={scrollToCta}>
              Choose the Smarter Path — {PRICE}
            </Button>
          </div>
        </Section>

        {/* ═══════════ Guarantee ═══════════ */}
        <Section title="Our Guarantee" id="guarantee">
          <div className="max-w-2xl mx-auto grad-border-static p-8 text-center">
            <HiShieldCheck className="text-accent-cyan mx-auto mb-4" size={48} />
            <p className="text-text-secondary leading-relaxed">
              {WORKSHOP.guarantee}
            </p>
          </div>
        </Section>

        {/* ═══════════ 10. FAQ ═══════════ */}
        <Section title="Frequently Asked Questions" mesh="section-mesh-cyan" id="faq">
          <div className="max-w-2xl mx-auto space-y-3">
            {WORKSHOP.faqs.map((f, i) => (
              <Faq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Section>

        {/* ═══════════ 11. Final CTA ═══════════ */}
        <section id="final-cta" className="section-mesh-violet">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
            <h2 className="font-bold tracking-tight text-2xl md:text-4xl text-text-primary text-center mb-4">
              Ready to Trade With{" "}
              <span className="gradient-text-violet-lime">Institutional Clarity</span>?
            </h2>
            <p className="text-text-secondary text-center max-w-xl mx-auto mb-10">
              Join the next batch and get the complete OptionScore framework — live,
              interactive, with personal chart reviews.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Pricing card */}
              <div className="grad-border-static p-6">
                <p className="text-xs uppercase tracking-normal text-text-muted mb-1">
                  2-Day Live Workshop
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-text-muted text-lg line-through">
                    ₹{TOTAL_VALUE.toLocaleString("en-IN")}
                  </span>
                  <span className="text-4xl font-bold text-text-primary">
                    {PRICE}
                  </span>
                </div>
                <p className="text-accent-cyan text-sm font-semibold mb-6">
                  Save ₹
                  {(TOTAL_VALUE - WORKSHOP_FEE_RUPEES).toLocaleString("en-IN")}
                </p>
                <ul className="space-y-2 mb-6">
                  {WORKSHOP.valueStack.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start gap-2 text-text-secondary text-sm"
                    >
                      <HiCheck className="text-accent-cyan mt-0.5 flex-shrink-0" size={14} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment CTA card */}
              <div className="bg-card border border-card-border p-6">
                <CountdownTimer />
                <p className="text-text-primary font-bold text-lg mb-2 mt-4">
                  Secure Your Seat Now
                </p>
                <p className="text-text-secondary text-sm mb-6">
                  You&apos;ve already registered, {lead.name?.split(" ")[0] || ""}. Complete
                  your payment to confirm your seat.
                </p>
                {error && (
                  <div className="bg-card border border-red-500/30 p-3 mb-4">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
                <Button
                  variant="gradient"
                  className="w-full"
                  size="lg"
                  onClick={handlePay}
                  disabled={paying}
                >
                  {paying ? "Processing..." : `Reserve My Seat — ${PRICE}`}
                </Button>
                <p className="text-text-muted text-[11px] mt-3 text-center">
                  Secure payment via Razorpay · Cards, UPI &amp; Net Banking
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ 16. Footer ═══════════ */}
      <footer className="border-t border-card-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-text-muted text-[11px] leading-relaxed text-center">
            OptionScore is a market analytics &amp; education platform. This
            workshop is purely educational and does not constitute investment
            advice. Trading in financial markets involves substantial risk of loss
            and is not suitable for all investors. Past performance, simulated or
            actual, does not guarantee future results. By registering, you agree
            to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </footer>

      {/* ═══════════ 13. Sticky Mobile Bar ═══════════ */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-card-border p-3 md:hidden"
          >
            <Button
              variant="gradient"
              className="w-full"
              onClick={scrollToCta}
            >
              Reserve My Seat — {PRICE}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ 14. Floating WhatsApp ═══════════ */}
      <a
        href={`https://wa.me/${WORKSHOP.whatsappNumber}?text=${encodeURIComponent(WORKSHOP.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} className="text-white" />
      </a>

      {/* ═══════════ 15. Social Proof Popup ═══════════ */}
      <AnimatePresence>
        {socialProof && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-20 md:bottom-6 left-4 z-30 bg-card border border-card-border px-4 py-3 shadow-lg max-w-xs"
          >
            <p className="text-text-primary text-sm">
              <span className="font-semibold">{socialProof}</span>{" "}
              <span className="text-text-muted">just registered</span>
            </p>
            <p className="text-text-muted text-xs mt-0.5">a few moments ago</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Presentational helpers
   ═══════════════════════════════════════════════════ */

function Section({
  title,
  children,
  mesh,
  id,
}: {
  title: string;
  children: React.ReactNode;
  mesh?: string;
  id?: string;
}) {
  return (
    <section className={mesh} id={id}>
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <h2 className="font-bold tracking-tight text-2xl md:text-3xl text-text-primary text-center mb-10">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-card-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-text-primary text-sm font-semibold">{q}</span>
        {open ? (
          <HiMinus className="text-accent-cyan flex-shrink-0" size={18} />
        ) : (
          <HiPlus className="text-accent-cyan flex-shrink-0" size={18} />
        )}
      </button>
      {open && (
        <p className="px-5 pb-4 text-text-secondary text-sm leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetStr = WORKSHOP.session.dateTime;
    if (isWsPlaceholder(targetStr)) {
      setTimeLeft("Date coming soon");
      return;
    }

    const tick = () => {
      const target = new Date(targetStr).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Starting soon!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${days}d ${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-accent-cyan/10 border border-accent-cyan/20 p-3 text-center">
      <p className="text-accent-cyan text-xs uppercase tracking-wide font-mono mb-1">
        Workshop starts in
      </p>
      <p className="text-text-primary font-bold text-lg font-mono">{timeLeft}</p>
    </div>
  );
}
