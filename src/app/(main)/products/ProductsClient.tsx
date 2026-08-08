"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  PackageX,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { ProductSkeletonGrid } from "@/components/product/ProductSkeleton";
import AfiPagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import RouteArtwork from "@/components/shared/RouteArtwork";
import { BreadcrumbTrail } from "@/components/trail";
import { cn, toFa } from "@/lib/utils";
import {
  SECTION_Y,
  SHELL,
  PAGE_X,
  GRID_GAP,
  STICKY_UNDER_NAV,
} from "@/lib/rhythm";
import { MOCK_PRODUCT_LIST, MOCK_IMAGE_MAP } from "@/__mocks__/products";

interface Category {
  id: number | string;
  name: string;
}

interface Product {
  id: string | number;
  name: string;
  price: number;
  compare_price?: number;
  in_stock?: boolean;
  stock?: number;
  slug?: string;
}

interface ApiProduct extends Record<string, unknown> {
  id: string | number;
  name: string;
  price: number;
  effective_price?: number;
  discount_price?: number;
  is_on_sale?: boolean;
  stock?: number;
  image?: string;
}

interface ProductsClientProps {
  initialProducts: Product[];
  initialTotal: number;
  initialTotalPages: number;
  categories: Category[];
  imageMap: Record<string, string>;
  initialPage: number;
  initialCategory: string;
  initialSearch: string;
}

const PAGE_SIZE = 12;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function normalize(raw: ApiProduct): Product {
  return {
    ...raw,
    price: raw.effective_price ?? raw.discount_price ?? raw.price,
    compare_price: raw.is_on_sale ? raw.price : undefined,
    in_stock: (raw.stock ?? 0) > 0,
  };
}

export default function ProductsClient({
  initialProducts,
  initialTotal,
  initialTotalPages,
  categories,
  imageMap: initialImageMap,
  initialPage,
  initialCategory,
  initialSearch,
}: ProductsClientProps) {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [imageMap, setImageMap] =
    useState<Record<string, string>>(initialImageMap);
  const [resultCount, setResultCount] = useState(initialTotal);

  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [debouncedPriceMin, setDebouncedPriceMin] = useState("");
  const [debouncedPriceMax, setDebouncedPriceMax] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedPriceMin(priceMin), 500);
    return () => clearTimeout(t);
  }, [priceMin]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedPriceMax(priceMax), 500);
    return () => clearTimeout(t);
  }, [priceMax]);

  // An inverted range is a user typo, not a query. Never send it to the API.
  const invalidRange =
    Boolean(priceMin) &&
    Boolean(priceMax) &&
    Number(priceMin) > Number(priceMax);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (invalidRange) return;

    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("page_size", String(PAGE_SIZE));
        if (activeCategory) params.set("category_id", activeCategory);
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (debouncedPriceMin) params.set("price_min", debouncedPriceMin);
        if (debouncedPriceMax) params.set("price_max", debouncedPriceMax);

        const res = await fetch(`${API_URL}/api/products?${params}`, {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const rawList = (Array.isArray(data)
          ? data
          : (data.results ?? [])) as unknown as ApiProduct[];
        const count: number = data.count ?? rawList.length;

        // An empty result is a valid answer to a filter — show the empty
        // state instead of falling back to placeholder products.
        setProducts(rawList.map(normalize));
        setResultCount(count);
        setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)));

        const nextImages: Record<string, string> = {};
        for (const p of rawList) {
          if (p.image) nextImages[String(p.id)] = p.image;
        }
        if (Object.keys(nextImages).length > 0) {
          setImageMap((prev) => ({ ...prev, ...nextImages }));
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Products fetch error:", err);
        setProducts(MOCK_PRODUCT_LIST);
        setResultCount(MOCK_PRODUCT_LIST.length);
        setTotalPages(1);
        setImageMap(MOCK_IMAGE_MAP);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [
    page,
    activeCategory,
    debouncedSearch,
    debouncedPriceMin,
    debouncedPriceMax,
    invalidRange,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (activeCategory) params.set("category", activeCategory);
    if (debouncedSearch) params.set("search", debouncedSearch);
    const qs = params.toString();
    router.replace(`/products${qs ? "?" + qs : ""}`, { scroll: false });
  }, [page, activeCategory, debouncedSearch, router]);

  const handleCategory = useCallback((catId: string) => {
    setActiveCategory(catId);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((pg: number) => {
    setPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setActiveCategory("");
    setPriceMin("");
    setPriceMax("");
    setPage(1);
  }, []);

  const activeCategoryName = useMemo(
    () => categories.find((c) => String(c.id) === activeCategory)?.name,
    [categories, activeCategory],
  );

  const activeFilterCount =
    (activeCategory ? 1 : 0) +
    (search ? 1 : 0) +
    (priceMin ? 1 : 0) +
    (priceMax ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  const chipClass = (active: boolean) =>
    cn(
      "flex min-h-11 shrink-0 snap-start items-center rounded-full border px-4 text-sm font-medium transition-colors duration-200",
      active
        ? "border-primary bg-primary text-white"
        : "border-border-soft bg-white text-text-secondary hover:border-primary/30 hover:text-primary",
    );

  return (
    <div className={`${SHELL} ${PAGE_X} ${SECTION_Y}`}>
      <div className="mb-6">
        <BreadcrumbTrail dark={false} />
      </div>

      {/* Header — was mb-6 with px-5 py-7, tighter than the cards it sits
          above, so the page opened on a cramped note. */}
      <header className="relative mb-8 overflow-hidden rounded-3xl border border-border-soft bg-white px-6 py-8 sm:px-8 sm:py-10">
        <RouteArtwork className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 text-primary/25 lg:block" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            GPS Product Catalog
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight text-text-heading sm:text-3xl">
            محصولات
          </h1>
          <p className="mt-3 max-w-md text-sm leading-7 text-text-muted">
            ردیاب GPS حرفه‌ای برای خودرو، موتورسیکلت و ناوگان سازمانی
          </p>
        </div>
      </header>

      {/* Filter bar
          The sticky offset was `top-0`, which parks this bar underneath the
          site navbar — the navbar is z-300 and this is z-20, so on mobile the
          filters slid behind it and the search field became unreachable while
          scrolling. Now offset by the real navbar height and raised above it
          in its own right. */}
      <div
        className={`sticky ${STICKY_UNDER_NAV} z-20 -mx-4 mb-8 space-y-4 border-b border-border-soft/70 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none`}
      >
        <div className="flex gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              aria-hidden="true"
            />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="جستجوی محصول…"
              aria-label="جستجوی محصول"
              name="product-search"
              autoComplete="off"
              spellCheck={false}
              className="h-11 rounded-xl border-border-soft bg-white pl-10 pr-9 text-sm focus-visible:ring-accent/40"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                aria-label="پاک کردن جستجو"
                className="absolute left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-muted hover:text-text-heading"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="price-filter-panel"
            className={cn(
              "flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors duration-200",
              filtersOpen
                ? "border-primary bg-primary text-white"
                : "border-border-soft bg-white text-text-secondary hover:border-accent/40",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">قیمت</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                filtersOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Category chips — horizontal rail on mobile, wrap on desktop */}
        {categories.length > 0 && (
          <div
            role="radiogroup"
            aria-label="دسته‌بندی محصولات"
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          >
            <button
              type="button"
              role="radio"
              aria-checked={activeCategory === ""}
              onClick={() => handleCategory("")}
              className={chipClass(activeCategory === "")}
            >
              همه
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="radio"
                aria-checked={activeCategory === String(cat.id)}
                onClick={() => handleCategory(String(cat.id))}
                className={chipClass(activeCategory === String(cat.id))}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Price panel */}
        <div
          id="price-filter-panel"
          hidden={!filtersOpen}
          className="rounded-2xl border border-border-soft bg-white p-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="whitespace-nowrap text-sm font-medium text-text-muted">
              محدوده قیمت (تومان)
            </span>
            <Input
              type="text"
              inputMode="numeric"
              value={priceMin}
              onChange={(e) => {
                setPriceMin(e.target.value.replace(/[^0-9]/g, ""));
                setPage(1);
              }}
              placeholder="حداقل"
              aria-label="حداقل قیمت"
              aria-invalid={invalidRange}
              name="price-min"
              autoComplete="off"
              spellCheck={false}
              className="h-11 max-w-[130px] flex-1 rounded-lg border-border-soft bg-bg-muted text-sm tabular-nums focus-visible:ring-accent/40"
            />
            <span className="text-sm text-text-muted">تا</span>
            <Input
              type="text"
              inputMode="numeric"
              value={priceMax}
              onChange={(e) => {
                setPriceMax(e.target.value.replace(/[^0-9]/g, ""));
                setPage(1);
              }}
              placeholder="حداکثر"
              aria-label="حداکثر قیمت"
              aria-invalid={invalidRange}
              name="price-max"
              autoComplete="off"
              spellCheck={false}
              className="h-11 max-w-[130px] flex-1 rounded-lg border-border-soft bg-bg-muted text-sm tabular-nums focus-visible:ring-accent/40"
            />
          </div>
          {invalidRange && (
            <p role="alert" className="mt-3 text-xs text-error">
              حداقل قیمت نمی‌تواند بیشتر از حداکثر باشد
            </p>
          )}
        </div>

        {/* Active filters */}
        {hasActiveFilters && (
          <div
            role="group"
            aria-label="فیلترهای فعال"
            className="flex flex-wrap items-center gap-2"
          >
            {activeCategory && activeCategoryName && (
              <FilterTag
                label={activeCategoryName}
                onRemove={() => handleCategory("")}
                removeLabel={`حذف فیلتر دسته‌بندی: ${activeCategoryName}`}
              />
            )}
            {search && (
              <FilterTag
                label={`«${search}»`}
                onRemove={() => setSearch("")}
                removeLabel={`حذف فیلتر جستجو: ${search}`}
              />
            )}
            {priceMin && (
              <FilterTag
                label={`از ${Number(priceMin).toLocaleString("fa-IR")} تومان`}
                onRemove={() => setPriceMin("")}
                removeLabel="حذف فیلتر حداقل قیمت"
              />
            )}
            {priceMax && (
              <FilterTag
                label={`تا ${Number(priceMax).toLocaleString("fa-IR")} تومان`}
                onRemove={() => setPriceMax("")}
                removeLabel="حذف فیلتر حداکثر قیمت"
              />
            )}
            <button
              type="button"
              onClick={clearFilters}
              aria-label="حذف همه فیلترها"
              className="flex min-h-11 cursor-pointer items-center px-2 text-sm font-medium text-error transition-colors hover:text-error-text"
            >
              حذف همه
            </button>
          </div>
        )}
      </div>

      {/* Result count */}
      <p
        aria-live="polite"
        className="mb-5 text-sm text-text-muted"
        data-loading={loading ? "true" : undefined}
      >
        {loading ? (
          "در حال به‌روزرسانی نتایج…"
        ) : (
          <>
            <span className="font-semibold tabular-nums text-text-heading">
              {toFa(resultCount)}
            </span>{" "}
            محصول
            {hasActiveFilters ? " با فیلترهای فعلی" : ""}
          </>
        )}
      </p>

      {/* Grid — gap was `gap-3 sm:gap-4`. At two columns on a phone, 12px
          between product cards is not enough separation for cards that each
          carry an image, a title, a price and a button. */}
      {loading ? (
        <ProductSkeletonGrid count={Math.min(PAGE_SIZE, 8)} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<PackageX className="h-6 w-6" aria-hidden="true" />}
          title="محصولی با این فیلترها پیدا نشد"
          description="عبارت جستجو را کوتاه‌تر کنید یا دسته‌بندی دیگری را انتخاب کنید."
          action={
            hasActiveFilters ? (
              <Button onClick={clearFilters} className="pill min-h-11 px-6">
                نمایش همه محصولات
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div className={`grid grid-cols-2 ${GRID_GAP} lg:grid-cols-3 xl:grid-cols-4`}>
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                imageUrl={imageMap[String(product.id)]}
                priority={i < 4}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center md:mt-14">
              <AfiPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
  removeLabel,
}: {
  label: string;
  onRemove: () => void;
  removeLabel: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent-light py-1 pr-3 text-sm font-medium text-accent">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent/10"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </span>
  );
}
