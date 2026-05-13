import { ChevronDown, FileUp, Cog, Download, ServerOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatHappensToYourFileProps {
  className?: string
}

/**
 * Native <details>/<summary> expandable explainer that walks through the
 * exact data path. Stays collapsed by default so users who came to compress
 * aren't blocked, but expands for the curious / privacy-conscious user.
 *
 * Server-component-friendly (no JS); content fully rendered for crawlers.
 * The empty middle of the diagram is the whole point.
 */
export function WhatHappensToYourFile({ className }: WhatHappensToYourFileProps) {
  return (
    <details
      className={cn(
        'group rounded-xl border border-border bg-card transition-[border-color,box-shadow] duration-fast hover:border-primary/30 [&[open]]:border-primary/40 [&[open]]:shadow-sm',
        className,
      )}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 list-none">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-press">
            <ServerOff className="h-4 w-4" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-foreground">
              What exactly happens to your file?
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
              Click to see the full data path. No surprises.
            </p>
          </div>
        </div>
        <ChevronDown
          aria-hidden
          className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-fast ease-out-strong group-open:rotate-180"
        />
      </summary>

      <div className="border-t border-border px-5 py-5">
        {/* Step diagram — step 1, gap (with strikethrough server callout), step 2 */}
        <ol className="space-y-3">
          <Step
            n={1}
            Icon={FileUp}
            title="You drop the file"
            body="Browser reads the file from your local disk into a `File` / `Blob` JavaScript object. This is the standard browser File API — same as any web upload form, except we stop there."
          />

          {/* The "no server" gap — the architectural commitment made visual */}
          <li className="ml-3 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-destructive/40 bg-destructive/[0.04]">
              <ServerOff
                className="h-4 w-4 text-destructive/60"
                strokeWidth={2}
              />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm font-semibold text-destructive">
                No upload here.
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                Other tools insert an upload step at this point. We don&apos;t — there is no server endpoint in our codebase that receives file content.
              </p>
            </div>
          </li>

          <Step
            n={2}
            Icon={Cog}
            title="Browser compresses it"
            body="WebAssembly modules + Canvas APIs run on your device. For PDFs we use pdfjs-dist + pdf-lib (both ~3MB lazy-loaded once). For images we use the browser's built-in JPEG/PNG/WebP encoders + a libheif fallback for older HEIC support. All execution happens in your browser process."
          />

          <Step
            n={3}
            Icon={Download}
            title="You download the result"
            body="The compressed blob lives in browser memory. When you click Download, the browser triggers a local file save. No HTTP request goes out — the only network calls during a compression are loading the engine (cached on first use)."
          />
        </ol>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Verify any of this for yourself: open DevTools (
          <span className="num rounded bg-muted px-1 py-0.5 font-medium text-foreground">⌘ ⌥ I</span>{' '}
          on Mac ·{' '}
          <span className="num rounded bg-muted px-1 py-0.5 font-medium text-foreground">Ctrl Shift I</span>{' '}
          on Windows / Linux), open the Network tab, then run a compression. You&apos;ll see the engine load on first use, then nothing during the actual compression. We have a full live demo at{' '}
          <a
            href="/privacy/verify"
            className="font-medium text-primary-press underline-offset-4 hover:underline"
          >
            /privacy/verify
          </a>
          .
        </p>
      </div>
    </details>
  )
}

function Step({
  n,
  Icon,
  title,
  body,
}: {
  n: number
  Icon: typeof FileUp
  title: string
  body: string
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-press">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
        <span className="num absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
          {n}
        </span>
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-semibold leading-tight text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </li>
  )
}
