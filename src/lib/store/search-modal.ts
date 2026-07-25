'use client'
import { create } from 'zustand'

interface SearchModalStore {
  open: boolean
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

export const useSearchModal = create<SearchModalStore>((set) => ({
  open: false,
  openSearch: () => set({ open: true }),
  closeSearch: () => set({ open: false }),
  toggleSearch: () => set((s) => ({ open: !s.open })),
}))
