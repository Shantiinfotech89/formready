'use client'

import * as React from 'react'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NetworkEntry {
  name: string
  initiator: string
  size: number
  duration: number
  startTime: number
  type: string
}

interface DevToolsLivePanelProps {
  /** When set to true, the panel highlights any new entries as red (we shouldn't see any during compression). */
  watching?: boolean
  className?: string
}

/**
 * Live network monitor — reads the page's own Resource Timing entries via
 * PerformanceObserver. During compression, this should show zero new entries —
 * which is the whole point of the privacy verify page.
 */
export function DevToolsLivePanel({ watching = false, className }: DevToolsLivePanelProps) {
  const [entries, setEntries] = React.useState<NetworkEntry[]>([])
  const watchStartRef = React.useRef<number>(0)
  const [newDuringWatch, setNewDuringWatch] = React.useState<number>(0)

  React.useEffect(() => {
    const initial = performance.getEntriesByType('resource').map(toEntry)
    setEntries(initial)

    const obs = new PerformanceObserver((list) => {
      const fresh = list.getEntries().map(toEntry)
      setEntries((prev) => [...prev, ...fresh])
      if (watchStartRef.current > 0) {
        const newOnes = fresh.filter((e) => e.startTime >= watchStartRef.current)
        if (newOnes.length > 0) setNewDuringWatch((n) => n + newOnes.length)
      }
    })
    obs.observe({ type: 'resource', buffered: false })
    return () => obs.disconnect()
  }, [])

  React.useEffect(() => {
    if (watching) {
      watchStartRef.current = performance.now()
      setNewDuringWatch(0)
    } else {
      watchStartRef.current = 0
    }
  }, [watching])

  const recent = entries.slice(-12).reverse()

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-neutral-700 bg-[#0F172A] text-[#E2E8F0] shadow-lg',
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-neutral-700 bg-[#1E293B] px-4 py-2">
        <div className="flex gap-1.5">
          <Circle className="h-2 w-2 fill-red-500 text-red-500" />
          <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500" />
          <Circle className="h-2 w-2 fill-green-500 text-green-500" />
        </div>
        <p className="num text-xs text-neutral-400">DevTools — Network</p>
        <div className="ml-auto flex items-center gap-2 text-xs">
          {watching ? (
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-2 py-0.5 text-red-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              Recording
            </span>
          ) : (
            <span className="text-neutral-500">Idle</span>
          )}
        </div>
      </div>

      {/* Tab strip */}
      <div className="flex gap-3 border-b border-neutral-700 bg-[#0F172A] px-4 py-1.5 text-[11px]">
        <span className="text-neutral-500">Elements</span>
        <span className="text-neutral-500">Console</span>
        <span className="border-b-2 border-primary pb-1 text-white">Network</span>
        <span className="text-neutral-500">Sources</span>
        <span className="text-neutral-500">Performance</span>
      </div>

      {/* Status row */}
      <div className="flex items-center gap-4 border-b border-neutral-800 px-4 py-2 text-xs">
        <span className="num text-neutral-300">
          {entries.length} <span className="text-neutral-500">total</span>
        </span>
        {watching && (
          <span
            className={cn(
              'num font-medium',
              newDuringWatch === 0 ? 'text-emerald-400' : 'text-red-400',
            )}
          >
            {newDuringWatch} new during compression
            {newDuringWatch === 0 && ' ✓'}
          </span>
        )}
      </div>

      {/* Entry list */}
      <div className="max-h-[280px] overflow-y-auto">
        {recent.length === 0 ? (
          <div className="num p-6 text-center text-xs text-neutral-500">
            <p>No network activity captured yet.</p>
            <p className="mt-1 text-neutral-600">Resources from this page will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-500">
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 text-right font-medium">Size</th>
                <th className="px-4 py-2 text-right font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {recent.map((e, i) => {
                const fresh = watching && watchStartRef.current > 0 && e.startTime >= watchStartRef.current
                return (
                  <tr
                    key={`${e.name}-${e.startTime}-${i}`}
                    className={cn(
                      'border-b border-neutral-800/50',
                      fresh ? 'bg-red-500/10 text-red-300' : 'text-neutral-300',
                    )}
                  >
                    <td className="truncate px-4 py-1.5 text-[11px]" title={e.name}>
                      {shortName(e.name)}
                    </td>
                    <td className="px-4 py-1.5 text-[10px] text-neutral-500">{e.type}</td>
                    <td className="px-4 py-1.5 text-right text-[11px]">
                      {fmtBytes(e.size)}
                    </td>
                    <td className="px-4 py-1.5 text-right text-[11px]">
                      {Math.round(e.duration)}ms
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function toEntry(e: PerformanceEntry): NetworkEntry {
  const r = e as PerformanceResourceTiming
  return {
    name: r.name,
    initiator: r.initiatorType ?? '',
    size: r.transferSize ?? 0,
    duration: r.duration,
    startTime: r.startTime,
    type: r.initiatorType ?? 'other',
  }
}

function shortName(url: string) {
  try {
    const u = new URL(url)
    return u.pathname.split('/').filter(Boolean).pop() || u.host
  } catch {
    return url
  }
}

function fmtBytes(b: number) {
  if (b === 0) return '—'
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
  return `${(b / 1024 / 1024).toFixed(1)} MB`
}
