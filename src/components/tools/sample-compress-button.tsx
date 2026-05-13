'use client'

import * as React from 'react'
import { CheckCircle2, Loader2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface SampleCompressButtonProps {
  onWatchStart?: () => void
  onWatchEnd?: () => void
  className?: string
}

/**
 * Generates a tiny sample PDF entirely client-side and runs it through the
 * compression pipeline so the user can see "0 new requests" appear in the
 * live DevTools panel during the operation.
 */
export function SampleCompressButton({
  onWatchStart,
  onWatchEnd,
  className,
}: SampleCompressButtonProps) {
  const [phase, setPhase] = React.useState<'idle' | 'compressing' | 'done'>('idle')
  const [progress, setProgress] = React.useState(0)
  const [stage, setStage] = React.useState('')

  const run = async () => {
    setPhase('compressing')
    setProgress(0)
    setStage('Generating sample PDF…')
    onWatchStart?.()

    const { PDFDocument } = await import('pdf-lib')
    const { compressPdf } = await import('@/lib/compression/pdf')

    const doc = await PDFDocument.create()
    for (let i = 0; i < 3; i++) {
      const page = doc.addPage([595, 842])
      page.drawText(`FormReady sample · page ${i + 1} of 3`, {
        x: 50,
        y: 800,
        size: 18,
      })
      page.drawText(
        'This PDF was generated and compressed entirely in your browser. ' +
          'The Network panel above shows zero new requests during compression. ' +
          'No file ever left your device. That\'s the whole point.',
        { x: 50, y: 760, size: 11, maxWidth: 495, lineHeight: 16 },
      )
    }
    const bytes = await doc.save()
    const file = new File([new Uint8Array(bytes).buffer], 'formready-sample.pdf', { type: 'application/pdf' })

    await compressPdf(file, {
      targetKb: 50,
      onProgress: (pct, st) => {
        setProgress(pct)
        setStage(st)
      },
    })

    setPhase('done')
    onWatchEnd?.()
    setTimeout(() => setPhase('idle'), 4000)
  }

  return (
    <div className={cn('space-y-3', className)}>
      {phase === 'idle' && (
        <Button variant="glow" size="lg" onClick={run}>
          <Zap className="h-4 w-4" />
          Run a sample compression now
        </Button>
      )}
      {phase === 'compressing' && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <p className="flex-1 text-sm font-medium">{stage}</p>
            <span className="num text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} aria-label={`Sample compression: ${progress}%`} />
        </div>
      )}
      {phase === 'done' && (
        <div className="flex items-center gap-2 rounded-lg border border-success-soft bg-success-soft/50 px-4 py-3 text-sm font-medium text-success-strong">
          <CheckCircle2 className="h-4 w-4" />
          Done. Check the panel — zero outbound requests during compression.
        </div>
      )}
    </div>
  )
}
