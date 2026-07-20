# Compress4 — Brand Guidelines

**Version 1.0** · April 2026 · Direction: *Razorpay-grade Indian Fintech-Modern* (with Form-Buddy warmth + Vault-grade privacy lockup + tactical Bharat saffron-tint)

This document is the single source of truth for Compress4's visual and verbal identity. Every page, every landing variant, every email, every API response copy must trace back to a rule here. If a decision isn't covered, default to *capable, calm, Indian-modern, privacy-first*.

---

## 1. Brand at a glance

| | |
|---|---|
| **Product** | Compress4 |
| **Domain** | compress4.com |
| **Category** | Privacy-first document utility (PDF + image compression to exact KB) |
| **Differentiator** | Type the exact KB → tool guarantees it. All client-side. No upload. |
| **Audience priority** | Indian exam aspirants → visa applicants → property/govt portal users → job seekers → small offices → developers (API) |
| **Languages** | English + Hindi at launch |
| **Positioning** | *"What Razorpay would build if they shipped a utility tool — but it never sees your file."* |

### Brand pillars (in priority order)

1. **Trust** — handles official documents (Aadhaar, deeds, signatures, visa photos)
2. **Speed** — users are under deadline pressure
3. **Clarity** — exact numbers, no guessing, no marketing fluff
4. **Accessibility** — mobile-first, low-bandwidth, multilingual, low-anxiety
5. **Indian-ness** — feels native, not imported

### Personality (3 adjectives)

**Capable · Calm · Native-modern**

Capable means we lead with proof: real KB targets, real WASM, real DevTools verification. Calm means we don't shout at users who are already stressed. Native-modern means we look like Razorpay/Postman/Cred, not like a translated foreign tool.

---

## 2. Naming, taglines, voice anchors

### Product name

**Compress4** — single word, capital F and R, no space.
- ✅ Compress4 · compress4.com · @compress4
- ❌ Compress4 · compress4 · Compress4 · Compress4

### Tagline

**Primary:** *Get your documents compress4.*
**Hindi:** *आपके फॉर्म के लिए तैयार.*
**Short / app icon caption:** *Exact size, instantly.*
**Hinglish (for paid ads, WhatsApp):** *Form ki size set, file ho gayi ready.*

### Mission statement (one sentence)

*Compress4 helps every Indian fit their documents to any form's exact size requirement, in seconds, without ever sending the file to a server.*

### What we never say

- "AI-powered" (we're not — we're deterministic compression)
- "Secure cloud upload" (we don't upload, that's the point)
- "World's best" / "Number 1" (unprovable)
- "Free forever" without footnote (Pro tier exists)

---

## 3. Logo

### Wordmark

The primary logo is a custom wordmark: **compress4** — all lowercase, single word, two-tone.

**Construction**
- **Font base:** Inter, weight 700, letter-spacing -0.02em (slight negative tracking for tightness)
- **Colour split:** "form" in `#3D5AFE` Form Indigo · "ready" in `#10B981` Achievement Green
- **No icon mark required** at the wordmark size. Optional symbol mark (the "F-tile") is reserved for app icons / favicons / social avatars.

**Symbol mark (F-tile)** for square placements (favicon, app icon, social avatar):
- 1:1 rounded square, radius 22% of side (Apple-style superellipse OK)
- Fill: indigo→blue gradient `#3D5AFE → #0EA5E9` at 135°
- Mark: lowercase **f** in white, Inter 700, with a small green chevron (▾) under the bar of the f, in `#10B981`. The chevron implies "compress down."
- White F-tile on `#3D5AFE` for inverse use.

### Clear space

Min clear space around the wordmark = height of the lowercase "f" stem on all sides.

### Minimum sizes

| Application | Min size |
|---|---|
| Wordmark on screen | 96px wide |
| Wordmark in print | 24mm wide |
| F-tile favicon | 16×16 px (with simplified single-color f, no chevron) |

### Lockups

- **Tagline lockup (web header):** Wordmark on left · vertical 1px divider in `#E2E8F0` · tagline "Get your documents compress4" in Inter 500 14px `#475569` to the right.
- **Privacy lockup (footer):** F-tile · "compressed locally · no upload · verifiable" in Inter 500 13px `#475569` · mint padlock icon (12px, `#10B981`).

### Don'ts

- Do not place wordmark on busy photos
- Do not stretch, skew, rotate, or change tracking
- Do not separate "form" and "ready" with a space, dot, or line
- Do not invert the colour split ("form" in green, "ready" in indigo)
- Do not add drop shadows, bevels, or gradients to the wordmark itself (only to the F-tile)
- Do not use the wordmark below 96px wide on screen — use F-tile instead

---

## 4. Colour system

### Tokens overview

| Token | Hex | Role | WCAG vs `#FFFFFF` |
|---|---|---|---|
| **`brand-primary` / Form Indigo** | `#3D5AFE` | Primary action, brand recognition | 4.84:1 — AA Large only · use for buttons, links |
| `brand-primary-fg` | `#FFFFFF` | Foreground on primary | — |
| `brand-primary-hover` | `#3347D9` | Hover state | 6.32:1 — AA |
| `brand-primary-press` | `#2935A8` | Pressed state | 9.18:1 — AAA |
| **`brand-secondary` / Precision Blue** | `#0EA5E9` | Progress, info, "exact KB" feature accent | 3.06:1 — fail on body text · use for indicators only |
| **`brand-success` / Achievement Green** | `#10B981` | File ready, success states, privacy lockup | 3.13:1 — fail on body text · use as fill or AA-large |
| `brand-success-strong` | `#047857` | Success text/icon on light | 5.96:1 — AA |
| **`brand-tactical` / Saffron Tint** | `#F97316` | Indian-government keyword landing pages ONLY · max 5% surface | 3.41:1 — AA Large |
| `brand-tactical-soft` | `#FFEDD5` | Saffron tint background pill / chip | — |
| **`brand-danger`** | `#DC2626` | Errors, destructive, never above the fold | 4.83:1 — AA Large |
| `brand-warning` | `#F59E0B` | Caution, "spec changed" banners | 2.39:1 — fill only |

### Neutrals

A single ramp powers all surfaces, borders, and text.

| Token | Hex | Use |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Pure surfaces, hero panels |
| `neutral-25` | `#FFFBF5` | **Warm off-white** — long-form pages (blog, FAQ, help, terms). Borrowed from Form Buddy direction for anti-anxiety on tired eyes. |
| `neutral-50` | `#F8FAFC` | Default page background |
| `neutral-100` | `#F1F5F9` | Subtle surface (cards on neutral-50) |
| `neutral-200` | `#E2E8F0` | Borders, dividers |
| `neutral-300` | `#CBD5E1` | Disabled borders, placeholders |
| `neutral-400` | `#94A3B8` | Tertiary text, helper text |
| `neutral-500` | `#64748B` | Secondary text |
| `neutral-600` | `#475569` | Body secondary on light |
| `neutral-700` | `#334155` | Body strong, headings on warm surfaces |
| `neutral-800` | `#1E293B` | Headings on neutral-50 |
| `neutral-900` | `#0F172A` | Body text default · highest contrast on light |
| `neutral-950` | `#020617` | Reserved (rare ultra-strong contrast) |

### Surface roles

| Role | Token | Where |
|---|---|---|
| `surface-page` | `neutral-50` `#F8FAFC` | Default page background — homepage, tool pages, dashboard |
| `surface-page-warm` | `neutral-25` `#FFFBF5` | Long-form pages (blog, FAQ, help, legal, exam-spec articles) |
| `surface-card` | `neutral-0` `#FFFFFF` | Cards, panels, modals on `surface-page` |
| `surface-card-warm` | `neutral-0` `#FFFFFF` | Cards on `surface-page-warm` (same fill, but with warmer surrounding) |
| `surface-elevated` | `neutral-0` `#FFFFFF` + shadow `md` | Dropdowns, popovers, toasts |
| `surface-overlay` | `rgba(2, 6, 23, 0.55)` | Modal backdrops |
| `surface-tactical` | `#FFEDD5` | Saffron-tint chip backgrounds (Indian-keyword pages only) |

### Colour usage rules

#### Form Indigo `#3D5AFE` — Primary
- **Use for:** Primary CTAs, links, focus rings, brand mark, active state, key data viz accents
- **Do not:** Use as a background fill across more than 30% of any viewport. Use as a body text colour (contrast fails on most surfaces). Use on neutral-50 backgrounds for text — switch to `brand-primary-press` `#2935A8` for AAA.

#### Precision Blue `#0EA5E9` — Secondary / Info
- **Use for:** Progress bars, the "compressing… 73%" indicator, info badges, the gradient pair with Form Indigo on hero (`#3D5AFE → #0EA5E9` at 135°)
- **Do not:** Use for primary CTAs (steals brand recognition from indigo). Use for body text. Use as a hover state for indigo (use `brand-primary-hover` instead).

#### Achievement Green `#10B981` — Success / Privacy
- **Use for:** "File ready" success badge, the privacy lockup padlock, completed-state checkmarks, the second half of the wordmark
- **Pair with:** White or `neutral-0` foreground. Use `brand-success-strong` `#047857` when green text is required on light surfaces (AA on white).
- **Do not:** Use as a CTA fill (conflicts with indigo). Use for "in-progress" states (use `brand-secondary` blue).

#### Saffron Tint `#F97316` — Tactical Cultural Accent
This is the most rule-bound colour in the system. **Discipline here protects the brand.**

- **Use for:** Indian-government-keyword programmatic SEO landing pages only — specifically:
  - SSC, UPSC, NEET, JEE, IBPS, GATE, RRB, CTET, CUET, AFCAT, NDA, CDS, CLAT, NTA UGC NET pages
  - State PSC pages (MPSC, UPPSC, BPSC, etc.) when added in phase 2
  - Aadhaar/PAN/passport-photo-specific pages
- **Surface budget:** Maximum 5% of the viewport. Realistic placements: a small chip/pill ("Updated for 2026 SSC notification"), an underline accent on the H1 keyword, a single icon in a callout, a thin top border on the page.
- **Never use on:**
  - The homepage
  - Any visa landing page (US, UK, Schengen, Canada, Australia, Japan, Singapore, UAE)
  - The Pro/billing/account pages
  - The blog at large (ok on blog posts that are exam-specific)
  - Any developer/API documentation
- **Pair with:** `surface-tactical` `#FFEDD5` for the soft-fill version (chip backgrounds, callout boxes).
- **Why so strict:** Saffron carries political and cultural weight. Used precisely on exam pages, it signals "we know your audience." Used everywhere, it boxes us in as a politically-coded brand and alienates visa/property/diaspora users.

#### Danger Red `#DC2626`
- **Use for:** Field-level form errors, destructive confirm modals ("Delete account"), critical system errors
- **Never use for:** Marketing copy (no "limited time!" red). Hover states on indigo. Accents in success flows.

#### Warning Amber `#F59E0B`
- **Use for:** "Exam specification changed — re-check before submitting" banners, file-validation warnings (e.g., "PDF is password-protected")
- **Note:** Also used as the **Form-Buddy borrowing**: warm illustration accents on the homepage hero illustration. Do not use as a CTA colour.

### Accessibility contrast requirements

| Pair | Ratio | WCAG |
|---|---|---|
| `neutral-900` on `neutral-50` (body text default) | 16.7:1 | AAA |
| `neutral-700` on `neutral-50` (body strong on warm) | 11.4:1 | AAA |
| `neutral-600` on `neutral-50` (body secondary) | 8.3:1 | AAA |
| `neutral-500` on `neutral-0` (helper text) | 4.7:1 | AA |
| `brand-primary-press` `#2935A8` on `neutral-0` (link text) | 9.2:1 | AAA |
| `brand-success-strong` `#047857` on `neutral-0` (success text) | 6.0:1 | AA |
| `brand-danger` `#DC2626` on `neutral-0` (error text) | 4.83:1 | AA |
| `neutral-0` on `brand-primary` `#3D5AFE` (button label) | 4.84:1 | AA |

**Rule:** All text passes WCAG AA at minimum. Body text (16px and above) targets AAA where practical.

### Colour-blind safety

- Never communicate state by colour alone. Pair with icon, label, or pattern.
  - ✅ Green checkmark + "File ready (97KB)" label
  - ❌ Just a green dot
- Indigo + green at our chosen saturations are distinguishable across all common deficiencies (deuteranopia, protanopia, tritanopia). Verified via Stark/Adobe simulator.

---

## 5. Typography

### Font families

| Family | Use | Source |
|---|---|---|
| **Inter** | Latin headings + body, all UI text | Google Fonts |
| **Hind** | Devanagari (Hindi) headings + body | Google Fonts (Indian Type Foundry) |
| **JetBrains Mono** | KB numbers, file sizes, code samples, API docs, tabular data | Google Fonts |

**Why this pairing:** Inter is the modern-tool default and pairs visually with Hind because Hind was designed by Indian Type Foundry to complement Latin grotesques. The two families share an x-height that makes mixed-script lines (English+Hindi inside a single H1) feel composed, not stitched.

### Loading

```typescript
// app/layout.tsx
import { Inter, Hind, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const hind = Hind({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})
```

### Type scale

Based on a 1.250 (Major Third) ratio anchored at 16px. Names follow Tailwind defaults for predictability.

| Token | Size / Line / Tracking | Weight | Use |
|---|---|---|---|
| `display-2xl` | 72/76/-0.04em | 700 | Marketing landing hero, rare |
| `display-xl` | 60/64/-0.03em | 700 | Homepage hero H1 |
| `display-lg` | 48/52/-0.02em | 700 | Programmatic landing page H1, blog hero |
| `display-md` | 36/40/-0.02em | 700 | Section headings on homepage |
| `display-sm` | 30/36/-0.01em | 600 | Article H1, dashboard pages |
| `text-2xl` | 24/32/-0.005em | 600 | Section H2 |
| `text-xl` | 20/28/0 | 600 | Card titles, modal headings |
| `text-lg` | 18/28/0 | 500 | Lede paragraphs, intro text |
| `text-base` | 16/24/0 | 400 | Body default |
| `text-sm` | 14/20/0 | 400 | Secondary text, table cells, form helper |
| `text-xs` | 12/16/0.005em | 500 | Captions, badges, labels (uppercase tracking) |

### Number-specific rendering

KB targets, file sizes, and progress percentages use **JetBrains Mono** for two reasons: (1) tabular figures align across rows, and (2) it visually emphasizes "this is a precise number, not marketing copy."

**Examples**
- "Compressed to **`98KB`** (was 2.4MB)" — KB number in mono
- File-size input box uses mono
- Progress percentage uses mono
- Body prose stays in Inter — only the *measurable* numbers go mono

### Devanagari-specific rules

- Hind line-heights run ~10% taller than Inter at the same size; the type scale above accommodates this.
- Never mix Inter and Hind in the same word. Whole phrases switch atomically when language toggles.
- For mixed-script lines like "100 KB से कम", set the entire line in Hind — Hind handles Latin numerals well enough that splitting families breaks rhythm.
- Headings in Hindi use weight 600, not 700 — Devanagari character density makes 700 too heavy for hero use.

### Don'ts

- No italics for emphasis. Use weight 600 instead. (Inter italics are fine but feel inconsistent at small sizes; Hind has no Devanagari italic equivalent.)
- No all-caps for headings or body. Acceptable only for `text-xs` labels with letter-spacing 0.05em.
- No font weights below 400 anywhere — light weights vanish on cheap LCDs.
- No more than 3 type sizes in a single screen region.

---

## 6. Spacing & layout

### Base grid

**4px base unit.** All spacing, padding, and margins derive from multiples of 4.

| Token | Px | Use |
|---|---|---|
| `space-0` | 0 | — |
| `space-1` | 4 | Tightest — icon-text gap inside a chip |
| `space-2` | 8 | Inline gaps (icon to label) |
| `space-3` | 12 | Tight stack (form helper to input) |
| `space-4` | 16 | **Default** — paragraph spacing, card padding mobile |
| `space-5` | 20 | — |
| `space-6` | 24 | Card padding desktop, list-item spacing |
| `space-8` | 32 | Section sub-block spacing |
| `space-10` | 40 | — |
| `space-12` | 48 | Major section spacing on mobile |
| `space-16` | 64 | Major section spacing on desktop |
| `space-20` | 80 | Hero vertical padding |
| `space-24` | 96 | Hero/footer breathing room desktop |

### Container widths

| Token | Max-width | Use |
|---|---|---|
| `container-narrow` | 640px | Long-form articles, blog, FAQ — comfortable reading line length |
| `container-default` | 1024px | Tool pages, dashboard, programmatic landing |
| `container-wide` | 1280px | Homepage hero, marketing |
| `container-full` | 100% | Edge-to-edge sections (hero gradient backgrounds) |

Page gutters: 16px on mobile, 24px on tablet, 48px on desktop.

### Breakpoints

Tailwind defaults are correct for this audience:

| Token | Min-width | Audience reality |
|---|---|---|
| `sm` | 640px | Phablets — minor adjustments |
| `md` | 768px | Tablets — major layout shifts begin |
| `lg` | 1024px | Laptops — desktop layout |
| `xl` | 1280px | Desktop monitors |
| `2xl` | 1536px | Large monitors — content max-out |

**Mobile-first is non-negotiable.** ~70% of our audience visits on Android phones with screens 360–414px wide. Every layout must be designed at 360px first, then scaled up.

---

## 7. Radius

| Token | Px | Use |
|---|---|---|
| `radius-none` | 0 | Tables, full-bleed banners |
| `radius-sm` | 4 | Inputs, badges, tags |
| `radius-md` | 6 | Default for shadcn primitives |
| `radius-lg` | 8 | **Default** — buttons, cards, modals |
| `radius-xl` | 12 | Hero file-drop zone, feature cards |
| `radius-2xl` | 16 | Marketing cards on landing pages |
| `radius-full` | 9999 | Avatars, pills, the privacy padlock chip |

Why 8px default and not 12 (warmer) or 4 (sharper): 8px sits in the "modern Indian SaaS" zone — Razorpay (8px), Cred (8–10px), Postman (6–8px). It's professional without feeling brittle. The 12px-warm exception lives on the file-drop zone and feature cards, which borrow Form-Buddy's softness for the most emotional moments.

---

## 8. Elevation & shadow

Shadows use stacked layers with low opacity, never single big drops. Indigo-tinted at high elevations to feel like brand light, not generic grey.

| Token | Definition | Use |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(15, 23, 42, 0.04)` | Subtle card lift |
| `shadow-sm` | `0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)` | Inputs, buttons resting |
| `shadow-md` | `0 2px 4px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.08)` | Cards, popovers |
| `shadow-lg` | `0 8px 16px rgba(15, 23, 42, 0.08), 0 16px 32px rgba(15, 23, 42, 0.10)` | Modals, toasts |
| `shadow-xl` | `0 16px 32px rgba(61, 90, 254, 0.12), 0 32px 64px rgba(15, 23, 42, 0.10)` | Hero file-drop zone (indigo-tinted) |
| `shadow-focus` | `0 0 0 3px rgba(61, 90, 254, 0.32)` | Focus ring (indigo, 3px outer glow) |
| `shadow-focus-success` | `0 0 0 3px rgba(16, 185, 129, 0.28)` | Focus ring on success-state inputs |

### Focus ring

**Always visible. Never `outline: none` without replacement.** Default focus = `shadow-focus` (3px indigo glow) at radius matching the focused element. Focus on success-confirmed inputs (e.g., a target-KB input that's locked-in correctly) uses `shadow-focus-success`.

---

## 9. Iconography

### Library

**Lucide Icons** as the primary library. Available in shadcn/ui by default.

### Stroke and size

| Use | Stroke width | Size |
|---|---|---|
| Inline body icons | 1.5 | 16px |
| Default UI icons | 1.5 | 20px |
| Button icons | 2 (heavier for clarity at small CTA size) | 16px |
| Standalone large icons (feature cards) | 1.5 | 32px |
| Hero illustration icons | 1.5 | 48–64px |

### Custom icons (must be designed bespoke)

These earn custom treatment because they're brand-load-bearing:

1. **Privacy padlock** — used in the privacy lockup, footer, trust panel. Lucide's `lock` is too generic; commission a slightly more rounded, friendly variant in `brand-success` `#10B981`.
2. **KB target dial** — appears on the homepage hero next to the file-drop zone. A circular gauge with a precise needle. Reinforces the "exact KB" USP.
3. **F-tile favicon** — see §3.

### Icon colour rules

- Default icon colour = `neutral-500` (matches body secondary text)
- Active / selected = `brand-primary` `#3D5AFE`
- Success = `brand-success` `#10B981`
- Danger = `brand-danger` `#DC2626`
- Hero / decorative = `brand-primary` with 80% opacity, OR the indigo→blue gradient

---

## 10. Motion

### Duration tokens

| Token | ms | Use |
|---|---|---|
| `motion-instant` | 75 | Tooltip show, hover state colour shift |
| `motion-fast` | 150 | Button press, dropdown open |
| `motion-base` | 200 | **Default** — page-element transitions, card hover |
| `motion-slow` | 300 | Modal open, drawer slide |
| `motion-slower` | 500 | Page transition, success celebration |

### Easing

| Token | Curve | Use |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default — most transitions |
| `ease-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Element entering (modal open, toast appear) |
| `ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Element exiting (dismiss, close) |
| `ease-soft-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Reserved for success states only — gentle overshoot on the "file ready" badge |

### Component-specific

- **File drop zone:** When a valid file is dragged over, the dashed border colour transitions `neutral-300 → brand-primary` at `motion-fast` `ease-decelerate`. The drop zone scales `1.0 → 1.01` (subtle), never larger.
- **Compress button → progress bar:** Button morphs into the progress bar at `motion-base` (200ms). Progress fills at 60fps without jitter.
- **Success state:** When file hits target, the size readout ("`98KB`") animates a single soft-spring scale `0.95 → 1.0` over 500ms. Green checkmark fades in at the same time. **No confetti, no sparkles** — Razorpay-grade success is precise, not celebratory. (Aspirant direction would do confetti; we don't.)
- **Page transitions:** Default Next.js routing — no custom page transitions in v1. They feel slow on cheap Android.

### Reduced motion

Respect `prefers-reduced-motion: reduce` everywhere. Replace transforms with opacity fades. The success-state spring becomes a 200ms linear fade.

---

## 11. Imagery & illustration

### Photography direction

**Use sparingly.** Only on testimonial cards, "About" page, and team photos. When used:
- Real Indian users, authentic settings (a student at a study desk; a parent helping with a form; a young professional in an office)
- Avoid stock cliché (no "diverse hands on laptop in a bright loft")
- Warm-but-natural light — not over-saturated
- Consent and full names required

### Illustration direction

**Style:** Custom line illustrations with selective fills. Two-tone primary palette: `brand-primary` lines (`#3D5AFE`) with `brand-success` accents (`#10B981`). Optional warm coral fill (`#FB7185`, borrowed from Form Buddy) for the homepage hero illustration only.

**Subjects:**
- Documents flowing into a phone (the "compression happens on your device" metaphor)
- A precise gauge / dial showing "exactly 100KB"
- A padlock with a checkmark (privacy)
- Hand holding a phone with a form (the actual user moment)

**What to avoid:**
- Generic Storyset/unDraw "people-with-laptops" library art (overused, non-distinctive)
- 3D blobs / Memphis shapes (dated)
- Mascots — we don't have one and shouldn't invent one (Form Buddy direction would; we don't)
- Photo-realistic 3D illustration — too expensive to maintain, dated by 2027

### File drop-zone artwork

The most-seen single visual. Custom: a stylized document outline in `brand-primary` 1.5px stroke, with a subtle dashed inner border, and a small "Drop here" plus-mark in `brand-success`.

---

## 12. Components

### Buttons

**Variants** (all heights 40px on desktop, 44px on mobile for touch — both ≥ 44px touch target on mobile):

| Variant | Bg | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `brand-primary` `#3D5AFE` | white | none | Main CTA per page (one only) |
| `primary-glow` | `brand-primary` `#3D5AFE` | white | none + `shadow-xl` indigo-tinted | Hero CTA only |
| `secondary` | white | `brand-primary` `#3D5AFE` | 1px `brand-primary` | Secondary actions |
| `ghost` | transparent | `neutral-700` | none (1px on hover) | Tertiary, in-card actions |
| `success` | `brand-success` `#10B981` | white | none | "Download (98KB)" download button |
| `danger` | white | `brand-danger` `#DC2626` | 1px `brand-danger` | Destructive (delete account) |
| `link` | none | `brand-primary-press` `#2935A8` | none, underline on hover | Inline links in body text |

**Padding:** 12px vertical, 20px horizontal default. Icon-only buttons are square (40×40 / 44×44).

**Radius:** `radius-lg` 8px.

**Hover:** background shifts to `*-hover` token at `motion-fast`. Slight `translateY(-1px)` on primary buttons only.

**Pressed:** `*-press` token, no transform.

**Disabled:** `neutral-200` background, `neutral-400` text, `cursor: not-allowed`. **Do not** lower opacity (looks broken on cheap LCDs).

### File drop zone

The most important component on the site. Specs:

- Container: `radius-xl` 12px, dashed border 2px `neutral-300`, padding 48px desktop / 32px mobile
- Resting state: `neutral-100` background, centred document illustration
- Hover (drag-over): border colour `brand-primary`, background `#EEF2FF` (indigo at 4% alpha), `shadow-xl` lift
- Active (file selected): border solid 2px `brand-success`, mini preview thumbnail, file name + size displayed in JetBrains Mono
- Error (wrong file type): border `brand-danger`, error message below in `text-sm` `brand-danger`
- All states transition at `motion-fast` `ease-decelerate`

### KB-target input

Two-part input: number field on left, "KB" suffix on right with an inline preset row below.

- Number field: JetBrains Mono 24px, `neutral-900` text, padding 12px, `radius-md` 6px, 1px `neutral-300` border
- Focus: `shadow-focus` indigo glow + border becomes `brand-primary`
- Preset chips: small pills below input — `100`, `200`, `500`, `1000`, `2000`. `radius-full`, `text-xs` Inter 500, padding 4×10px. Resting `neutral-100` bg `neutral-700` text. Active `brand-primary` bg white text.

### Privacy lockup

The single most brand-load-bearing micro-component. Specs:

```
[🔒 mint padlock 14px]  Compressed locally · No upload · Verifiable
```

- Lives in the footer of every page
- Also lives directly under the file-drop zone on every tool page
- Padlock icon in `brand-success` `#10B981`
- Text in `neutral-600`, Inter 500, 13px, letter-spacing 0
- The word "Verifiable" links to `/privacy/verify` (the live DevTools network-tab page)
- Hover on the lockup: link underlines, padlock pulses once at `motion-base`

### Cards

- Default: white bg, `radius-lg` 8px, 1px `neutral-200` border, `shadow-xs` resting, `shadow-sm` hover
- Padding: 24px desktop, 16px mobile
- Marketing cards (homepage tool tiles): `radius-2xl` 16px, no border, `shadow-md` resting, `shadow-lg` hover, slight `translateY(-2px)` on hover

### Toasts

- Bottom-centre on mobile, bottom-right on desktop
- `radius-lg` 8px, white bg, 1px `neutral-200` border, `shadow-lg`
- Icon left (success/error/info), message centre, dismiss right
- Auto-dismiss 5s default, error toasts persist until dismissed

### Badges

- `radius-full`, padding 2×10px, `text-xs` 12px Inter 500
- Solid: bg = colour, text = white
- Soft: bg = colour at 12% alpha, text = colour-strong (e.g., success-soft = `#D1FAE5` bg + `#047857` text)

---

## 13. Voice & tone

### Voice (constant — who we are)

| Trait | Means | Doesn't mean |
|---|---|---|
| **Direct** | Headlines under 8 words. State the action. | Curt or rude |
| **Capable** | Use specific numbers, not adjectives ("under 100KB" not "very small") | Bragging or "world's best" |
| **Calm** | Short paragraphs, no exclamation marks except errors | Bored or detached |
| **Native-Indian** | Hindi feels written, not translated. Hinglish OK in marketing copy. | Forced slang or politicised language |
| **Privacy-confident** | State the privacy fact, then move on. Don't repeat it like a sales pitch. | Smug or paranoid |

### Tone (varies — how we sound by context)

| Context | Tone | Example |
|---|---|---|
| Homepage hero | Confident, inviting | *"Get your documents compress4. Exact KB, instantly. Never uploaded."* |
| Programmatic SEO landing | Specific, useful | *"Compress your PDF to under 100KB without losing readability. Works in your browser. No upload, no signup."* |
| Indian-keyword landing (SSC etc.) | Specific + warm acknowledgment | *"SSC CGL needs your photo at 200×230 px and 20–50KB. We've got the spec memorized."* |
| Visa landing | Precise, slightly more formal | *"US B1/B2 visas require photos at 600×600 px with the head taking up 50–69% of the frame."* |
| Empty state (tool, no file yet) | Welcoming | *"Drop your PDF here, or click to choose. We'll handle the rest."* |
| Loading / processing | Calm progress | *"Compressing… 73%. Almost there."* |
| Success | Precise, restrained | *"Compressed to **`98KB`**. Was 2.4 MB."* — the number does the celebration |
| Error (recoverable) | Warm, actionable | *"That file looks password-protected. Unlock it first, then try again."* |
| Error (system) | Honest | *"Something broke on our end. We logged it. Try again in a minute."* |
| Pro upgrade prompt | Useful, not pushy | *"Compressing 50+ files? Pro batches them in one go for ₹49/month."* |
| Privacy explainer | Confident proof | *"Your file never leaves your device. Open DevTools → Network. Watch for yourself."* |

### Hindi tone

- Use respectful आप form by default. तुम acceptable on Indian-keyword pages (SSC/UPSC) where the audience is younger and warmth matters more.
- Hindi is not a translation of English. Write Hindi natively, then check English equivalence — not the other way around.
- Numbers stay in Latin numerals (e.g., "100KB" not "१००KB") — Indian users read digital sizes in Latin.

### Hinglish

- Acceptable on programmatic SEO landing pages targeting Hinglish keywords, on WhatsApp share copy, on push notifications.
- Not acceptable on legal pages, account/billing pages, or developer docs.
- Example acceptable Hinglish: *"Form ki size set, file ho gayi ready"* (push notification), *"100KB se kam kar do, ek click mein"* (landing page H2).

### Words & phrases

**Use**
- "compress4" (the brand promise — works as adjective, hyphenated)
- "exact KB" / "exact size"
- "in your browser" / "on your device"
- "no upload"
- "spec" (when discussing exam/visa requirements — short, official-feeling)
- "verified spec" (signals we keep it updated)

**Avoid**
- "shrink" (sounds amateur — we "compress")
- "tiny" (we hit *exact* sizes, not generically tiny)
- "magical" / "AI-powered" / "smart"
- "hassle-free" (cliché)
- "lightning-fast" (cliché)
- "world-class"
- "secure cloud" (we don't use cloud — that's the point)

---

## 14. Privacy lockup — the special element

Borrowed from Vault direction, refined for our brand. **This is the single most important micro-component on the site.** It carries the privacy USP on every page.

### Three placements

1. **Footer (every page):** Full lockup with all three claims
   ```
   🔒 Compressed locally  ·  No upload  ·  Verifiable
   ```
2. **Below file-drop zone (every tool page):** Compact version
   ```
   🔒 Stays on your device. Verify yourself →
   ```
3. **Trust strip (homepage + landing pages):** Expanded into three side-by-side cards with the same content, larger
   ```
   [🔒]              [⊘ cloud]          [✓ verifiable]
   100% Browser      Never Uploaded     See It Yourself
   Your file is      We don't have      Open DevTools
   compressed in     servers that       and watch the
   the browser via   touch your file.   Network tab.
   WebAssembly.      No exceptions.     Zero upload.
   ```

### `/privacy/verify` page

Every "Verifiable" link goes to this page. It contains:

1. A short explainer (2 sentences) of what client-side WASM means
2. A live demo: a compress operation runs in the visible iframe; below it, a real-time view of the page's `fetch` and `XMLHttpRequest` activity (zero entries)
3. Step-by-step instructions to open DevTools → Network → confirm zero outbound file requests during compression
4. A link to the open-source compression module on GitHub

The verify page is itself a brand artifact. It must look like the rest of the site — not like a separate technical doc.

---

## 15. Saffron-tint rules — the tactical element

Borrowed from Bharat Bureau direction with strict discipline. **Get this wrong and the brand becomes politicised. Get it right and we win the Indian-keyword SEO war.**

### When to apply saffron tint

✅ **Apply on:**
- Every Indian competitive-exam landing page (SSC, UPSC, NEET, JEE, IBPS, GATE, RRB, CTET, CUET, AFCAT, NDA, CDS, CLAT, NTA UGC NET)
- State PSC pages (phase 2: MPSC, UPPSC, BPSC, etc.)
- Aadhaar / PAN / Indian-passport-photo-specific pages
- Indian-government-form-specific pages (property registration, tax, pension)

❌ **Do not apply on:**
- Homepage
- Any visa landing page (US, UK, Schengen, Canada, Australia, Japan, Singapore, UAE)
- Any non-government Indian use-case page (Naukri, LinkedIn, generic compression)
- Pro / billing / account / dashboard pages
- Blog (unless the post is exam-specific)
- Developer / API docs
- Privacy / Terms / DPDP / legal pages

### How to apply (max 5% surface)

1. **Top-of-page accent bar** — a 4px-tall full-width strip of `brand-tactical` `#F97316` at the very top of the page, above any header. Subtle but signals "this page is for an Indian government context."
2. **H1 underline** — the primary keyword in the H1 ("SSC CGL Photo Size") gets a 3px-thick `brand-tactical` underline underneath, like a highlighter mark.
3. **Spec callout chip** — at most one chip per page in `surface-tactical` `#FFEDD5` background with `brand-tactical` text: e.g., *"Updated for the 2026 SSC notification (Mar 12)"*
4. **Source-citation icon** — a small saffron icon next to "Specs from: ssc.nic.in (verified Mar 2026)"

### What NOT to do

- ❌ Saffron CTAs (CTAs stay indigo)
- ❌ Saffron file-drop zones
- ❌ Saffron success states (success stays green)
- ❌ Saffron headlines or body text
- ❌ Saffron gradients or fills covering more than 5% of the viewport
- ❌ Saffron + indigo + green together creating a literal Indian flag visual — keep them separated by neutrals

---

## 16. Accessibility (WCAG 2.1 AA baseline)

### Minimum requirements

- All text passes WCAG AA contrast minimums (verified above)
- All interactive elements have visible focus states
- All form inputs have associated `<label>` elements (no placeholder-as-label)
- All non-text content has meaningful `alt` text
- All actions accessible via keyboard alone
- All touch targets ≥ 44×44px on mobile

### Specific audience accommodations

These go beyond AA because our audience demands them:

- **Big tap targets** — every primary action button is 44px tall on mobile, 48px in the file-drop and KB-target areas (anxious users, often using one-handed)
- **Clear error recovery** — every error message includes a recovery action. Never just "Invalid file."
- **Simple language English** — body copy at Class 8 reading level (Hemingway-app benchmark). Avoid words like "iteratively," "configurable," "leverage." Use "step-by-step," "settings," "use."
- **Hindi parity** — every page that ships in English ships in Hindi simultaneously. Language toggle is persistent across pages and visible in the header on all breakpoints.
- **Bandwidth-aware** — total page weight target ≤ 200KB for first paint on mobile (excluding the WASM compression module, which loads on demand and caches).

### Reduced motion

All animations respect `prefers-reduced-motion: reduce` — transforms and bounces fall back to opacity fades.

### Screen-reader

- Privacy lockup is announced as a single sentence: *"Compressed locally, no upload, verifiable. Link: verify yourself."*
- File drop zone announces state changes: "File ready to compress: applicant.pdf, 2.4 megabytes"
- Compression progress announces every 25%: "Compressing, 25 percent. 50 percent." etc.

---

## 17. Do / Don't gallery

### Brand voice

| ✅ Do | ❌ Don't |
|---|---|
| *Compressed to 98KB. Was 2.4MB.* | *Wow, look at that compression!* |
| *Drop your PDF or click to choose.* | *Effortlessly upload your document for compression.* |
| *That file looks password-protected. Unlock it first.* | *Sorry, we cannot process this file at this time.* |
| *Your file never leaves your device.* | *Your file is securely processed on our world-class cloud infrastructure.* |
| *SSC CGL needs photos at 200×230 px and 20–50KB.* | *Get your perfect SSC photo with our magical AI tool!* |

### Colour usage

| ✅ Do | ❌ Don't |
|---|---|
| Indigo for the main CTA, green only for success | Multiple competing CTAs in different colours |
| Saffron tint on SSC landing page only | Saffron in the homepage header |
| Green checkmark + label for success | Green dot alone (colour-blind unsafe) |
| Warm off-white `#FFFBF5` on long blog posts | Pure white `#FFFFFF` for long-form (causes eye strain) |
| One subtle indigo→blue gradient on the hero | Gradients on every section (visual noise) |

### Typography

| ✅ Do | ❌ Don't |
|---|---|
| KB numbers in JetBrains Mono | KB numbers in Inter (loses precision feel) |
| Inter 600 for English headings | Inter 700 for Devanagari headings (too heavy) |
| Hind 600 for Hindi headings | Mixing Inter and Hind in a single word |
| Latin numerals in Hindi copy ("100KB") | Devanagari numerals (१००KB) |
| Tabular figures in data tables | Proportional figures in data tables (misalignment) |

### Privacy lockup

| ✅ Do | ❌ Don't |
|---|---|
| Place lockup in footer of every page | Place lockup only on the homepage |
| "Verifiable" links to live `/privacy/verify` | "Verifiable" is just a static word |
| One green padlock in the lockup | Multiple security badges (SSL, ISO, etc.) crowding it |
| Lockup is small and confident | Lockup is huge and screams for attention |

---

## 18. Applied examples

### Example 1: Homepage hero (English)

```
[Top: standard header with logo + nav + Hindi toggle]

H1 (display-xl, 60px, Inter 700, neutral-900):
  Get your documents compress4.

Lede (text-lg, 18px, Inter 400, neutral-600, max-width 540px):
  Type the exact KB. We hit it. Your file never leaves your device.

[Primary CTA button — primary-glow variant, 'Compress a PDF' with arrow icon]
[Secondary CTA, ghost — 'Compress an image']

[Below CTAs: Privacy lockup compact: 🔒 Stays on your device. Verify yourself →]

[Hero illustration right side: phone with document flowing in, KB-target dial nearby]

[Below hero: 4 large tool cards — PDF, Image, Photo, Signature — in a grid]
```

### Example 2: Indian-exam landing page (`/ssc-cgl-photo-size`)

```
[4px saffron-tint top accent bar — only on this kind of page]

[Standard header]

H1 (display-lg, 48px, neutral-900):
  SSC CGL [Photo Size]
  ↑↑ this word has 3px saffron-tint underline ↑↑

Lede:
  SSC CGL needs your photo at 200×230 px and 20–50KB. Drop yours below — we'll resize and compress to spec.

[Saffron-tint chip: "Updated for the 2026 SSC notification (Mar 12)"]

[Embedded Photo & Signature Resizer tool, pre-configured to SSC CGL preset]

[Privacy lockup compact below tool]

[FAQ section: 4–6 questions with FAQPage schema]

[Related pages: SSC CHSL, SSC MTS, IBPS PO, NEET — internal linking strip]

[Footer with privacy lockup full]
```

### Example 3: US visa landing page (`/us-visa-photo-size`)

```
[NO saffron-tint accent — visa pages stay neutral]

[Standard header]

H1 (display-lg, 48px, neutral-900):
  US Visa Photo Size

Lede:
  US B1/B2 visas require 600×600 px with the head taking 50–69% of the frame. Drop your photo, we'll auto-resize and compress to spec.

[Embedded tool, US-visa preset]

[Privacy lockup]

[Disclaimer (text-sm, neutral-500): "We help you meet specs, but final acceptance is at the consulate's discretion."]

[Source citation: Specs from travel.state.gov (verified Apr 2026)]

[FAQ + related visa pages]
```

### Example 4: Privacy verify page (`/privacy/verify`)

```
[Standard header]

H1: See for yourself.

Lede:
  We say files never leave your device. Here's how to confirm it in 30 seconds.

[Step-by-step list, each step with a clear screenshot/diagram]
1. Open DevTools (Right-click → Inspect, or Cmd+Opt+I / Ctrl+Shift+I)
2. Click the "Network" tab
3. Click the button below to compress a sample PDF
4. Watch the Network tab. You'll see zero new requests.

[Live embedded compress demo]

[Code link: "See the open-source compression module on GitHub →"]
```

---

## 19. Design tokens — handoff format

The full token set lives in three places, all kept in sync:

- **`brand/tokens.ts`** — TypeScript module (importable by `tailwind.config.ts`)
- **`brand/tokens.css`** — CSS custom properties (for non-Tailwind contexts: emails, plain HTML)
- **`tailwind.config.ts`** — Tailwind extends, sourced from `brand/tokens.ts`

When the Next.js project is scaffolded:

```ts
// tailwind.config.ts
import { brandTokens } from './brand/tokens'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: brandTokens.colors,
      fontFamily: brandTokens.fonts,
      fontSize: brandTokens.typography.scale,
      spacing: brandTokens.spacing,
      borderRadius: brandTokens.radius,
      boxShadow: brandTokens.shadow,
      transitionDuration: brandTokens.motion.duration,
      transitionTimingFunction: brandTokens.motion.easing,
    },
  },
}
```

See `brand/tokens.ts` for the full export and `brand/preview.html` for a self-contained visual preview of every token applied.

---

## 20. Governance

### Owners

- **Founder / Product** — final approval on direction changes, new colours, new tokens
- **Design lead** (when hired) — day-to-day stewardship; can deviate within rules
- **Engineering** — must use tokens, never raw hex codes in components

### Change process

1. Propose change in writing (Notion / GitHub issue) with the rule it violates and the new rule that should replace it
2. Founder review
3. Update this document, the token files, and `brand/preview.html` in a single PR
4. Bump version in §1

### What's frozen vs flexible

**Frozen (do not change without founder sign-off):**
- The four signature colours: Form Indigo, Precision Blue, Achievement Green, Saffron Tint
- The font families (Inter, Hind, JetBrains Mono)
- The privacy lockup wording and placement rules
- The saffron-tint usage rules

**Flexible (designer can iterate):**
- Specific shade adjustments within ±10% lightness if accessibility demands
- Spacing values within the 4px grid
- Component-level styling within the rules (button heights, card padding, etc.)
- New illustrations within the established style
- New voice/tone examples

---

**End of guidelines · v1.0 · Anchor everything you build back to this doc.**
