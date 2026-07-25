# Visual Language

> The texture, depth, and atmosphere of the design. Every surface must earn its place — nothing decorative, nothing borrowed from a "premium" template that contradicts who we are.

---

## Guiding Principle

This brand is **quiet competence**, not premium showroom. Every rule below exists to make the design read as **flat, precise, and calm** — like a technician's toolbox, not a glass-and-glow SaaS dashboard. If an effect doesn't carry real meaning (state, hierarchy, or interaction), it's cut.

---

## Backgrounds

### Background Hierarchy

| Level | Token | Value | Usage |
|-------|-------|-------|-------|
| **Base** | `--bg-base` | `#ffffff` | Main content areas, cards, forms |
| **Soft** | `--bg-soft` | `#f8fafc` | Alternate sections, subtle differentiation |
| **Muted** | `--bg-muted` | `#f1f5f9` | Secondary sections, table rows, disabled areas |
| **Navy** | `--bg-navy` | `#1e3a5f` | Hero section, footer, trust/testimonial section |
| **Navy Deep** | `--bg-navy-deep` | `#0f172a` | Hero background only |

### Background Rules

1. **Never use pure black (`#000000`).** Use `--bg-navy-deep` for dark surfaces.
2. **Alternate flat backgrounds per section** for rhythm: White → Soft → White → Navy → White. No gradients used to create this rhythm — the color change alone is enough.
3. **Cards always sit on a different flat background than their parent section.** If the section is `--bg-soft`, cards are `--bg-base` (white).
4. **Navy is reserved for trust moments.** Maximum 2 navy sections per page: the hero, and one of (footer / testimonials / response-promise section). Never used decoratively elsewhere.
5. **No background images without a solid color overlay** ensuring text stays fully legible.

### Background Anti-Patterns

```
❌ Pure black backgrounds (#000000)
❌ Same background for every section (no rhythm)
❌ Bright saturated backgrounds (red, blue, green)
❌ Background images without overlay
❌ Any gradient used as a section background, except the single hero gradient below
❌ More than 2 dark/navy sections per page
```

---

## Gradients

Gradients are treated as **rare, not default.** The old palette of teal/amber/coral/sale gradients has been removed — most were decorative "SaaS default" or directly contradicted the brand's rejection of luxury/discount aesthetics. Only one gradient survives, because it earns its place in the rhythm plan (`philosophy.md`: *"Hero — calm, confident, states the core promise plainly"*).

### The Only Approved Gradient

| Name | CSS Value | Usage |
|------|-----------|-------|
| **Hero Navy** | `linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)` | Hero background only. Nowhere else. |

### Removed From This System (do not reintroduce)

```
❌ Teal gradient on buttons — CTAs are flat, solid teal (see Color below)
❌ Amber gradient — reads as "premium/luxury," an explicit anti-pattern
❌ Coral / "Sale" gradients — read as urgency/discount, explicitly forbidden by brand voice rules
❌ Glass gradient — see Glass Morphism removal below
❌ Warm subtle-gradient section backgrounds — replaced by flat --bg-soft / --bg-muted
❌ Mesh gradients (light or dark) — pure atmosphere, no functional purpose
```

### Gradient Rules (for the one gradient that remains)

1. It appears in exactly one place: the hero background.
2. Direction is 135deg (mirrors in RTL).
3. Two color stops only.
4. Never applied to text, borders, icons, or buttons.

---

## Glass Morphism

**Removed entirely.** Glassmorphism (blurred, translucent panels) is the single clearest visual signature of generic SaaS/startup design and has zero connection to a 12-year, plain-spoken vehicle-tracking business. Do not use `backdrop-filter: blur`, translucent panels, or "frosted glass" surfaces anywhere in this system — navbar, modals, and cards included.

Instead: **navbar, modals, and cards use solid backgrounds with the depth rules below.** Elevation is communicated through shadow alone, not translucency.

---

## Depth

Depth exists only where it communicates something real: *this is above the page and can be interacted with.* Two levels, not five.

### Depth Levels

| Level | Elevation | Shadow | Usage |
|-------|-----------|--------|-------|
| **0 — Base** | 0px | None | Page background, static content |
| **1 — Raised** | 1–4px | `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)` | Cards, buttons, resting interactive elements |
| **2 — Active** | 4–8px | `0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07)` | Hovered cards, dropdowns, modals, popovers |

### Depth Rules

1. Only these two levels exist in the system. Do not add a third.
2. Shadows are always warm-neutral: `rgba(0,0,0,X)`, never pure black, never tinted with brand color.
3. Hover moves an element from Level 1 to Level 2 with a small lift (`translateY(-2px)`) — subtle, not a dramatic "float."
4. Shadows are functional, not atmospheric: if an element isn't interactive or genuinely layered above the page, it gets no shadow.

---

## Glows

**Removed entirely.** The previous system used glows (teal/navy/amber) as pure atmosphere and explicitly admitted they carry no state information. Per the Attention Budget principle in `philosophy.md` ("never let a decoration outweigh the price/support message"), anything decorative-only that also adds visual noise is cut. State changes (e.g., "live" tracking, an active tab) are communicated through **color and label**, never a glow.

---

## Lighting

The design still simulates a single, consistent light source — this is free consistency, not a "premium" effect.

### Lighting Rules

1. Light comes from the top-left (top-right in RTL).
2. Shadows fall down and to the right (mirrored in RTL) — see Depth section above for exact values.
3. No highlight rims, no gradient sheen on raised elements. Consistency of shadow direction is enough; do not add reflective/gloss highlights, which reintroduce a showroom feel.

---

## Noise Texture

**Removed.** It was an optional "polish" layer with no functional or brand purpose, and it adds visual texture to a system that should read as clean and plain. Surfaces are flat and free of texture overlays.

---

## GPS-Inspired Decorative Elements

Reduced from eight elements to two, keeping only the ones genuinely tied to the product's own vocabulary (coordinates, maps) rather than generic "tech atmosphere" (orbits, radar sweeps, heat maps).

### Approved Decorative Elements

| Element | Description | Usage |
|---------|-------------|-------|
| **Grid lines** | A subtle, static coordinate grid, like a map | Hero background only, beneath the gradient |
| **Location pins** | Stylized, simple map markers | Product/feature icons where a literal location is being illustrated |

### Removed (do not reintroduce)

```
❌ Pulse rings (radar-ping animation)
❌ Signal dots / constellations
❌ Satellite orbital paths
❌ Coordinate label typographic decoration
❌ Heat map density patterns
❌ Signal waves
```

### Decorative Rules

1. Maximum 5% opacity, and maximum **one** decorative element per section.
2. Never placed over text or interactive elements.
3. Fully static — no animation, no looping motion.
4. Geometric and precise (clean lines, exact angles) — never soft, organic, or glowing.

---

## Section Transitions

### Transition Types

| Type | Implementation | Usage |
|------|---------------|-------|
| **Color shift** | Flat background change (white → gray → navy) | Default, used between almost every section |
| **Divider line** | A plain 1px hairline, no glow | Between closely related sections, used sparingly |
| **Overlap** | A card section overlaps the previous section by 24–40px, with a Level 1 shadow | Hero → first content section only |

### Removed

```
❌ Gradient-overlay transitions ("fade" buffers) — solid color-shift is enough and stays honest/flat
❌ Wave/organic SVG dividers — decorative, not derived from the brand
```

### Transition Rules

1. Transitions should feel intentional but invisible in their mechanism — the user feels the section change, not the technique.
2. Dark-to-light transitions are a hard color cut, not a gradient blend — this keeps the system flat and confident rather than atmospheric.
3. The one overlapping section needs its shadow (Level 1) to read as physically layered — everywhere else, sections simply stack.

---

## Signature Visual Element: The Fix Mark

This project's single earned signature, replacing every generic SaaS flourish that came before it (scrollbar gradients, breathing pulses, spotlight cursors, gradient border beams, ambient cursor gradients — all removed).

### What It Is

A small, static, geometric crosshair glyph, borrowed from the real GPS term **"fix"** — the moment a receiver locks onto a precise coordinate:

```
      │
   ┌──┼──┐
   │  ·  │     ← center point = the confirmed value
   └──┼──┘
      │
```

- Single color only: navy or teal, matching the surrounding text. Never a gradient, never glowing.
- On first scroll into view: a single, one-time "lock-in" draw-in animation (~200ms — the crosshair lines draw inward, then stop completely). It never repeats and never pulses.

### Where It's Allowed (strict)

Beside a **specific, confirmed fact** only:
1. The total first-year price (device + annual subscription) on a pricing card.
2. The "12 years in business" statement.
3. A stated response-time commitment ("answers within X").
4. A confirmed installation status message.

**Maximum:** one visible per viewport, maximum three per page total.

### Where It's Forbidden

```
❌ Hero backgrounds, footers, navigation, dividers (no decorative/ambient use)
❌ Buttons or CTAs — it marks a fact, never an action
❌ Looping or pulsing animation of any kind
❌ Gradient fill or glow around the mark
❌ Placed over text or imagery — always beside a number, in clear whitespace
❌ Used more than once per distinct fact, or as a repeating background pattern
```

### One Additional Retained Signature: Number Pop

The only other legacy signature kept, because it communicates a real state change (a live value updating), not ambient mood:

- When a live counter updates (e.g., a location refresh), the number briefly scales to 1.05–1.1x and back.
- Hover/update-triggered only, never auto-playing, and disabled under `prefers-reduced-motion: reduce`.

---

## Color Discipline

1. **Teal is the only accent color for interaction** (buttons, links, active states). It is always flat/solid — never a gradient.
2. **Navy is structural**, used for the hero, footer, and trust sections — never as a decorative accent elsewhere.
3. **No amber, coral, or "sale" colors exist in this system.** If a promotion is ever needed, it is a small, muted, text-only label — never a color block, badge, or gradient.
4. **One accent color competes for attention per section, maximum.**

---

## Motion Discipline

1. Every animation in this document is either **hover-triggered**, **scroll-triggered (once)**, or tied to a **real state change** (live update). Nothing plays automatically or loops.
2. All motion respects `prefers-reduced-motion: reduce` and is fully disabled when set.
3. 60fps or it doesn't ship.

---

## Summary

The visual language is **flat, precise, and calm** — the visual proof of a 12-year technician who answers the phone, not a glass-and-glow SaaS product. Backgrounds are solid, depth is functional and limited to two levels, glass/glow/mesh/noise are removed entirely, and decoration is reduced to two GPS-literal elements used sparingly. The one earned signature — **The Fix Mark** — appears only beside hard, confirmed facts (price, years in business, response time, install status), visually enacting the brand's real differentiator: specific, confirmed truth, never hype.
