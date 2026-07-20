# Compress4

Privacy-first PDF & image compression to **exact KB**. All compression happens in your browser — your file never leaves your device.

## Status: Design system v0.1

This repo currently contains:

- [SOW_Compress4_PDF_Image_Compression.md](SOW_Compress4_PDF_Image_Compression.md) — full functional spec
- [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) — brand bible (Razorpay-grade Indian Fintech-Modern)
- `brand/` — design tokens (`tokens.ts`, `tokens.css`) + standalone HTML preview (`preview.html`)
- `src/` — Next.js 14 App Router scaffold with the design system applied

**Real product pages have not been built yet.** Next milestone: tool pages (`/compress-pdf`, `/compress-image`, `/photo-signature`) and programmatic SEO landing pages.

## Stack

- **Next.js 14** (App Router · Server Components by default)
- **TypeScript** (strict)
- **Tailwind CSS** (CSS variables for theming, semantic shadcn-style tokens)
- **shadcn/ui** (custom-themed primitives — `src/components/ui/`)
- **next-intl** (English + Hindi at launch · cookie-based locale)
- **next/font** (Inter, Hind, JetBrains Mono — self-hosted, zero CLS)
- **lucide-react** (icon library)
- **react-hook-form + zod** (forms — wired but not yet used)

## Run

```bash
npm install
npm run dev
```

Then visit:

- [http://localhost:3000/](http://localhost:3000/) — placeholder home
- [http://localhost:3000/design-system](http://localhost:3000/design-system) — internal design-system reference (every token + every component)

## Project layout

```
.
├── BRAND_GUIDELINES.md            ← single source of truth for brand rules
├── SOW_Compress4_PDF_Image_Compression.md
├── brand/
│   ├── tokens.ts                  ← TS design tokens (importable by any tool)
│   ├── tokens.css                 ← CSS custom properties
│   └── preview.html               ← standalone HTML brand preview
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← root layout · loads fonts · NextIntlProvider
│   │   ├── page.tsx               ← placeholder home
│   │   ├── globals.css            ← Tailwind + design tokens (HSL CSS vars)
│   │   └── design-system/
│   │       └── page.tsx           ← internal design-system showcase
│   ├── components/
│   │   ├── ui/                    ← shadcn primitives (button, input, card, …)
│   │   ├── brand/                 ← Wordmark, FTile, PrivacyLockup, TrustStrip, LangToggle
│   │   ├── tools/                 ← FileDropZone, KbTargetInput, PresetChips, ResultPanel
│   │   └── layout/                ← SiteHeader, SiteFooter
│   ├── i18n/
│   │   ├── config.ts              ← locale list + labels
│   │   ├── request.ts             ← cookie + Accept-Language locale negotiation
│   │   └── messages/
│   │       ├── en.json
│   │       └── hi.json
│   └── lib/
│       └── utils.ts               ← `cn()` helper, byte/KB formatters
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Brand decisions (locked)

See [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) for full rules.

| | |
|---|---|
| **Primary** | `#3D5AFE` Form Indigo — CTAs, brand mark, focus rings |
| **Secondary** | `#0EA5E9` Precision Blue — progress, info |
| **Success** | `#10B981` Achievement Green — file ready, privacy lockup |
| **Tactical** | `#F97316` Saffron — Indian-keyword landing pages only, max 5% surface |
| **Fonts** | Inter (Latin) · Hind (Devanagari) · JetBrains Mono (KB numbers) |
| **Default radius** | 8px |
| **Privacy lockup** | every page, every footer, links to `/privacy/verify` |

## Polish principles applied

From Emil Kowalski's design engineering philosophy:

- Custom easing curves (`ease-out-strong`, `ease-in-out-strong`, `ease-soft-spring`) — built-in CSS easings are too weak
- All buttons: `scale(0.97)` on `:active` for instant feedback
- Tooltips/popovers scale from 0.96 (never 0), origin-aware (Radix CSS variable)
- `prefers-reduced-motion: reduce` collapses motion to ~0ms
- All UI animations under 300ms; transitions over keyframes for interruptibility
- Hover gating: `@media (hover: hover) and (pointer: fine)` to avoid touch false-positives

## Next milestones

1. Logo refinement — currently the wordmark + F-tile are construction-grade, ready for a designer pass
2. Real homepage hero (replace the placeholder)
3. Tool pages: `/compress-pdf`, `/compress-image`, `/photo-signature`, `/signature`
4. WASM compression engines (Ghostscript-WASM for PDF, Pica.js + browser-image-compression for images)
5. Programmatic SEO landing page template (`/[slug]` driven by an Airtable/Supabase data source)
6. Privacy verify page (`/privacy/verify`) with live DevTools-style network monitor
7. Pro auth (Supabase + Google OAuth) and Razorpay billing

See `SOW_Compress4_PDF_Image_Compression.md` for the full feature plan.
