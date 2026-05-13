'use client'

import * as React from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {
  AlertCircle,
  Download,
  FlipHorizontal2,
  Lock,
  RotateCcw,
  RotateCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { FileDropZone } from '@/components/tools/file-drop-zone'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import { cn, formatKB } from '@/lib/utils'

type AspectKey = 'free' | 'square' | 'passport' | 'a4-portrait' | 'a4-landscape' | '4:3' | '16:9'

const ASPECTS: Record<AspectKey, number | undefined> = {
  free: undefined,
  square: 1,
  passport: 200 / 230,
  'a4-portrait': 210 / 297,
  'a4-landscape': 297 / 210,
  '4:3': 4 / 3,
  '16:9': 16 / 9,
}

const ASPECT_LABELS: Record<AspectKey, string> = {
  free: 'Free',
  square: 'Square (1:1)',
  passport: 'Passport (200×230)',
  'a4-portrait': 'A4 portrait',
  'a4-landscape': 'A4 landscape',
  '4:3': '4:3',
  '16:9': '16:9',
}

type Phase =
  | { kind: 'idle' }
  | { kind: 'editing'; file: File; src: string }
  | { kind: 'done'; file: File; outputBlob: Blob; outputUrl: string; outputName: string; outputSize: number }

export function CropRotateTool() {
  const [phase, setPhase] = React.useState<Phase>({ kind: 'idle' })
  const [aspect, setAspect] = React.useState<AspectKey>('free')
  const [crop, setCrop] = React.useState<Crop>()
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>()
  const [rotation, setRotation] = React.useState<number>(0)
  const imgRef = React.useRef<HTMLImageElement>(null)

  const onFileSelected = (file: File) => {
    if (phase.kind === 'editing') URL.revokeObjectURL(phase.src)
    const src = URL.createObjectURL(file)
    setPhase({ kind: 'editing', file, src })
    setCrop(undefined)
    setCompletedCrop(undefined)
    setRotation(0)
  }

  const reset = () => {
    if (phase.kind === 'editing') URL.revokeObjectURL(phase.src)
    if (phase.kind === 'done') URL.revokeObjectURL(phase.outputUrl)
    setPhase({ kind: 'idle' })
    setCrop(undefined)
    setCompletedCrop(undefined)
    setRotation(0)
  }

  const onImageLoad = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = e.currentTarget
      const a = ASPECTS[aspect]
      if (a) {
        const c = centerCrop(
          makeAspectCrop({ unit: '%', width: 90 }, a, naturalWidth, naturalHeight),
          naturalWidth,
          naturalHeight,
        )
        setCrop(c)
      }
    },
    [aspect],
  )

  const changeAspect = (next: AspectKey) => {
    setAspect(next)
    if (imgRef.current) {
      const a = ASPECTS[next]
      const { naturalWidth, naturalHeight } = imgRef.current
      if (a) {
        const c = centerCrop(
          makeAspectCrop({ unit: '%', width: 90 }, a, naturalWidth, naturalHeight),
          naturalWidth,
          naturalHeight,
        )
        setCrop(c)
      } else {
        setCrop(undefined)
      }
    }
  }

  const apply = async () => {
    if (phase.kind !== 'editing' || !imgRef.current) return
    const img = imgRef.current
    const naturalW = img.naturalWidth
    const naturalH = img.naturalHeight
    const scaleX = naturalW / img.width
    const scaleY = naturalH / img.height

    // Step 1: get crop region in natural pixels (or whole image if no crop)
    const sx = completedCrop ? completedCrop.x * scaleX : 0
    const sy = completedCrop ? completedCrop.y * scaleY : 0
    const sw = completedCrop ? completedCrop.width * scaleX : naturalW
    const sh = completedCrop ? completedCrop.height * scaleY : naturalH

    // Step 2: render onto a canvas, applying rotation
    const isQuarterTurn = rotation % 180 !== 0
    const outW = isQuarterTurn ? sh : sw
    const outH = isQuarterTurn ? sw : sh

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(outW)
    canvas.height = Math.round(outH)
    const ctx = canvas.getContext('2d', { alpha: phase.file.type !== 'image/jpeg' })
    if (!ctx) throw new Error('Canvas 2D context unavailable')
    if (phase.file.type === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.drawImage(img, sx, sy, sw, sh, -sw / 2, -sh / 2, sw, sh)

    const outputType = phase.file.type === 'image/png' ? 'image/png' : 'image/jpeg'
    const outputBlob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
        outputType,
        0.95,
      ),
    )
    canvas.width = canvas.height = 0

    const ext = outputType === 'image/png' ? 'png' : 'jpg'
    const baseName = phase.file.name.replace(/\.[^.]+$/, '')
    const outputName = `${baseName}-edited.${ext}`
    const outputUrl = URL.createObjectURL(outputBlob)

    URL.revokeObjectURL(phase.src)
    setPhase({
      kind: 'done',
      file: phase.file,
      outputBlob,
      outputUrl,
      outputName,
      outputSize: outputBlob.size,
    })
  }

  const downloadResult = () => {
    if (phase.kind !== 'done') return
    const a = document.createElement('a')
    a.href = phase.outputUrl
    a.download = phase.outputName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const sendToCompressor = () => {
    if (phase.kind !== 'done') return
    downloadResult()
    // After download, let user re-upload to /compress-image — explicit download
    // step keeps the flow client-side without sessionStorage hand-off.
    window.location.href = '/compress-image'
  }

  return (
    <div className="space-y-6">
      {phase.kind === 'idle' && (
        <FileDropZone
          accept="image/jpeg,image/png,image/webp"
          maxBytes={25 * 1024 * 1024}
          onFileSelected={onFileSelected}
          heading="Drop your image here"
          subheading="JPG · PNG · WebP · max 25MB"
        />
      )}

      {phase.kind === 'editing' && (
        <>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rotate</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                >
                  <RotateCcw className="h-4 w-4" />
                  −90°
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                >
                  <RotateCw className="h-4 w-4" />
                  +90°
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation((r) => (r + 180) % 360)}
                >
                  <FlipHorizontal2 className="h-4 w-4" />
                  180°
                </Button>
                <Badge variant="neutral" className="num ml-2">
                  {rotation}°
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Aspect</Label>
                <select
                  value={aspect}
                  onChange={(e) => changeAspect(e.target.value as AspectKey)}
                  className={cn(
                    'flex h-9 cursor-pointer rounded-md border border-input bg-card px-3 text-sm',
                    'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus',
                  )}
                >
                  {(Object.keys(ASPECTS) as AspectKey[]).map((k) => (
                    <option key={k} value={k}>{ASPECT_LABELS[k]}</option>
                  ))}
                </select>
              </div>

              <Separator />

              <div className="flex justify-center overflow-hidden rounded-lg bg-muted p-3">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={ASPECTS[aspect]}
                  className="max-w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={phase.src}
                    onLoad={onImageLoad}
                    alt="Edit source"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      maxHeight: '60vh',
                      maxWidth: '100%',
                    }}
                  />
                </ReactCrop>
              </div>

              <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <PrivacyLockup variant="compact" />
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={reset}>
                    Cancel
                  </Button>
                  <Button variant="glow" size="md" onClick={apply}>
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {phase.kind === 'done' && (
        <Card variant="default" className="border-success-soft bg-success-soft/30">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-start gap-4">
              <Badge variant="success" className="mt-1">
                ✓ Edited
              </Badge>
              <div className="flex-1">
                <p className="text-2xl font-semibold">{phase.outputName}</p>
                <p className="num text-sm text-muted-foreground">{formatKB(phase.outputSize)}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <img
                src={phase.outputUrl}
                alt="Edited preview"
                className="max-h-96 w-full object-contain"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <PrivacyLockup variant="compact" />
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="md" onClick={reset}>
                  Edit another
                </Button>
                <Button variant="success" size="md" onClick={downloadResult}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="primary" size="md" onClick={sendToCompressor}>
                  Compress this →
                </Button>
              </div>
            </div>

            <p className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-success" />
              Image stayed in your browser. Nothing was uploaded.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
