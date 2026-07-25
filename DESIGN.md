# DESIGN.md — Ati Farzam Design System

## Brand identity
- **Company:** آتی فرزام ایرانیان (Ati Farzam Iranian Co.)
- **Domain:** GPS tracking, fleet management, vehicle security
- **Tone:** Professional, trustworthy, technical — not playful

## Color palette

### Primary
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#3B5A80` | Brand navy — buttons, headings, icons |
| `--primary-dark` | `#2F4A6A` | Hover state for primary |
| `--dark` | `#22364F` | Body text, dark backgrounds |
| `--dark-deeper` | `#1A2B42` | Deep backgrounds (footer, dashboard) |

### Accent
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#14B8A6` | Teal — active states, badges, highlights |
| `--accent-dark` | `#0F9D8D` | Hover state for accent |

### Neutrals
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#ffffff` | Page background |
| `--bg-soft` | `#f8fafc` | Alternating section background |
| `--bg-muted` | `#E8EEF5` | Input backgrounds, disabled states |
| `--light-tint` | `#EEF3F9` | Hover backgrounds, subtle fills, image-area gradients |
| `--text-heading` | `#22364F` | h1–h3 |
| `--text-body` | `#374151` | Paragraphs, labels |
| `--text-muted` | `#6B7280` | Captions, placeholders |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#14B8A6` | Success messages |
| `--warning` | `#F59E0B` | Warnings |
| `--error` | `#E0455A` | Errors, destructive actions |
| `--discount` | `#D9457A` | Sale/discount badges (kept visually distinct from `--error` so a price cut never reads as a warning) |

### Contrast rules
- Body text on white: `#374151` → 7.4:1 (AAA)
- Muted text on white: `#6B7280` → 4.6:1 (AA)
- White text on `--dark`: ensure ≥ 60% opacity for AA
- Never use `text-white/40` on dark backgrounds (fails AA)

## Typography

### Font stack
```css
font-family: 'Vazirmatn', 'IRANSansX', system-ui, sans-serif;
```
- **Vazirmatn** — primary Persian font (variable weight, excellent RTL support)
- **IRANSansX** — fallback

### Scale
| Level | Size | Weight | Line-height |
|-------|------|--------|-------------|
| H1 | `text-4xl` → `text-6xl` (clamp max 6rem) | 800 | 1.15 |
| H2 | `text-2xl` → `text-3xl` | 700 | 1.2 |
| H3 | `text-lg` → `text-xl` | 600 | 1.3 |
| Body | `text-base` (16px) | 400 | 1.6 |
| Small | `text-sm` (14px) | 400 | 1.5 |
| Caption | `text-xs` (12px) | 400 | 1.4 |

### Rules
- `text-wrap: balance` on h1–h3
- `text-wrap: pretty` on long prose
- Max line length: 65–75ch
- **Letter-spacing on Persian headings: do NOT use negative tracking.** The
  `-0.04em` rule below is a Latin-typography convention and breaks Vazirmatn's
  connected letterforms at large sizes (glyphs collide or misjoin). Use
  `letter-spacing: normal` (0) on all Persian display headings. Only apply
  negative tracking (`-0.02em` max) to any Latin/numeral-only display text
  (e.g. a standalone English wordmark), and visually verify before shipping.
- H1 at the top of the clamp range (5–6rem) with weight 800 can look heavy in
  Vazirmatn. If a headline feels too black/dense, prefer weight 700 at a
  slightly larger size rather than dropping weight arbitrarily — test both
  before deciding.

## Spacing

### Section rhythm
| Token | Value | Usage |
|-------|-------|-------|
| `py-section-mobile` | `3.5rem` | Section padding on mobile |
| `py-section-desktop` | `5rem` | Section padding on desktop |

### Container
```css
max-w-[1440px] mx-auto px-6 lg:px-10
```

## Border radius
| Token | Value | Usage |
|-------|-------|-------|
| `rounded-lg` | 8px | Small elements, dropdown items |
| `rounded-xl` | 12px | Buttons, inputs |
| `rounded-2xl` | 20–24px | Cards, containers |
| `rounded-full` | 9999px | Pills (search, CTA buttons) |

## Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 2px 8px rgba(59,90,128,0.06), 0 4px 16px rgba(59,90,128,0.04)` | Default card |
| `--shadow-hover` | `0 8px 30px rgba(59,90,128,0.12)` | Card hover, elevated elements |
| `--shadow-elevated` | `0 8px 30px rgba(10,15,30,0.18)` | Modals, floating navbar |

## Motion

### Easing
| Token | Curve | Usage |
|-------|-------|-------|
| `--ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | Exits, overshoots |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |

### Durations
| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 80ms | Micro-interactions |
| `--duration-fast` | 120ms | Quick feedback |
| `--duration-base` | 160ms | Hover, card lift |
| `--duration-moderate` | 200ms | State changes, nav links |
| `--duration-ceiling` | 600ms | Drawers, page transitions |

### Rules
- No bounce, no elastic easing
- `@media (prefers-reduced-motion: reduce)` must disable all animations
- Reveal animations enhance an already-visible default

## Z-index scale
| Token | Value | Element |
|-------|-------|---------|
| `--z-navbar` | 300 | Sticky navbar |
| `--z-mobile-menu-overlay` | 400 | Mobile menu backdrop |
| `--z-mobile-menu-drawer` | 500 | Mobile menu drawer |
| `--z-dropdown` | 550 | Search results, dropdowns |
| `--z-cart-drawer` | 700 | Cart sidebar |
| `--z-dialog-content` | 660 | Generic dialogs |
| `--z-login-modal` | 730 | Login modal (must sit above cart drawer — a guest can trigger login from an open cart) |
| `--z-cmd-search-content` | 810 | Command palette |

## Component state matrix

Every key component must be designed for all five states below — not just
the default/success state. This is the most common gap between a "good"
and a "world-class" e-commerce build.

| Component | Default | Loading | Empty | Error | Success |
|-----------|---------|---------|-------|-------|---------|
| Product card / grid | — | Skeleton matching card-modern dimensions (no spinner) | "No products match your filters" + reset-filters CTA | Retry state with cached/fallback data if backend is down | — |
| Search results | — | Skeleton rows | "No results" + suggested categories, never a dead end | Silent fallback to cached suggestions | Results list |
| Cart | Item list | — | Empty cart with CTA to best-selling products, not a bare icon | Item removed/stock-changed banner | — |
| Checkout step | Form | Field-level spinner during validation/lookup | — | Inline error under the specific field, human Persian message | Step-complete check |
| Payment (Zarinpal) | — | Redirect/processing screen, never a blank tab | — | Failure screen with "retry" that preserves the cart | Success screen with order summary |
| Add-to-cart button | Idle | Brief loading state on click | — | "Out of stock" replaces the button, not just disables it | Confirmation (toast + `aria-live`) |

When a fallback to hardcoded `landingData` is active (backend offline),
never mix stale prices with live ones on the same page — either the whole
page is fallback data or none of it is.

## Accessibility

- **Focus states:** every interactive element gets a visible
  `focus-visible` ring — `2px solid var(--accent)` with a `2px` white
  offset. Never rely on the browser default outline being removed without
  a replacement.
- **Focus trap:** modals, the cart drawer, and the mobile menu drawer must
  trap focus while open and return focus to the triggering element on
  close.
- **Live regions:** "added to cart" confirmations and live search results
  use `aria-live="polite"` so screen reader users get the update without
  a focus jump.
- **Color is never the only signal:** stock status, form errors, and
  order status badges must pair color with a text label or icon, not
  color alone.
- **Touch targets:** minimum 44×44px hit area on all buttons, icons, and
  form controls, even where the visible icon is smaller.

## RTL details (beyond direction)

- **Numerals:** all prices and quantities use `Intl.NumberFormat('fa-IR')`
  for Persian numeral + thousands-separator formatting — never a manual
  string. This is a hard requirement, not a nice-to-have.
- **Currency unit:** display in **Toman** everywhere (matches market
  expectation and the free-shipping threshold in PRODUCT.md). Do not mix
  Toman and Rial displays across pages.
- **Directional icons:** "continue/next" arrows must point left in RTL;
  back arrows point right. Icons with no inherent direction (clock,
  calendar, search) are never flipped. Document each directional icon's
  flip behavior where it's used.
- **Mixed-direction inputs:** phone number and postal code fields use
  `dir="ltr"` with left-aligned text inside an otherwise RTL form, so the
  cursor doesn't jump. Both Persian (۰۹۱۲) and Latin (0912) digit entry
  must be accepted and normalized on input.

## Mobile-first interaction

Mobile is the primary surface for this product (fleet drivers, individual
owners), not a scaled-down desktop view.

- **Touch equivalents:** `hover-lift` has no meaning on touch. Use
  `active:scale-[0.98]` with `--duration-instant` as the touch-press
  feedback for cards and buttons.
- **Sticky add-to-cart:** on the product detail page, price + add-to-cart
  become a sticky bottom bar once the main CTA scrolls out of view.
- **Backdrop blur budget:** `backdrop-filter: blur(12px)` on the floating
  navbar can jank on mid-range Android devices. Test on a mid-range
  device profile; fall back to a solid/semi-opaque background if frame
  rate drops.
- **Performance budget:** target LCP < 2.5s and INP < 200ms on a
  throttled 4G / mid-range-Android profile — this is the realistic
  baseline for the target market, not a fast wifi desktop.

## Layout patterns

### Floating navbar
- `glass` class: `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.85)`
- `rounded-2xl` with `border-hairline`
- Sticky with `z-[var(--z-navbar)]`
- Height: `--navbar-height: 76px`

### Product cards
- `card-modern` class: white bg, `rounded-2xl`, `hover-lift` (-4px translateY)
- Image area: `bg-gradient-to-b from-light-tint to-white`
- Consistent padding: `p-4`

### Section headers
- Title left-aligned, action button right-aligned
- Use `SectionHeader` component

## Component inventory

### Extracted primitives
| Component | File | Purpose |
|-----------|------|---------|
| `Section` | `components/ui/Section.tsx` | Section wrapper with padding |
| `SectionHeader` | `components/ui/SectionHeader.tsx` | Title + action slot |
| `IconTile` | `components/ui/IconTile.tsx` | Icon container with size/variant |
| `Button` | `components/ui/button.tsx` | CVA-based, 7 variants, 5 sizes |
| `Card` | `components/ui/card.tsx` | Generic card container |
| `Badge` | `components/ui/badge.tsx` | Status/label badges |

### SVG assets
| Component | File | Purpose |
|-----------|------|---------|
| `LogoAtiFarzam` | `components/svg/LogoAtiFarzam.tsx` | Shield + pin logo |
| `HeroRadarMap` | `components/svg/HeroRadarMap.tsx` | Hero background radar |
| `ProductPlaceholder` | `components/svg/ProductPlaceholder.tsx` | Fallback product image |
| `DashboardMockup` | `components/svg/DashboardMockup.tsx` | Platform showcase |

## Trust layer (required on PDP & checkout)

This product is anti-theft/security hardware — trust signals are part of
the core conversion path, not a footer afterthought.

| Component | File | Placement |
|-----------|------|-----------|
| `TrustBadge` | `components/ui/TrustBadge.tsx` | Enamad + Zarinpal marks, checkout payment step |
| `GuaranteeStrip` | `components/ui/GuaranteeStrip.tsx` | Warranty / return policy / 24-7 support, **above** the add-to-cart button on PDP |
| `ReviewSummary` | `components/ui/ReviewSummary.tsx` | Rating + review count, PDP near title |

Checkout phone-number field pairs with a short "your data is encrypted"
microcopy line — this is a documentation requirement, not optional polish.

## Anti-patterns (avoid)
- Nested cards
- Gradient text (`background-clip: text`)
- Tiny uppercase tracked eyebrows above every section
- Identical icon-tile grids without variation
- Bounce/elastic easing on hover
- Gray text on colored backgrounds below 4.5:1
- `overflow: hidden` containers with dropdowns inside
- Negative letter-spacing on Persian display text (breaks Vazirmatn ligatures)
- Removing `focus-visible` outline without a replacement ring
- Mixing Toman and Rial displays on the same or adjacent pages
