import type { Metadata, Viewport } from 'next'
import { Inter, Hind, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { CookieBanner } from '@/components/layout/cookie-banner'
import { BrowserCompatCheck } from '@/components/layout/browser-compat-check'
import { Analytics } from '@/components/layout/analytics'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const hind = Hind({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FormReady — Get your documents form-ready',
    template: '%s · FormReady',
  },
  description:
    'Privacy-first PDF and image compression to exact KB. All compression happens in your browser — your file never leaves your device.',
  metadataBase: new URL('https://formready.in'),
  applicationName: 'FormReady',
  authors: [{ name: 'FormReady' }],
  keywords: [
    'PDF compression',
    'image compression',
    'compress photo',
    'exam photo size',
    'visa photo size',
    'privacy first',
    'browser compression',
  ],
  openGraph: {
    type: 'website',
    siteName: 'FormReady',
    title: 'FormReady — Get your documents form-ready',
    description:
      'Type the exact KB. We hit it. Your file never leaves your device.',
    url: '/',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormReady — Get your documents form-ready',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.webmanifest',
  // Raster icons (32x32 favicon, 180x180 apple-touch) are auto-registered
  // from `app/icon.tsx` and `app/apple-icon.tsx` at build time. We only need
  // to add the SVG entry here so browsers that prefer vector get it first.
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FormReady',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={cn(inter.variable, hind.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          'min-h-screen bg-background text-foreground antialiased',
          locale === 'hi' ? 'font-devanagari' : 'font-sans',
        )}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <BrowserCompatCheck />
          <CookieBanner />
          <Toaster />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
