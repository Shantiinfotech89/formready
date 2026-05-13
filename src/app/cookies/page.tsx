import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/legal-page-shell'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Which cookies FormReady uses, why, and how to control them. We use very few — and none for behavioural advertising on our own site.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      lastUpdated="2026-04-01"
      lede="A short, complete inventory of every cookie FormReady sets, why it's set, and how to disable it."
    >
      <p className="text-sm italic text-muted-foreground">
        ⚠ This is a v0 draft. Final version pending review before public launch.
      </p>

      <h2>1. What is a cookie?</h2>
      <p>
        A cookie is a small text file that a website stores in your browser to remember information between visits. Cookies can be &quot;first-party&quot; (set by the site you&apos;re visiting) or &quot;third-party&quot; (set by external services embedded in the page). They can be &quot;session&quot; (deleted when you close the browser) or &quot;persistent&quot; (kept for a set time).
      </p>

      <h2>2. The complete list of cookies FormReady sets</h2>
      <p>We use as few cookies as possible. Here is the entire inventory:</p>

      <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="border-b-2 border-border p-3 font-semibold">Cookie</th>
              <th className="border-b-2 border-border p-3 font-semibold">Purpose</th>
              <th className="border-b-2 border-border p-3 font-semibold">Type</th>
              <th className="border-b-2 border-border p-3 font-semibold">Lifetime</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            <tr>
              <td className="border-b border-border p-3 align-top"><code>NEXT_LOCALE</code></td>
              <td className="border-b border-border p-3 align-top">Remembers your language preference (English / Hindi).</td>
              <td className="border-b border-border p-3 align-top">First-party · Strictly necessary</td>
              <td className="border-b border-border p-3 align-top">365 days</td>
            </tr>
            <tr>
              <td className="border-b border-border p-3 align-top"><code>session</code> (Pro)</td>
              <td className="border-b border-border p-3 align-top">Authentication for Pro users (HttpOnly · Secure · SameSite=Lax).</td>
              <td className="border-b border-border p-3 align-top">First-party · Strictly necessary</td>
              <td className="border-b border-border p-3 align-top">30 days</td>
            </tr>
            <tr>
              <td className="border-b border-border p-3 align-top"><code>cookie-consent</code></td>
              <td className="border-b border-border p-3 align-top">Remembers that you&apos;ve seen the cookie banner.</td>
              <td className="border-b border-border p-3 align-top">First-party · Strictly necessary</td>
              <td className="border-b border-border p-3 align-top">365 days</td>
            </tr>
            <tr>
              <td className="p-3 align-top">(Plausible)</td>
              <td className="p-3 align-top">Cookieless analytics — Plausible uses no cookies.</td>
              <td className="p-3 align-top">N/A</td>
              <td className="p-3 align-top">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Third-party cookies (when applicable)</h2>
      <p>The following cookies are set by third-party services, and only when their respective features are active:</p>
      <ul>
        <li><strong>Google AdSense</strong> — sets cookies on tool and content pages where ads are shown. AdSense uses cookies for fraud prevention, frequency capping, and (with consent) personalised advertising. Manage your AdSense settings at <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">adssettings.google.com</a>.</li>
        <li><strong>Razorpay</strong> — sets cookies during the checkout flow for fraud prevention and to remember saved payment methods. These cookies are scoped to the Razorpay checkout iframe and never available to FormReady scripts.</li>
        <li><strong>Cloudflare Turnstile</strong> — invisible captcha; <em>does not</em> set cookies under default configuration. Uses ephemeral browser-fingerprinting signals only.</li>
      </ul>

      <h2>4. What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t use behavioural advertising trackers other than AdSense (and only on pages where ads are displayed).</li>
        <li>We don&apos;t use Google Analytics on our own site (we use cookieless Plausible instead).</li>
        <li>We don&apos;t use Facebook pixel, LinkedIn pixel, X (Twitter) pixel, or any other social-network tracking.</li>
        <li>We don&apos;t sell, rent, or share cookie data with any third party other than as listed above.</li>
      </ul>

      <h2>5. Your control over cookies</h2>
      <p>You can control cookies in several ways:</p>
      <ol>
        <li><strong>Strictly necessary cookies</strong> (the table in §2) cannot be disabled because they are required for the site to function (language preference, authentication). Disabling them in your browser will mean the site can&apos;t work properly.</li>
        <li><strong>AdSense personalised advertising</strong> can be disabled at <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">adssettings.google.com</a>. Ads will still appear (we need them to fund the free tier) but won&apos;t be personalised based on your interests.</li>
        <li><strong>Browser-level controls</strong>: every modern browser allows you to block all cookies, block third-party cookies only, or clear cookies on exit. Settings vary by browser:
          <ul>
            <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
            <li>Firefox: Settings → Privacy &amp; Security → Enhanced Tracking Protection</li>
            <li>Safari: Settings → Privacy → Block all cookies</li>
            <li>Edge: Settings → Cookies and site permissions</li>
          </ul>
        </li>
      </ol>

      <h2>6. Do Not Track</h2>
      <p>
        We honour the browser-level &quot;Do Not Track&quot; (DNT) signal where implemented. When DNT is set, we do not send analytics events even to cookieless analytics, and AdSense&apos;s personalisation is disabled.
      </p>

      <h2>7. Updates to this policy</h2>
      <p>
        We&apos;ll update this policy whenever a cookie is added, removed, or changes purpose. The &quot;Last updated&quot; date at the top reflects the most recent change.
      </p>

      <h2>8. Questions</h2>
      <p>
        For questions about cookies, email <a href="mailto:privacy@formready.in">privacy@formready.in</a>. See also our broader <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPageShell>
  )
}
