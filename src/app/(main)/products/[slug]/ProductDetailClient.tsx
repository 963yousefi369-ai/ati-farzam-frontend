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
import ReviewSummary from '@/components/ui/ReviewSummary'
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
    rating?: number
    review_count?: number
    category_id?: number
    features?: string[]
    specifications?: Record<string, string>
    faqs?: Array<{ q: string; a: string }>
    reviews?: any[]
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
            className="fixed top-4 left-4 z-[200] lg:hidden w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-border-soft shadow-md flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-3">
          <BreadcrumbTrail dark={false} />
        </div>

        {/* Main grid: image + purchase info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

          {/* Image — 7 cols on md+ */}
          <div className="md:col-span-7">
            <ImageSlider images={images} productName={product.name} />
          </div>

          {/* Purchase card — 5 cols on md+ */}
          <div className="md:col-span-5 flex flex-col">
            {/* Title */}
            <h1 className="text-xl lg:text-2xl font-semibold text-text-heading leading-tight mb-1">
              {product.name}
            </h1>

            {/* Review summary — near title per DESIGN.md trust layer */}
            <ReviewSummary rating={product.rating} reviewCount={product.review_count} />

            {product.sku && (
              <p className="text-xs text-text-muted mt-1 mb-4">کد: {product.sku}</p>
            )}

            {/* Price card */}
            <div className="rounded-xl bg-bg-soft border border-border-soft p-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="text-2xl lg:text-3xl font-semibold text-primary">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <Badge variant="destructive" className="font-semibold text-xs px-2.5 py-0.5 bg-discount border-discount/20 text-white">
                      {discountPercent}٪ تخفیف
                    </Badge>
                    <span className="text-text-muted text-sm line-through">
                      {formatPrice(product.compare_price!)}
                    </span>
                  </>
                )}
              </div>
              {hasDiscount && (
                <p className="text-accent text-xs font-medium flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                  {formatPrice(product.compare_price! - product.price)} صرفه‌جویی
                </p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <PulsingDot color={isOutOfStock ? 'red' : 'green'} size={6} />
                <span className={cn('text-xs font-medium', isOutOfStock ? 'text-error' : 'text-accent')}>
                  {isOutOfStock ? 'ناموجود' : 'موجود در انبار'}
                </span>
              </div>
            </div>

            {/* Description — short */}
            {product.description && (
              <p className="text-sm text-text-body leading-relaxed mb-4 line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Guarantee strip — ABOVE the add-to-cart button per DESIGN.md */}
            {!isOutOfStock && <GuaranteeStrip />}

            {/* Quantity + Add to cart */}
            {isOutOfStock ? (
              <div className="rounded-xl bg-error-light/40 border border-error/20 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-4 h-4 text-error" aria-hidden="true" />
                  <h4 className="font-semibold text-error text-sm">فعلاً موجود نیست</h4>
                </div>
                <p className="text-xs text-error/80 mb-3">
                  شماره موبایل خود را وارد کنید تا به محض موجود شدن اطلاع‌رسانی شوید.
                </p>
                <AnimatePresence mode="wait">
                  {notifySent ? (
                    <motion.div
                      key="sent"
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-success-light border border-accent/20"
                    >
                      <CheckCircle className="w-4 h-4 text-accent" aria-hidden="true" />
                      <span className="text-accent font-medium text-xs">ثبت شد!</span>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="flex gap-2" dir="ltr">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
                        <Input
                          type="tel"
                          value={notifyPhone}
                          onChange={(e) => setNotifyPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                          placeholder="09123456789"
                          aria-label="شماره موبایل برای اطلاع‌رسانی"
                          className="h-11 rounded-lg text-left pl-10 text-sm"
                          dir="ltr"
                        />
                      </div>
                      <Button
                        onClick={handleNotify}
                        className="h-11 px-4 rounded-lg bg-primary text-white text-sm font-semibold min-w-[44px]"
                      >
                        <Bell className="w-4 h-4 ml-1" aria-hidden="true" />
                        اطلاع‌رسانی
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 my-4">
                  <span className="text-sm text-text-muted font-medium">تعداد:</span>
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

            {/* Trust badges — payment trust marks */}
            <TrustBadge />
          </div>
        </div>

        {/* Tabs */}
        <ProductDetailTabs
          product={product}
          features={features}
          specs={specs}
          faqs={faqs}
        />

        {/* Similar products */}
        {similarProducts.length > 0 && (
          <SimilarProducts products={similarProducts} />
        )}
      </div>

      {/* Sticky mobile bar */}
      {!isOutOfStock && (
        <div
          ref={stickyBarRef}
          className="fixed bottom-0 right-0 left-0 z-[200] lg:hidden bg-white/95 backdrop-blur-sm border-t border-border-soft p-3"
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
