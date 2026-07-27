import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import { Button } from '@/components/ui/button'
import type { CmsPageSection } from '@/lib/cms/types'
import HeroSlider from '@/components/home/HeroSlider'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/product/ProductCard'
import BlogCard from '@/components/blog/BlogCard'
import ScrollReveal from '@/components/shared/ScrollReveal'
import StaggerGrid, { StaggerItem } from '@/components/shared/StaggerGrid'
import CategoryCards from '@/components/home/CategoryCards'
import CredibilityBar from '@/components/home/CredibilityBar'
import AboutCompact from '@/components/home/AboutCompact'
import SoftwareCTA from '@/components/home/SoftwareCTA'
import Newsletter from '@/components/home/Newsletter'
import PartnersMarquee from '@/components/home/PartnersMarquee'
import StatsCounter from '@/components/home/StatsCounter'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'

interface SectionRendererProps {
  sections: CmsPageSection[]
  fallbackData: {
    banners: any[]
    products: any[]
    imageMap: Record<string, string>
    blogs: any[]
    settings: any
  }
}

const sectionClassByType: Record<string, string> = {
  trust_strip: 'py-7 lg:py-9 bg-bg-soft',
  stats: 'py-section-mobile md:py-section-desktop bg-white',
  partners: 'py-12 bg-bg-soft',
  category_cards: 'py-10 lg:py-14 bg-bg-soft',
  product_grid: 'py-section-mobile md:py-section-desktop bg-bg-soft',
  about: 'py-section-mobile md:py-section-desktop bg-white',
  software_cta: 'py-section-mobile md:py-section-desktop bg-bg-soft',
  testimonials: 'py-section-mobile md:py-section-desktop bg-white',
  blog_grid: 'py-section-mobile md:py-section-desktop bg-bg-soft',
  newsletter: 'py-section-mobile md:py-section-desktop bg-white',
  custom_html: 'py-section-mobile md:py-section-desktop bg-bg-soft',
}

function SectionShell({ type, children }: { type: string; children: React.ReactNode }) {
  if (type === 'hero') return <>{children}</>

  const baseClass = sectionClassByType[type] ?? 'py-section-mobile md:py-section-desktop bg-white'
  const isWhite = baseClass.includes('bg-white')
  const isSoft = baseClass.includes('bg-soft')
  // Mesh gradient only on white sections; hairline divider on soft sections
  const surfaceClass = isWhite ? `${baseClass} bg-mesh` : baseClass
  const dividerClass = isSoft ? 'border-y border-hairline/60' : ''

  return (
    <section className={`${surfaceClass} ${dividerClass} relative`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">{children}</div>
    </section>
  )
}

export default function SectionRenderer({ sections, fallbackData }: SectionRendererProps) {
  const activeSections = sections
    .filter((section) => section.is_active !== false)
    .sort((a, b) => a.order - b.order)

  return (
    <>
      {activeSections.map((section) => {
        const content = section.content ?? {}
        const key = `${section.section_type}-${section.order}`

        switch (section.section_type) {
          case 'hero':
            return (
              <SectionShell key={key} type="hero">
                <HeroSlider banners={(content as any).banners?.length ? (content as any).banners : fallbackData.banners} {...(content as any)} />
              </SectionShell>
            )

          case 'trust_strip':
            return (
              <SectionShell key={key} type="trust_strip">
                <ScrollReveal direction="up">
                  <CredibilityBar items={(content as any).items} />
                </ScrollReveal>
              </SectionShell>
            )

          case 'stats':
            return (
              <SectionShell key={key} type="stats">
                <StatsCounter stats={(content as any).stats} darkMode={(content as any).darkMode ?? false} />
              </SectionShell>
            )

          case 'partners':
            return (
              <SectionShell key={key} type="partners">
                <PartnersMarquee apiPartners={(content as any).partners} />
              </SectionShell>
            )

          case 'category_cards':
            return (
              <SectionShell key={key} type="category_cards">
                <ScrollReveal>
                  <SectionTitle
                    title={(content as any).title ?? 'دسته‌بندی محصولات'}
                    subtitle={(content as any).subtitle ?? 'محصول مناسب خودتان را پیدا کنید'}
                    className="mb-6"
                  />
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1}>
                  <CategoryCards items={(content as any).items} />
                </ScrollReveal>
              </SectionShell>
            )

          case 'product_grid':
            return (
              <SectionShell key={key} type="product_grid">
                <ScrollReveal direction="right">
                  <SectionTitle
                    title={(content as any).title ?? 'محصولات ویژه'}
                    subtitle={(content as any).subtitle ?? 'بهترین ردیاب‌های GPS با ضمانت اصالت و پشتیبانی تخصصی'}
                    className="mb-8"
                    action={
                      <Button asChild variant="outline" className="shrink-0 rounded-xl">
                        <Link href={(content as any).cta_link ?? '/products'}>{(content as any).cta_text ?? 'مشاهده همه'}</Link>
                      </Button>
                    }
                  />
                </ScrollReveal>
                {fallbackData.products.length > 0 ? (
                  <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
                    {fallbackData.products.slice(0, Number((content as any).limit ?? 8)).map((product: any, idx: number) => (
                      <StaggerItem key={product.id}>
                        <ProductCard product={product} imageUrl={fallbackData.imageMap[String(product.id)]} priority={idx < 4} />
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-text-muted text-lg mb-4">محصولی یافت نشد</p>
                    <Button asChild variant="outline" className="rounded-xl"><Link href="/contact">تماس با ما</Link></Button>
                  </div>
                )}
              </SectionShell>
            )

          case 'about':
            return (
              <SectionShell key={key} type="about">
                <ScrollReveal direction="left">
                  <AboutCompact
                    title={(content as any).title}
                    aboutText={(content as any).text ?? fallbackData.settings?.about_us}
                    aboutImage={(content as any).image_url ?? fallbackData.settings?.about_image}
                    ctaText={(content as any).cta_text}
                    ctaLink={(content as any).cta_link}
                  />
                </ScrollReveal>
              </SectionShell>
            )

          case 'software_cta':
            return (
              <SectionShell key={key} type="software_cta">
                <ScrollReveal>
                  <SoftwareCTA {...(content as any)} softwareImage={(content as any).image_url ?? fallbackData.settings?.software_image} />
                </ScrollReveal>
              </SectionShell>
            )

          case 'testimonials':
            return (
              <SectionShell key={key} type="testimonials">
                <ScrollReveal>
                  <SectionTitle
                    title={(content as any).title ?? 'نظرات مشتریان'}
                    subtitle={(content as any).subtitle ?? 'آنچه مشتریان ما درباره خدمات و محصولات آتی فرزام می‌گویند'}
                    className="mb-8"
                  />
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1}>
                  <TestimonialsCarousel testimonials={(content as any).testimonials} />
                </ScrollReveal>
              </SectionShell>
            )

          case 'blog_grid':
            if (fallbackData.blogs.length === 0) return null
            return (
              <SectionShell key={key} type="blog_grid">
                <ScrollReveal direction="up">
                  <SectionTitle
                    title={(content as any).title ?? 'آخرین مقالات'}
                    subtitle={(content as any).subtitle ?? 'آخرین اخبار و آموزش‌های دنیای ردیابی GPS'}
                    className="mb-8"
                    action={
                      <Button asChild variant="outline" className="shrink-0 rounded-xl">
                        <Link href={(content as any).cta_link ?? '/blog'}>{(content as any).cta_text ?? 'مشاهده همه'}</Link>
                      </Button>
                    }
                  />
                </ScrollReveal>
                <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
                  {fallbackData.blogs.slice(0, Number((content as any).limit ?? 3)).map((post: any) => (
                    <StaggerItem key={post.id}><BlogCard post={post} /></StaggerItem>
                  ))}
                </StaggerGrid>
              </SectionShell>
            )

          case 'newsletter':
            return (
              <SectionShell key={key} type="newsletter">
                <ScrollReveal direction="up" amount={0.3}>
                  <Newsletter {...(content as any)} />
                </ScrollReveal>
              </SectionShell>
            )

          case 'custom_html':
            return (
              <SectionShell key={key} type="custom_html">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String((content as any).html ?? '')) }} />
              </SectionShell>
            )

          default:
            return null
        }
      })}
    </>
  )
}
