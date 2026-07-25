import { Star } from 'lucide-react'
import { toFa } from '@/lib/utils'

interface ReviewSummaryProps {
  rating?: number
  reviewCount?: number
}

export default function ReviewSummary({ rating = 0, reviewCount = 0 }: ReviewSummaryProps) {
  if (!reviewCount) return null

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-warning fill-warning' : 'text-border-soft fill-bg-muted'}`}
          />
        ))}
      </div>
      <span className="text-xs text-text-muted">
        {toFa(rating)} از ۵ — {toFa(reviewCount)} نظر
      </span>
    </div>
  )
}
