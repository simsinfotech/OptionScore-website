/**
 * Server-only registry that maps a funnel `product` id to its pricing, sheet
 * endpoint and Razorpay metadata. The API routes (lead / order / verify) read
 * from here so a single set of routes can serve multiple funnels.
 *
 * Defaults to "masterclass" when no/unknown product is supplied — this keeps
 * the existing ₹9 masterclass pages (which post no product field) working.
 */

import { MASTERCLASS_FEE_PAISE, MASTERCLASS_FEE_RUPEES } from "@/lib/masterclass";
import { WORKSHOP_FEE_PAISE, WORKSHOP_FEE_RUPEES } from "@/lib/workshop";

export type ProductId = "masterclass" | "workshop" | "webinar";

export type ProductConfig = {
  id: ProductId;
  feePaise: number;
  feeRupees: number;
  /** Env var holding the Apps Script /exec URL for this product's sheet. */
  sheetUrlEnv: string;
  /** Prefix for the Razorpay order receipt. */
  receiptPrefix: string;
  /** Razorpay notes.purpose tag. */
  notesPurpose: string;
};

export const PRODUCTS: Record<ProductId, ProductConfig> = {
  masterclass: {
    id: "masterclass",
    feePaise: MASTERCLASS_FEE_PAISE,
    feeRupees: MASTERCLASS_FEE_RUPEES,
    sheetUrlEnv: "APPS_SCRIPT_URL",
    receiptPrefix: "mc",
    notesPurpose: "masterclass-registration",
  },
  workshop: {
    id: "workshop",
    feePaise: WORKSHOP_FEE_PAISE,
    feeRupees: WORKSHOP_FEE_RUPEES,
    sheetUrlEnv: "APPS_SCRIPT_URL_WORKSHOP",
    receiptPrefix: "ws",
    notesPurpose: "workshop-registration",
  },
  webinar: {
    id: "webinar",
    feePaise: 29900,
    feeRupees: 299,
    // Its own sheet endpoint. Set APPS_SCRIPT_URL_WEBINAR, or point it at an
    // existing sheet var to reuse one. If unset, the sheet write is skipped
    // (best-effort) but the confirmation still shows.
    sheetUrlEnv: "APPS_SCRIPT_URL_WEBINAR",
    receiptPrefix: "wb",
    notesPurpose: "webinar-registration",
  },
};

export function resolveProduct(id?: string): ProductConfig {
  if (id && id in PRODUCTS) return PRODUCTS[id as ProductId];
  return PRODUCTS.masterclass;
}
