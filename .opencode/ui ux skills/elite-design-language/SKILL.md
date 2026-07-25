# Elite Design Language — GPS Tracker Shop

> The permanent visual DNA of this project. Every redesign, every component, every pixel must follow this language.

---

## What This Is

This is not a style guide. This is a **design constitution** — a set of immutable principles, rules, and tokens that define how this project looks, feels, and behaves. It exists so that every future redesign, whether by a human or an AI, produces output that is visually consistent, emotionally coherent, and unmistakably premium.

Every file in this skill is a contract. Violating it produces inconsistency. Consistency is what separates premium from amateur.

---

## Design Goals

| Goal | Meaning |
|------|---------|
| **Trust at first glance** | A user landing on any page must feel: "this is professional, I can trust this with my money" |
| **Clarity over decoration** | Every visual element must earn its place. If removing it doesn't reduce comprehension, remove it |
| **Premium without pretension** | The design should feel expensive — not because it's flashy, but because every detail is considered |
| **Persian-first, not Persian-adapted** | RTL is not a mirror of an LTR layout. The layout is designed FOR Persian reading patterns from the start |
| **GPS-inspired identity** | The visual language subtly evokes precision, location, movement, and satellite technology |
| **Zero friction** | Every interaction should feel effortless. No visual noise, no confusing hierarchy, no dead ends |

---

## Brand Personality

The brand is:

- **Authoritative** — We know GPS tracking. We are the experts.
- **Approachable** — Expertise delivered with warmth, not coldness.
- **Precise** — Like the technology we sell, our design is exact.
- **Modern** — Contemporary without being trendy. Timeless without being stale.
- **Secure** — Every element communicates safety and reliability.

The brand is NOT:

- Playful or whimsical
- Loud or aggressive
- Cheap or discount-oriented
- Corporate or bureaucratic
- Cluttered or busy

---

## Visual Identity

| Element | Rule |
|---------|------|
| **Primary palette** | Navy `#1e3a5f` — authority, depth, trust |
| **Secondary palette** | Teal `#10b981` — technology, growth, GPS signal |
| **Accent palette** | Amber `#f59e0b` — attention, warmth, premium highlights |
| **Typography** | Vazirmatn — Persian-optimized, geometric, clean |
| **Iconography** | Lucide — consistent stroke, geometric, modern |
| **Shape language** | Rounded corners (12-16px), soft shadows, glass surfaces |
| **Motion** | Smooth, purposeful, never decorative-only |

---

## Emotional Goals

Every page should evoke a specific emotional arc:

1. **Landing/Hero** → "This is impressive and trustworthy"
2. **Features** → "They understand my needs"
3. **Products** → "I can see exactly what I'm getting"
4. **Testimonials** → "Others trust them, so can I"
5. **Pricing/CTA** → "This is worth it, and the next step is clear"
6. **Footer** → "They're established and reachable"

---

## Design Principles

### 1. Hierarchy Is Everything
Every page has exactly ONE thing the user should notice first. ONE. Not two. Not three. The hero headline. The CTA. The price. Decide what it is and make it undeniable.

### 2. White Space Is Not Empty Space
White space is the most powerful design tool. It creates rhythm, guides the eye, and communicates premium quality. Never fill space just because it exists.

### 3. Consistency Creates Trust
If a button is rounded on one page and square on another, the user's subconscious registers "this is amateur." Every repeated element must be identical.

### 4. Restraint Over Richness
The most premium designs are the most restrained. One gradient, not five. One animation, not ten. One accent color, not a rainbow.

### 5. Function Follows Form (in this order)
First: does it communicate? Second: does it look good? A beautiful element that confuses the user is a failure.

### 6. Mobile Is the Primary Canvas
Design for 375px first. Scale up. Never design for desktop and squeeze down.

---

## Decision-Making Rules

When faced with a design decision, apply these filters in order:

1. **Does it serve the user's goal?** If no, don't do it.
2. **Does it match an existing pattern?** If yes, use the existing pattern.
3. **Does it add visual noise?** If yes, simplify or remove.
4. **Would Apple do it this way?** If the answer is "they'd do it simpler," simplify.
5. **Does it work in RTL?** If not, redesign for RTL, don't just mirror.

---

## When to Break Rules

Rules exist for consistency. Break them only when:

- A/B testing data proves the exception performs better
- A specific page has a unique narrative purpose (e.g., a viral landing page)
- Accessibility requires it (contrast, touch targets, etc.)
- A technical constraint makes the rule impossible

When you break a rule, document WHY in the code comment.

---

## What Should NEVER Be Designed

These patterns are permanently banned from this project:

- ❌ Auto-playing video with sound
- ❌ Pop-up modals on page load (exit-intent is acceptable)
- ❌ Stock photos of people pointing at screens
- ❌ More than 3 font weights on a single page
- ❌ Animated backgrounds that compete with content
- ❌ Carousel sliders that auto-rotate (user-controlled is fine)
- ❌ "Click here" or "Learn more" as primary CTAs without context
- ❌ Center-aligned body text longer than 2 lines
- ❌ Gradient text on body copy (hero headlines only)
- ❌ Neon glows on interactive elements (reserved for decorative accents)
- ❌ Loading spinners without skeleton fallbacks
- ❌ Placeholder text ("Lorem ipsum") in any production build
- ❌ Emoji in UI copy (unless user-generated content)
- ❌ More than 2 levels of navigation nesting

---

## File Index

| File | Purpose |
|------|---------|
| `brand.md` | Brand personality, voice, feeling |
| `philosophy.md` | Design philosophy and reasoning |
| `visual-language.md` | Gradients, glass, depth, decorative elements |
| `layout.md` | Containers, grid, sections, spacing rhythm |
| `spacing.md` | Complete spacing scale and rules |
| `typography.md` | Type tokens, sizes, RTL rules |
| `colors.md` | Full color system and tokens |
| `components.md` | Component design rules |
| `hero.md` | Hero section design guide |
| `sections.md` | Section templates and patterns |
| `motion.md` | Animation principles and tokens |
| `icons.md` | Icon usage rules |
| `rtl.md` | Persian-first RTL rules |
| `accessibility.md` | Accessibility standards |
| `design-system.md` | Complete design system tokens |
| `review-checklist.md` | Page review scoring rubric |

---

## How to Use This Skill

### For AI Redesigns
1. Load this skill before generating any HTML/CSS/component
2. Reference `design-system.md` for all tokens
3. Check `components.md` before building any UI element
4. Validate against `review-checklist.md` before delivering

### For Human Designers
1. Read `philosophy.md` to understand the WHY
2. Reference `brand.md` for tone and feeling
3. Use `design-system.md` as the source of truth for values
4. Score your work against `review-checklist.md`

### For Code Reviews
1. Every redesigned page must score 8+ on every category in `review-checklist.md`
2. Any score below 8 requires revision before merge
3. "Premium feeling" and "Visual balance" are weighted double
