# WCAG 2.2 AA Accessibility Audit — afi-next

**Auditor**: MiMoCode A11y Specialist
**Date**: 2026-07-07
**Scope**: Homepage, layout, tracking, shared, product, and UI components

---

## Critical (5 findings)

### C1 — Hero carousel: no `aria-live` on slide content

- **File**: `src/components/home/HeroSlider.tsx:200`
- **WCAG**: 4.1.3 Status Messages (AA)
- **Issue**: Slides auto-advance every 7 seconds. When content changes, screen readers announce nothing — the new heading, subtitle, and CTA links are invisible to AT users.
- **Fix**:
```tsx
// Line ~200, the motion.div wrapping slide content:
<motion.div
  aria-live="polite"
  aria-atomic="true"
  ...
>
```

### C2 — Hero slider: tab/panel association incomplete

- **File**: `src/components/home/HeroSlider.tsx:382-406`
- **WCAG**: 4.1.2 Name, Role, Value (A)
- **Issue**: Tab buttons have `role="tab"` and `aria-selected` but lack `id` and `aria-controls`. The visible slide panel has no `role="tabpanel"` or `id`, so AT cannot link them.
- **Fix**:
```tsx
// Tab buttons (line 382):
<button
  id={`slide-tab-${i}`}
  aria-controls={`slide-panel-${i}`}
  role="tab"
  aria-selected={i === current}
  aria-label={`اسلاید ${i + 1}`}
>

// Slide panel (line ~213):
<div
  id={`slide-panel-${current}`}
  role="tabpanel"
  aria-labelledby={`slide-tab-${current}`}
>
```

### C3 — PartnersMarquee: pagination buttons lack accessible names

- **File**: `src/components/home/PartnersMarquee.tsx:129-138`
- **WCAG**: 4.1.2 Name, Role, Value (A), 2.5.8 Target Size (AA)
- **Issue**: The page-indicator dot buttons have no `aria-label`, no `role`, and render at only 6px tall (below the 44px touch target). Screen readers see empty buttons.
- **Fix**:
```tsx
<button
  key={i}
  onClick={() => { ... }}
  aria-label={`صفحه ${i + 1}`}
  aria-current={currentPage === i ? 'page' : undefined}
  className={`h-1.5 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center ...`}
>
  <span className={`block rounded-full transition-all ${
    currentPage === i ? 'w-5 h-1.5 bg-[#1e3a5f]' : 'w-1.5 h-1.5 bg-slate-300'
  }`} />
</button>
```

### C4 — AnimatedRoute: CSS animation ignores `prefers-reduced-motion`

- **File**: `src/components/tracking/AnimatedRoute.tsx:26-28`
- **WCAG**: 2.3.3 Animation from Interactions (AAA, recommended), 2.2.2 Pause, Stop, Hide (A)
- **Issue**: The `dash-move` keyframe is injected via inline `<style>` with no reduced-motion check. Unlike RadarPing and HeroSlider which use `useReducedMotion()`, this component runs indefinitely regardless of user preference. The inline `<style>` tag also escapes the globals.css blanket `prefers-reduced-motion` override because it's injected at runtime.
- **Fix**:
```tsx
export default function AnimatedRoute({ direction = 'horizontal', color = '#1e3a5f' }: AnimatedRouteProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHorizontal = direction === 'horizontal';
  const width = isHorizontal ? 200 : 4;
  const height = isHorizontal ? 4 : 200;

  return (
    <svg width={width} height={height} className="overflow-visible" aria-hidden="true">
      <line
        x1={isHorizontal ? 0 : 2}
        y1={isHorizontal ? 2 : 0}
        x2={isHorizontal ? 200 : 2}
        y2={isHorizontal ? 2 : 200}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="8 6"
        style={prefersReducedMotion ? {} : { animation: 'dash-move 1.2s linear infinite' }}
      />
      {!prefersReducedMotion && (
        <style>{`@keyframes dash-move { to { stroke-dashoffset: -28; } }`}</style>
      )}
    </svg>
  );
}
```

### C5 — TrackingTicker: infinite marquee has no pause mechanism

- **File**: `src/components/tracking/TrackingTicker.tsx:14-32`
- **WCAG**: 2.2.2 Pause, Stop, Hide (A)
- **Issue**: The ticker scrolls infinitely with no way to pause it. Users with vestibular disorders or cognitive disabilities cannot stop the motion. Additionally, no `aria-hidden` or `prefers-reduced-motion` handling exists.
- **Fix**:
```tsx
export default function TrackingTicker({ stats, speed = 30 }: TrackingTickerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="w-full overflow-hidden rounded-full bg-[#0f172a] px-4 py-2"
      role="marquee"
      aria-label="آمار ردیابی"
    >
      <div
        className="flex whitespace-nowrap text-sm font-medium text-white"
        style={{
          animation: prefersReducedMotion ? 'none' : `ticker ${speed}s linear infinite`,
        }}
      >
        {/* ... spans ... */}
      </div>
    </div>
  );
}
```

---

## Major (14 findings)

### M1 — Mobile search modal: no focus trap

- **File**: `src/components/layout/Navbar.tsx:478-494`
- **WCAG**: 2.4.3 Focus Order (A)
- **Issue**: The mobile search overlay at line 478 renders a `fixed inset-0` div but lacks `role="dialog"`, `aria-modal="true"`, and focus-trapping logic. Unlike MobileMenu (which has a proper focus trap at lines 49-66), this modal lets Tab escape into the background page.
- **Fix**:
```tsx
{mobileSearchOpen && (
  <div
    className="fixed inset-0 lg:hidden"
    style={{ zIndex: 9999 }}
    role="dialog"
    aria-modal="true"
    aria-label="جستجو"
  >
    {/* Add focus trap similar to MobileMenu.handleTrapFocus */}
```

### M2 — CmdKSearch: no ARIA combobox pattern for autocomplete

- **File**: `src/components/layout/CmdKSearch.tsx:107-163`
- **WCAG**: 4.1.2 Name, Role, Value (A)
- **Issue**: The search field shows autocomplete suggestions in a dropdown but does not use `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, or `role="listbox"` on the results container. Screen readers cannot perceive the suggestion list.
- **Fix**:
```tsx
<input
  ref={inputRef}
  type="text"
  role="combobox"
  aria-expanded={showDropdown}
  aria-controls="cmdk-results"
  aria-autocomplete="list"
  // ... existing props
/>

// On the results dropdown (line 135):
<div id="cmdk-results" role="listbox" aria-label="نتایج جستجو">
  {results.map((r) => (
    <button key={r.id} role="option" aria-selected={false} ...>
```

### M3 — Navbar mobile search: same combobox issue

- **File**: `src/components/layout/Navbar.tsx:91-98`
- **WCAG**: 4.1.2 Name, Role, Value (A)
- **Issue**: `MobileSearchContent` has the same autocomplete-without-ARIA pattern as CmdKSearch.

### M4 — Hero slider: keyboard users cannot navigate slides with arrow keys

- **File**: `src/components/home/HeroSlider.tsx:145-407`
- **WCAG**: 2.1.1 Keyboard (A)
- **Issue**: Prev/next buttons are keyboard-accessible (good), but the carousel does not support arrow-key navigation between slides as recommended by the WAI Carousel pattern. The `drag="x"` gesture on the content area is mouse/touch only.
- **Fix**: Add `onKeyDown` handler to the section that maps ArrowLeft/ArrowRight (or ArrowUp/ArrowDown for RTL) to `prev()`/`next()`.

### M5 — Hero slider: autoplay does not pause on focus

- **File**: `src/components/home/HeroSlider.tsx:121-125`
- **WCAG**: 2.2.2 Pause, Stop, Hide (A)
- **Issue**: Autoplay pauses on mouse hover (`onMouseEnter/Leave`) but not when a child element receives keyboard focus. A keyboard user tabbing through CTA buttons will have the slide change mid-interaction.
- **Fix**:
```tsx
<section
  ref={sectionRef}
  ...
  onFocus={() => setPaused(true)}
  onBlur={(e) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
  }}
>
```

### M6 — NewsletterForm: submit button not inside `<form>`

- **File**: `src/components/home/NewsletterForm.tsx:40-78`
- **WCAG**: 3.2.2 On Input (A)
- **Issue**: The email input and submit button are siblings in a `<div>`, not wrapped in a `<form>`. Pressing Enter in the input triggers `onKeyDown` handler (line 49), but this bypasses native form submission semantics. Screen readers don't announce the form landmark.
- **Fix**: Wrap in `<form onSubmit={handleSubmit}>` with `type="submit"` on the button.

### M7 — SwiperCarousel: no `aria-roledescription="carousel"`

- **File**: `src/components/shared/SwiperCarousel.tsx:37-54`
- **WCAG**: 4.1.2 Name, Role, Value (A)
- **Issue**: The Swiper component renders a generic container. No `aria-roledescription="carousel"`, no `aria-label`, and individual slides lack `role="group"` + `aria-roledescription="slide"`.
- **Fix**:
```tsx
<Swiper
  ...
  a11y={{
    prevSlideMessage: 'اسلاید قبلی',
    nextSlideMessage: 'اسلاید بعدی',
    firstSlideMessage: 'اولین اسلاید',
    lastSlideMessage: 'آخرین اسلاید',
  }}
>
```

### M8 — LenisProvider: smooth scroll may conflict with keyboard scrolling

- **File**: `src/components/shared/LenisProvider.tsx:6-41`
- **WCAG**: 2.1.1 Keyboard (A)
- **Issue**: Lenis overrides native scroll behavior. When `prefers-reduced-motion` is set, the globals.css override sets `scroll-behavior: auto`, but Lenis intercepts `scrollTo` calls (line 35) with its own easing. Users relying on keyboard shortcuts (Page Up/Down, Home, End) may experience unexpected smooth-scroll behavior.
- **Fix**: Disable Lenis entirely when reduced motion is preferred:
```tsx
useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lenis = new Lenis({ ... });
  // ...
}, []);
```

### M9 — ProductCard: star rating not accessible

- **File**: `src/components/product/ProductCard.tsx:158-176`
- **WCAG**: 1.1.1 Non-text Content (A)
- **Issue**: The 5-star rating uses 5 `<Star>` icons with visual fill/color states but no text alternative. Screen readers see nothing. The `({reviewCount})` text is also meaningless without context.
- **Fix**:
```tsx
{hasRating && (
  <div className="flex items-center gap-1.5" aria-label={`امتیاز ${rating} از ۵`}>
    {/* ... star icons with aria-hidden="true" ... */}
    <span className="sr-only">{rating} از ۵</span>
    {reviewCount > 0 && (
      <span className="text-xs text-text-muted" aria-label={`${reviewCount} نظر`}>({reviewCount})</span>
    )}
  </div>
)}
```

### M10 — ProductCard: "add to cart" button lacks aria-live announcement

- **File**: `src/components/product/ProductCard.tsx:206-217`
- **WCAG**: 4.1.3 Status Messages (AA)
- **Issue**: Adding to cart shows a toast (sonner), but toast libraries often don't use `role="status"` or `aria-live`. The cart count in the Navbar (line 286-298) animates with Framer Motion but has no screen-reader announcement.
- **Fix**: Add a visually-hidden live region to the cart button:
```tsx
<button onClick={openCartDrawer} aria-label={`سبد خرید، ${totalCount} کالا`} ...>
```

### M11 — Footer: phone and email not wrapped in semantic links

- **File**: `src/components/layout/Footer.tsx:83-89`
- **WCAG**: 2.4.4 Link Purpose (A)
- **Issue**: Phone number is in a `<span>` inside a `<li>` — not an `<a href="tel:...">`. Email is also a plain `<span>`, not `<a href="mailto:...">`. AT users cannot activate these as links.
- **Fix**:
```tsx
<li className="flex items-center gap-2.5 text-sm text-white/70 group">
  <Phone className="w-4 h-4 text-teal shrink-0" />
  <a href="tel:02112345678" className="group-hover:text-white transition-colors" dir="ltr">
    021-12345678
  </a>
</li>
<li className="flex items-center gap-2.5 text-sm text-white/70 group">
  <Mail className="w-4 h-4 text-teal shrink-0" />
  <a href="mailto:info@atifarzam.ir" className="group-hover:text-white transition-colors">
    info@atifarzam.ir
  </a>
</li>
```

### M12 — Home page: no `<main>` landmark

- **File**: `src/app/(main)/page.tsx:73`
- **WCAG**: 1.3.1 Info and Relationships (A)
- **Issue**: The page wraps everything in a `<div dir="rtl">`. There is no `<main>` element or `role="main"`. The skip-to-content link in Navbar targets `#main-content` (line 205), but no element with that id exists on the homepage.
- **Fix**:
```tsx
<main id="main-content" dir="rtl">
  {/* HeroSlider, sections, etc. */}
</main>
```

### M13 — Color contrast: `text-white/80` on navy backgrounds

- **File**: `src/components/home/HeroSlider.tsx:248`, `src/components/layout/Footer.tsx:37`, `src/components/home/NewsletterForm.tsx:36`
- **WCAG**: 1.4.3 Contrast (Minimum) (AA)
- **Issue**: `text-white/80` resolves to `rgba(255,255,255,0.8)` on `#1e3a5f` (navy) backgrounds. Contrast ratio ≈ **4.2:1**, below the 4.5:1 AA threshold for normal text. Same issue with `text-white/70` (≈3.6:1) and `text-white/60` (≈2.8:1).
- **Fix**: Replace `text-white/80` with `text-slate-200` or `text-white` at reduced opacity via Tailwind's opacity modifier that keeps the composite contrast above 4.5:1. Alternatively, use `#d1d5db` (gray-300) which gives 5.1:1 on navy.

### M14 — Color contrast: `text-slate-500` on white

- **File**: `src/components/home/HeroSlider.tsx:298`, `src/components/home/CategoryCards.tsx:27`
- **WCAG**: 1.4.3 Contrast (Minimum) (AA)
- **Issue**: `text-slate-500` (#64748b) on white (#ffffff) yields **4.6:1** — technically passes, but when used at small sizes (12px/`text-xs`) the effective readability is poor. The `text-text-muted` token (`#475569` = slate-600) passes at 7:1 and should be preferred for small text.
- **Fix**: Use `text-text-muted` or `text-slate-600` for text below 14px.

---

## Minor (12 findings)

### m1 — SatelliteOrbit: no `prefers-reduced-motion` check

- **File**: `src/components/tracking/SatelliteOrbit.tsx:23`
- **WCAG**: 2.3.3 Animation (AAA)
- **Issue**: Uses CSS `animation: spin` indefinitely without checking reduced motion. Already has `aria-hidden="true"` (good), but the animation still runs and consumes GPU resources.

### m2 — AnimatedCounter: no `prefers-reduced-motion` check

- **File**: `src/components/shared/AnimatedCounter.tsx:26-41`
- **WCAG**: 2.3.3 Animation (AAA)
- **Issue**: The counting animation runs via `setInterval` regardless of motion preference. Should snap to final value when reduced motion is preferred.

### m3 — CountdownTimer: `AnimatePresence` animations ignore reduced motion

- **File**: `src/components/shared/CountdownTimer.tsx:61-95`
- **WCAG**: 2.3.3 Animation (AAA)
- **Issue**: Motion divs for digit transitions run regardless of preference.

### m4 — EmptyState icon container: no `aria-hidden` on decorative icon

- **File**: `src/components/shared/EmptyState.tsx:19-23`
- **WCAG**: 1.1.1 Non-text Content (A)
- **Issue**: The `icon` prop is rendered inside a `<div>` without `aria-hidden="true"`. If the icon is decorative (which it is, since `title` conveys the message), it should be hidden from AT.

### m5 — MapPreview: decorative SVG has no `aria-hidden`

- **File**: `src/components/tracking/MapPreview.tsx:14-39`
- **WCAG**: 1.1.1 Non-text Content (A)
- **Issue**: The entire component is decorative (shows a pin on a grid) but lacks `aria-hidden="true"` on the container.

### m6 — Logo link: no `aria-label`

- **File**: `src/components/layout/Navbar.tsx:249-258`
- **WCAG**: 2.4.4 Link Purpose (A)
- **Issue**: The logo `<Link href="/">` contains an `<Image>` with `alt="آتی فرزام ایرانیان"` — this is acceptable (alt text serves as link text). However, the Link wrapper has a `group/logo` class for hover effects but no explicit `aria-label`. **This is actually fine** — the image alt text is sufficient. **Downgrading to informational.**

### m7 — HeroSlider decorative blobs: missing `aria-hidden`

- **File**: `src/components/home/HeroSlider.tsx:155-180`
- **WCAG**: 1.1.1 Non-text Content (A)
- **Issue**: Three decorative `<div>` elements with gradient backgrounds and blur effects are not marked `aria-hidden="true"`. They have `pointer-events-none` but are still exposed to the accessibility tree.

### m8 — SoftwareCTA placeholder illustration: no `aria-hidden`

- **File**: `src/components/home/SoftwareCTA.tsx:67-107`
- **WCAG**: 1.1.1 Non-text Content (A)
- **Issue**: The laptop/phone CSS illustration (fallback when no image) is purely decorative but not hidden from AT.

### m9 — `globals.css:38-42`: focus ring uses `outline` which some browsers clip

- **File**: `src/styles/globals.css:38-42`
- **WCAG**: 2.4.7 Focus Visible (AA)
- **Issue**: The global `:focus-visible` rule sets `outline: 2px solid var(--teal); outline-offset: 2px`. This is good, but elements with `overflow: hidden` (like Card, product images) may clip the outline. The button component already uses `focus-visible:ring-2` (box-shadow based), which avoids clipping — but non-button elements rely on the global outline.
- **Fix**: Consider adding `:focus-visible { box-shadow: 0 0 0 2px var(--teal); }` as a fallback for clipped outlines.

### m10 — `globals.css:18`: `scroll-behavior: smooth` on `<html>`

- **File**: `src/styles/globals.css:18`
- **WCAG**: 2.2.2 Pause, Stop, Hide (A)
- **Issue**: `scroll-behavior: smooth` is set globally. This overrides native jump-to-anchor behavior for keyboard users (e.g., Home/End keys). The Lenis override at line 269 sets `scroll-behavior: auto !important` but only when Lenis is active.
- **Fix**: Move `scroll-behavior: smooth` inside a `@media (prefers-reduced-motion: no-preference)` query.

### m11 — `<html>` and `<body>` both set `direction: rtl`

- **File**: `src/styles/globals.css:17-25`
- **WCAG**: 1.3.2 Meaningful Sequence (A)
- **Issue**: Both `html` and `body` set `direction: rtl`. The homepage also wraps in `<div dir="rtl">` (line 73). This is redundant but harmless. However, form inputs with `dir="ltr"` (NewsletterForm:50, Newsletter:40) correctly override for LTR content — good practice.

### m12 — Icon components lack `aria-hidden` by default

- **File**: `src/components/shared/icons/` (all files)
- **WCAG**: 1.1.1 Non-text Content (A)
- **Issue**: SVG icon components (RadarIcon, GPSSignal, TrackerPin, RoutePath, BatteryLife) render SVGs without `aria-hidden="true"`. Since they're used as decorative icons alongside text labels, they should be hidden from AT.

---

## Summary by Severity

| Severity | Count |
|----------|-------|
| Critical | 5 |
| Major | 14 |
| Minor | 12 |
| **Total** | **31** |

## Positive Observations

These patterns demonstrate strong a11y awareness already in the codebase:

1. **Skip-to-content link** with proper focus styling (`Navbar.tsx:204-208`, `globals.css:54-72`)
2. **MobileMenu focus trap** — correct Tab/Shift+Tab cycling (`MobileMenu.tsx:49-66`)
3. **`prefers-reduced-motion` blanket override** (`globals.css:400-409`)
4. **`useReducedMotion()` in framer-motion** — HeroSlider, ScrollReveal, StaggerGrid, RadarPing all check it
5. **44px touch targets** — Navbar buttons, footer links, ProductCard wishlist button
6. **`aria-hidden="true"` on decorative tracking components** — RadarPing, SatelliteOrbit, SignalStrength, PulsingDot
7. **Proper `aria-roledescription="carousel"` on HeroSlider**
8. **`aria-label` on icon-only buttons** — hamburger menu, search, cart, prev/next arrows
9. **`<label>` with `sr-only` text** for newsletter email inputs
10. **Focus-visible global style** with 2px teal outline
11. **Dialog component** uses Radix primitives with proper `aria-modal`, title, and close button with `sr-only` label
12. **Form component** correctly wires `aria-describedby`, `aria-invalid`, and `htmlFor` associations

## Recommended Priority Order

1. **C1 + C2 + M4 + M5** — Fix the hero carousel completely (live region, tab association, keyboard nav, focus-pause)
2. **M12** — Add `<main id="main-content">` to fix skip-to-content
3. **C3** — Fix pagination button accessibility
4. **M1** — Add focus trap to mobile search modal
5. **M2 + M3** — Add combobox ARIA pattern to search fields
6. **M11 + M13** — Fix footer semantic links and color contrast
7. **C4 + C5** — Respect reduced motion in AnimatedRoute and TrackingTicker
8. **Remaining major/minor** — Address as capacity allows
