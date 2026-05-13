import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  FileSignature,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Lock,
  ShieldCheck,
  UserSquare2,
} from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import { BlogCard } from '@/components/blog/blog-card'
import { ArchitectureFlow } from '@/components/landing/architecture-flow'
import { HowItWorks } from '@/components/landing/how-it-works'
import { TrustComparison } from '@/components/landing/trust-comparison'
import { LiveVerifyEmbed } from '@/components/landing/live-verify-embed'
import { ExactKbDemo } from '@/components/landing/exact-kb-demo'
import { ArchitecturalCommitments } from '@/components/landing/architectural-commitments'
import { OpenSourceCard } from '@/components/landing/open-source-card'
import { getAllPosts } from '@/lib/blog'

const tools = [
  {
    href: '/compress-pdf' as const,
    title: 'PDF Compression',
    body: 'Hit any KB target. Up to 50 MB input.',
    sample: '100 KB',
    Icon: FileText,
    gradient: 'from-primary to-secondary',
  },
  {
    href: '/compress-image' as const,
    title: 'Image Compression',
    body: 'JPG · PNG · HEIC · WebP. Quality + dimension.',
    sample: '50 KB',
    Icon: ImageIcon,
    gradient: 'from-secondary to-success',
  },
  {
    href: '/photo-signature' as const,
    title: 'Exam & Visa Photo',
    body: 'Pre-set for SSC, UPSC, NEET, US, UK, Schengen.',
    sample: '20 KB',
    Icon: UserSquare2,
    gradient: 'from-primary to-primary-press',
  },
  {
    href: '/signature' as const,
    title: 'Signature Resize',
    body: 'Down to 5 KB. Background cleanup included.',
    sample: '10 KB',
    Icon: FileSignature,
    gradient: 'from-success to-success-strong',
  },
]

const examShortcuts = [
  { slug: 'ssc-cgl-photo-size', label: 'SSC CGL' },
  { slug: 'upsc-cse-photo-size', label: 'UPSC CSE' },
  { slug: 'neet-ug-photo-size', label: 'NEET UG' },
  { slug: 'jee-main-photo-size', label: 'JEE Main' },
  { slug: 'ibps-po-photo-size', label: 'IBPS PO' },
]

const visaShortcuts = [
  { slug: 'us-visa-photo-size', label: 'US Visa' },
  { slug: 'uk-visa-photo-size', label: 'UK Visa' },
  { slug: 'schengen-visa-photo-size', label: 'Schengen' },
]

const sizeShortcuts = [
  { slug: 'compress-pdf-under-100kb', label: 'PDF < 100KB' },
  { slug: 'compress-image-under-50kb', label: 'Image < 50KB' },
]

const homepageFaqs = [
  {
    q: 'You really can\'t see my file?',
    a: 'Correct — by architecture, not by promise. Compression runs entirely in your browser via WebAssembly. There is no server endpoint in our codebase that receives file content. You can verify this in 30 seconds: open DevTools → Network tab and watch a compression run. Zero new requests appear. We have a live demo on this page (Section above) that does exactly this.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes — every tool on the site is free to use, no signup required. We may add paid features later for power users who need batch processing or an API, but the core compressors stay free for everyone.',
  },
  {
    q: 'What about old browsers?',
    a: 'WebAssembly works in every browser released since 2017. For HEIC photos on older Brave/Firefox/Chrome on Android, we lazy-load a JavaScript fallback decoder. If your browser is genuinely too old, we show a banner letting you know — better to upgrade than try.',
  },
  {
    q: 'How is this different from iLovePDF or SmallPDF?',
    a: 'Three things. (1) Privacy — they upload your file to their servers; we never receive it. (2) Exact KB targets — they give you "low / medium / high" sliders; we hit the number you type. (3) Indian-form-aware — we have presets for SSC/UPSC/NEET/IBPS/visa with the exact pixel + KB specs from official notifications.',
  },
  {
    q: 'Will my form portal accept the output?',
    a: 'For exam/visa-specific tools, our presets come from the official notification PDFs and we re-verify quarterly. We hit the technical spec (pixels + KB + format). Final acceptance also depends on photo quality (lighting, expression, plain background) — that\'s on the photographer, not the compressor.',
  },
  {
    q: 'Why an Indian-made tool when global ones exist?',
    a: 'The global tools were not built for SSC photo specs, IBPS signature limits, or visa applicants under deadline pressure. We were. Every preset, every error message, every Hindi translation is written for someone applying to an Indian government form at 2am the night before the deadline.',
  },
]

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 3)

  return (
    <>
      <SiteHeader />
      <main>
        {/* ───── Section 1 — HERO (trust-first) ──────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(61,90,254,0.08)_0%,_transparent_60%)]"
          />
          <div className="container-default relative py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="info" className="mb-6">
                <Lock className="h-3 w-3" /> Privacy-first compression
              </Badge>
              <h1 className="text-display-lg font-bold tracking-tight sm:text-display-xl">
                Your documents{' '}
                <span className="text-primary">never leave</span> your device.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Compress PDFs and images to the exact KB your form demands —
                entirely in your browser. <strong className="text-foreground">No uploads. No accounts. No exceptions.</strong>
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="glow" size="lg">
                  <Link href="/compress-pdf">
                    Compress a PDF
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a href="#live-verify">
                    See it yourself ↓
                  </a>
                </Button>
              </div>
              <div className="mt-10 flex flex-col items-center gap-5">
                <ArchitectureFlow />
                <PrivacyLockup variant="compact" />
              </div>
            </div>
          </div>
        </section>

        {/* ───── Section 2 — HOW IT WORKS ────────────────────────────────── */}
        <section className="bg-surface-page-warm border-b border-border">
          <div className="container-default py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                How it works
              </p>
              <h2 className="mt-3 text-display-sm font-bold tracking-tight sm:text-display-md">
                Three steps. Zero servers. Zero risk.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                What you drop, you keep. The middle of the diagram is where every other tool puts a server. We don&apos;t.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-5xl">
              <HowItWorks />
            </div>
          </div>
        </section>

        {/* ───── Section 3 — TRUST COMPARISON ────────────────────────────── */}
        <section className="border-b border-border">
          <div className="container-default py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                Why we&apos;re different
              </p>
              <h2 className="mt-3 text-display-sm font-bold tracking-tight sm:text-display-md">
                Most compression tools upload your file. We don&apos;t.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Compare the data path of the popular tools to ours.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-5xl">
              <TrustComparison />
            </div>
          </div>
        </section>

        {/* ───── Section 4 — LIVE VERIFY EMBED ───────────────────────────── */}
        <section
          id="live-verify"
          className="scroll-mt-20 border-b border-border bg-surface-page-warm"
        >
          <div className="container-default py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="success" className="mb-3">
                <ShieldCheck className="h-3 w-3" /> Live proof
              </Badge>
              <h2 className="text-display-sm font-bold tracking-tight sm:text-display-md">
                See it with your own eyes.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Click the button below. Watch the network panel show <span className="num font-semibold text-foreground">0 new requests</span> during compression. The browser itself is the proof.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-3xl">
              <LiveVerifyEmbed />
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Want the full step-by-step walkthrough?{' '}
              <Link
                href="/privacy/verify"
                className="font-medium text-primary-press underline-offset-4 hover:underline"
              >
                Open the dedicated verify page →
              </Link>
            </p>
          </div>
        </section>

        {/* ───── Section 5 — TOOL SUITE ──────────────────────────────────── */}
        <section className="border-b border-border">
          <div className="container-default py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  The tool suite
                </p>
                <h2 className="mt-3 text-display-sm font-bold tracking-tight sm:text-display-md">
                  Pick a tool — start in seconds.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Each one runs locally. Each one accepts an exact KB target.
                </p>
              </div>
              <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {tools.map((t) => (
                  <Card
                    key={t.href}
                    variant="marketing"
                    className="cursor-pointer"
                  >
                    <Link
                      href={t.href}
                      className="block focus-visible:outline-none focus-visible:rounded-2xl focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} text-white shadow-md`}
                        >
                          <t.Icon className="h-6 w-6" strokeWidth={1.75} />
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-lg font-semibold">{t.title}</h3>
                          <Badge variant="success" className="text-[10px]">
                            Live
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm leading-snug text-muted-foreground">
                          {t.body}
                        </p>
                        <p className="num mt-3 text-[11px] font-medium text-primary-press">
                          e.g. {t.sample}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── Section 6 — EXACT KB DEMO ───────────────────────────────── */}
        <section className="border-b border-border bg-surface-page-warm">
          <div className="container-default py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                What competitors won&apos;t do
              </p>
              <h2 className="mt-3 text-display-sm font-bold tracking-tight sm:text-display-md">
                Type the number. We hit it.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Most tools give you &quot;low / medium / high&quot; sliders that force trial-and-error. We accept the exact KB your form requires and binary-search compression strategies until we land at or under it. No retry. No re-upload. No second-guessing.
              </p>
            </div>
            <div className="mt-10">
              <ExactKbDemo />
            </div>
          </div>
        </section>

        {/* ───── Section 7 — BUILT FOR INDIAN FORMS ──────────────────────── */}
        <section className="border-b border-border">
          <div className="container-default py-20">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  Made for India
                </p>
                <h2 className="mt-3 text-display-sm font-bold tracking-tight sm:text-display-md">
                  Pre-set for every major Indian form.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Specs sourced from official notification PDFs and re-verified
                  quarterly. We cite our sources on every preset page.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-tactical">
                    Indian exams
                  </h3>
                  <ul className="space-y-1.5">
                    {examShortcuts.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${s.slug}` as never}
                          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-foreground transition-colors duration-fast hover:text-primary-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Visa photos
                  </h3>
                  <ul className="space-y-1.5">
                    {visaShortcuts.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${s.slug}` as never}
                          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-foreground transition-colors duration-fast hover:text-primary-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Common sizes
                  </h3>
                  <ul className="space-y-1.5">
                    {sizeShortcuts.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${s.slug}` as never}
                          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-foreground transition-colors duration-fast hover:text-primary-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Section 8 — ARCHITECTURAL COMMITMENTS ───────────────────── */}
        <section className="border-b border-border bg-surface-page-warm">
          <div className="container-default py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  Our promise — verifiable
                </p>
                <h2 className="mt-3 text-display-sm font-bold tracking-tight sm:text-display-md">
                  Four architectural commitments. Every one provable.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  These aren&apos;t marketing claims. They&apos;re structural facts about how our codebase is built — and you can audit each one.
                </p>
              </div>
              <ArchitecturalCommitments />
            </div>
          </div>
        </section>

        {/* ───── Section 9 — OPEN SOURCE ─────────────────────────────────── */}
        <section className="border-b border-border">
          <div className="container-default py-20">
            <div className="mx-auto max-w-4xl">
              <OpenSourceCard />
            </div>
          </div>
        </section>

        {/* ───── Section 10 — FROM THE BLOG ──────────────────────────────── */}
        {latestPosts.length > 0 && (
          <section className="border-b border-border bg-surface-page-warm">
            <div className="container-default py-20">
              <div className="mx-auto max-w-5xl">
                <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <Badge variant="info" className="mb-3">
                      <BookOpen className="h-3 w-3" />
                      From the blog
                    </Badge>
                    <h2 className="text-display-sm font-bold tracking-tight">
                      Practical guides &amp; how-tos
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Plain-language explainers for the most common form-portal headaches.
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/blog">
                      All articles
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {latestPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ───── Section 11 — FAQ ────────────────────────────────────────── */}
        <section className="border-b border-border">
          <div className="container-default py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-display-sm font-bold tracking-tight">FAQ</h2>
              <p className="mt-2 text-muted-foreground">Real questions, no fluff.</p>
              <div className="mt-8 space-y-6">
                {homepageFaqs.map((f) => (
                  <div key={f.q} className="border-b border-border pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold">{f.q}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>

              <Card variant="warm" className="mt-12">
                <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">More questions?</h3>
                      <p className="text-sm text-muted-foreground">
                        14 questions across Privacy, How-To, Exam Specs, and Visa Specs.
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="primary" size="sm">
                    <Link href="/faq">
                      Open the full FAQ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ───── Section 12 — FINAL CTA ──────────────────────────────────── */}
        <section className="bg-gradient-to-b from-card to-primary/[0.04]">
          <div className="container-default py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-display-md font-bold tracking-tight sm:text-display-lg">
                Compress your document — privately.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Free. No signup. No upload. Verifiable in your own browser.
              </p>
              <div className="mt-8">
                <Button asChild variant="glow" size="lg">
                  <Link href="/compress-pdf">
                    Start with a PDF
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex justify-center">
                <PrivacyLockup variant="compact" />
              </div>
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
            '@type': 'WebSite',
            name: 'FormReady',
            url: 'https://formready.in',
            description:
              'Privacy-first PDF and image compression to exact KB. Files never leave your device.',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: homepageFaqs.map((f) => ({
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
