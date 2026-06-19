/**
 * Server-only Razorpay configuration — the SINGLE source of truth for which
 * mode is active (test/live), the active credentials, the webhook secret and
 * the hosted payment links. Nothing Razorpay-related is hardcoded anywhere
 * else in the codebase; everything is read from environment variables here.
 *
 * Required env:
 *   RAZORPAY_MODE = test | live          (defaults to "test" if unset)
 *
 * Credentials (per mode):
 *   RAZORPAY_TEST_KEY_ID / RAZORPAY_TEST_KEY_SECRET
 *   RAZORPAY_LIVE_KEY_ID / RAZORPAY_LIVE_KEY_SECRET
 *   (legacy RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are used as a fallback)
 *
 * Optional:
 *   RAZORPAY_TEST_WEBHOOK_SECRET / RAZORPAY_LIVE_WEBHOOK_SECRET
 *   RAZORPAY_TEST_PAYMENT_LINK_<PRODUCT> / RAZORPAY_LIVE_PAYMENT_LINK_<PRODUCT>
 */

export type RazorpayMode = "test" | "live";

export function getRazorpayMode(): RazorpayMode {
  return (process.env.RAZORPAY_MODE || "").toLowerCase() === "live"
    ? "live"
    : "test";
}

type ResolvedCredentials =
  | { ok: true; mode: RazorpayMode; keyId: string; keySecret: string }
  | { ok: false; mode: RazorpayMode; error: string };

/**
 * Resolve the active key pair for the configured mode, and verify the key
 * actually belongs to that mode. This is the guard that prevents live keys
 * from being used while you believe you're in test (and vice versa).
 */
export function resolveRazorpayCredentials(): ResolvedCredentials {
  const mode = getRazorpayMode();

  const keyId =
    (mode === "live"
      ? process.env.RAZORPAY_LIVE_KEY_ID
      : process.env.RAZORPAY_TEST_KEY_ID) || process.env.RAZORPAY_KEY_ID;
  const keySecret =
    (mode === "live"
      ? process.env.RAZORPAY_LIVE_KEY_SECRET
      : process.env.RAZORPAY_TEST_KEY_SECRET) || process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes("xxxx")) {
    return {
      ok: false,
      mode,
      error: `Razorpay ${mode} credentials are not configured.`,
    };
  }

  const looksLive = keyId.startsWith("rzp_live_");
  const looksTest = keyId.startsWith("rzp_test_");

  if (mode === "live" && !looksLive) {
    return {
      ok: false,
      mode,
      error:
        "RAZORPAY_MODE=live but the configured key is not a live key (expected rzp_live_…). Refusing to proceed.",
    };
  }
  if (mode === "test" && !looksTest) {
    return {
      ok: false,
      mode,
      error:
        "RAZORPAY_MODE=test but the configured key is not a test key (expected rzp_test_…). Refusing to proceed.",
    };
  }

  return { ok: true, mode, keyId, keySecret };
}

/** Webhook signing secret for the active mode (falls back to legacy var). */
export function getWebhookSecret(): string | undefined {
  const mode = getRazorpayMode();
  return (
    (mode === "live"
      ? process.env.RAZORPAY_LIVE_WEBHOOK_SECRET
      : process.env.RAZORPAY_TEST_WEBHOOK_SECRET) ||
    process.env.RAZORPAY_WEBHOOK_SECRET
  );
}

/**
 * Hosted payment link for a product, resolved from env for the active mode.
 * Returns "" when not configured. The funnel pays via embedded checkout, so
 * these are only for manual sharing — but they must never be hardcoded.
 */
export function getPaymentLink(product: "masterclass" | "workshop"): string {
  const mode = getRazorpayMode();
  const suffix = product.toUpperCase();
  const key =
    mode === "live"
      ? `RAZORPAY_LIVE_PAYMENT_LINK_${suffix}`
      : `RAZORPAY_TEST_PAYMENT_LINK_${suffix}`;
  return process.env[key] || "";
}
