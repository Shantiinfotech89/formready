import { cn } from '@/lib/utils'

interface ArchitectureFlowProps {
  className?: string
  variant?: 'compact' | 'full'
}

/**
 * Inline SVG showing the data path: file → browser → result. The "no server"
 * gap is the whole point — there's a labelled empty box between steps with a
 * red strikethrough showing where uploads would normally go.
 *
 * `compact` is the small hero variant; `full` is the bigger Section 2 variant.
 */
export function ArchitectureFlow({ className, variant = 'compact' }: ArchitectureFlowProps) {
  const isFull = variant === 'full'

  return (
    <div
      role="img"
      aria-label="Data flow: your file goes from your device to the browser to the compressed result, never to a server"
      className={cn(
        'relative inline-flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-xs',
        isFull && 'gap-4 p-5 sm:gap-6 sm:p-6',
        className,
      )}
    >
      {/* Source */}
      <Node label="Your file" sub="local" tone="neutral" size={isFull ? 'md' : 'sm'} />

      <Arrow size={isFull ? 'md' : 'sm'} />

      {/* Browser (where compression happens) */}
      <Node label="Browser" sub="WebAssembly" tone="primary" size={isFull ? 'md' : 'sm'} highlight />

      <Arrow size={isFull ? 'md' : 'sm'} />

      {/* Output */}
      <Node label="Result" sub="local download" tone="success" size={isFull ? 'md' : 'sm'} />

      {/* The "no server" callout — absolute, sits above the browser node */}
      <div
        aria-hidden
        className={cn(
          'absolute left-1/2 -translate-x-1/2',
          isFull ? '-top-7' : '-top-6',
          'flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/5 px-2.5 py-0.5',
          'text-[10px] font-medium text-destructive',
          isFull && 'text-xs',
        )}
      >
        <span className="num inline-block h-2 w-2 rounded-full bg-destructive/40 ring-2 ring-destructive/20" />
        no server in this path
      </div>
    </div>
  )
}

interface NodeProps {
  label: string
  sub: string
  tone: 'neutral' | 'primary' | 'success'
  size: 'sm' | 'md'
  highlight?: boolean
}

function Node({ label, sub, tone, size, highlight }: NodeProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border text-center',
        size === 'sm' && 'min-w-[68px] px-2.5 py-2',
        size === 'md' && 'min-w-[100px] px-4 py-3',
        tone === 'neutral' && 'border-border bg-muted',
        tone === 'primary' && 'border-primary bg-primary/5 text-primary-press',
        tone === 'success' && 'border-success bg-success-soft/40 text-success-strong',
        highlight && 'shadow-sm',
      )}
    >
      <span
        className={cn(
          'font-semibold leading-tight',
          size === 'sm' ? 'text-[11px]' : 'text-sm',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'num mt-0.5 leading-none text-muted-foreground',
          size === 'sm' ? 'text-[9px]' : 'text-[10px]',
        )}
      >
        {sub}
      </span>
    </div>
  )
}

function Arrow({ size }: { size: 'sm' | 'md' }) {
  return (
    <svg
      aria-hidden
      width={size === 'sm' ? 16 : 24}
      height={size === 'sm' ? 8 : 12}
      viewBox="0 0 24 12"
      className="shrink-0 text-muted-foreground"
    >
      <path
        d="M0 6 H20 M16 2 L20 6 L16 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
