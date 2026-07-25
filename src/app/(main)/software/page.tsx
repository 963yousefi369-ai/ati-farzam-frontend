import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getSettings, getSoftwarePage, djangoImageUrl } from '@/lib/api/django'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import SectionTitle from '@/components/shared/SectionTitle'
import ScrollReveal from '@/components/shared/ScrollReveal'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import SoftwareFAQ from '@/components/software/SoftwareFAQ'
import { Button } from '@/components/ui/button'
import DashboardMockup from '@/components/svg/DashboardMockup'
import {
  Monitor, Smartphone, Bell, BarChart3, Zap,
  Clock, Rocket, Headphones, Cloud, MapPin, FileText,
  Download, Wifi, Battery, Shield, Users, Activity, Headset,
  Quote, Star, MessageSquare,
} from 'lucide-react'

const ICON_MAP: Record<string, typeof MapPin> = {
  MapPin, BarChart3, Bell, FileText, Monitor, Smartphone, Zap,
  Clock, Rocket, Headphones, Cloud, Shield, Users, Activity,
}

export const metadata: Metadata = {
  title: 'نرم‌افزار مای فرزام | مدیریت ناوگان',
  description: 'سامانه آنلاین مدیریت ناوگان و ردیابی خودرو — مشاهده موقعیت لحظه‌ای، گزارش‌گیری و هشدار',
  openGraph: {
    title: 'نرم‌افزار مای فرزام | مدیریت ناوگان',
    description: 'سامانه آنلاین مدیریت ناوگان و ردیابی خودرو',
    locale: 'fa_IR',
    type: 'website',
  },
}

export const revalidate = 604800

const FEATURES = [
  {
    icon: MapPin,
    title: 'ردیابی لحظه‌ای',
    desc: 'مشاهده موقعیت دقیق خودروها روی نقشه با به‌روزرسانی هر ۱۰ ثانیه.',
    accent: 'bg-accent/10 text-accent',
    span: 'md:col-span-2',
  },
  {
    icon: BarChart3,
    title: 'گزارش‌گیری پیشرفته',
    desc: 'تحلیل مسیر، مصرف سوخت، کیلومتر کارکرد و گزارش‌های جامع ناوگان.',
    accent: 'bg-primary/10 text-primary',
    span: '',
  },
  {
    icon: Bell,
    title: 'هشدارهای فوری',
    desc: 'دریافت هشدار سرعت، خروج از محدوده، خاموش و روشن شدن خودرو.',
    accent: 'bg-warning/10 text-warning',
    span: '',
  },
  {
    icon: FileText,
    title: 'مدیریت اسناد',
    desc: 'ثبت بیمه‌نامه، معاینه فنی و سرویس‌های دوره‌ای با یادآوری خودکار.',
    accent: 'bg-error/10 text-error',
    span: 'md:col-span-2',
  },
]

export default async function SoftwarePage() {
  let settings: any = null
  let swPage: any = null
  try { settings = await getSettings() } catch {}
  try { swPage = await getSoftwarePage() } catch {}

  const loginUrl: string = swPage?.login_url || settings?.software_login_url || '#'
  const heroImage: string | null = swPage?.hero_image || null
  const softwareImage = swPage?.dashboard_image || (settings?.software_image ? djangoImageUrl(settings.software_image) : null)
  const softwareDesc: string = swPage?.dashboard_description || settings?.software_description || ''
  const mobileImage: string | null = swPage?.mobile_image || null

  // Merge API features with hardcoded fallback
  const apiFeatures: any[] = swPage?.features ?? []
  const features = FEATURES.map((fallback, i) => {
    const api = apiFeatures[i]
    return {
      icon: (api?.icon && ICON_MAP[api.icon]) || fallback.icon,
      title: api?.title || fallback.title,
      desc: api?.desc || fallback.desc,
      accent: fallback.accent,
      span: fallback.span,
      image: api?.image || null,
    }
  })

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'نرم‌افزار مای فرزام',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, Android, iOS',
            description: 'سامانه آنلاین مدیریت ناوگان و ردیابی خودرو',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'IRR',
              description: 'دمو رایگان',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '150',
            },
          }),
        }}
      />
      {/* Hero */}
      <section className="text-white pt-8 pb-16 md:pt-10 md:pb-24 relative overflow-hidden bg-dark">
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Soft radial glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/[0.06] rounded-full blur-2xl" />
          {/* Radar grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Concentric radar rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px]">
            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-[15%] rounded-full border border-white/[0.04]" />
            <div className="absolute inset-[30%] rounded-full border border-white/[0.03]" />
            <div className="absolute inset-[45%] rounded-full border border-accent/[0.08]" />
            {/* Radar sweep */}
            <div className="absolute inset-[45%] rounded-full overflow-hidden">
              <div className="software-hero-radar-sweep absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left bg-gradient-to-tl from-accent/10 to-transparent" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <BreadcrumbTrail />

          {/* Badge */}
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mt-6 mb-5 border border-white/[0.06]">
              <Zap className="w-4 h-4 text-accent" aria-hidden="true" />
              <span className="text-white/90">سامانه مدیریت هوشمند ناوگان</span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={0.08}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-[1.15] tracking-normal">
              <span className="block text-white/95">نرم‌افزار مای فرزام</span>

            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.16}>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              مدیریت هوشمند ناوگان خودرویی با امکانات پیشرفته ردیابی، گزارش‌گیری و هشدار آنی
            </p>
          </ScrollReveal>

          {/* CTA buttons */}
          <ScrollReveal delay={0.24}>
            <div className="flex gap-3 justify-center flex-wrap mb-10">
              <Button size="lg" asChild className="px-8 pill bg-accent hover:bg-accent-dark text-white shadow-teal hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <Link href={loginUrl} target="_blank" rel="noopener noreferrer">
                  <Monitor className="w-5 h-5 ml-2" /> ورود به سامانه
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/[0.08] hover:border-white/30 pill backdrop-blur-sm transition-all duration-200">
                <Link href="/contact">
                  <Smartphone className="w-5 h-5 ml-2" /> درخواست دمو رایگان
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Trust strip */}
          <ScrollReveal delay={0.32}>
            <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent/60" />
                <span>بیش از <span className="text-white/80 font-semibold">۱۰,۰۰۰</span> خودرو</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden md:block" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent/60" />
                <span><span className="text-white/80 font-semibold" dir="ltr" style={{ unicodeBidi: 'isolate' }}>+۱۰۰</span> شرکت فعال</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden md:block" />
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent/60" />
                <span><span className="text-white/80 font-semibold">۹۹.۹٪</span> آپتایم</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Dashboard preview — clean image only */}
          <ScrollReveal delay={0.4} className="mt-12 md:mt-16">
            <div className="max-w-3xl mx-auto">
              {heroImage ? (
                <div className="relative w-full aspect-[560/380]">
                  <Image
                    src={heroImage}
                    alt="نرم‌افزار مای فرزام"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 768px"
                    loading="eager"
                  />
                </div>
              ) : (
                <DashboardMockup className="w-full h-auto drop-shadow-2xl" />
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative -mt-1 z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-elevated border border-border-soft p-6 md:p-8 hover-glow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: 10000, suffix: '+', label: 'خودروی تحت پوشش', icon: MapPin, color: 'text-accent' },
                { value: 500, suffix: '+', label: 'شرکت فعال', icon: Users, color: 'text-primary' },
                { value: 99.9, suffix: '%', label: 'آپتایم سامانه', icon: Activity, color: 'text-accent' },
                { value: 24, suffix: '/۷', label: 'پشتیبانی فنی', icon: Headset, color: 'text-primary' },
              ].map(({ value, suffix, label, icon: Icon, color }, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className={`w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-text-heading mb-1">
                      <AnimatedCounter value={value} suffix={suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-text-muted">{label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features — bento-style asymmetric grid */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="امکانات سامانه" subtitle="تمام ابزارهای لازم برای مدیریت حرفه‌ای ناوگان" centered />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc, accent, span, image }, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`rounded-2xl border border-border-soft bg-white p-5 md:p-6 flex flex-col gap-4 card-hover hover-glow h-full ${span}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110 overflow-hidden`}>
                      {image ? (
                        <Image src={image} alt={title} width={48} height={48} className="w-full h-full object-contain p-1.5" loading="lazy" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-heading text-base mb-1.5">{title}</h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard — real image or SVG mockup fallback */}
      <section className="py-section-mobile md:py-section-desktop bg-muted relative overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-dotted-grid opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionTitle title="داشبورد مدیریت ناوگان" subtitle="مشاهده لحظه‌ای موقعیت، مسیر و وضعیت خودروها" centered />
          <ScrollReveal>
            <div className="max-w-4xl mx-auto relative">
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-accent/[0.04] rounded-3xl blur-2xl" aria-hidden="true" />
              {softwareImage ? (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border-base shadow-elevated hover-lift">
                  <Image src={softwareImage} alt="نرم‌افزار مای فرزام" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 80vw" loading="lazy" />
                </div>
              ) : (
                <div className="relative aspect-[560/380] rounded-2xl overflow-hidden border border-border-base shadow-elevated bg-navy-deeper p-4 md:p-6 hover-lift">
                  <DashboardMockup className="w-full h-full" />
                </div>
              )}
              {/* Floating metric badge — top-left */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white rounded-xl shadow-elevated p-3 flex items-center gap-2.5 animate-float border border-border-soft z-10">
                <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
                  <Activity className="w-4 h-4 text-accent" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-text-muted leading-none">آپتایم</div>
                  <div className="text-sm font-bold text-accent leading-tight">۹۹.۹٪</div>
                </div>
              </div>
              {/* Floating metric badge — bottom-left */}
              <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-white rounded-xl shadow-elevated p-3 flex items-center gap-2.5 animate-float border border-border-soft z-10" style={{ animationDelay: '1.5s' }}>
                <div className="w-8 h-8 rounded-lg bg-info-light flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-text-muted leading-none">گزارش‌ها</div>
                  <div className="text-sm font-bold text-primary leading-tight">+۱۲۰</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          {softwareDesc && <p className="text-center text-[#6B7280] mt-6 max-w-2xl mx-auto leading-8">{softwareDesc}</p>}
        </div>
      </section>

      {/* Mobile App */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Phone mockup */}
            <ScrollReveal className="shrink-0">
              {mobileImage ? (
                <div className="relative w-[260px] h-[520px]">
                  <Image src={mobileImage} alt="اپلیکیشن موبایل مای فرزام" fill className="object-contain drop-shadow-2xl" sizes="260px" loading="lazy" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-16 bg-accent/10 rounded-full blur-3xl" />
                </div>
              ) : (
                <div className="relative w-[220px] h-[440px]">
                  {/* Phone shadow layers */}
                  <div className="absolute inset-0 rounded-[36px] bg-primary/5 translate-x-2 translate-y-2 blur-md" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-[36px] bg-primary/3 translate-x-1 translate-y-1 blur-sm" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-[36px] bg-navy-deeper border-[3px] border-primary/15 shadow-elevated overflow-hidden">
                    <div className="h-10 bg-dark flex items-center justify-between px-6 pt-2">
                      <span className="text-[10px] text-white/50">۱۲:۳۰</span>
                      <div className="flex gap-1.5">
                        <Wifi className="w-3 h-3 text-white/40" />
                        <Battery className="w-3 h-3 text-white/40" />
                      </div>
                    </div>
                    <div className="px-4 pt-3 pb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <span className="text-[11px] text-white/70 font-medium">مای فرزام</span>
                      </div>
                      <div className="w-full h-[160px] rounded-xl bg-dark/80 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                          {[40, 80, 120, 160].map((y) => (
                            <div key={y} className="absolute w-full h-px bg-white/20" style={{ top: y }} />
                          ))}
                          {[40, 80, 120].map((x) => (
                            <div key={x} className="absolute h-full w-px bg-white/20" style={{ left: x }} />
                          ))}
                        </div>
                        <path d="M30 130 Q60 90 90 100 T150 60" stroke="#0e7490" strokeWidth="2" fill="none" className="opacity-80" />
                        {[{ x: 30, y: 130 }, { x: 90, y: 100 }, { x: 150, y: 60 }].map((p, i) => (
                          <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-accent" style={{ left: p.x - 5, top: p.y - 5 }}>
                            <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="px-4 space-y-2 mt-1">
                      <div className="bg-white/5 rounded-lg p-2.5 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <div>
                          <div className="text-[9px] text-white/40">وضعیت</div>
                          <div className="text-[11px] text-white/80 font-medium">فعال — ۳ خودرو</div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-warning/15 flex items-center justify-center">
                          <Bell className="w-3.5 h-3.5 text-warning" />
                        </div>
                        <div>
                          <div className="text-[9px] text-white/40">هشدارها</div>
                          <div className="text-[11px] text-white/80 font-medium">۲ هشدار جدید</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-dark/90 border-t border-white/5 flex items-center justify-around px-4">
                      {[MapPin, BarChart3, Bell, Smartphone].map((Icon, i) => (
                        <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-accent/15' : ''}`}>
                          <Icon className={`w-4 h-4 ${i === 0 ? 'text-accent' : 'text-white/30'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-12 bg-accent/10 rounded-full blur-2xl" />
                </div>
              )}
            </ScrollReveal>

            {/* Text content */}
            <div className="flex-1 text-center md:text-right">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-3 py-1 text-xs font-semibold text-accent mb-4">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>اپلیکیشن موبایل</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-text-heading mb-3 leading-tight">
                  مدیریت ناوگان در جیب شما
                </h2>
                <p className="text-[#6B7280] leading-relaxed mb-6 max-w-md mx-auto md:mx-0 md:mr-0">
                  با اپلیکیشن موبایل مای فرزام، ناوگان خود را از هر کجا مدیریت کنید. هشدارهای آنی، ردیابی لحظه‌ای و گزارش‌گیری مستقیم از گوشی.
                </p>
              </ScrollReveal>

              {/* Feature list with vertical connector */}
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-6 max-w-sm mx-auto md:mx-0 md:mr-0">
                  {[
                    { icon: Bell, text: 'هشدار آنی push', desc: 'لحظه‌ای' },
                    { icon: MapPin, text: 'ردیابی آفلاین', desc: 'بدون اینترنت' },
                    { icon: Wifi, text: 'همگام‌سازی خودکار', desc: 'real-time' },
                    { icon: Battery, text: 'مصرف بهینه باتری', desc: 'کم‌مصرف' },
                  ].map(({ icon: Icon, text, desc }, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-9 h-9 rounded-lg bg-accent/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-text-heading text-sm">{text}</div>
                        <div className="text-xs text-text-muted mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                  <Button size="lg" asChild className="bg-dark hover:bg-dark-deeper text-white font-semibold px-6 pill gap-2 hover:-translate-y-0.5 transition-all duration-200">
                    <a href="#" aria-label="دانلود از گوگل پلی">
                      <Download className="w-5 h-5" />
                      <span className="text-xs leading-tight text-right">
                        <span className="block text-white/60">دانلود از</span>
                        <span className="block font-bold">Google Play</span>
                      </span>
                    </a>
                  </Button>
                  <Button size="lg" asChild className="bg-dark hover:bg-dark-deeper text-white font-semibold px-6 pill gap-2 hover:-translate-y-0.5 transition-all duration-200">
                    <a href="#" aria-label="دانلود از بازار">
                      <Download className="w-5 h-5" />
                      <span className="text-xs leading-tight text-right">
                        <span className="block text-white/60">دانلود از</span>
                        <span className="block font-bold">بازار</span>
                      </span>
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits — horizontal timeline cards (differentiated from Features grid) */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="مزایای استفاده از سامانه" subtitle="تجربه‌ای متفاوت از مدیریت ناوگان" centered />
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { icon: Rocket, title: 'راه‌اندازی سریع', desc: 'فعال‌سازی در کمتر از ۵ دقیقه بدون نیاز به دانش فنی.', accent: 'bg-accent/10 text-accent', num: '۰۱' },
              { icon: Cloud, title: 'بدون نصب', desc: 'دسترسی کامل از طریق مرورگر، بدون نرم‌افزار جانبی.', accent: 'bg-primary/10 text-primary', num: '۰۲' },
              { icon: Clock, title: 'به‌روزرسانی لحظه‌ای', desc: 'موقعیت خودروها با فاصله کمتر از ۱۰ ثانیه.', accent: 'bg-warning/10 text-warning', num: '۰۳' },
              { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده کمک.', accent: 'bg-error/10 text-error', num: '۰۴' },
            ].map(({ icon: Icon, title, desc, accent, num }, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group rounded-2xl border border-border-soft bg-white p-5 md:p-6 flex items-start gap-5 card-hover hover-glow accent-line-top relative overflow-hidden">
                  {/* Step number */}
                  <div className="absolute top-4 left-4 text-xs font-bold text-text-muted/30 tabular-nums" aria-hidden="true">
                    {num}
                  </div>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-heading text-base mb-1.5">{title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
                  </div>
                  {/* Arrow indicator */}
                  <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-bg-muted text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 self-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180" aria-hidden="true">
                      <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section-mobile md:py-section-desktop bg-muted relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/[0.03] rounded-full blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionTitle
            title="نظرات مشتریان"
            subtitle="ببینید مشتریان ما درباره مای فرزام چه می‌گویند"
            centered
          />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'احمد محمدی',
                role: 'مدیر ناوگان، شرکت حمل‌ونقل پیشرو',
                text: 'با استفاده از سیستم ردیابی مای فرزام، مصرف سوخت ناوگان ما ۲۵٪ کاهش پیدا کرد. پشتیبانی عالی و نرم‌افزار بسیار کاربردی.',
                rating: 5,
              },
              {
                name: 'سارا احمدی',
                role: 'مدیرعامل، تاکسی‌سرویس شهری',
                text: 'نرم‌افزار مدیریت ناوگانشون خیلی ساده و کاربردیه. آموزش تیممون فقط نیم ساعت طول کشید. پیشنهاد می‌کنم.',
                rating: 5,
              },
              {
                name: 'رضا کریمی',
                role: 'مدیر لجستیک، شرکت پخش سراسری',
                text: 'هشدارهای آنی سامانه باعث شد چندین سرقت خودرو رو به‌موقع متوقف کنیم. سرمایه‌گذاری روی امنیت ناوگان ارزشش رو داره.',
                rating: 4,
              },
            ].map(({ name, role, text, rating }, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border-soft p-6 h-full flex flex-col card-hover accent-line-top relative overflow-hidden">
                  {/* Quote icon */}
                  <div className="absolute top-4 left-4 text-accent/10" aria-hidden="true">
                    <Quote className="w-10 h-10" />
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? 'text-warning fill-warning' : 'text-border-soft fill-bg-muted'}`}
                      />
                    ))}
                  </div>
                  {/* Text */}
                  <p className="text-sm text-text-body leading-relaxed mb-5 flex-1">
                    "{text}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border-soft">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-text-heading text-sm">{name}</div>
                      <div className="text-xs text-text-muted">{role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="سوالات متداول"
            subtitle="پاسخ سوالات رایج درباره نرم‌افزار مای فرزام"
            centered
          />
          <ScrollReveal>
            <SoftwareFAQ />
          </ScrollReveal>
          {/* FAQ support link */}
          <ScrollReveal delay={0.1}>
            <div className="text-center mt-8">
              <p className="text-sm text-text-muted mb-3">پاسخ سوال خود را پیدا نکردید؟</p>
              <Button variant="outline" asChild className="border-primary/20 text-primary hover:bg-primary/5 pill">
                <Link href="/contact">
                  <MessageSquare className="w-4 h-4 ml-2" /> تماس با پشتیبانی
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-mobile md:py-section-desktop bg-muted relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            {/* Gradient-bordered card */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-bl from-accent/30 via-primary/10 to-accent/30">
              <div className="bg-white rounded-[15px] p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-5">
                  <Monitor className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-text-heading mb-3">آماده شروع هستید؟</h2>
                <p className="text-text-body mb-2 max-w-md mx-auto leading-relaxed">همین حالا وارد سامانه شوید و ناوگان خود را هوشمند مدیریت کنید.</p>
                {/* Urgency badge */}
                <div className="inline-flex items-center gap-1.5 bg-accent/8 rounded-full px-3 py-1 text-xs text-accent font-medium mb-6">
                  <Zap className="w-3 h-3" />
                  <span>۱۴ روز رایگان امتحان کنید</span>
                </div>
                <div className="flex gap-3 justify-center flex-wrap mb-5">
                  <Button size="lg" asChild className="font-semibold px-8 pill bg-accent hover:bg-accent-dark text-white shadow-teal hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                    <Link href={loginUrl} target="_blank" rel="noopener noreferrer">
                      <Monitor className="w-5 h-5 ml-2" /> ورود به سامانه
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-primary/20 text-primary hover:bg-primary/5 pill transition-all duration-200">
                    <Link href="/contact">درخواست دمو</Link>
                  </Button>
                </div>
                {/* Trust line */}
                <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-accent/60" />
                    بدون نیاز به کارت اعتباری
                  </span>
                  <span className="w-px h-3 bg-border-soft" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent/60" />
                    فعال‌سازی آنی
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
