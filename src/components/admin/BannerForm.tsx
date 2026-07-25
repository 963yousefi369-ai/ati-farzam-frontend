'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { djangoImageUrl, type Banner } from '@/lib/api/django'

interface BannerFormProps {
  banner?: Banner
  onSubmit: (data: FormData) => Promise<void>
  submitLabel?: string
}

export default function BannerForm({ banner, onSubmit, submitLabel = 'ذخیره' }: BannerFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(
    banner?.image ? djangoImageUrl(banner.image) : null
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)

  const [showPositioning, setShowPositioning] = useState(false)
  const [form, setForm] = useState({
    title: banner?.title || '',
    subtitle: banner?.subtitle || '',
    cta_text: banner?.cta_text || '',
    cta_link: banner?.cta_link || '',
    cta2_text: banner?.cta2_text || '',
    cta2_link: banner?.cta2_link || '',
    link: banner?.link || '',
    foreground_position: (banner as any)?.foreground_position || '',
    foreground_scale_mobile: (banner as any)?.foreground_scale_mobile?.toString() || '',
    foreground_scale_desktop: (banner as any)?.foreground_scale_desktop?.toString() || '',
    foreground_offset_y_mobile: (banner as any)?.foreground_offset_y_mobile?.toString() || '',
    foreground_offset_y_desktop: (banner as any)?.foreground_offset_y_desktop?.toString() || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('فایل انتخاب شده تصویر نیست')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('حجم تصویر نباید بیشتر از 5 مگابایت باشد')
      return
    }

    setError('')
    setImageFile(file)
    setRemoveImage(false)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setRemoveImage(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.title.trim()) {
      setError('عنوان بنر الزامی است')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('subtitle', form.subtitle)
      formData.append('cta_text', form.cta_text)
      formData.append('cta_link', form.cta_link)
      formData.append('cta2_text', form.cta2_text)
      formData.append('cta2_link', form.cta2_link)
      formData.append('link', form.link)

      // Positioning metadata (optional — backend will ignore if not supported)
      if (form.foreground_position) formData.append('foreground_position', form.foreground_position)
      if (form.foreground_scale_mobile) formData.append('foreground_scale_mobile', form.foreground_scale_mobile)
      if (form.foreground_scale_desktop) formData.append('foreground_scale_desktop', form.foreground_scale_desktop)
      if (form.foreground_offset_y_mobile) formData.append('foreground_offset_y_mobile', form.foreground_offset_y_mobile)
      if (form.foreground_offset_y_desktop) formData.append('foreground_offset_y_desktop', form.foreground_offset_y_desktop)

      if (imageFile) {
        formData.append('image', imageFile)
      }
      if (removeImage) {
        formData.append('image', '')
      }

      await onSubmit(formData)
      router.push('/admin/banners')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'خطا در ذخیره بنر')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-100">
          {error}
        </div>
      )}

      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">تصویر بنر</label>
        <p className="text-xs text-slate-400 mb-3">
          تصویر با نسبت ۱۶:۹ و حداقل عرض ۱۲۰۰ پیکسل پیشنهاد می‌شود. فرمت‌های JPG, PNG, WebP پذیرفته می‌شوند.
        </p>

        {imagePreview ? (
          <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src={imagePreview}
              alt="پیش‌نمایش"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-2xl aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-primary/40 bg-slate-50/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            <Upload className="w-8 h-8 text-slate-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">برای آپلود تصویر کلیک کنید</p>
              <p className="text-xs text-slate-400 mt-1">یا فایل را بکشید و رها کنید</p>
            </div>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">عنوان *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="مثال: ردیاب‌های GPS پیشرفته"
          required
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">زیرعنوان</label>
        <textarea
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          placeholder="توضیحات کوتاه درباره بنر"
        />
      </div>

      {/* CTA buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">متن دکمه اول</label>
          <input
            name="cta_text"
            value={form.cta_text}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="مشاهده محصولات"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">لینک دکمه اول</label>
          <input
            name="cta_link"
            value={form.cta_link}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="/products"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">متن دکمه دوم</label>
          <input
            name="cta2_text"
            value={form.cta2_text}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="مشاوره رایگان"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">لینک دکمه دوم</label>
          <input
            name="cta2_link"
            value={form.cta2_link}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="/contact"
            dir="ltr"
          />
        </div>
      </div>

      {/* Link */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">لینک کلی بنر (اختیاری)</label>
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="https://example.com"
          dir="ltr"
        />
      </div>

      {/* Foreground image positioning (optional advanced) */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowPositioning(!showPositioning)}
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span>تنظیمات موقعیت‌دهی تصویر پیش‌زمینه (اختیاری)</span>
          <span className="text-slate-400 text-xs">{showPositioning ? 'بستن' : 'باز کردن'}</span>
        </button>
        {showPositioning && (
          <div className="px-4 pb-4 space-y-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 pt-3">
              این مقادیر برای کنترل دقیق موقعیت تصویر پیش‌زمینه در اسلایدر استفاده می‌شوند. خالی بگذارید تا مقادیر پیش‌فرض استفاده شود.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">موقعیت تصویر</label>
                <select
                  name="foreground_position"
                  value={form.foreground_position}
                  onChange={(e) => setForm((prev) => ({ ...prev, foreground_position: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">پیش‌فرض (پایین-وسط)</option>
                  <option value="bottom-center">پایین-وسط</option>
                  <option value="bottom-left">پایین-چپ</option>
                  <option value="center">وسط</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">مقیاس موبایل (0.3–0.8)</label>
                <input
                  name="foreground_scale_mobile"
                  type="number"
                  step="0.05"
                  min="0.3"
                  max="0.8"
                  value={form.foreground_scale_mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.6"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">مقیاس دسکتاپ (0.3–0.7)</label>
                <input
                  name="foreground_scale_desktop"
                  type="number"
                  step="0.05"
                  min="0.3"
                  max="0.7"
                  value={form.foreground_scale_desktop}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.45"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">افست عمودی موبایل (px)</label>
                <input
                  name="foreground_offset_y_mobile"
                  type="number"
                  step="5"
                  min="-100"
                  max="100"
                  value={form.foreground_offset_y_mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">افست عمودی دسکتاپ (px)</label>
                <input
                  name="foreground_offset_y_desktop"
                  type="number"
                  step="5"
                  min="-100"
                  max="100"
                  value={form.foreground_offset_y_desktop}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <Button type="submit" disabled={loading} className="gap-2">
          {loading ? 'در حال ذخیره...' : submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          انصراف
        </Button>
      </div>
    </form>
  )
}
