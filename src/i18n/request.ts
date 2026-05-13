import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { defaultLocale, locales, type Locale } from './config'

function negotiateLocale(): Locale {
  const cookieStore = cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale

  const acceptLang = headers().get('accept-language') ?? ''
  if (acceptLang.toLowerCase().includes('hi')) return 'hi'

  return defaultLocale
}

export default getRequestConfig(async () => {
  const locale = negotiateLocale()
  const messages = (await import(`./messages/${locale}.json`)).default
  return { locale, messages }
})
