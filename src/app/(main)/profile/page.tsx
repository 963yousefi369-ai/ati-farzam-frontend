'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, User, Mail, Phone, CreditCard, ShoppingBag, MapPin, ChevronLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthStore } from '@/lib/store/auth'
import { getProfile, updateProfile, getOrders, getAddresses } from '@/lib/api/django'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'

const schema = z.object({
  full_name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل نامعتبر').or(z.literal('')).optional(),
  national_id: z.string().length(10, 'کد ملی باید ۱۰ رقم باشد').or(z.literal('')).optional(),
})
type FormData = z.infer<typeof schema>

export default function ProfilePage() {
  const { token, user, updateUser } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [orderCount, setOrderCount] = useState(0)
  const [addressCount, setAddressCount] = useState(0)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: '', email: '', national_id: '' },
  })

  useEffect(() => {
    if (!token) return
    Promise.all([
      getProfile(token),
      getOrders(token).catch(() => []),
      getAddresses(token).catch(() => []),
    ])
      .then(([profile, orders, addrs]) => {
        form.reset({
          full_name: profile.full_name ?? '',
          email: profile.email ?? '',
          national_id: profile.national_id ?? '',
        })
        setOrderCount(orders.length)
        setAddressCount(addrs.length)
      })
      .catch(() => toast.error('خطا در بارگذاری اطلاعات'))
      .finally(() => setLoading(false))
  }, [token])

  const onSubmit = async (data: FormData) => {
    if (!token) return
    setSaving(true)
    try {
      const updated = await updateProfile(token, data)
      if (user) updateUser(updated)
      toast.success('اطلاعات با موفقیت ذخیره شد')
    } catch {
      toast.error('خطا در ذخیره اطلاعات')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <BreadcrumbTrail dark={false} />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map(i => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
        <Skeleton className="h-5 w-40" />
        <Card className="max-w-xl rounded-2xl border border-border-soft">
          <CardHeader><CardTitle>اطلاعات حساب</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-full" />)}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <BreadcrumbTrail dark={false} />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/profile/orders">
          <Card className="rounded-2xl border border-border-soft hover:border-accent/20 transition-colors group" style={{ boxShadow: 'var(--shadow-card)' }}>
            <CardContent className="p-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-text-heading">{orderCount}</p>
                <p className="text-xs text-text-muted">سفارش</p>
              </div>
              <ChevronLeft className="w-4 h-4 text-text-muted mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile/addresses">
          <Card className="rounded-2xl border border-border-soft hover:border-accent/20 transition-colors group" style={{ boxShadow: 'var(--shadow-card)' }}>
            <CardContent className="p-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-violet-600" />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-text-heading">{addressCount}</p>
                <p className="text-xs text-text-muted">آدرس ذخیره‌شده</p>
              </div>
              <ChevronLeft className="w-4 h-4 text-text-muted mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Account info */}
      <Card className="max-w-xl rounded-2xl border border-border-soft" style={{ boxShadow: 'var(--shadow-card)' }}>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <User className="w-4 h-4 text-teal-600" />
            </span>
            <CardTitle className="text-text-heading text-base">اطلاعات حساب</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <div className="space-y-1.5">
                <Label className="text-text-muted flex items-center gap-2 text-sm">
                  <Phone className="w-3.5 h-3.5" />
                  شماره موبایل
                </Label>
                <Input
                  value={user?.phone_number ?? ''}
                  disabled
                  className="bg-bg-muted text-text-muted cursor-not-allowed rounded-xl"
                  dir="ltr"
                />
                <p className="text-xs text-text-muted">قابل ویرایش نیست — با OTP وارد شده‌اید</p>
              </div>

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      نام و نام خانوادگی
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="نام و نام خانوادگی…" className="rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      ایمیل <span className="text-text-muted text-xs">(اختیاری)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com…" dir="ltr" className="rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="national_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5" />
                      کد ملی <span className="text-text-muted text-xs">(اختیاری)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="۱۰ رقم…" maxLength={10} dir="ltr" className="rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-1">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-primary hover:bg-primary-dark text-white px-6 gap-2 rounded-xl"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}
