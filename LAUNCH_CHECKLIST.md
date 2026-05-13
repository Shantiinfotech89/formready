# FormReady — Launch Checklist

**As of:** 2026-05-09 · **Status:** code-complete; awaiting infra + legal + content

This is the single source of truth for what stands between us and the public launch.
The previous `MVP_GAPS.md` is now mostly superseded by Sprint 1–3 deliveries — this
file is the post-Sprint-3 view.

---

## ✅ Done (verified)

### Engineering
- ✅ All 25 user-facing MVP routes built; 6 utility routes; 10 SSG landing pages; 3 blog posts
- ✅ **Production build passes** — `npm run build` exits 0, 40 routes, 89.9 KB shared First Load JS
- ✅ TypeScript strict, no errors (`tsc --noEmit` clean)
- ✅ PWA + service worker (offline after first visit)
- ✅ HEIC fallback via `libheif-js/wasm-bundle`
- ✅ PDF preview pane after compression (pdfjs inline render)
- ✅ Combined photo + signature ZIP on exam presets
- ✅ Sonner toast — every successful download fires "Stayed on your device"
- ✅ Cookie banner (DPDP/GDPR-compliant)
- ✅ Browser-compat detection screen
- ✅ Inline trust notice above every drop zone
- ✅ Cross-tool discovery CTAs in success states
- ✅ Architectural commitments on every tool page
- ✅ Live-verify embed on homepage + /privacy/verify
- ✅ 12-section homepage with trust-first information architecture
- ✅ Bilingual shell (EN/HI cookie-based locale)
- ✅ Sitemap, robots.txt auto-generated
- ✅ Pricing hidden from nav/footer/sitemap until traffic warrants it
- ✅ **Open-graph image** — `app/opengraph-image.tsx` (built, edge-rendered)
- ✅ **Raster favicons** — `app/icon.tsx` (32×32) + `app/apple-icon.tsx` (180×180)
- ✅ **Plausible analytics** — env-gated, no script loads when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is unset

### Content (seed)
- ✅ 10 programmatic landing pages (template proven)
- ✅ 3 blog posts
- ✅ 14 FAQ entries across 4 categories
- ✅ All four legal pages drafted (privacy, terms, dpdp, cookies)
- ✅ Lawyer brief (`LAWYER_BRIEF.md`) ready to send

---

## 🔴 Hard launch blockers — needs YOU

These cannot ship without explicit user input or external action.

### 1. Lawyer review of legal pages
- **What:** all four legal pages are v0 drafts with `[BRACKETED]` placeholders
- **Status:** `LAWYER_BRIEF.md` is ready to email to a privacy/commercial-law lawyer
- **What needs filling in once a lawyer signs off:**
  - `[LEGAL ENTITY NAME — e.g., FormReady Technologies Pvt Ltd]`
  - `[CIN]` (Corporate Identification Number)
  - `[REGISTERED ADDRESS]`
  - `[GRIEVANCE OFFICER NAME]`
  - `[JURISDICTION CITY — e.g., Mumbai]`
- **Until done:** site says "v0 draft" prominently in the privacy banner — fine for soft launch but not for paid traffic.

### 2. Domain + DNS + Vercel deploy
- **What:** register `formready.in`, point CNAME to Vercel, verify SSL
- **Steps:**
  1. Confirm domain registration (or register at e.g. GoDaddy/Namecheap)
  2. Create Vercel project, link GitHub repo
  3. Add custom domain `formready.in` + `www.formready.in`
  4. Set env vars on Vercel (see §Env vars below)
  5. Push to `main` → auto-deploy
- **Estimated time:** 30 min once you have access to all accounts.

### 3. Real support email mailboxes
The site references 7 distinct email addresses. They must all route somewhere
before launch — even if all 7 are aliases of one inbox to start:
- `hello@formready.in` (general)
- `support@formready.in` (user issues)
- `security@formready.in` (vulnerability disclosure)
- `bugs@formready.in` (bug reports)
- `billing@formready.in` (future Pro)
- `press@formready.in`
- `grievance@formready.in` (DPDP grievance officer)
- `privacy@formready.in` + `dpo@formready.in` + `legal@formready.in`

**Recommended:** Google Workspace or Zoho Mail. Set up `hello@` as the primary
and the rest as forwards.

---

## 🟡 Strongly recommended before launch (but not blocking)

### 4. Plausible signup
- **What:** create a Plausible site for `formready.in`
- **Steps:** sign up at plausible.io ($9/mo) → add site → copy the data-domain
- **Then:** set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=formready.in` on Vercel
- **Why now:** the entire "ship-first, monetize after traffic" strategy depends on
  knowing how much traffic we have. Without analytics, we're flying blind.

### 5. Google Search Console + Bing Webmaster Tools
- **What:** verify ownership, submit sitemap
- **Steps:**
  1. Add `https://formready.in` to GSC
  2. Verify via DNS TXT record (Vercel makes this easy)
  3. Submit `https://formready.in/sitemap.xml`
  4. Repeat in Bing Webmaster Tools
- **Estimated time:** 20 min total.

### 6. Sentry error tracking
- **What:** so we hear about JS exceptions in production
- **Steps:** sign up at sentry.io (free tier OK for v1) → run `npx @sentry/wizard@latest -i nextjs`
- **Why now:** silent client-side errors destroy trust. The first time someone
  uploads a corrupt PDF and gets a blank screen, we want to know.

---

## 🟢 Nice-to-have (clearly post-launch)

### 7. Content scale-up
- **130+ more programmatic landing pages** — content writer territory, ~5 days
- **5–7 more blog posts** — at least one per week post-launch
- **16+ more FAQ entries** — to reach SOW target of 30+
- **Hindi translations** of long-form content — currently shell only

### 8. Quality comparison slider (SOW §2.1.1.4 / §2.1.2.3)
Draggable original-vs-compressed split-screen. Power users would love it; nobody's
blocking on it. Punt to a Sprint 4.

### 9. AdSense application
Per the SOW business model, AdSense is ~60% of Year-1 revenue. AdSense requires
existing traffic to approve, so the realistic path is: launch → wait for traffic
→ apply → integrate.

### 10. Pricing re-enable
Pricing page exists at `/pricing` but is removed from nav/footer/sitemap and has
`robots: { index: false }`. When traffic justifies it (we suggested 5k/day MAU),
flip the visibility flag.

---

## Env vars to set on Vercel

```
NEXT_PUBLIC_SITE_URL=https://formready.in
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=formready.in        # after Plausible signup
SENTRY_DSN=...                                    # after Sentry signup (auto-set by wizard)
SENTRY_AUTH_TOKEN=...                             # for sourcemap uploads (auto-set)
```

That's it. No DB, no secrets, no auth providers — the architecture-first
privacy stance means there's nothing on the server side to configure.

---

## Recommended launch sequence

| Day | Task | Who |
|---|---|---|
| **1** | Send `LAWYER_BRIEF.md` to privacy lawyer (start clock) | You |
| **1** | Register `formready.in` if not already | You |
| **1** | Set up Google Workspace + 7 email aliases | You |
| **2** | Vercel project + custom domain + DNS | You (15 min) |
| **2** | Plausible signup + add env var | You (10 min) |
| **2** | GSC + Bing webmaster verify + submit sitemap | You (20 min) |
| **2** | Sentry signup + wizard | You (15 min) |
| **3–7** | Lawyer round-trips, replace `[BRACKETED]` placeholders | You + lawyer |
| **3–10** | Content writer: +30 highest-traffic landing pages | Content writer |
| **3–10** | Content writer: +5 blog posts | Content writer |
| **8** | Soft launch — share with 50 personal contacts | You |
| **10–14** | Iterate on real-user feedback | Engineering |
| **14** | Public launch — Show HN, r/india, r/IndiaCareers | You |

Total elapsed: ~2 weeks from today.

Single biggest dependency: **the lawyer.** Everything else is hours, not days.

---

## How to verify post-deploy

After Vercel deploys to production:

1. `curl -I https://formready.in/` → 200, HSTS header present
2. `curl https://formready.in/sitemap.xml` → valid XML with all 40 routes
3. `curl https://formready.in/robots.txt` → references the sitemap
4. Visit `/compress-pdf` on phone → run real compression → verify toast fires
5. DevTools → Network tab → run compression → confirm **zero** outbound requests
   (this is the headline trust claim)
6. Lighthouse audit on `/` → ≥90 mobile across all four categories
7. Plausible dashboard → first page-view event from your test visit shows up
8. Test all 7 email addresses receive (send a test from an external account)
9. View `https://formready.in/opengraph-image` → renders the OG card
10. Add to home screen on iOS → confirms apple-touch icon shows up correctly

If all 10 pass: you're live.
