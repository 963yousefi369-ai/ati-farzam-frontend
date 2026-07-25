"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Calendar, BarChart3, Settings, Activity, Target } from "lucide-react";

const navItems = [
  { href: "/market-planner", label: "Dashboard", icon: Activity },
  { href: "/market-planner/weekly", label: "Weekly Plans", icon: Calendar },
  { href: "/market-planner/daily", label: "Daily Plans", icon: Target },
  { href: "/market-planner/backtest", label: "Backtest", icon: BarChart3 },
  { href: "/market-planner/calendar", label: "Calendar", icon: Calendar },
  { href: "/market-planner/settings", label: "Settings", icon: Settings },
];

export default function MarketPlannerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-teal-400" />
          <h1 className="text-lg font-bold">Market Planner</h1>
          <span className="text-xs text-slate-500 ml-2">SP2L Weekly/Daily Intelligence</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <nav className="w-52 shrink-0 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || 
              (item.href !== "/market-planner" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-teal-500/15 text-teal-400 font-medium"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
