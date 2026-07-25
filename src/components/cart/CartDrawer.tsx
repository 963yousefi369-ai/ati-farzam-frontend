'use client'
import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowLeft, LogIn, Truck, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartDrawer } from '@/lib/store/cart-drawer'
import { useCartStore } from '@/lib/store/cart'
import { useAuthStore } from '@/lib/store/auth'
import { useLoginModal } from '@/lib/store/login-modal'
import { formatPrice, toFa } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/components/cart/CartSummary'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DRAWER_TITLE_ID = 'cart-drawer-title'

export default function CartDrawer() {
  const { open, closeDrawer } = useCartDrawer()
  const { items, removeItem, updateQuantity, totalPrice, totalCount } = useCartStore()
  const { token } = useAuthStore()
  const openLogin = useLoginModal((s) => s.openLogin)
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // ── Focus trap + Escape key ───────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDrawer()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [closeDrawer]
  )

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Focus the panel so screen readers announce it
    requestAnimationFrame(() => {
      panelRef.current?.focus()
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [open, handleKeyDown])

  const handleCheckout = () => {
    closeDrawer()
    if (!token) {
      setTimeout(() => {
        openLogin({
          message: 'برای تکمیل سفارش وارد شوید',
          returnUrl: '/checkout',
        })
      }, 200)
      return
    }
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40"
            style={{ zIndex: 'var(--z-cart-drawer-overlay)' }}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={DRAWER_TITLE_ID}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-[var(--shadow-hover)] flex flex-col outline-none"
            style={{ zIndex: 'var(--z-cart-drawer)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-soft">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-text-heading" aria-hidden="true" />
                <div>
                  <h2 id={DRAWER_TITLE_ID} className="font-semibold text-text-heading text-base">
                    سبد خرید
                  </h2>
                  <p className="text-[11px] text-text-muted">
                    {totalCount() > 0 ? `${totalCount().toLocaleString('fa-IR')} کالا` : 'خالی'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="بستن سبد خرید"
                className="w-11 h-11 rounded-lg hover:bg-bg-muted flex items-center justify-center text-text-muted transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-16 h-16 rounded-2xl bg-bg-muted flex items-center justify-center mb-4">
                    <ShoppingCart className="w-7 h-7 text-text-muted" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-text-heading mb-1">سبد خرید شما خالی است</p>
                  <p className="text-sm text-text-muted mb-5">محصولات مورد علاقه‌تان را به سبد اضافه کنید</p>
                  <div className="flex flex-col gap-2">
                    <Button asChild className="rounded-xl font-semibold bg-primary hover:bg-primary-dark" onClick={closeDrawer}>
                      <Link href="/products?sort=best-selling">
                        <TrendingUp className="w-4 h-4 ml-1.5" aria-hidden="true" />
                        مشاهده پرفروش‌ها
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-xl border-border-soft font-semibold" onClick={closeDrawer}>
                      <Link href="/products">مشاهده همه محصولات</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-2.5">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product_id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, transition: { duration: 0.15 } }}
                        className="flex gap-3 p-3 rounded-xl bg-bg-soft border border-border-soft"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-border-soft">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={56}
                              height={56}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="w-5 h-5 text-border-soft" aria-hidden="true" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-text-heading truncate">{item.name}</h4>
                          <p className="text-sm font-bold text-primary mt-0.5">{formatPrice(item.price)}</p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                className="w-11 h-11 rounded-lg bg-white border border-border-soft flex items-center justify-center text-text-secondary hover:text-primary transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                                aria-label={`کاهش تعداد ${item.name}`}
                              >
                                <Minus className="w-4 h-4" aria-hidden="true" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-text-heading tabular-nums">
                                {item.quantity.toLocaleString('fa-IR')}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                className="w-11 h-11 rounded-lg bg-white border border-border-soft flex items-center justify-center text-text-secondary hover:text-primary transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                                aria-label={`افزایش تعداد ${item.name}`}
                              >
                                <Plus className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.product_id)}
                              className="w-11 h-11 rounded-lg hover:bg-error-light flex items-center justify-center text-text-muted hover:text-error transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2"
                              aria-label={`حذف ${item.name} از سبد`}
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border-soft p-5 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">جمع سبد:</span>
                  <motion.span
                    key={Math.round(totalPrice())}
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-lg font-bold text-primary"
                  >
                    {formatPrice(totalPrice())}
                  </motion.span>
                </div>

                {/* Free-shipping progress */}
                {(() => {
                  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice()
                  const freeShippingMet = remaining <= 0
                  const progress = Math.min(1, totalPrice() / FREE_SHIPPING_THRESHOLD)
                  return (
                    <div
                      className="rounded-xl border border-border-soft bg-bg-soft p-3"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                        <p className="text-[11px] font-medium text-text-heading">
                          {freeShippingMet ? (
                            <span className="text-accent">ارسال رایگان فعال شد</span>
                          ) : (
                            <span>
                              <span className="text-accent font-bold">{toFa(remaining)}</span>
                              {' '}تومان تا ارسال رایگان
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-bg-muted overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${freeShippingMet ? 'bg-accent' : 'bg-primary'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress * 100}%` }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  )
                })()}

                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 h-11 rounded-xl text-sm font-medium border-border-soft"
                    onClick={closeDrawer}
                  >
                    <Link href="/cart">
                      مشاهده سبد
                      <ArrowLeft className="w-4 h-4 rotate-180 mr-1" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    className="flex-1 h-11 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-dark"
                  >
                    {!token && <LogIn className="w-4 h-4 ml-1" aria-hidden="true" />}
                    تسویه حساب
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
