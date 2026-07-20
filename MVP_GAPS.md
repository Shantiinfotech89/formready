# Compress4 — MVP Gap Audit

**As of:** May 2026 · **Scope:** what remains to launch publicly per the SOW

This document audits the current build against `SOW_Compress4_PDF_Image_Compression.md` and `SCREENS_PLAN.md`, marks each item ✅ done, ⚠️ partial, or ❌ missing, and categorises the work into three buckets so you can see what's actually launch-blocking.

---

## TL;DR

**MVP screens (Batches 1–5):** ✅ all 25 user-facing routes built and serving 200.

**What's left for public launch** is grouped into:

- **Engineering gaps** — 6 small items, ~3–5 days
- **Operational gaps** — 6 launch-blocking items, ~2–3 days
- **Content gaps** — content-author work, ~1–2 weeks of writing/lawyering

You don't need any of the "Engineering gaps" to put the site live for users. You DO need most of the "Operational gaps" and the lawyer review before the site is publicly accessible.

---

## Audit by SOW section

### §2.1.1 — PDF Compression Tool (5 features)

| # | Feature | Status | Notes |
|---|---|---|---|
| 2.1.1.1 | Upload PDF & set target size | ✅ | `/compress-pdf` |
| 2.1.1.2 | Iterative compression to hit target | ✅ | 8-tier engine in `src/lib/compression/pdf.ts` |
| 2.1.1.3 | Preview & download | ⚠️ | Download works; **no PDF preview pane via pdf.js yet** |
| 2.1.1.4 | Quality comparison slider | ❌ | Split-screen original-vs-compressed not built |
| 2.1.1.5 | Privacy & trust display | ✅ | Trust badges + `/privacy/verify` page |

### §2.1.2 — Image Compression Tool (4 features)

| # | Feature | Status | Notes |
|---|---|---|---|
| 2.1.2.1 | Upload image & set target | ✅ | `/compress-image` |
| 2.1.2.2 | Smart compression engine | ✅ | 14-tier engine, quality + dimension reduction |
| 2.1.2.3 | Side-by-side comparison & download | ✅ | Both visible after compression |
| 2.1.2.4 | Format conversion helper | ✅ | Auto-converts HEIC etc. via output-format selector |

### §2.1.3 — Photo & Signature Resizer (4 features)

| # | Feature | Status | Notes |
|---|---|---|---|
| 2.1.3.1 | Exam-specific photo resizer | ⚠️ | 8 of 25 presets in MVP; **no face-detection / no background-color check** |
| 2.1.3.2 | Visa photo resizer | ⚠️ | 4 of 8 visas (US, UK, Schengen, Canada); no head-ratio check |
| 2.1.3.3 | Signature compressor | ✅ | `/signature` with grayscale + threshold |
| 2.1.3.4 | Combined photo + signature pack | ⚠️ | Both can be processed but **no combined ZIP download** |

### §2.1.4 — Document Conversion Utilities (3 features)

| # | Feature | Status | Notes |
|---|---|---|---|
| 2.1.4.1 | Image to PDF | ✅ | `/image-to-pdf` |
| 2.1.4.2 | PDF to Image | ✅ | `/pdf-to-image` with ZIP packaging |
| 2.1.4.3 | Crop & rotate | ⚠️ | Crop + 90°/180°/270° rotate works; **no auto-deskew** |

### §2.1.5 — Content, SEO & Programmatic Pages (5 features)

| # | Feature | Status | Notes |
|---|---|---|---|
| 2.1.5.1 | Programmatic landing pages | ⚠️ | **10 of ~140 built** (smoke test); template proven, ~130 are content-author work |
| 2.1.5.2 | Blog | ⚠️ | Index + post template + 3 seed posts; needs ~10 more posts at launch per SOW intent |
| 2.1.5.3 | FAQ Hub | ⚠️ | 14 questions across 4 categories (was 18, dropped 4 Pro questions); SOW targets 30+ |
| 2.1.5.4 | Homepage | ✅ | Hero · 4 tool cards · trust strip · quick-link grid · blog preview · FAQ |
| 2.1.5.5 | Privacy/Terms/Compliance | ✅ | Privacy · Terms · DPDP · Cookies · all v0 drafts |

### §2.2 — Pro user features (Batches 6–8)

**Entire section is intentionally deferred per your decision to ship MVP without auth.** Listed for completeness:

- §2.2.1 Account management — ❌ deferred
- §2.2.2 Batch processing — ❌ deferred
- §2.2.3 API access — ❌ deferred
- §2.2.4 Billing — ❌ deferred + pricing page hidden until traffic

### §2.3 — Admin panel (Batches 9–11)

**Entire section deferred until the team needs to manage content at scale.** With current setup the team can edit `src/lib/landing-pages/data.ts` and `content/blog/*.md` directly via Git for any updates.

---

## Engineering gaps (3–5 days, none launch-blocking)

These would polish the product but the site can ship without them. Ordered by user-visible impact.

### 1. PWA / offline support — ⚠️ small (½ day)
**SOW §1.1:** "PWA with service worker enables PDF and image compression to work fully offline after first visit."
**What's missing:** `manifest.webmanifest`, service worker, offline fallback page, install banner.
**Impact:** users on flaky deadline-day connections lose access to a tool that should work offline. Brand promise has a small hole.
**Fix:** add `next-pwa` or hand-rolled service worker that caches static assets + WASM modules.

### 2. PDF preview pane (pdf.js) — ⚠️ small (1 day)
**SOW §2.1.1.3:** "Preview thumbnail of compressed PDF rendered."
**What's missing:** after compression, render the first page of the compressed PDF as an `<img>` so users can verify text legibility before downloading.
**Impact:** users have to download to verify quality.
**Fix:** call `pdfjs-dist` `getDocument(blob).getPage(1).render(canvas)` and convert canvas to image.

### 3. Quality comparison slider — ❌ medium (1–2 days)
**SOW §2.1.1.4 and §2.1.2.3:** draggable split-screen showing original vs compressed PDF/image side-by-side.
**What's missing:** the interactive slider component.
**Impact:** power users can't visually verify the compression ratio.
**Fix:** small client component with `clip-path` + pointer drag handler.

### 4. Combined photo + signature ZIP — ⚠️ small (½ day)
**SOW §2.1.3.4:** when on an exam preset, after processing both photo and signature, package them as one ZIP.
**What's missing:** "Download combined ZIP" button on exam preset pages.
**Impact:** users have to download two files separately. Minor.
**Fix:** wire JSZip (already installed) to bundle the two outputs.

### 5. HEIC libheif-wasm fallback — ⚠️ small (½ day)
**SOW §2.1.2.1:** "HEIC handled via libheif-wasm fallback."
**What's missing:** if `createImageBitmap` fails on a HEIC file (older Chrome/Firefox can't decode), fall back to libheif-wasm.
**Impact:** older browsers may reject HEIC photos with a confusing error.
**Fix:** install `libheif-js` or `heic2any`, wrap in try/catch around current decoder.

### 6. Anonymous usage counter beacon — ⚠️ small (1 day)
**SOW throughout:** anonymous `compressed/X/today` counter ping for billing + product analytics.
**What's missing:** a `POST /api/v1/event` endpoint that increments a Postgres counter, plus a 1-line `fetch('/api/v1/event', ...)` after each successful compression.
**Impact:** we have no idea how often each tool is used.
**Fix:** needs the database to be set up first (Batch 6 work). Until then, Plausible page-view analytics (item below) gives us visit-level data which is enough for v1.

### Deferred to Phase 2 per SOW
- Face detection for photo positioning
- Background-colour check for exam photos
- Auto-deskew for scans
- AI background-to-white replacement
- Live camera capture for visa photos

These are all explicitly Phase 2 in the SOW; not gaps for MVP.

---

## Operational gaps (2–3 days, several launch-blocking)

These are environmental/integration items, not new code. Most are env-variable + small config changes.

### 1. Real domain + DNS — ❌ blocking
- Register `compress4.com` (if not already)
- Point CNAME to Vercel
- SSL auto-provisioned by Vercel

### 2. Vercel production deploy — ❌ blocking
- Hook the GitHub repo to a Vercel project
- Set env vars: `NEXT_PUBLIC_SITE_URL`, etc.
- Set custom domain
- Verify production build (`npm run build`) succeeds — currently we've only run dev

### 3. Plausible analytics — ⚠️ blocking
- Sign up at plausible.io for the domain
- Add the script tag to `app/layout.tsx` (1 line)
- **Until we add this, we have zero data on traffic** — and that's the entire point of the "ship first, monetize after traffic" strategy you chose

### 4. Google Search Console + sitemap submission — ⚠️ blocking
- Verify ownership of `compress4.com`
- Submit `https://compress4.com/sitemap.xml`
- Set up GSC API key for IndexNow auto-ping (Phase 2 admin work)

### 5. Sentry error tracking — ⚠️ recommended
- Sign up, create a project
- Install `@sentry/nextjs`, run their wizard
- Keeps us informed when things break in production

### 6. AdSense — ❌ deferred but eventually launch-blocking
Currently no ads anywhere. AdSense is 60% of Year 1 revenue per the SOW business model.
- Apply for AdSense (requires real traffic — chicken/egg)
- Once approved, add ad slots to tool pages and blog posts
- Honour cookie consent gate

**Decision needed:** AdSense before traffic or after? Most accept-tied programs require existing traffic, so the practical answer is **launch first, apply once traffic is real**.

---

## Content gaps (1–2 weeks of non-engineering work)

### 1. Lawyer review of legal pages — ❌ blocking
**All four legal pages** (`/privacy`, `/terms`, `/dpdp`, `/cookies`) are marked "v0 draft" with `[BRACKETED]` placeholders for company name, address, CIN, grievance officer. **Cannot launch publicly until:**
- Legal entity is registered (or the site disclaims that operations are by an individual)
- An Indian privacy/commercial-law lawyer reviews and approves the wording
- Bracketed placeholders are replaced with real values

### 2. Programmatic landing pages — 10 of ~140
We seeded 10 to prove the template (`SCREENS_PLAN.md` Batch 3). To realise the SOW's growth-engine bet, we need:
- **+15 exam pages**: SSC CHSL, MTS · UPSC equivalents · IBPS Clerk/RRB/SBI PO · GMAT · CTET · NDA · CDS · CLAT · NTA UGC NET · etc.
- **+25 exam-signature pages**: `{exam}-signature-size`
- **+25 combined photo+signature pages**: `{exam}-photo-signature-size`
- **+8 visa pages**: Australia, Japan, Singapore, UAE, etc.
- **+10 size-target pages**: PDF under 50/200/500 KB · Image under 10/20/100 KB
- **+15 format-conversion pages**: HEIC→JPG, PNG→JPG, JPG→PDF, etc.
- **+8 document-specific pages**: Aadhaar/PAN/passport photo
- **+10 use-case pages**: photo for Naukri, LinkedIn, etc.

Each takes ~30–60 minutes to write (research source, write lede, write FAQ, set spec). A content writer can produce 10–15 per day. **Realistic total: 130 pages × ~45 min = ~5 working days.**

### 3. Blog scale-up — 3 to ~10 posts
Three seed posts is thin. Aim for 8–12 at launch covering:
- Why your form rejected your photo ✅
- PDF compression demystified ✅
- Visa photo specs ✅
- *missing:* "Compressing a JPG without losing quality"
- *missing:* "How to combine multiple PDFs without uploading"
- *missing:* "Aadhaar photo size: the spec and the workaround"
- *missing:* "Filling SSC online — a 2026 walkthrough"
- *missing:* "Why we don't trust 'secure cloud' compression tools"

### 4. FAQ scale-up — 14 to 30+
SOW targets 30+ at launch. Currently 14 (after dropping 4 Pro questions). Need ~16 more across:
- Privacy (currently 4): add about 4 more — sub-processors, GDPR specifics, what happens during browser crash, etc.
- How-to (4): add 4 more — file size limits, what to do on rejection, multi-page, mobile-specific
- Exam specs (4): add ~5 more — RBI Grade B, AFCAT, CTET, NDA, CDS, CLAT
- Visa specs (3): add ~5 more — Australia, Japan, Singapore, UAE, Canada-specific

### 5. Hindi translations
EN+HI is the SOW's launch promise. The app shell, nav, brand strings are translated. **Long-form content is English-only:**
- Blog posts: 0 of 3 translated
- FAQ items: 0 of 14 translated
- Legal pages: 0 of 4 translated
- About / Contact: 0 translated
- Landing page lede + FAQ: 0 of 10 translated

This is several days of translation work. **Decision needed:** ship English-only at launch and add Hindi rolling, or block launch on Hindi parity?

### 6. Real visual assets
- Open-graph images for each major route (currently default)
- Real favicon variants (`favicon-16x16`, `favicon-32x32`, `apple-touch-icon`)
- Twitter card image
- About-page founder photos / origin story

---

## Recommended launch-prep sequence

Given the "land users first, paid features later" decision:

| Day | Focus |
|---|---|
| **Day 1** | Vercel deploy · domain + DNS · Plausible analytics · GSC verification |
| **Day 2** | Sentry · production build verify · open-graph images · favicons |
| **Day 3** | Content sprint kickoff (lawyer brief sent · content writer briefed) |
| **Days 4–7** | Lawyer review of 4 legal pages (with founder iteration) |
| **Days 4–8** | Content writer: +30 landing pages (highest-traffic keywords first) |
| **Days 7–10** | Engineering polish: PWA, PDF preview, quality slider, combined ZIP |
| **Day 11** | Lighthouse audit: every public route ≥ 90 mobile |
| **Day 12** | Soft launch — share with first 50 users, collect feedback |
| **Days 13–20** | Iterate based on feedback · add ~50 more landing pages · apply for AdSense |
| **Day 21** | Public launch — submit to Show HN, post in r/india, r/IndiaCareers |

The first ~2 weeks is parallelisable: legal review + content writing + engineering polish run side-by-side. Single founder + one writer + lawyer-on-retainer = 3 weeks to public launch.

---

## What you should do next

1. **Decide on lawyer.** Get a referral or post on PSocialLegal/IndianLawyer; legal entity decision needs to come first.
2. **Decide on launch language.** English-only at first, or block on Hindi parity?
3. **Pick the next engineering item.** I'd suggest in this order:
   - **PWA + offline** (delivers a brand-promise piece — "works offline" is in the homepage copy already)
   - **PDF preview after compression** (fixes the #1 user-trust complaint we'd hear)
   - **Plausible + Sentry + Vercel deploy** (so day-1 traffic actually gets measured)
4. **Or start content scaling.** If you have a writer, kick them off on landing pages — the template is ready and waiting.

Tell me which item to pick up first.
