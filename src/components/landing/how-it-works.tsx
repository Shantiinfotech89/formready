import * as React from 'react'
import { ArrowRight, Cog, Download, FileUp, ServerOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  n: number
  title: string
  body: string
  Icon: typeof FileUp
}

const STEPS: Step[] = [
  {
    n: 1,
    title: 'Drop your file',
    body: 'PDF, image, photo, signature — up to 50 MB. Stays on your device.',
    Icon: FileUp,
  },
  {
    n: 2,
    title: 'Browser compresses it',
    body: 'WebAssembly + Canvas APIs run the compression locally. No upload.',
    Icon: Cog,
  },
  {
    n: 3,
    title: 'Download the result',
    body: 'Saves directly to your device. Original and result both stay local.',
    Icon: Download,
  },
]

export function HowItWorks({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      {/* Step row */}
      <div className="grid gap-4 sm:gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {STEPS.map((step, idx) => (
          <React.Fragment key={step.n}>
            <StepCard step={step} />
            {idx < STEPS.length - 1 && (
              <div aria-hidden className="hidden items-center justify-center md:flex">
                <ArrowRight className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* "No server" disclaimer band — sits below the step row, full width, gives the architectural commitment teeth */}
      <div className="mt-6 rounded-xl border-2 border-dashed border-destructive/30 bg-destructive/[0.02] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ServerOff className="h-4 w-4" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              No upload. No server-side processing. Not even temporarily.
            </p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              The dotted line above is intentional — there is literally no server
              endpoint in our codebase that receives file content. You can audit
              the compression engine on GitHub or watch your own browser&apos;s
              network tab when you compress.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="relative flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-xs">
      <span className="num absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
        Step {step.n}
      </span>
      <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-press">
        <step.Icon className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-1 text-sm leading-snug text-muted-foreground">{step.body}</p>
    </div>
  )
}
