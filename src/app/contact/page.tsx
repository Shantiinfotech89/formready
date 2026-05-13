import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Bug,
  HelpCircle,
  Mail,
  MessageSquare,
  Newspaper,
  ScrollText,
  Sparkles,
  ShieldAlert,
} from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the right inbox at FormReady — support, security, press, partnerships, billing, legal, or just to say hi.',
  alternates: { canonical: '/contact' },
}

interface ContactRoute {
  email: string
  label: string
  description: string
  Icon: typeof Mail
  responseTime: string
}

const routes: ContactRoute[] = [
  {
    email: 'hello@formready.in',
    label: 'General',
    description: 'Anything that doesn\'t fit elsewhere — saying hi, suggestions, partnerships.',
    Icon: Mail,
    responseTime: '2 business days',
  },
  {
    email: 'support@formready.in',
    label: 'Support',
    description: 'A tool isn\'t working, you\'re stuck, or your form rejected something we said would work.',
    Icon: HelpCircle,
    responseTime: '1 business day for Pro · 3 days for free',
  },
  {
    email: 'security@formready.in',
    label: 'Security',
    description: 'Vulnerabilities, suspected breaches, responsible-disclosure reports. Please disclose privately first.',
    Icon: ShieldAlert,
    responseTime: 'Same day for confirmed vulnerabilities',
  },
  {
    email: 'bugs@formready.in',
    label: 'Bugs',
    description: 'Something\'s broken on our side. Include the page, the steps, the browser, and a screenshot if possible.',
    Icon: Bug,
    responseTime: '2 business days',
  },
  {
    email: 'billing@formready.in',
    label: 'Billing',
    description: 'Pro subscription questions, refunds, GST invoices, payment failures.',
    Icon: ScrollText,
    responseTime: '1 business day',
  },
  {
    email: 'press@formready.in',
    label: 'Press',
    description: 'Interview requests, quotes, embargoed press kit. We\'ll respond with available materials.',
    Icon: Newspaper,
    responseTime: '3 business days',
  },
  {
    email: 'grievance@formready.in',
    label: 'Privacy grievance',
    description: 'Formal grievance under the DPDP Act 2023. Goes to our designated Grievance Officer.',
    Icon: MessageSquare,
    responseTime: '7 working days for acknowledgement, 30 days for resolution',
  },
]

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-card via-primary/[0.02] to-background">
          <div className="container-default py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="info" className="mb-4">
                <Sparkles className="h-3 w-3" /> Contact
              </Badge>
              <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight">
                Get in touch
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                One inbox per topic — pick the one that fits and we&apos;ll respond from a real person within the time listed.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-page-warm">
          <div className="container-default py-16">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {routes.map((r) => (
                  <Card
                    key={r.email}
                    className="transition-[transform,box-shadow] duration-base ease-out-strong hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <a
                      href={`mailto:${r.email}`}
                      className="block focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                    >
                      <CardContent className="space-y-3 p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-press">
                            <r.Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <Badge variant="neutral" className="text-[10px]">
                            ~{r.responseTime}
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold">{r.label}</h3>
                        <p className="text-sm leading-snug text-muted-foreground">
                          {r.description}
                        </p>
                        <p className="num inline-flex items-center gap-1 text-sm font-medium text-primary-press">
                          <Mail className="h-3 w-3" />
                          {r.email}
                        </p>
                      </CardContent>
                    </a>
                  </Card>
                ))}
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <Card variant="warm">
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold">Before emailing support…</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You&apos;ll likely find a faster answer in our <Link href="/faq" className="font-medium text-primary-press underline-offset-4 hover:underline">FAQ</Link> (18 common questions) or in our{' '}
                      <Link href="/blog" className="font-medium text-primary-press underline-offset-4 hover:underline">blog</Link> (how-tos for hitting form portal specs).
                    </p>
                    <Button asChild variant="ghost" size="sm" className="mt-3">
                      <Link href="/faq">
                        Browse FAQ
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card variant="warm">
                  <CardContent className="p-6">
                    <h3 className="text-base font-semibold">Mailing address</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      [LEGAL ENTITY NAME — e.g., FormReady Technologies Pvt Ltd]<br />
                      [REGISTERED ADDRESS, INDIA]<br />
                      <span className="num">CIN: [CORPORATE IDENTIFICATION NUMBER]</span>
                    </p>
                    <p className="mt-3 text-xs italic text-muted-foreground">
                      ⚠ Placeholder — real address goes here pre-launch.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: 'https://formready.in/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'FormReady',
              email: 'hello@formready.in',
              url: 'https://formready.in',
            },
          }),
        }}
      />
    </>
  )
}
