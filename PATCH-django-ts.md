# پچ دستی برای `src/lib/api/django.ts`

این یک فایل حدود ۴۰۰ خطی است که تمام API را نگه می‌دارد، پس نسخهٔ کاملش را در زیپ
نگذاشتم تا کد اختصاصی خودت را پاک نکند. فقط ۲ تابع را عوض کن.

## دنبال این بلوک بگرد (حدود خط ۱۰ تا ۲۵)

```ts
const INTERNAL_RE = /http:\/\/(localhost|127\.0\.0\.1|backend)(:\d+)?/g;

// For <Image> src — keep media on the configured backend origin.
export function djangoImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  const publicApiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  if (url.startsWith("/")) return `${publicApiUrl}${url}`;
  if (/^https?:\/\//i.test(url)) return url.replace(INTERNAL_RE, publicApiUrl);
  return `${publicApiUrl}/media/${url.replace(/^media\//, "")}`;
}

// For <Image> src — same as djangoImageUrl
export function publicImageUrl(url: string | null | undefined): string {
  return djangoImageUrl(url);
}
```

## و کلاً با این عوضش کن

```ts
// منطق مدیا منتقل شد به src/lib/media.ts
// این دو خروجی فقط برای سازگاری با کد قبلی نگه داشته شده‌اند.
export { mediaUrl, hasMedia, rewriteHtmlMediaUrls } from "@/lib/media";
export { mediaUrl as djangoImageUrl } from "@/lib/media";
export { mediaUrl as publicImageUrl } from "@/lib/media";
```

تمام. متغیر `INTERNAL_RE` دیگر جایی استفاده نمی‌شود پس حذفش کن؛ اگر نگهش داری
`npm run lint` بابت متغیر بلااستفاده غر می‌زند.

## چرا هیچ کامپوننت دیگری را لازم نیست دست بزنی

هر جایی که الان `publicImageUrl` یا `djangoImageUrl` را از `@/lib/api/django` می‌گیرد —
`AboutCompact`، `PlatformShowcase`، `SoftwareCTA`، `CategoryCards`، کارت محصول، بنرهای هیرو و … —
همان نام را با رفتار درست تحویل می‌گیرد. یعنی **مشکل تصاویر فقط در بلاگ حل
نمی‌شود؛ همهٔ تصاویر سایت با همین ۶ خط درست می‌شوند.**

## یک نکتهٔ تایپی

تابع قبلی وقتی تصویر نبود `''` برمی‌گرداند — تابع جدید هم همین کار را می‌کند،
پس رفتار عوض نشده. ولی حواست باشد: **رشتهٔ خالی را هرگز به `<Image src>`
نده**، چون Next خطای رانتایم می‌دهد. یا با `hasMedia()` چک کن یا از کامپوننت
`SafeImage` استفاده کن که در همین زیپ هست.
