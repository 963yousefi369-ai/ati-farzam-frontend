'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Search, PackageX, SlidersHorizontal, X, ChevronDown,
} from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { ProductSkeletonGrid } from '@/components/product/ProductSkeleton'
import AfiPagination from '@/components/shared/Pagination'
import { BreadcrumbTrail } from '@/components/trail'
import EmptyState from '@/components/shared/EmptyState'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, toFa } from '@/lib/utils'
import { MOCK_PRODUCT_LIST, MOCK_CATEGORIES, MOCK_IMAGE_MAP } from '@/__mocks__/products'

interface Category {
  id: number | string
  name: string
}

interface Product {
  id: string | number
  name: string
  price: number
  compare_price?: number
  in_stock?: boolean
  stock?: number
  slug?: string
}

interface ProductsClientProps {
  initialProducts: Product[]
  initialTotal: number
  initialTotalPages: number
  categories: Category[]
  imageMap: Record<string, string>
  initialPage: number
  initialCategory: string
  initialSearch: string
}

const PAGE_SIZE = 12
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefers(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return prefers
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
  const router = useRouter()
  const reducedMotion = usePrefersReducedMotion()

  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loading, setLoading] = useState(false)
  const [imageMap, setImageMap] = useState<Record<string, string>>(initialImageMap)
  const [resultCount, setResultCount] = useState(initialTotal)

  const [search, setSearch] = useState(initialSearch)
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [page, setPage] = useState(initialPage)
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500)
    return () => clearTimeout(t)
  }, [search])

  const [debouncedPriceMin, setDebouncedPriceMin] = useState('')
  const [debouncedPriceMax, setDebouncedPriceMax] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDebouncedPriceMin(priceMin), 500)
    return () => clearTimeout(t)
  }, [priceMin])
  useEffect(() => {
    const t = setTimeout(() => setDebouncedPriceMax(priceMax), 500)
    return () => clearTimeout(t)
  }, [priceMax])

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const controller = new AbortController()

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', String(page))
        params.set('page_size', String(PAGE_SIZE))
        if (activeCategory) params.set('category_id', activeCategory)
        if (debouncedSearch) params.set('search', debouncedSearch)
        if (debouncedPriceMin) params.set('price_min', debouncedPriceMin)
        if (debouncedPriceMax) params.set('price_max', debouncedPriceMax)

        const res = await fetch(`${API_URL}/api/products?${params}`, {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const rawList: any[] = Array.isArray(data) ? data : (data.results ?? [])
        const count: number = data.count ?? rawList.length
        const list: Product[] = rawList.map((p: any) => ({
          ...p,
          price: p.effective_price ?? p.discount_price ?? p.price,
          compare_price: p.is_on_sale ? p.price : undefined,
          in_stock: p.stock > 0,
        }))

        if (list.length === 0) {
          setProducts(MOCK_PRODUCT_LIST)
          setResultCount(MOCK_PRODUCT_LIST.length)
          setTotalPages(1)
        } else {
          setProducts(list)
          setResultCount(count)
          setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)))
        }

        // Build imageMap from the products response (image field is included in each product)
        const newImageMap: Record<string, string> = {}
        for (const p of rawList) {
          if (p.image) newImageMap[String(p.id)] = p.image
        }
        if (Object.keys(newImageMap).length > 0) {
          setImageMap((prev) => ({ ...prev, ...newImageMap }))
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return
        console.error('Products fetch error:', err)
        setProducts(MOCK_PRODUCT_LIST)
        setResultCount(MOCK_PRODUCT_LIST.length)
        setTotalPages(1)
        setImageMap(MOCK_IMAGE_MAP)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [page, activeCategory, debouncedSearch, debouncedPriceMin, debouncedPriceMax])

  useEffect(() => {
    const params = new URLSearchParams()
    if (page > 1) params.set('page', String(page))
    if (activeCategory) params.set('category', activeCategory)
    if (debouncedSearch) params.set('search', debouncedSearch)
    const qs = params.toString()
    router.replace(`/products${qs ? '?' + qs : ''}`, { scroll: false })
  }, [page, activeCategory, debouncedSearch, router])

  const handleCategory = (catId: string) => {
    setActiveCategory(catId)
    setPage(1)
  }

  const handlePageChange = (pg: number) => {
    setPage(pg)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('')
    setPriceMin('')
    setPriceMax('')
    setPage(1)
  }

  const hasActiveFilters = activeCategory || search || priceMin || priceMax
  const activeCategoryName = categories.find((c) => String(c.id) === activeCategory)?.name

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-section-mobile lg:py-section-desktop">
      {/* Breadcrumb */}
      <div className="mb-5">
        <BreadcrumbTrail dark={false} />
      </div>

      {/* Header */}
      <SectionHeader
        title="محصولات"
        className="mb-6"
        action={
          <p className="text-sm text-text-muted hidden sm:block">
            ردیاب GPS حرفه‌ای برای انواع کاربردها
          </p>
        }
      />

      {/* Filter bar */}
      <div className="mb-6 space-y-3">
        {/* Search + filter toggle */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="جستجوی محصول…"
              aria-label="جستجوی محصول"
              name="product-search"
              autoComplete="off"
              spellCheck={false}
              className="pr-9 bg-white border-border-soft focus-visible:ring-teal rounded-xl h-11 text-sm"
            />
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="price-filter-panel"
            className={cn(
              'flex items-center gap-2 px-4 h-11 rounded-xl border text-sm font-medium transition-colors duration-200',
              filtersOpen
                ? 'bg-primary text-white border-teal'
                : 'bg-white text-text-secondary border-border-soft hover:border-accent/40'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">فیلترها</span>
            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', filtersOpen && 'rotate-180')} />
          </button>
        </div>

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="دسته‌بندی محصولات">
            <button
              onClick={() => handleCategory('')}
              role="radio"
              aria-checked={activeCategory === ''}
              className={cn(
                'rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 border min-h-[44px]',
                activeCategory === ''
                  ? 'bg-primary text-white border-navy'
                  : 'bg-white text-text-secondary border-border-soft hover:border-primary/30'
              )}
            >
              همه
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(String(cat.id))}
                role="radio"
                aria-checked={activeCategory === String(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 border min-h-[44px]',
                  activeCategory === String(cat.id)
                    ? 'bg-primary text-white border-navy'
                    : 'bg-white text-text-secondary border-border-soft hover:border-primary/30'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Expandable price filter */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              id="price-filter-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="overflow-visible"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-border-soft flex-wrap">
                <span className="text-sm font-medium text-text-muted whitespace-nowrap">محدوده قیمت:</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={priceMin}
                  onChange={(e) => { setPriceMin(e.target.value.replace(/[^0-9]/g, '')); setPage(1) }}
                  placeholder="حداقل…"
                  aria-label="حداقل قیمت"
                  name="price-min"
                  autoComplete="off"
                  spellCheck={false}
                  className="bg-bg-muted border-border-soft focus-visible:ring-teal rounded-lg h-11 text-sm max-w-[140px]"
                />
                <span className="text-text-muted text-sm">تا</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={priceMax}
                  onChange={(e) => { setPriceMax(e.target.value.replace(/[^0-9]/g, '')); setPage(1) }}
                  placeholder="حداکثر…"
                  aria-label="حداکثر قیمت"
                  name="price-max"
                  autoComplete="off"
                  spellCheck={false}
                  className="bg-bg-muted border-border-soft focus-visible:ring-teal rounded-lg h-11 text-sm max-w-[140px]"
                />
                {priceMin && priceMax && Number(priceMin) > Number(priceMax) && (
                  <p className="text-xs text-error w-full mt-1">حداقل قیمت نمی‌تواند بیشتر از حداکثر باشد</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter tags */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="فیلترهای فعال">
            {activeCategory && activeCategoryName && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light text-accent text-sm font-medium min-h-[44px]">
                {activeCategoryName}
                <button
                  onClick={() => handleCategory('')}
                  aria-label={`حذف فیلتر دسته‌بندی: ${activeCategoryName}`}
                  className="hover:text-accent-dark p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light text-accent text-sm font-medium min-h-[44px]">
                &ldquo;{search}&rdquo;
                <button
                  onClick={() => setSearch('')}
                  aria-label={`حذف فیلتر جستجو: ${search}`}
                  className="hover:text-accent-dark p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {priceMin && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light text-accent text-sm font-medium min-h-[44px]">
                حداقل: {Number(priceMin).toLocaleString('fa-IR')} تومان
                <button
                  onClick={() => setPriceMin('')}
                  aria-label="حذف فیلتر حداقل قیمت"
                  className="hover:text-accent-dark p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {priceMax && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light text-accent text-sm font-medium min-h-[44px]">
                حداکثر: {Number(priceMax).toLocaleString('fa-IR')} تومان
                <button
                  onClick={() => setPriceMax('')}
                  aria-label="حذف فیلتر حداکثر قیمت"
                  className="hover:text-accent-dark p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              aria-label="حذف همه فیلترها"
              className="text-sm text-error hover:text-error-text font-medium transition-colors px-3 min-h-[44px] flex items-center"
            >
              حذف همه
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-muted">
          <span className="font-semibold text-text-heading">{toFa(resultCount)}</span> محصول
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <ProductSkeletonGrid count={PAGE_SIZE} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<PackageX className="w-10 h-10 text-text-muted" />}
          title="محصولی یافت نشد"
          description="فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید"
          action={
            hasActiveFilters ? (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="rounded-xl min-h-[44px]"
              >
                حذف فیلترها و نمایش همه محصولات
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageUrl={imageMap[String(product.id)]}
                  priority={i < 4}
                />
              ))}
            </div>
          </motion.div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
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
  )
}
