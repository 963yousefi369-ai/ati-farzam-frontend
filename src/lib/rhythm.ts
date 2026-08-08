/**
 * Shared vertical/horizontal rhythm for full-page routes.
 *
 * Why this file exists: every route had invented its own spacing scale. The
 * software page mixed `py-section-mobile md:py-section-desktop` with a
 * hand-rolled `py-16 md:py-24`; the products page used
 * `py-section-mobile ... lg:py-section-desktop` (note the different
 * breakpoint); the blog pages used the section utilities for a hero that only
 * holds a title. The result was that no two gaps on the site matched.
 *
 * These are plain Tailwind arbitrary-value strings, so they need no
 * tailwind.config.ts entry and no globals.css import. Drop this file in and
 * the classes work.
 *
 * Usage:
 *   import { SECTION_Y, SECTION_HEAD, SHELL, PAGE_X } from "@/lib/rhythm"
 *   <section className={`${SECTION_Y} bg-bg-soft`}>
 *     <div className={`${SHELL} ${PAGE_X}`}>…</div>
 *   </section>
 */

/**
 * Standard section padding. `clamp` scales smoothly with the viewport instead
 * of jumping at a single breakpoint, which is what made the old
 * mobile/desktop utility pair feel lumpy between 640px and 1024px.
 * 56px → 104px.
 */
export const SECTION_Y = "py-[clamp(3.5rem,7vw,6.5rem)]"

/** Half a section — for stacked blocks that belong to the same section. */
export const SECTION_Y_SM = "py-[clamp(2rem,4vw,3.5rem)]"

/** Top padding only. For the first section under a page hero. */
export const SECTION_PT = "pt-[clamp(3.5rem,7vw,6.5rem)]"

/** Bottom padding only. For the last section before the footer. */
export const SECTION_PB = "pb-[clamp(3.5rem,7vw,6.5rem)]"

/**
 * Page hero padding. Deliberately much smaller than SECTION_Y: a hero that
 * holds only a breadcrumb, an h1 and one line of copy does not need the same
 * 104px of air as a content section, which is why the blog hero looked like a
 * mostly-empty navy slab.
 */
export const HERO_Y = "pb-[clamp(2.5rem,5vw,4rem)] pt-6 md:pt-8"

/**
 * Gap between a section heading block and its content. `SectionTitle` only
 * ships `mb-6`, which is fine on mobile but far too tight under a
 * `lg:text-4xl` heading. Pass this as SectionTitle's `className` — `cn` uses
 * tailwind-merge, so it correctly replaces the built-in `mb-6`.
 */
export const SECTION_HEAD = "mb-10 md:mb-14"

/** Max page width. Matches the widest existing route shell. */
export const SHELL = "mx-auto w-full max-w-[1440px]"

/** Narrower shell for reading-width content. */
export const SHELL_NARROW = "mx-auto w-full max-w-5xl"

/**
 * Horizontal page padding. Was `px-6 lg:px-10` on blog and `px-4 sm:px-6
 * lg:px-10` on products, so the two routes did not line up at the same
 * viewport width. This is the products variant, which is the better one:
 * 16px on small phones is worth ~32px of extra content width.
 */
export const PAGE_X = "px-4 sm:px-6 lg:px-10"

/**
 * Gap between a main content column and its sidebar. Both blog routes used
 * `gap-5` (20px) between a 3-column article and its aside, which reads as a
 * layout bug rather than a choice.
 */
export const COL_GAP = "gap-8 lg:gap-10"

/** Card grid gap. */
export const GRID_GAP = "gap-4 sm:gap-5 lg:gap-6"

/**
 * Offset for elements that stick below the site navbar. A plain `top-0`
 * sticky element slides underneath the navbar, which is `z-[var(--z-navbar)]`
 * (300) and taller than 0.
 */
export const STICKY_UNDER_NAV = "top-[var(--navbar-height)]"
