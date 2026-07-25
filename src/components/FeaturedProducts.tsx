'use client'
import Link from 'next/link'
import Image from 'next/image'
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

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-hairline overflow-hidden flex flex-col bg-white">
      <div className="h-48 sm:h-56 animate-shimmer" />
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="h-3 w-16 rounded-full animate-shimmer" />
        <div className="h-4 w-full rounded-full animate-shimmer" />
        <div className="h-4 w-2/3 rounded-full animate-shimmer" />
        <div className="flex-1" />
        <div className="h-5 w-24 rounded-full animate-shimmer" />
        <div className="h-10 w-full rounded-full animate-shimmer" />
      </div>
    </div>
  )
}

export default function FeaturedProducts({ apiProducts, loading }: FeaturedProductsProps = {}) {
  const defaultProducts = landingData.products
  const addItem = useCartStore((s) => s.addItem)

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[0, 1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)}
      </div>
    )
  }

  // Map API products to display shape, or fall back to hardcoded
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
      {products.map((product) => {
        const isFeatured = product.featured
        const slug = 'slug' in product ? (product as any).slug : undefined
        const href = slug ? `/products/${slug}` : `/products/${product.id}`
        return (
          <Link
            key={product.id}
            href={href}
            className={cn(
              'card-modern bg-white border rounded-2xl overflow-hidden flex flex-col group/card',
              isFeatured ? 'border-primary shadow-card-hover' : 'border-hairline'
            )}
          >
            {/* Image tile */}
            <div className="relative overflow-hidden h-48 sm:h-56 bg-gradient-to-b from-light-tint to-white">
              {'imageUrl' in product && (product as any).imageUrl ? (
                <Image
                  src={(product as any).imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-5"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <ProductPlaceholder className="w-full h-full p-6" />
              )}

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-3 right-3 bg-discount text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconStar
                        key={star}
                        className={cn(
                          'w-3.5 h-3.5',
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
              <h3 className="font-semibold text-dark text-sm leading-snug line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                {product.name}
              </h3>

              {/* Price */}
              <p className="text-primary font-bold text-base mb-4">
                {formatPrice(product.price)}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Add to cart button */}
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(product) }}
                className={cn(
                  'w-full text-sm font-medium py-2.5 rounded-full transition-all min-h-[44px] flex items-center justify-center gap-2 active:scale-[0.98]',
                  isFeatured
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'border border-primary/20 text-primary hover:bg-primary hover:text-white'
                )}
              >
                <IconCart className="w-4 h-4" />
                افزودن به سبد
              </button>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
