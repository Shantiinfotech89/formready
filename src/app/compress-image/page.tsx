import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
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
    scenario: 'Naukri profile photo',
    detail: 'Job board photo upload',
    spec: '100 KB',
  },
  {
    scenario: 'LinkedIn profile photo',
    detail: 'Square crop · public profile',
    spec: '200 KB',
  },
  {
    scenario: 'Aadhaar photo update',
    detail: 'UIDAI self-service portal',
    spec: '50 KB',
    href: '/compress-image-under-50kb',
  },
  {
    scenario: 'Passport application',
    detail: 'Passport Seva Kendra upload',
    spec: '240 KB',
  },
  {
    scenario: 'WhatsApp display picture',
    detail: 'Business profile, status images',
    spec: '200 KB',
  },
  {
    scenario: 'Resume photo',
    detail: 'Word, Google Docs, PDF resumes',
    spec: '100 KB',
  },
]

export const metadata: Metadata = {
  title: {
    absolute:
      'Best Image Compressor: Reduce JPEG & PNG Online | Compress4',
  },
  description:
    'Reduce image size to exact limits for Naukri, LinkedIn, Passport Seva, & Aadhaar forms. Compress JPEG/PNG to 50kb or 100kb free without losing photo quality.',
  alternates: { canonical: '/compress-image' },
}

const faqs = [
  {
    q: 'You really can\'t see my image?',
    a: 'Correct. Image processing runs in a Web Worker on your device — JPEG/PNG/WebP encoders are built into your browser, and our HEIC fallback decoder loads as WASM only when needed. There is no server endpoint that receives your image. Open DevTools → Network during a compression to verify zero outbound requests.',
  },
  {
    q: 'Will my photo\'s EXIF metadata leak?',
    a: 'No. The compression engine reads your image into a canvas and re-encodes from pixels — EXIF (GPS, camera model, etc.) is naturally stripped during this process. So even if your phone embedded location in the original photo, the compressed output won\'t carry it. This is a side benefit of how the engine works, not a separate feature.',
  },
  {
    q: 'My iPhone photo is HEIC. Will this work?',
    a: 'Yes — modern browsers can decode HEIC natively. We auto-convert HEIC to JPG (or WebP) during compression so it\'s upload-ready. On older browsers (Brave / Firefox / Chrome on older Android), our libheif-wasm fallback decodes locally — still no upload.',
  },
  {
    q: 'Will my photo lose quality?',
    a: 'It will lose some quality — that\'s how compression works. We protect against unacceptable loss by stopping quality reduction at 50% (below that JPEG artifacts get visible). For tight targets, we offer to reduce dimensions instead, which preserves perceived quality much better than aggressive quality drops.',
  },
  {
    q: 'Should I pick JPG, PNG, or WebP?',
    a: 'JPG: most universally accepted (every form portal). WebP: 25-35% smaller at same quality (great for tight targets). PNG: lossless, best for screenshots and line art (much larger files). Default is "Same as input" — we keep your original format unless you choose otherwise.',
  },
  {
    q: 'What\'s the maximum file size?',
    a: 'Up to 25MB input. RAW formats (CR2, NEF, ARW) are not supported — convert to JPG/PNG first.',
  },
]

export default function CompressImagePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-secondary/[0.04] to-background">
          <div className="container-default py-10 sm:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-3">
                <Lock className="h-3 w-3" /> Image · Privacy-first
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Compress your image —{' '}
                <span className="text-primary">without uploading it.</span>
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Passport photos, ID copies, screenshots — never leave your phone. JPG · PNG · HEIC · WebP. Type your exact KB target.
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
            <CompressImageTool />
            <WhatHappensToYourFile />
          </div>
        </section>

        <section className="container-default border-t border-border pt-16 pb-12">
          <RevealOnScroll>
            <MiniTrustComparison
              themLabel="iLovePDF, TinyPNG, Squoosh uploaded your image"
              themDescription="Their server received your photo, processed it, and (depending on which tool) held it temporarily. Your face, ID, or screenshot transited the public internet."
              usLabel="Compress4 processed your image locally"
              usDescription="A Web Worker on your device compressed it via the browser's built-in encoders. Your image never touched any Compress4 server — and EXIF metadata (location, camera, timestamps) was naturally stripped during re-encoding."
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
              headline="What people compress with this tool"
              subhead="Real scenarios with their typical KB targets. Click a guide if it matches what you're doing."
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
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                '@id': 'https://compress4.com/compress-image/#software',
                name: 'Compress4 Image Compressor',
                url: 'https://compress4.com/compress-image',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'All',
                description:
                  'A browser-based image compression tool that reduces JPEG, PNG, and HEIC file sizes to exact target limits like 50kb or 100kb for platforms like Naukri, LinkedIn, and Aadhaar cards using local WebAssembly execution.',
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
                '@id': 'https://compress4.com/compress-image/#faq',
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
