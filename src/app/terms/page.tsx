import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList, Val } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions — OptionScore",
  description:
    "The terms and conditions governing your use of the OptionScore app and website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms &"
      accentWord="Conditions"
      intro={
        <>
          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your access
            to and use of the OptionScore mobile application, website at{" "}
            <Val>{COMPANY.website}</Val>, and related services (collectively, the
            &quot;Service&quot;), operated by <Val>{COMPANY.legalEntityName}</Val>{" "}
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
          </p>
          <p>
            By creating an account, subscribing, or otherwise using the Service,
            you agree to be bound by these Terms. If you do not agree, please do
            not use the Service.
          </p>
        </>
      }
    >
      <LegalSection heading="1. Nature of the Service — Not Investment Advice">
        <p>
          OptionScore is a <strong>market data, analytics and educational
          tool</strong>. It provides quantitative scores, charts, indicators,
          options-chain data, and AI-generated informational content to help you
          analyse markets and learn.
        </p>
        <p>
          OptionScore is <strong>not</strong> a SEBI-registered investment
          adviser, research analyst, stockbroker, or portfolio manager. Nothing
          on the Service constitutes investment advice, a recommendation, or a
          solicitation to buy, sell, or hold any security or financial
          instrument. We do not provide personalised investment advice. All
          trading and investment decisions are made solely by you, at your own
          risk. See our risk disclaimer in Section 9.
        </p>
      </LegalSection>

      <LegalSection heading="2. Eligibility">
        <p>
          You must be at least 18 years of age and legally capable of entering
          into a binding contract under the Indian Contract Act, 1872 to use the
          Service. By using the Service you represent that you meet these
          requirements.
        </p>
      </LegalSection>

      <LegalSection heading="3. Accounts">
        <LegalList
          items={[
            "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
            "You agree to provide accurate, current and complete information and to keep it updated.",
            "Notify us immediately of any unauthorised use of your account.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="4. Subscriptions, Plans & Billing">
        <p>
          OptionScore offers paid subscription plans (Starter, Intermediate and
          Pro), billed monthly or annually in Indian Rupees (INR). A free trial
          may be offered where indicated. All applicable prices and taxes are
          shown before you complete payment.
        </p>
        <LegalList
          items={[
            "Subscriptions renew automatically for the same period unless cancelled before the renewal date.",
            "Payments made through the mobile app are processed by the Apple App Store or Google Play and are subject to their terms. Payments made through our website are processed by our payment gateway partner.",
            "Cancellation and refund terms are set out in our Refund & Cancellation Policy.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="5. Acceptable Use">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Use the Service for any unlawful purpose or in violation of any applicable law or regulation;",
            "Copy, scrape, resell, redistribute, or create derivative works from our data, scores, or content without written permission;",
            "Attempt to reverse-engineer, decompile, or gain unauthorised access to the Service or its systems;",
            "Interfere with or disrupt the integrity or performance of the Service.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="6. Intellectual Property">
        <p>
          All content, software, scores, algorithms, trademarks, and design
          elements of the Service are owned by or licensed to{" "}
          <Val>{COMPANY.legalEntityName}</Val> and are protected by applicable
          intellectual-property laws. You are granted a limited, non-exclusive,
          non-transferable licence to use the Service for your personal,
          non-commercial use.
        </p>
      </LegalSection>

      <LegalSection heading="7. Third-Party Data & Services">
        <p>
          The Service may display market data and information sourced from third
          parties and may integrate with third-party services (such as
          brokerages and app stores). We are not responsible for the accuracy,
          completeness, or availability of third-party data or services.
        </p>
      </LegalSection>

      <LegalSection heading="8. No Warranty">
        <p>
          The Service is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without warranties of any kind, whether express
          or implied. We do not warrant that the Service will be uninterrupted,
          error-free, or that any score, data, or analysis will be accurate or
          will produce any particular result.
        </p>
      </LegalSection>

      <LegalSection heading="9. Risk Disclaimer & Limitation of Liability">
        <p>
          Trading and investing in securities, derivatives, futures and options
          involve substantial risk of loss and are not suitable for every
          investor. Past performance and back-tested results are not indicative
          of future results. You may lose some or all of your capital.
        </p>
        <p>
          To the maximum extent permitted by law,{" "}
          <Val>{COMPANY.legalEntityName}</Val> and its directors, employees and
          affiliates shall not be liable for any direct, indirect, incidental,
          consequential, or special damages, including any trading or investment
          losses, arising from your use of or reliance on the Service.
        </p>
      </LegalSection>

      <LegalSection heading="10. Suspension & Termination">
        <p>
          We may suspend or terminate your access to the Service at any time if
          you breach these Terms or use the Service in a manner that may cause
          harm to us or other users. You may stop using the Service and request
          account deletion at any time.
        </p>
      </LegalSection>

      <LegalSection heading="11. Governing Law & Jurisdiction">
        <p>
          These Terms are governed by the laws of India. Subject to applicable
          law, the courts at our registered place of business shall have
          exclusive jurisdiction over any disputes arising out of or in
          connection with these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="12. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Material changes will be
          notified through the Service or by email. Continued use after changes
          take effect constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="13. Contact">
        <p>
          For any questions about these Terms, contact us at{" "}
          <a
            href={`mailto:${COMPANY.legalEmail}`}
            className="text-accent-cyan hover:underline"
          >
            {COMPANY.legalEmail}
          </a>{" "}
          or see our{" "}
          <a href="/contact" className="text-accent-cyan hover:underline">
            Contact page
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
