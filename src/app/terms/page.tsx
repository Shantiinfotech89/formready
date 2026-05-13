import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/legal-page-shell'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your use of FormReady — free tools, Pro subscriptions, and the API.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      lastUpdated="2026-04-01"
      lede="The plain-English contract for using FormReady. Read it once; we'll let you know if it changes."
    >
      <p className="text-sm italic text-muted-foreground">
        ⚠ This is a v0 draft. Final version pending Indian commercial-law review before public launch.
      </p>

      <h2>1. Acceptance of these terms</h2>
      <p>
        By using <code>formready.in</code> (the &quot;Service&quot;), you agree to these Terms of Service. If you don&apos;t agree, please don&apos;t use the Service. By using the Service on behalf of an organisation, you represent that you have authority to bind that organisation.
      </p>

      <h2>2. Who we are</h2>
      <p>
        The Service is provided by [LEGAL ENTITY NAME — e.g., FormReady Technologies Pvt Ltd], a company registered in India ([CIN]) with its principal office at [REGISTERED ADDRESS]. Our domain is <code>formready.in</code>.
      </p>

      <h2>3. The service</h2>
      <p>
        FormReady provides browser-based file compression and resizing tools (PDF, image, photo, signature), and related programmatic landing pages, blog content, and FAQ resources. The Service is offered in two tiers:
      </p>
      <ul>
        <li><strong>Free tier</strong> — single-file compression, supported by ads, with a rate limit of 30 operations per hour per IP address.</li>
        <li><strong>Pro tier</strong> — a paid subscription unlocking batch processing, API access, ad-free use, and additional features. Pro is not yet available; this section reserves terms that will apply when it launches.</li>
      </ul>

      <h2>4. Eligibility</h2>
      <p>
        You must be at least 13 years old to use the Service, and at least 18 (or the age of majority in your jurisdiction) to subscribe to the Pro tier. Use of the API requires a Pro subscription on an API-enabled plan and acceptance of additional API-specific terms in our <Link href="/api/docs">API documentation</Link>.
      </p>

      <h2>5. Your account (Pro)</h2>
      <p>
        Pro accounts are created via Google OAuth. You are responsible for maintaining the security of the Google account you authenticate with. We will treat any action taken from your authenticated session as your action.
      </p>
      <p>You agree to:</p>
      <ul>
        <li>Provide accurate, current information.</li>
        <li>Promptly notify us of any unauthorised access via <a href="mailto:security@formready.in">security@formready.in</a>.</li>
        <li>Not share access credentials or attempt to use the Service from someone else&apos;s account.</li>
      </ul>

      <h2>6. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for any illegal activity or to infringe on the rights of others.</li>
        <li>Compress or process files containing material that is illegal in India or your jurisdiction (CSAM, terrorist content, etc.).</li>
        <li>Attempt to bypass rate limits or abuse detection.</li>
        <li>Reverse-engineer, scrape, or systematically access the Service except via our public API with valid keys.</li>
        <li>Resell access to the Service without explicit written permission.</li>
        <li>Use the Service to attack, probe, or harm any third-party system.</li>
      </ul>
      <p>
        We may suspend or terminate access for violations, with notice where reasonable. For severe violations (illegal content, security attacks), suspension may be immediate.
      </p>

      <h2>7. Payments and renewals (Pro)</h2>
      <p>
        Pro subscriptions are billed monthly or annually as you choose, via Razorpay. Indian GST (18%) is added to the listed price. By subscribing, you authorise auto-renewal at the end of each billing period.
      </p>
      <p>
        You may cancel anytime from <Link href="/account/billing">/account/billing</Link>. Cancellation is effective at the end of the current billing period; you retain access until then. We do not offer refunds for unused time except within our 7-day money-back guarantee for new subscriptions (first 7 days only).
      </p>
      <p>
        We may change Pro pricing for new subscribers at any time. Existing subscribers will be given at least 30 days&apos; notice before any price increase affecting their plan, and an opportunity to cancel before the new price takes effect.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The Service, including all software, design, branding, and written content, is owned by FormReady and protected by Indian and international copyright, trademark, and other laws. We grant you a limited, revocable, non-exclusive, non-transferable licence to use the Service in accordance with these Terms.
      </p>
      <p>
        Files you upload remain entirely yours. We claim no ownership and no licence over your files. Because we don&apos;t see your files in the first place (they never reach our servers), this is structurally guaranteed.
      </p>
      <p>
        We make portions of the compression engine available as open-source code on GitHub. That code is governed by its own licence (MIT or similar), separately from these Terms.
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available&quot;, without warranty of any kind, express or implied. We don&apos;t warrant that the Service will be uninterrupted, error-free, or meet your specific requirements.
      </p>
      <p>
        Form-acceptance disclaimer: while we work to keep exam and visa specifications accurate (sourced from official notifications, re-verified quarterly), final acceptance of any photo, signature, or document by a form portal, exam body, embassy, or consulate rests entirely with that authority. We are not responsible for rejection of your submissions for non-technical reasons (lighting, expression, background quality, etc.) or for spec changes that occur between our last verification and your submission.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, FormReady, its officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service. Our total aggregate liability for any claim related to the Service shall not exceed the greater of (a) ₹1,000 or (b) the amount you have paid us in the 12 months preceding the claim.
      </p>
      <p>
        Some jurisdictions do not allow exclusion of certain warranties or limitation of liability; in such jurisdictions, our liability is limited to the maximum extent permitted by law.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold FormReady and its affiliates harmless from any claim arising out of your violation of these Terms, your use of the Service in violation of any law, or your infringement of any third party&apos;s rights.
      </p>

      <h2>12. Termination</h2>
      <p>
        You may stop using the Service or cancel your Pro subscription at any time. We may suspend or terminate your access for breach of these Terms, with notice where reasonable. Sections that should survive termination — payment obligations, intellectual property, disclaimers, limitation of liability, and dispute resolution — will continue to apply after termination.
      </p>

      <h2>13. Governing law and dispute resolution</h2>
      <p>
        These Terms are governed by the laws of India. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts at [JURISDICTION CITY — e.g., Mumbai], India. Before filing any formal claim, you agree to attempt good-faith resolution through email at{' '}
        <a href="mailto:legal@formready.in">legal@formready.in</a>.
      </p>

      <h2>14. Changes</h2>
      <p>
        We may update these Terms occasionally. Material changes (those that affect your rights or obligations) will be communicated to Pro users via email and via a banner on the site requiring re-acceptance.
      </p>

      <h2>15. Contact</h2>
      <p>
        For questions about these Terms: <a href="mailto:legal@formready.in">legal@formready.in</a>. For privacy questions, see our <Link href="/privacy">Privacy Policy</Link>. For all other queries: <a href="mailto:hello@formready.in">hello@formready.in</a>.
      </p>
    </LegalPageShell>
  )
}
