# PRODUCT.md — Ati Farzam Tracker Shop

## What is this?
An e-commerce storefront for **Ati Farzam Iranian Co.** (آتی فرزام ایرانیان), selling GPS trackers for vehicles, fleets, personal use, and motorcycles in the Iranian market.

## Target audience
- Fleet managers and logistics companies in Iran
- Individual car/motorcycle owners concerned about theft and tracking
- Parents wanting personal trackers for children
- Small businesses managing company vehicles

## Core user flows
1. **Browse** → Land on hero, explore categories, view featured products
2. **Search** → Quick search in navbar with live results
3. **Product detail** → View specs, images, price, add to cart
4. **Cart & checkout** → Review items, enter address, choose shipping, pay via Zarinpal
5. **Auth** → OTP-based login via phone number (no passwords)
6. **Order tracking** → View order status and history in profile
7. **Platform showcase** → Learn about the tracking software/dashboard

## Key pages
| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero, categories, featured products, platform CTA |
| `/products` | Product listing with filters (category, search, sort) |
| `/products/[slug]` | Product detail with image slider, specs, add-to-cart |
| `/cart` | Cart review |
| `/checkout` | Multi-step checkout (address → shipping → payment) |
| `/payment/result` | Payment success/failure callback |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post detail |
| `/about` | Company info |
| `/contact` | Contact form |
| `/software` | Tracking platform features |
| `/profile` | User dashboard |
| `/profile/orders` | Order history |
| `/profile/orders/[id]` | Order detail |

## Business rules
- **Display currency: Toman, everywhere, no exceptions.** Backend/API may
  store or return values in Rial — the frontend converts once at the data
  layer and formats with `Intl.NumberFormat('fa-IR')` + Persian numerals.
  Never show Rial to the user and never mix the two units across pages
  (this was previously inconsistent between the product price docs and the
  free-shipping threshold — Toman is now the single source of truth).
- Free shipping threshold: 1,000,000 Toman
- Support available 24/7 via phone
- Payment gateway: Zarinpal (primary)
- SMS provider: Kavenegar (OTP login)
- Product stock is tracked; out-of-stock items shown but disabled for cart,
  with a text label ("ناموجود") — never conveyed by color/opacity alone

## API integration
- Django REST backend at configurable base URL
- Endpoints: products, categories, settings, partners, banners, orders, auth (OTP)
- SSR with `revalidate = 300` (5 min ISR) for homepage
- Fallback to hardcoded `landingData` when backend is offline

## Content strategy
- All landing page copy lives in `src/data/landing.ts` for easy backend migration
- API settings override hardcoded values when available
- Persian (Farsi) throughout, RTL layout

## Known gaps / future pages (not yet built — backlog, not spec)
These are flagged as missing from the current sitemap, not committed work.
Evaluate each against actual conversion/support data before building:
- `/404` and a styled 500/offline error page (currently unstyled defaults)
- Product comparison table (useful given multiple tracker SKUs with
  overlapping specs)
- A short guided "which tracker do I need" finder for non-technical buyers
  (parents, individual drivers)
- Post-purchase install/activation guide — the product experience really
  starts after delivery, and this is currently undocumented end-to-end
