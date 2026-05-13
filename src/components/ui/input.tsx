import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variantSize?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variantSize = 'md', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex w-full rounded-md border border-input bg-card text-foreground',
          'placeholder:text-muted-foreground',
          'transition-[border-color,box-shadow] duration-fast ease-out-strong',
          'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-focus',
          'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          variantSize === 'sm' && 'h-9 px-3 text-sm',
          variantSize === 'md' && 'h-10 px-3 text-base',
          variantSize === 'lg' && 'h-12 px-4 text-lg',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
