'use client'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in-up', className)}
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-bg-muted flex items-center justify-center mb-6 animate-scale-in">
          <div className="animate-float">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-text-secondary text-sm max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
}
