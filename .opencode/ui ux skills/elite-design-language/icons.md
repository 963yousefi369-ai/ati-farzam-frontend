# Icon System

> An icon is a label with a shape, never a decoration with a meaning attached after the fact. If it needs a caption to make sense, it gets one — always, per `typography.md`'s own rule: icons have labels.

---

## Why This File Was Rewritten, Not Patched

The old icon set was never checked against `brand.md`'s actual personality spectrum — it inherited whatever style shipped with the previous "fintech-SaaS default" palette that `colors.md` and `visual-language.md` have already rejected elsewhere in this system. This file derives the icon style directly from `brand.md`'s three spectrum positions, applies the same discipline `visual-language.md` used to cut glass/glow/noise down to nothing, and resolves every icon this product actually needs (satellite, route, security, alert, and the rest) against that standard — rather than accepting a generic icon pack wholesale.

---

## Deriving the Style From the Brand Spectrum

`brand.md` places this company at three specific points, and each one has a direct, non-obvious consequence for icon shape:

| Spectrum position | Consequence for icons |
|---|---|
| **Professional, not clinical** (warm side of cold↔warm, but close to center) | Rules out cold, hairline-thin technical/blueprint icons (too clinical) *and* rules out plump, fully-rounded "friendly app" icons (too warm/consumer). The result sits in the middle: a **geometric line icon**, not a filled glyph, not a rounded blob. |
| **Direct and plain, like a technician, not a bureaucrat** (formal↔casual, left-of-center) | Icons should read instantly and literally — a lock means lock, a route means route. No abstract/artistic icon interpretations, no "clever" metaphor icons that require a caption to decode *before* the caption does its job. |
| **Understated/Established, hard anchor** (flashy↔understated) | No gradient fills, no drop shadows, no duotone color blocking, no glow, no 3D/isometric rendering. One flat stroke color, matching `visual-language.md`'s "flat, precise, calm" surface rule extended to iconography. |

### The Resulting Spec

**Thin-to-medium stroke, geometric line icons — not rounded/friendly, not hairline/clinical, not filled.**

```
Decision: Adopt a geometric stroke-icon style (2px stroke, slightly rounded
          caps/joins, sharp geometric silhouettes) rather than fully-rounded
          "friendly" icons or filled/solid icons
Alternative A: Fully rounded, soft icon style (like a consumer wellness app)
Alternative B: Filled/solid glyph icons (like a dense enterprise dashboard)
Reason: brand.md places this brand at "professional, not clinical" and
        "direct... not a bureaucrat" — rounded-soft reads as consumer/warm-app,
        filled/solid reads as dense/institutional; a geometric stroke icon is
        the literal midpoint brand.md describes
Principle: brand.md Personality Spectrum; visual-language.md's "flat, precise,
           calm" guiding principle applied to a new surface (icons)
Trade-off: A geometric stroke set has less personality than a fully custom
           illustrated icon set would; accepted because "no hype, no flourish"
           is the brand's explicit differentiator, not a limitation to design around
```

---

## Style Specification

| Property | Value | Notes |
|---|---|---|
| **Base grid** | 24×24px | Standard icon-grid convention; scales cleanly to the sizing table below |
| **Stroke width** | 2px at 24px size (scales proportionally at other sizes — see Sizing) | Matches `--border-base` visual weight elsewhere in the system; thin enough to stay quiet, thick enough to read at 16px |
| **Corners / joins** | `stroke-linecap: round`, `stroke-linejoin: round` | A small amount of softness on line *ends* keeps "professional" from tipping into "clinical/blueprint"; the icon *silhouettes* themselves stay geometric and exact, per the technician-test below |
| **Fill** | None by default — stroke only | Filled icon variants are reserved for a small, explicit list of exceptions (see Fill Exceptions) |
| **Color** | Single flat color (`currentColor`, inheriting from `colors.md` tokens) | Never two colors in one icon, never a gradient — see Color Rules |
| **Silhouette style** | Geometric, exact angles where the real object has them (a lock's shackle is a true arc, a route's turns are true angles) | Ties directly to the same "geometric and precise... never soft, organic, or glowing" rule `visual-language.md` already applies to the Grid Lines and Location Pin decorative elements |

### Fill Exceptions (the only filled icon uses in the system)

1. A small filled dot inside an otherwise-stroked icon to indicate an active/selected state (e.g., a filled center in an outline circle for "current step").
2. The Fix Mark's own center point, which is filled by definition (see below — it is not part of this icon set regardless).

Everything else stays stroke-only.

---

## Icon Library Decision: Lucide as the Base Set

Rather than commissioning a full custom icon set, this system adopts **Lucide** as its base library, because its default style already matches the spec above almost exactly (2px stroke, rounded caps/joins, geometric silhouettes, no fill) — and it's already available in this build environment. Custom icons are reserved for the small number of cases below where a library default would contradict a specific brand rule already written elsewhere in this system.

```
Decision: Use Lucide as the base icon library instead of commissioning a
          fully custom set
Alternative: Design a complete bespoke icon set from scratch
Reason: Lucide's native style (2px stroke, rounded caps, geometric silhouette,
        no fill) already matches the derived spec above almost exactly, and a
        12-year plain-spoken business doesn't need a proprietary icon language
        any more than it needs a proprietary font (typography.md made the same
        call keeping IRANSansX rather than commissioning custom lettering)
Principle: philosophy.md — "Every design decision must be justified... beauty
           without reasoning is decoration"; a custom icon set here would be
           effort spent on novelty the brand doesn't ask for
Trade-off: A handful of Lucide defaults need brand-specific overrides (see
           table below) rather than being usable completely as-is
```

---

## Per-Icon Decision: Custom vs. Library

The four icons named for this project, resolved individually rather than assumed:

| Icon need | Decision | Reasoning |
|---|---|---|
| **Satellite / GPS signal** | **Custom-adjusted**, not Lucide's default as-is. Use a simplified signal-bars glyph (three ascending bars, like a signal-strength indicator) instead of a literal satellite-dish illustration. | Lucide's literal "Satellite" glyph (dish-on-an-arm) leans toward generic "space/tech" iconography — visually adjacent to the orbital-path and satellite-constellation decorations `visual-language.md` explicitly removed ("Satellite orbital paths," "Signal dots / constellations"). A signal-bars glyph communicates "GPS signal" just as literally, reads as an instrument reading (consistent with the Fix Mark's own "instrument, not sci-fi" character), and can't be mistaken for a piece of removed decoration. |
| **Route / trip path** | **Library, as-is.** Use Lucide's `Route` icon unmodified. | A route icon is plain product vocabulary — the same literal, map-grounded category `visual-language.md` already approves for Location Pins ("stylized, simple map markers... tied to the product's own vocabulary"). Lucide's default is a simple geometric line with two waypoint dots; nothing about it reads as decorative tech atmosphere. |
| **Security / anti-theft** | **Library, as-is.** Use Lucide's `Lock` for a simple locked/secured state; use `ShieldCheck` only where a *confirmed* protective state is being communicated (e.g., "device verified"), never both interchangeably on the same page. | A lock is the most direct, technician-plain way to say "secured" — no metaphor to decode, matching brand.md's "direct... not a bureaucrat" rule. `ShieldCheck` is reserved for confirmation-flavored copy so it doesn't compete with the Fix Mark's own "confirmed fact" territory — the shield communicates a status, the Fix Mark (color + glyph) still exclusively marks the four confirmed-fact categories defined in `visual-language.md`. |
| **Alert / warning** | **Library, as-is, with a strict color rule.** Use Lucide's `TriangleAlert` for warning states and `Bell` for plain notifications — never interchange the two. | Matches `colors.md`'s single, narrowly-scoped exception: `--warning` (`#b45309`) exists *only* for "small inline icon and/or text," never a badge or color block. `TriangleAlert` in `--warning` satisfies that literally; it must never appear inside a filled badge shape, which would recreate the amber-badge anti-pattern `colors.md` explicitly retired. |

---

## The Fix Mark Is Not Part of This Icon Set

Worth stating plainly so a future contributor doesn't fold it into a general "icons" folder: the Fix Mark crosshair (`visual-language.md`) is the brand's single earned **signature glyph**, not a member of this functional icon library. It differs from every icon in this file in three concrete ways:

1. It is custom-drawn, not sourced from Lucide or any library.
2. It has a hard usage ceiling (max 3 per page, max 1 per viewport) — no other icon in this system is rationed.
3. It marks a *confirmed fact* exclusively (price, years in business, response time, install status) and is animated once via "The Fix" (`motion.md`) — no other icon in this set animates on load.

Do not resize the Fix Mark down to 16/20/24px and use it as a generic "location confirmed" inline icon in unrelated UI (e.g., a table row, a nav item). That would repeat it far past its 3-per-page ceiling and, per `visual-language.md`'s own forbidden-use list, cheapen the one signature the brand has earned.

---

## Location Pin: Custom, Matching Grid-Line Precision

`visual-language.md` already approves "Location pins: stylized, simple map markers" as one of exactly two GPS-literal decorative elements in the system (the other being Grid Lines). Because it's on that short, deliberate list — not a generic UI icon — it gets the same custom treatment as the Grid Lines rather than a stock map-pin glyph.

| Property | Spec |
|---|---|
| Shape | A simple inverted-teardrop pin with a **circular** (not filled-dot) center — kept geometric and exact, matching the Grid Lines' "clean lines, exact angles" rule |
| Stroke | Same 2px stroke-only treatment as the rest of the icon set — no filled pin shape, to avoid reading as a heavy map-app marker |
| Color | Navy (structural) by default; teal only if the pin itself is interactive (e.g., clickable on a map view) |
| Usage | Product/feature icons illustrating a literal location, per `visual-language.md` — never as generic UI decoration elsewhere |
| RTL | Not mirrored — symmetric shape, no inherent left/right meaning (`layout.md`'s own ruling on this exact icon) |

---

## Color Rules for Icons

Directly inherited from `colors.md` — icons don't get their own palette, they borrow the system's existing tokens by role.

| Context | Color token | Notes |
|---|---|---|
| Structural / heading-adjacent icon | `var(--navy)` | Section icons, step numbers, footer icons |
| Interactive icon (button, link, active nav item) | `var(--teal)` | The only accent used for anything clickable — same rule as text CTAs |
| Muted / secondary icon | `var(--text-muted)` | Disabled states, secondary metadata icons |
| Warning icon (`TriangleAlert`) | `var(--warning)` | The one documented amber-family exception in `colors.md` — inline icon only, never a badge |
| Error / destructive icon | `var(--error-text)` (`#dc2626`) | Delete, remove, destructive-action icons only |
| Confirmed-fact marker | The Fix Mark only — not a generic icon color rule | See "The Fix Mark Is Not Part of This Icon Set" above |

### Hard Rules
1. **One color per icon, always.** No duotone, no two-tone icon treatments.
2. **No gradient fill on any icon, ever** — `colors.md`'s single gradient exists on the hero background only, and its own Gradient Rules explicitly forbid applying it to icons.
3. **No drop shadow or glow behind an icon** — `visual-language.md` removed glows and limited shadow to two functional elevation levels for cards/buttons; icons are flat, ungrounded elements and get neither.
4. **Rust (`--rust`) never appears on a generic icon** — it is reserved for the Fix Mark exclusively, per `colors.md`'s own usage ceiling.

---

## Icon + Label Rule

Restated from `typography.md` because it governs every icon placement decision in this system: **an icon never appears alone if it's the only signal of meaning or a clickable target.** A phone icon next to unlabeled digits is fine; a phone icon as the entire button with no visible "Contact" text is not, per `brand.md`'s own Anti-Responsiveness Signal: *"Contact info hidden behind multiple clicks"* often starts exactly this way — an icon nobody reliably recognizes as tappable.

### Exception
Icons may appear without a visible text label only when:
1. The meaning is truly universal (a close "×", a search magnifier inside a search field that already has a placeholder), **and**
2. An `aria-label` is present for screen readers regardless.

Everything else — satellite/signal, route, lock, alert, location pin — ships with a visible text label beside it, per the rule already established for the "How Installation Works" steps in `sections.md` ("No icons-only; each step has a one-line label").

---

## Icon Sizing

| Size | Pixel value | Stroke width | Usage |
|---|---|---|---|
| **Small (inline)** | 16px | 1.5px | Inline with body/caption text — e.g., a small lock icon beside "Secure installation" in a sentence |
| **Base (default)** | 20px | 2px | Icon-plus-label pairs, form field icons, nav items |
| **Medium (button)** | 20–24px | 2px | Inside buttons alongside button text, matching `components.md`'s Medium/Large button padding scale |
| **Large (feature/step)** | 24–32px | 2px (scales to 2.5px at 32px) | Feature grids, "How Installation Works" step icons, card headers |

Sizing steps mirror the existing 4px-based scale in `spacing.md` rather than introducing a new increment system — 16/20/24/32 all already exist as spacing tokens elsewhere in this system.

---

## RTL Behavior for Icons

Directly inherited from `layout.md`'s RTL element table — restated here as the icon-specific subset, using the same test: **does the glyph point somewhere, or does it just sit somewhere?**

| Icon | Mirrors in RTL? | Why |
|---|---|---|
| Icon-plus-label pairs (phone + "Contact", pin + address) | ✅ Position flips — the icon moves to sit adjacent to whichever side is read first | Position is directional even though the glyph itself isn't redrawn |
| Arrow glyph inside a CTA | ✅ Yes — points toward RTL "forward" (visually left) | Directional wayfinding |
| Accordion chevron | ❌ No — rotates by open/closed state only | Vertical state, unrelated to text direction |
| Location Pin | ❌ No | Symmetric shape, no inherent left/right meaning (confirmed in `layout.md`) |
| Route icon | ❌ No | A route glyph's waypoint-to-waypoint shape carries no reading-direction meaning by itself |
| Lock / ShieldCheck / Bell / TriangleAlert / Signal-bars | ❌ No | All symmetric or non-directional shapes — none of them "point" anywhere |
| Breadcrumb separator | ✅ Yes — flips to the mirrored chevron | Restated from `layout.md` for completeness; it's a wayfinding arrow, not a standalone icon from this set |

**Rule of thumb for any future icon not listed above:** if it's an arrow, chevron pointing left/right, or a breadcrumb-style separator, it mirrors. If it's an object glyph (lock, bell, pin, route, signal), it doesn't.

---

## Motion on Icons

Full detail lives in `motion.md`; the icon-specific summary:

1. **No icon animates on page load** except the Fix Mark itself, which isn't part of this set (see above).
2. **Accordion chevrons rotate 180° on open/close** — the only icon-native animation in the system, state-triggered, not decorative.
3. **Hover states on interactive icons change color only** (e.g., muted → teal), no scale, no rotation, no bounce — consistent with `motion.md`'s "button hover: background color shift only; no lift, no scale" rule.
4. **No spinning "loading" icon.** Use the flat skeleton-pulse pattern from `motion.md` instead of a rotating spinner glyph — a spinning icon reads as generic SaaS chrome, and a static pulse is quieter and equally clear.

---

## Icon Anti-Patterns

```
❌ Gradient-filled icons of any kind
❌ Drop shadow or glow behind an icon
❌ Duotone / two-color icon treatments
❌ Fully rounded "friendly app" icon style (contradicts "professional, not clinical")
❌ Filled/solid glyph style as the default (reserved for the 2 explicit fill exceptions)
❌ A literal satellite-dish icon (too close to the removed orbital/constellation decoration)
❌ Icon-only clickable elements with no adjacent text label (except the narrow, documented exception)
❌ Resizing the Fix Mark down for use as a generic UI icon
❌ 3D, isometric, or skeuomorphic icon rendering
❌ Emoji used as functional icons anywhere in the product UI
❌ A spinning icon used to indicate loading (use the flat skeleton pulse instead)
❌ Rust (--rust) applied to any icon other than the Fix Mark
❌ Mixing Lock and ShieldCheck interchangeably for the same meaning on one page
```

---

## Decision Justification Template (unchanged from philosophy.md, applied to icons)

```
Decision: [What you chose]
Alternative: [What you considered]
Reason: [Why this choice serves the user better]
Principle: [Which principle from this file or brand.md/visual-language.md it follows]
Trade-off: [What you sacrifice and why it's acceptable]
```

---

## Summary

The icon system is Lucide's geometric, 2px stroke, no-fill style used almost entirely as-is — because a 12-year, plain-spoken business doesn't need a proprietary icon language any more than it needs a proprietary typeface. The four exceptions that exist (a signal-bars glyph instead of a literal satellite, a custom Location Pin matching the Grid Lines' precision, the strict Lock/ShieldCheck split, and the narrowly-scoped warning-triangle color) all trace back to a rule already written in `brand.md`, `visual-language.md`, or `colors.md` — never to a preference for novelty. The Fix Mark remains outside this system entirely, exactly as rationed and exactly as animated as `visual-language.md` and `motion.md` already specify. Every icon carries a label, every icon uses exactly one flat color, and nothing here moves, glows, or fills unless it's doing real work.
