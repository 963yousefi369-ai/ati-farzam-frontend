'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, ChevronDown, ChevronUp, Info, Settings, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductDetailTabsProps {
  product: any
  features: string[]
  specs: Record<string, string>
  faqs: Array<{ q: string; a: string }>
}

const KEY_SPEC_KEYS = ['وزن', 'ابعاد', 'دقت', 'باتری', 'شبکه', 'مدل']

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

export default function ProductDetailTabs({ product, features, specs, faqs }: ProductDetailTabsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  const productFeatures: string[] = product.features
    ? product.features.map((f: any) => typeof f === 'string' ? f : f.text)
    : features
  const productSpecs = product.specifications
    ? (Array.isArray(product.specifications)
        ? product.specifications
        : Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
      )
    : (Array.isArray(specs) ? specs : Object.entries(specs).map(([key, value]) => ({ key, value })))
  const productFaqs = product.faqs
    ? product.faqs.map((f: any) => ({ q: f.question ?? f.q, a: f.answer ?? f.a }))
    : faqs

  // Extract key specs for inline display above tabs
  const keySpecs = productSpecs.filter((s: { key: string; value: string }) =>
    KEY_SPEC_KEYS.some((k) => s.key.includes(k))
  ).slice(0, 4)

  const tabItems = [
    { value: 'faq', label: 'سوالات متداول', icon: HelpCircle },
    { value: 'specs', label: 'مشخصات فنی', icon: Settings },
    { value: 'features', label: 'ویژگی‌ها', icon: Info },
  ]

  // Sync active tab with URL hash
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return 'features'
    const hash = window.location.hash.replace('#', '')
    return tabItems.some((t) => t.value === hash) ? hash : 'features'
  })

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (tabItems.some((t) => t.value === hash) && hash !== activeTab) {
      setActiveTab(hash)
    }
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.history.replaceState(null, '', `#${value}`)
  }

  return (
    <div className="mt-10" dir="rtl">
      {/* Key specs surfaced inline — so critical info isn't buried behind a tab */}
      {keySpecs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {keySpecs.map((spec: { key: string; value: string }) => (
            <div
              key={spec.key}
              className="rounded-xl bg-bg-soft border border-border-soft px-4 py-3 text-center"
            >
              <p className="text-xs text-text-muted mb-1">{spec.key}</p>
              <p className="text-sm font-semibold text-text-heading">{spec.value}</p>
            </div>
          ))}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-end gap-0.5 bg-white border-b-2 border-border-soft rounded-none h-auto p-0 overflow-x-auto flex-nowrap">
          {tabItems.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                'rounded-none border-b-2 border-transparent px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-all whitespace-nowrap min-h-[44px]',
                'data-[state=active]:border-teal data-[state=active]:text-accent data-[state=active]:bg-accent-light/30',
                'data-[state=inactive]:text-text-muted data-[state=inactive]:hover:text-text-secondary'
              )}
            >
              <Icon className="w-4 h-4 ml-1.5 sm:ml-2" aria-hidden="true" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Features */}
        <TabsContent value="features" className="mt-6">
          <div className="bg-white rounded-xl border border-border-soft p-4 md:p-5" dir="rtl">
            <h3 className="text-base font-semibold text-text-heading mb-4">ویژگی‌های محصول</h3>
            {productFeatures.length === 0 ? (
              <div className="text-center py-8 text-text-muted">
                <Info className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
                <p className="text-sm">ویژگی‌ای ثبت نشده است</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {productFeatures.map((f: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-success-light/30 border border-accent/10">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-text-body leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            )}
            {product.description && (
              <div className="mt-5 pt-4 border-t border-border-soft">
                <h4 className="font-semibold text-text-heading mb-2 text-sm">توضیحات تکمیلی</h4>
                <p className="text-text-body leading-7 whitespace-pre-wrap text-sm">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Specs */}
        <TabsContent value="specs" className="mt-6">
          <div className="bg-white rounded-xl border border-border-soft overflow-hidden" dir="rtl">
            <h3 className="text-base font-semibold text-text-heading p-4 pb-0">مشخصات فنی</h3>
            <div className="p-4">
              {productSpecs.length === 0 ? (
                <div className="text-center py-8 text-text-muted">
                  <Settings className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
                  <p className="text-sm">مشخصات فنی ثبت نشده است</p>
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden border border-border-soft">
                  {productSpecs.map((spec: { key: string; value: string }, i: number) => (
                    <div
                      key={spec.key}
                      className={cn(
                        'flex flex-col sm:flex-row sm:items-center px-4 py-3 text-sm gap-1 sm:gap-0',
                        i % 2 === 0 ? 'bg-white' : 'bg-bg-soft'
                      )}
                    >
                      <span className="sm:w-2/5 font-medium text-text-muted">{spec.key}</span>
                      <span className="sm:w-3/5 font-semibold text-text-heading">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="mt-6">
          <div className="bg-white rounded-xl border border-border-soft p-4 md:p-5" dir="rtl">
            <h3 className="text-base font-semibold text-text-heading mb-4">سوالات متداول</h3>
            <div className="space-y-2">
              {productFaqs.length === 0 ? (
                <div className="text-center py-8 text-text-muted">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
                  <p className="text-sm">سوالی ثبت نشده است</p>
                </div>
              ) : (
                productFaqs.map((faq: { q: string; a: string }, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded-xl border transition-all overflow-hidden',
                      openFaq === i ? 'border-accent/30 bg-accent-light/20' : 'border-border-soft hover:border-accent/20'
                    )}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="w-full flex items-center justify-between px-4 py-3 min-h-[44px]"
                    >
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
                      )}
                      <span className={cn(
                        'font-medium text-sm flex-1 mr-3 transition-colors',
                        openFaq === i ? 'text-accent' : 'text-text-heading'
                      )}>
                        {faq.q}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.2 }}
                        >
                          <div className="px-4 pb-3 text-sm text-text-body leading-7 border-t border-accent/10 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
