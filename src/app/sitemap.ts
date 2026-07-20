import type { MetadataRoute } from 'next'
import { allLandingSlugs } from '@/lib/landing-pages/data'
import { getAllPosts } from '@/lib/blog'

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://compress4.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://compress4.com'

const staticRoutes = [
  '',
  '/compress-pdf',
  '/compress-image',
  '/photo-signature',
  '/signature',
  '/image-to-pdf',
  '/pdf-to-image',
  '/crop-rotate',
  '/blog',
  '/faq',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/dpdp',
  '/cookies',
  '/privacy/verify',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : 0.9,
  }))

  const landingEntries: MetadataRoute.Sitemap = allLandingSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const posts = await getAllPosts()
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...landingEntries, ...blogEntries]
}
