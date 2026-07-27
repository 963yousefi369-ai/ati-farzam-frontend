import { cn } from '@/lib/utils'

type SectionTone = 'white' | 'tint' | 'mesh'

interface SectionProps {
  children: React.ReactNode
  /** Background treatment. Keep the page alternating white / tint for rhythm. */
  tone?: SectionTone
  /** Vertical rhythm. `compact` is for strips (trust bar), `default` for content. */
  size?: 'compact' | 'default'
  /** Set to false when the child needs to bleed to the viewport edges. */
  contained?: boolean
  id?: string
  className?: string
}

const toneClass: Record<SectionTone, string> = {
  white: 'bg-white',
  tint: 'bg-[#F7F9FA]',
  mesh: 'bg-white bg-mesh',
}

/**
 * Single source of truth for section spacing and container width.
 *
 * Before this existed every section picked its own padding and max-width, which
 * is why the homepage had an inconsistent vertical rhythm and why some cards
 * were noticeably narrower than others on 1440px screens.
 */
export default function Section({
  children,
  tone = 'white',
  size = 'default',
  contained = true,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        size === 'compact' ? 'py-10 md:py-12' : 'py-16 md:py-24',
        toneClass[tone],
        className,
      )}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}
