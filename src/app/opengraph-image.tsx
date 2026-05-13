import { ImageResponse } from 'next/og'

/**
 * Default Open Graph card for the site. Next.js auto-injects this as
 * <meta property="og:image"> on every route that doesn't define its own
 * `opengraph-image.tsx`. Rendered at edge / build time — no real PNG file
 * needs to live in /public.
 */

export const runtime = 'edge'
export const alt = 'FormReady — get your documents form-ready, without uploading them.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 60%, #E0E7FF 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top row: brand mark + privacy badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #3D5AFE 0%, #0EA5E9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              f
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
              }}
            >
              FormReady
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 999,
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1.5px solid rgba(16, 185, 129, 0.3)',
              color: '#047857',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Stays on your device
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: '#0F172A',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: 1000,
            }}
          >
            Compress your file —
            <br />
            <span style={{ color: '#3D5AFE' }}>without uploading it.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: '#475569',
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Type the exact KB. We hit it. PDF · JPG · PNG · HEIC · WebP — all
            processed locally in your browser.
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#64748B',
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: '#10B981',
            }}
          />
          formready.in
        </div>
      </div>
    ),
    { ...size },
  )
}
