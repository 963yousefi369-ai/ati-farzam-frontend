---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web and mobile. Includes 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 10 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, and HTML/CSS). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, and check UI/UX code."
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 50+ styles, 161 color palettes, 57 font pairings, 161 product types with reasoning rules, 99 UX guidelines, and 25 chart types across 10 technology stacks.

## When to Apply

### Must Use

- Designing new pages (Landing Page, Dashboard, Admin, SaaS, Mobile App)
- Creating or refactoring UI components
- Choosing color schemes, typography systems, spacing standards
- Reviewing UI code for accessibility or visual consistency
- Implementing navigation structures, animations, or responsive behavior

### Skip

- Pure backend logic development
- Only involving API or database design
- Non-visual scripts or automation tasks

## Rule Categories by Priority

| Priority | Category | Impact | Key Checks |
|----------|----------|--------|------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels |
| 2 | Touch & Interaction | CRITICAL | Min size 44×44px, 8px+ spacing, Loading feedback |
| 3 | Performance | HIGH | WebP/AVIF, Lazy loading, CLS < 0.1 |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons |
| 5 | Layout & Responsive | HIGH | Mobile-first, Viewport meta, No horizontal scroll |
| 6 | Typography & Color | MEDIUM | Base 16px, Line-height 1.5, Semantic tokens |
| 7 | Animation | MEDIUM | Duration 150–300ms, Motion conveys meaning |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Helper text |
| 9 | Navigation Patterns | HIGH | Predictable back, Bottom nav ≤5, Deep linking |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors |

## Quick Reference

### 1. Accessibility (CRITICAL)

- `color-contrast` - Minimum 4.5:1 ratio for normal text (large text 3:1)
- `focus-states` - Visible focus rings on interactive elements (2–4px)
- `alt-text` - Descriptive alt text for meaningful images
- `aria-labels` - aria-label for icon-only buttons
- `keyboard-nav` - Tab order matches visual order
- `form-labels` - Use label with for attribute
- `heading-hierarchy` - Sequential h1→h6, no level skip
- `color-not-only` - Don't convey info by color alone
- `reduced-motion` - Respect prefers-reduced-motion

### 2. Touch & Interaction (CRITICAL)

- `touch-target-size` - Min 44×44pt (Apple) / 48×48dp (Material)
- `touch-spacing` - Minimum 8px gap between touch targets
- `hover-vs-tap` - Use click/tap for primary interactions
- `loading-buttons` - Disable button during async operations
- `cursor-pointer` - Add cursor-pointer to clickable elements
- `press-feedback` - Visual feedback on press

### 3. Performance (HIGH)

- `image-optimization` - Use WebP/AVIF, responsive images, lazy load
- `image-dimension` - Declare width/height to prevent layout shift
- `font-loading` - Use font-display: swap/optional
- `bundle-splitting` - Split code by route/feature
- `lazy-load-below-fold` - Use loading="lazy" for below-the-fold images
- `virtualize-lists` - Virtualize lists with 50+ items

### 4. Style Selection (HIGH)

- `style-match` - Match style to product type
- `consistency` - Use same style across all pages
- `no-emoji-icons` - Use SVG icons (Heroicons, Lucide), not emojis
- `color-palette-from-product` - Choose palette from product/industry
- `elevation-consistent` - Use consistent elevation/shadow scale
- `dark-mode-pairing` - Design light/dark variants together

### 5. Layout & Responsive (HIGH)

- `viewport-meta` - width=device-width initial-scale=1
- `mobile-first` - Design mobile-first, then scale up
- `breakpoint-consistency` - Use systematic breakpoints (375/768/1024/1440)
- `readable-font-size` - Minimum 16px body text on mobile
- `line-length-control` - Mobile 35–60 chars; desktop 60–75 chars
- `horizontal-scroll` - No horizontal scroll on mobile
- `spacing-scale` - Use 4pt/8dp incremental spacing system
- `z-index-management` - Define layered z-index scale

### 6. Typography & Color (MEDIUM)

- `line-height` - Use 1.5-1.75 for body text
- `font-pairing` - Match heading/body font personalities
- `contrast-readability` - Darker text on light backgrounds
- `color-semantic` - Define semantic color tokens, not raw hex

### 7. Animation (MEDIUM)

- `duration-timing` - Use 150–300ms for micro-interactions
- `transform-performance` - Use transform/opacity only
- `easing` - Use ease-out for entering, ease-in for exiting
- `spring-physics` - Prefer spring/physics-based curves
- `exit-faster-than-enter` - Exit animations ~60–70% of enter duration
- `stagger-sequence` - Stagger list items by 30–50ms

### 8. Forms & Feedback (MEDIUM)

- `input-labels` - Visible label per input (not placeholder-only)
- `error-placement` - Show error below the related field
- `submit-feedback` - Loading then success/error state on submit
- `inline-validation` - Validate on blur, not keystroke
- `empty-states` - Helpful message and action when no content

### 9. Navigation Patterns (HIGH)

- `bottom-nav-limit` - Bottom navigation max 5 items
- `back-behavior` - Back navigation must be predictable
- `deep-linking` - All key screens reachable via deep link
- `nav-state-active` - Current location visually highlighted
- `modal-escape` - Modals must offer clear close/dismiss

### 10. Charts & Data (LOW)

- `chart-type` - Match chart type to data type
- `color-guidance` - Use accessible color palettes
- `data-table` - Provide table alternative for accessibility
- `tooltip-on-interact` - Provide tooltips on hover/tap
- `empty-data-state` - Show meaningful empty state

## Available Styles (67)

**General (49):** Minimalism, Neumorphism, Glassmorphism, Brutalism, 3D & Hyperrealism, Vibrant & Block-based, Dark Mode (OLED), Accessible & Ethical, Claymorphism, Aurora UI, Retro-Futurism, Flat Design, Skeuomorphism, Liquid Glass, Motion-Driven, Micro-interactions, Inclusive Design, Zero Interface, Soft UI Evolution, Neubrutalism, Bento Box Grid, Y2K Aesthetic, Cyberpunk UI, Organic Biophilic, AI-Native UI, Memphis Design, Vaporwave, Dimensional Layering, Exaggerated Minimalism, Kinetic Typography, Parallax Storytelling, Swiss Modernism 2.0, HUD/Sci-Fi FUI, Pixel Art, Bento Grids, Spatial UI (VisionOS), E-Ink/Paper, Gen Z Chaos/Maximalism, Biomimetic/Organic 2.0, Anti-Polish/Raw Aesthetic, Tactile Digital/Deformable UI, Nature Distilled, Interactive Cursor Design, Voice-First Multimodal, 3D Product Preview, Gradient Mesh/Aurora Evolved, Editorial Grid/Magazine, Chromatic Aberration/RGB Split, Vintage Analog/Retro Film

**Landing Page (8):** Hero-Centric, Conversion-Optimized, Feature-Rich Showcase, Minimal & Direct, Social Proof-Focused, Interactive Product Demo, Trust & Authority, Storytelling-Driven

**Dashboard (10):** Data-Dense, Heat Map, Executive, Real-Time Monitoring, Drill-Down Analytics, Comparative Analysis, Predictive Analytics, User Behavior Analytics, Financial, Sales Intelligence

## Supported Stacks

| Stack | Focus |
|-------|-------|
| `react` | Components, hooks, render performance |
| `nextjs` | App Router, RSC, Server Actions |
| `vue` | Components, Composition API |
| `nuxtjs` | Nuxt app patterns, SSR |
| `svelte` | Components, stores, transitions |
| `astro` | Islands, content, partial hydration |
| `shadcn` | shadcn/ui primitives |
| `html-tailwind` | Tailwind utility patterns |
| `angular` | Components, signals, services |
| `laravel` | Blade / server-rendered UI |
| `swiftui` | Views, state, navigation |
| `flutter` | Widgets, state, navigation |
| `jetpack-compose` | Composables, state (Android) |
| `react-native` | Components, Navigation, Lists |
| `threejs` | 3D scenes, materials, performance |

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon family
- [ ] Contrast ≥4.5:1 for body text
- [ ] Touch targets ≥44pt
- [ ] Micro-interactions 150-300ms
- [ ] prefers-reduced-motion respected
- [ ] Mobile-first responsive design
- [ ] Semantic color tokens used
- [ ] Visible form labels (not placeholder-only)
- [ ] Error states with clear recovery paths
- [ ] Loading states for async operations
- [ ] Keyboard navigation works
- [ ] Dark mode contrast verified independently
- [ ] Safe areas respected on mobile
