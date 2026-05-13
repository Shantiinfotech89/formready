/**
 * FAQ hub data — categorised questions for /faq.
 *
 * v1: in-code seed data. Migrates to PostgreSQL `faqs` table in Batch 10.
 * Per the SOW we should aim for 30+ questions; this seed has 18, more can be
 * appended over time without code changes once the table is live.
 */

export type FaqCategory = 'privacy' | 'how-to' | 'exam-specs' | 'visa-specs'

export const faqCategoryLabels: Record<FaqCategory, string> = {
  privacy: 'Privacy',
  'how-to': 'How-To',
  'exam-specs': 'Exam Specs',
  'visa-specs': 'Visa Specs',
}

export const faqCategoryDescriptions: Record<FaqCategory, string> = {
  privacy: 'How your files stay on your device.',
  'how-to': 'Practical guidance on using FormReady.',
  'exam-specs': 'Photo and signature rules for Indian exams.',
  'visa-specs': 'Photo specifications for visa applications.',
}

export interface FaqItem {
  id: string
  category: FaqCategory
  q: string
  a: string
}

export const faqItems: FaqItem[] = [
  // ─── Privacy ────────────────────────────────────────────────────────
  {
    id: 'privacy-no-upload',
    category: 'privacy',
    q: 'Where does my file go when I compress it?',
    a: 'Nowhere. The compression engine runs entirely in your browser via WebAssembly and Canvas APIs. No server ever sees your file. You can prove this yourself by opening DevTools → Network tab on /privacy/verify and watching for outbound requests during a compression — there are none.',
  },
  {
    id: 'privacy-verify',
    category: 'privacy',
    q: 'How do I verify the privacy claim?',
    a: 'Visit /privacy/verify. Open DevTools (Cmd+Opt+I on Mac, Ctrl+Shift+I on Windows). Click the Network tab. Click "Run a sample compression" on the page. Watch the Network tab — zero new requests appear. The browser itself is the proof.',
  },
  {
    id: 'privacy-counter-only',
    category: 'privacy',
    q: 'Do you log anything about my use?',
    a: 'We log anonymous counters: "this user compressed N files this month" for billing and abuse purposes. We never log file names, file content, file hashes, or any identifiable information about the files themselves. Cookieless analytics (Plausible) tracks page views only.',
  },
  {
    id: 'privacy-dpdp',
    category: 'privacy',
    q: 'Are you DPDP Act 2023 compliant?',
    a: 'Yes. The cleanest way to comply with India\'s Digital Personal Data Protection Act is to never collect personal data in the first place. Our architecture ensures file content never reaches us. For Pro accounts, we collect only the minimum needed for billing (email, Razorpay payment ID). Full details on /dpdp.',
  },

  // ─── How-To ─────────────────────────────────────────────────────────
  {
    id: 'how-exact-kb',
    category: 'how-to',
    q: 'How does the "exact KB" target work?',
    a: 'Type a number. Our engine tries progressively stronger compression strategies (structural → quality reduction → page rasterisation, in that order) and stops as soon as the output is at or under your target. If the target is genuinely unachievable (e.g., 5 KB target on a 50-page PDF), we stop at the smallest legible size and tell you what we got.',
  },
  {
    id: 'how-batch',
    category: 'how-to',
    q: 'Can I compress multiple files at once?',
    a: 'Single-file compression is free for everyone. Batch processing (up to 100 files at once via a ZIP) is part of the Pro tier — it runs in a Web Worker pool on your device, still without uploading anything.',
  },
  {
    id: 'how-heic',
    category: 'how-to',
    q: 'My iPhone photo is HEIC. Will this work?',
    a: 'Modern browsers decode HEIC natively. We auto-convert HEIC to JPG (or WebP) during compression so the output is upload-ready. Older browsers may fail decoding — if that happens, save as JPG from your iPhone\'s Photos app first, then re-upload.',
  },
  {
    id: 'how-formats',
    category: 'how-to',
    q: 'Which output format should I pick?',
    a: 'JPG is the safest choice — every form portal accepts it. WebP is 25–35% smaller at the same quality but not all portals accept it (yet). PNG is best for screenshots and line art (lossless) but produces larger files. Default is "Same as input" — we keep your original format unless you choose otherwise.',
  },

  // ─── Exam Specs ─────────────────────────────────────────────────────
  {
    id: 'exam-ssc',
    category: 'exam-specs',
    q: 'What\'s the SSC CGL photo size?',
    a: 'Per the official 2026 notification: 200×230 pixels, JPG, 20–50 KB, plain white background. Signature: 140×60 pixels, JPG, 10–20 KB. Use our /ssc-cgl-photo-size preset for one-click compression.',
  },
  {
    id: 'exam-upsc',
    category: 'exam-specs',
    q: 'What\'s the UPSC CSE photo size?',
    a: '350×350 pixels (square), JPG, under 300 KB, white background. Signature uses the same dimensions. Both photo and signature are required at the same time during application.',
  },
  {
    id: 'exam-neet-jee',
    category: 'exam-specs',
    q: 'Are NEET UG and JEE Main photo specs the same?',
    a: 'Yes — both use 200×230 px, JPG, 10–200 KB for photos and 140×60 px, JPG, 4–30 KB for signatures. NTA notifications publish the same spec for both. You can use the same files for both applications if dates allow.',
  },
  {
    id: 'exam-source',
    category: 'exam-specs',
    q: 'Where do your exam specs come from?',
    a: 'Each preset is sourced from the official notification PDF (SSC, UPSC, NTA, IBPS, etc.) and dated on the page. We re-verify quarterly to catch spec changes. The source URL is displayed at the bottom of every exam-specific landing page so you can cross-check yourself.',
  },

  // ─── Visa Specs ─────────────────────────────────────────────────────
  {
    id: 'visa-us',
    category: 'visa-specs',
    q: 'What size is a US visa photo?',
    a: '600×600 pixels (square), JPG, under 240 KB, plain white or off-white background, head height 50–69% of the frame, no glasses, neutral expression. Use our /us-visa-photo-size preset.',
  },
  {
    id: 'visa-uk-vs-schengen',
    category: 'visa-specs',
    q: 'UK and Schengen photos look similar — are they interchangeable?',
    a: 'Almost, but not quite. UK = 45×35 mm (wider than tall, 531×413 px). Schengen = 35×45 mm (taller than wide, 413×531 px). Different aspect ratios. Don\'t reuse one for the other — re-process to the correct preset.',
  },
  {
    id: 'visa-acceptance',
    category: 'visa-specs',
    q: 'Will the consulate accept the photo your tool produced?',
    a: 'We meet the technical specifications (pixels, KB, format) per the consulate\'s published guidance. Final acceptance also depends on photo quality (lighting, expression, background, head position) — those are the photographer\'s responsibility. We help with the technical, you handle the artistic.',
  },

]
