import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'

type Tone = 'plain' | 'soft' | 'dark' | 'transparent'
type Space = 'sm' | 'md' | 'lg'

const TONES: Record<Tone, string> = {
  plain: 'bg-white',
  soft: 'bg-bg-soft',
  dark: 'bg-dark text-white bg-mesh',
  transparent: '',
}

/** ریتم عمودی — موبایل عمداً فشرده‌تر است */
const SPACES: Record<Space, string> = {
  sm: 'py-10 md:py-14',
  md: 'py-12 md:py-20',
  lg: 'py-16 md:py-24',
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  /** legacy — معادل tone="soft" */
  soft?: boolean
  tone?: Tone
  space?: Space
  size?: 'default' | 'wide' | 'narrow' | 'prose'
  id?: string
  /** اگر محتوا خالی بود، سکشن اصلاً رندر نشود (ضد «محصولی یافت نشد» وسط لندینگ) */
  hideWhenEmpty?: boolean
  isEmpty?: boolean
}

export function Section({
  children,
  className,
  innerClassName,
  soft,
  tone,
  space = 'md',
  size = 'wide',
  id,
  hideWhenEmpty,
  isEmpty,
}: SectionProps) {
  if (hideWhenEmpty && isEmpty) return null

  const resolvedTone: Tone = tone ?? (soft ? 'soft' : 'plain')

  return (
    <section
      id={id}
      className={cn('relative', SPACES[space], TONES[resolvedTone], className)}
    >
      <Container size={size} className={innerClassName}>
        {children}
      </Container>
    </section>
  )
}

export default Section
