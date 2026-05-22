import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Wordmark } from '@/components/brand/wordmark'
import { LangToggle } from '@/components/brand/lang-toggle'

const navLinks = [
  { href: '/compress-pdf', key: 'pdf' },
  { href: '/compress-image', key: 'image' },
  { href: '/photo-signature', key: 'photoSignature' },
  { href: '/blog', key: 'blog' },
  { href: '/faq', key: 'faq' },
] as const

export function SiteHeader() {
  const t = useTranslations('nav')
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container-wide flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            aria-label="Compress4 — home"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
          >
            <Wordmark size="md" />
          </Link>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href as never}
                    className="text-sm font-medium text-muted-foreground transition-colors duration-fast hover:text-foreground rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2 px-1 py-0.5"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LangToggle />
          <Button asChild variant="primary" size="sm">
            <Link href="/compress-pdf">{t('compressNow')}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
