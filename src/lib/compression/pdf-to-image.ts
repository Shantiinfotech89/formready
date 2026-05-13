/**
 * PDF → Image extractor — fully client-side.
 *
 * Renders each page of a PDF into a separate image (JPG/PNG/WebP) at a chosen
 * DPI. Supports per-image KB targeting (post-rasterize compression).
 */

'use client'

import JSZip from 'jszip'
import { compressImage } from '@/lib/compression/image'

/**
 * Hard cap on selected pages. Rasterizing each page at 300 DPI consumes
 * significant memory + CPU; running this loop for 1000+ pages will freeze
 * the browser tab. Users who legitimately need more can run the tool in
 * batches via the `pageRange` option.
 */
const MAX_PAGES = 200

export type ImageOutputFormat = 'jpg' | 'png' | 'webp'
export type Dpi = 72 | 150 | 300

const FORMAT_MIME: Record<ImageOutputFormat, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

/** PDF default is 72 DPI. Scale factor = target DPI / 72. */
const DPI_SCALE: Record<Dpi, number> = {
  72: 1,
  150: 150 / 72,
  300: 300 / 72,
}

export interface PdfToImageOptions {
  format: ImageOutputFormat
  dpi: Dpi
  /** Optional: compress each output image to this KB. */
  targetKbPerImage?: number
  /** "1-3, 5, 7-9" or undefined for all. */
  pageRange?: string
  onProgress?: (pct: number, stage: string) => void
  signal?: AbortSignal
}

export interface PdfToImageResult {
  files: { name: string; blob: Blob; size: number; pageNumber: number }[]
  zip?: Blob
  pageCount: number
}

function abortIf(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
}

/** Parse "1-3, 5, 7-9" → [1, 2, 3, 5, 7, 8, 9]. Returns null if input is empty. */
export function parsePageRange(input: string | undefined, totalPages: number): number[] {
  if (!input || !input.trim()) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const result = new Set<number>()
  for (const part of input.split(',')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    if (trimmed.includes('-')) {
      const [a, b] = trimmed.split('-').map((s) => Number(s.trim()))
      if (Number.isFinite(a) && Number.isFinite(b)) {
        const lo = Math.max(1, Math.min(a, b))
        const hi = Math.min(totalPages, Math.max(a, b))
        for (let i = lo; i <= hi; i++) result.add(i)
      }
    } else {
      const n = Number(trimmed)
      if (Number.isFinite(n) && n >= 1 && n <= totalPages) result.add(n)
    }
  }
  return Array.from(result).sort((a, b) => a - b)
}

let pdfjsLibPromise: Promise<typeof import('pdfjs-dist')> | null = null

async function getPdfjs(onLoadingFirstTime?: () => void) {
  if (!pdfjsLibPromise) {
    onLoadingFirstTime?.()
    pdfjsLibPromise = import('pdfjs-dist').then((lib) => {
      // Worker is in /public/ (copied at install time). Static path avoids
      // webpack/Terser failing to parse the worker's ES-module exports.
      lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
      return lib
    })
  }
  return pdfjsLibPromise
}

export async function pdfToImages(
  file: File,
  options: PdfToImageOptions,
): Promise<PdfToImageResult> {
  abortIf(options.signal)
  options.onProgress?.(5, 'Reading PDF…')

  const pdfjs = await getPdfjs(() => {
    options.onProgress?.(8, 'Loading rendering engine (one-time, ~3 MB)…')
  })
  const buffer = await file.arrayBuffer()
  const doc = await pdfjs.getDocument({ data: buffer }).promise
  const totalPages = doc.numPages
  const pages = parsePageRange(options.pageRange, totalPages)

  // Safety cap: rasterizing > 200 pages at 300 DPI freezes the browser. Gate
  // on selected pages (not total) so users can still pick a small range out
  // of a 500-page document via `pageRange`.
  if (pages.length > MAX_PAGES) {
    await doc.destroy()
    throw new Error(
      `You've selected ${pages.length} pages. The browser limit is ${MAX_PAGES}. Narrow the page range (e.g., "1-${MAX_PAGES}").`,
    )
  }

  const scale = DPI_SCALE[options.dpi]
  const mime = FORMAT_MIME[options.format]
  const ext = options.format === 'jpg' ? 'jpg' : options.format

  const baseName = file.name.replace(/\.pdf$/i, '')
  const results: PdfToImageResult['files'] = []

  for (let i = 0; i < pages.length; i++) {
    abortIf(options.signal)
    const pageNum = pages[i]
    options.onProgress?.(
      10 + Math.round((i / pages.length) * 80),
      `Rendering page ${pageNum}/${totalPages}`,
    )

    const page = await doc.getPage(pageNum)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) throw new Error('Canvas 2D context unavailable')
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: ctx, viewport, intent: 'print' }).promise

    let blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
        mime,
        0.92,
      ),
    )
    canvas.width = canvas.height = 0
    page.cleanup()

    if (options.targetKbPerImage && blob.size > options.targetKbPerImage * 1024) {
      const tmpFile = new File([blob], `tmp.${ext}`, { type: mime })
      const compressed = await compressImage(tmpFile, {
        targetKb: options.targetKbPerImage,
        outputFormat: options.format,
        signal: options.signal,
      })
      blob = compressed.blob
    }

    results.push({
      name: `${baseName}-page-${String(pageNum).padStart(3, '0')}.${ext}`,
      blob,
      size: blob.size,
      pageNumber: pageNum,
    })
  }

  await doc.destroy()

  // Single page → no ZIP, just return the file
  if (results.length === 1) {
    options.onProgress?.(100, 'Done')
    return { files: results, pageCount: totalPages }
  }

  // Multiple pages → ZIP them
  options.onProgress?.(95, 'Packaging ZIP…')
  const zip = new JSZip()
  for (const r of results) {
    zip.file(r.name, r.blob)
  }
  const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
  options.onProgress?.(100, 'Done')

  return { files: results, zip: zipBlob, pageCount: totalPages }
}
