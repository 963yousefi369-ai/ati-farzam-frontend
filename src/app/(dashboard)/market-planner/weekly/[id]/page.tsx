"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeklyPlan } from "@/lib/api/market-planner";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const phaseColors: Record<string, string> = {
  strong_trend: "text-green-400 bg-green-500/15",
  weak_trend: "text-yellow-400 bg-yellow-500/15",
  range_choppy: "text-slate-400 bg-slate-500/15",
  high_vol_breakout: "text-orange-400 bg-orange-500/15",
};

export default function WeeklyPlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading } = useQuery({
    queryKey: ["market-planner", "weekly-plan", id],
    queryFn: () => getWeeklyPlan(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="animate-pulse h-60 bg-slate-800/50 rounded-xl" />;
  if (!plan) return <div className="text-slate-500 text-center py-20">Plan not found</div>;

  return (
    <div className="space-y-6">
      <Link href="/market-planner/weekly" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Weekly Plans
      </Link>

      <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-6">
        <h2 className="text-xl font-bold mb-1">
          Week of {plan.week_start}
        </h2>
        <p className="text-sm text-slate-500">{plan.week_start} — {plan.week_end} · Status: {plan.status}</p>

        {plan.calendar_summary && (
          <div className="mt-4 p-3 bg-slate-800/40 rounded-lg">
            <h3 className="text-xs font-semibold text-slate-400 mb-2">Calendar Summary</h3>
            <p className="text-sm text-slate-300 whitespace-pre-wrap">{plan.calendar_summary}</p>
          </div>
        )}
      </div>

      {/* Pair Rankings */}
      <div className="space-y-3">
        {plan.ranked_pairs?.map((pair) => (
          <div key={pair.symbol} className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs text-slate-600 w-8">#{pair.rank}</span>
              <span className="font-mono font-bold text-lg">{pair.symbol}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${phaseColors[pair.phase] ?? ""}`}>
                {pair.phase?.replace(/_/g, " ")}
              </span>
              <span className={`ml-auto text-xl font-bold ${pair.combined_score >= 0 ? "text-teal-400" : "text-red-400"}`}>
                {pair.combined_score.toFixed(3)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <ScoreBox label="Technical" value={pair.technical_score} />
              <ScoreBox label="Sentiment" value={pair.sentiment_score} />
              {pair.astrology_score != null && <ScoreBox label="Astrology" value={pair.astrology_score} />}
            </div>

            {pair.reasoning && (
              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                {pair.reasoning}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center p-2 bg-slate-800/40 rounded-lg">
      <p className="text-[10px] text-slate-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${value >= 0 ? "text-teal-400" : "text-red-400"}`}>
        {value.toFixed(3)}
      </p>
    </div>
  );
}
