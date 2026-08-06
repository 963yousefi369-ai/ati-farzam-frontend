/**
 * Temporary mock data for visual verification while backend is offline.
 * GATED: only used when API fails or returns empty — never overrides real data.
 */

const PLACEHOLDER = '/placeholder-product.svg'

export const MOCK_PRODUCT_LIST = [
  {
    id: 'mock-1',
    name: 'ردیاب GPS حرفه‌ای GT06N',
    price: 2500000,
    compare_price: 3200000,
    in_stock: true,
    stock: 15,
    slug: 'gps-tracker-gt06n',
  },
  {
    id: 'mock-2',
    name: 'ردیاب آهنربایی A9',
    price: 1800000,
    compare_price: 2400000,
    in_stock: true,
    stock: 8,
    slug: 'magnetic-tracker-a9',
  },
  {
    id: 'mock-3',
    name: 'ردیاب خودرو TK103B',
    price: 3100000,
    compare_price: undefined,
    in_stock: true,
    stock: 5,
    slug: 'car-tracker-tk103b',
  },
  {
    id: 'mock-4',
    name: 'ردیاب شخصی Mini GPS',
    price: 950000,
    compare_price: 1200000,
    in_stock: false,
    stock: 0,
    slug: 'personal-mini-gps',
  },
  {
    id: 'mock-5',
    name: 'ردیاب موتورسیکلت GT02D',
    price: 1450000,
    compare_price: 1800000,
    in_stock: true,
    stock: 12,
    slug: 'motorcycle-tracker-gt02d',
  },
  {
    id: 'mock-6',
    name: 'ردیاب حیوانات خانگی Pet Tracker',
    price: 2200000,
    compare_price: undefined,
    in_stock: true,
    stock: 3,
    slug: 'pet-tracker',
  },
  {
    id: 'mock-7',
    name: 'ردیاب دو سیم‌کارته TK905',
    price: 2800000,
    compare_price: 3500000,
    in_stock: true,
    stock: 7,
    slug: 'dual-sim-tk905',
  },
  {
    id: 'mock-8',
    name: 'ردیاب ضد آب WG-01',
    price: 1650000,
    compare_price: undefined,
    in_stock: false,
    stock: 0,
    slug: 'waterproof-wg01',
  },
]

export const MOCK_PRODUCT_DETAIL = {
  id: 'mock-1',
  name: 'ردیاب GPS حرفه‌ای GT06N',
  slug: 'gps-tracker-gt06n',
  price: 2500000,
  compare_price: 3200000,
  effective_price: 2500000,
  description:
    'ردیاب GPS حرفه‌ای مدل GT06N با دقت بالا و قابلیت ردیابی لحظه‌ای. مناسب برای خودرو، موتورسیکلت و ناوگان حمل‌ونقل. پشتیبانی از اپلیکیشن موبایل و پنل وب فارسی با امکان مشاهده مسیرهای پیموده شده، تنظیم حصار جغرافیایی و دریافت هشدار لحظه‌ای.',
  sku: 'GT06N-001',
  in_stock: true,
  stock: 15,
  weight: 0.45,
  category_id: 1,
  image: PLACEHOLDER,
  images: [PLACEHOLDER],
  features: [
    'ردیابی لحظه‌ای با دقت ۲٫۵ متر',
    'باتری داخلی با شارژدهی تا ۱۲ ساعت',
    'هشدار سرعت غیرمجاز',
    'هشدار خروج از حصار جغرافیایی',
    'پشتیبانی از اپلیکیشن فارسی iOS و Android',
    'قابلیت شنود صدای محیط',
    'هشدار لرزش و جابجایی',
    'پشتیبانی از پنل وب فارسی',
  ],
  specifications: {
    'مدل': 'GT06N',
    'شبکه': '2G GSM',
    'فرکانس': '850/900/1800/1900 MHz',
    'دقت GPS': '۲٫۵ متر',
    'باتری': 'لیتیوم ۳٫۷V / 450mAh',
    'شارژدهی': 'تا ۱۲ ساعت',
    'ابعاد': '۴۷ × ۲۴ × ۱۵ میلی‌متر',
    'وزن': '۴۵ گرم',
    'مقاومت': 'IPX4 — مقاوم در برابر پاشش آب',
    'دمای کارکرد': '۲۰- تا ۵۵+ درجه سانتی‌گراد',
  },
  faqs: [
    {
      q: 'آیا این ردیاب نیاز به سیم‌کارت دارد؟',
      a: 'بله، این ردیاب با سیم‌کارت معمولی (Mini SIM) کار می‌کند. توصیه می‌شود از سیم‌کارت با بسته اینترنت فعال استفاده کنید.',
    },
    {
      q: 'آیا نصب ردیاب نیاز به متخصص دارد؟',
      a: 'خیر، نصب GT06N بسیار ساده است. کافیست سیم‌کارت را وارد کرده و دستگاه را به منبع تغذیه خودرو متصل کنید. راهنمای کامل نصب در جعبه موجود است.',
    },
    {
      q: 'آیا امکان ردیابی چند خودرو به صورت هم‌زمان وجود دارد؟',
      a: 'بله، با استفاده از پنل وب فارسی می‌توانید تعداد نامحدودی ردیاب را به صورت هم‌زمان مدیریت و ردیابی کنید.',
    },
    {
      q: 'گارانتی محصول چقدر است؟',
      a: 'این محصول دارای ۱۲ ماه گارانتی تعویض و ۲۴ ماه خدمات پس از فروش است.',
    },
  ],
}

export const MOCK_SIMILAR_PRODUCTS = [
  {
    id: 'mock-2',
    name: 'ردیاب آهنربایی A9',
    price: 1800000,
    compare_price: 2400000,
    in_stock: true,
    stock: 8,
    slug: 'magnetic-tracker-a9',
    _imageUrl: PLACEHOLDER,
  },
  {
    id: 'mock-3',
    name: 'ردیاب خودرو TK103B',
    price: 3100000,
    compare_price: undefined,
    in_stock: true,
    stock: 5,
    slug: 'car-tracker-tk103b',
    _imageUrl: PLACEHOLDER,
  },
  {
    id: 'mock-5',
    name: 'ردیاب موتورسیکلت GT02D',
    price: 1450000,
    compare_price: 1800000,
    in_stock: true,
    stock: 12,
    slug: 'motorcycle-tracker-gt02d',
    _imageUrl: PLACEHOLDER,
  },
  {
    id: 'mock-7',
    name: 'ردیاب دو سیم‌کارته TK905',
    price: 2800000,
    compare_price: 3500000,
    in_stock: true,
    stock: 7,
    slug: 'dual-sim-tk905',
    _imageUrl: PLACEHOLDER,
  },
]

export const MOCK_CATEGORIES = [
  { id: '1', name: 'ردیاب خودرو' },
  { id: '2', name: 'ردیاب شخصی' },
  { id: '3', name: 'ردیاب موتورسیکلت' },
  { id: '4', name: 'ردیاب حیوانات' },
]

export const MOCK_IMAGE_MAP: Record<string, string> = Object.fromEntries(
  MOCK_PRODUCT_LIST.map((p) => [String(p.id), PLACEHOLDER])
)

export const MOCK_IMAGES: string[] = [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER]
