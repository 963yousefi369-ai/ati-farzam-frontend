'use client'
import { Minus, Plus } from 'lucide-react'
import { toFa } from '@/lib/utils'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-0 border border-border-default/60 rounded-xl overflow-hidden bg-white w-fit shadow-sm">
      <button
        type="button"
        aria-label="کاهش تعداد"
        className="h-11 w-11 flex items-center justify-center rounded-none text-text-secondary hover:bg-primary/8 hover:text-primary active:bg-primary/12 disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-11 text-center font-semibold text-text-primary text-sm tabular-nums select-none" aria-live="polite" aria-label={`تعداد: ${toFa(value)}`}>
        {toFa(value)}
      </span>
      <button
        type="button"
        aria-label="افزایش تعداد"
        className="h-11 w-11 flex items-center justify-center rounded-none text-text-secondary hover:bg-primary/8 hover:text-primary active:bg-primary/12 disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
