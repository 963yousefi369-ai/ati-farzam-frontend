'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.detail || 'خطا در ورود')
      }

      const data = await res.json()

      // Check if user is admin/staff
      const profileRes = await fetch('/api/auth/profile', {
        headers: { Authorization: `Bearer ${data.access}` },
      })

      if (!profileRes.ok) throw new Error('خطا در دریافت اطلاعات کاربر')

      const profile = await profileRes.json()

      if (!profile.is_staff) {
        throw new Error('شما دسترسی ادمین ندارید')
      }

      document.cookie = `afi_admin_token=${data.access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      router.push('/admin/banners')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'خطا در ورود')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <LayoutDashboard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ورود به پنل مدیریت</h1>
          <p className="text-slate-500 mt-2">آتی فرزام ایرانیان</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">شماره موبایل</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="09xxxxxxxxx"
              dir="ltr"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          <Button type="submit" className="w-full py-3 rounded-xl" disabled={loading}>
            {loading ? 'در حال ورود...' : 'ورود'}
          </Button>
        </form>
      </div>
    </div>
  )
}
