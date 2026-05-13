import { cn } from '@/lib/utils'
import type { TocEntry } from '@/lib/blog'

interface TableOfContentsProps {
  toc: TocEntry[]
  className?: string
}

export function TableOfContents({ toc, className }: TableOfContentsProps) {
  if (toc.length === 0) return null
  return (
    <nav aria-label="On this page" className={cn('text-sm', className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2 border-l-2 border-border pl-4">
        {toc.map((entry) => (
          <li
            key={entry.id}
            className={cn(entry.level === 3 && 'pl-3 text-[13px]')}
          >
            <a
              href={`#${entry.id}`}
              className="block text-muted-foreground transition-colors duration-fast hover:text-primary-press focus-visible:outline-none focus-visible:text-primary-press focus-visible:underline"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
