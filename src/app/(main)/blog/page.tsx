import type { Metadata } from 'next'
import { getDjangoBlogs, type DjangoBlogPost } from '@/lib/api/django'
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
import { Search, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'وبلاگ | آتی فرزام ایرانیان',
  description: 'آخرین مقالات، اخبار و راهنماهای ردیاب GPS از تیم آتی فرزام ایرانیان',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  let posts: DjangoBlogPost[] = []
  let error = false

  try {
    posts = await getDjangoBlogs()
  } catch {
    error = true
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://farzamgps.ir' },
              { '@type': 'ListItem', position: 2, name: 'وبلاگ', item: 'https://farzamgps.ir/blog' },
            ],
          }),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────
          Was using the full section-padding utilities, so a hero holding only
          a breadcrumb, one h1 and one line of copy got the same ~104px of air
          as a content section. That is why it read as an empty navy slab.
          Inline `style` for the gradient and for every text colour is also
          gone — those bypassed the design tokens entirely and could not
          respond to any state or breakpoint. */}
      <section
        className={`${HERO_Y} relative overflow-hidden bg-[linear-gradient(to_bottom_left,#0a1019,#0f172a,#1e3a5f)]`}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />
        </div>
        <div className={`relative z-10 ${SHELL} ${PAGE_X} text-center`}>
          <div className="text-right">
            <BreadcrumbTrail />
          </div>
          <h1 className="mb-3 mt-6 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            وبلاگ
          </h1>
          <p className="mx-auto max-w-xl text-base leading-8 text-white/75 sm:text-lg">
            آخرین مقالات، اخبار و راهنماهای تخصصی ردیابی خودرو
          </p>
        </div>
      </section>

      {/* ── Posts + sidebar ─────────────────────────────────────────────── */}
      <section className={`${SECTION_Y} bg-mesh`}>
        <div className={`${SHELL} ${PAGE_X}`}>
          {/* Was a hand-rolled h2 plus a `section-underline !mx-0` override.
              SectionTitle already renders that accent bar, so the whole site
              now uses one heading component instead of two lookalikes. */}
          <SectionTitle
            title="جدیدترین مطالب"
            subtitle="راهنماها و تحلیل‌های تیم فنی آتی فرزام"
            align="right"
            className={SECTION_HEAD}
          />

          {/* Main/sidebar gap was `gap-5` (20px), which reads as a layout bug
              rather than a decision. */}
          <div className={`grid grid-cols-1 ${COL_GAP} lg:grid-cols-4`}>
            <div className="lg:col-span-3">
              {error && (
                <div className="rounded-2xl border border-border-soft bg-white px-6 py-16 text-center">
                  <p className="text-base text-text-muted">
                    خطا در دریافت مقالات. لطفاً مطمئن شوید بک‌اند روشن است.
                  </p>
                </div>
              )}

              {!error && posts.length === 0 && (
                <div className="rounded-2xl border border-border-soft bg-white px-6 py-16 text-center">
                  <p className="text-base text-text-muted">
                    هنوز مقاله‌ای منتشر نشده است.
                  </p>
                </div>
              )}

              {!error && posts.length > 0 && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar is now sticky. It was a short static column next to a
                long article list, so it left a tall empty gutter on desktop. */}
            <aside className="hidden lg:block">
              <div className="sticky top-[calc(var(--navbar-height)+1.5rem)] space-y-5">
                <div className="rounded-2xl border border-border-soft bg-white p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Search className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-text-heading">جستجو</h3>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="جستجو در مقالات..."
                      className="h-11 w-full cursor-not-allowed rounded-xl border border-border-soft bg-bg-muted pl-10 pr-4 text-sm text-text-muted"
                      disabled
                      aria-disabled="true"
                    />
                    <Search
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted/50"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-xs text-text-muted">جستجو به‌زودی فعال می‌شود</p>
                </div>

                <div className="rounded-2xl border border-border-soft bg-white p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Tag className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-text-heading">دسته‌بندی‌ها</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['ردیاب GPS', 'مدیریت ناوگان', 'آموزش', 'اخبار', 'فنی'].map((cat) => (
                      <span
                        key={cat}
                        className="cursor-not-allowed rounded-lg bg-bg-muted px-3 py-1.5 text-xs text-text-muted"
                        aria-disabled="true"
                        title="فیلتر به‌زودی فعال می‌شود"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-text-muted">
                    فیلتر دسته‌بندی به‌زودی فعال می‌شود
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
