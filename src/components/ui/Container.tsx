import { cn } from '@/lib/utils'

type Size = 'default' | 'wide' | 'narrow' | 'prose'

const SIZES: Record<Size, string> = {
  narrow: 'max-w-3xl',
  prose: 'max-w-[68ch]',
  default: 'max-w-[1280px]',
  wide: 'max-w-[1440px]',
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'nav'
}

/**
 * تنها جایی که عرض و پدینگ افقی تعریف می‌شود.
 * موبایل 16px / تبلت 24px / دسکتاپ 40px
 */
export function Container({
  size = 'default',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-10', SIZES[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Container
