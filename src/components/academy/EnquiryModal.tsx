"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiCheckCircle } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import {
  ACADEMY_COURSE_OPTIONS,
  ACADEMY_FORMAT_OPTIONS,
} from "@/lib/academy";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  /** Pre-selected course (must be one of ACADEMY_COURSE_OPTIONS). */
  defaultCourse?: string;
}

export function EnquiryModal({ open, onClose, defaultCourse }: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [course, setCourse] = useState(defaultCourse || ACADEMY_COURSE_OPTIONS[0]);
  const [format, setFormat] = useState<string>(ACADEMY_FORMAT_OPTIONS[0]);
  const [query, setQuery] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Sync the pre-selected course whenever the modal is (re)opened.
  useEffect(() => {
    if (open && defaultCourse) setCourse(defaultCourse);
  }, [open, defaultCourse]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const resetAndClose = () => {
    onClose();
    // Reset after the close animation so users don't see fields wipe.
    setTimeout(() => {
      setName("");
      setEmail("");
      setMobile("");
      setQuery("");
      setError("");
      setDone(false);
      setSubmitting(false);
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !mobile.trim()) {
      setError("Please fill in your name, email and mobile.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (mobile.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/academy-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          course,
          format,
          query: query.trim(),
          source: "academy",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
      } else {
        setError(data.error || "Could not submit your enquiry. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) resetAndClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-card border border-card-border max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Academy enquiry"
          >
            {/* Accent top bar */}
            <div className="h-1 w-full btn-gradient" />

            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <HiXMark size={22} />
            </button>

            <div className="p-6 md:p-8">
              {done ? (
                <div className="text-center py-6">
                  <span className="inline-flex items-center justify-center w-16 h-16 icon-bg-cyan mb-5">
                    <HiCheckCircle className="text-accent-cyan" size={34} />
                  </span>
                  <h3 className="font-bold tracking-tight text-2xl text-text-primary mb-3">
                    Enquiry received
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-7 max-w-sm mx-auto">
                    Thanks, {name.split(" ")[0] || "there"} — our team will reach
                    out to you shortly about{" "}
                    <span className="text-text-primary font-semibold">{course}</span>.
                  </p>
                  <Button variant="gradient" onClick={resetAndClose} className="w-full">
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-[#0BB158] text-xs font-bold uppercase tracking-[0.15em]">Academy Enquiry</span>
                  <h3 className="font-bold tracking-tight text-2xl text-text-primary mt-3 mb-1">
                    Talk to our team
                  </h3>
                  <p className="text-text-secondary text-sm mb-6">
                    Tell us what you&apos;re interested in and we&apos;ll get back
                    to you with the details.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Field label="Full name" required>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className={inputClass}
                        autoFocus
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Email" required>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Mobile" required>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="10-digit number"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Course of interest">
                        <select
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className={inputClass}
                        >
                          {ACADEMY_COURSE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Preferred format">
                        <select
                          value={format}
                          onChange={(e) => setFormat(e.target.value)}
                          className={inputClass}
                        >
                          {ACADEMY_FORMAT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Your query">
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What would you like to know? (optional)"
                        rows={3}
                        className={`${inputClass} resize-none`}
                      />
                    </Field>

                    {error && (
                      <div className="bg-background border border-red-500/30 p-3">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}

                    <Button
                      variant="gradient"
                      type="submit"
                      disabled={submitting}
                      className="w-full"
                    >
                      {submitting ? "Submitting…" : "Submit Enquiry"}
                    </Button>
                    <p className="text-text-muted text-[11px] text-center">
                      We&apos;ll only use your details to respond to this enquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full bg-background border border-card-border px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-normal text-text-muted mb-1.5">
        {label}
        {required && <span className="text-accent-cyan"> *</span>}
      </span>
      {children}
    </label>
  );
}
