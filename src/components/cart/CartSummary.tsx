'use client'
import { ArrowLeft, Shield, Truck, LogIn, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice, toFa } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/store/auth'
import { useLoginModal } from '@/lib/store/login-modal'
import { useRouter } from 'next/navigation'

export const FREE_SHIPPING_THRESHOLD = 1_000_000

interface CartSummaryProps {
  total: number
  count: number
}

export default function CartSummary({ total, count }: CartSummaryProps) {
  const { token } = useAuthStore()
  const openLogin = useLoginModal((s) => s.openLogin)
  const router = useRouter()

  const handleCheckout = () => {
    if (!token) {
      openLogin({
        message: 'برای تکمیل سفارش وارد شوید',
        returnUrl: '/checkout',
      })
      return
    }
    router.push('/checkout')
  }

  const remaining = FREE_SHIPPING_THRESHOLD - total
  const freeShippingMet = remaining <= 0
  const progress = Math.min(1, total / FREE_SHIPPING_THRESHOLD)

  return (
    <div className="rounded-xl border border-border-soft bg-bg-soft p-4 space-y-3">
      <h2 className="font-semibold text-text-heading text-sm">خلاصه سبد</h2>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-text-muted">
          <span>تعداد اقلام</span>
          <span className="font-medium text-text-heading">{count} عدد</span>
        </div>
        <div className="flex justify-between text-text-muted">
          <span>جمع محصولات</span>
          <span className="font-medium text-text-heading">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-text-muted">
          <span>هزینه ارسال</span>
          <span className="text-xs text-accent font-medium">پس از انتخاب آدرس</span>
        </div>
      </div>

      <Separator className="bg-border-soft" />

      <div className="flex justify-between font-bold">
        <span className="text-text-heading text-sm">جمع کل</span>
        <motion.span
          key={total}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="text-primary text-sm font-bold"
        >
          {formatPrice(total)}
        </motion.span>
      </div>

      {/* Free-shipping progress */}
      <div
        className="rounded-xl border border-border-soft bg-white p-3"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 mb-2">
          <Truck className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
          <p className="text-xs font-medium text-text-heading">
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

      <Button
        onClick={handleCheckout}
        className="w-full bg-primary hover:bg-primary-dark text-white gap-2 rounded-xl h-11 text-sm font-semibold"
      >
        {!token && <LogIn className="w-4 h-4" aria-hidden="true" />}
        ادامه و تکمیل سفارش
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      </Button>

      <Button
        onClick={() => router.push('/products')}
        variant="outline"
        className="w-full rounded-xl h-10 text-sm font-semibold border-border-soft"
      >
        ادامه خرید
      </Button>

      {/* Trust */}
      <div className="pt-2 space-y-2">
        {[
          { icon: Shield, text: 'ضمانت اصالت کالا' },
          { icon: Truck, text: 'ارسال سریع به سراسر کشور' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-xs text-text-muted">
            <Icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
