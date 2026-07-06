"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { getLead, isPaid, setPaid } from "@/lib/funnel-client";

// The webinar buyer may arrive from the workshop downsell (so a workshop lead
// exists) or from the standalone /webinar page (no lead). We only use the lead
// for a friendly name — payment proof is the signed Razorpay callback.
const WS_LEAD_KEY = "os_ws_lead";
const WEBINAR_KEY = "os_webinar";

const DETAILS = [
  { label: "Date & Time", value: "Saturday, 11 July · 10:00 AM IST" },
  { label: "Format", value: "Live Online Webinar" },
  { label: "Duration", value: "90 Minutes" },
  { label: "Host", value: "Shamiq, OptionScore Academy" },
];

export default function WebinarConfirmedPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lead = getLead(WS_LEAD_KEY);

    const admit = () => {
      if (lead?.name) setName(lead.name.split(" ")[0]);
      setReady(true);
    };

    // Returning from the Rs. 299 hosted payment link — verify the signature.
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("razorpay_payment_id");
    const linkId = params.get("razorpay_payment_link_id");
    const status = params.get("razorpay_payment_link_status");
    const signature = params.get("razorpay_signature");

    if (paymentId && linkId && signature) {
      (async () => {
        try {
          const res = await fetch("/api/razorpay/verify-link", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: paymentId,
              razorpay_payment_link_id: linkId,
              razorpay_payment_link_reference_id: params.get(
                "razorpay_payment_link_reference_id"
              ),
              razorpay_payment_link_status: status,
              razorpay_signature: signature,
              lead: lead ?? undefined,
              product: "webinar",
            }),
          });
          const data = await res.json();
          if (data.ok) {
            setPaid(WEBINAR_KEY, paymentId);
            window.history.replaceState({}, "", "/webinar/confirmed");
            admit();
          } else {
            router.replace("/webinar");
          }
        } catch {
          router.replace("/webinar");
        }
      })();
      return;
    }

    // No callback params — only allow a refresh if we already verified once.
    if (!isPaid(WEBINAR_KEY)) {
      router.replace("/webinar");
      return;
    }
    admit();
  }, [router]);

  if (!ready) return null;

  return (
    <FunnelShell>
      <div className="max-w-lg mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-accent-cyan text-5xl mb-4">&#x2713;</div>
          <h1 className="font-bold tracking-normal text-3xl text-text-primary mb-3">
            You&apos;re Registered{name ? `, ${name}` : ""}!
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed mb-8">
            Thank you for registering for the OptionScore live webinar. We&apos;ve
            emailed your joining details to the address on your payment. Check
            your inbox (and spam folder, just in case).
          </p>

          {/* Webinar details */}
          <div className="bg-card border border-card-border p-6 text-left space-y-3">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-baseline gap-3">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-normal w-28 flex-shrink-0">
                  {d.label}
                </span>
                <span className="text-text-primary text-sm">{d.value}</span>
              </div>
            ))}
          </div>

          <p className="text-text-muted text-xs mt-8">
            Didn&apos;t get the email? Write to{" "}
            <a
              href="mailto:support@optionscore.app"
              className="text-accent-cyan hover:underline"
            >
              support@optionscore.app
            </a>
          </p>
        </motion.div>
      </div>
    </FunnelShell>
  );
}
