'use client'

import * as React from 'react'
import {
  AlertCircle,
  ArrowRight,
  Download,
  GripVertical,
  ImagePlus,
  Loader2,
  Lock,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import {
  buildImagePdf,
  type Margin,
  type Orientation,
  type PageSize,
  type ImageToPdfResult,
} from '@/lib/compression/image-to-pdf'
import { cn, formatKB } from '@/lib/utils'
import { toast } from '@/lib/toast'

interface ImageToPdfToolProps {
  maxImages?: number
}

interface QueuedImage {
  id: string
  file: File
  preview: string
}

type Phase =
  | { kind: 'building'; controller: AbortController; progress: number; stage: string }
  | { kind: 'done'; result: ImageToPdfResult; outputName: string }
  | { kind: 'error'; message: string }
  | { kind: 'idle' }

export function ImageToPdfTool({ maxImages = 20 }: ImageToPdfToolProps) {
  const [queue, setQueue] = React.useState<QueuedImage[]>([])
  const [pageSize, setPageSize] = React.useState<PageSize>('A4')
  const [orientation, setOrientation] = React.useState<Orientation>('auto')
  const [margin, setMargin] = React.useState<Margin>('small')
  const [enableTarget, setEnableTarget] = React.useState(false)
  const [targetKb, setTargetKb] = React.useState(500)
  const [phase, setPhase] = React.useState<Phase>({ kind: 'idle' })
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | File[] | null) => {
    if (!files) return
    const arr = Array.from(files).filter((f) => f.type.startsWith('image/'))
    setQueue((q) => {
      const next = [...q]
      for (const f of arr) {
        if (next.length >= maxImages) break
        next.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          file: f,
          preview: URL.createObjectURL(f),
        })
      }
      return next
    })
  }

  const removeAt = (id: string) => {
    setQueue((q) => {
      const found = q.find((x) => x.id === id)
      if (found) URL.revokeObjectURL(found.preview)
      return q.filter((x) => x.id !== id)
    })
  }

  const move = (id: string, dir: -1 | 1) => {
    setQueue((q) => {
      const idx = q.findIndex((x) => x.id === id)
      if (idx < 0) return q
      const target = idx + dir
      if (target < 0 || target >= q.length) return q
      const next = [...q]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

  const clear = () => {
    queue.forEach((x) => URL.revokeObjectURL(x.preview))
    setQueue([])
    setPhase({ kind: 'idle' })
  }

  const start = async () => {
    if (queue.length === 0) return
    const controller = new AbortController()
    setPhase({ kind: 'building', controller, progress: 0, stage: 'Starting…' })
    try {
      const result = await buildImagePdf(
        queue.map((q) => q.file),
        {
          pageSize,
          orientation,
          margin,
          targetKb: enableTarget ? targetKb : undefined,
          signal: controller.signal,
          onProgress: (progress, stage) =>
            setPhase((p) => (p.kind === 'building' ? { ...p, progress, stage } : p)),
        },
      )
      setPhase({
        kind: 'done',
        result,
        outputName: `combined-${queue.length}-pages-${Math.round(result.finalBytes / 1024)}KB.pdf`,
      })
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setPhase({ kind: 'idle' })
        return
      }
      setPhase({
        kind: 'error',
        message: (err as Error).message || 'Could not build PDF.',
      })
    }
  }

  const downloadResult = () => {
    if (phase.kind !== 'done') return
    const url = URL.createObjectURL(phase.result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = phase.outputName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
    toast.downloaded(`PDF · ${formatKB(phase.result.finalBytes)}`)
  }

  return (
    <div className="space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          addFiles(e.target.files)
          e.target.value = ''
        }}
      />

      {/* Drop zone */}
      {queue.length === 0 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            addFiles(e.dataTransfer.files)
          }}
          className={cn(
            'group flex w-full flex-col items-center justify-center rounded-xl px-6 py-12 sm:px-12',
            'cursor-pointer border-2 border-dashed border-input bg-muted',
            'transition-[background-color,border-color,transform] duration-base ease-out-strong',
            'hover:border-primary/60 hover:bg-primary/[0.03]',
            'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus',
          )}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-primary bg-card text-primary">
            <ImagePlus className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h4 className="text-lg font-semibold">Drop images here</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            JPG · PNG · WebP · max {maxImages} images
          </p>
        </button>
      )}

      {/* Queue */}
      {queue.length > 0 && phase.kind !== 'done' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm">
                <span className="num font-semibold">{queue.length}</span> image{queue.length === 1 ? '' : 's'}
                <span className="text-muted-foreground"> · they become PDF pages in this order</span>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  disabled={queue.length >= maxImages}
                >
                  <ImagePlus className="h-4 w-4" />
                  Add more
                </Button>
                <Button variant="ghost" size="sm" onClick={clear}>
                  Clear
                </Button>
              </div>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {queue.map((q, i) => (
                <li
                  key={q.id}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-2 transition-colors duration-fast hover:border-primary/40"
                >
                  <span className="num flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold">
                    {i + 1}
                  </span>
                  <img
                    src={q.preview}
                    alt={q.file.name}
                    className="h-12 w-12 shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{q.file.name}</p>
                    <p className="num text-[11px] text-muted-foreground">{formatKB(q.file.size)}</p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => move(q.id, -1)}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="cursor-pointer rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="h-3 w-3 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(q.id, 1)}
                      disabled={i === queue.length - 1}
                      aria-label="Move down"
                      className="cursor-pointer rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAt(q.id)}
                    aria-label="Remove"
                    className="cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      {queue.length > 0 && phase.kind !== 'building' && phase.kind !== 'done' && (
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ps">Page size</Label>
                <SelectInput
                  id="ps"
                  value={pageSize}
                  onChange={(v) => setPageSize(v as PageSize)}
                  options={[
                    { value: 'A4', label: 'A4' },
                    { value: 'Letter', label: 'Letter' },
                    { value: 'Legal', label: 'Legal' },
                    { value: 'Original', label: 'Original (per image)' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ori">Orientation</Label>
                <SelectInput
                  id="ori"
                  value={orientation}
                  onChange={(v) => setOrientation(v as Orientation)}
                  options={[
                    { value: 'auto', label: 'Auto (per image)' },
                    { value: 'portrait', label: 'Portrait' },
                    { value: 'landscape', label: 'Landscape' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mar">Margin</Label>
                <SelectInput
                  id="mar"
                  value={margin}
                  onChange={(v) => setMargin(v as Margin)}
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                  ]}
                />
              </div>
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
                <span className="text-sm font-medium">Compress to a target KB</span>
              </label>
              {enableTarget && (
                <div className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-center">
                  <input
                    type="number"
                    min={20}
                    max={10000}
                    value={targetKb}
                    onChange={(e) => setTargetKb(Math.max(20, Number(e.target.value) || 0))}
                    className="num h-10 w-full rounded-md border border-input bg-card px-3 text-base focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus"
                  />
                  <p className="text-xs text-muted-foreground">
                    KB target. We&apos;ll step quality from 92% down until we hit it.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <PrivacyLockup variant="compact" />
              <Button variant="glow" size="lg" onClick={start}>
                Build PDF ({queue.length} page{queue.length === 1 ? '' : 's'})
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Building */}
      {phase.kind === 'building' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="font-medium">{phase.stage}</p>
              <span className="num ml-auto text-sm text-muted-foreground">
                {phase.progress}%
              </span>
            </div>
            <Progress value={phase.progress} aria-label={`Building: ${phase.progress}%`} />
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

      {phase.kind === 'error' && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="flex items-start gap-3 p-6">
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            <div className="flex-1">
              <p className="font-medium text-destructive">{phase.message}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setPhase({ kind: 'idle' })}>
              Try again
            </Button>
          </CardContent>
        </Card>
      )}

      {phase.kind === 'done' && (
        <Card variant="default" className="border-success-soft bg-success-soft/30">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-start gap-4">
              <Badge variant="success" className="mt-1">
                ✓ PDF ready
              </Badge>
              <div className="flex-1">
                <p className="num text-display-sm font-bold text-foreground">
                  {Math.round(phase.result.finalBytes / 1024)}KB
                </p>
                <p className="text-sm text-muted-foreground">
                  {phase.result.pageCount} page{phase.result.pageCount === 1 ? '' : 's'}{' '}
                  · {phase.outputName}
                </p>
                {!phase.result.hitTarget && (
                  <p className="mt-2 text-xs text-amber-700">
                    Couldn&apos;t fit in your target KB. This is the smallest we got.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <PrivacyLockup variant="compact" />
              <div className="flex gap-2">
                <Button variant="ghost" size="md" onClick={clear}>
                  Build another
                </Button>
                <Button variant="success" size="md" onClick={downloadResult}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <p className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-success" />
              All images stayed in your browser. Nothing was uploaded.
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
