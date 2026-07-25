'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const CATEGORY_IMAGES: Record<string, string> = {
  car: '/images/categories/car.webp',
  user: '/images/categories/personal.webp',
  users: '/images/categories/personal.webp',
  personal: '/images/categories/personal.webp',
  motorcycle: '/images/categories/motorcycle.webp',
  bike: '/images/categories/motorcycle.webp',
  truck: '/images/categories/truck.webp',
  fleet: '/images/categories/truck.webp',
}

const CATEGORIES = [
  { id: 'vehicle', href: '/products?cat=vehicle', label: 'ردیاب خودرو', desc: 'کنترل امنیت و موقعیت لحظه‌ای برای خودروهای سواری', icon: 'car', image_url: null },
  { id: 'personal', href: '/products?cat=personal', label: 'ردیاب شخصی', desc: 'موقعیت‌یابی امن، تماس سریع و آرامش خانواده', icon: 'user', image_url: null },
  { id: 'motorcycle', href: '/products?cat=motorcycle', label: 'ردیاب موتور', desc: 'نصب سبک و مخفی، هشدار جابه‌جایی و ردیابی سریع', icon: 'motorcycle', image_url: null },
  { id: 'fleet', href: '/products?cat=fleet', label: 'ردیاب ناوگان', desc: 'کنترل مسیر، توقف‌ها و گزارش عملکرد رانندگان', icon: 'truck', image_url: null },
]

const EASE = [0.16, 1, 0.3, 1] as const

interface CategoryItem {
  id?: string
  href?: string
  label?: string
  desc?: string
  icon?: string
  image_url?: string | null
}

export default function CategoryCards({ items }: { items?: CategoryItem[] }) {
  const categories: CategoryItem[] = items?.length ? items : CATEGORIES
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((cat, i) => {
        const href = cat.href ?? '/products'
        const label = cat.label ?? 'دسته‌بندی محصول'
        const desc = cat.desc ?? 'مشاهده محصولات مرتبط'
        const icon = cat.icon ?? 'car'
        const imageSrc = cat.image_url || CATEGORY_IMAGES[icon] || CATEGORY_IMAGES.car

        return (
          <motion.div
            key={cat.id ?? `${href}-${label}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          >
            <Link
              href={href}
              className="group relative flex flex-col h-[340px] rounded-2xl bg-white border border-border-soft overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent/20 hover:-translate-y-1 shadow-card hover:shadow-hover hover-glow"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top accent line on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image area — 55% */}
              <div className="relative flex items-center justify-center h-[55%] px-6 pt-6 pb-3 overflow-hidden">
                {/* Subtle radial glow behind image */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(20,184,166,0.06) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                <Image
                  src={imageSrc}
                  alt={label}
                  fill
                  className="object-contain p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content area — 45% */}
              <div className="relative flex flex-col items-center text-center px-5 pb-6 gap-2">
                <p className="font-semibold text-[15px] text-text-heading group-hover:text-accent transition-colors duration-300">
                  {label}
                </p>
                <p className="text-sm text-text-muted leading-[1.7] line-clamp-2">
                  {desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 mt-auto">
                  مشاهده محصولات
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M8 2L12 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 7H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
