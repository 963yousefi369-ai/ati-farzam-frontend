# UI Audit Report — afi-next

**Date:** 2026-07-07
**Scope:** `src/app/(main)/` landing page + all imported components (~50 files)
**Auditors:** UI Visual, Accessibility (WCAG 2.2 AA), Performance/Motion, Design System Tokens

---

## Executive Summary

The afi-next landing page has a well-structured design token system (tokens.css + tailwind.config.ts) and solid accessibility foundations (skip-link, focus traps, Radix primitives, reduced-motion blanket override). However, **token adoption is inconsistent** — 9 findings stem from components using raw hex values or Tailwind's default gray/blue/emerald palettes instead of the project's navy/teal semantic tokens. The most impactful issues are: (1) CursorFollower causes layout thrashing on every mouse move via React state, (2) two landing sections break vertical rhythm with ad-hoc padding, (3) the hero carousel lacks `aria-live` so screen readers miss slide changes, and (4) competing z-index scales (Tailwind config vs CSS vars) create a systemic conflict. The animation system has duplicate keyframe definitions across globals.css and tailwind.config.ts, and `prefers-reduced-motion` handling is inconsistent across tracking components. Overall the codebase is well-architected but needs a token-adoption pass and a performance cleanup on pointer-driven animations.

**Total findings: 79** — 11 Critical, 30 Major, 38 Minor

---

## Findings

| # | Severity | Area | File:Line | Issue | Suggested Fix |
|---|----------|------|-----------|-------|---------------|
| 1 | **Critical** | Perf | `CursorFollower.tsx:12-14` | Every `mousemove` triggers `setPos()` → full React re-render (~60/sec) | Use ref + direct DOM mutation via `requestAnimationFrame` |
| 2 | **Critical** | Perf | `CursorFollower.tsx:35` | `left`/`top` positioning triggers layout recalc every frame | Use `transform: translate(x, y)` + `will-change: transform` |
| 3 | **Critical** | Visual | `page.tsx:79,134` | CategoryCards & CredibilityBar use `py-8 lg:py-12/10` instead of `py-section-mobile md:py-section-desktop` — breaks vertical rhythm | Replace with token-based spacing |
| 4 | **Critical** | Visual | `Navbar.tsx:211`, `Footer.tsx:22`, `TrackingTicker.tsx:14` | `#0f172a` hardcoded instead of `bg-navy-deep` token | Replace with `bg-navy-deep` |
| 5 | **Critical** | Visual | `ImageSlider.tsx:97-98` | `border-blue-500 ring-2 ring-blue-200` instead of brand teal | Replace with `border-teal ring-2 ring-teal-light` |
| 6 | **Critical** | Visual | `Newsletter.tsx` + `NewsletterForm.tsx` | Duplicate newsletter components with divergent styling + duplicate `id="newsletter-email"` | Consolidate into single component with `variant` prop |
| 7 | **Critical** | A11y | `HeroSlider.tsx` | Hero carousel missing `aria-live` — screen readers don't hear slide changes | Add `aria-live="polite"` to slide content area |
| 8 | **Critical** | A11y | `HeroSlider.tsx` | Tab/panel association incomplete — AT can't link tabs to panels | Add `aria-controls` linking tabs to panels |
| 9 | **Critical** | A11y | `PartnersMarquee.tsx` | Pagination buttons have no accessible names, 6px tall (needs 44px min) | Add `aria-label`, increase touch target size |
| 10 | **Critical** | A11y | `AnimatedRoute.tsx` | CSS animation ignores `prefers-reduced-motion` | Add `useReducedMotion()` check or wrap in reduced-motion media query |
| 11 | **Critical** | A11y | `TrackingTicker.tsx` | Infinite marquee has no pause mechanism for AT users | Add `aria-label`, pause on hover/focus, respect reduced-motion |
| 12 | **Major** | Visual | `TrustBar.tsx:27-28` | `text-gray-800`, `text-gray-400` instead of project tokens | Map to `text-text-heading`, `text-text-muted` |
| 13 | **Major** | Visual | `StatsCounter.tsx:58` | `text-gray-500` instead of `text-text-muted` | Use semantic token |
| 14 | **Major** | Visual | `ImageSlider.tsx:49,69,77` | `border-gray-100`, `bg-gray-50` instead of `border-border-soft`, `bg-bg-muted` | Use semantic tokens |
| 15 | **Major** | Visual | `AddToCartButton.tsx:72` | `bg-gray-100 text-gray-400 border-gray-200` | Map to `bg-bg-muted text-text-muted border-border-soft` |
| 16 | **Major** | Visual | `PartnersMarquee.tsx:59,119,136` | `hover:text-[#1e3a5f]`, `bg-[#1e3a5f]` hardcoded | Use `hover:text-navy`, `bg-navy` |
| 17 | **Major** | Visual | `TrustBar.tsx:7-8` | `text-green-600`, `text-amber-600`, `text-purple-600` — off-brand colors | Map to navy/teal/rust semantic palette |
| 18 | **Major** | Visual | `Pagination.tsx:61` | `bg-gradient-to-l` direction may be wrong for RTL context | Verify gradient direction against design intent |
| 19 | **Major** | Visual | `SectionTitle.tsx:31` vs `page.tsx:102,172` | Default `mb-6` overridden to `mb-8` in majority of usages | Change default to `mb-8` |
| 20 | **Major** | Visual | `Navbar.tsx:236`, `Footer.tsx:23` | `px-4 lg:px-6` in `max-w-7xl` vs page's `px-6 lg:px-10` in `max-w-[1440px]` — horizontal misalignment | Unify container padding across nav/footer/page |
| 21 | **Major** | Visual | `HeroSlider.tsx:167` | Teal glow uses emerald `rgba(16,185,129)` instead of brand teal `#0e7490` | Use `rgba(14,116,144,0.35)` |
| 22 | **Major** | Visual | `globals.css:324` | `border-radius: 12px` instead of `var(--radius-md)` in Swiper overrides | Use token |
| 23 | **Major** | Visual | `TrackingTicker.tsx:26-29` | `translateX(-33.333%)` scrolls LTR — wrong for RTL | Add `dir="ltr"` to ticker container or flip direction |
| 24 | **Major** | Visual | `AboutCompact.tsx:17` | Inline `boxShadow: 'var(--shadow-card)'` vs Tailwind shadow scale inconsistency | Adopt `--shadow-card`/`--shadow-hover` system-wide |
| 25 | **Major** | A11y | `MobileMenu.tsx` | Search modal has no focus trap (unlike MobileMenu which does) | Add focus trap to search modal |
| 26 | **Major** | A11y | `CmdKSearch.tsx` | Autocomplete lacks combobox ARIA pattern | Add `role="combobox"`, `aria-expanded`, `aria-activedescendant` |
| 27 | **Major** | A11y | `HeroSlider.tsx` | Slider doesn't pause on keyboard focus (only on mouse hover) | Add `onFocus`/`onBlur` pause handlers |
| 28 | **Major** | A11y | `SwiperCarousel.tsx` | Missing `aria-roledescription="carousel"` | Add carousel role description |
| 29 | **Major** | A11y | `LenisProvider.tsx` | Overrides scroll even with reduced motion | Respect `prefers-reduced-motion` |
| 30 | **Major** | A11y | `ProductCard.tsx` | Star ratings have no text alternative | Add `aria-label` with rating value |
| 31 | **Major** | A11y | `Footer.tsx:85,89` | Phone/email not wrapped in `<a href="tel:/mailto:">` | Wrap in semantic links |
| 32 | **Major** | A11y | `page.tsx` | No `<main>` landmark or `#main-content` target | Add `<main id="main-content">` wrapper |
| 33 | **Major** | A11y | Various | `text-white/80` on navy ≈ 4.2:1 contrast (needs 4.5:1) | Use `text-white` or lighten to meet ratio |
| 34 | **Major** | A11y | Various | `text-white/60` on navy ≈ 2.8:1 — severe contrast failure | Use `text-slate-200` or higher |
| 35 | **Major** | Perf | `HeroSlider.tsx:314-365` | Infinite `repeat: Infinity` animations never pause when off-screen | Use `useAnimationControls()` + viewport intersection |
| 36 | **Major** | Perf | `SatelliteOrbit.tsx:23,28-29` | CSS `spin` animation with `top` positioning causes layout during rotation | Use `will-change: transform`, add reduced-motion check |
| 37 | **Major** | Perf | `AnimatedCounter.tsx:31-39` | `setInterval(fn, 16)` instead of `requestAnimationFrame` — not synced with paint cycle | Replace with `rAF`-based animation |
| 38 | **Major** | Perf | `SatelliteOrbit.tsx:23` | Missing `prefers-reduced-motion` support | Add `useReducedMotion()` check |
| 39 | **Major** | Perf | `HeroSlider.tsx:206-209` | Heavy `drag` + `AnimatePresence` on mobile — expensive physics calculations | Disable drag on mobile or use CSS scroll-snap |
| 40 | **Major** | Perf | `CursorFollower.tsx:28` | `[visible]` dependency causes event listener churn on every enter/leave | Use ref for visibility tracking |
| 41 | **Minor** | Visual | `SatelliteOrbit.tsx:39,48` | SVG `stroke="#1e3a5f"` hardcoded | Use `currentColor` with parent `text-navy` |
| 42 | **Minor** | Visual | `Footer.tsx:89` | Email address missing `dir="ltr"` — bidi rendering risk | Add `dir="ltr"` |
| 43 | **Minor** | Visual | `globals.css:57` | Skip-link `left: 1rem` — LTR only | Use `inset-inline-start: 1rem` |
| 44 | **Minor** | Visual | `globals.css:41` | Focus ring `border-radius: 4px` instead of `var(--radius-xs)` | Use token |
| 45 | **Minor** | Visual | `PartnersMarquee.tsx:48`, `StatsCounter.tsx:35` | `max-w-7xl` (1280px) vs page's `max-w-[1440px]` | Unify max-width |
| 46 | **Minor** | Visual | `HeroSlider.tsx:186,194` | Nav buttons use `shadow-sm hover:shadow-md` instead of `--shadow-card`/`--shadow-hover` | Use design tokens |
| 47 | **Minor** | Visual | `TestimonialsCarousel.tsx:69` | Same shadow issue as m6 | Use design tokens |
| 48 | **Minor** | Visual | `CategoryCards.tsx:18` | Has `hover:shadow-[var(--shadow-hover)]` but no base `shadow-[var(--shadow-card)]` | Add base shadow |
| 49 | **Minor** | Visual | `NewsletterForm.tsx:58` | `bg-teal-500 hover:bg-teal-400` — Tailwind defaults, not project teal | Use `bg-teal hover:bg-teal-dark` |
| 50 | **Minor** | Visual | `FloatingActions.tsx:48` | `bg-success` (teal) for WhatsApp — not WhatsApp brand green | Consider `#25d366` for brand accuracy |
| 51 | **Minor** | Visual | `PulsingDot.tsx:11` | `#ef4444` hardcoded instead of `var(--error)` | Use token |
| 52 | **Minor** | Visual | `ProductSkeleton.tsx:6` | References undefined `animate-premium-shimmer` — no shimmer effect | Define keyframe or use `animate-shimmer` |
| 53 | **Minor** | Visual | `Breadcrumb.tsx:42` | `rotate-180` for RTL is fragile | Use `dir="rtl"` on breadcrumb list |
| 54 | **Minor** | Visual | `globals.css:100` | `hover-scale` uses hardcoded cubic-bezier matching `--transition-bounce` | Reference token |
| 55 | **Minor** | A11y | Various | Decorative blobs/illustrations missing `aria-hidden` | Add `aria-hidden="true"` |
| 56 | **Minor** | A11y | `AnimatedCounter.tsx`, `CountdownTimer.tsx` | Ignore reduced motion | Add `useReducedMotion()` check |
| 57 | **Minor** | A11y | `globals.css:19` | `scroll-behavior: smooth` overrides keyboard jump behavior | Scope to non-keyboard interactions |
| 58 | **Minor** | A11y | SVG icon components | Lack `aria-hidden` by default | Add `aria-hidden="true"` to decorative icons |
| 59 | **Minor** | Perf | `globals.css` + `tailwind.config.ts` | Duplicate keyframes: `float`, `shimmer`, `marquee` defined in both files with different values | Consolidate to single source of truth |
| 60 | **Minor** | Perf | `AnimatedRoute.tsx:28` | Inline `<style>` with `@keyframes` on every render | Move to `globals.css` |
| 61 | **Minor** | Perf | `TrackingTicker.tsx:25-29` | Inline `<style>` with `@keyframes` on every render | Move to `globals.css` |
| 62 | **Minor** | Perf | `PulsingDot.tsx:24` | `animate-ping` with no component-level reduced-motion check | Add `useReducedMotion()` |
| 63 | **Minor** | Perf | `RadarPing.tsx:29` | `@keyframes ping` not explicitly defined in project files | Define in `globals.css` or use Tailwind class |
| 64 | **Minor** | Perf | `HeroSlider.tsx:314` | Float animation never stops when scrolled away | Use `useAnimationControls()` |
| 65 | **Minor** | Perf | `PartnersMarquee.tsx:66` | `AnimatePresence` overkill for pagination — CSS transitions suffice | Replace with CSS transform transition |
| 66 | **Minor** | Perf | `StatsCounter.tsx:40` | CSS `animate-fade-in-up` without reduced-motion guard | Add `prefers-reduced-motion` inline check |
| 67 | **Minor** | Perf | `SignalStrength.tsx:21` | Animates `height` (non-compositor) | Use `transform: scaleY()` |
| 68 | **Minor** | Perf | `HeroSlider.tsx:89` | TypewriterText interval leak — cleanup only clears timeout, not inner interval | Capture interval ID in outer scope for cleanup |
| 69 | **Minor** | Perf | Multiple | Missing `will-change: transform` on continuously animated elements | Add to floating cards, orbit, ticker |
| 70 | **Minor** | Perf | Multiple | `prefers-reduced-motion` handling inconsistent across tracking components | Standardize on `useReducedMotion()` with global CSS as safety net |
| 71 | **Minor** | Tokens | `tailwind.config.ts` vs `tokens.css` | Competing z-index scales: `z-dropdown: 50` (Tailwind) vs `--z-dropdown: 550` (CSS) | Consolidate to one system |
| 72 | **Minor** | Tokens | Various | Hardcoded `z-index: 9999` bypassing token system | Use token scale |
| 73 | **Minor** | Tokens | `tokens.css` | `--muted-foreground` HSL (`#64748b`) differs from `--text-muted` hex (`#475569`) — different grays in shadcn vs custom | Align values |
| 74 | **Minor** | Tokens | `tokens.css` | `--text-muted` = `--text-subtle` (identical), `--navy-deeper` = `--navy-deep` (identical) | Remove duplicates |
| 75 | **Minor** | Tokens | `tokens.css` | `--shadow-xl` = `--shadow-lg` = `--shadow-hover` — three aliases, one value | Consolidate aliases |
| 76 | **Minor** | Tokens | `HeroSlider.tsx:167` | Teal glow uses emerald `rgba(16,185,129)` — off-brand | Use brand teal |
| 77 | **Minor** | Tokens | `tokens.css` | `--duration-base` is 160ms but components use 300ms | Align or document convention |
| 78 | **Minor** | Tokens | `tokens.css` | `--ease-exit` and several duration tokens unused | Remove dead tokens or adopt |
| 79 | **Minor** | Tokens | `button.tsx` | References undefined `shadow-navy` and `shadow-teal` utilities | Define in tailwind.config.ts or remove |

---

## Systemic Themes

### 1. Token Adoption Gap (9 findings: #4, #5, #12-17, #21, #41, #49, #51, #76)
Components frequently use Tailwind's default `gray-*`, `blue-*`, `green-*` palettes and raw hex values instead of the project's semantic navy/teal/rust tokens. This creates visual inconsistency and makes theme changes impossible.

### 2. Shadow System Split (4 findings: #24, #46-48)
The project defines a 2-level shadow system (`--shadow-card`, `--shadow-hover`) but components use a mix of Tailwind's default `shadow-sm/md/lg` scale and the custom tokens. Needs a single convention.

### 3. Spacing Rhythm (4 findings: #3, #19, #20, #45)
Section padding, container widths, and horizontal margins are inconsistent between Navbar/Footer and page sections. The vertical rhythm breaks on two landing sections.

### 4. RTL Gaps (5 findings: #18, #23, #42, #43, #53)
Several components have LTR-only assumptions (gradient direction, ticker scroll direction, skip-link position, email bidi rendering).

### 5. Animation Performance (12 findings: #1-2, #35-40, #59-62, #64-65)
CursorFollower is the worst offender (layout thrashing). Infinite animations lack viewport culling. `setInterval` used instead of `rAF`. Duplicate keyframes across files.

### 6. Accessibility Foundations (14 findings: #7-11, #25-34, #55-58)
The project has solid foundations (Radix, skip-link, focus traps) but the hero carousel, marquee, and contrast ratios need attention. `prefers-reduced-motion` is inconsistent.

---

## Priority Fix Order

1. **CursorFollower** (#1, #2, #40) — highest perf impact, easy fix (ref + rAF + transform)
2. **HeroSlider a11y** (#7, #8, #27, #33, #34) — critical for screen reader users
3. **Section padding** (#3) — visual regression, one-line fix
4. **Token adoption pass** (#4, #5, #12-17, #21) — systematic but low-risk
5. **z-index consolidation** (#71) — prevents future bugs
6. **Animation cleanup** (#35-40, #59-62) — perf improvement, no visual change

---

*Generated by multi-agent UI audit pipeline — no source files were modified.*
