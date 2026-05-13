'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, FileWarning, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PdfPreviewProps {
  blob: Blob
  className?: string
  /** Render scale; 1.0 ≈ 72 DPI. Higher = sharper preview. */
  scale?: number
}

/**
 * Renders pages of a PDF blob inline so the user can verify quality before
 * downloading. Loads pdfjs-dist lazily; reuses the singleton if the engine
 * has already been imported by the compression engine.
 */
export function PdfPreview({ blob, className, scale = 1.2 }: PdfPreviewProps) {
  const [pageCount, setPageCount] = React.useState<number | null>(null)
  const [pageNum, setPageNum] = React.useState(1)
  const [error, setError] = React.useState<string | null>(null)
  const [renderingFirst, setRenderingFirst] = React.useState(true)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const docRef = React.useRef<unknown>(null)

  // Load the PDF doc once per blob
  React.useEffect(() => {
    let cancelled = false
    setError(null)
    setRenderingFirst(true)
    setPageNum(1)

    ;(async () => {
      try {
        const buffer = await blob.arrayBuffer()
        const pdfjs = await import('pdfjs-dist')
        // See pdf.ts comment — worker served from /public/ to avoid webpack
        // tripping over its ES-module syntax during minification.
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
        if (cancelled) return
        const doc = await pdfjs.getDocument({ data: buffer }).promise
        if (cancelled) {
          await doc.destroy()
          return
        }
        docRef.current = doc
        setPageCount(doc.numPages)
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message || 'Could not preview this PDF.')
          setRenderingFirst(false)
        }
      }
    })()

    return () => {
      cancelled = true
      const doc = docRef.current as { destroy?: () => Promise<void> } | null
      doc?.destroy?.()
      docRef.current = null
    }
  }, [blob])

  // Render whenever pageNum changes
  React.useEffect(() => {
    let cancelled = false
    if (!docRef.current || !canvasRef.current) return

    ;(async () => {
      const doc = docRef.current as {
        getPage: (n: number) => Promise<{
          getViewport: (opts: { scale: number }) => { width: number; height: number }
          render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> }
          cleanup: () => void
        }>
      }
      try {
        const page = await doc.getPage(pageNum)
        if (cancelled) return
        const viewport = page.getViewport({ scale })
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        const ctx = canvas.getContext('2d', { alpha: false })
        if (!ctx) throw new Error('Canvas 2D context unavailable')
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        await page.render({ canvasContext: ctx, viewport }).promise
        page.cleanup()
        if (!cancelled) setRenderingFirst(false)
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message || 'Could not render this page.')
          setRenderingFirst(false)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [pageNum, pageCount, scale])

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border border-warning bg-warning-soft/40 p-4 text-sm text-amber-900',
          className,
        )}
      >
        <FileWarning className="h-5 w-5 shrink-0 text-amber-700" />
        <p className="flex-1">
          Preview unavailable, but your file is ready to download below.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border border-border bg-muted', className)}>
      <div className="relative flex min-h-[280px] items-center justify-center bg-neutral-100 p-3">
        {renderingFirst && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="max-h-[420px] w-auto rounded shadow-md"
        />
      </div>
      {pageCount !== null && pageCount > 1 && (
        <div className="flex items-center justify-between gap-2 border-t border-border bg-card p-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pageNum <= 1}
            onClick={() => setPageNum((n) => Math.max(1, n - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="num text-sm text-muted-foreground">
            Page {pageNum} of {pageCount}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pageNum >= pageCount}
            onClick={() => setPageNum((n) => Math.min(pageCount, n + 1))}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
