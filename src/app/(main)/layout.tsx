import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getSettings } from '@/lib/api/django'
import { getCmsSiteSettings } from '@/lib/api/cms'
import ClientTrailWrapper from '@/components/trail/ClientTrailWrapper'
import { ShopStatusProvider } from '@/lib/store/shop-status'
import { SiteSettingsProvider } from '@/lib/store/site-settings'

export const dynamic = 'force-dynamic'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  let shopEnabled = true
  let supportPhone = ''
  let maxOrderQuantity = 20
  let contactPhone = ''
  let address = ''
  let footerText = ''
  let email = ''
  let instagramUrl = ''
  let telegramUrl = ''
  let logo = ''
  let siteName = ''
  let heroTitle = ''
  let heroText = ''
  let heroBgImage = ''
  let heroBanner = ''
  let softwareImage = ''
  let socialInstagram = ''
  let socialTelegram = ''

  try {
    const [settings, siteSettings] = await Promise.all([
      getSettings().catch(() => null),
      getCmsSiteSettings().catch(() => null),
    ])

    shopEnabled = settings?.shop_enabled !== false
    supportPhone = siteSettings?.support_phone ?? settings?.support_phone ?? ''
    maxOrderQuantity = settings?.max_order_quantity ?? 20
    contactPhone = siteSettings?.contact_phone ?? settings?.contact_phone ?? settings?.support_phone ?? ''
    address = siteSettings?.address ?? settings?.address ?? ''
    footerText = siteSettings?.footer_text ?? settings?.footer_text ?? ''
    email = siteSettings?.email ?? settings?.support_email ?? ''
    instagramUrl = siteSettings?.instagram_url ?? siteSettings?.social_links?.instagram ?? settings?.social_instagram ?? ''
    telegramUrl = siteSettings?.telegram_url ?? siteSettings?.social_links?.telegram ?? settings?.social_telegram ?? ''
    logo = settings?.logo ?? ''
    siteName = settings?.site_name ?? ''
    heroTitle = settings?.hero_title ?? ''
    heroText = settings?.hero_text ?? ''
    heroBgImage = settings?.hero_bg_image ?? ''
    heroBanner = settings?.hero_banner ?? ''
    softwareImage = settings?.software_image ?? ''
    socialInstagram = settings?.social_instagram ?? instagramUrl
    socialTelegram = settings?.social_telegram ?? telegramUrl
  } catch {}

  return (
    <ShopStatusProvider
      shopEnabled={shopEnabled}
      supportPhone={supportPhone}
      maxOrderQuantity={maxOrderQuantity}
      contactPhone={contactPhone}
      address={address}
      footerText={footerText}
      email={email}
      instagramUrl={instagramUrl}
      telegramUrl={telegramUrl}
    >
      <SiteSettingsProvider
        logo={logo}
        siteName={siteName}
        heroTitle={heroTitle}
        heroText={heroText}
        heroBgImage={heroBgImage}
        heroBanner={heroBanner}
        softwareImage={softwareImage}
        supportPhone={supportPhone}
        socialInstagram={socialInstagram}
        socialTelegram={socialTelegram}
      >
        <a href="#main-content" className="sr-only sr-only-focusable">
          رد شدن به محتوای اصلی
        </a>
        <ClientTrailWrapper>
          <Navbar />
          <main id="main-content" className="min-h-[calc(100vh-var(--navbar-height))]">
            {children}
          </main>
          <Footer />
        </ClientTrailWrapper>
      </SiteSettingsProvider>
    </ShopStatusProvider>
  )
}
