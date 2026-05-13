'use client'

import * as React from 'react'
import { AlertCircle, ArrowRight, Download, Lock, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { FileDropZone } from '@/components/tools/file-drop-zone'
import { KbTargetInput } from '@/components/tools/kb-target-input'
import { ResultPanel } from '@/components/tools/result-panel'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import {
  compressImage,
  type ImageCompressionResult,
  type ImageOutputFormat,
} from '@/lib/compression/image'
import { cn, formatKB } from '@/lib/utils'
import { toast } from '@/lib/toast'

type ToolState =
  | { kind: 'idle' }
  | { kind: 'ready'; file: File; preview: string }
  | { kind: 'compressing'; file: File; progress: number; stage: string; controller: AbortController }
  | { kind: 'success'; file: File; result: ImageCompressionResult; preview: string }
  | { kind: 'error'; message: string }

interface CompressImageToolProps {
  initialTargetKb?: number
  presetName?: string
  /** When set, compresses to these exact dimensions (used by exam/visa preset pages). */
  exactDimensions?: { width: number; height: number }
  /** When set, default the output format. */
  defaultFormat?: ImageOutputFormat
  /** Default presets shown for KB target chips. */
  presets?: number[]
  /** Optional fixed presets only (no free-typed input — used for exam/visa preset pages). */
  lockedPresets?: boolean
  /** Force grayscale + threshold (signature mode). */
  signatureMode?: boolean
  /**
   * Fired when compression succeeds. Lets a parent (e.g. PhotoPresetPicker)
   * track the result for a combined ZIP download. Re-fires with `null` when
   * the user resets.
   */
  onResult?: (result: ImageCompressionResult | null) => void
}

const FORMAT_OPTIONS: { value: ImageOutputFormat; label: string }[] = [
  { value: 'same', label: 'Same as input' },
  { value: 'jpg', label: 'JPG' },
  { value: 'webp', label: 'WebP' },
  { value: 'png', label: 'PNG' },
]

export function CompressImageTool({
  initialTargetKb = 50,
  presetName,
  exactDimensions,
  defaultFormat = 'same',
  presets = [20, 50, 100, 200, 500],
  signatureMode = false,
  onResult,
}: CompressImageToolProps) {
  const [state, setState] = React.useState<ToolState>({ kind: 'idle' })
  const [targetKb, setTargetKb] = React.useState<number>(initialTargetKb)
  const [outputFormat, setOutputFormat] = React.useState<ImageOutputFormat>(defaultFormat)
  const [preserveDimensions, setPreserveDimensions] = React.useState<boolean>(!!exactDimensions)

  const onFileSelected = (file: File) => {
    if (state.kind === 'compressing') state.controller.abort()
    const preview = URL.createObjectURL(file)
    setState({ kind: 'ready', file, preview })
  }

  const reset = () => {
    if (state.kind === 'ready' || state.kind === 'success') {
      URL.revokeObjectURL(state.preview)
    }
    if (state.kind === 'compressing') state.controller.abort()
    setState({ kind: 'idle' })
    onResult?.(null)
  }

  const start = async () => {
    if (state.kind !== 'ready' && state.kind !== 'success') return
    const file = state.file
    const controller = new AbortController()
    if (state.kind === 'success') URL.revokeObjectURL(state.preview)

    setState({
      kind: 'compressing',
      file,
      progress: 0,
      stage: 'Reading image…',
      controller,
    })

    try {
      const result = await compressImage(file, {
        targetKb,
        outputFormat,
        preserveDimensions,
        exactDimensions,
        grayscale: signatureMode,
        thresholdCleanup: signatureMode,
        whiteBackground: signatureMode,
        signal: controller.signal,
        onProgress: (progress, stage) => {
          setState((s) =>
            s.kind === 'compressing' ? { ...s, progress, stage } : s,
          )
        },
      })
      const preview = URL.createObjectURL(result.blob)
      setState({ kind: 'success', file, result, preview })
      onResult?.(result)
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setState({ kind: 'idle' })
        return
      }
      setState({
        kind: 'error',
        message: (err as Error).message || 'Could not compress that image.',
      })
    }
  }

  const downloadResult = () => {
    if (state.kind !== 'success') return
    const url = URL.createObjectURL(state.result.blob)
    const ext = state.result.format.split('/')[1] || 'jpg'
    const baseName = state.file.name.replace(/\.[^.]+$/, '')
    const a = document.createElement('a')
    a.href = url
    a.download = `${baseName}-compressed-${Math.round(state.result.finalBytes / 1024)}KB.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
    toast.downloaded(formatKB(state.result.finalBytes))
  }

  return (
    <div className="space-y-6">
      {state.kind === 'idle' && (
        <FileDropZone
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          maxBytes={25 * 1024 * 1024}
          onFileSelected={onFileSelected}
          heading="Drop your image here"
          subheading="JPG · PNG · WebP · HEIC · max 25MB"
        />
      )}

      {state.kind === 'error' && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="flex items-start gap-3 p-6">
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            <div className="flex-1">
              <p className="font-medium text-destructive">{state.message}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Some HEIC files from older iPhones can&apos;t be decoded in browser. Try saving as JPG from your phone first, then re-upload.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Try again</Button>
          </CardContent>
        </Card>
      )}

      {state.kind === 'ready' && (
        <>
          <Card variant="default" className="overflow-hidden">
            <CardContent className="grid gap-0 p-0 sm:grid-cols-[200px_1fr]">
              <div className="bg-muted">
                <img
                  src={state.preview}
                  alt={state.file.name}
                  className="h-48 w-full object-contain sm:h-full"
                />
              </div>
              <div className="space-y-2 p-5">
                <p className="truncate text-sm font-medium">{state.file.name}</p>
                <p className="num text-xs text-muted-foreground">{formatKB(state.file.size)}</p>
                {state.file.type && (
                  <Badge variant="neutral" className="text-[10px]">
                    {state.file.type}
                  </Badge>
                )}
                <div className="pt-2">
                  <Button variant="ghost" size="sm" onClick={reset}>
                    Choose a different image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6 p-6">
              {presetName && (
                <Badge variant="info">Preset: {presetName}</Badge>
              )}

              <KbTargetInput
                value={targetKb}
                onChange={setTargetKb}
                presets={presets}
                helper={
                  exactDimensions
                    ? `Will resize to ${exactDimensions.width}×${exactDimensions.height} px first.`
                    : `We'll find the best quality that fits in ${targetKb}KB.`
                }
              />

              {!signatureMode && !exactDimensions && (
                <>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="format">Output format</Label>
                      <select
                        id="format"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value as ImageOutputFormat)}
                        className={cn(
                          'flex h-10 w-full cursor-pointer rounded-md border border-input bg-card px-3 text-base',
                          'transition-[border-color,box-shadow] duration-fast ease-out-strong',
                          'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus',
                        )}
                      >
                        {FORMAT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dims">Dimensions</Label>
                      <label
                        htmlFor="dims"
                        className="flex h-10 cursor-pointer items-center gap-3 rounded-md border border-input bg-card px-3"
                      >
                        <input
                          id="dims"
                          type="checkbox"
                          checked={preserveDimensions}
                          onChange={(e) => setPreserveDimensions(e.target.checked)}
                          className="h-4 w-4 cursor-pointer accent-primary"
                        />
                        <span className="text-sm">Preserve original size</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <Separator />
              <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <PrivacyLockup variant="compact" />
                <Button variant="glow" size="lg" onClick={start}>
                  Compress to <span className="num font-semibold">{targetKb}KB</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {state.kind === 'compressing' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              <p className="font-medium">{state.stage}</p>
              <span className="num ml-auto text-sm text-muted-foreground">
                {state.progress}%
              </span>
            </div>
            <Progress value={state.progress} aria-label={`Compressing: ${state.progress}%`} />
            <Separator />
            <div className="flex items-center justify-between gap-3">
              <PrivacyLockup variant="compact" />
              <Button variant="ghost" size="sm" onClick={() => state.controller.abort()}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {state.kind === 'success' && (
        <div className="space-y-4">
          <Card variant="default" className="overflow-hidden">
            <CardContent className="grid gap-0 p-0 sm:grid-cols-2">
              <div className="bg-muted/50 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Original</p>
                <img
                  src={URL.createObjectURL(state.file)}
                  alt="Original"
                  className="max-h-64 w-full rounded object-contain"
                />
                <p className="num mt-2 text-xs text-muted-foreground">{formatKB(state.file.size)}</p>
              </div>
              <div className="border-l border-border bg-success-soft/20 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success-strong">Compressed</p>
                <img
                  src={state.preview}
                  alt="Compressed"
                  className="max-h-64 w-full rounded object-contain"
                />
                <p className="num mt-2 text-xs text-success-strong font-medium">
                  {formatKB(state.result.finalBytes)} ·{' '}
                  {state.result.finalDimensions.width}×{state.result.finalDimensions.height} px
                </p>
              </div>
            </CardContent>
          </Card>

          <ResultPanel
            finalKb={Math.round(state.result.finalBytes / 1024)}
            originalBytes={state.result.originalBytes}
          />

          {!state.result.hitTarget && (
            <Card className="border-warning bg-warning-soft/40">
              <CardContent className="flex items-start gap-3 p-4 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                <p>
                  Couldn&apos;t fit in <span className="num font-medium">{targetKb}KB</span> at this resolution. This is the smallest we could go without dropping below acceptable quality.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PrivacyLockup variant="compact" />
            <div className="flex gap-2">
              <Button variant="ghost" size="md" onClick={reset}>
                Compress another
              </Button>
              <Button variant="success" size="md" onClick={downloadResult}>
                <Download className="h-4 w-4" />
                Download (<span className="num">{Math.round(state.result.finalBytes / 1024)}KB</span>)
              </Button>
            </div>
          </div>

          <p className={cn('flex items-center gap-2 text-xs text-muted-foreground pt-2')}>
            <Lock className="h-3 w-3 text-success" />
            Image stayed in your browser. Nothing was uploaded.
          </p>

          {/* Cross-tool discovery */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/70">Next:</span>
            <a
              href="/compress-pdf"
              className="rounded-sm font-medium text-primary-press underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
            >
              Compress a PDF →
            </a>
            <a
              href="/photo-signature"
              className="rounded-sm font-medium text-primary-press underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
            >
              Exam / visa photo →
            </a>
            <a
              href="/privacy/verify"
              className="rounded-sm font-medium text-primary-press underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
            >
              Verify privacy claim again →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
