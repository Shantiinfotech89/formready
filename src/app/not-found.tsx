import Link from 'next/link'
import { ArrowRight, Compass, FileText, HelpCircle, Image as ImageIcon, UserSquare2 } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const POPULAR_TOOLS = [
  { href: '/compress-pdf', label: 'PDF Compressor', Icon: FileText, description: 'Hit any KB target. 50 MB max input.' },
  { href: '/compress-image', label: 'Image Compressor', Icon: ImageIcon, description: 'JPG · PNG · HEIC · WebP.' },
  { href: '/photo-signature', label: 'Exam & Visa Photo', Icon: UserSquare2, description: 'SSC, UPSC, NEET, US, UK, Schengen.' },
]

const POPULAR_GUIDES = [
  { href: '/ssc-cgl-photo-size', label: 'SSC CGL Photo Size' },
  { href: '/upsc-cse-photo-size', label: 'UPSC CSE Photo Size' },
  { href: '/us-visa-photo-size', label: 'US Visa Photo Size' },
  { href: '/compress-pdf-under-100kb', label: 'Compress PDF under 100 KB' },
]

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-16 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="warning" className="num mb-4">
                <Compass className="h-3 w-3" /> 404
              </Badge>
              <p className="num text-display-2xl font-bold tracking-tighter text-primary leading-none">
                404
              </p>
              <h1 className="mt-6 text-display-md font-bold tracking-tight">
                That page isn&apos;t here.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                The link you followed may be old, mistyped, or the page may have moved. Here&apos;s where most people go from here.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="glow" size="lg">
                  <Link href="/">
                    Back to homepage
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/faq">
                    <HelpCircle className="h-4 w-4" />
                    Open the FAQ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-page-warm">
          <div className="container-default py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Popular tools
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {POPULAR_TOOLS.map((t) => (
                  <Card key={t.href} variant="default" className="transition-[transform,box-shadow] duration-base hover:-translate-y-0.5 hover:shadow-md">
                    <Link
                      href={t.href}
                      className="block focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                    >
                      <CardContent className="p-5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-press">
                          <t.Icon className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                        <p className="text-sm font-semibold leading-tight">{t.label}</p>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {t.description}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>

              <h2 className="mb-6 mt-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Popular guides
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {POPULAR_GUIDES.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      className="group inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors duration-fast hover:border-primary/40 hover:text-primary-press focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus"
                    >
                      <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
