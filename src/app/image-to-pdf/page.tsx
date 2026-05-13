import type { Metadata } from 'next'
import { CheckCircle2, FileText, Lock, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ImageToPdfTool } from '@/components/tools/image-to-pdf-tool'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Image to PDF — Combine images into one PDF',
  description:
    'Combine 1–20 images (JPG, PNG, WebP) into a single PDF with chosen page size, orientation, and optional KB target. All in your browser. No upload.',
  alternates: { canonical: '/image-to-pdf' },
}

const trustPoints = [
  {
    icon: FileText,
    title: 'Drag-to-reorder',
    body: 'Pages appear in the order shown. Use the up/down handles to rearrange before building.',
  },
  {
    icon: Lock,
    title: 'No upload',
    body: 'PDF is built in your browser via pdf-lib. The images never leave your device.',
  },
  {
    icon: CheckCircle2,
    title: 'Hit a target KB',
    body: 'Optionally compress the resulting PDF — we step JPEG quality from 92% down until we hit your target.',
  },
]

const faqs = [
  {
    q: 'How many images can I combine?',
    a: 'Up to 20 in the free tier — that covers most multi-page form submissions and ID copies. Pro raises this to 100.',
  },
  {
    q: 'What if my images are different sizes?',
    a: 'Each becomes its own PDF page. With page size = "A4" (or Letter / Legal), each image is fitted to the page with margins. With page size = "Original", each PDF page matches its source image dimensions exactly.',
  },
  {
    q: 'Can I change the order after adding?',
    a: 'Yes. The thumbnail row has up/down arrows on each row to rearrange before building.',
  },
  {
    q: 'Are PNG transparency or HEIC supported?',
    a: 'PNG is supported (transparent areas become white in the PDF). HEIC is supported via your browser\'s native decoder; on older browsers it may fail and you\'ll need to save as JPG first from your phone.',
  },
]

export default function ImageToPdfPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.03] to-background">
          <div className="container-default py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-4">
                <Sparkles className="h-3 w-3" /> Document Conversion
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Combine images into <span className="text-primary">one PDF</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Drop up to 20 JPG / PNG / WebP images, arrange them, build a PDF — all in your browser.
              </p>
            </div>
          </div>
        </section>

        <section className="container-default py-12">
          <div className="mx-auto max-w-3xl">
            <ImageToPdfTool />
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
