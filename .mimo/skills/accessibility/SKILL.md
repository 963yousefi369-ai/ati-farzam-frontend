---
name: accessibility
description: Audit and improve web accessibility following WCAG 2.2 guidelines.
metadata:
  author: web-quality-skills
  version: "1.1"
---

# Accessibility (a11y)

Comprehensive accessibility guidelines based on WCAG 2.2 and Lighthouse accessibility audits.

## WCAG Principles: POUR
- **P**erceivable — Content can be perceived through different senses
- **O**perable — Interface can be operated by all users
- **U**nderstandable — Content and interface are understandable
- **R**obust — Content works with assistive technologies

## Key Rules
- Images require alt text (decorative: `alt="" role="presentation"`)
- Icon buttons need `aria-label`
- Color contrast: 4.5:1 normal text, 3:1 large text
- All functionality must be keyboard accessible
- Use `:focus-visible` for keyboard-only focus
- Interactive targets: min 24×24px (recommended 44×44px)
- Respect `prefers-reduced-motion`
- Use `aria-live` regions for dynamic content
- Prefer native elements over ARIA roles
