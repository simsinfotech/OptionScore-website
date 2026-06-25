import type { Metadata } from "next";
import { LegalPage, LegalSection, Val } from "@/components/legal/LegalPage";
import { COMPANY, isPlaceholder } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Contact Us | OptionScore",
  description:
    "Get in touch with the OptionScore team. Support, business, and grievance contact details.",
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
      <span className="text-text-muted text-xs font-semibold uppercase tracking-normal sm:w-40 flex-shrink-0">
        {label}
      </span>
      <span className="text-sm">
        <Val>{value}</Val>
      </span>
    </div>
  );
}

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      accentWord="Us"
      intro={
        <p>
          We&apos;re here to help. Reach out using the details below and our team
          will get back to you during business hours ({COMPANY.businessHours}).
        </p>
      }
    >
      {/* Company & support details */}
      <LegalSection heading="Business Details">
        <div className="bg-card border border-card-border p-6 space-y-4">
          <DetailRow label="Legal Entity" value={COMPANY.legalEntityName} />
          <DetailRow label="Brand" value={COMPANY.brandName} />
          <DetailRow label="Registered Address" value={COMPANY.registeredAddress} />
          {!isPlaceholder(COMPANY.gstin) && (
            <DetailRow label="GSTIN" value={COMPANY.gstin} />
          )}
          <DetailRow label="Website" value={COMPANY.website} />
        </div>
      </LegalSection>

      {/* Support */}
      <LegalSection heading="Customer Support">
        <div className="bg-card border border-card-border p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-normal sm:w-40 flex-shrink-0">
              Email
            </span>
            <a
              href={`mailto:${COMPANY.supportEmail}`}
              className="text-sm text-accent-cyan hover:underline"
            >
              {COMPANY.supportEmail}
            </a>
          </div>
          <DetailRow label="Phone" value={COMPANY.phone} />
          <DetailRow label="Business Hours" value={COMPANY.businessHours} />
        </div>
      </LegalSection>

      {/* Grievance Officer — mandatory under Consumer Protection (E-Commerce) Rules */}
      <LegalSection heading="Grievance Officer">
        <p>
          In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and
          applicable RBI / IT Act guidelines, the following officer may be
          contacted for any complaints or grievances regarding the Service or
          your data:
        </p>
        <div className="bg-card border border-card-border p-6 space-y-4">
          <DetailRow label="Name" value={COMPANY.grievanceOfficer.name} />
          <DetailRow label="Designation" value={COMPANY.grievanceOfficer.designation} />
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-normal sm:w-40 flex-shrink-0">
              Email
            </span>
            <span className="text-sm">
              <Val>{COMPANY.grievanceOfficer.email}</Val>
            </span>
          </div>
          <DetailRow label="Phone" value={COMPANY.grievanceOfficer.phone} />
        </div>
        <p className="text-text-muted text-xs">
          We aim to acknowledge grievances within 48 hours and resolve them
          within a reasonable timeframe as required by law.
        </p>
      </LegalSection>

      <LegalSection heading="Other Requests">
        <p>
          For account deletion, visit our{" "}
          <a href="/account-deletion" className="text-accent-cyan hover:underline">
            Account Deletion page
          </a>
          . For policies, see our{" "}
          <a href="/terms" className="text-accent-cyan hover:underline">
            Terms
          </a>
          ,{" "}
          <a href="/privacy-policy" className="text-accent-cyan hover:underline">
            Privacy Policy
          </a>
          , and{" "}
          <a href="/refund-policy" className="text-accent-cyan hover:underline">
            Refund Policy
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
