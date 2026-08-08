# UI Pack v2 — آتی فرزام

پکیج کامل ارتقای دیزاین‌سیستم + موبایل + تایپوگرافی فارسی.
ساختار پوشه‌ها دقیقاً مثل پروژه‌ست؛ فقط محتویات زیپ را روی ریشه‌ی پروژه اکسترکت کن.

---

## ۱. فایل‌های داخل زیپ

### جایگزین می‌شوند (فایل قبلی را overwrite کن)

```
src/styles/tokens.css                        ← توکن‌ها + مقیاس تایپ + elevation
src/styles/globals.css                       ← قواعد تایپوگرافی فارسی + یوتیلیتی‌های موبایل
src/components/ui/Section.tsx                ← backward-compatible، prop قبلی soft هنوز کار می‌کند
src/components/ui/SectionHeader.tsx          ← backward-compatible، title/action مثل قبل
src/components/home/TrustBar.tsx             ← بازطراحی + چیدمان موبایل
src/components/home/FeaturedProducts.tsx     ← کاروسل موبایل + بج تخفیف + hide وقتی خالی
src/components/layout/Navbar.tsx             ← نسخه‌ی v2 + تب‌بار موبایل داخلش mount شده
```

### فایل‌های جدید

```
src/lib/fonts.ts                             ← لود Vazirmatn + Inter
src/components/ui/Container.tsx              ← تنها منبع عرض و پدینگ افقی
src/components/ui/Card.tsx                   ← Card + CardIcon (سه سطح ارتفاع)
src/components/ui/EmptyState.tsx             ← فقط صفحات داخلی
src/components/layout/MobileBottomNav.tsx    ← تب‌بار پایین موبایل
```

---

## ۲. تنها کار دستی: سه خط در layout.tsx

فایل `src/app/layout.tsx` را باز کن و:

```diff
+ import { fontVariables } from '@/lib/fonts'

- <html lang="fa" dir="rtl">
+ <html lang="fa" dir="rtl" className={fontVariables}>
```

و اگر قبلاً Vazirmatn را جای دیگری لود می‌کردی (تگ link گوگل‌فونت یا next/font داخل layout)، آن را حذف کن تا دوباره لود نشود.

همین. `tailwind.config.ts` نیازی به تغییر ندارد — همه‌ی یوتیلیتی‌های جدید (`font-display`، `font-num`، `snap-row`، `glass`، `bg-mesh`) در `globals.css` تعریف شده‌اند.

---

## ۳. فونت‌ها — چه چیزی کجا

| نقش | فونت | کلاس |
|---|---|---|
| تیتر (h1–h6) | display → پیش‌فرض Vazirmatn 700 | خودکار |
| متن و UI | Vazirmatn 400/500/600 | خودکار |
| قیمت، شماره تماس، km/h، کد رهگیری | Inter + tabular-nums | `font-num` |
| اعداد لاتین وسط متن فارسی | — | `font-num num-ltr` |

### ارتقای تیترها (خیلی توصیه می‌کنم)

۱. فایل `Estedad[wght].woff2` را در `src/fonts/` بگذار (رایگان، OFL).
۲. در `src/lib/fonts.ts` بلاک کامنت‌شده‌ی `localFont` را باز کن.
۳. در `layout.tsx` کلاس `estedad.variable` را هم اضافه کن.
۴. در `tokens.css` مقدار `--font-display` را به `var(--font-estedad)` عوض کن.

اگر بودجه‌ی فونت تجاری داری: **مربّا Bold** برای تیتر و **دانا/پیدا** برای متن، بهترین ترکیب برای برند تکنولوژی فارسی است.

### قواعدی که در globals.css اعمال شد

- `line-height` متن ۱٫۸۵ و تیتر ۱٫۳۵–۱٫۴۵ (فارسی به فضای عمودی بیشتری نیاز دارد)
- `letter-spacing: normal !important` روی همه‌ی تیترها و خنثی‌سازی `tracking-tight` — در فارسی اتصال حروف را خراب می‌کند
- `font-feature-settings: 'ss01'` برای شکل فارسی‌تر «ی» و «ک»
- `text-wrap: balance` روی تیترها و `pretty` روی پاراگراف‌ها
- مقیاس سیال `clamp()` — تیتر هیرو از ۳۱px موبایل تا ۵۶px دسکتاپ بدون هیچ breakpoint

---

## ۴. موبایل — چه چیزهایی درست شد

1. **تب‌بار پایین** (خانه / محصولات / جستجو / سبد / حساب) با safe-area، بج سبد، و جمع‌شدن هنگام اسکرول به پایین. داخل Navbar mount شده، نیازی به wiring در layout نیست.
2. `body` روی موبایل `padding-bottom` می‌گیرد تا تب‌بار محتوا را نپوشاند.
3. **کاروسل snap افقی** برای کارت‌ها (`.snap-row`) — روی موبایل اسکرول افقی، از `sm` گرید ۲ ستونه، از `lg` گرید ۴ ستونه. فقط کلاس `snap-row` را روی هر گرید کارتی بگذار.
4. `scroll-padding-top` برابر ارتفاع نوبار — لینک‌های anchor دیگر زیر هدر گم نمی‌شوند.
5. `TrustBar` روی موبایل چیدمان افقی (آیکون کنار متن) و بدون زیرمتن → نصف ارتفاع قبلی.
6. همه‌ی تارگت‌های لمسی حداقل ۴۴px (`.tap-target` و `min-h-11`).
7. اینپوت‌ها روی iOS اجباراً ۱۶px تا صفحه زوم نکند.
8. پدینگ سکشن‌ها روی موبایل `py-12` و دسکتاپ `py-20` — قبلاً هر دو یکی بود و موبایل خیلی کش‌دار می‌شد.
9. `overscroll-behavior: contain` روی ردیف‌های افقی تا اسکرول صفحه قفل نشود.
10. همه‌ی انیمیشن‌ها زیر `prefers-reduced-motion` غیرفعال می‌شوند.

---

## ۵. دسترس‌پذیری و کنتراست

- توکن جدید `--accent-text: #0d7c72` برای هر **متن** teal روی سفید. رنگ `#14b8a6` کنتراست ۲٫۴:۱ داشت و WCAG را رد می‌کرد؛ حالا فقط برای پس‌زمینه، آیکون و بج استفاده می‌شود. کلاس آماده: `text-accent-text` و `.eyebrow`.
- توکن `--discount` که بلااستفاده مانده بود حالا روی بج تخفیف و بج سبد استفاده می‌شود — صفحه یک نقطه‌ی حرارتی گرفت.
- `:focus-visible` با رینگ teal و radius مناسب روی همه‌ی عناصر.

---

## ۶. چطور روی بقیه‌ی صفحات هم اعمالش کنی

این سه الگو را در `products`، `blog`، `about`، `software`، `contact` جایگزین کن:

**الف) عرض و پدینگ** — هر جا `max-w-[1440px] mx-auto px-6 lg:px-10` دیدی:

```tsx
import { Container } from '@/components/ui/Container'
<Container size="wide"> ... </Container>
```

**ب) هدر سکشن** — الگوی یکسان برای همه:

```tsx
<SectionHeader
  eyebrow="دسته‌بندی محصولات"
  title="محصول مناسب خودتان را پیدا کنید"
  subtitle="ردیاب‌های GPS با ضمانت اصالت و پشتیبانی تخصصی"
  action={<Link href="/products">مشاهده همه</Link>}
/>
```

**ج) سکشنی که ممکن است خالی باشد** — به‌جای نمایش «یافت نشد»:

```tsx
<Section tone="soft" hideWhenEmpty isEmpty={!products.length}>
  ...
</Section>
```

**د) هر گرید کارتی** → کلاس `snap-row scrollbar-none` تا روی موبایل کاروسل شود.

**ه) هر جا `text-accent` روی متن داری** → `text-accent-text`.

---

## ۷. چیزهایی که عمداً دست نزدم

- **لوگو** — کاملاً دست‌نخورده، همان `Image` با `logo` از `useSiteSettings` و همان fallback تایپوگرافی.
- `tailwind.config.ts` — نیازی نداشت.
- `AccountMenu`، `MobileMenu`، `ProductSearch` — قرارداد propهایشان تغییر نکرده، بدون تغییر کار می‌کنند.
- کامپوننت‌های shadcn در `src/components/ui/*.tsx` با حروف کوچک — دست نخوردند.

---

## ۸. چیزهایی که خودت باید محتوایش را درست کنی

1. زیرعنوان هیرو الان «اصن جنس» است — متن placeholder روی پروداکشن رفته. از `landingData.hero.subtitle` استفاده کن.
2. بخش همکاران فقط ۲ لوگو دارد؛ زیر ۵ تا بهتر است اصلاً نمایش داده نشود.
3. وبلاگ با ۱ کارت در گرید ۳ ستونه شکسته به نظر می‌رسد — با `snap-row` این مشکل هم حل می‌شود.
4. لینک‌های `/warranty` و `/tracking` در نوار بالای نوبار: اگر این روت‌ها را نساخته‌ای، آن دو `<Link>` را حذف کن.
