import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { CompressPdfTool } from '@/components/tools/compress-pdf-tool'
import { ArchitecturalCommitments } from '@/components/landing/architectural-commitments'
import { MiniTrustComparison } from '@/components/landing/mini-trust-comparison'
import { UseCasesStrip, type UseCase } from '@/components/landing/use-cases-strip'
import { WhatHappensToYourFile } from '@/components/landing/what-happens-to-your-file'
import { RevealOnScroll } from '@/components/landing/reveal-on-scroll'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const useCases: UseCase[] = [
  {
    scenario: 'Property registration',
    detail: 'Sale deed, agreement, ID copies for state portals',
    spec: '500 KB',
  },
  {
    scenario: 'SSC application',
    detail: 'PDF supporting docs upload',
    spec: '100 KB',
    href: '/compress-pdf-under-100kb',
  },
  {
    scenario: 'Visa supporting docs',
    detail: 'US, UK, Schengen, Canada embassies',
    spec: '200 KB',
  },
  {
    scenario: 'Bank statement upload',
    detail: 'KYC, loan applications, ITR portals',
    spec: '1 MB',
  },
  {
    scenario: 'College admission form',
    detail: 'CUET, university portals, scholarship',
    spec: '200 KB',
  },
  {
    scenario: 'Job portal upload',
    detail: 'Naukri, Monster, govt job boards',
    spec: '500 KB',
  },
]

export const metadata: Metadata = {
  title: 'Compress PDF Online Free - Reduce PDF File Size | Compress4',
  description:
    'Reduce PDF size without losing quality. Easily compress PDF online to 100kb or any exact target size. Safe, free, and completely processed in your browser.',
  alternates: { canonical: '/compress-pdf' },
}

const faqs = [
  {
    q: 'You really can\'t see my PDF?',
    a: 'Correct. The compression engine runs entirely in your browser via WebAssembly and Canvas APIs. There is no server endpoint in our codebase that receives file content. You can verify in 30 seconds: open DevTools → Network tab and watch a compression run. Zero new requests appear during compression. We have a live demo at /privacy/verify.',
  },
  {
    q: 'Is this safer than iLovePDF for sensitive documents?',
    a: 'Yes — fundamentally. iLovePDF and similar tools upload your PDF to their server, compress it there, and send the result back. Their privacy policy controls what happens with your file in transit and on disk. With Compress4, the file never leaves your browser. There is no privacy policy you have to trust about what happens to your file because nothing happens to your file outside your device.',
  },
  {
    q: 'How does the "exact KB" target work?',
    a: 'You type a number (e.g., 100KB). Our engine tries progressively stronger compression strategies (structural, then page rasterization at decreasing quality) and stops as soon as the output is at or under your target. If we genuinely can\'t hit the target without making text unreadable, we stop at the smallest legible size and tell you.',
  },
  {
    q: 'What\'s the maximum file size?',
    a: 'Up to 50MB input. Larger files risk running out of browser memory on mid-range Android phones — we may add server-assisted compression for Pro users in a future release.',
  },
  {
    q: 'My PDF is password-protected. What now?',
    a: 'Browser PDF libraries can\'t process encrypted PDFs. Unlock the PDF first (your PDF reader\'s "Save as" → uncheck password is the simplest path), then compress.',
  },
  {
    q: 'Will the compressed PDF still have selectable text?',
    a: 'For very small targets (where structural compression isn\'t enough), we rasterize each page to JPEG and rebuild the PDF. This gives the smallest sizes but text becomes raster (not selectable). For text-heavy PDFs where you need selectability, choose a larger target so structural compression alone hits it.',
  },
]

export default function CompressPdfPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero — privacy first, feature second */}
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-10 sm:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-3">
                <Lock className="h-3 w-3" /> PDF · Privacy-first
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Compress your PDF —{' '}
                <span className="text-primary">without uploading it.</span>
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Aadhaar scans, signed contracts, property deeds — never leave your device. Type your exact KB target, get the file back, in seconds.
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

        {/* Tool */}
        <section className="container-default py-10">
          <div className="mx-auto max-w-2xl space-y-5">
            <CompressPdfTool />
            <WhatHappensToYourFile />
          </div>
        </section>

        {/* Trust comparison — validates the user's choice */}
        <section className="container-default border-t border-border pt-16 pb-12">
          <RevealOnScroll>
            <MiniTrustComparison
              themLabel="iLovePDF, SmallPDF, Adobe Acrobat Online uploaded your PDF"
              themDescription="Their server received your file, compressed it there, and held it temporarily. You had to trust their privacy policy and security on every step."
              usLabel="Compress4 processed your PDF locally"
              usDescription="The compression engine ran in your browser via WebAssembly. Your PDF never touched any Compress4 server — and you can verify this in your own DevTools Network tab."
            />
          </RevealOnScroll>
        </section>

        {/* Architectural commitments */}
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

        {/* Use cases */}
        <section className="container-default border-t border-border py-16">
          <RevealOnScroll>
            <UseCasesStrip
              headline="What people compress with this tool"
              subhead="Real scenarios with their typical KB targets. Click a guide if it matches what you're doing."
              cases={useCases}
            />
          </RevealOnScroll>
        </section>

        {/* FAQ */}
        <section className="bg-surface-page-warm">
          <div className="container-default py-16">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-display-sm font-bold tracking-tight">FAQ</h2>
              <p className="mt-2 text-muted-foreground">Real questions from real users.</p>
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
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                '@id': 'https://compress4.com/compress-pdf/#software',
                name: 'Compress4 PDF Compressor',
                url: 'https://compress4.com/compress-pdf',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description:
                  'An browser-based PDF compression tool that reduces PDF file sizes to exact target limits like 100kb using local WebAssembly execution.',
              },
              {
                '@type': 'WebSite',
                '@id': 'https://compress4.com/#website',
                url: 'https://compress4.com/',
                name: 'Compress4',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://compress4.com/?s={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://compress4.com/compress-pdf/#faq',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />
    </>
  )
}
