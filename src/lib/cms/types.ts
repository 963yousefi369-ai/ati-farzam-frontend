export type CmsSectionType =
  | 'hero'
  | 'category_cards'
  | 'product_grid'
  | 'trust_strip'
  | 'stats'
  | 'partners'
  | 'about'
  | 'software_cta'
  | 'blog_grid'
  | 'testimonials'
  | 'newsletter'
  | 'custom_html'

export interface CmsPageSection<TContent = Record<string, unknown>> {
  section_type: CmsSectionType
  order: number
  is_active?: boolean
  content: TContent
}

export interface CmsPage {
  slug: string
  title: string
  sections: CmsPageSection[]
}

export interface CmsSiteSettings {
  contact_phone?: string
  support_phone?: string
  address?: string
  footer_text?: string
  email?: string
  instagram_url?: string
  telegram_url?: string
  social_links?: Record<string, string>
  [key: string]: unknown
}
