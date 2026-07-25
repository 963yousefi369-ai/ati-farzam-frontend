'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getProducts } from '@/lib/api/django'
import { trackSearch } from '@/lib/tracking'

interface SearchResult {
  id: string
  name: string
  price?: number
}

interface CmdKSearchProps {
  query: string
  onQueryChange: (q: string) => void
}

export default function CmdKSearch({ query, onQueryChange }: CmdKSearchProps) {
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [recent, setRecent] = useState<string[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const closingRef = useRef(false)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem('afi_recent_searches')
    if (saved) setRecent(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
        requestAnimationFrame(() => inputRef.current?.focus())
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setLoading(true)
    try {
      const data = await getProducts({ q, page_size: 5 })
      setResults((data?.results ?? data ?? []).map((p: any) => ({ id: String(p.id), name: p.name, price: p.price })))
    } catch { setResults([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300)
    return () => clearTimeout(timer)
  }, [query, doSearch])

  const saveRecent = (q: string) => {
    const updated = [q, ...recent.filter((r) => r !== q)].slice(0, 5)
    setRecent(updated)
    localStorage.setItem('afi_recent_searches', JSON.stringify(updated))
  }

  const handleSelect = (name: string) => {
    trackSearch(name)
    saveRecent(name)
    setOpen(false)
    onQueryChange('')
    router.push(`/products?q=${encodeURIComponent(name)}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      trackSearch(query.trim())
      saveRecent(query.trim())
      setOpen(false)
      onQueryChange('')
      router.push(`/products?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleInputFocus = () => {
    if (closingRef.current) { closingRef.current = false; return }
    setOpen(true)
  }

  const showDropdown = open && (query.length > 0 || recent.length > 0)

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={`flex items-center gap-2.5 w-full h-11 px-5 text-sm transition-all duration-200 ${open ? 'bg-white shadow-sm ring-1 ring-primary/20' : ''}`}
          style={{
            borderRadius: '9999px',
            backgroundColor: open ? '#ffffff' : '#F5F7FA',
          }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin shrink-0 text-primary" />
          ) : (
            <Search className="w-4 h-4 shrink-0" style={{ color: '#94a3b8' }} />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={(e) => { if (e.key === 'Escape') { closingRef.current = true; setOpen(false) } }}
            placeholder="جستجو در محصولات..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#0f172a' }}
          />
        </div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border-soft overflow-hidden"
            style={{ boxShadow: 'var(--shadow-hover)', zIndex: 'var(--z-dropdown)' }}
          >
            <div className="max-h-[300px] overflow-y-auto">
              {query.length < 2 && recent.length > 0 && (
                <div className="p-3">
                  <p className="text-xs text-text-tertiary font-medium px-2 mb-2 flex items-center gap-1.5"><Clock className="w-3 h-3" /> جستجوهای اخیر</p>
                  {recent.map((r) => (
                    <button key={r} onClick={() => handleSelect(r)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-bg-secondary transition-colors">
                      <span>{r}</span><ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-40" />
                    </button>
                  ))}
                </div>
              )}
              {results.length > 0 && (
                <div className="p-3">
                  <p className="text-xs text-text-tertiary font-medium px-2 mb-2">محصولات</p>
                  {results.map((r) => (
                    <button key={r.id} onClick={() => handleSelect(r.name)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm hover:bg-bg-secondary transition-colors group">
                      <div className="flex items-center gap-2.5"><Search className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" /><span className="text-text-primary">{r.name}</span></div>
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180 opacity-0 group-hover:opacity-40 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
              {query.length >= 2 && results.length === 0 && !loading && <div className="p-6 text-center"><p className="text-sm text-text-tertiary">نتیجه‌ای یافت نشد</p></div>}
              {query.length < 2 && recent.length === 0 && <div className="p-6 text-center"><Search className="w-8 h-8 text-text-tertiary/30 mx-auto mb-2" /><p className="text-sm text-text-tertiary">نام محصول را تایپ کنید</p></div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
