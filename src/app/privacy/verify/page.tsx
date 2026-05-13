import type { Metadata } from 'next'
import { ArrowRight, Code2, Lock, ShieldCheck, Terminal } from 'lucide-react'
import Link from 'next/link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { VerifyDemo } from './verify-demo'

export const metadata: Metadata = {
  title: 'Privacy Verify — See for yourself',
  description:
    'We say files never leave your device. Here is the live network monitor that proves it. Open DevTools, run a sample compression, watch the Network tab show zero outbound requests.',
  alternates: { canonical: '/privacy/verify' },
}

const steps = [
  {
    n: 1,
    title: 'Open DevTools',
    body: (
      <>
        <span className="num rounded bg-muted px-1.5 py-0.5 text-sm">⌘ ⌥ I</span>{' '}
        on Mac ·{' '}
        <span className="num rounded bg-muted px-1.5 py-0.5 text-sm">Ctrl Shift I</span>{' '}
        on Windows / Linux
      </>
    ),
  },
  {
    n: 2,
    title: 'Click the Network tab',
    body: 'Make sure recording is on (the red dot top-left). Optionally click "Clear" to start fresh.',
  },
  {
    n: 3,
    title: 'Click "Run a sample compression" below',
    body: 'A tiny sample PDF is generated and compressed entirely in your browser.',
  },
  {
    n: 4,
    title: 'Watch the Network tab',
    body: 'Zero new requests during compression. No upload. Confirmed by the browser itself.',
  },
]

export default function PrivacyVerifyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-card to-background">
          <div className="container-default py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="success" className="mb-4">
                <ShieldCheck className="h-3 w-3" /> Privacy proof
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                See for yourself.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                We say your files never leave your device. Here&apos;s the live network monitor that proves it — running on this very page.
              </p>
            </div>
          </div>
        </section>

        {/* Steps + live demo */}
        <section className="container-default py-12">
          <div className="mx-auto max-w-3xl space-y-12">
            <Card>
              <CardContent className="space-y-6 p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Terminal className="h-5 w-5 text-primary" />
                  Verify in 30 seconds
                </h2>
                <ol className="space-y-4">
                  {steps.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {s.n}
                      </span>
                      <div className="pt-1">
                        <h3 className="font-medium leading-tight">{s.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <VerifyDemo />

            {/* Why this is enough */}
            <Card variant="warm">
              <CardContent className="space-y-4 p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Lock className="h-5 w-5 text-success" />
                  Why DevTools is enough proof
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Every browser ships with a built-in network inspector that shows every HTTP request the page makes — including ones a malicious page might try to hide. There&apos;s no way for a page to send a file out of your device without showing up in this panel. If we ever upload your file, you would see it. We don&apos;t.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  This page also runs the same panel in real time, so you don&apos;t have to take our word for it on the other tools — every compression page on this site behaves identically.
                </p>
              </CardContent>
            </Card>

            {/* Open source */}
            <Card>
              <CardContent className="space-y-4 p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Code2 className="h-5 w-5 text-primary" />
                  See the code yourself
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  The compression engine is open source. Read it, audit it, fork it. If you find a security issue, please report it before disclosing publicly — see the SECURITY.md in the repo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="secondary">
                    <a href="https://github.com/" target="_blank" rel="noreferrer">
                      View source on GitHub
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Ready to compress something for real?
              </p>
              <div className="flex gap-2">
                <Button asChild variant="ghost">
                  <Link href="/">Home</Link>
                </Button>
                <Button asChild variant="primary">
                  <Link href="/compress-pdf">
                    Compress a PDF
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
