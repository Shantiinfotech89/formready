/**
 * Programmatic SEO landing page schema.
 *
 * Each landing page is one row of this shape — generates one URL via the
 * /[slug]/page.tsx template. Currently in TypeScript (`./data.ts`) for v0;
 * migrates to PostgreSQL `landing_pages` table in Batch 10 with the same shape.
 */

export type LandingCategory =
  | 'exam-photo'
  | 'exam-signature'
  | 'exam-combined'
  | 'visa-photo'
  | 'pdf-size'
  | 'image-size'
  | 'format-conversion'
  | 'document-specific'
  | 'use-case'

export type LandingToolType = 'pdf' | 'image' | 'photo-signature' | 'signature'

export interface LandingFaq {
  q: string
  a: string
}

export interface LandingPage {
  slug: string
  category: LandingCategory
  toolType: LandingToolType

  /** Saffron-tactical bar + H1 underline (Indian-keyword pages only — see BRAND_GUIDELINES §15). */
  saffron: boolean

  // SEO meta
  metaTitle: string         // ≤ 60 chars
  metaDescription: string   // ≤ 155 chars

  // Hero
  h1: string
  /** Substring of h1 to underline with saffron tint. Should match exactly. Only used when saffron=true. */
  h1Keyword?: string
  lede: string

  // Tool prefill
  /** When set, references a key in `presets/photo.ts`. */
  presetSlug?: string
  /** Pre-fill the KB-target input. */
  targetKb?: number

  // Optional spec callout
  specChip?: string
  sourceUrl?: string
  sourceLabel?: string
  verifiedAt?: string  // ISO date

  // FAQ (FAQPage schema markup)
  faqs: LandingFaq[]

  // Internal linking
  relatedSlugs: string[]
}
