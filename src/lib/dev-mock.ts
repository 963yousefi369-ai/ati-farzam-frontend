/**
 * Dev-only mock setup for backend-offline testing.
 * GATED: all logic is skipped in production.
 *
 * What it does (client-side only, dev only):
 * 1. Intercepts fetch() calls to /api/* and returns mock data
 * 2. Seeds useAuthStore with a mock user + token
 * 3. Seeds useCartStore with 3 mock items
 *
 * Import this file in your root layout or Providers component.
 * NEVER runs in production (process.env.NODE_ENV === 'production').
 */

export {} // make this a module

const IS_DEV = typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'

if (IS_DEV) {
  // Dynamic imports to avoid bundling in production
  import('@/__mocks__/checkout').then((mod) => {
    const {
      MOCK_USER,
      MOCK_TOKEN,
      MOCK_CART_ITEMS,
      MOCK_ADDRESSES,
      MOCK_PROVINCES,
      MOCK_CITIES,
      MOCK_SHIPPING_OPTIONS,
    } = mod

    // ── 1. Seed auth store ──────────────────────────────────────
    import('@/lib/store/auth').then(({ useAuthStore }) => {
      const { token } = useAuthStore.getState()
      if (!token) {
        useAuthStore.getState().setAuth(MOCK_TOKEN, 'mock-refresh-token', MOCK_USER)
      }
    })

    // ── 2. Seed cart store ──────────────────────────────────────
    import('@/lib/store/cart').then(({ useCartStore }) => {
      const { items } = useCartStore.getState()
      if (items.length === 0) {
        MOCK_CART_ITEMS.forEach((item) => {
          useCartStore.getState().addItem(item)
        })
      }
    })

    // ── 3. Intercept fetch for /api/* calls ─────────────────────
    const originalFetch = window.fetch
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url

      // Only intercept API calls
      if (!url.includes('/api/')) {
        return originalFetch(input, init)
      }

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 150 + Math.random() * 200))

      const method = (init?.method || 'GET').toUpperCase()

      // ── Auth endpoints ──────────────────────────────────────
      if (url.includes('/api/auth/send-otp')) {
        return mockJson({ detail: 'کد تأیید ارسال شد' })
      }
      if (url.includes('/api/auth/verify-otp')) {
        return mockJson({ access: MOCK_TOKEN, refresh: 'mock-refresh-token' })
      }
      if (url.includes('/api/auth/login')) {
        return mockJson({ access: MOCK_TOKEN, refresh: 'mock-refresh-token' })
      }
      if (url.includes('/api/auth/profile') && method === 'GET') {
        return mockJson(MOCK_USER)
      }
      if (url.includes('/api/auth/profile') && method === 'PATCH') {
        return mockJson({ ...MOCK_USER, ...JSON.parse(init?.body as string || '{}') })
      }

      // ── Addresses ───────────────────────────────────────────
      if (url.includes('/api/auth/addresses') && method === 'GET') {
        return mockJson(MOCK_ADDRESSES)
      }
      if (url.includes('/api/auth/addresses') && method === 'POST') {
        const body = JSON.parse(init?.body as string || '{}')
        return mockJson({ id: Date.now(), ...body })
      }

      // ── Shipping ────────────────────────────────────────────
      if (url.includes('/api/shipping/provinces') && !url.includes('/cities') && method === 'GET') {
        return mockJson(MOCK_PROVINCES)
      }
      if (url.match(/\/api\/shipping\/provinces\/\d+\/cities/) && method === 'GET') {
        const pid = Number(url.match(/\/provinces\/(\d+)\/cities/)?.[1] || 1)
        return mockJson(MOCK_CITIES[pid] || [])
      }
      if (url.includes('/api/shipping/calculate') && method === 'POST') {
        return mockJson(MOCK_SHIPPING_OPTIONS)
      }

      // ── Orders ──────────────────────────────────────────────
      if (url.includes('/api/orders') && method === 'POST') {
        return mockJson({
          id: 9001,
          status: 'pending_payment',
          total_price: 8500000,
          created_at: new Date().toISOString(),
        })
      }
      if (url.match(/\/api\/auth\/orders\/\d+$/) && method === 'GET') {
        return mockJson({
          id: 9001,
          status: 'paid',
          total_price: 8500000,
          shipping_cost: 85000,
          tracking_number: 'TRK-12345678',
          created_at: new Date().toISOString(),
          items: MOCK_CART_ITEMS.map((i) => ({
            product_name: i.name,
            quantity: i.quantity,
            unit_price: i.price,
          })),
          shipping_address_snapshot: MOCK_ADDRESSES[0],
          history: [
            { status_display: 'پرداخت شده', note: 'سفارش با موفقیت پرداخت شد' },
          ],
        })
      }
      if (url.match(/\/api\/auth\/orders\/\d+$/) && method === 'DELETE') {
        return mockJson({ detail: 'سفارش لغو شد' })
      }

      // ── Payment ─────────────────────────────────────────────
      if (url.includes('/api/payment/initiate') && method === 'POST') {
        return mockJson({ payment_url: null })
      }

      // ── Settings / generic ──────────────────────────────────
      if (url.includes('/api/settings')) {
        return mockJson({ shop_name: 'آتی فرزام ایرانیان', shop_open: true })
      }

      // Fallback: let it fail naturally (won't crash, just shows error)
      return originalFetch(input, init)
    }

    function mockJson(data: any): Response {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log(
      '%c[DEV MOCK] API interception active — all /api/* calls return mock data',
      'color: #f59e0b; font-weight: bold'
    )
  })
}
