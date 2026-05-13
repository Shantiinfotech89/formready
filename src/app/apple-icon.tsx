import { ImageResponse } from 'next/og'

/**
 * 180x180 PNG apple touch icon — used when users add the site to their home
 * screen on iOS. Rendered with extra padding so iOS's auto-rounded-mask
 * doesn't clip the glyph.
 */

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          fontSize: 120,
          fontWeight: 700,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        f
      </div>
    ),
    { ...size },
  )
}
