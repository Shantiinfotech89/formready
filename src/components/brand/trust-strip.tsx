import { CloudOff, Lock, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const items = [
  { key: 'browser', icon: Lock },
  { key: 'noUpload', icon: CloudOff },
  { key: 'verify', icon: ShieldCheck },
] as const

/** Three-cell expanded trust strip — homepage hero. See BRAND_GUIDELINES.md §14. */
export function TrustStrip({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations('privacy.trust')
  return (
    <div
      className={cn(
        'grid gap-6 rounded-2xl border bg-card p-8 sm:grid-cols-3',
        className,
      )}
      {...props}
    >
      {items.map(({ key, icon: Icon }) => (
        <div key={key} className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success-strong">
            <Icon aria-hidden className="h-5 w-5" strokeWidth={2} />
          </div>
          <h4 className="text-base font-semibold text-foreground">
            {t(`${key}.title`)}
          </h4>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {t(`${key}.body`)}
          </p>
        </div>
      ))}
    </div>
  )
}
