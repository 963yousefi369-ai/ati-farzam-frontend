# Navbar redesign — drop-in patch

## چی عوض شد و چرا

| مشکل نسخه فعلی | راه‌حل |
|---|---|
| سرچ‌بار تمام‌عرض (۱۴۴۰px) توی ردیف دوم — شبیه پلیس‌هولدر توسعه‌دهنده | `max-w-[420px]` و برگشت به وسط ردیف اصلی |
| لوگو ریز و کم‌کنتراست، ضعیف‌ترین المان هدر | brand lockup: مارک ۴۲px با گرادیان navy→primary + دو خط اسم/تگ‌لاین |
| همه چیز ۱۳–۱۴px، بدون سلسله‌مراتب | سه طبقه: utility strip ۳۶px / main bar ۷۲px / nav row ۵۲px |
| utility bar فقط در `!isHome` رندر می‌شد → هدر خانه ساختار متفاوت داشت | همیشه رندر می‌شود |
| حالت شفاف روی هیرو بدون بلر/اسکریم → لینک‌ها ناخوانا | `bg-white/85 + backdrop-blur-xl` |
| مگا‌منو `w-[min(440px,...)]` برای ۴ دسته با توضیح | ۶۲۰px، گرید ۲ ستونه |
| `onBlur={() => setTimeout(close, 200)}` | `onMouseDown` + `preventDefault` |
| `useState<any[]>([])` | `SearchProduct` تایپ‌شده |
| بدون کیبورد نویگیشن | ↑/↓/Enter/Esc + `role="combobox"/"listbox"` + `aria-activedescendant` + Ctrl/⌘K |
| ۴۷۰ خط در یک فایل، سرچ دوبار کپی شده | جدا شد به `useProductSearch` + `ProductSearch` |
| موبایل: منو و سبد کنار هم بدون ساختار | brand راست، اکشن‌ها چپ، سرچ ردیف دوم، تب‌بار پایین |

## فایل‌ها

```
src/lib/hooks/useProductSearch.ts     (جدید)
src/components/search/ProductSearch.tsx (جدید)
src/components/layout/Navbar.tsx      (جایگزین کامل)
```

## چک‌لیست قبل از اجرا

1. `trackSearch` را از مسیر واقعی پروژه ایمپورت کن (در `Navbar.tsx` قدیمی از `@/lib/tracking` می‌آمد).
2. `MobileMenu` باید پراپ‌های `open` و `onClose` بگیرد؛ اگر امضای دیگری دارد همان را بگذار.
3. `getProducts({ q, page_size })` — اگر امضای API فرق دارد، فقط همان یک خط در `useProductSearch.ts` را تنظیم کن.
4. `useCartStore` باید `items[].quantity` داشته باشد.
5. رنگ‌ها همه از توکن‌های خودت‌اند: `primary #3B5A80`، `accent #14B8A6`، `navy #0B1B2B`، `border-hairline`، `light-tint`، `text-muted`.

## پیش‌نمایش

`preview/desktop.png` — دو حالت (اسکرول‌شده و شفاف روی هیرو)
`preview/mobile.png` — ۳۹۰px
