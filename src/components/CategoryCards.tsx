import Link from 'next/link'
import Image from 'next/image'
import { landingData } from '@/data/landing'

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

interface ApiCategory {
  id: number
  name: string
  slug: string
  icon?: string
  image?: string | null
}

interface CategoryCardsProps {
  apiCategories?: ApiCategory[]
}

export default function CategoryCards({ apiCategories }: CategoryCardsProps = {}) {
  const defaultCategories = landingData.categories
  const categories = apiCategories && apiCategories.length > 0
    ? apiCategories.map((c) => ({
        id: String(c.id),
        href: `/products?category=${c.id}`,
        label: c.name,
        desc: '',
        icon: c.icon ?? 'car',
        image: c.image ?? null,
      }))
    : defaultCategories.map((c) => ({ ...c, desc: '', image: null as string | null }))

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((cat) => {
        const imageSrc = CATEGORY_IMAGES[cat.icon] || CATEGORY_IMAGES.car
        return (
          <Link
            key={cat.id}
            href={cat.href}
            className="group flex flex-col h-[280px] lg:h-[320px] rounded-2xl bg-white border border-border-soft overflow-hidden hover:border-teal/30 hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 ease-out"
          >
            {/* Image area — 55% */}
            <div className="relative flex items-center justify-center h-[55%] px-6 pt-6 pb-3">
              <Image
                src={imageSrc}
                alt={cat.label}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Content area — 45% */}
            <div className="flex flex-col items-center text-center px-5 pb-5 gap-1">
              <p className="font-bold text-sm lg:text-base text-text-heading group-hover:text-teal transition-colors duration-300">
                {cat.label}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 mt-auto">
                مشاهده محصولات
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M7 2L11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
