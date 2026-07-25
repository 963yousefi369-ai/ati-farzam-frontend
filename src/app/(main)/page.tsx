import { getSettings, getProducts, getBanners, getDjangoBlogs, djangoImageUrl, publicImageUrl } from '@/lib/api/django'
import { getCmsPage } from '@/lib/api/cms'
import SectionRenderer from '@/components/cms/SectionRenderer'
import { defaultHomeSections } from '@/lib/cms/homepage-defaults'

export const revalidate = 300

export const metadata = {
  title: 'آتی فرزام ایرانیان - خرید ردیاب GPS خودرو و ناوگان',
  description: 'خرید ردیاب GPS خودرو و ناوگان با بهترین قیمت و کیفیت از نمایندگی رسمی آتی فرزام ایرانیان',
}

async function fetchAllData() {
  const [cmsPageResult, bannersResult, settingsResult, productsResult, blogsResult] =
    await Promise.allSettled([
      getCmsPage('home'),
      getBanners(),
      getSettings(),
      getProducts({ page_size: 8 }),
      getDjangoBlogs(),
    ])

  const rawProducts = productsResult.status === 'fulfilled'
    ? (productsResult.value?.results ?? productsResult.value ?? [])
    : []

  const products = rawProducts.map((p: any) => ({
    ...p,
    price: p.effective_price ?? p.discount_price ?? p.price,
    compare_price: p.is_on_sale ? p.price : undefined,
    in_stock: p.stock > 0,
  }))

  const imageMap: Record<string, string> = {}
  for (const p of rawProducts) {
    if (p.image) imageMap[String(p.id)] = djangoImageUrl(p.image)
  }

  const banners = bannersResult.status === 'fulfilled' ? bannersResult.value : []
  const bannersWithImages = banners.map((b: any) => ({
    ...b,
    imageUrl: b.image ? publicImageUrl(b.image) : undefined,
    mobileImageUrl: b.image_mobile ? publicImageUrl(b.image_mobile) : undefined,
    foregroundImageUrl: b.foreground_image ? publicImageUrl(b.foreground_image) : undefined,
    foregroundImageUrlMobile: b.foreground_image_mobile ? publicImageUrl(b.foreground_image_mobile) : (b.foreground_image ? publicImageUrl(b.foreground_image) : undefined),
    cta_link: b.cta_link || b.link || b.link_url || undefined,
    cta_text: b.cta_text || b.button_text || undefined,
    cta2_link: b.cta2_link || undefined,
    // Pass through optional foreground positioning metadata
    foreground_position: b.foreground_position || undefined,
    foreground_scale_mobile: b.foreground_scale_mobile ?? undefined,
    foreground_scale_desktop: b.foreground_scale_desktop ?? undefined,
    foreground_offset_y_mobile: b.foreground_offset_y_mobile ?? undefined,
    foreground_offset_y_desktop: b.foreground_offset_y_desktop ?? undefined,
  }))

  return {
    cmsPage: cmsPageResult.status === 'fulfilled' ? cmsPageResult.value : null,
    fallbackData: {
      banners: bannersWithImages,
      settings: settingsResult.status === 'fulfilled' ? settingsResult.value : null,
      products,
      imageMap,
      blogs: blogsResult.status === 'fulfilled' ? (blogsResult.value ?? []) : [],
    },
  }
}

export default async function HomePage() {
  const { cmsPage, fallbackData } = await fetchAllData()
  const sections = cmsPage?.sections?.length ? cmsPage.sections : defaultHomeSections

  return (
    <div dir="rtl">
      <SectionRenderer sections={sections} fallbackData={fallbackData} />
    </div>
  )
}
