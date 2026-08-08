import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  /** متن کوتاه بالای تیتر — الگوی یکسان همه‌ی سکشن‌ها */
  eyebrow?: string
  subtitle?: string
  action?: React.ReactNode
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeader({
  title,
  eyebrow,
  subtitle,
  action,
  align = 'start',
  tone = 'light',
  className,
}: SectionHeaderProps) {
  const centered = align === 'center'
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        'mb-7 flex flex-col gap-4 md:mb-9 md:flex-row md:items-end md:justify-between',
        centered && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('min-w-0', centered && 'md:max-w-2xl')}>
        {eyebrow && (
          <span
            className={cn(
              'mb-2.5 inline-flex items-center gap-2 text-[13px] font-semibold',
              dark ? 'text-accent' : 'text-accent-text',
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {eyebrow}
          </span>
        )}

        <h2
          className={cn(
            'font-display text-balance',
            dark ? 'text-white' : 'text-dark',
          )}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={cn(
              'mt-2.5 max-w-2xl text-[15px] leading-[1.85]',
              dark ? 'text-white/70' : 'text-text-muted',
              centered && 'md:mx-auto',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export default SectionHeader
