'use client'

import * as React from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'fr-browser-warn-dismissed'

/**
 * Checks for the APIs we depend on. If any are missing, shows a non-blocking
 * banner the user can dismiss. We don't hard-block — better to let users try
 * and fall back to error messages than refuse upfront.
 */
function detectMissingApis(): string[] {
  if (typeof window === 'undefined') return []

  const missing: string[] = []
  if (typeof window.WebAssembly === 'undefined') missing.push('WebAssembly')
  if (typeof window.createImageBitmap === 'undefined') missing.push('createImageBitmap')
  if (!('toBlob' in HTMLCanvasElement.prototype)) missing.push('Canvas toBlob')
  if (typeof Worker === 'undefined') missing.push('Web Workers')
  if (typeof window.PerformanceObserver === 'undefined') missing.push('PerformanceObserver')
  return missing
}

export function BrowserCompatCheck() {
  const [missing, setMissing] = React.useState<string[]>([])
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      setDismissed(true)
      return
    }
    setMissing(detectMissingApis())
  }, [])

  if (dismissed || missing.length === 0) return null

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setDismissed(true)
  }

  return (
    <div
      role="alert"
      className={cn(
        'fixed inset-x-3 top-3 z-[60] mx-auto max-w-2xl',
        'rounded-xl border-2 border-warning bg-warning-soft shadow-xl',
        'animate-in slide-in-from-top-4 fade-in duration-base ease-out-strong',
      )}
    >
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-700" strokeWidth={2.25} />
        <div className="flex-1 text-sm">
          <p className="font-semibold text-amber-900">
            Your browser may not run Compress4 correctly
          </p>
          <p className="mt-1 leading-snug text-amber-900/80">
            Compression depends on{' '}
            <span className="num font-medium">{missing.join(', ')}</span>{' '}
            — not available in your current browser. We recommend upgrading to a recent version of{' '}
            <strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong>, or <strong>Edge</strong>.
            You can still try, but tools may fail unexpectedly.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss browser warning"
          className="cursor-pointer rounded-md p-1.5 text-amber-900/60 transition-colors hover:bg-warning/30 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700/40"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
