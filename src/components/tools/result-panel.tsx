import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResultPanelProps {
  finalKb: number
  originalBytes: number
  className?: string
}

export function ResultPanel({ finalKb, originalBytes, className }: ResultPanelProps) {
  const originalKb = Math.round(originalBytes / 1024)
  const reductionPct = Math.max(0, Math.round((1 - (finalKb * 1024) / originalBytes) * 100))

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'rounded-xl border border-success-soft bg-gradient-to-br from-success-soft/40 to-card p-6',
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-success-strong">
        <CheckCircle2 className="h-4 w-4" strokeWidth={2.25} />
        File ready
      </div>
      <p className="num mt-2 text-display-md font-semibold text-foreground animate-in fade-in zoom-in-95 duration-slower ease-soft-spring">
        {finalKb}KB
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        was <span className="num">{originalKb.toLocaleString()}KB</span>{' '}
        <span className="text-success-strong font-medium">−{reductionPct}%</span>
      </p>
    </div>
  )
}
