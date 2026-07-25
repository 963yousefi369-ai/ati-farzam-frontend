import { cn } from '@/lib/utils'

interface IconTileProps {
  icon: React.ComponentType<{ className?: string }>
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'accent' | 'muted'
  className?: string
}

const sizes = {
  sm: 'w-8 h-8 rounded-lg',
  md: 'w-10 h-10 rounded-xl',
  lg: 'w-14 h-14 rounded-2xl',
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
}

const variants = {
  primary: 'bg-primary/8 text-primary',
  accent: 'bg-accent/10 text-accent',
  muted: 'bg-light-tint text-text-muted',
}

export function IconTile({ icon: Icon, size = 'md', variant = 'primary', className }: IconTileProps) {
  return (
    <div className={cn(
      sizes[size],
      variants[variant],
      'flex items-center justify-center shrink-0',
      className
    )}>
      <Icon className={iconSizes[size]} />
    </div>
  )
}
