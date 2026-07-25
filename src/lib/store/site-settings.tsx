'use client'
import { createContext, useContext, type ReactNode } from 'react'

interface SiteSettingsData {
  logo: string
  siteName: string
  heroTitle: string
  heroText: string
  heroBgImage: string
  heroBanner: string
  softwareImage: string
  supportPhone: string
  socialInstagram: string
  socialTelegram: string
}

const defaults: SiteSettingsData = {
  logo: '',
  siteName: 'آتی فرزام',
  heroTitle: '',
  heroText: '',
  heroBgImage: '',
  heroBanner: '',
  softwareImage: '',
  supportPhone: '',
  socialInstagram: '',
  socialTelegram: '',
}

const SiteSettingsContext = createContext<SiteSettingsData>(defaults)

interface SiteSettingsProviderProps {
  children: ReactNode
  logo?: string
  siteName?: string
  heroTitle?: string
  heroText?: string
  heroBgImage?: string
  heroBanner?: string
  softwareImage?: string
  supportPhone?: string
  socialInstagram?: string
  socialTelegram?: string
}

export function SiteSettingsProvider({ children, logo, siteName, heroTitle, heroText, heroBgImage, heroBanner, softwareImage, supportPhone, socialInstagram, socialTelegram }: SiteSettingsProviderProps) {
  const value: SiteSettingsData = {
    logo: logo ?? defaults.logo,
    siteName: siteName ?? defaults.siteName,
    heroTitle: heroTitle ?? defaults.heroTitle,
    heroText: heroText ?? defaults.heroText,
    heroBgImage: heroBgImage ?? defaults.heroBgImage,
    heroBanner: heroBanner ?? defaults.heroBanner,
    softwareImage: softwareImage ?? defaults.softwareImage,
    supportPhone: supportPhone ?? defaults.supportPhone,
    socialInstagram: socialInstagram ?? defaults.socialInstagram,
    socialTelegram: socialTelegram ?? defaults.socialTelegram,
  }
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
