import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CloudOff,
  Clock,
  Cog,
  FileStack,
  KeySquare,
  Lock,
  Shield,
  Sparkles,
  X,
} from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import { FaqSection } from '@/components/landing/faq-section'

export const metadata: Metadata = {
  title: 'Pricing — coming later',
  description:
    'Compress4 is free for everyone right now. Paid tiers will come later, after we know what users actually need.',
  alternates: { canonical: '/pricing' },
  // Hidden from nav + sitemap + search engines until we re-enable Pro tier.
  robots: { index: false, follow: false },
}

interface Plan {
  id: string
  name: string
  priceLabel: string
  priceSub?: string
  badge?: { label: string; variant: 'success' | 'info' | 'warning' | 'tactical' }
  description: string
  ctaLabel: string
  ctaHref: string
  ctaDisabled?: boolean
  ctaVariant: 'primary' | 'glow' | 'secondary' | 'ghost'
  features: { included: boolean; text: string; sub?: string }[]
  highlight?: boolean
  available: boolean
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    priceLabel: '₹0',
    priceSub: 'forever',
    description: 'Single-file compression for everyone. No signup, no card.',
    ctaLabel: 'Use it now',
    ctaHref: '/compress-pdf',
    ctaVariant: 'secondary',
    available: true,
    features: [
      { included: true, text: 'PDF, image, photo, signature compressors' },
      { included: true, text: 'Exact KB target', sub: 'no "low/medium/high" guessing' },
      { included: true, text: '100% browser-based', sub: 'no upload, ever' },
      { included: true, text: 'Exam & visa presets', sub: 'SSC, UPSC, NEET, US, UK, Schengen…' },
      { included: true, text: 'PWA — works offline after first visit' },
      { included: false, text: 'Batch processing (50–100 files)' },
      { included: false, text: 'API access' },
      { included: false, text: 'Ad-free experience' },
      { included: false, text: 'Saved presets & history' },
    ],
  },
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    priceLabel: '₹49',
    priceSub: 'per month + GST',
    badge: { label: 'Coming soon', variant: 'warning' },
    description: 'Everything in Free, plus the power-user stack.',
    ctaLabel: 'Notify me at launch',
    ctaHref: 'mailto:hello@formready.in?subject=Notify%20me%20when%20FormReady%20Pro%20launches',
    ctaVariant: 'primary',
    available: false,
    features: [
      { included: true, text: 'Everything in Free' },
      { included: true, text: 'Batch processing', sub: 'up to 100 files at once' },
      { included: true, text: 'Saved presets', sub: 'up to 50 named configs' },
      { included: true, text: 'Compression history', sub: 'counters only — no file content' },
      { included: true, text: 'Ad-free experience' },
      { included: true, text: 'Priority email support' },
      { included: true, text: '7-day free trial', sub: 'no card required' },
      { included: false, text: 'API access', sub: 'see API Starter' },
    ],
  },
  {
    id: 'pro-annual',
    name: 'Pro Annual',
    priceLabel: '₹399',
    priceSub: 'per year + GST',
    badge: { label: 'Coming soon · Save 32%', variant: 'success' },
    description: 'Same as Pro Monthly, billed once a year.',
    ctaLabel: 'Notify me at launch',
    ctaHref: 'mailto:hello@formready.in?subject=Notify%20me%20when%20FormReady%20Pro%20Annual%20launches',
    ctaVariant: 'glow',
    highlight: true,
    available: false,
    features: [
      { included: true, text: 'Everything in Pro Monthly' },
      { included: true, text: 'Save 32% vs monthly billing' },
      { included: true, text: '7-day free trial', sub: 'no card required' },
      { included: true, text: '7-day money-back guarantee' },
      { included: true, text: 'Lock the price for 12 months' },
      { included: false, text: 'API access', sub: 'see API Starter' },
    ],
  },
  {
    id: 'api-starter',
    name: 'API Starter',
    priceLabel: '₹299',
    priceSub: 'per month + GST',
    badge: { label: 'Coming soon', variant: 'info' },
    description: 'For developers integrating compression into their own apps.',
    ctaLabel: 'Notify me at launch',
    ctaHref: 'mailto:hello@formready.in?subject=Notify%20me%20when%20the%20FormReady%20API%20launches',
    ctaVariant: 'secondary',
    available: false,
    features: [
      { included: true, text: '5,000 API calls / month included' },
      { included: true, text: '₹0.50 per call after that' },
      { included: true, text: 'REST endpoints for PDF, image, photo' },
      { included: true, text: 'Per-key scopes & revocation' },
      { included: true, text: 'Real-time usage dashboard' },
      { included: true, text: 'OpenAPI 3.0 docs', sub: 'curl, JS, Python examples' },
    ],
  },
]

const featurePillars = [
  {
    icon: CloudOff,
    title: 'Free is genuinely free',
    body: 'All single-file compression — PDF, image, photo, signature — is free for everyone, no signup, with ads on the page. You can use the tools forever without paying anything.',
  },
  {
    icon: FileStack,
    title: 'Pro is for power users',
    body: 'Batch processing (up to 100 files), saved presets, compression history, ad-free. Built for coaching centres, small offices, freelancers processing many documents.',
  },
  {
    icon: KeySquare,
    title: 'API is for developers',
    body: 'When you want to compress files inside your own product. EdTech platforms, document automation tools, government workflows — use our API instead of building compression yourself.',
  },
]

const faqs = [
  {
    q: 'When will Pro launch?',
    a: 'We\'re currently in build phase — Pro auth, billing (Razorpay), and the dashboard are scheduled for the next major milestone. Drop your email at hello@formready.in and we\'ll write to you the day it goes live (no marketing list, just one launch email).',
  },
  {
    q: 'Is there really no signup needed for the free tier?',
    a: 'Correct. The free tier requires no email, no account, no anything. Open a tool, drop a file, get the output. We have no signup form for free users at all — what you\'d see today on /compress-pdf, /compress-image, etc., is the entire free experience.',
  },
  {
    q: 'How does the rate limit work?',
    a: 'Free guests can run up to 30 compression operations per hour per IP. This is to prevent abuse — legitimate users almost never hit it (most people compress 5–10 files in one sitting and never come back the same hour). Pro users get 500 ops/hour per account.',
  },
  {
    q: 'Will my Pro subscription auto-renew?',
    a: 'Yes — both monthly and annual subscriptions auto-renew at the end of the period. You can cancel anytime in two clicks at /account/billing. Cancellation takes effect at the end of the current period; you keep access until then.',
  },
  {
    q: 'Is Pro available in INR with UPI?',
    a: 'Yes. We use Razorpay for payments — UPI, debit/credit cards, netbanking, and major Indian wallets. Indian GST (18%) is added automatically. Indian-billed invoices include CGST/SGST or IGST split per state.',
  },
  {
    q: 'What about students and educational institutions?',
    a: 'We\'re building education pricing for verified institutions (currently early access for established coaching centres). Email hello@formready.in with .edu / institutional credentials.',
  },
  {
    q: 'Will the price change?',
    a: 'Annual subscribers lock the price for 12 months regardless of future changes. We don\'t plan to increase prices in the first year. If we ever do, existing subscribers grandfathered for at least 6 months\' notice.',
  },
]

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="info" className="mb-4">
                <Sparkles className="h-3 w-3" /> Pricing
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Free forever, <span className="text-primary">Pro from ₹49</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                All single-file compression is free, no signup. Pro adds batch processing, API access, and the ad-free experience — coming soon.
              </p>
              <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <span className="num inline-flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-success" />
                  Every plan: no upload, no file ever leaves your device
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PLANS GRID */}
        <section className="container-wide py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <Card
                key={p.id}
                variant="default"
                className={
                  p.highlight
                    ? 'relative border-2 border-primary shadow-xl'
                    : 'relative border border-border'
                }
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="info" className="num">
                      <BadgeCheck className="h-3 w-3" />
                      Best value
                    </Badge>
                  </div>
                )}
                <CardContent className="space-y-5 p-6">
                  <div>
                    {p.badge && (
                      <Badge variant={p.badge.variant} className="mb-2 text-[10px]">
                        {p.badge.label}
                      </Badge>
                    )}
                    <h3 className="text-xl font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="num text-4xl font-bold tracking-tight">{p.priceLabel}</span>
                    {p.priceSub && (
                      <span className="num text-sm text-muted-foreground">/{p.priceSub.replace(/^per\s+/, '')}</span>
                    )}
                  </div>

                  <Button
                    asChild={!p.ctaDisabled}
                    variant={p.ctaVariant}
                    size="md"
                    className="w-full"
                    disabled={p.ctaDisabled}
                  >
                    {p.ctaDisabled ? (
                      <span>{p.ctaLabel}</span>
                    ) : p.ctaHref.startsWith('mailto:') ? (
                      <a href={p.ctaHref}>
                        {p.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link href={p.ctaHref}>
                        {p.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </Button>

                  <Separator />

                  <ul className="space-y-2.5 text-sm">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        {f.included ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />
                        ) : (
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p
                            className={f.included ? 'text-foreground' : 'text-muted-foreground line-through decoration-muted-foreground/40'}
                          >
                            {f.text}
                          </p>
                          {f.sub && (
                            <p className="num mt-0.5 text-[11px] text-muted-foreground">
                              {f.sub}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="num mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            All Indian Pro prices add 18% GST. Razorpay handles payments — UPI · cards · netbanking · wallets. Cancel anytime, no questions.
          </p>
        </section>

        {/* WHY THE TIERS */}
        <section className="bg-surface-page-warm border-y border-border">
          <div className="container-default py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-display-sm font-bold tracking-tight">How the tiers split</h2>
              <p className="mt-2 text-muted-foreground">
                We deliberately keep Free fully usable — most people will never need Pro. Pro is for the small group with real volume.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {featurePillars.map((p) => (
                  <Card key={p.title}>
                    <CardContent className="p-6">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success-strong">
                        <p.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <h3 className="text-base font-semibold">{p.title}</h3>
                      <p className="mt-1 text-sm leading-snug text-muted-foreground">
                        {p.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRIVACY GUARANTEE */}
        <section className="container-default py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-success-soft bg-success-soft/30 p-8 text-center">
            <Shield className="mx-auto mb-3 h-8 w-8 text-success-strong" strokeWidth={2} />
            <h3 className="text-xl font-semibold">Privacy is the same on every tier</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Single-file compression — Free or Pro — runs entirely in your browser. The Pro upgrade does not change this. Even API consumers get an explicit notice that server-mode compression briefly transits files (deleted within 60 seconds, no logging).
            </p>
            <div className="mt-4 flex justify-center">
              <PrivacyLockup variant="compact" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface-page-warm border-t border-border">
          <div className="container-default py-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-display-sm font-bold tracking-tight">FAQ</h2>
              <p className="mt-2 text-muted-foreground">Pricing-specific questions. For broader topics see the <Link href="/faq" className="font-medium text-primary-press underline-offset-4 hover:underline">main FAQ</Link>.</p>
              <div className="mt-8">
                <FaqSection faqs={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* LAUNCH STATUS */}
        <section className="container-default py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center">
            <Clock className="h-6 w-6 text-primary" />
            <Badge variant="warning" className="num">Pro launching: Q2 2026</Badge>
            <h3 className="text-xl font-semibold">Want to know the moment Pro launches?</h3>
            <p className="text-sm text-muted-foreground">
              Drop us an email at{' '}
              <a className="font-medium text-primary-press underline-offset-4 hover:underline" href="mailto:hello@formready.in?subject=Notify%20me%20when%20Pro%20launches">
                hello@formready.in
              </a>{' '}
              and we&apos;ll write back exactly once — the day it&apos;s live.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <Button asChild variant="primary">
                <Link href="/compress-pdf">
                  Try the free tools now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/blog/why-your-form-rejected-your-photo">Read the blog</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  )
}
