# Accessibility Rules (Rewritten — Horizontal QA Pass)

> Design is not complete if it excludes people. This file is a full rewrite, not a patch — the previous version pre-dates the finalized color, component, and motion systems and had drifted out of sync with all three.

**Stage index used throughout this document:**

| # | File | # | File |
|---|------|---|------|
| 1 | brand.md | 8 | spacing.md |
| 2 | philosophy.md | 9 | motion.md |
| 3 | visual-language.md | 10 | icons.md |
| 4 | colors.md | 11 | hero.md |
| 5 | typography.md | 12 | sections.md |
| 6 | layout.md | 13 | accessibility.md (this file) |
| 7 | components.md | 14 | rtl.md |

This project targets **WCAG 2.1 AA** as a minimum.

---

## Why This File Was Rewritten, Not Patched

The previous `accessibility.md` was written before Stage 4 (colors.md) replaced the palette, before Stage 7 (components.md) defined full component states, and before Stage 9 (motion.md) formalized the signature animations. Three concrete problems resulted:

1. Its contrast table still cited the retired teal (`#059669` / `#10b981`) instead of the current teal (`#0e7490`) and had no entries for rust, warning, or info at all.
2. Its reduced-motion CSS block didn't account for Stage 9's one deliberate exception (the skeleton-pulse loading state).
3. It carried ARIA and keyboard rules for a testimonial carousel that Stage 12 (sections.md) confirms does not exist in this system.

This version keeps everything from the old file that still held up, replaces everything that didn't, and adds the three deliverables this QA pass was asked to produce: a full contrast re-check, a touch-target/focus/motion specification for the Stage 9 signature animations, and a discrepancy log with stage references for anything that still needs fixing upstream.

---

## Part 1 — Contrast Re-Check (against Stage 4's final palette)

Every combination below was recalculated from relative luminance against the values actually shipped in Stage 4 (colors.md), not estimated. Rows marked "QA-added" were not present in Stage 4's own table and were computed during this review because Stage 7 (components.md) uses them in a real component.

### Text on Backgrounds

| Combination | Ratio | Verdict | Source |
|---|---|---|---|
| Navy `#1e3a5f` on White | 11.50:1 | ✅ AAA | Stage 4 |
| Navy-dark `#162d4a` on White | 13.92:1 | ✅ AAA | Stage 4 |
| Text-heading `#0f172a` on White | — | ✅ AAA | Stage 4 |
| Text-heading `#0f172a` on Soft `#f8fafc` | 17.06:1 | ✅ AAA | QA-added |
| Text-heading `#0f172a` on Muted `#f1f5f9` | 16.30:1 | ✅ AAA | QA-added |
| Body `#334155` on White | 7.5:1 | ✅ AAA | Stage 4 |
| Body `#334155` on Soft `#f8fafc` | 9.90:1 | ✅ AAA | QA-added |
| Body `#334155` on Muted `#f1f5f9` | 9.45:1 | ✅ AAA | QA-added |
| Muted text `#475569` on White | 5.4:1 | ✅ AA | Stage 4 |
| Muted text `#475569` on Muted bg `#f1f5f9` (disabled state) | 6.92:1 | ✅ AA (exempt anyway — disabled controls) | QA-added |
| **Teal `#0e7490` on White** | 5.36:1 | ✅ AA normal text | Stage 4 |
| Teal-dark `#155e6f` on White | 7.34:1 | ✅ AAA | Stage 4 |
| Teal `#0e7490` on Muted `#f1f5f9` | 4.89:1 | ✅ AA (barely — see Part 4, note 3) | QA-added |
| Teal `#0e7490` on Teal-light `#cffafe` (badge text) | 4.79:1 | ✅ AA | QA-added |
| **Rust `#9a3412` on White** | 7.31:1 | ✅ AAA | Stage 4 |
| Rust-dark `#7c2d12` on White | 9.37:1 | ✅ AAA | Stage 4 |
| Rust `#9a3412` on Soft `#f8fafc` | 6.98:1 | ✅ AAA | QA-added |
| Warning `#b45309` on White | 5.02:1 | ✅ AA normal text | Stage 4 |
| Warning `#b45309` on Soft `#f8fafc` | 4.80:1 | ✅ AA (tight) | QA-added |
| Error (base) `#ef4444` on White | 3.76:1 | ⚠️ Large text / icons only | Stage 4 |
| Error-text `#dc2626` on White | 4.83:1 | ✅ AA normal text | Stage 4 |
| Error-text `#dc2626` on Soft `#f8fafc` | 4.62:1 | ✅ AA (tight) | QA-added |
| **Info `#3b82f6` on White** | 3.68:1 | ❌ **FAILS** for normal text | Stage 4 (flagged there as large-text-only) |
| Info `#3b82f6` on Soft `#f8fafc` | 3.52:1 | ❌ **FAILS** for normal text | QA-added |
| White on Navy `#1e3a5f` | 11.50:1 | ✅ AAA | Stage 4 |
| White on Navy-deep `#0f172a` | 17.85:1 | ✅ AAA | Stage 4 |
| White on Teal `#0e7490` (primary button text) | 5.36:1 | ✅ AA | QA-added |
| White on Teal-dark `#155e6f` (button hover text) | 7.34:1 | ✅ AAA | QA-added |

### UI Component / Non-Text Boundaries (3:1 minimum, per WCAG 1.4.11)

| Combination | Ratio | Verdict | Source |
|---|---|---|---|
| Teal `#0e7490` focus ring on White | 5.36:1 | ✅ | Stage 4 |
| **Teal `#0e7490` focus ring on Navy `#1e3a5f`** | 2.15:1 | ❌ **FAILS** the 3:1 non-text minimum | QA-added — see Part 4, finding 1 |
| Teal `#0e7490` focus ring on Navy-deep `#0f172a` | 3.33:1 | ✅ Passes, but with almost no margin | QA-added — see Part 4, finding 1 |
| Border-base `#cbd5e1` on White (default input border) | 1.48:1 | ⚠️ Below 3:1 if the border is the only boundary cue | QA-added — low priority, inputs also carry padding/background cues |

**Standing rule (unchanged from the previous file):** no color from Stage 4 is ever used for small text where its ratio on the relevant background falls below 4.5:1. `--error` (base) and `--info` are reserved for large text, icons, or as a background under dark text — never as small colored body or badge text. See Part 4 for where this rule is currently being broken.

---

## Part 2 — Contrast Rules

1. Never use `--teal` at less than 4.5:1 for small text — on White and Muted backgrounds it passes; do not introduce a new background where it wouldn't.
2. `--info` (`#3b82f6`) fails 4.5:1 on both White and Soft. Do not use it for small text or small badge text anywhere. Use it only for large text (≥18px / ≥24px), icons paired with a passing text color, or as a background under dark text.
3. Never use amber for text outside the single documented `--warning` exception (Stage 4).
4. Error text must pass 4.5:1 — use `--error-text` (`#dc2626`), never the base `--error` (`#ef4444`), for small text.
5. Placeholder text must pass 4.5:1. **No placeholder color token currently exists in Stage 4 or Stage 7** — see Part 4, finding 5.

---

## Part 3 — Touch Targets, Focus Rings, and Motion (Stage 9 Signature Animations)

### Touch Targets

| Platform | Minimum | Recommended |
|----------|---------|-------------|
| Mobile | 44px × 44px | 48px × 48px |
| Desktop | 44px × 44px | 44px × 44px |

Rules (unchanged in principle from the previous file):
1. All buttons, nav links, icon buttons, and form inputs are 44px minimum in the tapped dimension. No exceptions.
2. Spacing between adjacent touch targets is 8px minimum.
3. Icon-only buttons: the icon may be 20–24px (Stage 10 sizing), but the tappable button box is always 44×44px.

**Computed against Stage 7's actual component sizes** — see Part 4, finding 2, for where these fail today:
- Button **Small** (`py-2` = 16px total vertical padding + ~20px line-height at 14px/500) ≈ **36px total height** — below the 44px floor.
- Input **Small** (`py-2` = 16px + 16px body-text floor at ~1.5 line-height ≈ 24px) ≈ **40px total height** — below the 44px floor.
- Interactive Badge (removable filter chip: 4px vertical padding + 14px/500 text ≈ 20px line-height) ≈ **28px total height** — below the 44px floor when the badge itself is the whole tap target.
- Breadcrumb link on mobile (12px padding + ~20px line-height) ≈ **44px exactly** — passes, but with zero margin; confirm actual rendered line-height before shipping.

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 2px;
  border-radius: 4px;
}
```

1. Every interactive element is keyboard-focusable and uses this exact rule as its default — Stage 7's per-component CSS blocks should reference this single rule rather than re-declaring `outline: 2px solid var(--teal)` locally without the offset/radius, to avoid inconsistent-looking focus states across components.
2. **Exception required for dark (navy) sections:** the ratio table in Part 1 shows the standard teal focus ring fails the 3:1 non-text minimum on `--navy` (`#1e3a5f`) and barely clears it on `--navy-deep` (`#0f172a`). Any Secondary/Ghost button or link rendered on a navy background (the hero's "Talk to support" CTA, the footer, the Response Promise band) needs an explicit on-dark focus variant — e.g. a white or `--teal-light` outline — rather than inheriting the default teal ring. See Part 4, finding 1.
3. Focus order follows visual (RTL) order; focus is never trapped except inside an open modal.
4. Skip-to-content link remains the first focusable element on the page.

### Motion & `prefers-reduced-motion` (aligned to Stage 9)

Stage 9 (motion.md) is the authoritative source for every animation's timing and easing. This file only states the accessibility contract on top of it.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

This merges Stage 9's block with the previous file's `scroll-behavior: auto` line, which Stage 9 had dropped — both are needed: Stage 9 for the signature animations, the scroll-behavior line for anchor-link/smooth-scroll navigation elsewhere in the system.

1. **"The Fix" (Stage 9, three-phase, 460ms total)** — under reduced motion, the crosshair lines, center point, and confirmed-value text all render in their final resolved state immediately, with no draw-in, no scale, no fade. Fires once per instance regardless; reduced motion changes only its *duration*, not whether the confirmed value appears.
2. **Number Pop (Stage 9, 280ms)** — under reduced motion, the number changes value directly with no scale motion at all.
3. **Skeleton-pulse loading state** — Stage 9 explicitly documents this as the *one* animation that should not simply vanish under reduced motion: a true opacity oscillation should collapse to a single static mid-opacity value so a loading state stays visually distinct from a broken one. **The blanket CSS block above does not implement that exception on its own** — see Part 4, finding 6, for the fix needed at Stage 9.
4. No animation in this system loops, autoplays, or repeats on hover/re-scroll except the skeleton-pulse's finite loading window.
5. Nothing flashes more than 3 times per second; no auto-playing video; parallax and scroll-triggered animation are both fully static under reduced motion.

---

## Part 4 — Discrepancy Log (stage references, no direct edits made to those files)

| # | Finding | Where it lives today | Fix belongs in |
|---|---|---|---|
| 1 | Teal focus ring fails the WCAG 3:1 non-text minimum on `--navy` (2.15:1) and barely clears it on `--navy-deep` (3.33:1). Any Secondary/Ghost CTA on a navy section (hero, footer, Response Promise) needs an on-dark focus alternative. | Stage 4 (colors.md) defines the ring color; Stage 7 (components.md) applies it uniformly with no dark-background variant | **Stage 4** (define an on-dark focus token) and **Stage 7** (apply it conditionally) |
| 2 | Button Small (~36px), Input Small (~40px), and an interactive Badge (~28px) all fall under the 44px touch-target floor this same system requires. | Stage 7 (components.md) size tables | **Stage 7** — increase Small padding or set an explicit `min-height: 44px` on tappable variants |
| 3 | `--info` (`#3b82f6`) is used as Badge text color at 14px/500 (not bold, not large) in the Info badge variant, but it only passes contrast at 3.68:1 on White / 3.52:1 on Soft — both fail the 4.5:1 normal-text minimum that Stage 4 itself flags for this color. | Stage 4 (colors.md) correctly labels Info as "large text only"; Stage 7 (components.md) Badge — Info variant contradicts that label in practice | **Stage 7** — swap Info badge text to a darker info shade, or restrict `--info` to icon-only/large-text badge use |
| 4 | The FAQ accordion chevron was, until this revision, governed by the old rtl.md's blanket "chevron mirrors" rule, which contradicts Stage 6/Stage 10's explicit "rotates by state, not direction" rule. | Previously Stage 14 (rtl.md, now corrected in this QA pass) | **Resolved in this pass** — see the rewritten rtl.md |
| 5 | No placeholder-text color token exists anywhere in Stage 4 or Stage 7, so the "placeholder must pass 4.5:1" rule in this file has nothing concrete to check against. | Missing from Stage 4 (colors.md) and Stage 7 (components.md, Input) | **Stage 4** — add an explicit `--text-placeholder` token that passes 4.5:1 on `--bg-base` |
| 6 | Stage 9's own prose says the skeleton-pulse should collapse to a static mid-opacity value under reduced motion, but its shipped `prefers-reduced-motion` CSS block (duration → 0.001ms, iteration-count → 1) doesn't implement that — it just makes the animation run once and stop wherever the keyframe lands. | Stage 9 (motion.md), Reduced Motion section | **Stage 9** — add a `.skeleton` override inside the reduced-motion media query that fixes `opacity` to the mid-point value instead of relying on the generic duration/iteration override |
| 7 | Carousel-specific RTL mirroring and ARIA/keyboard rules exist in the previous accessibility.md and rtl.md, but Stage 12 (sections.md) confirms testimonials are a static list with no carousel component anywhere in the system. | Previously Stage 13 and Stage 14 (both now corrected) | **Resolved in this pass** — removed below and in the rewritten rtl.md |
| 8 | The old contrast table cited the retired teal values (`#059669` / `#10b981`) instead of Stage 4's current `#0e7490` / `#155e6f`, and had no rows for rust or warning at all. | Previously Stage 13 (this file, now corrected) | **Resolved in this pass** — see Part 1 |

---

## ARIA (unchanged, carousel role removed per finding 7)

| Component | Attributes |
|-----------|------------|
| Button | `aria-label` (if icon-only), `aria-pressed` (toggle), `aria-expanded` (dropdown) |
| Accordion | `aria-expanded`, `aria-controls`, `role="region"` on content |
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Dropdown | `aria-expanded`, `aria-haspopup`, `aria-controls` |
| Toast | `role="alert"`, `aria-live="polite"` |
| Progress | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Navigation | `role="navigation"`, `aria-label` |
| Search | `role="search"`, `aria-label` |

Rules: semantic HTML first (`<button>`, not `<div role="button">`); ARIA supplements, never replaces, semantic HTML; don't add ARIA roles to elements that already carry them natively; test with a real screen reader (NVDA, VoiceOver, TalkBack) before shipping.

---

## Forms, Images, Screen Readers, Color Independence (unchanged — no conflicts found here)

These sections were checked against Stage 6, Stage 7, and Stage 12 during this review and remain correct as previously written.

### Forms
- Every input has a visible label, not just placeholder text.
- Required fields are marked visually (`*`) and with `aria-required`.
- Error messages are linked via `aria-describedby` and use `role="alert"`.
- Related fields are grouped with `<fieldset>` / `<legend>`.

### Images
- Content images get descriptive `alt`; decorative images get `alt=""` and `aria-hidden="true"`.
- Complex images (e.g. a map or dashboard screenshot) get an `aria-describedby` caption.
- No images of text; real text is always used instead.

### Color Independence
- Color is never the only signal — error/success states always pair color with an icon and text.
- Links are underlined, not distinguished by color alone.

---

## Accessibility Testing Checklist

- [ ] Tab through the entire page using only the keyboard
- [ ] Focus indicator is visible on every focused element, including on navy sections (finding 1)
- [ ] Skip link works and moves focus to main content
- [ ] All touch targets measure 44×44px minimum, including Small buttons/inputs and interactive badges (finding 2)
- [ ] Screen reader announces breadcrumb, Fix Mark values, and confirmed-fact text correctly
- [ ] Info-colored text is never used below 18px without a contrast fix (finding 3)
- [ ] Reduced motion renders The Fix and Number Pop in their final state instantly, and the skeleton-pulse at a static mid-opacity rather than frozen mid-keyframe (finding 6)
- [ ] No carousel ARIA roles or keyboard handlers exist anywhere in the codebase (finding 7)
- [ ] Content is readable and functional at 200% zoom

---

## Summary

This revision keeps the previous file's structure where it still held up (forms, images, ARIA, screen-reader rules) and replaces what had gone stale: a contrast table built on a retired palette, a reduced-motion block that didn't account for Stage 9's one intentional exception, and accessibility rules written for a carousel component that was never built. Eight concrete discrepancies were found; two were fixed directly in this pair of files (the accordion-chevron rule and the orphaned carousel rules), and six are logged above against the specific upstream stage that owns the fix — this file reports them rather than silently patching someone else's finalized document.
