'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Zap, Bell, Phone, CheckCircle, ArrowRight } from 'lucide-react'

import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import PulsingDot from '@/components/tracking/PulsingDot'
import ImageSlider from '@/components/product/ImageSlider'
import QuantitySelector from '@/components/product/QuantitySelector'
import AddToCartButton from '@/components/product/AddToCartButton'
import GuaranteeStrip from '@/components/ui/GuaranteeStrip'
import TrustBadge from '@/components/ui/TrustBadge'
import ProductDetailTabs from './ProductDetailTabs'
import SimilarProducts from './SimilarProducts'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatPrice, cn } from '@/lib/utils'
import { MOCK_PRODUCT_DETAIL, MOCK_SIMILAR_PRODUCTS, MOCK_IMAGES } from '@/__mocks__/products'

interface ProductDetailClientProps {
  product: {
    id: string | number
    name: string
    slug: string
    price: number
    compare_price?: number
    effective_price?: number
    description?: string
    sku?: string
    in_stock?: boolean
    stock?: number
    weight?: number
    category_id?: number
    features?: string[]
    specifications?: Record<string, string>
    faqs?: Array<{ q: string; a: string }>
  }
  images: string[]
  similarProducts: any[]
}

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefers(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return prefers
}

export default function ProductDetailClient({
  product: rawProduct,
  images: rawImages,
  similarProducts: rawSimilarProducts,
}: ProductDetailClientProps) {
  const reducedMotion = usePrefersReducedMotion()
  const stickyBarRef = useRef<HTMLDivElement>(null)
  const [stickyHeight, setStickyHeight] = useState(80)

  // Mock fallback: only when prop is empty/missing
  const product = rawProduct?.name ? rawProduct : MOCK_PRODUCT_DETAIL
  const images = rawImages?.length > 0 ? rawImages : MOCK_IMAGES
  const similarProducts = rawSimilarProducts?.length > 0 ? rawSimilarProducts : MOCK_SIMILAR_PRODUCTS

  const [quantity, setQuantity] = useState(1)
  const [notifyPhone, setNotifyPhone] = useState('')
  const [notifySent, setNotifySent] = useState(false)

  const maxQty = product.stock ?? 99
  const isOutOfStock = product.in_stock === false || product.stock === 0
  const hasDiscount = product.compare_price != null && product.compare_price > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compare_price!) * 100)
    : 0
  const features: string[] = product.features ?? []
  const specs: Record<string, string> = product.specifications ?? {}
  const faqs = product.faqs ?? []

  // Measure sticky bar height for dynamic spacer
  useEffect(() => {
    if (!stickyBarRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setStickyHeight(entry.contentRect.height)
    })
    observer.observe(stickyBarRef.current)
    return () => observer.disconnect()
  }, [])

  const handleNotify = () => {
    if (!notifyPhone || !/^09[0-9]{9}$/.test(notifyPhone)) {
      toast.error('شماره موبایل معتبر وارد کنید')
      return
    }
    setNotifySent(true)
    toast.success('ثبت شد! به محض موجود شدن اطلاع‌رسانی می‌شوید')
  }

  // Floating back button — visible on mobile when scrolled past breadcrumb
  const [showBack, setShowBack] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowBack(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Floating mobile back button */}
      <AnimatePresence>
        {showBack && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            onClick={() => window.history.back()}
            aria-label="بازگشت"
            className="fixed left-4 top-[calc(var(--navbar-height)+0.75rem)] z-[200] flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-white/90 text-text-secondary shadow-md backdrop-blur-sm transition-colors hover:text-primary lg:hidden"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Shell padding was `px-4 py-6 lg:py-8` — no horizontal step at all, so
          content hugged the screen edge on tablets. */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-3">
          <BreadcrumbTrail dark={false} />
        </div>

        {/* Main grid: image + purchase info
            Gap was `gap-6 lg:gap-8`. The gallery and the buy box are two
            distinct regions; 24px let them read as one crowded block. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Image — 7 cols on md+ */}
          <div className="md:col-span-7">
            <ImageSlider images={images} productName={product.name} />
          </div>

          {/* Purchase card — 5 cols on md+ */}
          <div className="flex flex-col md:col-span-5">
            {/* Title had `mb-1` and the SKU under it had `mt-1 mb-4`, so the
                effective title-to-SKU gap was 8px of stacked margins. One
                owner per gap now. */}
            <h1 className="text-xl font-semibold leading-snug text-text-heading lg:text-2xl">
              {product.name}
            </h1>

            {product.sku && (
              <p className="mt-2 text-xs text-text-muted">کد: {product.sku}</p>
            )}

            {/* Price card */}
            <div className="mt-5 rounded-xl border border-border-soft bg-bg-soft p-5">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-semibold text-primary lg:text-3xl">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <Badge variant="destructive" className="border-discount/20 bg-discount px-2.5 py-0.5 text-xs font-semibold text-white">
                      {discountPercent}٪ تخفیف
                    </Badge>
                    <span className="text-sm text-text-muted line-through">
                      {formatPrice(product.compare_price!)}
                    </span>
                  </>
                )}
              </div>
              {hasDiscount && (
                <p className="flex items-center gap-1 text-xs font-medium text-accent">
                  <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {formatPrice(product.compare_price! - product.price)} صرفه‌جویی
                </p>
              )}
              <div className="mt-4 flex items-center gap-2">
                <PulsingDot color={isOutOfStock ? 'red' : 'green'} size={6} />
                <span className={cn('text-xs font-medium', isOutOfStock ? 'text-error' : 'text-accent')}>
                  {isOutOfStock ? 'ناموجود' : 'موجود در انبار'}
                </span>
              </div>
            </div>

            {/* Description — short */}
            {product.description && (
              <p className="mt-5 line-clamp-3 text-sm leading-7 text-text-body">
                {product.description}
              </p>
            )}

            {/* Guarantee strip — ABOVE the add-to-cart button per DESIGN.md.
                Left without a wrapper margin on purpose: this component owns
                its own spacing and adding one here would compound it. */}
            {!isOutOfStock && <GuaranteeStrip />}

            {/* Quantity + Add to cart */}
            {isOutOfStock ? (
              <div className="mt-5 rounded-xl border border-error/20 bg-error-light/40 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Bell className="h-4 w-4 shrink-0 text-error" aria-hidden="true" />
                  <h4 className="text-sm font-semibold text-error">فعلاً موجود نیست</h4>
                </div>
                <p className="mb-4 text-xs leading-6 text-error/80">
                  شماره موبایل خود را وارد کنید تا به محض موجود شدن اطلاع‌رسانی شوید.
                </p>
                <AnimatePresence mode="wait">
                  {notifySent ? (
                    <motion.div
                      key="sent"
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 rounded-lg border border-accent/20 bg-success-light p-3"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="text-xs font-medium text-accent">ثبت شد!</span>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="flex gap-2" dir="ltr">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                        <Input
                          type="tel"
                          value={notifyPhone}
                          onChange={(e) => setNotifyPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                          placeholder="09123456789"
                          aria-label="شماره موبایل برای اطلاع‌رسانی"
                          className="h-11 rounded-lg pl-10 text-left text-sm"
                          dir="ltr"
                        />
                      </div>
                      {/* `ml-1` on the icon is gone — Button's base style already
                          applies `gap-2`, so the two stacked and pushed the
                          label off-centre. */}
                      <Button
                        onClick={handleNotify}
                        className="h-11 min-w-[44px] rounded-lg bg-primary px-4 text-sm font-semibold text-white"
                      >
                        <Bell className="h-4 w-4" aria-hidden="true" />
                        اطلاع‌رسانی
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <div className="my-5 flex items-center gap-3">
                  <span className="text-sm font-medium text-text-muted">تعداد:</span>
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={maxQty}
                  />
                </div>
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  imageUrl={images[0]}
                  inStock={!isOutOfStock}
                />
              </>
            )}

            {/* Trust badges — payment trust marks. Previously sat flush against
                the add-to-cart button with zero separation. */}
            <div className="mt-6">
              <TrustBadge />
            </div>
          </div>
        </div>

        {/* Tabs and similar products had no separation from the block above —
            they inherited only whatever margin their own root happened to
            carry, which is why the page ran together below the buy box. */}
        <div className="mt-14 md:mt-20">
          <ProductDetailTabs
            product={product}
            features={features}
            specs={specs}
            faqs={faqs}
          />
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-14 md:mt-20">
            <SimilarProducts products={similarProducts} />
          </div>
        )}
      </div>

      {/* Sticky mobile bar */}
      {!isOutOfStock && (
        <div
          ref={stickyBarRef}
          className="fixed bottom-0 left-0 right-0 z-[200] border-t border-border-soft bg-white/95 p-3 backdrop-blur-sm lg:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          role="complementary"
          aria-label="افزودن به سبد خرید"
        >
          <div className="flex items-center gap-3">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={maxQty}
            />
            <div className="flex-1">
              <AddToCartButton
                product={product}
                quantity={quantity}
                imageUrl={images[0]}
                inStock={!isOutOfStock}
              />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic spacer — measured from sticky bar, not hardcoded */}
      {!isOutOfStock && <div className="lg:hidden" style={{ height: stickyHeight }} />}
    </div>
  )
}
