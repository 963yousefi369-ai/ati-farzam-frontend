'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Headphones, CreditCard, Truck, Shield } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: Headphones, label: 'پشتیبانی حرفه‌ای', sublabel: 'پشتیبانی سریع و پاسخگویی' },
  { icon: CreditCard, label: 'پرداخت امن', sublabel: 'درگاه‌های امن بانکی' },
  { icon: Truck, label: 'ارسال سریع', sublabel: 'تحویل در کوتاه‌ترین زمان' },
  { icon: Shield, label: 'گارانتی معتبر', sublabel: 'ضمانت اصالت و بازگشت کالا' },
]

export default function TrustBar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative -mt-10 z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(59,90,128,0.06)] border border-border-soft p-6 md:p-8 overflow-hidden">
          {/* Subtle top accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-accent/20 to-transparent" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:divide-x md:divide-x-reverse md:divide-border-soft/60">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-3 group cursor-default px-2"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(20,184,166,0.15)]">
                  <item.icon className="w-6 h-6 text-accent" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-text-heading text-sm md:text-[15px]">{item.label}</p>
                  <p className="text-text-muted text-xs mt-1 leading-5">{item.sublabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
