"use client";

import { useState } from "react";
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

function PartnerLogo({ logo, name }: { logo?: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!logo || failed)
    return (
      <span className="text-center text-sm font-semibold leading-6 text-text-secondary">
        {name}
      </span>
    );
  return (
    <Image
      src={djangoImageUrl(logo)}
      alt={name}
      width={150}
      height={52}
      sizes="150px"
      className="h-10 w-auto max-w-[140px] object-contain"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}

export default function PartnersMarquee({
  apiPartners,
}: PartnersMarqueeProps = {}) {
  const partners = apiPartners?.length
    ? apiPartners.map((partner) => ({
        id: String(partner.id),
        name: partner.name,
        logo: partner.logo,
        website: partner.website,
      }))
    : landingData.partners.map((partner) => ({
        ...partner,
        logo: null,
        website: undefined,
      }));
  return (
    <div>
      <div className="mb-5">
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-accent-dark">
          <Building2 className="h-4 w-4" />
          اعتماد سازمان‌ها
        </p>
        <h2 className="text-2xl font-bold text-dark sm:text-3xl">
          مشتریان و همکاران ما
        </h2>
        <p className="mt-2 text-sm leading-7 text-text-muted">
          تجربه همکاری با مجموعه‌های فعال در حمل‌ونقل و مدیریت ناوگان
        </p>
      </div>
      <ul
        role="list"
        className="scrollbar-none -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-4 xl:grid-cols-7"
      >
        {partners.map((partner) => (
          <li
            key={partner.id}
            className="w-[44vw] min-w-[150px] max-w-[190px] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none"
          >
            {partner.website ? (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-20 items-center justify-center rounded-2xl border border-border-soft bg-white p-4 shadow-soft"
              >
                <PartnerLogo logo={partner.logo} name={partner.name} />
              </a>
            ) : (
              <div className="flex min-h-20 items-center justify-center rounded-2xl border border-border-soft bg-white p-4 shadow-soft">
                <PartnerLogo logo={partner.logo} name={partner.name} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
