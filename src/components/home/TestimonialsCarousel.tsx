'use client'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const SwiperCarousel = dynamic(() => import('@/components/shared/SwiperCarousel'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" />,
})

interface Testimonial {
  id: string
  name: string
  role?: string
  text: string
  rating: number
  avatar?: string
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'محمد رضایی',
    role: 'مدیر ناوگان شرکت حمل‌ونقل پارس',
    text: 'با استفاده از سیستم ردیابی آتی فرزام، مصرف سوخت ناوگان ما ۲۵٪ کاهش پیدا کرد. پشتیبانی عالی و نرم‌افزار بسیار کاربردی.',
    rating: 5,
  },
  {
    id: '2',
    name: 'سارا احمدی',
    role: 'صاحب کسب‌وکار',
    text: 'ردیاب شخصی رو برای پدرم خریدم. خیالمون راحته که همیشه از موقعیتشون خبر داریم. کیفیت دستگاه عالیه.',
    rating: 5,
  },
  {
    id: '3',
    name: 'علی محمدی',
    role: 'مدیرعامل شرکت لجستیک',
    text: 'از سال ۹۸ با آتی فرزام کار می‌کنیم. بیش از ۵۰ دستگاه ردیاب نصب کردیم و کاملاً راضی هستیم. گزارش‌های لحظه‌ای بسیار دقیق هستند.',
    rating: 5,
  },
  {
    id: '4',
    name: 'نیلوفر کریمی',
    role: 'مدیر منابع انسانی',
    text: 'نرم‌افزار مدیریت ناوگانشون خیلی ساده و کاربردیه. آموزش تیممون فقط نیم ساعت طول کشید. پیشنهاد می‌کنم.',
    rating: 4,
  },
]

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS

  return (
    <SwiperCarousel
      slidesPerView={1}
      spaceBetween={24}
      pagination
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="!pb-8"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative bg-white rounded-2xl p-6 md:p-7 border border-border-soft h-full cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/20 shadow-card hover:shadow-hover hover-glow"
        >
          {/* Hover accent line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

          <div className="flex flex-col h-full">
            {/* Quote icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:from-accent/10 group-hover:to-accent/5">
              <Quote className="w-5 h-5 text-primary/25 group-hover:text-accent/40 transition-colors duration-300" strokeWidth={1.5} />
            </div>

            {/* Text */}
            <p className="text-[#6B7280] text-[15px] leading-[1.85] mb-6 flex-1">
              «{item.text}»
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-border-soft/60">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-text-heading text-sm">{item.name}</p>
                {item.role && (
                  <p className="text-text-muted text-xs mt-0.5">{item.role}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </SwiperCarousel>
  )
}
