'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingCart, LogIn, User, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AddressStep from '@/components/checkout/AddressStep'
import ShippingStep from '@/components/checkout/ShippingStep'
import ConfirmStep from '@/components/checkout/ConfirmStep'
import { useAuthStore } from '@/lib/store/auth'
import { useCartStore } from '@/lib/store/cart'
import { useLoginModal } from '@/lib/store/login-modal'
import { updateProfile, holdStock, releaseStock } from '@/lib/api/django'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import { motion, useReducedMotion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'

const STEP_LABELS = ['آدرس', 'ارسال', 'تأیید']

export default function CheckoutPage() {
  const { token, user } = useAuthStore()
  const updateUser = useAuthStore((s) => s.updateUser)
  const { items } = useCartStore()
  const openLogin = useLoginModal((s) => s.openLogin)
  const prefersReducedMotion = useReducedMotion()

  const profileName = user?.full_name?.trim() || ''
  const [customerName, setCustomerName] = useState(profileName)
  const [nameConfirmed, setNameConfirmed] = useState(!!profileName)
  const [savingName, setSavingName] = useState(false)
  const [nameError, setNameError] = useState('')
  const [step, setStep] = useState(1)
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<any>(null)

  const handleNameConfirm = async () => {
    if (!customerName.trim()) {
      setNameError('لطفاً نام و نام خانوادگی را وارد کنید')
      return
    }
    if (customerName.trim().length < 2) {
      setNameError('نام باید حداقل ۲ حرف باشد')
      return
    }
    setNameError('')
    setNameConfirmed(true)
    if (token && customerName.trim() !== profileName) {
      setSavingName(true)
      try {
        await updateProfile(token, { full_name: customerName.trim() })
        updateUser({ full_name: customerName.trim() })
      } catch {
        // silent
      } finally {
        setSavingName(false)
      }
    }
  }

  const handleNameBlur = () => {
    if (customerName.trim() && customerName.trim().length < 2) {
      setNameError('نام باید حداقل ۲ حرف باشد')
    } else {
      setNameError('')
    }
  }

  useEffect(() => {
    if (!token) {
      openLogin({
        message: 'برای تکمیل سفارش وارد شوید',
        returnUrl: '/checkout',
      })
    }
  }, [token, openLogin])

  // CRIT-06: Stock reservation — hold stock on mount, release on unmount
  const reservationSessionKey = useRef(`checkout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)
  const paymentCompleted = useRef(false)

  useEffect(() => {
    if (!token || items.length === 0) return

    const sessionKey = reservationSessionKey.current
    const holdItems = items.map(i => ({ product_id: i.product_id, quantity: i.quantity }))

    // Hold stock when entering checkout
    holdStock(token, sessionKey, holdItems).catch(() => {
      // Silent — the create_order endpoint still has select_for_update as final guard
    })

    // Release stock on unmount (unless payment completed)
    const handleRelease = () => {
      if (!paymentCompleted.current) {
        releaseStock(token, sessionKey).catch(() => {})
      }
    }

    // beforeunload fallback
    const handleBeforeUnload = () => {
      if (!paymentCompleted.current && navigator.sendBeacon) {
        navigator.sendBeacon(`/api/stock/release?session_key=${encodeURIComponent(sessionKey)}`)
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      handleRelease()
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, items.length])

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          className="text-center max-w-sm mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-bg-muted flex items-center justify-center mx-auto mb-5">
            <LogIn className="w-8 h-8 text-text-muted" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-text-heading mb-2">ورود به حساب</h2>
          <p className="text-text-muted text-sm mb-5">
            برای تکمیل سفارش ابتدا وارد حساب کاربری خود شوید.
          </p>
          <Button
            onClick={() => openLogin({ message: 'برای تکمیل سفارش وارد شوید', returnUrl: '/checkout' })}
            className="bg-primary text-white rounded-xl font-semibold px-6"
          >
            <LogIn className="w-4 h-4 ml-2" aria-hidden="true" />
            ورود به حساب
          </Button>
        </motion.div>
      </div>
    )
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
          <h2 className="text-lg font-bold text-text-heading mb-2">سبد خرید خالی است</h2>
          <p className="text-text-muted text-sm mb-5">
            ابتدا محصولات مورد نظر خود را به سبد اضافه کنید.
          </p>
          <Button
            asChild
            className="bg-primary text-white rounded-xl font-semibold px-6"
          >
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  const handleAddressSelect = (id: number, addressObj?: any) => {
    setSelectedAddressId(id)
    if (addressObj) setSelectedAddress(addressObj)
  }

  const handleAddressNext = () => {
    setStep(2)
  }

  const stepContentVariants = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 } }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-6 lg:py-8">
        <div className="mb-5">
          <BreadcrumbTrail dark={false} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-text-heading">تکمیل سفارش</h1>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-heading transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            بازگشت به سبد
          </Link>
        </div>

        {/* Step indicator — accessible */}
        <nav aria-label="مراحل سفارش" className="mb-6">
          <ol className="flex items-center gap-2" role="list">
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1
              const isActive = step === stepNum
              const isDone = step > stepNum
              return (
                <li key={label} className="flex items-center gap-2 flex-1">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive ? 'bg-primary text-white' : isDone ? 'bg-accent-light text-accent' : 'bg-bg-muted text-text-muted'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isDone ? (
                      <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold" aria-hidden="true">
                        {stepNum}
                      </span>
                    )}
                    <span>{label}</span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 rounded ${step > stepNum ? 'bg-primary' : 'bg-border-soft'}`}
                      role="separator"
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Customer name */}
        {nameConfirmed ? (
          <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-bg-soft border border-border-soft">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-accent" aria-hidden="true" />
              <div>
                <p className="text-xs text-text-muted">سفارش‌دهنده</p>
                <p className="text-sm font-semibold text-text-heading">{customerName}</p>
              </div>
            </div>
            <button
              onClick={() => setNameConfirmed(false)}
              className="text-xs text-text-muted hover:text-text-heading transition-colors px-2 py-1 rounded-lg hover:bg-white"
              aria-label="ویرایش نام سفارش‌دهنده"
            >
              ویرایش
            </button>
          </div>
        ) : (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            className="mb-5 p-4 rounded-xl border border-accent/20 bg-accent-light/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-accent" aria-hidden="true" />
              <Label htmlFor="checkout-customer-name" className="font-bold text-text-heading text-sm">
                نام و نام خانوادگی
              </Label>
            </div>
            <p className="text-xs text-text-muted mb-3">
              نام کامل خود را وارد کنید. این نام روی فاکتور سفارش ثبت می‌شود.
            </p>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="checkout-customer-name"
                  placeholder="مثال: محمد رضایی"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value)
                    if (nameError) setNameError('')
                  }}
                  onBlur={handleNameBlur}
                  className="h-10 rounded-xl"
                  dir="rtl"
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? 'checkout-name-error' : undefined}
                  onKeyDown={(e) => { if (e.key === 'Enter' && customerName.trim()) handleNameConfirm() }}
                />
                {nameError && (
                  <p id="checkout-name-error" className="text-error text-xs mt-1 flex items-center gap-1" role="alert">
                    {nameError}
                  </p>
                )}
              </div>
              <Button
                className="h-10 px-5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold"
                onClick={handleNameConfirm}
                disabled={!customerName.trim() || savingName}
              >
                {savingName ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="در حال ذخیره" />
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 ml-1" aria-hidden="true" />
                    تأیید
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            {!nameConfirmed ? (
              <div className="text-center py-8 text-text-muted">
                <User className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
                <p className="text-sm">لطفاً ابتدا نام خود را تأیید کنید</p>
              </div>
            ) : (
              <motion.div
                key={step}
                {...stepContentVariants}
                transition={{ duration: 0.25 }}
              >
                {step === 1 && (
                  <AddressStep
                    token={token}
                    selectedId={selectedAddressId}
                    onSelect={handleAddressSelect}
                    onNext={handleAddressNext}
                  />
                )}

                {step === 2 && selectedAddressId && (
                  <ShippingStep
                    addressId={selectedAddressId}
                    address={selectedAddress}
                    selectedMethodId={selectedShippingMethod?.id ?? null}
                    onSelect={(method) => setSelectedShippingMethod(method)}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                  />
                )}

                {step === 3 && selectedShippingMethod && (
                  <ConfirmStep
                    token={token}
                    address={selectedAddress ?? { id: selectedAddressId }}
                    shippingMethod={selectedShippingMethod}
                    customerName={customerName}
                    onBack={() => setStep(2)}
                    onOrderCreated={() => { paymentCompleted.current = true }}
                  />
                )}
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 rounded-xl border border-border-soft bg-bg-soft p-4 space-y-3">
              <h3 className="font-bold text-text-heading text-sm">خلاصه سفارش</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-xs">
                    <span className="text-text-muted truncate ml-2">{item.name} &times;{item.quantity}</span>
                    <span className="text-text-heading font-semibold whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              {selectedShippingMethod && (
                <>
                  <div className="h-px bg-border-soft" />
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">هزینه ارسال</span>
                    <span className="text-accent font-semibold">
                      {selectedShippingMethod.cost === 0
                        ? 'رایگان'
                        : formatPrice(selectedShippingMethod.cost)}
                    </span>
                  </div>
                </>
              )}
              <div className="h-px bg-border-soft" />
              <div className="flex justify-between text-sm font-bold">
                <span className="text-text-heading">جمع کل</span>
                <span className="text-primary">
                  {formatPrice(
                    items.reduce((s, i) => s + i.price * i.quantity, 0) + (selectedShippingMethod?.cost ?? 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
