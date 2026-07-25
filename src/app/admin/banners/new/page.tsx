'use client'

import BannerForm from '@/components/admin/BannerForm'
import { adminCreateBanner } from '@/lib/api/django'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NewBannerPage() {
  const token = typeof document !== 'undefined'
    ? document.cookie.match(/afi_admin_token=([^;]+)/)?.[1]
    : null

  const handleSubmit = async (formData: FormData) => {
    if (!token) throw new Error('توکن یافت نشد')
    await adminCreateBanner(token, formData)
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/banners"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به لیست بنرها
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">بنر جدید</h1>
        <p className="text-slate-500 mt-1">یک بنر جدید برای اسلایدر صفحه اصلی ایجاد کنید</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <BannerForm onSubmit={handleSubmit} submitLabel="ایجاد بنر" />
      </div>
    </div>
  )
}
