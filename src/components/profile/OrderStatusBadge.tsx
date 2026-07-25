import { Badge } from '@/components/ui/badge'
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '@/components/ui/badge'
import { Check } from 'lucide-react'

type StatusKey = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

const STATUS_MAP: Record<StatusKey, { label: string; variant: VariantProps<typeof badgeVariants>['variant'] }> = {
  pending:    { label: 'در انتظار تأیید',   variant: 'warning' },
  paid:       { label: 'تأیید شده',         variant: 'secondary' },
  processing: { label: 'در حال آماده‌سازی', variant: 'secondary' },
  shipped:    { label: 'تحویل به پست',      variant: 'secondary' },
  delivered:  { label: 'تحویل شده',         variant: 'success' },
  cancelled:  { label: 'لغو شده',           variant: 'destructive' },
}

interface OrderStatusBadgeProps {
  status: string
  className?: string
}

export default function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const cfg = STATUS_MAP[status as StatusKey] ?? {
    label: status,
    variant: 'secondary' as const,
  }
  return (
    <Badge variant={cfg.variant} role="status" className={className}>
      {status === 'delivered' && <Check className="w-3 h-3 inline ml-1" />}{cfg.label}
    </Badge>
  )
}
