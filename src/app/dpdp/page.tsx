import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/legal-page-shell'

export const metadata: Metadata = {
  title: 'DPDP Compliance — Digital Personal Data Protection Act, 2023',
  description:
    'How Compress4 complies with the Digital Personal Data Protection Act, 2023, the Indian privacy law that governs personal data of Indian residents.',
  alternates: { canonical: '/dpdp' },
}

export default function DpdpPage() {
  return (
    <LegalPageShell
      title="DPDP Compliance"
      eyebrow="DPDP Act 2023"
      lastUpdated="2026-04-01"
      lede="A focused note on how the Digital Personal Data Protection Act, 2023 applies to Compress4 — and how our architecture lets us comply by collecting almost nothing in the first place."
    >
      <p className="text-sm italic text-muted-foreground">
        ⚠ This is a v0 draft. Final version pending review by Indian privacy counsel before public launch.
      </p>

      <h2>1. About this notice</h2>
      <p>
        India&apos;s <strong>Digital Personal Data Protection Act, 2023</strong> (&quot;DPDP Act&quot;) regulates the processing of digital personal data of residents of India. This notice describes how Compress4 complies with the DPDP Act. It is supplemental to our broader <Link href="/privacy">Privacy Policy</Link>; where there is any conflict between the two on DPDP-specific matters, this notice prevails for Indian residents.
      </p>

      <h2>2. The architecture-first approach</h2>
      <p>
        The cleanest way to comply with a data protection law is to never collect personal data in the first place. Compress4 is built around that principle. Single-file compression (PDF, image, photo, signature) runs entirely in your browser via WebAssembly. <strong>The file content never reaches Compress4 servers</strong>, which means no personal data within those files ever becomes our responsibility under the DPDP Act.
      </p>
      <p>
        You can verify this yourself at <Link href="/privacy/verify">/privacy/verify</Link>: open DevTools, run a sample compression, watch the Network tab show zero outbound file requests.
      </p>

      <h2>3. Personal data we do process</h2>
      <p>For Indian residents, we process the following personal data, all of which falls under the DPDP Act:</p>
      <ul>
        <li><strong>Pro account holders:</strong> email address (from Google OAuth), display name, profile photo URL, subscription state, billing address (Indian state for GST purposes), Razorpay payment ID.</li>
        <li><strong>All visitors:</strong> IP address (in short-term hosting logs only, not associated with any account), anonymous usage event timestamps.</li>
      </ul>

      <h2>4. Data Fiduciary identity</h2>
      <p>For the purposes of the DPDP Act:</p>
      <div className="rounded-md border border-border bg-card p-5 not-prose">
        <p className="text-sm">
          <strong>Data Fiduciary:</strong> [LEGAL ENTITY NAME — e.g., FormReady Technologies Pvt Ltd]<br />
          <strong>CIN:</strong> [CORPORATE IDENTIFICATION NUMBER]<br />
          <strong>Registered office:</strong> [REGISTERED ADDRESS, INDIA]<br />
          <strong>Email:</strong> <a href="mailto:hello@formready.in">hello@formready.in</a>
        </p>
      </div>

      <h2>5. Grievance Officer</h2>
      <p>Per §10 of the DPDP Act, our designated Grievance Officer:</p>
      <div className="rounded-md border border-border bg-card p-5 not-prose">
        <p className="text-sm">
          <strong>Name:</strong> [GRIEVANCE OFFICER NAME]<br />
          <strong>Email:</strong> <a href="mailto:grievance@formready.in">grievance@formready.in</a><br />
          <strong>Address:</strong> [REGISTERED ADDRESS, INDIA]<br />
          <strong>Hours:</strong> Monday–Friday, 10:00–18:00 IST<br />
          <strong>Response time:</strong> we acknowledge grievances within 7 working days and resolve them within 30 days where reasonable.
        </p>
      </div>

      <h2>6. Your rights under the DPDP Act</h2>
      <p>If you are a resident of India, the DPDP Act grants you the following rights:</p>
      <h3>6.1 Right to access (§11)</h3>
      <p>You may request a summary of the personal data we hold about you, the processing activities undertaken with it, and the identities of any Data Processors with whom it has been shared. Email <a href="mailto:grievance@formready.in">grievance@formready.in</a>; Pro users can self-serve this from <Link href="/account/profile">/account/profile</Link>.</p>

      <h3>6.2 Right to correction and erasure (§12)</h3>
      <p>You may request correction of inaccurate data or erasure of your data. Erasure is subject to legal retention requirements — for example, GST invoices must be retained for 8 years per Indian tax law, but we anonymise them after account closure.</p>

      <h3>6.3 Right to grievance redressal (§13)</h3>
      <p>You may submit a grievance to our Grievance Officer using the contact above. If unsatisfied with our response, you may approach the Data Protection Board of India.</p>

      <h3>6.4 Right of nomination (§14)</h3>
      <p>You may nominate another individual to exercise your rights in case of your death or incapacity. Email this nomination to <a href="mailto:grievance@formready.in">grievance@formready.in</a> with the nominee&apos;s name and contact details.</p>

      <h2>7. Lawful basis for processing</h2>
      <p>We process personal data on the following lawful bases under §7 of the DPDP Act:</p>
      <ul>
        <li><strong>Consent</strong> (§7(a)) — for marketing communications and product updates. You can withdraw consent at any time by adjusting notification preferences in your Pro profile.</li>
        <li><strong>Performance of a contract</strong> (§7(b)) — for processing payments, providing Pro features, and sending transactional emails (welcome, password reset, receipts).</li>
        <li><strong>Compliance with legal obligation</strong> (§7(d)) — for retaining GST invoices for 8 years per Indian tax law, and for reporting personal data breaches to the Data Protection Board within 72 hours.</li>
        <li><strong>Legitimate use</strong> (§7(g)) — anonymous usage counters and abuse detection are processed under legitimate business interest.</li>
      </ul>

      <h2>8. Data localisation</h2>
      <p>
        Pro account data is stored in PostgreSQL on infrastructure located in [REGION — typically AWS Mumbai (ap-south-1) for Indian users]. Some operational data (anonymous error reports via Sentry, cookieless analytics via Plausible) is processed on infrastructure outside India under standard contractual safeguards.
      </p>

      <h2>9. Children</h2>
      <p>
        Per §9 of the DPDP Act, processing of personal data of children (under 18 in India) requires parental consent and additional protections. Our Pro tier is intended for users 18 and over; the free tier requires no personal data and is suitable for users 13 and over.
      </p>

      <h2>10. Personal data breaches</h2>
      <p>
        In the unlikely event of a personal data breach affecting Pro account data, per §8(6) of the DPDP Act we will:
      </p>
      <ul>
        <li>Notify the Data Protection Board of India within 72 hours.</li>
        <li>Notify affected Data Principals (you) without undue delay, with the nature of the breach, what was affected, and recommended steps.</li>
        <li>Provide a remediation report within a reasonable timeframe.</li>
      </ul>

      <h2>11. Significant Data Fiduciary status</h2>
      <p>
        Based on our current scale of operations, Compress4 is not classified as a Significant Data Fiduciary under §10 of the DPDP Act. If our processing volumes change such that this classification applies, we will appoint a Data Protection Officer, conduct annual data audits, and update this notice accordingly.
      </p>

      <h2>12. Updates to this notice</h2>
      <p>
        We may update this notice as the DPDP Act&apos;s rules and adjudicative orders evolve. The &quot;Last updated&quot; date at the top reflects the most recent change.
      </p>

      <h2>13. Contact</h2>
      <ul>
        <li>Grievance Officer: <a href="mailto:grievance@formready.in">grievance@formready.in</a> — formal grievances</li>
        <li>General privacy: <a href="mailto:privacy@formready.in">privacy@formready.in</a></li>
        <li>Data Protection Board of India: <a href="https://dpb.gov.in" target="_blank" rel="noreferrer">dpb.gov.in</a> — for unresolved complaints</li>
      </ul>
    </LegalPageShell>
  )
}
