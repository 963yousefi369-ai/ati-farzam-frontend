# Design System — CSS Custom Properties

> This file is a full rewrite, not a patch. It contains **only extracted, sourced values** from the 14 finalized source files (brand.md, philosophy.md, visual-language.md, colors.md, typography.md, layout.md, spacing.md, components.md, hero.md, sections.md, motion.md, icons.md, rtl.md, accessibility.md). No new number, color, duration, or radius was invented here — every token below is traceable to a specific file. Where two source files gave conflicting values, the conflict was reported and resolved by explicit decision (see "Resolved Conflicts" below) rather than guessed.

---

## Resolved Conflicts (decisions made before this file was generated)

| # | Conflict | Sources in disagreement | Resolution |
|---|----------|--------------------------|------------|
| 1 | `--leading-tight` had two values in typography.md itself: `1.1` (Line Heights table, Latin baseline) vs `1.3` (Typography Tokens block + RTL Heading Adjustments rule for h1–h3, justified by IRANSansX's taller Persian ascenders) | typography.md vs. typography.md (internal) | **Kept as two separate tokens**: `--leading-tight-latin: 1.1` and `--leading-tight-rtl: 1.3`. Since the product is Persian-first, headings should use `--leading-tight-rtl` by default. |
| 2 | Button/card hover disagreed on lift + duration across 3 sources: visual-language.md (generic lift), components.md (button+card both lift, 150ms), motion.md (button = 120ms, no lift; card = 160ms, lift) | visual-language.md vs components.md vs motion.md | **Button lifts on hover.** Both button and card hover use **160ms** (motion.md's card timing) with `translateY(-2px)` and shadow Level 1 → Level 2. |

### Other discrepancies found in the source files (flagged for awareness, not blocking — already self-identified inside accessibility.md as open items)

- **Touch targets:** Button Small (~36px), Input Small (~40px), and an interactive Badge (~28px) all fall under the 44px minimum accessibility.md itself requires. accessibility.md assigns the fix to components.md (increase Small padding or add `min-height: 44px`). Not yet implemented in components.md as extracted.
- **Info badge contrast:** `--info` (`#3b82f6`) is used as 14px/500 badge text in components.md's Badge — Info variant, but only passes 3.68:1 (White) / 3.52:1 (Soft) — both fail the 4.5:1 normal-text minimum colors.md itself sets for this color. accessibility.md flags this as needing a components.md fix (darker info shade, or restrict `--info` to icon/large-text only).
- **Skeleton-pulse reduced motion:** motion.md's prose says the pulse should collapse to a static mid-opacity value under `prefers-reduced-motion`, but its own shipped CSS (`animation-duration: 0.001ms`) doesn't implement that — it just stops after one iteration. accessibility.md flags this as an open fix for motion.md.
- **Focus ring completeness:** colors.md/components.md state the focus rule as `outline: 2px solid var(--teal)` only. accessibility.md's authoritative version adds `outline-offset: 2px` and `border-radius: 4px`, and explicitly instructs components to reference *its* version. This file adopts accessibility.md's fuller version as canonical (see `--focus-ring` below) since accessibility.md explicitly claims authority over this rule.

---

## 1. Color

```css
:root {
  /* ---- Navy (structural authority) — colors.md ---- */
  --navy: #1e3a5f;
  --navy-dark: #162d4a;       /* hover states on navy elements */
  --navy-deep: #0f172a;       /* hero background, deepest dark surface */

  /* ---- Teal (interactive accent — "Instrument Teal") — colors.md ---- */
  --teal: #0e7490;            /* primary CTA, links, active/selected, success */
  --teal-dark: #155e6f;       /* hover/pressed states */
  --teal-light: #cffafe;      /* light teal backgrounds, success-light, badge bg */

  /* ---- Rust (signature — "Beacon Rust") — colors.md ---- */
  --rust: #9a3412;            /* Fix Mark glyph, confirmed-fact numbers only */
  --rust-dark: #7c2d12;       /* hover/pressed, rare interactive use */

  /* ---- Neutrals — colors.md ---- */
  --bg-base: #ffffff;
  --bg-soft: #f8fafc;
  --bg-muted: #f1f5f9;
  --border-soft: #e2e8f0;
  --border-base: #cbd5e1;
  --border-strong: #94a3b8;
  --text-heading: #0f172a;
  --text-body: #334155;
  --text-muted: #475569;

  /* ---- Semantic colors — colors.md ---- */
  --success: #0e7490;         /* = --teal, intentional reuse */
  --warning: #b45309;         /* the ONE permitted amber-family color; icon/text only, never a block/badge shape */
  --warning-dark: #92400e;
  --error: #ef4444;           /* large text / icons / backgrounds only — fails 4.5:1 for small text */
  --error-text: #dc2626;      /* use this (not --error) for small error text */
  --info: #3b82f6;            /* ⚠ fails 4.5:1 on White and Soft — large text/icons only, see Discrepancies above */

  /* ---- Shadow colors — colors.md / visual-language.md ---- */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05);   /* Depth Level 1 */
  --shadow-hover: 0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07); /* Depth Level 2 */

  /* ---- The one permitted gradient — colors.md / visual-language.md ---- */
  --gradient-hero: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); /* hero background ONLY, mirrors to 135deg reflected from top-right in RTL */
}
```

**Hard rules extracted alongside these tokens** (colors.md / visual-language.md):
- Max 2 navy sections per page. Max 3 rust (Fix Mark) instances per page, 1 per viewport.
- `--teal` and `--rust` are never used below 4.5:1 contrast for small body text.
- No gradient exists outside `--gradient-hero`. No glass/glow/mesh/noise tokens exist in this system (explicitly removed).

---

## 2. Typography

```css
:root {
  /* ---- Font families — typography.md ---- */
  --font-sans: 'IRANSansX', 'Vazirmatn', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* coordinates, tracking numbers, data tables only */

  /* ---- Font weights — typography.md (hard ceiling: Semibold/600, no Bold/Extrabold) ---- */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* ---- Font sizes (desktop) — typography.md ---- */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px — captions, helper text, badges */
  --text-base: 1rem;      /* 16px — body floor, never smaller for primary body text */
  --text-lg: 1.125rem;    /* 18px — subtitles, featured body, card titles */
  --text-xl: 1.25rem;     /* 20px — hero subtitles, large descriptions */
  --text-2xl: 1.5rem;     /* 24px — H3 */
  --text-3xl: 1.75rem;    /* 28px — H2 */
  --text-4xl: 2.25rem;    /* 36px — H1 */
  --text-5xl: 3rem;       /* 48px — H1 Hero */

  /* ---- Heading sizes + explicit line-heights (desktop) — typography.md ---- */
  --h1-hero-size: 48px;   --h1-hero-line-height: 56px;  --h1-hero-weight: 600;
  --h1-size: 36px;        --h1-line-height: 44px;       --h1-weight: 600;
  --h2-size: 28px;        --h2-line-height: 36px;       --h2-weight: 600;
  --h3-size: 24px;        --h3-line-height: 32px;       --h3-weight: 600;
  --h4-size: 20px;        --h4-line-height: 28px;       --h4-weight: 500;
  --h5-size: 18px;        --h5-line-height: 26px;       --h5-weight: 500;
  --h6-size: 16px;        --h6-line-height: 24px;       --h6-weight: 500;

  /* ---- Heading sizes (mobile) — typography.md ---- */
  --h1-hero-size-mobile: 32px;
  --h1-size-mobile: 28px;
  --h2-size-mobile: 24px;
  --h3-size-mobile: 20px;
  --h4-size-mobile: 18px;

  /* ---- Body sizes — typography.md ---- */
  --body-sm-size: 14px;   --body-sm-line-height: 20px;
  --body-base-size: 16px; --body-base-line-height: 24px;
  --body-lg-size: 18px;   --body-lg-line-height: 28px;
  --body-xl-size: 20px;   --body-xl-line-height: 32px;

  /* ---- Line heights (named tokens) — typography.md ----
     NOTE: --leading-tight had 2 conflicting source values (1.1 vs 1.3).
     RESOLVED (see Conflict 1 above): kept as two explicit tokens. */
  --leading-none: 1;
  --leading-tight-latin: 1.1;   /* Latin baseline, headings */
  --leading-tight-rtl: 1.3;     /* Persian/RTL default — use this for h1–h3 in production (IRANSansX ascenders) */
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  --leading-rtl-body: 1.7;      /* midpoint of the 1.6–1.8 Persian body range */

  /* ---- Letter spacing — typography.md / rtl.md ---- */
  --tracking-persian: 0;        /* never apply tracking/letter-spacing to Persian text, either typeface */

  /* ---- Max widths — typography.md ---- */
  --prose-width: 65ch;          /* body text */
  --subtitle-width: 50ch;
  --card-body-width: 45ch;
  --hero-subtitle-width: 55ch;
  --centered-text-width: 60ch;

  /* ---- CTA typography — typography.md ---- */
  --cta-sm-size: 14px;  --cta-sm-weight: 500;
  --cta-md-size: 16px;  --cta-md-weight: 500;
  --cta-lg-size: 18px;  --cta-lg-weight: 600;
}
```

**Responsive heading clamps (typography.md):**
```css
--h1-hero-clamp: clamp(2rem, 4vw, 3rem);       /* 32px → 48px */
--h1-clamp: clamp(1.75rem, 3vw, 2.25rem);      /* 28px → 36px */
--h2-clamp: clamp(1.5rem, 2.5vw, 1.75rem);     /* 24px → 28px */
--h3-clamp: clamp(1.25rem, 2vw, 1.5rem);       /* 20px → 24px */
```

**Rules carried with these tokens:** max 3 font weights per page; no heading heavier than Semibold(600); no gradient text anywhere; body text never below 16px (14px mobile-secondary floor only); Persian body line-height 1.6–1.8; numbers may run LTR inside RTL text via `unicode-bidi: embed`.

---

## 3. Spacing

```css
:root {
  /* ---- Base scale (4px unit) — spacing.md ---- */
  --space-0: 0px;
  --space-px: 1px;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-2-5: 10px;
  --space-3: 12px;
  --space-3-5: 14px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-9: 36px;
  --space-10: 40px;
  --space-12: 48px;
  --space-13: 52px;   /* custom step — tier-grid section, tablet */
  --space-14: 56px;
  --space-16: 64px;
  --space-18: 72px;   /* custom step — tier-grid section, desktop */
  --space-20: 80px;
  --space-24: 96px;
  --space-28: 112px;
  --space-32: 128px;
  --space-40: 160px;  /* hard ceiling — homepage hero desktop/XL only */

  /* ---- Named section-density tokens — spacing.md ---- */
  --section-dense: 48px;       /* tier grids, comparison tables, footer */
  --section-standard: 64px;    /* product hero, key features, FAQ */
  --section-spacious: 96px;    /* installation steps, testimonials */
  --section-hero-max: 128px;   /* homepage hero, desktop ceiling */

  /* ---- Component spacing — spacing.md ---- */
  --card-padding: 24px;            /* "Comfortable" default */
  --card-padding-compact: 12px;
  --card-padding-standard: 16px;
  --card-padding-tier: 24px;       /* explicitly NOT 32px — fixed for 3-column tier grid at lg */
  --card-padding-generous: 32px;
  --card-gap: 24px;                /* up to 32px on desktop, see grid gaps below */

  --button-padding-y-sm: 8px;   --button-padding-x-sm: 16px;
  --button-padding-y-md: 12px;  --button-padding-x-md: 24px;
  --button-padding-y-lg: 16px;  --button-padding-x-lg: 32px;
  --button-padding-y-xl: 20px;  --button-padding-x-xl: 40px;

  --input-padding-y-sm: 8px;   --input-padding-x-sm: 12px;
  --input-padding-y-md: 12px;  --input-padding-x-md: 16px;
  --input-padding-y-lg: 16px;  --input-padding-x-lg: 20px;

  --badge-padding-y: 4px;  --badge-padding-x: 12px;

  /* ---- Margins — spacing.md ---- */
  --margin-section-header-to-content: 40px;
  --margin-section-header-to-content-lg: 56px;  /* Installation, Tier grid */
  --margin-eyebrow-to-title: 12px;
  --margin-title-to-subtitle: 16px;
  --margin-subtitle-to-content: 24px;
  --margin-icon-to-text: 8px;
  --margin-badge-to-title: 12px;
  --margin-body-to-cta: 24px;
  --margin-paragraph-to-paragraph: 16px;
  --margin-price-to-fee-line: 4px;   /* price + annual fee must read as one unit */

  /* ---- Hero → first content overlap (the one sanctioned mt-* exception) — spacing.md / visual-language.md ---- */
  --hero-overlap-offset: 24px;      /* 24–40px range */
  --hero-overlap-offset-max: 40px;
}
```

**Container widths — layout.md:**
```css
--container-sm: 640px;    /* auth forms, single-column text */
--container-md: 768px;    /* FAQ accordions, legal pages */
--container-lg: 1024px;   /* product detail body, comparison tables */
--container-xl: 1280px;   /* main content, feature/product grids */
--container-2xl: 1440px;  /* full-width sections with inner padding */
--container-full: 100%;   /* hero sections, full-bleed backgrounds */

/* Responsive container padding */
--container-padding-mobile: 16px;
--container-padding-tablet: 24px;
--container-padding-desktop: 32px;
--container-padding-large: 48px;
```

**Breakpoints — layout.md:**
```css
--bp-sm: 640px;   /* 2 cols,   16px gutter */
--bp-md: 768px;   /* 2–3 cols, 24px gutter */
--bp-lg: 1024px;  /* 3 cols,   32px gutter */
--bp-xl: 1280px;  /* 3–4 cols, 48px gutter */
--bp-2xl: 1536px; /* 4 cols,   48px gutter */
```

**Grid gaps — spacing.md:**
```css
--grid-gap-mobile: 24px;
--grid-gap-tablet: 24px;
--grid-gap-desktop: 32px;
```

**Section padding is assigned per-section (not a generic role scale) — spacing.md.** Selected reference values (mobile / tablet / desktop):
| Section (Homepage) | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero | 64px | 96px | 128px |
| Installation steps | 56px | 80px | 112px |
| Products (3-tier grid) | 48px | 64px | 96px |
| Pricing summary band | 48px | 64px | 80px |
| Testimonials | 56px | 80px | 112px |
| Response promise | 48px | 64px | 88px (custom: 72+16) |
| FAQ | 56px | 80px | 112px |
| CTA | 48px | 64px | 88px (custom) |
| Footer | 40px | 48px | 64px |

(Product Detail and Pricing page have their own full per-section tables in spacing.md — Pricing's Hero is deliberately the shortest in the system at 32/48/64px, and its Tier comparison section is the tightest at 32/52/72px, to keep pricing above the fold.)

---

## 4. Shadows, Radius & Depth

```css
:root {
  /* ---- Radius — components.md (the one documented exception: extracted from spacing.md's rounded-xl usage) ---- */
  --radius-base: 0.75rem;  /* 12px — button, card, input, form */
  --radius-full: 9999px;   /* badge, avatar, spinner */

  /* ---- Focus-ring radius — accessibility.md (distinct token, not a component radius) ---- */
  --focus-ring-radius: 4px;

  /* ---- Shadows / Depth — visual-language.md, colors.md (2 levels only, no third) ---- */
  --shadow-none: none;                                                          /* Depth 0 — base */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05);         /* Depth 1 — raised */
  --shadow-hover: 0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07);      /* Depth 2 — active */

  /* ---- Hover lift (RESOLVED, see Conflict 2 above) ---- */
  --hover-lift: -2px;   /* translateY(-2px), applies to BOTH button and card hover */
}
```

**Rules carried with these tokens:** only 2 depth levels exist; shadows are always warm-neutral `rgba(0,0,0,X)`, never tinted; an element with no genuine interactivity/layering gets no shadow at all.

---

## 5. Motion

```css
:root {
  /* ---- Easing — motion.md (3 curves total, no 4th without updating this file) ---- */
  --ease-settle: cubic-bezier(0.16, 1, 0.3, 1);   /* Fix Mark lock-in, Number Pop — zero overshoot */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);  /* hover lifts, dropdowns, modals, accordions */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);        /* dismissals, closes, collapses */

  /* ---- Durations — motion.md, RESOLVED per Conflict 2 above ---- */
  --duration-instant: 80ms;      /* button press (scale 0.98) */
  --duration-fast: 120ms;        /* dropdown/popover close, toast dismiss-adjacent */
  --duration-base: 160ms;        /* button hover AND card hover (resolved), dropdown open */
  --duration-moderate: 200ms;    /* modal, toast, tab underline, accordion open */
  --duration-accordion-close: 180ms;
  --duration-accordion-open: 220ms;
  --duration-fix-total: 460ms;   /* "The Fix" signature animation, full 3-phase sequence */
  --duration-number-pop: 280ms;  /* Number Pop signature (120ms up + 160ms down) */
  --duration-ceiling: 600ms;     /* hard ceiling — no animation, incl. sub-phases, exceeds this */

  /* ---- Skeleton loading — motion.md (the one permitted `infinite` animation) ---- */
  --duration-skeleton-pulse: 1200ms;
  --skeleton-opacity-min: 0.6;
  --skeleton-opacity-max: 1;
}
```

**"The Fix" signature animation phases (motion.md) — total 460ms, plays max 3× per page:**
| Phase | Timing | Easing |
|---|---|---|
| 1 — Lines draw inward | 0–200ms | `--ease-settle` |
| 2 — Center point resolves (scale 0→1, no overshoot) | 200–260ms | `--ease-settle` |
| 3 — Value confirms (opacity 0→1, translateY 4px→0) | 260–460ms | `--ease-standard` |

**Number Pop (motion.md):** scale peak `1.08x`; 120ms up (`--ease-settle`) + 160ms down (`--ease-standard`) = 280ms total.

**Functional motion catalog (motion.md), consolidated with Conflict 2's resolution:**
| Interaction | Duration | Easing | Motion |
|---|---|---|---|
| Button hover | 160ms | `--ease-standard` | `translateY(-2px)`, shadow L1→L2 *(resolved: lifts)* |
| Card hover | 160ms | `--ease-standard` | `translateY(-2px)`, shadow L1→L2 |
| Button press | 80ms | `--ease-exit` | `scale(0.98)` |
| Focus ring | 0ms | — | instant, no fade-in |
| Accordion open | 220ms | `--ease-standard` | height auto-expand + chevron rotates 180° (state-based, never RTL-mirrored) |
| Accordion close | 180ms | `--ease-exit` | reverse of open |
| Dropdown/popover open | 160ms | `--ease-standard` | opacity 0→1, translateY(-4px→0) |
| Dropdown/popover close | 120ms | `--ease-exit` | reverse, faster |
| Modal open | 200ms | `--ease-standard` | backdrop fade + panel opacity 0→1, scale(0.98→1) |
| Modal close | 160ms | `--ease-exit` | reverse |
| Toast appear | 200ms | `--ease-standard` | opacity 0→1, translateY(8px→0) |
| Toast dismiss | 150ms | `--ease-exit` | reverse, faster |
| Tab underline | 200ms | `--ease-standard` | translateX() to active tab (RTL-mirrored) |
| Form validation change | 150ms | `--ease-standard` | border-color/icon swap only — no shake, no flash |

**Rules carried with these tokens:** every animation is hover-triggered, scroll-triggered-once, or tied to a real state change; no bounce/spring/elastic easing anywhere; scroll-triggered animation fires once per element per page load, never replays; `prefers-reduced-motion: reduce` disables every non-essential animation and renders the end state immediately (skeleton pulse is the sole documented exception, and its reduced-motion implementation is currently an open gap — see Discrepancies above).

---

## 6. Accessibility-Derived Tokens

```css
:root {
  /* ---- Focus ring — accessibility.md (canonical/authoritative version) ---- */
  --focus-ring-width: 2px;
  --focus-ring-color: var(--teal);
  --focus-ring-offset: 2px;
  /* Full rule: outline: 2px solid var(--teal); outline-offset: 2px; border-radius: 4px; */

  /* ---- Touch targets — accessibility.md ---- */
  --touch-target-min: 44px;           /* mobile + desktop minimum, all platforms */
  --touch-target-recommended-mobile: 48px;
  --touch-target-gap-min: 8px;        /* minimum spacing between adjacent touch targets */
}
```

**Note:** accessibility.md's own audit found that Button Small (~36px), Input Small (~40px), and interactive Badges (~28px) currently fall under `--touch-target-min`. This file records the intended token; closing the gap requires a components.md update (increase Small padding or apply `min-height: 44px` to tappable variants), which is outside the scope of a pure extraction.

---

## Summary

Every value above was extracted, not invented, from the 14 source files. Two internal conflicts were found and resolved by explicit decision rather than assumption (line-height for headings; button/card hover timing and lift behavior). Four additional discrepancies were found already flagged as open items inside accessibility.md itself (touch targets, info-badge contrast, skeleton reduced-motion, focus-ring completeness) — these are surfaced here for visibility but require changes to components.md / motion.md, not to this extraction file.
