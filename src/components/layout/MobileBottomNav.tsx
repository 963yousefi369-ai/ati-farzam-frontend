"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  onSearchClick: () => void;
  hidden?: boolean;
}

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "خانه" },
  { href: "/products", icon: LayoutGrid, label: "محصولات" },
  { type: "search" as const, icon: Search, label: "جستجو" },
  { href: "/cart", icon: ShoppingCart, label: "سبد" },
  { href: "/profile", icon: User, label: "حساب" },
];

export default function MobileBottomNav({
  onSearchClick,
  hidden,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <nav
      aria-label="منوی پایین موبایل"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--z-navbar)] border-t border-border-soft bg-white/95 backdrop-blur-xl transition-transform duration-300 xl:hidden",
        hidden && "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          if (item.type === "search") {
            return (
              <button
                key="search"
                type="button"
                onClick={onSearchClick}
                className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-text-muted transition-colors"
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }

          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors",
                active ? "text-primary" : "text-text-muted",
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.href === "/cart" && itemCount > 0 && (
                <span className="absolute right-1/2 top-1.5 flex h-4 min-w-4 translate-x-3 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                  {itemCount.toLocaleString("fa-IR")}
                </span>
              )}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -top-px h-[2px] rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
