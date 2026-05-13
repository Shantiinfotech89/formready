import type { Metadata } from 'next'
import { CheckCircle2, ImageIcon, Lock, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { PdfToImageTool } from '@/components/tools/pdf-to-image-tool'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'PDF to Image — Render PDF pages as JPG / PNG / WebP',
  description:
    'Convert each page of a PDF to a separate JPG, PNG, or WebP image. Choose DPI, page range, and per-image KB target. All in your browser.',
  alternates: { canonical: '/pdf-to-image' },
}

const trustPoints = [
  {
    icon: ImageIcon,
    title: 'Three formats',
    body: 'JPG (smallest), PNG (lossless), WebP (modern). Pick what your form portal accepts.',
  },
  {
    icon: Lock,
    title: 'Render locally',
    body: 'PDF rendering runs in your browser via pdfjs-dist. The file never touches our servers.',
  },
  {
    icon: CheckCircle2,
    title: 'Page range + KB target',
    body: 'Extract just pages 1-3, 5, 7-9. Optionally compress each output to a target KB.',
  },
]

const faqs = [
  {
    q: 'Single page or multi-page output?',
    a: 'Single page → you get the image directly. Multiple pages → we package them as a ZIP for you.',
  },
  {
    q: 'What DPI should I pick?',
    a: '72 DPI is fine for screen viewing or social uploads. 150 DPI is the recommended default for forms (good legibility, modest size). 300 DPI is print-quality but produces large files.',
  },
  {
    q: 'How does the page range work?',
    a: 'Use commas and dashes: "1-3, 5, 7-9" extracts pages 1, 2, 3, 5, 7, 8, 9. Leave blank to extract all pages.',
  },
  {
    q: 'My PDF is password-protected. Will this work?',
    a: 'No — encrypted PDFs can\'t be decoded by browser-based PDF libraries. Unlock first using your PDF reader\'s "Save as" option without password, then come back.',
  },
]

export default function PdfToImagePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-secondary/[0.04] to-background">
          <div className="container-default py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="info" className="mb-4">
                <Sparkles className="h-3 w-3" /> Document Conversion
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                PDF to <span className="text-primary">Images</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Render each page as a separate JPG, PNG, or WebP. Useful when forms want individual pages.
              </p>
            </div>
          </div>
        </section>

        <section className="container-default py-12">
          <div className="mx-auto max-w-2xl">
            <PdfToImageTool />
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
