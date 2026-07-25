'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Search, User, LogOut, ShoppingCart, ChevronLeft, Truck, Car, MapPin, Bike } from 'lucide-react'
import { useAuthStore } from '@/lib/store/auth'
import { useCartStore } from '@/lib/store/cart'
import { useLoginModal } from '@/lib/store/login-modal'
import { useCartDrawer } from '@/lib/store/cart-drawer'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useCallback } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'خانه' },
  { href: '/products', label: 'محصولات' },
  { href: '/software', label: 'نرم‌افزار' },
  { href: '/blog', label: 'وبلاگ' },
  { href: '/contact', label: 'تماس با ما' },
]

const QUICK_CATEGORIES = [
  { href: '/products?cat=vehicle', label: 'ردیاب خودرو', icon: Car },
  { href: '/products?cat=fleet', label: 'ردیاب ناوگان', icon: Truck },
  { href: '/products?cat=personal', label: 'ردیاب شخصی', icon: MapPin },
  { href: '/products?cat=motorcycle', label: 'ردیاب موتور', icon: Bike },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onSearchClick: () => void
}

export default function MobileMenu({ open, onClose, onSearchClick }: MobileMenuProps) {
  const pathname = usePathname()
  const { user, token, logout } = useAuthStore()
  const totalCount = useCartStore((s) => s.totalCount())
  const openLogin = useLoginModal((s) => s.openLogin)
  const openCartDrawer = useCartDrawer((s) => s.openDrawer)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Focus trap
  const handleTrapFocus = useCallback((e: KeyboardEvent) => {
    if (!drawerRef.current) return
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      handleTrapFocus(e)
    }
    document.addEventListener('keydown', escHandler)
    closeButtonRef.current?.focus()
    return () => document.removeEventListener('keydown', escHandler)
  }, [open, onClose, handleTrapFocus])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => { document.body.classList.remove('menu-open') }
  }, [open])

  const handleCartClick = () => {
    onClose()
    setTimeout(openCartDrawer, 200)
  }

  const handleLoginClick = () => {
    onClose()
    setTimeout(() => openLogin(), 200)
  }

  const handleSearchClick = () => {
    onClose()
    setTimeout(() => onSearchClick(), 200)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-all duration-base lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ zIndex: 'var(--z-mobile-menu-overlay)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed top-0 right-0 bottom-0 w-[300px] bg-white transition-transform duration-ceiling lg:hidden flex flex-col',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ zIndex: 'var(--z-mobile-menu-drawer)', boxShadow: open ? 'var(--shadow-hover)' : 'none' }}
        role="dialog"
        aria-modal="true"
        aria-label="منوی اصلی"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-soft/60">
          <h2 className="font-semibold text-text-primary text-base">منو</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-bg-muted transition-colors text-text-secondary"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search trigger */}
        <div className="p-4 pb-2">
          <button
            onClick={handleSearchClick}
            className="w-full flex items-center gap-3 h-11 px-4 rounded-xl bg-bg-muted border border-border-soft text-text-muted text-sm hover:border-primary/20 transition-colors"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>جستجوی محصولات...</span>
          </button>
        </div>

        {/* Quick categories */}
        <div className="px-4 pb-3">
          <p className="text-xs font-medium text-text-muted mb-2 px-1">دسته‌بندی‌ها</p>
          <div className="flex flex-col gap-1">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex items-center gap-3 px-3 min-h-[44px] rounded-lg bg-bg-muted/60 hover:bg-bg-muted transition-colors text-sm font-medium text-text-secondary hover:text-text-primary"
              >
                <cat.icon className="w-5 h-5 text-text-secondary" />
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-4 border-t border-border-soft/60" />

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center justify-between gap-3 px-3 min-h-[44px] rounded-xl text-sm font-medium transition-all duration-moderate',
                  isActive
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary active:scale-[0.98]'
                )}
              >
                <span>{link.label}</span>
                  <ChevronLeft className={cn(
                  'w-4 h-4',
                  isActive ? 'text-primary' : 'text-text-tertiary'
                )} />
              </Link>
            )
          })}
        </nav>

        {/* Order tracking link */}
        <div className="px-4 pb-2">
          <Link
            href="/profile/orders"
            className="flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-bg-muted/60 hover:bg-bg-muted transition-colors text-sm font-medium text-text-secondary"
          >
            <Truck className="w-4 h-4" />
            پیگیری سفارش
          </Link>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-border-soft/60 space-y-2">
          <button
            onClick={handleCartClick}
            className="w-full flex items-center justify-between gap-3 px-4 min-h-[44px] rounded-xl bg-bg-muted/60 hover:bg-bg-muted transition-colors text-text-primary text-sm font-medium active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4 text-text-secondary" />
              سبد خرید
            </div>
            {totalCount > 0 && (
              <span className="min-w-[22px] h-5 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1.5">
                {totalCount.toLocaleString('fa-IR')}
              </span>
            )}
          </button>

          {token && user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-4 min-h-[44px] rounded-xl bg-bg-muted/60 hover:bg-bg-muted transition-colors text-text-primary text-sm font-medium active:scale-[0.98]"
              >
                <div className="w-7 h-7 rounded-full bg-primary/8 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                {user.full_name || user.phone_number || 'پروفایل'}
              </Link>
              <button
                onClick={() => { logout(); onClose() }}
                className="w-full flex items-center gap-2.5 px-4 min-h-[44px] rounded-xl text-error hover:bg-error-light/50 transition-colors text-sm font-medium active:scale-[0.98]"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="w-full flex items-center justify-center gap-2.5 px-4 min-h-[44px] rounded-xl bg-primary text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-card-hover transition-[transform,box-shadow,background-color,color,border-color] duration-base active:scale-[0.98]"
            >
              <User className="w-4 h-4" />
              ورود به حساب
            </button>
          )}
        </div>
      </div>
    </>
  )
}
