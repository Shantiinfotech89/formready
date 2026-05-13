/**
 * Image compression engine — fully client-side, no upload.
 *
 * Tiered binary-search loop that combines quality reduction AND dimension
 * scaling to hit exact KB targets even on large inputs. Replaces the earlier
 * browser-image-compression-only approach which was too conservative.
 *
 * Three modes:
 *   1. Plain compress    — quality + dimension reduction to hit target KB
 *   2. Signature mode    — grayscale + threshold cleanup + JPG/PNG output
 *   3. Exact-dimensions  — center-crop to W×H first, quality-only after
 *
 * For tight targets we step through scale × quality tiers in order; first tier
 * that lands at or under target wins. Best fallback returned if none hit.
 */

'use client'

import { decodeImageBitmap } from './decode'

export type ImageOutputFormat = 'jpg' | 'png' | 'webp' | 'same'

export interface ImageCompressionOptions {
  targetKb: number
  outputFormat?: ImageOutputFormat
  preserveDimensions?: boolean
  /** Resize to these exact dimensions before compression (center-crop if aspect mismatch). */
  exactDimensions?: { width: number; height: number }
  /** Signature mode: convert to grayscale. */
  grayscale?: boolean
  /** Signature mode: apply binary threshold for paper-noise cleanup. */
  thresholdCleanup?: boolean
  /** Force background to white. */
  whiteBackground?: boolean
  onProgress?: (pct: number, stage: string) => void
  signal?: AbortSignal
}

export interface ImageCompressionResult {
  blob: Blob
  originalBytes: number
  finalBytes: number
  finalDimensions: { width: number; height: number }
  format: string
  hitTarget: boolean
}

const FORMAT_MIME: Record<Exclude<ImageOutputFormat, 'same'>, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

function abortIf(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException('Compression aborted', 'AbortError')
}

/* ─── Canvas helpers ────────────────────────────────────────────────────── */

async function loadBitmap(file: File): Promise<ImageBitmap> {
  // Use the HEIC-aware decoder so iPhone photos work on older browsers too.
  return await decodeImageBitmap(file)
}

function drawCenterCropped(
  ctx: CanvasRenderingContext2D,
  bitmap: ImageBitmap,
  destW: number,
  destH: number,
  whiteBg = false,
) {
  if (whiteBg) {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, destW, destH)
  }
  const srcAspect = bitmap.width / bitmap.height
  const destAspect = destW / destH
  let sx = 0, sy = 0, sw = bitmap.width, sh = bitmap.height
  if (srcAspect > destAspect) {
    sw = bitmap.height * destAspect
    sx = (bitmap.width - sw) / 2
  } else if (srcAspect < destAspect) {
    sh = bitmap.width / destAspect
    sy = (bitmap.height - sh) / 2
  }
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, destW, destH)
}

function applyGrayscale(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const imgData = ctx.getImageData(0, 0, w, h)
  const data = imgData.data
  for (let i = 0; i < data.length; i += 4) {
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    data[i] = data[i + 1] = data[i + 2] = luma
  }
  ctx.putImageData(imgData, 0, 0)
}

function applyThreshold(ctx: CanvasRenderingContext2D, w: number, h: number, threshold = 200) {
  const imgData = ctx.getImageData(0, 0, w, h)
  const data = imgData.data
  for (let i = 0; i < data.length; i += 4) {
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    const v = luma > threshold ? 255 : 0
    data[i] = data[i + 1] = data[i + 2] = v
  }
  ctx.putImageData(imgData, 0, 0)
}

/**
 * Single canvas encode attempt. Re-draws bitmap at given scale, applies any
 * pixel transforms, encodes to the chosen MIME at the given quality.
 */
async function encodeAttempt(params: {
  baseCanvas: HTMLCanvasElement
  scale: number
  quality: number
  outputMime: string
  whiteBg: boolean
}): Promise<Blob> {
  const { baseCanvas, scale, quality, outputMime, whiteBg } = params
  const w = Math.max(1, Math.round(baseCanvas.width * scale))
  const h = Math.max(1, Math.round(baseCanvas.height * scale))

  if (scale === 1 && outputMime === 'image/jpeg' && !whiteBg) {
    // Fast path — just re-encode the base canvas directly
    return await canvasToBlob(baseCanvas, outputMime, quality)
  }

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { alpha: outputMime !== 'image/jpeg' && !whiteBg })
  if (!ctx) throw new Error('Canvas 2D context unavailable')
  if (outputMime === 'image/jpeg' || whiteBg) {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, w, h)
  }
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(baseCanvas, 0, 0, w, h)
  const blob = await canvasToBlob(canvas, outputMime, quality)
  canvas.width = canvas.height = 0
  return blob
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas toBlob returned null'))),
      mime,
      quality,
    ),
  )
}

/* ─── Compression tiers ─────────────────────────────────────────────────── */

interface Tier {
  scale: number
  quality: number
}

/** Quality-only tiers — used when dimensions must be preserved. */
const QUALITY_TIERS: Tier[] = [
  { scale: 1, quality: 0.92 },
  { scale: 1, quality: 0.85 },
  { scale: 1, quality: 0.75 },
  { scale: 1, quality: 0.65 },
  { scale: 1, quality: 0.55 },
  { scale: 1, quality: 0.45 },
  { scale: 1, quality: 0.35 },
]

/**
 * Quality + dimension tiers — used when dimensions can be reduced.
 *
 * The ladder is intentionally aggressive: a 4000×3000 phone photo targeting
 * 100KB needs to land around 600×450 px at quality 0.5. The lower tiers cover
 * that case, then we keep going for very tight targets (5–20KB signatures).
 */
const FULL_TIERS: Tier[] = [
  { scale: 1, quality: 0.92 },
  { scale: 1, quality: 0.85 },
  { scale: 1, quality: 0.75 },
  { scale: 1, quality: 0.65 },
  { scale: 0.85, quality: 0.75 },
  { scale: 0.7, quality: 0.7 },
  { scale: 0.6, quality: 0.65 },
  { scale: 0.5, quality: 0.6 },
  { scale: 0.4, quality: 0.55 },
  { scale: 0.3, quality: 0.5 },
  { scale: 0.22, quality: 0.5 },
  { scale: 0.16, quality: 0.5 },
  { scale: 0.12, quality: 0.55 },
  { scale: 0.08, quality: 0.6 },
]

/* ─── Pre-processing (resize, grayscale, threshold, white bg) ────────────── */

async function buildBaseCanvas(
  file: File,
  options: ImageCompressionOptions,
): Promise<{ canvas: HTMLCanvasElement; whiteBg: boolean }> {
  const bitmap = await loadBitmap(file)
  const targetW = options.exactDimensions?.width ?? bitmap.width
  const targetH = options.exactDimensions?.height ?? bitmap.height

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const whiteBg = !!options.whiteBackground
  const ctx = canvas.getContext('2d', { alpha: !whiteBg })
  if (!ctx) throw new Error('Canvas 2D context unavailable')

  if (options.exactDimensions) {
    drawCenterCropped(ctx, bitmap, targetW, targetH, whiteBg)
  } else {
    if (whiteBg) {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, targetW, targetH)
    }
    ctx.drawImage(bitmap, 0, 0)
  }

  if (options.grayscale) applyGrayscale(ctx, targetW, targetH)
  if (options.thresholdCleanup) applyThreshold(ctx, targetW, targetH)

  bitmap.close()
  return { canvas, whiteBg }
}

/* ─── Public API ─────────────────────────────────────────────────────────── */

export async function compressImage(
  file: File,
  options: ImageCompressionOptions,
): Promise<ImageCompressionResult> {
  abortIf(options.signal)

  const targetBytes = options.targetKb * 1024
  const originalBytes = file.size

  options.onProgress?.(5, 'Reading image…')

  // 1. Build base canvas (resize, grayscale, threshold)
  options.onProgress?.(10, 'Pre-processing…')
  const { canvas: baseCanvas, whiteBg } = await buildBaseCanvas(file, options)
  abortIf(options.signal)

  // 2. Pick output format
  const outputMime =
    options.outputFormat && options.outputFormat !== 'same'
      ? FORMAT_MIME[options.outputFormat]
      : file.type && file.type !== 'image/heic' && file.type !== 'image/heif'
        ? file.type
        : 'image/jpeg'

  // 3. Choose tier set: dimension-locked or full
  const dimensionsLocked = !!options.exactDimensions || options.preserveDimensions
  const tiers = dimensionsLocked ? QUALITY_TIERS : FULL_TIERS

  // 4. Step through tiers, return as soon as we hit target
  let bestBlob: Blob | null = null
  let bestSize = Infinity

  for (let i = 0; i < tiers.length; i++) {
    abortIf(options.signal)
    const tier = tiers[i]
    options.onProgress?.(
      20 + Math.round((i / tiers.length) * 75),
      tier.scale === 1
        ? `Quality ${Math.round(tier.quality * 100)}%`
        : `Scale ${Math.round(tier.scale * 100)}%, quality ${Math.round(tier.quality * 100)}%`,
    )

    const blob = await encodeAttempt({
      baseCanvas,
      scale: tier.scale,
      quality: tier.quality,
      outputMime,
      whiteBg,
    })

    if (blob.size < bestSize) {
      bestBlob = blob
      bestSize = blob.size
    }

    if (blob.size <= targetBytes) {
      // Read final dimensions and return
      const finalBitmap = await createImageBitmap(blob)
      const finalDimensions = { width: finalBitmap.width, height: finalBitmap.height }
      finalBitmap.close()
      baseCanvas.width = baseCanvas.height = 0
      options.onProgress?.(100, 'Done')
      return {
        blob,
        originalBytes,
        finalBytes: blob.size,
        finalDimensions,
        format: outputMime,
        hitTarget: true,
      }
    }
  }

  // 5. None of the tiers hit — return best
  baseCanvas.width = baseCanvas.height = 0
  if (!bestBlob) throw new Error('Compression produced no output')

  const finalBitmap = await createImageBitmap(bestBlob)
  const finalDimensions = { width: finalBitmap.width, height: finalBitmap.height }
  finalBitmap.close()

  options.onProgress?.(100, 'Best achievable')

  return {
    blob: bestBlob,
    originalBytes,
    finalBytes: bestSize,
    finalDimensions,
    format: outputMime,
    hitTarget: false,
  }
}
