# Hero Section

> Rewritten from scratch. Not a headline + button + product photo. The hero's job is to *prove* the brand's one differentiator — a precise, confirmed location — before the visitor reads a single word of copy.

---

## The Thesis (not a generic hero)

**Generic tracker-hero pattern (rejected):** headline stating "smart tracking," a subtitle, a CTA, and a stock photo of a car or a phone mockup. This is the exact "Startup Hype Aesthetic" `brand.md` rejects — it *claims* precision instead of *showing* it.

**This hero's thesis:** *A GPS "fix" is not a metaphor — it's a real, specific technical moment: the instant a receiver locks a signal to an exact coordinate.* `visual-language.md` already built a signature glyph around this exact word ("The Fix Mark"). The hero's entire job is to dramatize that one real moment, live, in front of the visitor — not decorate around it.

So instead of a static image of a product, the hero **is** a fix event: a live coordinate grid, a signal that arrives, locks, and confirms — using only the tokens this system already owns (`--gradient-hero`, the Fix Mark glyph, `--rust`, grid lines). Nothing new is invented; everything here is assembled strictly from `visual-language.md` and `colors.md`.

```
Decision: Hero is an interactive "live fix" moment, not a static headline+photo
Alternative: Headline + subtitle + CTA + product photography (standard SaaS hero)
Reason: philosophy.md's Act 1 says "names the real fear, doesn't decorate it" —
        showing a real fix event *is* the proof, not a claim of one
Principle: philosophy.md — "proof, not promises"; visual-language.md — Fix Mark
           is the brand's one earned signature and belongs beside a confirmed fact
Trade-off: harder to build than a static hero image, but it is the only hero
           that visually differentiates this brand from every "SaaS default" tracker page
```

---

## Layout (desktop, RTL default)

```
┌───────────────────────────────────────────────────────────┐
│  [--gradient-hero background, grid-lines decorative элемент]│
│                                                             │
│   ردیابی که فقط ادعا نمی‌کند، نشان می‌دهد.        [live fix  │
│   همین الان، مختصات خودروی شما تایید می‌شود.        panel]  │
│                                                             │
│   [Primary CTA: مشاهده قیمت دقیق]  [Secondary: تماس با ما]  │
│                                                             │
│   ⌖ ۱۲ سال است همین کار را انجام می‌دهیم   (Fix Mark, rust) │
└───────────────────────────────────────────────────────────┘
```

- Text block: right-aligned (RTL), max-width ~34ch per typography.md subtitle-width guidance.
- Live-fix panel: left side (visually left in RTL = the *end* of reading order, so it doesn't compete with headline reading first).
- Grid lines sit *beneath* the gradient at ≤5% opacity, per visual-language.md decorative rules — one decorative element, this section only.

---

## The Live Fix Panel (interactive, the hero's signature moment)

This is the one interactive/numeric element replacing "product photo."

### Behavior
1. On load: a simple static coordinate grid is visible (already "locked," calm — not mid-search, since this brand never dramatizes anxiety).
2. On scroll-into-view: **one-time** draw-in of the Fix Mark crosshair (~200ms, per visual-language.md — never repeats, never pulses).
3. Beside the crosshair, a monospace coordinate string (`--font-mono`, per typography.md) appears already resolved: e.g. `35.7219° N, 51.4215° E` — a plain, specific value, not a placeholder like "Loading...".
4. Directly under the coordinate: one line of plain-language confirmation text, e.g. "Confirmed 4 seconds ago" — reinforcing *confirmed fact*, the brand's real currency, not decoration.
5. No looping animation, no pulse ring, no radar sweep — all explicitly forbidden by visual-language.md's Removed list. The moment happens once and holds still, exactly like a technician confirming a reading and moving on.

### Why a coordinate, not a map thumbnail
A literal map risks reading as generic "tech dashboard" atmosphere. A precise coordinate string in monospace is the specific, technician-grade detail `philosophy.md`'s Clarity rules ask for ("specific, not impressive") and ties directly to typography.md's stated purpose for `--font-mono`: "coordinate displays, tracking numbers."

### Fix Mark usage accounting (max 3/page — see visual-language.md, colors.md)
This hero uses **one** Fix Mark instance (the live coordinate). That leaves two remaining for the rest of the page (see `sections.md`).

---

## Hero Copy (final, brand-voiced — not Lorem Ipsum)

### Headline (H1 Hero — 48px/56px, Semibold, ≤2 lines per typography.md Hero Rules)
```
ردیابی که فقط ادعا نمی‌کند، نشان می‌دهد
```
*(Translation for reference: "Tracking that doesn't just claim — it shows you.")*
— States the outcome plainly (`brand.md` Voice Rule #3: lead with outcome, not feature) and directly answers `philosophy.md` Act 1 ("names the real fear, doesn't decorate it") without using an abstract slogan.

### Subtitle (text-lg/xl, Regular 400, white/90, ≤50ch)
```
همین الان مختصات دقیق خودروتان تایید می‌شود؛ نه یک آیکون چشمک‌زن، یک عدد واقعی.
```
*("Right now, your vehicle's exact coordinates are being confirmed — not a blinking icon, a real number.")*
— Customer-facing language, no system/technical jargon ("GPS module," "firmware") per brand.md Voice Rule #4.

### Primary CTA (per typography.md CTA Rules: verb, specific, sentence case)
```
مشاهده قیمت دقیق
```
*("See the exact price")* — matches philosophy.md's Clarity Rule #2 exactly ("See exact pricing" beats "Learn more").

### Secondary CTA
```
صحبت با پشتیبانی
```
*("Talk to support")* — surfaces the responsiveness differentiator inside the hero itself, per brand.md: "a visible support/contact path on every page, not just... in a footer."

### Fix Mark statement (rust color, one line, beneath CTAs)
```
⌖  ۱۲ سال است همین کار را دقیق انجام می‌دهیم
```
*("⌖ 12 years doing exactly this, precisely")* — this is Fix Mark usage #2 conceptually reserved for the "12 years" fact per visual-language.md's approved list; **note:** if the live-fix panel above already consumes 1 of 3 permitted marks, this consumes the 2nd, leaving exactly 1 for the rest of the page (assigned to the response-time promise in `sections.md`). Do not add a third Fix Mark anywhere else in the hero.

---

## What Was Deliberately Left Out

- No product photography, no phone mockup, no stock image of a driver — brand.md explicitly rejects "generic stock photography of people pointing at screens."
- No countdown, no "limited devices," no urgency copy — hard rule, brand.md and philosophy.md both.
- No gradient text on the headline — typography.md removed that token entirely; headline is solid white.
- No second navy section here — the hero consumes the navy/gradient budget; footer or testimonials get the other one (visual-language.md: max 2 navy sections/page).

---

## Accessibility & Motion Notes

- Live-fix draw-in animation respects `prefers-reduced-motion: reduce` (shows the resolved state immediately, no animation) per visual-language.md Motion Discipline.
- Coordinate text and confirmation line are real DOM text (not canvas/SVG-only), so screen readers announce the confirmed value, not just "graphic."
- Contrast: white text on `--gradient-hero` (navy-deep → navy) verified AAA per colors.md contrast table for navy-family backgrounds.
