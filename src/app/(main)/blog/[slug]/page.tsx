import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getDjangoBlog, getDjangoBlogs, publicImageUrl } from '@/lib/api/django'
import BlogCard from '@/components/blog/BlogCard'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import { Calendar, User, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 86400

export async function generateStaticParams() {
  try {
    const posts = await getDjangoBlogs()
    return posts.map((post: any) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getDjangoBlog(slug)
    return {
      title: `${post.title} | وبلاگ آتی فرزام`,
      description: post.content?.slice(0, 155) ?? post.title,
      openGraph: {
        title: post.title,
        description: post.content?.slice(0, 155) ?? '',
        locale: 'fa_IR',
        type: 'article',
      },
    }
  } catch {
    return { title: 'مقاله | وبلاگ آتی فرزام' }
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params

  let post: any
  try {
    post = await getDjangoBlog(slug)
  } catch {
    notFound()
  }

  let relatedPosts: any[] = []
  try {
    const allPosts = await getDjangoBlogs()
    relatedPosts = allPosts.filter((p: any) => p.slug !== slug).slice(0, 3)
  } catch {}

  const coverSrc = publicImageUrl(post.featured_image) || '/placeholder-product.svg'

  return (
    <div className="bg-white min-h-screen">
      <section
        className="py-section-mobile md:py-section-desktop relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom left, #0a1019, #0f172a, #1e3a5f)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <BreadcrumbTrail />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 leading-[1.15]" style={{ color: 'white' }}>{post.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.published_at ?? post.created_at)}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <article className="lg:col-span-3">
              {coverSrc && (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 border border-border-soft">
                  <Image
                    src={coverSrc}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority
                  />
                </div>
              )}

              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
              />
            </article>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-border-soft bg-white p-4 sticky top-24 hover-glow">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold text-text-heading text-sm">مقالات اخیر</h3>
                </div>
                <div className="space-y-2">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((p: any) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        className="block p-3 rounded-xl hover:bg-bg-muted transition-colors group"
                      >
                        <h4 className="text-sm font-semibold text-text-heading line-clamp-2 group-hover:text-primary transition-colors">
                          {p.title}
                        </h4>
                        <span className="text-xs text-text-muted mt-1 block">
                          {formatDate(p.published_at ?? p.created_at)}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-text-muted">مقاله‌ای یافت نشد.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border-soft">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-2xl md:text-3xl font-bold text-text-heading">مقالات مرتبط</h2>
                <div className="section-underline !mx-0 mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((p: any) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
