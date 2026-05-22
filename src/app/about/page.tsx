import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CloudOff, FileText, Github, Heart, Lock, Shield, Sparkles, Zap } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About Compress4',
  description:
    'Why we built Compress4 — a privacy-first compression tool for Indian forms. The story, the principles, and the roadmap.',
  alternates: { canonical: '/about' },
}

const principles = [
  {
    icon: Lock,
    title: 'Your file never leaves your device',
    body: 'We don\'t process your file on a server. We don\'t store it. We don\'t even know what it is. The compression happens in your browser via WebAssembly, with the network tab as live proof.',
  },
  {
    icon: Zap,
    title: 'Hit the exact KB you need',
    body: 'Forms demand exact sizes ("photo must be 20–50 KB"). Generic tools give you "low / medium / high" sliders. We accept the number, run a binary search, deliver at or under it.',
  },
  {
    icon: Heart,
    title: 'Built for India, by people who fill these forms',
    body: 'Every preset comes from official notification PDFs. Every error message is written for someone applying at 2 AM the night before the deadline. Bilingual EN/HI from day one.',
  },
  {
    icon: Shield,
    title: 'Free is genuinely free',
    body: 'All single-file compression — PDF, image, photo, signature — is free for everyone, no signup, no card. We pay for it with ads. Pro is for people who genuinely need batch processing.',
  },
]

const milestones = [
  { date: 'Q2 2025', title: 'Idea', body: 'Friend\'s SSC application got rejected three times because his photo was 1 KB over. We built a quick prototype.' },
  { date: 'Q3 2025', title: 'First user testing', body: 'Soft-tested with 30 students preparing for IBPS. Discovered the "preserve text" / "preserve photo" mode distinction matters.' },
  { date: 'Q1 2026', title: 'Brand & design system', body: 'Locked the Razorpay-grade Indian fintech-modern direction. Built the design system, component library, brand guidelines.' },
  { date: 'Q2 2026', title: 'MVP launch', body: 'Public beta — 6 core tools, 3 conversion utilities, 10 SEO landing pages, blog & FAQ. Currently here.' },
  { date: 'Later', title: 'Power-user features', body: 'Once we know what users actually need, we\'ll add batch processing, API, and ad-free use as a paid tier. Until then, everything is free.' },
  { date: 'Q4 2026', title: 'API + scale', body: 'Public API for EdTech and document automation. Programmatic SEO scales to 140 pages.' },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="info" className="mb-4">
                <Sparkles className="h-3 w-3" /> About
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                The compression tool we wished{' '}
                <span className="text-primary">already existed</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Indian government forms demand exact KB sizes for photos and signatures. Existing tools force trial-and-error with sliders, and most upload your sensitive documents to a stranger&apos;s server. Compress4 fixes both.
              </p>
            </div>
          </div>
        </section>

        {/* The origin story */}
        <section className="bg-surface-page-warm">
          <div className="container-default py-16">
            <article className="article-prose mx-auto max-w-3xl">
              <h2>Why we built this</h2>
              <p>
                In April 2025, a close friend was applying for SSC CGL. His photo kept getting rejected — first because it was 70 KB (limit: 50 KB), then because it was 18 KB (minimum: 20 KB), then because the dimensions were 2 pixels off. He was using iLovePDF and SmallPDF, both of which give you a vague slider and no way to hit a specific number.
              </p>
              <p>
                He missed the original deadline. Got an extension by paying a late fee. Eventually applied with the same photo, manually trial-and-errored 14 times until it landed at exactly 32 KB.
              </p>
              <p>
                The technology to solve this is trivial: a binary search loop over compression quality, running entirely in the browser. We built a prototype in a weekend. It worked.
              </p>
              <p>
                What made us keep building was the second realisation: <strong>the existing tools were uploading sensitive documents — Aadhaar, PAN, signed contracts, visa photos — to cloud servers run by foreign companies</strong>. Convenient, sure. But every upload is a leak risk, and the privacy-cost was being borne by users who didn&apos;t know they were paying it.
              </p>
              <p>
                Compress4 is what we wanted to give him. Free single-file compression, exact KB targeting, zero upload, built for Indian forms. We open-source the compression engine on{' '}
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>{' '}
                so anyone can verify the privacy claim.
              </p>

              <h2>The product principles</h2>
            </article>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
              {principles.map((p) => (
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
        </section>

        {/* Roadmap */}
        <section className="container-default py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-display-sm font-bold tracking-tight">Where we are</h2>
            <p className="mb-8 text-muted-foreground">
              Compress4 is a small, deliberately-paced project. Here&apos;s the timeline so far and what&apos;s next.
            </p>
            <ol className="space-y-6 border-l-2 border-border pl-6">
              {milestones.map((m, i) => (
                <li key={m.date} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-border bg-card"
                  >
                    <span className={
                      i < 3
                        ? 'h-2 w-2 rounded-full bg-success'
                        : i === 3
                          ? 'h-2 w-2 rounded-full bg-primary animate-pulse'
                          : 'h-2 w-2 rounded-full bg-muted-foreground/40'
                    } />
                  </span>
                  <div>
                    <p className="num text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.date}</p>
                    <h3 className="mt-1 text-base font-semibold">{m.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Open source */}
        <section className="bg-surface-page-warm border-t border-border">
          <div className="container-default py-16">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8">
              <Github className="mb-3 h-6 w-6 text-foreground" />
              <h2 className="text-xl font-bold tracking-tight">Verifiably private — by code</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                We open-source the compression engine on GitHub so anyone can audit it. The privacy claim isn&apos;t something you have to take our word for — open the source, read the network calls (there are none for file content), and verify it matches what we say. If you find a security issue, please email{' '}
                <a href="mailto:security@formready.in" className="font-medium text-primary-press underline-offset-4 hover:underline">
                  security@formready.in
                </a>{' '}
                before public disclosure.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    View on GitHub
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/privacy/verify">
                    Run a live verification
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="container-default py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <h2 className="text-display-sm font-bold tracking-tight">Try it</h2>
            <p className="text-muted-foreground">No signup, no card, no upload.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button asChild variant="glow" size="lg">
                <Link href="/compress-pdf">
                  <FileText className="h-4 w-4" />
                  Compress a PDF
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
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
            '@type': 'AboutPage',
            url: 'https://formready.in/about',
            mainEntity: {
              '@type': 'Organization',
              name: 'FormReady',
              url: 'https://formready.in',
            },
          }),
        }}
      />
    </>
  )
}
