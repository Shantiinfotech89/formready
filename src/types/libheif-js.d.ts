/**
 * Minimal type shim for libheif-js — used as a fallback HEIC decoder when the
 * browser can't natively decode HEIC via createImageBitmap.
 */
declare module 'libheif-js' {
  interface HeifImage {
    get_width(): number
    get_height(): number
    display(
      imageData: ImageData,
      cb: (data: ImageData) => void,
    ): void
  }
  interface HeifDecoder {
    decode(buffer: ArrayBuffer): HeifImage[]
  }
  const factory: () => HeifDecoder
  export default factory
}
