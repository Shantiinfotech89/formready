/**
 * FormReady — Design Tokens
 * Direction: Razorpay-grade Indian Fintech-Modern (Option 6 + selective borrowings)
 *
 * Single source of truth for colours, typography, spacing, radius, shadow, motion.
 * All component styling MUST reference these tokens — never raw hex codes.
 *
 * Importable by tailwind.config.ts. See BRAND_GUIDELINES.md for usage rules.
 */

export const colors = {
  brand: {
    primary: '#3D5AFE',
    primaryFg: '#FFFFFF',
    primaryHover: '#3347D9',
    primaryPress: '#2935A8',
    secondary: '#0EA5E9',
    success: '#10B981',
    successStrong: '#047857',
    successSoftBg: '#D1FAE5',
    tactical: '#F97316',
    tacticalSoft: '#FFEDD5',
    danger: '#DC2626',
    dangerSoftBg: '#FEE2E2',
    warning: '#F59E0B',
    warningSoftBg: '#FEF3C7',
  },

  neutral: {
    0: '#FFFFFF',
    25: '#FFFBF5',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  surface: {
    page: '#F8FAFC',
    pageWarm: '#FFFBF5',
    card: '#FFFFFF',
    elevated: '#FFFFFF',
    overlay: 'rgba(2, 6, 23, 0.55)',
    tactical: '#FFEDD5',
  },
} as const

export const fonts = {
  sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
  devanagari: ['var(--font-hind)', 'Hind', 'Inter', 'sans-serif'],
  mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
} as const

export const typography = {
  scale: {
    'display-2xl': ['72px', { lineHeight: '76px', letterSpacing: '-0.04em', fontWeight: '700' }],
    'display-xl':  ['60px', { lineHeight: '64px', letterSpacing: '-0.03em', fontWeight: '700' }],
    'display-lg':  ['48px', { lineHeight: '52px', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-md':  ['36px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
    'display-sm':  ['30px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '600' }],
    '2xl':         ['24px', { lineHeight: '32px', letterSpacing: '-0.005em', fontWeight: '600' }],
    'xl':          ['20px', { lineHeight: '28px', letterSpacing: '0',         fontWeight: '600' }],
    'lg':          ['18px', { lineHeight: '28px', letterSpacing: '0',         fontWeight: '500' }],
    'base':        ['16px', { lineHeight: '24px', letterSpacing: '0',         fontWeight: '400' }],
    'sm':          ['14px', { lineHeight: '20px', letterSpacing: '0',         fontWeight: '400' }],
    'xs':          ['12px', { lineHeight: '16px', letterSpacing: '0.005em',   fontWeight: '500' }],
  },
} as const

export const spacing = {
  px: '1px',
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const

export const containers = {
  narrow: '640px',
  default: '1024px',
  wide: '1280px',
} as const

export const radius = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const

export const shadow = {
  xs: '0 1px 2px rgba(15, 23, 42, 0.04)',
  sm: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
  md: '0 2px 4px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.08)',
  lg: '0 8px 16px rgba(15, 23, 42, 0.08), 0 16px 32px rgba(15, 23, 42, 0.10)',
  xl: '0 16px 32px rgba(61, 90, 254, 0.12), 0 32px 64px rgba(15, 23, 42, 0.10)',
  focus: '0 0 0 3px rgba(61, 90, 254, 0.32)',
  focusSuccess: '0 0 0 3px rgba(16, 185, 129, 0.28)',
} as const

export const motion = {
  duration: {
    instant: '75ms',
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    softSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const brandTokens = {
  colors,
  fonts,
  typography,
  spacing,
  containers,
  radius,
  shadow,
  motion,
  breakpoints,
} as const

export type BrandTokens = typeof brandTokens
