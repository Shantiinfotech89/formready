import type { MetadataRoute } from 'next'

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://formready.in'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://compress4.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/design-system', '/admin', '/account', '/pro', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
