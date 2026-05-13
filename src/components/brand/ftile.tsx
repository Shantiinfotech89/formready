import { cn } from '@/lib/utils'

interface FTileProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const sizeMap: Record<NonNullable<FTileProps['size']>, { box: string; font: string; chevron: string; chevronPos: string }> = {
  xs: { box: 'w-8 h-8 rounded-[7px]', font: 'text-lg', chevron: 'text-[7px]', chevronPos: 'bottom-1 right-2' },
  sm: { box: 'w-12 h-12 rounded-[11px]', font: 'text-2xl', chevron: 'text-[9px]', chevronPos: 'bottom-1.5 right-3' },
  md: { box: 'w-16 h-16 rounded-[14px]', font: 'text-4xl', chevron: 'text-xs', chevronPos: 'bottom-2 right-4' },
  lg: { box: 'w-24 h-24 rounded-[22px]', font: 'text-6xl', chevron: 'text-sm', chevronPos: 'bottom-4 right-6' },
}

export function FTile({ size = 'md', className, ...props }: FTileProps) {
  const s = sizeMap[size]
  return (
    <div
      role="img"
      aria-label="FormReady icon"
      className={cn(
        'relative flex items-center justify-center font-sans font-bold leading-none text-white shadow-lg',
        'bg-[linear-gradient(135deg,_#3D5AFE_0%,_#0EA5E9_100%)]',
        s.box,
        s.font,
        className,
      )}
      {...props}
    >
      f
      <span
        aria-hidden
        className={cn(
          'absolute leading-none text-success',
          s.chevron,
          s.chevronPos,
        )}
      >
        ▾
      </span>
    </div>
  )
}
