'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, CheckCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import OtpForm from '@/components/auth/OtpForm'
import PasswordForm from '@/components/auth/PasswordForm'
import { useAuthStore } from '@/lib/store/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function LoginCard() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  const { token, user } = useAuthStore()

  if (token && user) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border-soft p-8 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="w-14 h-14 rounded-2xl bg-success-light flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-lg font-bold text-text-heading mb-2">شما وارد شده‌اید</h2>
          <p className="text-sm text-text-muted mb-5">
            {user.full_name || user.phone_number} — خوش آمدید
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild className="bg-primary hover:bg-primary-dark text-white rounded-xl px-5">
              <Link href={redirectTo !== '/' ? redirectTo : '/profile'}>ادامه</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl px-5 border-border-soft">
              <Link href="/">صفحه اصلی</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary mb-3">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-text-heading">ورود به حساب کاربری</h1>
        <p className="text-sm text-text-muted mt-1">آتی فرزام ایرانیان</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-border-soft p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <Tabs defaultValue="otp" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-5 h-10 bg-bg-muted rounded-lg">
            <TabsTrigger
              value="otp"
              className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-sm"
            >
              کد یک‌بار مصرف
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-sm"
            >
              رمز عبور
            </TabsTrigger>
          </TabsList>

          <TabsContent value="otp" className="mt-0">
            <OtpForm redirectTo={redirectTo} />
          </TabsContent>

          <TabsContent value="password" className="mt-0">
            <PasswordForm redirectTo={redirectTo} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-text-muted mt-5">
        با ورود به سایت،{' '}
        <a href="#" className="text-accent hover:underline">قوانین و مقررات</a>
        {' '}را می‌پذیرید.
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md bg-white rounded-2xl border border-border-soft p-8 animate-pulse">
        <div className="h-8 bg-bg-muted rounded-lg mb-5 mx-auto w-40" />
        <div className="space-y-3">
          <div className="h-11 bg-bg-muted rounded-lg" />
          <div className="h-11 bg-bg-muted rounded-lg" />
        </div>
      </div>
    }>
      <LoginCard />
    </Suspense>
  )
}
