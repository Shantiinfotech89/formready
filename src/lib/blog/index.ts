/**
 * Blog content layer — filesystem-based for v1, migrates to PostgreSQL `posts`
 * table in Batch 10 with the same shape.
 *
 * Reads `content/blog/*.md` files at build time. Each file's YAML frontmatter
 * carries the post metadata; the body is markdown rendered to HTML.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { marked, Renderer, type Tokens } from 'marked'

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export type BlogCategory =
  | 'how-to'
  | 'exam-specs'
  | 'visa-specs'
  | 'comparison'
  | 'manifesto'

export const categoryLabels: Record<BlogCategory, string> = {
  'how-to': 'How-To',
  'exam-specs': 'Exam Spec Guides',
  'visa-specs': 'Visa Spec Guides',
  comparison: 'Comparison',
  manifesto: 'Manifesto',
}

export interface BlogFrontmatter {
  title: string
  slug: string
  category: BlogCategory
  excerpt: string
  publishedAt: string  // ISO date
  updatedAt?: string
  author: string
  /** Tool slugs to feature at the bottom of the article. */
  relatedTools?: string[]
  /** Landing page slugs to feature at the bottom. */
  relatedPages?: string[]
  /** Reading time minutes — auto-computed if absent. */
  readingMinutes?: number
}

export interface BlogPost extends BlogFrontmatter {
  /** Rendered HTML body. */
  html: string
  /** Auto-extracted table of contents from H2/H3 headings. */
  toc: TocEntry[]
  /** Word count, used to estimate reading time. */
  wordCount: number
}

export interface BlogPostSummary extends BlogFrontmatter {
  readingMinutes: number
}

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

/* ─── Filesystem scan ───────────────────────────────────────────────────── */

async function listMarkdownFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR)
    return entries.filter((f) => f.endsWith('.md'))
  } catch {
    return []
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function buildRenderer(): { renderer: Renderer; toc: TocEntry[] } {
  const toc: TocEntry[] = []
  const renderer = new Renderer()
  const seen = new Set<string>()

  renderer.heading = ({ tokens, depth }: Tokens.Heading) => {
    const text = tokens.map((t) => ('text' in t ? t.text : '')).join('')
    let id = slugify(text)
    let suffix = 1
    while (seen.has(id)) {
      suffix++
      id = `${slugify(text)}-${suffix}`
    }
    seen.add(id)

    if (depth === 2 || depth === 3) {
      toc.push({ id, text, level: depth })
    }

    return `<h${depth} id="${id}">${text}</h${depth}>\n`
  }

  return { renderer, toc }
}

async function parseMarkdown(raw: string, fallbackSlug: string): Promise<BlogPost> {
  const parsed = matter(raw)
  const fm = parsed.data as Partial<BlogFrontmatter>

  if (!fm.title) throw new Error(`Missing 'title' in frontmatter for ${fallbackSlug}`)
  if (!fm.publishedAt) throw new Error(`Missing 'publishedAt' in frontmatter for ${fallbackSlug}`)
  if (!fm.category) throw new Error(`Missing 'category' in frontmatter for ${fallbackSlug}`)

  const slug = fm.slug ?? fallbackSlug
  const wordCount = parsed.content.split(/\s+/).filter(Boolean).length
  const readingMinutes = fm.readingMinutes ?? Math.max(1, Math.round(wordCount / 220))

  const { renderer, toc } = buildRenderer()
  const html = await marked.parse(parsed.content, { renderer, async: true })

  return {
    title: fm.title,
    slug,
    category: fm.category,
    excerpt: fm.excerpt ?? '',
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    author: fm.author ?? 'FormReady Team',
    relatedTools: fm.relatedTools ?? [],
    relatedPages: fm.relatedPages ?? [],
    readingMinutes,
    wordCount,
    html: typeof html === 'string' ? html : '',
    toc,
  }
}

/* ─── Public API ─────────────────────────────────────────────────────────── */

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const files = await listMarkdownFiles()
  const posts: BlogPostSummary[] = []
  for (const file of files) {
    const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8')
    const parsed = matter(raw)
    const fm = parsed.data as Partial<BlogFrontmatter>
    if (!fm.title || !fm.publishedAt || !fm.category) continue
    const wordCount = parsed.content.split(/\s+/).filter(Boolean).length
    posts.push({
      title: fm.title,
      slug: fm.slug ?? file.replace(/\.md$/, ''),
      category: fm.category,
      excerpt: fm.excerpt ?? '',
      publishedAt: fm.publishedAt,
      updatedAt: fm.updatedAt,
      author: fm.author ?? 'FormReady Team',
      relatedTools: fm.relatedTools,
      relatedPages: fm.relatedPages,
      readingMinutes: fm.readingMinutes ?? Math.max(1, Math.round(wordCount / 220)),
    })
  }
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const files = await listMarkdownFiles()
  for (const file of files) {
    const fileSlug = file.replace(/\.md$/, '')
    if (fileSlug !== slug) {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8')
      const fmSlug = (matter(raw).data as Partial<BlogFrontmatter>).slug
      if (fmSlug !== slug) continue
      return parseMarkdown(raw, fileSlug)
    }
    const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8')
    return parseMarkdown(raw, fileSlug)
  }
  return null
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((p) => p.slug)
}
