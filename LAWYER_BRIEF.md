# FormReady — Legal Review Brief

**Prepared for:** [Lawyer / Firm Name]
**Sent by:** [Founder Name]
**Date:** [Send Date]
**Project:** FormReady.in — privacy-first PDF and image compression web platform
**Engagement:** First-pass review of v0 legal drafts (Privacy Policy · Terms of Service · DPDP Compliance · Cookie Policy)

---

## How to use this document

This brief is **self-contained** — you don't need access to the codebase or any other file to review.

- Section 1 explains what FormReady actually does and what data flows where (the foundation for every compliance question).
- Section 2 lists the open questions per document — what we'd specifically like your opinion on.
- Section 3 is the placeholder inventory — every `[BRACKETED]` field in the drafts that needs founder data + your sign-off.
- Section 4 is engagement scope, deliverables, timeline.
- Sections 5–8 are the **full text** of each of the four draft documents, ready to redline.

We expect you'll have follow-up factual questions — please send them as a single round so we can answer in one go and keep this efficient.

---

## 1. The product (factual basis for every question)

### 1.1 What FormReady is

FormReady is a web platform at **formready.in** that helps users compress PDFs, images, photos, and signatures to **exact KB sizes** required by Indian government forms (SSC, UPSC, NEET, IBPS, etc.) and visa applications (US, UK, Schengen, Canada).

### 1.2 What's distinctive — and central to every compliance argument

**File compression runs entirely in the user's browser via WebAssembly.** Files do not transit our servers. There is no upload endpoint that receives file content. This is not just a marketing claim; it is verifiable in the user's own browser DevTools (we provide a `/privacy/verify` page that demonstrates this).

This architecture means **most personal data we would otherwise be a Data Fiduciary for, we never collect in the first place**. Our compliance posture is built on this fact.

### 1.3 Complete inventory of data we touch

#### Free tier (anonymous, no account)

| What | Why | Where stored | Retention |
|---|---|---|---|
| File content | — never touched — | nowhere | n/a |
| Filename | — never touched — | nowhere | n/a |
| File hash | — never touched — | nowhere | n/a |
| IP address | Vercel access logs (standard hosting) | Vercel logs | 30 days |
| Anonymous usage event ping (e.g. "pdf-compress, t=...") | Aggregate analytics + abuse detection | PostgreSQL counters (post-MVP) | 13 months |
| Cookieless page views | Plausible analytics | Plausible (third-party) | Per Plausible policy |
| `NEXT_LOCALE` cookie | Remember user's language (English / Hindi) | User's browser only | 365 days |
| `cookie-consent` cookie | Remember banner dismissal | User's browser only | 365 days |
| AdSense cookies (when enabled) | Google's display advertising network | User's browser; managed by Google | Per Google policy |
| Cloudflare Turnstile signals | Captcha on heavy-use endpoints | Ephemeral (no cookies) | None stored |

#### Pro tier (paid subscription, post-MVP)

When Pro launches (planned 3–6 months post-public-launch), we additionally collect:

| What | Why | Where stored | Retention |
|---|---|---|---|
| Email address (from Google OAuth) | Account login + transactional email | PostgreSQL | Lifetime of account + 30-day grace |
| Display name + profile photo URL | Account UI personalisation | PostgreSQL | Lifetime of account + 30-day grace |
| Subscription state, plan, billing dates | Operate the subscription | PostgreSQL | Lifetime + tax-required GST records |
| Razorpay payment ID (token, not card number) | Reconcile payments | PostgreSQL | 8 years (Indian tax law) |
| API key metadata (name, scopes, last-used timestamp) | API access | PostgreSQL (key value hashed) | Lifetime of key |
| Saved presets (settings, e.g., "100 KB target, JPG output") | User convenience | PostgreSQL | Lifetime of account |

**At no Pro tier point do we collect file content, filename, file hashes, biometric data, financial credentials, or government IDs.**

### 1.4 Third parties our data flows to

Listed in current (or planned) order of integration:

| Third party | Purpose | Data they receive | Their location |
|---|---|---|---|
| **Vercel** | Hosting | Standard HTTPS request data (IP, user-agent, paths) | Global edge; data origin India |
| **Plausible** | Privacy-respecting analytics | Anonymous page views (no cookies, no fingerprinting) | EU |
| **Google Identity (Pro only)** | OAuth authentication | Email, name, profile photo URL | Global |
| **Razorpay (Pro only)** | Payment processing | Billing details, card data (we never see) | India |
| **Resend (Pro only)** | Transactional email (welcome, receipts, password reset) | Email address + email content | US |
| **Google AdSense** | Display advertising on tool/blog pages | Whatever AdSense's pixel collects | Global |
| **Cloudflare Turnstile** | Anti-abuse captcha | Ephemeral signals, no cookies | Global |
| **Sentry** | JavaScript error tracking on client | Stack traces (no PII, no file content) | EU/US |

We do **not** use Google Analytics, Facebook Pixel, LinkedIn Pixel, X Pixel, or any other social-network or behavioural tracking.

### 1.5 Geography & user mix

- **Primary audience**: residents of India (estimated ~85% of traffic at MVP).
- **Secondary**: Indian diaspora abroad searching for visa-photo specs, primarily US, UK, EU, Canada, Australia, UAE, Singapore.
- **Languages at launch**: English and Hindi.
- **Primary jurisdiction we comply with**: India (DPDP Act 2023 + Information Technology Act 2000 + Indian Contract Act 1872).
- **Secondary**: GDPR (EU/UK visitors), other regional rules where they apply through ordinary international compliance.

### 1.6 Operational facts that affect compliance text

| Fact | Why it matters |
|---|---|
| The compression engine source code is open source on GitHub | Strengthens the privacy claim — anyone can audit |
| We run no compression on our servers in MVP | Distinguishes us from iLovePDF / SmallPDF |
| Pro API will run server-side compression (only Pro feature where files transit our servers) | Needs explicit, separate disclosure when Pro launches |
| All MVP infrastructure on Vercel + (later) PostgreSQL on Neon (or self-hosted Mumbai) | Data localisation framing |
| 7-day money-back guarantee for new Pro subscriptions (when Pro launches) | Consumer protection compliance |
| Indian GST 18% added to Pro prices | Tax compliance + invoicing language |

---

## 2. Specific legal questions

We've drafted v0 versions of all four documents (Sections 5–8). Please redline freely. The questions below are the points we specifically want your opinion on.

### 2.1 Privacy Policy

1. **Architecture-first framing.** We claim that because file content never reaches our servers, we are not a Data Fiduciary in respect of file content. Is this defensible under DPDP §2(i)? Are there edge cases (e.g., the API tier when it launches) where we become a Data Fiduciary for previously-not-collected data?

2. **Retention.** Anonymous counter retention of 13 months — is this reasonable, or does DPDP guidance suggest a tighter cap? Our reasoning: 13 months covers full annual usage cycles (exam application periods) for trend analysis.

3. **AdSense consent.** AdSense uses cookies for fraud prevention even without personalisation. Do we need a separate explicit consent step for AdSense cookies under DPDP, or is the inclusion in our cookie policy + dismissible banner sufficient? Note: we plan to use Google's "non-personalised" mode by default for non-consenting users.

4. **International transfers.** Some sub-processors (Plausible — EU; Resend — US; Sentry — EU/US) are outside India. We rely on the standard contractual clauses each provider uses. Per DPDP §16, do we need anything more for these transfers?

5. **Significant Data Fiduciary status.** §10 of the DPDP Act allows the government to designate certain Data Fiduciaries as Significant. At MVP scale (likely <50,000 active users in year 1) we don't expect this designation. Should the Privacy Policy still pre-emptively describe a DPO appointment plan in case of growth?

6. **Children.** We require 13+ for free tier and 18+ for Pro. DPDP §9 has specific rules for children's data. Is our threshold and parental-consent language sufficient?

7. **Right to erasure vs tax-law retention.** GST invoices must be retained for 8 years per Indian tax law. We anonymise after account closure but the records persist. Is the conflict-handling language (§7 in the draft) the right way to describe this?

### 2.2 Terms of Service

1. **Liability cap.** We've drafted "₹1,000 or 12 months of fees, whichever is greater." Is this enforceable in Indian courts? At what amount does it become unconscionably low for a paid service?

2. **Governing law and jurisdiction.** We've left a `[JURISDICTION CITY]` placeholder. Strong opinion preferred: should this be the city of incorporation, or a major commercial-disputes hub (Mumbai/Bengaluru/Delhi)?

3. **Mandatory arbitration vs courts.** We've not specified arbitration. Should we, given the small-claim profile of likely disputes?

4. **Form-portal acceptance disclaimer.** §9 of the Terms says we hit technical specs but cannot guarantee acceptance. This is critical to our risk profile (form portals reject for non-technical reasons all the time). Is the wording strong enough?

5. **Auto-renewal disclosure.** Indian RBI guidelines (October 2021 + amendments) require pre-debit notification for recurring payments. Razorpay handles this technically, but the Terms text should describe it correctly. Does §7 hold up?

6. **Indemnification.** Is the §11 indemnification clause enforceable as drafted, or should it be narrower (e.g., scoped to user violations of acceptable use)?

7. **IP licence to user.** §8 grants users a "limited, revocable, non-exclusive, non-transferable licence." Compatible with our open-source compression engine being separately MIT-licensed?

8. **Children-related liability.** If a 13-year-old uses the free tier without parental consent and we never collect identifying info, what's our exposure?

### 2.3 DPDP Compliance Notice

1. **Grievance Officer.** Per §10 of the DPDP Act, do we need a named individual or is "the role of grievance officer at this email" sufficient? What if the role rotates?

2. **Hindi version.** DPDP §6(3) requires consent notices be made available in the languages listed in the Eighth Schedule. Are we obligated to publish the privacy notice in Hindi at MVP, or is the language toggle on the UI plus an English notice sufficient?

3. **Consent mechanism.** Currently we treat continued use of the site as implicit consent for cookieless analytics + functional cookies. For AdSense we plan an explicit banner. Is this layered approach DPDP-compliant?

4. **Data Protection Officer.** §10(2) requires Significant Data Fiduciaries to appoint a DPO. We're not significant yet. Is forward-looking language ("we will appoint a DPO if classified") appropriate, or should we appoint pre-emptively?

5. **72-hour breach notification.** §8(6) requires notification to the Data Protection Board within 72 hours. We've drafted this. Are there template formats prescribed by Board rules we should follow?

6. **Data Principal nomination.** §14 right of nomination — we say users can email a nomination. Is there a prescribed form or process we should reference?

### 2.4 Cookie Policy

1. **Strictly necessary classification.** We've classified `NEXT_LOCALE` (language preference) and `cookie-consent` (banner dismissal) as "Strictly necessary." Is that correct, or are these "Functional" requiring explicit consent?

2. **Consent for AdSense.** AdSense's cookies are placed by Google, not us. Do we need to gate Google's loading on our consent banner, or does Google's own consent flow satisfy the requirement?

3. **Do Not Track honouring.** We claim to honour DNT — disabling Plausible and AdSense personalisation when DNT is set. Is this commitment legally binding once stated, and do we need to evidence it?

4. **Cookie management UI.** We provide a single dismissible banner. Some interpretations of DPDP / GDPR require a granular cookie-management panel. Is one acceptable for our minimal cookie set?

### 2.5 Cross-document questions

1. **Conflict resolution.** If the Privacy Policy and Terms differ on a point, which prevails? (We've written both to be consistent but want to confirm the hierarchy text.)

2. **Material changes notice.** We say "material changes are communicated to Pro users via email and a banner." Is "material" defined adequately, or should we list categories of change that trigger this?

3. **Open-source disclosure.** The compression engine is MIT-licensed and on GitHub. Should the Terms reference this licence explicitly so users know it's separately governed?

4. **Privacy audit verifiability.** We make the architectural privacy claim verifiable via DevTools at `/privacy/verify`. Is offering this verification a compliance benefit (proof of "privacy by design" per DPDP §8(4)), or just marketing?

---

## 3. Bracketed placeholders inventory

Every `[BRACKETED]` field across the four documents that needs founder data + lawyer sign-off:

| Placeholder | Appears in | Suggested value | Founder confirms? |
|---|---|---|---|
| `[LEGAL ENTITY NAME]` | Privacy §1 · Terms §2 · DPDP §4 · Contact pages | e.g. "FormReady Technologies Private Limited" | ☐ |
| `[CIN]` (Corporate Identification Number) | Terms §2 · DPDP §4 · Contact §Mailing address | India MCA filing number | ☐ |
| `[REGISTERED ADDRESS]` | Privacy §1 · Terms §2 · DPDP §4 · Contact | Registered office per ROC filing | ☐ |
| `[GRIEVANCE OFFICER NAME]` | Privacy §1 · Privacy §15 · DPDP §5 | Named individual responsible | ☐ |
| `[REGION — typically AWS Mumbai (ap-south-1)]` | Privacy §6 · DPDP §8 | Postgres host location once chosen | ☐ |
| `[JURISDICTION CITY]` | Terms §13 | City for dispute resolution | ☐ |

Additional fields not in brackets but pending decisions:

| Decision | Default in draft | Founder confirms? |
|---|---|---|
| Liability cap | "₹1,000 or 12 months of fees, whichever is greater" | ☐ |
| Money-back guarantee | 7 days for new subscriptions | ☐ |
| Trial duration | 7 days, no card required | ☐ |
| Account-deletion grace | 30 days reversible | ☐ |
| Counter retention | 13 months | ☐ |
| GST invoice retention | 8 years (Indian tax law fixed) | n/a |
| Server log retention | 30 days (Vercel default) | ☐ |
| Notice for material change to Pro users | Banner + email; 30 days prior to effect | ☐ |

---

## 4. Engagement scope

### 4.1 Deliverables we want from you

1. **Redlined drafts** of all four documents (Privacy · Terms · DPDP · Cookies) — comments and edits inline so we understand the rationale.
2. **Decisions or recommendations** on each of the questions in Section 2.
3. **A brief opinion (2–3 paragraphs) on the architecture-first framing** — specifically whether our claim of not being a Data Fiduciary for file content is defensible, and what edge cases would make it not.
4. **A list of any additional documents you recommend** (e.g., Acceptable Use Policy, Refund Policy, separate API Terms — please advise if any of these should be split out from the Terms).

### 4.2 Optional adds

If priced separately and you'd like the work:
- A short **DPDP-compliance checklist** for our internal use (so we know what to monitor as the product evolves).
- **Quarterly review retainer** — we plan to update presets quarterly when government notifications change. A standing "review the diff before publish" arrangement would help us move fast.
- **Incident-response template** — preferred wording for §8(6) breach notifications, kept ready.

### 4.3 Engagement terms we're proposing

- **Working language**: English (we can supply Hindi where helpful but expect deliverables in English).
- **Communication**: email for first round; one 60-minute video call after first redline to walk through your reasoning on the open questions.
- **Confidentiality**: standard NDA; we'll send a draft if you don't have a preferred form.
- **Pricing**: please quote a fixed fee for first-pass redlines + Q&A response + 60-min call. Hourly rate for any further iterations welcome.

### 4.4 Timeline we're aiming for

| Step | Target |
|---|---|
| You acknowledge engagement and quote | Within 3 business days |
| You return first-pass redlines + answers | 5–7 business days from start |
| Founder review & follow-up questions | 2 business days |
| Walk-through call | Same week as founder review |
| Final cleaned versions | 2 business days from call |
| **Total** | **~2 weeks** |

We're targeting public launch about 3 weeks from today. Legal sign-off is the longest lead-time item, so the sooner we lock you in the better.

### 4.5 What you don't need to do

- We are **not** asking you to advise on tax / GST mechanics — that's already settled with our chartered accountant.
- We are **not** asking for IP / trademark advice — separate engagement (already in motion).
- We are **not** asking you to draft Pro Auth account terms — Pro is post-MVP and will be a separate engagement when it launches.

---

## 5. Draft — Privacy Policy

> **Status:** v0 draft, last updated 2026-04-01

### Plain-language summary

File compression runs in your browser — your file is never transmitted to FormReady. We collect anonymous usage counters and (for Pro accounts) the minimum needed to bill you. We don't sell data. You can verify the no-upload claim yourself at `/privacy/verify`.

### 1. Who we are

FormReady is operated by `[LEGAL ENTITY NAME]` (referred to as "FormReady", "we", "us", or "our"), a company registered in India with its principal office at `[REGISTERED ADDRESS]`. Our domain is **formready.in**.

For questions about this policy or any privacy matter, contact our Grievance Officer: grievance@formready.in (`[GRIEVANCE OFFICER NAME]`, available Monday–Friday, 10:00–18:00 IST).

### 2. The architecture-first promise

FormReady is designed so that personal data minimisation is structural, not optional. The compression engine runs entirely in your browser via WebAssembly and Canvas APIs. **The file you upload to a tool never leaves your device.** There is no server endpoint that receives file content. You can verify this by opening your browser's DevTools → Network tab while compressing — zero outbound file requests will be visible. We provide a live demonstration at /privacy/verify.

### 3. What we collect — and don't

We deliberately collect as little as possible. Here is the complete list:

**3.1 What we collect from everyone (free + Pro)**
- Anonymous usage counters. When you complete a compression, your browser sends a small "event" ping with the operation type (e.g., "pdf-compress") and a timestamp. We use this for aggregate analytics, abuse detection, and product improvement. The ping does not include your file, file name, file hash, or any user identifier.
- Page-view analytics. We use Plausible for cookieless, privacy-respecting analytics. It tracks visit counts and the country of origin only.
- Standard server logs. Like all websites, our hosting provider (Vercel) records IP addresses and user-agents for short-term abuse and performance debugging. These logs are kept for 30 days and are not associated with any account.
- Cloudflare Turnstile. On heavy-use endpoints we run an invisible captcha (Cloudflare Turnstile). It uses no cookies and collects no personal information.

**3.2 What we additionally collect from Pro users**
- Email address (from Google OAuth) and the display name and profile picture URL Google sends with it.
- Subscription state (active / cancelled / trial), next billing date, plan tier.
- Razorpay payment ID (a token; not your card number).
- API key metadata (name, scopes, last-used timestamp) — keys are stored hashed.

**3.3 What we never collect**
- The content of any file you compress.
- The filename of any file you compress.
- Any cryptographic hash of the file (we don't fingerprint files).
- Any details about the persons or entities depicted in your files.
- Your card number, CVV, or banking credentials (those go to Razorpay; we never see them).

### 4. Cookies

We use a minimal set of first-party cookies — none for behavioural advertising. See the full Cookie Policy.

### 5. Third parties we share data with

We only share data with services strictly necessary to operate FormReady. Each is contractually bound to use the data only for the purpose listed:

- **Google Identity** — to authenticate Pro users via OAuth. Only your email, display name, and profile photo URL are received.
- **Razorpay** — to process payments. Razorpay receives your billing details directly; we receive only a payment ID.
- **Resend** — to send transactional emails (welcome, password reset, receipts) for Pro users.
- **Plausible** — cookieless visit analytics (no personal data).
- **Sentry** — JavaScript error tracking for the site itself. No file content is ever sent.
- **Google AdSense** — serves ads on tool and content pages. AdSense uses its own cookies governed by Google's privacy policy. You can opt out at adssettings.google.com.
- **Cloudflare Turnstile** — invisible captcha to deter abuse.
- **Vercel** — our hosting provider; sees only what any HTTPS endpoint sees (IPs, user-agents, request paths).

We do not sell, rent, or trade your personal information to anyone.

### 6. Where data is stored

Pro account data is stored in PostgreSQL on infrastructure located in `[REGION — typically AWS Mumbai (ap-south-1) for Indian users]`. Logs and analytics are stored on the respective providers' infrastructure as listed above. File content is never stored anywhere because it is never received.

### 7. How long we keep data

- Anonymous usage counters: retained for 13 months for trend analysis, then aggregated.
- Pro account data: retained for the lifetime of the account, then deleted within 30 days of account closure (with a 30-day grace window during which the deletion is reversible).
- GST invoices: retained for 8 years per Indian tax law, in anonymised form (only the legal minimum identifying information).
- Server logs: 30 days.

### 8. Your rights under the DPDP Act 2023

If you are an Indian resident, the Digital Personal Data Protection Act, 2023 grants you the following rights regarding any personal data we hold about you:

- **Right to access** a summary of the personal data we hold about you.
- **Right to correct or update** inaccurate or outdated information.
- **Right to erasure** — request deletion of your data, subject to legal retention requirements (e.g., GST invoices).
- **Right to grievance redressal** — escalate concerns through our Grievance Officer.
- **Right to nominate** — designate someone to exercise your rights in case of incapacity or death.

Pro users can exercise the access, correction, and deletion rights directly from /account/profile. Free users — since we hold no identifying information about you — these rights are mostly moot, but you can still email us with any concern.

### 9. Your rights under GDPR (if applicable)

If you are a resident of the European Economic Area, the United Kingdom, or Switzerland, you have analogous rights under the GDPR — including the right to object to processing, the right to data portability, and the right to lodge a complaint with your local supervisory authority.

### 10. Children

Our services are intended for users 13 years of age or older. If you are under the age of majority in your jurisdiction, you may use FormReady only with the consent and supervision of a parent or guardian. We do not knowingly collect personal data from children under 13.

### 11. International transfers

Some of our service providers (e.g., Sentry, Plausible) operate from regions outside India. Data shared with them is limited to the minimum necessary for the service to function (no file content) and is governed by the standard contractual clauses each provider uses for cross-border transfer compliance.

### 12. Security

We follow industry-standard security practices including TLS encryption for all data in transit, encrypted storage at rest, hashed storage of API keys and secrets, two-factor authentication for our internal admin access, and quarterly third-party security review. The most important security control on our side is structural: *we don't hold what we don't collect.*

### 13. Data breach notification

In the unlikely event of a personal data breach affecting Pro account data, we will notify the Data Protection Board of India and affected users within 72 hours of becoming aware of the breach, in accordance with DPDP Act §8(6).

### 14. Changes to this policy

We may update this policy occasionally to reflect new features, regulatory requirements, or operational changes. The "Last updated" date at the top of this page reflects the most recent change. Material changes (those that materially affect your rights) will be communicated to Pro users via email and a banner on the site requesting re-acceptance of terms.

### 15. Contact

For privacy-related queries:
- privacy@formready.in — general privacy questions
- grievance@formready.in — formal grievance under the DPDP Act
- dpo@formready.in — GDPR matters

If you are not satisfied with our response, you have the right to lodge a complaint with the Data Protection Board of India (dpb.gov.in) or, for EU/UK residents, with your local supervisory authority.

---

## 6. Draft — Terms of Service

> **Status:** v0 draft, last updated 2026-04-01

### 1. Acceptance of these terms

By using formready.in (the "Service"), you agree to these Terms of Service. If you don't agree, please don't use the Service. By using the Service on behalf of an organisation, you represent that you have authority to bind that organisation.

### 2. Who we are

The Service is provided by `[LEGAL ENTITY NAME]`, a company registered in India (`[CIN]`) with its principal office at `[REGISTERED ADDRESS]`. Our domain is formready.in.

### 3. The service

FormReady provides browser-based file compression and resizing tools (PDF, image, photo, signature), and related programmatic landing pages, blog content, and FAQ resources. The Service is offered in two tiers:

- **Free tier** — single-file compression, supported by ads, with a rate limit of 30 operations per hour per IP address.
- **Pro tier** — a paid subscription unlocking batch processing, API access, ad-free use, and additional features. Pro is not yet available; this section reserves terms that will apply when it launches.

### 4. Eligibility

You must be at least 13 years old to use the Service, and at least 18 (or the age of majority in your jurisdiction) to subscribe to the Pro tier. Use of the API requires a Pro subscription on an API-enabled plan and acceptance of additional API-specific terms in our API documentation.

### 5. Your account (Pro)

Pro accounts are created via Google OAuth. You are responsible for maintaining the security of the Google account you authenticate with. We will treat any action taken from your authenticated session as your action.

You agree to:
- Provide accurate, current information.
- Promptly notify us of any unauthorised access via security@formready.in.
- Not share access credentials or attempt to use the Service from someone else's account.

### 6. Acceptable use

You agree not to:
- Use the Service for any illegal activity or to infringe on the rights of others.
- Compress or process files containing material that is illegal in India or your jurisdiction (CSAM, terrorist content, etc.).
- Attempt to bypass rate limits or abuse detection.
- Reverse-engineer, scrape, or systematically access the Service except via our public API with valid keys.
- Resell access to the Service without explicit written permission.
- Use the Service to attack, probe, or harm any third-party system.

We may suspend or terminate access for violations, with notice where reasonable. For severe violations (illegal content, security attacks), suspension may be immediate.

### 7. Payments and renewals (Pro)

Pro subscriptions are billed monthly or annually as you choose, via Razorpay. Indian GST (18%) is added to the listed price. By subscribing, you authorise auto-renewal at the end of each billing period.

You may cancel anytime from /account/billing. Cancellation is effective at the end of the current billing period; you retain access until then. We do not offer refunds for unused time except within our 7-day money-back guarantee for new subscriptions (first 7 days only).

We may change Pro pricing for new subscribers at any time. Existing subscribers will be given at least 30 days' notice before any price increase affecting their plan, and an opportunity to cancel before the new price takes effect.

### 8. Intellectual property

The Service, including all software, design, branding, and written content, is owned by FormReady and protected by Indian and international copyright, trademark, and other laws. We grant you a limited, revocable, non-exclusive, non-transferable licence to use the Service in accordance with these Terms.

Files you upload remain entirely yours. We claim no ownership and no licence over your files. Because we don't see your files in the first place (they never reach our servers), this is structurally guaranteed.

We make portions of the compression engine available as open-source code on GitHub. That code is governed by its own licence (MIT or similar), separately from these Terms.

### 9. Disclaimers

The Service is provided "as is" and "as available", without warranty of any kind, express or implied. We don't warrant that the Service will be uninterrupted, error-free, or meet your specific requirements.

Form-acceptance disclaimer: while we work to keep exam and visa specifications accurate (sourced from official notifications, re-verified quarterly), final acceptance of any photo, signature, or document by a form portal, exam body, embassy, or consulate rests entirely with that authority. We are not responsible for rejection of your submissions for non-technical reasons (lighting, expression, background quality, etc.) or for spec changes that occur between our last verification and your submission.

### 10. Limitation of liability

To the maximum extent permitted by law, FormReady, its officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service. Our total aggregate liability for any claim related to the Service shall not exceed the greater of (a) ₹1,000 or (b) the amount you have paid us in the 12 months preceding the claim.

Some jurisdictions do not allow exclusion of certain warranties or limitation of liability; in such jurisdictions, our liability is limited to the maximum extent permitted by law.

### 11. Indemnification

You agree to indemnify and hold FormReady and its affiliates harmless from any claim arising out of your violation of these Terms, your use of the Service in violation of any law, or your infringement of any third party's rights.

### 12. Termination

You may stop using the Service or cancel your Pro subscription at any time. We may suspend or terminate your access for breach of these Terms, with notice where reasonable. Sections that should survive termination — payment obligations, intellectual property, disclaimers, limitation of liability, and dispute resolution — will continue to apply after termination.

### 13. Governing law and dispute resolution

These Terms are governed by the laws of India. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts at `[JURISDICTION CITY]`, India. Before filing any formal claim, you agree to attempt good-faith resolution through email at legal@formready.in.

### 14. Changes

We may update these Terms occasionally. Material changes (those that affect your rights or obligations) will be communicated to Pro users via email and via a banner on the site requiring re-acceptance.

### 15. Contact

For questions about these Terms: legal@formready.in. For privacy questions, see our Privacy Policy. For all other queries: hello@formready.in.

---

## 7. Draft — DPDP Compliance Notice

> **Status:** v0 draft, last updated 2026-04-01

### 1. About this notice

India's **Digital Personal Data Protection Act, 2023** ("DPDP Act") regulates the processing of digital personal data of residents of India. This notice describes how FormReady complies with the DPDP Act. It is supplemental to our broader Privacy Policy; where there is any conflict between the two on DPDP-specific matters, this notice prevails for Indian residents.

### 2. The architecture-first approach

The cleanest way to comply with a data protection law is to never collect personal data in the first place. FormReady is built around that principle. Single-file compression (PDF, image, photo, signature) runs entirely in your browser via WebAssembly. **The file content never reaches FormReady servers**, which means no personal data within those files ever becomes our responsibility under the DPDP Act.

You can verify this yourself at /privacy/verify: open DevTools, run a sample compression, watch the Network tab show zero outbound file requests.

### 3. Personal data we do process

For Indian residents, we process the following personal data, all of which falls under the DPDP Act:

- **Pro account holders**: email address (from Google OAuth), display name, profile photo URL, subscription state, billing address (Indian state for GST purposes), Razorpay payment ID.
- **All visitors**: IP address (in short-term hosting logs only, not associated with any account), anonymous usage event timestamps.

### 4. Data Fiduciary identity

For the purposes of the DPDP Act:

- **Data Fiduciary**: `[LEGAL ENTITY NAME]`
- **CIN**: `[CORPORATE IDENTIFICATION NUMBER]`
- **Registered office**: `[REGISTERED ADDRESS, INDIA]`
- **Email**: hello@formready.in

### 5. Grievance Officer

Per §10 of the DPDP Act, our designated Grievance Officer:

- **Name**: `[GRIEVANCE OFFICER NAME]`
- **Email**: grievance@formready.in
- **Address**: `[REGISTERED ADDRESS, INDIA]`
- **Hours**: Monday–Friday, 10:00–18:00 IST
- **Response time**: we acknowledge grievances within 7 working days and resolve them within 30 days where reasonable.

### 6. Your rights under the DPDP Act

If you are a resident of India, the DPDP Act grants you the following rights:

**6.1 Right to access (§11)**
You may request a summary of the personal data we hold about you, the processing activities undertaken with it, and the identities of any Data Processors with whom it has been shared. Email grievance@formready.in; Pro users can self-serve this from /account/profile.

**6.2 Right to correction and erasure (§12)**
You may request correction of inaccurate data or erasure of your data. Erasure is subject to legal retention requirements — for example, GST invoices must be retained for 8 years per Indian tax law, but we anonymise them after account closure.

**6.3 Right to grievance redressal (§13)**
You may submit a grievance to our Grievance Officer using the contact above. If unsatisfied with our response, you may approach the Data Protection Board of India.

**6.4 Right of nomination (§14)**
You may nominate another individual to exercise your rights in case of your death or incapacity. Email this nomination to grievance@formready.in with the nominee's name and contact details.

### 7. Lawful basis for processing

We process personal data on the following lawful bases under §7 of the DPDP Act:

- **Consent (§7(a))** — for marketing communications and product updates. You can withdraw consent at any time by adjusting notification preferences in your Pro profile.
- **Performance of a contract (§7(b))** — for processing payments, providing Pro features, and sending transactional emails (welcome, password reset, receipts).
- **Compliance with legal obligation (§7(d))** — for retaining GST invoices for 8 years per Indian tax law, and for reporting personal data breaches to the Data Protection Board within 72 hours.
- **Legitimate use (§7(g))** — anonymous usage counters and abuse detection are processed under legitimate business interest.

### 8. Data localisation

Pro account data is stored in PostgreSQL on infrastructure located in `[REGION — typically AWS Mumbai (ap-south-1) for Indian users]`. Some operational data (anonymous error reports via Sentry, cookieless analytics via Plausible) is processed on infrastructure outside India under standard contractual safeguards.

### 9. Children

Per §9 of the DPDP Act, processing of personal data of children (under 18 in India) requires parental consent and additional protections. Our Pro tier is intended for users 18 and over; the free tier requires no personal data and is suitable for users 13 and over.

### 10. Personal data breaches

In the unlikely event of a personal data breach affecting Pro account data, per §8(6) of the DPDP Act we will:

- Notify the Data Protection Board of India within 72 hours.
- Notify affected Data Principals (you) without undue delay, with the nature of the breach, what was affected, and recommended steps.
- Provide a remediation report within a reasonable timeframe.

### 11. Significant Data Fiduciary status

Based on our current scale of operations, FormReady is not classified as a Significant Data Fiduciary under §10 of the DPDP Act. If our processing volumes change such that this classification applies, we will appoint a Data Protection Officer, conduct annual data audits, and update this notice accordingly.

### 12. Updates to this notice

We may update this notice as the DPDP Act's rules and adjudicative orders evolve. The "Last updated" date at the top reflects the most recent change.

### 13. Contact

- Grievance Officer: grievance@formready.in — formal grievances
- General privacy: privacy@formready.in
- Data Protection Board of India: dpb.gov.in — for unresolved complaints

---

## 8. Draft — Cookie Policy

> **Status:** v0 draft, last updated 2026-04-01

### 1. What is a cookie?

A cookie is a small text file that a website stores in your browser to remember information between visits. Cookies can be "first-party" (set by the site you're visiting) or "third-party" (set by external services embedded in the page). They can be "session" (deleted when you close the browser) or "persistent" (kept for a set time).

### 2. The complete list of cookies FormReady sets

We use as few cookies as possible. Here is the entire inventory:

| Cookie | Purpose | Type | Lifetime |
|---|---|---|---|
| `NEXT_LOCALE` | Remembers your language preference (English / Hindi). | First-party · Strictly necessary | 365 days |
| `session` (Pro) | Authentication for Pro users (HttpOnly · Secure · SameSite=Lax). | First-party · Strictly necessary | 30 days |
| `cookie-consent` | Remembers that you've seen the cookie banner. | First-party · Strictly necessary | 365 days |
| (Plausible) | Cookieless analytics — Plausible uses no cookies. | N/A | N/A |

### 3. Third-party cookies (when applicable)

The following cookies are set by third-party services, and only when their respective features are active:

- **Google AdSense** — sets cookies on tool and content pages where ads are shown. AdSense uses cookies for fraud prevention, frequency capping, and (with consent) personalised advertising. Manage your AdSense settings at adssettings.google.com.
- **Razorpay** — sets cookies during the checkout flow for fraud prevention and to remember saved payment methods. These cookies are scoped to the Razorpay checkout iframe and never available to FormReady scripts.
- **Cloudflare Turnstile** — invisible captcha; *does not* set cookies under default configuration. Uses ephemeral browser-fingerprinting signals only.

### 4. What we don't do

- We don't use behavioural advertising trackers other than AdSense (and only on pages where ads are displayed).
- We don't use Google Analytics on our own site (we use cookieless Plausible instead).
- We don't use Facebook pixel, LinkedIn pixel, X (Twitter) pixel, or any other social-network tracking.
- We don't sell, rent, or share cookie data with any third party other than as listed above.

### 5. Your control over cookies

You can control cookies in several ways:

1. **Strictly necessary cookies** (the table in §2) cannot be disabled because they are required for the site to function (language preference, authentication). Disabling them in your browser will mean the site can't work properly.
2. **AdSense personalised advertising** can be disabled at adssettings.google.com. Ads will still appear (we need them to fund the free tier) but won't be personalised based on your interests.
3. **Browser-level controls**: every modern browser allows you to block all cookies, block third-party cookies only, or clear cookies on exit.

### 6. Do Not Track

We honour the browser-level "Do Not Track" (DNT) signal where implemented. When DNT is set, we do not send analytics events even to cookieless analytics, and AdSense's personalisation is disabled.

### 7. Updates to this policy

We'll update this policy whenever a cookie is added, removed, or changes purpose. The "Last updated" date at the top reflects the most recent change.

### 8. Questions

For questions about cookies, email privacy@formready.in. See also our broader Privacy Policy.

---

## 9. Quick reference for your reply

For ease of correspondence, we'd appreciate your reply addressing the following in this order:

1. **Quote**: fixed fee for the engagement scope in §4.1, plus optional adds from §4.2 if interested.
2. **Schedule**: when you can return first-pass redlines.
3. **NDA**: do you have a preferred form, or shall we send ours?
4. **Prefatory questions**: factual gaps in this brief that would block your work.
5. **Initial gut-check** (optional): on a 0–10 scale, how comfortable are you with the architecture-first framing as a foundation for our compliance posture? (Helps us calibrate before we start.)

Thank you for reading this far. We're aware this is a long document — we wrote it long because we'd rather over-prepare than waste your time with back-and-forth.

— `[FOUNDER NAME]`, on behalf of `[LEGAL ENTITY NAME]`
hello@formready.in
