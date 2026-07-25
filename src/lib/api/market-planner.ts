// Market Planner API types and client functions

const isServer = typeof window === 'undefined'
function getBaseUrl(): string {
  if (!isServer) return ''
  return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
}
const API_ORIGIN = getBaseUrl()

async function mpRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_ORIGIN}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })
  if (!res.ok) {
    let body: Record<string, unknown> | null = null
    try { body = await res.json() } catch {}
    throw new Error(`API error ${res.status}: ${path}`)
  }
  return res.json()
}

// ─── Types ─────────────────────────────────────────────────

export interface ForexPair {
  id: number
  symbol: string
  base_currency: string
  quote_currency: string
  is_active: boolean
  category: 'major' | 'minor' | 'exotic'
}

export interface RankedPair {
  symbol: string
  rank: number
  technical_score: number
  sentiment_score: number
  astrology_score: number | null
  combined_score: number
  reasoning: string
  phase: string
}

export interface WeeklyPlan {
  id: number
  week_start: string
  week_end: string
  created_at: string
  status: 'draft' | 'final' | 'sent'
  ranked_pairs: RankedPair[]
  calendar_summary: string
  blackout_windows: Record<string, unknown>
  sentiment_summary: Record<string, unknown>
  astrology_summary: Record<string, unknown> | null
  sent_to_bale: boolean
}

export interface PairAssessment {
  symbol: string
  phase: string
  current_sentiment: number
  entry_windows: string[]
  blackout_flags: Array<{ start: string; end: string; reason: string }>
  overnight_shift: string
  astrology_flags: string[] | null
  recommendation: string
}

export interface DailyPlan {
  id: number
  date: string
  weekly_plan_id: number
  created_at: string
  status: string
  pair_assessments: PairAssessment[]
  sent_to_bale: boolean
}

export interface EconomicEvent {
  id: number
  currency: string
  datetime_utc: string
  impact_level: 'high' | 'medium' | 'low'
  event_name: string
  actual: string | null
  forecast: string | null
  previous: string | null
}

export interface BacktestPerPair {
  accuracy: number
  total_predictions: number
  correct: number
  avg_confidence: number
}

export interface BacktestResult {
  id: number
  name: string
  description: string
  run_date: string
  start_date: string
  end_date: string
  pairs_tested: string[]
  strategy_variant: 'technical_only' | 'technical_sentiment' | 'technical_sentiment_astrology'
  per_pair: Record<string, BacktestPerPair>
  overall_accuracy: number
  notes: string
}

export interface SentimentAggregate {
  currency: string
  period: string
  date: string
  avg_score: number
  item_count: number
  positive_count: number
  negative_count: number
  neutral_count: number
  key_themes: string[]
}

export interface DashboardSummary {
  latest_weekly_plan: WeeklyPlan | null
  today_plan: DailyPlan | null
  latest_backtest: BacktestResult | null
  upcoming_events: EconomicEvent[]
  sentiment_overview: SentimentAggregate[]
}

export interface MarketPlannerSettings {
  use_astrology_signal: boolean
  bale_chat_id: string
  sentiment_provider: string
  weekly_scan_day: string
  daily_scan_hour: number
  active_pair_symbols: string[]
  blackout_minutes_before: number
  blackout_minutes_after: number
}

// ─── API Functions ──────────────────────────────────────────

const BASE = '/api/market-planner'

export const getWeeklyPlans = () =>
  mpRequest<WeeklyPlan[]>(`${BASE}/weekly-plans/`)

export const getWeeklyPlan = (id: number) =>
  mpRequest<WeeklyPlan>(`${BASE}/weekly-plans/${id}/`)

export const getDailyPlans = () =>
  mpRequest<DailyPlan[]>(`${BASE}/daily-plans/`)

export const getDailyPlan = (id: number) =>
  mpRequest<DailyPlan>(`${BASE}/daily-plans/${id}/`)

export const getTodayPlan = () =>
  mpRequest<DailyPlan | null>(`${BASE}/daily-plans/today/`)

export const getBacktestResults = () =>
  mpRequest<BacktestResult[]>(`${BASE}/backtest-results/`)

export const getBacktestResult = (id: number) =>
  mpRequest<BacktestResult>(`${BASE}/backtest-results/${id}/`)

export const getPairs = () =>
  mpRequest<ForexPair[]>(`${BASE}/pairs/`)

export const getCalendar = (params?: { days?: number }) =>
  mpRequest<EconomicEvent[]>(`${BASE}/calendar/${params ? '?' + new URLSearchParams(params as any) : ''}`)

export const getSentiment = (currency: string) =>
  mpRequest<SentimentAggregate>(`${BASE}/sentiment/${currency}/`)

export const getDashboardSummary = () =>
  mpRequest<DashboardSummary>(`${BASE}/dashboard/summary/`)

export const getSettings = () =>
  mpRequest<MarketPlannerSettings>(`${BASE}/settings/`)

export const updateSettings = (data: Partial<MarketPlannerSettings>) =>
  mpRequest<MarketPlannerSettings>(`${BASE}/settings/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

export const runBacktest = (data: {
  name: string
  start_date: string
  end_date: string
  strategy_variant: string
}) =>
  mpRequest<{ task_id: string }>(`${BASE}/backtest/run/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
