'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ShoppingCart, User, LogOut, Menu, Settings,
  ChevronDown, Phone, Truck, MapPin, Clock, ArrowLeft, Loader2, X,
} from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useAuthStore } from '@/lib/store/auth'
import { useLoginModal } from '@/lib/store/login-modal'
import { useCartDrawer } from '@/lib/store/cart-drawer'
import { useShopStatus } from '@/lib/store/shop-status'
import MobileMenu from './MobileMenu'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { getProducts, djangoImageUrl } from '@/lib/api/django'
import { trackSearch } from '@/lib/tracking'
import { landingData } from '@/data/landing'
import { LogoAtiFarzam, IconSearch, IconCart } from '@/components/svg'
import { IconTile } from '@/components/ui/IconTile'
import { useSiteSettings } from '@/lib/store/site-settings'
import Image from 'next/image'

const NAV_LINKS = landingData.navLinks

const PRODUCT_CATEGORIES = [
  { href: '/products?cat=vehicle', label: 'ردیاب خودرو', desc: 'خودروهای شخصی و سازمانی' },
  { href: '/products?cat=fleet', label: 'ردیاب ناوگان', desc: 'مدیریت ناوگان تجاری' },
  { href: '/products?cat=personal', label: 'ردیاب شخصی', desc: 'افراد و کودکان' },
  { href: '/products?cat=motorcycle', label: 'ردیاب موتور', desc: 'موتورسیکلت و دوچرخه' },
]

function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await getProducts({ q: query, page_size: 5 })
        setResults((data?.results ?? data ?? []).map((p: any) => ({ id: String(p.id), name: p.name })))
      } catch { setResults([]) }
      finally { setLoading(false) }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const go = (name: string) => {
    trackSearch(name)
    setOpen(false)
    setQuery('')
    router.push(`/products?q=${encodeURIComponent(name)}`)
  }

  return (
    <div className="relative w-full max-w-xs">
      <div className="relative">
        {loading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted animate-spin" />
        ) : (
          <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder="جستجو در محصولات..."
          className="w-full pr-9 pl-4 py-2 rounded-full bg-light-tint border border-hairline text-sm text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
        />
      </div>
      {open && query.length >= 2 && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl border border-hairline shadow-elevated overflow-hidden" style={{ zIndex: 'var(--z-dropdown)' }}>
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => go(r.name)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-dark hover:bg-light-tint transition-colors text-right"
            >
              <IconSearch className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="truncate">{r.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileSearchContent({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await getProducts({ q: query, page_size: 8 })
        setResults((data?.results ?? data ?? []).map((p: any) => ({ id: String(p.id), name: p.name, price: p.price })))
      } catch { setResults([]) }
      finally { setLoading(false) }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const go = (name: string) => {
    trackSearch(name)
    onClose()
    router.push(`/products?q=${encodeURIComponent(name)}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      trackSearch(query.trim())
      onClose()
      router.push(`/products?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="flex flex-col max-h-[70vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-sm font-semibold text-text-primary">جستجو</span>
        <button
          onClick={onClose}
          className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl hover:bg-light-tint transition-colors text-text-muted"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="px-4 pb-3">
        <div className="relative">
          {loading ? (
            <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
          ) : (
            <IconSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام محصول را تایپ کنید..."
            className="w-full pr-11 pl-4 py-3.5 rounded-xl bg-light-tint border border-hairline text-sm text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
        </div>
      </form>

      {/* Divider */}
      <div className="border-t border-hairline" />

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {query.length >= 2 && results.length > 0 && (
          <div className="p-2">
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => go(r.name)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm hover:bg-light-tint active:scale-[0.98] transition-all text-right group"
              >
                <div className="w-8 h-8 rounded-lg bg-light-tint flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <IconSearch className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <span className="truncate flex-1 text-text-primary font-medium">{r.name}</span>
                {r.price != null && (
                  <span className="text-xs text-text-muted shrink-0">{r.price.toLocaleString('fa-IR')} تومان</span>
                )}
              </button>
            ))}
          </div>
        )}
        {query.length >= 2 && results.length === 0 && !loading && (
          <div className="p-8 text-center">
            <IconSearch className="w-10 h-10 text-text-muted/20 mx-auto mb-3" />
            <p className="text-sm text-text-muted">نتیجه‌ای یافت نشد</p>
          </div>
        )}
        {query.length < 2 && (
          <div className="p-8 text-center">
            <IconSearch className="w-10 h-10 text-text-muted/20 mx-auto mb-3" />
            <p className="text-sm text-text-muted">برای جستجو، نام محصول را تایپ کنید</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const megaRef = useRef<HTMLDivElement>(null)
  const megaTriggerRef = useRef<HTMLAnchorElement>(null)
  const totalCount = useCartStore((s) => s.totalCount())
  const { user, token, logout } = useAuthStore()
  const openLogin = useLoginModal((s) => s.openLogin)
  const openCartDrawer = useCartDrawer((s) => s.openDrawer)
  const { contactPhone } = useShopStatus()
  const { logo,siteName } = useSiteSettings()

  const displayName = user?.full_name || user?.phone_number || ''
  const isHome = pathname === '/'

  // شفاف بودن نوبار روی هیرو — فقط صفحه اصلی
  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <a href="#main-content" className="sr-only sr-only-focusable">
        رفتن به محتوای اصلی
      </a>

      {/* ── Sticky Header Band (utility bar + floating navbar) ── */}
      <div
        className={cn(
          'sticky top-0 z-[var(--z-navbar)] px-4 lg:px-6 pt-2 pb-2',
          isHome ? 'bg-transparent' : 'bg-dark',
        )}
        style={{ overflow: 'visible' }}
      >
        {/* ── Top Utility Bar ── */}
        {!isHome && (
        <div className="transition-opacity duration-300">
          <div className="max-w-[1440px] mx-auto px-2 lg:px-4 h-9 flex items-center justify-between text-xs text-white">
            <div className="hidden sm:flex items-center gap-2 opacity-90">
              <Truck className="w-3.5 h-3.5 opacity-70" />
              <span>{landingData.utilityBar.freeShipping}</span>
            </div>
            <div className="flex items-center gap-4 opacity-90">
              <span className="hidden sm:inline">{landingData.utilityBar.support}</span>
              <span className="hidden sm:inline opacity-20">|</span>
              <a href={`tel:${landingData.utilityBar.phoneRaw}`} className="flex items-center gap-1.5 hover:opacity-100 transition-opacity" dir="ltr">
                <span>{landingData.utilityBar.phone}</span>
                <Phone className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
        )}

        {/* ── Floating Navbar ── */}
        <div className="relative" style={{ overflow: 'visible' }}>
        <nav
          className="max-w-[1440px] mx-auto glass rounded-2xl shadow-elevated transition-shadow duration-base"
        >
          <div className="px-4 lg:px-6">
            <div className="flex items-center gap-4 h-navbar">

              {/* Mobile hamburger */}
              <button
                className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 rounded-lg hover:bg-light-tint transition-colors text-text-muted"
                onClick={() => setMobileOpen(true)}
                aria-label="منو"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Logo */}
              <Link href="/" className="shrink-0 flex items-center gap-2 group/logo">
                {logo ? (
                  <Image
                    src={djangoImageUrl(logo)}
                    alt={siteName}
                    width={84}
                    height={84}
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain transition-transform duration-base group-hover/logo:scale-105 flex-shrink-0"
                    priority
                  />
                ) : (
                  <LogoAtiFarzam className="w-10 h-10 sm:w-14 sm:h-14 transition-transform duration-base group-hover/logo:scale-105 flex-shrink-0" />
                )}
                
              </Link>

              {/* Search bar — desktop */}
              <div className="flex-1 flex justify-center">
                <div className="hidden lg:block">
                  <SearchInput />
                </div>
              </div>

              {/* Spacer mobile */}
              <div className="flex-1 lg:hidden" />

              {/* Mobile search */}
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text-muted hover:text-primary hover:bg-light-tint transition-colors"
                aria-label="جستجو"
              >
                <IconSearch className="w-5 h-5" />
              </button>

              {/* Nav links — desktop */}
              <div className="hidden lg:flex items-center gap-1" ref={megaRef}>
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  return (
                    <div key={link.href} className="relative">
                        <Link
                          ref={link.hasDropdown ? megaTriggerRef : undefined}
                          href={link.href}
                          onClick={(e) => {
                            if (link.hasDropdown) { e.preventDefault(); setMegaOpen((o) => !o) }
                          }}
                          onMouseEnter={() => link.hasDropdown && setMegaOpen(true)}
                          className={cn(
                            'flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-all duration-moderate',
                            isActive
                              ? 'font-semibold bg-primary/8 text-primary'
                              : 'font-medium text-dark hover:bg-light-tint'
                          )}
                        >
                        {link.label}
                        {link.hasDropdown && (
                          <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-moderate', megaOpen && 'rotate-180')} />
                        )}
                        {/* Active dot indicator */}
                        {isActive && !link.hasDropdown && (
                          <span className="absolute -bottom-1 right-1/2 translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                        )}
                      </Link>

                      {/* Mega dropdown */}
                      <AnimatePresence>
                        {link.hasDropdown && megaOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 w-[min(440px,calc(100vw-2rem))]"
                            onMouseLeave={() => setMegaOpen(false)}
                          >
                            <div className="bg-white border border-hairline rounded-2xl overflow-hidden shadow-elevated">
                              <div className="p-5">
                                <h2 className="text-xs font-semibold text-text-muted mb-3">دسته‌بندی محصولات</h2>
                                <div className="grid grid-cols-2 gap-2">
                                  {PRODUCT_CATEGORIES.map((cat) => (
                                    <Link
                                      key={cat.href}
                                      href={cat.href}
                                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-light-tint transition-all group/cat"
                                      onClick={() => setMegaOpen(false)}
                                    >
                                      <IconTile icon={MapPin} size="sm" className="group-hover/cat:bg-primary/10 transition-colors" />
                                      <div>
                                        <span className="text-sm font-semibold text-dark group-hover/cat:text-primary transition-colors block">
                                          {cat.label}
                                        </span>
                                        <span className="text-xs text-text-muted mt-0.5 block">{cat.desc}</span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              <div className="px-5 py-3 bg-light-tint/60 border-t border-hairline flex items-center justify-between">
                                <span className="text-xs text-text-muted">مشاهده تمام محصولات</span>
                                <Link
                                  href="/products"
                                  onClick={() => setMegaOpen(false)}
                                  className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                                >
                                  رفتن به فروشگاه ←
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Cart + Auth */}
              <div className="flex items-center gap-2">
                {/* Cart */}
                <button
                  onClick={openCartDrawer}
                  className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text-muted hover:text-primary hover:bg-light-tint transition-colors"
                  aria-label="سبد خرید"
                >
                  <IconCart className="w-5 h-5 text-primary" />
                  {totalCount > 0 && (
                    <span className="absolute -top-0.5 -start-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1">
                      {totalCount > 99 ? '99+' : totalCount.toLocaleString('fa-IR')}
                    </span>
                  )}
                </button>

                {/* Auth */}
                {token && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text-muted hover:text-primary hover:bg-light-tint transition-colors" aria-label="منوی کاربری">
                        <User className="w-5 h-5 text-primary" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 bg-white border border-hairline shadow-elevated">
                      <div className="px-3 py-2 border-b border-hairline mb-1">
                        <p className="text-sm font-semibold text-dark truncate">{displayName}</p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm">
                          <User className="w-4 h-4 text-text-muted" />
                          پروفایل
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm">
                          <Settings className="w-4 h-4 text-text-muted" />
                          سفارش‌ها
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-error focus:text-error flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        خروج
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button
                    onClick={() => openLogin()}
                    className="hidden lg:flex items-center gap-2 bg-primary text-white pill px-5 py-2 text-sm font-semibold hover:bg-primary-dark transition-colors min-h-[44px]"
                  >
                    ورود
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onSearchClick={() => setMobileSearchOpen(true)} />

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[800] lg:hidden flex items-start justify-center px-4 pt-[15vh]"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMobileSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <MobileSearchContent onClose={() => setMobileSearchOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
