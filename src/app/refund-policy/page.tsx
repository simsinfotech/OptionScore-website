import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList, Val } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — OptionScore",
  description:
    "OptionScore's policy on subscription cancellations and refunds.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund &"
      accentWord="Cancellation Policy"
      intro={
        <>
          <p>
            This Refund &amp; Cancellation Policy explains how cancellations and
            refunds work for OptionScore subscriptions operated by{" "}
            <Val>{COMPANY.legalEntityName}</Val>. Please read it carefully before
            subscribing. All prices are in Indian Rupees (INR) and all
            applicable taxes are shown before payment.
          </p>
        </>
      }
    >
      <LegalSection heading="1. Subscriptions & Free Trial">
        <p>
          OptionScore is offered as a recurring subscription (monthly or annual)
          across our Starter, Intermediate, and Pro plans. Where a free trial is
          offered, you will not be charged until the trial period ends. You can
          cancel before the trial ends to avoid being charged.
        </p>
      </LegalSection>

      <LegalSection heading="2. How to Cancel">
        <LegalList
          items={[
            "Purchases made through the Apple App Store or Google Play: manage or cancel your subscription directly in your App Store / Google Play account settings. App-store purchases are governed by the respective store's refund policies.",
            "Purchases made through our website: cancel from your account settings or by emailing us at the address below.",
            "Cancellation stops future renewals. You retain access to paid features until the end of the current billing period.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="3. Refunds">
        <p>
          OptionScore provides access to a digital service that is made available
          immediately upon subscription. As a general rule:
        </p>
        <LegalList
          items={[
            "Subscription fees are non-refundable once the billing period has begun and the service has been made available to you.",
            "We do not provide pro-rated refunds for the unused portion of a billing period after cancellation.",
            "Amounts already charged for a completed billing period are not refunded when you cancel mid-cycle; you simply will not be billed again.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="4. Exceptions — When We Do Refund">
        <p>
          We will review refund requests on a case-by-case basis and may issue a
          refund where:
        </p>
        <LegalList
          items={[
            "You were charged in error or charged more than once for the same period (duplicate / erroneous payment);",
            "A technical fault on our side prevented you from accessing the paid service for a sustained period and we were unable to resolve it;",
            "A refund is required under applicable consumer-protection law.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="5. How to Request a Refund">
        <p>
          To request a refund for an eligible case, email{" "}
          <a
            href={`mailto:${COMPANY.supportEmail}`}
            className="text-accent-cyan hover:underline"
          >
            {COMPANY.supportEmail}
          </a>{" "}
          within <strong>7 days</strong> of the charge, including your
          registered email, the transaction ID / payment reference, and the
          reason for the request.
        </p>
      </LegalSection>

      <LegalSection heading="6. Refund Processing Time">
        <p>
          Approved refunds are processed to the original payment method. Once
          initiated, it typically takes <strong>5–7 business days</strong> for
          the amount to reflect in your account, depending on your bank or card
          issuer. Note that for purchases made via the App Store / Google Play,
          refunds are processed by those platforms under their policies.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <p>
          For any questions about cancellations or refunds, contact us at{" "}
          <a
            href={`mailto:${COMPANY.supportEmail}`}
            className="text-accent-cyan hover:underline"
          >
            {COMPANY.supportEmail}
          </a>{" "}
          or call <Val>{COMPANY.phone}</Val> during business hours (
          {COMPANY.businessHours}).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
