'use client'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'right' | 'left'
  centered?: boolean
  dark?: boolean
  className?: string
  action?: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align,
  centered,
  dark = false,
  className,
  action,
  as: Tag = 'h2',
}: SectionTitleProps) {
  const isCentered = centered ?? align === 'center'

  return (
    <div
      className={cn('mb-6 animate-fade-in-up', isCentered && 'text-center', className)}
    >
      <div className={cn('flex items-end justify-between gap-4', isCentered && 'flex-col items-center')}>
        <div>
          {eyebrow && (
            <div className={cn(
              'inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest mb-3',
              dark ? 'text-accent-light' : 'text-accent'
            )}>
              <span className="w-1 h-1 rounded-full bg-primary" />
              {eyebrow}
            </div>
          )}
          <Tag className={cn(
            'text-3xl md:text-4xl font-semibold leading-tight',
            dark ? 'text-white' : 'text-text-heading'
          )}>
            {title}
          </Tag>
          {/* Gradient accent underline */}
          <div className={cn(
            'h-[3px] w-16 rounded-full mt-3',
            dark
              ? 'bg-gradient-to-l from-accent/60 to-transparent'
              : 'bg-gradient-to-l from-accent via-primary/40 to-transparent'
          )} />
          {subtitle && (
            <p className={cn(
              'text-base md:text-lg mt-3 leading-relaxed max-w-3xl',
              dark ? 'text-slate-200' : 'text-[#6B7280]'
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
