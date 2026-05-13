'use client'

import * as React from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExactKbDemoProps {
  className?: string
  /** Demo target the user sees in the input. */
  targetKb?: number
  /** Demo result we animate up to. */
  finalKb?: number
  /** Demo "was" size. */
  originalKb?: number
}

/**
 * Visual demo showing target KB → result KB. Numbers count up on first
 * scroll-into-view, in mono. Reinforces the "exact KB targeting" claim
 * without needing the user to actually compress anything yet.
 */
export function ExactKbDemo({
  className,
  targetKb = 100,
  finalKb = 98,
  originalKb = 2400,
}: ExactKbDemoProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = React.useState<{ result: number; pct: number }>({
    result: 0,
    pct: 0,
  })
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setAnimated({ result: finalKb, pct: Math.round((1 - finalKb / originalKb) * 100) })
      setDone(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          // Animate from 0 → finalKb over ~1.6s
          const start = performance.now()
          const duration = 1600
          const targetPct = Math.round((1 - finalKb / originalKb) * 100)

          let raf = 0
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / duration)
            // ease-out-strong
            const eased = 1 - Math.pow(1 - k, 3)
            setAnimated({
              result: Math.round(finalKb * eased),
              pct: Math.round(targetPct * eased),
            })
            if (k < 1) raf = requestAnimationFrame(tick)
            else setDone(true)
          }
          raf = requestAnimationFrame(tick)
          observer.disconnect()
          return () => cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [finalKb, originalKb])

  return (
    <div
      ref={ref}
      className={cn(
        'mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-md sm:p-8',
        className,
      )}
    >
      <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
        {/* Target input mock */}
        <div className="rounded-xl border border-input bg-muted/40 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            You type
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="num text-display-md font-bold tracking-tight text-foreground">
              {targetKb}
            </span>
            <span className="num text-base font-medium text-muted-foreground">KB</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">target size</p>
        </div>

        {/* Arrow */}
        <div
          aria-hidden
          className="flex h-10 items-center justify-center sm:h-auto"
        >
          <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground sm:rotate-0" strokeWidth={1.75} />
        </div>

        {/* Result */}
        <div
          className={cn(
            'rounded-xl border-2 p-5 transition-[border-color,background-color] duration-base ease-out-strong',
            done
              ? 'border-success bg-success-soft/40'
              : 'border-primary/20 bg-primary/[0.04]',
          )}
        >
          <p
            className={cn(
              'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-fast',
              done ? 'text-success-strong' : 'text-primary-press',
            )}
          >
            {done && <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />}
            {done ? 'You get' : 'Hitting target…'}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="num text-display-md font-bold tracking-tight text-foreground">
              {animated.result || 0}
            </span>
            <span className="num text-base font-medium text-muted-foreground">KB</span>
          </div>
          <p className="num mt-2 text-xs text-muted-foreground">
            was {originalKb.toLocaleString()} KB
            {animated.pct > 0 && (
              <span className={cn('ml-2 font-medium', done ? 'text-success-strong' : 'text-primary-press')}>
                −{animated.pct}%
              </span>
            )}
          </p>
        </div>
      </div>

      <p className="num mt-6 text-center text-xs text-muted-foreground">
        Powered by your browser, not our cloud.
      </p>
    </div>
  )
}
