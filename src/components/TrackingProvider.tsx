'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { trackPageView, flushTracking } from '@/lib/tracking'

/**
 * Automatically tracks page views on every client-side navigation.
 * Flushes pending events before the page unloads.
 * Add <TrackingProvider /> inside your root layout's <Providers>.
 */
export default function TrackingProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const qs = searchParams.toString()
    const fullPath = qs ? `${pathname}?${qs}` : pathname
    trackPageView(fullPath)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleUnload = () => flushTracking()
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  return null
}
