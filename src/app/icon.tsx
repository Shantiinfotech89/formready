import { ImageResponse } from 'next/og'

/**
 * 32x32 PNG favicon — generated at build time, served at /icon.
 * Older browsers / RSS readers / link-unfurlers that can't handle SVG fall
 * back to this raster variant automatically.
 */

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3D5AFE 0%, #0EA5E9 100%)',
          color: 'white',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: 7,
        }}
      >
        f
      </div>
    ),
    { ...size },
  )
}
