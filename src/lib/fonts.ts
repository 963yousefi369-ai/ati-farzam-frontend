import { Inter, Vazirmatn } from "next/font/google";
// import localFont from 'next/font/local'

/**
 * ── Typography stack ────────────────────────────────────────────────
 *
 *  --font-vazirmatn → متن و UI      (وزن 400/500/600/700)
 *  --font-display   → تیترها        (پیش‌فرض Vazirmatn، قابل ارتقا به Estedad/مربّا)
 *  --font-inter     → اعداد لاتین، قیمت، km/h، شماره تماس
 *
 *  دو فونت، نه بیشتر. هر فونت اضافه یعنی ۱۰۰کیلوبایت و یک پله افت LCP.
 */

export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false,
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

/**
 * ── ارتقای اختیاری تیترها (توصیه می‌کنم) ───────────────────────────
 *
 * ۱. فایل variable را در `src/fonts/` بگذار:
 *      Estedad[wght].woff2     — رایگان/OFL — github.com/aminabedi68/Estedad
 *      یا Morabba-Bold.woff2  — تجاری — fontiran.com
 * ۲. کامنت بلاک پایین را بردار.
 * ۳. در layout.tsx کلاس `estedad.variable` را هم به <html> اضافه کن.
 * ۴. در tokens.css خط `--font-display` را به var(--font-estedad) عوض کن.
 *
 * تا وقتی این کار را نکنی تیترها روی Vazirmatn 700 می‌مانند و چیزی نمی‌شکند.
 */

// export const estedad = localFont({
//   src: '../fonts/Estedad[wght].woff2',
//   variable: '--font-estedad',
//   display: 'swap',
//   weight: '100 900',
// })

export const fontVariables = [vazirmatn.variable, inter.variable].join(" ");
