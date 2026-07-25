'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { adminGetBanners, adminDeleteBanner, djangoImageUrl, type Banner } from '@/lib/api/django'

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = typeof document !== 'undefined'
    ? document.cookie.match(/afi_admin_token=([^;]+)/)?.[1]
    : null

  const fetchBanners = async () => {
    if (!token) return
    try {
      setLoading(true)
      const data = await adminGetBanners(token)
      setBanners(data)
    } catch {
      setError('خطا در دریافت بنرها')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBanners() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('آیا از حذف این بنر مطمئن هستید؟')) return
    if (!token) return
    try {
      await adminDeleteBanner(token, id)
      setBanners((prev) => prev.filter((b) => b.id !== id))
    } catch {
      setError('خطا در حذف بنر')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">مدیریت بنرها</h1>
          <p className="text-slate-500 mt-1">بنرهای اسلایدر صفحه اصلی را مدیریت کنید</p>
        </div>
        <Link href="/admin/banners/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            بنر جدید
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-100 mb-6">
          {error}
        </div>
      )}

      {banners.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">هنوز بنری ایجاد نشده است</p>
          <Link href="/admin/banners/new">
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              اولین بنر را بسازید
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-right text-sm font-medium text-slate-500 px-6 py-4">تصویر</th>
                  <th className="text-right text-sm font-medium text-slate-500 px-6 py-4">عنوان</th>
                  <th className="text-right text-sm font-medium text-slate-500 px-6 py-4">دکمه اول</th>
                  <th className="text-right text-sm font-medium text-slate-500 px-6 py-4">دکمه دوم</th>
                  <th className="text-left text-sm font-medium text-slate-500 px-6 py-4">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4">
                      {banner.image ? (
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-slate-100">
                          <Image
                            src={djangoImageUrl(banner.image)}
                            alt={banner.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{banner.title}</p>
                      {banner.subtitle && (
                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{banner.subtitle}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{banner.cta_text || '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{banner.cta2_text || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/banners/${banner.id}/edit`}>
                          <button className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
