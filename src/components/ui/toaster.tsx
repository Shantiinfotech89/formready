'use client'

import { Toaster as SonnerToaster } from 'sonner'

/**
 * Theme wrapper around Sonner so its surfaces match our design tokens.
 * Mounted once in the root layout — fire toasts from anywhere via
 * `import { toast } from '@/lib/toast'`.
 *
 * Emil-grade defaults:
 *   - Bottom-right on desktop, bottom-centre on mobile (Sonner default)
 *   - 4-second auto-close for success; sticky for errors
 *   - Subtle slide-in from below using ease-drawer curve (handled by Sonner)
 *   - Reduced-motion is honoured globally via globals.css
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      offset="20px"
      duration={4000}
      gap={10}
      closeButton
      richColors={false}
      visibleToasts={4}
      mobileOffset="12px"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            'group rounded-xl border border-border bg-card text-foreground shadow-lg ' +
            'data-[type=success]:border-success-soft data-[type=success]:bg-success-soft/40 ' +
            'data-[type=error]:border-destructive/30 data-[type=error]:bg-destructive/[0.04]',
          title: 'text-sm font-semibold leading-tight text-foreground',
          description: 'text-xs leading-snug text-muted-foreground mt-1',
          actionButton:
            'rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:bg-primary-hover',
          cancelButton:
            'rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground hover:bg-border',
          closeButton:
            'border border-border bg-card text-muted-foreground hover:text-foreground',
          icon: 'text-success',
        },
      }}
    />
  )
}
