import { Skeleton } from '@/components/ui/skeleton'

export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-border-soft overflow-hidden bg-white animate-fade-in-up">
      <div className="h-48 sm:h-60 bg-gradient-to-b from-light-tint to-white">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-3 w-3 rounded-sm" />
          ))}
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-full rounded-xl mt-3" />
      </div>
    </div>
  )
}

export function ProductSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}>
          <ProductSkeleton />
        </div>
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[520px] bg-gradient-to-br from-navy-deeper to-navy flex items-center">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-5">
          <Skeleton className="h-12 w-3/4 bg-white/10" />
          <Skeleton className="h-6 w-full bg-white/10" />
          <Skeleton className="h-6 w-2/3 bg-white/10" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-36 bg-white/10 rounded-xl" />
            <Skeleton className="h-12 w-36 bg-white/10 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-72 w-full bg-white/10 rounded-3xl" />
      </div>
    </div>
  )
}

export function BlogSkeleton() {
  return (
    <div className="rounded-2xl border border-border-default/40 overflow-hidden bg-white">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}
