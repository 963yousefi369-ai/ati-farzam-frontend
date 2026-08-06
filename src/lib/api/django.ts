const isServer = typeof window === 'undefined'

function getBaseUrl(): string {
  if (!isServer) return ''
  return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
}

const API_ORIGIN = getBaseUrl()

const INTERNAL_RE = /http:\/\/(localhost|127\.0\.0\.1|backend)(:\d+)?/g

// For <Image> src — keep media on the configured backend origin.
export function djangoImageUrl(url: string | null | undefined): string {
  if (!url) return ''
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  if (url.startsWith('/')) return `${publicApiUrl}${url}`
  if (/^https?:\/\//i.test(url)) return url.replace(INTERNAL_RE, publicApiUrl)
  return `${publicApiUrl}/media/${url.replace(/^media\//, '')}`
}

// For <Image> src — same as djangoImageUrl
export function publicImageUrl(url: string | null | undefined): string {
  return djangoImageUrl(url)
}

class ApiError extends Error {
  status: number
  body: Record<string, unknown> | null
  constructor(status: number, path: string, body: Record<string, unknown> | null) {
    super(`API error ${status}: ${path}`)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

// ── CRIT-02: Token refresh deduplication ──────────────────────
// When multiple requests get 401 simultaneously, only one refresh
// call is made. All other requests wait on the same promise.
let refreshPromise: Promise<string> | null = null

async function doRefresh(): Promise<string> {
  // Dynamic import to avoid circular dependency with auth store
  const { useAuthStore } = await import('@/lib/store/auth')
  const { refreshToken } = useAuthStore.getState()

  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const res = await fetch(`${API_ORIGIN}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  })

  if (!res.ok) {
    // Refresh token is invalid/expired — force logout
    useAuthStore.getState().logout()
    throw new Error('Refresh token expired')
  }

  const data = await res.json()
  useAuthStore.getState().updateTokens(data.access, data.refresh)
  return data.access
}

async function refreshAndGetToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

// ── Core request with auto-refresh on 401 ─────────────────────
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const makeHeaders = (token?: string) => ({
    'Content-Type': 'application/json',
    ...(init?.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  })

  let res = await fetch(`${API_ORIGIN}${path}`, {
    ...init,
    headers: makeHeaders(),
  })

  // CRIT-02: On 401, attempt a single token refresh and retry
  if (res.status === 401 && !isServer) {
    try {
      const newToken = await refreshAndGetToken()
      res = await fetch(`${API_ORIGIN}${path}`, {
        ...init,
        headers: makeHeaders(newToken),
      })
    } catch {
      // Refresh failed — the user is logged out inside doRefresh()
      // Re-throw the original 401 error below
    }
  }

  if (!res.ok) {
    let body: Record<string, unknown> | null = null
    try { body = await res.json() } catch { /* non-JSON error body */ }
    throw new ApiError(res.status, path, body)
  }
  return res.json()
}

export function getApiDetail(error: unknown): string | null {
  if (error instanceof ApiError && error.body) {
    const d = error.body.detail ?? error.body.message ?? error.body.error
    if (typeof d === 'string') return d
  }
  return null
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

// ─── TypeScript Interfaces ─────────────────────────────────────

export interface Category {
  id: number
  name: string
  slug: string
  image: string | null
}

export interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: string
  discount_price: string | null
  weight?: string
  stock: number
  image: string | null
  category?: Category | null
  effective_price?: string
  is_on_sale?: boolean
  view_count?: number
  meta_title?: string
  meta_description?: string
  images?: ProductImage[]
  features?: Array<{ text: string }>
  specifications?: Array<{ key: string; value: string }>
  faqs?: Array<{ question: string; answer: string }>
}

export interface ProductImage {
  id: number
  image: string
  alt_text: string
  order: number
  is_cover: boolean
}

export interface PaginatedResponse<T> {
  count: number
  page: number
  page_size: number
  total_pages: number
  results: T[]
}

export interface SiteSettings {
  site_name: string
  banner_text: string
  announcement: string
  primary_color: string
  maintenance_mode: boolean
  shop_enabled: boolean
  max_order_quantity: number
  social_instagram: string
  social_telegram: string
  support_phone: string
  support_email: string
  address: string
  work_hours: string
  logo: string | null
  hero_title: string
  hero_text: string
  hero_banner: string | null
  hero_bg_image: string | null
  about_us: string
  google_play_url: string
  app_store_url: string
  software_login_url: string
  software_description: string
  about_image: string | null
  software_image: string | null
  app_image: string | null
  otp_test_mode?: boolean
  // Fields that may come from CMS site-settings endpoint
  contact_phone?: string
  footer_text?: string
  email?: string
  instagram_url?: string
  telegram_url?: string
  social_links?: Record<string, string>
}

export interface Address {
  id: number
  title: string
  province: string
  city: string
  street: string
  postal_code: string
  is_default: boolean
}

export interface UserProfile {
  id: number
  phone_number: string
  full_name: string
  email: string | null
  national_id: string | null
  date_joined: string
}

export interface Order {
  id: number
  tracking_number: string
  postal_tracking: string
  carrier_name: string
  status: string
  status_display: string
  total_price: string
  shipping_cost: string
  created_at: string
  shipped_at: string | null
  delivered_at: string | null
  customer_notes: string
  shipping_address_snapshot: Record<string, string> | null
  items: OrderItem[]
  history: OrderStatusHistory[]
}

export interface OrderItem {
  product_name: string
  quantity: number
  unit_price: string
}

export interface OrderStatusHistory {
  status: string
  status_display: string
  note: string
  created_at: string
}

export interface ShippingMethod {
  id: number
  name: string
  slug: string
  cost: number
  estimated_days: string
}

// ─── Products ────────────────────────────────────────────────
export const getProducts = (params?: Record<string, string | number>) =>
  request<PaginatedResponse<Product>>(`/api/products?${new URLSearchParams(params as any)}`)

export const getProduct = (id: string | number) =>
  request<Product>(`/api/products/${id}`)

export const getCategories = () =>
  request<Category[]>('/api/categories')

// ─── Settings ───────────────────────────────────────────────
export const getSettings = () =>
  request<SiteSettings>('/api/settings')

// ─── Software Page ──────────────────────────────────────────
export const getSoftwarePage = () =>
  request<any>('/api/software-page')

// ─── Contact ────────────────────────────────────────────────
export const submitContact = (data: { name: string; phone: string; message: string }) =>
  request<{ detail: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })

// ─── Auth ───────────────────────────────────────────────────
// بک‌اند فیلد phone_number می‌خواد (نه phone)
export const sendOtp = (phone: string) =>
  request<{ detail: string }>('/api/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phone_number: phone }),
  })

// response: { access: string, refresh: string }
export const verifyOtp = (phone: string, code: string) =>
  request<{ access: string; refresh: string }>('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone_number: phone, code }),
  })

// response: { access: string, refresh: string }
export const login = (phone: string, password: string) =>
  request<{ access: string; refresh: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone_number: phone, password }),
  })

// profile: { id, phone_number, full_name, email, national_id, date_joined }
export const getProfile = (token: string) =>
  request<UserProfile>('/api/auth/profile', { headers: authHeaders(token) })

export const updateProfile = (token: string, data: Partial<UserProfile>) =>
  request<UserProfile>('/api/auth/profile', {
    method: 'PATCH', body: JSON.stringify(data), headers: authHeaders(token),
  })

export const changePassword = (token: string, data: {old_password: string; new_password: string}) =>
  request<{detail: string}>('/api/auth/change-password', {
    method: 'POST', body: JSON.stringify(data), headers: authHeaders(token),
  })

export const forgotPassword = (phone: string) =>
  request<{ detail: string }>('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ phone_number: phone }),
  })

// new_password (نه password)
export const resetPassword = (phone: string, code: string, newPassword: string) =>
  request<{ access: string; refresh: string }>('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ phone_number: phone, code, new_password: newPassword }),
  })

// ─── Addresses ──────────────────────────────────────────────
export const getAddresses = (token: string) =>
  request<Address[]>('/api/auth/addresses', { headers: authHeaders(token) })

export const addAddress = (token: string, data: Omit<Address, 'id'>) =>
  request<Address>('/api/auth/addresses', {
    method: 'POST', body: JSON.stringify(data), headers: authHeaders(token),
  })

export const deleteAddress = (token: string, addressId: number) =>
  request<any>(`/api/auth/addresses/${addressId}`, {
    method: 'DELETE', headers: authHeaders(token),
  })

// ─── Shipping ───────────────────────────────────────────────
export const getProvinces = () =>
  request<any[]>('/api/shipping/provinces')

export const getCities = (provinceId: number) =>
  request<any[]>(`/api/shipping/provinces/${provinceId}/cities`)

export const calculateShipping = (data: any) =>
  request<any>('/api/shipping/calculate', { method: 'POST', body: JSON.stringify(data) })

// ─── Orders ─────────────────────────────────────────────────
export const createOrder = (token: string, data: {address_id: number; shipping_method_id: number; items: Array<{product_id: number; quantity: number}>; idempotency_key?: string}) =>
  request<Order>('/api/orders', {
    method: 'POST', body: JSON.stringify(data), headers: authHeaders(token),
  })

// ─── CRIT-06: Stock reservation ─────────────────────────────
export const holdStock = (token: string, sessionKey: string, items: Array<{product_id: number; quantity: number}>) =>
  request<{ reserved: boolean; message: string }>('/api/stock/hold', {
    method: 'POST',
    body: JSON.stringify({ session_key: sessionKey, items }),
    headers: authHeaders(token),
  })

export const releaseStock = (token: string, sessionKey: string) =>
  request<{ detail: string }>(`/api/stock/release?session_key=${encodeURIComponent(sessionKey)}`, {
    method: 'POST',
    headers: authHeaders(token),
  })

export const getOrders = (token: string) =>
  request<Order[]>('/api/auth/orders', { headers: authHeaders(token) })

export const getOrder = (token: string, id: string, signal?: AbortSignal) =>
  request<Order>(`/api/auth/orders/${id}`, { headers: authHeaders(token), signal })

export const cancelOrder = (token: string, id: string) =>
  request<{detail: string}>(`/api/auth/orders/${id}`, {
    method: 'DELETE', headers: authHeaders(token),
  })

// ─── Payment ─────────────────────────────────────────────────
export const initiatePayment = (token: string, orderId: string) =>
  request<any>('/api/payment/initiate', {
    method: 'POST', body: JSON.stringify({ order_id: orderId }), headers: authHeaders(token),
  })

// ─── Blog ───────────────────────────────────────────────────
export interface DjangoBlogPost {
  id: number
  title: string
  slug: string
  content: string
  summary?: string
  featured_image: string | null
  published_at: string | null
  created_at: string
}

interface PaginatedBlogResponse {
  count: number
  page: number
  page_size: number
  total_pages: number
  results: DjangoBlogPost[]
}

export const getDjangoBlogs = async (pageSize: number = 100): Promise<DjangoBlogPost[]> => {
  const data = await request<PaginatedBlogResponse>(`/api/blog/posts?page_size=${pageSize}`)
  return data.results ?? []
}

export const getDjangoBlog = (slug: string) =>
  request<DjangoBlogPost>(`/api/blog/posts/${slug}`)

// ─── CMS ────────────────────────────────────────────────────
export interface Banner {
  id: number
  title: string
  subtitle: string
  image: string | null
  image_mobile?: string | null
  foreground_image?: string | null
  foreground_image_mobile?: string | null
  link: string
  cta_text: string
  cta_link: string
  cta2_text: string
  cta2_link: string
  // Optional foreground positioning metadata
  foreground_position?: string
  foreground_scale_mobile?: number
  foreground_scale_desktop?: number
  foreground_offset_y_mobile?: number
  foreground_offset_y_desktop?: number
}

export interface Partner {
  id: number
  name: string
  logo: string | null
  website: string
}

export interface Page {
  id: number
  title: string
  slug: string
  content: string
}

export const getBanners = () =>
  request<Banner[]>('/api/banners')

export const getPartners = () =>
  request<Partner[]>('/api/partners')

export const getPage = (slug: string) =>
  request<Page>(`/api/pages/${slug}`)

export const getCmsSiteSettings = () =>
  request<any>('/api/site-settings/')

export const adminGetBanners = (token: string) =>
  request<Banner[]>('/api/admin/banners', { headers: authHeaders(token) })

export const adminGetBanner = (token: string, id: string | number) =>
  request<Banner>(`/api/admin/banners/${id}`, { headers: authHeaders(token) })

export const adminCreateBanner = (token: string, data: FormData) =>
  request<Banner>('/api/admin/banners', {
    method: 'POST',
    body: data,
    headers: authHeaders(token),
  })

export const adminUpdateBanner = (token: string, id: string | number, data: FormData) =>
  request<Banner>(`/api/admin/banners/${id}`, {
    method: 'PATCH',
    body: data,
    headers: authHeaders(token),
  })

export const adminDeleteBanner = (token: string, id: string | number) =>
  request<void>(`/api/admin/banners/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
