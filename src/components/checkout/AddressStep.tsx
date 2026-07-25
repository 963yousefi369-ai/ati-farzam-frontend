'use client'
import { useEffect, useState } from 'react'
import { Check, Plus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, normalizeDigits } from '@/lib/utils'
import { getAddresses, addAddress, getProvinces, getCities } from '@/lib/api/django'

interface AddressStepProps {
  token: string
  selectedId: number | null
  onSelect: (id: number, addressObj?: any) => void
  onNext: () => void
}

interface FieldErrors {
  postal_code?: string
  street?: string
  province_id?: string
  city_id?: string
}

export default function AddressStep({ token, selectedId, onSelect, onNext }: AddressStepProps) {
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [provinces, setProvinces] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const [form, setForm] = useState({
    title: '',
    province_id: '',
    province_name: '',
    city_id: '',
    city_name: '',
    street: '',
    postal_code: '',
  })

  useEffect(() => {
    const load = async () => {
      try {
        const [addrs, provs] = await Promise.all([getAddresses(token), getProvinces()])
        setAddresses(addrs)
        setProvinces(provs)
        if (addrs.length > 0 && !selectedId) onSelect(addrs[0].id, addrs[0])
      } catch {
        setLoadError('خطا در بارگذاری آدرس‌ها. لطفاً صفحه را رفرش کنید.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token])

  const handleProvinceChange = async (provinceId: string) => {
    const province = provinces.find((p) => String(p.id) === provinceId)
    setForm((f) => ({
      ...f,
      province_id: provinceId,
      province_name: province?.name ?? '',
      city_id: '',
      city_name: '',
    }))
    setFieldErrors((e) => ({ ...e, province_id: undefined, city_id: undefined }))
    setCities([])
    try {
      const c = await getCities(Number(provinceId))
      setCities(c)
    } catch {
      // ignore
    }
  }

  const handleCityChange = (cityId: string) => {
    const city = cities.find((c) => String(c.id) === cityId)
    setForm((f) => ({
      ...f,
      city_id: cityId,
      city_name: city?.name ?? '',
    }))
    setFieldErrors((e) => ({ ...e, city_id: undefined }))
  }

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'postal_code': {
        const normalized = normalizeDigits(value).replace(/\D/g, '')
        if (!normalized) return 'کد پستی الزامی است'
        if (normalized.length !== 10) return 'کد پستی باید ۱۰ رقم باشد'
        return undefined
      }
      case 'street':
        if (!value.trim()) return 'آدرس دقیق الزامی است'
        if (value.trim().length < 10) return 'آدرس باید حداقل ۱۰ حرف باشد'
        return undefined
      case 'province_id':
        if (!value) return 'انتخاب استان الزامی است'
        return undefined
      case 'city_id':
        if (!value) return 'انتخاب شهر الزامی است'
        return undefined
      default:
        return undefined
    }
  }

  const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value)
    setFieldErrors((e) => ({ ...e, [field]: error }))
  }

  const handleSave = async () => {
    // Validate all fields
    const errors: FieldErrors = {
      postal_code: validateField('postal_code', form.postal_code),
      street: validateField('street', form.street),
      province_id: validateField('province_id', form.province_id),
      city_id: validateField('city_id', form.city_id),
    }
    setFieldErrors(errors)
    if (Object.values(errors).some(Boolean)) return

    setSaving(true)
    setSaveError('')
    try {
      const newAddr = await addAddress(token, {
        title: form.title || 'آدرس جدید',
        province: form.province_name,
        city: form.city_name,
        street: form.street,
        postal_code: form.postal_code,
        is_default: addresses.length === 0,
      })
      setAddresses((prev) => [...prev, newAddr])
      onSelect(newAddr.id, newAddr)
      setShowForm(false)
      setForm({ title: '', province_id: '', province_name: '', city_id: '', city_name: '', street: '', postal_code: '' })
      setFieldErrors({})
    } catch (e: any) {
      setSaveError('خطا در ذخیره آدرس. لطفاً دوباره تلاش کنید.')
    } finally {
      setSaving(false)
    }
  }

  const handleCardKeyDown = (e: React.KeyboardEvent, addrId: number, addr: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(addrId, addr)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary mb-4">انتخاب آدرس تحویل</h2>
        {[1, 2].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary mb-4">انتخاب آدرس تحویل</h2>
        <Card className="border-error/20 bg-error-light">
          <CardContent className="p-4 text-center space-y-3">
            <p className="text-error text-sm">{loadError}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-text-primary mb-4" id="address-step-heading">انتخاب آدرس تحویل</h2>

      <div role="radiogroup" aria-labelledby="address-step-heading" className="space-y-3">
        {addresses.map((addr) => {
          const isSelected = selectedId === addr.id
          return (
            <Card
              key={addr.id}
              role="radio"
              tabIndex={0}
              aria-checked={isSelected}
              onClick={() => onSelect(addr.id, addr)}
              onKeyDown={(e) => handleCardKeyDown(e, addr.id, addr)}
              className={cn(
                'cursor-pointer transition-all border-2 active:scale-[0.98]',
                isSelected
                  ? 'border-navy bg-primary/5 shadow-[var(--shadow-primary)]'
                  : 'border-border-default hover:border-primary/40'
              )}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0',
                    isSelected ? 'border-navy bg-primary' : 'border-border-default'
                  )}
                  aria-hidden="true"
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text-primary text-sm">
                    {addr.title || 'آدرس'}
                  </p>
                  <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                    {addr.province} — {addr.city} — {addr.street}
                  </p>
                  {addr.postal_code && (
                    <p className="text-text-tertiary text-xs mt-1">
                      کد پستی: {addr.postal_code}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add new address */}
      <Button
        variant="outline"
        className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5 gap-2"
        onClick={() => setShowForm((v) => !v)}
        aria-expanded={showForm}
        aria-controls="new-address-form"
      >
        {showForm ? <ChevronDown className="w-4 h-4" aria-hidden="true" /> : <Plus className="w-4 h-4" aria-hidden="true" />}
        {showForm ? 'بستن فرم' : 'افزودن آدرس جدید'}
      </Button>

      {showForm && (
        <Card id="new-address-form" className="border-primary/20">
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addr-title">عنوان آدرس</Label>
                <Input
                  id="addr-title"
                  placeholder="مثال: خانه، محل کار"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addr-postal">کد پستی *</Label>
                <Input
                  id="addr-postal"
                  placeholder="۱۰ رقم"
                  dir="ltr"
                  value={form.postal_code}
                  onChange={(e) => {
                    const normalized = normalizeDigits(e.target.value).replace(/\D/g, '')
                    setForm((f) => ({ ...f, postal_code: normalized }))
                    if (fieldErrors.postal_code) setFieldErrors((fe) => ({ ...fe, postal_code: undefined }))
                  }}
                  onBlur={() => handleBlur('postal_code', form.postal_code)}
                  aria-invalid={!!fieldErrors.postal_code}
                  aria-describedby={fieldErrors.postal_code ? 'err-postal' : undefined}
                  maxLength={10}
                  inputMode="numeric"
                />
                {fieldErrors.postal_code && (
                  <p id="err-postal" className="text-error text-xs" role="alert">{fieldErrors.postal_code}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="addr-province">استان *</Label>
                <Select value={form.province_id} onValueChange={handleProvinceChange}>
                  <SelectTrigger
                    id="addr-province"
                    aria-invalid={!!fieldErrors.province_id}
                    aria-describedby={fieldErrors.province_id ? 'err-province' : undefined}
                  >
                    <SelectValue placeholder="انتخاب استان" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.province_id && (
                  <p id="err-province" className="text-error text-xs" role="alert">{fieldErrors.province_id}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="addr-city">شهر *</Label>
                <Select
                  value={form.city_id}
                  onValueChange={handleCityChange}
                  disabled={!form.province_id || cities.length === 0}
                >
                  <SelectTrigger
                    id="addr-city"
                    aria-invalid={!!fieldErrors.city_id}
                    aria-describedby={fieldErrors.city_id ? 'err-city' : undefined}
                  >
                    <SelectValue placeholder={form.province_id ? 'انتخاب شهر' : 'ابتدا استان انتخاب کنید'} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.city_id && (
                  <p id="err-city" className="text-error text-xs" role="alert">{fieldErrors.city_id}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addr-street">آدرس دقیق *</Label>
              <Textarea
                id="addr-street"
                placeholder="خیابان، کوچه، پلاک..."
                rows={3}
                value={form.street}
                onChange={(e) => {
                  setForm((f) => ({ ...f, street: e.target.value }))
                  if (fieldErrors.street) setFieldErrors((fe) => ({ ...fe, street: undefined }))
                }}
                onBlur={() => handleBlur('street', form.street)}
                aria-invalid={!!fieldErrors.street}
                aria-describedby={fieldErrors.street ? 'err-street' : undefined}
              />
              {fieldErrors.street && (
                <p id="err-street" className="text-error text-xs" role="alert">{fieldErrors.street}</p>
              )}
            </div>

            {saveError && (
              <p className="text-error text-sm bg-error-light border border-error/20 rounded-lg p-2" role="alert">{saveError}</p>
            )}

            <Button
              className="w-full bg-primary hover:bg-primary-dark text-white"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'در حال ذخیره...' : 'ذخیره آدرس'}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-start pt-4">
        <Button
          className="bg-primary hover:bg-primary-dark text-white px-8"
          onClick={onNext}
          disabled={!selectedId}
        >
          مرحله بعد
        </Button>
      </div>
    </div>
  )
}
