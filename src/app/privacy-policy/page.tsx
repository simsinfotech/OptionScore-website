import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList, Val } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — OptionScore",
  description:
    "How OptionScore collects, uses, stores, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy"
      accentWord="Policy"
      intro={
        <>
          <p>
            This Privacy Policy explains how{" "}
            <Val>{COMPANY.legalEntityName}</Val> (&quot;we&quot;, &quot;us&quot;,
            &quot;our&quot;) collects, uses, discloses, and safeguards your
            information when you use the OptionScore app and website at{" "}
            <Val>{COMPANY.website}</Val>.
          </p>
          <p>
            We are committed to protecting your privacy in accordance with the
            Information Technology Act, 2000, the applicable rules thereunder,
            and India&apos;s Digital Personal Data Protection Act, 2023.
          </p>
        </>
      }
    >
      <LegalSection heading="1. Information We Collect">
        <p>We collect the following categories of information:</p>
        <LegalList
          items={[
            "Account information — name, email address, phone number, and password when you register.",
            "Payment information — billing details and transaction records. Card and bank details are handled directly by our payment gateway / app store partners; we do not store full card numbers.",
            "Usage data — watchlists, alerts, in-app preferences, scores you view, and feature usage.",
            "Device & technical data — device type, operating system, IP address, app version, and crash logs.",
            "Communications — messages you send us for support or feedback.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <LegalList
          items={[
            "To provide, operate, and maintain the Service and your account;",
            "To process subscriptions, payments, and renewals;",
            "To personalise your experience (e.g. watchlists and alerts);",
            "To send service-related communications, updates, and security notices;",
            "To improve our products, analytics, and AI features;",
            "To detect, prevent, and address fraud, abuse, and technical issues;",
            "To comply with legal and regulatory obligations.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="3. Legal Basis & Consent">
        <p>
          We process your personal data on the basis of your consent (given when
          you register and use the Service), to perform our contract with you, and
          to comply with legal obligations. You may withdraw consent at any time
          by deleting your account, subject to data we are required to retain by
          law.
        </p>
      </LegalSection>

      <LegalSection heading="4. How We Share Information">
        <p>
          We do not sell your personal data. We share information only with:
        </p>
        <LegalList
          items={[
            "Service providers — payment gateways, app stores, cloud hosting, analytics, and customer-support tools that process data on our behalf under confidentiality obligations;",
            "Legal & regulatory authorities — where required by law, court order, or to protect our rights and the safety of users;",
            "Business transfers — in connection with a merger, acquisition, or sale of assets, subject to this Policy.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="5. Data Retention">
        <p>
          We retain your personal data for as long as your account is active or
          as needed to provide the Service, and thereafter only as required to
          comply with legal obligations, resolve disputes, and enforce our
          agreements. When you delete your account, your data is deleted within
          30 days, except where retention is legally required.
        </p>
      </LegalSection>

      <LegalSection heading="6. Data Security">
        <p>
          We implement reasonable technical and organisational measures —
          including encryption in transit, access controls, and secure
          infrastructure — to protect your information. However, no method of
          transmission or storage is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your Rights">
        <p>You have the right to:</p>
        <LegalList
          items={[
            "Access and review the personal data we hold about you;",
            "Request correction of inaccurate or incomplete data;",
            "Request deletion of your account and data (see our Account Deletion page);",
            "Withdraw consent to processing;",
            "Lodge a complaint with our Grievance Officer (see the Contact page).",
          ]}
        />
        <p>
          To exercise any of these rights, contact us at{" "}
          <a
            href={`mailto:${COMPANY.supportEmail}`}
            className="text-accent-cyan hover:underline"
          >
            {COMPANY.supportEmail}
          </a>{" "}
          or visit our{" "}
          <a href="/account-deletion" className="text-accent-cyan hover:underline">
            Account Deletion page
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="8. Cookies & Tracking">
        <p>
          Our website may use cookies and similar technologies to operate the
          site, remember preferences, and measure usage. You can control cookies
          through your browser settings; disabling them may affect some features.
        </p>
      </LegalSection>

      <LegalSection heading="9. Children's Privacy">
        <p>
          The Service is not directed to individuals under 18. We do not
          knowingly collect personal data from minors. If you believe a minor has
          provided us data, please contact us so we can remove it.
        </p>
      </LegalSection>

      <LegalSection heading="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last
          updated&quot; date above reflects the latest revision. Material changes
          will be notified through the Service or by email.
        </p>
      </LegalSection>

      <LegalSection heading="11. Grievance Officer & Contact">
        <p>
          In accordance with applicable law, you may contact our Grievance
          Officer for any privacy concerns:
        </p>
        <LegalList
          items={[
            <>Name: <Val>{COMPANY.grievanceOfficer.name}</Val></>,
            <>Designation: {COMPANY.grievanceOfficer.designation}</>,
            <>
              Email:{" "}
              <Val>{COMPANY.grievanceOfficer.email}</Val>
            </>,
            <>Phone: <Val>{COMPANY.grievanceOfficer.phone}</Val></>,
          ]}
        />
        <p>
          See our full{" "}
          <a href="/contact" className="text-accent-cyan hover:underline">
            Contact page
          </a>{" "}
          for more details.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
