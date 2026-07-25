"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeklyPlans } from "@/lib/api/market-planner";
import Link from "next/link";
import { Calendar, ChevronLeft } from "lucide-react";

export default function WeeklyPlansPage() {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["market-planner", "weekly-plans"],
    queryFn: getWeeklyPlans,
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-slate-800/50 rounded-xl" />)}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-teal-400" />
        <h2 className="text-lg font-bold">Weekly Plans</h2>
      </div>

      {(!plans || plans.length === 0) ? (
        <div className="text-center py-20 text-slate-500">
          <p>No weekly plans yet. The Sunday evening scan generates them automatically.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/market-planner/weekly/${plan.id}`}
              className="block p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-teal-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm">
                  {plan.week_start} → {plan.week_end}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  plan.status === "sent" ? "bg-teal-500/15 text-teal-400" :
                  plan.status === "final" ? "bg-blue-500/15 text-blue-400" :
                  "bg-slate-700 text-slate-400"
                }`}>
                  {plan.status}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>{plan.ranked_pairs?.length ?? 0} pairs</span>
                <span>Created: {new Date(plan.created_at).toLocaleDateString()}</span>
                {plan.sent_to_bale && <span className="text-teal-500">✓ Sent to Bale</span>}
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {plan.ranked_pairs?.slice(0, 5).map((p) => (
                  <span key={p.symbol} className="text-xs px-2 py-0.5 bg-slate-800 rounded font-mono">
                    {p.symbol}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
