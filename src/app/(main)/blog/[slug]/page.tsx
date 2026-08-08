import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getDjangoBlog, getDjangoBlogs, publicImageUrl } from '@/lib/api/django'
import BlogCard from '@/components/blog/BlogCard'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import SectionTitle from '@/components/shared/SectionTitle'
import {
  SECTION_Y,
  HERO_Y,
  SECTION_HEAD,
  SHELL,
  PAGE_X,
  COL_GAP,
} from '@/lib/rhythm'
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
    <div className="min-h-screen bg-white">
      {/* ── Article hero ───────────────────────────────────────────────
          The h1 was `text-4xl md:text-5xl lg:text-6xl`. At 6xl a normal-length
          Persian article title wraps to three or four lines and swamps the
          screen, so the scale now tops out at 5xl. Inline `style` colours are
          replaced with tokens. */}
      <section
        className={`${HERO_Y} relative overflow-hidden bg-[linear-gradient(to_bottom_left,#0a1019,#0f172a,#1e3a5f)]`}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className={`relative z-10 ${SHELL} ${PAGE_X}`}>
          <BreadcrumbTrail />
          <h1 className="mt-6 max-w-4xl text-2xl font-extrabold leading-[1.25] text-white sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.2]">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
              {formatDate(post.published_at ?? post.created_at)}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 shrink-0" aria-hidden="true" />
                {post.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Article body + sidebar ─────────────────────────────────────── */}
      <section className={SECTION_Y}>
        <div className={`${SHELL} ${PAGE_X}`}>
          <div className={`grid grid-cols-1 ${COL_GAP} lg:grid-cols-4`}>
            <article className="lg:col-span-3">
              {coverSrc && (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-soft">
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

              {/* Reading measure is capped. Body copy running the full width of
                  a 3/4 column on a 1440px shell is ~140 characters per line,
                  roughly double a comfortable Persian reading measure. */}
              <div
                className="blog-content max-w-[68ch]"
                dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
              />
            </article>

            <aside>
              {/* `sticky top-24` was a magic number that assumed a 96px navbar.
                  Derived from the real navbar height token instead. */}
              <div className="sticky top-[calc(var(--navbar-height)+1.5rem)] rounded-2xl border border-border-soft bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-text-heading">مقالات اخیر</h3>
                </div>
                <div className="space-y-1">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((p: any) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        className="group block rounded-xl p-3 transition-colors hover:bg-bg-muted"
                      >
                        <h4 className="line-clamp-2 text-sm font-semibold leading-6 text-text-heading transition-colors group-hover:text-primary">
                          {p.title}
                        </h4>
                        <span className="mt-1.5 block text-xs text-text-muted">
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

          {/* Related posts were separated by `mt-10 pt-6`, which is less air
              than the gap between two cards inside the grid above it — so a
              new section looked like a continuation of the article. */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-border-soft pt-12 md:mt-20 md:pt-16">
              <SectionTitle
                title="مقالات مرتبط"
                align="right"
                className={SECTION_HEAD}
              />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
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
