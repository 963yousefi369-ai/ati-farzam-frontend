"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/lib/api/market-planner";
import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["market-planner", "settings"],
    queryFn: getSettings,
  });

  const [form, setForm] = useState({
    use_astrology_signal: false,
    bale_chat_id: "",
    sentiment_provider: "local_model",
    daily_scan_hour: 7,
    blackout_minutes_before: 30,
    blackout_minutes_after: 30,
  });

  useEffect(() => {
    if (settings) setForm({
      use_astrology_signal: settings.use_astrology_signal,
      bale_chat_id: settings.bale_chat_id ?? "",
      sentiment_provider: settings.sentiment_provider,
      daily_scan_hour: settings.daily_scan_hour,
      blackout_minutes_before: settings.blackout_minutes_before,
      blackout_minutes_after: settings.blackout_minutes_after,
    });
  }, [settings]);

  const mutation = useMutation({
    mutationFn: (data: typeof form) => updateSettings(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["market-planner", "settings"] }),
  });

  if (isLoading) return <div className="animate-pulse h-60 bg-slate-800/50 rounded-xl" />;

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-teal-400" />
        <h2 className="text-lg font-bold">Market Planner Settings</h2>
      </div>

      <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 space-y-5">
        {/* Astrology toggle */}
        <label className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
          <div>
            <p className="text-sm font-medium">Astrology Signals</p>
            <p className="text-xs text-slate-500">Experimental. OFF by default. Only feeds into backtest comparison until proven useful.</p>
          </div>
          <button
            onClick={() => setForm({ ...form, use_astrology_signal: !form.use_astrology_signal })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              form.use_astrology_signal ? "bg-purple-600" : "bg-slate-700"
            }`}
          >
            <span className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
              form.use_astrology_signal ? "translate-x-6" : "translate-x-0.5"
            }`} />
          </button>
        </label>

        {/* Bale Chat ID */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Bale Chat ID</label>
          <input
            value={form.bale_chat_id}
            onChange={(e) => setForm({ ...form, bale_chat_id: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            placeholder="Chat ID for notifications"
          />
        </div>

        {/* Sentiment Provider */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Sentiment Provider</label>
          <select
            value={form.sentiment_provider}
            onChange={(e) => setForm({ ...form, sentiment_provider: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="local_model">Local Keyword Model (Free)</option>
            <option value="llm">LLM API (requires API key)</option>
          </select>
        </div>

        {/* Scan Hour */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Daily Scan Hour (Asia/Tehran)</label>
          <input
            type="number"
            min={0}
            max={23}
            value={form.daily_scan_hour}
            onChange={(e) => setForm({ ...form, daily_scan_hour: Number(e.target.value) })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        {/* Blackout Windows */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Blackout Before (min)</label>
            <input
              type="number"
              value={form.blackout_minutes_before}
              onChange={(e) => setForm({ ...form, blackout_minutes_before: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Blackout After (min)</label>
            <input
              type="number"
              value={form.blackout_minutes_after}
              onChange={(e) => setForm({ ...form, blackout_minutes_after: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        <button
          onClick={() => mutation.mutate(form)}
          disabled={mutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {mutation.isPending ? "Saving..." : "Save Settings"}
        </button>
        {mutation.isSuccess && <p className="text-xs text-teal-400">Settings saved!</p>}
      </div>

      {/* Scoring Weights Info */}
      <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Scoring Weights (Transparent)</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-24 text-slate-500">Technical</span>
            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: "60%" }} />
            </div>
            <span className="text-teal-400 w-10 text-right">60%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-slate-500">Sentiment</span>
            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }} />
            </div>
            <span className="text-blue-400 w-10 text-right">30%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-slate-500">Astrology</span>
            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "10%" }} />
            </div>
            <span className="text-purple-400 w-10 text-right">10%</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-600 mt-3">
          Astrology weight only applied when the toggle above is ON. Weights are hardcoded in the backend 
          (MARKET_PLANNER_SETTINGS[&quot;SCORING_WEIGHTS&quot;]) and can be adjusted in config/settings/base.py.
        </p>
      </div>
    </div>
  );
}
