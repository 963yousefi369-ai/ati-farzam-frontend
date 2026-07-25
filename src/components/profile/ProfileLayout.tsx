'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, ShoppingBag, MapPin, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/store/auth'

const NAV_ITEMS = [
  { href: '/profile', label: 'پروفایل', icon: User, color: 'bg-teal-50 text-teal-600' },
  { href: '/profile/orders', label: 'سفارش‌ها', icon: ShoppingBag, color: 'bg-amber-50 text-amber-600' },
  { href: '/profile/addresses', label: 'آدرس‌ها', icon: MapPin, color: 'bg-violet-50 text-violet-600' },
]

function initials(name?: string | null): string {
  if (!name) return 'کا'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0] ?? 'کا'
  return (parts[0][0] ?? '') + (parts[parts.length - 1][0] ?? '')
}

function NavLinks({ className, itemClassName }: { className?: string; itemClassName?: string }) {
  const pathname = usePathname()

  return (
    <nav className={className} aria-label="منوی حساب کاربری">
      {NAV_ITEMS.map(({ href, label, icon: Icon, color }) => {
        const active = href === '/profile'
          ? pathname === '/profile'
          : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2',
              active
                ? 'bg-accent-light/40 text-accent'
                : 'text-text-muted hover:bg-bg-muted hover:text-text-heading',
              itemClassName,
            )}
          >
            <span className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', active ? 'bg-accent/10' : color)}>
              <Icon className="w-4 h-4" />
            </span>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-bg-muted" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">

        {/* Mobile: user info + horizontal nav */}
        <div className="lg:hidden space-y-4 mb-6">
          <div className="bg-white rounded-2xl border border-border-soft p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 bg-primary text-white">
                <AvatarFallback className="bg-primary text-white font-semibold text-xs">
                  {initials(user?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold text-text-heading text-sm truncate">
                  {user?.full_name || 'کاربر'}
                </p>
                <p className="text-text-muted text-xs mt-0.5" dir="ltr">
                  {user?.phone_number}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-border-soft overflow-x-auto" style={{ boxShadow: 'var(--shadow-card)' }}>
            <NavLinks className="flex p-1.5 gap-1" itemClassName="whitespace-nowrap flex-shrink-0" />
            <div className="px-1.5 pb-1.5 border-t border-border-soft">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center gap-2 text-error hover:bg-error-light/50 text-sm font-medium rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج از حساب
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent dir="rtl" className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>خروج از حساب</AlertDialogTitle>
                    <AlertDialogDescription>
                      آیا مطمئن هستید که می‌خواهید از حساب خود خارج شوید؟
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row-reverse gap-2">
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-error hover:bg-error/90 text-white rounded-xl"
                    >
                      بله، خارج شو
                    </AlertDialogAction>
                    <AlertDialogCancel className="rounded-xl">انصراف</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-border-soft overflow-hidden lg:sticky lg:top-24" style={{ boxShadow: 'var(--shadow-card)' }}>
              {/* User info */}
              <div className="p-4 border-b border-border-soft">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-primary text-white">
                    <AvatarFallback className="bg-primary text-white font-semibold text-xs">
                      {initials(user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-text-heading text-sm truncate">
                      {user?.full_name || 'کاربر'}
                    </p>
                    <p className="text-text-muted text-xs mt-0.5" dir="ltr">
                      {user?.phone_number}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <NavLinks className="p-1.5" />

              {/* Logout */}
              <div className="p-1.5 border-t border-border-soft">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-error hover:bg-error-light/50 text-sm font-medium rounded-xl"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج از حساب
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent dir="rtl" className="rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>خروج از حساب</AlertDialogTitle>
                      <AlertDialogDescription>
                        آیا مطمئن هستید که می‌خواهید از حساب خود خارج شوید؟
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-row-reverse gap-2">
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-error hover:bg-error/90 text-white rounded-xl"
                      >
                        بله، خارج شو
                      </AlertDialogAction>
                      <AlertDialogCancel className="rounded-xl">انصراف</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
