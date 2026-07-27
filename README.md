# ATI Farzam — UI/UX Pro Max redesign pass

این بسته، پاس دوم بازطراحی بر پایه UI/UX Pro Max v2.11.0 است و روی سه بخش باقی‌مانده با بیشترین اثر تمرکز دارد:

- `Navbar.tsx`: ناوبری کلیک‌پذیر و keyboard-friendly، CTA مرتب تماس با ما، رفع وابستگی به hover و اتصال صحیح جستجوی موبایل.
- `MobileMenu.tsx`: حذف رنگ‌های hard-coded، blur و motion اضافه؛ یکپارچه‌سازی semantic tokens، focus trap و حداقل target برابر 44px.
- `PlatformShowcase.tsx`: حذف glow، pattern و animation تزئینی؛ تبدیل به یک پنل محصول خوانا و trust-first.

## جهت طراحی

- Product: فروشگاه تخصصی ردیاب GPS و نرم‌افزار مدیریت ناوگان
- Style: Trust-first Tech Commerce / Editorial Minimal
- Variance: 4/10
- Motion: 2/10
- Density: 5/10
- Primary: `#3B5A80`
- Accent: `#14B8A6`
- Font: IRANSansX/Vazirmatn
- Grid: 4/8px spacing rhythm
- Breakpoints: 375 / 768 / 1024 / 1440

## اعمال

فایل‌های داخل `src` را روی مسیرهای متناظر پروژه کپی و سپس اجرا کنید:

```bash
npm run build
```

QA پیشنهادی: عرض‌های 375، 768، 1024 و 1440؛ Tab/Shift+Tab؛ Escape؛ reduced-motion؛ بازشدن منوی محصولات با کلیک؛ جستجوی موبایل و سبد خرید.

> اتصال GitHub در این جلسه مجوز write نداشت، بنابراین هیچ commit یا تغییری مستقیم روی main انجام نشده است.
