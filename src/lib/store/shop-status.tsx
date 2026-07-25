'use client'
import { createContext, useContext } from 'react'

interface ShopStatus {
  shopEnabled: boolean
  supportPhone: string
  maxOrderQuantity: number
  contactPhone: string
  address?: string
  footerText?: string
  email?: string
  instagramUrl?: string
  telegramUrl?: string
}

const ShopStatusContext = createContext<ShopStatus>({
  shopEnabled: true,
  supportPhone: '',
  maxOrderQuantity: 20,
  contactPhone: '021-12345678',
  address: 'تهران، خیابان ولیعصر، پلاک 123',
  footerText: 'ارائه‌دهنده راهکارهای هوشمند ردیابی GPS برای خودرو، ناوگان تجاری و اشخاص.',
  email: 'info@atifarzam.ir',
  instagramUrl: 'https://instagram.com',
  telegramUrl: 'https://t.me',
})

export function ShopStatusProvider({
  shopEnabled,
  supportPhone,
  maxOrderQuantity,
  contactPhone,
  address,
  footerText,
  email,
  instagramUrl,
  telegramUrl,
  children,
}: ShopStatus & { children: React.ReactNode }) {
  return (
    <ShopStatusContext.Provider
      value={{
        shopEnabled,
        supportPhone,
        maxOrderQuantity,
        contactPhone: contactPhone || '021-12345678',
        address,
        footerText,
        email,
        instagramUrl,
        telegramUrl,
      }}
    >
      {children}
    </ShopStatusContext.Provider>
  )
}

export function useShopStatus() {
  return useContext(ShopStatusContext)
}
