import { Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PrivacyLockupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'compact' | 'footer'
  align?: 'start' | 'center'
}

/**
 * The most brand-load-bearing micro-component on the site.
 * Carries the privacy USP on every page. See BRAND_GUIDELINES.md §14.
 */
export function PrivacyLockup({
  variant = 'compact',
  align = 'start',
  className,
  ...props
}: PrivacyLockupProps) {
  const t = useTranslations('privacy')

  return (
    <div
      role="note"
      aria-label="Privacy guarantee"
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium text-muted-foreground',
        align === 'center' && 'justify-center',
        className,
      )}
      {...props}
    >
      <Lock
        aria-hidden
        className="h-3.5 w-3.5 shrink-0 text-success lockup-pulse"
        strokeWidth={2.5}
      />
      {variant === 'compact' ? (
        <span>
          {t('compact')}{' '}
          <a
            href="/privacy/verify"
            className="font-medium text-primary-press underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline rounded-sm"
          >
            {t('verifyLink')} →
          </a>
        </span>
      ) : (
        <span>
          {t('footer')} ·{' '}
          <a
            href="/privacy/verify"
            className="font-medium text-primary-press underline-offset-4 hover:underline focus-visible:outline-none focus-visible:underline rounded-sm"
          >
            {t('footerVerifiable')}
          </a>
        </span>
      )}
    </div>
  )
}
