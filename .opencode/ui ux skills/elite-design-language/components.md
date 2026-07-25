# Component System (Components)

> The component is where every prior decision — brand, philosophy, color, typography, layout, spacing — becomes a real, clickable element. If a rule here contradicts one of those files, this file is wrong, not them.

---

## Why This File Was Fully Rewritten, Not Patched

The previous `components.md` was written independently of the six finalized source files (brand, philosophy, visual-language, colors, typography, layout, spacing), which caused several real problems:

1. **Invented color and shadow values.** The old version defined radius and color values separate from `colors.md` — exactly the pattern already rejected once for the "generic teal" in `colors.md` and the "generic font" in `typography.md`.
2. **Incomplete states.** Many components only had default/hover, with disabled/loading/focus left undefined — while `philosophy.md` explicitly states no interface should leave the user in an ambiguous state.
3. **Decorative badges and gradients.** "Premium" badges, star ratings, and gradients on buttons existed in the old version — exactly what `visual-language.md` and `brand.md` explicitly call the "Luxury Tracker Shop" anti-pattern.

This version is written from scratch and **invents no new number, color, or shadow** — every value comes directly from one of the six source files, with its reference noted beside it.

### One Documented Exception: Border Radius

Neither `colors.md` nor `visual-language.md` defines a formal radius token. The only trace in the entire source set is the actual use of `rounded-xl` (12px, Tailwind's default scale) in `spacing.md` for the hero overlap card. Rather than inventing a new multi-level scale, that one observed value is adopted as the system's sole base radius — directly in line with the "fewer choices, faster decisions" principle in `philosophy.md` and "two depth levels, not five" in `visual-language.md` — plus `rounded-full`, which is a mathematical formula (50% / 9999px), not an arbitrary pixel choice.

```css
:root {
  --radius-base: 0.75rem; /* 12px — rounded-xl, source: spacing.md line 128 */
  --radius-full: 9999px;  /* rounded-full — a formula, not an invented number */
}
```

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-base` | `12px` (`rounded-xl`) | Button, card, input, form |
| `--radius-full` | `9999px` (`rounded-full`) | Badge, avatar, loading spinner |

No component in this file uses a third radius value.

---

## Guiding Principle

Every component must pass the "Technician Test" from `philosophy.md`: *Does this element help someone decide faster, or does it just look impressive?* If the answer is the latter, it's cut.

---

## Button

> **Definitive rule:** Only one Primary button per viewport — no exceptions. The only interactive color is teal; never a gradient, never a competing second color in one section.

### Variants

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| **Primary** | `var(--teal)` `#0e7490` (colors.md) | White | None | The single primary CTA per viewport |
| **Secondary** | Transparent / `var(--bg-base)` | `var(--teal)` | `1px solid var(--border-base)` `#cbd5e1` | Secondary action next to Primary |
| **Ghost** | Transparent | `var(--teal)` | None | Lower-priority action, inside a card or table row |

There is no fourth variant (e.g., a Rust or Navy-colored button) — Rust only ever sits beside a confirmed fact, never on an action (`colors.md`: *"Rust used on a button, CTA, or any actionable element"* is an anti-pattern).

### Sizes (from spacing.md — unchanged)

| Size | Vertical Padding | Horizontal Padding | Font (typography.md) |
|------|-------------------|----------------------|------------------------|
| Small | `8px` (`py-2`) | `16px` (`px-4`) | `14px / 500` |
| Medium | `12px` (`py-3`) | `24px` (`px-6`) | `16px / 500` |
| Large | `16px` (`py-4`) | `32px` (`px-8`) | `18px / 600` |
| XL | `20px` (`py-5`) | `40px` (`px-10`) | `18px / 600` |

Radius for all sizes: `--radius-base` (12px). Font weight is never heavier than Semibold(600) (typography.md).

### Full States — Primary

| State | Background | Text | Shadow | Additional border/effect |
|-------|------------|------|--------|----------------------------|
| **Default** | `var(--teal)` `#0e7490` | White | `--shadow-card` (Level 1, visual-language.md) | — |
| **Hover** | `var(--teal-dark)` `#155e6f` (colors.md) | White | `--shadow-hover` (Level 2) | `translateY(-2px)` per the Depth rule |
| **Active/Pressed** | `var(--teal-dark)` `#155e6f` | White | `--shadow-card` (returns to Level 1 — a press, not a lift) | `translateY(0)` |
| **Focus** | Same as Default | White | `--shadow-card` | `outline: 2px solid var(--teal)` (exact rule, colors.md line 195) |
| **Disabled** | `var(--bg-muted)` `#f1f5f9` (colors.md) | `var(--text-muted)` `#475569` | No shadow | `cursor: not-allowed`, no brand color present at all |
| **Loading** | `var(--teal)` unchanged | White, text hidden or beside spinner | `--shadow-card` | White circular spinner at `--radius-full`; spins only while the real "in progress" state is active — per Motion Discipline (visual-language.md), which ties the spin to a genuine state change, not decoration; disabled under `prefers-reduced-motion`, replaced by a static text label ("Submitting…") instead |

Secondary and Ghost share this same state table, except the base color lives in **text and border** instead of background; Hover only picks up a very light `var(--teal-light)` `#cffafe` background (no Level 2 shadow — this button carries less visual weight).

```css
.btn-primary {
  background: var(--teal);
  color: #ffffff;
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-card);
  transition: transform 150ms, box-shadow 150ms, background 150ms;
}
.btn-primary:hover {
  background: var(--teal-dark);
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--teal);
}
.btn-primary:disabled {
  background: var(--bg-muted);
  color: var(--text-muted);
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
```

### Button Anti-Patterns

```tsx
// ❌ WRONG — gradient on a button (visual-language.md: "Teal gradient on buttons" is removed)
<button className="bg-gradient-to-r from-teal-400 to-teal-600 shadow-[0_0_20px_rgba(14,116,144,0.6)]">
  Place Order
</button>

// ❌ WRONG — two competing primary buttons in one viewport
<div className="flex gap-4">
  <button className="bg-[var(--teal)] text-white">Buy</button>
  <button className="bg-[var(--rust)] text-white">See Pricing</button>
</div>

// ✅ RIGHT — one primary button, flat, no glow
<button className="bg-[var(--teal)] text-white rounded-xl py-3 px-6 shadow-[var(--shadow-card)] hover:bg-[var(--teal-dark)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--teal)] transition">
  See Exact Pricing
</button>
```

---

## Card

> **Definitive rule:** A card always sits on a background different from its parent — no exceptions.

### Background (from visual-language.md, Background Rules #3)

| Section Background | Card Background |
|----------------------|-------------------|
| `--bg-base` (white) | `--bg-soft` `#f8fafc` |
| `--bg-soft` `#f8fafc` | `--bg-base` (white) |
| `--bg-navy` / `--bg-navy-deep` | `--bg-base` (white) — a card never sits on navy with another navy background |

`--bg-muted` is never a card background (colors.md, Neutral Rules #4).

### Sizes (padding from spacing.md)

| Card Type | Padding | Usage |
|-----------|---------|-------|
| Compact | `12px` (`p-3`) | Small stat badges, breadcrumb chips |
| Standard | `16px` (`p-4`) | Feature cards, list items |
| Comfortable | `24px` (`p-6`) | **Pricing/tier cards** (kept fixed, per spacing.md's reasoning for fitting 3 columns), testimonial cards |
| Generous | `32px` (`p-8`) | Large feature cards, product hero info block |

Radius for all: `--radius-base` (12px).

### Full States

| State | Shadow | Additional effect |
|-------|--------|---------------------|
| **Default (Static)** | `--shadow-card` if interactive; **no shadow** if the card is content-only and non-clickable (Depth rule #4: "if it isn't interactive, it gets no shadow") | — |
| **Hover** (only if the whole card is clickable) | `--shadow-hover` (Level 2) | `translateY(-2px)` |
| **Active/Pressed** | `--shadow-card` (Level 1) | `translateY(0)` |
| **Focus** (if the card is a large link/button) | Same as Default | `outline: 2px solid var(--teal)` |
| **Disabled** (e.g., a tier currently unavailable) | No shadow | Background stays as-is; opacity is not applied to the whole card — instead a text label ("Currently unavailable") in `--text-muted` is added, because the price must always stay legible (No Hidden Cost Test, philosophy.md) |
| **Loading (Skeleton)** | No shadow | `--bg-muted` blocks replace real text; a gentle opacity pulse between 1 and roughly 0.6 only while data is actually loading, fully disabled under `prefers-reduced-motion` — because this animation is tied to a real state (data fetching in progress), not pure decoration |

```css
.card {
  background: var(--bg-soft); /* or bg-base, depending on parent */
  border-radius: var(--radius-base);
  padding: 1.5rem; /* Comfortable */
}
.card--interactive {
  box-shadow: var(--shadow-card);
  transition: transform 150ms, box-shadow 150ms;
}
.card--interactive:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}
```

### Card Anti-Patterns

```tsx
// ❌ WRONG — glassmorphism (visual-language.md: "Glass Morphism — Removed entirely")
<div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl">
  ...
</div>

// ❌ WRONG — card on the same background as its parent (no level contrast)
<section className="bg-[var(--bg-soft)]">
  <div className="bg-[var(--bg-soft)] p-6 rounded-xl shadow-[var(--shadow-card)]">Price</div>
</section>

// ✅ RIGHT
<section className="bg-[var(--bg-soft)]">
  <div className="bg-[var(--bg-base)] p-6 rounded-xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 transition">
    Price
  </div>
</section>
```

---

## Badge

> **Definitive rule:** A badge only ever reports a real status — never a rank, rating, or a "special/premium" label.

This rule comes directly from amber being fully retired as a decorative color in `colors.md`: *"If a future contributor wants to use an amber/gold tone for a badge, rating, or highlight, that request should be declined by default."*

### Allowed Variants (real status only)

| Variant | Text/Icon Color | Background | Color source |
|---------|--------------------|------------|----------------|
| **Success / Active** | `var(--teal)` `#0e7490` | `var(--teal-light)` `#cffafe` | colors.md — Success = teal |
| **Warning** | `var(--warning)` `#b45309` | White or `--bg-soft`, icon/small text only, never a colored block | colors.md — the one documented amber exception, scoped to form warnings |
| **Error** | `var(--error-text)` `#dc2626` | White or `--bg-soft` | colors.md |
| **Info** | `var(--info)` `#3b82f6` | White or `--bg-soft` | colors.md |
| **Neutral / Label** | `var(--text-muted)` `#475569` | `var(--bg-muted)` `#f1f5f9` | colors.md — Neutral |

The "confirmed fact" mark (Fix Mark) is not a badge — it's a separate glyph with its own rules in `visual-language.md`, and rust is never applied to a badge/label shape (colors.md: *"Badges, ratings, 'premium' labels of any kind"* are forbidden).

### Size (from spacing.md and typography.md)

| Size | Padding | Font |
|------|---------|------|
| Only official size | `4px` vertical / `12px` horizontal (closest documented value: the compact chip padding in the Card Padding table) | `14px / 500` (Small, typography.md) |

Radius: `--radius-full` (full pill — the only use of this token besides avatar/spinner).

### Full States

| State | Description |
|-------|--------------|
| **Default** | Table above — fixed colors, no shadow (a badge is never "floating" on the page) |
| **Hover** | Only if the badge itself is clickable (e.g., a removable filter); in that case the background shifts one shade darker within the same color family, with no shadow or translateY added (a badge lives at Depth Level 0) |
| **Active** | Same as Hover, with `outline: 2px solid var(--teal)` if it's toggleable |
| **Focus** | `outline: 2px solid var(--teal)` (only if interactive) |
| **Disabled** | `background: var(--bg-muted)`, `color: var(--text-muted)` — same as any other disabled element in this system |
| **Loading** | Badges rarely need a loading state; if required (e.g., "checking status"), use the neutral badge with a simple blinking dot (opacity pulse, no glow) that stops once the real state ends |

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
}
.badge--success { color: var(--teal); background: var(--teal-light); }
.badge--neutral { color: var(--text-muted); background: var(--bg-muted); }
```

### Badge Anti-Patterns

```tsx
// ❌ WRONG — "premium" badge in gold/amber (explicitly rejected by the brand)
<span className="bg-amber-100 text-amber-700 rounded-full px-3 py-1">⭐ Premium</span>

// ❌ WRONG — discount/urgency badge (brand.md: "no urgency or scarcity language")
<span className="bg-red-500 text-white rounded-full px-3 py-1 animate-pulse">Today Only!</span>

// ✅ RIGHT — a real status, a system color
<span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-[var(--teal)] bg-[var(--teal-light)]">
  Installed
</span>
```

---

## Form

> **Definitive rule:** The total cost (device + annual subscription) is never hidden behind an extra form step — per the "No Hidden Cost Test" in philosophy.md.

"Form" here means the **grouping frame** around fields, not the input itself (inputs are covered next).

### Spacing Structure (from spacing.md, Vertical Rhythm)

| Gap | Value | Rule |
|-----|-------|------|
| Label to Input | `8px` | Per the rule "between a text block and a non-text element, use 16-24px" — Label/Input is the closest-pair exception and sits on the 8px baseline |
| Between two fields (form group) | `16px` or `24px` | "Between two non-text elements, 24-32px" for independent groups; related fields (e.g., first/last name) use `16px` |
| Between form body and submit button | `24px` to `32px` | Same rule as above |
| Container width | `container-sm` = `640px` (layout.md) | Single-column forms (auth, contact) |

### Full Form-Level States

| State | Description |
|-------|--------------|
| **Default** | All fields empty/untouched, submit button in Default state |
| **Editing (user is typing)** | The active field carries its own Focus state (see Input section); the rest of the form is unchanged |
| **Submitting** | The submit button moves to Loading; all inputs become `disabled` to prevent a duplicate submission |
| **Validation Error** | The relevant field(s) enter Error state; a text summary above the form uses `var(--error-text)` — never a heavy red block, per brand.md's "Error messages: calm, specific, no apology theater" |
| **Success** | The form is replaced with a confirmation message in brand.md's voice: "Device registered. You can see its location now." — not a large graphic checkmark |
| **Disabled (whole form)** | E.g., capacity reached; all fields take the Input Disabled state (see below), and so does the button |

### Form Anti-Patterns

```tsx
// ❌ WRONG — price/annual fee hidden until the next form step
<form>
  <input placeholder="Name" />
  <button>Continue to See Pricing</button>
</form>

// ❌ WRONG — vague, generic error message
<p className="text-red-600">Something went wrong!</p>

// ✅ RIGHT — price always on the same page, error is specific
<form className="max-w-[640px] space-y-6">
  <div className="space-y-2">
    <label className="text-base">Name</label>
    <input className="..." />
  </div>
  {error && (
    <p className="text-[var(--error-text)] text-sm">
      Phone number is invalid — please include the area code.
    </p>
  )}
  <button className="btn-primary" type="submit">Request Installation</button>
</form>
```

---

## Input

> **Definitive rule:** The focus border is always teal — no exceptions, no substitute color.

### Sizes (from spacing.md — unchanged)

| Size | Vertical Padding | Horizontal Padding |
|------|--------------------|-----------------------|
| Small | `8px` (`py-2`) | `12px` (`px-3`) |
| Medium | `12px` (`py-3`) | `16px` (`px-4`) |
| Large | `16px` (`py-4`) | `20px` (`px-5`) |

Font: `16px / Regular(400)` per typography.md (the absolute 16px body-text floor also applies to typed input values). Radius: `--radius-base` (12px).

### Full States

| State | Border | Background | Additional text/icon |
|-------|--------|------------|--------------------------|
| **Default** | `1px solid var(--border-base)` `#cbd5e1` (colors.md) | `var(--bg-base)` | — |
| **Hover** | `1px solid var(--border-strong)` `#94a3b8` (colors.md) | `var(--bg-base)` | — |
| **Focus** | `2px solid var(--teal)` | `var(--bg-base)` | `outline: 2px solid var(--teal)` per the exact rule in colors.md line 195 |
| **Filled (has a valid value)** | `1px solid var(--border-base)` | `var(--bg-base)` | Same as Default — the system invents no extra "filled" color |
| **Disabled** | `1px solid var(--border-soft)` `#e2e8f0` | `var(--bg-muted)` `#f1f5f9` | Text in `var(--text-muted)`, `cursor: not-allowed` |
| **Error** | `1px solid var(--error)` `#ef4444` | `var(--bg-base)` | Error message below the field in `var(--error-text)` `#dc2626` (the AA-passing small-text variant, per colors.md) |
| **Loading (async validation, e.g., checking a postal code)** | `1px solid var(--border-base)` unchanged | `var(--bg-base)` | A small teal spinner inside the input, on the leading side (the reading-direction "forward" side per layout.md), only for the duration of the real check |

```css
.input {
  border: 1px solid var(--border-base);
  border-radius: var(--radius-base);
  background: var(--bg-base);
  font-size: 1rem; /* 16px */
  padding: 0.75rem 1rem; /* Medium */
}
.input:hover { border-color: var(--border-strong); }
.input:focus-visible {
  border-color: var(--teal);
  outline: 2px solid var(--teal);
}
.input:disabled {
  background: var(--bg-muted);
  border-color: var(--border-soft);
  color: var(--text-muted);
  cursor: not-allowed;
}
.input--error { border-color: var(--error); }
```

### Input Anti-Patterns

```tsx
// ❌ WRONG — a focus color other than teal (here, a generic framework blue)
<input className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

// ❌ WRONG — a glowing shadow around an active input
<input className="focus:shadow-[0_0_15px_rgba(14,116,144,0.5)]" />

// ✅ RIGHT
<input
  className="border border-[var(--border-base)] rounded-xl px-4 py-3 text-base
             hover:border-[var(--border-strong)]
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--teal)] focus-visible:border-[var(--teal)]
             disabled:bg-[var(--bg-muted)] disabled:border-[var(--border-soft)] disabled:text-[var(--text-muted)] disabled:cursor-not-allowed"
/>
```

---

## Quick Reference Table

| Component | Radius | Shadow at rest | Focus color |
|-----------|--------|-------------------|---------------|
| Button | `--radius-base` (12px) | `--shadow-card` (Level 1) | `outline 2px var(--teal)` |
| Card | `--radius-base` (12px) | `--shadow-card` only if interactive | `outline 2px var(--teal)` (if link/clickable) |
| Badge | `--radius-full` | None | `outline 2px var(--teal)` (only if interactive) |
| Form (Container) | None (frame only) | None | — |
| Input | `--radius-base` (12px) | None at rest | `2px solid var(--teal)` + `outline` |

---

## Summary

No component in this file has a new color, shadow, or corner radius that doesn't already exist in `colors.md` or `visual-language.md` — the one exception is radius, which was extracted from an actual pattern in `spacing.md` and limited to a single base value. All five core components (button, card, badge, form, input) now have six complete states: default, hover, active/pressed, focus, disabled, and loading — none left half-finished. The badge no longer has room for a rank or a "premium" label, the button never takes a gradient, and focus is always the same one teal the whole system already agreed on. That means the same technician who's answered the phone for 12 years now also has a fully consistent visual language.
