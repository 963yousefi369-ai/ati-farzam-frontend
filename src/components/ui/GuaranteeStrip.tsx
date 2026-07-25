import { ShieldCheck, RotateCcw, Headphones } from 'lucide-react'

const items = [
  { icon: ShieldCheck, label: 'ضمانت اصالت کالا' },
  { icon: RotateCcw, label: '۷ روز ضمانت بازگشت' },
  { icon: Headphones, label: 'پشتیبانی ۲۴/۷' },
]

export default function GuaranteeStrip() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-accent-light/40 border border-accent/15 px-3 py-2.5">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Icon className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
          <span className="text-xs font-medium text-text-secondary whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  )
}
