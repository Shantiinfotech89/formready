---
title: "PDF compression demystified — how to hit any KB target"
slug: "pdf-compression-demystified"
category: "how-to"
excerpt: "What's actually happening when a tool 'compresses' a PDF, why some PDFs shrink dramatically and others barely budge, and how to pick the right strategy for your form."
publishedAt: "2026-04-22"
updatedAt: "2026-04-22"
author: "FormReady Team"
relatedTools:
  - "/compress-pdf"
  - "/pdf-to-image"
  - "/image-to-pdf"
relatedPages:
  - "compress-pdf-under-100kb"
---

PDF compression sounds like a single thing. It isn't — it's at least four different things that look similar from the outside, with very different trade-offs. If you've ever wondered why a 3 MB PDF compresses to 150 KB while another only goes to 2 MB, the answer lives here.

## What's inside a PDF

A PDF is essentially a zip file of structured pages, where each page can contain:

1. **Vector text and graphics** — defined as instructions ("draw a curve from x to y, fill with this colour"). Tiny in size, infinitely scalable.
2. **Embedded raster images** — photos, scans, screenshots stored as JPEGs or PNGs. The biggest contributor to file size.
3. **Embedded fonts** — the typefaces used by the text, embedded so the document renders identically on any device.
4. **Metadata** — author, title, keywords, history, sometimes hidden form fields and signatures.

A 50-page text-only document is mostly type 1 and 3, total maybe 200 KB. A 1-page scanned ID card is mostly type 2, easily 3 MB. **The same compressed PDF logic doesn't work on both.**

## Strategy 1 — Structural compression

Every PDF can have its internal structure rewritten with object streams, deduplication, and metadata stripping. This is **lossless** — the visible content is identical, but the file is reorganised more efficiently.

A typical text-heavy PDF compresses 5–20% this way. Sometimes 40% if the original was poorly authored.

This is what FormReady tries first, because it's lossless and fast. If your target is hit by structural compression alone, no quality is lost.

## Strategy 2 — Image re-encoding

If the PDF contains embedded JPEG images (most scanned documents do), they can be re-encoded at lower quality. A 95% quality JPEG dropped to 70% saves 50%+ for many photographs without obvious quality loss.

This is **lossy** — visible quality drops — but it's how iLovePDF's "high compression" setting works, and how SmallPDF's "extreme" mode works. The trade-off is reasonable for most use cases.

## Strategy 3 — Page rasterisation

For very tight targets, the most aggressive option is to render every page as a JPEG image and rebuild the PDF as a series of those JPEGs. This produces the smallest possible PDFs but **loses text selectability** — your text becomes pixels, not characters.

This sounds bad, but for forms it's often fine: the form portal doesn't care whether your text is selectable. They care about KB and visual content.

When FormReady can't hit your target via Strategies 1 and 2, it falls back to this. We tell you when it happens so you can choose to abandon if text selectability matters to you.

## Strategy 4 — Resolution + colour reduction

Embedded images can be downsampled (e.g., a 600 DPI scan reduced to 150 DPI) and converted to grayscale or black-and-white for further savings. A 5 MB scanned-document PDF can drop to under 200 KB this way.

This is what scanner apps usually do automatically when you choose "small" output. For forms, a 150 DPI grayscale is usually indistinguishable from a 600 DPI colour scan in terms of acceptance.

## Why your PDF "won't compress"

If you've used a tool that reports "couldn't compress further", one of these is usually the cause:

1. **The PDF is already compressed** — someone shrunk it earlier and there's no slack left.
2. **The PDF is text-only** — there's nothing to lossy-compress; vectors are already minimal.
3. **The tool doesn't try Strategy 3 or 4** — it caps out at quality reduction.

For (3), use a tool that explicitly offers rasterisation (FormReady's [PDF compressor](/compress-pdf) does this automatically when needed) or convert each page to JPG first via [PDF to Image](/pdf-to-image), then back to PDF via [Image to PDF](/image-to-pdf) at a lower quality. This is the manual version of Strategy 3.

## Picking the right target

| Target KB | Realistic for | Quality risk |
|---|---|---|
| < 50 KB | Single-page text-only PDFs | Low |
| 50 – 200 KB | Single-page mixed content, ID cards | Medium |
| 200 – 500 KB | Multi-page mixed content (3–10 pages) | Low |
| 500 KB – 2 MB | Long documents, scans | Very low |
| > 2 MB | Multi-megapixel scans, photo-heavy | Source determines |

If your form requires "under 100 KB" for a 30-page scanned document, that target is genuinely tight — you'll need rasterisation, and quality will drop noticeably. There's no magic. The only way around it is to scan at lower DPI or split into multiple PDFs.

## What "client-side compression" means

FormReady runs all four strategies in your browser via WebAssembly. Your file is loaded into memory, compressed, and the result is saved locally. No upload happens.

You can verify this on [our verify page](/privacy/verify) by opening DevTools → Network tab and watching for outbound requests during compression. There are none. This isn't a marketing claim; it's mathematically required by how the page is built.

For sensitive documents — Aadhaar, PAN, property deeds, signed contracts, medical reports — this matters. Even if you trust a server-based tool today, you don't have to.

## See also

- [PDF compressor](/compress-pdf) — exact KB target, all strategies tried automatically
- [Compress PDF under 100 KB](/compress-pdf-under-100kb) — pre-set for the most common limit
- [Privacy verify](/privacy/verify) — DevTools-style proof that nothing uploads
