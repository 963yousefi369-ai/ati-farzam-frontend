'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Phone, Shield, CheckCircle, User, ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import OtpInput from '@/components/auth/OtpInput'
import { useLoginModal } from '@/lib/store/login-modal'
import { useAuthStore } from '@/lib/store/auth'
import { sendOtp, verifyOtp, getProfile, updateProfile, getApiDetail } from '@/lib/api/django'
import { toast } from 'sonner'
import { fireSuccessConfetti } from '@/lib/confetti'
import { normalizePhone } from '@/lib/utils'

type Step = 'phone' | 'otp' | 'name' | 'success'

function toFaDigits(n: number) {
  return n.toLocaleString('fa-IR').padStart(2, '۰')
}

export default function LoginModal() {
  const { open, message, returnUrl, onLoginSuccess, closeLogin } = useLoginModal()
  const setAuth = useAuthStore((s) => s.setAuth)
  const updateUser = useAuthStore((s) => s.updateUser)
  const token = useAuthStore((s) => s.token)
  const prefersReducedMotion = useReducedMotion()

  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [sendLoading, setSendLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [nameLoading, setNameLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [sendError, setSendError] = useState('')
  const [timerKey, setTimerKey] = useState(0)
  const [remaining, setRemaining] = useState(120)
  const [testOtpCode, setTestOtpCode] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep('phone')
        setPhone('')
        setOtp('')
        setName('')
        setPhoneError('')
        setSendError('')
        setTestOtpCode(null)
      }, 300)
    }
  }, [open])

  useEffect(() => {
    if (open && token) closeLogin()
  }, [open, token, closeLogin])

  useEffect(() => {
    if (step !== 'otp') return
    setRemaining(120)
    setTimerKey((k) => k + 1)
  }, [step])

  useEffect(() => {
    if (step !== 'otp') return
    if (remaining <= 0) return
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(t)
  }, [remaining, step])

  const validatePhone = (p: string) => /^09[0-9]{9}$/.test(p)

  const handleSendOtp = async () => {
    const normalizedPhone = normalizePhone(phone)
    if (!validatePhone(normalizedPhone)) {
      setPhoneError('شماره موبایل معتبر نیست')
      return
    }
    setPhoneError('')
    setSendError('')
    setPhone(normalizedPhone)
    setSendLoading(true)
    setTestOtpCode(null)
    try {
      const res = await sendOtp(normalizedPhone)
      if (res.otp_code) setTestOtpCode(res.otp_code)
      setOtp('')
      setStep('otp')
      toast.success('کد تأیید ارسال شد')
    } catch (err) {
      const detail = getApiDetail(err)
      setSendError(detail || 'خطا در ارسال کد. لطفاً دوباره تلاش کنید.')
    } finally {
      setSendLoading(false)
    }
  }

  const handleResend = async () => {
    setSendLoading(true)
    setTestOtpCode(null)
    try {
      const res = await sendOtp(phone)
      if (res.otp_code) setTestOtpCode(res.otp_code)
      setOtp('')
      setRemaining(120)
      setTimerKey((k) => k + 1)
      toast.success('کد جدید ارسال شد')
    } catch {
      toast.error('خطا در ارسال کد')
    } finally {
      setSendLoading(false)
    }
  }

  const handleVerify = async () => {
    if (otp.length < 6) {
      toast.error('کد ۶ رقمی را کامل وارد کنید')
      return
    }
    setVerifyLoading(true)
    try {
      const { access, refresh } = await verifyOtp(phone, otp)
      try {
        const user = await getProfile(access)
        setAuth(access, refresh, user)
        if (!user.full_name) {
          setStep('name')
        } else {
          setStep('success')
        }
      } catch (profileErr) {
        const detail = getApiDetail(profileErr)
        toast.error(detail || 'خطا در دریافت اطلاعات حساب. لطفاً دوباره تلاش کنید.')
        setOtp('')
      }
    } catch (verifyErr) {
      const detail = getApiDetail(verifyErr)
      if (detail?.includes('expired') || detail?.includes('منقضی')) {
        toast.error('کد تأیید منقضی شده است. کد جدید دریافت کنید.')
      } else {
        toast.error(detail || 'کد وارد شده اشتباه است')
      }
      setOtp('')
    } finally {
      setVerifyLoading(false)
    }
  }

  const handleNameSubmit = async () => {
    const tokenVal = useAuthStore.getState().token
    if (!tokenVal) return
    setNameLoading(true)
    try {
      if (name.trim()) {
        const updated = await updateProfile(tokenVal, { full_name: name.trim() })
        const user = useAuthStore.getState().user
        if (user) updateUser({ full_name: updated.full_name || name.trim() })
      }
      setStep('success')
    } catch {
      setStep('success')
    } finally {
      setNameLoading(false)
    }
  }

  const handleSuccessClose = useCallback(() => {
    closeLogin()
    onLoginSuccess?.()
    if (returnUrl && typeof window !== 'undefined') {
      window.location.href = returnUrl
    }
  }, [closeLogin, onLoginSuccess, returnUrl])

  useEffect(() => {
    if (step === 'success') {
      fireSuccessConfetti()
      const t = setTimeout(handleSuccessClose, 1800)
      return () => clearTimeout(t)
    }
  }, [step, handleSuccessClose])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLogin()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            style={{ zIndex: 'var(--z-login-modal-overlay)' }}
            onClick={closeLogin}
          />
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-[var(--shadow-hover)] flex flex-col overflow-hidden"
            style={{ zIndex: 'var(--z-login-modal)' }}
            role="dialog"
            aria-modal="true"
            aria-label="ورود به حساب کاربری"
            onKeyDown={handleKeyDown}
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-5" style={{ backgroundColor: '#0f172a' }}>
              <button
                onClick={closeLogin}
                className="absolute top-2.5 left-2.5 w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                aria-label="بستن"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm leading-tight">آتی فرزام ایرانیان</p>
                  <p className="text-white/50 text-[10px] leading-tight">ردیاب GPS</p>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-white mt-1.5">
                {step === 'phone' && 'ورود به حساب'}
                {step === 'otp' && 'تأیید شماره موبایل'}
                {step === 'name' && 'تکمیل پروفایل'}
                {step === 'success' && 'خوش آمدید!'}
              </h2>
              {message && step === 'phone' && (
                <p className="text-white/60 text-xs mt-1">{message}</p>
              )}
              {/* Progress */}
              {step !== 'success' && (
                <div className="flex gap-1.5 mt-3">
                  {['phone', 'otp', 'name'].map((s, i) => (
                    <div
                      key={s}
                      className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                        ['phone', 'otp', 'name'].indexOf(step) >= i ? 'bg-white' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                {/* PHONE */}
                {step === 'phone' && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={(e) => { e.preventDefault(); handleSendOtp() }} className="space-y-4" noValidate>
                      <div className="text-center mb-1">
                        <div className="w-14 h-14 rounded-2xl bg-bg-muted flex items-center justify-center mx-auto mb-3">
                          <Phone className="w-6 h-6 text-text-heading" />
                        </div>
                        <p className="text-sm text-text-muted">شماره موبایل خود را وارد کنید</p>
                      </div>
                      <div>
                        <label htmlFor="modal-phone" className="block text-sm font-medium text-text-heading mb-1.5">
                          شماره موبایل
                        </label>
                        <div className="flex gap-2" dir="ltr">
                          <div className="flex items-center gap-1.5 px-3 h-11 rounded-lg bg-bg-muted border border-border-soft text-sm text-text-muted shrink-0">
                            <svg width="20" height="14" viewBox="0 0 640 480" className="rounded-sm">
                              <path fill="#da0000" d="M0 0h640v160H0z"/>
                              <path fill="#fff" d="M0 160h640v160H0z"/>
                              <path fill="#239f40" d="M0 320h640v160H0z"/>
                              <g fill="#fff">
                                <path d="M320 200a60 60 0 1 0 0 80 60 60 0 0 0 0-80zm0 20a40 40 0 1 1 0 80 40 40 0 0 1 0-80z"/>
                                <path d="M280 240h80v40h-80z"/>
                              </g>
                              <g fill="#da0000">
                                <path d="M300 230v20h-20v-20z"/>
                                <path d="M360 230v20h20v-20z"/>
                                <path d="M300 270v-20h-20v20z"/>
                                <path d="M360 270v-20h20v20z"/>
                              </g>
                            </svg>
                            <span className="font-medium">+۹۸</span>
                          </div>
                          <div className="flex-1 relative">
                            <Input
                              id="modal-phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))
                                setPhoneError('')
                                setSendError('')
                              }}
                              placeholder="9123456789"
                              className="h-11 text-base text-left placeholder:text-text-muted/50 rounded-lg border-border-soft pr-3"
                              inputMode="numeric"
                              autoFocus
                              dir="ltr"
                              aria-describedby={phoneError || sendError ? 'modal-phone-error' : undefined}
                              aria-invalid={!!phoneError || !!sendError}
                            />
                            {phone.length > 0 && (
                              <button
                                type="button"
                                onClick={() => { setPhone(''); setPhoneError(''); setSendError('') }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md text-text-muted hover:text-text-heading hover:bg-bg-muted transition-colors"
                                aria-label="پاک کردن شماره"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        {(phoneError || sendError) && (
                          <p id="modal-phone-error" className="text-error text-xs mt-1.5" role="alert">
                            {phoneError || sendError}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={sendLoading}
                        className="w-full h-11 text-sm rounded-lg font-semibold bg-primary hover:bg-primary-dark"
                      >
                        {sendLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                            در حال ارسال...
                          </>
                        ) : (
                          <>
                            دریافت کد تأیید
                            <ArrowRight className="w-4 h-4 rotate-180 mr-1" />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}

                {/* OTP */}
                {step === 'otp' && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-1">
                      <div className="w-14 h-14 rounded-2xl bg-bg-muted flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-6 h-6 text-text-heading" />
                      </div>
                      <p className="text-sm text-text-muted">کد ۶ رقمی ارسال‌شده را وارد کنید</p>
                      <div className="flex items-center justify-center gap-1.5 mt-1.5">
                        <span dir="ltr" className="font-mono font-semibold text-text-heading text-sm">{phone}</span>
                        <button
                          type="button"
                          onClick={() => { setStep('phone'); setOtp('') }}
                          className="inline-flex items-center h-8 px-2 text-xs text-accent hover:underline rounded-md hover:bg-primary/5 transition-colors"
                        >
                          ویرایش
                        </button>
                      </div>
                    </div>

                    {testOtpCode && (
                      <div className="rounded-lg bg-warning-light border border-warning/20 p-3 text-center">
                        <p className="text-xs text-warning mb-1 font-medium">حالت آزمایشی</p>
                        <button
                          type="button"
                          onClick={() => { setOtp(testOtpCode); navigator.clipboard?.writeText(testOtpCode) }}
                          className="font-mono text-xl font-extrabold text-warning-dark tracking-widest"
                          dir="ltr"
                        >
                          {testOtpCode}
                        </button>
                      </div>
                    )}

                    <OtpInput value={otp} onChange={setOtp} disabled={verifyLoading} />

                    <div className="flex justify-center">
                      {remaining > 0 ? (
                        <div className="flex items-center gap-1.5 text-xs text-text-muted">
                          <span>ارسال مجدد تا</span>
                          <span className="font-mono font-bold text-text-heading tabular-nums bg-bg-muted px-2 py-0.5 rounded" dir="ltr">
                            {toFaDigits(Math.floor(remaining / 60))}:{toFaDigits(remaining % 60)}
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResend}
                          disabled={sendLoading}
                          className="inline-flex items-center gap-1.5 h-9 px-4 text-sm text-accent hover:underline font-medium rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50"
                        >
                          {sendLoading && (
                            <span className="w-3.5 h-3.5 border-2 border-accent/30 border-t-teal rounded-full animate-spin" />
                          )}
                          {sendLoading ? 'در حال ارسال...' : 'ارسال مجدد کد'}
                        </button>
                      )}
                    </div>

                    <Button
                      onClick={handleVerify}
                      disabled={verifyLoading || otp.length < 6}
                      className="w-full h-11 text-sm rounded-lg font-bold bg-primary hover:bg-primary-dark"
                    >
                      {verifyLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                          در حال تأیید...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 ml-1" />
                          تأیید و ورود
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* NAME */}
                {step === 'name' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-1">
                      <div className="w-14 h-14 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-3">
                        <User className="w-6 h-6 text-accent" />
                      </div>
                      <p className="text-sm text-text-muted">نام و نام خانوادگی (اختیاری)</p>
                    </div>
                    <label htmlFor="modal-name" className="block text-sm font-medium text-text-heading mb-1.5">
                      نام و نام خانوادگی
                    </label>
                    <Input
                      id="modal-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="نام و نام خانوادگی"
                      className="h-11 text-base rounded-lg border-border-soft"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setStep('success')}
                        className="flex-1 h-11 rounded-lg text-sm border-border-soft"
                      >
                        رد شدن
                      </Button>
                      <Button
                        onClick={handleNameSubmit}
                        disabled={nameLoading}
                        className="flex-1 h-11 rounded-lg text-sm font-semibold bg-primary hover:bg-primary-dark"
                      >
                        {nameLoading ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 ml-1" />
                            ثبت
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center justify-center py-10"
                  >
                    <motion.div
                      initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-2xl bg-success-light flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-text-heading mb-1">ورود موفق!</h3>
                    <p className="text-sm text-text-muted">
                      خوش آمدید
                      {returnUrl && (
                        <span className="block text-xs text-text-muted/60 mt-1">در حال انتقال...</span>
                      )}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border-soft bg-bg-soft/50">
              <p className="text-center text-[11px] text-text-muted">
                با ورود به سایت،{' '}
                <a href="#" className="text-accent hover:underline">قوانین و مقررات</a>
                {' '}را می‌پذیرید.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
