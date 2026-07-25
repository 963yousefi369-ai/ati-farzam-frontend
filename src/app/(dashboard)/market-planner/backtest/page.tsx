"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBacktestResults, runBacktest } from "@/lib/api/market-planner";
import { useState } from "react";
import { BarChart3, Play, CheckCircle, XCircle } from "lucide-react";

const variantLabels: Record<string, string> = {
  technical_only: "Technical Only",
  technical_sentiment: "Technical + Sentiment",
  technical_sentiment_astrology: "Technical + Sentiment + Astrology",
};

export default function BacktestPage() {
  const queryClient = useQueryClient();
  const { data: results, isLoading } = useQuery({
    queryKey: ["market-planner", "backtest-results"],
    queryFn: getBacktestResults,
  });

  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
    strategy_variant: "technical_only",
  });

  const mutation = useMutation({
    mutationFn: runBacktest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["market-planner", "backtest-results"] });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-5 h-5 text-teal-400" />
        <h2 className="text-lg font-bold">Backtest Results</h2>
      </div>

      {/* Run new backtest */}
      <section className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Run New Backtest</h3>
        <div className="grid grid-cols-4 gap-3">
          <input
            placeholder="Test Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500"
          />
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
          />
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
          />
          <select
            value={form.strategy_variant}
            onChange={(e) => setForm({ ...form, strategy_variant: e.target.value })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="technical_only">Technical Only</option>
            <option value="technical_sentiment">Technical + Sentiment</option>
            <option value="technical_sentiment_astrology">Technical + Sentiment + Astrology</option>
          </select>
        </div>
        <button
          onClick={() => mutation.mutate(form)}
          disabled={mutation.isPending}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors"
        >
          <Play className="w-4 h-4" />
          {mutation.isPending ? "Running..." : "Run Backtest"}
        </button>
        {mutation.isError && <p className="text-xs text-red-400 mt-2">Failed to start backtest</p>}
        {mutation.isSuccess && <p className="text-xs text-teal-400 mt-2">Backtest started!</p>}
      </section>

      {/* Comparison view */}
      {results && results.length > 0 && (
        <section className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Strategy Comparison</h3>
          <div className="grid grid-cols-3 gap-4">
            {["technical_only", "technical_sentiment", "technical_sentiment_astrology"].map((variant) => {
              const latest = results.find((r) => r.strategy_variant === variant);
              return (
                <div key={variant} className="p-4 bg-slate-800/40 rounded-lg text-center">
                  <p className="text-xs text-slate-500 mb-2">{variantLabels[variant]}</p>
                  {latest ? (
                    <>
                      <p className={`text-3xl font-bold ${
                        latest.overall_accuracy >= 0.5 ? "text-teal-400" : "text-red-400"
                      }`}>
                        {(latest.overall_accuracy * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {latest.start_date} → {latest.end_date}
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-600 text-lg">—</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* All Results */}
      {isLoading ? (
        <div className="animate-pulse space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-slate-800/50 rounded-xl" />)}</div>
      ) : results && results.length > 0 ? (
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">{r.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                  {variantLabels[r.strategy_variant] ?? r.strategy_variant}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>{r.start_date} → {r.end_date}</span>
                <span>{r.pairs_tested?.length ?? 0} pairs</span>
                <span className={r.overall_accuracy >= 0.5 ? "text-teal-400" : "text-red-400"}>
                  Accuracy: {(r.overall_accuracy * 100).toFixed(1)}%
                </span>
              </div>
              {r.notes && <p className="text-xs text-slate-400 mt-2">{r.notes}</p>}
              
              {/* Per-pair breakdown */}
              {r.per_pair && Object.keys(r.per_pair).length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {Object.entries(r.per_pair).map(([pair, stats]) => (
                    <div key={pair} className="p-2 bg-slate-800/40 rounded text-center">
                      <p className="font-mono text-xs">{pair}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {stats.accuracy >= 0.5 ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                        <span className={`text-xs ${stats.accuracy >= 0.5 ? "text-green-400" : "text-red-400"}`}>
                          {(stats.accuracy * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600">{stats.correct}/{stats.total_predictions}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <p>No backtest results yet. Run your first backtest above.</p>
        </div>
      )}
    </div>
  );
}
