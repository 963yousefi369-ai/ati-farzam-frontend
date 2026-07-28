"use client";

import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import FooterTrail from "@/components/trail/FooterTrail";
import { useShopStatus } from "@/lib/store/shop-status";

const LINKS = [
  { href: "/products", label: "محصولات" },
  { href: "/software", label: "نرم‌افزار" },
  { href: "/blog", label: "وبلاگ" },
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
  return (
    <footer className="bg-dark text-white safe-area-bottom">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_.7fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <MapPin className="h-5 w-5 text-accent" />
              </span>
              <div>
                <p className="font-semibold">آتی فرزام ایرانیان</p>
                <p className="text-xs text-white/45">ATI Farzam Iranian</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              {footerText ||
                "راهکارهای هوشمند ردیابی GPS برای خودرو، ناوگان تجاری و اشخاص."}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={instagramUrl || "https://instagram.com"}
                aria-label="اینستاگرام"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={telegramUrl || "https://t.me"}
                aria-label="تلگرام"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">دسترسی سریع</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center text-sm text-white/60 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              تماس و پشتیبانی
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/65">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span dir="ltr">{contactPhone || "021-12345678"}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/65">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>{email || "info@atifarzam.ir"}</span>
              </li>
              <li className="flex items-start gap-3 text-sm leading-7 text-white/65">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span>{address || "تهران، خیابان ولیعصر"}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 hidden border-t border-white/10 pt-4 sm:block">
          <FooterTrail />
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} آتی
            فرزام ایرانیان — تمامی حقوق محفوظ است
          </p>
          <div className="flex gap-4">
            <Link href="/privacy">حریم خصوصی</Link>
            <Link href="/terms">قوانین استفاده</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
