'use client'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Last-resort error boundary. Triggered only when the root layout itself
 * crashes — at which point we can't rely on shared components or theme.
 * Renders its own html/body and a minimal styled fallback.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        style={{
          margin: 0,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          background: '#F8FAFC',
          color: '#0F172A',
          padding: '48px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <p style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', color: '#DC2626', textTransform: 'uppercase' }}>
            Critical error
          </p>
          <p style={{ fontSize: 64, fontWeight: 700, margin: '8px 0 0', color: '#DC2626', letterSpacing: '-0.04em' }}>
            500
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 24, lineHeight: 1.2 }}>
            Compress4 failed to load.
          </h1>
          <p style={{ fontSize: 16, color: '#475569', marginTop: 16, lineHeight: 1.6 }}>
            The application crashed before it could render. Refresh to try again. If the problem persists, email{' '}
            <a href="mailto:bugs@compress4.com" style={{ color: '#2935A8', textDecoration: 'underline' }}>
              bugs@compress4.com
            </a>
            {error.digest ? ` with reference ${error.digest}` : ''}.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 32,
              padding: '12px 24px',
              background: '#3D5AFE',
              color: '#FFFFFF',
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
