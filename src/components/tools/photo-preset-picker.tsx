'use client'

import * as React from 'react'
import { ArrowLeft, ArrowRight, Download, ExternalLink, Package, Sparkles } from 'lucide-react'
import JSZip from 'jszip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CompressImageTool } from '@/components/tools/compress-image-tool'
import { examPresets, visaPresets, type PhotoPreset } from '@/lib/presets/photo'
import type { ImageCompressionResult } from '@/lib/compression/image'
import { cn, formatKB } from '@/lib/utils'
import { toast } from '@/lib/toast'

type Mode =
  | { kind: 'browse' }
  | { kind: 'preset'; preset: PhotoPreset }
  | { kind: 'custom'; width: number; height: number; targetKb: number }

interface PhotoPresetPickerProps {
  initialPresetSlug?: string
}

export function PhotoPresetPicker({ initialPresetSlug }: PhotoPresetPickerProps) {
  const initial: Mode = React.useMemo(() => {
    if (!initialPresetSlug) return { kind: 'browse' }
    const found = [...examPresets, ...visaPresets].find((p) => p.slug === initialPresetSlug)
    return found ? { kind: 'preset', preset: found } : { kind: 'browse' }
  }, [initialPresetSlug])

  const [mode, setMode] = React.useState<Mode>(initial)
  const [customW, setCustomW] = React.useState<number>(200)
  const [customH, setCustomH] = React.useState<number>(230)
  const [customKb, setCustomKb] = React.useState<number>(50)

  if (mode.kind === 'preset') {
    return (
      <PresetView
        preset={mode.preset}
        onBack={() => setMode({ kind: 'browse' })}
      />
    )
  }

  if (mode.kind === 'custom') {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setMode({ kind: 'browse' })}>
          <ArrowLeft className="h-4 w-4" />
          Back to all presets
        </Button>

        <Card variant="default">
          <CardContent className="space-y-5 p-6">
            <div>
              <Badge variant="neutral" className="mb-2">Custom dimensions</Badge>
              <h2 className="text-xl font-bold tracking-tight">Pick your size</h2>
              <p className="mt-1 text-sm text-muted-foreground">Enter the exact pixels and KB target your form requires.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="cw">Width (px)</Label>
                <Input
                  id="cw"
                  type="number"
                  min={50}
                  max={4000}
                  value={customW}
                  onChange={(e) => setCustomW(Math.max(50, Number(e.target.value) || 0))}
                  className="num"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ch">Height (px)</Label>
                <Input
                  id="ch"
                  type="number"
                  min={50}
                  max={4000}
                  value={customH}
                  onChange={(e) => setCustomH(Math.max(50, Number(e.target.value) || 0))}
                  className="num"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ck">Target KB</Label>
                <Input
                  id="ck"
                  type="number"
                  min={5}
                  max={5000}
                  value={customKb}
                  onChange={(e) => setCustomKb(Math.max(5, Number(e.target.value) || 0))}
                  className="num"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <CompressImageTool
          initialTargetKb={customKb}
          exactDimensions={{ width: customW, height: customH }}
          presets={[customKb]}
        />
      </div>
    )
  }

  // browse mode
  return (
    <div className="space-y-12">
      <PresetGrid title="Indian Exams" subtitle="Photo + signature pre-set to official spec." presets={examPresets} onPick={(p) => setMode({ kind: 'preset', preset: p })} />
      <PresetGrid title="Visa" subtitle="Embassy-spec photo dimensions and KB limits." presets={visaPresets} onPick={(p) => setMode({ kind: 'preset', preset: p })} />

      <Card variant="warm">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="neutral" className="mb-2">
              <Sparkles className="h-3 w-3" />
              Don&apos;t see your form?
            </Badge>
            <h3 className="text-lg font-semibold">Use custom dimensions</h3>
            <p className="mt-1 text-sm text-muted-foreground">Type the exact W×H pixels and target KB your portal demands.</p>
          </div>
          <Button variant="primary" onClick={() => setMode({ kind: 'custom', width: customW, height: customH, targetKb: customKb })}>
            Custom dimensions
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Per-exam filename conventions for the combined ZIP. Keep these matched to
 * what each form portal expects when uploading; falls back to a generic name
 * for visa presets.
 */
const ZIP_FILENAMES: Record<string, { photo: string; signature: string }> = {
  'ssc-cgl': { photo: 'applicant_photo.jpg', signature: 'applicant_signature.jpg' },
  'upsc-cse': { photo: 'photo.jpg', signature: 'signature.jpg' },
  'neet-ug': { photo: 'Photo.jpg', signature: 'Signature.jpg' },
  'jee-main': { photo: 'Photo.jpg', signature: 'Signature.jpg' },
  'ibps-po': { photo: 'applicant_photo.jpg', signature: 'applicant_signature.jpg' },
  'gate': { photo: 'photograph.jpg', signature: 'signature.jpg' },
  'cuet': { photo: 'photo.jpg', signature: 'signature.jpg' },
}

function zipNamesFor(slug: string): { photo: string; signature: string } {
  return ZIP_FILENAMES[slug] ?? { photo: 'photo.jpg', signature: 'signature.jpg' }
}

function PresetView({ preset: p, onBack }: { preset: PhotoPreset; onBack: () => void }) {
  const [photoResult, setPhotoResult] = React.useState<ImageCompressionResult | null>(null)
  const [sigResult, setSigResult] = React.useState<ImageCompressionResult | null>(null)
  const [zipBuilding, setZipBuilding] = React.useState(false)

  const buildAndDownloadZip = async () => {
    if (!photoResult || !sigResult) return
    setZipBuilding(true)
    try {
      const names = zipNamesFor(p.slug)
      const zip = new JSZip()
      zip.file(names.photo, photoResult.blob)
      zip.file(names.signature, sigResult.blob)
      const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${p.slug}-photo-signature.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
      toast.downloaded(`ZIP · ${formatKB(zipBlob.size)}`)
    } finally {
      setZipBuilding(false)
    }
  }

  const bothReady = photoResult !== null && sigResult !== null

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
        Back to all presets
      </Button>

      <Card variant="warm">
        <CardContent className="space-y-4 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant={p.category === 'exam' ? 'tactical' : 'info'} className="mb-2">
                {p.category === 'exam' ? 'Indian exam' : 'Visa'}
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <SpecCell label="Photo size" value={`${p.photo.width}×${p.photo.height} px`} />
            <SpecCell
              label="Photo KB"
              value={p.photo.minKb ? `${p.photo.minKb}–${p.photo.maxKb}` : `≤ ${p.photo.maxKb}`}
            />
            <SpecCell label="Format" value={p.photo.format.toUpperCase()} />
            <SpecCell
              label="Background"
              value={p.photo.background === 'white' ? 'White' : p.photo.background === 'off-white' ? 'Off-white' : 'Plain light'}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Photo</h3>
        <CompressImageTool
          initialTargetKb={Math.min(p.photo.maxKb, p.photo.minKb ? Math.round((p.photo.minKb + p.photo.maxKb) / 2) : p.photo.maxKb)}
          presetName={`${p.name} — Photo`}
          exactDimensions={{ width: p.photo.width, height: p.photo.height }}
          defaultFormat={p.photo.format}
          presets={
            p.photo.minKb
              ? [p.photo.minKb, Math.round((p.photo.minKb + p.photo.maxKb) / 2), p.photo.maxKb]
              : [Math.round(p.photo.maxKb / 2), p.photo.maxKb]
          }
          onResult={setPhotoResult}
        />
      </div>

      {p.signature && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Signature</h3>
          <CompressImageTool
            initialTargetKb={p.signature.minKb ? Math.round((p.signature.minKb + p.signature.maxKb) / 2) : p.signature.maxKb}
            presetName={`${p.name} — Signature`}
            exactDimensions={{ width: p.signature.width, height: p.signature.height }}
            defaultFormat={p.signature.format}
            signatureMode
            presets={
              p.signature.minKb
                ? [p.signature.minKb, Math.round((p.signature.minKb + p.signature.maxKb) / 2), p.signature.maxKb]
                : [Math.round(p.signature.maxKb / 2), p.signature.maxKb]
            }
            onResult={setSigResult}
          />
        </div>
      )}

      {/* Combined ZIP download — appears only for presets with a signature, when both are processed. */}
      {p.signature && (
        <Card
          variant="default"
          className={cn(
            'transition-[border-color,background-color] duration-base ease-out-strong',
            bothReady
              ? 'border-success bg-success-soft/30'
              : 'border-dashed border-border bg-muted/30',
          )}
        >
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  bothReady ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground',
                )}
              >
                <Package className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  {bothReady ? 'Both files ready — download as ZIP' : 'Combined download'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {bothReady ? (
                    <>
                      <span className="num">
                        {formatKB(photoResult!.finalBytes)}
                      </span>{' '}
                      photo +{' '}
                      <span className="num">
                        {formatKB(sigResult!.finalBytes)}
                      </span>{' '}
                      signature, named per {p.name} convention.
                    </>
                  ) : (
                    `Compress both photo and signature above to enable a one-click ZIP download.`
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="success"
              size="md"
              onClick={buildAndDownloadZip}
              disabled={!bothReady || zipBuilding}
            >
              <Download className="h-4 w-4" />
              {zipBuilding ? 'Building…' : 'Download ZIP'}
            </Button>
          </CardContent>
        </Card>
      )}

      <p className="border-t border-border pt-4 text-sm text-muted-foreground">
        Source:{' '}
        <a
          href={p.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary-press hover:underline"
        >
          {p.sourceLabel}
          <ExternalLink className="h-3 w-3" />
        </a>{' '}
        · verified {p.verifiedAt}
      </p>
    </div>
  )
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="num mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
  )
}

function PresetGrid({
  title,
  subtitle,
  presets,
  onPick,
}: {
  title: string
  subtitle: string
  presets: PhotoPreset[]
  onPick: (p: PhotoPreset) => void
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {presets.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => onPick(p)}
            className={cn(
              'group cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-[box-shadow,transform,border-color] duration-base ease-out-strong',
              'hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5',
              'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus',
              'active:scale-[0.98]',
            )}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold">{p.shortLabel}</h4>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-fast group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <p className="num text-[11px] text-muted-foreground">
              {p.photo.width}×{p.photo.height} ·{' '}
              {p.photo.minKb ? `${p.photo.minKb}–${p.photo.maxKb}` : `≤${p.photo.maxKb}`}KB
            </p>
            {p.signature && (
              <p className="num mt-0.5 text-[11px] text-muted-foreground">
                + Sig: {p.signature.width}×{p.signature.height} ·{' '}
                {p.signature.minKb ? `${p.signature.minKb}–${p.signature.maxKb}` : `≤${p.signature.maxKb}`}KB
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
