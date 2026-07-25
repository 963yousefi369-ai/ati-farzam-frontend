'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Image, LayoutDashboard, LogOut, ChevronLeft } from 'lucide-react'

const NAV = [
  { href: '/admin/banners', label: 'بنرها', icon: Image },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-primary">پنل مدیریت</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 rotate-180" />
            بازگشت به سایت
          </Link>
          <button
            onClick={() => {
              document.cookie = 'afi_admin_token=; path=/; max-age=0'
              window.location.href = '/admin/login'
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            خروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
