'use client'

import Link from 'next/link'
import { ShoppingCart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartItem from '@/components/cart/CartItem'
import CartSummary, { FREE_SHIPPING_THRESHOLD } from '@/components/cart/CartSummary'
import { useCartStore } from '@/lib/store/cart'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function CartPage() {
  const { items, totalCount, totalPrice } = useCartStore()
  const count = totalCount()
  const total = totalPrice()
  const prefersReducedMotion = useReducedMotion()

  const itemVariants = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -60, height: 0, marginBottom: 0 },
      }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          className="text-center max-w-sm mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-bg-muted flex items-center justify-center mx-auto mb-5">
            <ShoppingCart className="w-8 h-8 text-text-muted" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-text-heading mb-2">سبد خرید شما خالی است</h2>
          <p className="text-text-muted text-sm mb-5">
            محصولات مورد نظرتان را به سبد اضافه کنید
          </p>
          <div className="flex flex-col gap-2">
            <Button
              asChild
              className="bg-primary text-white rounded-xl px-6 font-semibold hover:bg-primary-dark"
            >
              <Link href="/products?sort=best-selling">
                <TrendingUp className="w-4 h-4 ml-1.5" aria-hidden="true" />
                مشاهده پرفروش‌ها
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl px-6 border-border-soft font-semibold"
            >
              <Link href="/products">مشاهده همه محصولات</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-6 lg:py-8">
        <div className="mb-5">
          <BreadcrumbTrail dark={false} />
        </div>

        <div className="flex items-center gap-2.5 mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-text-heading">سبد خرید</h1>
          <span className="text-sm text-text-muted">({count} کالا)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.product_id}
                  {...itemVariants}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CartSummary total={total} count={count} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
