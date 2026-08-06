import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

/**
 * Theme values now read from CSS custom properties defined in
 * src/styles/tokens.css, which is itself generated from design-tokens.json.
 * Raw hex literals are kept ONLY for the palette, where Tailwind needs a
 * concrete colour to synthesise opacity modifiers (bg-primary/10 etc.).
 * Everything else — shadows, radii, type scale, spacing — defers to tokens
 * so there is one source of truth instead of two drifting copies.
 */
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#3B5A80', dark: '#2D4766', light: '#EEF3F9' },
        dark: { DEFAULT: '#0F172A', deeper: '#0A1019' },
        accent: { DEFAULT: '#14B8A6', dark: '#0F766E', light: '#CCFBF1' },
        discount: { DEFAULT: '#D9457A', light: '#FDE8EF' },
        navy: { DEFAULT: '#3B5A80', dark: '#2D4766', deep: '#0F172A', deeper: '#0A1019' },
        teal: { DEFAULT: '#14B8A6', dark: '#0F766E', light: '#CCFBF1' },
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#E8EEF5',
        'bg-tertiary': '#E2E8F0',
        'bg-soft': '#F8FAFC',
        'bg-muted': '#E8EEF5',
        'text-primary': '#0F172A',
        'text-secondary': '#374151',
        'text-tertiary': '#6B7280',
        'text-muted': '#6B7280',
        'border-default': 'rgba(59,90,128,.12)',
        'border-soft': 'rgba(59,90,128,.12)',
        'border-base': 'rgba(59,90,128,.2)',
        // FIX: HeroSection uses `border-hairline` as a Tailwind border colour,
        // but it only existed as a raw CSS utility — the class silently no-opped.
        'border-hairline': 'rgba(59,90,128,.14)',
        success: '#14B8A6',
        'success-light': '#CCFBF1',
        warning: '#B45309',
        'warning-light': '#FEF3C7',
        // FIX: badge.tsx referenced `amber`, which was never defined.
        amber: { DEFAULT: '#B45309', light: '#FEF3C7' },
        error: '#E0455A',
        'error-text': '#DC2626',
        'error-light': '#FEE2E2',
        info: '#3B5A80',
        'info-light': '#EEF3F9',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'hsl-primary': { DEFAULT: 'hsl(var(--primary-hsl))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        'hsl-accent': { DEFAULT: 'hsl(var(--accent-hsl))', foreground: 'hsl(var(--accent-foreground))' },
      },

      // FIX: pull Vazirmatn from the next/font variable layout.tsx already
      // defines, and put it first — it was second behind IRANSansX.
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'Vazirmatn', 'IRANSansX', 'system-ui', 'sans-serif'],
      },

      // Fluid type scale. Persian body copy gets 1.75 leading; headings 1.2–1.35.
      fontSize: {
        display: ['var(--text-display)', { lineHeight: 'var(--leading-display)', fontWeight: '700' }],
        h1: ['var(--text-h1)', { lineHeight: 'var(--leading-display)', fontWeight: '700' }],
        h2: ['var(--text-h2)', { lineHeight: 'var(--leading-heading)', fontWeight: '700' }],
        h3: ['var(--text-h3)', { lineHeight: 'var(--leading-heading)', fontWeight: '600' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body)' }],
        'body-base': ['var(--text-body-base)', { lineHeight: 'var(--leading-body)' }],
      },
      lineHeight: {
        display: 'var(--leading-display)',
        heading: 'var(--leading-heading)',
        body: 'var(--leading-body)',
      },

      backgroundImage: {
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-brand-subtle': 'var(--gradient-brand-subtle)',
        'gradient-brand-sheen': 'var(--gradient-brand-sheen)',
      },

      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-hover)',
        elevated: 'var(--shadow-elevated)',
        // FIX: HeroSection's primary CTA uses shadow-navy, never defined.
        navy: 'var(--shadow-navy)',
        'accent-glow': 'var(--shadow-accent)',
      },

      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },

      height: { navbar: 'var(--navbar-height)' },
      minHeight: { touch: 'var(--touch-target-min)' },
      minWidth: { touch: 'var(--touch-target-min)' },

      spacing: {
        section: '4rem',
        'section-lg': '5rem',
        'section-mobile': 'var(--section-y-mobile)',
        'section-desktop': 'var(--section-y-desktop)',
      },

      transitionTimingFunction: {
        settle: 'cubic-bezier(0.16, 1, 0.3, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      transitionDuration: {
        fast: '140ms',
        base: '200ms',
        moderate: '280ms',
        slow: '400ms',
      },

      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'scale-in': { from: { opacity: '0', transform: 'scale(.97)' }, to: { opacity: '1', transform: 'scale(1)' } },
        // FIX: physical translateX(±100%) was semantically inverted for an RTL
        // drawer. --dir (set on html[dir]) flips travel per direction, so one
        // keyframe is correct in both RTL and LTR.
        'slide-in-start': { from: { transform: 'translateX(calc(100% * var(--dir, -1)))' }, to: { transform: 'translateX(0)' } },
        'slide-in-end': { from: { transform: 'translateX(calc(-100% * var(--dir, -1)))' }, to: { transform: 'translateX(0)' } },
        // FIX: both referenced by HeroSection, neither previously existed.
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'pulse-ring': { '0%': { transform: 'scale(.5)', opacity: '.55' }, '100%': { transform: 'scale(1.4)', opacity: '0' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
        'fade-in': 'fade-in 360ms cubic-bezier(.16,1,.3,1)',
        'scale-in': 'scale-in 200ms cubic-bezier(.16,1,.3,1)',
        'slide-in-start': 'slide-in-start 280ms cubic-bezier(.16,1,.3,1)',
        'slide-in-end': 'slide-in-end 280ms cubic-bezier(.16,1,.3,1)',
        float: 'float 6s cubic-bezier(.4,0,.2,1) infinite',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(.4,0,.2,1) infinite',
        shimmer: 'shimmer 1.2s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
