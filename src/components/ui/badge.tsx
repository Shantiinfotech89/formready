import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  cn(
    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5',
    'text-xs font-medium leading-4',
    'transition-colors duration-fast',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2',
  ),
  {
    variants: {
      variant: {
        success: 'bg-success-soft text-success-strong',
        info: 'bg-primary/10 text-primary-press',
        warning: 'bg-warning-soft text-amber-900',
        destructive: 'bg-destructive-soft text-red-900',
        neutral: 'bg-muted text-foreground',
        tactical: 'bg-tactical-soft text-orange-900',
        outline: 'border border-border bg-card text-foreground',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
