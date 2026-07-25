"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/lib/api/market-planner";
import { TrendingUp, TrendingDown, AlertTriangle, Moon, Zap, BarChart3 } from "lucide-react";

const phaseColors: Record<string, string> = {
  strong_trend: "text-green-400 bg-green-500/15",
  weak_trend: "text-yellow-400 bg-yellow-500/15",
  range_choppy: "text-slate-400 bg-slate-500/15",
  high_vol_breakout: "text-orange-400 bg-orange-500/15",
};

const phaseLabels: Record<string, string> = {
  strong_trend: "Strong Trend",
  weak_trend: "Weak Trend",
  range_choppy: "Range/Choppy",
  high_vol_breakout: "High-Vol Breakout",
};

function ScoreBar({ label, value, max = 1 }: { label: string; value: number; max?: number }) {
  const pct = Math.abs(value / max) * 100;
  const isPositive = value >= 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 text-slate-500">{label}</span>
      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isPositive ? "bg-teal-500" : "bg-red-500"}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className={isPositive ? "text-teal-400" : "text-red-400"}>
        {value.toFixed(2)}
      </span>
    </div>
  );
}

export default function MarketPlannerDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["market-planner", "dashboard"],
    queryFn: getDashboardSummary,
    refetchInterval: 5 * 60_000,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-slate-800/50 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-slate-500">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <p>Failed to load market planner data.</p>
        <p className="text-xs mt-2">Make sure the backend is running and the market_planner app is configured.</p>
      </div>
    );
  }

  const plan = data?.latest_weekly_plan;
  const daily = data?.today_plan;
  const backtest = data?.latest_backtest;
  const events = data?.upcoming_events ?? [];

  return (
    <div className="space-y-6">
      {/* Top stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Active Pairs"
          value={plan?.ranked_pairs?.length ?? 0}
          icon={<TrendingUp className="w-5 h-5 text-teal-400" />}
        />
        <StatCard
          label="Best Pair"
          value={plan?.ranked_pairs?.[0]?.symbol ?? "—"}
          sub={plan?.ranked_pairs?.[0] ? `Score: ${plan.ranked_pairs[0].combined_score.toFixed(2)}` : ""}
          icon={<Zap className="w-5 h-5 text-yellow-400" />}
        />
        <StatCard
          label="Upcoming Events"
          value={events.length}
          sub={`${events.filter((e) => e.impact_level === "high").length} high impact`}
          icon={<AlertTriangle className="w-5 h-5 text-orange-400" />}
        />
        <StatCard
          label="Backtest Accuracy"
          value={backtest ? `${(backtest.overall_accuracy * 100).toFixed(1)}%` : "—"}
          sub={backtest?.strategy_variant?.replace(/_/g, " ")}
          icon={<BarChart3 className="w-5 h-5 text-purple-400" />}
        />
      </div>

      {/* Weekly Plan - Pair Rankings */}
      {plan && (
        <section className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-300">
              Weekly Plan — {plan.week_start} → {plan.week_end}
            </h2>
            <span className={`text-xs px-2 py-1 rounded-full ${
              plan.status === "sent" ? "bg-teal-500/15 text-teal-400" : "bg-slate-700 text-slate-400"
            }`}>
              {plan.status}
            </span>
          </div>

          <div className="space-y-3">
            {plan.ranked_pairs?.slice(0, 8).map((pair) => (
              <div
                key={pair.symbol}
                className="flex items-center gap-4 p-3 bg-slate-800/40 rounded-lg"
              >
                <span className="text-xs text-slate-600 w-6">#{pair.rank}</span>
                <span className="font-mono font-bold text-sm w-20">{pair.symbol}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${phaseColors[pair.phase] ?? "bg-slate-700 text-slate-400"}`}>
                  {phaseLabels[pair.phase] ?? pair.phase}
                </span>
                <div className="flex-1 space-y-1">
                  <ScoreBar label="Technical" value={pair.technical_score} />
                  <ScoreBar label="Sentiment" value={pair.sentiment_score} />
                  {pair.astrology_score != null && (
                    <ScoreBar label="Astrology" value={pair.astrology_score} />
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    pair.combined_score >= 0 ? "text-teal-400" : "text-red-400"
                  }`}>
                    {pair.combined_score.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-0.5">combined</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Today's Plan */}
      {daily && (
        <section className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">
            Today&apos;s Plan — {daily.date}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {daily.pair_assessments?.map((a) => (
              <div key={a.symbol} className="p-3 bg-slate-800/40 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm">{a.symbol}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${phaseColors[a.phase] ?? ""}`}>
                    {phaseLabels[a.phase] ?? a.phase}
                  </span>
                </div>
                {a.blackout_flags?.length > 0 && (
                  <div className="space-y-1">
                    {a.blackout_flags.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{b.reason}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-slate-400 leading-relaxed">{a.recommendation}</p>
                {a.astrology_flags && a.astrology_flags.length > 0 && (
                  <div className="border-t border-slate-700 pt-2 mt-2">
                    <div className="flex items-center gap-1 text-[10px] text-purple-400 mb-1">
                      <Moon className="w-3 h-3" />
                      <span>Experimental Astrology</span>
                    </div>
                    {a.astrology_flags.map((f, i) => (
                      <p key={i} className="text-[10px] text-purple-300">{f}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Upcoming Economic Events</h2>
          <div className="space-y-2">
            {events.slice(0, 10).map((ev) => (
              <div key={ev.id} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-slate-800/40">
                <span className={`w-2 h-2 rounded-full ${
                  ev.impact_level === "high" ? "bg-red-500" :
                  ev.impact_level === "medium" ? "bg-yellow-500" : "bg-slate-500"
                }`} />
                <span className="text-xs text-slate-500 w-16">{ev.currency}</span>
                <span className="flex-1 text-slate-300">{ev.event_name}</span>
                <span className="text-xs text-slate-500">{new Date(ev.datetime_utc).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, sub, icon }: {
  label: string; value: string | number; sub?: string; icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-xs text-slate-500">{label}</span></div>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
