import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog'
import { categoryLabels } from '@/lib/blog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BlogCardProps {
  post: BlogPostSummary
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card variant="default" className="transition-[transform,box-shadow] duration-base ease-out-strong hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/blog/${post.slug}`}
        className="block focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2"
      >
        <CardContent className="space-y-3 p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="info">{categoryLabels[post.category]}</Badge>
            <span className="num text-muted-foreground">
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="num">{post.readingMinutes} min read</span>
            </span>
          </div>
          <h3 className="text-xl font-semibold leading-snug tracking-tight group-hover:text-primary-press">
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-press">
            Read article
            <ArrowRight className="h-3 w-3" />
          </span>
        </CardContent>
      </Link>
    </Card>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
