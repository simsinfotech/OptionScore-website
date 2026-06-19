"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiCheck, HiPlus, HiMinus } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { FunnelShell } from "@/components/funnel/FunnelShell";
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
const PRICE = `₹${WORKSHOP_FEE_RUPEES.toLocaleString("en-IN")}`;

export default function WorkshopOfferPage() {
  const router = useRouter();
  const [lead, setLeadState] = useState<StoredLead | null>(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = getLead(WS_LEAD_KEY);
    if (!stored) {
      // Funnel protection — must complete the reserve form first.
      router.replace("/workshop");
      return;
    }
    if (isPaid(WS_LEAD_KEY)) {
      // Already paid — don't let them pay again; send to confirmation.
      router.replace("/workshop/confirmed");
      return;
    }
    setLeadState(stored);
  }, [router]);

  const handlePay = async () => {
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
  };

  // Don't flash the page before the funnel check resolves.
  if (!lead) return null;

  return (
    <FunnelShell>
      {/* ───────────── Hero ───────────── */}
      <section className="section-mesh-violet">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-chip">{WORKSHOP.badge}</span>

            <h1 className="font-bold tracking-normal text-3xl md:text-5xl text-text-primary mt-4 mb-6 leading-tight">
              {WORKSHOP.headlineTop}
              <br />
              <span className="gradient-text-violet-lime">
                {WORKSHOP.headlineBottom}
              </span>
            </h1>

            <div className="space-y-3 mb-8 text-left max-w-xl mx-auto">
              {WORKSHOP.intro.map((p) => (
                <p key={p} className="text-text-secondary leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <Detail label="Duration" value={WORKSHOP.details.duration} />
              <Detail label="Format" value={WORKSHOP.details.format} />
              <Detail label="Access" value={WORKSHOP.details.access} />
              <Detail label="Investment" value={WORKSHOP.details.investment} />
            </div>

            <Button
              variant="gradient"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handlePay}
              disabled={paying}
            >
              {paying ? "Processing…" : `Reserve My Seat — ${PRICE}`}
            </Button>
            <p className="text-accent-cyan text-xs uppercase tracking-[0.15em] font-mono mt-4">
              ★ Limited Seats Available
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────────── This program is for you if ───────────── */}
      <Section title="This Program Is For You If">
        <ul className="space-y-4 max-w-xl mx-auto">
          {WORKSHOP.forYou.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-text-secondary"
            >
              <span className="icon-bg-cyan flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                <HiCheck className="text-accent-cyan" size={14} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* ───────────── What you'll learn ───────────── */}
      <Section title="What You'll Learn" mesh="section-mesh-cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WORKSHOP.curriculum.map((d) => (
            <div key={d.day} className="grad-border-static p-6">
              <h3 className="font-bold text-lg text-accent-cyan mb-4">
                {d.day}
              </h3>
              <ul className="space-y-3">
                {d.topics.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-text-secondary text-sm"
                  >
                    <HiCheck
                      className="text-accent-cyan mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────── Program details ───────────── */}
      <Section title="Program Details">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Detail label="Duration" value={WORKSHOP.details.duration} />
          <Detail label="Format" value={WORKSHOP.details.format} />
          <Detail label="Access" value={WORKSHOP.details.access} />
          <Detail label="Investment" value={WORKSHOP.details.investment} />
        </div>
        <p className="text-text-secondary text-center max-w-xl mx-auto">
          This workshop is designed for serious learners who want a practical
          framework they can apply immediately.
        </p>
      </Section>

      {/* ───────────── FAQ ───────────── */}
      <Section title="Frequently Asked Questions" mesh="section-mesh-alt">
        <div className="max-w-2xl mx-auto space-y-3">
          {WORKSHOP.faqs.map((f, i) => (
            <Faq key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* ───────────── Registration / payment ───────────── */}
      <section className="section-mesh-violet">
        <div className="max-w-md mx-auto px-6 py-16">
          <p className="text-accent-cyan text-xs uppercase tracking-[0.15em] font-mono text-center mb-4">
            ★ Limited Seats Available
          </p>
          <div className="grad-border-static p-6 text-center">
            <p className="text-xs uppercase tracking-normal text-text-muted mb-1">
              Workshop Seat
            </p>
            <p className="text-4xl font-bold text-text-primary mb-2">{PRICE}</p>
            <p className="text-text-secondary text-sm mb-6">
              Reserve your seat for the live 2-day workshop and receive your
              joining details instantly.
            </p>

            {error && (
              <div className="bg-card border border-red-500/30 p-3 mb-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              variant="gradient"
              className="w-full"
              onClick={handlePay}
              disabled={paying}
            >
              {paying ? "Processing…" : "Complete Registration"}
            </Button>
            <p className="text-text-muted text-[11px] mt-3">
              🔒 Secure payment via Razorpay · Cards, UPI &amp; Net Banking
            </p>
          </div>
        </div>
      </section>
    </FunnelShell>
  );
}

/* ───────────── Small presentational helpers ───────────── */

function Section({
  title,
  children,
  mesh,
}: {
  title: string;
  children: React.ReactNode;
  mesh?: string;
}) {
  return (
    <section className={mesh}>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="font-bold tracking-normal text-2xl md:text-3xl text-text-primary text-center mb-10">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-card-border p-4 text-center">
      <p className="text-[10px] uppercase tracking-normal text-text-muted mb-1">
        {label}
      </p>
      <p className="text-text-primary text-sm font-semibold">{value}</p>
    </div>
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
