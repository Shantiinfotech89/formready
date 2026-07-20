import type { Metadata } from 'next'
import { HelpCircle, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { FaqSection } from '@/components/landing/faq-section'
import { faqCategoryDescriptions, faqCategoryLabels, faqItems, type FaqCategory } from '@/lib/faq'

export const metadata: Metadata = {
  title: {
    absolute: 'Frequently Asked Questions: How It Works | Compress4',
  },
  description:
    'Learn how our local browser-based compression hits exact KB limits, handles HEIC files, and strips photo EXIF metadata safely without ever uploading to a cloud.',
  alternates: { canonical: '/faq' },
}

const categoryOrder: FaqCategory[] = ['privacy', 'how-to', 'exam-specs', 'visa-specs']

export default function FaqPage() {
  const grouped = new Map<FaqCategory, typeof faqItems>()
  for (const item of faqItems) {
    if (!grouped.has(item.category)) grouped.set(item.category, [])
    grouped.get(item.category)!.push(item)
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="info" className="mb-4">
                <HelpCircle className="h-3 w-3" /> FAQ
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Questions, answered.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                The five things people ask most often, sorted by what they care about. If your question isn&apos;t here, email us at hello@compress4.com.
              </p>
            </div>

            {/* Quick category jumplinks */}
            <nav aria-label="Categories" className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
              {categoryOrder.map((cat) => {
                const count = grouped.get(cat)?.length ?? 0
                if (count === 0) return null
                return (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className="cursor-pointer rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors duration-fast hover:border-primary/40 hover:text-primary-press focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus"
                  >
                    {faqCategoryLabels[cat]}
                    <span className="num ml-1.5 text-xs text-muted-foreground">({count})</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </section>

        <section className="bg-surface-page-warm">
          <div className="container-default py-16">
            <div className="mx-auto max-w-3xl space-y-16">
              {categoryOrder.map((cat) => {
                const items = grouped.get(cat)
                if (!items || items.length === 0) return null
                return (
                  <div key={cat} id={cat} className="scroll-mt-24">
                    <h2 className="mb-1 text-display-sm font-bold tracking-tight">
                      {faqCategoryLabels[cat]}
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                      {faqCategoryDescriptions[cat]}
                    </p>
                    <FaqSection faqs={items} />
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="container-default py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Question not here?</h3>
            <p className="text-sm text-muted-foreground">
              Email{' '}
              <a className="font-medium text-primary-press underline-offset-4 hover:underline" href="mailto:hello@compress4.com">
                hello@compress4.com
              </a>{' '}
              and we&apos;ll add it (and reply).
            </p>
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
                '@type': 'WebSite',
                '@id': 'https://compress4.com/#website',
                url: 'https://compress4.com/',
                name: 'Compress4',
                alternateName: 'Compress4',
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
                '@id': 'https://compress4.com/faq/#faq',
                mainEntity: faqItems.map((f) => ({
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
