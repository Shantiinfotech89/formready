'use client'

import * as React from 'react'
import { AlertCircle, ArrowRight, Download, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { FileDropZone } from '@/components/tools/file-drop-zone'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import {
  pdfToImages,
  type Dpi,
  type ImageOutputFormat,
  type PdfToImageResult,
} from '@/lib/compression/pdf-to-image'
import { cn, formatKB } from '@/lib/utils'
import { toast } from '@/lib/toast'

type Phase =
  | { kind: 'idle' }
  | { kind: 'ready'; file: File }
  | { kind: 'rendering'; file: File; controller: AbortController; progress: number; stage: string }
  | { kind: 'done'; file: File; result: PdfToImageResult }
  | { kind: 'error'; message: string }

export function PdfToImageTool() {
  const [phase, setPhase] = React.useState<Phase>({ kind: 'idle' })
  const [format, setFormat] = React.useState<ImageOutputFormat>('jpg')
  const [dpi, setDpi] = React.useState<Dpi>(150)
  const [pageRange, setPageRange] = React.useState('')
  const [enableTarget, setEnableTarget] = React.useState(false)
  const [targetKb, setTargetKb] = React.useState(200)

  const onFileSelected = (file: File) => setPhase({ kind: 'ready', file })

  const reset = () => {
    if (phase.kind === 'rendering') phase.controller.abort()
    setPhase({ kind: 'idle' })
  }

  const start = async () => {
    if (phase.kind !== 'ready' && phase.kind !== 'done') return
    const file = phase.file
    const controller = new AbortController()
    setPhase({ kind: 'rendering', file, controller, progress: 0, stage: 'Reading PDF…' })
    try {
      const result = await pdfToImages(file, {
        format,
        dpi,
        targetKbPerImage: enableTarget ? targetKb : undefined,
        pageRange: pageRange.trim() || undefined,
        signal: controller.signal,
        onProgress: (progress, stage) =>
          setPhase((p) => (p.kind === 'rendering' ? { ...p, progress, stage } : p)),
      })
      setPhase({ kind: 'done', file, result })
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setPhase({ kind: 'idle' })
        return
      }
      setPhase({
        kind: 'error',
        message: (err as Error).message || 'Could not render PDF.',
      })
    }
  }

  const downloadAll = () => {
    if (phase.kind !== 'done') return
    const blob = phase.result.zip ?? phase.result.files[0].blob
    const name = phase.result.zip
      ? phase.file.name.replace(/\.pdf$/i, '') + `-pages.zip`
      : phase.result.files[0].name
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
    toast.downloaded(`${phase.result.zip ? 'ZIP' : 'image'} · ${formatKB(blob.size)}`)
  }

  return (
    <div className="space-y-6">
      {phase.kind === 'idle' && (
        <FileDropZone
          accept="application/pdf"
          maxBytes={50 * 1024 * 1024}
          onFileSelected={onFileSelected}
          heading="Drop your PDF here"
          subheading="Each page becomes a separate image · max 50MB"
        />
      )}

      {phase.kind === 'error' && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="flex items-start gap-3 p-6">
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            <div className="flex-1">
              <p className="font-medium text-destructive">{phase.message}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Try again</Button>
          </CardContent>
        </Card>
      )}

      {phase.kind === 'ready' && (
        <>
          <FileDropZone state="active" selectedFile={phase.file} onClear={reset} />
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fmt">Output format</Label>
                  <SelectInput
                    id="fmt"
                    value={format}
                    onChange={(v) => setFormat(v as ImageOutputFormat)}
                    options={[
                      { value: 'jpg', label: 'JPG (smallest, no transparency)' },
                      { value: 'png', label: 'PNG (lossless)' },
                      { value: 'webp', label: 'WebP (modern, small)' },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dpi">DPI</Label>
                  <SelectInput
                    id="dpi"
                    value={String(dpi)}
                    onChange={(v) => setDpi(Number(v) as Dpi)}
                    options={[
                      { value: '72', label: '72 DPI (screen)' },
                      { value: '150', label: '150 DPI (recommended)' },
                      { value: '300', label: '300 DPI (print)' },
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="range">Page range (optional)</Label>
                <Input
                  id="range"
                  placeholder="All pages · e.g. 1-3, 5, 7-9"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="num"
                />
                <p className="text-xs text-muted-foreground">Leave blank to render all pages.</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={enableTarget}
                    onChange={(e) => setEnableTarget(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm font-medium">Compress each output to a target KB</span>
                </label>
                {enableTarget && (
                  <div className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-center">
                    <input
                      type="number"
                      min={5}
                      max={5000}
                      value={targetKb}
                      onChange={(e) => setTargetKb(Math.max(5, Number(e.target.value) || 0))}
                      className="num h-10 w-full rounded-md border border-input bg-card px-3 text-base focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus"
                    />
                    <p className="text-xs text-muted-foreground">
                      KB target per output image. Applied after rendering.
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <PrivacyLockup variant="compact" />
                <Button variant="glow" size="lg" onClick={start}>
                  Render to {format.toUpperCase()}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {phase.kind === 'rendering' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="font-medium">{phase.stage}</p>
              <span className="num ml-auto text-sm text-muted-foreground">
                {phase.progress}%
              </span>
            </div>
            <Progress value={phase.progress} aria-label={`Rendering: ${phase.progress}%`} />
            <Separator />
            <div className="flex items-center justify-between gap-3">
              <PrivacyLockup variant="compact" />
              <Button variant="ghost" size="sm" onClick={() => phase.controller.abort()}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {phase.kind === 'done' && (
        <Card variant="default" className="border-success-soft bg-success-soft/30">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-start gap-4">
              <Badge variant="success" className="mt-1">
                ✓ Done
              </Badge>
              <div className="flex-1">
                <p className="text-2xl font-semibold">
                  <span className="num">{phase.result.files.length}</span>{' '}
                  image{phase.result.files.length === 1 ? '' : 's'} extracted
                </p>
                <p className="num text-sm text-muted-foreground">
                  Total{' '}
                  {formatKB(phase.result.files.reduce((a, b) => a + b.size, 0))}
                  {phase.result.zip && ` · packaged as ZIP`}
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {phase.result.files.slice(0, 9).map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between gap-3 rounded-md border border-border bg-card p-2 text-xs"
                >
                  <span className="num truncate font-medium">{f.name}</span>
                  <span className="num shrink-0 text-muted-foreground">{formatKB(f.size)}</span>
                </div>
              ))}
              {phase.result.files.length > 9 && (
                <div className="num flex items-center justify-center rounded-md border border-dashed border-border p-2 text-xs text-muted-foreground">
                  +{phase.result.files.length - 9} more in ZIP
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <PrivacyLockup variant="compact" />
              <div className="flex gap-2">
                <Button variant="ghost" size="md" onClick={reset}>
                  Render another
                </Button>
                <Button variant="success" size="md" onClick={downloadAll}>
                  <Download className="h-4 w-4" />
                  Download {phase.result.zip ? 'ZIP' : 'image'}
                </Button>
              </div>
            </div>
            <p className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-success" />
              PDF stayed in your browser. Nothing was uploaded.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function SelectInput({
  id,
  value,
  onChange,
  options,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'flex h-10 w-full cursor-pointer rounded-md border border-input bg-card px-3 text-base',
        'transition-[border-color,box-shadow] duration-fast ease-out-strong',
        'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus',
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
