# AUDIT.md — Full Page-by-Page Design Audit

> Scoring every page 1-10 per review-checklist.md category.
> elite-design-language is the constitution. impeccable + ui-ux-pro-max-skill used for audit methodology only.

---

## Global Anti-Patterns (apply to ALL pages)

### Critical Violations Found Across the Project

1. **`#10b981` (old stock emerald teal) used everywhere** — The design-system.md specifies `--teal: #0e7490` (Instrument Teal), but the entire codebase uses `#10b981`. This is the single largest palette violation. Every teal reference must change.

2. **`#f59e0b` (amber) used decoratively** — Amber appears in badges, sale indicators, star ratings, gradient accents. The design system explicitly retires amber from decorative use. Only `--warning: #b45309` (narrow functional use) is permitted.

3. **`font-black` (900) and `font-bold` (700) used extensively** — The design system caps weight at Semibold(600). Multiple pages use `font-black` for hero headings and `font-bold` throughout.

4. **Gradient text classes exist** — `gradient-text-teal` in globals.css. Design system bans all gradient text.

5. **Glass morphism tokens exist** — `--glass-bg`, `--glass-border`, `--glass-blur` in tokens.css. Design system removes all glass tokens.

6. **Glow/neon shadow tokens exist** — `--shadow-glow`, `shadow-neon`, `shadow-neon-navy` in tailwind config. Design system removes all glow tokens.

7. **Multiple gradients beyond `--gradient-hero`** — `--gradient-teal`, `--gradient-amber`, `--gradient-coral`, `--gradient-sale`, `--gradient-warm` all exist. Only `--gradient-hero` is permitted.

8. **Countdown timer component exists** — `CountdownTimer.tsx` in shared components. Design system bans countdown timers (fake urgency).

9. **Coral color (`#f97316`) exists** — Not in the design system palette at all.

10. **Vazirmatn is the primary font** — Design system specifies IRANSansX as primary, Vazirmatn as fallback only.

---

## Page: `/` (Homepage)

**File:** `src/app/(main)/page.tsx`

### 1. Trust & Price Transparency — Score: 3/10
- Products show `effective_price` but NO annual subscription fee is displayed
- No "total cost" (device + subscription) visible on product cards
- No tier-to-situation mapping (individual/fleet/enterprise)
- No renewal pricing shown
- "12 years" appears in hero section ✓ but not consistently
- Testimonials are in `TestimonialsCarousel` — cannot verify authenticity without runtime

### 2. Responsiveness Signal — Score: 5/10
- Contact phone appears in announcement bar ✓
- Phone visible in footer ✓
- No contact path visible in product sections (below fold)
- ChatWidget exists in Providers ✓ but not visible near pricing
- No stated response expectation ("we answer during business hours")

### 3. Visual Hierarchy & Clarity — Score: 5/10
- One H1 in hero ✓
- Multiple CTAs compete in hero (primary + secondary) — acceptable if one is clearly primary
- Hero headline uses `font-black` (900) — violates weight cap
- Product section has clear SectionTitle ✓
- "Why Us" section shows 3 items — passes progressive disclosure ✓
- Software features show 4 items — borderline

### 4. Brand & Palette Consistency — Score: 3/10
- Uses `#10b981` (old teal) throughout — FAIL
- Uses `#f59e0b` (amber) for decorative elements — FAIL
- Navy sections: Hero (1) + Partners/Footer area — count OK
- No rust (`#9a3412`) used at all — should use it for confirmed facts
- `font-black` (900) appears — violates weight ceiling
- Multiple gradients used (hero, teal buttons, amber accents) — FAIL
- Glass morphism on navbar — FAIL
- Glow shadows on buttons — FAIL
- Icon style: Lucide throughout ✓

### 5. Typography — Score: 4/10
- Font: Vazirmatn (should be IRANSansX) — FAIL
- Uses `font-black` (900), `font-bold` (700) — violates 3-weight, 600-ceiling rule
- Body text 16px ✓
- Line heights appear correct for RTL ✓
- No gradient text on hero ✓ (gradient is on background)
- `text-wrap: balance` on headings ✓

### 6. Spacing & Rhythm — Score: 6/10
- Section padding uses `py-section-mobile` / `py-section-desktop` (4rem / 6rem) — close to tokens
- Card padding inconsistent across sections
- Grid gaps use `gap-5`, `gap-6` — not always matching 24px/32px tokens
- Container uses `max-w-7xl` consistently ✓

### 7. Contrast — Score: 6/10
- Body text `#334155` on white passes 7.5:1 ✓
- Navy headings pass AAA ✓
- `#10b981` (old teal) used for small text in some places — contrast ~3.5:1 FAIL
- `#f59e0b` (amber) on white ~2.5:1 for small text — FAIL
- Focus ring uses teal ✓

### 8. Motion — Score: 5/10
- Framer Motion used extensively ✓
- HeroSlider auto-plays — violates "no auto-playing carousel" rule
- `prefers-reduced-motion` checked in HeroSlider ✓
- Multiple easing curves used (not limited to 3)
- Scroll-triggered animations via ScrollReveal ✓
- Duration ceiling 600ms appears respected ✓

### 9. Accessibility — Score: 5/10
- Skip link in MainLayout ✓
- `alt` text on images ✓
- Keyboard navigation on mega menu ✓
- Touch targets: many buttons are `h-10` (40px) — below 44px minimum
- Form labels present ✓
- Color-only indicators: some badges use color only

### 10. Device Responsiveness — Score: 7/10
- Grid responsive: 1→2→4 columns ✓
- Hero adapts well ✓
- No horizontal scroll ✓
- Mobile hamburger menu ✓
- Some text may be too small on mobile (14px captions)

### 11. Steady, Considered Feeling — Score: 4/10
- No countdown timers ✓
- No "today only" badges ✓
- BUT: Amber/gold accents used for "premium" feeling — FAIL
- Hero uses `font-black` — reads as "trying to impress" not "stating a fact"
- Gradient buttons (teal, amber) — flashy, not steady
- Glass morphism on navbar — trendy, not considered
- Glow shadows — flashy

### 12. Overall Polish — Score: 6/10
- No placeholder text ✓
- Loading states exist (skeletons) ✓
- Error states handled ✓
- Some broken image fallbacks ✓

### **Homepage Weighted Score: 4.5/10** — FAIL (below 8.0)

---

## Page: `/products` (Product Listing)

**File:** `src/app/(main)/products/page.tsx` + `ProductsClient`

### 1. Trust & Price Transparency — Score: 3/10
- Products show price but NO annual subscription fee
- No total cost visible
- No tier mapping
- Search/filter present but no pricing context

### 2. Responsiveness Signal — Score: 4/10
- Contact phone in Navbar ✓
- No contact near product grid
- No stated response time

### 3. Visual Hierarchy & Clarity — Score: 6/10
- Clear H1 "محصولات" ✓
- Category filter sidebar ✓
- Search functionality ✓
- One primary CTA per card (add to cart) ✓

### 4. Brand & Palette Consistency — Score: 3/10
- Same global palette violations (old teal, amber, bold weights)
- Product cards use consistent styling ✓
- Badge colors inconsistent

### 5. Typography — Score: 5/10
- Vazirmatn (should be IRANSansX)
- Weight violations on page title
- Card typography consistent ✓

### 6. Spacing & Rhythm — Score: 6/10
- Grid spacing consistent ✓
- Card padding consistent ✓

### 7. Contrast — Score: 6/10
- Same global contrast issues

### 8. Motion — Score: 6/10
- StaggerGrid animation on cards ✓
- `prefers-reduced-motion` respected ✓

### 9. Accessibility — Score: 5/10
- Same global touch target issues
- Category filter accessible ✓

### 10. Device Responsiveness — Score: 7/10
- Responsive grid 1→2→3→4 ✓
- Sidebar collapses on mobile ✓

### 11. Steady, Considered Feeling — Score: 5/10
- No fake urgency ✓
- But amber/bold violations persist

### 12. Overall Polish — Score: 6/10
- Loading skeletons ✓
- Empty states ✓

### **Products Page Weighted Score: 4.8/10** — FAIL

---

## Page: `/products/[slug]` (Product Detail)

**File:** `src/app/(main)/products/[slug]/page.tsx` + `ProductDetailClient`

### 1. Trust & Price Transparency — Score: 2/10
- Shows price but NO annual subscription fee
- No total cost calculation
- No renewal pricing
- JSON-LD structured data present ✓

### 2. Responsiveness Signal — Score: 4/10
- Phone in Navbar ✓
- No contact near purchase decision point

### 3. Visual Hierarchy & Clarity — Score: 6/10
- Clear product name as H1 ✓
- Price clearly visible ✓
- Add to cart prominent ✓
- Similar products section ✓

### 4. Brand & Palette Consistency — Score: 3/10
- Same global violations

### 5. Typography — Score: 5/10
- Same global violations

### 6. Spacing & Rhythm — Score: 6/10
- Image gallery + info layout ✓
- Consistent card spacing ✓

### 7. Contrast — Score: 6/10
- Same global issues

### 8. Motion — Score: 6/10
- ImageSlider interactions ✓

### 9. Accessibility — Score: 5/10
- Same global issues
- Image alt text ✓

### 10. Device Responsiveness — Score: 7/10
- Stacks on mobile ✓

### 11. Steady, Considered Feeling — Score: 5/10
- No fake urgency ✓
- But palette/weight violations

### 12. Overall Polish — Score: 6/10

### **Product Detail Weighted Score: 4.5/10** — FAIL

---

## Page: `/cart` (Shopping Cart)

**File:** `src/app/(main)/cart/page.tsx`

### 1. Trust & Price Transparency — Score: 4/10
- Shows item prices and total ✓
- No subscription fees shown (depends on product)
- Clear price formatting ✓

### 2. Responsiveness Signal — Score: 4/10
- Phone in Navbar ✓
- No contact near checkout CTA

### 3. Visual Hierarchy & Clarity — Score: 7/10
- Clear H1 "سبد خرید" ✓
- One primary CTA (checkout) ✓
- Empty state well-designed ✓

### 4. Brand & Palette Consistency — Score: 4/10
- Uses hardcoded `#1e3a5f`, `#10b981` colors
- Gradient button — violates single-gradient rule

### 5. Typography — Score: 5/10
- Same global violations

### 6. Spacing & Rhythm — Score: 7/10
- Clean layout ✓
- Consistent card spacing ✓

### 7. Contrast — Score: 6/10
- Same global issues

### 8. Motion — Score: 7/10
- AnimatePresence for item removal ✓
- Smooth transitions ✓

### 9. Accessibility — Score: 6/10
- Touch targets on quantity buttons ~40px — borderline
- Clear labels ✓

### 10. Device Responsiveness — Score: 7/10
- Responsive grid ✓

### 11. Steady, Considered Feeling — Score: 5/10
- Gradient CTA button — flashy

### 12. Overall Polish — Score: 7/10

### **Cart Page Weighted Score: 5.3/10** — FAIL

---

## Page: `/checkout` (Checkout Flow)

**File:** `src/app/(main)/checkout/page.tsx`

### 1. Trust & Price Transparency — Score: 5/10
- Order summary shows items + prices ✓
- Shipping cost shown when selected ✓
- Total calculated ✓
- No subscription context

### 2. Responsiveness Signal — Score: 4/10
- Phone in Navbar ✓
- No contact near payment step

### 3. Visual Hierarchy & Clarity — Score: 7/10
- StepIndicator clear ✓
- One step at a time ✓
- Name confirmation gate ✓

### 4. Brand & Palette Consistency — Score: 4/10
- Hardcoded colors
- Gradient buttons

### 5. Typography — Score: 5/10

### 6. Spacing & Rhythm — Score: 7/10

### 7. Contrast — Score: 6/10

### 8. Motion — Score: 7/10
- Step transitions ✓
- SignalStrength indicator ✓

### 9. Accessibility — Score: 6/10
- Form labels ✓
- Step indicator aria ✓

### 10. Device Responsiveness — Score: 7/10

### 11. Steady, Considered Feeling — Score: 5/10

### 12. Overall Polish — Score: 6/10

### **Checkout Page Weighted Score: 5.2/10** — FAIL

---

## Page: `/blog` (Blog Listing)

**File:** `src/app/(main)/blog/page.tsx`

### Scores (abbreviated — same global violations apply)

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | N/A for blog |
| Responsiveness | 4/10 | Phone in Navbar only |
| Hierarchy | 6/10 | Clear H1, grid layout |
| Brand/Palette | 3/10 | Global violations |
| Typography | 4/10 | Global violations |
| Spacing | 6/10 | Consistent |
| Contrast | 6/10 | Global issues |
| Motion | 5/10 | Minimal |
| Accessibility | 5/10 | Global issues |
| Responsiveness | 7/10 | Good grid |
| Steady Feeling | 5/10 | Global issues |
| Polish | 6/10 | Sidebar disabled features |

### **Blog Page Weighted Score: 4.8/10** — FAIL

---

## Page: `/blog/[slug]` (Blog Detail)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | N/A |
| Responsiveness | 4/10 | |
| Hierarchy | 6/10 | Clear article layout |
| Brand/Palette | 3/10 | |
| Typography | 4/10 | |
| Spacing | 6/10 | |
| Contrast | 6/10 | |
| Motion | 4/10 | Minimal |
| Accessibility | 5/10 | |
| Responsiveness | 7/10 | |
| Steady Feeling | 5/10 | |
| Polish | 6/10 | |

### **Blog Detail Weighted Score: 4.7/10** — FAIL

---

## Page: `/about` (About Us)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 6/10 | Stats (12 years, 5000+ clients) ✓ |
| Responsiveness | 4/10 | |
| Hierarchy | 6/10 | Clear sections |
| Brand/Palette | 3/10 | |
| Typography | 4/10 | |
| Spacing | 6/10 | |
| Contrast | 6/10 | |
| Motion | 6/10 | AnimatedCounter ✓ |
| Accessibility | 5/10 | |
| Responsiveness | 7/10 | |
| Steady Feeling | 5/10 | |
| Polish | 6/10 | |

### **About Page Weighted Score: 4.9/10** — FAIL

---

## Page: `/contact` (Contact)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | Contact cards ✓ |
| Responsiveness | 6/10 | Phone, email, address visible ✓ |
| Hierarchy | 6/10 | Clear layout |
| Brand/Palette | 3/10 | |
| Typography | 4/10 | |
| Spacing | 6/10 | |
| Contrast | 6/10 | |
| Motion | 5/10 | PulsingDot ✓ |
| Accessibility | 5/10 | |
| Responsiveness | 7/10 | |
| Steady Feeling | 5/10 | |
| Polish | 6/10 | |

### **Contact Page Weighted Score: 4.9/10** — FAIL

---

## Page: `/software` (Software)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 4/10 | No pricing shown |
| Responsiveness | 5/10 | CTA to contact ✓ |
| Hierarchy | 6/10 | |
| Brand/Palette | 3/10 | |
| Typography | 4/10 | |
| Spacing | 6/10 | |
| Contrast | 6/10 | |
| Motion | 5/10 | |
| Accessibility | 5/10 | |
| Responsiveness | 7/10 | |
| Steady Feeling | 4/10 | Amber gradient CTA — flashy |
| Polish | 6/10 | |

### **Software Page Weighted Score: 4.6/10** — FAIL

---

## Page: `/profile` (Profile)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | |
| Responsiveness | 4/10 | |
| Hierarchy | 7/10 | Clean form layout |
| Brand/Palette | 4/10 | |
| Typography | 5/10 | |
| Spacing | 7/10 | |
| Contrast | 6/10 | |
| Motion | 4/10 | Minimal |
| Accessibility | 6/10 | Form labels ✓ |
| Responsiveness | 7/10 | |
| Steady Feeling | 6/10 | |
| Polish | 6/10 | |

### **Profile Page Weighted Score: 5.1/10** — FAIL

---

## Page: `/profile/orders` (Orders List)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | |
| Responsiveness | 4/10 | |
| Hierarchy | 6/10 | |
| Brand/Palette | 4/10 | |
| Typography | 5/10 | |
| Spacing | 7/10 | |
| Contrast | 6/10 | |
| Motion | 6/10 | Framer Motion list ✓ |
| Accessibility | 5/10 | |
| Responsiveness | 7/10 | |
| Steady Feeling | 5/10 | |
| Polish | 6/10 | |

### **Orders Page Weighted Score: 5.0/10** — FAIL

---

## Page: `/profile/orders/[id]` (Order Detail)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | Order totals clear ✓ |
| Responsiveness | 4/10 | |
| Hierarchy | 6/10 | |
| Brand/Palette | 4/10 | |
| Typography | 5/10 | |
| Spacing | 7/10 | |
| Contrast | 6/10 | |
| Motion | 6/10 | |
| Accessibility | 5/10 | |
| Responsiveness | 7/10 | |
| Steady Feeling | 5/10 | |
| Polish | 6/10 | |

### **Order Detail Weighted Score: 5.0/10** — FAIL

---

## Page: `/profile/addresses` (Addresses)

### Scores similar to profile pages — **Weighted Score: 5.0/10** — FAIL

---

## Page: `/profile/change-password` (Change Password)

### Scores similar to profile pages — **Weighted Score: 5.1/10** — FAIL

---

## Page: `/login` (Login)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | |
| Responsiveness | 4/10 | |
| Hierarchy | 7/10 | Clear login flow |
| Brand/Palette | 4/10 | Uses `bg-navy` correctly ✓ |
| Typography | 5/10 | |
| Spacing | 7/10 | |
| Contrast | 6/10 | |
| Motion | 5/10 | |
| Accessibility | 6/10 | |
| Responsiveness | 7/10 | |
| Steady Feeling | 6/10 | |
| Polish | 7/10 | |

### **Login Page Weighted Score: 5.3/10** — FAIL

---

## Page: `/forgot-password` (Forgot Password)

### Scores similar to login — **Weighted Score: 5.2/10** — FAIL

---

## Page: `/payment/result` (Payment Result)

### Scores

| Category | Score | Notes |
|----------|-------|-------|
| Trust & Price | 5/10 | |
| Responsiveness | 4/10 | |
| Hierarchy | 6/10 | |
| Brand/Palette | 4/10 | |
| Typography | 5/10 | |
| Spacing | 6/10 | |
| Contrast | 6/10 | |
| Motion | 4/10 | |
| Accessibility | 5/10 | |
| Responsiveness | 6/10 | |
| Steady Feeling | 5/10 | |
| Polish | 5/10 | |

### **Payment Result Weighted Score: 4.8/10** — FAIL

---

## Summary Table

| Page | Weighted Score | Status |
|------|---------------|--------|
| `/` (Homepage) | 4.5 | FAIL |
| `/products` | 4.8 | FAIL |
| `/products/[slug]` | 4.5 | FAIL |
| `/cart` | 5.3 | FAIL |
| `/checkout` | 5.2 | FAIL |
| `/blog` | 4.8 | FAIL |
| `/blog/[slug]` | 4.7 | FAIL |
| `/about` | 4.9 | FAIL |
| `/contact` | 4.9 | FAIL |
| `/software` | 4.6 | FAIL |
| `/profile` | 5.1 | FAIL |
| `/profile/orders` | 5.0 | FAIL |
| `/profile/orders/[id]` | 5.0 | FAIL |
| `/profile/addresses` | 5.0 | FAIL |
| `/profile/change-password` | 5.1 | FAIL |
| `/login` | 5.3 | FAIL |
| `/forgot-password` | 5.2 | FAIL |
| `/payment/result` | 4.8 | FAIL |

**Every page fails.** Minimum passing score is 8.0. The highest score is 5.3.

---

## Root Cause Analysis

The failures are not page-specific — they are **systemic**. The entire project was built with a different (generic SaaS) palette and weight system than what the elite-design-language specifies. Fixing individual pages without fixing the foundation would be wasted effort.

### The 7 Systemic Fixes Required

1. **Palette swap**: `#10b981` → `#0e7490` (teal), remove `#f59e0b` decorative amber, add `#9a3412` (rust) for confirmed facts
2. **Weight cap**: Remove all `font-black` (900) and `font-bold` (700), cap at `font-semibold` (600)
3. **Font swap**: Vazirmatn → IRANSansX (primary), keep Vazirmatn as fallback
4. **Gradient cleanup**: Remove all gradients except `--gradient-hero`, remove gradient text
5. **Glass/glow removal**: Remove all glass morphism and glow/neon tokens
6. **Shadow normalization**: Use only `--shadow-card` and `--shadow-hover` (2 levels, untinted)
7. **Price transparency**: Add annual subscription fee display to all product cards

### Priority Order for REDESIGN_PLAN.md

1. `tokens.css` + `tailwind.config.ts` + `globals.css` — foundation first
2. `Navbar.tsx` + `Footer.tsx` — visible on every page
3. Homepage (`/`) — highest traffic
4. Product pages (`/products`, `/products/[slug]`) — revenue critical
5. Checkout flow (`/cart`, `/checkout`) — conversion critical
6. Auth pages (`/login`, `/forgot-password`) — entry point
7. Profile pages — lower priority
8. Blog/content pages — lowest priority
