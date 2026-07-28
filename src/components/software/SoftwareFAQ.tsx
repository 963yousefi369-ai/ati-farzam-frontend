"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "آیا نرم‌افزار نیاز به نصب دارد؟",
    answer:
      "خیر، سامانه آتی فرزام کاملاً مبتنی بر وب است و از طریق هر مرورگری قابل دسترسی است. فقط کافیست وارد حساب کاربری خود شوید.",
  },
  {
    question: "چقدر طول می‌کشد تا سامانه فعال شود؟",
    answer:
      "فعال‌سازی سامانه کمتر از ۵ دقیقه زمان می‌برد. پس از ثبت‌نام و نصب ردیاب روی خودرو، بلافاصله می‌توانید از تمام امکانات استفاده کنید.",
  },
  {
    question: "آیا اپلیکیشن موبایل هم دارید؟",
    answer:
      "بله، اپلیکیشن موبایل آتی فرزام برای اندروید در دسترس است. با اپلیکیشن می‌توانید هشدارهای آنی دریافت کنید و ناوگان خود را از هر کجا مدیریت کنید.",
  },
  {
    question: "امنیت داده‌ها چگونه تضمین می‌شود؟",
    answer:
      "تمام داده‌ها با رمزگذاری SSL/TLS منتقل می‌شوند. سرورهای ما در دیتاسنترهای امن داخل کشور میزبانی می‌شوند و نسخه پشتیبان روزانه تهیه می‌شود.",
  },
  {
    question: "آیا امکان مدیریت چند خودرو وجود دارد؟",
    answer:
      "بله، با یک حساب کاربری می‌توانید تعداد نامحدودی خودرو را مدیریت کنید. داشبورد سامانه به شما امکان مشاهده همه خودروها در یک نگاه را می‌دهد.",
  },
  {
    question: "هزینه استفاده از سامانه چقدر است؟",
    answer:
      "ما ۱۴ روز استفاده رایگان ارائه می‌دهیم تا قبل از خرید، تمام امکانات را تست کنید. برای اطلاع از تعرفه‌ها با تیم فروش ما تماس بگیرید.",
  },
];

export default function SoftwareFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-2.5">
      {FAQ_DATA.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `software-faq-panel-${i}`;
        const buttonId = `software-faq-button-${i}`;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-colors duration-200",
              isOpen
                ? "border-accent/30 shadow-card"
                : "border-border-soft hover:border-border-base",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-right outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:px-5"
              >
                <span
                  className={cn(
                    "text-sm font-semibold leading-6 transition-colors duration-150 sm:text-base",
                    isOpen ? "text-accent" : "text-text-heading",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                    isOpen
                      ? "rotate-180 bg-accent/10 text-accent"
                      : "bg-bg-muted text-text-muted",
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p className="border-t border-border-soft/70 px-4 py-4 text-sm leading-7 text-text-body sm:px-5">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
