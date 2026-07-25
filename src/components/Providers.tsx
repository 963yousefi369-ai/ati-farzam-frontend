'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from '@/components/ui/sonner'
import LoginModal from '@/components/auth/LoginModal'
import CartDrawer from '@/components/cart/CartDrawer'
import FloatingActions from '@/components/layout/FloatingActions'
import ChatWidget from '@/components/chatbot/ChatWidget'

// Dev-only mock: seeds auth + cart + intercepts /api/* calls. Tree-shaken in production.
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  import('@/lib/dev-mock')
}

const LenisProvider = dynamic(() => import('@/components/shared/LenisProvider'), { ssr: false })
const CursorFollower = dynamic(() => import('@/components/layout/CursorFollower'), { ssr: false })
const TrackingProvider = dynamic(() => import('@/components/TrackingProvider'), { ssr: false })

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
  }))

  return (
    <LenisProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-center"
          richColors
          dir="rtl"
          offset={80}
          toastOptions={{
            style: {
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              fontFamily: 'Vazirmatn, system-ui, sans-serif',
            },
          }}
        />
        <LoginModal />
        <CartDrawer />
        <FloatingActions />
        <ChatWidget />
        <CursorFollower />
        <TrackingProvider />
      </QueryClientProvider>
    </LenisProvider>
  )
}
