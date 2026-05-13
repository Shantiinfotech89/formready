import { CalendarClock, ScrollText } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface LegalPageShellProps {
  eyebrow?: string
  title: string
  lede?: string
  /** ISO date string. */
  lastUpdated: string
  children: React.ReactNode
  /** When true, uses the `.article-prose` typography on children. */
  prose?: boolean
}

export function LegalPageShell({
  eyebrow = 'Legal',
  title,
  lede,
  lastUpdated,
  children,
  prose = true,
}: LegalPageShellProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card to-background">
          <div className="container-default py-12 sm:py-16">
            <div className="mx-auto max-w-3xl">
              <Badge variant="info" className="mb-4">
                <ScrollText className="h-3 w-3" /> {eyebrow}
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                {title}
              </h1>
              {lede && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {lede}
                </p>
              )}
              <p className="num mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarClock className="h-3 w-3" />
                Last updated:{' '}
                {new Date(lastUpdated).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-page-warm">
          <div className="container-default py-12 sm:py-16">
            <article className={cn('mx-auto max-w-3xl', prose && 'article-prose')}>
              {children}
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
