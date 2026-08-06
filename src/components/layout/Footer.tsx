"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Clock3,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import FooterTrail from "@/components/trail/FooterTrail";
import { useShopStatus } from "@/lib/store/shop-status";

/* -------------------------------------------------------------------------- */
/*  Fallbacks                                                                 */
/* -------------------------------------------------------------------------- */
/*
 * These must stay in sync with `src/data/landing.ts`. Previously the footer
 * fell back to `info@atifarzam.ir` while landing.ts used `info@atifarzam.com`,
 * and to the fake number `021-12345678`. Single source of truth now lives here
 * until the values are served from the backend `SiteSettings` endpoint.
 */
const FALLBACK_PHONE = "۰۲۱-۹۱۰۰۹۱۲۰";
const FALLBACK_PHONE_RAW = "02191009120";
const FALLBACK_EMAIL = "info@atifarzam.com";
const FALLBACK_ADDRESS = "تهران، خیابان ولیعصر";
const FALLBACK_FOOTER_TEXT =
  "راهکارهای هوشمند ردیابی GPS برای امنیت خودرو، مدیریت ناوگان تجاری و کنترل دقیق دارایی‌ها.";

/*
 * The shop-status context ships placeholder social URLs (`https://instagram.com`
 * and `https://t.me`). Rendering those as real buttons sends visitors to the
 * generic homepages of those platforms, which looks broken. Anything in this
 * list is treated as "not configured".
 */
const PLACEHOLDER_URLS = [
  "https://instagram.com",
  "https://instagram.com/",
  "https://www.instagram.com",
  "https://www.instagram.com/",
  "https://t.me",
  "https://t.me/",
  "https://telegram.me",
  "#",
];

const PLACEHOLDER_PHONES = ["021-12345678", "02112345678", "12345678"];

function realUrl(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (PLACEHOLDER_URLS.includes(trimmed.toLowerCase())) return null;
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}

/* -------------------------------------------------------------------------- */
/*  Link groups                                                               */
/* -------------------------------------------------------------------------- */

const COMPANY_LINKS = [
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/blog", label: "مقالات و آموزش" },
  { href: "/software", label: "نرم‌افزار ردیابی" },
];

const SERVICE_LINKS = [
  { href: "/products", label: "همه محصولات" },
  { href: "/profile/orders", label: "پیگیری سفارش" },
  { href: "/cart", label: "سبد خرید" },
  { href: "/profile", label: "حساب کاربری" },
];

/*
 * Category deep-links. Keep the `slug` values identical to the backend category
 * slugs, otherwise these land on an empty filtered list.
 */
const CATEGORY_LINKS = [
  { slug: "car", label: "ردیاب خودرو" },
  { slug: "personal", label: "ردیاب شخصی" },
  { slug: "motorcycle", label: "ردیاب موتورسیکلت" },
  { slug: "truck", label: "ردیاب ناوگان سنگین" },
];

/*
 * Trust badges (اعتماد الکترونیک / ساماندهی). Drop the images into
 * `public/images/trust/` and fill this array in. While it is empty the whole
 * row is skipped, so nothing broken renders.
 *
 * Example:
 * { src: "/images/trust/enamad.png", href: "https://trustseal.enamad.ir/...",
 *   alt: "نماد اعتماد الکترونیک", width: 90, height: 90 }
 */
const TRUST_BADGES: Array<{
  src: string;
  href?: string;
  alt: string;
  width: number;
  height: number;
}> = [];

/*
 * Persian calendar year. Computed with an explicit `timeZone` so the server and
 * the browser always agree. Without it, a UTC server and an Asia/Tehran client
 * can disagree on the Persian year (and always disagree for a few hours a day),
 * which produces a React hydration mismatch warning in the console.
 */
const YEAR_FA = new Intl.DateTimeFormat("fa-IR", {
  timeZone: "Asia/Tehran",
  year: "numeric",
}).format(new Date());

/* -------------------------------------------------------------------------- */

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-bold text-white">{title}</h2>
      <ul className="mt-3 space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex min-h-9 items-center gap-1.5 rounded-lg text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft
                className="h-3.5 w-3.5 shrink-0 text-white/20 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const {
    contactPhone,
    supportPhone,
    email,
    address,
    footerText,
    instagramUrl,
    telegramUrl,
  } = useShopStatus();

  const rawPhone = (supportPhone || contactPhone || "").trim();
  const isPlaceholderPhone = PLACEHOLDER_PHONES.includes(
    rawPhone.replace(/[^\d]/g, ""),
  );
  const phone = !rawPhone || isPlaceholderPhone ? FALLBACK_PHONE : rawPhone;
  const phoneDigits = phone.replace(/[^\d+]/g, "");
  /* Persian digits produce an empty `tel:` href, so fall back to the raw ASCII number. */
  const phoneHref = `tel:${phoneDigits || FALLBACK_PHONE_RAW}`;

  const supportEmail = (email || "").trim() || FALLBACK_EMAIL;
  const officeAddress = (address || "").trim() || FALLBACK_ADDRESS;
  const description = (footerText || "").trim() || FALLBACK_FOOTER_TEXT;

  const instagram = realUrl(instagramUrl);
  const telegram = realUrl(telegramUrl);
  const hasSocial = Boolean(instagram || telegram);

  return (
    <footer className="safe-area-bottom border-t border-white/10 bg-dark text-white">
      {/* ---------------------------------------------------------------- */}
      {/* Support strip                                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 py-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:py-7">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Headphones className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-white">
                  برای انتخاب ردیاب مناسب مطمئن نیستید؟
                </p>
                <p className="mt-1 text-sm leading-6 text-white/60">
                  کارشناسان آتی فرزام برای انتخاب محصول، نصب تخصصی و آموزش پنل
                  پاسخ‌گو هستند.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/60">
                <Clock3
                  className="h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>شنبه تا پنجشنبه، ۹ تا ۱۸</span>
              </span>
              <a
                href={phoneHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-dark transition-colors hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Main columns                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-x-12 lg:py-14">
          {/* Brand ------------------------------------------------------- */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-bold">آتی فرزام ایرانیان</span>
                <span className="mt-0.5 block text-xs tracking-wide text-white/45">
                  ATI Farzam Iranian
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              {description}
            </p>

            <ul className="mt-5 space-y-2">
              <li className="flex items-center gap-2 text-xs text-white/55">
                <ShieldCheck
                  className="h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>ضمانت اصالت و سلامت دستگاه</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-white/55">
                <Headphones
                  className="h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>پشتیبانی فنی و نصب تخصصی</span>
              </li>
            </ul>

            {hasSocial && (
              <div
                className="mt-5 flex items-center gap-2"
                aria-label="شبکه‌های اجتماعی"
              >
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="اینستاگرام آتی فرزام"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
                {telegram && (
                  <a
                    href={telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="تلگرام آتی فرزام"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Categories -------------------------------------------------- */}
          <LinkColumn
            title="دسته‌بندی محصولات"
            links={CATEGORY_LINKS.map((c) => ({
              href: `/products?category=${c.slug}`,
              label: c.label,
            }))}
          />

          {/* Company + services ---------------------------------------- */}
          <div className="space-y-8">
            <LinkColumn title="شرکت" links={COMPANY_LINKS} />
            <LinkColumn title="خدمات مشتریان" links={SERVICE_LINKS} />
          </div>

          {/* Contact ---------------------------------------------------- */}
          <div>
            <h2 className="text-sm font-bold text-white">تماس و پشتیبانی</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={phoneHref}
                  className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white/70 transition-colors hover:border-accent/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span dir="ltr">{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${supportEmail}`}
                  className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white/70 transition-colors hover:border-accent/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 truncate" dir="ltr">
                    {supportEmail}
                  </span>
                </a>
              </li>
              <li className="flex min-h-11 items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm leading-6 text-white/70">
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>{officeAddress}</span>
              </li>
            </ul>

            {TRUST_BADGES.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-bold text-white/70">
                  مجوزها و اعتبارسنجی
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {TRUST_BADGES.map((badge) => {
                    const img = (
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        width={badge.width}
                        height={badge.height}
                        className="h-auto w-[72px] rounded-lg bg-white/90 p-1"
                      />
                    );
                    return badge.href ? (
                      <a
                        key={badge.src}
                        href={badge.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {img}
                      </a>
                    ) : (
                      <span key={badge.src}>{img}</span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recently visited trail ---------------------------------------- */}
        <div className="hidden border-t border-white/10 py-5 lg:block">
          <FooterTrail />
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Bottom bar                                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-white/10 bg-dark-deeper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {YEAR_FA} آتی فرزام ایرانیان؛ تمامی حقوق محفوظ است.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/privacy"
                className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                قوانین استفاده
              </Link>
              <Link
                href="/contact"
                className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                پشتیبانی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
