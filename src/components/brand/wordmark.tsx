import { cn } from '@/lib/utils'

interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses: Record<NonNullable<WordmarkProps['size']>, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-display-md',
  xl: 'text-display-xl',
}

export function Wordmark({ size = 'md', className, ...props }: WordmarkProps) {
  return (
    <span
      className={cn(
        'inline-flex font-sans font-bold tracking-[-0.02em] leading-none select-none',
        sizeClasses[size],
        className,
      )}
      aria-label="FormReady"
      {...props}
    >
      <span className="text-primary">form</span>
      <span className="text-success">ready</span>
    </span>
  )
}
