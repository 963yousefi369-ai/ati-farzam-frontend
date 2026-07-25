import { ShieldCheck } from 'lucide-react'

export default function TrustBadge() {
  return (
    <div className="flex items-center justify-center gap-4 py-3">
      {/* Enamad trust seal placeholder */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-soft border border-border-soft">
        <ShieldCheck className="w-4 h-4 text-accent" aria-hidden="true" />
        <span className="text-[11px] font-medium text-text-muted">نماد اعتماد الکترونیک</span>
      </div>
      {/* Zarinpal trust seal placeholder */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-soft border border-border-soft">
        <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-[11px] font-medium text-text-muted">درگاه پرداخت زرین‌پال</span>
      </div>
    </div>
  )
}
