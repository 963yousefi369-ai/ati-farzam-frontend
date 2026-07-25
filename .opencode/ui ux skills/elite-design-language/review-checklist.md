# Review Checklist

> Every redesigned page must pass this checklist before it ships. No exceptions.
>
> This version replaces generic design-quality categories with criteria derived from this project's own `brand.md` and `philosophy.md`. A page is not scored on whether it "feels premium" — it is scored on whether it proves the three things this business actually sells: precise installation, fast answers, and honest pricing. Every test below is observable (measure it, count it, click it) rather than a matter of taste.

---

## How to Use This Checklist

Score each category from 1-10. A score of 8+ is passing. Below 8 requires revision.

**Weights** are no longer arbitrary. They are derived directly from `brand.md`'s stated priority order:

| Priority (from brand.md) | Categories | Weight |
|---|---|---|
| **Primary feeling: Trustworthy** (explicitly named by the founders) | Trust & Price Transparency | **3x** |
| **Sharpest competitive edge** — "must be visible everywhere, not just claimed once" | Responsiveness Signal | **2x** |
| **Core clarity requirement** — one action, no wondering "what do I do" | Visual Hierarchy & Clarity | **2x** |
| **Brand discipline** — the visual system that makes "quiet competence" recognizable | Brand & Palette Consistency | **2x** |
| Everything else (execution quality, not a differentiator on its own) | Typography, Spacing, Contrast, Motion, Accessibility, Device Responsiveness, Steady Feeling, Overall Polish | 1x each |

Each test below is written so two independent reviewers should arrive at the same score. If a test requires a judgment call, that is a defect in the test — flag it for revision.

---

## 1. Trust & Price Transparency (⭐ Weighted: 3x)

*Derived from: philosophy.md "The No Hidden Cost Test," brand.md "Price Trust" and "Fair-Pricing Signals."*

### Objective Tests
- [ ] **Total cost visible without a click.** On any product/pricing card, is the annual subscription fee physically present in the same card as the device price — not behind a tooltip, accordion, or "see details" link?
- [ ] **Equal visual weight.** Measure the font-size/weight of the device price vs. the annual fee. Per philosophy.md's Information Hierarchy rule ("Total cost is always visually equal in weight to the device name"), the fee must not be rendered in `--text-sm` (14px) or `--text-muted` while the price uses a heading size — check computed styles.
- [ ] **Price-to-fee spacing signals unity.** Per design-system.md, the gap between price and fee line should be `--margin-price-to-fee-line: 4px` — not a spacing value large enough to visually separate them into unrelated facts.
- [ ] **No "Contact us for pricing" wall.** Search the page/flow for any pricing-related CTA that leads to a contact form or sales call *before* a number is shown. Fail if found.
- [ ] **Tier-to-situation mapping exists.** Each of the three product tiers states, in visible text (not just a spec table), who it is for (individual vehicle / small fleet / large fleet) — confirm by reading the copy, not inferring from price alone.
- [ ] **Renewal price stated.** If a subscription renews, is the renewal-year price shown as prominently as the first-year price? Fail if renewal pricing exists only in fine print or a linked terms page.
- [ ] **12-years-in-business stated as fact.** Confirm the literal string "12 years" (or equivalent numeric claim) appears in visible copy, not just implied by design maturity.
- [ ] **Testimonial authenticity check.** Do displayed testimonials retain natural, slightly imperfect phrasing (per brand.md, "kept as they were said") rather than reading like polished marketing copy? Compare testimonial sentence structure against the rest of the page's copy — if indistinguishable, fail.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Every test passes. Total cost, tier fit, and human proof are all one glance away. |
| **8-9** | All pricing tests pass; one non-critical item (e.g. testimonial polish) needs a touch-up. |
| **6-7** | Pricing is visible but not equally weighted, or one tier lacks a "who it's for" statement. |
| **4-5** | A "contact for pricing" wall exists, or the annual fee is visually subordinate to the device price. |
| **1-3** | Total cost is hidden, unclear, or requires a sales interaction to discover. |

---

## 2. Responsiveness Signal (⭐ Weighted: 2x)

*Derived from: brand.md "Responsiveness Signals" and "Trust Architecture — Layer 4."*

### Objective Tests
- [ ] **Contact path visible above the fold.** On every page template, is a phone number, chat entry point, or equivalent contact affordance visible without scrolling — not only in the footer?
- [ ] **Response expectation is stated in words.** Search visible copy for a concrete expectation ("we answer during business hours," or a stated response time). Fail if the only language is generic ("We'll get back to you").
- [ ] **No dead-end contact flow.** Submit the contact form (or trace the chat flow) — does it produce an immediate, specific confirmation (not a generic "Thank you")?
- [ ] **No chatbot-only trap.** If a chat widget exists, confirm there is a visible path to a human (not an infinite bot loop) within the same flow.
- [ ] **Present on every purchase decision point.** Per philosophy.md's Information Hierarchy rule 3, check that the support/contact affordance appears near the product/pricing sections specifically — not only on a standalone "Contact" page.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Contact path and a stated response expectation appear on every template, including next to pricing. |
| **8-9** | Present on every template; response expectation could be more specific. |
| **6-7** | Present on most templates but missing near a purchase decision point. |
| **4-5** | Contact is present but generic, or requires scrolling past the fold to find. |
| **1-3** | Contact is buried in the footer only, or chat leads nowhere. |

---

## 3. Visual Hierarchy & Clarity (⭐ Weighted: 2x)

*Derived from: philosophy.md "Simplicity" and "Clarity."*

### Objective Tests
- [ ] **One H1 per page**, and its text states a concrete outcome (e.g. contains a verb + a customer-relevant noun), not an abstract slogan — check against the banned-word list in Test 4 below.
- [ ] **One primary CTA per viewport.** Count highest-contrast interactive elements visible in any single viewport height (375px, 1024px, 1440px). Fail if more than one competes at equal visual weight.
- [ ] **CTA copy is a verb phrase**, not a noun ("See exact pricing," not "Learn more" or "Pricing"). Check literal button text.
- [ ] **Heading scale matches design-system.md tokens exactly** (`--h1` 36/44/600 through `--h6` 16/24/500 desktop values) — no ad hoc heading size outside this scale.
- [ ] **Progressive disclosure confirmed.** If a section lists features, count them — more than 3 features shown at once without a "see more" / link-out fails philosophy.md's "reduce to the essential" rule.
- [ ] **No jargon without adjacent plain-language explanation.** Flag any technical term (GPS accuracy in meters, firmware, module names) not paired with a plain-language clause in the same sentence or immediately after.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Every viewport has exactly one clear action; zero unexplained jargon. |
| **8-9** | Hierarchy is clear; one minor jargon instance without explanation. |
| **6-7** | One viewport has two competing CTAs, or a feature list exceeds 3 items with no link-out. |
| **4-5** | Multiple viewports have competing focal points. |
| **1-3** | No clear single action anywhere on the page. |

---

## 4. Brand & Palette Consistency (⭐ Weighted: 2x)

*Derived from: design-system.md Color tokens and Hard Rules, brand.md "Anti-Patterns."*

### Objective Tests
- [ ] **Color palette is limited to tokens.** Every color in the page inspects to one of: `--navy`/`--navy-dark`/`--navy-deep`, `--teal`/`--teal-dark`/`--teal-light`, `--rust`/`--rust-dark`, the neutral scale, or a semantic color (`--success`, `--warning`, `--error`, `--error-text`, `--info`). Any other hex value fails.
- [ ] **Navy section count ≤ 2 per page.** Count full-width sections using `--navy`/`--navy-deep` as background. Fail above 2.
- [ ] **Rust ("Fix Mark") count ≤ 3 per page, ≤ 1 per viewport.** Count instances of `--rust`/`--rust-dark` used as a glyph or confirmed-fact number.
- [ ] **No banned visual elements present.** Check for: countdown timers, "today only" badges, gold/luxury accent colors, glossy showroom-style product photography, more than one gradient (only `--gradient-hero` is permitted, hero background only).
- [ ] **Icon style is uniform.** Every icon is Lucide, outline style, 1.5px stroke — spot-check 5 icons across the page for a filled or mismatched-stroke outlier.
- [ ] **Single accent-color rule.** Per philosophy.md's Attention Management, confirm the accent color (`--teal` or `--rust`) points only at "see the price" or "get support" elements — flag any decorative, non-functional use.
- [ ] **Radius and shadow tokens only.** Border-radius must be `--radius-base` (12px) or `--radius-full`; shadows must be `--shadow-card` or `--shadow-hover` (2 levels only, never a 3rd, never color-tinted).

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Every color, icon, radius, and shadow traces to a design-system token. Zero banned elements. |
| **8-9** | One minor off-token value found (e.g. a one-off radius). |
| **6-7** | Navy or rust usage exceeds the stated count, or one banned visual element (e.g. a gradient) appears. |
| **4-5** | Multiple off-brand colors or a luxury/gold accent appears anywhere. |
| **1-3** | The page could belong to a different, unrelated brand. |

---

## 5. Typography

*Derived from: design-system.md Typography tokens, brand.md "Plain-spoken."*

### Objective Tests
- [ ] **Font family is exactly `--font-sans`** (IRANSansX, falling back to Vazirmatn) throughout; `--font-mono` appears only on coordinates, tracking numbers, or data tables.
- [ ] **Max 3 font weights on the page**, and no weight exceeds `--font-weight-semibold` (600) — check for any Bold/700+ usage.
- [ ] **Body text ≥ `--text-base` (16px)**, with a 14px floor permitted only for mobile-secondary text per token comments.
- [ ] **Line-height matches token set**: `--leading-tight-rtl` (1.3) for RTL h1–h3, `--leading-rtl-body` (1.7) for Persian body — flag any heading using the Latin 1.1 value in a Persian context.
- [ ] **Paragraph width ≤ `--prose-width` (65ch)** — measure rendered line length in the widest body-text column.
- [ ] **`--tracking-persian: 0` confirmed** — no letter-spacing applied to any Persian text run.
- [ ] **RTL alignment**: body and headings are right-aligned by default; only embedded numerals use LTR via `unicode-bidi: embed`.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Every text element maps exactly to a typography token. |
| **8-9** | One minor deviation (e.g. a single non-scale size). |
| **6-7** | A few arbitrary sizes or a 4th font weight appears. |
| **4-5** | Line-height or tracking rules are inconsistently applied. |
| **1-3** | Multiple fonts, random sizes, or Latin-only line-heights applied to Persian text. |

---

## 6. Spacing & Rhythm

*Derived from: design-system.md Spacing tokens, philosophy.md "Visual Rhythm."*

### Objective Tests
- [ ] **Every spacing value is on the 4px scale** (`--space-0` through `--space-40`, plus the two documented custom steps `--space-13`/`--space-18`) — flag any computed margin/padding not matching a token.
- [ ] **Section padding matches the per-section table** in design-system.md (e.g. Hero 64/96/128, Pricing Hero 32/48/64) — check the specific page type against its documented values, not a generic scale.
- [ ] **Card padding is consistent within a section** — all cards in one grid use the same `--card-padding-*` token.
- [ ] **Price-to-fee margin is exactly `--margin-price-to-fee-line` (4px)** — re-verified here as a spacing rule (also checked in Category 1 as a trust rule).
- [ ] **No element pair closer than `--touch-target-gap-min` (8px)** unless intentionally grouped (e.g. price + fee).
- [ ] **`--hero-overlap-offset` (24–40px) is the only sanctioned negative-margin/overlap pattern** — flag any other overlap technique.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Every value traces to a token; section padding matches the documented per-page table exactly. |
| **8-9** | Almost all values match; one or two minor deviations. |
| **6-7** | Most match; a few arbitrary values remain. |
| **4-5** | Many arbitrary values; section padding doesn't match the documented table. |
| **1-3** | Spacing appears random. |

---

## 7. Contrast

*Derived from: design-system.md Color tokens and known discrepancies.*

### Objective Tests
- [ ] **Body text passes 4.5:1** against its background (test `--text-body` on `--bg-base`/`--bg-soft`/`--bg-muted`).
- [ ] **`--teal` is never used for small (<18px) body text on white** — confirmed 4.5:1 failure risk per hard rule in design-system.md.
- [ ] **`--info` (#3b82f6) is restricted to icons or large text only.** Per design-system.md's flagged discrepancy, this token fails 4.5:1 on both White and Soft backgrounds as small text — fail this test if `--info` appears as 14px badge/body text anywhere.
- [ ] **`--error-text` (#dc2626), not `--error` (#ef4444), is used for small error copy** — `--error` is reserved for large text/icons/backgrounds only.
- [ ] **`--warning` (#b45309) appears only as icon/text, never as a filled block or badge shape** — per the "one permitted amber" rule.
- [ ] **Focus ring uses the canonical rule**: `outline: 2px solid var(--teal); outline-offset: 2px; border-radius: 4px` — check this matches accessibility.md's authoritative version, not the shorter colors.md version.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | All text passes AA; no flagged-discrepancy tokens misused. |
| **8-9** | All text passes AA; one non-critical AAA opportunity missed. |
| **6-7** | One contrast failure (e.g. `--info` used as small text). |
| **4-5** | Several contrast failures, including error-text miscoloring. |
| **1-3** | Multiple failures; readability compromised. |

---

## 8. Motion

*Derived from: design-system.md Motion tokens.*

### Objective Tests
- [ ] **Button and card hover both use `--duration-base` (160ms)** with `--ease-standard` and `--hover-lift: -2px`, shadow transitioning `--shadow-card` → `--shadow-hover` — this is the resolved conflict; flag any component still using the old 120ms/no-lift button behavior.
- [ ] **No animation exceeds `--duration-ceiling` (600ms)**, including multi-phase sequences (e.g. "The Fix" totals 460ms — verify no phase pushes it over).
- [ ] **"The Fix" signature animation plays ≤ 3× per page** — count instances.
- [ ] **Only 3 easing curves exist in the codebase**: `--ease-settle`, `--ease-standard`, `--ease-exit` — flag any 4th curve.
- [ ] **`prefers-reduced-motion: reduce` disables non-essential animation** and renders the end state immediately — test with the OS setting enabled. Skeleton pulse is the one documented exception, but confirm it does not simply run once (motion.md's open gap) — flag if so.
- [ ] **No auto-playing carousel or animation** other than the skeleton-pulse loading state.
- [ ] **Scroll-triggered animations fire once per element per page load**, never on re-scroll.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Every animation matches its documented token exactly; reduced-motion fully respected. |
| **8-9** | Timing matches; reduced-motion has one minor gap (e.g. the known skeleton-pulse issue). |
| **6-7** | One component still uses pre-resolution button-hover behavior. |
| **4-5** | Multiple animations exceed documented durations or use an undocumented easing curve. |
| **1-3** | Auto-playing or repeating animations found; reduced-motion ignored. |

---

## 9. Accessibility

*Derived from: design-system.md Accessibility tokens and known discrepancies.*

### Objective Tests
- [ ] **All interactive elements reachable and operable by keyboard** (Tab order matches visual order; Enter/Space activate).
- [ ] **Touch targets ≥ `--touch-target-min` (44px)** — explicitly re-check Button Small (~36px), Input Small (~40px), and interactive Badges (~28px), which design-system.md records as a known open gap. Fail if not fixed.
- [ ] **Touch target spacing ≥ `--touch-target-gap-min` (8px)** between adjacent tappable elements.
- [ ] **All images have alt text**; all form inputs have associated `<label>` elements.
- [ ] **Error messages use `role="alert"`** and are specific (per brand.md's tone rule — "Signal lost. Here's why," not "Error").
- [ ] **Skip link present and functional** at the top of keyboard tab order.
- [ ] **Color is not the sole indicator** — check any status/error/success signal also has an icon or text label, not color alone.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Fully accessible; the known touch-target gap has been closed. |
| **8-9** | Mostly accessible; one minor issue outside the known gap. |
| **6-7** | The documented touch-target gap (Button/Input Small, Badge) remains unresolved. |
| **4-5** | Multiple accessibility gaps beyond the known issue. |
| **1-3** | Significant barriers; keyboard navigation broken. |

---

## 10. Device Responsiveness

*Derived from: design-system.md Breakpoint tokens.*

### Objective Tests
- [ ] **Layout tested at all 6 documented breakpoints**: 375px (mobile), `--bp-sm` 640px, `--bp-md` 768px, `--bp-lg` 1024px, `--bp-xl` 1280px, `--bp-2xl` 1536px.
- [ ] **No horizontal scroll** at any tested width.
- [ ] **Column count matches the documented grid** per breakpoint (2 cols at sm, 2–3 at md, 3 at lg, 3–4 at xl, 4 at 2xl).
- [ ] **Grid gaps match tokens**: 24px mobile/tablet, 32px desktop.
- [ ] **Container padding matches tokens**: 16px mobile, 24px tablet, 32px desktop, 48px large.
- [ ] **No text smaller than 14px** at any breakpoint (the documented mobile-secondary floor).
- [ ] **Touch targets remain ≥ 44px on mobile specifically** (cross-check with Category 9).

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Every documented breakpoint matches its column/gap/padding spec exactly. |
| **8-9** | Minor deviation at one breakpoint. |
| **6-7** | One breakpoint doesn't match the documented grid. |
| **4-5** | Significant layout issues at 2+ breakpoints. |
| **1-3** | Broken layout at one or more breakpoints. |

---

## 11. Steady, Considered Feeling *(replaces "Premium Feeling")*

*Derived from: brand.md "Steady, Understated Feeling" — explicitly not luxury, not startup hype.*

### Objective Tests
- [ ] **No luxury/gold accent color exists anywhere** (cross-referenced with Category 4's palette check).
- [ ] **No glossy/showroom-style product photography** — check image treatment for staged lighting, reflective surfaces, or "jewelry catalog" styling.
- [ ] **No hype language in copy.** Scan for banned words/phrases: "revolutionary," "industry-leading," "the best," "cutting-edge," "game-changing." Fail if any appear.
- [ ] **No fake urgency anywhere on the page** — no countdown timer, no "today only," no "X left in stock," no inflated was/now pricing. This is a hard fail if found (per philosophy.md, non-negotiable).
- [ ] **White space is generous per the section-density tokens** (`--section-dense` 48px through `--section-hero-max` 128px) — not cramped relative to the documented value for that section type.
- [ ] **Shadows are the documented warm-neutral, low-opacity values only** (`--shadow-card`, `--shadow-hover`) — never a colored or heavy drop shadow.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Zero hype language, zero urgency tactics, spacing matches section-density tokens exactly. |
| **8-9** | One minor wording choice reads slightly promotional. |
| **6-7** | Spacing feels tighter than documented, or one hype word appears. |
| **4-5** | Multiple hype words, or photography leans showroom-glossy. |
| **1-3** | A countdown timer, urgency badge, or luxury-retail visual language is present. This category cannot score above 3 if fake urgency is found, regardless of other factors. |

---

## 12. Overall Polish

### Objective Tests
- [ ] No placeholder text, broken images, or broken links.
- [ ] No console errors on page load.
- [ ] No layout shift (CLS) on load — verify via performance panel.
- [ ] Loading states exist for async content (using `--duration-skeleton-pulse` per design-system.md).
- [ ] Empty and error states exist and use brand-voice-consistent copy (per brand.md's Error Messages tone rule — calm, specific, no apology theater).
- [ ] Page loads in under 2 seconds.

### Scoring
| Score | Meaning |
|-------|---------|
| **10** | Impeccable. Production-ready. |
| **8-9** | One or two minor issues. |
| **6-7** | Several issues to address. |
| **4-5** | Many issues remain. |
| **1-3** | Unfinished. |

---

## Final Score Calculation

### Formula

```
Total Score = (
  Trust & Price Transparency × 3 +
  Responsiveness Signal × 2 +
  Visual Hierarchy & Clarity × 2 +
  Brand & Palette Consistency × 2 +
  Typography +
  Spacing & Rhythm +
  Contrast +
  Motion +
  Accessibility +
  Device Responsiveness +
  Steady Feeling +
  Overall Polish
) / 17
```

### Hard Override
Regardless of the weighted average, if **any single instance** of fake urgency (countdown timer, "today only," inflated was/now pricing) or a **hidden subscription fee** is found anywhere on the page, the page **automatically fails** at a maximum score of 5.9, and must be revised before any other scoring applies. These two failures are explicitly what the founders said this brand refuses to be — no weighted average should be able to average them away.

### Minimum Passing Score: 8.0

### Score Interpretation

| Score | Grade | Action |
|-------|-------|--------|
| **9.5-10** | A+ | Ship immediately. |
| **9.0-9.4** | A | Ship with minor polish. |
| **8.5-8.9** | B+ | Ship with noted improvements for next iteration. |
| **8.0-8.4** | B | Ship, but schedule improvements. |
| **7.0-7.9** | C | Revise before shipping. |
| **6.0-6.9** | D | Significant revision needed. |
| **Below 6** | F | Redesign required (including any hard-override failure). |

---

## Review Process

1. **Self-review.** The designer/developer scores the page using this checklist.
2. **Peer review.** A second person scores the page independently.
3. **Compare scores.** Discuss any category where scores differ by more than 2 points.
4. **Final score.** Average of both reviewers' scores.
5. **Ship decision.** If final score ≥ 8.0 and no hard-override failure exists, ship. Otherwise, revise.

---

## Summary

This checklist no longer measures whether a page looks impressive. It measures whether a page proves what this company has done for 12 years: install carefully, answer the phone, and never hide the real cost. A page can be visually flawless and still fail this checklist if it hides a subscription fee or invents urgency that doesn't exist — because those two failures are exactly what the founders said this brand refuses to be. Score honestly. Revise thoroughly. Ship only when the page passes the Technician Test.
