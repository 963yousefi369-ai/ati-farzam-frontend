'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  ShieldCheck,
  User,
} from 'lucide-react'
import { useAuthStore } from '@/lib/store/auth'
import { useLoginModal } from '@/lib/store/login-modal'
import { cn } from '@/lib/utils'

const MENU = [
  { href: '/profile', label: 'پنل کاربری', icon: LayoutDashboard },
  { href: '/profile/orders', label: 'سفارش‌های من', icon: Package },
  { href: '/profile/favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
  { href: '/tracking', label: 'پیگیری سفارش', icon: MapPin },
]

/**
 * Account entry point for the navbar.
 * - guest  → "ورود / ثبت‌نام" button that opens the existing login modal
 * - logged in → avatar chip with a dropdown for account management
 */
export default function AccountMenu() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const openLogin = useLoginModal((state) => state.openLogin)

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  // zustand `persist` hydrates on the client, so render the guest state on the
  // server pass and swap in after mount to avoid a hydration mismatch
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onDown = (event: MouseEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!mounted || !user) {
    return (
      <button
        type="button"
        onClick={() => openLogin()}
        className="flex h-11 items-center gap-2 rounded-xl border border-hairline bg-white px-3 text-[13.5px] font-bold text-[#0B1B2B] transition-colors hover:border-accent/40 hover:bg-light-tint lg:px-4"
      >
        <User className="h-[18px] w-[18px] text-primary" />
        <span className="hidden sm:inline">ورود / ثبت‌نام</span>
      </button>
    )
  }

  const firstName = user.full_name?.trim().split(' ')[0] || 'حساب من'
  const initial = firstName.charAt(0)

  return (
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex h-11 items-center gap-2 rounded-xl border px-2.5 transition-colors lg:px-3',
          open ? 'border-accent/40 bg-light-tint' : 'border-hairline bg-white hover:bg-light-tint',
        )}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
          {initial}
        </span>
        <span className="hidden max-w-[96px] truncate text-[13.5px] font-semibold text-dark lg:inline">
          {firstName}
        </span>
        <ChevronDown
          className={cn(
            'hidden h-3.5 w-3.5 text-text-muted transition-transform lg:block',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 z-[700] mt-2 w-[248px] overflow-hidden rounded-2xl border border-hairline bg-white py-1.5 shadow-[0_24px_60px_-20px_rgba(11,27,43,.3)]"
        >
          <div className="px-4 pb-2.5 pt-2">
            <p className="truncate text-sm font-bold text-[#0B1B2B]">{user.full_name}</p>
            <p dir="ltr" className="mt-0.5 text-right text-xs text-text-muted">
              {user.phone_number}
            </p>
          </div>
          <div className="h-px bg-hairline" />

          {MENU.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center gap-2.5 px-4 text-[13.5px] font-medium text-dark transition-colors hover:bg-light-tint hover:text-primary"
            >
              <Icon className="h-4 w-4 text-text-muted" />
              {label}
            </Link>
          ))}

          {user.is_staff && (
            <Link
              href="/admin"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center gap-2.5 px-4 text-[13.5px] font-bold text-primary transition-colors hover:bg-light-tint"
            >
              <ShieldCheck className="h-4 w-4" />
              پنل مدیریت
            </Link>
          )}

          <div className="my-1 h-px bg-hairline" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              logout()
              setOpen(false)
              router.push('/')
            }}
            className="flex min-h-[44px] w-full items-center gap-2.5 px-4 text-right text-[13.5px] font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            خروج از حساب
          </button>
        </div>
      )}
    </div>
  )
}
