import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { findLandingPage } from '@/lib/landing-pages/data'
import { Card, CardContent } from '@/components/ui/card'

interface RelatedStripProps {
  slugs: string[]
}

/** Internal-link cluster — every landing page links to ≥3 sibling pages. */
export function RelatedStrip({ slugs }: RelatedStripProps) {
  const items = slugs
    .map((s) => findLandingPage(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (items.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="text-display-sm font-bold tracking-tight">Related pages</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((p) => (
          <Card key={p.slug} variant="default" className="transition-[transform,box-shadow] duration-base hover:-translate-y-0.5 hover:shadow-md">
            <Link
              href={`/${p.slug}` as never}
              className="block focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
            >
              <CardContent className="p-5">
                <p className="text-sm font-semibold leading-tight">{p.h1}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  {p.metaDescription.slice(0, 90)}…
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary-press">
                  Open
                  <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
