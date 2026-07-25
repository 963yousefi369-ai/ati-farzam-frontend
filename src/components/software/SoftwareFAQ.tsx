'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'آیا نرم‌افزار نیاز به نصب دارد؟',
    answer: 'خیر، سامانه آتی فرزام کاملاً مبتنی بر وب است و از طریق هر مرورگری قابل دسترسی است. فقط کافیست وارد حساب کاربری خود شوید.',
  },
  {
    question: 'چقدر طول می‌کشد تا سامانه فعال شود؟',
    answer: 'فعال‌سازی سامانه کمتر از ۵ دقیقه زمان می‌برد. پس از ثبت‌نام و نصب ردیاب روی خودرو، بلافاصله می‌توانید از تمام امکانات استفاده کنید.',
  },
  {
    question: 'آیا اپلیکیشن موبایل هم دارید؟',
    answer: 'بله، اپلیکیشن موبایل آتی فرزام برای اندروید در دسترس است. با اپلیکیشن می‌توانید هشدارهای آنی دریافت کنید و ناوگان خود را از هر کجا مدیریت کنید.',
  },
  {
    question: 'امنیت داده‌ها چگونه تضمین می‌شود؟',
    answer: 'تمام داده‌ها با رمزگذاری SSL/TLC منتقل می‌شوند. سرورهای ما در دیتاسنترهای امن داخل کشور میزبانی می‌شوند و نسخه پشتیبان روزانه تهیه می‌شود.',
  },
  {
    question: 'آیا امکان مدیریت چند خودرو وجود دارد؟',
    answer: 'بله، با یک حساب کاربری می‌توانید تعداد نامحدودی خودرو را مدیریت کنید. داشبورد سامانه به شما امکان مشاهده همه خودروها در یک نگاه را می‌دهد.',
  },
  {
    question: 'هزینه استفاده از سامانه چقدر است؟',
    answer: 'ما ۱۴ روز استفاده رایگان ارائه می‌دهیم تا قبل از خرید، تمام امکانات را تست کنید. برای اطلاع از تعرفه‌ها با تیم فروش ما تماس بگیرید.',
  },
]

export default function SoftwareFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQ_DATA.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={cn(
              'rounded-2xl border bg-white overflow-hidden transition-all duration-200',
              isOpen ? 'border-accent/20 shadow-card' : 'border-border-soft hover:border-border-base'
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-right cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className={cn(
                'font-semibold text-base transition-colors duration-150',
                isOpen ? 'text-accent' : 'text-text-heading group-hover:text-primary'
              )}>
                {item.question}
              </span>
              <span className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
                isOpen ? 'bg-accent/10 text-accent rotate-180' : 'bg-bg-muted text-text-muted'
              )}>
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-text-body leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
