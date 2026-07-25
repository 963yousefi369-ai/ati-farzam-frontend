'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice, cn } from '@/lib/utils'
import { ShoppingCart, Heart, Star, Phone } from 'lucide-react'
import { useState, useRef } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { useShopStatus } from '@/lib/store/shop-status'
import { toast } from 'sonner'
import { fireAddToCartConfetti } from '@/lib/confetti'

interface ProductCardProps {
  product: {
    id: string | number
    name: string
    price: number
    compare_price?: number
    in_stock?: boolean
    stock?: number
    slug?: string
    rating?: number
    review_count?: number
  }
  imageUrl?: string
  variant?: 'grid' | 'featured'
  priority?: boolean
}

export default function ProductCard({ product, imageUrl, variant = 'grid', priority }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((s) => s.addItem)
  const { shopEnabled, supportPhone, maxOrderQuantity } = useShopStatus()

  const isOutOfStock = product.in_stock === false || product.stock === 0
  const hasDiscount = product.compare_price && product.compare_price > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compare_price!) * 100)
    : 0
  const rating = product.rating ?? 0
  const reviewCount = product.review_count ?? 0
  const hasRating = rating > 0

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!shopEnabled) return
    if (isOutOfStock) {
      toast.error('این محصول در حال حاضر موجود نیست')
      return
    }
    const ok = addItem({
      product_id: Number(product.id),
      name: product.name,
      price: product.price,
      imageUrl: imageUrl || '',
      quantity: 1,
    }, maxOrderQuantity)
    if (!ok) {
      toast.error(`حداکثر ${maxOrderQuantity} عدد محصول می‌توانید سفارش دهید`)
      return
    }
    fireAddToCartConfetti()
    toast.success('به سبد خرید اضافه شد')
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted(!wishlisted)
    toast.success(wishlisted ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد')
  }

  return (
    <Link href={`/products/${product.slug ?? product.id}`} className="group block">
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={cn(
          'card-modern bg-white border border-border-soft h-full hover-glow',
          isOutOfStock && 'opacity-80'
        )}
      >
        {/* Gradient accent line on hover */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        {/* Image */}
        <div className={cn(
          'relative overflow-hidden',
          variant === 'featured' ? 'h-72' : 'h-48 sm:h-60',
          'bg-[#F0F2F4]'
        )}>
          {!imgLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-bg-muted" />
          )}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className={cn(
                'object-contain p-5 transition-opacity duration-300',
                imgLoaded ? 'opacity-100' : 'opacity-0',
                isOutOfStock && 'grayscale-[30%]'
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
              fetchPriority={priority ? 'high' : 'auto'}
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-soft">
              <div className="text-center">
                <ShoppingCart className="w-10 h-10 text-border-base mx-auto mb-1" />
                <p className="text-[10px] text-text-muted">تصویر ندارد</p>
              </div>
            </div>
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10">
              <Badge className="bg-error-light text-error-text border border-error/20 text-xs font-semibold px-3 py-1 rounded-full">
                ناموجود
              </Badge>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
            {hasDiscount && (
              <Badge className="bg-accent-light text-accent-dark border border-accent/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {discountPercent}٪ تخفیف
              </Badge>
            )}
          </div>

          {/* Wishlist button — 44px touch target */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            className="absolute top-3 left-3 z-20 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center transition-all duration-200 text-text-muted hover:text-error hover:scale-110 active:scale-90"
          >
            <Heart className={cn('w-4 h-4', wishlisted && 'fill-error text-error')} />
          </button>
        </div>

        <CardContent className="p-4 space-y-2.5">
          {/* Rating */}
          {hasRating && (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'w-3 h-3',
                      star <= rating
                        ? 'text-warning fill-warning'
                        : 'text-border-soft fill-bg-muted'
                    )}
                  />
                ))}
              </div>
              {reviewCount > 0 && (
                <span className="text-xs text-text-muted">({reviewCount})</span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-text-heading text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-accent transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price + Add to cart */}
          <div className="flex flex-col gap-2.5 mt-1">
            <div className="flex items-center gap-1.5">
              <p className="text-primary font-semibold text-base">
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-text-muted text-xs line-through mr-1.5">
                  {formatPrice(product.compare_price!)}
                </p>
              )}
            </div>

            {/* Add to cart / shop disabled */}
            {!shopEnabled ? (
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/contact' }}
                className="w-full text-sm font-medium py-2.5 rounded-xl bg-primary text-white flex items-center justify-center gap-1.5 hover:bg-primary-dark transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                تماس با ما
              </a>
            ) : (
              <button
                onClick={handleQuickAdd}
                disabled={isOutOfStock}
                className={cn(
                  'w-full text-sm font-medium py-2.5 rounded-xl transition-all active:scale-[0.98] min-h-[44px]',
                  isOutOfStock
                    ? 'bg-bg-muted text-text-muted cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark text-white'
                )}
              >
                {isOutOfStock ? 'ناموجود' : 'افزودن به سبد'}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
