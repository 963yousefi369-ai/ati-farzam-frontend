/**
 * Guards the hero against unusable CMS data.
 *
 * Real-world failure this fixes: the backend returned a banner whose title and
 * subtitle were both the literal string "آتی", so the most important element on
 * the site rendered as a single meaningless word with no call to action.
 *
 * Rule: a banner is only trustworthy if it has a real headline AND a real CTA.
 * Anything else falls back to the hand-written marketing copy.
 */

export interface HeroBannerLike {
  id: string
  title?: string | null
  subtitle?: string | null
  badge_text?: string | null
  cta_text?: string | null
  cta_link?: string | null
  cta2_text?: string | null
  cta2_link?: string | null
  imageUrl?: string
  mobileImageUrl?: string
  foregroundImageUrl?: string
  foregroundImageUrlMobile?: string
  [key: string]: unknown
}

/** Minimum number of visible characters for a headline to be considered real copy. */
const MIN_TITLE_LENGTH = 8

/** Titles that are obviously placeholders rather than marketing copy. */
const PLACEHOLDER_TITLES = new Set([
  'آتی',
  'آتی فرزام',
  'test',
  'تست',
  'بنر',
  'banner',
  'title',
  'عنوان',
])

const normalize = (value?: string | null) => (value ?? '').replace(/\s+/g, ' ').trim()

export function isUsableBanner(banner: HeroBannerLike | null | undefined): boolean {
  if (!banner) return false
  const title = normalize(banner.title)
  if (!title) return false
  if (PLACEHOLDER_TITLES.has(title.toLowerCase())) return false
  if (title.length < MIN_TITLE_LENGTH) return false
  return true
}

/**
 * Returns banners that are safe to render. Each surviving banner is guaranteed
 * to have a subtitle and a primary CTA, so the hero can never render as a bare
 * word floating in white space.
 */
export function sanitizeBanners<T extends HeroBannerLike>(
  banners: T[] | null | undefined,
  defaults: {
    subtitle: string
    ctaText: string
    ctaLink: string
    cta2Text: string
    cta2Link: string
  },
): T[] {
  if (!banners?.length) return []

  return banners.filter(isUsableBanner).map((banner) => ({
    ...banner,
    title: normalize(banner.title),
    subtitle: normalize(banner.subtitle) || defaults.subtitle,
    cta_text: normalize(banner.cta_text) || defaults.ctaText,
    cta_link: normalize(banner.cta_link) || defaults.ctaLink,
    cta2_text: normalize(banner.cta2_text) || defaults.cta2Text,
    cta2_link: normalize(banner.cta2_link) || defaults.cta2Link,
  }))
}

export const HERO_COPY_DEFAULTS = {
  subtitle: 'امنیت، آرامش و کنترل هوشمند ناوگان و خودرو با بهترین ردیاب‌های بازار ایران',
  ctaText: 'مشاهده محصولات',
  ctaLink: '/products',
  cta2Text: 'مشاوره رایگان',
  cta2Link: '/contact',
} as const
