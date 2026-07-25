import type { CmsPageSection } from '@/lib/cms/types'

export const defaultHomeSections: CmsPageSection[] = [
  { section_type: 'hero', order: 1, is_active: true, content: {} },
  { section_type: 'trust_strip', order: 2, is_active: true, content: {} },
  { section_type: 'stats', order: 3, is_active: true, content: {} },
  {
    section_type: 'category_cards',
    order: 4,
    is_active: true,
    content: {
      title: 'دسته‌بندی محصولات',
      subtitle: 'محصول مناسب خودتان را پیدا کنید',
    },
  },
  {
    section_type: 'product_grid',
    order: 5,
    is_active: true,
    content: {
      title: 'محصولات ویژه',
      subtitle: 'بهترین ردیاب‌های GPS با ضمانت اصالت و پشتیبانی تخصصی',
      cta_text: 'مشاهده همه',
      cta_link: '/products',
      limit: 8,
    },
  },
  { section_type: 'about', order: 6, is_active: true, content: {} },
  { section_type: 'software_cta', order: 7, is_active: true, content: {} },
  { section_type: 'testimonials', order: 8, is_active: true, content: {} },
  {
    section_type: 'blog_grid',
    order: 9,
    is_active: true,
    content: {
      title: 'آخرین مقالات',
      subtitle: 'آخرین اخبار و آموزش‌های دنیای ردیابی GPS',
      cta_text: 'مشاهده همه',
      cta_link: '/blog',
      limit: 3,
    },
  },
  { section_type: 'newsletter', order: 10, is_active: true, content: {} },
]
