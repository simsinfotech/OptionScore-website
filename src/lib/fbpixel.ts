"use client";

/** Thin, safe wrapper around the Meta (Facebook) Pixel `fbq` global. */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

/** Standard "PageView" — fired site-wide on navigation. */
export const trackPageView = (): void => track("PageView");

/** Fired when a visitor submits the reserve form. */
export const trackLead = (params?: Record<string, unknown>): void =>
  track("Lead", params);

/** Fired when a visitor starts the Razorpay checkout. */
export const trackInitiateCheckout = (
  value: number,
  currency = "INR"
): void => track("InitiateCheckout", { value, currency });

/** Fired once a payment has been verified by the server. */
export const trackPurchase = (value: number, currency = "INR"): void =>
  track("Purchase", { value, currency });
