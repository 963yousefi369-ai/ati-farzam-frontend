'use client'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MapPin, ArrowLeft, Phone, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { normalizePhone, isValidPhone } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import OtpInput from '@/components/auth/OtpInput'
import CountdownTimer from '@/components/auth/CountdownTimer'
import { forgotPassword, resetPassword, getApiDetail } from '@/lib/api/django'

const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'شماره موبایل را وارد کنید')
    .transform((v) => normalizePhone(v))
    .refine((v) => isValidPhone(v), {
      message: 'شماره موبایل معتبر نیست',
    }),
})

const resetSchema = z
  .object({
    otp: z.string().length(6, 'کد ۶ رقمی را کامل وارد کنید'),
    password: z.string().min(6, 'رمز جدید حداقل ۶ کاراکتر باشد'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'رمز عبور و تکرار آن یکسان نیستند',
    path: ['confirm'],
  })

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'reset' | 'done'>('phone')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [timerKey, setTimerKey] = useState(0)
  const [sendError, setSendError] = useState('')
  const [resetError, setResetError] = useState('')
  const [redirectCountdown, setRedirectCountdown] = useState(5)

  const goToLogin = useCallback(() => {
    router.push('/login')
  }, [router])

  useEffect(() => {
    if (step !== 'done') return
    if (redirectCountdown <= 0) {
      goToLogin()
      return
    }
    const t = setTimeout(() => setRedirectCountdown((r) => r - 1), 1000)
    return () => clearTimeout(t)
  }, [step, redirectCountdown, goToLogin])

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
  })

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: '', password: '', confirm: '' },
    mode: 'onBlur',
  })

  async function handleSendOtp(values: z.infer<typeof phoneSchema>) {
    setLoading(true)
    setSendError('')
    try {
      await forgotPassword(values.phone)
      setPhone(values.phone)
      setStep('reset')
      setTimerKey((k) => k + 1)
      toast.success('کد بازیابی ارسال شد')
    } catch (err) {
      const detail = getApiDetail(err)
      setSendError(detail || 'خطا در ارسال کد. لطفاً دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setLoading(true)
    setResetError('')
    try {
      await forgotPassword(phone)
      setTimerKey((k) => k + 1)
      toast.success('کد جدید ارسال شد')
    } catch (err) {
      const detail = getApiDetail(err)
      toast.error(detail || 'خطا در ارسال مجدد کد')
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(values: z.infer<typeof resetSchema>) {
    setLoading(true)
    setResetError('')
    try {
      await resetPassword(phone, values.otp, values.password)
      setStep('done')
      toast.success('رمز عبور با موفقیت تغییر یافت')
    } catch (err) {
      const detail = getApiDetail(err)
      if (detail?.includes('expired') || detail?.includes('منقضی')) {
        setResetError('کد بازیابی منقضی شده است. کد جدید دریافت کنید.')
      } else {
        setResetError(detail || 'کد وارد شده اشتباه است')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary mb-3">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-text-heading">بازیابی رمز عبور</h1>
        <p className="text-sm text-text-muted mt-1">آتی فرزام ایرانیان</p>
      </div>

      <div className="bg-white rounded-2xl border border-border-soft p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        {step === 'phone' && (
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(handleSendOtp)} className="space-y-4" noValidate>
              <p className="text-sm text-text-muted text-center">
                شماره موبایل ثبت‌نام‌شده را وارد کنید.
              </p>
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره موبایل</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        dir="ltr"
                        placeholder="09123456789"
                        className="h-11 text-base text-left placeholder:text-right"
                        inputMode="numeric"
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {sendError && (
                <p className="text-error text-xs" role="alert">{sendError}</p>
              )}
              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl" disabled={loading}>
                {loading ? 'در حال ارسال...' : 'ارسال کد بازیابی'}
              </Button>
            </form>
          </Form>
        )}

        {step === 'reset' && (
          <Form {...resetForm}>
            <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-4" noValidate>
              <div className="flex items-center justify-between bg-bg-muted rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr" className="font-mono font-medium text-text-heading">{phone}</span>
                </div>
                <button type="button" onClick={() => setStep('phone')} className="text-xs text-accent hover:underline font-medium">
                  ویرایش
                </button>
              </div>

              <FormField
                control={resetForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center block">کد بازیابی</FormLabel>
                    <FormControl>
                      <OtpInput value={field.value} onChange={field.onChange} disabled={loading} />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <CountdownTimer key={timerKey} seconds={120} onResend={handleResend} loading={loading} />
              </div>

              <FormField
                control={resetForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور جدید</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type={showPass ? 'text' : 'password'} dir="ltr" placeholder="حداقل ۶ کاراکتر" className="h-11 text-base pl-11 text-left" />
                        <button type="button" tabIndex={-1} onClick={() => setShowPass(v => !v)} className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-heading rounded-lg hover:bg-bg-muted transition-colors" aria-label={showPass ? 'مخفی کردن رمز' : 'نمایش رمز'}>
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={resetForm.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تکرار رمز عبور</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type={showConfirm ? 'text' : 'password'} dir="ltr" placeholder="••••••••" className="h-11 text-base pl-11 text-left" />
                        <button type="button" tabIndex={-1} onClick={() => setShowConfirm(v => !v)} className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-heading rounded-lg hover:bg-bg-muted transition-colors" aria-label={showConfirm ? 'مخفی کردن رمز تأیید' : 'نمایش رمز تأیید'}>
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {resetError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-error-light border border-error/20 text-sm text-error" role="alert">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-error/10 flex items-center justify-center text-xs font-bold">!</span>
                  {resetError}
                </div>
              )}
              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl" disabled={loading}>
                {loading ? 'در حال تغییر رمز...' : 'تغییر رمز عبور'}
              </Button>
            </form>
          </Form>
        )}

        {step === 'done' && (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-2xl bg-success-light flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-heading">رمز عبور تغییر یافت</h2>
              <p className="text-sm text-text-muted mt-1">می‌توانید با رمز جدید وارد شوید.</p>
            </div>
            <Button className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl" onClick={goToLogin}>
              رفتن به صفحه ورود
              <span className="text-xs text-white/60 mr-1">({redirectCountdown})</span>
            </Button>
          </div>
        )}
      </div>

      <div className="text-center mt-5">
        <Link href="/login" className="text-sm text-text-muted hover:text-accent flex items-center justify-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />بازگشت به ورود
        </Link>
      </div>
    </div>
  )
}
