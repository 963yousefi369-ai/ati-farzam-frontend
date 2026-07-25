import type { Metadata } from 'next'
import Image from 'next/image'
import { getPage, getSettings, djangoImageUrl } from '@/lib/api/django'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import SectionTitle from '@/components/shared/SectionTitle'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { Award, Users, MapPin, Clock, Shield, Headphones, Wrench, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'درباره ما | آتی فرزام ایرانیان',
  description: 'آتی فرزام ایرانیان — پیشگام در ارائه راهکارهای هوشمند ردیابی و مدیریت ناوگان',
}

export const revalidate = 604800

const DEFAULT_STATS = [
  { icon: Users, label: 'مشتری فعال', value: 5000, suffix: '+' },
  { icon: MapPin, label: 'دستگاه نصب‌شده', value: 25000, suffix: '+' },
  { icon: Clock, label: 'سال تجربه', value: 12, suffix: '' },
  { icon: Award, label: 'شهر تحت پوشش', value: 31, suffix: '' },
]

const WHY_US = [
  { icon: Shield, title: 'ضمانت کیفیت', desc: 'تمام محصولات با گارانتی معتبر و استانداردهای بین‌المللی عرضه می‌شوند.' },
  { icon: Headphones, title: 'پشتیبانی ۲۴ ساعته', desc: 'تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده کمک به شماست.' },
  { icon: Wrench, title: 'نصب حرفه‌ای', desc: 'نصب و راه‌اندازی توسط تکنسین‌های مجرب در سراسر کشور.' },
  { icon: Target, title: 'دقت بالا', desc: 'ردیابی با دقت بالا و به‌روزرسانی لحظه‌ای موقعیت خودرو.' },
]

export default async function AboutPage() {
  let pageData: any = null
  let settings: any = null
  try { pageData = await getPage('about') } catch {}
  try { settings = await getSettings() } catch {}
  const aboutImage = settings?.about_image ? djangoImageUrl(settings.about_image) : null

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://farzamgps.ir' },
              { '@type': 'ListItem', position: 2, name: 'درباره ما', item: 'https://farzamgps.ir/about' },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="text-white py-section-mobile md:py-section-desktop relative overflow-hidden bg-dark">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <BreadcrumbTrail />
          <h1 className="text-4xl md:text-5xl font-semibold mt-4 mb-3">درباره ما</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">آتی فرزام ایرانیان — پیشگام در راهکارهای هوشمند مدیریت ناوگان</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <SectionTitle title="شرکت آتی فرزام ایرانیان" />
              {pageData?.content ? (
                <div
                  className="prose prose-lg max-w-[75ch] text-[#6B7280] leading-8 prose-headings:text-text-heading prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: pageData.content }}
                />
              ) : (
                <div className="text-[#6B7280] leading-8 space-y-4 max-w-[75ch]">
                  <p>شرکت آتی فرزام ایرانیان با بیش از یک دهه سابقه در حوزه ردیابی خودرو و مدیریت هوشمند ناوگان، یکی از پیشروان این صنعت در ایران است. ما با ارائه راهکارهای یکپارچه سخت‌افزاری و نرم‌افزاری، به کسب‌وکارها کمک می‌کنیم تا ناوگان خود را با دقت و کارایی بالاتری مدیریت کنند.</p>
                  <p>تیم متخصص ما متشکل از مهندسان و کارشناسان با تجربه است که با تکنولوژی‌های روز دنیا آشنا هستند و همواره در حال بهبود محصولات و خدمات شرکت می‌باشند.</p>
                </div>
              )}
            </div>
            <div className="relative">
              {aboutImage ? (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-hairline shadow-card">
                  <Image src={aboutImage} alt="درباره آتی فرزام ایرانیان" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-text-muted font-medium">آتی فرزام ایرانیان</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-section-mobile md:py-section-desktop bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text-heading mb-3">آمار و ارقام</h2>
            <div className="section-underline" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DEFAULT_STATS.map(({ icon: Icon, label, value, suffix }, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center bg-white rounded-2xl border border-hairline p-4 shadow-card hover-glow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-semibold text-primary mb-1">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </div>
                  <p className="text-text-muted text-sm font-medium">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="چرا ما را انتخاب کنید؟" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {WHY_US.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-xl border border-soft bg-white p-4 flex gap-3 hover:shadow-card-hover transition-all duration-200 hover-glow">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-heading mb-1">{title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
