'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Phone, ShoppingCart, Star } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/lib/store/cart'
import { useShopStatus } from '@/lib/store/shop-status'
import { cn, formatPrice } from '@/lib/utils'

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
  const addItem = useCartStore((state) => state.addItem)
  const { shopEnabled, maxOrderQuantity } = useShopStatus()

  const productHref = `/products/${product.slug || product.id}`
  const isOutOfStock = product.in_stock === false || product.stock === 0
  const hasDiscount = Boolean(product.compare_price && product.compare_price > product.price)
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compare_price!) * 100) : 0
  const rating = product.rating || 0
  const reviewCount = product.review_count || 0

  const handleQuickAdd = () => {
    if (!shopEnabled) return
    if (isOutOfStock) {
      toast.error('این محصول در حال حاضر موجود نیست')
      return
    }

    const added = addItem({
      product_id: Number(product.id),
      name: product.name,
      price: product.price,
      imageUrl: imageUrl || '',
      quantity: 1,
    }, maxOrderQuantity)

    if (!added) {
      toast.error(`حداکثر ${maxOrderQuantity.toLocaleString('fa-IR')} عدد از این محصول قابل سفارش است`)
      return
    }

    toast.success('محصول به سبد خرید اضافه شد')
  }

  const toggleWishlist = () => {
    setWishlisted((current) => !current)
    toast.success(wishlisted ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد')
  }

  return (
    <Card className={cn('group h-full overflow-hidden rounded-2xl border border-border-soft bg-white shadow-card transition-[border-color,box-shadow] duration-200 hover:border-border-base hover:shadow-card-hover', isOutOfStock && 'opacity-80')}>
      <div className={cn('relative overflow-hidden bg-bg-soft', variant === 'featured' ? 'aspect-[5/4]' : 'aspect-[4/3]')}>
        <Link href={productHref} aria-label={`مشاهده ${product.name}`} className="absolute inset-0">
          {imageUrl ? (
            <>
              {!imgLoaded && <div className="absolute inset-0 animate-shimmer" />}
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                priority={priority}
                fetchPriority={priority ? 'high' : 'auto'}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={cn('object-contain p-5 transition-opacity duration-200', imgLoaded ? 'opacity-100' : 'opacity-0', isOutOfStock && 'grayscale-[35%]')}
                onLoad={() => setImgLoaded(true)}
              />
            </>
          ) : (
            <span className="flex h-full items-center justify-center text-text-muted">
              <span className="text-center"><ShoppingCart className="mx-auto h-8 w-8" /><span className="mt-2 block text-xs">تصویر محصول موجود نیست</span></span>
            </span>
          )}
        </Link>

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          {hasDiscount && <Badge className="rounded-lg bg-discount text-white">{discountPercent.toLocaleString('fa-IR')}٪ تخفیف</Badge>}
          {isOutOfStock && <Badge className="rounded-lg bg-error-light text-error-text">ناموجود</Badge>}
        </div>

        <button type="button" onClick={toggleWishlist} aria-pressed={wishlisted} aria-label={wishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'} className="absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-text-muted shadow-soft transition-colors hover:text-error">
          <Heart className={cn('h-4.5 w-4.5', wishlisted && 'fill-error text-error')} />
        </button>
      </div>

      <CardContent className="flex h-full flex-col p-4">
        {rating > 0 && (
          <div className="mb-2 flex items-center gap-1.5 text-xs text-text-muted">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-medium text-text-secondary">{rating.toLocaleString('fa-IR')}</span>
            {reviewCount > 0 && <span>از {reviewCount.toLocaleString('fa-IR')} نظر</span>}
          </div>
        )}

        <Link href={productHref} className="focus-visible:rounded-md">
          <h3 className="min-h-12 text-[15px] font-semibold leading-6 text-dark transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>

        <p className="mt-1 text-xs leading-5 text-text-muted">مشاهده مشخصات، سازگاری و شرایط نصب</p>

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <p className="text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
          {hasDiscount && <p className="text-xs text-text-muted line-through">{formatPrice(product.compare_price!)}</p>}
        </div>

        <div className="mt-auto pt-4">
          {!shopEnabled ? (
            <Link href="/contact" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
              <Phone className="h-4 w-4" />
              دریافت مشاوره
            </Link>
          ) : (
            <button type="button" onClick={handleQuickAdd} disabled={isOutOfStock} className={cn('min-h-11 w-full rounded-xl px-4 text-sm font-medium transition-colors', isOutOfStock ? 'cursor-not-allowed bg-bg-muted text-text-muted' : 'bg-primary text-white hover:bg-primary-dark')}>
              {isOutOfStock ? 'در حال حاضر ناموجود' : 'افزودن به سبد خرید'}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
