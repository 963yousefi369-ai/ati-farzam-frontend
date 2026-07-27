"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bike,
  Car,
  ChevronDown,
  ChevronLeft,
  Headphones,
  LogOut,
  MapPin,
  Search,
  ShoppingCart,
  Truck,
  User,
  X,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { useCartStore } from "@/lib/store/cart";
import { useLoginModal } from "@/lib/store/login-modal";
import { useCartDrawer } from "@/lib/store/cart-drawer";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات", hasDropdown: true },
  { href: "/software", label: "نرم‌افزار" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/contact", label: "تماس با ما" },
];

const CATEGORIES = [
  { href: "/products?cat=vehicle", label: "ردیاب خودرو", icon: Car },
  { href: "/products?cat=fleet", label: "ردیاب ناوگان", icon: Truck },
  { href: "/products?cat=personal", label: "ردیاب شخصی", icon: MapPin },
  { href: "/products?cat=motorcycle", label: "ردیاب موتور", icon: Bike },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onSearchClick: () => void;
}

export default function MobileMenu({
  open,
  onClose,
  onSearchClick,
}: MobileMenuProps) {
  const pathname = usePathname();
  const { user, token, logout } = useAuthStore();
  const totalCount = useCartStore((state) => state.totalCount());
  const openLogin = useLoginModal((state) => state.openLogin);
  const openCart = useCartDrawer((state) => state.openDrawer);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [productsExpanded, setProductsExpanded] = useState(false);

  const trapFocus = useCallback((event: KeyboardEvent) => {
    if (!drawerRef.current || event.key !== "Tab") return;
    const items = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      trapFocus(event);
    };
    document.addEventListener("keydown", handleKey);
    document.body.classList.add("menu-open");
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.classList.remove("menu-open");
    };
  }, [open, onClose, trapFocus]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="بستن منو"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[var(--z-mobile-menu-overlay)] bg-dark/50 transition-opacity duration-200 xl:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="منوی اصلی"
        className={cn(
          "fixed inset-y-0 right-0 z-[var(--z-mobile-menu-drawer)] flex w-[min(88vw,340px)] flex-col bg-white shadow-elevated transition-transform duration-200 xl:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex min-h-[72px] items-center justify-between border-b border-border-soft px-4">
          <div>
            <p className="font-semibold text-dark">منوی اصلی</p>
            <p className="mt-0.5 text-xs text-text-muted">آتی فرزام ایرانیان</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-text-secondary hover:bg-bg-soft"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="flex-1 space-y-1 overflow-y-auto p-4"
          aria-label="منوی موبایل"
        >
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            if (link.hasDropdown)
              return (
                <div key={link.href}>
                  <button
                    type="button"
                    onClick={() => setProductsExpanded((value) => !value)}
                    aria-expanded={productsExpanded}
                    className={cn(
                      "flex min-h-12 w-full items-center justify-between rounded-xl px-3.5 text-sm font-medium",
                      active
                        ? "bg-light-tint text-primary"
                        : "text-text-secondary hover:bg-bg-soft",
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        productsExpanded && "rotate-180",
                      )}
                    />
                  </button>
                  {productsExpanded && (
                    <div className="my-2 mr-3 space-y-1 border-r border-border-soft pr-3">
                      {CATEGORIES.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-text-secondary hover:bg-bg-soft"
                        >
                          <category.icon className="h-4 w-4 text-primary" />
                          {category.label}
                        </Link>
                      ))}
                      <Link
                        href="/products"
                        className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-primary hover:bg-light-tint"
                      >
                        مشاهده همه محصولات
                        <ChevronLeft className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            const contact = link.href === "/contact";
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-xl px-3.5 text-sm font-medium",
                  contact
                    ? "mt-3 border border-primary/20 bg-primary/5 text-primary"
                    : active
                      ? "bg-light-tint text-primary"
                      : "text-text-secondary hover:bg-bg-soft",
                )}
              >
                <span className="flex items-center gap-2">
                  {contact && <Headphones className="h-4 w-4" />}
                  {link.label}
                </span>
                <ChevronLeft className="h-4 w-4 opacity-50" />
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-border-soft p-4 safe-area-bottom">
          <button
            type="button"
            onClick={onSearchClick}
            className="flex min-h-12 w-full items-center gap-3 rounded-xl border border-border-soft bg-bg-soft px-4 text-sm text-text-muted"
          >
            <Search className="h-4 w-4" />
            جستجوی محصول...
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              setTimeout(openCart, 200);
            }}
            className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-sm font-medium text-dark hover:bg-bg-soft"
          >
            <span className="flex items-center gap-2.5">
              <ShoppingCart className="h-4 w-4" />
              سبد خرید
            </span>
            {totalCount > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-white">
                {totalCount.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
          {token && user ? (
            <>
              <Link
                href="/profile"
                className="flex min-h-12 items-center gap-2.5 rounded-xl px-4 text-sm font-medium text-dark hover:bg-bg-soft"
              >
                <User className="h-4 w-4" />
                {user.full_name || user.phone_number || "پروفایل"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex min-h-12 w-full items-center gap-2.5 rounded-xl px-4 text-sm font-medium text-error hover:bg-error-light"
              >
                <LogOut className="h-4 w-4" />
                خروج
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                setTimeout(openLogin, 200);
              }}
              className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              <User className="h-4 w-4" />
              ورود به حساب
            </button>
          )}
        </div>
      </div>
    </>
  );
}
