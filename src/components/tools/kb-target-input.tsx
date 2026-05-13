'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { PresetChips } from './preset-chips'

interface KbTargetInputProps {
  label?: string
  helper?: string
  value?: number | string
  onChange?: (value: number) => void
  presets?: number[]
  min?: number
  max?: number
  className?: string
  id?: string
}

/**
 * The "exact KB" input — the heart of the product.
 * Mono numerals + presets + suffix. See BRAND_GUIDELINES.md §12 (KB-target input).
 */
export function KbTargetInput({
  label = 'Target size',
  helper,
  value: valueProp,
  onChange,
  presets = [100, 200, 500, 1000, 2000],
  min = 5,
  max = 10000,
  className,
  id = 'kb-target',
}: KbTargetInputProps) {
  const [internal, setInternal] = React.useState<string>(
    valueProp !== undefined ? String(valueProp) : '100',
  )
  const numericValue = Number(internal) || 0

  const update = (next: string) => {
    setInternal(next)
    const n = Number(next)
    if (!Number.isNaN(n)) onChange?.(n)
  }

  return (
    <div className={cn('space-y-3', className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={internal}
          onChange={(e) => update(e.target.value)}
          className={cn(
            'num w-full rounded-lg border border-input bg-card pr-16 pl-4 py-3',
            'text-3xl font-semibold leading-none text-foreground tracking-tight',
            'transition-[border-color,box-shadow] duration-fast ease-out-strong',
            'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          )}
        />
        <span
          aria-hidden
          className="num pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base font-medium text-muted-foreground"
        >
          KB
        </span>
      </div>
      <PresetChips
        values={presets}
        selected={presets.includes(numericValue) ? numericValue : null}
        onChange={(v) => update(String(v))}
        ariaLabel="Common KB targets"
      />
      {helper && (
        <p className="text-xs text-muted-foreground">{helper}</p>
      )}
    </div>
  )
}
