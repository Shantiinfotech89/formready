import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { PhotoPresetPicker } from '@/components/tools/photo-preset-picker'
import { ArchitecturalCommitments } from '@/components/landing/architectural-commitments'
import { MiniTrustComparison } from '@/components/landing/mini-trust-comparison'
import { UseCasesStrip, type UseCase } from '@/components/landing/use-cases-strip'
import { WhatHappensToYourFile } from '@/components/landing/what-happens-to-your-file'
import { RevealOnScroll } from '@/components/landing/reveal-on-scroll'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const useCases: UseCase[] = [
  {
    scenario: 'SSC CGL',
    detail: 'Photo + signature combined',
    spec: '200×230 px · 20–50 KB',
    href: '/ssc-cgl-photo-size',
  },
  {
    scenario: 'UPSC Civil Services',
    detail: 'Photo + signature, both square',
    spec: '350×350 px · max 300 KB',
    href: '/upsc-cse-photo-size',
  },
  {
    scenario: 'NEET UG',
    detail: 'Photo + signature, NTA portal',
    spec: '200×230 px · 10–200 KB',
    href: '/neet-ug-photo-size',
  },
  {
    scenario: 'IBPS PO',
    detail: 'Banking exam, photo + signature',
    spec: '200×230 px · 20–50 KB',
    href: '/ibps-po-photo-size',
  },
  {
    scenario: 'JEE Main',
    detail: 'Engineering entrance, NTA portal',
    spec: '200×230 px · 10–200 KB',
    href: '/jee-main-photo-size',
  },
  {
    scenario: 'US Visa',
    detail: 'B1/B2, F1, H1B — biometric photo',
    spec: '600×600 px · max 240 KB',
    href: '/us-visa-photo-size',
  },
]

export const metadata: Metadata = {
  title: 'Exam & Visa Photo — never uploaded',
  description:
    'Form-ready photo and signature in one shot — pre-configured for SSC, UPSC, NEET, JEE, IBPS, GATE, US visa, UK visa, Schengen, Canada. Your photo is processed entirely in your browser. No upload.',
  alternates: { canonical: '/photo-signature' },
}

const faqs = [
  {
    q: 'Is my photo / face safer here than at iLovePDF or SmallPDF?',
    a: 'Yes — fundamentally. Those tools upload your photo to their servers to compress it. Your face transits the internet, sits on their disk during processing, and depends on their privacy policy and security to be deleted afterwards. With FormReady your photo is never transmitted at all — it\'s processed entirely in your browser via WebAssembly. There\'s no privacy policy to trust because there\'s no upload to govern.',
  },
  {
    q: 'How do you pick the right pixel size?',
    a: 'Each exam preset is sourced from the official notification PDF and dated on the page. We center-crop your photo to the right aspect ratio, scale to exact pixels, and compress to within the KB range. If your photo can\'t be cropped to the right aspect without cutting your face, the result will look off — re-take with the right framing in that case.',
  },
  {
    q: 'My exam isn\'t in the list. What now?',
    a: 'Use the "Custom dimensions" option — enter the exact pixel size and KB limit from your form\'s instructions. We support any custom W×H from 50px to 4000px. We\'re also adding more presets every release.',
  },
  {
    q: 'Will my photo get accepted?',
    a: 'We hit the technical spec (pixels + KB + format). Form acceptance also depends on photo quality (clear face, good light, plain background) — we can\'t replace good photography. Re-take if the original was low-quality.',
  },
  {
    q: 'Why is my photo being cropped?',
    a: 'Most exam photos require a specific aspect ratio (e.g., 200×230 px = 1:1.15). If your photo is a different aspect, we center-crop to match. If your face isn\'t centered, the crop will look wrong — re-take with the face centered, then re-upload.',
  },
  {
    q: 'Why does the source-citation matter?',
    a: 'Exam-board specifications change between sessions and notifications. We cite the source URL and the date we last verified each preset, so you can cross-check the current notification yourself. We also re-verify quarterly. If a spec changed since our last verify, the cited source is your authoritative reference, not us.',
  },
]

export default function PhotoSignaturePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.04] to-background">
          <div className="container-default py-10 sm:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-3">
                <Lock className="h-3 w-3" /> Photo & Signature · Privacy-first
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Your face. Your signature.{' '}
                <span className="text-primary">Never uploaded.</span>
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Pre-set for SSC, UPSC, NEET, JEE, IBPS, GATE, CAT and 4 visa types. Your photo is processed entirely in your browser — even though it&apos;s the most sensitive thing on the site.
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
          <div className="mx-auto max-w-4xl space-y-5">
            <PhotoPresetPicker />
            <WhatHappensToYourFile />
          </div>
        </section>

        <section className="container-default border-t border-border pt-16 pb-12">
          <RevealOnScroll>
            <MiniTrustComparison
              themLabel="Most online photo resizers uploaded your face"
              themDescription="Tools like ResizeImage, iLovePDF, photo-resizer-online require you to upload before they crop and compress. Your face transited the public internet — and stayed on their disk for some retention window."
              usLabel="FormReady processed your photo locally"
              usDescription="Your face never reached our servers. Center-crop, resize, and compression all ran in your browser via WebAssembly + Canvas. Your photo is the most sensitive thing on this site — and it stayed on your phone."
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
              headline="Top exam &amp; visa presets"
              subhead="Each guide page has the official source URL and date we last verified the spec."
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
