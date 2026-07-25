/**
 * User Activity Tracking — client-side utility.
 *
 * Usage:
 *   import { trackEvent, trackPageView, trackClick, trackSearch, trackCartAction } from '@/lib/tracking'
 *
 *   trackPageView('/products')
 *   trackClick('/products/123', 'add_to_cart', { product_id: 123 })
 *   trackSearch('GPS tracker')
 *   trackCartAction('add', { product_id: 123, name: 'Tracker X' })
 */

const TRACKING_URL = '/api/tracking/track'

// ─── Session key management ──────────────────────────────────────────────────
const SESSION_KEY_STORAGE = 'tracking_session_key'

function getSessionKey(): string {
  if (typeof window === 'undefined') return ''
  let key = localStorage.getItem(SESSION_KEY_STORAGE)
  if (!key) {
    key = crypto.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(SESSION_KEY_STORAGE, key)
  }
  return key
}

// ─── Device info ─────────────────────────────────────────────────────────────
function getScreenResolution(): string {
  if (typeof window === 'undefined') return ''
  return `${screen.width}x${screen.height}`
}

// ─── Core tracking function ──────────────────────────────────────────────────
let _batchQueue: Array<Record<string, unknown>> = []
let _batchTimer: ReturnType<typeof setTimeout> | null = null
const BATCH_INTERVAL = 2000 // 2 seconds
const MAX_BATCH = 10

function flushBatch() {
  if (_batchQueue.length === 0) return
  const events = [..._batchQueue]
  _batchQueue = []

  // Send each event individually (the API expects single events)
  for (const event of events) {
    sendEvent(event)
  }
}

function sendEvent(body: Record<string, unknown>) {
  const payload = JSON.stringify(body)

  // Use sendBeacon for reliability (survives page unload)
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' })
    navigator.sendBeacon(TRACKING_URL, blob)
    return
  }

  // Fallback to fetch with keepalive
  fetch(TRACKING_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Silently ignore — tracking must never affect user experience
  })
}

/**
 * Track a custom event. Fire-and-forget — never blocks or throws.
 *
 * @param event_type - One of: page_view, click, search, auth, form_submit, cart_action, custom
 * @param path - URL path or event target
 * @param event_name - Human-readable event name
 * @param metadata - Arbitrary key-value data
 */
export function trackEvent(
  event_type: string,
  path: string,
  event_name: string = '',
  metadata: Record<string, unknown> = {},
) {
  if (typeof window === 'undefined') return

  const body = {
    session_key: getSessionKey(),
    event_type,
    path,
    event_name,
    metadata,
    screen_resolution: getScreenResolution(),
  }

  // Batch non-critical events, send page_view immediately
  if (event_type === 'page_view') {
    sendEvent(body)
  } else {
    _batchQueue.push(body)
    if (_batchQueue.length >= MAX_BATCH) {
      flushBatch()
    } else if (!_batchTimer) {
      _batchTimer = setTimeout(() => {
        _batchTimer = null
        flushBatch()
      }, BATCH_INTERVAL)
    }
  }
}

// ─── Convenience helpers ─────────────────────────────────────────────────────

/** Track a page view (called automatically by TrackingProvider). */
export const trackPageView = (path: string) =>
  trackEvent('page_view', path)

/** Track a click on a key element. */
export const trackClick = (path: string, name: string, meta?: Record<string, unknown>) =>
  trackEvent('click', path, name, meta)

/** Track a search query. */
export const trackSearch = (query: string) =>
  trackEvent('search', window.location.pathname, query)

/** Track a form submission. */
export const trackFormSubmit = (formName: string, meta?: Record<string, unknown>) =>
  trackEvent('form_submit', window.location.pathname, formName, meta)

/** Track a cart action (add, remove, update, checkout). */
export const trackCartAction = (action: string, meta?: Record<string, unknown>) =>
  trackEvent('cart_action', window.location.pathname, action, meta)

/** Track an auth event (login, logout, register, password_reset). */
export const trackAuth = (action: string, meta?: Record<string, unknown>) =>
  trackEvent('auth', window.location.pathname, action, meta)

/** Flush any pending batched events (call on page unload). */
export const flushTracking = () => flushBatch()
