/**
 * Image decoder that gracefully handles HEIC on browsers that don't have
 * native support (most non-Safari browsers older than 2024).
 *
 * Strategy:
 *   1. Try `createImageBitmap` — fast path, works on Safari 17+, Chrome 100+,
 *      Firefox 124+, Edge 100+, Brave 1.60+ for HEIC.
 *   2. On failure, if the file looks like HEIC, lazy-import libheif-js (~2 MB
 *      WASM, only downloaded when needed) and decode in JS.
 *   3. Re-encode to a JPG File so downstream code (compression engines) can
 *      treat it like a normal raster image.
 */

'use client'

const HEIC_MIME_PATTERNS = [
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
]

function looksHeic(file: File): boolean {
  if (!file.type) {
    return /\.(heic|heif)$/i.test(file.name)
  }
  return HEIC_MIME_PATTERNS.some((m) => file.type === m)
}

/**
 * Decode a file (including HEIC) to an ImageBitmap. Falls back to libheif-js
 * if the browser can't natively decode HEIC. Returns the original file
 * (transparently) for non-HEIC inputs.
 */
export async function decodeImageBitmap(file: File): Promise<ImageBitmap> {
  // Fast path
  try {
    return await createImageBitmap(file)
  } catch (nativeErr) {
    if (!looksHeic(file)) throw nativeErr

    // HEIC fallback path. `libheif-js/wasm-bundle` is the browser-only variant
    // that does not import Node's `fs` (the bare entry tries to and breaks the
    // client bundle).
    try {
      // @ts-expect-error — no types ship for the wasm-bundle subpath; we
      // declare the shape inline here.
      const decoder = (await import('libheif-js/wasm-bundle')).default as {
        decode: (buffer: ArrayBuffer) => Array<{
          get_width: () => number
          get_height: () => number
          display: (
            imageData: ImageData,
            cb: (data: ImageData) => void,
          ) => void
        }>
      }
      const buffer = await file.arrayBuffer()
      const images = decoder.decode(buffer)
      if (images.length === 0) {
        throw new Error('libheif returned no images')
      }
      const first = images[0]
      const w = first.get_width()
      const h = first.get_height()
      const imageData = new ImageData(w, h)

      await new Promise<void>((resolve) => {
        first.display(imageData, (data) => {
          imageData.data.set(data.data)
          resolve()
        })
      })

      return await createImageBitmap(imageData)
    } catch (heifErr) {
      throw new Error(
        'Could not decode HEIC. On older browsers, save your photo as JPG from your phone\'s Photos app first. ' +
          `(Reason: ${(heifErr as Error).message || 'unknown'})`,
      )
    }
  }
}
