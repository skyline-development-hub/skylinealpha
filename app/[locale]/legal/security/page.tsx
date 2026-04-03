import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security — Skyline DevHub",
};

export default function Security() {
  return (
    <>
      <h1>Security</h1>
      <p className="legal-updated">
        Enterprise-grade security protecting your data, systems, and trust
      </p>

      <h2>1. Our Security Commitment</h2>
      <p>
        At Skyline DevHub, security is foundational to everything we build. We
        employ industry-standard security protocols, continuous monitoring, and
        proactive threat detection to safeguard your data and operations.
      </p>
      <p>
        Our security program is built on the principle of defense in depth,
        implementing multiple layers of security controls across our
        infrastructure, applications, and operations.
      </p>

      <h2>2. Infrastructure Security</h2>
      <h3>Cloud Infrastructure</h3>
      <p>
        Our infrastructure is hosted on industry-leading cloud providers with
        multi-region redundancy. All data centers are SOC 2 Type II certified
        and ISO 27001 compliant. We leverage edge computing for optimal
        performance and security isolation.
      </p>
      <h3>Network Security</h3>
      <p>
        Advanced DDoS protection with rate limiting, bot detection, and Web
        Application Firewall (WAF) rules. All traffic is encrypted using TLS
        1.3 with perfect forward secrecy. Network segmentation isolates critical
        systems from public-facing applications.
      </p>
      <h3>Container Security</h3>
      <p>
        All services run in isolated containers with minimal attack surface.
        Container images are scanned for vulnerabilities before deployment.
        Security policies enforce pod security standards and restrict privileged
        operations.
      </p>

      <h2>3. Data Security &amp; Encryption</h2>
      <h3>Encryption at Rest</h3>
      <p>
        All data is encrypted at rest using AES-256 encryption with hardware
        security modules (HSM) for key management. Database backups are
        encrypted and stored in geographically distributed locations.
      </p>
      <h3>Encryption in Transit</h3>
      <p>
        All data transmission uses TLS 1.3 or higher with strong cipher suites.
        Certificate pinning prevents man-in-the-middle attacks. API
        communications employ mutual TLS (mTLS) for service-to-service
        authentication.
      </p>
      <h3>Data Residency</h3>
      <p>
        For EU customers, data is stored exclusively in EU data centers,
        ensuring GDPR compliance and data sovereignty. Cross-region data
        transfers follow Standard Contractual Clauses (SCCs).
      </p>

      <h2>4. Access Control &amp; Authentication</h2>
      <h3>Multi-Factor Authentication</h3>
      <p>
        MFA is mandatory for all employee and administrative accounts. We
        support TOTP, WebAuthn/FIDO2 hardware keys, and biometric
        authentication. Enterprise clients can integrate with their existing
        SSO/SAML providers.
      </p>
      <h3>Role-Based Access Control</h3>
      <p>
        Granular permissions based on the principle of least privilege. Access
        rights are regularly audited and automatically revoked after 90 days of
        inactivity. All privileged actions require approval workflows.
      </p>
      <h3>API Security</h3>
      <p>
        API keys are hashed and never stored in plaintext. Rate limiting
        prevents abuse. API requests are authenticated using OAuth 2.0 with JWT
        tokens. Webhook signatures ensure payload integrity.
      </p>

      <h2>5. Application Security</h2>
      <h3>Secure Development Lifecycle</h3>
      <p>
        Security is integrated into every phase of development. Code reviews are
        mandatory with security checklist enforcement. We follow OWASP
        guidelines and conduct threat modeling for all new features.
      </p>
      <h3>Vulnerability Management</h3>
      <p>
        Automated dependency scanning runs on every commit. Dynamic Application
        Security Testing (DAST) runs weekly in staging environments. Annual
        third-party penetration testing by certified security firms.
      </p>

      <h2>6. Monitoring &amp; Incident Response</h2>
      <h3>24/7 Security Monitoring</h3>
      <p>
        Real-time security event monitoring with automated anomaly detection.
        SIEM aggregates logs from all systems. Machine learning models identify
        suspicious patterns and behaviors.
      </p>
      <h3>Incident Response</h3>
      <p>
        Documented incident response procedures with defined escalation paths.
        Security incidents are triaged based on severity. Post-incident reviews
        ensure continuous improvement. Mean time to detection (MTTD) under 15
        minutes.
      </p>
      <h3>Breach Notification</h3>
      <p>
        In the event of a data breach, we commit to notifying affected customers
        within 72 hours as required by GDPR. Transparent communication includes
        breach scope, impact assessment, and remediation steps.
      </p>

      <h2>7. Compliance &amp; Certifications</h2>
      <ul>
        <li>
          <strong>SOC 2 Type II</strong> — Annual audits verify security,
          availability, processing integrity, confidentiality, and privacy
          controls
        </li>
        <li>
          <strong>ISO 27001</strong> — Information Security Management System
          certification covering all aspects of information security
        </li>
        <li>
          <strong>GDPR</strong> — Full compliance with EU General Data
          Protection Regulation; DPAs available for enterprise clients
        </li>
        <li>
          <strong>CCPA/CPRA</strong> — Compliant with California consumer
          privacy requirements
        </li>
        <li>
          <strong>PCI DSS</strong> — Payment processing partners are PCI DSS
          Level 1 certified; we never store payment card data
        </li>
        <li>
          <strong>HIPAA</strong> — Business Associate Agreements available for
          healthcare clients
        </li>
      </ul>

      <h2>8. Your Role in Security</h2>
      <p>
        Security is a shared responsibility. We recommend the following best
        practices:
      </p>
      <ul>
        <li>Use strong, complex, unique passwords (password manager recommended)</li>
        <li>Enable multi-factor authentication on your account</li>
        <li>
          Store API keys securely, never commit them to version control, and
          rotate them regularly
        </li>
        <li>Report any suspicious activity immediately</li>
        <li>Keep your software and integrations updated</li>
      </ul>

      <h2>9. Responsible Disclosure Program</h2>
      <p>
        We welcome reports from security researchers who discover
        vulnerabilities in our systems. Our bug bounty program rewards
        responsible disclosure:
      </p>
      <ul>
        <li>Critical Vulnerabilities: &euro;5,000 &ndash; &euro;15,000</li>
        <li>High Severity: &euro;1,000 &ndash; &euro;5,000</li>
        <li>Medium Severity: &euro;500 &ndash; &euro;1,000</li>
        <li>Low Severity: &euro;100 &ndash; &euro;500</li>
      </ul>
      <p>
        Submit your findings to security@skylinedevhub.com. We will acknowledge
        your report within 48 hours and provide a detailed response within 5
        business days.
      </p>

      <h2>10. Security Contact</h2>
      <p>
        For security-related inquiries, vulnerability reports, or incident
        notifications:
      </p>
      <p>
        <strong>Skyline DevHub Security Team</strong>
        <br />
        Email: security@skylinedevhub.com
      </p>
    </>
  );
}
