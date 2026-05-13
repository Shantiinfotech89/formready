import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold',
    'rounded-lg select-none cursor-pointer',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-fast ease-out-strong',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none',
    'active:scale-[0.97]',
  ),
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:-translate-y-px hover:shadow-md active:bg-primary-press',
        glow:
          'bg-primary text-primary-foreground shadow-xl hover:bg-primary-hover hover:-translate-y-0.5 active:bg-primary-press',
        secondary:
          'border border-primary bg-card text-primary hover:bg-primary/5 active:bg-primary/10',
        ghost:
          'text-foreground hover:bg-muted active:bg-muted/80',
        success:
          'bg-success text-success-foreground hover:bg-success-strong active:bg-success-strong shadow-sm',
        destructive:
          'border border-destructive bg-card text-destructive hover:bg-destructive/5 active:bg-destructive/10',
        link:
          'text-primary-press underline-offset-4 hover:underline rounded-none px-0 py-0 active:scale-100 shadow-none',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
