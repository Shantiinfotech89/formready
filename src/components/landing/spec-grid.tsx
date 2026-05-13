import type { PhotoPreset } from '@/lib/presets/photo'

interface SpecGridProps {
  preset: PhotoPreset
}

/** Four-cell key spec readout — used at the top of exam/visa landing pages. */
export function SpecGrid({ preset }: SpecGridProps) {
  const photoSize = `${preset.photo.width}×${preset.photo.height} px`
  const photoKb = preset.photo.minKb
    ? `${preset.photo.minKb}–${preset.photo.maxKb}`
    : `≤ ${preset.photo.maxKb}`
  const bg =
    preset.photo.background === 'white'
      ? 'White'
      : preset.photo.background === 'off-white'
        ? 'Off-white'
        : preset.photo.background === 'plain-light'
          ? 'Plain light'
          : '—'

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      <SpecCell label="Photo size" value={photoSize} />
      <SpecCell label="Photo KB" value={`${photoKb} KB`} />
      <SpecCell label="Format" value={preset.photo.format.toUpperCase()} />
      <SpecCell label="Background" value={bg} />
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
