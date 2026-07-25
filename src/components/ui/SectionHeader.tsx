import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between mb-8', className)}>
      <h2 className="text-2xl lg:text-3xl font-semibold text-dark">
        {title}
      </h2>
      {action}
    </div>
  )
}
