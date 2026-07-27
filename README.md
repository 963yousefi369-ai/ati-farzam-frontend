# Ati Farzam — Impeccable visual fix patch

این بسته شش فایل جایگزین برای یکپارچه‌سازی و ساده‌سازی رابط کاربری دارد:

- `src/components/home/HeroSlider.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/product/ProductCard.tsx`
- `src/styles/tokens.css`
- `src/styles/globals.css`
- `tailwind.config.ts`

## اصلاحات اصلی

- حذف autoplay، typewriter، parallax، glow، orb و افکت‌های تزئینی Hero
- تبدیل Hero به یک مسیر تصمیم روشن با یک CTA اصلی
- کاهش Navbar سه‌لایه به یک نوار ۷۲ پیکسلی
- ساده‌سازی Product Card و رفع ساختار نامعتبر button داخل link
- حذف confetti از خرید سریع و کاهش motion غیرضروری
- یکپارچه‌سازی رنگ‌ها، سایه‌ها، radius، z-index و transitionها
- خنثی‌کردن gradient text، animated borders، mesh و glowهای قدیمی
- حفظ RTL، focus-visible، حداقل touch target و reduced motion
- ساده‌سازی استایل مقاله و حفظ خوانایی فارسی

## اعمال بسته

از ریشه پروژه:

```bash
unzip ati-farzam-impeccable-patch.zip -d /tmp/ati-farzam-impeccable-patch
cp -R /tmp/ati-farzam-impeccable-patch/src ./
cp /tmp/ati-farzam-impeccable-patch/tailwind.config.ts ./tailwind.config.ts
npm install
npm run build
```

پیشنهاد می‌شود تغییرات روی یک branch جدا اعمال شوند:

```bash
git switch -c impeccable/full-visual-fix
git add src/components/home/HeroSlider.tsx \
  src/components/layout/Navbar.tsx \
  src/components/product/ProductCard.tsx \
  src/styles/tokens.css src/styles/globals.css tailwind.config.ts
git commit -m "Refine visual system with Impeccable"
```

## QA لازم پس از اعمال

- `/` در عرض‌های 390، 768، 1024 و 1440 پیکسل
- `/products` با محصول موجود، ناموجود، تخفیف‌دار و بدون تصویر
- باز و بسته شدن search و mobile menu با Escape
- tab order و focus ring در Navbar و Product Card
- `prefers-reduced-motion: reduce`
- اجرای `npm run build`

> اتصال GitHub این جلسه مجوز نوشتن نداشت؛ ایجاد branch با خطای 403 متوقف شد. به همین دلیل فایل‌ها به‌صورت بسته آماده تحویل شده‌اند و هیچ تغییری روی `main` اعمال نشده است.
