"use client";

import { useQuery } from "@tanstack/react-query";
import { getDailyPlans, getTodayPlan } from "@/lib/api/market-planner";
import { Target, AlertTriangle, Moon } from "lucide-react";

const phaseLabels: Record<string, string> = {
  strong_trend: "Strong Trend",
  weak_trend: "Weak Trend",
  range_choppy: "Range/Choppy",
  high_vol_breakout: "High-Vol Breakout",
};

export default function DailyPlansPage() {
  const { data: todayPlan } = useQuery({
    queryKey: ["market-planner", "today-plan"],
    queryFn: getTodayPlan,
  });

  const { data: plans, isLoading } = useQuery({
    queryKey: ["market-planner", "daily-plans"],
    queryFn: getDailyPlans,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-5 h-5 text-teal-400" />
        <h2 className="text-lg font-bold">Daily Plans</h2>
      </div>

      {/* Today's Plan Detail */}
      {todayPlan && (
        <section className="bg-slate-900/60 rounded-xl border border-teal-500/20 p-5">
          <h3 className="text-sm font-semibold text-teal-400 mb-4">
            Today — {todayPlan.date}
          </h3>
          <div className="space-y-4">
            {todayPlan.pair_assessments?.map((a) => (
              <div key={a.symbol} className="p-4 bg-slate-800/40 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold">{a.symbol}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {phaseLabels[a.phase] ?? a.phase}
                  </span>
                </div>

                {/* Sentiment */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Sentiment:</span>
                  <span className={a.current_sentiment >= 0 ? "text-teal-400" : "text-red-400"}>
                    {a.current_sentiment.toFixed(2)}
                  </span>
                  {a.overnight_shift && (
                    <span className="text-slate-500 ml-2">Shift: {a.overnight_shift}</span>
                  )}
                </div>

                {/* Entry Windows */}
                {a.entry_windows?.length > 0 && (
                  <div className="text-xs">
                    <span className="text-slate-500">Good Entry Windows: </span>
                    <span className="text-green-400">{a.entry_windows.join(", ")}</span>
                  </div>
                )}

                {/* Blackout Flags */}
                {a.blackout_flags?.length > 0 && (
                  <div className="space-y-1">
                    {a.blackout_flags.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{b.reason} — {b.start} – {b.end}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recommendation */}
                <p className="text-sm text-slate-300">{a.recommendation}</p>

                {/* Astrology (experimental) */}
                {a.astrology_flags && a.astrology_flags.length > 0 && (
                  <div className="border-t border-slate-700 pt-2">
                    <div className="flex items-center gap-1 text-[10px] text-purple-400 uppercase tracking-wide mb-1">
                      <Moon className="w-3 h-3" />
                      Experimental — Astrology Signals
                    </div>
                    {a.astrology_flags.map((f, i) => (
                      <p key={i} className="text-xs text-purple-300/70">{f}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Historical Daily Plans */}
      {!isLoading && plans && plans.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-slate-400 mb-3">Previous Days</h3>
          <div className="space-y-2">
            {plans.filter(p => p.date !== todayPlan?.date).slice(0, 14).map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded-lg border border-slate-800/50">
                <span className="font-mono text-sm">{p.date}</span>
                <span className="text-xs text-slate-500">{p.pair_assessments?.length ?? 0} pairs</span>
                <span className="text-xs text-slate-500 ml-auto">{p.status}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {!todayPlan && !isLoading && (
        <div className="text-center py-16 text-slate-500">
          <p>No daily plan for today yet. Generated each morning before session open.</p>
        </div>
      )}
    </div>
  );
}
