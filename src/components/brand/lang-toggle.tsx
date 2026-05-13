'use client'

import * as React from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { localeShortLabels, locales, type Locale } from '@/i18n/config'

interface LangToggleProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LangToggle({ className, ...props }: LangToggleProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const [pending, startTransition] = React.useTransition()

  const setLocale = React.useCallback(
    (next: Locale) => {
      if (next === locale) return
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
      startTransition(() => router.refresh())
    },
    [locale, router],
  )

  return (
    <></>
    // <div
    //   role="group"
    //   aria-label="Language"
    //   className={cn(
    //     'inline-flex items-center gap-px rounded-md bg-muted p-0.5 text-xs font-medium',
    //     className,
    //   )}
    //   {...props}
    // >
    //   {locales.map((l) => {
    //     const active = l === locale
    //     return (

    //       <button
    //         key={l}
    //         type="button"
    //         onClick={() => setLocale(l)}
    //         aria-pressed={active}
    //         disabled={pending}
    //         className={cn(
    //           'cursor-pointer rounded px-2.5 py-1 transition-[background-color,color] duration-fast ease-out-strong',
    //           'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    //           active
    //             ? 'bg-card text-foreground shadow-xs'
    //             : 'text-muted-foreground hover:text-foreground',
    //           l === 'hi' && 'font-devanagari',
    //         )}
    //       >
    //         {localeShortLabels[l]}
    //       </button>
    //     )
    //   })}
    // </div>
  )
}
