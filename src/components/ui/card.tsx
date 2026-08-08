import { cn } from '@/lib/utils'

/**
 * سه سطح ارتفاع — بیشتر از این یعنی بی‌نظمی بصری.
 *   flat        → کارت اطلاعاتی، بدون سایه
 *   raised      → محتوای مستقل (محصول، مقاله)
 *   interactive → کلیک‌پذیر، با lift در hover (فقط روی پوینتر دقیق)
 *   dark        → روی سکشن تیره
 */
type Variant = 'flat' | 'raised' | 'interactive' | 'dark'

const VARIANTS: Record<Variant, string> = {
  flat: 'bg-white border border-border-soft',
  raised: 'bg-white border border-border-soft/70 shadow-card',
  interactive:
    'bg-white border border-border-soft/70 shadow-card hover-lift hover:border-primary/25 press-effect cursor-pointer',
  dark: 'bg-white/[0.04] border border-white/10 backdrop-blur-sm text-white',
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  padded?: boolean
}

export function Card({
  variant = 'raised',
  padded = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl transition-[border-color,box-shadow,transform] duration-200',
        VARIANTS[variant],
        padded && 'p-5 md:p-6',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/** مربع گرادیانی آیکون — امضای بصری تکرارشونده‌ی سایت */
export function CardIcon({
  children,
  className,
  tone = 'accent',
  size = 'md',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'accent' | 'primary' | 'discount'
  size?: 'sm' | 'md' | 'lg'
}) {
  const tones = {
    accent: 'from-accent/15 to-accent/5 text-accent-text ring-accent/15',
    primary: 'from-primary/15 to-primary/5 text-primary ring-primary/15',
    discount: 'from-discount/15 to-discount/5 text-discount ring-discount/15',
  }
  const sizes = { sm: 'h-9 w-9 rounded-lg', md: 'h-12 w-12 rounded-xl', lg: 'h-14 w-14 rounded-2xl' }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center bg-gradient-to-br ring-1 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110',
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export default Card
