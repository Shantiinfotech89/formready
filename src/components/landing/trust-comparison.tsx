import { Check, Cloud, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ROWS: { them: string; us: string }[] = [
  {
    them: 'Your file is uploaded to their servers',
    us: 'File processes locally in your browser',
  },
  {
    them: 'Their server compresses and stores temporarily',
    us: 'Compression runs via WebAssembly on your device',
  },
  {
    them: 'Their privacy policy controls what happens',
    us: 'Browser network tab is your proof',
  },
  {
    them: '"Files deleted in 1 hour" — you can\'t verify',
    us: 'You verify zero-upload yourself in 30 seconds',
  },
  {
    them: 'Closed-source compression engine',
    us: 'Open source — read the code on GitHub',
  },
]

export function TrustComparison({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-3 md:grid-cols-2', className)}>
      {/* Them */}
      <div className="overflow-hidden rounded-2xl border border-destructive/20 bg-destructive-soft/40">
        <div className="flex items-center gap-2 border-b border-destructive/15 bg-destructive/[0.06] px-5 py-3">
          <Cloud className="h-4 w-4 text-destructive" strokeWidth={2} />
          <span className="text-sm font-semibold text-destructive">
            Most compression tools
          </span>
        </div>
        <ul className="divide-y divide-destructive/10">
          {ROWS.map((r) => (
            <li key={r.them} className="flex items-start gap-3 px-5 py-3 text-sm">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/60" strokeWidth={2.5} />
              <span className="leading-snug text-foreground/80">{r.them}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Us */}
      <div className="overflow-hidden rounded-2xl border-2 border-primary bg-primary/[0.04] shadow-md">
        <div className="flex items-center gap-2 border-b border-primary/30 bg-primary/[0.07] px-5 py-3">
          <Check className="h-4 w-4 text-primary-press" strokeWidth={2.5} />
          <span className="text-sm font-semibold text-primary-press">
            Compress4
          </span>
        </div>
        <ul className="divide-y divide-primary/10">
          {ROWS.map((r) => (
            <li key={r.us} className="flex items-start gap-3 px-5 py-3 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />
              <span className="font-medium leading-snug text-foreground">{r.us}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
