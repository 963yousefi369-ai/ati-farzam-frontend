import Image from "next/image";
import { Building2 } from "lucide-react";
import { landingData } from "@/data/landing";
import { djangoImageUrl } from "@/lib/api/django";

interface ApiPartner {
  id: number;
  name: string;
  logo?: string | null;
  website?: string;
}

interface PartnersMarqueeProps {
  apiPartners?: ApiPartner[];
}

export default function PartnersMarquee({
  apiPartners,
}: PartnersMarqueeProps = {}) {
  const partners = apiPartners?.length
    ? apiPartners.map((partner) => ({
        id: String(partner.id),
        name: partner.name,
        logo: partner.logo || null,
        website: partner.website,
      }))
    : landingData.partners.map((partner) => ({
        ...partner,
        logo: null as string | null,
        website: undefined as string | undefined,
      }));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-accent-dark">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            اعتماد سازمان‌ها
          </p>
          <h2 className="text-2xl font-bold text-dark sm:text-3xl">
            مشتریان و همکاران ما
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-text-muted">
          تجربه همکاری با مجموعه‌های فعال در حمل‌ونقل، خدمات شهری و مدیریت
          ناوگان
        </p>
      </div>

      <ul
        role="list"
        aria-label="مشتریان و همکاران آتی فرزام"
        className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-4 xl:grid-cols-7"
      >
        {partners.map((partner) => {
          const content = (
            <>
              {partner.logo ? (
                <Image
                  src={djangoImageUrl(partner.logo)}
                  alt={partner.name}
                  width={150}
                  height={52}
                  sizes="150px"
                  className="h-11 w-auto max-w-[145px] object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-center text-sm font-semibold leading-6 text-text-secondary">
                  {partner.name}
                </span>
              )}
            </>
          );

          return (
            <li
              key={partner.id}
              className="min-w-[180px] snap-start sm:min-w-0"
            >
              {partner.website ? (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${partner.name}، بازشدن در پنجره جدید`}
                  className="flex min-h-24 items-center justify-center rounded-2xl border border-border-soft bg-white px-4 py-5 shadow-soft transition-[border-color,background-color] duration-200 hover:border-primary/20 hover:bg-bg-soft"
                >
                  {content}
                </a>
              ) : (
                <div className="flex min-h-24 items-center justify-center rounded-2xl border border-border-soft bg-white px-4 py-5 shadow-soft">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
