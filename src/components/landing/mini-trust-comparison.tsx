import { Check, Cloud, ShieldCheck, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MiniTrustComparisonProps {
  /** What "they" do — typically uploads to a server. Tool-specific phrasing. */
  themLabel: string
  themDescription: string
  /** What "we" do — local processing. Tool-specific phrasing. */
  usLabel: string
  usDescription: string
  /** Optional headline above the comparison. */
  headline?: string
  /** Optional sub-line above the comparison. */
  subhead?: string
  className?: string
}

/**
 * Two-column "us vs them" comparison scoped to a tool page.
 *
 * Tighter than the homepage TrustComparison (which has 5 rows): single row,
 * tool-specific copy. Sits between the tool and the architectural
 * commitments — validates the user's choice after they've used the tool.
 */
export function MiniTrustComparison({
  themLabel,
  themDescription,
  usLabel,
  usDescription,
  headline = 'You just compressed without uploading.',
  subhead = 'Here\'s what you didn\'t do — and why it matters.',
  className,
}: MiniTrustComparisonProps) {
  return (
    <div className={cn('mx-auto max-w-4xl', className)}>
      {(headline || subhead) && (
        <div className="mb-8 text-center">
          {headline && (
            <h2 className="text-display-sm font-bold tracking-tight text-foreground">
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

      <div className="grid gap-3 md:grid-cols-2">
        {/* Them */}
        <div className="overflow-hidden rounded-2xl border border-destructive/20 bg-destructive-soft/40">
          <div className="flex items-center gap-2 border-b border-destructive/15 bg-destructive/[0.06] px-5 py-3">
            <Cloud className="h-4 w-4 text-destructive" strokeWidth={2} />
            <span className="text-sm font-semibold text-destructive">
              Most online compressors
            </span>
          </div>
          <div className="space-y-3 px-5 py-4">
            <p className="flex items-start gap-2 text-sm leading-snug">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/60" strokeWidth={2.5} />
              <span className="font-medium text-foreground/85">{themLabel}</span>
            </p>
            <p className="pl-6 text-sm leading-snug text-muted-foreground">
              {themDescription}
            </p>
          </div>
        </div>

        {/* Us */}
        <div className="overflow-hidden rounded-2xl border-2 border-primary bg-primary/[0.04] shadow-md">
          <div className="flex items-center gap-2 border-b border-primary/30 bg-primary/[0.07] px-5 py-3">
            <ShieldCheck className="h-4 w-4 text-primary-press" strokeWidth={2.5} />
            <span className="text-sm font-semibold text-primary-press">FormReady</span>
          </div>
          <div className="space-y-3 px-5 py-4">
            <p className="flex items-start gap-2 text-sm leading-snug">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />
              <span className="font-medium text-foreground">{usLabel}</span>
            </p>
            <p className="pl-6 text-sm leading-snug text-muted-foreground">
              {usDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
