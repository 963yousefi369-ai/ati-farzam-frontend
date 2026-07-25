/* ── Landing Page Data ──
   All repeated content lives here so backend integration is trivial.
   Replace these arrays/objects with API responses when ready. */

export const landingData = {
  /* ── Top Utility Bar ── */
  utilityBar: {
    freeShipping: 'ارسال رایگان برای سفارش‌های بالای ۱٬۰۰۰٬۰۰۰ تومان',
    phone: '۰۲۱-۹۱۰۰۹۱۲۰',
    phoneRaw: '02191009120',
    support: 'پشتیبانی ۲۴/۷',
  },

  /* ── Navbar ── */
  navLinks: [
    { href: '/', label: 'خانه' },
    { href: '/products', label: 'محصولات', hasDropdown: true },
    { href: '/software', label: 'نرم‌افزار' },
    { href: '/blog', label: 'وبلاگ' },
    { href: '/contact', label: 'تماس با ما' },
  ],

  /* ── Hero ── */
  hero: {
    heading1: 'ردیاب‌های',
    headingGPS: 'GPS',
    heading2: 'پیشرفته',
    subtitle: 'امنیت، آرامش و کنترل هوشمند ناوگان و خودرو با بهترین ردیاب‌های بازار ایران',
    cta1: 'مشاهده محصولات',
    cta2: 'درباره ما',
    miniCards: [
      { icon: 'speedometer', value: '۶۵ km/h', sublabel: '' },
      { icon: 'pin', value: 'تهران، ولیعصر', sublabel: '' },
      { icon: 'chart', value: 'آنلاین', sublabel: '' },
    ],
  },

  /* ── Hero Stats ── */
  heroStats: [
    { icon: 'headset', label: 'پشتیبانی آنلاین ۲۴/۷' },
    { icon: 'users', label: '+۶٬۰۰۰ مشتری راضی' },
    { icon: 'shield', label: '۴۰+ مدل متنوع' },
  ],

  /* ── Partners ── */
  partners: [
    { id: '1', name: 'تاکسیرانی تهران' },
    { id: '2', name: 'حمل و نقل پارس' },
    { id: '3', name: 'ناوگان آریا' },
    { id: '4', name: 'لجستیک ستاره' },
    { id: '5', name: 'باربری ایران' },
    { id: '6', name: 'خدمات شهری البرز' },
    { id: '7', name: 'پست پیشتاز' },
  ],

  /* ── Categories ── */
  categories: [
    { id: 'vehicle', href: '/products?cat=vehicle', label: 'ردیاب خودرو', icon: 'car', highlighted: false },
    { id: 'personal', href: '/products?cat=personal', label: 'ردیاب شخصی', icon: 'user', highlighted: true },
    { id: 'motorcycle', href: '/products?cat=motorcycle', label: 'ردیاب موتور سیکلت', icon: 'motorcycle', highlighted: false },
    { id: 'fleet', href: '/products?cat=fleet', label: 'ردیاب سنگین و ناوگان', icon: 'truck', highlighted: false },
  ],

  /* ── Featured Products ── */
  products: [
    {
      id: 'p1',
      slug: 'gps-tracker-atf-rg110',
      name: 'ردیاب ATF RG110',
      rating: 5,
      reviewsCount: 128,
      price: 2500000,
      badge: null,
      featured: false,
    },
    {
      id: 'p2',
      slug: 'magnetic-tracker-a9',
      name: 'ردیاب مغناطیسی مدل A9',
      rating: 4,
      reviewsCount: 95,
      price: 3200000,
      badge: null,
      featured: false,
    },
    {
      id: 'p3',
      slug: 'tracker-at4',
      name: 'ردیاب خودرو مدل AT4',
      rating: 5,
      reviewsCount: 210,
      price: 1800000,
      badge: 'پرفروش',
      featured: true,
    },
    {
      id: 'p4',
      slug: 'tracker-at1',
      name: 'ردیاب شخصی مدل AT1',
      rating: 4,
      reviewsCount: 76,
      price: 1500000,
      badge: null,
      featured: false,
    },
  ],

  /* ── Platform Showcase ── */
  platform: {
    heading: 'پلتفرم ردیابی هوشمند',
    subtitle: 'کنترل لحظه‌ای، گزارش‌گیری پیشرفته و هشدارهای هوشمند روی پلتفرم یکپارچه آتی فرزام',
    features: [
      { icon: 'pin', label: 'موقعیت لحظه‌ای' },
      { icon: 'shield', label: 'هشدارهای هوشمند' },
      { icon: 'chart', label: 'گزارش‌های دقیق' },
      { icon: 'route', label: 'تاریخچه مسیر' },
    ],
    cta: 'ورود به پنل کاربری',
  },

  /* ── Newsletter ── */
  newsletter: {
    heading: 'از جدیدترین محصولات و تخفیف‌ها مطلع شوید!',
    subtitle: 'با عضویت در خبرنامه، اولین نفری باشید که از تخفیف‌ها و محصولات جدید مطلع می‌شوید.',
    placeholder: 'ایمیل خود را وارد کنید',
    button: 'عضویت در خبرنامه',
  },

  /* ── Footer ── */
  footer: {
    brand: 'آتی فرزام',
    tagline: 'ردیاب‌های پیشرفته',
    about: 'شرکت آتی فرزام ایرانیان با بیش از یک دهه تجربه در حوزه ردیابی GPS، راهکارهای جامع مدیریت ناوگان و امنیت خودرو را ارائه می‌دهد.',
    quickLinks: [
      { href: '/about', label: 'درباره ما' },
      { href: '/contact', label: 'تماس با ما' },
      { href: '/faq', label: 'سوالات متداول' },
      { href: '/terms', label: 'شرایط و قوانین' },
      { href: '/privacy', label: 'حریم خصوصی' },
    ],
    services: [
      { href: '/support', label: 'پشتیبانی آنلاین' },
      { href: '/profile/orders', label: 'پیگیری سفارش' },
      { href: '/warranty', label: 'گارانتی و خدمات' },
      { href: '/guide', label: 'راهنمای خرید' },
    ],
    contact: {
      phone: '۰۲۱-۹۱۰۰۹۱۲۰',
      phoneRaw: '02191009120',
      email: 'info@atifarzam.com',
      address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    },
    social: [
      { href: 'https://instagram.com', label: 'اینستاگرام', icon: 'instagram' },
      { href: 'https://t.me', label: 'تلگرام', icon: 'telegram' },
      { href: 'https://linkedin.com', label: 'لینکدین', icon: 'linkedin' },
      { href: 'https://twitter.com', label: 'توییتر', icon: 'twitter' },
      { href: 'https://youtube.com', label: 'یوتیوب', icon: 'youtube' },
    ],
    copyright: 'تمامی حقوق این سایت متعلق به شرکت آتی فرزام می‌باشد.',
  },
}

export type LandingData = typeof landingData
