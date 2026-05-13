/**
 * PDF compression engine — fully client-side, no upload.
 *
 * Strategy: rasterize each page via pdfjs-dist, embed back as JPEGs in a new PDF
 * via pdf-lib. Binary-search quality and scale to hit the user's exact KB target.
 *
 * Trade-off: text becomes raster (not selectable). This is the same trade-off
 * iLovePDF/SmallPDF make for aggressive compression. Vector-only structural
 * compression is added as a fast first pass for text-heavy PDFs that are already
 * close to target.
 *
 * Future: swap the rasterizer for Ghostscript-WASM for vector-preserving
 * compression on text-heavy PDFs (Phase 2).
 */

'use client'

import { PDFDocument } from 'pdf-lib'

/**
 * Hard cap on page count. A 50 MB PDF can legally contain tens of thousands of
 * pages — rasterizing each across 18 tier attempts would freeze the browser
 * tab and burn 100% CPU for minutes. Surface a clear error instead.
 *
 * Tune empirically: 200 covers every realistic Indian use case we've seen
 * (property deeds, contract scans, exam form bundles top out around 100–150).
 * Power users with genuinely larger docs can split first.
 */
const MAX_PAGES = 200

export interface CompressionResult {
  blob: Blob
  originalBytes: number
  finalBytes: number
  iterations: number
  strategy: 'structural' | 'rasterize'
  hitTarget: boolean
}

export interface CompressionOptions {
  targetKb: number
  onProgress?: (pct: number, stage: string) => void
  signal?: AbortSignal
}

interface Tier {
  scale: number
  quality: number
}

/**
 * Tier ladder for the rasterize strategy.
 *
 * Ordered HIGHEST quality → lowest. The engine picks the first tier whose
 * output fits the user's KB target, so this ordering means "preserve as much
 * quality as possible while staying under the user's number".
 *
 * The top tiers (scale 2.0–3.0) exist because, without them, small/clean PDFs
 * (business cards, single-page forms) rasterize to 20–30 KB at scale 1.5 even
 * when the user asked for 200–500 KB. The user expects "close to my target,
 * with max quality" — not "smallest possible". Higher tiers give us headroom.
 *
 * The bottom tiers (scale ≤ 0.7) are aggressive enough to hit tight targets
 * like ≤ 50 KB on multi-page scanned PDFs.
 */
const TIERS: Tier[] = [
  // High-quality preservation — fine-grained so we can land closer to the
  // user's target on PDFs with QR codes, photos, or other JPEG-unfriendly
  // content where coarser steps overshoot or undershoot dramatically.
  { scale: 3.0, quality: 0.95 },
  { scale: 2.75, quality: 0.95 },
  { scale: 2.5, quality: 0.95 },
  { scale: 2.5, quality: 0.9 },
  { scale: 2.25, quality: 0.92 },
  { scale: 2.25, quality: 0.85 },
  { scale: 2.0, quality: 0.92 },
  { scale: 2.0, quality: 0.85 },
  { scale: 1.75, quality: 0.85 },
  // Default range — typical "compress to fit"
  { scale: 1.5, quality: 0.85 },
  { scale: 1.5, quality: 0.75 },
  { scale: 1.25, quality: 0.75 },
  { scale: 1.0, quality: 0.7 },
  // Mid-aggressive — for multi-page docs hitting ~100 KB targets
  { scale: 0.85, quality: 0.6 },
  { scale: 0.7, quality: 0.5 },
  // Aggressive — for genuinely tight targets
  { scale: 0.55, quality: 0.5 },
  { scale: 0.4, quality: 0.5 },
  { scale: 0.3, quality: 0.55 },
]

let pdfjsLibPromise: Promise<typeof import('pdfjs-dist')> | null = null

/**
 * Lazy-load pdfjs-dist (~3 MB JS + WASM worker). The promise is memoised so
 * subsequent compressions on the same session reuse the already-loaded engine.
 *
 * `onLoadingFirstTime` fires only on the very first call — used by the public
 * compressor to surface a clear "Loading compression engine…" stage so the
 * user understands what's happening on first use.
 */
async function getPdfjs(onLoadingFirstTime?: () => void) {
  if (!pdfjsLibPromise) {
    onLoadingFirstTime?.()
    pdfjsLibPromise = import('pdfjs-dist').then((lib) => {
      // Worker is copied to /public/pdf.worker.min.mjs at install time.
      // We reference it by static path so webpack doesn't try to bundle/minify
      // it (Terser chokes on the worker's ES-module syntax).
      lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
      return lib
    })
  }
  return pdfjsLibPromise
}

/** Whether the engine has been loaded into memory at least once this session. */
export function isPdfEngineLoaded(): boolean {
  return pdfjsLibPromise !== null
}

function abortIf(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException('Compression aborted', 'AbortError')
  }
}

async function tryStructural(buffer: ArrayBuffer, targetBytes: number): Promise<Blob | null> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: false })
  doc.setTitle('')
  doc.setAuthor('')
  doc.setSubject('')
  doc.setKeywords([])
  doc.setProducer('FormReady')
  doc.setCreator('FormReady')

  const bytes = await doc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  })

  if (bytes.byteLength <= targetBytes) {
    return new Blob([new Uint8Array(bytes).buffer], { type: 'application/pdf' })
  }
  return null
}

async function rasterizeAtTier(
  pdfjs: typeof import('pdfjs-dist'),
  buffer: ArrayBuffer,
  tier: Tier,
  onProgress?: (pct: number, stage: string) => void,
  signal?: AbortSignal,
): Promise<Uint8Array> {
  const loadingTask = pdfjs.getDocument({ data: buffer })
  const doc = await loadingTask.promise
  const newPdf = await PDFDocument.create()
  const pageCount = doc.numPages

  for (let i = 1; i <= pageCount; i++) {
    abortIf(signal)
    const page = await doc.getPage(i)
    const viewport = page.getViewport({ scale: tier.scale })
    const canvas = document.createElement('canvas')
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) throw new Error('Canvas 2D context unavailable')

    await page.render({ canvasContext: ctx, viewport, intent: 'print' }).promise

    const blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
        'image/jpeg',
        tier.quality,
      ),
    )
    const arr = new Uint8Array(await blob.arrayBuffer())
    const jpg = await newPdf.embedJpg(arr)
    const pdfPage = newPdf.addPage([canvas.width, canvas.height])
    pdfPage.drawImage(jpg, { x: 0, y: 0, width: canvas.width, height: canvas.height })

    canvas.width = canvas.height = 0
    page.cleanup()

    onProgress?.(Math.round((i / pageCount) * 100), `Compressing page ${i}/${pageCount}`)
  }

  await doc.destroy()
  return await newPdf.save({ useObjectStreams: true })
}

export async function compressPdf(
  file: File,
  options: CompressionOptions,
): Promise<CompressionResult> {
  const targetBytes = options.targetKb * 1024
  const buffer = await file.arrayBuffer()
  const originalBytes = buffer.byteLength

  options.onProgress?.(5, 'Reading PDF…')
  abortIf(options.signal)

  // Safety cap: probe page count via pdf-lib (cheap — parses catalog only)
  // before any rasterization work. Prevents browser-freeze on crafted or
  // genuinely huge PDFs.
  const probeDoc = await PDFDocument.load(buffer.slice(0), { ignoreEncryption: true })
  const pageCount = probeDoc.getPageCount()
  if (pageCount > MAX_PAGES) {
    throw new Error(
      `This PDF has ${pageCount} pages. The browser can only compress up to ${MAX_PAGES} pages reliably. Try splitting the PDF first.`,
    )
  }

  // Tier 0: structural compression only (fast)
  const structural = await tryStructural(buffer.slice(0), targetBytes)
  if (structural) {
    options.onProgress?.(100, 'Done')
    return {
      blob: structural,
      originalBytes,
      finalBytes: structural.size,
      iterations: 0,
      strategy: 'structural',
      hitTarget: true,
    }
  }

  // Tiers 1–N: rasterize at decreasing quality + scale.
  // First-time engine load takes 2–8s on slow connections; surface that clearly
  // so the progress bar isn't stuck looking broken.
  const pdfjs = await getPdfjs(() => {
    options.onProgress?.(8, 'Loading compression engine (one-time, ~3 MB)…')
  })
  let bestBytes: Uint8Array | null = null
  let bestSize = Infinity
  let iterations = 0

  for (let tierIdx = 0; tierIdx < TIERS.length; tierIdx++) {
    abortIf(options.signal)
    iterations++
    const tier = TIERS[tierIdx]
    options.onProgress?.(
      10 + Math.round((tierIdx / TIERS.length) * 80),
      `Trying compression level ${tierIdx + 1}…`,
    )

    const bytes = await rasterizeAtTier(
      pdfjs,
      buffer.slice(0),
      tier,
      (pct, stage) => {
        const overall = 10 + Math.round(((tierIdx + pct / 100) / TIERS.length) * 80)
        options.onProgress?.(overall, stage)
      },
      options.signal,
    )

    if (bytes.byteLength < bestSize) {
      bestBytes = bytes
      bestSize = bytes.byteLength
    }

    if (bytes.byteLength <= targetBytes) {
      options.onProgress?.(100, 'Done')
      return {
        blob: new Blob([new Uint8Array(bytes).buffer], { type: 'application/pdf' }),
        originalBytes,
        finalBytes: bytes.byteLength,
        iterations,
        strategy: 'rasterize',
        hitTarget: true,
      }
    }
  }

  // Couldn't hit target — return best result with hitTarget: false
  options.onProgress?.(100, 'Best achievable')
  if (!bestBytes) throw new Error('Compression produced no output')
  return {
    blob: new Blob([new Uint8Array(bestBytes).buffer], { type: 'application/pdf' }),
    originalBytes,
    finalBytes: bestSize,
    iterations,
    strategy: 'rasterize',
    hitTarget: false,
  }
}
