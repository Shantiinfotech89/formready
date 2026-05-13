import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
          press: 'hsl(var(--primary-press))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          strong: 'hsl(var(--success-strong))',
          soft: 'hsl(var(--success-soft))',
        },
        tactical: {
          DEFAULT: 'hsl(var(--tactical))',
          foreground: 'hsl(var(--tactical-foreground))',
          soft: 'hsl(var(--tactical-soft))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          soft: 'hsl(var(--destructive-soft))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          soft: 'hsl(var(--warning-soft))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          warm: 'hsl(var(--card-warm))',
        },
        surface: {
          page: 'hsl(var(--surface-page))',
          'page-warm': 'hsl(var(--surface-page-warm))',
          card: 'hsl(var(--surface-card))',
          tactical: 'hsl(var(--surface-tactical))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-hind)', 'Hind', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '76px', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-xl':  ['60px', { lineHeight: '64px', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg':  ['48px', { lineHeight: '52px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md':  ['36px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm':  ['30px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(15, 23, 42, 0.04)',
        sm: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        md: '0 2px 4px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.08)',
        lg: '0 8px 16px rgba(15, 23, 42, 0.08), 0 16px 32px rgba(15, 23, 42, 0.10)',
        xl: '0 16px 32px rgba(61, 90, 254, 0.12), 0 32px 64px rgba(15, 23, 42, 0.10)',
        focus: '0 0 0 3px rgba(61, 90, 254, 0.32)',
        'focus-success': '0 0 0 3px rgba(16, 185, 129, 0.28)',
      },
      transitionDuration: {
        instant: '75ms',
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        // Emil-grade strong easing curves — the built-in CSS ones are too weak
        'ease-out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'ease-in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'ease-drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'ease-soft-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms cubic-bezier(0.23, 1, 0.32, 1)',
        'accordion-up': 'accordion-up 150ms cubic-bezier(0.4, 0, 1, 1)',
      },
    },
  },
  plugins: [animatePlugin],
}

export default config
