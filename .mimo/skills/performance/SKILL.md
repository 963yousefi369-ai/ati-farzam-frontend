---
name: performance
description: Optimize web performance for faster loading and better user experience.
metadata:
  author: web-quality-skills
  version: "1.0"
---

# Performance optimization

Deep performance optimization based on Lighthouse performance audits.

## Key Rules
- Avoid layout thrashing — batch reads then writes
- Use `requestAnimationFrame` instead of `setInterval(fn, 16)`
- Animate only `transform` and `opacity` (compositor-friendly)
- Add `will-change: transform` to continuously animated elements
- Debounce scroll/resize handlers
- Respect `prefers-reduced-motion` in all animations
- Stop infinite animations when off-screen (viewport intersection)
- Use `transform: translate3d()` instead of `left`/`top` for positioning
- Virtualize long lists with `content-visibility: auto`
