'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BannerForm from '@/components/admin/BannerForm'
import { adminGetBanner, adminUpdateBanner, type Banner } from '@/lib/api/django'

export default function EditBannerPage() {
  const params = useParams()
  const id = Number(params.id)
  const [banner, setBanner] = useState<Banner | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = typeof document !== 'undefined'
    ? document.cookie.match(/afi_admin_token=([^;]+)/)?.[1]
    : null

  useEffect(() => {
    if (!token || !id) return
    adminGetBanner(token, id)
      .then(setBanner)
      .catch(() => setError('خطا در دریافت بنر'))
      .finally(() => setLoading(false))
  }, [id, token])

  const handleSubmit = async (formData: FormData) => {
    if (!token) throw new Error('توکن یافت نشد')
    await adminUpdateBanner(token, id, formData)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !banner) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || 'بنر یافت نشد'}</p>
        <Link href="/admin/banners" className="text-primary hover:underline">
          بازگشت به لیست بنرها
        </Link>
      </div>
    )
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
        <h1 className="text-2xl font-bold text-slate-900">ویرایش بنر</h1>
        <p className="text-slate-500 mt-1">ویرایش بنر «{banner.title}»</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <BannerForm banner={banner} onSubmit={handleSubmit} submitLabel="ذخیره تغییرات" />
      </div>
    </div>
  )
}
