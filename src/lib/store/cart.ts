'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { trackCartAction } from '@/lib/tracking'

export interface CartItem {
  product_id: number
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem, maxOrderQuantity?: number) => boolean
  removeItem: (product_id: number) => void
  updateQuantity: (product_id: number, quantity: number, maxOrderQuantity?: number) => void
  clearCart: () => void
  totalCount: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, maxOrderQuantity = 999) => {
        const state = get()
        const currentTotal = state.items.reduce((s, i) => s + i.quantity, 0)
        const existing = state.items.find(i => i.product_id === item.product_id)
        const existingQty = existing?.quantity ?? 0
        const newTotal = currentTotal - existingQty + (existingQty + item.quantity)
        if (newTotal > maxOrderQuantity) {
          return false
        }
        set((s) => {
          const existing = s.items.find(i => i.product_id === item.product_id)
          if (existing) {
            return {
              items: s.items.map(i =>
                i.product_id === item.product_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...s.items, item] }
        })
        trackCartAction('add', { product_id: item.product_id, name: item.name, quantity: item.quantity })
        return true
      },
      removeItem: (id) => {
        trackCartAction('remove', { product_id: id })
        set((s) => ({ items: s.items.filter(i => i.product_id !== id) }))
      },
      updateQuantity: (id, qty, maxOrderQuantity = 999) => set((s) => {
        const otherTotal = s.items.filter(i => i.product_id !== id).reduce((sum, i) => sum + i.quantity, 0)
        const clampedQty = Math.min(Math.max(1, qty), maxOrderQuantity - otherTotal)
        return {
          items: s.items.map(i => i.product_id === id ? { ...i, quantity: Math.max(1, clampedQty) } : i),
        }
      }),
      clearCart: () => {
        trackCartAction('clear', { items_count: get().items.length })
        set({ items: [] })
      },
      totalCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    { name: 'afi_cart' }
  )
)
