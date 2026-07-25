'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ChevronLeft, Package } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import OrderStatusBadge from '@/components/profile/OrderStatusBadge'
import { useAuthStore } from '@/lib/store/auth'
import { getOrders } from '@/lib/api/django'
import { formatPrice, formatDate } from '@/lib/utils'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'

export default function OrdersPage() {
  const { token } = useAuthStore()
  const reduceMotion = useReducedMotion()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    getOrders(token)
      .then(setOrders)
      .catch(() => setError('خطا در بارگذاری سفارشات'))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return (
      <div className="space-y-4">
        <BreadcrumbTrail dark={false} />
        <Skeleton className="h-5 w-40" />
        <Card className="rounded-2xl border border-border-soft">
          <CardHeader><CardTitle>سفارش‌های من</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <BreadcrumbTrail dark={false} />
        <Card className="rounded-2xl border border-border-soft">
          <CardContent className="py-8 text-center">
            <p className="text-error text-sm">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-4">
        <BreadcrumbTrail dark={false} />
        <Card className="rounded-2xl border border-border-soft">
          <CardContent className="py-10 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-bg-muted flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-text-muted" />
            </div>
            <p className="text-text-heading font-medium text-sm">هنوز سفارشی ندارید</p>
            <p className="text-text-muted text-xs">محصولات GPS ما را کشف کنید</p>
            <Button asChild className="bg-primary hover:bg-primary-dark text-white mt-1 rounded-xl text-sm">
              <Link href="/products">مشاهده محصولات</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <BreadcrumbTrail dark={false} />

      <Card className="rounded-2xl border border-border-soft" style={{ boxShadow: 'var(--shadow-card)' }}>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Package className="w-4 h-4 text-amber-600" />
            </span>
            <CardTitle className="text-text-heading text-base">سفارش‌های من</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { delay: idx * 0.05, duration: 0.25 }}
            >
              <Link
                href={`/profile/orders/${order.id}`}
                aria-label={`سفارش شماره ${order.id} — ${formatDate(order.created_at)} — ${formatPrice(order.total_price ?? order.total ?? 0)}`}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border-soft hover:border-accent/20 transition-colors group"
              >
                <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm font-semibold text-text-heading tabular-nums">#{order.id}</p>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-text-muted">{formatDate(order.created_at)}</p>
                  </div>
                  <p className="text-sm font-bold text-primary tabular-nums whitespace-nowrap">
                    {formatPrice(order.total_price ?? order.total ?? 0)}
                  </p>
                </div>
                <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors shrink-0" />
              </Link>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
