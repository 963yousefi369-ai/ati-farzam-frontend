# Motion System

> Motion either shows a state change or it doesn't exist. There is no third category. If an animation can be deleted without the user losing information, delete it.

---

## Why This File Was Rewritten, Not Patched

The old `motion.md` inherited the same problem `visual-language.md` already diagnosed and fixed for surfaces: a generic "SaaS-polish" motion vocabulary (bouncy entrances, looping pulses, shimmer skeletons, parallax) grafted onto a brand that is explicitly *not* a glass-and-glow product. Motion has to obey the same discipline surfaces already do. This file is written directly on top of the finalized `visual-language.md` (Motion Discipline, the Fix Mark, Number Pop), `colors.md` (rust/teal/navy roles), `brand.md` (calm, steady, no urgency), and `hero.md` (the live-fix panel, which this file now fully specifies instead of leaving at "~200ms").

Nothing here invents a new visual idea. Every motion in this system either dramatizes the Fix Mark's existing meaning (a receiver locking a coordinate) or serves a plain interaction need (hover, focus, open/close). If a motion doesn't trace back to one of those two jobs, it isn't in this file.

---

## Motion Philosophy

### The One Sentence

**Motion here behaves like an instrument needle, not a mascot.** An instrument needle moves once, decisively, to the correct reading, and then holds still. It never wiggles for attention, never loops "to feel alive," and never overshoots to look playful. That is the entire motion personality of this brand, derived directly from `brand.md`'s Personality Spectrum (`Flashy/Startup ◄────●─► Understated/Established`, anchored hard toward Understated) and the Guiding Principle in `visual-language.md`: *"like a technician's toolbox, not a glass-and-glow SaaS dashboard."*

### What This Rules Out Immediately

| Motion pattern | Why it's excluded |
|---|---|
| Spring/bounce easing (elastic overshoot) | Reads as playful/consumer-app; contradicts "professional, not clinical" and "understated, no hype" |
| Looping or auto-playing animation of any kind | Already forbidden system-wide by `visual-language.md` Motion Discipline #1 |
| Parallax scrolling | Pure atmosphere, no state meaning — same category as the removed glows/mesh gradients |
| Shimmer-sweep loading skeletons | The sweep is a disguised gradient; `colors.md` allows exactly one gradient, and it isn't this one |
| Staggered "cascade" entrance animations on cards/lists | Decorative rhythm with no informational job — the content didn't change, it just arrived, so it doesn't need drama |
| Confetti / celebratory bursts | Directly contradicts "no apology theater," and its cheerful register has no equivalent on the "no hype" side either |

### What Motion Is Allowed to Do

Per `visual-language.md` Motion Discipline #1, restated here as the load-bearing rule for this entire file:

> Every animation is either **hover-triggered**, **scroll-triggered (once, never repeating)**, or tied to a **real state change** (a value updates, a panel opens, a step advances).

If a proposed animation doesn't fit one of those three buckets, the answer is: no animation, or reconsider why this element needs it in the first place.

---

## Global Motion Rules

1. **600ms hard ceiling.** No single animation, including all internal phases, exceeds 600ms. Most interaction motion should land between 120–300ms; only the signature moment (below) uses the upper half of that budget, and only because it is dramatizing a real, specific event.
2. **No bounce, no elastic, no spring overshoot — anywhere.** Every easing curve in this system decelerates into its final state and stops. See Easing Library.
3. **`prefers-reduced-motion: reduce` disables every non-essential animation.** The end state renders immediately. This is not a fallback tier — it's a first-class rendering path (see Reduced Motion below).
4. **60fps or it doesn't ship** — carried over unchanged from `visual-language.md`.
5. **Scroll-triggered animation fires once per element, ever, per page load.** Re-entering the viewport (scrolling up and back down) must never replay it. This is what separates a "confirmed fact" animation from a decorative loop.
6. **Motion never substitutes for a label.** An icon that rotates or a value that pops is never the only signal of a state change — the adjacent text always states the same fact in words, per `typography.md`'s "icons have labels" rule extended to motion.

---

## Easing Library

Three curves cover every animation in this system. No fourth curve should be introduced without updating this table.

| Token | Value | Character | Used For |
|---|---|---|---|
| `--ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | Fast start, long decisive deceleration, **zero overshoot** — like a needle settling on a reading | The Fix Mark lock-in, Number Pop, any "this value is now confirmed" moment |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Balanced ease-in-out | Hover lifts, dropdowns, modals, accordions — ordinary UI open/close |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerates out | Dismissals, closes, collapses — things leaving should feel quick, not lingering |

```css
:root {
  --ease-settle: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

### Explicitly Removed Easing Categories
```
❌ Any cubic-bezier with a coefficient producing overshoot (e.g. back/elastic curves)
❌ linear timing on anything but a progress bar filling toward a known value
❌ "spring()" physics-based easing (CSS spring(), Framer Motion spring configs, etc.)
```

---

## The Signature Motion Moment: "The Fix"

This is the one motion in the entire system built specifically for this brand — the animated counterpart to the Fix Mark glyph (`visual-language.md`) and the exact moment `hero.md`'s live-fix panel exists to dramatize: **the instant a GPS receiver locks a signal to a confirmed coordinate.** Every other motion in this file is generic, reusable UI motion. This one is not, and it inherits the Fix Mark's own scarcity rule: it plays at most three times per page, in the same three places the glyph itself is allowed to appear.

```
Decision: Build one fully custom, precisely-timed animation around signal lock,
          reused identically everywhere the Fix Mark appears
Alternative: Give each Fix Mark instance its own bespoke animation for variety
Reason: brand.md's differentiator is precision repeated consistently, not novelty;
        a single, exact, repeatable motion signature is more "12 years of doing
        this exactly" than three different flourishes would be
Principle: visual-language.md — "The Fix Mark... this project's single earned
           signature"; philosophy.md — "proof, not promises"
Trade-off: Less visual variety across the three Fix Mark moments on a page,
           accepted because repetition of an exact motion is itself the proof
           of precision, not a design limitation
```

### Where It Plays (never more than 3 times per page — same cap as the glyph)
1. The hero's live-fix coordinate panel (`hero.md`).
2. The "12 years" Fix Mark line in the hero.
3. The single pricing card's total-price Fix Mark (`sections.md`, Section 3).

### The Three Phases (total: 460ms — inside the 600ms ceiling)

| Phase | Timing | Easing | What Happens |
|---|---|---|---|
| **1 — Lines draw inward** | `0–200ms` | `--ease-settle` | The crosshair's four line segments animate from `stroke-dashoffset: 100%` to `0%`, drawing from the outer edge toward the center point. All four segments animate simultaneously, not sequentially — a receiver doesn't lock one axis before the other. |
| **2 — Center point resolves** | `200–260ms` | `--ease-settle` | The center dot scales from `0` to `1` with **no overshoot** (`transform: scale()`, curve is `--ease-settle`, which by definition never exceeds 1.0). This is the one moment the phrase "locks into place" should feel literal but never bouncy. |
| **3 — Value confirms** | `260–460ms` | `--ease-standard` | The adjacent coordinate/fact text (e.g. the coordinate string, the "12 years" line, the total price) fades and rises 4px into place: `opacity 0→1`, `translateY(4px→0)`. This is the same micro-motion as ordinary content, kept deliberately unremarkable — the crosshair already did the "moment," the text just confirms it in words. |

```css
@keyframes fix-draw {
  from { stroke-dashoffset: 100%; }
  to   { stroke-dashoffset: 0%; }
}

@keyframes fix-point {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}

@keyframes fix-confirm {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fix-mark__line {
  animation: fix-draw 200ms var(--ease-settle) forwards;
}
.fix-mark__point {
  animation: fix-point 60ms var(--ease-settle) 200ms forwards;
  animation-fill-mode: backwards;
}
.fix-mark__value {
  animation: fix-confirm 200ms var(--ease-standard) 260ms forwards;
  animation-fill-mode: backwards;
}
```

### Trigger Rule
Fires once, on scroll-into-view, per `visual-language.md`'s existing spec for the hero panel — extended here as the standard trigger for all three instances. It never replays on re-scroll, hover, or tab refocus. If the element is already in the initial viewport on load (unlikely given hero copy stacking, but possible on short viewports), it fires once on mount instead of waiting for a scroll event — it should never sit un-animated because the trigger condition was skipped.

### Explicitly Forbidden Variations
```
❌ Looping the draw-in, or repeating it on hover
❌ Adding a pulse, glow, or ring after the point resolves (visual-language.md: no pulse rings)
❌ Speeding it up or slowing it down between the 3 instances — timing must match exactly
❌ Using it for anything that isn't one of the Fix Mark's 4 approved facts
❌ A 4th instance anywhere on a page, even if it "feels like it needs one"
```

---

## Number Pop (Retained Secondary Signature)

Carried over from `visual-language.md`, formalized here with exact values. This is the system's only other bespoke motion, reserved for a live value updating (e.g., a location refresh, a distance recalculating) — a genuine state change, not decoration.

| Property | Value |
|---|---|
| Trigger | A displayed number changes value (live update) — never on page load, never on hover |
| Scale peak | `1.08x` |
| Timing | `120ms` up (`--ease-settle`) + `160ms` down (`--ease-standard`) = **280ms total** |
| Color change | None — motion communicates the update, color stays constant unless a semantic state (error/warning) is also changing |

```css
@keyframes number-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.08); }
  100% { transform: scale(1); }
}
.number-pop--updating {
  animation: number-pop 280ms var(--ease-settle);
}
```

Disabled under `prefers-reduced-motion: reduce` — the number simply changes value with no scale motion.

---

## Functional Motion Catalog

Everything below is ordinary interface motion — necessary, but not brand-signature. Kept deliberately plain so it never competes with the two signatures above.

| Interaction | Motion | Duration | Easing |
|---|---|---|---|
| **Card hover** | `translateY(-2px)`, shadow Level 1 → Level 2 (`visual-language.md` Depth) | 160ms | `--ease-standard` |
| **Button hover** | Background color shift only (`--teal` → hover value); no lift, no scale | 120ms | `--ease-standard` |
| **Button press** | `transform: scale(0.98)` | 80ms | `--ease-exit` |
| **Focus ring** | Instant `outline` appearance, no fade-in | 0ms | — |
| **Accordion open (FAQ)** | Height auto-expand + chevron rotates 180° | 220ms | `--ease-standard` |
| **Accordion close** | Reverse of open | 180ms | `--ease-exit` |
| **Dropdown / popover open** | `opacity 0→1`, `translateY(-4px→0)` | 160ms | `--ease-standard` |
| **Dropdown / popover close** | Reverse, faster | 120ms | `--ease-exit` |
| **Modal open** | Backdrop fade + panel `opacity 0→1`, `scale(0.98→1)` — **no** slide-up-from-bottom drama | 200ms | `--ease-standard` |
| **Modal close** | Reverse | 160ms | `--ease-exit` |
| **Toast appear** | `opacity 0→1`, `translateY(8px→0)` from the edge it anchors to | 200ms | `--ease-standard` |
| **Toast dismiss** | Reverse, faster | 150ms | `--ease-exit` |
| **Tab underline** | `transform: translateX()` slides to the active tab position (RTL-aware, see below) | 200ms | `--ease-standard` |
| **Form field validation state change** | Border-color and icon swap only — **no shake, no red flash** | 150ms | `--ease-standard` |
| **Page/section content** | No entrance animation by default — content renders in place. See Content Entrance Rule below. | — | — |

### Content Entrance Rule (why most things don't animate in)

```
Decision: Ordinary content (cards, testimonials, FAQ items, feature steps) has
          no scroll-triggered entrance animation
Alternative: A uniform fade-up-on-scroll applied to every section for polish
Reason: philosophy.md's Attention Budget principle says decoration that doesn't
        guide toward "see the price" or "get support" is a distraction; an
        entrance animation on content that hasn't changed communicates nothing
        and would visually compete with the two moments that actually matter —
        the Fix Mark and Number Pop
Principle: visual-language.md Motion Discipline — motion only for hover,
           scroll-once-with-meaning, or real state change; ordinary content
           arriving on scroll is not a state change, it's just reading
Trade-off: The page feels less "animated" than a typical modern marketing site;
           accepted deliberately — matching brand.md's Understated anchor point
```

The only scroll-triggered animation on the page is "The Fix," exactly three times, exactly where the Fix Mark glyph is allowed to appear. Nothing else earns a scroll trigger.

### Loading States

Skeleton loading uses a flat two-step opacity pulse, never a shimmer sweep (a shimmer is a moving gradient highlight, and `colors.md` permits exactly one gradient — the hero background — nowhere else).

```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
.skeleton {
  background: var(--bg-muted);
  animation: skeleton-pulse 1200ms ease-in-out infinite;
}
```

This is the **one** permitted `infinite` animation in the system, and it is allowed only because it communicates a genuine ongoing state ("still loading") rather than decoration — the moment content arrives, the animation is removed entirely, not just paused.

---

## RTL & Directional Motion

Cross-referencing `layout.md`'s RTL element table, the same "does it point somewhere, or does it just sit somewhere" test applies to motion, not just static glyphs.

| Motion | Mirrors in RTL? | Why |
|---|---|---|
| Tab underline slide direction | ✅ Yes — slides toward the RTL "forward" (visually left) | Directional, same logic as the CTA arrow in `layout.md` |
| Toast slide-in direction | ✅ Yes — anchors and slides per the mirrored corner | Position is directional |
| Dropdown/popover open offset | ❌ No — vertical offset only (`translateY`), no horizontal component | Purely vertical motion has no RTL meaning |
| Accordion chevron rotation | ❌ No — rotates by open/closed state, not text direction | Already established in `layout.md`: vertical state, not directional |
| The Fix Mark lock-in animation | ❌ No, never mirrored | The glyph itself is explicitly non-mirrored per `layout.md`; its animation inherits the same rule — a symmetric, static-meaning glyph doesn't gain or lose meaning by direction |
| Card hover lift (`translateY`) | ❌ No | Vertical, no directional meaning |
| Modal/toast backdrop fade | ❌ No | Opacity has no direction |

---

## Reduced Motion

Every animation in this file — signature and functional alike — is wrapped so that `prefers-reduced-motion: reduce` renders the final state immediately with no transition.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

For "The Fix" specifically, this means the crosshair, center point, and value text should all simply render in their fully-resolved state on load — per `hero.md`'s existing accessibility note, restated here as a system-wide rule rather than a hero-only exception. The skeleton pulse is the one exception that still runs under reduced motion (a static opacity has nothing to reduce; if implemented as a true opacity oscillation it should collapse to a single static mid-opacity value instead of stopping, so a loading state is still visibly distinct from a broken one).

---

## Motion Tokens (Reference)

```css
:root {
  /* Easing */
  --ease-settle: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);

  /* Durations */
  --duration-instant: 80ms;   /* button press */
  --duration-fast: 120ms;     /* button hover, toast dismiss */
  --duration-base: 160ms;     /* card hover, dropdown open */
  --duration-moderate: 200ms; /* modal, toast, tab underline, accordion open */
  --duration-fix-total: 460ms; /* The Fix, full sequence */
}
```

---

## Motion Anti-Patterns

```
❌ Any looping or auto-playing animation, anywhere, ever (skeleton pulse excepted,
   and only because "still loading" is a genuine ongoing state)
❌ Bounce, spring, or elastic easing of any kind
❌ Entrance animation on ordinary content (cards, testimonials, FAQ) on scroll
❌ Replaying a scroll-triggered animation on re-entering the viewport
❌ Shake, red-flash, or "error theater" on form validation
❌ Parallax scrolling
❌ A 4th instance of "The Fix" animation on any single page
❌ Different timing/easing for the 3 permitted Fix instances (they must match exactly)
❌ Confetti, celebratory bursts, or any "delight" animation unrelated to a real fact
❌ Motion exceeding 600ms total, including all sub-phases
```

---

## Decision Justification Template (unchanged from philosophy.md, applied to motion)

```
Decision: [What you chose]
Alternative: [What you considered]
Reason: [Why this choice serves the user better]
Principle: [Which principle from this file or philosophy.md it follows]
Trade-off: [What you sacrifice and why it's acceptable]
```

---

## Summary

This system has exactly two animations worth remembering by name — **The Fix** (a receiver locking a coordinate, played at most three times per page, always identically timed) and **Number Pop** (a live value updating). Everything else is plain, short, hover- or state-triggered interface motion using one of three non-bouncy easing curves, capped at 600ms, and fully disabled under reduced motion. Nothing loops, nothing plays on load just to look alive, and nothing animates because a competitor's site does. Nothing here is prettier than it needs to be — the same test `philosophy.md` applies to every pixel applies to every millisecond: would a technician who has been doing this job for 12 years do it this way, or is it just decoration that outlived its usefulness?
