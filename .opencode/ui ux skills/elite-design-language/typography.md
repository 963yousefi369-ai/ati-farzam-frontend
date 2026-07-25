# Typography

> Typography is 90% of design. Get it right, and everything else follows.

---

## Why This File Was Rewritten, Not Patched

The previous file inherited **Vazirmatn** without ever testing it against this specific brand. Two concrete problems drove a full rewrite rather than an edit:

1. **Vazirmatn is now the default modern Persian product font.** Over the last few years it has become the go-to typeface across Iranian fintech, SaaS, and startup dashboards — the same role the old `#10b981` "stock emerald" played in `colors.md` before that file was rewritten. A font that reads as "generic modern app" undercuts a brand whose entire personality (`brand.md`) is *"12 years, no hype needed"* and explicitly rejects the "Startup Hype Aesthetic."
2. **The old weight and size scale still had room for "impressive."** `font-extrabold` at 60px, and Bold/Extrabold as legitimate weights, both push toward the same visual loudness that `philosophy.md`'s Technician Test explicitly tests for: *"Does this element help someone decide faster, or does it just look impressive?"*
3. **The Hero Typography section directly contradicted the finalized `visual-language.md`.** The old file kept a `gradient-text-teal` exception for the hero headline, but `visual-language.md`'s Gradient Rules state the one surviving gradient is *"Never applied to text, borders, icons, or buttons."* That contradiction is resolved below by removing gradient text entirely.

This file keeps every rule consistent with `brand.md`, `philosophy.md`, `visual-language.md`, and `colors.md`, and removes the last traces of "generic modern SaaS" from the type system.

---

## Font Family Decision

### Font Archetype Check

`brand.md`'s personality spectrum places this brand at:
- Professional, not clinical (slightly warm side of formal)
- Direct and plain, like a technician, not a bureaucrat
- Understated/Established, not Flashy/Startup

Vazirmatn is a fine, competent geometric sans — but "fine and competent" is exactly the problem. It's the safe, popular choice, which is precisely what a 12-year, plain-spoken, instrument-precision business should avoid signaling. The brand needs a typeface that reads as **institutional and considered**, not as **currently-trending**.

### Alternatives Considered

| Candidate | Character | Verdict |
|---|---|---|
| **IRANSansX** — designed by Moslem Ebrahimi, distributed by fontiran.com | Solid, even stroke weight, spacious and consistent letterforms, long-standing use in institutional, governmental, and corporate Persian software (banking portals, official documentation) rather than trend-driven consumer apps. Reads as steady and considered rather than novel. | **Adopted as primary.** Matches "steady, 12 years, no hype" better than a typeface strongly associated with the startup category it's trying to distinguish itself from. |
| **Morabba (مربع)** — designed by Hassan Manzouri & Shahrzad Akbari, distributed by fontiran.com | A fully geometric Kufi-inspired display face built from circle/square grids — genuinely "instrument-like," but the type designer's own guidance is explicit: it's built **for short phrases, wordmarks, and titles**, not for extended headings or body copy. | **Rejected as primary** — wrong tool for a 6-level heading hierarchy and long-form body text; would fail legibility at H4–H6 and paragraph sizes. Not used anywhere in this system. |

### Decision

```
Decision: Replace Vazirmatn with IRANSansX as the primary typeface (headings + body)
Alternative: Keep Vazirmatn; or adopt Morabba as primary
Reason: Vazirmatn now signals "generic modern Persian SaaS," working against a
        brand that must read as an established, steady, 12-year technician business.
        IRANSansX carries an institutional, considered feel without sacrificing legibility.
        Morabba is a display/wordmark face and cannot carry body text or a 6-level heading scale.
Principle: brand.md — "Flashy/Startup ◄────●────► Understated/Established, we are here"
Trade-off: IRANSansX is a commercial webfont (license required from fontiran.com),
           where Vazirmatn was free and open. The trade-off is accepted because
           brand differentiation from the "default Persian SaaS font" outweighs the
           licensing cost, and Vazirmatn is kept as the fallback (see stack below)
           so nothing breaks if the license/webfont ever fails to load.
```

### Primary Font: IRANSansX

```css
--font-family: 'IRANSansX', 'Vazirmatn', system-ui, sans-serif;
```

### Font Stack (Tailwind)

```ts
fontFamily: {
  sans: ['IRANSansX', 'Vazirmatn', 'system-ui', 'sans-serif'],
}
```

**Licensing note:** IRANSansX requires a commercial webfont license from fontiran.com. Vazirmatn (SIL Open Font License, already in use previously) is kept as the second font in the stack purely as a same-family-feel fallback if the licensed webfont fails to load — it is never the intended rendering font in production.

### Monospace (unchanged — for data displays)

```css
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

Usage: Coordinate displays, tracking numbers, data tables. Never for body text. This choice is untouched by the primary-font swap — a brand-neutral instrument/data font was already correct for a GPS company and carries no "SaaS default" association.

---

## Font Weights

The old file allowed 4 weights, including Extrabold. This system now uses **3 weights, capped at Semibold** — Bold and Extrabold are removed entirely. A 12-year technician doesn't need to shout; DemiBold/Semibold is the heaviest mark this brand ever makes.

| Weight | Value | Tailwind | Usage |
|--------|-------|----------|-------|
| **Regular** | `400` | `font-normal` | Body text, paragraphs |
| **Medium** | `500` | `font-medium` | Labels, badges, nav items, H4–H6, CTA (small/medium) |
| **Semibold (DemiBold)** | `600` | `font-semibold` | H1–H3, hero headline, card titles, large CTAs |

### Weight Rules

1. **Never use more than 3 weights per page** — Regular (body) + Medium (labels/minor headings) + Semibold (major headings/emphasis).
2. **Regular for reading.** Any text longer than 2 lines is `font-normal`.
3. **Semibold for emphasis.** Not italic, not underline, not color, not a heavier weight than 600 — this system has no Bold(700) or Extrabold(800) token.
4. **Bold and Extrabold are retired.** Per the Technician Test: a heavier weight than Semibold reads as "trying to impress," not "stating a fact plainly."

---

## Heading Sizes

The scale is recalibrated smaller and calmer than the previous version — the hero no longer needs to dominate at 60px/800 to feel confident; per `philosophy.md`'s rhythm pattern, the hero should be *"calm, confident, states the core promise plainly,"* not loud.

### Desktop Heading Scale

| Level | Size | Line Height | Weight | Tailwind |
|-------|------|-------------|--------|----------|
| **H1 Hero** | `48px` | `56px` | `600` | `text-5xl font-semibold leading-tight` |
| **H1** | `36px` | `44px` | `600` | `text-4xl font-semibold leading-tight` |
| **H2** | `28px` | `36px` | `600` | `text-3xl font-semibold leading-snug` |
| **H3** | `24px` | `32px` | `600` | `text-2xl font-semibold leading-snug` |
| **H4** | `20px` | `28px` | `500` | `text-xl font-medium leading-snug` |
| **H5** | `18px` | `26px` | `500` | `text-lg font-medium leading-normal` |
| **H6** | `16px` | `24px` | `500` | `text-base font-medium leading-normal` |

### Mobile Heading Scale

| Level | Size | Tailwind |
|-------|------|----------|
| **H1 Hero** | `32px` | `text-3xl` |
| **H1** | `28px` | `text-2xl` |
| **H2** | `24px` | `text-2xl` |
| **H3** | `20px` | `text-xl` |
| **H4** | `18px` | `text-lg` |

### Responsive Headings (clamp)

```css
/* H1 Hero */
font-size: clamp(2rem, 4vw, 3rem); /* 32px → 48px */

/* H1 */
font-size: clamp(1.75rem, 3vw, 2.25rem); /* 28px → 36px */

/* H2 */
font-size: clamp(1.5rem, 2.5vw, 1.75rem); /* 24px → 28px */

/* H3 */
font-size: clamp(1.25rem, 2vw, 1.5rem); /* 20px → 24px */
```

### Heading Rules

1. **One H1 per page.** Always. No exceptions.
2. **H2s introduce sections.** They must be understandable without context.
3. **H3s are for subsections** within a section.
4. **H4–H6 are rare.** Use them only for complex content hierarchies.
5. **Never skip levels.** H1 → H3 is wrong. H1 → H2 → H3 is right.
6. **Headings use `text-wrap: balance`.** Prevents orphaned words.
7. **No heading is ever heavier than Semibold(600).** This is a hard ceiling, not a suggestion — see Font Weights above.

---

## Body Sizes

Unchanged in value from the previous scale — 16px as an absolute floor was already correct and isn't a function of which typeface carries it.

| Size | Pixels | Line Height | Tailwind | Usage |
|------|--------|-------------|----------|-------|
| **Small** | `14px` | `20px` | `text-sm leading-5` | Captions, helper text, badges |
| **Base** | `16px` | `24px` | `text-base leading-6` | Body text, paragraphs, labels |
| **Large** | `18px` | `28px` | `text-lg leading-7` | Subtitles, featured body text |
| **XL** | `20px` | `32px` | `text-xl leading-8` | Hero subtitles, large descriptions |

### Body Rules

1. **Body text is never smaller than 16px.** On mobile, 14px is the absolute minimum for secondary text.
2. **Line height is 1.5× the font size** as a baseline (see RTL Rules below for the Persian-specific range).
3. **Paragraph width is 60–75 characters.** `max-width: 65ch` for readability.
4. **Body text uses `text-wrap: pretty`.** Prevents orphans at paragraph ends.
5. **QA check on typeface swap:** IRANSansX's apparent size can render marginally larger than Vazirmatn at the same pixel value due to a taller x-height. Spot-check the 14px Small size on real devices before shipping; do not increase the token unless it visibly fails the 16px-floor intent of these rules.

---

## Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `leading-none` | `1` | Decorative text, numbers |
| `leading-tight` | `1.1` | Headings (desktop, Latin baseline) |
| `leading-snug` | `1.25` | Subheadings, card titles |
| `leading-normal` | `1.5` | Body text, paragraphs |
| `leading-relaxed` | `1.625` | Long-form reading, blog posts |
| `leading-loose` | `2` | Spacious layouts, large text |

### Line Height Rules

1. **Headings: tight.** They should feel considered, not airy — but see the RTL adjustment below, which overrides the Latin `1.1` baseline for Persian.
2. **Body: normal.** 1.5× is the sweet spot for reading in Latin; Persian body text uses the wider RTL range below.
3. **Long text: relaxed.** Blog posts, articles, legal text.
4. **Never `leading-none` on body text.** It becomes unreadable.

---

## Paragraph Width

### Maximum Line Length

| Context | Max Width | Characters |
|---------|-----------|------------|
| **Body text** | `65ch` | ~65 characters |
| **Subtitle** | `50ch` | ~50 characters |
| **Card body** | `45ch` | ~45 characters |
| **Hero subtitle** | `55ch` | ~55 characters |
| **Centered text** | `60ch` | ~60 characters |

### Why This Matters

Research shows optimal reading speed at 50–75 characters per line. Longer lines cause the eye to lose its place. Shorter lines cause excessive eye movement. This is a reading-physiology rule, unaffected by the typeface change.

### Implementation

```tsx
<p className="max-w-prose"> /* 65ch */
  متن پاراگراف اینجا با فونت IRANSansX قرار می‌گیرد.
</p>

<p className="max-w-xl"> /* ~55ch */
  زیرعنوان بخش
</p>
```

---

## RTL Rules

### Persian Typography Specifics

1. **Text alignment is `right` by default.** Set globally in CSS.
2. **Direction is `rtl` on `<html>`.** All layouts flow right-to-left.
3. **Line height is 1.6–1.8 for Persian body text.** This range is unchanged by the font swap — IRANSansX's x-height and general proportions sit close enough to the previous typeface that the same body line-height range applies.
4. **Letter spacing is 0.** Never apply `tracking-*` to Persian text, in either typeface.
5. **Numbers can be LTR within RTL text.** Use `unicode-bidi: embed` for number sequences.

### RTL Heading Adjustments (updated for IRANSansX)

IRANSansX has slightly taller ascenders/descenders on a few Persian glyphs (ی, پ, ژ) than Vazirmatn did, so the Latin `leading-tight` (1.1) baseline is too tight for Persian headings — it risks visual clipping on those glyphs. The previous file already made this adjustment for Persian in general; this version tightens the value slightly less than before to accommodate the new typeface:

```css
h1, h2, h3 {
  line-height: 1.3; /* was 1.2 for Vazirmatn; IRANSansX needs marginally more room */
}
```

### RTL Text Alignment

```tsx
// Centered section headers — acceptable in RTL
<h2 className="text-center">عنوان</h2>

// Body text — always right-aligned in RTL
<p className="text-right">متن</p>

// Never center-align body text longer than 2 lines
<p className="text-center"> ❌ متن طولانی </p>
```

---

## Hero Typography

### Hero Headline — Rewritten to Remove Gradient Text

The previous file kept a `gradient-text-teal` exception for the hero headline. This directly contradicts the finalized `visual-language.md`, which states the one surviving gradient (`--gradient-hero`) is used only for the hero **background** and is *"Never applied to text, borders, icons, or buttons."* That exception is removed here — there is no gradient-text token anywhere in this system anymore.

```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-normal">
  ردیابی هوشمند خودرو
  <br />
  <span className="text-white/90">همیشه بدانید کجاست</span>
</h1>
```

### Hero Rules

1. **No gradient text, ever.** The hero headline is solid white (`text-white`) sitting on the navy gradient background — the gradient lives only in the background layer, per `visual-language.md`.
2. **Maximum 2 lines.** If it doesn't fit in 2 lines, it's too long.
3. **Use `<br>` to control line breaks.** Don't let the browser decide.
4. **Hero subtitles are `text-lg` or `text-xl`, Regular(400) weight.** They're the second visual priority, not a second headline.
5. **Hero text is white on the navy gradient.** `text-white` or `text-white/90` for subtitles.
6. **Hero headline weight is capped at Semibold(600).** No Extrabold — a calm, confident hero doesn't need the heaviest possible weight to read as confident (see `philosophy.md`: *"Hero — calm, confident, states the core promise plainly"*).
7. **If a confirmed fact sits in or near the hero** (e.g., "12 years in business"), it uses the Fix Mark and rust color exactly as scoped in `visual-language.md` / `colors.md` — never as part of the headline's own type styling.

---

## CTA Typography

### CTA Text Rules

| CTA Size | Font Size | Weight | Letter Spacing |
|----------|-----------|--------|----------------|
| **Small** | `14px` | `500` | `0` |
| **Medium** | `16px` | `500` | `0` |
| **Large** | `18px` | `600` | `0` |

CTA weight is capped at Semibold(600) — the same ceiling as everything else in this system. The old scale used Bold/700 for large CTAs; that token no longer exists.

### CTA Rules

1. **CTAs are sentence case.** "افزودن به سبد خرید" not "افزودن به سبد خرید" (no ALL CAPS in Persian).
2. **CTAs are verbs.** "سفارش بدید" not "سفارش."
3. **CTAs are specific.** "مشاهده قیمت‌ها" not "بیشتر." — matches `brand.md`'s Voice Rule: "See exact pricing," not "Learn more."
4. **CTA text is never truncated.** If it doesn't fit, the button is too small.
5. **CTA text color is always teal (interactive) or white-on-teal.** Never rust — rust marks facts, never actions, per `colors.md`.

---

## Card Typography

### Card Title

```tsx
<h3 className="text-lg font-semibold text-[var(--navy)] mb-2">
  عنوان کارت
</h3>
```

### Card Body

```tsx
<p className="text-base text-[var(--text-body)] leading-relaxed">
  توضیحات کارت
</p>
```

### Card Rules

1. **Card titles are `text-lg` (18px) Semibold.** Not larger — cards are compact.
2. **Card body is `text-base` (16px) Regular.** Standard reading size.
3. **Card text is right-aligned.** RTL default.
4. **Maximum 3 lines of body text in a card.** Truncate with `line-clamp-3`.

---

## Typography Tokens (CSS Custom Properties)

```css
:root {
  /* Font families */
  --font-sans: 'IRANSansX', 'Vazirmatn', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.75rem;   /* 28px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Line heights */
  --leading-tight: 1.3;   /* headings, RTL-adjusted for IRANSansX */
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-rtl-body: 1.7; /* midpoint of the 1.6–1.8 Persian body range */

  /* Max widths */
  --prose-width: 65ch;
  --subtitle-width: 50ch;
  --card-body-width: 45ch;
}
```

---

## Typography Anti-Patterns

### ❌ Too Many Font Sizes
```tsx
// BAD: 5 different sizes in one section
<h2 className="text-4xl">Title</h2>
<h3 className="text-2xl">Subtitle</h3>
<p className="text-lg">Body</p>
<span className="text-sm">Caption</span>
<small className="text-xs">Fine print</small>

// GOOD: 3 levels max
<h2 className="text-3xl lg:text-4xl font-semibold">Title</h2>
<p className="text-lg text-muted">Subtitle</p>
<p className="text-base">Body</p>
```

### ❌ Bold(700) or Extrabold(800) Anywhere
```tsx
// BAD: heaviest weight this system now allows is Semibold(600)
<h1 className="font-extrabold">عنوان اصلی</h1>

// GOOD
<h1 className="font-semibold">عنوان اصلی</h1>
```

### ❌ Gradient Text of Any Kind
```tsx
// BAD: contradicts visual-language.md — gradient never touches text
<h1 className="gradient-text-teal">عنوان اصلی</h1>

// GOOD: solid color only, gradient stays in the background layer
<h1 className="text-white">عنوان اصلی</h1>
```

### ❌ Center-Aligned Long Text
```tsx
// BAD: Center-aligned paragraph
<p className="text-center">
  متن طولانی که خواندنش سخت می‌شود وقتی وسط‌چین باشد و بیشتر از دو خط باشد.
</p>

// GOOD: Center-aligned short text only
<h2 className="text-center">عنوان کوتاه</h2>
<p className="text-right">متن طولانی راست‌چین</p>
```

### ❌ Italic for Emphasis
```tsx
// BAD: Italic (doesn't work well in Persian)
<p className="italic">نکته مهم</p>

// GOOD: Semibold for emphasis
<p className="font-semibold">نکته مهم</p>
```

---

## Summary

Typography is the voice of the design, and the voice just changed. IRANSansX replaces Vazirmatn as the primary typeface because a 12-year, plain-spoken technician business shouldn't sound like the newest Persian SaaS app — it should sound institutional, considered, and steady. The weight scale is capped at Semibold(600), the hero no longer shouts at 60px/800, and the old gradient-text exception is gone, resolving the one place this file used to contradict `visual-language.md`. Every remaining rule — RTL line heights, paragraph widths, card and CTA typography — is unchanged where the previous version was already correct, and adjusted only where the new typeface or the brand's real personality required it.
