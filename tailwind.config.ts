import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:    { DEFAULT: '#3B5A80', dark: '#2d4766', light: '#EEF3F9' },
        dark:       { DEFAULT: '#0f172a', deeper: '#0a1019' },
        accent:     { DEFAULT: '#14B8A6', dark: '#0d9488', light: '#ccfbf1' },
        'discount':  { DEFAULT: '#D9457A', light: '#FDE8EF' },
        navy:       { DEFAULT: '#3B5A80', dark: '#2d4766', deep: '#0f172a', deeper: '#0a1019' },
        teal:       { DEFAULT: '#14B8A6', dark: '#0d9488', light: '#ccfbf1' },
        'bg-primary':   '#ffffff',
        'bg-secondary': '#E8EEF5',
        'bg-tertiary':  '#e2e8f0',
        'bg-soft':      '#f8fafc',
        'bg-muted':     '#E8EEF5',
        'text-primary':   '#0f172a',
        'text-secondary': '#334155',
        'text-tertiary':  '#475569',
        'text-muted':     '#475569',
        'border-default': 'rgba(14,116,144,0.12)',
        'border-soft':    'rgba(14,116,144,0.12)',
        'border-base':    'rgba(14,116,144,0.18)',
        success: '#14B8A6',
        'success-light': '#ccfbf1',
        warning: '#F59E0B',
        'warning-light': '#FEF3C7',
        error:   '#E0455A',
        'error-text': '#DC2626',
        'error-light': '#FEE2E2',
        info:    '#1e3a5f',
        'info-light': '#EEF3F9',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'hsl-primary': {
          DEFAULT: 'hsl(var(--primary-hsl))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        'hsl-accent': {
          DEFAULT: 'hsl(var(--accent-hsl))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      fontFamily: {
        sans: ['IRANSansX', 'Vazirmatn', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'navy': '0 4px 14px rgba(59,90,128,0.2)',
        'teal': '0 4px 14px rgba(20,184,166,0.2)',
        'card': '0 2px 8px rgba(59,90,128,0.06), 0 4px 16px rgba(59,90,128,0.04)',
        'card-hover': '0 8px 30px rgba(59,90,128,0.12)',
        'elevated': '0 8px 30px rgba(10,15,30,0.18)',
      },
      borderRadius: {
        xs:   '6px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        '2xl':'24px',
        '3xl':'32px',
        full: '9999px',
      },
      height: {
        navbar: '76px',
      },
      spacing: {
        section: '4rem',
        'section-lg': '6rem',
        'section-mobile': '3.5rem',
        'section-desktop': '5rem',
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
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'glow-dot': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
        'glow-dot': 'glow-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
