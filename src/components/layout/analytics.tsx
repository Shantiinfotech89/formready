/**
 * Plausible analytics — privacy-respecting page-view tracking.
 *
 * Gated behind `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: when the env var is unset
 * (e.g. local dev, preview branches without analytics), this component
 * renders nothing and no script is loaded. Set it to `compress4.com` (or
 * whatever the production domain is) on Vercel to enable.
 *
 * No cookies, no personal data — see `/privacy` and the cookie banner for
 * the user-facing wording on this.
 */

import Script from 'next/script'

export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  if (!domain) return null

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}
