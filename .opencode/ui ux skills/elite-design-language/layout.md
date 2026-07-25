# Layout System

> Structure creates freedom. But structure copied from a generic template creates nothing — it just looks like everyone else's grid. This file is derived from what this specific business actually needs to show on three real pages, not from a default SaaS layout kit.

---

## Why This File Was Rewritten, Not Patched

Three concrete problems, consistent with why `typography.md` and `colors.md` were also rewritten rather than edited:

1. **The old section-padding scale had no relationship to actual content.** It offered one generic ladder (`section-sm` → `section-xl`) and let every page reach for whichever felt "premium." A hero with one headline, one subtitle, and a CTA does not need the same breathing room as a three-tier pricing comparison that must stay above the fold per `philosophy.md`'s **No Hidden Cost Test**. Padding must be derived from what's actually inside the section, not from a size name that sounds impressive.
2. **The old "Alternating Sequence" was a single generic pattern applied to every page.** It included a `[Stats]` section with no connection to this brand's real content (`brand.md` names no "impressive stats" moment — it names installation, pricing transparency, response time, and 12 years). Real pages need real wireframes, built from what `philosophy.md`'s Rhythm Pattern and `brand.md`'s Page-Type table actually specify for Homepage, Product Detail, and Pricing.
3. **RTL guidance stopped at "CSS Grid handles it automatically."** True for column order, false for icons, breadcrumbs, arrows, and the Fix Mark glyph — each has a different, specific answer, and the old file gave none. Getting this wrong risks mirroring a symmetric, deliberately-static glyph (the Fix Mark, per `visual-language.md`) as if it were a directional wayfinding arrow, or leaving a "next" arrow pointing the wrong way in a right-to-left reading flow.

This file resolves all three: real wireframes for the three key pages, a padding scale derived from what's actually in each section, and an explicit, element-by-element RTL table.

---

## Container System

Unchanged in structure — this part of the old file was never the problem, and containers are typeface- and brand-neutral.

### Container Widths

| Token | Max-Width | Usage |
|-------|-----------|-------|
| `container-sm` | `640px` | Narrow content (auth forms, single-column text) |
| `container-md` | `768px` | FAQ accordions, legal pages |
| `container-lg` | `1024px` | Product detail body, comparison tables |
| `container-xl` | `1280px` | Main content area, feature/product grids |
| `container-2xl` | `1440px` | Full-width sections with inner padding |
| `container-full` | `100%` | Hero sections, full-bleed backgrounds |

### Container Rules

1. Every content block sits inside a container. No content spans the full viewport width without one.
2. Container padding is responsive: Mobile `16px` → Tablet `24px` → Desktop `32px` → Large `48px`.
3. Containers are centered with `margin-inline: auto` (RTL-safe; never `margin: 0 auto`, per `spacing.md`).
4. A full-width section background contains a `container-xl` (or `container-lg` for dense tabular content — see Pricing wireframe below) for its actual content.

```tsx
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

---

## Wireframes: The Three Key Pages

Each wireframe shows section order and **relative visual weight** (bar width = relative vertical space the section actually earns, based on its real content — not a uniform stack). These wireframes are the source the Spacing section below is derived from; do not assign section padding without checking a section's role here first.

### 1. Homepage

Per `philosophy.md`'s Rhythm Pattern and Story Arc — calm proof, not a pitch deck.

```
┌────────────────────────────────────────────────────────┐
│ NAV (compact, sticky)                                   │ ▏ thin
├────────────────────────────────────────────────────────┤
│ HERO — navy gradient                                     │
│  "You want to know where it is, without wondering        │ ███████░ medium
│   if you overpaid." + 12-years Fix Mark + primary CTA    │ (fact-dense,
│                                                            │  not story-dense)
├────────────────────────────────────────────────────────┤
│ HOW INSTALLATION WORKS — white, step-by-step              │
│  [1]──[2]──[3]  spacious, one differentiator per step     │ ██████████ tall
│                                                            │ (this IS the
│                                                            │  differentiator —
│                                                            │  give it room)
├────────────────────────────────────────────────────────┤
│ PRODUCTS — soft gray, 3-column tier cards                  │
│  [Entry]     [Popular]     [Premium]                        │ ████████ tall,
│  who it's for · device price + annual fee, every card       │  but denser
│                                                              │  (comparison-dense)
├────────────────────────────────────────────────────────┤
│ PRICING SUMMARY — white, total-cost band                    │
│  device + subscription side by side, Fix Mark on total       │ ██████ medium-dense
├────────────────────────────────────────────────────────┤
│ TESTIMONIALS — navy or soft, quiet, unpolished quotes         │ █████░░░ calm,
│  real speech, imperfect grammar kept                          │  generous
│                                                                 │  white space
├────────────────────────────────────────────────────────┤
│ RESPONSE PROMISE — navy, high-contrast, one stated fact        │ ███░░░░░ short,
│  "We answer within X." + Fix Mark                                │  high-impact
├────────────────────────────────────────────────────────┤
│ FAQ — white, accordion                                          │ ██████ medium
│  price / quality / subscription fears answered directly           │
├────────────────────────────────────────────────────────┤
│ CTA — soft, single, calm invitation, no urgency                    │ ███░░░░░ short
├────────────────────────────────────────────────────────┤
│ FOOTER — navy, 12 years + contact, dense but calm                    │ ████░░░ compact
└────────────────────────────────────────────────────────┘
```

**Reading of the bars:** the tallest sections are *Installation* and *Products* — the two places where this brand's real differentiators (precision, fair tiering) are demonstrated, not claimed. The hero and CTA are deliberately short: per the Technician Test, a large empty hero or a dramatic CTA reads as "trying to look impressive," which this brand explicitly refuses to be.

### 2. Product Detail Page

Per `brand.md`'s page-type table — primary feeling Trustworthy, secondary Responsiveness.

```
┌────────────────────────────────────────────────────────┐
│ NAV                                                       │ ▏ thin
├────────────────────────────────────────────────────────┤
│ BREADCRUMB — home › products › [device name]               │ ▎ hairline,
│                                                              │  not a "section"
├────────────────────────────────────────────────────────┤
│ PRODUCT HERO — split 50/50 or 40/60                          │
│  [device image]   [name, who it's for, price+fee, CTA]       │ ██████ medium-dense
│                     Fix Mark beside total first-year cost      │  (info arrives
│                                                                  │  fast, no story)
├────────────────────────────────────────────────────────┤
│ KEY FEATURES — 3-column, specific not vague ("premium")         │ █████ medium
├────────────────────────────────────────────────────────┤
│ HOW IT'S INSTALLED FOR THIS DEVICE — steps, spacious              │ ███████ tall
│                                                                     │ (repeats the
│                                                                     │  differentiator,
│                                                                     │  device-specific)
├────────────────────────────────────────────────────────┤
│ TECH SPECS / COMPARISON TABLE — dense, tabular, container-lg         │ ████ dense,
│  vs. the other two tiers, plain numbers                                │  compact
├────────────────────────────────────────────────────────┤
│ TESTIMONIALS (device-specific if available)                             │ █████░ calm
├────────────────────────────────────────────────────────┤
│ RESPONSE PROMISE — navy band                                              │ ███░░░ short
├────────────────────────────────────────────────────────┤
│ FAQ (device-specific)                                                       │ ████ medium
├────────────────────────────────────────────────────────┤
│ FOOTER                                                                        │ ████░ compact
└────────────────────────────────────────────────────────┘
```

### 3. Pricing Page

Per `brand.md`'s page-type table — primary feeling Fair-Pricing, secondary Trustworthy. This page has one job: pass the **No Hidden Cost Test** as fast as possible.

```
┌────────────────────────────────────────────────────────┐
│ NAV                                                       │ ▏ thin
├────────────────────────────────────────────────────────┤
│ SHORT HERO — one line, no story                             │ ██░░░░░ shortest
│  "Every price, including the yearly fee. No exceptions."       │  hero in the
│                                                                   │  whole system —
│                                                                   │  get to numbers fast
├────────────────────────────────────────────────────────┤
│ THREE-TIER COMPARISON — the actual page content, above the        │
│ fold as much as viewport allows                                     │
│  [Entry]        [Popular]        [Premium]                            │ █████████ TALLEST,
│  who it's for · device price · annual fee · Fix Mark on total          │  tightest padding
│                                                                          │  (max content
│                                                                          │  visibility)
├────────────────────────────────────────────────────────┤
│ DETAILED COMPARISON TABLE — full feature-by-feature, dense              │ ████ dense
│  container-lg, not container-xl (readable row widths)                    │
├────────────────────────────────────────────────────────┤
│ FAQ — price / quality / subscription fears, most important FAQ            │ █████ medium
│  on the whole site                                                          │
├────────────────────────────────────────────────────────┤
│ RESPONSE PROMISE — navy band                                                 │ ███░░░ short
├────────────────────────────────────────────────────────┤
│ CTA — calm, single                                                             │ ███░░░ short
├────────────────────────────────────────────────────────┤
│ FOOTER                                                                           │ ████░ compact
└────────────────────────────────────────────────────────┘
```

**Why the hero is shortest here, of all three pages:** a visitor who reached the Pricing page already wants numbers, not a story. Per the **No Hidden Cost Test** (`philosophy.md`), the first-year total must be visible "without hitting a 'Contact us for pricing' wall" — a large, story-telling hero pushes the tier cards further down the viewport and works against that test. The homepage hero is allowed more room because it has to state the core promise before any pricing exists on that page; the pricing page has no such job.

---

## Grid System

### 12-Column Grid (Tailwind)

| Columns | Tailwind | Usage |
|---------|----------|-------|
| 1 | `grid-cols-1` | Mobile default, single-column content |
| 2 | `grid-cols-2` | Stat pairs, image pairs |
| 3 | `grid-cols-3` | **Product tier cards (always 3 — see `philosophy.md`: "three product tiers, not seven")**, feature cards |
| 4 | `grid-cols-4` | Icon/step grids only |
| 6 | `grid-cols-6` | Logo/trust-badge rows, if ever used |
| 12 | `grid-cols-12` | Comparison tables needing custom column widths (rare) |

Note the change from the old file: `grid-cols-3` is called out specifically for product tiers, because `philosophy.md` fixes the tier count at exactly three. This grid is never `grid-cols-4` or `grid-cols-2` for products — a fourth tier or a collapsed two-tier layout would contradict the brand's stated tiering philosophy.

### Responsive Grid Patterns

#### Product / Pricing Tier Grid (most important grid in this system)
```
Mobile:  1 column (stacked, in the fixed order: Entry → Popular → Premium)
Tablet:  1 column, still stacked — do NOT force 2-up with 3 items (creates an uneven orphan row)
Desktop: 3 columns (all three visible together, side by side — this is the comparison moment)
```
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
```

#### Feature Grid
```
Mobile:  1 column
Tablet:  2 columns
Desktop: 3 columns
```
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

#### Split Layout (product hero, installation illustration)
```
Mobile:  1 column, stacked
Desktop: 2 columns — 40/60 or 60/40, never 50/50 when text and image carry unequal weight
```
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
```

#### Comparison Table (Pricing detail, Product specs)
Not a card grid — a real `<table>` inside `container-lg`, so rows stay legible. Never render feature comparison as stacked cards on desktop; a table is the honest, plain format for "which tier has what," matching `brand.md`'s plain-spoken voice rule more directly than a card layout would.

### Grid Rules

1. Gap is always from `spacing.md`'s scale. Product/pricing grids use `gap-6` to `gap-8` — never tighter, since these cards carry the page's most consequential decision.
2. Items align to the top by default; use `items-center` only for split layouts.
3. Don't mix column counts in the same grid — use `col-span-*` if items need different widths.
4. RTL column **order** is automatic under `direction: rtl` — no manual reordering needed for grid item sequence. (Icon- and arrow-level RTL behavior is *not* automatic — see the RTL table below.)

---

## Column Ratios

| Ratio | Use Case |
|-------|----------|
| **50/50** (`1fr 1fr`) | Rare here — used only when image and text are genuinely equal in informational weight (uncommon for this content) |
| **40/60** (`2fr 3fr`) | Product hero: image narrower, price/fee/CTA block gets more room (this is the informational payload) |
| **60/40** (`3fr 2fr`) | Installation-steps illustration: text/steps get more room, supporting image is secondary |
| **33/67** (`1fr 2fr`) | Not currently used on these three pages |
| **25/75** (`1fr 3fr`) | Not currently used on these three pages |

### Column Rules

1. Never equal-width columns with unequal content — if the price/CTA block has more informational weight than the product image, give it more space (40/60 as above).
2. Image columns can be narrower; images are flexible, price and fee text are not.
3. All split layouts stack to one column below `lg`, image or text first as reading order requires (see RTL table).

---

## Section Rhythm by Page

Unlike the old file's single generic "Alternating Sequence" applied everywhere, each page here has its own rhythm, matching its own wireframe above and its role in `brand.md`'s page-type table.

### Homepage Rhythm
```
Hero (navy, Pattern B) → Installation (white, Pattern A) → Products (soft, Pattern C)
→ Pricing summary (white, Pattern A) → Testimonials (navy or soft, Pattern C)
→ Response promise (navy, Pattern B) → FAQ (white, Pattern A) → CTA (soft, Pattern C)
→ Footer (navy, Pattern B)
```

### Product Detail Rhythm
```
Breadcrumb (hairline, not a pattern) → Product hero (white/soft split, Pattern C)
→ Key features (white, Pattern A) → Installation for this device (white, Pattern A)
→ Specs/comparison table (soft, Pattern C — table on a contained card)
→ Testimonials (soft, Pattern C) → Response promise (navy, Pattern B)
→ FAQ (white, Pattern A) → Footer (navy, Pattern B)
```

### Pricing Rhythm
```
Short hero (white or soft — NOT navy; a navy hero here would slow the user down with a
"moment" before they reach numbers, which contradicts this page's single job)
→ Tier comparison (white, Pattern A, maximum content density)
→ Detailed table (soft, Pattern C) → FAQ (white, Pattern A)
→ Response promise (navy, Pattern B) → CTA (soft, Pattern C) → Footer (navy, Pattern B)
```

Pattern definitions (unchanged from the previous system):
- **Pattern A — Light + Centered:** white/light background, centered header, grid content.
- **Pattern B — Dark + Impactful:** navy background, per `visual-language.md`'s 2-navy-section cap.
- **Pattern C — Soft + Split or Card:** soft gray background, split or card layout, moderate weight.

**Navy-cap check per page:** Homepage uses navy twice (Hero + Response Promise) — at the cap. Product page uses navy once (Response Promise only — the hero here is white/soft split, not navy, since it needs to show product imagery clearly, not a trust "moment"). Pricing page uses navy twice (Response Promise + Footer) but never in the hero, per the reasoning above — this keeps every page compliant with `visual-language.md`'s "maximum 2 navy sections per page" without exception.

---

## RTL Rules — Element by Element

The old file said "RTL is automatic" and stopped there. That's true for grid column order and text alignment, but several elements have a specific, non-automatic answer. This table is the authoritative reference — check it before shipping any directional UI.

| Element | Mirrors in RTL? | Why |
|---|---|---|
| **Breadcrumb separator** (`›` / `/`) | ✅ Yes — flips to `‹` | It's a wayfinding arrow; must point backward along the reading direction |
| **Hero gradient** (135deg) | ✅ Yes — mirrors to reflect from top-right | Already specified in `visual-language.md`; restated here for completeness |
| **"Next / Previous" arrows** (testimonial carousel, product gallery, if any) | ✅ Yes — direction and position both flip | Directional wayfinding, same logic as breadcrumbs |
| **Split layout column order** (product hero, installation illustration) | ✅ Yes — the column that was visually left becomes visually right | Reading order in RTL starts from the right |
| **Step/progress numbering** (installation steps 1→2→3) | ✅ Yes — step 1 anchors on the right | Sequential reading direction |
| **Icon-plus-label pairs** (phone icon + "Contact", location icon + address) | ✅ Position flips — icon moves to sit adjacent to the side text is read from first | The icon glyph itself is not redrawn or mirrored, only its position relative to the label changes |
| **Arrow glyph inside a CTA** (e.g., an arrow in "See exact pricing →") | ✅ Yes — points toward reading-direction "forward," which is left in RTL | Directional cue must match how the eye actually moves |
| **Accordion chevron** (FAQ open/close) | ❌ No — it rotates by open/closed *state*, not by text direction | Vertical (up/down) motion, unrelated to LTR/RTL |
| **The Fix Mark crosshair glyph** | ❌ No, never mirrored | Fully symmetric, geometric, static — per `visual-language.md`, it marks a fact, not a direction; mirroring a symmetric glyph is a meaningless operation that risks looking like an unintentional flip bug |
| **Location pin icon** | ❌ No | Symmetric shape, no inherent left/right meaning |
| **Grid-lines decorative element** (hero background) | ❌ No | A coordinate grid reads the same mirrored or not; per `visual-language.md` it's static and geometric with no directional intent |
| **Price + currency figure** | ⚠️ Partial — the number sequence stays LTR-embedded (`unicode-bidi: embed`, per `typography.md`), but surrounding label text follows normal RTL flow | Numerals are conventionally read left-to-right even inside RTL sentences |
| **Card internal vertical stack** (icon → title → body → CTA) | ❌ No | Purely vertical composition; RTL has no effect on top-to-bottom order |
| **Grid item order** (3-column feature/product grids) | ❌ No manual reordering needed | `direction: rtl` on the container already reorders items correctly; adding manual `order-*` overrides would double-flip them |

### RTL Implementation Notes

1. Set `direction: rtl` once, on `<html>`, and let CSS Grid/Flexbox handle structural mirroring — do not manually reorder grid items (this was correct in the old file and remains correct).
2. Anything with directional *meaning* (arrows, breadcrumbs, step order, split-layout column order) needs an explicit RTL variant; anything with no directional meaning (symmetric icons, the Fix Mark, decorative grid lines) must be left alone — mirroring a symmetric element doesn't make it "more RTL," it just risks an accidental visual bug.
3. When in doubt about a new icon: ask "does this glyph point somewhere, or does it just sit somewhere?" Pointing glyphs mirror; sitting glyphs don't.

---

## Responsive Structure

### Breakpoints

| Token | Min-Width | Columns | Container Padding |
|-------|-----------|---------|--------------------|
| `sm` | `640px` | 2 | `16px` |
| `md` | `768px` | 2–3 | `24px` |
| `lg` | `1024px` | 3 | `32px` |
| `xl` | `1280px` | 3–4 | `48px` |
| `2xl` | `1536px` | 4 | `48px` |

### Responsive Rules

1. Design mobile-first, starting at 375px.
2. Stack on mobile — no multi-column layouts below `md`, and the product/pricing tier grid stays single-column even at `md` (see Grid System above) to avoid an orphaned third card.
3. Headline sizes scale with `clamp()`, per `typography.md`.
4. Section padding scales per the values in `spacing.md` — which are now derived from each section's actual content density (see that file), not a flat responsive multiplier.
5. Images are always `max-width: 100%`, never overflow.

### Responsive Patterns

| Component | Mobile | Desktop |
|---|---|---|
| Navigation | Hamburger + drawer | Full horizontal nav |
| Homepage hero | Stacked, centered | Navy full-bleed, headline + Fix Mark + CTA |
| Product hero | Stacked (image → info) | Split 40/60 (info gets more room) |
| Product/pricing tiers | Stacked, in fixed order | 3 columns, side by side |
| Comparison table | Horizontal scroll inside `container-lg`, sticky first column | Full table, no scroll needed |
| Footer | Stacked columns, accordion sections | 4-column grid |

---

## Section Templates

### Standard Content Section
```tsx
<section className="w-full bg-[var(--bg-base)] py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <SectionHeader />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => <Card key={item.id} {...item} />)}
    </div>
  </div>
</section>
```

### Tier Comparison Section (Products / Pricing — the highest-stakes template in the system)
```tsx
<section className="w-full bg-[var(--bg-base)] py-12 lg:py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <SectionHeader />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {tiers.map(tier => <TierCard key={tier.id} {...tier} />)}
    </div>
  </div>
</section>
```
Note the tighter `py-12 lg:py-16` compared to the standard section's `py-16 lg:py-24` — see `spacing.md` for why.

### Dark Impact Section (Response Promise / Testimonials)
```tsx
<section className="w-full bg-[var(--bg-navy)] py-14 lg:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
      عنوان بخش
    </h2>
    <p className="text-lg text-white/80 max-w-2xl">
      توضیحات
    </p>
  </div>
</section>
```

### Split Layout Section (Product hero, Installation)
```tsx
<section className="w-full bg-[var(--bg-soft)] py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
      <div>{/* Image */}</div>
      <div>{/* Info: title, price + fee, Fix Mark, CTA */}</div>
    </div>
  </div>
</section>
```

---

## Summary

Structure still creates freedom, but only if the structure is derived from what a page actually needs to say. The three wireframes above replace one generic template with three real ones: a homepage that spends its tallest sections proving installation and fair tiering rather than telling a story; a product page that gets to price and support fast; and a pricing page whose hero is deliberately the shortest in the whole system, because its only job is to pass the No Hidden Cost Test as quickly as possible. RTL is automatic for grid order and text direction, and explicit everywhere else — arrows, breadcrumbs, and step order mirror; the Fix Mark, location pins, and decorative grid lines never do.
