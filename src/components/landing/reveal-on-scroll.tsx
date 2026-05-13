'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface RevealOnScrollProps {
  children: React.ReactNode
  /** Visibility threshold (0–1). Defaults to 0.15 — fires when 15% visible. */
  threshold?: number
  /** Reveal delay in ms (for staggering siblings manually if needed). */
  delay?: number
  className?: string
}

/**
 * Wraps content that should fade + rise into view on first scroll. Uses
 * IntersectionObserver — no external library. Decorative-only: per Emil's
 * principles, this is for content blocks seen rarely (rare-section reveals),
 * not for content seen every visit. Reduced-motion users get instant reveal.
 */
export function RevealOnScroll({
  children,
  threshold = 0.15,
  delay = 0,
  className,
}: RevealOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window !== 'undefined') {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (reduceMotion) {
        setVisible(true)
        return
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'transition-[opacity,transform] duration-slower ease-out-strong',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
