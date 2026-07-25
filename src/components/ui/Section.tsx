import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  soft?: boolean
}

export function Section({ children, className, soft }: SectionProps) {
  return (
    <section className={cn(
      'py-section-mobile md:py-section-desktop',
      soft && 'bg-soft',
      className
    )}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {children}
      </div>
    </section>
  )
}
