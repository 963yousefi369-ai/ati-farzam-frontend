'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, Newspaper } from 'lucide-react'
import { formatDate, cn } from '@/lib/utils'
import { publicImageUrl } from '@/lib/api/django'

interface BlogCardProps {
  post: {
    id: string | number
    slug: string
    title: string
    summary?: string
    cover?: string
    featured_image?: string | null
    created?: string
    created_at?: string
    published_at?: string | null
    author?: string
    tags?: string[]
  }
  className?: string
}

export default function BlogCard({ post, className }: BlogCardProps) {
  const coverSrc = post.featured_image
    ? publicImageUrl(post.featured_image)
    : post.cover
      ? publicImageUrl(post.cover)
      : null

  const date = post.published_at ?? post.created_at ?? post.created ?? ''

  return (
    <Card
      className={cn(
        'group overflow-hidden border-border bg-white h-full',
        'hover-lift hover:shadow-hover hover:border-primary/15 hover-glow',
        className
      )}
    >
      <div className="relative aspect-[16/9] bg-[#F0F2F4] overflow-hidden">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Newspaper className="w-12 h-12 text-primary/30 group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>{formatDate(date)}</span>
          {post.author && (
            <>
              <span className="mx-1 text-border-default">·</span>
              <span className="text-text-secondary font-medium">{post.author}</span>
            </>
          )}
        </div>

        <h3 className="text-base font-semibold text-text-heading leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>

        {post.summary && (
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 [text-wrap:pretty]">
            {post.summary}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-[11px] px-2.5 py-0.5 bg-accent-light text-primary border-0 rounded-lg hover:bg-accent-light transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Button variant="outline" size="sm" asChild className="w-full border-navy text-primary hover:bg-primary hover:text-white rounded-xl group/btn">
          <Link href={`/blog/${post.slug}`} className="flex items-center gap-2" aria-label={`ادامه مطلب: ${post.title}`}>
            ادامه مطلب
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
