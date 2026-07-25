---
name: impeccable
description: Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks.
version: 3.9.1
user-invocable: true
argument-hint: "[craft|shape · audit|critique · animate|bolder|colorize|delight|layout|overdrive|quieter|typeset · adapt|clarify|distill · harden|onboard|optimize|polish · init|document|extract|live] [target]"
license: Apache 2.0
---

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

## Design guidance

Produce ready-to-ship, production-grade code, not prototypes or starting points. Take no shortcuts unless the user asks for them. Don't stop until arriving at a complete implementation (beautiful, responsive, fast, precise, bug-free, on brand).

### General rules

#### Color

- **Verify contrast.** Body text must hit ≥4.5:1 against its background; large text needs ≥3:1.
- Gray text on a colored background looks washed out. Use a darker shade of the background's own hue.

#### Typography

- Cap body line length at 65–75ch.
- Don't pair fonts that are similar but not identical. Pair on a contrast axis (serif + sans, geometric + humanist).
- Hero / display heading ceiling: clamp() max ≤ 6rem (~96px).
- Display heading letter-spacing floor: ≥ -0.04em.
- Use `text-wrap: balance` on h1–h3; `text-wrap: pretty` on long prose.

#### Layout

- Vary spacing for rhythm.
- Cards are the lazy answer. Nested cards are always wrong.
- Flexbox for 1D, Grid for 2D.
- For responsive grids without breakpoints: `repeat(auto-fit, minmax(280px, 1fr))`.
- Build a semantic z-index scale (dropdown → sticky → modal-backdrop → modal → toast → tooltip).

#### Motion

- Motion should be intentional, not an afterthought.
- Ease out with exponential curves (ease-out-quart / quint / expo). No bounce, no elastic.
- Reduced motion is not optional. Every animation needs a `@media (prefers-reduced-motion: reduce)` alternative.
- Reveal animations must enhance an already-visible default.

#### Interaction

- Dropdowns inside `overflow: hidden` containers will be clipped. Use native `<dialog>` / popover API, `position: fixed`, or a portal.

### Absolute bans

- **Side-stripe borders.** `border-left` or `border-right` greater than 1px as a colored accent.
- **Gradient text.** `background-clip: text` combined with a gradient background.
- **Glassmorphism as default.** Blurs and glass cards used decoratively.
- **The hero-metric template.** Big number, small label, supporting stats, gradient accent.
- **Identical card grids.** Same-sized cards with icon + heading + text, repeated endlessly.
- **Tiny uppercase tracked eyebrow above every section.**
- **Numbered section markers as default scaffolding (01 / 02 / 03).**
- **Text that overflows its container.**

### The AI slop test

If someone could look at this interface and say "AI made that" without doubt, it's failed.

## Commands

| Command | Category | Description |
|---|---|---|
| `craft [feature]` | Build | Shape, then build a feature end-to-end |
| `shape [feature]` | Build | Plan UX/UI before writing code |
| `init` | Build | Set up project context: PRODUCT.md, DESIGN.md |
| `document` | Build | Generate DESIGN.md from existing project code |
| `extract [target]` | Build | Pull reusable tokens and components into design system |
| `critique [target]` | Evaluate | UX design review with heuristic scoring |
| `audit [target]` | Evaluate | Technical quality checks (a11y, perf, responsive) |
| `polish [target]` | Refine | Final quality pass before shipping |
| `bolder [target]` | Refine | Amplify safe or bland designs |
| `quieter [target]` | Refine | Tone down aggressive designs |
| `distill [target]` | Refine | Strip to essence, remove complexity |
| `harden [target]` | Refine | Production-ready: errors, i18n, edge cases |
| `onboard [target]` | Refine | Design first-run flows, empty states |
| `animate [target]` | Enhance | Add purposeful animations and motion |
| `colorize [target]` | Enhance | Add strategic color to monochromatic UIs |
| `typeset [target]` | Enhance | Improve typography hierarchy and fonts |
| `layout [target]` | Enhance | Fix spacing, rhythm, and visual hierarchy |
| `delight [target]` | Enhance | Add personality and memorable touches |
| `overdrive [target]` | Enhance | Push past conventional limits |
| `clarify [target]` | Fix | Improve UX copy, labels, and error messages |
| `adapt [target]` | Fix | Adapt for different devices and screen sizes |
| `optimize [target]` | Fix | Diagnose and fix UI performance |
| `live` | Iterate | Visual variant mode in the browser |

### Routing rules

1. **No argument**: show context-aware menu with 2-3 highest-value next commands.
2. **First word matches a command**: load its reference and follow instructions.
3. **Intent maps to a command**: proceed as if invoked.
4. **No clear match**: general design invocation with full rules.
