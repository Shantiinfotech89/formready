import type { Metadata } from 'next'
import { BookOpen, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { BlogCard } from '@/components/blog/blog-card'
import { categoryLabels, getAllPosts, type BlogCategory } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — How-tos, exam guides, visa specs',
  description:
    'Practical how-tos and reference guides for compressing files, hitting exact KB limits, and meeting Indian exam and visa photo specifications.',
  alternates: { canonical: '/blog' },
}

const categoryOrder: BlogCategory[] = [
  'how-to',
  'exam-specs',
  'visa-specs',
  'comparison',
  'manifesto',
]

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const grouped = new Map<BlogCategory, typeof posts>()
  for (const p of posts) {
    if (!grouped.has(p.category)) grouped.set(p.category, [])
    grouped.get(p.category)!.push(p)
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="info" className="mb-4">
                <BookOpen className="h-3 w-3" /> Blog
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                The FormReady{' '}
                <span className="text-primary">field guide</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Plain-language guides for hitting form-portal specs the first time. No marketing, no fluff.
              </p>
            </div>
          </div>
        </section>

        <section className="container-default py-16 bg-surface-page-warm">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <Sparkles className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">No posts yet</h2>
              <p className="mt-2 text-muted-foreground">
                Articles are coming. In the meantime, browse our tools.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl space-y-12">
              {categoryOrder.map((cat) => {
                const inCat = grouped.get(cat)
                if (!inCat || inCat.length === 0) return null
                return (
                  <div key={cat}>
                    <h2 className="mb-6 text-display-sm font-bold tracking-tight">
                      {categoryLabels[cat]}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {inCat.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'FormReady Blog',
            url: 'https://formready.in/blog',
            inLanguage: 'en-IN',
          }),
        }}
      />
    </>
  )
}
