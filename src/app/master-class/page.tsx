"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { saveLead, readSource } from "@/lib/funnel-client";
import { trackLead } from "@/lib/fbpixel";
import { MASTERCLASS } from "@/lib/masterclass";

const EXPERIENCE_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

export default function MasterclassReservePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    const source = readSource(MASTERCLASS.defaultSource);
    const lead = { name, mobile: cleanMobile, email, experience, source };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data = await res.json();

      // Save locally even if the sheet write hiccups — we don't want to block
      // the funnel; the row will still be reconciled at the payment step.
      saveLead(lead);
      trackLead();

      if (!res.ok && !data?.ok) {
        console.error("lead save failed", data);
      }
      router.push("/master-class/offer");
    } catch (err) {
      console.error(err);
      saveLead(lead);
      trackLead();
      router.push("/master-class/offer");
    }
  };

  return (
    <FunnelShell>
      <div className="max-w-md mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-chip">{MASTERCLASS.title}</span>
          <h1 className="font-bold tracking-normal text-3xl md:text-4xl text-text-primary mt-3 mb-3">
            Reserve Your <span className="text-accent-cyan">Access</span>
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed mb-8">
            Join traders from across India for a live masterclass on how
            professionals evaluate setups and make structured decisions under
            uncertainty.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Full Name">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
              />
            </Field>

            <Field label="Mobile Number">
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className={inputClass}
              />
            </Field>

            <Field label="Email Address">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="Trading Experience">
              <select
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select your experience
                </option>
                {EXPERIENCE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            {error && (
              <div className="bg-card border border-red-500/30 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Please wait…" : "Continue"}
            </Button>
          </form>
        </motion.div>
      </div>
    </FunnelShell>
  );
}

const inputClass =
  "w-full bg-card border border-card-border px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent-cyan transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold uppercase tracking-normal text-text-primary mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
