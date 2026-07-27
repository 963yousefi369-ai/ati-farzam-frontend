import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Headset, Radio, ShieldCheck, Trophy, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Banner {
  id: string
  title: string
  subtitle?: string
  imageUrl?: string
  mobileImageUrl?: string
  foregroundImageUrl?: string
  foregroundImageUrlMobile?: string
  cta_text?: string
  cta_link?: string
  cta2_text?: string
  cta2_link?: string
}

interface HeroSliderProps {
  banners?: Banner[]
}

const FALLBACK_BANNER: Banner = {
  id: 'default',
  title: 'کنترل خودرو، هر لحظه و هرجا',
  subtitle: 'ردیاب‌های GPS آتی فرزام برای امنیت خودرو و مدیریت دقیق ناوگان، با نصب تخصصی و پشتیبانی پاسخ‌گو.',
  cta_text: 'انتخاب ردیاب مناسب',
  cta_link: '/products',
  cta2_text: 'مشاوره خرید',
  cta2_link: '/contact',
}

const TRUST_ITEMS = [
  { icon: Users, value: '۵,۰۰۰+', label: 'مشتری فعال' },
  { icon: Radio, value: '۲۵,۰۰۰+', label: 'دستگاه نصب‌شده' },
  { icon: Trophy, value: '۱۲ سال', label: 'تجربه تخصصی' },
]

export default function HeroSlider({ banners }: HeroSliderProps) {
  const slide = banners?.find((banner) => banner.title) ?? FALLBACK_BANNER
  const backgroundImage = slide.imageUrl
  const foregroundImage = slide.foregroundImageUrl

  return (
    <section className="relative isolate overflow-hidden border-b border-border-soft bg-bg-soft">
      {backgroundImage && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
          />
          <Image
            src={slide.mobileImageUrl || backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
          />
        </div>
      )}

      {backgroundImage && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-white/95 via-white/88 to-white/45" />
      )}

      <div className="mx-auto grid min-h-[620px] max-w-[1280px] items-center gap-10 px-5 py-14 sm:px-6 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,.95fr)] md:px-8 md:py-20 lg:gap-16 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-accent-dark">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            پوشش سراسری و پشتیبانی تخصصی
          </p>

          <h1 className="max-w-[12ch] text-[clamp(2.35rem,6vw,4.75rem)] font-bold leading-[1.12] text-dark">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="mt-6 max-w-[58ch] text-base leading-8 text-text-secondary sm:text-lg">
              {slide.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="min-h-12 rounded-xl bg-primary px-7 text-base font-semibold text-white hover:bg-primary-dark">
              <Link href={slide.cta_link || '/products'}>
                {slide.cta_text || 'انتخاب ردیاب مناسب'}
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="min-h-12 rounded-xl border-border-base bg-white/80 px-6 text-base font-medium text-primary hover:bg-white">
              <Link href={slide.cta2_link || '/contact'}>{slide.cta2_text || 'مشاوره خرید'}</Link>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 border-t border-border-soft pt-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex min-w-[132px] items-center gap-3">
                <item.icon className="h-5 w-5 shrink-0 text-accent-dark" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-dark">{item.value}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent-dark" /> گارانتی معتبر</span>
            <span className="flex items-center gap-1.5"><Headset className="h-4 w-4 text-accent-dark" /> پشتیبانی پس از خرید</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          {foregroundImage ? (
            <Image
              src={slide.foregroundImageUrlMobile || foregroundImage}
              alt={slide.title}
              width={760}
              height={760}
              priority
              className="h-auto max-h-[440px] w-full object-contain md:max-h-[560px]"
              sizes="(max-width: 768px) 90vw, 44vw"
            />
          ) : (
            <div className="relative aspect-square overflow-hidden rounded-[28px] border border-border-soft bg-white shadow-card">
              <div className="absolute inset-[14%] rounded-full border border-accent/20" />
              <div className="absolute inset-[27%] rounded-full border border-accent/20" />
              <div className="absolute inset-[40%] rounded-full border border-accent/25" />
              <div className="absolute left-[29%] top-[34%] h-3 w-3 rounded-full bg-accent" />
              <div className="absolute bottom-[30%] right-[35%] h-2.5 w-2.5 rounded-full bg-primary" />
              <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-border-soft bg-white p-4">
                <p className="text-xs text-text-muted">وضعیت ردیاب</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-dark">خودرو آنلاین است</span>
                  <span className="rounded-full bg-success-light px-2.5 py-1 text-xs font-medium text-accent-dark">متصل</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
