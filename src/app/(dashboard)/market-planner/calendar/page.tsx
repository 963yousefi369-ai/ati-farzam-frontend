"use client";

import { useQuery } from "@tanstack/react-query";
import { getCalendar } from "@/lib/api/market-planner";
import { Calendar, AlertTriangle } from "lucide-react";

const impactColors: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-slate-500",
};

export default function CalendarPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["market-planner", "calendar"],
    queryFn: () => getCalendar({ days: 14 }),
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-slate-800/50 rounded-lg" />)}</div>;
  }

  // Group by date
  const grouped: Record<string, typeof events> = {};
  events?.forEach((ev) => {
    const d = new Date(ev.datetime_utc).toLocaleDateString();
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(ev);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-teal-400" />
        <h2 className="text-lg font-bold">Economic Calendar</h2>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p>No upcoming events found. Calendar data refreshes daily at 00:30.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, evts]) => (
          <section key={date} className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">{date}</h3>
            <div className="space-y-2">
              {(evts ?? []).map((ev) => (
                <div key={ev.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/40">
                  <span className={`w-2 h-2 rounded-full ${impactColors[ev.impact_level]}`} />
                  <span className="text-xs font-mono w-12 text-slate-400">{ev.currency}</span>
                  <span className="text-xs text-slate-500 w-16">
                    {new Date(ev.datetime_utc).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="flex-1 text-sm">{ev.event_name}</span>
                  <div className="flex gap-3 text-xs text-slate-500">
                    {ev.forecast && <span>FC: {ev.forecast}</span>}
                    {ev.previous && <span>Prev: {ev.previous}</span>}
                    {ev.actual && <span className="text-teal-400">Act: {ev.actual}</span>}
                  </div>
                  {ev.impact_level === "high" && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
