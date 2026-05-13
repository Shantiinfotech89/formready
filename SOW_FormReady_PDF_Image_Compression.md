# SCOPE OF WORK (SOW)

## Project: FormReady.in — Exact-Size PDF & Image Compression Platform

---

### Cover Page

| Field | Value |
|---|---|
| **Project Name** | FormReady.in — Get Your Documents Form-Ready |
| **Document Type** | Scope of Work (SOW) / Functional Requirements Document |
| **Version** | 1.0 |
| **Prepared By** | Product Architecture Team |
| **Prepared On** | April 21, 2026 |
| **Target Launch** | MVP — 5 weeks from kickoff |
| **Engagement Model** | Fixed-scope MVP + phased programmatic SEO rollout |

---

### Change Log

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-04-21 | Product Team | Initial SOW for MVP Phase 1 |

---

### Table of Contents

1. [Introduction](#10-introduction)
   - 1.1 General Technical Requirements
   - 1.2 Targeted System Users
   - 1.3 Third Party Integrations
2. [Functional Requirements](#20-functional-requirements)
   - 2.1 Guest User — Web Platform
   - 2.2 Registered Pro User — Web Platform
   - 2.3 Admin — Admin Panel
3. [User Coverage Summary](#user-coverage-summary)
4. [Deliverables](#30-deliverables)
5. [Future Considerations](#40-future-considerations)
6. [Risks & Assumptions](#50-risks--assumptions)
7. [Appendices](#appendix-a-mvp-build-plan-5-weeks)

---

## 1.0 Introduction

### Overview

FormReady.in is a privacy-first web utility platform that solves a small but universally-painful problem: getting documents to fit *exact* file size limits demanded by online forms. Every Indian student applying to SSC, UPSC, NEET, JEE, GATE, IBPS, or any state government exam has lost an hour to "your photo must be under 50KB and your signature under 10KB." Every visa applicant — US B1/B2, UK, Schengen, Canada PR — fights with a 240KB photo limit. Every property registration portal demands "PDF below 500KB." Existing tools (iLovePDF, SmallPDF, Adobe Acrobat Online) give users generic "low / medium / high" compression sliders that force endless trial-and-error to hit the right size.

FormReady.in fixes this by accepting an **exact target size in KB** as the primary input. The user enters "100KB," uploads a file, and the tool iteratively compresses until it lands at or below that target — no guessing, no re-uploading, no DPI math. All compression happens in the user's browser using WebAssembly-compiled compression libraries; no file content ever touches our servers. The platform launches with three core tools (PDF compression to exact KB, image compression to exact KB, passport-style photo resizer) and a library of pre-configured tool pages for the most-searched use cases ("compress photo for SSC," "passport photo for US visa," "UPSC signature size," "NEET application photo size," etc.) — each one a separate landing page targeting a specific long-tail keyword.

The site monetizes via Google AdSense on tool and content pages (high-intent education and visa traffic with decent CPC), affiliate revenue from coaching platforms (Unacademy, Byju's, Khan Academy), and a low-priced Pro tier (₹49/month or ₹399/year) for batch processing, API access, ad removal, and team usage.

### Business Model

| Revenue Stream | Target Audience | Expected Contribution (Year 1) |
|---|---|---|
| Google AdSense (display ads on tool + blog pages) | All visitors | 60% |
| Pro Subscription (₹49/mo or ₹399/yr) | Students, freelancers, small offices | 20% |
| Affiliate (Unacademy, Byju's, visa services, coaching platforms) | Exam aspirants, visa applicants | 15% |
| API Access (₹299/mo starter, pay-per-call) | Developers, EdTech, document automation | 5% |

### Target Audience

| Segment | Primary Need | Geography |
|---|---|---|
| Students applying to government exams (SSC, UPSC, NEET, JEE, GATE, IBPS, RRB, State PSCs) | Photo + signature + ID compression to exam-mandated sizes | Pan-India, all tiers |
| College admission applicants (CUET, university portals) | Document compression for online applications | Pan-India |
| Visa applicants (US, UK, Schengen, Canada, Australia) | Photo size for embassy uploads | Pan-India + diaspora |
| Job seekers (Naukri, LinkedIn upload, govt job portals) | Resume/photo compression | Pan-India |
| Property registration users | Sale deed, agreement, ID compression for state portals | Urban India |
| Small office staff | Day-to-day file shrinking | Pan-India |
| EdTech/Coaching platforms (API consumers) | Auto-compress student-uploaded documents | India |

**Why this audience converts well:**
- They're under deadline pressure (form submission cutoffs)
- They're already on Google searching the exact problem
- Many are first-time users of online forms (parents helping kids, etc.) → high tolerance for ads, low expectation of native experiences
- Repeat use within a single application cycle (often process 5–8 files in one sitting)

---

### 1.1 General Technical Requirements

**Platforms:**
- Responsive Web Application (desktop, tablet, mobile browsers)
- Progressive Web App (PWA) installability for repeat users
- No native mobile app in Phase 1 (Phase 2 if PWA installs prove demand)

**Tech Stack:**

| Layer | Technology | Justification |
|---|---|---|
| Frontend Framework | Next.js 14+ (App Router) | SSR for SEO + static tool pages |
| Language | TypeScript | Type safety on file/size logic |
| Styling | Tailwind CSS + shadcn/ui | Fast UI shipping |
| PDF Compression | Ghostscript-WASM (compiled `.wasm`) | Industry-standard PDF compression in browser |
| Image Compression | Canvas API + browser-image-compression library + WebP/AVIF encoders | Multi-format, high-quality |
| Image Resize | Pica.js | Best-quality client-side image resampling |
| File Reading | FileReader API + pdf.js | Read PDFs locally |
| Backend (minimal) | Next.js API Routes + Supabase | Only for Pro auth, subscriptions, API logs |
| Database | Supabase (Postgres) | Pro user data only, no file content |
| Authentication | Supabase Auth + Google OAuth | Social login only |
| Payments | Razorpay | UPI / cards / netbanking for Indian users |
| Hosting | Vercel (frontend) + Supabase Cloud (backend) | Edge-deployed across India |
| Analytics | Plausible + Google Search Console + GA4 | SEO + product analytics |
| Ads | Google AdSense | Primary ad network |
| Error Tracking | Sentry (free tier) | JS errors only, no PII |
| Email | Resend | Pro user transactional emails |
| Anti-abuse | Cloudflare Turnstile | Captcha on heavy endpoints |
| API Server | Next.js API Routes + Vercel Edge | Stateless, rate-limited |
| Programmatic SEO | Airtable/Supabase as data source + Next.js dynamic routes | 500+ landing pages from one template |

**Server Recommendations:**
- Vercel Pro plan (handles spikes during exam application seasons)
- Supabase Small tier (sufficient until 5K+ Pro users)
- All compute happens in the user's browser → minimal backend infrastructure cost
- API endpoints (Pro feature) use serverless functions with 50MB payload limits

**Geography:**
- Primary: India
- Secondary: Diaspora (US, UAE, UK searching for Indian visa/exam content)
- Language: English + Hindi at launch; Tamil, Telugu, Marathi, Bengali, Gujarati in Phase 2
- CDN: Vercel Edge Network (low-latency India delivery)

**Timezone & Language:**
- Default timezone: Asia/Kolkata (IST)
- Default display language: English; Hindi toggle on every page
- Date format: DD-MM-YYYY (Indian standard)

**Offline Capabilities:**
- PWA with service worker enables PDF and image compression to work fully offline after first visit
- Pro Dashboard requires internet connectivity

**Accessibility & Compliance:**
- WCAG 2.1 Level AA compliance
- DPDP Act 2023 compliance (no file content ever stored)
- GDPR compliance (relevant for visa-applicant traffic from EU/UK)
- Cookie consent banner (only required for analytics/ads)

---

### 1.2 Targeted System Users

| User Role | Platform | Description |
|---|---|---|
| **Guest User** | Web (all devices) | Any visitor. Free use of all tools with rate limits (20 ops/hour per IP). Sees ads. |
| **Registered Pro User** | Web (all devices) | Paid subscriber (₹49/month or ₹399/year). Ad-free, batch processing up to 100 files, API access, history, presets. |
| **API Consumer** | Server-to-server | Developers/EdTech using REST API. Authenticated via API key. Pay-per-call billing. |
| **Admin** | Admin Panel (web) | Internal team. Manages content, SEO landing pages, abuse monitoring, blog publishing. |
| **Super Admin** | Admin Panel (web) | Owner. All admin capabilities + role management, financial reports, API key issuance. |

---

### 1.3 Third Party Integrations

| Service | Provider | Purpose |
|---|---|---|
| Authentication (OAuth) | Google Identity | Pro user social sign-in |
| Payments | Razorpay | Subscriptions, UPI/card/netbanking |
| Email (Transactional) | Resend | Receipts, password resets, welcome emails |
| Analytics (Privacy-first) | Plausible | Visitor analytics |
| Analytics (SEO) | Google Search Console + GA4 | SEO + event tracking |
| Advertising | Google AdSense | Display ads on tool and blog pages |
| Affiliate | Impact + direct (Unacademy, Byju's, Cuemath, ApplyBoard) | Trackable affiliate links |
| Error Tracking | Sentry | Client-side JS errors |
| CDN | Vercel Edge Network | India-wide delivery |
| Captcha | Cloudflare Turnstile | Anti-abuse on free tools |
| Compression Engines | Ghostscript-WASM, Pica.js, browser-image-compression | All client-side, no server upload |
| Programmatic SEO Data | Airtable (or Supabase) | 500+ landing page configs |
| Sitemap Pings | Google Search Console API + IndexNow | Auto-notify new landing pages |

**Privacy Note:**
No file uploaded by the user is ever transmitted to any third-party service. The only file-related data ever logged is anonymous counters (e.g., "user X compressed Y files this month") for billing/abuse purposes — never the file content, file name, or its contents.

---

## 2.0 Functional Requirements

Structure: **Platform → User Role → Modules → Features**

---

## 2.1 Guest User — Web Platform

### Modules:
1. PDF Compression Tool
2. Image Compression Tool
3. Photo & Signature Resizer (Exam/Visa-specific)
4. Document Conversion Utilities
5. Content, SEO & Programmatic Landing Pages

---

### Module 2.1.1: PDF Compression Tool

#### Feature 2.1.1.1 — Upload PDF & Set Target Size

**User Story:**
As a guest user, I want to upload a PDF and tell the tool exactly how many KB it must fit under, so that it gets accepted by the form portal I'm submitting to.

**Description:**
The user lands on the PDF compressor page, drops or selects a PDF, enters a target size in KB (or picks from common presets), and proceeds to compress. The file is read entirely in the browser — never transmitted to any server.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| File Input | File (accept: application/pdf) | Max 50 MB input |
| Target Size (KB) | Number | Range: 20–10,000 KB |
| Preset Buttons | Buttons | Common targets: 100KB, 200KB, 500KB, 1MB, 2MB |
| Quality Mode | Radio (Auto / Preserve Text / Preserve Photos) | Default: Auto |
| Color Mode | Radio (Color / Grayscale / Black & White) | Default: Color |
| Original File Size | Read-only display | Auto-detected on upload |

**Workflow:**
1. User navigates to `/compress-pdf` from homepage, menu, or programmatic landing page (e.g., `/compress-pdf-under-100kb`).
2. Page loads with prominent "Drop PDF here or click to browse" zone.
3. User drops/selects PDF.
4. System validates file type and size client-side.
   - Invalid type → error: "Please upload a PDF file."
   - Size > 50MB → error: "File too large. Max allowed is 50MB."
   - Password-protected → error: "PDF is password-protected. Unlock first."
5. System displays original file size (e.g., "Original: 2.4 MB").
6. Below preview, target-size input box appears with preset buttons.
7. If user arrived from a programmatic landing page (e.g., "compress-pdf-under-100kb"), the target field is pre-filled with that value.
8. User selects/enters target, picks quality + color mode.
9. "Compress to [X] KB" button enables.
10. On click, compression starts (see Feature 2.1.1.2).

**Business Rules:**
- All processing is client-side. No file content leaves the user's device.
- The target size accepts values from 20 KB to 10,000 KB (10 MB).
- Programmatic landing pages pre-set the target for users who arrived via SEO.
- If target ≥ original size, compression is skipped and user gets a "No compression needed" message with the original file ready for download.
- File size limit (50 MB) is enforced to protect browser memory on mid-range devices.

**Validations:**
- File MIME type must be `application/pdf`.
- File size ≤ 50 MB.
- PDF must not be password-protected.
- Target size must be a positive integer between 20 and 10,000.

**Edge Cases:**
- PDF is password-protected → clear error + link to "Remove PDF Password" tool (Phase 2).
- PDF is corrupted → "This file appears damaged. Try another."
- User enters target = 0 or negative → input clamps to minimum (20 KB).
- User enters target greater than file size → show "Your file is already smaller than this. No compression needed."
- PDF has only scanned images (no text) → quality mode "Preserve Text" is disabled with explanation.
- Browser is older (no WASM support) → "Please upgrade to Chrome/Firefox/Safari to use this tool."

**Success Scenario:**
User sees their PDF previewed, target set, and the compress button enabled.

**Failure Scenario:**
- File rejected for size/type/password → clear inline error; upload area resets.
- WASM not supported → page shows browser compatibility notice with download links.

**Scope Limitations:**
- No support for password-protected PDFs (require user to unlock first).
- No PDF merging/splitting in this tool (separate tool in Module 2.1.4).
- No OCR layer creation.
- No text-content preservation guarantees on heavily-image-based PDFs.

---

#### Feature 2.1.1.2 — Iterative Compression to Hit Target

**User Story:**
As a guest user, I want the tool to automatically figure out the right compression settings to hit my exact target size, so that I don't have to keep trying different quality sliders.

**Description:**
Core compression engine. Uses Ghostscript-WASM to apply progressively stronger compression (downsampling DPI, image quality reduction, font subsetting, color conversion) in a binary-search loop until the output is at or just under the target KB.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Compression Progress | Percent (0–100) | Live progress bar |
| Iterations Run | Counter | Internal — displayed in advanced view |
| Output File Size | KB | Updated after each iteration |
| Estimated Time Remaining | Seconds | Based on iteration speed |

**Workflow:**
1. User clicks "Compress to [X] KB."
2. System loads Ghostscript-WASM (~12 MB; cached after first visit).
3. Progress bar appears: "Loading compression engine..." → "Compressing... 30%."
4. Internal binary search:
   - Iteration 1: Try moderate compression (e.g., 150 DPI, 80% quality).
   - Measure output size.
   - If size > target → increase compression aggressiveness.
   - If size ≪ target → reduce compression to preserve quality.
   - Repeat up to 5 iterations.
5. If target is unachievable (e.g., 20KB target on a 50-page PDF), system stops at maximum compression and reports best achievable size.
6. Once successful (size ≤ target), output is stored in a browser blob.
7. Preview thumbnail of compressed PDF rendered.
8. Final size displayed: "Compressed to: 98 KB (was: 2.4 MB)."

**Business Rules:**
- Maximum 5 iterations to prevent indefinite loops.
- If after 5 iterations the file is still over target, return best result with clear message: "Couldn't fit in [X] KB without making text unreadable. Best we got: [Y] KB."
- Compression must preserve at least minimum legibility (font size ≥ 6pt readable, image DPI ≥ 72).
- "Preserve Text" mode never goes below 100 DPI for image elements.
- "Preserve Photos" mode never goes below 60% JPEG quality.

**Validations:**
- Output file must be a valid PDF (system performs a basic structural check).
- Output size must be ≤ target OR maximum compression reached.
- Iterations counter must be ≤ 5.

**Edge Cases:**
- Target too aggressive (e.g., 20KB for a 100-page text PDF) → return best achievable with explanatory message.
- PDF contains form fields → preserve form fields (don't flatten).
- PDF contains digital signatures → warn user that compression will invalidate signatures.
- PDF contains embedded video/audio (rare) → strip those elements with user consent.
- Browser memory exhausted mid-compression → graceful failure: "Your device ran out of memory. Try a smaller file or use Pro for cloud compression."
- User closes tab mid-compression → no recovery; work lost.

**Success Scenario:**
PDF is compressed to or below target size; user sees confirmation and can proceed to download.

**Failure Scenario:**
- Cannot hit target → return best result with message.
- Browser crashes / WASM error → user-friendly error, suggest reducing input size.

**Scope Limitations:**
- No server-side fallback in Phase 1 (Pro adds cloud-based compression in Phase 2).
- No control over individual page compression (single setting applied to all pages).
- No batch compression (Pro feature).

---

#### Feature 2.1.1.3 — Preview & Download Compressed PDF

**User Story:**
As a guest user, I want to preview the compressed PDF (to make sure text is still readable) and download it, so that I can submit it with confidence.

**Description:**
After compression, user sees a side-by-side or toggle preview (original vs compressed first page) and a prominent download button.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Preview Mode | Toggle (Compressed / Original) | Default: Compressed |
| Output Filename | String (editable) | Default: `[original-name]-compressed-[size]KB.pdf` |
| Final File Size | KB | Displayed prominently |
| Compression Ratio | Percent | "Reduced by 96%" |
| Quality Indicator | Badge (Good / Acceptable / Aggressive) | Based on compression level applied |

**Workflow:**
1. After compression, preview area shows the first page of the compressed PDF.
2. User can toggle to view original for comparison.
3. User can flip through pages of the compressed PDF (rendered via pdf.js).
4. Download button: "Download (98 KB)."
5. User clicks → browser triggers local download.
6. Confirmation toast: "Downloaded! Original and compressed file stay on your device."
7. CTAs displayed: "Compress another PDF," "Try image compression," "Need to make it even smaller? [Upgrade to Pro]."
8. After 60 seconds of inactivity, the blob is freed from memory.

**Business Rules:**
- Default filename must include the final size in KB for user clarity.
- No filename auto-suggestion may include identifiable PII from input filename.
- Preview must use the compressed PDF (not a thumbnail) so user can validate text readability.

**Validations:**
- Output file must be downloadable (blob URL valid).
- Filename free of illegal OS characters.

**Edge Cases:**
- iOS Safari restrictions on programmatic download → fallback to "Tap and hold to save" instruction.
- User on bandwidth-limited connection → preview rendering is deferred until requested.
- Compressed PDF fails to render in pdf.js (rare, malformed output) → skip preview; allow direct download with warning: "Preview unavailable, but file is ready to download."
- Browser blocks download (popup blocker) → show inline link as fallback.

**Success Scenario:**
User downloads the compressed PDF and submits it successfully to their target form.

**Failure Scenario:**
- Download blocked → clear inline link as fallback.
- Preview fails → still allow download.

**Scope Limitations:**
- No cloud save / "email me the file" option for guest users.
- No print-from-tool option in Phase 1.
- No annotation or signature additions.

---

#### Feature 2.1.1.4 — Quality Comparison Slider

**User Story:**
As a power user, I want to visually compare original vs compressed PDF side-by-side, so that I can decide if the quality is acceptable before downloading.

**Description:**
Optional advanced view: a draggable split-screen slider showing original on one side, compressed on the other, with synchronized scroll.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| View Mode | Enum (Single / Split / Toggle) | Default: Toggle |
| Slider Position | Percent (0–100) | Only in Split mode |
| Sync Scroll | Boolean | Default: True |

**Workflow:**
1. User clicks "Compare quality" link below the preview.
2. Split view loads with vertical divider draggable left-right.
3. Both panes scroll together if Sync Scroll is enabled.
4. User can zoom in (up to 400%) on details to check legibility.
5. "Looks good — download" button confirms.

**Business Rules:**
- Both renderings happen client-side via pdf.js.
- Comparison view available for first 5 pages only on guest tier (full PDF for Pro).

**Validations:** Not applicable.

**Edge Cases:**
- PDF has only one page → split view collapses to side-by-side single page.
- Mobile screen too narrow → falls back to Toggle mode automatically.

**Success Scenario:**
User confidently downloads after visual confirmation.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No pixel-level diff highlight in Phase 1.
- No automatic quality scoring (e.g., SSIM) in Phase 1.

---

#### Feature 2.1.1.5 — Privacy & Trust Display

**User Story:**
As a privacy-conscious user uploading a sensitive document (e.g., property deed, signed contract, medical report), I want clear proof that my file isn't being uploaded to a server, so that I trust the tool.

**Description:**
A persistent trust section on the tool page explaining the client-side processing model with a "Verify Yourself" widget showing zero network activity during compression.

**Field Details:** Not applicable (informational module).

**Workflow:**
1. Above the upload area: 3 trust badges — "100% Browser-Based," "No Server Upload," "Open Source Compression."
2. Expandable "Why this is safe" section explains client-side WASM processing.
3. "Verify Yourself" button opens a modal with DevTools instructions.
4. "See Our Code" links to public GitHub repo with the compression module.
5. Footer: links to Privacy Policy, DPDP Act compliance, Terms.

**Business Rules:**
- The "no server upload" claim must remain truthful and continuously verifiable.
- Compression module open-sourced and kept in sync with production.
- Trust section must load above the fold on mobile.

**Validations:** Not applicable.

**Edge Cases:**
- User's network has request inspectors → can verify zero outbound file requests.
- Mobile users unfamiliar with DevTools → simplified illustration provided.

**Success Scenario:**
First-time visitor's privacy concern is addressed; they proceed to upload.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No third-party security audit certification in Phase 1.

---

### Module 2.1.2: Image Compression Tool

#### Feature 2.1.2.1 — Upload Image & Set Target KB

**User Story:**
As a guest user, I want to compress my image (JPG / PNG / WEBP / HEIC) to an exact KB target, so that it fits the form's upload limit.

**Description:**
User uploads a single image and specifies a target size. The tool uses canvas-based compression (quality reduction + dimension scaling if needed) until output ≤ target.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| File Input | File (accept: image/jpeg, image/png, image/webp, image/heic, image/heif) | Max 25 MB |
| Target Size (KB) | Number | Range: 5–5,000 KB |
| Preset Buttons | Buttons | Common: 20KB, 50KB, 100KB, 200KB, 500KB |
| Output Format | Enum (Same as input / JPG / WEBP / PNG) | Default: Same as input |
| Preserve Dimensions | Boolean | If false, allow downscale to hit target |
| Original File Info | Read-only | Size, dimensions, format displayed |

**Workflow:**
1. User navigates to `/compress-image` or arrives via programmatic landing page (`/compress-image-under-50kb`).
2. Drops/selects image.
3. System auto-decodes (HEIC handled via libheif-wasm).
4. Original file info displayed.
5. Target size + preset buttons shown.
6. Output format defaults to input but can be overridden.
7. "Compress to [X] KB" button enables.
8. Compression runs (see 2.1.2.2).

**Business Rules:**
- HEIC files are converted to JPG by default (most upload portals require JPG).
- Output format defaults to input format unless target is impossible to hit in that format.
- Preserve Dimensions = true means only quality reduction; if target unreachable, prompt user to allow downscaling.
- Programmatic landing page pre-fills target value.

**Validations:**
- File MIME must be one of the listed image types.
- File size ≤ 25 MB.
- Target between 5 and 5,000 KB.

**Edge Cases:**
- Image is already smaller than target → "No compression needed."
- HEIC on a non-Safari browser without library support → use libheif-wasm fallback.
- Animated GIF → only first frame compressed (with warning).
- PNG with transparency → output to WebP if smaller; warn if user picked JPG (loses transparency).
- 16-bit PNG (medical/scientific) → downconvert to 8-bit with notice.

**Success Scenario:**
Image compressed to target size; preview displayed for download.

**Failure Scenario:**
- Cannot hit target without distortion → return best with message.
- HEIC decode fails on old browser → graceful fallback with instruction.

**Scope Limitations:**
- No batch image compression (Pro feature).
- No image editing (rotate/crop) in this tool — separate tool in Module 2.1.4.
- Animated images: only first frame.

---

#### Feature 2.1.2.2 — Smart Compression Engine

**User Story:**
As a user, I want the tool to intelligently balance quality reduction vs dimension reduction to hit my target, so that the output looks as good as possible.

**Description:**
Two-pass algorithm:
- **Pass 1:** Reduce JPEG/WebP quality from 95 → 50 in steps. Stop when target hit or quality floor reached.
- **Pass 2 (if Pass 1 fails AND user permits dimension reduction):** Scale image dimensions down (90% → 70% → 50%) at quality 70.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Compression Strategy Used | Enum | Quality-only / Quality + Resize / Format-conversion |
| Final Quality | Percent | 50–95 |
| Final Dimensions | Width x Height | Original or reduced |
| Compression Time | Milliseconds | Internal logging only |

**Workflow:**
1. User clicks "Compress to [X] KB."
2. Pass 1 runs: try quality 95, measure size; if too big, drop to 90, 85, 80... down to 50.
3. If still too big and Preserve Dimensions = false → Pass 2 starts.
4. If Preserve Dimensions = true and target unreachable → stop, prompt: "We can't hit [X] KB at this resolution. Allow resizing? [Yes / No]."
5. If user allows resize → scaling kicks in.
6. Final result returned.

**Business Rules:**
- Quality floor: 50 (below this, JPEG artifacts become visible to most users).
- Resize floor: 50% of original dimensions.
- WebP output is preferred when target is hard to hit in JPG (WebP averages 25–35% smaller at similar quality).
- For images with text/screenshots, system suggests PNG → WebP conversion (much smaller for screenshots).

**Validations:**
- Output file is a valid image of the chosen format.
- Output dimensions ≥ 50% of original (unless user explicitly approved more).

**Edge Cases:**
- Target requires < 50% scale → ask user; show before/after.
- Image is mostly flat color → quality drops barely affect size; system surfaces "this image is already heavily compressed."
- Image is photo of text → system warns text may become unreadable below quality 65 and stops there unless user overrides.

**Success Scenario:**
Image compressed close to (but ≤) target with maximum preserved quality.

**Failure Scenario:**
- Target unreachable → return best with clear explanation.

**Scope Limitations:**
- No AI-based super-resolution or "smart" cropping in Phase 1.
- No content-aware compression.

---

#### Feature 2.1.2.3 — Side-by-Side Comparison & Download

**User Story:**
As a user, I want to see the compressed image next to the original, so that I can confirm quality before downloading.

**Description:**
Same comparison UX as PDF (slider + zoom), tailored for images.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| View Mode | Enum (Single / Split / Toggle) | Default: Toggle |
| Zoom Level | Percent (50–400%) | Default: 100% |
| Output Filename | String | Default: `[name]-compressed-[size]KB.[ext]` |

**Workflow:**
1. After compression, preview area shows compressed image.
2. "Compare" button opens split view with draggable divider.
3. User can zoom in to inspect details (faces, text in document scans).
4. Download button: "Download (48 KB)."
5. CTAs: "Compress another," "Resize to passport size," "Pro: batch & ad-free."

**Business Rules:**
- Filename includes final KB size for user clarity.
- After 60s inactivity, blob freed from memory.

**Validations:**
- Filename free of illegal characters.

**Edge Cases:** Same as PDF download (Feature 2.1.1.3).

**Success Scenario:** User downloads, submits to form, succeeds.

**Failure Scenario:** Same as PDF.

**Scope Limitations:**
- No social sharing of compressed image (privacy concern; user's photo could be sensitive).

---

#### Feature 2.1.2.4 — Format Conversion Helper

**User Story:**
As a user whose form requires JPG but my photo is a HEIC from iPhone, I want the tool to auto-convert during compression, so that I don't need a separate conversion step.

**Description:**
When the input format differs from the form's required format (typically JPG), system auto-converts.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Input Format | Detected | From MIME and magic bytes |
| Output Format | User-selected | JPG / PNG / WebP |
| Conversion Notice | Toast | Only shown when conversion happens |

**Workflow:**
1. User uploads HEIC.
2. System detects HEIC.
3. Output format auto-set to JPG with notice: "We'll save this as JPG, which is what most forms require. Want PNG/WebP? [Change]."
4. Compression proceeds with conversion.

**Business Rules:**
- Default conversion target: JPG (most universally accepted).
- WebP only suggested if target is < 30 KB and JPG can't hit it.

**Validations:** Not applicable.

**Edge Cases:**
- HEIC with multiple images in one file → use first image, warn user.

**Success Scenario:**
Conversion + compression in one step.

**Failure Scenario:**
- HEIC decode fails → "Couldn't read this HEIC file. Try saving it as JPG from your iPhone first."

**Scope Limitations:**
- No RAW format support (CR2, NEF, ARW) in Phase 1.

---

### Module 2.1.3: Photo & Signature Resizer (Exam/Visa-Specific)

This is the SECRET WEAPON module — purpose-built tools for the most-searched, most-painful use cases. Each tool is a programmatic landing page (one URL, one preset, one optimized SEO target).

#### Feature 2.1.3.1 — Exam-Specific Photo Resizer

**User Story:**
As an SSC/UPSC/NEET/JEE/IBPS aspirant, I want a tool that matches my exam's exact photo specifications (dimensions in mm/pixels + KB range), so that I don't get rejected for size mismatch.

**Description:**
A library of pre-configured resize templates for each major Indian exam. User picks their exam → the tool already knows the exact pixel dimensions, format, KB range, background color expectation. User uploads photo → output is form-ready.

**Field Details (per exam preset):**

| Field Name | Data Type | Remarks |
|---|---|---|
| Exam Name | String | E.g., "SSC CGL," "UPSC CSE," "IBPS PO" |
| Photo Dimensions | "WIDTH x HEIGHT px" | E.g., "200 x 230 px" |
| Photo Size Range | "MIN–MAX KB" | E.g., "20–50 KB" |
| Photo Format | Enum | JPG / PNG |
| Background Color Expected | Enum | White / Off-white / Light blue |
| Signature Dimensions | "WIDTH x HEIGHT px" | E.g., "140 x 60 px" |
| Signature Size Range | "MIN–MAX KB" | E.g., "10–20 KB" |
| Source URL | URL | Official notification link |

**Workflow:**
1. User searches "SSC CGL photo size" on Google.
2. Lands on `/ssc-cgl-photo-size`.
3. Page explains the spec clearly: dimensions, size, format, background.
4. Embedded tool: drop your photo → it auto-resizes + compresses to spec.
5. Auto-detect: face position (using face-api.js client-side) to ensure face is centered and sized appropriately.
6. Background color check: if expected white but uploaded photo has busy background → show warning: "Your background isn't plain. May get rejected. Consider retaking."
7. Output: photo + signature ready to download.
8. CTAs: "Compress more for this exam," "Try another exam," affiliate links to coaching apps.

**Business Rules:**
- Each exam preset must be sourced from the official notification PDF and dated.
- Quarterly review by admin to catch spec changes (notifications change, especially for state PSCs).
- Affiliate disclosures shown next to coaching links.
- Source URL displayed below the tool: "Specs from: [exam-board-official-link.pdf]" (clickable).

**Validations:**
- Uploaded photo must be at least the target dimensions (otherwise upscaling would degrade quality unacceptably).
- Output must satisfy both dimension AND size constraints.

**Edge Cases:**
- Uploaded photo is too small (e.g., 100x100 for a 200x230 target) → reject with clear instruction: "Your photo is too small. Please upload at least 200x230 px."
- Photo is extremely high resolution (8000x6000) → handle gracefully (initial downscale before fine-tuning).
- Wrong aspect ratio → smart crop with face-detection guidance, OR offer manual crop.
- User uploads a photo with multiple faces → warning: "Multiple faces detected. Please upload a single-person photo."

**Success Scenario:**
User downloads correctly-sized, correctly-compressed photo + signature ready to upload.

**Failure Scenario:**
- Dimensions can't be met without unacceptable distortion → guide user to retake.
- Face detection fails → fallback to manual crop with reference grid.

**Scope Limitations:**
- Phase 1 covers top 25 exams: SSC CGL, SSC CHSL, SSC MTS, UPSC CSE, IBPS PO, IBPS Clerk, IBPS RRB, SBI PO, RBI Grade B, NEET UG, NEET PG, JEE Main, JEE Advanced, GATE, CAT, GMAT, CUET, CTET, RRB NTPC, RRB Group D, AFCAT, NDA, CDS, CLAT, NTA UGC NET.
- Phase 2: state PSC exams (MPSC, UPPSC, BPSC, etc. — ~30 more).
- No automatic background replacement in Phase 1 (Phase 2: AI-based background-to-white).
- No live photo capture (camera UI) in Phase 1.

---

#### Feature 2.1.3.2 — Visa Photo Resizer

**User Story:**
As a visa applicant, I want a tool preconfigured to my destination country's visa photo specs (dimensions, size, head proportion), so that the embassy doesn't reject my submission.

**Description:**
Same model as exam photos, but for visa types: US (B1/B2, F1, etc.), UK, Schengen, Canada, Australia, Japan, Singapore, UAE.

**Field Details (per visa preset):**

| Field Name | Data Type | Remarks |
|---|---|---|
| Visa Type | String | E.g., "US B1/B2 Visa," "UK Standard Visitor" |
| Photo Dimensions | "WIDTH x HEIGHT mm" + "px @ 600 DPI" | Both metric and pixel |
| Size Range (KB) | "MIN–MAX KB" | E.g., "240KB max" for US |
| Head Height Proportion | Percent of total photo | E.g., 50–69% for US |
| Background Required | Enum | White / Off-white / Plain light |
| Format | Enum | JPG / PNG |
| Source URL | URL | Embassy/consulate official spec |

**Workflow:**
1. User searches "US visa photo size."
2. Lands on `/us-visa-photo-size`.
3. Tool walks through: dimensions, head ratio, background.
4. Upload photo → face detection → checks head-to-photo ratio.
5. If head is too small/large in frame → show overlay grid + crop guides.
6. Background check.
7. Output: form-ready file.

**Business Rules:**
- Specs sourced from official consulate/embassy websites and dated.
- Quarterly admin review.
- Disclaimer prominent: "We help you meet specs but cannot guarantee acceptance — final decision rests with consulate."

**Validations:**
- Same as exam photo + head-ratio check.

**Edge Cases:**
- Head ratio is off → show grid overlay + retry instructions.
- Mouth open / glasses / headwear → flag with message (US visa rejects all of these).
- Lighting is too dim → suggest retake.

**Success Scenario:**
User downloads compliant photo and submits to embassy successfully.

**Failure Scenario:**
- Photo cannot meet specs → clear retake instructions.

**Scope Limitations:**
- Phase 1: 8 visa types (US, UK, Schengen, Canada, Australia, Japan, Singapore, UAE).
- Phase 2: 20+ more.
- No on-device camera capture (user must upload existing photo).
- No background replacement (Phase 2).
- No biometric quality check beyond basic face detection.

---

#### Feature 2.1.3.3 — Signature Compressor (Specialized)

**User Story:**
As a form applicant, I want to upload my signature image and get it under the often-aggressive size limit (typically 10KB or 20KB), so that my form submits successfully.

**Description:**
Signatures are often required at very small KB (10–20KB). Most generic compressors fail because they treat signatures as photos. This tool uses signature-optimized strategies: convert to grayscale, increase JPEG compression aggressively (signatures are line art, tolerate it well), reduce dimensions only if necessary.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Target Size (KB) | Number | Default 10 KB; presets 5/10/20/50 |
| Output Background | Enum (White / Transparent) | Default: White |
| Output Format | Enum (JPG / PNG) | Default: JPG (smaller for line art with white background) |
| Cleanup Mode | Boolean (Auto-clean background noise) | Default: True |

**Workflow:**
1. User uploads signature image (often photographed against paper).
2. System auto-detects edges and crops to signature.
3. Cleanup mode (if enabled): threshold-based background whitening (paper noise → pure white).
4. Compression to target.
5. Preview → download.

**Business Rules:**
- Signatures must remain legible — if compression below 5KB makes ink blur, system stops at best legibility.
- "Auto-clean background" applies a binary threshold (configurable).
- Default output is JPG with white background (most form-acceptable).

**Validations:**
- Uploaded image must contain identifiable dark strokes on lighter background.
- Output ≤ target.

**Edge Cases:**
- Signature on dark paper → cleanup may invert; user override available.
- Photo includes background hand or pen → user prompted to crop.
- Signature is digital (already clean) → cleanup mode skipped.

**Success Scenario:**
User downloads signature within target KB, clean background.

**Failure Scenario:**
- Cannot detect signature in image → manual crop fallback.

**Scope Limitations:**
- No signature creation tool in Phase 1 (Phase 2: type-to-signature with handwriting fonts).
- No multi-signature batch processing in guest mode.

---

#### Feature 2.1.3.4 — Combined Photo + Signature Pack

**User Story:**
As a user filling an exam application, I want to process my photo AND signature together in one flow, so that I leave with everything I need in one ZIP.

**Description:**
Combined workflow: user uploads both photo and signature, picks the exam preset, and gets back a ZIP with `photo.jpg` and `signature.jpg` correctly named and sized per the exam spec.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Photo File | Image | Required |
| Signature File | Image | Required |
| Exam Preset | Selected from 2.1.3.1 list | Drives all dimensions and sizes |
| Output ZIP | File | Contains both files named per exam convention |

**Workflow:**
1. User clicks "Need both photo and signature?" CTA on any exam landing page.
2. Two upload zones appear side by side.
3. Upload both files.
4. Run combined process.
5. Output ZIP downloaded with exam-conventional filenames (e.g., `applicant_photo.jpg`, `applicant_signature.jpg`).

**Business Rules:**
- ZIP filename: `[exam-name]-photo-signature.zip`.
- Inner filenames follow exam form conventions.

**Validations:**
- Both uploads required.
- Each file processed independently per its spec.

**Edge Cases:**
- One upload missing → block with clear error.
- One file fails (e.g., photo too small) → process the other, ZIP contains only successful one with warning.

**Success Scenario:**
ZIP downloaded; user uploads both files in their exam form one-by-one.

**Failure Scenario:**
- Both fail → no ZIP; clear retry instructions per file.

**Scope Limitations:**
- No direct upload integration with exam portals (SSC/UPSC don't offer such APIs).
- No PDF combine of photo + signature in Phase 1.

---

### Module 2.1.4: Document Conversion Utilities

#### Feature 2.1.4.1 — Image to PDF Converter

**User Story:**
As a user, I want to convert one or more images to a single PDF (with size targeting), so that I can submit a multi-page document in PDF format as required.

**Description:**
Combine multiple images (JPG/PNG/WebP) into a single PDF. Optionally hit a target KB after combining.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Image Inputs | File[] | Max 20 images (free), 100 (Pro) |
| Page Size | Enum (A4 / Letter / Legal / Original) | Default: A4 |
| Orientation | Enum (Portrait / Landscape / Auto) | Default: Auto |
| Margin | Enum (None / Small / Medium) | Default: Small |
| Target Size (KB) | Number (Optional) | If set, post-combine compression hits target |
| Output Filename | String | Default: `combined-[timestamp].pdf` |

**Workflow:**
1. User drops/selects images.
2. Each image becomes a draggable thumbnail (reorder via drag-drop).
3. User configures page size, orientation, margins.
4. Optionally enters target KB.
5. Clicks "Create PDF."
6. System builds PDF, optionally compresses to target.
7. User downloads.

**Business Rules:**
- Free: max 20 images per PDF.
- Each image becomes one PDF page.
- If target KB set, system compresses post-build to hit target.

**Validations:**
- Each image ≤ 10 MB.
- Total images ≤ 20 (free).
- Supported formats: JPG, PNG, WEBP, HEIC.

**Edge Cases:**
- Tall image on portrait A4 → auto-fit with margins.
- Mix of orientations → handle each per-image.
- Memory pressure → suggest splitting into smaller PDFs.

**Success Scenario:** PDF built and downloaded.

**Failure Scenario:** Memory error → reduce batch and retry.

**Scope Limitations:**
- No OCR (text extraction).
- No annotation/signing.
- Phase 2: optional OCR layer.

---

#### Feature 2.1.4.2 — PDF to Image Converter

**User Story:**
As a user whose form requires individual JPG/PNG pages but I only have a PDF, I want to convert each PDF page into separate images, so that I can upload them individually.

**Description:**
Render each page of a PDF as a separate image file (JPG/PNG/WebP), with optional size targeting per output image.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| PDF Input | File | Max 50 MB |
| Output Format | Enum (JPG / PNG / WebP) | Default: JPG |
| Output DPI | Enum (72 / 150 / 300) | Default: 150 |
| Target Size per Image (KB) | Number (Optional) | Compress each output |
| Page Range | Enum (All / Custom) | E.g., "1-3, 5, 7-9" |

**Workflow:**
1. User uploads PDF.
2. Selects format, DPI, optional size target, page range.
3. Each page rendered to image via pdf.js.
4. Each output compressed to target (if set).
5. Output: ZIP of images OR direct downloads if single page.

**Business Rules:**
- Default output: ZIP if > 1 page; single file otherwise.
- Per-image size target uses the image compressor logic.

**Validations:**
- PDF not password-protected.
- Page range valid.

**Edge Cases:**
- Very large PDF → process in chunks; show progress.
- Encrypted PDF → block with instruction.

**Success Scenario:** ZIP of correctly-sized images.

**Failure Scenario:** Memory error → split workflow.

**Scope Limitations:**
- No vector preservation (output is raster).

---

#### Feature 2.1.4.3 — Crop & Rotate (Pre-compression)

**User Story:**
As a user whose photo has wrong orientation or extra background, I want to crop and rotate before compression, so that the output is form-ready.

**Description:**
Lightweight pre-compression editor: rotate (90°/180°/270°), crop with aspect ratio presets (square, passport, A4), straighten skewed scans.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Rotation | Enum (0 / 90 / 180 / 270) | Default: 0 |
| Crop Aspect Ratio | Enum (Free / Square / Passport / A4 / Custom) | Default: Free |
| Crop Box | Coordinates | x, y, width, height |
| Auto-deskew | Boolean | Auto-detect and correct slight rotation |

**Workflow:**
1. After upload, user clicks "Crop / Rotate" before compression.
2. Editor opens.
3. User rotates / crops / deskews.
4. Confirms → returns to compression flow with edited image.

**Business Rules:**
- Editor is non-destructive until user confirms.
- Auto-deskew runs only on user request (not by default).

**Validations:**
- Crop box must be within image bounds.

**Edge Cases:**
- Mobile users → touch-friendly handles, full-screen modal.

**Success Scenario:** Edited image flows back into compression.

**Failure Scenario:** Cancel exits editor without changes.

**Scope Limitations:**
- No advanced editing (filters, color correction, healing) in Phase 1.

---

### Module 2.1.5: Content, SEO & Programmatic Landing Pages

This module is the GROWTH ENGINE. Programmatic SEO with 500+ targeted landing pages, each one a fast-loading tool page pre-configured for a specific keyword.

#### Feature 2.1.5.1 — Programmatic Landing Pages (Size-based)

**User Story:**
As someone Googling "compress PDF under 100 KB," I want to land on a page that solves exactly that problem with the target already set, so that I don't have to configure anything.

**Description:**
Auto-generated landing pages from a structured database. Each page is a full-tool experience pre-configured for one specific keyword.

**Field Details (per landing page):**

| Field Name | Data Type | Remarks |
|---|---|---|
| URL Slug | String | e.g., `compress-pdf-under-100kb` |
| Tool Type | Enum | PDF / Image / Photo / Signature |
| Target Size (KB) | Number | Pre-filled in the tool |
| Page Title | String (60 chars) | SEO-optimized |
| Meta Description | String (155 chars) | SEO-optimized |
| H1 | String | Short, exact-match keyword |
| Hero Description | String | 80–150 words, keyword-optimized |
| FAQ (4–6 questions) | Array | Schema.org FAQPage markup |
| Related Pages | Array of slugs | "compress-pdf-under-200kb" etc. |

**Page Categories generated programmatically:**

| Category | Examples | Approximate Page Count |
|---|---|---|
| PDF size targets | `compress-pdf-under-{20,50,100,150,200,300,500,750,1000,2000,5000}-kb` | 11 pages |
| Image size targets | `compress-image-under-{5,10,20,30,50,100,200,500,1000}-kb` | 9 pages |
| Photo for Indian exams | `{exam-name}-photo-size` (top 25 exams) | 25 pages |
| Signature for exams | `{exam-name}-signature-size` | 25 pages |
| Combined photo+sig for exams | `{exam-name}-photo-signature-size` | 25 pages |
| Visa photo by country | `{country}-visa-photo-size` (12 countries) | 12 pages |
| Format-conversion pages | `convert-{heic-to-jpg, png-to-jpg, jpg-to-pdf, ...}` | 15 pages |
| Document-type-specific | `compress-aadhaar-photo`, `compress-pan-photo`, `compress-passport-photo` | 8 pages |
| Use-case pages | `compress-photo-for-naukri`, `compress-photo-for-linkedin` | 10 pages |
| **Total** | | **140 pages at MVP** |

**Workflow:**
1. Admin adds a row to the landing-page Airtable/Supabase table.
2. Next.js dynamic route `/[slug]` reads the row at build/request time.
3. Page renders with SEO meta, H1, hero copy, the embedded tool, FAQ, and internal links.
4. On publish, page is added to sitemap.xml.
5. Sitemap changes ping Google Search Console and IndexNow.

**Business Rules:**
- All pages share one template; data drives differences.
- Hero copy is unique per page (manually written or LLM-generated then human-reviewed).
- All pages must have at least 4 FAQ entries with schema markup.
- Each page must internally link to at least 3 related pages.
- AdSense placements are template-driven (above-the-fold and below FAQ).
- Page must score ≥ 90 on Lighthouse Performance for mobile.

**Validations:**
- Slug unique.
- All required fields filled before publish.
- Meta title ≤ 60 chars, meta description ≤ 155 chars.

**Edge Cases:**
- Slug typo or page deleted → 410 Gone + sitemap updated.
- LLM-generated copy fails review → page stays in draft.

**Success Scenario:**
Page ranks on Google's first page for its target keyword within 30–90 days.

**Failure Scenario:**
- Page fails to rank → admin reviews competitors, refreshes content.

**Scope Limitations:**
- Phase 1: 140 pages.
- Phase 2: 300+ additional (state-PSC exams, regional language variants, B2B use cases).
- No fully-AI-generated landing pages (all pass human review before publish).

---

#### Feature 2.1.5.2 — Blog / Educational Articles

**User Story:**
As a user searching "how to compress PDF without losing quality" or "what photo size for SSC application," I want a clear, helpful article that answers my question and points me to the right tool.

**Description:**
SEO-optimized blog with evergreen articles in 4 content categories: How-To, Exam Spec Guides, Visa Spec Guides, Comparison.

**Field Details:** Same as standard CMS — title, slug, author, publish date, category, content (Markdown), featured image, meta title/description, related tools.

**Workflow:**
1. Admin creates article via CMS.
2. Article publishes at `/blog/{slug}`.
3. Sitemap regenerated; pinged to GSC.
4. Article displays content + related tool CTAs + AdSense + share buttons.
5. End of article: tool embed (e.g., article on "compress photo for SSC" embeds the SSC photo resizer at the bottom).

**Business Rules:**
- All articles must link to at least one tool page.
- All images alt-text mandatory.
- AdSense placement respects Better Ads Standards.
- Articles updated quarterly to reflect spec changes (especially exam articles).

**Validations:** Same as standard CMS field validations.

**Edge Cases:** Same as standard CMS.

**Success Scenario:** Article ranks; drives tool usage.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No comments / community in Phase 1.
- No newsletter subscription (Phase 2).

---

#### Feature 2.1.5.3 — FAQ Hub

**User Story:**
As a visitor with a specific question (legal, technical, accuracy), I want a structured FAQ page, so that I can self-serve.

**Description:**
Single-page FAQ with category accordions and FAQPage schema.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Question | String (max 120) | |
| Answer | Rich text (max 500 words) | |
| Category | Enum | Privacy, How-To, Exam Specs, Visa Specs, Pro/Pricing |
| Order | Integer | Display order within category |

**Workflow:**
1. User navigates to `/faq` or arrives from a search snippet.
2. Categories shown as tabs.
3. Each Q&A in accordion.
4. Permalink per question.

**Business Rules:**
- Minimum 30 questions at launch.
- Source citations for any factual claim (exam specs, visa rules).

**Validations:** Standard text validations.

**Edge Cases:** Not applicable.

**Success Scenario:** FAQ ranks as Google rich result.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No FAQ search bar in Phase 1 (Phase 2).

---

#### Feature 2.1.5.4 — Homepage

**User Story:**
As a first-time visitor, I want to immediately see what tools are available and pick the right one, so that I can start within 5 seconds.

**Description:**
Clean landing page with the 4 primary tool cards (PDF, Image, Photo, Signature), exam shortcuts, and trust indicators.

**Field Details:** Static + dynamic counters.

**Workflow:**
1. User lands on `/`.
2. Hero: "Get your document form-ready. Exact KB, exact dimensions, in one click."
3. 4 large tool cards.
4. "Quick links" to top 10 exam-specific pages and top 5 visa pages.
5. Live counter: "X documents made form-ready today" (anonymous beacon).
6. "Why FormReady" 3-icon trust strip.
7. FAQ (5 key questions).
8. Footer with full sitemap.

**Business Rules:**
- Counter incremented anonymously; no content stored.
- Hindi toggle persistent across pages.

**Validations:** Not applicable.

**Edge Cases:** Not applicable.

**Success Scenario:** Visitor enters a tool within 10 seconds.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No personalization (same for all visitors).

---

#### Feature 2.1.5.5 — Privacy, Terms & Compliance Pages

**User Story:**
As a user uploading personal docs, I want to verify the site's privacy practices and DPDP compliance.

**Description:**
Lawyer-reviewed Privacy Policy, Terms of Service, DPDP Compliance, GDPR Notice, Cookie Policy.

**Field Details:** Static legal content with last-updated dates.

**Workflow:**
1. Footer links lead to each page.
2. "Last updated" date prominent.

**Business Rules:**
- All pages reviewed by Indian privacy lawyer pre-launch.
- Material changes trigger banner asking Pro users to re-accept.

**Validations:** Not applicable.

**Edge Cases:** Not applicable.

**Success Scenario:** User satisfied with compliance documentation.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No automated compliance scanning.

---

## 2.2 Registered Pro User — Web Platform

### Modules:
1. Account Management
2. Batch Processing & Cloud Storage (optional, opt-in only)
3. API Access
4. Billing & Subscription

---

### Module 2.2.1: Account Management

#### Feature 2.2.1.1 — Sign Up with Google

**User Story:**
As a Pro-tier customer, I want one-click signup using Google, so that I don't manage another password.

**Description:**
OAuth signup using Google Identity. Creates a Pro user record in Supabase.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Email (from Google) | String | Unique, verified |
| Display Name | String | From Google profile |
| Profile Photo URL | String | From Google |
| Created At | Timestamp | |
| Subscription Status | Enum | Trial / Active / Cancelled / Past Due |
| Trial Expires At | Timestamp | +7 days from signup |

**Workflow:**
1. User clicks "Try Pro Free" CTA.
2. Google OAuth flow.
3. Supabase creates user record.
4. Onboarding screen: brief tour + "Start 7-day free trial."
5. Trial active immediately, no card required.
6. Welcome email sent.

**Business Rules:**
- 7-day free trial, no credit card.
- After trial, user must add payment method.
- Trial-end without payment → automatic downgrade.

**Validations:**
- Email verified by Google.
- One account per email.

**Edge Cases:**
- Google returns no email → block with error.
- User revokes Google access later → re-auth required on next session.

**Success Scenario:** User logged in with active Pro trial.

**Failure Scenario:** OAuth fails → retry option.

**Scope Limitations:**
- No email/password signup in Phase 1.
- No multi-tenant team accounts in Phase 1.

---

#### Feature 2.2.1.2 — Login & Session Management

**User Story:**
As a returning Pro user, I want quick login and persistent sessions, so that I can access my tools immediately.

**Description:**
Supabase Auth with JWT cookies. 30-day persistent sessions.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Session Token | JWT | HttpOnly Secure cookie |
| Expires At | Timestamp | +30 days from last activity |

**Workflow:**
1. User clicks "Log In."
2. Google OAuth.
3. Session cookie set.
4. Redirected to dashboard or last-visited tool page.
5. Auto-refresh on activity.
6. Logout from any page.

**Business Rules:**
- 30-day inactivity timeout.
- Logout invalidates server session.

**Validations:** Not applicable.

**Edge Cases:**
- Session expired during work → modal prompt re-login without losing unsaved input.
- Multi-device login allowed.

**Success Scenario:** User accesses Pro features.

**Failure Scenario:**
- Cookie blocked → fallback to visible login banner.

**Scope Limitations:**
- No "Remember Me" toggle.
- No 2FA in Phase 1.

---

#### Feature 2.2.1.3 — Profile, Preferences & Account Deletion

**User Story:**
As a Pro user, I want to update my profile, preferences, and delete my account per DPDP Act, so that I control my data.

**Description:**
Profile page: name, email, notification prefs, "Delete My Account" with 30-day grace period.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Display Name | String | Editable |
| Default Tool Preset | Enum (PDF / Image / Photo / Signature) | First tool shown on dashboard |
| Notification Preferences | Boolean flags | Receipt emails, product updates, exam-spec alerts |
| Language Preference | Enum (English / Hindi) | |
| Account Deletion Request | Boolean | Triggers 30-day grace |

**Workflow:**
1. Navigate to `/account/profile`.
2. Edit fields → save with toast.
3. "Delete My Account" → modal: "Permanent deletion in 30 days. Cancellable within window."
4. Confirm with typed "DELETE."
5. Account marked for deletion.
6. Cron deletes after 30 days.

**Business Rules:**
- DPDP-mandated right to erasure.
- Grace period cancellable.
- Post-deletion, only legally-required records retained (GST invoices, anonymized).

**Validations:**
- Typed confirmation required.

**Edge Cases:**
- Active subscription → cancel first; refund within 7-day money-back guarantee.
- Mid-API-call deletion → calls fail gracefully with clear error.

**Success Scenario:** Account deleted; confirmation email sent.

**Failure Scenario:** Refund failure → admin ticket auto-raised.

**Scope Limitations:**
- No data export in Phase 1 (Phase 2).

---

### Module 2.2.2: Batch Processing & Cloud Storage (Opt-in Only)

#### Feature 2.2.2.1 — Batch PDF / Image Compression

**User Story:**
As a Pro user (a coaching center, small office, or freelancer processing many client docs), I want to compress 50–100 files at once, so that I save hours.

**Description:**
Pro users can upload up to 100 files (or a ZIP) and process them in parallel. All processing remains client-side (browser worker pool); files never leave the device.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Batch Input | File[] or ZIP | Max 100 files / 500 MB total |
| Target Size (KB) | Number | Applied uniformly |
| Quality / Format Settings | Same as single | Applied to all |
| Batch Progress | Real-time counter + ETA | |
| Output | ZIP | Auto-named per source files |

**Workflow:**
1. Pro user navigates to `/pro/batch`.
2. Drops 100 files or a ZIP.
3. Configures target + settings.
4. Browser worker pool processes 4–6 in parallel (based on device).
5. Progress bar with file-by-file status.
6. Failed files flagged; user can retry or skip.
7. Download all as ZIP.

**Business Rules:**
- Fully client-side; no server upload.
- Max 100 files per batch.
- Failed files logged in a per-batch report.

**Validations:**
- Each file valid type and size.
- Total size ≤ 500 MB.

**Edge Cases:**
- Browser memory exhausted → pause batch, save partial ZIP.
- Some files unreadable → flagged in batch report; rest succeed.

**Success Scenario:** All files processed, downloadable as ZIP.

**Failure Scenario:**
- Device cannot handle parallel → falls back to sequential.

**Scope Limitations:**
- No email-delivery of results.
- No automatic upload to cloud storage in Phase 1 (Phase 2: opt-in Google Drive sync).

---

#### Feature 2.2.2.2 — Saved Presets

**User Story:**
As a frequent user, I want to save common configurations (e.g., "SSC photo + signature combo," "100KB PDF for property portal"), so that I don't reconfigure each time.

**Description:**
Pro users can save up to 50 presets with custom names. Presets appear as one-click buttons on tool pages.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Preset Name | String | E.g., "SSC CGL Photo Pack" |
| Tool Type | Enum | PDF / Image / Photo / Signature |
| Settings | JSON | Target size, format, DPI, etc. |
| Created At | Timestamp | |
| Last Used | Timestamp | |
| Usage Count | Integer | |

**Workflow:**
1. After successful operation, "Save as preset" button.
2. Name + save.
3. Preset appears in dropdown on tool pages.
4. One-click apply.

**Business Rules:**
- Max 50 presets per user.
- Preset name unique per user.

**Validations:** Standard.

**Edge Cases:** Preset deleted while in use → copy-on-use.

**Success Scenario:** Preset applies instantly.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No team-shared presets in Phase 1.

---

#### Feature 2.2.2.3 — Compression History (Counters Only)

**User Story:**
As a Pro user, I want to see my usage stats so I can plan my renewal and verify value.

**Description:**
Anonymous counters and timestamps — no file content, no filenames. Just "Tool X used Y times on date Z."

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Tool | Enum | |
| Operation Count | Integer | Per day/month |
| Last Used | Timestamp | |
| Cumulative Bytes Saved | Number | "You've saved 4.2 GB total" — fun stat |

**Workflow:**
1. Pro user opens dashboard.
2. Stats display: "This month: 247 PDFs, 1,203 images, 80 photos resized."
3. 30-day chart.
4. "Bytes saved" headline metric.

**Business Rules:**
- All counters are user-scoped.
- Counters increment via post-operation beacon (no content).

**Validations:** Not applicable.

**Edge Cases:**
- Beacons disabled → empty dashboard with explanation.

**Success Scenario:** User sees value at a glance.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No detailed activity log.

---

### Module 2.2.3: API Access

#### Feature 2.2.3.1 — Generate API Keys

**User Story:**
As an EdTech / SaaS developer, I want API keys with scopes, so that I can compress files in my own application.

**Description:**
Pro users on API-enabled plan generate, view, revoke API keys.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Key Name | String | User-assigned |
| Key Value | String (64) | Shown once |
| Scopes | Enum array | `compress:pdf`, `compress:image`, `resize:photo` |
| Created At | Timestamp | |
| Last Used | Timestamp | |
| Status | Enum (Active / Revoked) | |

**Workflow:**
1. `/pro/api-keys` → "Generate Key."
2. Name + scopes.
3. Key shown once with copy button + warning.
4. Listed thereafter as `sk_live_abc...XYZ`.
5. Revoke instantly.

**Business Rules:**
- Hashed-only storage.
- Max 5 keys per user.
- Revocation effective in < 60s.

**Validations:**
- Unique key name per user.
- At least one scope.

**Edge Cases:**
- Lost key → must regenerate.

**Success Scenario:** Developer integrates and starts calling API.

**Failure Scenario:** Generation fails → retry.

**Scope Limitations:**
- API-mode flow uses server-side compression (different from browser mode) — files transit our servers transiently. This is clearly disclosed in API docs and ToS.
- No webhook callbacks in Phase 1.

---

#### Feature 2.2.3.2 — REST API Endpoints

**User Story:**
As a developer, I want clean REST endpoints with clear docs, so that I integrate in under an hour.

**Description:**
Public REST endpoints under `/api/v1/`, API key auth, RFC 7807 error format.

**Endpoints:**

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/v1/compress-pdf` | POST | Multipart upload + target_kb; returns compressed PDF |
| `/api/v1/compress-image` | POST | Multipart upload + target_kb + format; returns image |
| `/api/v1/resize-photo` | POST | Upload + exam_preset OR custom dimensions; returns resized photo |
| `/api/v1/usage` | GET | Returns current month's call count and quota |

**Workflow:**
1. Developer reads docs at `/api/docs` (OpenAPI 3.0 spec).
2. Sends POST with `Authorization: Bearer {key}` header.
3. Receives binary response (compressed file) or JSON error.
4. Errors follow RFC 7807.

**Business Rules:**
- Per-key rate limits (configurable per plan).
- Logged anonymously for billing.
- Max upload: 10 MB per call.
- Server-side processing in temporary memory; deleted within 60 seconds (no disk persistence).

**Validations:**
- API key valid.
- Required fields present.
- File size ≤ 10 MB.

**Edge Cases:**
- 429 Too Many Requests with retry-after header.
- 400 with field-level error details.

**Success Scenario:** Compressed file returned successfully.

**Failure Scenario:**
- Auth fail → 401.
- Server error → 500 with trace ID.

**Scope Limitations:**
- Sync-only API in Phase 1 (no async/webhook).
- No bulk endpoint (one file per call).

---

#### Feature 2.2.3.3 — API Usage & Billing Page

**User Story:**
As an API consumer, I want real-time usage and projected bill visibility.

**Description:**
Dashboard for API call counts, breakdown by endpoint, projected month-end bill.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Calls This Month | Integer | |
| Breakdown | Chart | Per endpoint |
| Plan-included Calls | Integer | |
| Overage Calls | Integer | |
| Overage Rate | ₹/call | Default ₹0.50/call |
| Projected Bill | ₹ | |

**Workflow:**
1. `/pro/api-usage`.
2. Real-time stats.
3. Alerts at 80% / 100% of quota.

**Business Rules:**
- API Starter Plan: 5,000 calls / month included; ₹0.50 / call overage.
- Monthly billing aligned with subscription.

**Validations:** Not applicable.

**Edge Cases:** Mid-cycle plan upgrade prorated.

**Success Scenario:** User monitors usage proactively.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No sub-account billing for teams in Phase 1.

---

### Module 2.2.4: Billing & Subscription

#### Feature 2.2.4.1 — Subscribe to Pro

**User Story:**
As a free user, I want to upgrade with UPI / card, so that I unlock batch + API + ad-free.

**Description:**
Razorpay-powered subscription with UPI / card / netbanking / wallet.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Plan | Enum | Pro Monthly (₹49), Pro Annual (₹399), API Starter (₹299/mo) |
| Payment Method | Razorpay | UPI / Card / NB / Wallet |
| Billing Cycle | Enum | Monthly / Annual |
| Next Billing Date | Date | |
| GST | 18% | Auto-calculated |

**Workflow:**
1. "Upgrade to Pro" CTA.
2. Razorpay checkout.
3. On success, webhook flips status to Active.
4. Receipt email + immediate Pro feature unlock.

**Business Rules:**
- Indian GST (18%) added.
- Auto-renewal with cancel anytime.
- Failed renewal → 3 retries over 7 days, then downgrade.

**Validations:**
- Valid payment method.
- Indian billing address for GST.

**Edge Cases:**
- Webhook miss → 5-min reconciliation cron.
- Existing active subscription → "Change plan" instead of "Subscribe."

**Success Scenario:** User on Pro, accesses features.

**Failure Scenario:**
- Payment fail → clear error + retry.

**Scope Limitations:**
- No USD billing in Phase 1.
- No PO / invoicing for enterprise.

---

#### Feature 2.2.4.2 — Cancel / Pause Subscription

**User Story:**
As a Pro user, I want to cancel or pause in 2 clicks.

**Description:**
Clear flow with pause (1/2/3 months) or full cancel.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Reason | Enum | Too expensive, Don't need, Switched, Other |
| Feedback | Text | Optional |
| Effective Date | Date | End of current period |

**Workflow:**
1. `/account/billing` → "Cancel."
2. Modal: reason, feedback, "Pause instead?"
3. Confirm.
4. Status: "Cancel at period end."
5. Confirmation email.
6. Pro features remain until period end.

**Business Rules:**
- No mid-period termination.
- Pause once per quarter.
- 7-day money-back guarantee for new subscriptions.

**Validations:** Confirmation required.

**Edge Cases:**
- Cancel during trial → immediate downgrade, no charge.
- Unpaid invoice → cancellation blocked.

**Success Scenario:** Cancellation processed.

**Failure Scenario:** Razorpay error → retry.

**Scope Limitations:**
- No automated win-back sequence in Phase 1.

---

#### Feature 2.2.4.3 — Download GST-Compliant Invoices

**User Story:**
As an Indian Pro user, I want GST-compliant invoices for my expense claim.

**Description:**
Auto-generated PDF invoices with GSTIN, HSN code, tax breakdown.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Invoice Number | String | `INV/2026/000001` |
| Invoice Date | Date | |
| Customer Name, Address, GSTIN (optional) | String | |
| HSN/SAC | String | 998316 |
| CGST/SGST/IGST | ₹ | 18% split |
| Total | ₹ | |

**Workflow:**
1. `/account/billing/invoices`.
2. List of invoices.
3. Download PDF on demand.

**Business Rules:**
- Invoices retained 8 years (Indian tax law).
- GSTIN-based IGST/CGST/SGST split per state.

**Validations:**
- GSTIN format check (if provided).

**Edge Cases:** Non-Indian user → IGST only.

**Success Scenario:** GST-compliant download.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No custom branding in Phase 1.

---

## 2.3 Admin — Admin Panel

### Modules:
1. User Management
2. Content & SEO Management (CRITICAL — 140+ programmatic landing pages)
3. Analytics & Abuse Monitoring
4. Payment & Revenue Dashboard

---

### Module 2.3.1: User Management

#### Feature 2.3.1.1 — View & Search Users

**User Story:**
As an admin, I want to view, search, and filter users.

**Description:**
Table of all users with filters (status, signup date, usage, flagged).

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| User ID, Email, Name | Displayed | |
| Status | Enum | |
| Signup Date | Date | |
| Last Active | Timestamp | |
| Total API Calls | Integer | |
| Flagged | Boolean | |

**Workflow:**
1. `/admin/users`.
2. Filter by status, date, paid, flagged.
3. Click row for detail view.

**Business Rules:**
- Admin sees no file content (none stored).
- All admin actions audit-logged.

**Validations:** Admin role.

**Edge Cases:**
- User pending deletion → flagged.

**Success Scenario:** Find user fast.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No bulk admin actions in Phase 1.

---

#### Feature 2.3.1.2 — Manually Grant / Revoke Pro

**User Story:**
As an admin handling support, I want to grant or revoke Pro for refunds, beta testers, or abuse cases.

**Description:**
Admin override of subscription status with mandatory reason.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Target User | Selected | |
| Action | Enum | Grant / Revoke / Extend Trial |
| Duration | Enum | 1wk / 1mo / 3mo / forever |
| Reason | String | Required, ≥ 10 chars |

**Workflow:**
1. User detail → "Grant" or "Revoke."
2. Reason + duration.
3. Confirm.
4. User notified by email.
5. Audit-logged.

**Business Rules:**
- Reason mandatory.
- Super Admin only for revoking paying customers.

**Validations:** Reason ≥ 10 chars.

**Edge Cases:**
- User in mid-API-call → applies on next call.

**Success Scenario:** Status updated.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No automated rules engine.

---

#### Feature 2.3.1.3 — Support Context View

**User Story:**
As a support admin, I want user context (counters, subscription state) when handling tickets.

**Description:**
Read-only panel summarizing usage counters, subscription history, API status. No file content.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Last 10 counter events | Table | |
| Subscription history | Table | |
| API key statuses | Table | |

**Workflow:**
1. User detail → "Support" tab.
2. Review.
3. Reply via external helpdesk (out of scope).

**Business Rules:**
- Zero file content exposure.

**Validations:** Admin role.

**Edge Cases:** Not applicable.

**Success Scenario:** Faster ticket resolution.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- Helpdesk itself out of scope.

---

### Module 2.3.2: Content & SEO Management (Critical Module)

#### Feature 2.3.2.1 — Programmatic Landing Page Manager

**User Story:**
As a content/SEO admin, I want to manage the 140+ programmatic landing pages, so that I can add new keywords without developer help.

**Description:**
Spreadsheet-style editor for the landing-page database. Each row = one landing page. Live preview before publish.

**Field Details:** (As per Feature 2.1.5.1 landing page fields)

**Workflow:**
1. `/admin/landing-pages`.
2. Table view of all pages: slug, target keyword, status (Draft / Published / Archived), traffic (last 30d), conversion rate.
3. Add new row → fill data → preview → publish.
4. Bulk import from CSV (e.g., add 50 new exam pages at once).
5. On publish: sitemap regenerated; GSC + IndexNow pinged.

**Business Rules:**
- Slug unique.
- All required fields validated before publish.
- Lighthouse Performance ≥ 90 on mobile required (auto-checked on publish).

**Validations:**
- Slug regex: `[a-z0-9-]+`.
- Meta title ≤ 60.
- Meta description ≤ 155.
- FAQ minimum 4 entries.

**Edge Cases:**
- Slug change after publish → 301 from old to new + sitemap update.
- Publish during Google Search Console quota exhaustion → queue for next window.

**Success Scenario:** Page live, indexed, ranking.

**Failure Scenario:**
- Validation fail → cannot publish; admin sees specific issues.

**Scope Limitations:**
- No A/B testing of landing pages in Phase 1 (Phase 2).
- No automated keyword research integration.

---

#### Feature 2.3.2.2 — Blog CMS

**User Story:**
As a content admin, I want to publish blog articles without developer involvement.

**Description:**
Markdown editor with SEO fields, featured image upload, draft/publish workflow.

**Field Details:** (As per Feature 2.1.5.2)

**Workflow:**
1. `/admin/blog/new`.
2. Title, slug, body, meta.
3. Save draft / Schedule / Publish.
4. On publish: sitemap update, GSC ping.

**Business Rules:**
- All articles link to ≥ 1 tool page.
- Alt text mandatory.

**Validations:** Standard CMS validations.

**Edge Cases:**
- Unpublish → 410 Gone.

**Success Scenario:** Article ranks.

**Failure Scenario:**
- Image upload fail → save without image.

**Scope Limitations:**
- No multi-author approval workflow.

---

#### Feature 2.3.2.3 — FAQ & Static Page Editor

**User Story:**
As an admin, I want to edit FAQs and legal pages directly.

**Description:**
Markdown editor for FAQ items, Privacy, Terms, DPDP pages.

**Field Details:** (As per Feature 2.1.5.3)

**Workflow:**
1. `/admin/content`.
2. Inline edit.
3. Save and publish.

**Business Rules:**
- Material legal changes trigger Pro user re-acceptance banner.

**Validations:** Standard.

**Edge Cases:** Not applicable.

**Success Scenario:** Content live.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No version history rollback in Phase 1.

---

#### Feature 2.3.2.4 — Exam & Visa Spec Database

**User Story:**
As an admin, I want a dedicated database of exam and visa photo specs, so that I can update them as official notifications change without touching code.

**Description:**
Specialized CRUD for exam and visa spec records. Each record drives a programmatic landing page automatically.

**Field Details:** (As per Feature 2.1.3.1 exam preset fields)

**Workflow:**
1. `/admin/specs`.
2. Tabbed: Exam Specs | Visa Specs.
3. Add / edit row.
4. Required fields: dimensions, KB range, source URL, last verified date.
5. On save: associated landing page updates.

**Business Rules:**
- Source URL mandatory.
- "Last verified" date prompts admin to re-check quarterly.
- Spec changes trigger email to Pro users with affected presets.

**Validations:**
- Dimensions in valid format (W x H px).
- KB range valid.
- Source URL reachable.

**Edge Cases:**
- Spec changes mid-application-cycle → news banner on landing page.

**Success Scenario:** Spec updated; downstream pages reflect.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No automatic scraping of official sites for spec changes (Phase 2).

---

### Module 2.3.3: Analytics & Abuse Monitoring

#### Feature 2.3.3.1 — Tool Usage Analytics

**User Story:**
As an admin, I want aggregate usage trends per tool and per landing page, so that I can prioritize what to invest in.

**Description:**
Dashboard with anonymous aggregate counters.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Tool / Landing Page | Enum / String | |
| Operation Count | Integer | Per hour / day / week / month |
| Unique Visitors | Integer | Cookieless (Plausible) |
| Conversion Rate | Percent | Operations / visits |
| Geography (state-level) | String | |

**Workflow:**
1. `/admin/analytics`.
2. Filter date / tool / page.
3. Charts + CSV export.

**Business Rules:**
- All data aggregate, anonymous.
- No file content exposed.

**Validations:** Not applicable.

**Edge Cases:** Not applicable.

**Success Scenario:** Admin spots top performers and lagging pages.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No real-time stream in Phase 1 (5-min polling).

---

#### Feature 2.3.3.2 — Abuse Detection & Rate Limiting

**User Story:**
As an admin, I want automatic blocking of high-rate abusers, so that legitimate users get fast service.

**Description:**
IP / fingerprint rate limits + manual review queue + Cloudflare Turnstile challenges.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| IP / Fingerprint (hashed) | String | |
| Event Count | Integer | Per window |
| Flag Reason | Enum | Rate exceeded / Pattern / Manual |
| Action | Enum | Warn / Captcha / Block (1h/24h/forever) |

**Workflow:**
1. Auto-flag on threshold (30 ops/hour for guests).
2. Next request → Turnstile challenge.
3. 3 failed challenges → 24h block.
4. Admin reviews queue.

**Business Rules:**
- Free guest: 30 ops/hour per IP.
- Pro: 500 ops/hour per account.
- API: per-plan quotas.
- Permanent blocks require admin review.

**Validations:** Not applicable.

**Edge Cases:**
- Shared IP (school / office) → appeal form available.

**Success Scenario:** Abuse mitigated.

**Failure Scenario:**
- False positive → easy appeal.

**Scope Limitations:**
- No ML-based detection in Phase 1.

---

#### Feature 2.3.3.3 — Error Log Viewer (Sentry)

**User Story:**
As an admin, I want JS errors visible in admin panel, so that I triage without leaving.

**Description:**
Embedded Sentry view or proxy listing recent errors with frequency and stack traces.

**Field Details:** External integration.

**Workflow:**
1. `/admin/errors`.
2. Recent errors list.
3. Click through to Sentry for full stack.

**Business Rules:**
- Errors must not include file content or PII.

**Validations:** Not applicable.

**Edge Cases:** Not applicable.

**Success Scenario:** Faster bug fixes.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- Full analysis in Sentry UI.

---

### Module 2.3.4: Payment & Revenue Dashboard

#### Feature 2.3.4.1 — Revenue Overview

**User Story:**
As founder, I want one-screen view of MRR, growth, churn, ad revenue.

**Description:**
KPI dashboard pulling Razorpay, Supabase, AdSense, Affiliate data.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| MRR | ₹ | |
| ARR | ₹ | |
| New Pro Signups (MTD) | Integer | |
| Trial-to-Paid Conversion | Percent | |
| Churn Rate | Percent | |
| AdSense Revenue (MTD) | ₹ | API |
| Affiliate Revenue (MTD) | ₹ | Impact API |
| Total Revenue (MTD) | ₹ | Sum |

**Workflow:**
1. `/admin/revenue` (Super Admin only).
2. KPI tiles + trend charts.
3. Export PDF for investors / co-founders.

**Business Rules:**
- Super Admin only.
- External API failures → cached values with timestamp.

**Validations:** Not applicable.

**Edge Cases:** Not applicable.

**Success Scenario:** Single-screen health.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No forecasting / cohort analysis in Phase 1.

---

#### Feature 2.3.4.2 — Manual Refund

**User Story:**
As a support admin, I want to issue refunds for legitimate complaints.

**Description:**
Razorpay refund trigger from admin panel. Reason mandatory; Super Admin approval for > ₹500.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Payment ID | String | Razorpay |
| Refund Amount | ₹ | Full or partial |
| Reason | String | |
| Approver | User ID | Super Admin for > ₹500 |

**Workflow:**
1. User billing history → "Refund."
2. Amount + reason.
3. Approval if > ₹500.
4. Razorpay processes.
5. Email user.

**Business Rules:**
- Refunds > ₹500 require Super Admin.
- All refunds logged forever.

**Validations:**
- Amount ≤ payment.

**Edge Cases:**
- Razorpay fail → retry + manual reconciliation.

**Success Scenario:** Refund issued.

**Failure Scenario:** Retry + fallback.

**Scope Limitations:**
- No bulk refunds in Phase 1.

---

#### Feature 2.3.4.3 — GST Report Export

**User Story:**
As finance, I want monthly GST-ready reports for GSTR-1 / GSTR-3B filing.

**Description:**
Monthly report of Indian invoices with GST splits.

**Field Details:**

| Field Name | Data Type | Remarks |
|---|---|---|
| Period | Month-Year | |
| Invoices | Table | GSTIN, CGST, SGST, IGST |
| Format | Enum | Excel / JSON |

**Workflow:**
1. `/admin/reports/gst`.
2. Select month → export.

**Business Rules:**
- Reconcilable with Razorpay dashboard.

**Validations:** Not applicable.

**Edge Cases:** Empty month → empty report with note.

**Success Scenario:** Timely GST filing.

**Failure Scenario:** Not applicable.

**Scope Limitations:**
- No direct GSTN API integration in Phase 1.

---

## User Coverage Summary

### Guest User — Can Do:
- Compress PDF / image to exact KB target (single file)
- Resize photo / signature for any of 25 supported exams
- Resize photo for any of 8 supported visa types
- Combined photo + signature pack download
- Convert images to PDF (up to 20)
- Convert PDF pages to images
- Crop, rotate, deskew before compression
- Read blog, FAQ, privacy pages
- Use Hindi or English
- Install as PWA for offline use

### Guest User — Cannot Do:
- Batch process > 1 file at a time
- Save presets or history
- Access the API
- Remove ads
- Sign up without Google account
- Process > 30 ops/hour from one IP

### Pro User — Can Do (in addition to Guest):
- Batch compress up to 100 files at once
- Save up to 50 custom presets
- View usage history (counters only)
- Generate API keys (5 max)
- Ad-free experience across all pages
- Process up to 500 ops/hour
- Download GST-compliant invoices
- Cancel/pause subscription
- Delete account with 30-day grace

### Pro User — Cannot Do:
- Share account with team (Phase 2)
- Unlimited API calls (tiered quotas)
- Custom integrations beyond documented API
- Transfer subscription to another user

### Admin — Can Do:
- View all users (no file content)
- Grant / revoke Pro access
- Manage 140+ programmatic landing pages
- Manage blog, FAQ, static pages
- Manage exam and visa spec database
- View aggregate analytics
- Handle abuse and rate limits
- Issue refunds (subject to ₹500 approval threshold)
- Export GST reports

### Admin — Cannot Do:
- See any file content (none stored anywhere)
- Delete payment records
- Override DPDP deletion requests

### Super Admin — Can Do (in addition to Admin):
- Approve refunds > ₹500
- Revoke paying users' Pro access
- View revenue dashboard
- Assign admin roles
- Issue API keys for enterprise customers

---

## 3.0 Deliverables

1. **Web Application (Next.js + React)**
   - Guest tools: PDF compression, image compression, photo resizer, signature compressor, exam-specific tools, visa-specific tools, document utilities
   - Pro Dashboard: batch processing, presets, history, API management
   - Blog, FAQ, Privacy, Terms, DPDP pages
   - PWA-installable
2. **Programmatic SEO Landing Pages (140 pages at MVP)**
   - 11 PDF size pages
   - 9 image size pages
   - 25 exam photo pages
   - 25 exam signature pages
   - 25 combined exam pages
   - 12 visa photo pages
   - 15 format-conversion pages
   - 8 document-type pages
   - 10 use-case pages
3. **Admin Panel (Next.js, role-gated)**
   - User management
   - Programmatic landing page manager
   - Blog CMS, FAQ editor
   - Exam & visa spec database
   - Analytics & abuse monitoring
   - Payment & refund dashboard
4. **Public REST API**
   - `POST /api/v1/compress-pdf`
   - `POST /api/v1/compress-image`
   - `POST /api/v1/resize-photo`
   - `GET /api/v1/usage`
   - OpenAPI 3.0 spec at `/api/docs`
5. **Database Schema (Supabase)**
   - Users, subscriptions, invoices, API keys, usage counters, landing pages, blog, FAQ, exam specs, visa specs, abuse log, audit log
6. **Open-Source Compression Module**
   - Public GitHub repo for transparency (compression core, no business logic)
7. **Integrations**
   - Razorpay, Google OAuth, AdSense, Plausible, GA4, Resend, Sentry, Cloudflare Turnstile, Impact (affiliate)
8. **Legal Documents** (drafted with privacy lawyer)
   - Privacy Policy
   - Terms of Service
   - DPDP Act Compliance Statement
   - Cookie Policy
9. **SEO Starter Kit**
   - Sitemap.xml (auto-generated, 200+ URLs at launch)
   - Robots.txt
   - Schema markup (FAQPage, BreadcrumbList, SoftwareApplication, HowTo)
   - 15 launch blog articles
10. **Launch Assets**
    - ProductHunt listing
    - Twitter/X launch thread
    - LinkedIn announcement
    - Reddit posts (r/IndianStudents, r/JEEAdvanced, r/UPSC, r/ssc, r/IndianVisa, etc.)
    - Hindi versions of top 30 pages
11. **Testing Artifacts**
    - Playwright E2E tests for critical flows
    - Unit tests for compression iterators
    - Browser compatibility matrix (Chrome, Safari, Firefox, Edge, Samsung Internet, UC Browser, Opera Mini)

---

## 4.0 Future Considerations (Out of Phase 1 Scope)

| Feature | Priority | Target Phase |
|---|---|---|
| Native Android + iOS apps | High | Phase 2 (Month 4) |
| Multi-language: Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam | High | Phase 2 |
| State PSC exam packs (MPSC, UPPSC, BPSC, etc.) | High | Phase 2 |
| AI background replacement (white BG for visa photos) | High | Phase 2 |
| Live photo capture (camera UI) | Medium | Phase 2 |
| Cloud sync (Google Drive, OneDrive, Dropbox) | Medium | Phase 2 |
| Team / multi-user Pro accounts | Medium | Phase 2 |
| OCR for PDF (text extraction) | Medium | Phase 2 |
| Async API + webhooks | High | Phase 2 |
| Batch API endpoint | Medium | Phase 2 |
| 2FA for Pro users | Medium | Phase 2 |
| Custom-branded invoices | Low | Phase 3 |
| Enterprise contracts (SOC 2, ISO 27001) | High | Phase 3 |
| USD/EUR pricing for international users | Medium | Phase 3 |
| User data export (DPDP best practice) | Medium | Phase 2 |
| Auto-detect spec changes (scrape official sites) | Medium | Phase 3 |
| Affiliate program (users refer Pro) | Medium | Phase 2 |
| White-label API for EdTech partners | Low | Phase 3 |
| Browser extension (one-click compress from any page) | Low | Phase 3 |
| Watermark / digital signature addition | Low | Phase 3 |

---

## 5.0 Risks & Assumptions

### Dependencies

| Dependency | Risk | Mitigation |
|---|---|---|
| Google AdSense approval | MEDIUM | Apply early; backup networks (Media.net, Ezoic) ready |
| Razorpay merchant approval | MEDIUM | Apply Week 1 with full GST + PAN docs |
| Supabase reliability | LOW | Automated backups, schema in Git |
| Ghostscript-WASM stability | MEDIUM | Pin specific version; have fallback compression library (pdf-lib) ready |
| Tesseract.js bundle size (10+ MB) | MEDIUM | Aggressive caching, defer load until after first paint |
| Browser compatibility (UC Browser, Opera Mini) | MEDIUM | Detect on landing; show fallback message for unsupported |

### Third-Party Risks

- **AdSense:** Document-utility sites are AdSense-friendly (unlike Aadhaar masking). Low risk.
- **Razorpay:** New merchant approval = 5–10 days. Doesn't block free MVP launch.
- **Ghostscript-WASM:** ~12MB binary; first-load on 3G feels slow. Service worker pre-caches solves it for repeat visitors.
- **Affiliate partners:** Coaching platforms (Unacademy, Byju's) have aggressive cookie windows; we benefit but they may change terms. Diversify across 5+ partners.

### Scope Risks

- **Programmatic SEO is Google-policy-sensitive.** Google has been aggressive against thin auto-generated pages (Helpful Content updates 2024–25). Mitigation: every landing page must have unique hero copy, unique FAQ, real tool functionality (not just text). 140 pages is the right starting size — small enough to ensure quality.
- **Spec drift.** Indian exam notifications change specs each cycle. Stale specs = user submits, gets rejected, blames us. Mitigation: quarterly admin review baked into workflow + "Last verified" date displayed publicly.
- **Visa spec liability.** If we display incorrect US visa specs and someone gets rejected, we have legal disclaimer but reputational damage is real. Mitigation: prominent "specs from official sources, verify before submitting" notice; quarterly review.
- **Scope creep.** "Can you add driving licence photo?" "Voter ID size?" "Passport renewal photo?" Strict Phase 1 discipline — ship the 140 most-searched pages first.
- **Copycat risk.** Competitors can replicate the surface in weeks. Moats: SEO authority (first-mover on long-tail keywords), brand trust, comprehensive spec database (hardest to replicate), open-source compression module.

### Technical Risks

- **Browser memory limits.** Large PDFs (50 MB) on mid-range Android devices may crash the tab. Mitigation: clear file size limits + warnings + Pro-tier server-side fallback (Phase 2).
- **iOS Safari download restrictions.** Programmatic downloads unreliable. Mitigation: tap-and-hold fallback UI.
- **WASM load time on slow networks.** First load = ~12 MB. Mitigation: service worker pre-caches; show clear progress.
- **API server-side processing.** Unlike browser flow, API mode receives file content. Required disclosure in API docs and ToS. Files held in memory only, deleted within 60s, never persisted to disk.
- **DPDP Act 2023 evolving.** Implementing rules still being clarified. Mitigation: adopt strictest reasonable interpretation; legal review quarterly.

### Assumptions

1. Engineering team has Next.js, TypeScript, Supabase experience.
2. Figma designs delivered by Week 2.
3. Privacy lawyer engaged for legal review (~₹50K budget).
4. Razorpay merchant approval within 10 business days.
5. Target MVP launch: 5 weeks.
6. Target Pro paid launch: 7 weeks (2 weeks after free beta).
7. Bootstrap marketing — primary growth = SEO + ProductHunt + community posts.
8. AdSense approval received before paid launch.
9. Initial 140 landing pages reviewed by human writer before publish.
10. No major Google algorithm update destroying programmatic SEO during the build.

---

## Appendix A: MVP Build Plan (5 Weeks)

| Week | Milestones |
|---|---|
| **Week 1** | Infra: Next.js, Supabase, Vercel, Razorpay sandbox, Cloudflare. Domain. Privacy lawyer engaged. Figma design kickoff. AdSense + Affiliate applications submitted. |
| **Week 2** | PDF compressor: upload, target-KB iterative compression, preview, download. Image compressor: same. Trust display. Homepage v1. |
| **Week 3** | Photo resizer with face detection. Signature compressor. Top 25 exam preset database + 25 landing pages. Top 8 visa preset database + 8 landing pages. Document utilities (image-to-PDF, PDF-to-image, crop/rotate). |
| **Week 4** | Programmatic landing page system + remaining 107 pages built and human-reviewed. Blog CMS + 10 launch articles. FAQ. Legal pages (lawyer-reviewed). Hindi i18n for top 30 pages. AdSense placement. |
| **Week 5** | Pro tier: Google OAuth, Razorpay subscription, batch processing, presets, history. Admin panel: user management, landing page manager, exam/visa spec database, analytics. E2E tests. ProductHunt launch prep. **Beta launch (free tier).** |
| **Week 6–7** | Public API endpoints. GST invoicing. Polish based on beta feedback. Reddit / Twitter / LinkedIn launch. Performance optimization. **Paid launch.** |

---

## Appendix B: Success Metrics (First 90 Days Post-Launch)

| Metric | Target | Stretch |
|---|---|---|
| Organic monthly visitors | 80,000 | 200,000 |
| Tool completions per month | 60,000 | 150,000 |
| PWA installs | 2,000 | 5,000 |
| Pro signups (free trials) | 1,500 | 4,000 |
| Trial-to-paid conversion | 18% | 25% |
| Paying Pro users | 270 | 1,000 |
| MRR | ₹14,000 (~270 × ₹49) | ₹49,000 |
| AdSense revenue | ₹15,000–35,000 | ₹70,000+ |
| Affiliate revenue | ₹8,000 | ₹25,000 |
| API customers | 5 | 20 |
| Total Month-3 revenue | ₹40,000–60,000 | ₹1,40,000+ |
| Search Console impressions | 1.5M | 5M |
| Top-3 ranking keywords | 12 | 50 |
| Total indexed pages | 200+ | 400+ |

**Why these numbers are achievable:**
- "compress photo for SSC" alone has ~40K monthly searches in India.
- Visa photo keywords combine for ~150K monthly searches globally.
- "compress PDF under 100 KB" has 25K+ monthly searches.
- Even ranking #3 for the top 20 keywords drives meaningful traffic.

---

## Appendix C: Why This Beats the Aadhaar Masking Idea

| Dimension | Aadhaar Masking | FormReady |
|---|---|---|
| Trust barrier to first use | Very high (sensitive doc) | Low (utility task) |
| Search volume of best keywords | ~30–80K/month | ~300K+/month combined |
| Use frequency per user | 2–4× per year | 5–8× during one application cycle |
| Regulatory risk | High (UIDAI) | Negligible |
| AdSense friendliness | Low (sensitive content flag risk) | High (neutral utility) |
| Programmatic SEO scale | ~15 pages | 140+ pages at MVP, 500+ in Phase 2 |
| Pro tier conversion narrative | Weak (low frequency) | Strong (batch + ad-free is real value) |
| Affiliate opportunity | Limited | Strong (coaching, visa services, EdTech) |
| Defensibility | Trust + open source | Spec database + SEO authority |
| Year-1 revenue ceiling | ₹40K–₹1L/month | ₹1L–₹4L/month realistic |

---

## Final Self-Validation Checklist

- ✅ All three user roles (Guest, Pro, Admin/Super Admin) fully covered.
- ✅ Each role has multiple modules (Guest: 5, Pro: 4, Admin: 4).
- ✅ Each module has minimum 3 features (most have 4–5).
- ✅ Every feature includes: User Story, Description, Field Details (where applicable), Workflow, Business Rules, Validations, Edge Cases, Success Scenario, Failure Scenario, Scope Limitations.
- ✅ Workflows include start points, actions, conditional branches, system responses, end states.
- ✅ State transitions documented (subscription, deletion grace, abuse flag).
- ✅ No vague language — every feature is specific and testable.
- ✅ Deliverables explicitly listed.
- ✅ Phase 1 scope strictly separated from future considerations.
- ✅ Risks (dependencies, third-party, scope, technical) documented with mitigations.
- ✅ DPDP/GDPR compliance woven into requirements, not bolted on.
- ✅ Programmatic SEO strategy detailed with concrete page-count breakdowns.

---

*End of Scope of Work — FormReady.in v1.0*
