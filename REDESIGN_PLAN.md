# REDESIGN_PLAN.md — Full Redesign Specification

> For every page: endpoints/data-fetching that remain untouched (copied from INVENTORY.md), current problems, new layout/components/typography/color per elite-design-language, exact motion spec, RTL rules, risk flags.

---

## Phase 0: Foundation (tokens.css + tailwind.config.ts + globals.css)

**This must be done FIRST. Every page redesign depends on these tokens being correct.**

### Files to Modify
- `src/styles/tokens.css`
- `src/styles/globals.css`
- `tailwind.config.ts`

### Current Problems
1. `--teal: #10b981` → must become `#0e7490`
2. `--teal-dark: #059669` → must become `#155e6f`
3. `--teal-light: #d1fae5` → must become `#cffafe`
4. `--amber: #f59e0b` → remove decorative usage, keep only as `--warning: #b45309`
5. `--coral: #f97316` → remove entirely
6. `--shadow-glow`, `--shadow-neon` → remove
7. `--glass-bg`, `--glass-border`, `--glass-blur` → remove
8. All gradients except `--gradient-hero` → remove
9. `gradient-text-teal` utility → remove
10. Add `--rust: #9a3412` and `--rust-dark: #7c2d12`
11. Add `--font-sans: 'IRANSansX', 'Vazirmatn', system-ui, sans-serif`
12. Font weights: keep 400, 500, 600 only; remove 700, 800, 900
13. Shadow tokens: only `--shadow-card` and `--shadow-hover` (untinted)
14. Add `--hover-lift: -2px`
15. Motion durations: `--duration-base: 160ms`, `--duration-ceiling: 600ms`
16. Easing: only `--ease-settle`, `--ease-standard`, `--ease-exit`

### New Token Values (from design-system.md)
```css
:root {
  --teal: #0e7490;
  --teal-dark: #155e6f;
  --teal-light: #cffafe;
  --rust: #9a3412;
  --rust-dark: #7c2d12;
  --warning: #b45309;
  --warning-dark: #92400e;
  --error-text: #dc2626;
  
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05);
  --shadow-hover: 0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.07);
  --hover-lift: -2px;
  
  --ease-settle: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  
  --duration-instant: 80ms;
  --duration-fast: 120ms;
  --duration-base: 160ms;
  --duration-moderate: 200ms;
  --duration-ceiling: 600ms;
}
```

### Tailwind Config Changes
- `colors.teal.DEFAULT`: `#0e7490`
- `colors.teal.dark`: `#155e6f`
- Remove `colors.coral`
- Remove `colors.amber.DEFAULT` (keep `colors.warning`)
- Add `colors.rust.DEFAULT`: `#9a3412`
- `fontFamily.sans`: `['IRANSansX', 'Vazirmatn', 'system-ui', 'sans-serif']`
- Remove `boxShadow.float`, `boxShadow.neon`, `boxShadow.neon-navy`
- Remove gradient-related animations that use non-hero gradients

### Global CSS Cleanup
- Remove `gradient-text-teal` utility
- Remove `glass`, `glass-dark`, `glass-premium` utilities
- Remove `shadow-glow`, `shadow-neon` utilities
- Remove `animated-border` (uses conic gradient)
- Keep: `card-modern`, `hover-lift`, `hover-scale`, `img-zoom`
- Update all hardcoded color references to use CSS variables

### Risk: LOW — Pure token/CSS changes, no logic touched.

---

## Phase 1: Shared Layout Components

### 1A. Navbar (`src/components/layout/Navbar.tsx`)

**Endpoints/Data (DO NOT TOUCH):**
- `useCartStore` → `totalCount()`
- `useAuthStore` → `user`, `token`, `logout`
- `useLoginModal` → `openLogin`
- `useCartDrawer` → `openDrawer`
- `useSearchModal` → `openSearch`
- `useShopStatus` → `contactPhone`

**Current Problems:**
- Uses `#1e3a5f` hardcoded, `#10b981` for accents
- Announcement bar uses `#1e3a5f` background
- Register button uses gradient (`linear-gradient(135deg, #059669, #10b981)`)
- Glass morphism on scroll (`backdrop-filter: blur(12px)`)
- `font-bold` used for active nav items
- Mega menu shadow too heavy

**New Design:**
- Announcement bar: `bg-navy` (solid, no gradient)
- Navbar: white background, `--shadow-card` at rest, glass effect REMOVED
- Nav pill menu: `bg-white border border-border-soft` with `--shadow-card`
- Active item: `text-teal font-semibold` (not bold)
- Register button: `bg-teal text-white` (solid, no gradient), `font-semibold`
- Mega menu: `bg-white --shadow-hover rounded-xl`
- All colors via CSS variables, no hex literals
- Weight: max `font-semibold` (600)

**Motion Spec:**
- Announcement bar: `height: auto` transition, 200ms `--ease-standard`
- Mega menu: `opacity 0→1, translateY(6px→0)`, 160ms `--ease-standard`
- Cart badge: `scale(0→1)`, spring (keep existing)
- Search dropdown: `opacity 0→1, translateY(6px→0)`, 160ms `--ease-standard`

**RTL Rules:**
- All layouts already RTL ✓
- Mega menu positioned `right-0` ✓
- Chevron rotation direction correct ✓

**Risk: LOW — Visual only, no state/logic changes.**

### 1B. Footer (`src/components/layout/Footer.tsx`)

**Endpoints/Data (DO NOT TOUCH):**
- Static content, no API calls

**Current Problems:**
- Uses `bg-gradient-to-b from-navy-deeper to-gray-950`
- Amber accent on section headers (`from-amber`)
- Glass morphism on logo container (`backdrop-blur-sm`)
- Glow decorations in background

**New Design:**
- Background: solid `--navy-deep` (`#0f172a`), no gradient
- Section header accents: `bg-teal` (not amber)
- Logo container: solid `bg-white/10 border border-white/10` (no blur)
- Remove background glow decorations
- Trust bar: keep structure, update colors to teal
- All colors via CSS variables

**Motion Spec:**
- Social icons: `scale(1.1) translateY(-2px)` on hover, 160ms `--ease-standard`
- Link hover: `padding-right` increase, 160ms `--ease-standard`

**Risk: LOW — Visual only.**

### 1C. Providers (`src/components/Providers.tsx`)

**Endpoints/Data (DO NOT TOUCH):**
- QueryClient config
- All provider components

**Changes:**
- Update Toaster styling if it uses hardcoded colors
- No logic changes

**Risk: NONE.**

---

## Phase 2: Homepage (`/`)

**File:** `src/app/(main)/page.tsx`

### Endpoints/Data (DO NOT TOUCH — byte-for-byte identical):
```
getBanners() → banners[]
getPartners() → partners[]
getSettings() → settings
getProducts({ page_size: 8 }) → products[]
getDjangoBlogs() → blogs[]
djangoImageUrl(), publicImageUrl() — helpers
revalidate = 300
```

### Current Problems:
- Hero headline uses `font-black` (900)
- Product cards use old teal/amber
- "Why Us" section uses `font-bold`
- About section uses `font-bold`
- Software section uses amber gradient CTA
- Partners marquee uses old colors
- Stats counter uses `font-black`
- All section titles use `font-bold` or `font-black`

### New Design Per Section:

**1. Hero (HeroSlider)**
- Headline: `text-5xl md:text-6xl lg:text-7xl font-semibold text-white` (NOT font-black)
- Subtitle: `text-lg text-white/80`
- CTA: `bg-teal text-white font-semibold` (solid, no gradient)
- Secondary CTA: `text-white hover:bg-white/10`
- Background: `--gradient-hero` only
- Trust metrics: keep structure, update icon colors to teal

**2. Trust Bar**
- Update icon colors: `text-teal` (new value)
- Keep layout

**3. Stats Counter**
- Numbers: `font-semibold` (not font-black)
- Update colors to CSS variables

**4. Featured Products**
- Section title: `text-3xl font-semibold` (not font-bold)
- Product cards: see ProductCard redesign
- "مشاهده همه" button: `border-teal text-teal hover:bg-teal hover:text-white`

**5. Why Us**
- Cards: `bg-white border border-border-soft` with `--shadow-card`
- Icon containers: `bg-teal-light` (new `#cffafe`)
- Title: `font-semibold`
- Hover: `--shadow-hover`, `translateY(-2px)`

**6. About**
- Image: keep, update shadow to `--shadow-card`
- Text: `font-semibold` for title
- Feature grid icons: `text-navy` ✓
- Button: `border-teal text-teal`

**7. Software + App**
- Section title: `font-semibold`
- Feature cards: same pattern as Why Us
- CTA buttons: `bg-teal text-white` (solid, no gradient)
- App download buttons: `bg-slate-900 text-white` ✓ (keep)

**8. Partners Marquee**
- Update to neutral styling

**9. Testimonials**
- Keep structure, update colors

**10. Blog**
- BlogCard: update colors

**11. Newsletter**
- Update colors

### Motion Spec:
- ScrollReveal: `opacity 0→1, translateY(16px→0)`, 400ms `--ease-standard`, fires once
- StaggerGrid: stagger 80ms between items
- Product card hover: `translateY(-2px)`, `--shadow-card→--shadow-hover`, 160ms `--ease-standard`
- HeroSlider: keep autoplay (7s), but add `prefers-reduced-motion` check ✓

### RTL Rules:
- All layouts RTL ✓
- Hero text right-aligned ✓
- Grid order: text right, image left ✓

### Risk: MEDIUM — HeroSlider is complex; ensure no visual regressions.

---

## Phase 3: Product Pages

### 3A. Products Listing (`/products`)

**File:** `src/app/(main)/products/page.tsx` + ProductsClient

**Endpoints/Data (DO NOT TOUCH):**
```
getProducts(params) → products (paginated 12)
getCategories() → categories
searchParams: page, category, search
dynamic = 'force-dynamic'
```

**New Design:**
- Page title: `text-3xl font-semibold text-navy`
- Category sidebar: update colors to teal
- Search input: `border-border-soft focus:border-teal`
- Product grid: 1→2→3→4 columns responsive
- Pagination: update colors

**Risk: LOW — Visual only.**

### 3B. Product Detail (`/products/[slug]`)

**File:** `src/app/(main)/products/[slug]/page.tsx` + ProductDetailClient

**Endpoints/Data (DO NOT TOUCH):**
```
getProduct(slug) → product
getProducts(similarParams) → similarProducts[]
images[], jsonLd
revalidate = 86400
```

**New Design:**
- Product name: `text-3xl font-semibold text-navy`
- Price: `text-2xl font-semibold text-navy`
- Add to cart button: `bg-teal text-white font-semibold`
- Out of stock: `bg-muted text-muted`
- Image slider: keep, update border/shadow
- Similar products: same card pattern

**Risk: LOW — Visual only.**

### 3C. ProductCard (`src/components/product/ProductCard.tsx`)

**Endpoints/Data (DO NOT TOUCH):**
```
useCartStore → addItem
useShopStatus → shopEnabled, supportPhone, maxOrderQuantity
product props: id, name, price, compare_price, in_stock, stock, slug, rating, review_count
```

**Current Problems:**
- Uses `#10b981` hardcoded
- `font-bold` for price
- Discount badge uses amber
- "Add to cart" uses `bg-navy` ✓ (correct)
- Wishlist heart uses red ✓ (semantic, OK)

**New Design:**
- Price: `text-navy font-semibold` (not font-bold)
- Discount badge: `bg-teal-light text-teal-dark` (not amber)
- "Add to cart": `bg-teal text-white` (new teal)
- Out of stock badge: `bg-error-light text-error-text`
- Card: `border border-border-soft` with `--shadow-card`
- Hover: `--shadow-hover`, `translateY(-2px)`, 160ms
- Spotlight effect: keep `card-modern` class (uses CSS variables)

**Risk: LOW — Visual only.**

---

## Phase 4: Cart & Checkout

### 4A. Cart Page (`/cart`)

**File:** `src/app/(main)/cart/page.tsx`

**Endpoints/Data (DO NOT TOUCH):**
```
useCartStore → items, totalCount, totalPrice
```

**New Design:**
- Title: `text-2xl font-semibold text-navy`
- Empty state: update colors
- CartItem: update colors
- CartSummary: update colors
- Checkout button: `bg-teal text-white font-semibold`

**Risk: LOW.**

### 4B. CartDrawer (`src/components/cart/CartDrawer.tsx`)

**Endpoints/Data (DO NOT TOUCH):**
```
useCartDrawer → open, closeDrawer
useCartStore → items, removeItem, updateQuantity, totalPrice, totalCount
useAuthStore → token
useLoginModal → openLogin
```

**New Design:**
- Header: `border-b border-border-soft`
- Item cards: `bg-white border border-border-soft`
- Quantity buttons: `border-border-soft hover:border-teal`
- Remove button: `text-muted hover:text-error`
- Footer: `bg-white border-t border-border-soft`
- "تسویه حساب" button: `bg-teal text-white font-semibold`

**Risk: LOW.**

### 4C. Checkout Page (`/checkout`)

**File:** `src/app/(main)/checkout/page.tsx`

**Endpoints/Data (DO NOT TOUCH):**
```
useAuthStore → token, user, updateUser
useCartStore → items
useLoginModal → openLogin
updateProfile(token, data)
```

**New Design:**
- Title: `text-2xl font-semibold text-navy`
- StepIndicator: update active step to `bg-teal border-teal`
- Name confirmation: update colors
- Order summary: `bg-muted` with `--shadow-card`
- All buttons: `bg-teal text-white font-semibold`

**Risk: LOW.**

### 4D. Checkout Sub-components
- `StepIndicator`: active step `bg-teal`, completed `bg-success` (teal)
- `AddressStep`, `ShippingStep`, `ConfirmStep`: update colors
- `PaymentReceipt`: update colors

---

## Phase 5: Auth Pages

### 5A. Login Page (`/login`)

**File:** `src/app/(auth)/login/page.tsx`

**Endpoints/Data (DO NOT TOUCH):**
```
useAuthStore → token, user
useSearchParams → redirect
Tabs: OtpForm, PasswordForm
```

**New Design:**
- Logo container: `bg-gradient-to-br from-navy to-teal` (this is the one permitted gradient usage for hero-like elements)
- Title: `text-2xl font-semibold text-navy`
- Card: `bg-white border border-border-soft` with `--shadow-card`
- Tabs: active tab `bg-white text-navy`
- All form inputs: standard token styling

**Risk: LOW.**

### 5B. LoginModal (`src/components/auth/LoginModal.tsx`)

**Endpoints/Data (DO NOT TOUCH):**
```
useLoginModal → open, message, returnUrl, onLoginSuccess, closeLogin
useAuthStore → setAuth, token
sendOtp, verifyOtp, getProfile, updateProfile
Steps: phone → otp → name → success
```

**New Design:**
- Header gradient: `linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0e7490 100%)` (use new teal)
- All buttons: `bg-navy text-white font-semibold`
- Step indicator: white bars on gradient
- Success: green circle ✓ (semantic, OK)

**Risk: LOW — Visual only, no auth logic touched.**

### 5C. Forgot Password (`/forgot-password`)

**Similar to login — update colors and weights.**

### 5D. OTP/Password Forms
- Update button colors to `bg-navy`
- Update input focus to `border-teal`

---

## Phase 6: Profile Pages

### 6A. Profile Layout (`src/components/profile/ProfileLayout.tsx`)
- Update sidebar colors

### 6B. Profile Page (`/profile`)
- Form: update button to `bg-teal text-white`
- Card: `border border-border-soft` with `--shadow-card`

### 6C. Orders (`/profile/orders`)
- Order cards: update colors
- Status badges: use semantic colors correctly

### 6D. Order Detail (`/profile/orders/[id]`)
- Table: update header colors
- Timeline: update colors
- Cancel button: `text-error-text border-error/20`

### 6E. Addresses (`/profile/addresses`)
- Address cards: update colors
- Dialog: update colors

### 6F. Change Password (`/profile/change-password`)
- Form: update colors

**Risk for all profile pages: LOW — Visual only.**

---

## Phase 7: Content Pages

### 7A. Blog Listing (`/blog`)
- Hero gradient: `--gradient-hero` ✓
- BlogCard: update colors
- Sidebar: update colors

### 7B. Blog Detail (`/blog/[slug]`)
- Prose styling: update link color to `text-teal`
- Related posts: update colors

### 7C. About (`/about`)
- Stats: `font-semibold` (not font-black)
- Why Us cards: update colors

### 7D. Contact (`/contact`)
- ContactForm: update colors
- MapPreview: keep

### 7E. Software (`/software`)
- CTA buttons: `bg-teal` (no gradient)
- Feature cards: update colors

**Risk for all content pages: LOW.**

---

## Phase 8: Global Components

### 8A. FloatingActions (`src/components/layout/FloatingActions.tsx`)
- Scroll-to-top: `bg-white --shadow-card`
- WhatsApp: `bg-success` (teal) ✓

### 8B. CmdKSearch (`src/components/layout/CmdKSearch.tsx`)
- Update colors to tokens

### 8C. ChatWidget (`src/components/chatbot/ChatWidget.tsx`)
- Update colors to tokens

### 8D. Shared Components
- `SectionTitle`: `font-semibold` (not font-bold)
- `ScrollReveal`: keep
- `StaggerGrid`: keep
- `AnimatedCounter`: keep
- `Pagination`: update colors
- `LoadingSpinner`: keep
- `EmptyState`: update colors
- `Breadcrumb`: update colors

### 8E. Tracking Components (decorative)
- `PulsingDot`: update colors to teal
- `SatelliteOrbit`: keep
- `RadarPing`: update to teal
- `SignalStrength`: update to teal
- `AnimatedRoute`: update to teal/navy
- `MapPreview`: keep
- `LocationBadge`: update to teal

### 8F. Trail Components
- Update colors to tokens

---

## Items That Must NOT Be Changed

### State Management (all stores)
- `src/lib/store/auth.ts` — byte-for-byte
- `src/lib/store/cart.ts` — byte-for-byte
- `src/lib/store/cart-drawer.ts` — byte-for-byte
- `src/lib/store/login-modal.ts` — byte-for-byte
- `src/lib/store/search-modal.ts` — byte-for-byte
- `src/lib/store/shop-status.tsx` — byte-for-byte
- `src/lib/store/user-trail.ts` — byte-for-byte

### API Layer
- `src/lib/api/django.ts` — byte-for-byte
- `src/lib/api/pages.ts` — byte-for-byte

### Utility Functions
- `src/lib/utils.ts` — byte-for-byte
- `src/lib/confetti.ts` — byte-for-byte

### Middleware
- `middleware.ts` — byte-for-byte

### API Routes
- `src/app/api/chatbot/**` — byte-for-byte
- `src/app/api/editor/**` — byte-for-byte

### Layout Structure
- `src/app/layout.tsx` — byte-for-byte (font loading, metadata)
- `src/app/(main)/layout.tsx` — byte-for-byte (data fetching, ShopStatusProvider)
- `src/app/(auth)/layout.tsx` — byte-for-byte
- `src/app/(main)/profile/layout.tsx` — byte-for-byte

### Config Files
- `next.config.ts` — byte-for-byte
- `package.json` — byte-for-byte
- `tsconfig.json` — byte-for-byte
- `postcss.config.js` — byte-for-byte

### Data Files
- `data/pages/**` — byte-for-byte

---

## Execution Order

1. **Phase 0**: Foundation tokens (tokens.css, tailwind.config.ts, globals.css)
2. **Phase 1A**: Navbar
3. **Phase 1B**: Footer
4. **Phase 2**: Homepage
5. **Phase 3A**: Products listing
6. **Phase 3B-C**: Product detail + ProductCard
7. **Phase 4A-B**: Cart page + CartDrawer
8. **Phase 4C-D**: Checkout flow
9. **Phase 5**: Auth pages + LoginModal
10. **Phase 6**: Profile pages
11. **Phase 7**: Content pages (blog, about, contact, software)
12. **Phase 8**: Global components

Each phase: rebuild visual shell only → self-review with impeccable → git diff verify → commit.
