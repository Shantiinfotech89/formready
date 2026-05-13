'use client'

import * as React from 'react'
import { FileText, Upload, X } from 'lucide-react'
import { cn, formatBytes } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { InlineTrustNotice } from './inline-trust-notice'

export type FileDropState = 'idle' | 'hover' | 'active' | 'error'

/** Minimal serializable shape — satisfied by a real `File` and by mock data from server components. */
export interface FileLike {
  name: string
  size: number
  type?: string
}

interface FileDropZoneProps {
  accept?: string
  maxBytes?: number
  state?: FileDropState
  selectedFile?: FileLike | null
  onFileSelected?: (file: File) => void
  onClear?: () => void
  /** Heading shown above the call-to-action */
  heading?: string
  /** Sub-line shown below the heading */
  subheading?: string
  /** Render the InlineTrustNotice above the drop zone in idle state. Defaults true. */
  showTrustNotice?: boolean
  className?: string
}

/**
 * The most-seen single visual on the site. See BRAND_GUIDELINES.md §12 (File drop zone).
 *
 * States:
 *  - idle:   neutral dashed border, neutral surface
 *  - hover:  drag-over — primary border, indigo-tinted background, lifted shadow
 *  - active: file selected — solid green border, success-soft background
 *  - error:  red border + red text, recoverable
 */
export function FileDropZone({
  accept = 'application/pdf,image/*',
  maxBytes = 50 * 1024 * 1024,
  state: stateProp,
  selectedFile,
  onFileSelected,
  onClear,
  heading = 'Drop your file here',
  subheading = 'or click to choose · max 50MB',
  showTrustNotice = true,
  className,
}: FileDropZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [internalState, setInternalState] = React.useState<FileDropState>('idle')
  const state = stateProp ?? internalState

  // Tracks whether to fire the one-shot success pulse animation. We only
  // pulse on the transition from non-active → active, not on every re-render
  // while active.
  const [pulseToken, setPulseToken] = React.useState<number>(0)
  const wasActiveRef = React.useRef<boolean>(false)
  React.useEffect(() => {
    const isNowActive = state === 'active'
    if (isNowActive && !wasActiveRef.current) {
      setPulseToken((t) => t + 1)
    }
    wasActiveRef.current = isNowActive
  }, [state])

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    if (file.size > maxBytes) {
      setInternalState('error')
      return
    }
    setInternalState('active')
    onFileSelected?.(file)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (state !== 'active') setInternalState('hover')
  }
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    if (state === 'hover') setInternalState('idle')
  }
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }
  const onClick = () => inputRef.current?.click()

  const isActive = state === 'active' && selectedFile

  return (
    <div className="space-y-3">
      {showTrustNotice && state === 'idle' && <InlineTrustNotice />}
    <div
      role="button"
      tabIndex={0}
      aria-label="File drop zone"
      onClick={!isActive ? onClick : undefined}
      onKeyDown={(e) => {
        if (!isActive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      // The `key` on this token re-triggers the CSS animation when state goes
      // non-active → active (otherwise the same .drop-success-pulse class
      // wouldn't replay).
      key={`drop-${pulseToken}`}
      className={cn(
        'group relative w-full rounded-xl px-6 py-12 text-center sm:px-12',
        state === 'active' && pulseToken > 0 && 'drop-success-pulse',
        'transition-[background-color,border-color,box-shadow,transform] duration-base ease-out-strong',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-2',
        // Border style by state
        state === 'idle' && 'border-2 border-dashed border-input bg-muted hover:border-primary/60 hover:bg-primary/[0.03] cursor-pointer',
        state === 'hover' && 'border-2 border-primary bg-primary/5 shadow-xl scale-[1.005] cursor-pointer',
        state === 'active' && 'border-2 border-success bg-success-soft/40 cursor-default',
        state === 'error' && 'border-2 border-destructive bg-destructive/5 cursor-pointer',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {isActive ? (
        <div className="mx-auto flex max-w-md items-center gap-3 rounded-lg border bg-card p-3 text-left shadow-xs">
          <FileText className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {selectedFile.name}
            </p>
            <p className="num text-xs text-muted-foreground">
              {formatBytes(selectedFile.size)}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation()
              setInternalState('idle')
              onClear?.()
            }}
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div
            aria-hidden
            className={cn(
              'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-card transition-colors duration-fast',
              state === 'idle' && 'border-2 border-dashed border-primary text-primary',
              state === 'hover' && 'border-2 border-primary bg-primary text-primary-foreground',
              state === 'error' && 'border-2 border-destructive text-destructive',
            )}
          >
            <Upload className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h4 className={cn(
            'text-lg font-semibold',
            state === 'error' ? 'text-destructive' : 'text-foreground',
          )}>
            {state === 'error' ? 'File too large' : heading}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {state === 'error' ? `Max size is ${formatBytes(maxBytes)}.` : subheading}
          </p>
        </>
      )}
    </div>
    </div>
  )
}
