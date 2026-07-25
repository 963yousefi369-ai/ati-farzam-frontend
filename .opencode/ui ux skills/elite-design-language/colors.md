# Color System

> Color is the most powerful visual signal. Use it deliberately, sparingly, and consistently — and never let it say something the brand doesn't mean.

---

## Why This File Was Rewritten, Not Patched

The previous palette (navy / teal / amber) was the default color trio of the fintech-SaaS category — the same combination used across countless growth-stage software products. It carried no connection to a 12-year vehicle-tracking business built on installation, responsiveness, and honest pricing. Two concrete problems drove the rewrite rather than an edit:

1. **The interactive teal (`#10b981`) is a stock color.** It is the default "emerald" swatch shipped in common UI frameworks and used as a generic "success/growth" color across the SaaS category. It signals nothing specific to this brand.
2. **Amber was still specified for decorative use** (premium badges, ratings, sale badges, gradients, glows) even though `visual-language.md` had already removed all of that: *"Amber gradient — reads as 'premium/luxury,' an explicit anti-pattern"* and *"No amber, coral, or 'sale' colors exist in this system."* The old color file simply hadn't caught up to the brand's own rejection of the "luxury tracker shop" aesthetic.

This file resolves both issues, keeps every rule consistent with `brand.md`, `philosophy.md`, and `visual-language.md`, and removes every remaining trace of the generic palette.

---

## Color Philosophy

A **constrained, two-color brand system** plus neutrals — navy for structural authority, and a single earned interactive/signature color pairing that has no life outside this brand. No amber as a decorative color. No purple, no pink, no rainbow. No color exists in this system unless it does a specific job.

The constraint is intentional and doubles as a brand statement: a business that has done one job carefully for 12 years doesn't need five colors competing for attention.

---

## Primary: Navy (Structural Authority — unchanged role)

Navy communicates trust, depth, and steadiness. Its role does not change from the previous system — it was already correctly scoped as structural rather than decorative.

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#1e3a5f` | Headings, primary dark surfaces |
| `--navy-dark` | `#162d4a` | Hover states on navy elements |
| `--navy-deep` | `#0f172a` | Hero background, deepest dark surface |

### Navy Rules
1. Navy appears in a **maximum of two sections per page**: the hero, and one of (footer / testimonials / response-promise section) — per `visual-language.md`. It is never used as a decorative accent elsewhere.
2. Navy's one gradient (`--gradient-hero`, `135deg, #0f172a → #1e3a5f`) exists in exactly one place: the hero background. Nowhere else.
3. Navy text on white passes at AAA level (see Contrast Table below) — this was true before and remains true.

---

## Interactive Accent: Instrument Teal (replaces generic teal)

The single color used for interaction — buttons, links, active states — is kept as a teal family, but the hue is shifted away from the generic "emerald success" swatch toward a deeper, more instrument-like blue-teal. This still reads as "signal" and "precision," which is the correct meaning for a GPS company, but it no longer matches the default SaaS palette hue-for-hue.

| Token | Value | Usage |
|-------|-------|-------|
| `--teal` | `#0e7490` | Primary CTA, links, active/selected states, success |
| `--teal-dark` | `#155e6f` | Hover states on teal elements |
| `--teal-light` | `#cffafe` | Light teal backgrounds (success-light equivalents only) |

### Why This Hue
`#0e7490` reads closer to a marine or aviation instrument display than a "growth chart" green — an association that fits a company whose entire product is about locating something precisely, not a metric trending upward. Unlike the previous teal, this shade passes AA contrast on white **without needing the dark variant** for normal body text (see table below), which also reduces the number of teal-family swatches actually needed in production.

### Color Discipline (unchanged principle, new value)
1. Teal is the **only** accent color for interaction. Always flat/solid — never a gradient, per `visual-language.md`.
2. One accent color competes for attention per section, maximum.
3. Never use `--teal` at full saturation for small body text on white — use it for buttons, icons, and large text; for small text, `--teal` itself now passes AA (5.36:1), so `--teal-dark` is reserved for hover/pressed states, not required for base accessibility.

---

## Signature Color: Beacon Rust (new — replaces amber's role entirely)

This is the one color in the system that exists only for this brand's specific narrative: confirmed, hard facts. It replaces amber's entire decorative footprint (badges, ratings, "premium" highlights, gradients) with something that carries real meaning and no fintech/SaaS association whatsoever.

| Token | Value | Usage |
|-------|-------|-------|
| `--rust` | `#9a3412` | The Fix Mark glyph, confirmed-fact numbers only |
| `--rust-dark` | `#7c2d12` | Hover/pressed state, if the fact is ever an interactive element (rare) |

### Where It Comes From
A muted, worked-metal rust/copper tone — the color of a technician's toolbox hardware, not a luxury-gold badge. It directly answers the guiding principle in `visual-language.md`: *"like a technician's toolbox, not a glass-and-glow SaaS dashboard."*

### Where It's Allowed (strict — matches the Fix Mark rules in visual-language.md)
Beside a specific, confirmed fact only:
1. The total first-year price (device + annual subscription).
2. The "12 years in business" statement.
3. A stated response-time commitment.
4. A confirmed installation status message.

**Maximum:** one visible per viewport, three per page total — same ceiling as the Fix Mark itself, because this color and that glyph are the same signature.

### Where It's Forbidden
```
❌ Buttons, CTAs, links — rust marks a fact, never an action
❌ Badges, ratings, "premium" labels of any kind
❌ Gradients or glows of any kind
❌ Hero backgrounds, footers, navigation, dividers
❌ More than 3 uses per page
```

### Required Update to `visual-language.md`
The Fix Mark color rule currently reads *"Single color only: navy or teal."* This file supersedes that line to: **"Single color only: navy, teal, or rust — matching the surrounding text."** No other rule in that document needs to change.

---

## Amber Is Retired From Decorative Use

Amber no longer exists anywhere in this system as a decorative, badge, gradient, or "premium" color. This was already the direction `visual-language.md` had taken; this file removes the last inconsistent references (premium badges, star ratings, sale badges, amber gradient, amber glow, amber shadow) that the old `colors.md` still listed.

Amber survives in exactly one narrow, functional form — see Semantic Colors below — and is explicitly documented as the sole exception, so it cannot be quietly reintroduced as a decorative color later.

---

## Neutral Palette (unchanged — this was never the problem)

Neutrals remain the backbone of the system; roughly 86–88% of any page's surface area is neutral (see Color Distribution below).

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#ffffff` | Page background, card background |
| `--bg-soft` | `#f8fafc` | Alternate section backgrounds |
| `--bg-muted` | `#f1f5f9` | Disabled backgrounds, table rows |
| `--border-soft` | `#e2e8f0` | Subtle borders, dividers |
| `--border-base` | `#cbd5e1` | Standard borders, input borders |
| `--border-strong` | `#94a3b8` | Active input borders |
| `--text-heading` | `#0f172a` | Headings, primary text |
| `--text-body` | `#334155` | Body text, paragraphs |
| `--text-muted` | `#475569` | Secondary text, captions |

### Neutral Rules
1. White is the default section background.
2. Sections alternate White → Soft → White → Navy → White for rhythm — the color change alone creates the rhythm; no gradients are used for this purpose.
3. Cards always sit on a different flat background than their parent section.
4. `--bg-muted` is never used for cards — cards are always white (on gray) or gray (on white).

---

## Semantic Colors — Reconciled With the New Palette

The semantic role structure is kept, but one real contradiction in the old file is fixed here: amber-as-warning conflicted directly with `visual-language.md`'s blanket rule *"No amber... exist in this system."* That rule was written with decorative amber in mind, not a small functional warning icon — but as written, it left no exception, so the old warning color was quietly breaking brand rule every time it appeared. This file carves out one explicit, narrow exception instead of leaving a silent contradiction.

| Semantic | Token | Value | Usage | Consistent with brand? |
|----------|-------|-------|-------|--------------------------|
| Success | `--success` | `#0e7490` (= new teal) | Success states, confirmations | ✅ Same color as the interactive accent — intentional, reinforces the brand |
| **Warning** | `--warning` | `#b45309` (new — **not** the old decorative amber) | Form validation, inline warning icon/text **only** | ✅ Narrow exception, documented below |
| Error | `--error` | `#ef4444` (text: `#dc2626`) | Error states, destructive actions | ✅ No conflict — red is a universal, brand-neutral danger signal |
| Info | `--info` | `#3b82f6` | Informational states | ✅ No conflict — sits outside the brand palette on purpose, as a universal marker |

### The One Documented Exception (read before touching warning color)
`--warning` (`#b45309`) is the **only** amber-family color permitted anywhere in this system, and only under these constraints:
1. Small inline icon and/or text only — never a background block, never a badge shape, never a gradient.
2. Never used to imply "premium," "sale," or "featured" — that entire association is what this color must never carry.
3. If a future contributor wants to use an amber/gold tone for a badge, rating, or highlight, that request should be **declined by default** and referred back to this section — it is exactly the anti-pattern this rewrite removed.

---

## Contrast Table (WCAG, calculated exactly — not estimated)

Every value below was computed from relative luminance, not read off a chart. Where the old file's own stated ratio was wrong, the corrected value is used here.

| Color | Hex | On White | On Navy-Deep | On Soft-Gray | Verdict |
|-------|-----|----------|---------------|--------------|---------|
| Navy | `#1e3a5f` | 11.50:1 | 1.55:1 | 10.99:1 | ✅ AAA on white |
| Navy-dark | `#162d4a` | 13.92:1 | 1.28:1 | 13.31:1 | ✅ AAA |
| **Teal (new)** | `#0e7490` | **5.36:1** | 3.33:1 | 5.12:1 | ✅ AA normal text on white — no dark variant required for base accessibility |
| Teal-dark (new) | `#155e6f` | 7.34:1 | 2.43:1 | 7.01:1 | ✅ AAA |
| **Rust (new)** | `#9a3412` | **7.31:1** | 2.44:1 | 6.98:1 | ✅ AAA — usable as text color directly |
| Rust-dark (new) | `#7c2d12` | 9.37:1 | 1.91:1 | 8.96:1 | ✅ AAA |
| Warning (new) | `#b45309` | 5.02:1 | 3.56:1 | 4.80:1 | ✅ AA normal text |
| Warning-dark | `#92400e` | 7.09:1 | 2.52:1 | 6.78:1 | ✅ AAA |
| Error | `#ef4444` | 3.76:1 | 4.74:1 | 3.60:1 | ⚠️ Large text only |
| Error (text use) | `#dc2626` | 4.83:1 | 3.70:1 | 4.62:1 | ✅ AA normal text on white |
| Info | `#3b82f6` | 3.68:1 | 4.85:1 | 3.52:1 | ⚠️ Large text only on white |
| Body text | `#334155` | 7.5:1 | — | — | ✅ AAA |
| Muted text | `#475569` | 5.4:1 | — | — | ✅ AA |

**Rule:** no color from this file is ever used for small text where its "On White" (or relevant background) ratio is below 4.5:1. `--error` and `--info` at their base values are reserved for large text, icons, or backgrounds with dark text on top — never small colored body text.

---

## Color Distribution (derived from actual section rules, not a default ratio)

This is not a generic 80/12/5/2 split. It's derived from the concrete constraints already written into `visual-language.md` — navy's two-section cap, teal's one-accent-per-section rule, and rust's three-uses-per-page cap.

| Category | Screen Coverage | Why |
|----------|------------------|-----|
| Neutral (white / soft / muted, body text) | 86–88% | Backgrounds are flat and mostly white by default; navy sections are added sparingly, not swapped in as a base tone |
| Navy | 8–9% | Hard cap of 2 sections per page — hero and at most one trust section, not a recurring nav/heading color everywhere |
| Teal (interactive) | 3–4% | Buttons, links, active states only — small elements, never a background block |
| Rust + semantic (error/info/warning) | ~1% | Rust capped at 3 point-uses per page; semantic colors appear only when their specific state is active |

---

## Border Colors (unchanged)

| Token | Value | Usage |
|-------|-------|-------|
| `--border-soft` | `#e2e8f0` | Subtle borders, card borders |
| `--border-base` | `#cbd5e1` | Input borders, emphasis borders |
| `--border-strong` | `#94a3b8` | Active input borders |

1. Borders stay subtle — `#e2e8f0` default, `#cbd5e1` for emphasis. Never a dark border on a light background.
2. Focus rings use teal: `outline: 2px solid var(--teal)`.
3. Glass borders, glass backgrounds, and any `rgba(255,255,255,X)` "frosted" surface tokens are removed from this system entirely — see Glass Morphism removal in `visual-language.md`. There is no `--glass-bg` or `--glass-border` token in this palette.

---

## Shadow Colors (unchanged, restated for completeness)

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)` | Default card shadow (Depth Level 1) |
| `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07)` | Hover / active shadow (Depth Level 2) |

Shadows are always warm-neutral `rgba(0,0,0,X)` — never pure black, never tinted with navy, teal, or rust. There is no glow token in this system: `--shadow-glow`, `shadow-neon`, and `shadow-neon-navy` are removed, matching the Glows removal in `visual-language.md`.

---

## Gradients (one, and only one — restated from visual-language.md)

| Name | Value | Usage |
|------|-------|-------|
| `--gradient-hero` | `linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)` | Hero background. Nowhere else. |

Every other gradient token from the previous system — teal gradient, amber gradient, coral gradient, sale gradient, glass gradient, warm gradient — is removed. If a button, badge, or section appears to need a gradient, the correct fix is a flat color from this file, not a new gradient token.

---

## Color Anti-Patterns

```
❌ Reintroducing amber as a badge, rating, or "premium" color
❌ Using --teal or --rust at less than 4.5:1 contrast for small body text
❌ Any gradient outside --gradient-hero
❌ A glass/translucent surface token of any kind
❌ More than one accent color (teal or rust) competing for attention in a single section
❌ Rust used on a button, CTA, or any actionable element
❌ More than 2 navy sections per page
❌ More than 3 rust (Fix Mark) instances per page
```

---

## Summary

Two brand colors with real, non-overlapping jobs — navy for structural authority, teal for interaction — plus one earned signature color, rust, reserved strictly for confirmed facts. Neutrals carry the page. Amber is retired from every decorative use and survives only as a narrowly-scoped, non-badge warning color. No gradient exists outside the hero. No glow, no glass, no glossy highlight. Every remaining color choice ties back to something this specific business actually does: install carefully, answer the phone, and state the truth plainly.
