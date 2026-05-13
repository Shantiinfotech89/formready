import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileSignature, Lock, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { CompressImageTool } from '@/components/tools/compress-image-tool'
import { ArchitecturalCommitments } from '@/components/landing/architectural-commitments'
import { MiniTrustComparison } from '@/components/landing/mini-trust-comparison'
import { UseCasesStrip, type UseCase } from '@/components/landing/use-cases-strip'
import { WhatHappensToYourFile } from '@/components/landing/what-happens-to-your-file'
import { RevealOnScroll } from '@/components/landing/reveal-on-scroll'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const useCases: UseCase[] = [
  {
    scenario: 'SSC CGL signature',
    detail: 'SSC + IBPS share this spec',
    spec: '140×60 px · 10–20 KB',
    href: '/ssc-cgl-photo-size',
  },
  {
    scenario: 'NEET / JEE signature',
    detail: 'NTA portal · medical / engineering',
    spec: '140×60 px · 4–30 KB',
    href: '/neet-ug-photo-size',
  },
  {
    scenario: 'IBPS PO signature',
    detail: 'Banking entrance exams',
    spec: '140×60 px · 10–20 KB',
    href: '/ibps-po-photo-size',
  },
  {
    scenario: 'GATE signature',
    detail: 'Engineering postgraduate entrance',
    spec: '250×80 px · 5–150 KB',
  },
  {
    scenario: 'UPSC signature',
    detail: 'Civil Services Examination',
    spec: '350×350 px · max 300 KB',
    href: '/upsc-cse-photo-size',
  },
  {
    scenario: 'CTET signature',
    detail: 'Teacher eligibility test',
    spec: '140×60 px · 4–30 KB',
  },
]

export const metadata: Metadata = {
  title: 'Signature compressor — never uploaded',
  description:
    'Compress your signature to 5–20 KB while keeping it legible. Auto grayscale, paper-noise cleanup, white background out. Your signature image is processed entirely in your browser.',
  alternates: { canonical: '/signature' },
}

const faqs = [
  {
    q: 'Why a separate signature tool?',
    a: 'Generic image compressors fail at the 5–20 KB range government forms demand because they treat signatures as photos. We treat signatures as line art: aggressive JPEG compression, grayscale, threshold cleanup of paper noise, white background. The result hits 10 KB while staying perfectly legible.',
  },
  {
    q: 'A signature is a legal artifact. Is it really safe to compress here?',
    a: 'Yes — safer than anywhere else online, in fact. Your signature image never leaves your browser. There is no server endpoint that receives it. Compressing your signature on a stranger\'s server (the way most online tools work) is a real liability — ours doesn\'t. Verify zero-upload yourself at /privacy/verify.',
  },
  {
    q: 'What does the cleanup step actually do?',
    a: 'Two passes: (1) grayscale conversion — replaces RGB with luminance; (2) binary threshold — pixels brighter than ~78% of white become pure white, darker pixels stay dark. This removes paper noise (yellowed paper, faint lines, shadows) while preserving your ink stroke. The actual ink path is not modified.',
  },
  {
    q: 'My signature was photographed against newspaper / lined paper. Will cleanup work?',
    a: 'Threshold cleanup whitens any pixel above ~78% brightness — it handles standard white paper, lightly-yellowed paper, and most printed lines well. Heavily-printed backgrounds (newspapers, grid paper) may need manual cropping first; some imperfection in the background may remain.',
  },
  {
    q: 'My signature is light / pencil. Will it survive?',
    a: 'Light pencil signatures may get partially erased by threshold cleanup. If so, scan or photograph again with a black ink pen and retry. We don\'t support contrast-boosting in v1.',
  },
  {
    q: 'Can I keep transparent background?',
    a: 'Not in v1. Most form portals reject transparent PNGs and want a white background JPG. PNG-with-transparency support is on the roadmap.',
  },
]

export default function SignaturePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-success/[0.03] to-background">
          <div className="container-default py-10 sm:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="success" className="mb-3">
                <FileSignature className="h-3 w-3" /> Signature · Privacy-first
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Your signature is a legal artifact.{' '}
                <span className="text-primary">We never see it.</span>
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Compressed locally to 5–20 KB. Auto grayscale, paper-noise cleanup, white background out. Processed entirely in your browser.
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/privacy/verify">
                    <ShieldCheck className="h-3 w-3" />
                    Verify it yourself
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container-default py-10">
          <div className="mx-auto max-w-2xl space-y-5">
            <CompressImageTool
              initialTargetKb={10}
              presets={[5, 10, 20, 50]}
              defaultFormat="jpg"
              signatureMode
            />
            <WhatHappensToYourFile />
          </div>
        </section>

        <section className="container-default border-t border-border pt-16 pb-12">
          <RevealOnScroll>
            <MiniTrustComparison
              themLabel="Online signature compressors uploaded your signature"
              themDescription="A signature is a legal artifact — and most online tools route it through their server before compressing. Even with claimed deletion windows, your signature briefly sits on infrastructure you don't control."
              usLabel="FormReady processed your signature locally"
              usDescription="Grayscale conversion, threshold cleanup, and JPEG encoding all ran in your browser. The signature image never touched our servers — and the actual ink stroke is unchanged, only background noise was cleaned."
            />
          </RevealOnScroll>
        </section>

        <section className="container-default pb-12">
          <RevealOnScroll>
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  Our promise — verifiable
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Four architectural commitments. Every one provable.
                </h2>
              </div>
              <ArchitecturalCommitments />
            </div>
          </RevealOnScroll>
        </section>

        <section className="container-default border-t border-border py-16">
          <RevealOnScroll>
            <UseCasesStrip
              headline="Common signature specs"
              subhead="Indian government exams use one of a few standard sizes. Match yours and use the suggested KB."
              cases={useCases}
            />
          </RevealOnScroll>
        </section>

        <section className="bg-surface-page-warm">
          <div className="container-default py-16">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-display-sm font-bold tracking-tight">FAQ</h2>
              <div className="mt-8 space-y-6">
                {faqs.map((f) => (
                  <div key={f.q} className="border-b border-border pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold">{f.q}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                ))}
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
