import { cn } from '@/lib/utils'

interface ArticleProseProps {
  html: string
  className?: string
}

/**
 * Typography wrapper for blog article HTML. Pairs with marked output.
 * Tailwind-prose-style without the dep — every selector is scoped to .article-prose.
 */
export function ArticleProse({ html, className }: ArticleProseProps) {
  return (
    <div
      className={cn('article-prose', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
