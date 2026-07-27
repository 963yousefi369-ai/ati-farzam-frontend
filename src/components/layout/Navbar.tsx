'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Headphones, Menu, Search, ShoppingCart, X } from 'lucide-react'
import AccountMenu from '@/components/layout/AccountMenu'
import MobileMenu from '@/components/layout/MobileMenu'
import ProductSearch from '@/components/search/ProductSearch'
import { landingData } from '@/data/landing'
import { useCartStore } from '@/lib/store/cart'
import { useSiteSettings } from '@/lib/store/site-settings'
import { cn } from '@/lib/utils'

const NAV_LINKS = landingData.navLinks
const PRODUCT_CATEGORIES = [
  { title: 'ردیاب خودرو', desc: 'امنیت و کنترل خودروی شخصی', href: '/products?cat=vehicle' },
  { title: 'مدیریت ناوگان', desc: 'پایش خودروهای سازمانی', href: '/products?cat=fleet' },
  { title: 'ردیاب شخصی', desc: 'ردیاب قابل حمل و کم‌مصرف', href: '/products?cat=personal' },
  { title: 'ردیاب موتورسیکلت', desc: 'مدل‌های مخفی و مقاوم', href: '/products?cat=motorcycle' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { logo, siteName } = useSiteSettings()
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setMegaOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setMegaOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-[var(--z-navbar)] border-b border-border-soft bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
          <Link href="/" aria-label={siteName || 'آتی فرزام ایرانیان'} className="shrink-0">
            {logo ? (
              <Image src={logo} alt={siteName || 'آتی فرزام ایرانیان'} width={190} height={44} priority className="h-10 w-auto object-contain" />
            ) : (
              <span className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden="true">
                    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <span className="hidden text-base font-bold text-dark sm:block">آتی فرزام ایرانیان</span>
              </span>
            )}
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="منوی اصلی">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href

              if (!link.hasDropdown) {
                const isContact = link.href === '/contact'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-10 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm font-medium transition-colors',
                      isContact
                        ? active
                          ? 'bg-primary text-white'
                          : 'border border-primary/20 bg-primary/5 text-primary hover:border-primary/30 hover:bg-primary/10'
                        : active
                          ? 'bg-light-tint text-primary'
                          : 'text-text-secondary hover:bg-bg-soft hover:text-primary',
                    )}
                  >
                    {isContact && <Headphones className="h-4 w-4 shrink-0" aria-hidden="true" />}
                    {link.label}
                  </Link>
                )
              }

              return (
                <div key={link.href} className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)} onFocus={() => setMegaOpen(true)}>
                  <Link href={link.href} aria-current={active ? 'page' : undefined} aria-expanded={megaOpen} className={cn('flex min-h-10 items-center gap-1 rounded-xl px-3.5 text-sm font-medium transition-colors', active ? 'bg-light-tint text-primary' : 'text-text-secondary hover:bg-bg-soft hover:text-primary')}>
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  {megaOpen && (
                    <div className="absolute right-0 top-full z-[var(--z-dropdown)] w-[520px] pt-3">
                      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border-soft bg-white p-2 shadow-elevated">
                        {PRODUCT_CATEGORIES.map((category) => (
                          <Link key={category.href} href={category.href} className="rounded-xl p-3.5 transition-colors hover:bg-bg-soft">
                            <span className="block text-sm font-semibold text-dark">{category.title}</span>
                            <span className="mt-1 block text-xs leading-5 text-text-muted">{category.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="mx-auto hidden w-full max-w-[360px] lg:block">
            <ProductSearch variant="bar" />
          </div>

          <div className="mr-auto flex items-center gap-1.5">
            <button type="button" aria-label="جستجو" onClick={() => setSearchOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-xl text-dark transition-colors hover:bg-bg-soft lg:hidden">
              <Search className="h-5 w-5" />
            </button>

            <Link href="/cart" aria-label={`سبد خرید، ${itemCount} کالا`} className="relative flex h-11 w-11 items-center justify-center rounded-xl text-dark transition-colors hover:bg-bg-soft">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">{itemCount.toLocaleString('fa-IR')}</span>}
            </Link>

            <AccountMenu />

            <button type="button" aria-label="بازکردن منو" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-xl text-dark transition-colors hover:bg-bg-soft xl:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[var(--z-cmd-search-overlay)] bg-dark/35 lg:hidden" onClick={() => setSearchOpen(false)}>
          <div className="bg-white p-4 shadow-elevated" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-dark">جستجو در محصولات</span>
              <button type="button" aria-label="بستن جستجو" onClick={() => setSearchOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-bg-soft">
                <X className="h-5 w-5" />
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
