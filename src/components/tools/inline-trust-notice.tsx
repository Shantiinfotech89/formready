import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InlineTrustNoticeProps {
  className?: string
}

/**
 * Small reassurance card placed directly above the file drop zone.
 *
 * The single highest-leverage trust device on a tool page — sits at the moment
 * of peak anxiety (user is about to drop a sensitive file). Mirrors the
 * homepage's PrivacyLockup but is more grounded in *this specific moment*:
 * "your file" rather than "documents".
 */
export function InlineTrustNotice({ className }: InlineTrustNoticeProps) {
  return (
    <div
      role="note"
      aria-label="Privacy reassurance"
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border border-success-soft bg-success-soft/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p className="flex items-start gap-2 text-sm leading-snug text-foreground sm:items-center">
        <Lock
          aria-hidden
          className="mt-0.5 h-4 w-4 shrink-0 text-success sm:mt-0"
          strokeWidth={2.5}
        />
        <span>
          <span className="font-medium">Your file stays on your device.</span>{' '}
          <span className="text-muted-foreground">Compressed locally via WebAssembly.</span>
        </span>
      </p>
      <Link
        href="/privacy/verify"
        className="inline-flex shrink-0 items-center gap-1 self-end rounded-sm text-xs font-medium text-primary-press underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline sm:self-auto"
      >
        Verify it yourself
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  )
}
