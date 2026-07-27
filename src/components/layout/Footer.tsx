"use client";

import Link from "next/link";
import {
  ArrowUpLeft,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import FooterTrail from "@/components/trail/FooterTrail";
import { useShopStatus } from "@/lib/store/shop-status";

const LINKS = [
  { href: "/products", label: "محصولات" },
  { href: "/software", label: "نرم‌افزار ردیابی" },
  { href: "/blog", label: "مقالات و آموزش" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/profile/orders", label: "پیگیری سفارش" },
];

export default function Footer() {
  const {
    contactPhone,
    email,
    address,
    footerText,
    instagramUrl,
    telegramUrl,
  } = useShopStatus();

  const phone = contactPhone || "021-12345678";
  const supportEmail = email || "info@atifarzam.ir";
  const officeAddress = address || "تهران، خیابان ولیعصر";
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="safe-area-bottom border-t border-white/10 bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:py-8">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Headphones className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-bold text-white">
                برای انتخاب ردیاب مناسب مطمئن نیستید؟
              </p>
              <p className="mt-1 text-sm leading-6 text-white/60">
                کارشناسان آتی فرزام برای انتخاب محصول و نصب تخصصی پاسخ‌گو هستند.
              </p>
            </div>
          </div>
          <a
            href={phoneHref}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-dark transition-colors hover:bg-accent-light sm:w-auto"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span dir="ltr">{phone}</span>
          </a>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-[1.25fr_.8fr_1fr] lg:gap-12 lg:py-12">
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
              {footerText ||
                "راهکارهای هوشمند ردیابی GPS برای امنیت خودرو، مدیریت ناوگان تجاری و کنترل دقیق دارایی‌ها."}
            </p>

            {(instagramUrl || telegramUrl) && (
              <div
                className="mt-5 flex items-center gap-2"
                aria-label="شبکه‌های اجتماعی"
              >
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="اینستاگرام آتی فرزام"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {telegramUrl && (
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="تلگرام آتی فرزام"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Send className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          <nav aria-label="دسترسی سریع">
            <h2 className="text-sm font-bold text-white">دسترسی سریع</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex min-h-10 items-center justify-between gap-2 rounded-lg text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.label}
                    <ArrowUpLeft
                      className="h-3.5 w-3.5 text-white/25 transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold text-white">تماس و پشتیبانی</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={phoneHref}
                  className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white/70 transition-colors hover:border-accent/25 hover:text-white"
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
                  className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white/70 transition-colors hover:border-accent/25 hover:text-white"
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
          </div>
        </div>

        <div className="hidden border-t border-white/10 py-5 lg:block">
          <FooterTrail />
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} آتی
            فرزام ایرانیان؛ تمامی حقوق محفوظ است.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-white">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="hover:text-white">
              قوانین استفاده
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
