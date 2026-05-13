'use client'

import * as React from 'react'
import Link from 'next/link'
import { Lock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const COOKIE_NAME = 'cookie-consent'
const COOKIE_VALUE_ACK = 'acknowledged'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

function readConsent(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').some((c) => c === `${COOKIE_NAME}=${COOKIE_VALUE_ACK}`)
}

function writeConsent() {
  document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE_ACK}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`
}

/**
 * Lightweight consent banner. We use only strictly-necessary first-party
 * cookies + cookieless analytics, so this is more about transparency than
 * GDPR/DPDP gating. It dismisses with a single click and persists for a year.
 */
export function CookieBanner() {
  const [visible, setVisible] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (!readConsent()) {
      // Defer to next tick so the entrance feels intentional rather than flashing
      const timer = window.setTimeout(() => setVisible(true), 600)
      return () => window.clearTimeout(timer)
    }
  }, [])

  const dismiss = React.useCallback(() => {
    writeConsent()
    setVisible(false)
  }, [])

  if (!mounted || !visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className={cn(
        'fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl',
        'rounded-xl border border-border bg-card shadow-xl',
        'transition-[transform,opacity] duration-base ease-out-strong',
        'animate-in slide-in-from-bottom-4 fade-in',
      )}
    >
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-strong">
          <Lock className="h-4 w-4" strokeWidth={2.25} />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-medium leading-tight">
            FormReady uses minimal cookies — no behavioural advertising trackers from us.
          </p>
          <p className="mt-1 leading-snug text-muted-foreground">
            Your file never leaves your device. We use first-party cookies only for language preference and (Pro) authentication.{' '}
            <Link href="/cookies" className="font-medium text-primary-press underline-offset-4 hover:underline">
              Full cookie policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="primary" size="sm" onClick={dismiss}>
            Got it
          </Button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
