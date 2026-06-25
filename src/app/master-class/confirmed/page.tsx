"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { getLead, isPaid } from "@/lib/funnel-client";
import { MASTERCLASS, isMcPlaceholder } from "@/lib/masterclass";

export default function MasterclassConfirmedPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lead = getLead();
    if (!lead) {
      // No form filled — back to the start.
      router.replace("/master-class");
      return;
    }
    if (!isPaid()) {
      // Form filled but not paid — can't reach confirmation yet.
      router.replace("/master-class/offer");
      return;
    }
    if (lead.name) setName(lead.name.split(" ")[0]);
    setReady(true);
  }, [router]);

  const s = MASTERCLASS.session;
  const hasWhatsapp = !isMcPlaceholder(MASTERCLASS.whatsappGroupUrl);

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
            Your spot for the OptionScore {MASTERCLASS.title} is confirmed.
            We&apos;ve emailed your session details. Check your inbox (and spam
            folder, just in case).
          </p>

          {/* Join WhatsApp — primary next step */}
          {hasWhatsapp && (
            <a
              href={MASTERCLASS.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#0bb158] hover:bg-[#0aa050] text-white font-semibold py-3 px-6 transition-colors mb-8"
            >
              <FaWhatsapp size={20} />
              Join the WhatsApp Group
            </a>
          )}

          {/* Session details */}
          <div className="bg-card border border-card-border p-6 text-left space-y-3">
            <DetailRow label="Date & Time" value={s.dateTime} />
            <DetailRow label="Duration" value={s.duration} />
            <DetailRow label="Format" value={s.format} />
            <DetailRow label="Access" value={s.access} />
            <DetailRow label="Host" value={s.host} />
            {!isMcPlaceholder(s.joinLink) && (
              <DetailRow label="Join Link" value={s.joinLink} />
            )}
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

function DetailRow({ label, value }: { label: string; value: string }) {
  const display = isMcPlaceholder(value) ? "To be shared shortly" : value;
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-text-muted text-xs font-semibold uppercase tracking-normal w-28 flex-shrink-0">
        {label}
      </span>
      <span className="text-text-primary text-sm">{display}</span>
    </div>
  );
}
