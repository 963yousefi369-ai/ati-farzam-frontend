/**
 * تولید URL تصاویر مدیای جنگو.
 *
 * استراتژی: مدیا را same-origin نگه می‌داریم و اجازه می‌دهیم rewrite
 * در next.config.ts پروکسیش کند:
 *
 *   { source: '/media/:path*', destination: `${API_URL}/media/:path*` }
 *
 * مزایای مسیر نسبی نسبت به URL مطلق:
 *   1. دیگر نیازی به remotePatterns نیست → خطای 400 «hostname is not
 *      configured» در next/image ممکن نیست.
 *   2. مقدار NEXT_PUBLIC_API_URL در زمان build در HTML حک نمی‌شود، پس
 *      یک ایمیج داکر در هر محیطی کار می‌کند.
 *   3. mixed-content رخ نمی‌دهد (سایت https و مدیا http).
 *   4. هدر Cache-Control که در next.config.ts برای /media/:path* تعریف شده
 *      واقعاً اعمال می‌شود.
 *
 * اگر روزی مدیا را به S3 یا فضای ابری منتقل کردی، بک‌اند خودش URL مطلق
 * برمی‌گرداند؛ این تابع آن را دست نمی‌زند و فقط کافیست دامنهٔ مخزن را به
 * remotePatterns اضافه کنی.
 */

/** مسیر پایهٔ مدیا. باید با MEDIA_URL جنگو و rewrite در next.config یکی باشد. */
const MEDIA_PREFIX = "/media/";

/**
 * میزبان‌هایی که فقط درون شبکهٔ داکر یا دولوپمنت معنا دارند.
 * این‌ها هرگز نباید به مرورگر کاربر برسند — به مسیر نسبی تبدیلشان می‌کنیم.
 */
const INTERNAL_ORIGIN_RE =
  /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|backend|web|django)(:\d+)?/i;

/** پاس‌دادن مستقیم این طرح‌ها بدون دستکاری. */
const PASSTHROUGH_RE = /^(data:|blob:|about:)/i;

/**
 * هر مسیری را به یک مسیر نسبی زیر MEDIA_PREFIX نرمال می‌کند.
 *
 * ورودی‌هایی که در عمل از API می‌آیند و همه باید کار کنند:
 *   "/media/blog/images/a.webp"     → "/media/blog/images/a.webp"
 *   "media/blog/images/a.webp"      → "/media/blog/images/a.webp"
 *   "blog/images/a.webp"            → "/media/blog/images/a.webp"
 *   "/api/media/blog/images/a.webp" → "/media/blog/images/a.webp"
 */
function toRelativeMediaPath(input: string): string {
  let path = input.trim();
  if (!path) return "";

  // جداکردن query string و hash تا در نرمال‌سازی دخالت نکنند
  let suffix = "";
  const marker = path.search(/[?#]/);
  if (marker !== -1) {
    suffix = path.slice(marker);
    path = path.slice(0, marker);
  }

  // یکدست‌کردن اسلش‌ها
  path = path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");

  // حذف پیشوند api اگر بک‌اند از مسیر /api/media/ داده باشد
  path = path.replace(/^\/?api\/media\//i, "media/");

  const bare = path.replace(/^\/+/, "");

  // جلوگیری از path traversal در سمت کلاینت
  if (bare.split("/").includes("..")) return "";

  const withoutPrefix = bare.replace(/^media\//i, "");
  if (!withoutPrefix) return "";

  return `${MEDIA_PREFIX}${withoutPrefix}${suffix}`;
}

/**
 * تبدیل مقدار خام تصویر از API به یک src قابل استفاده در next/image.
 *
 * خروجی رشتهٔ خالی یعنی «تصویری وجود ندارد» — هرگز رشتهٔ خالی را به
 * <Image src> نده؛ اول با hasMedia() چک کن یا از <SafeImage> استفاده کن.
 */
export function mediaUrl(url: string | null | undefined): string {
  if (!url) return "";

  const raw = String(url).trim();
  if (!raw) return "";

  if (PASSTHROUGH_RE.test(raw)) return raw;

  // مسیر پروتکل‌نسبی: //cdn.example.com/x.png
  if (raw.startsWith("//")) return `https:${raw}`;

  if (/^https?:\/\//i.test(raw)) {
    // میزبان داخلی → نسبی کن تا پروکسی شود
    if (INTERNAL_ORIGIN_RE.test(raw)) {
      return toRelativeMediaPath(raw.replace(INTERNAL_ORIGIN_RE, ""));
    }
    // میزبان واقعاً خارجی (S3 / CDN) → دست نزن.
    // فقط یادت باشد دامنه‌اش در remotePatterns باشد.
    return raw;
  }

  return toRelativeMediaPath(raw);
}

/**
 * برای جایی که می‌خواهی بدانی تصویر واقعاً هست یا نه.
 * منطق شرطی را دوباره ننویس؛ از این استفاده کن.
 */
export function hasMedia(url: string | null | undefined): boolean {
  return mediaUrl(url) !== "";
}

/** فقط مقادیری را دست می‌زنیم که واقعاً مدیای جنگو هستند. */
function isMediaCandidate(value: string): boolean {
  if (!value) return false;
  if (PASSTHROUGH_RE.test(value)) return false;
  if (INTERNAL_ORIGIN_RE.test(value)) return true;
  if (/^\/?(api\/)?media\//i.test(value)) return true;
  return false;
}

/**
 * بازنویسی مسیرهای مدیا درون HTML محتوای بلاگ.
 *
 * محتوای پست‌ها از ادیتور جنگو می‌آید و ممکن است <img src> با میزبان
 * localhost یا backend داخلش باشد — روی پروداکشن شکسته دیده می‌شوند.
 * این تابع را قبل از dangerouslySetInnerHTML روی محتوا بزن.
 *
 * توجه: این تابع سانیتایزر نیست و جای سانیتایز کردن HTML را نمی‌گیرد.
 */
export function rewriteHtmlMediaUrls(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(
    /(src|href|srcset)=["']([^"']+)["']/gi,
    (match, attr: string, value: string) => {
      if (attr.toLowerCase() === "srcset") {
        const rewritten = value
          .split(",")
          .map((part) => {
            const trimmed = part.trim();
            const [candidate, ...descriptors] = trimmed.split(/\s+/);
            if (!isMediaCandidate(candidate)) return trimmed;
            return [mediaUrl(candidate), ...descriptors].join(" ");
          })
          .join(", ");
        return `${attr}="${rewritten}"`;
      }

      if (!isMediaCandidate(value)) return match;
      return `${attr}="${mediaUrl(value)}"`;
    },
  );
}

// ---------------------------------------------------------------------------
// سازگاری با کد قبلی.
// ده‌ها کامپوننت الان djangoImageUrl / publicImageUrl را از مسیر
// '@/lib/api/django' می‌گیرند. فایل PATCH-django-ts.md را بخوان.
// ---------------------------------------------------------------------------
export const djangoImageUrl = mediaUrl;
export const publicImageUrl = mediaUrl;
