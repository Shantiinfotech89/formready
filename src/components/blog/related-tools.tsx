import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { findLandingPage } from '@/lib/landing-pages/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const TOOL_LABELS: Record<string, { label: string; description: string }> = {
  '/compress-pdf': {
    label: 'PDF Compression',
    description: 'Hit any KB target. 50 MB max input.',
  },
  '/compress-image': {
    label: 'Image Compression',
    description: 'JPG · PNG · HEIC · WebP. Smart quality + dimension.',
  },
  '/photo-signature': {
    label: 'Exam & Visa Photo',
    description: 'Pre-set for SSC, UPSC, NEET, US, UK, Schengen.',
  },
  '/signature': {
    label: 'Signature Resizer',
    description: 'Down to 5 KB. Background cleanup included.',
  },
  '/image-to-pdf': {
    label: 'Image to PDF',
    description: 'Combine 1–20 images into one PDF.',
  },
  '/pdf-to-image': {
    label: 'PDF to Image',
    description: 'Render PDF pages as JPG/PNG/WebP.',
  },
  '/crop-rotate': {
    label: 'Crop & Rotate',
    description: 'Pre-compression image editor.',
  },
}

interface RelatedToolsProps {
  toolPaths?: string[]
  pageSlugs?: string[]
}

export function RelatedToolsStrip({ toolPaths = [], pageSlugs = [] }: RelatedToolsProps) {
  const tools = toolPaths
    .map((path) => ({ path, ...TOOL_LABELS[path] }))
    .filter((t) => t.label)

  const pages = pageSlugs
    .map((slug) => findLandingPage(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (tools.length === 0 && pages.length === 0) return null

  return (
    <div className="space-y-6">
      {tools.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Try these tools
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Card
                key={t.path}
                variant="default"
                className="transition-[transform,box-shadow] duration-base hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link
                  href={t.path}
                  className="block focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                >
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold leading-tight">{t.label}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">
                      {t.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-press">
                      Open
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
      {pages.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Related guides
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <Card
                key={p.slug}
                variant="default"
                className="transition-[transform,box-shadow] duration-base hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link
                  href={`/${p.slug}`}
                  className="block focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                >
                  <CardContent className="p-4">
                    {p.saffron && (
                      <Badge variant="tactical" className="mb-2 text-[10px]">
                        Indian exam
                      </Badge>
                    )}
                    <p className="text-sm font-semibold leading-tight">{p.h1}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-press">
                      Open
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
