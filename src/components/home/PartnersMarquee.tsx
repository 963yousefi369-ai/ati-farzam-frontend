'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { landingData } from '@/data/landing'
import { djangoImageUrl } from '@/lib/api/django'

interface ApiPartner {
  id: number
  name: string
  logo?: string | null
  website?: string
}

interface PartnersMarqueeProps {
  apiPartners?: ApiPartner[]
}

export default function PartnersMarquee({ apiPartners }: PartnersMarqueeProps = {}) {
  const items = apiPartners && apiPartners.length > 0
    ? apiPartners.map((p) => ({ id: String(p.id), name: p.name, logo: p.logo ?? null }))
    : landingData.partners.map((p) => ({ ...p, logo: null as string | null }))

  const [activeIdx, setActiveIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const checkOverflow = () => {
      setIsOverflowing(el.scrollWidth > el.clientWidth + 1)
    }

    checkOverflow()

    const resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(el)
    return () => resizeObserver.disconnect()
  }, [items.length])

  const scrollToIdx = useCallback((idx: number, behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[idx] as HTMLElement | undefined
    if (!child) return

    const elRect = el.getBoundingClientRect()
    const childRect = child.getBoundingClientRect()

    const childCenterFromContainerLeft = childRect.left - elRect.left + childRect.width / 2
    const delta = childCenterFromContainerLeft - elRect.width / 2
    const target = el.scrollLeft + delta

    el.scrollTo({ left: target, behavior })
  }, [])

  const updateActive = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const elRect = el.getBoundingClientRect()
    const containerCenterX = elRect.left + elRect.width / 2

    let closestIdx = 0
    let minDist = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement
      const childRect = child.getBoundingClientRect()
      const childCenterX = childRect.left + childRect.width / 2
      const dist = Math.abs(containerCenterX - childCenterX)
      if (dist < minDist) { minDist = dist; closestIdx = i }
    }
    setActiveIdx(closestIdx)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateActive)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    updateActive()
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateActive])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      const dir = e.deltaY > 0 ? 1 : -1
      setActiveIdx((prev) => {
        const next = Math.max(0, Math.min(items.length - 1, prev + dir))
        scrollToIdx(next)
        return next
      })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [items.length, scrollToIdx])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const dir = e.key === 'ArrowLeft' ? 1 : -1
    setActiveIdx((prev) => {
      const next = Math.max(0, Math.min(items.length - 1, prev + dir))
      scrollToIdx(next)
      return next
    })
  }

  const scrollPrev = () => setActiveIdx((prev) => {
    const next = Math.max(0, prev - 1)
    scrollToIdx(next)
    return next
  })

  const scrollNext = () => setActiveIdx((prev) => {
    const next = Math.min(items.length - 1, prev + 1)
    scrollToIdx(next)
    return next
  })

  return (
    <section className="py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-dark mb-2.5 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            مشتریان ما
          </h2>
          <p className="text-text-secondary text-sm">افتخار همکاری با برترین‌های صنعت</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            role="region"
            aria-label="لوگوی مشتریان"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={`flex gap-5 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory scrollbar-none py-3 px-[max(1.5rem,calc((100%-220px)/2))] ${
              isOverflowing ? 'justify-start' : 'justify-center'
            }`}
            style={{ direction: 'rtl', touchAction: 'pan-x' }}
          >
            {items.map((partner, i) => {
              const isActive = i === activeIdx
              return (
                <div
                  key={partner.id}
                  className="flex-shrink-0 snap-center flex items-center justify-center rounded-xl border border-border-soft bg-white px-6 py-4 transition-all duration-300 hover:border-accent/20 hover:shadow-[0_4px_16px_rgba(59,90,128,0.08)]"
                  style={{
                    scrollSnapStop: 'always',
                    boxShadow: '0 2px 8px rgba(59,90,128,0.04)',
                    minHeight: '72px',
                  }}
                >
                  {partner.logo ? (
                    <Image
                      src={djangoImageUrl(partner.logo)}
                      alt={partner.name}
                      width={160}
                      height={48}
                      className={`h-10 md:h-12 w-auto max-w-[160px] object-contain transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-50 scale-100'
                      }`}
                      unoptimized
                    />
                  ) : (
                    <span
                      className={`text-base font-semibold whitespace-nowrap transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? 'text-primary opacity-100 scale-105' : 'text-text-muted opacity-50 scale-100'
                      }`}
                    >
                      {partner.name}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Navigation arrows */}
          {isOverflowing && (
            <>
              <button
                onClick={scrollPrev}
                aria-label="قبلی"
                className="absolute start-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border-soft shadow-card flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:shadow-md opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="بعدی"
                className="absolute end-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border-soft shadow-card flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:shadow-md opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}