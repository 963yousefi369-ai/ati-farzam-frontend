# Persian-First RTL Rules (Rewritten — Horizontal QA Pass)

> RTL is not a mirror of LTR. It is a native direction for a native language. This file is a full rewrite, not a patch — the previous `rtl.md` was written before several downstream files existed and had drifted out of sync with them.

**Stage index used throughout this document** (for traceability of every rule below):

| # | File | # | File |
|---|------|---|------|
| 1 | brand.md | 8 | spacing.md |
| 2 | philosophy.md | 9 | motion.md |
| 3 | visual-language.md | 10 | icons.md |
| 4 | colors.md | 11 | hero.md |
| 5 | typography.md | 12 | sections.md |
| 6 | layout.md | 13 | accessibility.md (this pair) |
| 7 | components.md | 14 | rtl.md (this file) |

---

## Why This File Was Rewritten, Not Patched

The previous `rtl.md` predates Stage 4 (colors.md), Stage 5 (typography.md), Stage 6 (layout.md), Stage 7 (components.md), Stage 9 (motion.md), Stage 10 (icons.md), and Stage 11 (hero.md). Those later stages each independently re-derived their own RTL behavior (icon mirroring, breadcrumb direction, numeral handling, the Fix Mark glyph) and are now the more current, more specific sources of truth. Rather than patch six scattered contradictions into the old file, this version is rebuilt from Stage 6 and Stage 10 outward, with Stage 14 reduced to exactly what those files don't already cover: the language-level and layout-level RTL rules that have no other home.

---

## RTL Philosophy (unchanged)

This project is designed for Persian-speaking users. RTL is the primary layout direction, not a CSS toggle applied after the fact. Text is right-aligned by default, reading flow is right-to-left, and every layout decision is made RTL-first.

---

## Part 1 — Mock Page Walkthrough (Product Detail Page)

To surface real conflicts rather than theoretical ones, the Product Detail page wireframe from Stage 6 was mocked section-by-section against this file's previous rules. Findings below are the actual contradictions found — not a general audit.

```
NAV (compact, sticky)
BREADCRUMB — خانه › محصولات › [نام دستگاه]
PRODUCT HERO — split, image + price/CTA + Fix Mark on total cost
KEY FEATURES — 3-column, icon + label
HOW IT'S INSTALLED — numbered steps
SPECS / COMPARISON TABLE
TESTIMONIALS — static quotes, no carousel
RESPONSE PROMISE — navy band, Fix Mark on response time
FAQ — accordion
FOOTER — navy, Fix Mark on "12 years"
```

### Conflict 1 — Breadcrumb has no coverage in the previous rtl.md
The previous file never mentioned breadcrumbs at all, despite Stage 6 (layout.md) and Stage 10 (icons.md) both defining breadcrumb behavior in detail (separator mirrors from `›` to `‹`; hairline row, minimal padding, per Stage 8). A developer relying only on the old `rtl.md` would have no instruction for the single most visible directional element on this page.
**Fix location:** Stage 14 (this file) — resolved below in the authoritative mirror table.

### Conflict 2 — The old chevron rule is a blanket rule; the accordion's chevron is the exception
The previous file stated, without qualification: *"Chevron direction ✅ Mirrors — Chevron points left for next."* Applied literally to the FAQ accordion on this page, that rule tells a developer to flip the accordion toggle chevron based on text direction. But Stage 6 and Stage 10 both explicitly carve out the accordion chevron as **not** mirroring — it rotates 180° by open/closed *state*, unrelated to reading direction. Built per the old rule, the FAQ chevrons on this exact page would render backwards at rest.
**Fix location:** Stage 14 (this file) — the mirror table below distinguishes "directional chevron" (mirrors) from "state-rotation chevron" (does not).

### Conflict 3 — The Fix Mark and Location Pin are absent from the old file entirely
This page uses the Fix Mark glyph up to twice (total-price on the hero split, response-time in the Response Promise band, per Stage 9's "three places it plays" list) and the previous `rtl.md`'s "does not mirror" table lists only generic universal icons (play/pause, checkmark, close, logos, charts, maps) — it was written before the Fix Mark existed (Stage 3) and never updated. A developer who only checked the old file would have no explicit answer for whether this signature glyph mirrors.
**Fix location:** Stage 14 (this file) — added below.

### Conflict 4 — Price numerals: old rule and new rule need reconciling, not contradicting
The previous file's numeral table said prices use **Persian numeral glyphs** (`۱,۲۵۰,۰۰۰ تومان`). Stage 6 (layout.md) later added a *direction* rule for the same element: the number sequence is kept LTR-embedded via `unicode-bidi: embed` so the digit order doesn't reverse mid-sentence. These are not actually opposed — one is about which numeral glyphs to draw, the other is about which text-direction algorithm wraps them — but the old file never referenced Stage 6's addition, so an implementer reading only one file could reasonably drop the other property. On the Fix Mark price line specifically, both must be applied together: Persian numeral glyphs, wrapped in `unicode-bidi: embed`.
**Fix location:** Stage 14 (this file) — merged into one rule below.

### Conflict 5 — Orphaned carousel rules
The previous file (and the previous `accessibility.md`) both specify RTL and keyboard behavior for a testimonial/image carousel (mirrored next/prev arrows, `role="region"`, `aria-roledescription="carousel"`, Arrow Left/Right keyboard pattern). Stage 12 (sections.md) confirms testimonials render as a static list of quotes with **no star ratings and no carousel mechanic** at all. These rules describe a component that does not exist anywhere in the finalized system.
**Fix location:** Stage 14 (this file, removed below) and Stage 13 (accessibility.md, removed — see that file's own note).

### Conflict 6 — Font token is stale
Not an RTL-specific bug, but caught during the mock build: the previous file hardcoded `--font-family: 'Vazirmatn', system-ui, sans-serif;`. Stage 5 (typography.md) replaced Vazirmatn as the **primary** typeface with **IRANSansX**, keeping Vazirmatn only as a same-family fallback (`'IRANSansX', 'Vazirmatn', system-ui, sans-serif`). Any component still referencing the old token in isolation will silently render the wrong primary font.
**Fix location:** Stage 14 (this file) — token corrected below. (No change to Stage 5 itself; that file is already correct — the old rtl.md just hadn't caught up.)

---

## Alignment

| Context | Alignment | Tailwind | Notes |
|---------|-----------|----------|-------|
| Headings | Right | `text-right` | Default in RTL |
| Body text | Right | `text-right` | Never centered past 2 lines |
| Section headers | Center | `text-center` | Acceptable for decorative headers only |
| Captions | Right | `text-right` | Always |
| Data / numbers | Left | `text-left` | Numbers read LTR even in RTL context |
| Coordinates (Stage 9's live-fix panel) | Left | `text-left` | Monospace, `--font-mono`, per Stage 5 |
| Tables | Right headers / left numbers | — | Data tables: headers right, figures left |

---

## Typography for RTL (corrected)

```css
/* Corrected per Stage 5 (typography.md) — primary face changed, Vazirmatn is now fallback-only */
--font-family: 'IRANSansX', 'Vazirmatn', system-ui, sans-serif;
```

- Persian body line-height: 1.6–1.8 (Stage 5 keeps this range unchanged by the font swap).
- Heading line-height: 1.3, not 1.2 — Stage 5 loosened this specifically for IRANSansX's taller ascenders/descenders on ی, پ, ژ. Do not reuse the old 1.2 value.
- Never apply `letter-spacing` to Persian text, in either typeface.

---

## Persian Numerals

| Context | Format | Example |
|---------|--------|---------|
| UI copy | Persian numerals | ۱۰,۰۰۰ مشتری |
| Data displays | Latin numerals | 10,000 |
| **Prices (including any Fix Mark price line)** | Persian numerals, **and** the digit sequence wrapped in `unicode-bidi: embed` (Stage 6) | `<span style="unicode-bidi: embed">۱,۲۵۰,۰۰۰</span> تومان` |
| Coordinates (Stage 11 live-fix panel) | Latin numerals, `--font-mono` | `35.7219° N, 51.4215° E` |
| Phone numbers | Latin numerals | 09121234567 |

---

## Logical Properties (unchanged, restated)

```css
/* BAD */
padding-left: 16px;
border-left: 1px solid;

/* GOOD */
padding-inline-start: 16px;
border-inline-start: 1px solid;
```

```tsx
<div className="ps-4 pe-4 ms-4 me-4 border-s">
```

---

## Authoritative Mirror Table (supersedes the previous version entirely)

This table folds in Stage 6's and Stage 10's element-by-element answers, resolves Conflicts 1–5 above, and is the single place to check before shipping any directional UI. Where Stage 6 or Stage 10 already states a rule, it is restated here verbatim rather than re-derived, so this file never drifts from them again.

| Element | Mirrors in RTL? | Source | Note |
|---|---|---|---|
| Breadcrumb separator (`›` → `‹`) | ✅ Yes | Stage 6, Stage 10 | Wayfinding arrow, points backward along reading direction |
| Hero gradient (135deg) | ✅ Yes | Stage 3, Stage 6 | Mirrors to reflect from top-right |
| "Next / Previous" arrows | N/A — no carousel exists | Stage 12 | Previous file's carousel-arrow rule removed; see Conflict 5 |
| Split layout column order | ✅ Yes | Stage 6 | Visually-left column becomes visually-right |
| Step/progress numbering | ✅ Yes | Stage 6 | Step 1 anchors on the right |
| Icon-plus-label position | ✅ Position flips; glyph itself is not redrawn | Stage 6, Stage 10 | Icon sits adjacent to whichever side is read first |
| Arrow glyph inside a CTA | ✅ Yes | Stage 6 | Points toward RTL "forward" (visually left) |
| **Accordion chevron** | ❌ No — rotates by open/closed state only | Stage 6, Stage 10 | Corrects the old blanket "chevron mirrors" rule; see Conflict 2 |
| **The Fix Mark crosshair glyph** | ❌ No, never | Stage 3, Stage 6, Stage 9 | Symmetric, static, marks a fact not a direction; its animation (Stage 9's "The Fix") inherits the same non-mirror rule |
| **Location pin icon** | ❌ No | Stage 3, Stage 6 | Symmetric shape |
| Route / Lock / ShieldCheck / Bell / TriangleAlert / Signal-bars icons | ❌ No | Stage 10 | Object glyphs, none point anywhere |
| Grid-lines decorative element | ❌ No | Stage 3, Stage 6 | Static, geometric, reads the same either direction |
| Price + currency figure | ⚠️ Numeral glyphs are Persian; digit sequence direction is LTR-embedded | Stage 6 (direction) + this file (glyph choice) | Both properties apply together — see Conflict 4 |
| Card internal vertical stack | ❌ No | Stage 6 | Purely vertical composition |
| Grid item order (feature/product grids) | ❌ No manual reordering | Stage 6 | `direction: rtl` on the container already reorders; manual `order-*` double-flips |
| Play/pause, phone, checkmark, close (×) icons | ❌ No | This file | Universal symbols, unchanged from the previous version |
| Logos | ❌ Never | This file | Never mirror a logo |
| Charts/graphs, maps | ❌ No | This file | Data direction and geography are universal |

### Rule of Thumb
Ask: **does this glyph point somewhere, or does it just sit somewhere?** Pointing glyphs mirror (arrows, breadcrumb separators, split-column order). Sitting glyphs don't (object icons, the Fix Mark, decorative grid lines). State-driven rotation (the accordion chevron) is neither — it responds to open/closed, not to direction, and must never be tied to the RTL/LTR toggle.

---

## Cards, Forms, Mobile Nav (unchanged from the previous file — no conflicts found here)

These sections were checked against Stage 6, Stage 7, and Stage 8 during this review and found consistent; they are restated without modification.

### Card Layout
- Card content is right-aligned; text starts from the right.
- Card images are full-width, no mirroring needed.
- Card actions sit on the visual left (RTL "end"); price on the right, CTA on the left.

### Forms
```tsx
<input className="text-right" dir="rtl" placeholder="نام خود را وارد کنید" />
<input className="text-left" dir="ltr" placeholder="email@example.com" />
<input className="text-left" dir="ltr" placeholder="09121234567" />
```

### Mobile Navigation
Drawer opens from the right; hamburger sits left, logo sits right — unchanged.

---

## RTL Testing Checklist (updated)

- [ ] Text is right-aligned; body text never centered past 2 lines
- [ ] Breadcrumb separator flips to `‹` (Conflict 1 — previously untested)
- [ ] Accordion chevrons rotate by state only, never by text direction (Conflict 2)
- [ ] Fix Mark and location pin render identically in RTL and LTR builds (Conflict 3)
- [ ] Price lines use Persian numeral glyphs **and** `unicode-bidi: embed` together (Conflict 4)
- [ ] No carousel-specific RTL logic exists anywhere in the codebase (Conflict 5)
- [ ] `--font-family` resolves to IRANSansX first, Vazirmatn only as fallback (Conflict 6)
- [ ] Grid columns and split layouts flow right-to-left with no manual `order-*` overrides
- [ ] Forms have right-aligned labels; email/phone/URL inputs stay `dir="ltr"`
- [ ] Modals are centered, not shifted
- [ ] No mirrored logos or icons

---

## Summary

RTL remains the native direction for this project. This revision changes nothing about that philosophy — it closes six gaps that appeared only because this file was written before Stage 4, 5, 6, 7, 9, and 10 existed: a missing breadcrumb rule, an over-broad chevron rule, a missing Fix Mark/pin entry, an under-specified price-numeral rule, orphaned carousel logic, and a stale font token. Stage 6 and Stage 10 remain the primary sources for any new directional element; this file now points to them instead of silently disagreeing with them.
