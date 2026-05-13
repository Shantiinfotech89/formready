/**
 * Photo + signature presets for exam and visa pages.
 *
 * MVP set — will be replaced by the PostgreSQL `specs` table when Batch 10
 * (admin spec editor) lands. Sourced from official notification PDFs / consulate
 * websites and dated; re-verify quarterly.
 *
 * Note: each preset includes BOTH photo and signature specs so a single page
 * can offer the combined exam pack ("photo + signature" download).
 */

export interface ImageSpec {
  width: number
  height: number
  minKb?: number
  maxKb: number
  format: 'jpg' | 'png'
  background?: 'white' | 'plain-light' | 'off-white'
}

export interface PhotoPreset {
  slug: string
  category: 'exam' | 'visa' | 'document'
  name: string
  shortLabel: string
  description: string
  photo: ImageSpec
  signature?: ImageSpec
  sourceUrl: string
  sourceLabel: string
  /** ISO date — re-verify quarterly. */
  verifiedAt: string
}

export const examPresets: PhotoPreset[] = [
  {
    slug: 'ssc-cgl',
    category: 'exam',
    name: 'SSC CGL',
    shortLabel: 'SSC CGL',
    description: 'Staff Selection Commission — Combined Graduate Level',
    photo: { width: 200, height: 230, minKb: 20, maxKb: 50, format: 'jpg', background: 'white' },
    signature: { width: 140, height: 60, minKb: 10, maxKb: 20, format: 'jpg', background: 'white' },
    sourceUrl: 'https://ssc.nic.in',
    sourceLabel: 'ssc.nic.in',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'upsc-cse',
    category: 'exam',
    name: 'UPSC Civil Services',
    shortLabel: 'UPSC CSE',
    description: 'Union Public Service Commission — Civil Services Examination',
    photo: { width: 350, height: 350, maxKb: 300, format: 'jpg', background: 'white' },
    signature: { width: 350, height: 350, maxKb: 300, format: 'jpg', background: 'white' },
    sourceUrl: 'https://upsc.gov.in',
    sourceLabel: 'upsc.gov.in',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'neet-ug',
    category: 'exam',
    name: 'NEET UG',
    shortLabel: 'NEET UG',
    description: 'National Eligibility cum Entrance Test (Undergraduate)',
    photo: { width: 200, height: 230, minKb: 10, maxKb: 200, format: 'jpg', background: 'white' },
    signature: { width: 140, height: 60, minKb: 4, maxKb: 30, format: 'jpg', background: 'white' },
    sourceUrl: 'https://neet.nta.nic.in',
    sourceLabel: 'neet.nta.nic.in',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'jee-main',
    category: 'exam',
    name: 'JEE Main',
    shortLabel: 'JEE Main',
    description: 'Joint Entrance Examination — Main',
    photo: { width: 200, height: 230, minKb: 10, maxKb: 200, format: 'jpg', background: 'white' },
    signature: { width: 140, height: 60, minKb: 4, maxKb: 30, format: 'jpg', background: 'white' },
    sourceUrl: 'https://jeemain.nta.nic.in',
    sourceLabel: 'jeemain.nta.nic.in',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'ibps-po',
    category: 'exam',
    name: 'IBPS PO',
    shortLabel: 'IBPS PO',
    description: 'Institute of Banking Personnel Selection — Probationary Officer',
    photo: { width: 200, height: 230, minKb: 20, maxKb: 50, format: 'jpg', background: 'white' },
    signature: { width: 140, height: 60, minKb: 10, maxKb: 20, format: 'jpg', background: 'white' },
    sourceUrl: 'https://ibps.in',
    sourceLabel: 'ibps.in',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'gate',
    category: 'exam',
    name: 'GATE',
    shortLabel: 'GATE',
    description: 'Graduate Aptitude Test in Engineering',
    photo: { width: 240, height: 320, minKb: 5, maxKb: 200, format: 'jpg', background: 'white' },
    signature: { width: 250, height: 80, minKb: 5, maxKb: 150, format: 'jpg', background: 'white' },
    sourceUrl: 'https://gate.iitkgp.ac.in',
    sourceLabel: 'gate.iitkgp.ac.in',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'cuet',
    category: 'exam',
    name: 'CUET',
    shortLabel: 'CUET',
    description: 'Common University Entrance Test',
    photo: { width: 200, height: 230, minKb: 10, maxKb: 200, format: 'jpg', background: 'white' },
    signature: { width: 140, height: 60, minKb: 4, maxKb: 30, format: 'jpg', background: 'white' },
    sourceUrl: 'https://cuet.samarth.ac.in',
    sourceLabel: 'cuet.samarth.ac.in',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'cat',
    category: 'exam',
    name: 'CAT',
    shortLabel: 'CAT',
    description: 'Common Admission Test (IIM)',
    photo: { width: 1200, height: 1200, minKb: 80, maxKb: 1000, format: 'jpg', background: 'white' },
    sourceUrl: 'https://iimcat.ac.in',
    sourceLabel: 'iimcat.ac.in',
    verifiedAt: '2026-04-01',
  },
]

export const visaPresets: PhotoPreset[] = [
  {
    slug: 'us-visa',
    category: 'visa',
    name: 'US Visa (B1/B2, F1, etc.)',
    shortLabel: 'US Visa',
    description: 'United States non-immigrant visa photo. 600×600 px, head height 50–69%.',
    photo: { width: 600, height: 600, maxKb: 240, format: 'jpg', background: 'white' },
    sourceUrl: 'https://travel.state.gov',
    sourceLabel: 'travel.state.gov',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'uk-visa',
    category: 'visa',
    name: 'UK Visa (Standard Visitor)',
    shortLabel: 'UK Visa',
    description: 'United Kingdom Standard Visitor visa. 45×35 mm, plain off-white background.',
    photo: { width: 531, height: 413, minKb: 45, maxKb: 240, format: 'jpg', background: 'off-white' },
    sourceUrl: 'https://gov.uk/standard-visitor-visa',
    sourceLabel: 'gov.uk',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'schengen-visa',
    category: 'visa',
    name: 'Schengen Visa',
    shortLabel: 'Schengen',
    description: 'Schengen short-stay visa. 35×45 mm, plain light background.',
    photo: { width: 413, height: 531, maxKb: 240, format: 'jpg', background: 'plain-light' },
    sourceUrl: 'https://schengenvisainfo.com',
    sourceLabel: 'schengenvisainfo.com',
    verifiedAt: '2026-04-01',
  },
  {
    slug: 'canada-visa',
    category: 'visa',
    name: 'Canada Visa',
    shortLabel: 'Canada',
    description: 'Canada visitor / work / study visa. 35×45 mm, plain white background.',
    photo: { width: 420, height: 540, maxKb: 240, format: 'jpg', background: 'white' },
    sourceUrl: 'https://canada.ca',
    sourceLabel: 'canada.ca',
    verifiedAt: '2026-04-01',
  },
]

export const allPresets = [...examPresets, ...visaPresets]

export function findPreset(slug: string): PhotoPreset | undefined {
  return allPresets.find((p) => p.slug === slug)
}
