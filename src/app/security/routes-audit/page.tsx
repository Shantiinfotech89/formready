import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CloudOff, Github, Lock, ShieldCheck, TerminalSquare, Zap } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Audit the Routes',
  description:
    'Verify that FormReady has no upload endpoints, no hidden APIs, and no cloud storage. Every claim is checkable in your browser with DevTools.',
  alternates: { canonical: '/security/routes-audit' },
}

const features = [
  {
    Icon: CloudOff,
    title: 'No Upload Endpoints',
    body: 'Zero POST /upload, POST /api/files, or any endpoint that receives file content. Architectural choice, not policy.',
  },
  {
    Icon: TerminalSquare,
    title: 'Local Browser Processing',
    body: 'Compression runs in your browser via WebAssembly. The file never leaves your device, never touches a server.',
  },
  {
    Icon: Lock,
    title: 'No Hidden APIs',
    body: 'Every route is listed below. No background requests, no telemetry sending file metadata, no fingerprinting calls.',
  },
  {
    Icon: ShieldCheck,
    title: 'Fully Verifiable',
    body: 'Open DevTools → Network tab while compressing. You\'ll see zero file requests. No claims required — just evidence.',
  },
]

const routes = [
  { method: 'GET', path: '/', description: 'Home page' },
  { method: 'GET', path: '/about', description: 'About FormReady' },
  { method: 'GET', path: '/compress-pdf', description: 'PDF compression tool' },
  { method: 'GET', path: '/compress-image', description: 'Image compression tool' },
  { method: 'GET', path: '/crop-rotate', description: 'Crop & rotate tool' },
  { method: 'GET', path: '/photo-signature', description: 'Exam & visa photo tool' },
  { method: 'GET', path: '/privacy', description: 'Privacy policy' },
  { method: 'GET', path: '/privacy/verify', description: 'Live privacy demo' },
  { method: 'GET', path: '/terms', description: 'Terms of service' },
  { method: 'GET', path: '/faq', description: 'Frequently asked questions' },
  { method: 'GET', path: '/blog', description: 'Blog & education' },
]

const blockedRoutes = [
  { method: 'POST', path: '/upload', reason: 'Does not exist' },
  { method: 'POST', path: '/api/files', reason: 'Does not exist' },
  { method: 'POST', path: '/api/compress', reason: 'Does not exist' },
  { method: 'GET', path: '/api/metadata', reason: 'Does not exist' },
  { method: 'POST', path: '/cdn/upload', reason: 'Does not exist' },
]

export default function RoutesAuditPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="info" className="mb-4">
                <ShieldCheck className="h-3 w-3" /> Security Transparency
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Audit the Routes
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Verify that our platform never uploads, stores, or processes files through hidden API endpoints.
              </p>
             
            </div>
          </div>
        </section>

   

        {/* Terminal Preview Section */}
        <section className="border-b border-border bg-surface-page-warm py-16 sm:py-20">
          <div className="container-default">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary mb-3">
                Public Routes
              </p>
              <h2 className="text-display-md font-bold tracking-tight">
                Every endpoint is documented
              </h2>
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                These are all the GET routes our API exposes. No POST /upload. No hidden endpoints.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Public Routes */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success text-xs font-bold">
                      ✓
                    </span>
                    Public Routes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {routes.map((route, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-md border border-border/50 bg-muted/30 p-3 text-sm font-mono"
                      >
                        <span className="inline-flex min-w-fit rounded-sm bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                          {route.method}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-foreground break-words">{route.path}</div>
                          <div className="text-xs text-muted-foreground mt-1">{route.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Blocked Routes */}
              <Card className="border-destructive/30 bg-destructive-soft/20">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs font-bold">
                      ✕
                    </span>
                    These Routes Don&apos;t Exist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {blockedRoutes.map((route, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm font-mono"
                      >
                        <span className="inline-flex min-w-fit rounded-sm bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                          {route.method}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-foreground break-words line-through opacity-60">{route.path}</div>
                          <div className="text-xs text-destructive mt-1">{route.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Verification Section */}
        <section className="border-b border-border py-16 sm:py-20">
          <div className="container-default">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 min-w-fit items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Verify it yourself
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      Right now. In 30 seconds. No signup needed.
                    </p>
                    <ol className="mt-4 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                      <li>Open your browser&apos;s DevTools (<kbd className="rounded border border-border bg-muted px-2 py-0.5 text-xs font-mono">F12</kbd>)</li>
                      <li>Go to the Network tab</li>
                      <li>Compress any file on this site</li>
                      <li>Watch the Network tab — you&apos;ll see zero POST requests with file content</li>
                      <li>Every claim above is verifiable with what you see</li>
                    </ol>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <Button variant="primary" asChild>
                        <Link href="/privacy/verify">
                          Run the Live Demo
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="secondary" asChild>
                        <a href="/privacy" target="_blank" rel="noreferrer">
                          Read Full Privacy Policy
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-b border-border bg-gradient-to-b from-background to-muted py-16 sm:py-20">
          <div className="container-default">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-display-md font-bold tracking-tight">
                Ready to compress?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                All our compression tools are free, no signup required, and fully verifiable.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row items-center justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/compress-pdf">
                    Compress PDF
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/compress-image">
                    Compress Image
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
