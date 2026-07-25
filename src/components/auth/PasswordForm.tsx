'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { login, getProfile, getApiDetail } from '@/lib/api/django'
import { useAuthStore } from '@/lib/store/auth'
import { normalizePhone, isValidPhone } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const schema = z.object({
  phone: z
    .string()
    .min(1, 'شماره موبایل را وارد کنید')
    .transform((v) => normalizePhone(v))
    .refine((v) => isValidPhone(v), {
      message: 'شماره موبایل معتبر نیست (مثال: 09123456789)',
    }),
  password: z.string().min(6, 'رمز عبور حداقل ۶ کاراکتر باشد'),
})

interface PasswordFormProps {
  redirectTo: string
}

export default function PasswordForm({ redirectTo }: PasswordFormProps) {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { phone: '', password: '' },
    mode: 'onBlur',
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true)
    setLoginError('')
    try {
      const { access, refresh } = await login(values.phone, values.password)
      const user = await getProfile(access)
      setAuth(access, refresh, user)
      toast.success('ورود موفق')
      router.push(redirectTo)
    } catch (err) {
      const detail = getApiDetail(err)
      setLoginError(detail || 'شماره موبایل یا رمز عبور اشتباه است')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-text-primary">شماره موبایل</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  className="h-12 text-base text-left placeholder:text-right rounded-xl border-border-default/50 focus:border-primary/30 focus:ring-navy/10 transition-all duration-200"
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </FormControl>
              <p className="text-xs text-text-tertiary mt-1">
                فرمت‌های مجاز: 09123456789 ، 9123456789 ، +989123456789
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-text-primary">رمز عبور</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  فراموشی رمز؟
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    dir="ltr"
                    placeholder="••••••••"
                    className="h-12 text-base pl-11 text-left rounded-xl border-border-default/50 focus:border-primary/30 focus:ring-navy/10 transition-all duration-200"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-text-tertiary hover:text-text-secondary transition-colors rounded-lg hover:bg-bg-secondary"
                    aria-label={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {loginError && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-error-light border border-error/20 text-sm text-error" role="alert">
            <span className="shrink-0 w-5 h-5 rounded-full bg-error/10 flex items-center justify-center text-xs font-bold">!</span>
            {loginError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-base rounded-xl transition-colors gap-2"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              در حال ورود...
            </span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              ورود
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
