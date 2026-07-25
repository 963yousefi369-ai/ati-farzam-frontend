# INVENTORY.md — Full Project Extraction

> Raw extraction only. Zero design opinions.

---

## 1. ROUTES / PAGES

### Route Group: `(main)` — Layout: `src/app/(main)/layout.tsx`
- Fetches `getSettings()` server-side → provides `ShopStatusProvider` (shopEnabled, supportPhone, maxOrderQuantity, contactPhone)
- Renders: `<Navbar />`, `<main>`, `<Footer />`, `<ClientTrailWrapper />`
- Skip-to-content link present

| Route | File | Rendering | Key Props/Data |
|-------|------|-----------|----------------|
| `/` | `src/app/(main)/page.tsx` | SSR (`revalidate=300`) | banners, partners, settings, products (8), blogs |
| `/products` | `src/app/(main)/products/page.tsx` | `force-dynamic` | products (paginated 12), categories, searchParams (page, category, search) |
| `/products/[slug]` | `src/app/(main)/products/[slug]/page.tsx` | SSG (`revalidate=86400`) | product, images[], similarProducts[] |
| `/cart` | `src/app/(main)/cart/page.tsx` | Client | useCartStore (items, totalCount, totalPrice) |
| `/checkout` | `src/app/(main)/checkout/page.tsx` | Client | useAuthStore, useCartStore, useLoginModal; steps: address→shipping→confirm |
| `/blog` | `src/app/(main)/blog/page.tsx` | `force-dynamic` | posts (DjangoBlogPost[]) |
| `/blog/[slug]` | `src/app/(main)/blog/[slug]/page.tsx` | SSG (`revalidate=86400`) | post, relatedPosts[] |
| `/about` | `src/app/(main)/about/page.tsx` | SSG (`revalidate=604800`) | pageData (CMS), settings |
| `/contact` | `src/app/(main)/contact/page.tsx` | Client | ContactForm, MapPreview |
| `/software` | `src/app/(main)/software/page.tsx` | SSG (`revalidate=604800`) | settings (software_image, software_login_url, software_description) |
| `/profile` | `src/app/(main)/profile/page.tsx` | Client | useAuthStore, getProfile, updateProfile; form: full_name, email, national_id |
| `/profile/orders` | `src/app/(main)/profile/orders/page.tsx` | Client | useAuthStore, getOrders |
| `/profile/orders/[id]` | `src/app/(main)/profile/orders/[id]/page.tsx` | Client | useAuthStore, getOrder, cancelOrder |
| `/profile/addresses` | `src/app/(main)/profile/addresses/page.tsx` | Client | useAuthStore, getAddresses, addAddress, deleteAddress, getProvinces, getCities |
| `/profile/change-password` | `src/app/(main)/profile/change-password/page.tsx` | Client | useAuthStore, changePassword; form: old_password, new_password, confirm_password |
| `/payment/result` | `src/app/(main)/payment/result/page.tsx` | Client | useSearchParams (status, order_id), useAuthStore, PaymentReceipt |
| `/payment-result` | `src/app/(main)/payment-result/page.tsx` | Client | Redirect bridge → `/payment/result` |

### Route Group: `(auth)` — Layout: `src/app/(auth)/layout.tsx`
- Simple centered layout: `min-h-screen bg-bg-secondary flex items-center justify-center`

| Route | File | Rendering | Key Props/Data |
|-------|------|-----------|----------------|
| `/login` | `src/app/(auth)/login/page.tsx` | Client | useAuthStore, useSearchParams (redirect); Tabs: OtpForm, PasswordForm |
| `/forgot-password` | `src/app/(auth)/forgot-password/page.tsx` | Client | forgotPassword, resetPassword; steps: phone→reset→done |

### Other Routes

| Route | File | Rendering | Key Props/Data |
|-------|------|-----------|----------------|
| `/page/[slug]` | `src/app/page/[slug]/page.tsx` | SSG | Reads JSON from `data/pages/`, renders via PuckRenderer |
| `/design-system` | `src/app/design-system/page.tsx` | — | Design system reference page |
| `/editor` | `src/app/editor/page.tsx` | — | Puck editor (disabled in prod) |
| `/editor/[slug]` | `src/app/editor/[slug]/page.tsx` | — | Puck editor (disabled in prod) |
| `/not-found` | `src/app/not-found.tsx` | — | Custom 404 |

### Root Layout: `src/app/layout.tsx`
- Font: Vazirmatn (Google Fonts, weights 300–900)
- `lang="fa" dir="rtl"`
- `<Providers>` wraps everything
- Metadata: "آتی فرزام ایرانیان — سیستم‌های ردیابی GPS"
- Theme color: `#1e3a5f`

---

## 2. API ROUTES (Next.js Route Handlers)

| Route | File | Method | Purpose |
|-------|------|--------|---------|
| `/api/chatbot/send` | `src/app/api/chatbot/send/route.ts` | POST | Proxy → Django `/api/chatbot/send` |
| `/api/chatbot/status` | `src/app/api/chatbot/status/route.ts` | GET | Proxy → Django `/api/chatbot/status` |
| `/api/chatbot/[...path]` | `src/app/api/chatbot/[...path]/route.ts` | — | Catch-all chatbot proxy |
| `/api/editor/pages` | `src/app/api/editor/pages/route.ts` | — | Editor pages CRUD |
| `/api/editor/pages/[slug]` | `src/app/api/editor/pages/[slug]/route.ts` | — | Editor single page CRUD |

---

## 3. API CALLS / DATA FETCHING

### `src/lib/api/django.ts` — Main API Client

**Base URL:** Server-side: `INTERNAL_API_URL` or `NEXT_PUBLIC_API_URL` or `http://localhost:8000`. Client-side: `''` (relative, proxied via next.config.ts rewrites).

| Function | Endpoint | Method | Auth | Used By |
|----------|----------|--------|------|---------|
| `getProducts` | `/api/products` | GET | No | HomePage, ProductsPage, ProductDetailPage, CmdKSearch |
| `getProduct` | `/api/products/{id}` | GET | No | ProductDetailPage |
| `getCategories` | `/api/categories` | GET | No | ProductsPage |
| `getSettings` | `/api/settings` | GET | No | MainLayout, HomePage, AboutPage, SoftwarePage |
| `submitContact` | `/api/contact` | POST | No | ContactForm |
| `sendOtp` | `/api/auth/send-otp` | POST | No | LoginModal |
| `verifyOtp` | `/api/auth/verify-otp` | POST | No | LoginModal |
| `login` | `/api/auth/login` | POST | No | PasswordForm |
| `getProfile` | `/api/auth/profile` | GET | Yes | ProfilePage, LoginModal |
| `updateProfile` | `/api/auth/profile` | PATCH | Yes | ProfilePage, CheckoutPage, LoginModal |
| `changePassword` | `/api/auth/change-password` | POST | Yes | ChangePasswordPage |
| `forgotPassword` | `/api/auth/forgot-password` | POST | No | ForgotPasswordPage |
| `resetPassword` | `/api/auth/reset-password` | POST | No | ForgotPasswordPage |
| `getAddresses` | `/api/auth/addresses` | GET | Yes | AddressesPage |
| `addAddress` | `/api/auth/addresses` | POST | Yes | AddressesPage |
| `deleteAddress` | `/api/auth/addresses/{id}` | DELETE | Yes | AddressesPage |
| `getProvinces` | `/api/shipping/provinces` | GET | No | AddressesPage |
| `getCities` | `/api/shipping/provinces/{id}/cities` | GET | No | AddressesPage |
| `calculateShipping` | `/api/shipping/calculate` | POST | No | ShippingStep |
| `createOrder` | `/api/orders` | POST | Yes | ConfirmStep |
| `getOrders` | `/api/auth/orders` | GET | Yes | OrdersPage |
| `getOrder` | `/api/auth/orders/{id}` | GET | Yes | OrderDetailPage |
| `cancelOrder` | `/api/auth/orders/{id}` | DELETE | Yes | OrderDetailPage |
| `initiatePayment` | `/api/payment/initiate` | POST | Yes | ConfirmStep |
| `getDjangoBlogs` | `/api/blog/posts` | GET | No | HomePage, BlogPage, BlogDetailPage |
| `getDjangoBlog` | `/api/blog/posts/{slug}` | GET | No | BlogDetailPage |
| `getBanners` | `/api/banners` | GET | No | HomePage |
| `getPartners` | `/api/partners` | GET | No | HomePage |
| `getPage` | `/api/pages/{slug}` | GET | No | AboutPage |

**Helper functions:**
- `djangoImageUrl(url)` — Converts relative/localhost URLs to `https://farzamgps.ir` for Next Image Optimization
- `publicImageUrl(url)` — Same as djangoImageUrl

### `src/lib/api/pages.ts` — PocketBase Stubs (disabled)
- `getPages()`, `getPageBySlug()`, `savePage()`, `deletePage()`, `parsePuckData()` — all stubs, editor disabled in production

### Rewrites (next.config.ts)
- `/api/:path*` → `{API_URL}/api/:path*`
- `/media/:path*` → `{API_URL}/media/:path*`

---

## 4. STATE MANAGEMENT (Zustand Stores)

| Store | File | Persisted | Key State | Key Actions |
|-------|------|-----------|-----------|-------------|
| `useAuthStore` | `src/lib/store/auth.ts` | Yes (`afi_auth`) | `user`, `token` | `setAuth`, `updateUser`, `logout`, `isLoggedIn` |
| `useCartStore` | `src/lib/store/cart.ts` | Yes (`afi_cart`) | `items[]` (product_id, name, price, quantity, imageUrl) | `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalCount`, `totalPrice` |
| `useCartDrawer` | `src/lib/store/cart-drawer.ts` | No | `open` | `openDrawer`, `closeDrawer`, `toggleDrawer` |
| `useLoginModal` | `src/lib/store/login-modal.ts` | No | `open`, `message`, `returnUrl`, `onLoginSuccess` | `openLogin`, `closeLogin` |
| `useSearchModal` | `src/lib/store/search-modal.ts` | No | `open` | `openSearch`, `closeSearch`, `toggleSearch` |
| `useUserTrailStore` | `src/lib/store/user-trail.ts` | Yes (`user-trail-storage`) | `trail[]` (path, label, timestamp) | `addVisit`, `getCurrentPage`, `getHistory`, `clearTrail` |

### Context-based State
| Context | File | Provided Values |
|---------|------|-----------------|
| `ShopStatusProvider` | `src/lib/store/shop-status.tsx` | `shopEnabled`, `supportPhone`, `maxOrderQuantity`, `contactPhone` |

### React Query
- `QueryClient` in `Providers.tsx` with `staleTime: 60_000`, `retry: 1`

---

## 5. SHARED COMPONENTS

### Layout Components
| Component | File | Used By |
|-----------|------|---------|
| `Navbar` | `src/components/layout/Navbar.tsx` | MainLayout |
| `Footer` | `src/components/layout/Footer.tsx` | MainLayout |
| `MobileMenu` | `src/components/layout/MobileMenu.tsx` | Navbar |
| `FloatingActions` | `src/components/layout/FloatingActions.tsx` | Providers |
| `CmdKSearch` | `src/components/layout/CmdKSearch.tsx` | Providers |
| `CursorFollower` | `src/components/layout/CursorFollower.tsx` | Providers (dynamic, SSR off) |

### Auth Components
| Component | File | Used By |
|-----------|------|---------|
| `LoginModal` | `src/components/auth/LoginModal.tsx` | Providers |
| `OtpForm` | `src/components/auth/OtpForm.tsx` | LoginPage |
| `PasswordForm` | `src/components/auth/PasswordForm.tsx` | LoginPage |
| `OtpInput` | `src/components/auth/OtpInput.tsx` | LoginModal, ForgotPasswordPage |
| `CountdownTimer` | `src/components/auth/CountdownTimer.tsx` | ForgotPasswordPage |

### Cart Components
| Component | File | Used By |
|-----------|------|---------|
| `CartDrawer` | `src/components/cart/CartDrawer.tsx` | Providers |
| `CartItem` | `src/components/cart/CartItem.tsx` | CartPage |
| `CartSummary` | `src/components/cart/CartSummary.tsx` | CartPage |

### Product Components
| Component | File | Used By |
|-----------|------|---------|
| `ProductCard` | `src/components/product/ProductCard.tsx` | HomePage, ProductsClient |
| `ProductSkeleton` | `src/components/product/ProductSkeleton.tsx` | Loading states |
| `ImageSlider` | `src/components/product/ImageSlider.tsx` | ProductDetailClient |
| `AddToCartButton` | `src/components/product/AddToCartButton.tsx` | ProductDetailClient |
| `QuantitySelector` | `src/components/product/QuantitySelector.tsx` | ProductDetailClient |

### Checkout Components
| Component | File | Used By |
|-----------|------|---------|
| `StepIndicator` | `src/components/checkout/StepIndicator.tsx` | CheckoutPage |
| `AddressStep` | `src/components/checkout/AddressStep.tsx` | CheckoutPage |
| `ShippingStep` | `src/components/checkout/ShippingStep.tsx` | CheckoutPage |
| `ConfirmStep` | `src/components/checkout/ConfirmStep.tsx` | CheckoutPage |
| `PaymentReceipt` | `src/components/checkout/PaymentReceipt.tsx` | PaymentResultPage |

### Profile Components
| Component | File | Used By |
|-----------|------|---------|
| `ProfileLayout` | `src/components/profile/ProfileLayout.tsx` | ProfileRouteLayout |
| `OrderStatusBadge` | `src/components/profile/OrderStatusBadge.tsx` | OrdersPage, OrderDetailPage |
| `OrderTimeline` | `src/components/profile/OrderTimeline.tsx` | OrderDetailPage |

### Blog Components
| Component | File | Used By |
|-----------|------|---------|
| `BlogCard` | `src/components/blog/BlogCard.tsx` | HomePage, BlogPage, BlogDetailPage |

### Home Section Components
| Component | File | Used By |
|-----------|------|---------|
| `HeroSlider` | `src/components/home/HeroSlider.tsx` | HomePage |
| `TrustBar` | `src/components/home/TrustBar.tsx` | HomePage |
| `StatsCounter` | `src/components/home/StatsCounter.tsx` | HomePage (dynamic) |
| `PartnersMarquee` | `src/components/home/PartnersMarquee.tsx` | HomePage (dynamic) |
| `TestimonialsCarousel` | `src/components/home/TestimonialsCarousel.tsx` | HomePage (dynamic) |
| `NewsletterForm` | `src/components/home/NewsletterForm.tsx` | HomePage (dynamic) |

### Contact Components
| Component | File | Used By |
|-----------|------|---------|
| `ContactForm` | `src/components/contact/ContactForm.tsx` | ContactPage |

### Editor Components
| Component | File | Used By |
|-----------|------|---------|
| `PuckRenderer` | `src/components/editor/PuckRenderer.tsx` | PageSlugPage |

### Chatbot Components
| Component | File | Used By |
|-----------|------|---------|
| `ChatWidget` | `src/components/chatbot/ChatWidget.tsx` | Providers |

### Shared Utility Components
| Component | File | Used By |
|-----------|------|---------|
| `ScrollReveal` | `src/components/shared/ScrollReveal.tsx` | HomePage, AboutPage, SoftwarePage |
| `StaggerGrid` / `StaggerItem` | `src/components/shared/StaggerGrid.tsx` | HomePage |
| `SectionTitle` | `src/components/shared/SectionTitle.tsx` | HomePage, AboutPage, SoftwarePage |
| `AnimatedCounter` | `src/components/shared/AnimatedCounter.tsx` | AboutPage |
| `CountdownTimer` | `src/components/shared/CountdownTimer.tsx` | — |
| `SwiperCarousel` | `src/components/shared/SwiperCarousel.tsx` | — |
| `MagneticButton` | `src/components/shared/MagneticButton.tsx` | — |
| `Pagination` | `src/components/shared/Pagination.tsx` | ProductsClient |
| `LoadingSpinner` | `src/components/shared/LoadingSpinner.tsx` | — |
| `EmptyState` | `src/components/shared/EmptyState.tsx` | — |
| `Breadcrumb` | `src/components/shared/Breadcrumb.tsx` | PaymentResultPage |
| `LenisProvider` | `src/components/shared/LenisProvider.tsx` | Providers (dynamic, SSR off) |

### Trail Components
| Component | File | Used By |
|-----------|------|---------|
| `BreadcrumbTrail` | `src/components/trail/BreadcrumbTrail.tsx` | Multiple pages |
| `ClientTrailWrapper` | `src/components/trail/ClientTrailWrapper.tsx` | MainLayout |
| `FooterTrail` | `src/components/trail/FooterTrail.tsx` | Footer |
| `TrailPath`, `TrailDot`, `ScrollTrail`, `UserTrail` | `src/components/trail/` | Trail system |

### Tracking Components (decorative/thematic)
| Component | File | Used By |
|-----------|------|---------|
| `PulsingDot` | `src/components/tracking/PulsingDot.tsx` | ContactPage, OrderDetailPage |
| `SatelliteOrbit` | `src/components/tracking/SatelliteOrbit.tsx` | CartPage, HeroSlider |
| `RadarPing` | `src/components/tracking/RadarPing.tsx` | Footer, HeroSlider |
| `SignalStrength` | `src/components/tracking/SignalStrength.tsx` | BlogPage, CheckoutPage, OrdersPage, OrderDetailPage |
| `AnimatedRoute` | `src/components/tracking/AnimatedRoute.tsx` | OrderDetailPage |
| `TrackingTicker` | `src/components/tracking/TrackingTicker.tsx` | — |
| `MapPreview` | `src/components/tracking/MapPreview.tsx` | ContactPage, OrdersPage, OrderDetailPage |
| `LocationBadge` | `src/components/tracking/LocationBadge.tsx` | — |

### Custom SVG Icons
| Icon | File |
|------|------|
| `BatteryLife` | `src/components/shared/icons/BatteryLife.tsx` |
| `RoutePath` | `src/components/shared/icons/RoutePath.tsx` |
| `TrackerPin` | `src/components/shared/icons/TrackerPin.tsx` |
| `GPSSignal` | `src/components/shared/icons/GPSSignal.tsx` |
| `RadarIcon` | `src/components/shared/icons/RadarIcon.tsx` |

### UI Primitives (shadcn/ui based)
| Component | File |
|-----------|------|
| `button` | `src/components/ui/button.tsx` |
| `input` | `src/components/ui/input.tsx` |
| `card` | `src/components/ui/card.tsx` |
| `badge` | `src/components/ui/badge.tsx` |
| `dialog` | `src/components/ui/dialog.tsx` |
| `alert-dialog` | `src/components/ui/alert-dialog.tsx` |
| `select` | `src/components/ui/select.tsx` |
| `dropdown-menu` | `src/components/ui/dropdown-menu.tsx` |
| `tabs` | `src/components/ui/tabs.tsx` |
| `form` | `src/components/ui/form.tsx` |
| `label` | `src/components/ui/label.tsx` |
| `textarea` | `src/components/ui/textarea.tsx` |
| `separator` | `src/components/ui/separator.tsx` |
| `skeleton` | `src/components/ui/skeleton.tsx` |
| `table` | `src/components/ui/table.tsx` |
| `sonner` | `src/components/ui/sonner.tsx` |
| `input-otp` | `src/components/ui/input-otp.tsx` |
| `avatar` | `src/components/ui/avatar.tsx` |
| `breadcrumb` | `src/components/ui/breadcrumb.tsx` |
| `pagination` | `src/components/ui/pagination.tsx` |

---

## 6. FORMS & VALIDATION

| Form | Location | Fields | Validation |
|------|----------|--------|------------|
| OTP Login | `LoginModal.tsx` | phone (tel) | Regex `^09[0-9]{9}$`, normalizePhone |
| OTP Verify | `LoginModal.tsx` | otp (6 digits) | length >= 6 |
| Profile Name | `LoginModal.tsx` | full_name (text) | optional |
| Profile Edit | `profile/page.tsx` | full_name, email, national_id | Zod: min(2), email optional, length(10) optional |
| Change Password | `profile/change-password/page.tsx` | old_password, new_password, confirm_password | Zod: min(1), min(8), match |
| Forgot Password Phone | `forgot-password/page.tsx` | phone | Zod + normalizePhone + isValidPhone |
| Forgot Password Reset | `forgot-password/page.tsx` | otp, password, confirm | Zod: length(6), min(6), match |
| Contact Form | `ContactForm.tsx` | name, phone, message | — |
| Address Add | `AddressesPage.tsx` | title, province_id, city_id, street, postal_code | Required: province, city, street, postal_code |
| Checkout Name | `CheckoutPage.tsx` | customerName | Required, trimmed |
| Search | `CmdKSearch.tsx` | query | min 2 chars for API call |
| Newsletter | `NewsletterForm.tsx` | email | — |

---

## 7. THIRD-PARTY INTEGRATIONS

| Integration | Package | Usage |
|-------------|---------|-------|
| **Django REST API** | fetch (custom) | All data fetching via `src/lib/api/django.ts` |
| **React Query** | `@tanstack/react-query` | QueryClient in Providers.tsx |
| **Zustand** | `zustand` | 6 stores (auth, cart, cart-drawer, login-modal, search-modal, user-trail) |
| **Framer Motion** | `framer-motion` | Extensive: HeroSlider, LoginModal, CartDrawer, checkout steps, page transitions |
| **Swiper** | `swiper` | TestimonialsCarousel, SwiperCarousel |
| **Lenis** | `lenis` | Smooth scrolling (LenisProvider, dynamic import) |
| **Lucide React** | `lucide-react` | Icon library throughout |
| **shadcn/ui** | Radix primitives | All UI primitives (button, dialog, tabs, form, etc.) |
| **React Hook Form** | `react-hook-form` | Profile, ChangePassword, ForgotPassword, ContactForm |
| **Zod** | `zod` | Schema validation for forms |
| **Sonner** | `sonner` | Toast notifications |
| **canvas-confetti** | `canvas-confetti` | Login success, add-to-cart effects |
| **Puck Editor** | `@puckeditor/core` | CMS page editor (disabled in prod) |
| **next/font** | Vazirmatn | Persian font, weights 300–900 |
| **Tailwind CSS** | `tailwindcss` + `tailwindcss-animate` | Styling |
| **class-variance-authority** | `cva` | Component variants |
| **clsx + tailwind-merge** | — | `cn()` utility |

---

## 8. MIDDLEWARE

**File:** `middleware.ts`

- **Protected routes:** `/checkout`, `/profile` → redirect to `/login?redirect=...` if no `afi_token` cookie
- **Admin protected:** `/admin` → redirect to `/admin/login` if no `afi_admin_token` cookie
- **Matcher:** `/checkout/:path*`, `/profile/:path*`, `/admin/:path*`

---

## 9. STYLING INFRASTRUCTURE

### Design Tokens: `src/styles/tokens.css`
- **Brand colors:** navy (#1e3a5f), teal (#10b981), amber (#f59e0b), coral (#f97316)
- **Backgrounds:** base (#ffffff), soft (#f8fafc), muted (#f1f5f9)
- **Text:** heading (#0f172a), body (#334155), muted (#475569)
- **Borders:** soft (#e2e8f0), base (#cbd5e1)
- **Shadows:** card, hover, navy, teal, glow, etc.
- **Radius:** xs(6px), sm(8px), md(12px), lg(16px), xl(24px), 2xl(28px), full
- **Z-index scale:** navbar(300), mobile-menu-overlay(400), mobile-menu-drawer(500), dropdown(550), cart-drawer(700), login-modal(700), cmd-search(810), cursor(100)
- **Transitions:** fast(180ms), base(250ms), smooth(300ms cubic-bezier), bounce(500ms)
- **shadcn CSS variable overrides** included

### Tailwind Config: `tailwind.config.ts`
- Extended colors, fontFamily (Vazirmatn), borderRadius, spacing (section-mobile, section-desktop)
- Custom keyframes: accordion, fade-in, scale-in, slide-in, float, breathe, shimmer, pulse-ring, marquee, glow
- Custom boxShadow: float, neon, neon-navy

### Global CSS: `src/styles/globals.css`
- RTL base styles
- Utility classes for brand colors, glass morphism, shadows, hover effects
- Animations: marquee, pulse-glow, shimmer, fadeInUp, float, scale-in, breathe, glow-pulse, page-fade
- Swiper overrides, scrollbar styling, selection color
- Lenis overrides, safe-area, iOS zoom prevention
- `prefers-reduced-motion` respected

---

## 10. ENVIRONMENT VARIABLES

| Variable | Used In | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | django.ts, next.config.ts | Public Django API URL |
| `INTERNAL_API_URL` | django.ts, next.config.ts | Server-side Django API URL |
| `NODE_ENV` | next.config.ts | Production redirects |

---

## 11. DATA FILES

| File | Purpose |
|------|---------|
| `data/pages/home.json` | CMS page data for Puck editor |
| `data/pages/.gitkeep` | Placeholder |

---

## 12. STATIC ASSETS

- `/public/logo.png` — Company logo (used in Navbar)
- `/public/icon` — Favicon (referenced in metadata)
- `/public/` — Other static assets

---

## 13. DEPLOYMENT

| File | Purpose |
|------|---------|
| `Dockerfile` | Docker build |
| `.dockerignore` | Docker ignore |
| `runflare.yaml` | Runflare deployment config |
| `.env.production` | Production env vars |
| `.env.local` | Local dev env vars |
| `.env.local.example` | Example env vars |
