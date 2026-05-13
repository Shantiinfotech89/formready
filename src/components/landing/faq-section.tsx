import { ChevronDown } from 'lucide-react'
import type { LandingFaq } from '@/lib/landing-pages/types'

interface FaqSectionProps {
  faqs: LandingFaq[]
}

/**
 * Native <details>/<summary>-based accordion. Server-component-friendly (no JS).
 * SEO content is fully present even when collapsed (good for Google).
 * The corresponding FAQPage JSON-LD is injected separately on the landing page.
 */
export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details
          key={f.q}
          className="group rounded-lg border border-border bg-card p-5 transition-colors duration-fast hover:border-primary/30 [&[open]]:border-primary/40 [&[open]]:shadow-sm"
          // First entry open by default for visual scannability
          open={i === 0}
        >
          <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
            <h3 className="flex-1 pr-3 text-base font-semibold leading-snug">{f.q}</h3>
            <ChevronDown
              aria-hidden
              className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-fast ease-out-strong group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
