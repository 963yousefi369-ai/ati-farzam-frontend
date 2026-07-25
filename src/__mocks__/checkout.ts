/**
 * Mock data for cart + checkout flow while backend is offline.
 * GATED: only consumed by src/lib/dev-mock.ts which checks NODE_ENV.
 */

export const MOCK_USER = {
  id: 1,
  phone_number: '09121234567',
  full_name: 'محمد رضایی',
  email: 'mohammad@example.com',
  national_id: '0012345678',
  is_staff: false,
}

export const MOCK_TOKEN = 'dev-mock-token-not-real'

export const MOCK_CART_ITEMS = [
  {
    product_id: 1,
    name: 'ردیاب GPS حرفه‌ای GT06N',
    price: 2500000,
    quantity: 1,
    imageUrl: '/placeholder-product.svg',
  },
  {
    product_id: 2,
    name: 'ردیاب آهنربایی A9',
    price: 1800000,
    quantity: 2,
    imageUrl: '/placeholder-product.svg',
  },
  {
    product_id: 3,
    name: 'ردیاب خودرو TK103B',
    price: 3100000,
    quantity: 1,
    imageUrl: '/placeholder-product.svg',
  },
]

export const MOCK_ADDRESSES = [
  {
    id: 101,
    title: 'خانه',
    province: 'تهران',
    city: 'تهران',
    street: 'خیابان ولیعصر، نبش کوچه گلستان، پلاک ۴۲، طبقه ۳',
    postal_code: '1234567890',
    is_default: true,
  },
  {
    id: 102,
    title: 'محل کار',
    province: 'تهران',
    city: 'تهران',
    street: 'خیابان آزادی، بلوار شهید اکبری، پلاک ۱۵۸، واحد ۷',
    postal_code: '9876543210',
    is_default: false,
  },
]

export const MOCK_PROVINCES = [
  { id: 1, name: 'تهران' },
  { id: 2, name: 'اصفهان' },
  { id: 3, name: 'خراسان رضوی' },
  { id: 4, name: 'فارس' },
  { id: 5, name: 'آذربایجان شرقی' },
]

export const MOCK_CITIES: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 10, name: 'تهران' },
    { id: 11, name: 'ری' },
    { id: 12, name: 'شهریار' },
    { id: 13, name: 'اسلامشهر' },
  ],
  2: [
    { id: 20, name: 'اصفهان' },
    { id: 21, name: 'کاشان' },
    { id: 22, name: 'خمینی شهر' },
  ],
  3: [
    { id: 30, name: 'مشهد' },
    { id: 31, name: 'نیشابور' },
    { id: 32, name: 'سبزوار' },
  ],
  4: [
    { id: 40, name: 'شیراز' },
    { id: 41, name: 'مرودشت' },
  ],
  5: [
    { id: 50, name: 'تبریز' },
    { id: 51, name: 'مراغه' },
  ],
}

export const MOCK_SHIPPING_OPTIONS = [
  {
    id: 1,
    name: 'پست پیشتاز',
    slug: 'pishtaz',
    carrier_name: 'پست جمهوری اسلامی',
    tracking_url_template: '',
    cost: 85000,
    min_days: 2,
    max_days: 4,
    method_type: 'pishtaz',
  },
  {
    id: 2,
    name: 'ارسال سفارشی',
    slug: 'sefareshi',
    carrier_name: 'پست',
    tracking_url_template: '',
    cost: 45000,
    min_days: 5,
    max_days: 7,
    method_type: 'sefareshi',
  },
  {
    id: 3,
    name: 'تیپاکس',
    slug: 'tipax',
    carrier_name: 'تیپاکس',
    tracking_url_template: '',
    cost: 120000,
    min_days: 1,
    max_days: 2,
    method_type: 'tipax',
  },
  {
    id: 4,
    name: 'پیک موتوری (فقط مشهد)',
    slug: 'pik',
    carrier_name: 'پیک',
    tracking_url_template: '',
    cost: 0,
    min_days: 0,
    max_days: 0,
    method_type: 'pik',
  },
]
