import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList, Val } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy — OptionScore",
  description:
    "How OptionScore delivers its digital subscription service.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping &"
      accentWord="Delivery Policy"
      intro={
        <>
          <p>
            OptionScore is a <strong>digital service</strong> provided by{" "}
            <Val>{COMPANY.legalEntityName}</Val>. We do not sell or ship any
            physical goods. This policy explains how access to our digital
            service is delivered.
          </p>
        </>
      }
    >
      <LegalSection heading="1. No Physical Shipping">
        <p>
          As OptionScore is delivered entirely electronically through our mobile
          app and website, there is no physical shipment, courier, or delivery
          charge involved.
        </p>
      </LegalSection>

      <LegalSection heading="2. Digital Delivery & Activation">
        <LegalList
          items={[
            "Access to the Service is granted electronically immediately after you successfully register and your subscription payment is confirmed.",
            "Paid features are unlocked automatically within your OptionScore account on the device(s) where you are signed in.",
            "Where a free trial applies, full access is provided for the trial period and continues seamlessly if you remain subscribed.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="3. Delivery Confirmation">
        <p>
          Upon successful payment you will receive a confirmation by email and/or
          an in-app notification. If your access is not activated within a
          reasonable time after a successful payment, please contact us so we can
          resolve it promptly.
        </p>
      </LegalSection>

      <LegalSection heading="4. Service Availability">
        <p>
          We aim to keep the Service available at all times, but access may
          occasionally be interrupted for maintenance, updates, or factors
          beyond our control. Such interruptions do not constitute a failure of
          delivery.
        </p>
      </LegalSection>

      <LegalSection heading="5. Contact">
        <p>
          For any questions about access or delivery, contact us at{" "}
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
