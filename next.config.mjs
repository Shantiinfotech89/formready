import createNextIntlPlugin from 'next-intl/plugin'
import withPWAInit from '@ducanh2912/next-pwa'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const withPWA = withPWAInit({
  dest: 'public',
  // Don't enable PWA in development — service workers cache too aggressively
  // for the dev workflow. Production-only.
  disable: process.env.NODE_ENV === 'development',
  // Register the SW automatically on first page load.
  register: true,
  // Cache the entry point so the homepage works offline after first visit.
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  // Reload the page if a new SW takes over (e.g. after deploy).
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    // Don't precache pdfjs worker — it's heavy and fetched on demand.
    exclude: [/pdf\.worker\.min\.mjs$/],
  },
})

/**
 * Production response-hardening headers.
 *
 * CSP notes — why each directive is the way it is:
 *
 * - `script-src 'unsafe-inline'`: Next.js App Router inlines hydration scripts
 *   and our 17 JSON-LD blocks render via `<script type="application/ld+json">`
 *   with `dangerouslySetInnerHTML`. Moving to nonce-based CSP requires a
 *   middleware that runs on every request — deferred to a future hardening
 *   pass. All inline-script entry points are static (JSON.stringify of static
 *   objects + Next.js's own hydration), so the practical XSS surface is nil.
 * - `'wasm-unsafe-eval'`: pdfjs and libheif-js compile WASM at runtime.
 * - `https://plausible.io`: optional analytics, loaded only when
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * - `style-src 'unsafe-inline'`: Tailwind's runtime utility classes + Next.js
 *   font CSS are inlined.
 * - `https://fonts.googleapis.com` / `https://fonts.gstatic.com`: next/font
 *   subsets Google Fonts at build time but the fallback path still hits them.
 * - `img-src data: blob:`: blob URLs from compression previews + data URIs
 *   from canvas readouts.
 * - `worker-src 'self' blob:`: pdfjs creates workers from `/pdf.worker.min.mjs`
 *   (self) and libheif spawns blob-URL workers internally.
 * - `frame-ancestors 'none'`: clickjacking protection — FormReady can never be
 *   framed by another origin.
 * - `upgrade-insecure-requests`: any leftover http:// URL becomes https://.
 */
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://plausible.io https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://plausible.io https://www.googletagmanager.com https://www.google-analytics.com",
  "frame-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  // Force HTTPS for 2 years on this domain + all subdomains. Start with this
  // value once the domain is stable; consider adding `; preload` and
  // submitting to https://hstspreload.org after ≥ 6 months of clean HTTPS.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  // Clickjacking — strict denial. CSP frame-ancestors below is the modern
  // version of this; we set both for legacy-browser coverage.
  { key: 'X-Frame-Options', value: 'DENY' },
  // No MIME sniffing — only honour the Content-Type we set.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Don't leak full Referer URLs (which may contain query params) to
  // cross-origin destinations like Plausible or Google Fonts.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Explicitly deny browser features we don't use. `interest-cohort=()` opts
  // out of FLoC/Topics.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy', value: cspDirectives },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // pdfjs-dist v5+ ships pure ESM with `import.meta` references that Next.js's
  // default SWC parser treats as CJS. Listing it here forces transpilation
  // through Next's ESM-aware pipeline so the production build succeeds.
  transpilePackages: ['pdfjs-dist'],
  async headers() {
    // Apply security headers in production only. In `next dev`, Webpack HMR
    // and React Refresh rely on `eval()` for module hot-replacement and
    // source-map injection — a strict CSP (without `'unsafe-eval'`) blocks
    // those scripts, leaving the page in an un-hydrated state where clicks
    // don't fire and the UI looks frozen. Production builds don't use eval
    // and run with full hardening.
    //
    // To validate headers locally before deploy, run `npm run build && npx
    // next start` and curl -I against any route.
    if (process.env.NODE_ENV !== 'production') return []
    return [
      {
        // Apply security headers to every route.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config) => {
    // libheif-js's internal bundle uses dynamic require() that webpack can't
    // statically analyse. The warning is harmless (the dynamic paths only run
    // in Node, never in browser), so silence it.
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      { module: /node_modules[\\/]libheif-js/ },
    ]
    return config
  },
}

export default withPWA(withNextIntl(nextConfig))
