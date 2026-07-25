'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin as MapPinIcon, Instagram, Send } from 'lucide-react'
import FooterTrail from '@/components/trail/FooterTrail'
import { useShopStatus } from '@/lib/store/shop-status'

const QUICK_LINKS = [
  { href: '/products', label: 'محصولات' },
  { href: '/software', label: 'نرم‌افزار' },
  { href: '/blog', label: 'وبلاگ' },
  { href: '/about', label: 'درباره ما' },
]

const SUPPORT_LINKS = [
  { href: '/contact', label: 'تماس با ما' },
  { href: '/profile/orders', label: 'پیگیری سفارش' },
  { href: '/privacy', label: 'حریم خصوصی' },
  { href: '/terms', label: 'قوانین استفاده' },
]

export default function Footer() {
  const { contactPhone, email, address, footerText, instagramUrl, telegramUrl } = useShopStatus()

  return (
    <footer className="relative text-white safe-area-bottom" style={{ backgroundColor: 'var(--bg-dark, #0f172a)' }}>
      {/* Subtle top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-accent/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.08] flex items-center justify-center border border-white/[0.08]">
                <MapPinIcon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-base leading-tight">آتی فرزام ایرانیان</p>
                <p className="text-sm text-white/45 leading-tight mt-0.5">ATI Farzam Iranian</p>
              </div>
            </div>
            <p className="text-sm text-white/55 leading-[1.8] mb-6 max-w-xs">
              {footerText || 'بیش از ۱۲ سال تجربه در ارائه راهکارهای هوشمند ردیابی GPS برای خودرو، ناوگان تجاری و اشخاص.'}
            </p>
            <div className="flex gap-2.5">
              <a
                href={instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-accent/15 border border-white/[0.08] hover:border-accent/25 transition-all duration-300 flex items-center justify-center group cursor-pointer"
                aria-label="اینستاگرام"
              >
                <Instagram className="w-4 h-4 text-white/55 group-hover:text-accent transition-colors duration-300" />
              </a>
              <a
                href={telegramUrl || 'https://t.me'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-accent/15 border border-white/[0.08] hover:border-accent/25 transition-all duration-300 flex items-center justify-center group cursor-pointer"
                aria-label="تلگرام"
              >
                <Send className="w-4 h-4 text-white/55 group-hover:text-accent transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white/75 mb-5">دسترسی سریع</h3>
            <ul className="space-y-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] px-2 -mx-2 text-sm text-white/50 hover:text-white transition-all duration-200 hover:translate-x-[-2px] cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white/75 mb-5">تماس و پشتیبانی</h3>
            <ul className="space-y-3.5 mb-6">
              <li className="flex items-center gap-2.5 text-sm text-white/55 group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="group-hover:text-white transition-colors duration-200" dir="ltr">{contactPhone || '021-12345678'}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40 mr-10">
                <span>پاسخگویی شنبه تا پنج‌شنبه، ۹ صبح تا ۶ عصر</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/55 group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="group-hover:text-white transition-colors duration-200">{email || 'info@atifarzam.ir'}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55 group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPinIcon className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="group-hover:text-white transition-colors duration-200 leading-relaxed">{address || 'تهران، خیابان ولیعصر، پلاک 123'}</span>
              </li>
            </ul>
            <ul className="space-y-0.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] px-2 -mx-2 text-sm text-white/40 hover:text-white/75 transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-4 border-t border-white/[0.06]"><FooterTrail /></div>
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">{new Date().toLocaleDateString('fa-IR', { year: 'numeric' })} آتی فرزام ایرانیان — تمامی حقوق محفوظ است</p>
          <div className="flex gap-3">
            <Link href="/privacy" className="inline-flex items-center min-h-[44px] px-2 text-sm text-white/50 hover:text-white/75 transition-colors duration-200 cursor-pointer">حریم خصوصی</Link>
            <Link href="/terms" className="inline-flex items-center min-h-[44px] px-2 text-sm text-white/50 hover:text-white/75 transition-colors duration-200 cursor-pointer">قوانین استفاده</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
