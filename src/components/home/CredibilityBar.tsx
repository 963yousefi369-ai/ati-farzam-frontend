'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Headphones, MapPin, ShieldCheck } from 'lucide-react'

const ICONS = { clock: Clock, headphones: Headphones, map_pin: MapPin, shield_check: ShieldCheck }
type CredibilityIcon = keyof typeof ICONS

const ITEMS = [
  { icon: 'map_pin', label: 'نصب در شهرهای اصلی', desc: 'هماهنگی نصب حضوری یا ارسال راهنمای نصب' },
  { icon: 'headphones', label: 'پشتیبانی پاسخ‌گو', desc: 'راهنمای انتخاب، فعال‌سازی و پیگیری پس از خرید' },
  { icon: 'shield_check', label: 'ضمانت اصالت و سلامت', desc: 'تست دستگاه قبل از ارسال و ضمانت معتبر' },
  { icon: 'clock', label: 'فرآیند پس از فروش', desc: 'فعال‌سازی سیم‌کارت، آموزش پنل و پیگیری نصب' },
]

const EASE = [0.16, 1, 0.3, 1] as const

interface CredibilityItem {
  icon?: CredibilityIcon
  label?: string
  desc?: string
}

export default function CredibilityBar({ items }: { items?: CredibilityItem[] }) {
  const visibleItems: CredibilityItem[] = items?.length ? items : ITEMS as CredibilityItem[]
  const prefersReducedMotion = useReducedMotion()

  return (
    <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {visibleItems.map((item, i) => {
        const Icon = ICONS[(item.icon ?? 'shield_check') as CredibilityIcon] ?? ShieldCheck
        return (
          <motion.li
            key={`${item.label}-${item.desc}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            className="group relative flex items-start gap-4 p-5 lg:p-6 rounded-2xl bg-white border border-border-soft overflow-hidden cursor-default transition-all duration-300 hover:border-accent/20 hover:-translate-y-0.5 shadow-card hover:shadow-hover hover-glow"
          >
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon container */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:from-accent/15 group-hover:to-accent/8" aria-hidden="true">
              <Icon className="w-5 h-5 text-accent transition-all duration-300 group-hover:text-accent-dark" strokeWidth={1.75} />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <span className="text-sm font-semibold text-text-heading leading-snug block">
                {item.label ?? 'اعتماد مشتریان'}
              </span>
              <span className="text-xs text-text-muted leading-[1.7] mt-1.5 block">
                {item.desc ?? 'خدمات تخصصی فروش و پشتیبانی'}
              </span>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}
