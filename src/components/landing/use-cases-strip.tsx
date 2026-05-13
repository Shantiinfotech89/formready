import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface UseCase {
  /** Short scenario name. */
  scenario: string
  /** Typical KB target shown in mono — e.g. "100 KB" or "200×230 px · 50 KB". */
  spec: string
  /** Optional secondary detail (e.g. "Property registration"). */
  detail?: string
  /** Optional internal link slug (e.g. "/compress-pdf-under-100kb" or "/ssc-cgl-photo-size"). */
  href?: string
}

interface UseCasesStripProps {
  /** Optional eyebrow text above the headline. */
  eyebrow?: string
  /** Headline text. */
  headline?: string
  /** Sub-line text. */
  subhead?: string
  /** The scenario list. */
  cases: UseCase[]
  className?: string
}

/**
 * Compact grid of concrete use-case scenarios for a tool page.
 *
 * Reassures the user that the tool was built for their actual context —
 * names the scenario (Property registration, SSC application, US visa) and
 * shows the typical KB target so the user can pick one as a shortcut.
 */
export function UseCasesStrip({
  eyebrow = 'Common use cases',
  headline,
  subhead,
  cases,
  className,
}: UseCasesStripProps) {
  return (
    <div className={cn('mx-auto max-w-5xl', className)}>
      {(headline || subhead) && (
        <div className="mb-8 text-center">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2 className="mt-2 text-display-sm font-bold tracking-tight">
              {headline}
            </h2>
          )}
          {subhead && (
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              {subhead}
            </p>
          )}
        </div>
      )}

      <div className="stagger-children grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => {
          const inner = (
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-[transform,box-shadow,border-color] duration-base ease-out-strong hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
              <p className="text-sm font-semibold leading-tight text-foreground">
                {c.scenario}
              </p>
              {c.detail && (
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  {c.detail}
                </p>
              )}
              <p className="num mt-3 text-xs font-medium text-primary-press">
                {c.spec}
              </p>
              {c.href && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-press">
                  Open guide
                  <ArrowRight className="h-3 w-3" />
                </span>
              )}
            </div>
          )

          if (c.href) {
            return (
              <Link
                key={c.scenario}
                href={c.href as never}
                className="rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
              >
                {inner}
              </Link>
            )
          }
          return <div key={c.scenario}>{inner}</div>
        })}
      </div>
    </div>
  )
}
