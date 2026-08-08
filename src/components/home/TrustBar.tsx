'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Headphones, CreditCard, Truck, Shield } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const TRUST_ITEMS = [
  { icon: Shield, label: 'گارانتی معتبر', sublabel: 'ضمانت اصالت و بازگشت کالا' },
  { icon: Headphones, label: 'پشتیبانی حرفه‌ای', sublabel: 'پاسخگویی سریع توسط کارشناس' },
  { icon: Truck, label: 'ارسال سریع', sublabel: 'تحویل در کوتاه‌ترین زمان' },
  { icon: CreditCard, label: 'پرداخت امن', sublabel: 'درگاه‌های امن بانکی' },
]

export default function TrustBar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative z-20 -mt-8 md:-mt-14">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-white/95 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.4)] backdrop-blur-xl md:rounded-3xl">
          {/* خط گرادیانی بالا — گره زدن کارت به هیروی تیره */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-primary via-accent to-primary"
          />

          {/*
            موبایل: ۲ ستون فشرده با چیدمان افقی (آیکون کنار متن) — ارتفاع نصف می‌شود
            دسکتاپ: ۴ ستون وست‌چین با جداکننده
          */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-4 md:grid-cols-4 md:gap-x-4 md:gap-y-8 md:p-8 md:divide-x md:divide-x-reverse md:divide-border-soft/60">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex cursor-default items-center gap-3 px-1 text-right md:flex-col md:items-center md:gap-3 md:px-3 md:text-center"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/12 to-accent/4 ring-1 ring-accent/12 transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 group-hover:shadow-[0_6px_18px_-6px_rgba(20,184,166,0.5)] md:h-14 md:w-14 md:rounded-2xl">
                  <item.icon className="h-5 w-5 text-accent-text md:h-6 md:w-6" strokeWidth={1.8} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="font-display text-[13px] font-bold leading-6 text-dark md:text-[15px]">
                    {item.label}
                  </p>
                  {/* زیرمتن روی موبایل حذف می‌شود — شلوغی بصری می‌ساخت */}
                  <p className="mt-1 hidden text-xs leading-[1.7] text-text-muted md:block">
                    {item.sublabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
