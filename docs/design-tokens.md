# Design Token Inventory — afi-next

> Extracted from `tailwind.config.ts`, `src/styles/tokens.css`, `src/styles/globals.css`, and 11 representative components.
> Date: 2026-07-07

---

## Table of Contents

1. [Colors](#1-colors)
2. [Spacing](#2-spacing)
3. [Typography](#3-typography)
4. [Border Radius](#4-border-radius)
5. [Shadows](#5-shadows)
6. [Z-Index](#6-z-index)
7. [Motion](#7-motion)
8. [Breakpoints](#8-breakpoints)
9. [Inconsistency Flags](#9-inconsistency-flags)
10. [Consolidation Recommendations](#10-consolidation-recommendations)

---

## 1. Colors

### 1.1 Brand Colors

| Token | Value | Source | Usage |
|-------|-------|--------|-------|
| `--navy` | `#1e3a5f` | tokens.css, tailwind | Primary brand dark, headings, CTA bg |
| `--navy-dark` | `#162d4a` | tokens.css, tailwind | Hover state for navy buttons |
| `--navy-deep` | `#0f172a` | tokens.css, tailwind | Hero gradient end, footer bg, top strip |
| `--navy-deeper` | `#0f172a` | tailwind alias | Alias of `--navy-deep` |
| `--teal` | `#0e7490` | tokens.css, tailwind | Primary accent, links, icons, CTA |
| `--teal-dark` | `#155e6f` | tokens.css, tailwind | Hover state for teal buttons |
| `--teal-light` | `#cffafe` | tokens.css, tailwind | Badge bg, icon bg, active nav |
| `--rust` | `#9a3412` | tokens.css, tailwind | Accent (sparsely used) |
| `--rust-dark` | `#7c2d12` | tokens.css, tailwind | Hover state for rust |
| `--amber` | `#b45309` | tailwind, alias for `--warning` | Star ratings |
| `--amber-dark` | `#92400e` | tailwind, alias for `--warning-dark` | (unused in sampled components) |

### 1.2 Background Colors

| Token | Value | Tailwind Class | Notes |
|-------|-------|----------------|-------|
| `--bg-base` | `#ffffff` | `bg-bg-primary` (alias) | Page background |
| `--bg-soft` | `#f8fafc` | (no direct class) | Shimmer loading bg |
| `--bg-muted` | `#f1f5f9` | `bg-bg-secondary` (alias) | Input bg, disabled states |
| `--bg-navy` | `#1e3a5f` | `bg-navy` | Same as `--navy` |
| `--bg-navy-deep` | `#0f172a` | `bg-navy-dark` | Same as `--navy-deep` |

### 1.3 Text Colors

| Token | Value | Tailwind Class | Notes |
|-------|-------|----------------|-------|
| `--text-heading` | `#0f172a` | `text-text-primary` (alias) | All headings |
| `--text-body` | `#334155` | `text-text-secondary` (alias) | Body text |
| `--text-muted` | `#475569` | `text-text-tertiary` (alias) | Captions, placeholders |
| `--text-subtle` | `#475569` | — | **Duplicate of `--text-muted`** |

### 1.4 Border Colors

| Token | Value | Tailwind Class | Notes |
|-------|-------|----------------|-------|
| `--border-soft` | `#e2e8f0` | `border-border-default` (alias) | Most card borders |
| `--border-base` | `#cbd5e1` | `border-border-emphasis` (alias) | Emphasis borders |
| `--border-strong` | `#94a3b8` | — | (unused in sampled components) |

### 1.5 Semantic Colors

| Token | Value | Tailwind Class | Notes |
|-------|-------|----------------|-------|
| `--success` | `var(--teal)` → `#0e7490` | `bg-success-light` | Reuses teal — **see flag F1** |
| `--success-light` | `var(--teal-light)` → `#cffafe` | `bg-success-light` | |
| `--warning` | `#b45309` | — | Star ratings |
| `--warning-dark` | `#92400e` | — | |
| `--warning-light` | `#fef3c7` | `bg-warning-light` | |
| `--error` | `#ef4444` | — | Error badges, out-of-stock |
| `--error-text` | `#dc2626` | — | Error text (slightly darker) |
| `--error-light` | `#fee2e2` | `bg-error-light` | Error badge bg |
| `--info` | `#3b82f6` | — | **No brand relationship — see flag F2** |
| `--info-light` | `#dbeafe` | `bg-info-light` | |

### 1.6 shadcn/ui HSL Overrides

| Token | HSL Value | Resolves To | Notes |
|-------|-----------|-------------|-------|
| `--background` | `0 0% 100%` | `#ffffff` | |
| `--foreground` | `222 47% 11%` | `≈#0f172a` | Close to `--navy-deep` |
| `--primary` | `213 52% 24%` | `≈#1e3a5f` | Close to `--navy` |
| `--primary-foreground` | `0 0% 100%` | `#ffffff` | |
| `--secondary` | `210 40% 96%` | `≈#f1f5f9` | Close to `--bg-muted` |
| `--secondary-foreground` | `222 47% 11%` | `≈#0f172a` | |
| `--muted` | `210 40% 96%` | `≈#f1f5f9` | |
| `--muted-foreground` | `215 16% 47%` | `≈#64748b` | **Different from `--text-muted` (#475569) — see flag F3** |
| `--destructive` | `0 84% 60%` | `≈#ef4444` | Matches `--error` |
| `--destructive-foreground` | `0 0% 98%` | `≈#fafafa` | |
| `--card` | `0 0% 100%` | `#ffffff` | |
| `--card-foreground` | `222 47% 11%` | `≈#0f172a` | |
| `--popover` | `0 0% 100%` | `#ffffff` | |
| `--popover-foreground` | `222 47% 11%` | `≈#0f172a` | |
| `--accent` | `210 40% 96%` | `≈#f1f5f9` | |
| `--accent-foreground` | `222 47% 11%` | `≈#0f172a` | |
| `--input` | `214 32% 91%` | `≈#d6dde6` | |
| `--border` | `214 32% 91%` | `≈#d6dde6` | **Different from `--border-soft` (#e2e8f0) — see flag F4** |
| `--ring` | `186 84% 25%` | `≈#0e7490` | Matches `--teal` |

### 1.7 Inline Color Values Found in Components

| Location | Value | Should Be Token |
|----------|-------|-----------------|
| Navbar top strip | `style={{ backgroundColor: '#0f172a' }}` | `var(--navy-deep)` |
| Footer | `style={{ backgroundColor: '#0f172a' }}` | `var(--navy-deep)` |
| HeroSlider teal glow | `rgba(16,185,129,0.35)` | **Off-brand — see flag F5** |
| HeroSlider navy glow | `rgba(30,58,95,0.3)` | Matches `--navy` at 30% |
| HeroSlider dot grid | `rgba(226,232,240,0.4)` | `--border-soft` at 40% |
| HeroSlider nav buttons | `bg-white/80`, `border-slate-200/60` | Ad-hoc slate values |
| Footer social hover | `hover:bg-teal` | Token ✓ |
| SoftwareCTA feature bg | `bg-white/10` | Context-appropriate |
| SoftwareCTA laptop dots | `bg-red-40/60`, `bg-yellow-400/60`, `bg-green-400/60` | UI chrome — acceptable |
| Selection | `rgba(14, 116, 144, 0.15)` | `--teal` at 15% |
| Glow line | `rgba(14, 116, 144, 0.3)` | `--teal` at 30% |
| Breathe animation | `rgba(14,116,144,0.4)` | `--teal` at 40% |

---

## 2. Spacing

### 2.1 Custom Spacing Tokens (tailwind.config.ts)

| Token | Value | Usage |
|-------|-------|-------|
| `section` | `4rem` (64px) | — |
| `section-lg` | `6rem` (96px) | — |
| `section-mobile` | `4rem` (64px) | **Duplicate of `section`** |
| `section-desktop` | `6rem` (96px) | **Duplicate of `section-lg`** |
| `section-xl` | `8rem` (128px) | — |
| `col` | `1.5rem` (24px) | — |
| `title` | `0.75rem` (12px) | — |
| `card-gap` | `1.25rem` (20px) | — |
| `item-gap` | `0.5rem` (8px) | — |
| `text-gap` | `0.375rem` (6px) | — |

### 2.2 Section Paddings (actual usage)

| Component | Mobile | Desktop | Pattern |
|-----------|--------|---------|---------|
| HeroSlider | `py-12` (48px) | — | Content padding only |
| Footer | `pt-10 pb-6` (40/24px) | — | Compact |
| SoftwareCTA inner | `p-8` (32px) | `lg:p-12 xl:p-16` (48/64px) | Steps up 3 breakpoints |
| Newsletter | `p-8` (32px) | `lg:p-12` (48px) | |
| AboutCompact | — | `gap-8` (32px) | Grid gap only |

### 2.3 Gap Values

| Value | Occurrences | Components |
|-------|-------------|------------|
| `gap-1.5` (6px) | 3 | CredibilityBar, ProductCard, HeroSlider |
| `gap-2` (8px) | 5 | Button, CategoryCards, Footer, Navbar, ProductCard |
| `gap-2.5` (10px) | 2 | HeroSlider trust, CredibilityBar |
| `gap-3` (12px) | 5 | CategoryCards, CredibilityBar, Newsletter, Navbar |
| `gap-4` (16px) | 5 | CategoryCards, HeroSlider CTAs, Footer, SoftwareCTA |
| `gap-5` (20px) | 1 | Navbar |
| `gap-6` (24px) | 2 | HeroSlider trust, SoftwareCTA |
| `gap-8` (32px) | 3 | HeroSlider grid, Footer grid, AboutCompact |
| `gap-10` (40px) | 1 | SoftwareCTA |
| `gap-12` (48px) | 1 | HeroSlider grid (lg) |
| `gap-16` (64px) | 1 | SoftwareCTA (xl) |

### 2.4 Component Internal Padding

| Value | Usage |
|-------|-------|
| `p-3` | CredibilityBar items |
| `p-4` | ProductCard content |
| `p-5` | CategoryCards, HeroSlider mini-cards, mega menu |
| `p-6` | CategoryCards (lg), HeroSlider search, Footer |
| `p-8` | SoftwareCTA, Newsletter |
| `p-10` | HeroSlider CTA (py only) |
| `p-12` | SoftwareCTA (lg), Newsletter (lg) |
| `p-16` | SoftwareCTA (xl) |
| `px-2` | Footer links |
| `px-3` | Button sm, Navbar items |
| `px-4` | Button default, HeroSlider badge, SoftwareCTA features |
| `px-5` | Navbar register, HeroSlider mini-cards |
| `px-6` | Button lg, Newsletter submit, Navbar nav row |
| `px-8` | Button lg variant, SoftwareCTA CTA |
| `px-10` | HeroSlider CTA primary |

### 2.5 Spacing Inconsistencies

- **`section` vs `section-mobile`**: Both are `4rem`. Redundant.
- **`section-lg` vs `section-desktop`**: Both are `6rem`. Redundant.
- **No consistent section padding**: Components use ad-hoc `py-12`, `p-8`, `pt-10 pb-6` rather than `py-section-mobile` / `py-section-desktop`.
- **`card-gap` (20px)** and `item-gap` (8px) are defined but rarely used — components prefer `gap-4` (16px) and `gap-2` (8px).

---

## 3. Typography

### 3.1 Font Families

| Token | Value | Source |
|-------|-------|--------|
| `--font-family` | `'IRANSansX', 'Vazirmatn', system-ui, sans-serif` | tokens.css |
| `--font-sans` | `'IRANSansX', 'Vazirmatn', system-ui, sans-serif` | tokens.css, globals.css (redundant `:root` override) |
| `fontFamily.sans` | `['IRANSansX', 'Vazirmatn', 'system-ui', 'sans-serif']` | tailwind.config.ts |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | tokens.css |
| `--prose-width` | `65ch` | tokens.css (unused in sampled components) |

**Issue**: `--font-family` and `--font-sans` are identical. `globals.css` re-declares `--font-sans` in a nested `:root` block.

### 3.2 Font Sizes (Tailwind classes used in components)

| Tailwind Class | Pixel (approx) | Components Using |
|----------------|----------------|------------------|
| `text-[10px]` | 10px | ProductCard badge, Navbar cart count |
| `text-[11px]` | 11px | Footer brand subtitle |
| `text-xs` | 12px | CategoryCards, CredibilityBar, HeroSlider, ProductCard, Footer, Navbar |
| `text-sm` | 14px | Button, CategoryCards, CredibilityBar, HeroSlider, Navbar, Footer, SoftwareCTA, Newsletter, ProductCard |
| `text-base` | 16px | HeroSlider CTA, SoftwareCTA body, ProductCard price, Footer brand |
| `text-lg` | 18px | HeroSlider subtitle, SoftwareCTA body (lg) |
| `text-xl` | 20px | HeroSlider (hero area), AboutCompact h2 |
| `text-2xl` | 24px | AboutCompact h2 (lg), Newsletter h2 |
| `text-3xl` | 30px | SoftwareCTA h2 |
| `text-4xl` | 36px | SoftwareCTA h2 (lg) |
| `text-5xl` | 48px | HeroSlider h1, SoftwareCTA h2 (xl) |
| `text-6xl` | 60px | HeroSlider h1 (md) |
| `text-7xl` | 72px | HeroSlider h1 (lg) |

### 3.3 Font Weights

| Weight | Tailwind Class | Usage |
|--------|----------------|-------|
| `font-medium` (500) | Button default, CredibilityBar, HeroSlider CTA outline, SoftwareCTA features, Navbar |
| `font-semibold` (600) | HeroSlider CTA, Newsletter, CategoryCards, ProductCard, Navbar register, HeroSlider h1 |
| `font-bold` (700) | AboutCompact h2, SoftwareCTA h2, Newsletter h2, Footer brand, CategoryCards labels |

### 3.4 Line Heights

| Class | Usage |
|-------|-------|
| `leading-tight` | AboutCompact h2, SoftwareCTA h2 |
| `leading-snug` | ProductCard h3, CredibilityBar |
| `leading-relaxed` | HeroSlider subtitle, AboutCompact p, SoftwareCTA p, Footer brand |
| `leading-[1.1]` | HeroSlider h1 (custom) |

**Assessment**: Font sizes follow a reasonable progression from `text-xs` to `text-7xl`. Weights are consistent (`medium` for body emphasis, `semibold` for CTAs/subheadings, `bold` for headings). No raw `font-size` inline styles found in components.

---

## 4. Border Radius

### 4.1 Token Scale (tokens.css → tailwind.config.ts)

| Token | CSS Var | Tailwind Class | Value |
|-------|---------|----------------|-------|
| `--radius-xs` | `6px` | `rounded-xs` | 6px |
| `--radius-sm` | `8px` | `rounded-sm` | 8px |
| `--radius-md` | `12px` | `rounded-md` | 12px |
| `--radius-lg` | `16px` | `rounded-lg` | 16px |
| `--radius-xl` | `24px` | `rounded-xl` | 24px |
| `--radius-2xl` | `28px` | `rounded-2xl` | 28px |
| `--radius-full` | `9999px` | `rounded-full` | 9999px |
| *(no token)* | — | `rounded-3xl` | **Hardcoded `40px` — see flag F6** |

### 4.2 Usage in Components

| Tailwind Class | Count | Components |
|----------------|-------|------------|
| `rounded-lg` | 6 | CredibilityBar icons, Navbar items, Footer social, mega menu items |
| `rounded-xl` | 14 | Button, CategoryCards, HeroSlider nav/badge/cards, Navbar, ProductCard, SoftwareCTA, Newsletter |
| `rounded-2xl` | 6 | CategoryCards, ProductCard card, Newsletter, Navbar mega panel, HeroSlider mini-cards |
| `rounded-3xl` | 1 | SoftwareCTA outer container |
| `rounded-full` | 5 | HeroSlider badge dot, ProductCard badge/wishlist, Navbar cart badge |

**Assessment**: The token system is mostly followed. `rounded-xl` (24px) is the dominant radius for interactive elements (buttons, cards, inputs). `rounded-2xl` (28px) for larger containers. The `rounded-3xl` usage in SoftwareCTA uses the hardcoded 40px value rather than a token.

### 4.3 Raw Radius Values

| Location | Value | Notes |
|----------|-------|-------|
| globals.css `::selection` focus | `border-radius: 4px` | Between `--radius-xs` (6px) — raw |
| globals.css `.section-underline` | `border-radius: 2px` | Below token scale |
| globals.css scrollbar thumb | `border-radius: 3px` | Below token scale |
| globals.css swiper active bullet | `border-radius: 4px` | Between xs and sm |
| HeroSlider blob shapes | `border-radius: 60% 40% 70% 30% / ...` | Decorative — acceptable |

---

## 5. Shadows

### 5.1 Token Shadows (tokens.css)

| Token | Value | Notes |
|-------|-------|-------|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)` | Resting card state |
| `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07)` | Hover state |
| `--shadow-card-hover` | `var(--shadow-hover)` | Alias |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.05)` | Below token system |
| `--shadow-md` | `var(--shadow-card)` | Alias |
| `--shadow-lg` | `var(--shadow-hover)` | Alias |
| `--shadow-xl` | `var(--shadow-hover)` | Alias — **see flag F7** |

### 5.2 Tailwind Default Shadows Used

| Class | Usage | Notes |
|-------|-------|-------|
| `shadow-sm` | HeroSlider nav buttons, HeroSlider badge | Tailwind default, not `--shadow-sm` |
| `shadow-md` | HeroSlider mini-cards | Tailwind default, not `--shadow-md` (alias) |
| `shadow-lg` | Button hover states | Tailwind default, not `--shadow-lg` (alias) |
| `shadow-navy` | Button default variant | **Not defined — see flag F8** |
| `shadow-teal` | Button secondary variant | **Not defined — see flag F8** |

### 5.3 Inline Shadow Usage

| Location | Value | Notes |
|----------|-------|-------|
| AboutCompact image | `style={{ boxShadow: 'var(--shadow-card)' }}` | Token used ✓ |
| Navbar dropdown | `style={{ boxShadow: 'var(--shadow-hover)' }}` | Token used ✓ |
| Navbar mega menu | `style={{ boxShadow: 'var(--shadow-hover)' }}` | Token used ✓ |
| HeroSlider image | `drop-shadow-[0_20px_60px_rgba(0,0,0,0.08)]` | Ad-hoc |
| globals.css sr-only-focusable | `box-shadow: 0 4px 24px rgba(0,0,0,0.15)` | Raw value |

---

## 6. Z-Index

### 6.1 CSS Variable Scale (tokens.css)

| Token | Value | Used By |
|-------|-------|---------|
| `--z-cursor` | 100 | (unknown — not in sampled components) |
| `--z-navbar` | 300 | Navbar `style={{ zIndex: 'var(--z-navbar)' }}` |
| `--z-mobile-menu-overlay` | 400 | MobileMenu (not sampled) |
| `--z-mobile-menu-drawer` | 500 | MobileMenu (not sampled) |
| `--z-dropdown` | 550 | (shadcn dropdown — implicit) |
| `--z-cart-drawer-overlay` | 600 | CartDrawer (not sampled) |
| `--z-cart-drawer` | 700 | CartDrawer (not sampled) |
| `--z-login-modal-overlay` | 600 | LoginModal (not sampled) — **same as cart overlay — see flag F9** |
| `--z-login-modal` | 700 | LoginModal (not sampled) — **same as cart drawer — see flag F9** |
| `--z-dialog-overlay` | 650 | Dialog (not sampled) |
| `--z-dialog-content` | 660 | Dialog (not sampled) |
| `--z-select-content` | 670 | Select (not sampled) |
| `--z-cmd-search-overlay` | 800 | CmdKSearch (not sampled) |
| `--z-cmd-search-content` | 810 | CmdKSearch (not sampled) |

### 6.2 Tailwind Z-Index Scale (tailwind.config.ts)

| Token | Value | Notes |
|-------|-------|-------|
| `z-dropdown` | 50 | **Conflicts with CSS var `--z-dropdown` (550) — see flag F10** |
| `z-sticky` | 200 | Not in CSS vars |
| `z-modal-backdrop` | 300 | **Same as `--z-navbar` — see flag F10** |
| `z-modal` | 400 | **Same as `--z-mobile-menu-overlay` — see flag F10** |
| `z-toast` | 500 | **Same as `--z-mobile-menu-drawer`** |
| `z-tooltip` | 600 | **Same as `--z-cart-drawer-overlay`** |

### 6.3 Hardcoded Z-Index in Components

| Location | Value | Notes |
|----------|-------|-------|
| HeroSlider nav buttons | `z-20` | Should use `--z-dropdown` or similar |
| HeroSlider slide indicators | `z-10` | Low enough, but raw |
| HeroSlider content | `z-10` | Raw |
| ProductCard out-of-stock overlay | `z-10` | Raw |
| ProductCard badges | `z-20` | Raw |
| Navbar mobile search | `style={{ zIndex: 9999 }}` | **Critical — see flag F11** |
| globals.css sr-only-focusable | `z-index: 9999` | **Same issue — see flag F11** |

---

## 7. Motion

### 7.1 Easing Curves (tokens.css)

| Token | Value | Used In Components? |
|-------|-------|---------------------|
| `--ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | globals.css `.hover-lift`, `.transition-smooth`, `.img-zoom`, `.card-modern`, swiper overrides. HeroSlider framer motions use literal `[0.16, 1, 0.3, 1]` |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | globals.css `.hover-lift`, `.card-modern`, swiper overrides |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | **Not used in any sampled component** |

### 7.2 Duration Tokens (tokens.css)

| Token | Value | Used In Components? |
|-------|-------|---------------------|
| `--duration-instant` | `80ms` | **Not used** |
| `--duration-fast` | `120ms` | **Not used** |
| `--duration-base` | `160ms` | globals.css `.hover-lift`, `.card-modern`, swiper overrides |
| `--duration-moderate` | `200ms` | **Not used** |
| `--duration-ceiling` | `600ms` | **Not used** |

### 7.3 Transition Alias Tokens (tokens.css)

| Token | Value | Notes |
|-------|-------|-------|
| `--ease-smooth` | `300ms var(--ease-settle)` | Combines duration + curve |
| `--transition-fast` | `180ms var(--ease-standard)` | |
| `--transition-base` | `250ms ease` | **Uses raw `ease`, not `--ease-standard`** |
| `--transition-smooth` | `300ms var(--ease-settle)` | Duplicate of `--ease-smooth` |
| `--transition-bounce` | `500ms cubic-bezier(0.34, 1.56, 0.64, 1)` | globals.css `.hover-scale` |

### 7.4 Actual Duration Usage in Components

| Duration | Tailwind/Style | Components |
|----------|---------------|------------|
| `180ms` | — | Not directly used |
| `200ms` | `duration-200` | Navbar nav links, ProductCard wishlist |
| `250ms` | — | Not directly used |
| `300ms` | `duration-300` | Button, HeroSlider, CategoryCards, Navbar, ProductCard, Footer, globals.css |
| `500ms` | `0.5s` | HeroSlider slide transition, globals.css img-zoom |
| `600ms` | `600ms` | globals.css ripple effect |
| `7000ms` | `AUTOPLAY_MS` | HeroSlider autoplay |

**Assessment**: `duration-300` dominates. The token system defines `--duration-base` (160ms) but components overwhelmingly use `300ms`. The `--ease-settle` curve is well-adopted in globals.css utilities, but framer-motion components use the literal `[0.16, 1, 0.3, 1]` instead of the CSS variable.

### 7.5 Keyframe Animations

| Animation | Duration | Easing | Defined In |
|-----------|----------|--------|------------|
| `accordion-down` | 0.2s | `ease-out` | tailwind.config.ts |
| `accordion-up` | 0.2s | `ease-out` | tailwind.config.ts |
| `fade-in` | 0.4s | `ease-out` | tailwind.config.ts |
| `scale-in` | 0.3s | `ease-out` | tailwind + globals.css |
| `slide-in-right` | 0.3s | `ease-out` | tailwind.config.ts |
| `slide-in-left` | 0.3s | `ease-out` | tailwind.config.ts |
| `float` | 3s | `ease-in-out` | tailwind + globals.css |
| `shimmer` | 1.5s | `ease-in-out` | tailwind + globals.css (different keyframes!) |
| `marquee` | 30s / 20s | `linear` | tailwind (30s) vs globals.css (20s) — **conflict** |
| `fadeInUp` | 0.5s | `ease-out` | globals.css only |
| `scaleIn` | 0.3s | `ease-out` | globals.css (duplicate of tailwind `scale-in`) |
| `blink-cursor` | 0.8s | `step-end` | globals.css |
| `page-fade-in` | 0.4s | `ease-out` | globals.css |
| `pulse-ring` | — | — | globals.css (no duration) |
| `page-enter` | 0.5s | `cubic-bezier(0.16, 1, 0.3, 1)` | globals.css |
| `staggerFadeIn` | — | — | globals.css (no duration) |
| `numberPop` | 280ms | `var(--ease-settle)` | globals.css |
| `breathe` | 2s | `ease-in-out` | globals.css |
| `ripple-expand` | 600ms | `ease-out` | globals.css |

---

## 8. Breakpoints

### 8.1 Tailwind Defaults

| Breakpoint | Min-Width | Tailwind Prefix |
|------------|-----------|-----------------|
| `sm` | 640px | `sm:` |
| `md` | 768px | `md:` |
| `lg` | 1024px | `lg:` |
| `xl` | 1280px | `xl:` |
| `2xl` | 1536px | `2xl:` |

### 8.2 Breakpoint Usage in Sampled Components

| Breakpoint | Occurrences | Typical Use |
|------------|-------------|-------------|
| `sm` | 4 | Grid columns (`sm:grid-cols-3`), flex direction (`sm:flex-row`), padding (`sm:left-6`) |
| `md` | 7 | Grid 2-col (`md:grid-cols-2`), font size (`md:text-6xl`), layout reorder (`md:order-1`), min-height |
| `lg` | 18 | **Primary desktop breakpoint.** Grid 4-col, font sizes, padding, nav visibility, layout |
| `xl` | 5 | SoftwareCTA flex row, larger padding (`xl:p-16`), larger text (`xl:text-5xl`) |
| `2xl` | 0 | Not used in sampled components |

**Assessment**: `lg` (1024px) is the dominant breakpoint, used for the mobile→desktop transition. `xl` is used sparingly for large-screen refinements. No `2xl` usage found. The max-width container is `max-w-7xl` (1280px) and `max-w-[1440px]` in HeroSlider — **inconsistent container widths**.

---

## 9. Inconsistency Flags

### F1: `--success` Aliased to `--teal`
- `--success: var(--teal)` means success states and brand accent share the same color.
- This prevents independent theming of success vs. brand. If success ever needs to be green (e.g., `#16a34a`), the alias breaks.
- **Severity**: Medium. Functional now, limits future flexibility.

### F2: `--info` (#3b82f6) Has No Brand Relationship
- `#3b82f6` is Tailwind's `blue-500`. It doesn't appear in the brand palette (navy/teal/rust).
- **Severity**: Low. Info color is rarely used in sampled components.

### F3: `--muted-foreground` HSL ≠ `--text-muted` Hex
- `--muted-foreground: 215 16% 47%` resolves to ≈`#64748b`.
- `--text-muted: #475569` (slate-600).
- These are different grays. shadcn components using `text-muted-foreground` will render a different gray than custom components using `text-text-muted`.
- **Severity**: High. Visual inconsistency between shadcn and custom components.

### F4: `--border` HSL ≠ `--border-soft` Hex
- `--border: 214 32% 91%` ≈ `#d6dde6`.
- `--border-soft: #e2e8f0` (slate-200).
- shadcn components get a slightly darker border than custom components.
- **Severity**: Medium. Subtle but visible side-by-side.

### F5: HeroSlider Teal Glow Uses Emerald, Not Teal
- `rgba(16,185,129,0.35)` is emerald-500 at 35%.
- Brand teal is `#0e7490` = `rgb(14,116,144)`.
- The glow is noticeably greener than the brand teal.
- **Severity**: Low (decorative), but breaks brand consistency.

### F6: `rounded-3xl` Is Hardcoded 40px
- All other radii use CSS custom properties. `rounded-3xl: 40px` is a raw value.
- **Severity**: Low. Single usage (SoftwareCTA).

### F7: `--shadow-xl` = `--shadow-lg` = `--shadow-hover`
- Three aliases all point to the same value. The "2 levels only" design intent is documented, but the aliases create false distinction.
- **Severity**: Low. Cleanup opportunity.

### F8: `shadow-navy` and `shadow-teal` Undefined
- Button variants reference `shadow-navy` and `shadow-teal` but these are not defined in tailwind.config.ts.
- Tailwind may generate them from the color palette (colored box-shadows), but the behavior depends on the Tailwind version.
- **Severity**: Medium. May produce unexpected shadow colors or no shadow at all.

### F9: `--z-login-modal` and `--z-cart-drawer` Share Values
- Both overlay (600) and content (700) pairs share the same z-index.
- If both are open simultaneously, stacking is undefined.
- **Severity**: Medium. Edge case but real.

### F10: Two Competing Z-Index Scales
- `tokens.css` defines `--z-dropdown: 550`, `--z-navbar: 300`, etc.
- `tailwind.config.ts` defines `z-dropdown: 50`, `z-modal-backdrop: 300`, `z-modal: 400`.
- **These are completely different scales with the same names.**
- `z-dropdown: 50` (Tailwind) vs `--z-dropdown: 550` (CSS var) is a 500-unit gap.
- **Severity**: Critical. Using `z-dropdown` class vs. `var(--z-dropdown)` produces wildly different results.

### F11: Hardcoded `z-index: 9999`
- Navbar mobile search and `sr-only-focusable` both use `z-index: 9999`.
- This bypasses the entire z-index scale and will always be on top.
- **Severity**: High. Should use `--z-cmd-search-overlay` (800) or a dedicated token.

### F12: `--text-muted` and `--text-subtle` Are Identical
- Both are `#475569`. The "subtle" token adds no value.
- **Severity**: Low. Cleanup opportunity.

### F13: `--navy-deeper` Alias Is Redundant
- `--navy-deeper: var(--bg-navy-deep)` and `--navy-deep: #0f172a` and `navy.deep: '#0f172a'` — three ways to say the same thing.
- **Severity**: Low. Confusing for developers.

### F14: Marquee Animation Duration Conflict
- `tailwind.config.ts`: `marquee 30s linear infinite`
- `globals.css`: `marquee 20s linear infinite`
- Different speeds depending on which class is used.
- **Severity**: Medium. Visual inconsistency.

### F15: Shimmer Animation Keyframes Conflict
- `tailwind.config.ts`: `backgroundPosition: '-400px 0'` → `'400px 0'`
- `globals.css`: `backgroundPosition: '-200% 0'` → `'200% 0'`
- Different keyframe values for the same animation name.
- **Severity**: Medium.

### F16: Inconsistent Container Max-Widths
- Navbar/Footer: `max-w-7xl` (1280px)
- HeroSlider: `max-w-[1440px]`
- **Severity**: Low. Hero is full-bleed by design, but worth noting.

### F17: Framer Motion Uses Literal Easing Values
- HeroSlider uses `ease: [0.16, 1, 0.3, 1]` instead of `var(--ease-settle)`.
- CSS variables can't be used in JS framer-motion, but a shared JS constant would help.
- **Severity**: Low. DRY concern, not visual.

---

## 10. Consolidation Recommendations

### 10.1 Color Consolidation

1. **Eliminate `--text-subtle`** — identical to `--text-muted`. Remove from tokens.css.
2. **Eliminate `--navy-deeper`** — use `--navy-deep` everywhere. Remove the alias.
3. **Align `--muted-foreground` HSL with `--text-muted` hex** — change `--muted-foreground` to `215 25% 33%` (≈`#475569`) or change `--text-muted` to match the HSL. Pick one source of truth.
4. **Align `--border` HSL with `--border-soft` hex** — change `--border` to `214 32% 93%` (≈`#e2e8f0`) or vice versa.
5. **Fix HeroSlider teal glow** — change `rgba(16,185,129,0.35)` to `rgba(14,116,144,0.35)` (brand teal).
6. **Consider decoupling `--success` from `--teal`** — even if they share the same value now, define `--success: #0e7490` directly so they can diverge later.
7. **Replace inline `#0f172a`** in Navbar top strip and Footer with `style={{ backgroundColor: 'var(--navy-deep)' }}` or a utility class.

### 10.2 Shadow Consolidation

8. **Define `shadow-navy` and `shadow-teal`** in tailwind.config.ts or remove them from button variants:
   ```ts
   boxShadow: {
     'navy': '0 4px 14px rgba(30,58,95,0.25)',
     'teal': '0 4px 14px rgba(14,116,144,0.25)',
   }
   ```
9. **Remove `--shadow-xl` alias** — it's identical to `--shadow-lg` and `--shadow-hover`.

### 10.3 Z-Index Consolidation

10. **Merge the two z-index scales.** Remove the Tailwind `zIndex` entries (`z-dropdown: 50`, etc.) and use only the CSS variable scale from tokens.css. Access via `style={{ zIndex: 'var(--z-dropdown)' }}` or create utility classes:
    ```css
    .z-navbar { z-index: var(--z-navbar); }
    .z-dropdown { z-index: var(--z-dropdown); }
    /* etc. */
    ```
11. **Replace `z-index: 9999`** in Navbar mobile search with `var(--z-cmd-search-overlay)`.
12. **Give `--z-login-modal-overlay` and `--z-cart-drawer-overlay` distinct values** if they can coexist.

### 10.4 Spacing Consolidation

13. **Remove `section-mobile` and `section-desktop`** — they duplicate `section` and `section-lg`.
14. **Standardize section padding** — pick `py-section` (64px) for mobile and `py-section-lg` (96px) for desktop. Apply via a utility:
    ```css
    .py-section { padding-top: var(--section-mobile, 4rem); padding-bottom: var(--section-mobile, 4rem); }
    @media (min-width: 1024px) {
      .py-section { padding-top: var(--section-desktop, 6rem); padding-bottom: var(--section-desktop, 6rem); }
    }
    ```

### 10.5 Motion Consolidation

15. **Use `--duration-base` consistently** — currently 160ms but components use 300ms. Either change `--duration-base` to `300ms` or introduce a `--duration-relaxed: 300ms` and migrate components.
16. **Remove unused tokens** — `--duration-instant`, `--duration-fast`, `--duration-moderate`, `--ease-exit` are defined but unused.
17. **Remove `--transition-smooth`** — duplicate of `--ease-smooth`.
18. **Align marquee duration** — pick 20s or 30s and use consistently.
19. **Align shimmer keyframes** — use `%` values (globals.css) or `px` values (tailwind), not both.
20. **Extract framer-motion easing to a JS constant**:
    ```ts
    // lib/motion.ts
    export const EASE_SETTLE = [0.16, 1, 0.3, 1] as const
    ```

### 10.6 Typography Consolidation

21. **Remove `--font-family`** — it's identical to `--font-sans`. Use `--font-sans` as the single source.
22. **Remove the redundant `:root { --font-sans: ... }` in globals.css** — tokens.css already defines it.

### 10.7 Border Radius Consolidation

23. **Define `--radius-3xl: 40px`** in tokens.css and use `var(--radius-3xl)` in tailwind.config.ts instead of hardcoded `40px`.

---

## Appendix: Token Source Map

| File | Role |
|------|------|
| `src/styles/tokens.css` | **Single source of truth** for CSS custom properties |
| `tailwind.config.ts` | Maps CSS vars to Tailwind classes; defines spacing, keyframes, z-index |
| `src/styles/globals.css` | Imports tokens.css; defines utility classes, keyframes, global styles |
| `src/components/ui/button.tsx` | Representative shadcn component — uses Tailwind classes exclusively |
| `src/components/home/*.tsx` | Home page components — mix of Tailwind classes and inline styles |
| `src/components/product/ProductCard.tsx` | Product display — uses card-modern utility, shadcn Card/Badge |
| `src/components/layout/Navbar.tsx` | Navigation — inline z-index, mixed Tailwind + CSS vars |
| `src/components/layout/Footer.tsx` | Footer — inline bg color, Tailwind classes |
