import type { CmsPageSection } from '@/lib/cms/types'

/**
 * Sections that are allowed to appear more than once on a page.
 * Everything else is de-duplicated by `section_type` (first occurrence wins).
 */
const REPEATABLE_SECTIONS = new Set<string>(['custom_html'])

export interface SectionDataAvailability {
  /** true when at least one product can be rendered (API or local fallback) */
  hasProducts: boolean
  /** true when at least one blog post can be rendered */
  hasBlogs: boolean
  /** true when at least one partner logo can be rendered */
  hasPartners: boolean
}

/**
 * Sections that must be hidden entirely when they have no data to show.
 * Rendering an "empty state" on a marketing homepage looks broken.
 */
const DATA_DRIVEN_SECTIONS: Record<string, keyof SectionDataAvailability> = {
  product_grid: 'hasProducts',
  blog_grid: 'hasBlogs',
  partners: 'hasPartners',
}

/**
 * Normalizes CMS-provided sections before rendering:
 *  1. drops inactive sections
 *  2. drops sections whose data source is empty (prevents "محصولی یافت نشد" on the homepage)
 *  3. de-duplicates repeated section types (fixes the duplicated About / SoftwareCTA blocks)
 *  4. sorts by `order`, falling back to array order for equal values
 */
export function normalizeSections(
  sections: CmsPageSection[] | null | undefined,
  availability: SectionDataAvailability,
): CmsPageSection[] {
  if (!sections?.length) return []

  const seen = new Set<string>()

  return sections
    .filter((section) => section.is_active !== false)
    .filter((section) => {
      const dataKey = DATA_DRIVEN_SECTIONS[section.section_type]
      return dataKey ? availability[dataKey] : true
    })
    .map((section, index) => ({ section, index }))
    .sort((a, b) => a.section.order - b.section.order || a.index - b.index)
    .map(({ section }) => section)
    .filter((section) => {
      if (REPEATABLE_SECTIONS.has(section.section_type)) return true
      if (seen.has(section.section_type)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[cms] duplicate section "${section.section_type}" was skipped`)
        }
        return false
      }
      seen.add(section.section_type)
      return true
    })
}
