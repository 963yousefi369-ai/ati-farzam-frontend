"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Bike,
  Car,
  ChevronDown,
  Headphones,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import AccountMenu from "@/components/layout/AccountMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProductSearch from "@/components/search/ProductSearch";
import { landingData } from "@/data/landing";
import { useCartStore } from "@/lib/store/cart";
import { useSiteSettings } from "@/lib/store/site-settings";
import { cn } from "@/lib/utils";

const PRODUCT_CATEGORIES = [
  {
    title: "ردیاب خودرو",
    desc: "امنیت و کنترل خودروی شخصی",
    href: "/products?cat=vehicle",
    icon: Car,
  },
  {
    title: "مدیریت ناوگان",
    desc: "پایش خودروهای سازمانی",
    href: "/products?cat=fleet",
    icon: Truck,
  },
  {
    title: "ردیاب شخصی",
    desc: "ردیاب قابل حمل و کم‌مصرف",
    href: "/products?cat=personal",
    icon: MapPin,
  },
  {
    title: "ردیاب موتورسیکلت",
    desc: "مدل‌های مخفی و مقاوم",
    href: "/products?cat=motorcycle",
    icon: Bike,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { logo, siteName } = useSiteSettings();
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── close every overlay on route change ── */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  /* ── Esc closes search + mega menu ── */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setProductsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── scroll state: condensed bar + reading progress ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 8);
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  const openProducts = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setProductsOpen(true);
  };

  const scheduleCloseProducts = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setProductsOpen(false), 140);
  };

  const openMobileSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-[var(--z-navbar)]">
        {/* ── main bar ────────────────────────────────────────────── */}
        <div
          className={cn(
            "relative border-b transition-[height,background-color,border-color,box-shadow] duration-300",
            scrolled
              ? "border-border-soft bg-white/85 shadow-[0_18px_40px_-28px_rgba(15,23,42,.55)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-white",
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:gap-5 lg:px-8",
              scrolled ? "h-16" : "h-navbar",
            )}
          >
            {/* همبرگری — موبایل/تبلت، راست‌ترین عنصر کنار لوگو */}
            <button
              type="button"
              aria-label="بازکردن منو"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="-mr-1.5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-dark transition-colors duration-200 hover:bg-bg-soft active:scale-95 xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* logo — unchanged typography lockup */}
            <Link
              href="/"
              aria-label={siteName || "آتی فرزام ایرانیان"}
              className="group shrink-0 rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-accent/20"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={siteName || "آتی فرزام ایرانیان"}
                  width={190}
                  height={44}
                  priority
                  className={cn(
                    "w-auto object-contain transition-[height,transform] duration-300 group-hover:scale-[1.03]",
                    scrolled ? "h-9" : "h-10",
                  )}
                />
              ) : (
                <span className="flex items-center gap-2.5">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.9}
                    >
                      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.4" />
                    </svg>
                  </span>
                  <span className="hidden text-base font-bold text-dark sm:block">
                    آتی فرزام ایرانیان
                  </span>
                </span>
              )}
            </Link>

            {/* primary nav */}
            <nav
              className="hidden items-center gap-0.5 rounded-2xl border border-border-soft/70 bg-bg-soft/70 p-1 xl:flex"
              aria-label="منوی اصلی"
            >
              {landingData.navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                if (!link.hasDropdown) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative flex min-h-10 items-center gap-2 overflow-hidden whitespace-nowrap rounded-xl px-3.5 text-[13.5px] font-semibold transition-all duration-200",
                        active
                          ? "bg-white text-primary shadow-[0_6px_18px_-10px_rgba(15,23,42,.5)]"
                          : "text-text-secondary hover:bg-white hover:text-primary hover:shadow-[0_6px_18px_-12px_rgba(15,23,42,.45)]",
                      )}
                    >
                      {link.href === "/contact" && (
                        <Headphones className="h-4 w-4" aria-hidden="true" />
                      )}
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-gradient-to-l from-primary to-accent transition-all duration-300",
                          active
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-60",
                        )}
                      />
                    </Link>
                  );
                }

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openProducts}
                    onMouseLeave={scheduleCloseProducts}
                  >
                    <button
                      type="button"
                      aria-expanded={productsOpen}
                      aria-controls="products-menu"
                      aria-current={active ? "page" : undefined}
                      onClick={() => setProductsOpen((value) => !value)}
                      className={cn(
                        "group relative flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-[13.5px] font-semibold xl:px-3.5 transition-all duration-200",
                        active || productsOpen
                          ? "bg-white text-primary shadow-[0_6px_18px_-10px_rgba(15,23,42,.5)]"
                          : "text-text-secondary hover:bg-white hover:text-primary",
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          productsOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-gradient-to-l from-primary to-accent transition-all duration-300",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </button>

                    {productsOpen && (
                      <div
                        id="products-menu"
                        className="absolute right-1/2 top-full z-[var(--z-dropdown)] w-[min(640px,calc(100vw-3rem))] translate-x-1/2 pt-3"
                      >
                        <div className="animate-scale-in overflow-hidden rounded-3xl border border-border-soft bg-white shadow-elevated">
                          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px]">
                            <div className="grid grid-cols-2 gap-1.5 p-3">
                              {PRODUCT_CATEGORIES.map((category) => (
                                <Link
                                  key={category.href}
                                  href={category.href}
                                  className="group flex items-start gap-3 rounded-2xl border border-transparent p-3.5 transition-all duration-200 hover:border-border-soft hover:bg-bg-soft"
                                >
                                  <span
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_10px_20px_-12px_rgba(20,184,166,.9)] transition-transform duration-200 group-hover:scale-105"
                                    aria-hidden="true"
                                  >
                                    <category.icon className="h-[18px] w-[18px]" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex items-center gap-1 text-[13.5px] font-bold text-dark">
                                      {category.title}
                                      <ArrowLeft
                                        className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span className="mt-1 block text-xs leading-5 text-text-muted">
                                      {category.desc}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                            </div>

                            {/* promo rail */}
                            <div className="relative m-3 mr-0 overflow-hidden rounded-2xl bg-gradient-to-br from-dark to-primary p-4 text-white">
                              <span
                                aria-hidden="true"
                                className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-accent/30 blur-2xl"
                              />
                              <p className="relative text-[13.5px] font-bold leading-6">
                                نمی‌دونی کدوم ردیاب مناسبته؟
                              </p>
                              <p className="relative mt-1.5 text-xs leading-6 text-white/70">
                                کارشناس‌های ما رایگان راهنماییت می‌کنن.
                              </p>
                              <Link
                                href="/contact"
                                className="relative mt-3.5 inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-accent px-3.5 text-xs font-bold text-white transition-transform duration-200 hover:scale-[1.03]"
                              >
                                مشاوره رایگان
                                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                              </Link>
                              <Link
                                href="/products"
                                className="relative mt-2.5 flex items-center gap-1 text-xs font-semibold text-white/80 transition-colors hover:text-white"
                              >
                                مشاهده همه محصولات
                                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                              </Link>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-border-soft bg-bg-soft/80 px-4 py-2.5 text-[11.5px] text-text-muted">
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck
                                className="h-3.5 w-3.5 text-accent"
                                aria-hidden="true"
                              />
                              گارانتی معتبر و نصب تخصصی
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Headphones
                                className="h-3.5 w-3.5 text-primary"
                                aria-hidden="true"
                              />
                              پشتیبانی ۲۴/۷
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* search */}
            <div className="mx-auto hidden w-full max-w-[300px] lg:block xl:max-w-[380px] 2xl:max-w-[440px]">
              <div className="relative">
                <ProductSearch variant="bar" />
                <kbd
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border-soft bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-text-muted xl:block"
                >
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* actions */}
            <div className="mr-auto flex items-center gap-2">
              <button
                type="button"
                aria-label="جستجو"
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-dark transition-colors hover:bg-bg-soft lg:hidden"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/cart"
                aria-label={`سبد خرید، ${itemCount} کالا`}
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-dark transition-all duration-200 hover:border-border-soft hover:bg-bg-soft"
              >
                <ShoppingCart className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                {itemCount > 0 && (
                  <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {itemCount.toLocaleString("fa-IR")}
                  </span>
                )}
              </Link>

              <AccountMenu />


            </div>
          </div>

          {/* reading progress */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] origin-right bg-gradient-to-l from-primary via-accent to-accent transition-[width] duration-150"
            style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }}
          />
        </div>
      </header>

      {/* backdrop for the mega menu */}
      {productsOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-[290] hidden bg-dark/25 backdrop-blur-[3px] xl:block"
        />
      )}

      {searchOpen && (
        <div
          className="fixed inset-0 z-[var(--z-cmd-search-overlay)] bg-dark/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="animate-fade-in rounded-b-3xl bg-white p-4 shadow-elevated"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-dark">
                جستجو در محصولات
              </span>
              <button
                type="button"
                aria-label="بستن جستجو"
                onClick={() => setSearchOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-bg-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductSearch
              variant="sheet"
              autoFocus
              onNavigate={() => setSearchOpen(false)}
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {PRODUCT_CATEGORIES.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full border border-border-soft bg-bg-soft px-3 py-1.5 text-xs font-medium text-text-secondary"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearchClick={openMobileSearch}
      />

      {/* تب‌بار پایین موبایل — بدون نیاز به هیچ wiring اضافه در layout */}
      <MobileBottomNav
        onSearchClick={openMobileSearch}
        hidden={menuOpen || searchOpen}
      />
    </>
  );
}
