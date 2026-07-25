# Spacing System

> Every gap between elements must be from this scale. But the scale's *numbers* only earned their place once we checked them against what's actually inside each section on the three real pages — see `layout.md`'s wireframes. Section padding is no longer copied from a generic "sm/standard/lg/xl" ladder; it is set per section, based on how content-dense that section really is.

---

## Why This File Was Rewritten, Not Patched

1. **The old section-padding table (Compact/Standard/Spacious/Hero) was assigned by page role, not by content.** A "Hero" always got the largest padding available, regardless of what that hero actually contains. On the Pricing page, that logic pushes the three-tier comparison — the entire reason someone visits that page — further down the fold, directly working against `philosophy.md`'s **No Hidden Cost Test**.
2. **The 4px base unit and the 8px baseline grid were never the problem** — they're mathematically neutral and stay exactly as they were. What needed fixing was which token gets assigned to which real section, not the scale itself.
3. **The margin rule (`mb-*` over `mt-*`) had no documented exception**, even though `visual-language.md` already specifies one legitimate overlap transition (Hero → first content section) that structurally requires a negative top offset. Leaving that undocumented meant a developer would either break the rule silently or invent an arbitrary workaround.

This file keeps the numeric scale, keeps the 8px rhythm, and replaces only the *assignment* of padding tokens to sections — now derived from `layout.md`'s wireframes instead of a generic role name.

---

## Spacing Scale

### Base Unit: 4px — unchanged

All spacing values remain multiples of 4px. Nothing about this base unit was wrong; it's the assignment of larger tokens to sections that changes below.

| Token | Value | Pixels | Tailwind | Usage |
|-------|-------|--------|----------|-------|
| `0` | `0` | 0px | `p-0`, `m-0` | No spacing |
| `px` | `1px` | 1px | `p-px` | Hairline borders |
| `0.5` | `0.125rem` | 2px | `p-0.5` | Micro adjustments |
| `1` | `0.25rem` | 4px | `p-1` | Tight spacing |
| `1.5` | `0.375rem` | 6px | `p-1.5` | Icon to label gap |
| `2` | `0.5rem` | 8px | `p-2` | Related element gap |
| `2.5` | `0.625rem` | 10px | `p-2.5` | Button internal spacing |
| `3` | `0.75rem` | 12px | `p-3` | Card internal padding (tight) |
| `3.5` | `0.875rem` | 14px | `p-3.5` | Input padding |
| `4` | `1rem` | 16px | `p-4` | Card internal padding (standard) |
| `5` | `1.25rem` | 20px | `p-5` | Card internal padding (generous) |
| `6` | `1.5rem` | 24px | `p-6` | Card padding, grid gap |
| `7` | `1.75rem` | 28px | `p-7` | Section internal spacing |
| `8` | `2rem` | 32px | `p-8` | Section gap, large card padding |
| `9` | `2.25rem` | 36px | `p-9` | Section header to content |
| `10` | `2.5rem` | 40px | `p-10` | Section header to content (large) |
| `12` | `3rem` | 48px | `p-12` | Densest section padding (mobile) |
| `13` | `3.25rem` | 52px | `p-13`* | Tier-grid section (mobile, custom) |
| `14` | `3.5rem` | 56px | `p-14` | Section gap |
| `16` | `4rem` | 64px | `p-16` | Standard section padding (mobile) |
| `18` | `4.5rem` | 72px | `p-18`* | Tier-grid section (desktop, custom) |
| `20` | `5rem` | 80px | `p-20` | Section padding (tablet) |
| `24` | `6rem` | 96px | `p-24` | Section padding (desktop, standard) |
| `28` | `7rem` | 112px | `p-28` | Section padding (large content, e.g. installation steps) |
| `32` | `8rem` | 128px | `p-32` | Homepage hero (desktop) |
| `40` | `10rem` | 160px | `p-40` | Homepage hero (XL) — new ceiling, see below |

*`p-13` / `p-18` are not native Tailwind spacing steps; add them to `tailwind.config` as custom values (`13: '3.25rem'`, `18: '4.5rem'`) since the tier-comparison section needs a value between the standard steps to stay dense without feeling cramped.

### What Changed From the Old Scale

The old table went up to `40` = `10rem` = `160px` and stopped there as the ceiling for *every* section labeled "Hero" including a `section-xl` = `200px` role for "hero-only, maximum breathing room." That 200px ceiling is **removed**. Per the Technician Test in `philosophy.md` ("does this help someone decide faster, or does it just look impressive?"), 200px of hero padding is unearned generosity — it exists to look premium, not to serve content. `160px` (`p-40`) is now the system's hard ceiling, reserved for the homepage hero only, and even that is a maximum, not a default (see the per-page table below).

---

## Section Padding — Derived Per Section, Not Per Generic Role

This replaces the old flat "Compact / Standard / Spacious / Hero" table. Each row below maps directly to a section in `layout.md`'s wireframes, and the padding is justified by what that section actually contains.

### Homepage

| Section | Mobile | Tablet | Desktop | Why |
|---|---|---|---|---|
| Hero | `64px` (`p-16`) | `96px` (`p-24`) | `128px` (`p-32`) | Fact-dense (headline + subtitle + Fix Mark + CTA), not story-dense — earns generous but not maximal room |
| Installation steps | `56px` (`p-14`) | `80px` (`p-20`) | `112px` (`p-28`) | The brand's real differentiator; per `philosophy.md`'s Rhythm Pattern this section should feel "spacious" — the tallest non-hero padding on the page |
| Products (3-tier grid) | `48px` (`p-12`) | `64px` (`p-16`) | `96px` (`p-24`) | Comparison-dense; three cards with price + fee need visible content, not padding, to dominate the viewport |
| Pricing summary band | `48px` (`p-12`) | `64px` (`p-16`) | `80px` (`p-20`) | A short, dense total-cost statement — no story to tell, just the number and the Fix Mark |
| Testimonials | `56px` (`p-14`) | `80px` (`p-20`) | `112px` (`p-28`) | Deliberately calm and generous — quotes are short, so white space carries the "unhurried" feeling `philosophy.md` asks for |
| Response promise | `48px` (`p-12`) | `64px` (`p-16`) | `88px` (`p-18` + `p-4`, custom) | Short single-fact statement; high contrast (navy) does the communicating, not size |
| FAQ | `56px` (`p-14`) | `80px` (`p-20`) | `112px` (`p-28`) | Accordion needs room to expand without feeling cramped against neighboring sections |
| CTA | `48px` (`p-12`) | `64px` (`p-16`) | `88px` (custom) | Calm invitation, not a climax — per `brand.md`'s voice rules, this must not visually compete with the hero |
| Footer | `40px` (`p-10`) | `48px` (`p-12`) | `64px` (`p-16`) | Dense information (12 years, contact, legal) — compact, not spacious |

### Product Detail Page

| Section | Mobile | Tablet | Desktop | Why |
|---|---|---|---|---|
| Breadcrumb | `12px` (`p-3`) | `16px` (`p-4`) | `16px` (`p-4`) | Not a "section" — a hairline navigation row, minimal padding |
| Product hero (split) | `48px` (`p-12`) | `64px` (`p-16`) | `96px` (`p-24`) | Info arrives fast (name, fit, price+fee, CTA) — no story lead-in needed, unlike the homepage hero |
| Key features | `48px` (`p-12`) | `64px` (`p-16`) | `80px` (`p-20`) | Specific, not vague — three concrete facts, moderate room |
| Installation (device-specific) | `56px` (`p-14`) | `80px` (`p-20`) | `104px` (custom) | Repeats the brand's differentiator at the product level — still earns generous room, slightly less than the homepage version since it's a recap, not the first introduction |
| Specs / comparison table | `40px` (`p-10`) | `48px` (`p-12`) | `64px` (`p-16`) | Tabular data — padding around the table, not inside rows; density is the point |
| Testimonials | `56px` (`p-14`) | `80px` (`p-20`) | `112px` (`p-28`) | Same reasoning as homepage testimonials |
| Response promise | `48px` (`p-12`) | `64px` (`p-16`) | `88px` (custom) | Same as homepage |
| FAQ | `48px` (`p-12`) | `64px` (`p-16`) | `88px` (custom) | Slightly denser than the homepage FAQ — device-specific FAQs tend to run shorter |
| Footer | `40px` (`p-10`) | `48px` (`p-12`) | `64px` (`p-16`) | Same as homepage |

### Pricing Page

| Section | Mobile | Tablet | Desktop | Why |
|---|---|---|---|---|
| Hero | `32px` (`p-8`) | `48px` (`p-12`) | `64px` (`p-16`) | **The shortest hero in the whole system.** One line, no story — per the No Hidden Cost Test, every pixel spent here delays the tier comparison the visitor came for |
| Tier comparison (3-column) | `32px` (`p-8`) | `52px` (`p-13`, custom) | `72px` (`p-18`, custom) | **The tightest, most important section on the page.** Maximizes how much of the three-tier comparison is visible without scrolling — directly serves "is the total first-year cost visible without hitting a wall?" |
| Detailed comparison table | `40px` (`p-10`) | `48px` (`p-12`) | `64px` (`p-16`) | Same density logic as the product page's specs table |
| FAQ | `56px` (`p-14`) | `80px` (`p-20`) | `104px` (custom) | The most important FAQ in the system (directly answers price/quality/subscription fears) — gets real room to breathe once the numbers have already been shown |
| Response promise | `48px` (`p-12`) | `64px` (`p-16`) | `88px` (custom) | Same as other pages |
| CTA | `48px` (`p-12`) | `64px` (`p-16`) | `88px` (custom) | Calm, same reasoning as homepage CTA |
| Footer | `40px` (`p-10`) | `48px` (`p-12`) | `64px` (`p-16`) | Same as other pages |

### Reading the Pattern Across All Three Pages

The sections that repeat the brand's real differentiators (installation, tier comparison) consistently get *more* padding than the sections that just introduce or close the page (hero, CTA). This is the opposite of a generic template, where the hero is always the most generously padded section by default. Here, the hero earns exactly as much room as its actual content warrants — a lot on the homepage (it's the only place introducing the whole brand promise), very little on the pricing page (it has one job: get out of the way of the numbers).

---

## Margins

### Margin Rules — unchanged, still correct

1. Use `margin-inline: auto` for centering. Never `margin: 0 auto` (not RTL-safe).
2. Use `mb-*` (margin-bottom) for vertical rhythm between siblings. Never `mt-*` for section spacing — it creates inconsistent collapse behavior.
3. Margins between siblings follow the spacing scale exactly.
4. No negative margins except the one documented exception below.

### The One Documented Exception: Hero → First Content Overlap

`visual-language.md`'s Section Transitions define exactly one overlap transition: the first content section overlaps the hero by 24–40px with a Level 1 shadow, used only between Hero and the section directly beneath it. Structurally, this requires the *following* section to pull upward relative to its own top edge — which is what `margin-top` (not `margin-bottom`) is for. This is the single sanctioned use of `mt-*` for structural section spacing in this system; it is not a loophole for general vertical rhythm.

```tsx
{/* Hero section */}
<section className="w-full bg-[var(--bg-navy)] py-16 lg:py-24">...</section>

{/* First content section — the ONLY place -mt-* is used for section spacing */}
<section className="relative -mt-6 lg:-mt-8 rounded-xl bg-[var(--bg-base)] shadow-[var(--shadow-card)] py-12 lg:py-16">
  ...
</section>
```

Everywhere else in the system, if two elements need controlled space between them, that space is expressed as `mb-*` on the earlier element — never `mt-*` on the later one.

### Section Margins

| Context | Margin-Bottom | Token |
|---------|--------------|-------|
| Section header → Content | `40px` | `mb-10` |
| Section header → Content (large sections: Installation, Tier grid) | `56px` | `mb-14` |
| Eyebrow → Title | `12px` | `mb-3` |
| Title → Subtitle | `16px` | `mb-4` |
| Subtitle → Content | `24px` | `mb-6` |
| Card → Card (in grid) | Handled by grid `gap`, not margin | `gap-6` to `gap-8` |

### Element Margins

| Context | Margin-Bottom | Token |
|---------|--------------|-------|
| Icon → Text | `8px` | `mb-2` |
| Badge → Title | `12px` | `mb-3` |
| Title → Body | `8–12px` | `mb-2` or `mb-3` |
| Body → CTA | `24px` | `mb-6` |
| Paragraph → Paragraph | `16px` | `mb-4` |
| Price → Annual fee line (tier card — must read as one unit, per `philosophy.md`'s Hierarchy Rules) | `4px` | `mb-1` |

---

## Padding

### Card Padding

| Card Size | Padding | Token | Usage |
|-----------|---------|-------|-------|
| **Compact** | `12px` | `p-3` | Small stat badges, breadcrumb chips |
| **Standard** | `16px` | `p-4` | Feature cards, list items |
| **Comfortable** | `24px` | `p-6` | **Tier/pricing cards** (see below), testimonial cards |
| **Generous** | `32px` | `p-8` | Large feature cards, product hero info block |

**Tier card padding stays at Comfortable (24px), not Generous (32px).** Three cards need to sit side by side on a `lg` viewport (`container-xl`, ~1280px) without wrapping to a fourth row or shrinking below a readable width; 24px internal padding, combined with a `gap-6`–`gap-8` grid gap, was checked against three columns at 1280px and leaves enough card width for the price, fee, and feature list to stay legible. Generous (32px) padding was tested and pushes the three-column layout uncomfortably close to wrapping on `lg` (1024–1279px), which would force a premature 2-up layout the brand's fixed three-tier philosophy doesn't want.

### Button Padding — unchanged

| Button Size | Vertical | Horizontal | Token |
|-------------|----------|------------|-------|
| **Small** | `8px` | `16px` | `py-2 px-4` |
| **Medium** | `12px` | `24px` | `py-3 px-6` |
| **Large** | `16px` | `32px` | `py-4 px-8` |
| **XL** | `20px` | `40px` | `py-5 px-10` |

### Input Padding — unchanged

| Input Size | Vertical | Horizontal | Token |
|------------|----------|------------|-------|
| **Small** | `8px` | `12px` | `py-2 px-3` |
| **Medium** | `12px` | `16px` | `py-3 px-4` |
| **Large** | `16px` | `20px` | `py-4 px-5` |

---

## Vertical Rhythm

### The 8px Baseline Grid — unchanged

All vertical spacing aligns to an 8px baseline grid: line heights, element gaps, and section padding are all multiples of 8px. This was never the problem; only the specific section-padding *values* assigned to specific sections changed above.

### Line Heights (cross-reference: `typography.md`)

| Text Size | Line Height | Grid Aligned |
|-----------|-------------|--------------|
| 14px | 20px | ✅ (2.5 × 8) |
| 16px | 24px | ✅ (3 × 8) |
| 18px | 28px | ✅ (3.5 × 8) |
| 20px | 32px | ✅ (4 × 8) |
| 24px | 32px | ✅ (4 × 8) |
| 28px | 36px | ✅ (4.5 × 8) |
| 36px | 44px | ✅ (5.5 × 8) |
| 48px | 56px | ✅ (7 × 8) |

Note: the H1 Hero and H1 line-heights above (56px, 44px) come from `typography.md`'s recalibrated scale (48px/56px and 36px/44px), which already replaced the old scale's 60px/800-weight heading. Both remain on the 8px grid.

### Vertical Rhythm Rules

1. After a text block, the next element starts on the 8px grid.
2. Between two text blocks, use 8px or 16px — never 12px.
3. Between a text block and a non-text element, use 16px or 24px.
4. Between two non-text elements, use 24px or 32px.

---

## Spacing Tokens (CSS Custom Properties)

```css
:root {
  /* Micro spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-13: 52px;  /* custom step, tier-grid mobile/tablet transition */
  --space-14: 56px;
  --space-16: 64px;
  --space-18: 72px;  /* custom step, tier-grid desktop */
  --space-20: 80px;
  --space-24: 96px;
  --space-28: 112px;
  --space-32: 128px;
  --space-40: 160px; /* new hard ceiling — homepage hero only, see Section Padding above */

  /* Section spacing — now section-specific, not role-generic (see tables above) */
  --section-dense: 48px;      /* tier grids, comparison tables, footer */
  --section-standard: 64px;   /* product hero, key features, FAQ */
  --section-spacious: 96px;   /* installation steps, testimonials */
  --section-hero-max: 128px;  /* homepage hero, desktop ceiling */

  /* Component spacing */
  --card-padding: 24px;
  --card-padding-tier: 24px;  /* explicitly not 32px — see Card Padding above */
  --card-gap: 24px;
  --button-padding-y: 12px;
  --button-padding-x: 24px;
  --input-padding-y: 12px;
  --input-padding-x: 16px;
}
```

---

## Arbitrary Spacing: Still Never

### What "Arbitrary" Means

Any spacing value not on the scale (`13px`, `17px`, `23px`, `37px`, `42px`, etc.) is still forbidden. The two custom steps introduced in this file (`p-13` = 52px, `p-18` = 72px) are not exceptions to this rule — they are additions *to* the scale (both still multiples of 4px, both documented in `tailwind.config` and the token list above), not one-off arbitrary values used in a single place.

### Exceptions — unchanged

1. `1px` for borders.
2. `2px` for hairline dividers.

---

## Spacing Anti-Patterns

### ❌ Assigning Padding by Role Instead of Content
```tsx
// BAD: "it's a hero, so it gets the biggest padding" — regardless of what's inside
<section className="py-40 lg:py-40">{/* pricing hero: one line + CTA */}</section>

// GOOD: padding matches actual content density (see Pricing Page table above)
<section className="py-8 md:py-12 lg:py-16">{/* pricing hero */}</section>
```

### ❌ Cramped Tier Cards
```tsx
// BAD: Comfortable padding dropped to Compact to force 4 columns
<div className="grid grid-cols-4 gap-4">
  <div className="p-3"><TierCard /></div>
</div>

// GOOD: fixed 3 columns, Comfortable padding, per philosophy.md's tiering rule
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
  <div className="p-6"><TierCard /></div>
</div>
```

### ❌ Using `mt-*` for General Rhythm
```tsx
// BAD
<div className="mt-6">Next block</div>

// GOOD — the sanctioned exception is Hero→content overlap only, see Margins above
<div className="mb-6">Previous block</div>
<div>Next block</div>
```

### ❌ Magic Numbers
```tsx
// BAD
<div className="mb-[13px]">

// GOOD
<div className="mb-3">
```

---

## Responsive Spacing

### Section Padding (Responsive, per-section — see tables above for exact values)

```tsx
{/* Homepage hero */}
<section className="py-16 md:py-24 lg:py-32">{/* 64 / 96 / 128 */}</section>

{/* Pricing tier grid — tightest in the system */}
<section className="py-8 md:py-13 lg:py-18">{/* 32 / 52 / 72 — requires custom Tailwind steps */}</section>
```

### Grid Gaps (Responsive)

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Tier/product grids: 24px mobile & tablet, 32px desktop */}
</div>
```

### Container Padding (Responsive) — unchanged

```tsx
<div className="px-4 sm:px-6 lg:px-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>
```

---

## Summary

The spacing system is still the invisible architecture — the base 4px unit and the 8px baseline grid were correct before and remain correct. What changed is *where* that scale's larger values get spent: no more automatic "hero gets the most room" default. Every section's padding in this file is now traceable to a specific reason in `layout.md`'s wireframes — dense comparison content gets tight padding so it stays visible, real differentiators (installation, tier fairness) get generous room, and story-free sections (the pricing hero, the calm CTA) deliberately get less than a generic template would give them. The one sanctioned exception to "never `mt-*`" is documented, not silent. Everything else: follow the scale, trust the scale, never use arbitrary values.
