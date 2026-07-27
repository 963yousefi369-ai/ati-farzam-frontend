'use client'

import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '@/lib/api/django'

export interface SearchProduct {
  id: string
  name: string
  price: number | null
}

interface Options {
  /** how many suggestions to request */
  limit?: number
  /** debounce window in ms */
  delay?: number
}

/**
 * Shared product-suggestion logic for the desktop search field and the mobile
 * search sheet. Previously this was copy-pasted twice inside Navbar.tsx.
 */
export function useProductSearch({ limit = 6, delay = 300 }: Options = {}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchProduct[]>([])
  const [loading, setLoading] = useState(false)

  const isActive = query.trim().length >= 2

  useEffect(() => {
    if (!isActive) {
      setResults([])
      setLoading(false)
      return
    }

    const controller = new AbortController()
    let cancelled = false

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await getProducts({ q: query.trim(), page_size: limit })
        if (cancelled) return
        const rows = (data?.results ?? data ?? []) as Array<Record<string, unknown>>
        setResults(
          rows.map((p) => ({
            id: String(p.id),
            name: String(p.name ?? ''),
            price: p.price == null ? null : Number(p.price),
          })),
        )
      } catch {
        if (!cancelled) setResults([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, delay)

    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timer)
    }
  }, [query, isActive, limit, delay])

  return useMemo(
    () => ({ query, setQuery, results, loading, isActive, reset: () => setQuery('') }),
    [query, results, loading, isActive],
  )
}
