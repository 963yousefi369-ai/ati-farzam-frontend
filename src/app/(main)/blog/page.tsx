import type { Metadata } from 'next'
import { getDjangoBlogs, type DjangoBlogPost } from '@/lib/api/django'
import BlogCard from '@/components/blog/BlogCard'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
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
    <div className="bg-white min-h-screen">
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
      <section
        className="py-section-mobile md:py-section-desktop relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom left, #0a1019, #0f172a, #1e3a5f)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center relative z-10">
          <BreadcrumbTrail />
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-3" style={{ color: 'white' }}>وبلاگ</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            آخرین مقالات، اخبار و راهنماهای تخصصی ردیابی خودرو
          </p>
        </div>
      </section>

      <section className="py-section-mobile md:py-section-desktop bg-mesh">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-text-heading">جدیدترین مطالب</h2>
            <div className="section-underline !mx-0 mt-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:col-span-3">
              {error && (
                <div className="text-center py-12 text-text-muted">
                  <p className="text-lg">خطا در دریافت مقالات. لطفاً مطمئن شوید بک‌اند روشن است.</p>
                </div>
              )}

              {!error && posts.length === 0 && (
                <div className="text-center py-12 text-text-muted">
                  <p className="text-lg">هنوز مقاله‌ای منتشر نشده است.</p>
                </div>
              )}

              {!error && posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>

            <aside className="hidden lg:block space-y-4">
              <div className="rounded-xl bg-white p-4 border border-border-soft hover-glow">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-text-heading text-sm">جستجو</h3>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجو در مقالات..."
                    className="w-full h-10 pr-4 pl-10 rounded-xl border border-border-soft text-sm bg-bg-muted text-text-muted cursor-not-allowed"
                    disabled
                    aria-disabled="true"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/50" />
                </div>
                <p className="text-xs text-text-muted mt-2">جستجو به‌زودی فعال می‌شود</p>
              </div>

              <div className="rounded-xl bg-white p-4 border border-border-soft hover-glow">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold text-text-heading text-sm">دسته‌بندی‌ها</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['ردیاب GPS', 'مدیریت ناوگان', 'آموزش', 'اخبار', 'فنی'].map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1.5 text-xs rounded-lg bg-bg-muted text-text-muted cursor-not-allowed"
                      aria-disabled="true"
                      title="فیلتر به‌زودی فعال می‌شود"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-3">فیلتر دسته‌بندی به‌زودی فعال می‌شود</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
