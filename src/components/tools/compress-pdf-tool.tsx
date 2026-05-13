'use client'

import * as React from 'react'
import { AlertCircle, ArrowRight, Download, Lock, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FileDropZone } from '@/components/tools/file-drop-zone'
import { KbTargetInput } from '@/components/tools/kb-target-input'
import { ResultPanel } from '@/components/tools/result-panel'
import { PdfPreview } from '@/components/tools/pdf-preview'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import { compressPdf, type CompressionResult } from '@/lib/compression/pdf'
import { cn, formatKB } from '@/lib/utils'
import { toast } from '@/lib/toast'

type ToolState =
  | { kind: 'idle' }
  | { kind: 'ready'; file: File }
  | { kind: 'compressing'; file: File; progress: number; stage: string; controller: AbortController }
  | { kind: 'success'; file: File; result: CompressionResult }
  | { kind: 'error'; file?: File; message: string }

interface CompressPdfToolProps {
  /** Pre-filled target (used by programmatic landing pages). */
  initialTargetKb?: number
  /** Optional preset name shown on the result page (e.g., "SSC CGL"). */
  presetName?: string
}

export function CompressPdfTool({ initialTargetKb = 100, presetName }: CompressPdfToolProps) {
  const [state, setState] = React.useState<ToolState>({ kind: 'idle' })
  const [targetKb, setTargetKb] = React.useState<number>(initialTargetKb)

  const onFileSelected = (file: File) => {
    if (state.kind === 'compressing') state.controller.abort()
    setState({ kind: 'ready', file })
  }

  const reset = () => {
    if (state.kind === 'compressing') state.controller.abort()
    setState({ kind: 'idle' })
  }

  const start = async () => {
    if (state.kind !== 'ready' && state.kind !== 'success') return
    const file = state.kind === 'ready' ? state.file : state.file
    const controller = new AbortController()
    setState({
      kind: 'compressing',
      file,
      progress: 0,
      stage: 'Loading compression engine…',
      controller,
    })
    try {
      const result = await compressPdf(file, {
        targetKb,
        signal: controller.signal,
        onProgress: (progress, stage) => {
          setState((s) =>
            s.kind === 'compressing' ? { ...s, progress, stage } : s,
          )
        },
      })
      setState({ kind: 'success', file, result })
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setState({ kind: 'idle' })
        return
      }
      setState({
        kind: 'error',
        file,
        message: (err as Error).message || 'Something broke. Try again.',
      })
    }
  }

  const downloadResult = () => {
    if (state.kind !== 'success') return
    const url = URL.createObjectURL(state.result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = state.file.name.replace(/\.pdf$/i, '') + `-compressed-${Math.round(state.result.finalBytes / 1024)}KB.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
    toast.downloaded(formatKB(state.result.finalBytes))
  }

  return (
    <div className="space-y-6">
      {/* File drop */}
      {state.kind === 'idle' && (
        <FileDropZone
          accept="application/pdf"
          maxBytes={50 * 1024 * 1024}
          onFileSelected={onFileSelected}
          heading="Drop your PDF here"
          subheading="or click to browse · max 50MB · stays on your device"
        />
      )}

      {state.kind === 'error' && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="flex items-start gap-3 p-6">
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            <div className="flex-1">
              <p className="font-medium text-destructive">{state.message}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Some PDFs are password-protected, corrupted, or too complex for browser-based compression. Try a different file or unlock it first.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Try again</Button>
          </CardContent>
        </Card>
      )}

      {state.kind === 'ready' && (
        <>
          <FileDropZone state="active" selectedFile={state.file} onClear={reset} />
          <Card className="overflow-hidden">
            <CardContent className="space-y-6 p-6">
              {presetName && (
                <Badge variant="info">Preset: {presetName}</Badge>
              )}
              <KbTargetInput
                value={targetKb}
                onChange={setTargetKb}
                helper={`Original: ${formatKB(state.file.size)}. We'll iteratively compress until we hit your target.`}
              />
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
          <ResultPanel
            finalKb={Math.round(state.result.finalBytes / 1024)}
            originalBytes={state.result.originalBytes}
          />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Preview — verify before downloading
            </p>
            <PdfPreview blob={state.result.blob} />
          </div>
          {!state.result.hitTarget && (
            <Card className="border-warning bg-warning-soft/40">
              <CardContent className="flex items-start gap-3 p-4 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                <p>
                  Couldn&apos;t fit in <span className="num font-medium">{targetKb}KB</span> without making text unreadable. This is the smallest we can go while keeping it legible.
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
          <p className={cn(
            'flex items-center gap-2 text-xs text-muted-foreground',
            'pt-2',
          )}>
            <Lock className="h-3 w-3 text-success" />
            File stayed in your browser. Nothing was uploaded.
          </p>

          {/* Cross-tool discovery — surface relevant next actions without nagging */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/70">Next:</span>
            <a
              href="/compress-image"
              className="rounded-sm font-medium text-primary-press underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline"
            >
              Compress an image →
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
