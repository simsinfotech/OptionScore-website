"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function AccountDeletion() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-card-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="OptionScore logo"
              width={160}
              height={44}
              className="h-11 w-auto"
            />
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="heading text-3xl md:text-4xl text-text-primary mb-4">
            Account <span className="text-accent-cyan">Deletion</span>
          </h1>
          <p className="text-text-secondary mb-10 leading-relaxed">
            We&apos;re sorry to see you go. Submitting this request will
            permanently delete your OptionScore account and all associated data.
            This action cannot be undone.
          </p>

          {/* What gets deleted */}
          <div className="bg-card border border-card-border p-6 mb-10">
            <h2 className="heading text-base text-text-primary mb-4">
              What will be deleted
            </h2>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li className="flex items-start gap-3">
                <span className="text-accent-cyan mt-0.5">&#x2022;</span>
                Your profile information and account credentials
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-cyan mt-0.5">&#x2022;</span>
                Saved watchlists, alerts, and custom settings
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-cyan mt-0.5">&#x2022;</span>
                Trading history and score analytics
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-cyan mt-0.5">&#x2022;</span>
                Community posts, comments, and interactions
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-cyan mt-0.5">&#x2022;</span>
                Connected brokerage account links
              </li>
            </ul>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold uppercase tracking-heading text-text-primary mb-2"
                >
                  Account Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-card border border-card-border px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent-cyan transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-semibold uppercase tracking-heading text-text-primary mb-2"
                >
                  Reason for leaving{" "}
                  <span className="text-text-muted font-normal normal-case tracking-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Let us know how we can improve..."
                  className="w-full bg-card border border-card-border px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                />
              </div>

              <div className="bg-card border border-red-500/30 p-4">
                <p className="text-sm text-red-400">
                  This action is permanent. Your data will be deleted within 30
                  days and cannot be recovered.
                </p>
              </div>

              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white hover:shadow-none">
                Request Account Deletion
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-accent-cyan/30 p-8 text-center"
            >
              <div className="text-accent-cyan text-4xl mb-4">&#x2713;</div>
              <h2 className="heading text-xl text-text-primary mb-3">
                Request Submitted
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-2">
                We&apos;ve received your account deletion request for{" "}
                <span className="text-text-primary">{email}</span>.
              </p>
              <p className="text-text-muted text-sm">
                You&apos;ll receive a confirmation email shortly. Your account
                and data will be permanently deleted within 30 days.
              </p>
            </motion.div>
          )}

          <div className="mt-12 pt-8 border-t border-card-border">
            <p className="text-text-muted text-xs">
              If you have questions, contact us at{" "}
              <a
                href="mailto:support@optionscore.app"
                className="text-accent-cyan hover:underline"
              >
                support@optionscore.app
              </a>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
