import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Newspaper } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { publicImageUrl } from "@/lib/api/django";

interface BlogCardProps {
  post: {
    id: string | number;
    slug: string;
    title: string;
    summary?: string;
    cover?: string;
    featured_image?: string | null;
    created?: string;
    created_at?: string;
    published_at?: string | null;
    author?: string;
    tags?: string[];
  };
  className?: string;
}

export default function BlogCard({ post, className }: BlogCardProps) {
  const coverSrc = post.featured_image
    ? publicImageUrl(post.featured_image)
    : post.cover
      ? publicImageUrl(post.cover)
      : null;
  const date = post.published_at ?? post.created_at ?? post.created ?? "";
  const href = `/blog/${post.slug}`;

  return (
    <article
      className={cn(
        "group flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl border border-border-soft bg-white shadow-card transition-[border-color,box-shadow] duration-200 hover:border-primary/20 hover:shadow-card-hover",
        className,
      )}
    >
      <Link
        href={href}
        aria-label={`مطالعه ${post.title}`}
        className="relative block aspect-[16/9] overflow-hidden border-b border-border-soft bg-bg-muted"
      >
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.025]"
          />
        ) : (
          <span className="flex h-full items-center justify-center">
            <Newspaper
              className="h-10 w-10 text-primary/30"
              aria-hidden="true"
            />
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{formatDate(date)}</span>
          {post.author && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </>
          )}
        </div>
        <Link href={href} className="mt-3 rounded-md">
          <h3 className="text-base font-semibold leading-7 text-dark transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-7 text-text-secondary">
            {post.summary}
          </p>
        )}
        <Link
          href={href}
          className="mt-auto flex min-h-11 items-center justify-between border-t border-border-soft pt-4 text-sm font-semibold text-primary"
        >
          ادامه مطلب
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
