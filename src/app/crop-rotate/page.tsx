import type { Metadata } from 'next'
import { Crop, Lock, RotateCw, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { CropRotateTool } from '@/components/tools/crop-rotate-tool'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Crop & Rotate Image — pre-compression editor',
  description:
    'Rotate, crop, and prepare your image before compression. Aspect-ratio presets for passport, square, A4. All in your browser.',
  alternates: { canonical: '/crop-rotate' },
}

const trustPoints = [
  {
    icon: Crop,
    title: 'Aspect-ratio presets',
    body: 'Free · Square · Passport (200×230) · A4 · 4:3 · 16:9. Or use Free for total control.',
  },
  {
    icon: RotateCw,
    title: 'Rotate cleanly',
    body: '90° · 180° · 270° rotations preserved at full resolution. Output is upright and form-ready.',
  },
  {
    icon: Lock,
    title: 'Local edit',
    body: 'All editing runs in your browser. The original and edited images never leave your device.',
  },
]

const faqs = [
  {
    q: 'When should I crop before compressing?',
    a: 'When the original photo has too much background and you need a tighter frame (e.g., for a passport-style photo). Cropping reduces pixel count, which helps hit small KB targets while preserving the important detail.',
  },
  {
    q: 'Can I rotate by arbitrary angles?',
    a: 'Not in v1 — only 90° increments. Auto-deskew (correcting slight crooked angles in scanned documents) is on the roadmap.',
  },
  {
    q: 'What\'s the "Compress this" button do?',
    a: 'Downloads the edited image and routes you to the image compressor. Re-upload there to compress to a target KB. (Direct hand-off without re-upload is on the roadmap.)',
  },
]

export default function CropRotatePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.03] to-background">
          <div className="container-default py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-4">
                <Sparkles className="h-3 w-3" /> Image Editor
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Crop & rotate
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Tighten the frame, fix orientation, then compress. All in your browser.
              </p>
            </div>
          </div>
        </section>

        <section className="container-default py-12">
          <div className="mx-auto max-w-3xl">
            <CropRotateTool />
          </div>
        </section>

        <section className="container-default pb-12">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-3">
              {trustPoints.map((p) => (
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
