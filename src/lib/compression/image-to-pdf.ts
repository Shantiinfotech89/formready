/**
 * Image → PDF combiner — fully client-side.
 *
 * Takes 1–N images, lays them out one-per-page on a chosen page size, and
 * (optionally) compresses the resulting PDF to a target KB. Useful for forms
 * that require multi-page submissions in PDF when you only have JPGs.
 */

'use client'

import { PDFDocument } from 'pdf-lib'
import { decodeImageBitmap } from './decode'

export type PageSize = 'A4' | 'Letter' | 'Legal' | 'Original'
export type Orientation = 'portrait' | 'landscape' | 'auto'
export type Margin = 'none' | 'small' | 'medium'

const PAGE_DIMENSIONS_PT: Record<Exclude<PageSize, 'Original'>, { w: number; h: number }> = {
  A4: { w: 595.28, h: 841.89 },
  Letter: { w: 612, h: 792 },
  Legal: { w: 612, h: 1008 },
}

const MARGIN_PT: Record<Margin, number> = {
  none: 0,
  small: 18,
  medium: 36,
}

export interface ImageToPdfOptions {
  pageSize?: PageSize
  orientation?: Orientation
  margin?: Margin
  /** When set, compresses the resulting PDF post-build to fit this KB. */
  targetKb?: number
  onProgress?: (pct: number, stage: string) => void
  signal?: AbortSignal
}

export interface ImageToPdfResult {
  blob: Blob
  pageCount: number
  finalBytes: number
  hitTarget: boolean
}

function abortIf(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
}

async function imageBitmapForFile(file: File): Promise<{ bitmap: ImageBitmap; width: number; height: number }> {
  // HEIC-aware so iPhone photos combine into a PDF on older browsers too.
  const bitmap = await decodeImageBitmap(file)
  return { bitmap, width: bitmap.width, height: bitmap.height }
}

async function bitmapToJpegBytes(bitmap: ImageBitmap, quality = 0.9): Promise<Uint8Array> {
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Canvas 2D context unavailable')
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0)
  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
      'image/jpeg',
      quality,
    ),
  )
  canvas.width = canvas.height = 0
  return new Uint8Array(await blob.arrayBuffer())
}

async function buildPdf(
  files: File[],
  options: ImageToPdfOptions,
  jpegQuality: number,
): Promise<Uint8Array> {
  const { pageSize = 'A4', orientation = 'auto', margin = 'small' } = options
  const marginPt = MARGIN_PT[margin]
  const pdf = await PDFDocument.create()

  for (let i = 0; i < files.length; i++) {
    abortIf(options.signal)
    const file = files[i]
    const { bitmap, width, height } = await imageBitmapForFile(file)
    const isJpeg = file.type === 'image/jpeg'
    const bytes = isJpeg
      ? new Uint8Array(await file.arrayBuffer())
      : await bitmapToJpegBytes(bitmap, jpegQuality)

    let pageW: number
    let pageH: number
    if (pageSize === 'Original') {
      pageW = width
      pageH = height
    } else {
      const { w, h } = PAGE_DIMENSIONS_PT[pageSize]
      const isLandscape =
        orientation === 'landscape' ||
        (orientation === 'auto' && width > height)
      pageW = isLandscape ? h : w
      pageH = isLandscape ? w : h
    }

    const page = pdf.addPage([pageW, pageH])
    const usableW = pageW - marginPt * 2
    const usableH = pageH - marginPt * 2
    const aspect = width / height
    let drawW = usableW
    let drawH = usableW / aspect
    if (drawH > usableH) {
      drawH = usableH
      drawW = usableH * aspect
    }
    const drawX = marginPt + (usableW - drawW) / 2
    const drawY = marginPt + (usableH - drawH) / 2

    const embedded = isJpeg
      ? await pdf.embedJpg(bytes)
      : await pdf.embedJpg(bytes)
    page.drawImage(embedded, { x: drawX, y: drawY, width: drawW, height: drawH })
    bitmap.close()

    options.onProgress?.(
      Math.round(((i + 1) / files.length) * 80),
      `Adding page ${i + 1} of ${files.length}`,
    )
  }

  options.onProgress?.(85, 'Building PDF…')
  return pdf.save({ useObjectStreams: true })
}

const QUALITY_TIERS = [0.92, 0.85, 0.75, 0.65, 0.5]

export async function buildImagePdf(
  files: File[],
  options: ImageToPdfOptions = {},
): Promise<ImageToPdfResult> {
  if (files.length === 0) throw new Error('No images provided')
  if (files.length > 100) throw new Error('Too many images (max 100)')

  const { targetKb } = options
  abortIf(options.signal)

  // No target → build at quality 0.92 once
  if (!targetKb) {
    const bytes = await buildPdf(files, options, 0.92)
    options.onProgress?.(100, 'Done')
    return {
      blob: new Blob([new Uint8Array(bytes).buffer], { type: 'application/pdf' }),
      pageCount: files.length,
      finalBytes: bytes.byteLength,
      hitTarget: true,
    }
  }

  // Has target → step through quality tiers
  const targetBytes = targetKb * 1024
  let bestBytes: Uint8Array | null = null
  let bestSize = Infinity

  for (let i = 0; i < QUALITY_TIERS.length; i++) {
    abortIf(options.signal)
    const quality = QUALITY_TIERS[i]
    options.onProgress?.(
      5 + Math.round((i / QUALITY_TIERS.length) * 90),
      `Quality tier ${i + 1}…`,
    )
    const bytes = await buildPdf(files, options, quality)
    if (bytes.byteLength < bestSize) {
      bestBytes = bytes
      bestSize = bytes.byteLength
    }
    if (bytes.byteLength <= targetBytes) {
      options.onProgress?.(100, 'Done')
      return {
        blob: new Blob([new Uint8Array(bytes).buffer], { type: 'application/pdf' }),
        pageCount: files.length,
        finalBytes: bytes.byteLength,
        hitTarget: true,
      }
    }
  }

  options.onProgress?.(100, 'Best achievable')
  if (!bestBytes) throw new Error('Build produced no output')
  return {
    blob: new Blob([new Uint8Array(bestBytes).buffer], { type: 'application/pdf' }),
    pageCount: files.length,
    finalBytes: bestSize,
    hitTarget: false,
  }
}
