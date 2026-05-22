import type { Metadata } from 'next'
import { ArrowRight, Download, Lock, Sparkles, Trash2 } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Wordmark } from '@/components/brand/wordmark'
import { FTile } from '@/components/brand/ftile'
import { PrivacyLockup } from '@/components/brand/privacy-lockup'
import { TrustStrip } from '@/components/brand/trust-strip'
import { FileDropZone } from '@/components/tools/file-drop-zone'
import { KbTargetInput } from '@/components/tools/kb-target-input'
import { ResultPanel } from '@/components/tools/result-panel'
import { PresetChips } from '@/components/tools/preset-chips'

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Internal reference for Compress4 tokens, components, and patterns.',
  robots: { index: false, follow: false },
}

const colorTokens = [
  { name: 'Form Indigo', token: '--primary', cls: 'bg-primary', hex: '#3D5AFE', role: 'Primary CTAs, brand mark, focus rings.' },
  { name: 'Indigo Press', token: '--primary-press', cls: 'bg-primary-press', hex: '#2935A8', role: 'Pressed state, link text on light (AAA).' },
  { name: 'Precision Blue', token: '--secondary', cls: 'bg-secondary', hex: '#0EA5E9', role: 'Progress, info, "exact KB" feature accent.' },
  { name: 'Achievement Green', token: '--success', cls: 'bg-success', hex: '#10B981', role: 'Success, file ready, privacy lockup.' },
  { name: 'Success Strong', token: '--success-strong', cls: 'bg-success-strong', hex: '#047857', role: 'Success text on light (AA on white).' },
  { name: 'Saffron Tactical', token: '--tactical', cls: 'bg-tactical', hex: '#F97316', role: 'Indian-keyword landing pages only · max 5% surface.', tactical: true },
  { name: 'Destructive', token: '--destructive', cls: 'bg-destructive', hex: '#DC2626', role: 'Field errors, destructive confirms.' },
  { name: 'Warning', token: '--warning', cls: 'bg-warning', hex: '#F59E0B', role: 'Spec-changed banners, validation warnings.' },
]

const neutralTokens = [
  { name: 'Off-white Warm', token: '--surface-page-warm', cls: 'bg-surface-page-warm border', hex: '#FFFBF5', role: 'Long-form pages — blog, FAQ, help.' },
  { name: 'Page Background', token: '--background', cls: 'bg-background border', hex: '#F8FAFC', role: 'Default page surface.' },
  { name: 'Muted', token: '--muted', cls: 'bg-muted border', hex: '#F1F5F9', role: 'Subtle surface, chips.' },
  { name: 'Border', token: '--border', cls: 'bg-border', hex: '#E2E8F0', role: 'Borders, dividers.' },
  { name: 'Body Secondary', token: '--muted-foreground', cls: 'bg-muted-foreground', hex: '#475569', role: 'Lede, secondary text.' },
  { name: 'Body Default', token: '--foreground', cls: 'bg-foreground', hex: '#0F172A', role: 'Body text default · AAA.' },
]

const typeScale = [
  { name: 'display-xl', cls: 'text-display-xl', meta: '60 / 64 / -0.03em / 700', sample: 'Get your documents form-ready.' },
  { name: 'display-lg', cls: 'text-display-lg', meta: '48 / 52 / -0.02em / 700', sample: 'Compress PDF under 100KB' },
  { name: 'display-md', cls: 'text-display-md', meta: '36 / 40 / -0.02em / 700', sample: 'Why Compress4 is different' },
  { name: '2xl', cls: 'text-2xl font-semibold', meta: '24 / 32 / 600', sample: 'SSC CGL Photo Specifications' },
  { name: 'xl', cls: 'text-xl font-semibold', meta: '20 / 28 / 600', sample: 'Drop your PDF or click to choose' },
  { name: 'lg lede', cls: 'text-lg font-medium', meta: '18 / 28 / 500', sample: 'Type the exact KB. We hit it. Your file never leaves your device.' },
  { name: 'base body', cls: 'text-base', meta: '16 / 24 / 400', sample: 'Compress4 accepts an exact target size in KB as the primary input.' },
  { name: 'sm helper', cls: 'text-sm text-muted-foreground', meta: '14 / 20 / 400', sample: 'Specs from ssc.nic.in (verified Mar 2026)' },
]

function Section({
  eyebrow,
  title,
  lede,
  children,
  id,
}: {
  eyebrow: string
  title: string
  lede?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="border-b border-border py-20 first:pt-12">
      <div className="container-default">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-display-md font-bold tracking-tight">{title}</h2>
        {lede && (
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{lede}</p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

function ComponentCard({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  )
}

export default function DesignSystemPage() {
  const sections = [
    { id: 'identity', label: 'Identity' },
    { id: 'color', label: 'Colour' },
    { id: 'type', label: 'Typography' },
    { id: 'components', label: 'Components' },
    { id: 'tools', label: 'Tool primitives' },
    { id: 'privacy', label: 'Privacy lockup' },
    { id: 'tactical', label: 'Tactical (saffron)' },
  ]

  return (
    <>
      <SiteHeader />

      {/* Section nav */}
      <div className="sticky top-14 z-30 border-b border-border bg-card/85 backdrop-blur-md">
        <div className="container-default flex items-center gap-1 overflow-x-auto py-2 text-sm">
          <span className="mr-3 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Design system
          </span>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <main>
        {/* INTRO */}
        <div className="border-b border-border bg-gradient-to-b from-card to-background">
          <div className="container-default py-16">
            <Badge variant="info" className="mb-4">
              <Sparkles className="h-3 w-3" /> Internal · noindex
            </Badge>
            <h1 className="text-display-lg font-bold tracking-tight">Compress4 Design System</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Living reference for tokens, components, and patterns. Every component on this page maps 1:1 to a rule in <code className="rounded bg-muted px-1.5 py-0.5 text-sm">BRAND_GUIDELINES.md</code>.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="success">v0.1</Badge>
              <Badge variant="outline">Razorpay-grade Indian Fintech-Modern</Badge>
              <Badge variant="outline">Next.js 14 · App Router</Badge>
              <Badge variant="outline">Tailwind · shadcn/ui</Badge>
              <Badge variant="outline">Inter · Hind · JetBrains Mono</Badge>
            </div>
          </div>
        </div>

        {/* IDENTITY */}
        <Section
          id="identity"
          eyebrow="01 · Identity"
          title="Wordmark, F-tile, tagline."
          lede="Lowercase wordmark in two-tone — indigo for 'form', green for 'ready'. The F-tile is the square symbol for app icons, favicons, and social avatars."
        >
          <div className="rounded-2xl border bg-gradient-to-br from-card to-primary/[0.04] p-12 text-center">
            <Wordmark size="xl" />
            <p className="mt-6 text-xl text-muted-foreground">Get your documents form-ready.</p>
            <p className="mt-2 font-devanagari text-lg text-muted-foreground/80">आपके फॉर्म के लिए तैयार.</p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <FTile size="lg" />
              <FTile size="md" />
              <FTile size="sm" />
              <FTile size="xs" />
              <div className="num text-left text-xs text-muted-foreground">
                <p>96 px — app icon</p>
                <p>64 px — header / social</p>
                <p>48 px — header alt</p>
                <p>32 px — favicon</p>
              </div>
            </div>
          </div>
        </Section>

        {/* COLOR */}
        <Section
          id="color"
          eyebrow="02 · Colour"
          title="A disciplined palette."
          lede="Indigo carries trust and primary action. Blue carries progress. Green carries success and privacy. Saffron tint is tactical — Indian-keyword pages only, max 5% surface."
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Brand & semantic</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {colorTokens.map((t) => (
              <Card key={t.token} className="overflow-hidden">
                <div className={`relative h-24 ${t.cls}`}>
                  <span className="num absolute right-3 top-3 rounded-full bg-card/95 px-2 py-0.5 text-[11px] font-medium text-foreground">
                    {t.hex}
                  </span>
                </div>
                <div className="p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    {t.name}
                    {t.tactical && <Badge variant="tactical">Tactical</Badge>}
                  </p>
                  <p className="num mt-1 text-[11px] text-muted-foreground">{t.token}</p>
                  <p className="mt-2 text-xs leading-snug text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>

          <p className="mb-3 mt-12 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Neutrals</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {neutralTokens.map((t) => (
              <Card key={t.token} className="overflow-hidden">
                <div className={`relative h-24 ${t.cls}`}>
                  <span className="num absolute right-3 top-3 rounded-full bg-card/95 px-2 py-0.5 text-[11px] font-medium text-foreground">
                    {t.hex}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="num mt-1 text-[11px] text-muted-foreground">{t.token}</p>
                  <p className="mt-2 text-xs leading-snug text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* TYPOGRAPHY */}
        <Section
          id="type"
          eyebrow="03 · Typography"
          title="Inter for English, Hind for Hindi, JetBrains Mono for numbers."
          lede="A 1.250 modular scale anchored at 16px. Numbers that matter (KB, file sizes, progress) always run in mono — visual proof that the number is precise, not marketing."
        >
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {typeScale.map((t) => (
                <div
                  key={t.name}
                  className="grid gap-4 px-6 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline"
                >
                  <div className="num text-[11px] text-muted-foreground">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="mt-1">{t.meta}</p>
                  </div>
                  <p className={t.cls}>{t.sample}</p>
                </div>
              ))}
              <div className="grid gap-4 px-6 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline">
                <div className="num text-[11px] text-muted-foreground">
                  <p className="font-semibold text-foreground">mono — KB</p>
                  <p className="mt-1">JetBrains Mono / 24 / 500</p>
                </div>
                <p className="num text-2xl font-medium">98KB · was 2.4MB · −96%</p>
              </div>
              <div className="grid gap-4 px-6 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline">
                <div className="num text-[11px] text-muted-foreground">
                  <p className="font-semibold text-foreground">Hind 600 — Hindi</p>
                  <p className="mt-1">Devanagari display</p>
                </div>
                <p className="font-devanagari text-display-md font-semibold">आपके फॉर्म के लिए तैयार</p>
              </div>
              <div className="grid gap-4 px-6 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline">
                <div className="num text-[11px] text-muted-foreground">
                  <p className="font-semibold text-foreground">Hind 400 — body Hi</p>
                  <p className="mt-1">16 / 26 / 400</p>
                </div>
                <p className="font-devanagari text-base leading-7">
                  100KB से कम साइज़ चाहिए? बस फ़ाइल ड्रॉप करें — हम बाकी संभाल लेंगे। आपकी फ़ाइल आपके फ़ोन से बाहर नहीं जाती।
                </p>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* COMPONENTS */}
        <Section
          id="components"
          eyebrow="04 · Components"
          title="Buttons, inputs, badges."
          lede="Primary indigo CTA per page. Green for download/success. Saffron never touches buttons — it stays decorative."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ComponentCard label="Buttons">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Compress to 100KB</Button>
                <Button variant="secondary">Try image</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button variant="success">
                  <Download className="h-4 w-4" />
                  Download (98KB)
                </Button>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete account
                </Button>
                <Button variant="link">Learn more →</Button>
              </div>
              <div className="mt-4">
                <Button variant="glow" size="lg">
                  Get started — it&apos;s free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Lock">
                  <Lock className="h-4 w-4" />
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </ComponentCard>

            <ComponentCard label="Inputs">
              <div className="space-y-2">
                <Label htmlFor="ds-email">Email</Label>
                <Input id="ds-email" type="email" placeholder="you@example.com" defaultValue="aspirant@gmail.com" />
                <p className="text-xs text-muted-foreground">We&apos;ll never spam.</p>
              </div>
              <Separator className="my-5" />
              <div className="space-y-2">
                <Label htmlFor="ds-num">Mono input (KB)</Label>
                <Input id="ds-num" className="num text-2xl font-semibold tracking-tight" defaultValue="100" />
                <p className="text-xs text-muted-foreground">JetBrains Mono — emphasizes precision.</p>
              </div>
            </ComponentCard>

            <ComponentCard label="Badges">
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">✓ File ready</Badge>
                <Badge variant="info">PDF · 98KB</Badge>
                <Badge variant="warning">⚠ Spec changed</Badge>
                <Badge variant="destructive">✗ Too large</Badge>
                <Badge variant="neutral">Optional</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Tactical (Indian-keyword pages only):</p>
              <div className="mt-2">
                <Badge variant="tactical">Updated for 2026 SSC notification</Badge>
              </div>
            </ComponentCard>

            <ComponentCard label="Progress">
              <div className="space-y-3">
                <Progress value={73} aria-label="Compressing" />
                <p className="num text-sm text-muted-foreground">
                  Compressing… <span className="font-medium text-foreground">73%</span>
                </p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <Progress value={100} aria-label="Done" />
                <p className="num text-sm text-success-strong font-medium">Done · 98KB</p>
              </div>
            </ComponentCard>

            <ComponentCard label="Preset chips">
              <p className="mb-3 text-sm text-muted-foreground">Common KB targets, one-click apply.</p>
              <PresetChips
                values={[100, 200, 500, 1000, 2000]}
                selected={200}
                unit="KB"
              />
            </ComponentCard>

            <ComponentCard label="Cards">
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="p-4">
                  <p className="text-sm font-semibold">Default card</p>
                  <p className="text-xs text-muted-foreground">8px radius · subtle shadow</p>
                </Card>
                <Card variant="marketing" className="p-4">
                  <p className="text-sm font-semibold">Marketing card</p>
                  <p className="text-xs text-muted-foreground">16px radius · lifts on hover</p>
                </Card>
              </div>
            </ComponentCard>
          </div>
        </Section>

        {/* TOOL PRIMITIVES */}
        <Section
          id="tools"
          eyebrow="05 · Tool primitives"
          title="The components our product is built from."
          lede="The drop zone, the KB target, the result panel — these carry the actual product experience. Polish here is non-negotiable."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ComponentCard label="File drop zone — idle">
              <FileDropZone
                heading="Drop your PDF here"
                subheading="or click to browse · max 50MB"
              />
            </ComponentCard>

            <ComponentCard label="File drop zone — active (file selected)">
              <FileDropZone
                state="active"
                selectedFile={{
                  name: 'applicant_marksheet.pdf',
                  size: 2_400_000,
                  type: 'application/pdf',
                }}
              />
            </ComponentCard>

            <ComponentCard label="KB target input">
              <KbTargetInput helper="Auto-set for SSC CGL preset." />
            </ComponentCard>

            <ComponentCard label="Result panel (success)">
              <ResultPanel finalKb={98} originalBytes={2_400_000} />
            </ComponentCard>
          </div>
        </Section>

        {/* PRIVACY LOCKUP */}
        <Section
          id="privacy"
          eyebrow="06 · Privacy lockup"
          title="The most brand-load-bearing micro-component."
          lede="Carries the privacy USP on every single page. Three placements: footer, below the file-drop zone, and as an expanded trust strip on the homepage."
        >
          <div className="space-y-6">
            <ComponentCard label="Compact (below file-drop)">
              <PrivacyLockup variant="compact" />
            </ComponentCard>
            <ComponentCard label="Footer variant (used on dark surfaces)">
              <div className="rounded-lg bg-foreground p-4">
                <PrivacyLockup variant="footer" className="text-background/70" />
              </div>
            </ComponentCard>
            <ComponentCard label="Expanded trust strip (homepage hero)">
              <TrustStrip />
            </ComponentCard>
          </div>
        </Section>

        {/* TACTICAL */}
        <Section
          id="tactical"
          eyebrow="07 · Tactical (saffron)"
          title="Strict discipline preserves the brand."
          lede="Saffron tint applies ONLY on Indian-keyword landing pages (SSC, UPSC, NEET, IBPS, GATE, etc.). Never on homepage, visa pages, or marketing. Total surface ≤ 5%."
        >
          <Card variant="warm" className="overflow-hidden">
            <div className="tactical-bar" />
            <div className="p-12 text-center">
              <h3 className="text-display-md font-bold leading-tight tracking-tight">
                SSC CGL <span className="saffron-underline">Photo Size</span>
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                SSC CGL needs your photo at <span className="num">200×230 px</span> and <span className="num">20–50 KB</span>. Saffron appears: top accent bar (4px), keyword underline (3px highlight), source-citation chip below.
              </p>
              <div className="mt-6">
                <Badge variant="tactical">● Updated for 2026 SSC notification (Mar 12)</Badge>
              </div>
              <Separator className="my-8" />
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Allowed surfaces</p>
              <ul className="mx-auto max-w-md text-left text-sm text-muted-foreground">
                <li>✓ 4px top accent bar</li>
                <li>✓ H1 keyword underline (highlighter style)</li>
                <li>✓ Spec callout chip (&ldquo;Updated for…&rdquo;)</li>
                <li>✓ Source-citation icon</li>
                <li className="mt-3 text-destructive">✗ NEVER buttons, drop zones, success states, body text, or surfaces over 5% of viewport</li>
              </ul>
            </div>
          </Card>
        </Section>

        {/* MOTION */}
        <Section
          eyebrow="08 · Motion"
          title="Emil-grade easing, scale-on-press, no scale(0)."
          lede="Custom easing curves (ease-out-strong, ease-in-out-strong, ease-soft-spring). Buttons scale to 0.97 on press. Tooltips and popovers scale from 0.96, never from 0. Respects prefers-reduced-motion."
        >
          <Card>
            <CardContent className="p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Try pressing these — they feel responsive
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Press me</Button>
                <Button variant="success">Download</Button>
                <Button variant="glow" size="lg">Hero CTA</Button>
              </div>
              <Separator className="my-6" />
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="font-medium text-muted-foreground">Button press</dt>
                  <dd className="num text-foreground">scale(0.97) · 150ms · ease-out-strong</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="font-medium text-muted-foreground">Tooltip / popover</dt>
                  <dd className="num text-foreground">scale(0.96) → 1 · origin: trigger</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="font-medium text-muted-foreground">File drop hover</dt>
                  <dd className="num text-foreground">scale(1.005) · border-color · 200ms</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="font-medium text-muted-foreground">Result reveal</dt>
                  <dd className="num text-foreground">opacity + zoom-in-95 · 500ms · soft-spring</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="font-medium text-muted-foreground">Reduced motion</dt>
                  <dd className="num text-foreground">all → 0.01ms (collapsed)</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="font-medium text-muted-foreground">Hover gating</dt>
                  <dd className="num text-foreground">@media (hover: hover) · no false-positive on touch</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </Section>
      </main>

      <SiteFooter />
    </>
  )
}
