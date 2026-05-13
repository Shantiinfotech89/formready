'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, RefreshCw, ShieldAlert } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Route-segment error boundary. Triggered when a server component or layout
 * inside the current route throws. The root layout still wraps the html/body —
 * we only render the page-level fallback here.
 */
export default function RouteError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // In production we forward to Sentry / our error sink here.
    // eslint-disable-next-line no-console
    console.error('FormReady route error:', error)
  }, [error])

  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-default py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="destructive" className="num mb-4">
              <ShieldAlert className="h-3 w-3" /> Error
            </Badge>
            <p className="num text-display-2xl font-bold tracking-tighter leading-none text-destructive">
              500
            </p>
            <h1 className="mt-6 text-display-md font-bold tracking-tight">
              Something broke on our end.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We logged it. The good news: nothing about your file was sent to us either way — compression runs in your browser regardless of whether the rest of the site is working.
            </p>

            {error.digest && (
              <Card variant="warm" className="mt-8 mx-auto max-w-md text-left">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Error reference
                  </p>
                  <p className="num mt-1 break-all text-sm text-foreground">{error.digest}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Include this code if you email{' '}
                    <a href="mailto:bugs@formready.in" className="text-primary-press underline-offset-4 hover:underline">
                      bugs@formready.in
                    </a>{' '}
                    so we can find your specific failure quickly.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={reset} variant="glow" size="lg">
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/">
                  Back to homepage
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
