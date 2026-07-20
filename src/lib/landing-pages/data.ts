import type { LandingPage } from './types'

/**
 * Seed landing pages — 10 pages for Batch 3 smoke test.
 *
 * Smoke-test mix per the plan:
 *   • 5 Indian-exam photo pages (SSC CGL, UPSC CSE, NEET UG, IBPS PO, JEE Main)
 *   • 3 visa pages (US, UK, Schengen)
 *   • 2 size-target pages (PDF < 100KB, image < 50KB)
 *
 * Once Batch 10 lands, these move to a PostgreSQL `landing_pages` table with
 * the same shape; this file becomes the seed migration script.
 */

export const landingPages: LandingPage[] = [
  // ─── Indian exam photos (saffron tactical) ─────────────────────────────────
  {
    slug: 'ssc-cgl-photo-size',
    category: 'exam-photo',
    toolType: 'photo-signature',
    saffron: true,
    metaTitle: 'SSC CGL Photo Size — 200×230 px, 20–50 KB · Compress4',
    metaDescription:
      'Resize your SSC CGL photo to the exact 200×230 px and 20–50 KB the official form demands. Plus signature 140×60 px, 10–20 KB. All in your browser.',
    h1: 'SSC CGL Photo Size',
    h1Keyword: 'Photo Size',
    lede:
      'Staff Selection Commission (SSC) CGL applications require a recent passport-size photo at 200×230 pixels and between 20–50 KB, plus a signature at 140×60 pixels between 10–20 KB. Drop your photo and signature below — we\'ll center-crop, resize, and compress them to spec, all on your device. No upload.',
    presetSlug: 'ssc-cgl',
    specChip: 'Updated for SSC CGL 2026 notification',
    sourceUrl: 'https://ssc.nic.in',
    sourceLabel: 'ssc.nic.in',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'What is the exact photo size for SSC CGL?',
        a: 'Per the official 2026 notification: 200×230 pixels (3.5×4.5 cm), JPG format, file size between 20 and 50 KB, with a plain white background. Recent (within 6 months), full-face, looking directly at the camera, no glasses or headwear unless religiously required.',
      },
      {
        q: 'What is the SSC CGL signature size?',
        a: '140×60 pixels, JPG format, file size between 10 and 20 KB. Sign on plain white paper using black ink, photograph or scan, then upload here. Our signature mode auto-cleans the background and compresses to spec.',
      },
      {
        q: 'My photo is bigger than 200×230 pixels. Will it work?',
        a: 'Yes — we automatically center-crop and resize to exactly 200×230 px. The center of your photo becomes the center of the output, so make sure your face is centered in the original.',
      },
      {
        q: 'Why does SSC reject some photos?',
        a: 'Common reasons: photo not within size range, wrong dimensions, busy background (we recommend plain white), face not clearly visible, glasses with glare, smiling with teeth showing, or wearing headwear. Our tool ensures the technical specs are met — but quality photography is on you.',
      },
      {
        q: 'Is my photo safe?',
        a: 'Your photo never leaves your device. All resizing and compression happens in your browser. Open DevTools → Network tab to see zero outbound file uploads.',
      },
    ],
    relatedSlugs: ['upsc-cse-photo-size', 'ibps-po-photo-size', 'compress-image-under-50kb'],
  },

  {
    slug: 'upsc-cse-photo-size',
    category: 'exam-photo',
    toolType: 'photo-signature',
    saffron: true,
    metaTitle: 'UPSC CSE Photo Size — 350×350 px, max 300 KB · Compress4',
    metaDescription:
      'Resize your UPSC Civil Services photo to 350×350 px, under 300 KB. JPG with white background. Free, exact, in-browser. No upload.',
    h1: 'UPSC CSE Photo Size',
    h1Keyword: 'Photo Size',
    lede:
      'The Union Public Service Commission (UPSC) Civil Services Examination requires a 350×350 pixel JPG photo, file size up to 300 KB, with a white background. Drop your photo below — we\'ll auto-crop, resize, and compress it on your device.',
    presetSlug: 'upsc-cse',
    specChip: 'Updated for UPSC CSE 2026 notification',
    sourceUrl: 'https://upsc.gov.in',
    sourceLabel: 'upsc.gov.in',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'What is the photo specification for UPSC CSE?',
        a: '350×350 pixels (square), JPG format, file size under 300 KB, plain white background. The same dimensions apply for the signature upload.',
      },
      {
        q: 'Can I use a colour photo for UPSC?',
        a: 'Yes — colour or black-and-white both work, as long as the face is clearly visible. Most candidates use colour.',
      },
      {
        q: 'My signature is wider than tall. Will it fit 350×350?',
        a: 'Our tool resizes any signature to 350×350 by center-cropping. If your signature is much wider than tall, the output may have white space at top and bottom — this is acceptable for UPSC.',
      },
      {
        q: 'How recent should the photo be?',
        a: 'UPSC requires the photo be taken within the last six months from the date of application. Avoid old or heavily-edited photos.',
      },
    ],
    relatedSlugs: ['ssc-cgl-photo-size', 'compress-image-under-100kb', 'ibps-po-photo-size'],
  },

  {
    slug: 'neet-ug-photo-size',
    category: 'exam-photo',
    toolType: 'photo-signature',
    saffron: true,
    metaTitle: 'NEET UG Photo Size — 200×230 px, 10–200 KB · Compress4',
    metaDescription:
      'NEET UG photo: 200×230 px, 10–200 KB. Signature: 140×60 px, 4–30 KB. Drop your image, get exact size, in your browser. No upload.',
    h1: 'NEET UG Photo Size',
    h1Keyword: 'Photo Size',
    lede:
      'NEET UG (National Eligibility cum Entrance Test) applications require a passport-size photo at 200×230 pixels with file size between 10 and 200 KB, plus a signature 140×60 pixels between 4 and 30 KB. JPG format. White background. Drop yours below — we\'ll make it spec-correct in your browser.',
    presetSlug: 'neet-ug',
    specChip: 'Updated for NEET UG 2026 (NTA notification)',
    sourceUrl: 'https://neet.nta.nic.in',
    sourceLabel: 'neet.nta.nic.in',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'What if my signature is in pencil or light blue ink?',
        a: 'NEET UG requires a black or dark blue ink signature on white paper. Light pencil signatures may not survive our threshold-cleanup step (which whitens light pixels). Re-sign with black ink and re-upload.',
      },
      {
        q: 'Can I upload a postcard-size photo?',
        a: 'No — NEET UG is strict about 200×230 px passport-style. Postcard-size (4×6 inch ≈ 1200×1800 px) will be rejected even after auto-resize because the aspect ratio is wrong. Re-take in passport orientation.',
      },
      {
        q: 'Why is the KB range so wide (10–200)?',
        a: 'NTA accepts a range to allow varying photo quality. 10 KB is the floor (below it the photo would be unreadably blurry); 200 KB is the ceiling. Our default targets the middle of the range for best safety.',
      },
      {
        q: 'Is my photo private?',
        a: 'Yes. Compression runs in your browser. Visit /privacy/verify and watch DevTools Network tab show zero outbound requests during compression.',
      },
    ],
    relatedSlugs: ['jee-main-photo-size', 'cuet-photo-size', 'compress-image-under-50kb'],
  },

  {
    slug: 'ibps-po-photo-size',
    category: 'exam-photo',
    toolType: 'photo-signature',
    saffron: true,
    metaTitle: 'IBPS PO Photo Size — 200×230 px, 20–50 KB · Compress4',
    metaDescription:
      'IBPS PO photo: 200×230 px, 20–50 KB. Signature: 140×60 px, 10–20 KB. Compress and resize in your browser. No upload.',
    h1: 'IBPS PO Photo Size',
    h1Keyword: 'Photo Size',
    lede:
      'Institute of Banking Personnel Selection (IBPS) Probationary Officer applications require a 200×230 px passport-style photo at 20–50 KB plus a signature 140×60 px at 10–20 KB. Same as SSC. Drop yours below.',
    presetSlug: 'ibps-po',
    specChip: 'Updated for IBPS PO 2026 notification',
    sourceUrl: 'https://ibps.in',
    sourceLabel: 'ibps.in',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'Are IBPS PO and SSC CGL photo specs the same?',
        a: 'Yes — both require 200×230 px photos at 20–50 KB and 140×60 px signatures at 10–20 KB. If you applied for one with a compliant photo, the same one usually works for the other (within the 6-month freshness window).',
      },
      {
        q: 'Can I use the same photo for IBPS PO and IBPS Clerk?',
        a: 'Yes — IBPS Clerk and IBPS RRB share the same photo and signature specifications. Upload the same file across all three.',
      },
      {
        q: 'My photo is from 2024. Acceptable?',
        a: 'IBPS specifications require recent (within 6 months) photos. A photo from over a year ago risks rejection. Re-take if in doubt.',
      },
      {
        q: 'Photo background — strict on white?',
        a: 'IBPS recommends plain white, but plain off-white or light-coloured backgrounds are usually accepted as long as your face is clearly visible. Avoid busy backgrounds (curtains, walls with patterns, outdoor scenes).',
      },
    ],
    relatedSlugs: ['ssc-cgl-photo-size', 'gate-photo-size', 'compress-image-under-50kb'],
  },

  {
    slug: 'jee-main-photo-size',
    category: 'exam-photo',
    toolType: 'photo-signature',
    saffron: true,
    metaTitle: 'JEE Main Photo Size — 200×230 px, 10–200 KB · Compress4',
    metaDescription:
      'JEE Main photo: 200×230 px, 10–200 KB. Signature: 140×60 px, 4–30 KB. Free, instant, in-browser. No upload.',
    h1: 'JEE Main Photo Size',
    h1Keyword: 'Photo Size',
    lede:
      'JEE Main (Joint Entrance Examination — Main) requires a passport-style photo at 200×230 pixels between 10 and 200 KB, plus a signature 140×60 px between 4 and 30 KB. JPG format. Drop both below — we\'ll resize and compress them locally in your browser.',
    presetSlug: 'jee-main',
    specChip: 'Updated for JEE Main 2026 (NTA notification)',
    sourceUrl: 'https://jeemain.nta.nic.in',
    sourceLabel: 'jeemain.nta.nic.in',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'JEE Main accepts JPG only, right?',
        a: 'Yes — only JPG/JPEG files are accepted. PNG, HEIC, WebP will be rejected. Our tool outputs JPG by default for this preset.',
      },
      {
        q: 'My passport-size photo is colour. JEE wants colour or B&W?',
        a: 'Colour is preferred. Black-and-white may be accepted but is less common. Use a recent colour photo with neutral expression and white background.',
      },
      {
        q: 'I uploaded my JEE Main photo earlier — can I reuse it?',
        a: 'If your application is for the same session and the photo meets current specs (re-check the latest notification — they sometimes change KB ranges between sessions), yes. Otherwise re-process and re-upload.',
      },
      {
        q: 'What about thumbprint?',
        a: 'JEE Main asks for thumb impression separately — usually 240×240 px JPG within 50 KB. Our tool can be used with custom dimensions for this; or wait for our dedicated thumb-impression preset.',
      },
    ],
    relatedSlugs: ['neet-ug-photo-size', 'cuet-photo-size', 'compress-image-under-50kb'],
  },

  // ─── Visa pages (no saffron) ────────────────────────────────────────────────
  {
    slug: 'us-visa-photo-size',
    category: 'visa-photo',
    toolType: 'photo-signature',
    saffron: false,
    metaTitle: 'US Visa Photo Size — 600×600 px, max 240 KB · Compress4',
    metaDescription:
      'US visa photo: 600×600 pixels, under 240 KB, head 50–69% of frame, white background. Resize and compress in your browser. No upload.',
    h1: 'US Visa Photo Size',
    lede:
      'United States non-immigrant visa applications (B1/B2, F1, H1B, etc.) require a 600×600 pixel JPG photo, under 240 KB in file size, with the head taking up 50–69% of the frame and a plain white or off-white background. Drop your photo — we\'ll center-crop, resize, and compress to the State Department spec.',
    presetSlug: 'us-visa',
    sourceUrl: 'https://travel.state.gov',
    sourceLabel: 'travel.state.gov',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'My head is too small in the frame. What do I do?',
        a: 'The State Department requires the head height (chin to top of hair) to be 50–69% of the photo height. If your face is too small, re-crop to bring it closer or re-take the photo. Our tool can\'t change this — it\'s a photography issue, not a compression one.',
      },
      {
        q: 'Glasses, smile, hat — allowed?',
        a: 'No glasses (since November 2016 — even prescription). Neutral expression with mouth closed is preferred (slight smile may be accepted). No hats unless religious. Hair behind ears, both ears visible if possible.',
      },
      {
        q: 'Can I take this photo at home?',
        a: 'Technically yes — use a plain white wall, soft natural light from the front, hold camera at face level. Most candidates use a professional photographer or visa-photo store for safety. Our tool ensures the file size and pixel dimensions are correct regardless of source.',
      },
      {
        q: 'How long is the photo valid?',
        a: 'US visa photos must be taken within the last 6 months. The same photo cannot be reused if it was used in a previous US visa within the last 6 months — must be a new one.',
      },
      {
        q: 'Will the consulate accept this?',
        a: 'We meet the technical specs (pixels, KB, format) per State Department guidelines. Final acceptance also depends on photo quality (lighting, expression, background) — those are the photographer\'s responsibility.',
      },
    ],
    relatedSlugs: ['uk-visa-photo-size', 'schengen-visa-photo-size', 'compress-image-under-200kb'],
  },

  {
    slug: 'uk-visa-photo-size',
    category: 'visa-photo',
    toolType: 'photo-signature',
    saffron: false,
    metaTitle: 'UK Visa Photo Size — 45×35 mm, max 240 KB · Compress4',
    metaDescription:
      'UK Standard Visitor visa photo: 45×35 mm (531×413 px), 45–240 KB, plain off-white. Resize and compress in your browser. No upload.',
    h1: 'UK Visa Photo Size',
    lede:
      'United Kingdom Standard Visitor visa and other UK visa applications require a 45×35 mm photograph (approximately 531×413 pixels at 300 DPI), file size between 45 and 240 KB, on a plain off-white or cream background. Drop your photo below.',
    presetSlug: 'uk-visa',
    sourceUrl: 'https://gov.uk/standard-visitor-visa',
    sourceLabel: 'gov.uk',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'Is UK visa photo background really off-white, not pure white?',
        a: 'GOV.UK guidance says "plain cream or light grey" — pure white can be over-corrected, off-white/cream is safer. Our preset uses off-white as the background tag, but in practice white photos are usually accepted.',
      },
      {
        q: 'I have a 35×45 mm photo — does that work?',
        a: 'Different orientation — 45×35 mm means width × height (i.e., wider than tall), which is unusual for passport photos. Some UK visa portals also accept 35×45 mm portrait orientation. Check your specific application form\'s instructions and use our custom dimensions if needed.',
      },
      {
        q: 'Why minimum 45 KB?',
        a: 'A floor of 45 KB ensures the photo has enough detail to clearly identify you. Sub-45 KB photos may be rejected for being too compressed/blurry.',
      },
      {
        q: 'Same photo for UK and Schengen?',
        a: 'Both want roughly 35×45 mm portrait, but the orientation conventions differ. Our tool handles both — just pick the appropriate preset.',
      },
    ],
    relatedSlugs: ['us-visa-photo-size', 'schengen-visa-photo-size', 'canada-visa-photo-size'],
  },

  {
    slug: 'schengen-visa-photo-size',
    category: 'visa-photo',
    toolType: 'photo-signature',
    saffron: false,
    metaTitle: 'Schengen Visa Photo Size — 35×45 mm, max 240 KB · Compress4',
    metaDescription:
      'Schengen visa photo: 35×45 mm (413×531 px), under 240 KB, plain light background. Resize and compress in your browser.',
    h1: 'Schengen Visa Photo Size',
    lede:
      'Schengen short-stay visa applications (covering 27 EU countries) require a biometric photo at 35×45 mm (approximately 413×531 pixels at 300 DPI), under 240 KB, with a plain light-coloured background. Drop your photo below.',
    presetSlug: 'schengen-visa',
    sourceUrl: 'https://schengenvisainfo.com',
    sourceLabel: 'schengenvisainfo.com',
    verifiedAt: '2026-04-01',
    faqs: [
      {
        q: 'Which Schengen countries accept this format?',
        a: 'All 27 Schengen-area countries follow the ICAO biometric photo standard with 35×45 mm dimensions. The KB limit varies by consulate — some accept up to 240 KB, others up to 1 MB. We default to 240 KB which is universally acceptable.',
      },
      {
        q: 'Does the photo need to be biometric?',
        a: 'Yes — passport-style biometric photo: face centered, eyes open and looking at camera, no glasses, no smile, plain light background, recent (within 6 months). Our tool meets the dimensions and file size; the biometric quality depends on the original photo.',
      },
      {
        q: 'My consulate wants 600×800 px specifically. Can I use that?',
        a: 'Yes — use the Custom Dimensions option on the photo & signature page and enter your consulate\'s specific pixel requirements.',
      },
      {
        q: 'Schengen vs US visa photo — interchangeable?',
        a: 'No. US is square (600×600 px), Schengen is portrait (413×531 px ≈ 35×45 mm). Different aspect ratios. Don\'t reuse one for the other.',
      },
    ],
    relatedSlugs: ['us-visa-photo-size', 'uk-visa-photo-size', 'canada-visa-photo-size'],
  },

  // ─── Size-target pages (no saffron) ────────────────────────────────────────
  {
    slug: 'compress-pdf-under-100kb',
    category: 'pdf-size',
    toolType: 'pdf',
    saffron: false,
    metaTitle: 'Compress PDF under 100 KB — Free, in-browser · Compress4',
    metaDescription:
      'Compress any PDF to under 100 KB without uploading. Hit the exact size your form portal demands. All client-side — your file never leaves your device.',
    h1: 'Compress PDF under 100 KB',
    lede:
      'Drop a PDF, get it under 100 KB. Property portals, government forms, and many job applications demand small PDF uploads — our binary-search compressor figures out the right strength automatically. No upload, no signup, no waiting.',
    targetKb: 100,
    faqs: [
      {
        q: 'How can a PDF possibly be under 100 KB?',
        a: 'Most "PDFs" are actually scanned images embedded in a PDF wrapper — they can be aggressively recompressed without changing the visual content much. Pure-text PDFs are usually already small. Our tool tries structural compression first; if that\'s not enough, it rasterizes pages and rebuilds the PDF with compressed JPEGs.',
      },
      {
        q: 'Will the text still be selectable?',
        a: 'For mild compression (target close to original), yes. For very aggressive targets (under 100 KB on a multi-page document), our rasterize strategy converts pages to images — text becomes raster, not selectable. If you need selectable text, choose a larger target.',
      },
      {
        q: 'My PDF is 2 MB. Can it really hit 100 KB?',
        a: 'Often yes — depending on content. A 2 MB PDF that\'s mostly scanned images can usually compress to 100 KB with mild quality loss. A 2 MB PDF of dense text + diagrams may have a floor closer to 200–300 KB before quality becomes unusable. The tool will tell you the smallest size achievable.',
      },
      {
        q: 'Is this safe for documents like Aadhaar or PAN?',
        a: 'Yes. The compression engine runs entirely in your browser via WebAssembly. No file content is ever transmitted — visit /privacy/verify to confirm with your own eyes via DevTools Network tab.',
      },
    ],
    relatedSlugs: ['compress-pdf-under-200kb', 'compress-pdf-under-500kb', 'compress-image-under-50kb'],
  },

  {
    slug: 'compress-image-under-50kb',
    category: 'image-size',
    toolType: 'image',
    saffron: false,
    metaTitle: 'Compress Image under 50 KB — Free, in-browser · Compress4',
    metaDescription:
      'Compress JPG, PNG, WebP, or HEIC to under 50 KB without uploading. Common limit for exam photos, signatures, and ID uploads. All in your browser.',
    h1: 'Compress Image under 50 KB',
    lede:
      'Many forms cap photo uploads at 50 KB — SSC, IBPS, RRB, and several state government portals all demand it. Drop your image (JPG, PNG, HEIC, WebP) and we\'ll find the best balance of quality and dimension to land at or under 50 KB. Local processing, no upload.',
    targetKb: 50,
    faqs: [
      {
        q: 'Will my photo get blurry at 50 KB?',
        a: 'It depends on the original. A 4 MB photo from a modern phone compressed to 50 KB will lose noticeable detail (faces still recognizable, fine details like hair texture or freckles softer). For a passport-style photo at 200×230 px, 50 KB is comfortable territory and quality stays high.',
      },
      {
        q: 'Does it work for screenshots?',
        a: 'Yes — though screenshots usually compress better as PNG → WebP than JPG, since they have flat colours. Our tool offers WebP output if the JPG can\'t hit 50 KB.',
      },
      {
        q: 'Can I keep the original dimensions?',
        a: 'Toggle "Preserve original size" in the settings. If 50 KB isn\'t achievable at your original size without unacceptable quality loss, we\'ll prompt you to allow downscaling.',
      },
      {
        q: 'Why a separate tool for "under 50 KB" vs general compression?',
        a: 'Because that\'s what people search. The tool itself is identical — but pre-filling the target saves you a step, and the page explains the use case for someone who lands here from Google.',
      },
    ],
    relatedSlugs: ['compress-image-under-100kb', 'compress-image-under-200kb', 'ssc-cgl-photo-size'],
  },
]

/**
 * O(1) slug lookup — used by `/[slug]/page.tsx` and `generateStaticParams`.
 */
const bySlug = new Map(landingPages.map((p) => [p.slug, p]))

export function findLandingPage(slug: string): LandingPage | undefined {
  return bySlug.get(slug)
}

export function allLandingSlugs(): string[] {
  return landingPages.map((p) => p.slug)
}
