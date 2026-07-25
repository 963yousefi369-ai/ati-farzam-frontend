---
name: tailwind-design-system
description: Enforce consistent use of Tailwind design tokens. Never use raw hex or Tailwind default palettes when a semantic token exists.
metadata:
  author: afi-next
  version: "1.0"
---

# Tailwind Design System Enforcement

## Color Token Map
| Wrong | Correct Token | Tailwind Class |
|-------|--------------|----------------|
| `#0f172a` / `bg-[#0f172a]` | `--bg-navy-deep` | `bg-navy-deep` |
| `#1e3a5f` / `bg-[#1e3a5f]` | `--navy` | `bg-navy` |
| `#0e7490` / `bg-[#0e7490]` | `--teal` | `bg-teal` |
| `text-gray-800` | `--text-heading` | `text-text-heading` |
| `text-gray-500` / `text-gray-400` | `--text-muted` | `text-text-muted` |
| `bg-gray-50` | `--bg-muted` | `bg-bg-muted` |
| `bg-gray-100` | `--bg-muted` | `bg-bg-muted` |
| `border-gray-100` / `border-gray-200` | `--border-soft` | `border-border-soft` |
| `border-blue-500` | `--teal` | `border-teal` |
| `ring-blue-200` | `--teal-light` | `ring-teal-light` |
| `text-green-600` | `--success` (teal) | `text-success` |
| `text-amber-600` | `--warning` | `text-warning` |
| `text-purple-600` | N/A — off-brand | Use navy/teal/rust |
| `rgba(16,185,129)` (emerald) | `--teal` | `rgba(14,116,144)` |

## Spacing Token Map
| Wrong | Correct Token |
|-------|--------------|
| `py-8 lg:py-12` | `py-section-mobile md:py-section-desktop` |
| `py-8 lg:py-10` | `py-section-mobile md:py-section-desktop` |
| `max-w-7xl` (1280px) | `max-w-[1440px]` |

## Shadow System
Only two levels — no `shadow-sm`/`shadow-md`/`shadow-lg`:
- `--shadow-card`: `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)`
- `--shadow-hover`: `0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07)`
- Use: `shadow-[var(--shadow-card)]` and `hover:shadow-[var(--shadow-hover)]`

## Z-Index Scale (CSS vars only — do NOT use Tailwind z-* classes)
| Token | Value |
|-------|-------|
| `--z-navbar` | 300 |
| `--z-mobile-menu-overlay` | 400 |
| `--z-mobile-menu-drawer` | 500 |
| `--z-dropdown` | 550 |
| `--z-cart-drawer-overlay` | 600 |
| `--z-cart-drawer` | 700 |
| `--z-dialog-overlay` | 650 |
| `--z-dialog-content` | 660 |
| `--z-cmd-search-overlay` | 800 |
| `--z-cmd-search-content` | 810 |
