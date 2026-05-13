'use client'

import { cn } from '@/lib/utils'

interface PresetChipsProps {
  values: number[]
  selected?: number | null
  onChange?: (value: number) => void
  unit?: string
  className?: string
  ariaLabel?: string
}

export function PresetChips({
  values,
  selected,
  onChange,
  unit = '',
  className,
  ariaLabel = 'Size presets',
}: PresetChipsProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {values.map((v) => {
        const active = selected === v
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange?.(v)}
            className={cn(
              'num cursor-pointer rounded-full px-3 py-1 text-xs font-medium leading-4',
              'transition-[background-color,color,transform] duration-fast ease-out-strong',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              'active:scale-[0.97]',
              active
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-border',
            )}
          >
            {v}{unit && <span className="ml-0.5 text-[10px] opacity-70">{unit}</span>}
          </button>
        )
      })}
    </div>
  )
}
