import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArticleProse } from '@/components/blog/article-prose'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { RelatedToolsStrip } from '@/components/blog/related-tools'
import { categoryLabels, getAllSlugs, getPostBySlug } from '@/lib/blog'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'

interface PageProps {
  params: { slug: string }
}

// Lock to only the slugs returned by generateStaticParams() — every other
// path returns a static 404 from the CDN, no SSR. Prevents unknown-slug
// fanout DoS where an attacker varies the slug to force fresh renders.
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      <SiteHeader />
      <main>
        {/* Article header */}
        <section className="border-b border-border bg-gradient-to-b from-card to-background">
          <div className="container-default py-12 sm:py-16">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-muted-foreground transition-colors duration-fast hover:text-primary-press focus-visible:outline-none focus-visible:text-primary-press focus-visible:underline"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to blog
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Badge variant="info">{categoryLabels[post.category]}</Badge>
                <span className="num text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="num">{post.readingMinutes} min read</span>
                </span>
              </div>
              <h1 className="mt-4 text-display-md sm:text-display-lg font-bold tracking-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                By {post.author}
              </p>
            </div>
          </div>
        </section>

        {/* Article body + TOC sidebar */}
        <section className="bg-surface-page-warm">
          <div className="container-default py-12 sm:py-16">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_220px]">
              <div className="min-w-0 max-w-3xl">
                <ArticleProse html={post.html} />

                <Separator className="my-12" />

                {(post.relatedTools?.length || post.relatedPages?.length) ? (
                  <RelatedToolsStrip
                    toolPaths={post.relatedTools}
                    pageSlugs={post.relatedPages}
                  />
                ) : null}

                <div className="mt-12 flex justify-start">
                  <PrivacyLockup variant="compact" />
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-20">
                  <TableOfContents toc={post.toc} />
                </div>
              </aside>
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
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            author: { '@type': 'Organization', name: post.author },
            publisher: {
              '@type': 'Organization',
              name: 'FormReady',
              url: 'https://formready.in',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://formready.in/blog/${post.slug}`,
            },
            inLanguage: 'en-IN',
            wordCount: post.wordCount,
          }),
        }}
      />
    </>
  )
}
