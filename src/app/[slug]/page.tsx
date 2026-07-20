import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ExternalLink } from 'lucide-react'
import { allLandingSlugs, findLandingPage } from '@/lib/landing-pages/data'
import { findPreset } from '@/lib/presets/photo'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import { SpecGrid } from '@/components/landing/spec-grid'
import { FaqSection } from '@/components/landing/faq-section'
import { RelatedStrip } from '@/components/landing/related-strip'
import { cn } from '@/lib/utils'

// Code-split the heavy compression tools so each landing page only loads what
// it actually needs (PDF tool ≈ 700 KB · image tool ≈ 200 KB · preset picker
// embeds image tool). Without dynamic imports, every /[slug] visit pulls all three.
const CompressPdfTool = dynamic(
  () => import('@/components/tools/compress-pdf-tool').then((m) => m.CompressPdfTool),
  { ssr: false, loading: () => <ToolSkeleton /> },
)
const CompressImageTool = dynamic(
  () => import('@/components/tools/compress-image-tool').then((m) => m.CompressImageTool),
  { ssr: false, loading: () => <ToolSkeleton /> },
)
const PhotoPresetPicker = dynamic(
  () => import('@/components/tools/photo-preset-picker').then((m) => m.PhotoPresetPicker),
  { ssr: false, loading: () => <ToolSkeleton tall /> },
)

function ToolSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div className={cn('animate-pulse rounded-xl border-2 border-dashed border-input bg-muted', tall ? 'h-[480px]' : 'h-[260px]')} aria-busy />
  )
}

interface PageProps {
  params: { slug: string }
}

// Lock to only the slugs returned by generateStaticParams() — every other
// path returns a static 404 from the CDN, no SSR. Prevents unknown-slug
// fanout DoS where an attacker varies the slug to force fresh renders.
export const dynamicParams = false

export async function generateStaticParams() {
  return allLandingSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = findLandingPage(params.slug)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: 'website',
    },
  }
}

/** Render the H1 with optional saffron-highlighter underline on the keyword. */
function renderH1(h1: string, keyword?: string, saffron?: boolean) {
  if (!keyword || !saffron) return h1
  const idx = h1.indexOf(keyword)
  if (idx < 0) return h1
  const before = h1.slice(0, idx)
  const after = h1.slice(idx + keyword.length)
  return (
    <>
      {before}
      <span className="saffron-underline">{keyword}</span>
      {after}
    </>
  )
}

export default function LandingPage({ params }: PageProps) {
  const page = findLandingPage(params.slug)
  if (!page) notFound()

  const preset = page.presetSlug ? findPreset(page.presetSlug) : undefined

  return (
    <>
      <SiteHeader />

      {/* Saffron tactical bar — Indian-keyword pages only, ≤ 5% surface. */}
      {page.saffron && <div className="tactical-bar" aria-hidden />}

      <main>
        {/* HERO */}
        <section
          className={cn(
            'border-b border-border bg-gradient-to-b from-card to-background',
            page.saffron ? 'via-tactical/[0.03]' : 'via-primary/[0.02]',
          )}
        >
          <div className="container-default py-12 sm:py-16">
            <div className="mx-auto max-w-3xl text-center">
              {page.specChip && (
                <div className="mb-4 inline-flex">
                  <Badge variant="tactical">{page.specChip}</Badge>
                </div>
              )}
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                {renderH1(page.h1, page.h1Keyword, page.saffron)}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{page.lede}</p>

              {preset && (
                <div className="mt-8 text-left">
                  <SpecGrid preset={preset} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* TOOL */}
        <section className="container-default py-12">
          <div className={cn(
            'mx-auto',
            page.toolType === 'photo-signature' ? 'max-w-4xl' : 'max-w-2xl',
          )}>
            {page.toolType === 'pdf' && (
              <CompressPdfTool
                initialTargetKb={page.targetKb ?? 100}
                presetName={page.h1}
              />
            )}
            {page.toolType === 'image' && (
              <CompressImageTool
                initialTargetKb={page.targetKb ?? 50}
                presetName={page.h1}
              />
            )}
            {page.toolType === 'photo-signature' && page.presetSlug && (
              <PhotoPresetPicker initialPresetSlug={page.presetSlug} />
            )}
            {page.toolType === 'signature' && (
              <CompressImageTool
                initialTargetKb={page.targetKb ?? 10}
                presets={[5, 10, 20, 50]}
                defaultFormat="jpg"
                signatureMode
                presetName={page.h1}
              />
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <PrivacyLockup variant="compact" />
          </div>

          {/* Source citation — visa pages get a disclaimer too */}
          {page.sourceUrl && (
            <div className="mt-8 mx-auto max-w-2xl space-y-2 text-center">
              {page.category === 'visa-photo' && (
                <p className="text-sm italic text-muted-foreground">
                  We help you meet specs but cannot guarantee acceptance — final decision rests with the consulate.
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Source:{' '}
                <a
                  href={page.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'inline-flex items-center gap-1 font-medium hover:underline',
                    page.saffron ? 'text-tactical hover:text-orange-700' : 'text-primary-press',
                  )}
                >
                  {page.sourceLabel ?? page.sourceUrl}
                  <ExternalLink className="h-3 w-3" />
                </a>
                {page.verifiedAt && ` · verified ${page.verifiedAt}`}
              </p>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="bg-surface-page-warm border-t border-border">
          <div className="container-default py-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-display-sm font-bold tracking-tight">Frequently asked</h2>
              <p className="mt-2 text-muted-foreground">
                Real questions, written for someone applying right now.
              </p>
              <div className="mt-8">
                <FaqSection faqs={page.faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* RELATED */}
        {page.relatedSlugs.length > 0 && (
          <section className="container-default py-16">
            <div className="mx-auto max-w-4xl">
              <RelatedStrip slugs={page.relatedSlugs} />
            </div>
          </section>
        )}

        <Separator />

        <section className="container-default py-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Card variant="warm" className="w-full">
              <CardContent className="space-y-3 p-6">
                <h3 className="text-lg font-semibold">Need a different size?</h3>
                <p className="text-sm text-muted-foreground">
                  Use our generic tools — they accept any KB target and any dimension you need.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* FAQPage JSON-LD for Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: page.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      {/* WebPage JSON-LD with breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: page.metaTitle,
            description: page.metaDescription,
            url: `https://compress4.com/${page.slug}`,
            inLanguage: 'en-IN',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Compress4',
              url: 'https://compress4.com',
            },
          }),
        }}
      />
    </>
  )
}
