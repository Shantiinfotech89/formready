'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DevToolsLivePanel } from '@/components/tools/devtools-live-panel'
import { SampleCompressButton } from '@/components/tools/sample-compress-button'

/**
 * Homepage-suitable wrapper around the live network monitor + sample compress
 * button. Different from the more elaborate /privacy/verify page wrapper —
 * trimmed to fit a homepage section, no step-by-step instructions (those live
 * on /privacy/verify for the deep dive).
 */
export function LiveVerifyEmbed() {
  const [watching, setWatching] = React.useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-5 p-5 sm:p-7">
        <DevToolsLivePanel watching={watching} />
        <SampleCompressButton
          onWatchStart={() => setWatching(true)}
          onWatchEnd={() => setWatching(false)}
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Open DevTools right now (
          <span className="num rounded bg-muted px-1.5 py-0.5 font-medium text-foreground">⌘ ⌥ I</span>{' '}
          on Mac ·{' '}
          <span className="num rounded bg-muted px-1.5 py-0.5 font-medium text-foreground">Ctrl Shift I</span>{' '}
          on Windows / Linux), click <strong>Network</strong>, then click the
          button above. The panel here mirrors what your browser sees — zero
          new requests will appear during compression.
        </p>
      </CardContent>
    </Card>
  )
}
