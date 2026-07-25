'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { landingData } from '@/data/landing'
import { ProductPlaceholder, IconStar, IconCart, IconArrowLeft } from '@/components/svg'
import { formatPrice, cn } from '@/lib/utils'
import { useCartStore } from '@/lib/store/cart'
import { toast } from 'sonner'

interface ApiProduct {
  id: number
  name: string
  slug: string
  price: number | string
  discount_price?: number | string | null
  effective_price?: number | string
  image?: string | null
  stock?: number
  rating?: number
  review_count?: number
}

interface FeaturedProductsProps {
  apiProducts?: ApiProduct[]
  loading?: boolean
}

const EASE = [0.16, 1, 0.3, 1] as const

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border-soft overflow-hidden flex flex-col bg-white">
      <div className="h-48 sm:h-56 animate-shimmer rounded-t-2xl" />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="h-3 w-16 rounded-full animate-shimmer" />
        <div className="h-4 w-full rounded-full animate-shimmer" />
        <div className="h-4 w-2/3 rounded-full animate-shimmer" />
        <div className="flex-1" />
        <div className="h-6 w-28 rounded-full animate-shimmer" />
        <div className="h-11 w-full rounded-xl animate-shimmer" />
      </div>
    </div>
  )
}

export default function FeaturedProducts({ apiProducts, loading }: FeaturedProductsProps = {}) {
  const defaultProducts = landingData.products
  const addItem = useCartStore((s) => s.addItem)
  const prefersReducedMotion = useReducedMotion()

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[0, 1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)}
      </div>
    )
  }

  const products = apiProducts && apiProducts.length > 0
    ? apiProducts.map((p) => ({
        id: String(p.id),
        slug: p.slug,
        name: p.name,
        rating: p.rating ?? 0,
        reviewsCount: p.review_count ?? 0,
        price: Number(p.effective_price ?? p.discount_price ?? p.price),
        badge: null as string | null,
        featured: false,
        imageUrl: p.image ?? '',
      }))
    : defaultProducts

  const handleAdd = (product: typeof products[0]) => {
    addItem({
      product_id: Number(product.id),
      name: product.name,
      price: product.price,
      imageUrl: 'imageUrl' in product ? (product as any).imageUrl ?? '' : '',
      quantity: 1,
    }, 20)
    toast.success('به سبد خرید اضافه شد')
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, i) => {
        const isFeatured = product.featured
        const slug = 'slug' in product ? (product as any).slug : undefined
        const href = slug ? `/products/${slug}` : `/products/${product.id}`
        return (
          <motion.div
            key={product.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
          >
            <Link
              href={href}
              className={cn(
                'group relative bg-white border rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1',
                isFeatured ? 'border-primary/20 shadow-card' : 'border-border-soft hover:border-primary/15 shadow-card hover:shadow-hover'
              )}
            >
              {/* Hover accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image tile */}
              <div className="relative overflow-hidden h-48 sm:h-56 bg-[#F0F2F4]">
                {'imageUrl' in product && (product as any).imageUrl ? (
                  <Image
                    src={(product as any).imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <ProductPlaceholder className="w-full h-full p-6" />
                )}

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-gradient-to-l from-discount to-discount/80 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}

                {/* Featured indicator */}
                {isFeatured && (
                  <span className="absolute top-3 left-3 bg-gradient-to-l from-primary to-primary-dark text-white text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    ویژه
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconStar
                          key={star}
                          className={cn(
                            'w-3.5 h-3.5 transition-colors duration-200',
                            star <= product.rating ? 'text-warning' : 'text-border-base'
                          )}
                        />
                      ))}
                    </div>
                    {product.reviewsCount > 0 && (
                      <span className="text-xs text-text-muted">({product.reviewsCount.toLocaleString('fa-IR')})</span>
                    )}
                  </div>
                )}

                {/* Name */}
                <h3 className="font-semibold text-dark text-sm leading-snug line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Price */}
                <p className="text-primary font-semibold text-xl mb-4 tracking-tight">
                  {formatPrice(product.price)}
                </p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Add to cart button */}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(product) }}
                  className={cn(
                    'w-full text-sm font-semibold py-3 rounded-xl transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer',
                    isFeatured
                      ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-[0_8px_30px_rgba(59,90,128,0.25)]'
                      : 'border border-primary/15 text-primary hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_8px_30px_rgba(59,90,128,0.2)]'
                  )}
                  style={isFeatured ? { boxShadow: '0 4px 14px rgba(59,90,128,0.2)' } : undefined}
                >
                  <IconCart className="w-4 h-4" />
                  افزودن به سبد
                </button>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
