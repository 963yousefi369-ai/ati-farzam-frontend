'use client'

import { useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Search } from 'lucide-react'
import { useProductSearch, type SearchProduct } from '@/lib/hooks/useProductSearch'
import { trackSearch } from '@/lib/tracking'
import { cn } from '@/lib/utils'

interface ProductSearchProps {
  /** `bar` = inline navbar field, `sheet` = full-screen mobile sheet */
  variant?: 'bar' | 'sheet'
  autoFocus?: boolean
  onNavigate?: () => void
  className?: string
}

/**
 * Accessible combobox for product search.
 *
 * Improvements over the previous inline implementation:
 *  - full keyboard support (ArrowUp / ArrowDown / Enter / Escape)
 *  - proper combobox/listbox ARIA roles
 *  - closes on `mousedown` instead of a fragile `setTimeout(onBlur, 200)`
 */
export default function ProductSearch({
  variant = 'bar',
  autoFocus = false,
  onNavigate,
  className,
}: ProductSearchProps) {
  const router = useRouter()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const { query, setQuery, results, loading, isActive, reset } = useProductSearch({
    limit: variant === 'sheet' ? 8 : 5,
  })
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)

  const showList = open && isActive && results.length > 0

  const go = (term: string) => {
    if (!term.trim()) return
    trackSearch(term)
    setOpen(false)
    setHighlighted(-1)
    reset()
    onNavigate?.()
    router.push(`/products?q=${encodeURIComponent(term)}`)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      setHighlighted(-1)
      inputRef.current?.blur()
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!results.length) return
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setOpen(true)
      setHighlighted((prev) => (prev + direction + results.length) % results.length)
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const picked: SearchProduct | undefined = results[highlighted]
      go(picked?.name ?? query)
    }
  }

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-accent" />
          ) : (
            <Search className="h-4 w-4 text-text-muted" />
          )}
        </span>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={highlighted >= 0 ? `${listId}-${highlighted}` : undefined}
          autoFocus={autoFocus}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setHighlighted(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="جستجوی ردیاب، مدل یا برند…"
          className={cn(
            'h-11 w-full rounded-xl border border-hairline bg-[#F4F6F8] pr-11 text-sm text-dark outline-none transition-colors',
            'placeholder:text-text-muted focus:border-accent/40 focus:bg-white focus:ring-4 focus:ring-accent/10',
            'pl-4',
          )}
        />
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className={cn(
            'z-50 overflow-hidden rounded-xl border border-hairline bg-white py-1 shadow-lg',
            variant === 'bar' ? 'absolute inset-x-0 top-full mt-2' : 'mt-3',
          )}
        >
          {results.map((item, index) => (
            <li
              key={item.id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === highlighted}
            >
              <button
                type="button"
                // mousedown fires before blur, so the click always registers
                onMouseDown={(event) => {
                  event.preventDefault()
                  go(item.name)
                }}
                onMouseEnter={() => setHighlighted(index)}
                className={cn(
                  'flex min-h-[44px] w-full items-center justify-between gap-3 px-4 text-right text-sm transition-colors',
                  index === highlighted ? 'bg-light-tint text-primary' : 'text-dark',
                )}
              >
                <span className="truncate">{item.name}</span>
                {item.price != null && (
                  <span className="shrink-0 text-xs text-text-muted">
                    {item.price.toLocaleString('fa-IR')} تومان
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
