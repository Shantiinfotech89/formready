import Link from 'next/link'
import {
  ArrowUpRight,
  CloudOff,
  EyeOff,
  Github,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Commitment {
  Icon: typeof CloudOff
  title: string
  body: string
  cta: string
  href: string
  external?: boolean
}

const COMMITMENTS: Commitment[] = [
  {
    Icon: CloudOff,
    title: 'No upload endpoint',
    body: 'Our codebase contains zero server routes that receive file content. Architectural, not policy.',
    cta: 'Audit the routes',
    href: '/security/routes-audit',
    // external: true,
  },
  {
    Icon: Github,
    title: 'Open-source compression engine',
    body: 'Fork it, audit it, run it offline. We open-source the compression logic under MIT.',
    cta: 'View on GitHub',
    href: 'https://github.com',
    external: true,
  },
  {
    Icon: EyeOff,
    title: 'No file fingerprinting',
    body: 'We don\'t log file names, hashes, sizes, or any derived metadata. We log nothing about your file.',
    cta: 'Read the privacy policy',
    href: '/privacy',
  },
  {
    Icon: ShieldCheck,
    title: 'Self-verifiable',
    body: 'Every claim above is checkable by you in 30 seconds, in any modern browser, with the built-in DevTools.',
    cta: 'Run the live demo',
    href: 'privacy/verify',
  },
]

export function ArchitecturalCommitments({ className }: { className?: string }) {
  return (
    <div className={cn('stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {COMMITMENTS.map((c) => (
        <CommitmentCard key={c.title} commitment={c} />
      ))}
    </div>
  )
}

function CommitmentCard({ commitment: c }: { commitment: Commitment }) {
  const ctaClasses =
    'mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-press transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:underline rounded-sm'

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-xs transition-[transform,box-shadow] duration-base ease-out-strong hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success-strong">
        <c.Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="text-base font-semibold leading-tight text-foreground">{c.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-snug text-muted-foreground">{c.body}</p>
      {c.external ? (
        <a href={c.href} target="_blank" rel="noreferrer" className={ctaClasses}>
          {c.cta}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      ) : (
        <Link href={c.href} className={ctaClasses}>
          {c.cta}
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}
