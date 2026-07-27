# پچ ارتقای UI — ati-farzam-frontend

هدف: صفحه‌ی اصلی حتی **وقتی بک‌اند خاموش است** کامل، حرفه‌ای و بدون سکشن خالی/تکراری دیده شود.

---

## فایل‌های جدید (فقط کپی کن)

| فایل | کار |
|---|---|
| `src/lib/cms/normalizeSections.ts` | حذف سکشن‌های تکراری + مخفی کردن سکشن‌های بی‌دیتا |
| `src/lib/home/sanitizeBanners.ts` | جلوگیری از تیتر بی‌معنی Hero (ماجرای «آتی») |
| `src/components/shared/Section.tsx` | یکسان‌سازی spacing و container |
| `src/components/shared/EmptyState.tsx` | Empty state فقط برای صفحات داخلی |
| `src/components/home/PartnerLogo.tsx` | لوگوی شکسته → وردمارک تمیز |

---

## ویرایش‌های دقیق روی فایل‌های موجود

### 1️⃣ `src/app/(main)/page.tsx` — حذف سکشن‌های تکراری

**مشکل:** سکشن‌های «درباره ما» و «پلتفرم ردیابی هوشمند» دو بار رندر می‌شوند، چون CMS رکورد تکراری برمی‌گرداند و `SectionRenderer` بدون فیلتر همه را می‌زند.

```diff
-import { defaultHomeSections } from '@/lib/cms/homepage-defaults'
+import { defaultHomeSections } from '@/lib/cms/homepage-defaults'
+import { normalizeSections } from '@/lib/cms/normalizeSections'
+import { landingData } from '@/data/landing'

 export default async function HomePage() {
   const { cmsPage, fallbackData } = await fetchAllData()
-  const sections = cmsPage?.sections?.length ? cmsPage.sections : defaultHomeSections
+
+  // بک‌اند که خاموش است، محصولات دموی لوکال نمایش داده می‌شود
+  const products = fallbackData.products.length ? fallbackData.products : landingData.products
+
+  const rawSections = cmsPage?.sections?.length ? cmsPage.sections : defaultHomeSections
+  const sections = normalizeSections(rawSections, {
+    hasProducts: products.length > 0,
+    hasBlogs: fallbackData.blogs.length > 0,
+    hasPartners: true, // لوگوی فال‌بک متنی همیشه وجود دارد
+  })
 
-  return <SectionRenderer sections={sections} fallbackData={fallbackData} />
+  return <SectionRenderer sections={sections} fallbackData={{ ...fallbackData, products }} />
 }
```

---

### 2️⃣ `src/components/cms/SectionRenderer.tsx` — حذف «محصولی یافت نشد»

در `case 'product_grid'` بلاک `else` را کاملاً حذف کن:

```diff
-        ) : (
-          <div className="...">
-            <p>محصولی یافت نشد</p>
-            <Link href="/contact">تماس با ما</Link>
-          </div>
-        )}
+        ) : null}
```

و در ابتدای همان `case`، قبل از `return`:

```ts
case 'product_grid': {
  if (!fallbackData.products.length) return null   // همان کاری که blog_grid می‌کند
  // ...
}
```

و در `case 'partners'` از `PartnerLogo` جدید استفاده کن تا آیکون عکس شکسته دیده نشود.

---

### 3️⃣ `src/components/home/HeroSlider.tsx` — تیتر واقعی + CTA

**مشکل:** بنری با `title: 'آتی'` از بک‌اند آمد، بنابراین `FALLBACK_BANNERS` هرگز فعال نشد و چون `cta_link` نداشت، هیچ دکمه‌ای رندر نشد. پس مهم‌ترین بخش سایت بدون پیام و بدون CTA ماند.

```diff
+import { sanitizeBanners, HERO_COPY_DEFAULTS } from '@/lib/home/sanitizeBanners'

 export default function HeroSlider({ banners }: HeroSliderProps) {
-  const slides = banners && banners.length > 0 ? banners : FALLBACK_BANNERS
+  const usable = sanitizeBanners(banners, HERO_COPY_DEFAULTS)
+  const slides = usable.length > 0 ? usable : FALLBACK_BANNERS
```

**کوتاه کردن ارتفاع Hero** (الان حدود ۴۵٪ فضای خالی دارد) — در `<section>` اصلی:

```diff
-min-h-[92vh] md:min-h-[88vh]
+min-h-[600px] md:min-h-[640px] lg:min-h-[680px]
```

**بزرگ‌تر کردن تیتر** — در `motion.h1`:

```diff
-className="text-[clamp(1.75rem,7vw,3rem)] md:text-[clamp(2rem,4vw,3rem)] font-bold md:font-semibold ..."
+className="text-[clamp(2rem,7vw,3.25rem)] md:text-[clamp(2.75rem,4.5vw,4rem)] font-bold ..."
```

> نکته: `TypewriterText` روی `<h1>` برای SEO و CLS خوب نیست چون مارکاپ اولیه خالیست. یا متن کامل را در `<span className="sr-only">` بگذار، یا تایپ‌رایتر را فقط روی زیرعنوان اجرا کن.

---

### 4️⃣ `src/components/layout/Navbar.tsx` — سرچ‌بار ۱۴۴۰ پیکسلی

کانتینر سرچ دسکتاپ را محدود کن:

```diff
-<div className="hidden lg:flex flex-1">
+<div className="hidden lg:flex flex-1 justify-center">
+  <div className="w-full max-w-[420px]">
     <SearchInput />
+  </div>
 </div>
```

دو ری‐فکتور دیگر که حتماً ارزشش را دارد:
- `SearchInput` و `MobileSearchContent` را به `src/components/search/` منتقل کن و منطق تکراری‌شان را در `useProductSearch()` جمع کن (الان دقیقاً دو بار نوشته شده).
- `useState<any[]>` و `(p: any)` را با یک تایپ `Product` جایگزین کن.
- `onBlur` با `setTimeout(200)` برای بستن دراپ‌داون را با `onMouseDown` روی آیتم‌ها جایگزین کن.

---

### 5️⃣ حذف کامپوننت‌های مرده

این فایل‌ها هم در `src/components/` و هم در `src/components/home/` وجود دارند. نسخه‌ی ریشه را حذف کن:

```bash
git rm src/components/CategoryCards.tsx \
       src/components/FeaturedProducts.tsx \
       src/components/Newsletter.tsx \
       src/components/PartnersMarquee.tsx \
       src/components/PlatformShowcase.tsx
```

قبلش مطمئن شو جایی import نشده‌اند:

```bash
rg "from '@/components/(CategoryCards|FeaturedProducts|Newsletter|PartnersMarquee|PlatformShowcase)'" src
```

---

### 6️⃣ بج قرمز `1 Issue`

این overlay دیوایمان Next.js است و یعنی یک ارور واقعی داری — با توجه به `toLocaleString('fa-IR')` در `Navbar` و `FeaturedProducts`، تقریباً قطعاً **hydration mismatch** است (سرور و مرورگر اعداد را متفاوت فرمت می‌کنند).

راه‌حل قطعی — یک هلپر قطعی به جای `toLocaleString`:

```ts
// src/lib/utils.ts
const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toFaDigits(input: number | string): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)])
}

export function formatFaNumber(value: number): string {
  return toFaDigits(Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬'))
}
```

سپس هر `x.toLocaleString('fa-IR')` را با `formatFaNumber(x)` عوض کن. این تابع روی سرور و کلاینت ۱۰۰٪ خروجی یکسان می‌دهد.

---

### 7️⃣ یکسان‌سازی ریتم عمودی

در `SectionRenderer` جدول `sectionClassByType` را با `<Section>` جایگزین کن تا همه‌ی سکشن‌ها یک `max-w-[1280px]` مشترک بگیرند. الان کارت «درباره ما» و «خبرنامه» محسوساً باریک‌تر از تراست‌بار هستند.

---

## ترتیب اجرا

1. کپی فایل‌های جدید
2. پچ `page.tsx` (حذف تکراری‌ها + محصول دمو)
3. پچ `SectionRenderer.tsx` (حذف empty state)
4. پچ `HeroSlider.tsx` (تیتر + ارتفاع)
5. `formatFaNumber` و رفع hydration
6. حذف کامپوننت‌های مرده
7. `npm run lint && npm run build`
