import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR Compliance — Skyline DevHub",
};

export default function GDPRCompliance() {
  return (
    <>
      <h1>GDPR Compliance</h1>
      <p className="legal-updated">Last Updated: November 3, 2025</p>

      <h2>1. Our Commitment to GDPR</h2>
      <p>
        Skyline DevHub is fully committed to compliance with the European Union
        General Data Protection Regulation (GDPR). We implement comprehensive
        policies, technical controls, and organizational measures to protect
        personal data using a defense-in-depth approach.
      </p>

      <h2>2. Legal Basis for Data Processing</h2>
      <p>
        Under GDPR Article 6, we process personal data only with a valid legal
        basis:
      </p>
      <h3>Contractual Necessity</h3>
      <p>
        Account creation, service delivery, payment processing, and customer
        support.
      </p>
      <h3>Legitimate Interests</h3>
      <p>
        Fraud prevention, security monitoring, service improvement, and
        marketing communications (with opt-out).
      </p>
      <h3>Legal Obligation</h3>
      <p>
        Tax reporting, responses to authority requests, and legally mandated
        record keeping.
      </p>
      <h3>Consent</h3>
      <p>
        Marketing communications, cookies, and optional data collection.
        Consent may be withdrawn at any time.
      </p>

      <h2>3. Your Rights Under GDPR</h2>

      <h3>Right to Access (Article 15)</h3>
      <p>
        You may obtain confirmation of whether we process your data and request
        access to it. Contact privacy@skylinedevhub.com; we will respond within
        30 days.
      </p>

      <h3>Right to Rectification (Article 16)</h3>
      <p>
        You may correct inaccurate or incomplete personal data. Update your
        account settings directly or contact us for corrections, which take
        effect immediately.
      </p>

      <h3>Right to Erasure (Article 17)</h3>
      <p>
        You may request deletion of your personal data when: the data is no
        longer necessary, consent is withdrawn, an objection is valid,
        processing was unlawful, or a legal obligation requires it. Deletion
        requests are processed within 30 days, with exceptions for legal
        retention requirements.
      </p>

      <h3>Right to Restriction (Article 18)</h3>
      <p>
        You may restrict processing in certain situations. Contact our Data
        Protection Officer; your data will be marked and processing limited
        accordingly.
      </p>

      <h3>Right to Data Portability (Article 20)</h3>
      <p>
        You may receive your personal data in a structured, machine-readable
        format (JSON). Request via your dashboard or email; delivered within 30
        days.
      </p>

      <h3>Right to Object (Article 21)</h3>
      <p>
        You may object to processing based on legitimate interests or for
        marketing purposes. Use unsubscribe links or contact us directly.
      </p>

      <h3>Right to Withdraw Consent (Article 7(3))</h3>
      <p>
        You may withdraw consent at any time via your account settings or by
        contacting us directly.
      </p>

      <h3>Right to Lodge a Complaint (Article 77)</h3>
      <p>
        You have the right to lodge a complaint with a supervisory authority.
        For EU-wide information, visit edpb.europa.eu.
      </p>

      <h2>4. Data Protection Principles (Article 5)</h2>
      <ul>
        <li>
          <strong>Lawfulness, Fairness &amp; Transparency</strong> — Valid
          legal basis, fair processing, clear communication
        </li>
        <li>
          <strong>Purpose Limitation</strong> — Specified, explicit, and
          legitimate purposes only
        </li>
        <li>
          <strong>Data Minimization</strong> — Only adequate, relevant, and
          necessary data collected
        </li>
        <li>
          <strong>Accuracy</strong> — Data maintained accurately and kept up to
          date; errors corrected promptly
        </li>
        <li>
          <strong>Storage Limitation</strong> — Retained only as long as
          necessary, then deleted or anonymized
        </li>
        <li>
          <strong>Integrity &amp; Confidentiality</strong> — Appropriate
          technical and organizational security measures applied
        </li>
      </ul>

      <h2>5. Data Processing &amp; Security Measures</h2>
      <h3>Technical Measures</h3>
      <ul>
        <li>AES-256 encryption at rest</li>
        <li>TLS 1.3 encryption in transit</li>
        <li>Pseudonymization and anonymization where appropriate</li>
        <li>Role-based access controls</li>
        <li>Multi-factor authentication</li>
        <li>Automated vulnerability scanning</li>
        <li>Secure development lifecycle</li>
        <li>Regular penetration testing and audits</li>
      </ul>
      <h3>Organizational Measures</h3>
      <ul>
        <li>Dedicated Data Protection Officer (DPO)</li>
        <li>Regular staff training on data protection</li>
        <li>Data Protection Impact Assessments (DPIAs)</li>
        <li>Documented information security policies</li>
        <li>Vendor due diligence and processor agreements</li>
        <li>Incident response and breach notification procedures</li>
        <li>Regular compliance audits</li>
        <li>Privacy by Design and Privacy by Default</li>
      </ul>

      <h2>6. International Data Transfers</h2>
      <p>
        For EU customers, data is stored exclusively in EU data centers. All
        cross-border data transfers employ appropriate safeguards:
      </p>
      <ul>
        <li>
          Standard Contractual Clauses (SCCs) approved by the EU for
          third-country transfers
        </li>
        <li>Binding Corporate Rules for intra-group transfers</li>
        <li>Supplementary technical controls as additional measures</li>
        <li>
          Adequacy decisions for jurisdictions with adequate protection levels
        </li>
      </ul>
      <p>
        Transfer Impact Assessments are conducted to evaluate risks per Schrems
        II guidance.
      </p>

      <h2>7. Data Processing Agreement</h2>
      <p>
        We provide Data Processing Agreements covering all data processing
        activities performed on behalf of clients, including transparent
        sub-processor lists with advance notification before adding new
        sub-processors. To request a DPA, contact legal@skylinedevhub.com;
        typical processing time is 5 business days.
      </p>

      <h2>8. Data Breach Notification</h2>
      <ul>
        <li>
          <strong>Detection &amp; Response</strong> — Continuous monitoring with
          immediate action upon detection
        </li>
        <li>
          <strong>Authority Notification</strong> — Within 72 hours as required
          by GDPR
        </li>
        <li>
          <strong>Individual Notification</strong> — Affected individuals
          notified promptly
        </li>
        <li>
          <strong>Documentation</strong> — Full documentation of breach scope,
          impact, and remediation steps
        </li>
      </ul>

      <h2>9. Contact</h2>
      <p>
        <strong>Data Protection Officer</strong>
        <br />
        Email: dpo@skylinedevhub.com
        <br />
        Address: Tirana, Albania
        <br />
        Response time: within 30 days
      </p>
      <p>
        <strong>Privacy &amp; Data Requests</strong>
        <br />
        Email: privacy@skylinedevhub.com
      </p>
    </>
  );
}
