'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DevToolsLivePanel } from '@/components/tools/devtools-live-panel'
import { SampleCompressButton } from '@/components/tools/sample-compress-button'

/**
 * Client wrapper: holds the "watching" state shared between the run button and
 * the live network panel. Lives on its own so the page above can stay a Server
 * Component for SEO + perf.
 */
export function VerifyDemo() {
  const [watching, setWatching] = React.useState(false)

  return (
    <Card>
      <CardContent className="space-y-6 p-6 sm:p-8">
        <DevToolsLivePanel watching={watching} />
        <SampleCompressButton
          onWatchStart={() => setWatching(true)}
          onWatchEnd={() => setWatching(false)}
        />
        <p className="text-xs text-muted-foreground">
          The panel above reads from <code className="rounded bg-muted px-1 py-0.5 text-xs">PerformanceObserver</code> —
          the same browser API that powers Chrome DevTools&apos; Network tab. If we
          uploaded your file, you would see it appear here in real time. We
          don&apos;t.
        </p>
      </CardContent>
    </Card>
  )
}
