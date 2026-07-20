/**
 * Typed wrapper around Sonner's toast() so consumers don't have to think about
 * options. Adds Compress4-specific defaults (e.g., a reassuring privacy
 * suffix on download success).
 */
import { toast as sonnerToast } from 'sonner'

export const toast = {
  /** Fire-and-forget success notification — auto-dismisses in 4s. */
  success(message: string, description?: string) {
    return sonnerToast.success(message, { description })
  },

  /**
   * Specialised "downloaded" toast that always reminds the user the file
   * stayed local. Use this after every successful download.
   */
  downloaded(sizeLabel: string) {
    return sonnerToast.success(`Downloaded · ${sizeLabel}`, {
      description: 'Stayed on your device. Nothing was uploaded.',
    })
  },

  /** Error toast — sticky until dismissed. */
  error(message: string, description?: string) {
    return sonnerToast.error(message, { description, duration: Infinity })
  },

  /** Neutral info toast (e.g. "Compression cancelled"). */
  info(message: string, description?: string) {
    return sonnerToast(message, { description })
  },
}
