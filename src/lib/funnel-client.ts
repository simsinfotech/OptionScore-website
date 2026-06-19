"use client";

export type StoredLead = {
  name: string;
  mobile: string;
  email: string;
  experience: string;
  source: string;
};

/** Per-funnel localStorage key. Masterclass keeps its original key so existing
 *  flows are untouched; other funnels (e.g. the workshop) pass their own. */
const DEFAULT_KEY = "os_mc_lead";

export function saveLead(lead: StoredLead, key: string = DEFAULT_KEY): void {
  try {
    localStorage.setItem(key, JSON.stringify(lead));
    // A fresh form submission starts a new attempt — clear any prior paid
    // state so a returning/re-registering user must pay again before they can
    // reach the confirmation page.
    localStorage.removeItem(paidKey(key));
  } catch {
    /* ignore */
  }
}

export function getLead(key: string = DEFAULT_KEY): StoredLead | null {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as StoredLead) : null;
  } catch {
    return null;
  }
}

function paidKey(key: string): string {
  return `${key}_paid`;
}

/** Mark this funnel as paid (called after the server verifies the payment). */
export function setPaid(key: string = DEFAULT_KEY, paymentId?: string): void {
  try {
    localStorage.setItem(paidKey(key), paymentId || "1");
  } catch {
    /* ignore */
  }
}

/** True only once a verified payment has been recorded for this funnel. */
export function isPaid(key: string = DEFAULT_KEY): boolean {
  try {
    return !!localStorage.getItem(paidKey(key));
  } catch {
    return false;
  }
}

/** Build a Source string from UTM params, falling back to a default. */
export function readSource(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const p = new URLSearchParams(window.location.search);
  const parts = [
    p.get("utm_source"),
    p.get("utm_medium"),
    p.get("utm_campaign"),
  ].filter(Boolean);
  return parts.length ? parts.join(" / ") : fallback;
}

type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler?: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
};

export type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = { open: () => void };

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function openRazorpay(options: RazorpayOptions): void {
  if (typeof window === "undefined" || !window.Razorpay) return;
  new window.Razorpay(options).open();
}
