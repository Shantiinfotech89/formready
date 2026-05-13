# FormReady — Screens Plan

**Version 1.1 · Locked.** Source-of-truth for what gets built and in what order.

This plan enumerates every unique screen across the product (Guest + Pro + Admin), groups them into 11 build batches ordered by priority, and notes for each: the route, who uses it, what it contains, what existing components it reuses, and which states it must handle.

> **Reading guide.** Batches 1–5 are the **MVP** that the SOW targets for 5-week launch. Batches 6–11 are post-MVP, sequenced by revenue/operational dependency.

**Within-batch priority anchors:**
- Batch 1: ship **1.1 + 1.2 + 1.6** first as the *trust triad* (homepage + PDF tool + privacy verify). This is the smallest set that proves the brand promise end-to-end.
- Batch 3: smoke-test the template with **10 seed pages** (5 SSC + 3 visa + 2 size-target) before authoring the remaining 130. Validates SEO + Lighthouse + IndexNow pipeline cheaply.
- Batch 5 (legal/static) is **parallelizable with Batch 1** — small content team can author while engineers ship tools.

---

## At-a-glance

| # | Batch | Screens | Build size | Backend? | MVP |
|---|---|---:|---|---|---|
| 1 | Core Compression Tools | 6 | M | No (client-side WASM only) | ✅ |
| 2 | Document Conversion Utilities | 3 | S | No | ✅ |
| 3 | Programmatic SEO Engine | 1 template → 140 pages | L | PostgreSQL (Drizzle) data table only | ✅ |
| 4 | Content & Marketing | 3 | S | Markdown CMS | ✅ |
| 5 | Legal & Static | 9 | XS | No | ✅ |
| 6 | Pro Auth & Account | 8 | M | PostgreSQL + Auth.js (Google OAuth) | |
| 7 | Pro Tools Dashboard | 4 | M | PostgreSQL (Drizzle) | |
| 8 | API (Pro/Developer) | 3 | M | Vercel Edge fns + PostgreSQL | |
| 9 | Admin Core | 4 | S | PostgreSQL RBAC (role column) | |
| 10 | Admin Content & SEO | 6 | L | PostgreSQL + markdown editor | |
| 11 | Admin Analytics & Operations | 4 | M | Plausible API + Sentry API | |

## Backend stack (locked)

- **Database:** PostgreSQL (host TBD before Batch 6: Neon recommended for serverless, or self-hosted)
- **ORM / migrations:** Drizzle ORM + Drizzle Kit
- **Auth:** Auth.js (NextAuth v5) with Google OAuth + Drizzle adapter
- **File storage:** Not needed — all compression is client-side, no file ever stored
- **Edge functions:** Vercel API Routes (built into Next.js)
- **Email:** Resend (transactional)
- **Payments:** Razorpay
- **Captcha:** Cloudflare Turnstile

**Total unique routes:** ~51 (excluding the 140 landing-page slugs generated from one template).

**Sizes:** XS = ½–1 day · S = 1–3 days · M = 4–7 days · L = 1–2 weeks (one engineer).

---

## Cross-batch dependencies

```
Batch 1 (Core tools) ──┬─→ Batch 2 (Conversion) — reuses tool components
                        ├─→ Batch 3 (Programmatic SEO) — embeds tools in dynamic template
                        └─→ Batch 6 (Pro Auth) — gates Pro routes
                                                      │
Batch 6 ─────────────────────────────────────────────┴─→ Batch 7 (Pro Dashboard)
                                                          ├─→ Batch 8 (API)
                                                          └─→ Batch 11 (Admin Analytics needs Pro user data)
Batch 9 (Admin Core) ──→ Batch 10 (Admin Content) ──→ Batch 3 publishes from Batch 10's editor
```

**Critical path to MVP launch:** 1 → 4 → 5 → 3 (programmatic SEO must launch with content). Batch 2 is parallel-able by another engineer.

---

# BATCH 1 — Core Compression Tools

**Why first:** This *is* the product. Without these, nothing else matters. All compression happens client-side in WebAssembly.

**Estimated size:** 6 screens, ~M (4–7 days for one engineer; faster if WASM modules are pre-vetted).

**Backend:** None. `/privacy/verify` runs the same compression and shows live network activity to prove no upload.

**Components needed (existing):** `SiteHeader`, `SiteFooter`, `Wordmark`, `PrivacyLockup`, `TrustStrip`, `FileDropZone`, `KbTargetInput`, `PresetChips`, `ResultPanel`, `Button`, `Card`, `Badge`, `Input`, `Label`, `Progress`, `Tooltip`.

**Components to add:** `QualityRadioGroup`, `ColorModeRadioGroup`, `ComparisonSlider` (split-screen original-vs-compressed), `PdfPreview` (pdf.js), `ImagePreview`, `ExamPresetCard`, `VisaPresetCard`, `DevToolsLivePanel` (verify page), `Toaster`.

---

### 1.1 `/` — Homepage

- **Role:** Guest
- **Purpose:** First impression. Get user into a tool within 10 seconds.
- **Sections:** Sticky nav (with Hindi toggle) → hero (H1 + lede + CTA primary + secondary) → privacy lockup compact → 4 large tool cards (PDF / Image / Photo / Signature) → expanded TrustStrip → "X documents made form-ready today" live counter (anonymous beacon) → mini quick-link strip (top 8 exam pages, top 4 visa pages) → 5-question FAQ → footer with PrivacyLockup full.
- **Reuses:** Layout shell + hero pattern + TrustStrip + tool cards (already in design-system page).
- **States:** Default · counter loading · counter error (hide, don't break).

### 1.2 `/compress-pdf` — PDF Compression Tool

- **Role:** Guest (also Pro if logged in — Pro variant adds preset save)
- **Purpose:** Upload PDF → enter exact KB → download compressed.
- **Sections:** H1 + lede → trust badges row → file drop zone → original-file-info readout → KB target widget + preset chips → quality radio (Auto/Preserve Text/Preserve Photos) → color radio (Color/Grayscale/B&W) → "Compress to X KB" CTA → progress bar → preview pane (pdf.js) → ResultPanel → comparison slider (advanced) → secondary CTAs ("compress another" / "try image" / "Pro batch") → ad slot → FAQ snippet → footer.
- **Reuses:** Most of design-system primitives already built.
- **States:** idle · file selected (valid) · invalid file (wrong type / >50MB / password-protected) · compressing (progress %) · success (preview + result) · partial-success ("best we got: 134KB") · WASM-not-supported · browser-OOM.

### 1.3 `/compress-image` — Image Compression Tool

- **Role:** Guest / Pro
- **Purpose:** Same as 1.2 but for JPG/PNG/WebP/HEIC. Two-pass algorithm (quality reduction → optional dimension reduction).
- **Sections:** H1 + lede → trust badges → file drop zone (image MIME accepts) → original info (size/dimensions/format) → KB target → output format (Same/JPG/WebP/PNG) → preserve-dimensions toggle → CTA → progress → preview → side-by-side comparison → ResultPanel → CTAs.
- **Reuses:** All of 1.2 plus `ImagePreview`.
- **States:** idle · file selected · HEIC-fallback-decode · transparent-PNG-warning · animated-GIF (first-frame only) · 16-bit-PNG-downconvert-notice · compressing pass 1 · compressing pass 2 (resize) · target-impossible-prompt · success · error.

### 1.4 `/photo-signature` — Photo & Signature Resizer Hub

- **Role:** Guest
- **Purpose:** Landing hub explaining the spec-aware resizer; user picks an exam or visa or types custom dimensions. Most traffic to this hub arrives via the programmatic SEO landing pages (Batch 3).
- **Sections:** H1 + lede → "what's your form?" picker (3 columns: Exam / Visa / Custom) → exam preset grid (top 25) → visa preset grid (top 8) → custom dims form (W×H px + KB range + format) → embedded photo+signature uploader → secondary CTAs.
- **Reuses:** Tool primitives + new `ExamPresetCard` + `VisaPresetCard`.
- **States:** preset-not-selected · preset-chosen · two-uploads-pending (photo + sig) · one-pending · processing · combined-zip-ready.

### 1.5 `/signature` — Signature Compressor (specialized)

- **Role:** Guest
- **Purpose:** Tight signatures (5-20KB) with grayscale + threshold cleanup. Generic image compressors fail at this size.
- **Sections:** H1 + lede ("most forms want signatures under 20KB — here's how") → file drop → cleanup-mode toggle (default ON) → output background (white/transparent) → output format (JPG/PNG) → KB target presets (5 / 10 / 20 / 50) → CTA → preview (with edge-detect crop indicator) → ResultPanel.
- **Reuses:** Same primitives.
- **States:** idle · file uploaded · auto-crop-uncertain (manual crop UI) · cleanup-disabled (digital signature) · processing · result.

### 1.6 `/privacy/verify` — Live Verification Page

- **Role:** Guest
- **Purpose:** Brand-defining proof of the privacy claim. Carries the entire USP.
- **Sections:** H1 ("See for yourself") → 4-step instructions (open DevTools / click Network / click compress / watch zero requests) → live embedded sample compressor → on-page DevTools-style network panel showing the page's own network activity → "see open-source compression module on GitHub" link → privacy lockup.
- **Reuses:** Tool primitives + new `DevToolsLivePanel` (uses `PerformanceObserver` + `Resource Timing API`).
- **States:** idle (waiting for user to click) · compression running (network panel shows "0 requests, 0 B transferred") · post-compression.

---

# BATCH 2 — Document Conversion Utilities

**Why second:** Reuses Batch 1's tool primitives. Adds breadth to the toolset without new architecture. Drives additional SEO surface ("convert heic to jpg" etc.).

**Estimated size:** 3 screens, S (1–3 days).

**Backend:** None.

**Components to add:** `MultiFileSorter` (drag-reorder thumbnails), `PageRangePicker`, `CropRotateEditor`.

---

### 2.1 `/image-to-pdf` — Image to PDF Converter

- **Role:** Guest / Pro
- **Purpose:** Combine 1–20 images into one PDF with optional KB target.
- **Sections:** H1 → multi-file drop zone → thumbnail row (drag-to-reorder) → page-size + orientation + margin selectors → optional KB target → "Create PDF" CTA → progress → output preview → download.
- **Reuses:** `FileDropZone` (multi mode) + new `MultiFileSorter`.
- **States:** no images · 1+ images · reordering · processing · output · per-image-too-large.

### 2.2 `/pdf-to-image` — PDF to Image Converter

- **Role:** Guest / Pro
- **Purpose:** Render PDF pages to JPG/PNG/WebP, optional per-image KB target.
- **Sections:** H1 → file drop → output format → DPI (72/150/300) → optional per-image target KB → page range ("All" / "Custom" with `PageRangePicker`) → CTA → progress (per-page) → ZIP preview → download all.
- **Reuses:** Tool primitives + `PageRangePicker`.
- **States:** idle · PDF loaded · range invalid · rendering page n/m · ZIP ready · encrypted-PDF-blocked.

### 2.3 `/crop-rotate` — Crop & Rotate Editor

- **Role:** Guest / Pro
- **Purpose:** Lightweight pre-compression editor (rotate 90°, crop with aspect presets, auto-deskew).
- **Sections:** H1 → file drop → editor canvas → rotation buttons → crop aspect dropdown (Free/Square/Passport/A4/Custom) → crop handles → auto-deskew button → "Apply & continue" → routes to compressor with edited file.
- **Reuses:** Tool primitives + new `CropRotateEditor` (canvas-based).
- **States:** idle · editing · deskew-running · apply-pending.

---

# BATCH 3 — Programmatic SEO Engine

**Why third:** This is the **growth engine**. One template drives 140+ landing pages, each ranking for a long-tail keyword. Without this, the homepage gets no organic traffic.

**Estimated size:** 1 template route + data layer + 140 content rows, **L (1–2 weeks).**

**Backend:** PostgreSQL `landing_pages` table (Drizzle) as content source. Sitemap regeneration + IndexNow ping.

**Components to add:** `SeoLandingShell`, `SpecGrid`, `RelatedPagesStrip`, `FaqAccordion` (with FAQPage schema markup).

---

### 3.1 `/[slug]` — Programmatic Landing Page Template

The single most important route in the MVP. Drives all 140 SEO pages from one template + one data row.

- **Role:** Guest
- **Purpose:** Land user on a page that solves their exact searched problem with the target pre-filled, embedded tool ready.
- **Sections (template-driven):**
  1. (conditional) 4px saffron tactical bar — **only** for Indian-keyword pages (per BRAND_GUIDELINES §15)
  2. Site header
  3. H1 (with optional `.saffron-underline` on the keyword for Indian pages)
  4. Lede paragraph (80–150 words, keyword-optimized)
  5. (conditional) Saffron tactical chip ("Updated for 2026 SSC notification")
  6. Spec grid (when present): dimensions / KB range / format / background — `SpecGrid` component
  7. Embedded tool (the relevant one from Batch 1, pre-configured with target KB)
  8. PrivacyLockup compact
  9. (conditional) Disclaimer (visa pages: "final acceptance rests with consulate")
  10. (conditional) Source citation ("Specs from ssc.nic.in, verified Mar 2026")
  11. FAQ accordion (4–6 questions, FAQPage schema)
  12. RelatedPagesStrip (3+ internal links to sibling pages)
  13. Site footer
- **Page categories (the 140 pages this template generates):**
  - **PDF size targets** (11): `compress-pdf-under-{20,50,100,150,200,300,500,750,1000,2000,5000}-kb`
  - **Image size targets** (9): `compress-image-under-{5,10,20,30,50,100,200,500,1000}-kb`
  - **Exam photo** (25): `{exam}-photo-size` for SSC CGL/CHSL/MTS, UPSC CSE, IBPS PO/Clerk/RRB, SBI PO, RBI Grade B, NEET UG/PG, JEE Main/Advanced, GATE, CAT, GMAT, CUET, CTET, RRB NTPC/Group D, AFCAT, NDA, CDS, CLAT, NTA UGC NET
  - **Exam signature** (25): `{exam}-signature-size`
  - **Combined photo+sig** (25): `{exam}-photo-signature-size`
  - **Visa photo** (12): `{country}-visa-photo-size` for US, UK, Schengen, Canada, Australia, Japan, Singapore, UAE, etc.
  - **Format conversion** (15): `convert-heic-to-jpg`, `png-to-jpg`, `jpg-to-pdf`, etc.
  - **Document-specific** (8): `compress-aadhaar-photo`, `compress-pan-photo`, `compress-passport-photo`, etc.
  - **Use-case** (10): `compress-photo-for-naukri`, `compress-photo-for-linkedin`, etc.
- **Reuses:** Everything from Batches 1–2 (the embedded tools).
- **States:** Tool default · pre-filled target · spec available · spec missing · saffron-on / saffron-off based on page category.
- **Build steps:**
  1. Define data schema (slug, category, target KB, dimensions, KB range, format, background, headline, lede, FAQ array, source URL, last_verified_at, related_slugs[])
  2. Build `[slug]/page.tsx` with `generateStaticParams` for SSG of all known slugs
  3. Build sitemap.xml route generator
  4. Wire IndexNow + GSC ping on publish
  5. Author/edit 140 content rows (CMS or seed Airtable)

---

# BATCH 4 — Content & Marketing

**Why fourth:** Long-form articles boost SEO authority and link to tools. FAQ hub captures rich-snippet traffic.

**Estimated size:** 3 routes, S (1–3 days).

**Backend:** Markdown CMS — filesystem `content/blog/*.md` in v1, migrate to PostgreSQL table later. Sitemap + IndexNow.

**Components to add:** `BlogCard`, `BlogPostShell`, `FaqAccordion` (also used by Batch 3), `RelatedToolsStrip`, `TableOfContents`, `ArticleProse` (typography).

---

### 4.1 `/blog` — Blog Index

- **Role:** Guest
- **Purpose:** Latest articles, filterable by category (How-To, Exam Spec Guides, Visa Spec Guides, Comparison).
- **Sections:** Header + lede → category tabs → 12 most recent posts in BlogCard grid → pagination → footer.
- **Reuses:** Layout + `BlogCard` (new) + `Badge` for category.
- **States:** loading (server) · empty category · paginated.

### 4.2 `/blog/[slug]` — Blog Post

- **Role:** Guest
- **Purpose:** Long-form content, must link to ≥1 tool, all images alt-text required.
- **Sections:** Site header → article hero (title + author + date + category) → table-of-contents (sticky on desktop) → markdown body (rendered via `ArticleProse` typography component) → embedded tool CTA at end (e.g., SSC photo article embeds the SSC resizer) → AdSense placement (above-fold + below FAQ — per Better Ads Standards) → share buttons (no read tracking — privacy) → "Related" tools strip → footer.
- **Reuses:** `ArticleProse`, `RelatedToolsStrip`, embedded tool from Batch 1.
- **States:** rendered · not-found (410 Gone if unpublished).

### 4.3 `/faq` — FAQ Hub

- **Role:** Guest
- **Purpose:** Single-page accordion FAQ across categories (Privacy, How-To, Exam Specs, Visa Specs, Pro/Pricing). Targets featured snippet on Google.
- **Sections:** Header + lede → category tabs → accordion of Q&A within each category → permalink per question → footer.
- **Reuses:** `FaqAccordion` + tabs primitive.
- **States:** category selected · question expanded · permalink-deep-linked.
- **Schema:** Full `FAQPage` JSON-LD.

---

# BATCH 5 — Legal & Static

**Why fifth:** Required for launch (DPDP Act compliance, GDPR notice, cookie banner). Low effort but blocking.

**Estimated size:** 9 routes, XS (½–1 day total — markdown content lives in CMS).

**Backend:** None. Markdown content with `last_updated` timestamps.

**Components to add:** `LegalPageShell` (max-width-narrow with TOC), `CookieBanner` (one-time consent, no analytics by default).

---

### 5.1 `/privacy` — Privacy Policy
- Lawyer-reviewed. DPDP-compliant. "Last updated" prominent. Material change → Pro user re-acceptance banner.

### 5.2 `/terms` — Terms of Service

### 5.3 `/dpdp` — DPDP Compliance Notice (India-specific)

### 5.4 `/cookies` — Cookie Policy
- Optional separate route; can fold into `/privacy` if simpler.

### 5.5 `/pricing` — Pricing Page
- Three plans: Free / Pro Monthly ₹49 / Pro Annual ₹399 / API Starter ₹299/mo. Feature comparison table. GST disclosure. Razorpay logos. Money-back guarantee callout. FAQ at bottom.

### 5.6 `/about` — About
- Mission, founders, "made in India" ethos, contact email, GitHub link.

### 5.7 `/contact` — Contact
- Static support email + form (with Cloudflare Turnstile). Optional in v1 (just email link in footer is enough).

### 5.8 `/404` — Not Found
- Branded, links to homepage + top tools, search bar.

### 5.9 `/500` — Error Page
- Branded, "we logged it, try again," support email.

**Reuses across all:** `LegalPageShell` + `ArticleProse` typography.

---

# BATCH 6 — Pro Auth & Account

**Why sixth (post-MVP):** First gated set. Unblocks Batch 7 (Dashboard) and Batch 8 (API).

**Estimated size:** 8 screens, M (4–7 days).

**Backend:** Auth.js (NextAuth v5) with Google OAuth + Drizzle adapter on PostgreSQL · Razorpay Subscriptions API · Resend (transactional email).

**Components to add:** `OAuthButton`, `OnboardingTour`, `ProfileForm`, `BillingCard`, `InvoiceTable`, `PlanCompareTable`, `CancelFlowDialog`, `DeleteAccountDialog`.

---

### 6.1 `/login` — Login

- **Role:** Anonymous → Pro
- **Sections:** Centered card → wordmark → "Welcome back" → Google OAuth button → "By continuing you agree to Terms + Privacy" → "Don't have an account? Try Pro free →" → footer minimal.
- **States:** idle · OAuth in-flight · OAuth error · success-redirect.

### 6.2 `/signup` — Sign Up
- Same UX as 6.1, just headline differs ("Start your 7-day free trial. No card required."). Often a single component shared with 6.1.

### 6.3 `/onboarding` — Post-signup tour

- **Sections:** 3-step modal-style stepper → "What's your main use case?" (drives default preset) → "Show me around" mini tour → "Start your trial" CTA → routes to `/dashboard`.
- **States:** step 1 · step 2 · step 3 · skipped.

### 6.4 `/account/profile` — Profile & preferences

- **Sections:** Avatar (Google) + display name (editable) + email (read-only) → Default tool preset radio → notification prefs (receipt emails / product updates / exam-spec alerts) → language preference (En/Hi) → danger zone: "Delete account" with 30-day grace.
- **States:** form clean · form dirty · saving · saved · delete-confirm dialog.

### 6.5 `/account/billing` — Billing overview

- **Sections:** Current plan card → next billing date → payment method on file → "Change plan" / "Cancel" CTAs → recent invoices table (last 6) → link to `/account/billing/invoices`.
- **States:** active · trial · past-due · cancelled (still active until period end).

### 6.6 `/account/billing/invoices` — Invoice list

- **Sections:** Table of invoices: number, date, amount, status, download PDF action. GST-compliant.
- **States:** loading · empty · error.

### 6.7 `/account/upgrade` — Upgrade / Change plan

- **Sections:** Plan comparison table (3 columns) → selected plan summary → Razorpay checkout button → GST breakdown.
- **States:** picking · checkout-in-flight · success · failure.

### 6.8 `/account/cancel` — Cancellation flow

- **Sections:** Modal-style flow → reason radio (Too expensive / Don't need / Switched / Other) → optional feedback → "Pause for 1/2/3 months instead?" CTA → confirm → "Cancel at period end" confirmation.
- **States:** picking reason · confirming · cancelled.

---

# BATCH 7 — Pro Tools Dashboard

**Why seventh:** Gives Pro users a reason to come back. Counters drive perceived value ("you saved 4.2 GB").

**Estimated size:** 4 screens, M (4–7 days).

**Backend:** PostgreSQL `usage_counters` table (Drizzle) + Web Worker pool for batch processing.

**Components to add:** `StatCard`, `UsageChart` (recharts or similar), `PresetTable`, `BatchProgressGrid`, `WorkerPoolStatus`.

---

### 7.1 `/dashboard` — Pro Dashboard

- **Sections:** "Welcome back, {name}" → 4 StatCards (this month: PDFs / images / photos / total bytes saved) → 30-day usage chart → "Bytes saved" headline metric → recent presets shortcut → footer.
- **States:** loading · empty (new user) · loaded · error.

### 7.2 `/pro/batch` — Batch Processing

- **Sections:** Drop zone (multi, accepts ZIP, max 100 files / 500 MB) → unified KB target + settings → "Process all" CTA → BatchProgressGrid (per-file row with status: queued/processing/done/failed) → ETA → "Download all as ZIP" CTA → failed-files report.
- **Reuses:** Batch 1 tool primitives.
- **States:** idle · uploading · processing (with worker pool) · paused-OOM · partial · complete.

### 7.3 `/pro/presets` — Saved Presets

- **Sections:** Table of presets (name, tool, settings summary, last used, usage count) → "New preset" CTA → preset edit dialog.
- **States:** empty · listed · editing · deleting confirm.

### 7.4 `/pro/history` — Compression History

- **Sections:** Tab: this month / 30 days / 90 days / all-time → counter table (tool, count, last used, bytes saved) → CSV export.
- **Privacy note:** Counters only. No filenames, no content.
- **States:** loading · empty · loaded.

---

# BATCH 8 — API (Pro/Developer)

**Why eighth:** Smaller revenue (5%) but high ACV per developer customer. Server-side compression endpoints introduce a different code path.

**Estimated size:** 3 screens (UI) + REST endpoints, M (4–7 days).

**Backend:** Vercel Edge serverless functions, server-side compression in temporary memory (deleted < 60s).

**Components to add:** `ApiKeyTable`, `ApiKeyDialog`, `UsageBreakdownChart`, `EndpointDocs`, `CodeBlock` (with copy), `LanguageTabs`.

---

### 8.1 `/pro/api-keys` — API Key Management

- **Sections:** Table of keys (name, last 4 chars, scopes, last used, status) → "Generate key" dialog (name + scopes checkboxes) → reveal-once with copy CTA + warning banner → revoke confirm.
- **States:** empty · listed · generating · revoking.

### 8.2 `/pro/api-usage` — API Usage & Billing

- **Sections:** Calls this month → quota meter → endpoint breakdown chart → projected month-end bill → 80%/100% alerts banner → upgrade CTA.
- **States:** loading · within quota · approaching · over.

### 8.3 `/api/docs` — Developer Documentation

- **Sections:** Sidebar navigation (Getting Started / Authentication / Endpoints / Errors / Changelog) → endpoint reference (request shape, response shape, errors per endpoint) → curl + JS + Python tabs → live "try it" widget (pro feature).
- **Endpoints documented:** `POST /api/v1/compress-pdf`, `POST /api/v1/compress-image`, `POST /api/v1/resize-photo`, `GET /api/v1/usage`.

---

# BATCH 9 — Admin Core

**Why ninth:** Internal-facing. Needed before content team can manage programmatic SEO at scale (Batch 10 depends on this).

**Estimated size:** 4 screens, S (1–3 days).

**Backend:** PostgreSQL `users.role` column (Auth.js session) — Admin / Super Admin roles.

**Components to add:** `AdminShell` (different nav, narrower max-width, denser tables), `RoleBadge`, `AuditLogPanel`, `UserSearchBar`, `BulkActionsBar` (placeholder — Phase 1 doesn't include bulk).

---

### 9.1 `/admin/login` — Admin Login
- Same as `/login` but routes to `/admin` on success and requires admin role.

### 9.2 `/admin` — Admin Dashboard
- Overview tiles: total users, paid users, today's usage, abuse flags, error count last 24h.
- Quick links to other admin sections.

### 9.3 `/admin/users` — User List
- **Sections:** Search bar → filters (status, signup date, paid, flagged) → user table → click row → user detail.
- **Privacy guarantee:** Admin sees no file content (none stored). All admin actions audit-logged.

### 9.4 `/admin/users/[id]` — User Detail / Support Context
- **Sections:** Profile read-only → tabs: Subscription history / API keys / Counter events (last 10) / Audit log → action buttons: Grant Pro / Revoke Pro / Extend Trial → reason field (mandatory ≥10 chars).
- **States:** viewing · action dialog open · audit-logged.

---

# BATCH 10 — Admin Content & SEO

**Why tenth:** Unblocks the content team. Batch 3 publishes from this. The 140 landing pages, the blog, the FAQ, the exam/visa spec database all live here.

**Estimated size:** 6 screens, **L (1–2 weeks).**

**Backend:** PostgreSQL content tables (Drizzle) + markdown editor + sitemap regeneration + IndexNow + GSC ping.

**Components to add:** `LandingPageTable` (sortable, filterable), `LandingPageEditor` (form + live preview pane), `MarkdownEditor` (tiptap or similar), `BlogPostList`, `SpecRecordTable`, `SpecEditor`, `LighthouseBadge` (auto-checked on publish), `PublishButton` (with sitemap regen + ping pipeline).

---

### 10.1 `/admin/landing-pages` — Programmatic Landing Page Manager

- **Sections:** Sortable table of all pages (slug, category, target KB, status, traffic 30d, conversion %) → bulk import CSV → "New page" CTA.
- **States:** loading · listed · filtering · importing.

### 10.2 `/admin/landing-pages/[id]` — Landing Page Editor

- **Sections:** Two-pane: form on left (slug + category + target_kb + meta_title + meta_description + H1 + lede + FAQ array + related_slugs[]) + live preview iframe on right → "Save draft" / "Schedule" / "Publish" → on publish: regenerate sitemap + ping GSC + IndexNow → Lighthouse badge after publish (must be ≥90 mobile, blocks if not).
- **States:** draft · validating · publishing · published · failed-validation.

### 10.3 `/admin/blog` — Blog Post List
- Same shape as 10.1 but for blog posts.

### 10.4 `/admin/blog/[id]` — Blog Post Editor
- Markdown editor with sidebar: title, slug, author, category, featured image, meta, related tools. Save draft / schedule / publish.

### 10.5 `/admin/content` — FAQ + Static Page Editor
- List of FAQ entries (question, category, order) + static pages (privacy, terms, dpdp). Inline markdown edit. Publish-or-draft toggle.

### 10.6 `/admin/specs` — Exam / Visa Spec Database

- **Sections:** Tabbed: Exam specs / Visa specs → table with last_verified_at column (red if >90 days) → "Add spec" / "Edit" → form: dimensions (W×H px) + KB range + format + background + source URL + last_verified_at → on save: associated landing pages auto-update.
- **States:** listed · editing · save-with-side-effects (pages updating) · email-pro-users-of-affected-presets-toggle.

---

# BATCH 11 — Admin Analytics & Operations

**Why last:** Operational tools, valuable but not blocking. Most data flows through external systems (Plausible, Sentry).

**Estimated size:** 4 screens, M (4–7 days).

**Backend:** Plausible API (visitor analytics) + Sentry API (errors) + custom abuse table.

**Components to add:** `AnalyticsDashboard` (chart-heavy), `AbuseQueue`, `BlockDialog`, `ErrorLogTable`, `RevenueDashboard`, `DateRangePicker`.

---

### 11.1 `/admin/analytics` — Tool Usage Analytics

- **Sections:** Date range picker → tool/page filter → unique visitors (Plausible) + operation count (anonymous beacon) + conversion % per page + state-level geography → CSV export.
- **States:** loading · range applied · empty (no data in range).

### 11.2 `/admin/abuse` — Abuse Detection & Rate Limiting

- **Sections:** Queue of flagged IPs/fingerprints (auto-flagged at 30 ops/hr for guests, 500 for Pro) → flag reason, action history → admin actions: warn / Turnstile-challenge / block (1h/24h/forever) → appeal queue (shared-IP appeals).
- **States:** queue empty · queue active · acting on entry.

### 11.3 `/admin/errors` — Error Log Viewer

- **Sections:** Embedded Sentry view OR custom table of last 24h errors → grouped by digest → details panel with stack trace → mark resolved.
- **States:** healthy · errors-present · investigating.

### 11.4 `/admin/payments` — Revenue Dashboard

- **Sections:** MRR / ARR / new subscriptions / churn / failed payments → top revenue users → Razorpay reconciliation panel → CSV export for accounting.
- **States:** loading · loaded · razorpay-down (banner).

---

# Out-of-scope (Phase 2+, not built in any batch above)

These are noted to prevent scope creep:

- Native iOS/Android apps (PWA covers this)
- Email/password signup (Google OAuth only in Phase 1)
- Team/multi-tenant accounts
- Webhook callbacks for the API
- A/B testing of landing pages
- Automatic background replacement (AI) for photos
- On-device camera capture for visa photos
- Browser extension
- Tamil/Telugu/Marathi/Bengali/Gujarati locales (English + Hindi only at launch)
- Newsletter / community features
- Affiliate dashboard for affiliates themselves (we just track outbound)

---

# Recommended sequencing

A practical 5-week MVP build (per the SOW target):

| Week | Focus | Batches |
|---|---|---|
| 1 | Tool infrastructure | 1.1, 1.2 (PDF compress) end-to-end + WASM module integration |
| 2 | Tool breadth | 1.3, 1.4, 1.5, 1.6 (image, photo hub, signature, verify) + Batch 2 in parallel |
| 3 | SEO engine | Batch 3 — template + 50 seeded landing pages |
| 4 | Content + Legal | Batches 4 + 5 + the remaining 90 landing pages |
| 5 | Polish, perf, launch | Lighthouse ≥90 sweep, accessibility audit, soft-launch with first organic search hits |

Post-MVP weeks 6–10: Pro auth + dashboard + API (Batches 6–8). Weeks 11–14: Admin (Batches 9–11).

---

**Approval needed before build starts:**
- [ ] Scope as planned (all 11 batches)
- [ ] Batch ordering
- [ ] MVP cut-line (end of Batch 5)
- [ ] Out-of-scope list

Once you green-light, I'll start with Batch 1.
