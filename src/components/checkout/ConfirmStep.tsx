'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import TrustBadge from '@/components/ui/TrustBadge'
import { cn, formatPrice } from '@/lib/utils'
import { createOrder, initiatePayment } from '@/lib/api/django'
import { useCartStore } from '@/lib/store/cart'
import { trackCartAction, flushTracking } from '@/lib/tracking'

interface ConfirmStepProps {
  token: string
  address: any
  shippingMethod: any
  customerName: string
  onBack: () => void
  onOrderCreated?: () => void
}

export default function ConfirmStep({ token, address, shippingMethod, customerName, onBack, onOrderCreated }: ConfirmStepProps) {
  const router = useRouter()
  const { items, totalPrice } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState('')

  const subtotal = totalPrice()
  const shipping = shippingMethod?.cost ?? 0
  const total = subtotal + Number(shipping)

  const handlePay = async () => {
    setLoading(true)
    setError('')
    try {
      const idempotencyKey = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const order = await createOrder(token, {
        address_id: address.id,
        shipping_method_id: shippingMethod.id,
        items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
        idempotency_key: idempotencyKey,
      })
      trackCartAction('checkout', { order_id: order.id, total, items_count: items.length })
      onOrderCreated?.()
      const payment = await initiatePayment(token, String(order.id))
      sessionStorage.setItem('last_order_id', String(order.id))
      sessionStorage.setItem('last_order_items', JSON.stringify(items))
      if (payment.payment_url) {
        setRedirecting(true)
        flushTracking()
        window.location.href = payment.payment_url
      } else {
        router.push(`/payment/result?status=paid&order_id=${order.id}`)
      }
    } catch (e: any) {
      const msg = e?.message || ''
      if (msg.includes('422') || msg.includes('validation')) {
        setError('اطلاعات سفارش نامعتبر است. لطفاً مراحل قبل را بررسی کنید.')
      } else if (msg.includes('403') || msg.includes('shop_disabled')) {
        setError('فروشگاه در حال حاضر غیرفعال است.')
      } else if (msg.includes('insufficient_stock') || msg.includes('400')) {
        setError('موجودی یکی از محصولات کافی نیست. لطفاً سبد خرید را بررسی کنید.')
      } else if (msg.includes('401') || msg.includes('403')) {
        setError('نشست شما منقضی شده. لطفاً دوباره وارد شوید.')
      } else {
        setError('خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.')
      }
    } finally {
      setLoading(false)
    }
  }

  const provinceName = typeof address?.province === 'object'
    ? address?.province?.name
    : address?.province ?? ''
  const cityName = typeof address?.city === 'object'
    ? address?.city?.name
    : address?.city ?? ''

  if (redirecting) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4" role="status" aria-live="polite">
        <Loader2 className="w-10 h-10 text-primary animate-spin" aria-hidden="true" />
        <p className="text-text-heading font-semibold text-sm">در حال انتقال به درگاه پرداخت...</p>
        <p className="text-text-muted text-xs">لطفاً صفحه را نبندید</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-text-heading">تأیید و پرداخت</h2>

      {/* Order items */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="font-semibold text-text-primary text-sm mb-3">اقلام سفارش</p>
          {items.map((item) => (
            <div key={item.product_id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-bg-secondary flex-shrink-0">
                <Image
                  src={item.imageUrl || '/placeholder-product.svg'}
                  alt={item.name}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-text-primary text-xs font-medium line-clamp-1">{item.name}</p>
                <p className="text-text-tertiary text-xs">&times; {item.quantity}</p>
              </div>
              <p className="text-primary font-semibold text-sm flex-shrink-0">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary: customer + address + shipping + price in one card */}
      <Card className="border-primary/20">
        <CardContent className="p-4 space-y-4">
          {/* Customer */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4.5 h-4.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">نام سفارش‌دهنده</p>
              <p className="text-text-secondary text-xs">{customerName}</p>
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div>
            <p className="font-semibold text-text-primary text-sm mb-1">آدرس تحویل</p>
            <p className="text-text-secondary text-xs leading-relaxed">
              {provinceName} — {cityName} — {address?.street}
            </p>
            {address?.postal_code && (
              <p className="text-text-tertiary text-xs mt-1">کد پستی: {address.postal_code}</p>
            )}
          </div>

          <Separator />

          {/* Shipping */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-text-primary text-sm">روش ارسال</p>
              <p className="text-text-secondary text-xs">{shippingMethod?.name}</p>
            </div>
            <p className="text-primary font-semibold text-sm">{formatPrice(Number(shipping))}</p>
          </div>

          <Separator />

          {/* Price breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-text-secondary">
              <span>جمع محصولات</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-text-secondary">
              <span>هزینه ارسال</span>
              <span>{formatPrice(Number(shipping))}</span>
            </div>
            <div className="flex justify-between font-semibold text-text-heading text-base pt-1">
              <span>جمع کل</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <p className="text-error text-sm text-center bg-error-light border border-error/20 rounded-xl p-3" role="alert">{error}</p>
      )}

      <TrustBadge />

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
        <span>اطلاعات شما با رمزنگاری محافظت می‌شود</span>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          مرحله قبل
        </Button>
        <Button
          className="bg-primary hover:bg-primary-dark text-white px-8 gap-2"
          onClick={handlePay}
          disabled={loading}
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          {loading ? 'در حال پردازش...' : 'پرداخت آنلاین'}
        </Button>
      </div>
    </div>
  )
}
