'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Headset, Menu, Phone, ShoppingCart, Truck, X } from 'lucide-react'
import ProductSearch from '@/components/search/ProductSearch'
import MobileMenu from '@/components/layout/MobileMenu'
import AccountMenu from '@/components/layout/AccountMenu'
import { useCartStore } from '@/lib/store/cart'
import { useShopStatus } from '@/lib/store/shop-status'
import { useSiteSettings } from '@/lib/store/site-settings'
import { landingData } from '@/data/landing'
import { cn } from '@/lib/utils'

const NAV_LINKS = landingData.navLinks

const PRODUCT_CATEGORIES = [
  { title: 'ردیاب خودرو', desc: 'نصب ثابت، قطع موتور از راه دور', href: '/products?cat=vehicle' },
  { title: 'مدیریت ناوگان', desc: 'پایش لحظه‌ای ناوگان سازمانی', href: '/products?cat=fleet' },
  { title: 'ردیاب شخصی', desc: 'پورتابل، باتری طولانی', href: '/products?cat=personal' },
  { title: 'ردیاب موتورسیکلت', desc: 'ضد آب، مخفی و کم‌مصرف', href: '/products?cat=motorcycle' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { logo, siteName } = useSiteSettings()
  const { contactPhone } = useShopStatus()
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  // Floating (glass) treatment only while sitting on top of the hero
  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Escape closes overlays
  const onKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSearchOpen(false)
      setMegaOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setMegaOpen(false)
  }, [pathname])

  const floating = isHome && !scrolled

  return (
    <>
      <header className="sticky top-0 z-[600]">
        {/* ---------- tier 1: utility strip (now on every page) ---------- */}
        <div className="hidden bg-[#0B1B2B] text-white/70 lg:block">
          <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-6 text-[12.5px]">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-accent" />
                {landingData.utilityBar.freeShipping}
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="flex items-center gap-1.5">
                <Headset className="h-3.5 w-3.5 text-accent" />
                ۱۸ ماه گارانتی تعویض — {landingData.utilityBar.support}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/tracking" className="transition-colors hover:text-white">
                پیگیری سفارش
              </Link>
              <Link href="/contact" className="transition-colors hover:text-white">
                نمایندگی‌ها
              </Link>
            </div>
          </div>
        </div>

        {/* ---------- tier 2: main bar ---------- */}
        <div
          className={cn(
            'border-b transition-all duration-moderate',
            floating
              ? 'border-transparent bg-white/85 backdrop-blur-xl'
              : 'border-transparent bg-white shadow-[0_1px_0_rgba(15,23,42,.09),0_10px_28px_-20px_rgba(11,27,43,.3)]',
          )}
        >
          <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 lg:h-[76px] lg:gap-6 lg:px-8">
            {/* brand — logo only: the logo file already contains the typography */}
            <Link
              href="/"
              aria-label={siteName ?? 'آتی فرزام ایرانیان'}
              className="flex shrink-0 items-center"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={siteName ?? 'آتی فرزام ایرانیان'}
                  width={200}
                  height={44}
                  priority
                  className="h-10 w-auto object-contain lg:h-11"
                />
              ) : (
                // fallback wordmark, used only until site settings load
                <span className="flex items-center gap-2.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#0B1B2B] to-primary text-accent shadow-[0_6px_16px_rgba(11,27,43,.22)]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[22px] w-[22px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.9}
                    >
                      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.4" />
                    </svg>
                  </span>
                  <span className="flex flex-col justify-center leading-none">
                    <span className="text-[17px] font-extrabold tracking-tight text-[#0B1B2B]">
                      آتی فرزام ایرانیان
                    </span>
                    <span
                      dir="ltr"
                      className="mt-[3px] text-[8.5px] font-semibold tracking-[.22em] text-primary"
                    >
                      ATI FARZAM IRANIAN
                    </span>
                  </span>
                </span>
              )}
            </Link>

            {/* search — capped width instead of a full-bleed input */}
            <div className="mx-auto hidden w-full max-w-[520px] lg:block">
              <ProductSearch variant="bar" />
            </div>

            {/* actions */}
            <div className="ms-auto flex items-center gap-1.5 lg:ms-0 lg:gap-2">
              <a
                href={`tel:${landingData.utilityBar.phoneRaw}`}
                className="hidden items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-light-tint xl:flex"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span className="leading-tight">
                  <span className="block text-[10.5px] text-text-muted">مشاوره و فروش</span>
                  <span dir="ltr" className="block text-[13.5px] font-bold text-[#0B1B2B]">
                    {contactPhone ?? landingData.utilityBar.phone}
                  </span>
                </span>
              </a>
              <span className="hidden h-7 w-px bg-hairline xl:block" />

              <button
                type="button"
                aria-label="جستجو"
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline text-[#0B1B2B] lg:hidden"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
                </svg>
              </button>

              <Link
                href="/cart"
                aria-label={`سبد خرید (${itemCount} کالا)`}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-hairline text-[#0B1B2B] transition-colors hover:border-accent/40 hover:bg-light-tint"
              >
                <ShoppingCart className="h-[19px] w-[19px]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-white bg-accent px-1 text-[10.5px] font-bold text-white">
                    {itemCount.toLocaleString('fa-IR')}
                  </span>
                )}
              </Link>

              <AccountMenu />

              <button
                type="button"
                aria-label="منو"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline text-[#0B1B2B] lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ---------- tier 3: navigation row ---------- */}
          <div
            className={cn(
              'hidden lg:block',
              floating ? 'border-t border-white/40' : 'border-y border-hairline bg-[#FCFDFE]',
            )}
          >
            <div className="mx-auto flex h-[50px] max-w-[1280px] items-center gap-0.5 px-8">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => link.hasDropdown && setMegaOpen(true)}
                    onMouseLeave={() => link.hasDropdown && setMegaOpen(false)}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex h-[34px] items-center gap-1 rounded-[10px] px-3.5 text-[15px] font-semibold transition-colors',
                        active
                          ? 'bg-accent/10 text-[#0B1B2B]'
                          : 'text-[#475569] hover:bg-primary/[.07] hover:text-primary',
                      )}
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                    </Link>

                    {link.hasDropdown && megaOpen && (
                      <div className="absolute top-full right-0 z-50 w-[620px] rounded-2xl border border-hairline bg-white p-2 shadow-[0_24px_60px_-20px_rgba(11,27,43,.3)]">
                        <div className="grid grid-cols-2 gap-1">
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="rounded-xl p-3.5 transition-colors hover:bg-light-tint"
                            >
                              <span className="block text-sm font-bold text-[#0B1B2B]">
                                {cat.title}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-text-muted">
                                {cat.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      {/* mobile search sheet */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[800] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSearchOpen(false)}
        >
          <div className="bg-white p-4 shadow-lg" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-[#0B1B2B]">جستجو در محصولات</span>
              <button
                type="button"
                aria-label="بستن"
                onClick={() => setSearchOpen(false)}
                className="p-2"
              >
                <X className="h-5 w-5 text-text-muted" />
              </button>
            </div>
            <ProductSearch variant="sheet" autoFocus onNavigate={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
