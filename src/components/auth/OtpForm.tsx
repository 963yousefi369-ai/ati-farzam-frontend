'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { sendOtp, verifyOtp, getProfile, getApiDetail } from '@/lib/api/django'
import { useAuthStore } from '@/lib/store/auth'
import { normalizePhone } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import OtpInput from './OtpInput'
import CountdownTimer from './CountdownTimer'
import { ArrowLeft, Phone, Shield } from 'lucide-react'

const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'شماره موبایل را وارد کنید')
    .transform((v) => normalizePhone(v))
    .refine((v) => /^09[0-9]{9}$/.test(v), {
      message: 'شماره موبایل معتبر نیست',
    }),
})

interface OtpFormProps {
  redirectTo: string
}

export default function OtpForm({ redirectTo }: OtpFormProps) {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [sendLoading, setSendLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [sendError, setSendError] = useState('')
  const [timerKey, setTimerKey] = useState(0)

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
  })

  async function handleSendOtp(values: z.infer<typeof phoneSchema>) {
    setSendLoading(true)
    setSendError('')
    try {
      await sendOtp(values.phone)
      setPhone(values.phone)
      setOtp('')
      setStep('otp')
      setTimerKey((k) => k + 1)
      toast.success('کد تأیید ارسال شد')
    } catch (err) {
      const detail = getApiDetail(err)
      setSendError(detail || 'خطا در ارسال کد. لطفاً دوباره تلاش کنید.')
    } finally {
      setSendLoading(false)
    }
  }

  async function handleResend() {
    setSendLoading(true)
    setSendError('')
    try {
      await sendOtp(phone)
      setOtp('')
      setTimerKey((k) => k + 1)
      toast.success('کد جدید ارسال شد')
    } catch {
      toast.error('خطا در ارسال کد')
    } finally {
      setSendLoading(false)
    }
  }

  async function handleVerify() {
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
        toast.success('ورود موفق')
        router.push(redirectTo)
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

  if (step === 'otp') {
    return (
      <div className="space-y-6">
        {/* Phone display */}
        <div className="flex items-center justify-between bg-bg-secondary/70 rounded-xl px-4 py-3 border border-border-default/30">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Phone className="w-4 h-4 text-primary" />
            <span dir="ltr" className="font-mono font-medium">{phone}</span>
          </div>
          <button
            type="button"
            onClick={() => { setStep('phone'); setOtp(''); setSendError('') }}
            className="inline-flex items-center h-8 px-2 text-sm text-primary hover:text-primary-dark font-medium rounded-md hover:bg-primary/5 transition-colors gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            ویرایش
          </button>
        </div>

        {/* OTP Input */}
        <div className="space-y-3">
          <p className="text-sm text-text-secondary text-center">
            کد ۶ رقمی ارسال‌شده را وارد کنید
          </p>
          <OtpInput value={otp} onChange={setOtp} disabled={verifyLoading} />
        </div>

        {/* Timer */}
        <div className="flex justify-center">
          <CountdownTimer
            key={timerKey}
            seconds={120}
            onResend={handleResend}
            loading={sendLoading}
          />
        </div>

        {/* Verify button */}
        {verifyLoading && (
          <p className="text-center text-xs text-text-muted">در حال تأیید کد...</p>
        )}
        <Button
          type="button"
          className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-base rounded-xl transition-colors"
          onClick={handleVerify}
          disabled={verifyLoading || otp.length < 6}
        >
          {verifyLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              در حال تأیید...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              تأیید و ورود
            </span>
          )}
        </Button>
      </div>
    )
  }

  return (
    <Form {...phoneForm}>
      <form onSubmit={phoneForm.handleSubmit(handleSendOtp)} className="space-y-5" noValidate>
        <FormField
          control={phoneForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-text-primary">شماره موبایل</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  dir="ltr"
                  placeholder="09123456789 یا 9123456789"
                  className="h-12 text-base text-left placeholder:text-slate-300 placeholder:text-right rounded-xl border-border-default/50 focus:border-primary/30 focus:ring-navy/10 transition-all duration-200"
                  inputMode="numeric"
                  autoComplete="tel"
                  autoFocus
                />
              </FormControl>
              <p className="text-xs text-text-muted mt-1">
                با یا بدون صفر اول قبول میشه — مثلاً 9123456789 یا 09123456789
              </p>
              <FormMessage />
              {sendError && (
                <p className="text-error text-xs mt-1" role="alert">{sendError}</p>
              )}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-base rounded-xl transition-colors"
          disabled={sendLoading}
        >
          {sendLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              در حال ارسال...
            </span>
          ) : (
            'دریافت کد تأیید'
          )}
        </Button>
      </form>
    </Form>
  )
}
