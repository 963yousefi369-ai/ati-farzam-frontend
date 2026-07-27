# ATI Farzam — Full Component Polish

این بسته یک پاس یکپارچه UI/UX برای کامپوننت‌های کاربرمحور پروژه است و بر اساس رویکرد Trust-first Tech Commerce / Editorial Minimal آماده شده است.

## محدوده تغییرات

### Landing و Layout

- Navbar و MobileMenu با active-state مشخص و touch target استاندارد
- HeroSlider واکنش‌گرا با تصویر پس‌زمینه دریافتی از بک‌اند
- CredibilityBar، CategoryCards، Partners، FeaturedProducts، About، SoftwareCTA و Newsletter
- Footer فشرده و خوانا در موبایل
- Product و Blog rails لمسی در موبایل از طریق SectionRenderer

### Core UI primitives

تغییر این فایل‌ها ظاهر فرم‌ها، مودال‌ها، منوها، کارت‌ها، جداول و کنترل‌های سراسر پروژه را یکپارچه می‌کند:

- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/badge.tsx`

### Shared commerce components

- ProductCard و QuantitySelector
- BlogCard
- SectionTitle و EmptyState
- Pagination

## اصول اعمال‌شده

- حذف gradient، glow، ripple و motionهای غیرضروری
- حداقل touch target برابر 44px
- focus state واضح برای کاربر صفحه‌کلید
- کارت‌های تخت با border ملایم و shadow بسیار محدود
- فرم‌های خوانا با ارتفاع ثابت و فونت مناسب موبایل
- Dialog سازگار با `100dvh` و اسکرول داخلی
- Tabs، Table و Pagination سازگار با عرض موبایل
- fallback برای تصاویر و لوگوهای خراب
- فاصله‌گذاری mobile-first و کاهش ارتفاع Landing
- تصویر واقعی SoftwareCTA بدون background، border و padding

## نصب

فایل‌های این بسته را با حفظ مسیر روی پروژه جایگزین کنید، سپس اجرا کنید:

```bash
npm run build
```

این بسته patch فایل‌هاست و شامل کل repository یا وابستگی‌ها نیست.
