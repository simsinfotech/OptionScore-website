"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi2";
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
import { MASTERCLASS, MASTERCLASS_FEE_RUPEES } from "@/lib/masterclass";

const DISCOVER = [
  "Why most traders struggle despite learning multiple strategies",
  "The hidden mistake that causes repeated poor decisions",
  "How professionals evaluate opportunities before participating",
  "A simple framework to improve consistency and clarity",
  "The difference between reacting and making structured decisions",
];

export default function MasterclassOfferPage() {
  const router = useRouter();
  const [lead, setLeadState] = useState<StoredLead | null>(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = getLead();
    if (!stored) {
      // Funnel protection — must complete the reserve form first.
      router.replace("/master-class");
      return;
    }
    if (isPaid()) {
      // Already paid — don't let them pay again; send to confirmation.
      router.replace("/master-class/confirmed");
      return;
    }
    setLeadState(stored);
  }, [router]);

  const handlePay = async () => {
    if (!lead) return;
    setError("");
    setPaying(true);
    trackInitiateCheckout(MASTERCLASS_FEE_RUPEES);

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Could not load the payment window. Check your connection.");
      setPaying(false);
      return;
    }

    try {
      const orderRes = await fetch("/api/razorpay/order", { method: "POST" });
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
        description: `${MASTERCLASS.title} Registration`,
        image: `${window.location.origin}/images/logo.png`,
        prefill: { name: lead.name, email: lead.email, contact: lead.mobile },
        notes: { purpose: "masterclass-registration" },
        theme: { color: "#0bb158" },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, lead }),
            });
            const verify = await verifyRes.json();
            if (verify.ok) {
              setPaid(undefined, response.razorpay_payment_id);
              trackPurchase(MASTERCLASS_FEE_RUPEES);
              router.push("/master-class/confirmed");
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

  // Funnel protection — don't render (or flash) the offer until the reserve
  // form has been completed. The useEffect above redirects to /master-class.
  if (!lead) return null;

  return (
    <FunnelShell>
      <div className="max-w-2xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#0BB158] text-xs font-bold uppercase tracking-[0.15em]">{MASTERCLASS.title}</span>

          <h1 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mt-3 mb-4 leading-tight">
            Most Traders Look For Entries.
            <br />
            <span className="text-[#0BB158]">
              Professionals Look For Reasons To Wait.
            </span>
          </h1>

          <p className="text-text-secondary leading-relaxed mb-3">
            In this live session, you&apos;ll discover a structured framework
            used to evaluate opportunities before taking action.
          </p>
          <p className="text-text-secondary leading-relaxed mb-3">
            This is not another strategy session.
          </p>
          <p className="text-text-secondary leading-relaxed mb-10">
            This is about understanding how experienced traders think, filter
            noise, and make disciplined decisions.
          </p>

          {/* What you'll discover */}
          <h2 className="font-bold tracking-normal text-lg text-text-primary mb-4">
            What You&apos;ll Discover
          </h2>
          <ul className="space-y-3 mb-10">
            {DISCOVER.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                <HiCheck className="text-accent-cyan mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Session details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            <Detail label="Duration" value={MASTERCLASS.session.duration} />
            <Detail label="Format" value={MASTERCLASS.session.format} />
            <Detail label="Access" value={MASTERCLASS.session.access} />
          </div>

          {/* Registration */}
          <div className="grad-border-static p-6 text-center">
            <p className="text-xs uppercase tracking-normal text-text-muted mb-1">
              Verified Registration Fee
            </p>
            <p className="text-4xl font-bold text-text-primary mb-2">
              ₹{MASTERCLASS_FEE_RUPEES}
            </p>
            <p className="text-text-secondary text-sm mb-6">
              Reserve your access and receive session details instantly.
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
              disabled={paying || !lead}
            >
              {paying ? "Processing…" : "Complete Registration"}
            </Button>
            <p className="text-text-muted text-[11px] mt-3">
              Secure payment via Razorpay.
            </p>
          </div>
        </motion.div>
      </div>
    </FunnelShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-card-border p-4 text-center">
      <p className="text-xs uppercase tracking-normal text-text-muted mb-1">
        {label}
      </p>
      <p className="text-text-primary text-sm font-semibold">{value}</p>
    </div>
  );
}
