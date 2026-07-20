import Image from 'next/image'
import { cn } from '@/lib/utils'

interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses: Record<NonNullable<WordmarkProps['size']>, string> = {
  sm: 'h-7 w-[144px]',
  md: 'h-8 w-[164px]',
  lg: 'h-10 w-[205px]',
  xl: 'h-12 w-[246px]',
}

export function Wordmark({ size = 'md', className, ...props }: WordmarkProps) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 select-none',
        sizeClasses[size],
        className,
      )}
      aria-label="Compress4"
      {...props}
    >
      <Image
        src="/logo-header.png"
        alt="Compress 4"
        fill
        sizes="(max-width: 768px) 144px, 164px"
        className="object-contain"
        priority
      />
    </span>
  )
}
