'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { trackAuth } from '@/lib/tracking'

export interface AuthUser {
  id: number
  phone_number: string
  full_name: string
  email?: string | null
  national_id?: string | null
  is_staff?: boolean
}

interface AuthStore {
  user: AuthUser | null
  token: string | null
  refreshToken: string | null
  setAuth: (token: string, refreshToken: string, user: AuthUser) => void
  updateTokens: (access: string, refresh: string) => void
  updateUser: (data: Partial<AuthUser>) => void
  logout: () => void
  isLoggedIn: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      setAuth: (token, refreshToken, user) => {
        document.cookie = `afi_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
        set({ token, refreshToken, user })
        trackAuth('login', { user_id: user.id })
      },
      updateTokens: (access, refresh) => {
        document.cookie = `afi_token=${access}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
        set({ token: access, refreshToken: refresh })
      },
      updateUser: (data) => {
        const current = get().user
        if (current) set({ user: { ...current, ...data } })
      },
      logout: () => {
        trackAuth('logout')
        document.cookie = 'afi_token=; path=/; max-age=0; SameSite=Lax'
        set({ token: null, refreshToken: null, user: null })
      },
      isLoggedIn: () => !!get().token,
    }),
    { name: 'afi_auth' }
  )
)
