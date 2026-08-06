import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { CmsPageSection } from "@/lib/cms/types";
import HeroSlider from "@/components/home/HeroSlider";
import SectionTitle from "@/components/shared/SectionTitle";
import ProductCard from "@/components/product/ProductCard";
import BlogCard from "@/components/blog/BlogCard";
import CategoryCards from "@/components/home/CategoryCards";
import CredibilityBar from "@/components/home/CredibilityBar";
import AboutCompact from "@/components/home/AboutCompact";
import SoftwareCTA from "@/components/home/SoftwareCTA";
import Newsletter from "@/components/home/Newsletter";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import StatsCounter from "@/components/home/StatsCounter";

interface SectionRendererProps {
  sections: CmsPageSection[];
  fallbackData: {
    banners: any[];
    products: any[];
    imageMap: Record<string, string>;
    blogs: any[];
    settings: any;
  };
}

const SECTION_STYLES: Record<string, string> = {
  trust_strip: "bg-bg-soft py-6 sm:py-8",
  stats: "bg-white py-10 sm:py-14 lg:py-16",
  partners: "bg-bg-soft py-10 sm:py-12",
  category_cards: "bg-bg-soft py-10 sm:py-14 lg:py-16",
  product_grid: "bg-white py-10 sm:py-14 lg:py-16",
  about: "bg-white py-10 sm:py-14 lg:py-16",
  software_cta: "bg-bg-soft py-10 sm:py-14 lg:py-16",
  blog_grid: "bg-bg-soft py-10 sm:py-14 lg:py-16",
  newsletter: "bg-white py-10 sm:py-14 lg:py-16",
  custom_html: "bg-white py-10 sm:py-14 lg:py-16",
};

function SectionShell({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) {
  if (type === "hero") return <>{children}</>;
  return (
    <section
      data-section={type}
      className={`relative border-b border-border-soft ${SECTION_STYLES[type] || "bg-white py-10 sm:py-14"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

const ActionLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border-base bg-white px-5 text-sm font-semibold text-primary hover:bg-bg-soft sm:w-auto"
  >
    {children}
  </Link>
);

export default function SectionRenderer({
  sections,
  fallbackData,
}: SectionRendererProps) {
  const activeSections = sections
    .filter((section) => section.is_active !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {activeSections.map((section) => {
        const content = section.content ?? {};
        const key = `${section.section_type}-${section.order}`;

        switch (section.section_type) {
          case "hero":
            return (
              <SectionShell key={key} type="hero">
                <HeroSlider
                  banners={
                    (content as any).banners?.length
                      ? (content as any).banners
                      : fallbackData.banners
                  }
                />
              </SectionShell>
            );
          case "trust_strip":
            return (
              <SectionShell key={key} type="trust_strip">
                <CredibilityBar items={(content as any).items} />
              </SectionShell>
            );
          case "stats":
            return (
              <SectionShell key={key} type="stats">
                <StatsCounter
                  stats={(content as any).stats}
                  darkMode={(content as any).darkMode ?? false}
                />
              </SectionShell>
            );
          case "partners":
            return (
              <SectionShell key={key} type="partners">
                <PartnersMarquee apiPartners={(content as any).partners} />
              </SectionShell>
            );
          case "category_cards":
            return (
              <SectionShell key={key} type="category_cards">
                <SectionTitle
                  title={(content as any).title ?? "دسته‌بندی محصولات"}
                  subtitle={
                    (content as any).subtitle ??
                    "محصول مناسب خودتان را پیدا کنید"
                  }
                  className="mb-6"
                />
                <CategoryCards items={(content as any).items} />
              </SectionShell>
            );
          case "product_grid":
            return (
              <SectionShell key={key} type="product_grid">
                <SectionTitle
                  title={(content as any).title ?? "محصولات ویژه"}
                  subtitle={
                    (content as any).subtitle ??
                    "ردیاب‌های GPS با ضمانت اصالت و پشتیبانی تخصصی"
                  }
                  action={
                    <ActionLink href={(content as any).cta_link ?? "/products"}>
                      {(content as any).cta_text ?? "مشاهده همه"}
                    </ActionLink>
                  }
                />
                {fallbackData.products.length ? (
                  <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
                    {fallbackData.products
                      .slice(0, Number((content as any).limit ?? 8))
                      .map((product: any, index: number) => (
                        <div
                          key={product.id}
                          className="w-[84vw] max-w-[350px] shrink-0 snap-start sm:w-auto sm:max-w-none"
                        >
                          <ProductCard
                            product={product}
                            imageUrl={fallbackData.imageMap[String(product.id)]}
                            priority={index < 2}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border-soft bg-bg-soft p-8 text-center">
                    <p className="text-text-muted">محصولی یافت نشد</p>
                    <div className="mt-4">
                      <ActionLink href="/contact">تماس با ما</ActionLink>
                    </div>
                  </div>
                )}
              </SectionShell>
            );
          case "about":
            return (
              <SectionShell key={key} type="about">
                <AboutCompact
                  title={(content as any).title}
                  aboutText={
                    (content as any).text ?? fallbackData.settings?.about_us
                  }
                  aboutImage={
                    (content as any).image_url ??
                    fallbackData.settings?.about_image
                  }
                  ctaText={(content as any).cta_text}
                  ctaLink={(content as any).cta_link}
                />
              </SectionShell>
            );
          case "software_cta":
            return (
              <SectionShell key={key} type="software_cta">
                <SoftwareCTA
                  {...(content as any)}
                  softwareImage={
                    (content as any).image_url ??
                    fallbackData.settings?.software_image
                  }
                />
              </SectionShell>
            );
          case "blog_grid":
            if (!fallbackData.blogs.length) return null;
            return (
              <SectionShell key={key} type="blog_grid">
                <SectionTitle
                  title={(content as any).title ?? "آخرین مقالات"}
                  subtitle={
                    (content as any).subtitle ??
                    "اخبار و آموزش‌های دنیای ردیابی GPS"
                  }
                  action={
                    <ActionLink href={(content as any).cta_link ?? "/blog"}>
                      {(content as any).cta_text ?? "مشاهده همه"}
                    </ActionLink>
                  }
                />
                <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
                  {fallbackData.blogs
                    .slice(0, Number((content as any).limit ?? 3))
                    .map((post: any) => (
                      <div
                        key={post.id}
                        className="w-[84vw] max-w-[360px] shrink-0 snap-start sm:w-auto sm:max-w-none"
                      >
                        <BlogCard post={post} />
                      </div>
                    ))}
                </div>
              </SectionShell>
            );
          case "newsletter":
            return (
              <SectionShell key={key} type="newsletter">
                <Newsletter />
              </SectionShell>
            );
          case "custom_html":
            return (
              <SectionShell key={key} type="custom_html">
                <div
                  className="overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      String((content as any).html ?? ""),
                    ),
                  }}
                />
              </SectionShell>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
