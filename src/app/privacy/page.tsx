import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/legal-page-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How FormReady handles personal data — and why most files never reach us in the first place. DPDP Act 2023 and GDPR compliant.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      lastUpdated="2026-04-01"
      lede="The short version: we don't see your files. The long version is below — covering what we do collect, what we don't, who has access, and your rights under the DPDP Act and GDPR."
    >
      <div className="rounded-lg border border-success-soft bg-success-soft/40 p-5 not-prose mb-8">
        <p className="text-sm text-success-strong">
          <strong>Plain-language summary.</strong> File compression runs in your browser — your file is never transmitted to FormReady. We collect anonymous usage counters and (for Pro accounts) the minimum needed to bill you. We don&apos;t sell data. You can verify the no-upload claim yourself at{' '}
          <Link href="/privacy/verify" className="font-semibold underline underline-offset-4">/privacy/verify</Link>.
        </p>
      </div>

      <p className="text-sm italic text-muted-foreground">
        ⚠ This is a v0 draft. Final version is pending review by an Indian privacy lawyer before public launch. Bracketed placeholders [LIKE THIS] need to be filled by the legal entity before publication.
      </p>

      <h2>1. Who we are</h2>
      <p>
        FormReady is operated by [LEGAL ENTITY NAME — e.g., FormReady Technologies Pvt Ltd] (referred to as &quot;FormReady&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered in India with its principal office at [REGISTERED ADDRESS]. Our domain is <code>formready.in</code>.
      </p>
      <p>
        For questions about this policy or any privacy matter, contact our Grievance Officer:{' '}
        <a href="mailto:grievance@formready.in">grievance@formready.in</a>{' '}
        ([GRIEVANCE OFFICER NAME], available Monday–Friday, 10:00–18:00 IST).
      </p>

      <h2>2. The architecture-first promise</h2>
      <p>
        FormReady is designed so that personal data minimisation is structural, not optional. The compression engine runs entirely in your browser via WebAssembly and Canvas APIs. <strong>The file you upload to a tool never leaves your device</strong>. There is no server endpoint that receives file content. You can verify this by opening your browser&apos;s DevTools → Network tab while compressing — zero outbound file requests will be visible. We provide a live demonstration at <Link href="/privacy/verify">/privacy/verify</Link>.
      </p>

      <h2>3. What we collect — and don&apos;t</h2>
      <p>We deliberately collect as little as possible. Here is the complete list:</p>

      <h3>3.1 What we collect from everyone (free + Pro)</h3>
      <ul>
        <li><strong>Anonymous usage counters.</strong> When you complete a compression, your browser sends a small &quot;event&quot; ping with the operation type (e.g., &quot;pdf-compress&quot;) and a timestamp. We use this for aggregate analytics, abuse detection, and product improvement. The ping does not include your file, file name, file hash, or any user identifier.</li>
        <li><strong>Page-view analytics.</strong> We use <a href="https://plausible.io" target="_blank" rel="noreferrer">Plausible</a> for cookieless, privacy-respecting analytics. It tracks visit counts and the country of origin only.</li>
        <li><strong>Standard server logs.</strong> Like all websites, our hosting provider (Vercel) records IP addresses and user-agents for short-term abuse and performance debugging. These logs are kept for 30 days and are not associated with any account.</li>
        <li><strong>Cloudflare Turnstile.</strong> On heavy-use endpoints we run an invisible captcha (Cloudflare Turnstile). It uses no cookies and collects no personal information.</li>
      </ul>

      <h3>3.2 What we additionally collect from Pro users</h3>
      <ul>
        <li><strong>Email address</strong> (from Google OAuth) and the display name and profile picture URL Google sends with it.</li>
        <li><strong>Subscription state</strong> (active / cancelled / trial), next billing date, plan tier.</li>
        <li><strong>Razorpay payment ID</strong> (a token; not your card number).</li>
        <li><strong>API key metadata</strong> (name, scopes, last-used timestamp) — keys are stored hashed.</li>
      </ul>

      <h3>3.3 What we never collect</h3>
      <ul>
        <li>The content of any file you compress.</li>
        <li>The filename of any file you compress.</li>
        <li>Any cryptographic hash of the file (we don&apos;t fingerprint files).</li>
        <li>Any details about the persons or entities depicted in your files.</li>
        <li>Your card number, CVV, or banking credentials (those go to Razorpay; we never see them).</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        We use a minimal set of first-party cookies — none for behavioural advertising. See the full <Link href="/cookies">Cookie Policy</Link>.
      </p>

      <h2>5. Third parties we share data with</h2>
      <p>
        We only share data with services strictly necessary to operate FormReady. Each is contractually bound to use the data only for the purpose listed:
      </p>
      <ul>
        <li><strong>Google Identity</strong> — to authenticate Pro users via OAuth. Only your email, display name, and profile photo URL are received.</li>
        <li><strong>Razorpay</strong> — to process payments. Razorpay receives your billing details directly; we receive only a payment ID.</li>
        <li><strong>Resend</strong> — to send transactional emails (welcome, password reset, receipts) for Pro users.</li>
        <li><strong>Plausible</strong> — cookieless visit analytics (no personal data).</li>
        <li><strong>Sentry</strong> — JavaScript error tracking for the site itself. No file content is ever sent.</li>
        <li><strong>Google AdSense</strong> — serves ads on tool and content pages. AdSense uses its own cookies governed by Google&apos;s privacy policy. You can opt out at <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">adssettings.google.com</a>.</li>
        <li><strong>Cloudflare Turnstile</strong> — invisible captcha to deter abuse.</li>
        <li><strong>Vercel</strong> — our hosting provider; sees only what any HTTPS endpoint sees (IPs, user-agents, request paths).</li>
      </ul>
      <p>We do not sell, rent, or trade your personal information to anyone.</p>

      <h2>6. Where data is stored</h2>
      <p>
        Pro account data is stored in PostgreSQL on infrastructure located in [REGION — typically AWS Mumbai (ap-south-1) for Indian users]. Logs and analytics are stored on the respective providers&apos; infrastructure as listed above. File content is never stored anywhere because it is never received.
      </p>

      <h2>7. How long we keep data</h2>
      <ul>
        <li><strong>Anonymous usage counters:</strong> retained for 13 months for trend analysis, then aggregated.</li>
        <li><strong>Pro account data:</strong> retained for the lifetime of the account, then deleted within 30 days of account closure (with a 30-day grace window during which the deletion is reversible).</li>
        <li><strong>GST invoices:</strong> retained for 8 years per Indian tax law, in anonymised form (only the legal minimum identifying information).</li>
        <li><strong>Server logs:</strong> 30 days.</li>
      </ul>

      <h2>8. Your rights under the DPDP Act 2023</h2>
      <p>If you are an Indian resident, the Digital Personal Data Protection Act, 2023 grants you the following rights regarding any personal data we hold about you:</p>
      <ul>
        <li><strong>Right to access</strong> a summary of the personal data we hold about you.</li>
        <li><strong>Right to correct or update</strong> inaccurate or outdated information.</li>
        <li><strong>Right to erasure</strong> — request deletion of your data, subject to legal retention requirements (e.g., GST invoices).</li>
        <li><strong>Right to grievance redressal</strong> — escalate concerns through our Grievance Officer.</li>
        <li><strong>Right to nominate</strong> — designate someone to exercise your rights in case of incapacity or death.</li>
      </ul>
      <p>
        Pro users can exercise the access, correction, and deletion rights directly from{' '}
        <Link href="/account/profile">/account/profile</Link>. Free users — since we hold no identifying information about you — these rights are mostly moot, but you can still email us with any concern.
      </p>

      <h2>9. Your rights under GDPR (if applicable)</h2>
      <p>
        If you are a resident of the European Economic Area, the United Kingdom, or Switzerland, you have analogous rights under the GDPR — including the right to object to processing, the right to data portability, and the right to lodge a complaint with your local supervisory authority.
      </p>

      <h2>10. Children</h2>
      <p>
        Our services are intended for users 13 years of age or older. If you are under the age of majority in your jurisdiction, you may use FormReady only with the consent and supervision of a parent or guardian. We do not knowingly collect personal data from children under 13.
      </p>

      <h2>11. International transfers</h2>
      <p>
        Some of our service providers (e.g., Sentry, Plausible) operate from regions outside India. Data shared with them is limited to the minimum necessary for the service to function (no file content) and is governed by the standard contractual clauses each provider uses for cross-border transfer compliance.
      </p>

      <h2>12. Security</h2>
      <p>
        We follow industry-standard security practices including TLS encryption for all data in transit, encrypted storage at rest, hashed storage of API keys and secrets, two-factor authentication for our internal admin access, and quarterly third-party security review. The most important security control on our side is structural: <em>we don&apos;t hold what we don&apos;t collect.</em>
      </p>

      <h2>13. Data breach notification</h2>
      <p>
        In the unlikely event of a personal data breach affecting Pro account data, we will notify the Data Protection Board of India and affected users within 72 hours of becoming aware of the breach, in accordance with DPDP Act §8(6).
      </p>

      <h2>14. Changes to this policy</h2>
      <p>
        We may update this policy occasionally to reflect new features, regulatory requirements, or operational changes. The &quot;Last updated&quot; date at the top of this page reflects the most recent change. Material changes (those that materially affect your rights) will be communicated to Pro users via email and a banner on the site requesting re-acceptance of terms.
      </p>

      <h2>15. Contact</h2>
      <p>For privacy-related queries:</p>
      <ul>
        <li>Email: <a href="mailto:privacy@formready.in">privacy@formready.in</a> — general privacy questions</li>
        <li>Grievance Officer: <a href="mailto:grievance@formready.in">grievance@formready.in</a> — formal grievance under the DPDP Act</li>
        <li>Data Protection Officer: <a href="mailto:dpo@formready.in">dpo@formready.in</a> — GDPR matters</li>
      </ul>
      <p>
        If you are not satisfied with our response, you have the right to lodge a complaint with the Data Protection Board of India (<a href="https://dpb.gov.in" target="_blank" rel="noreferrer">dpb.gov.in</a>) or, for EU/UK residents, with your local supervisory authority.
      </p>
    </LegalPageShell>
  )
}
