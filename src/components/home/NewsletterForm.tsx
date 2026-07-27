"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { trackFormSubmit } from "@/lib/tracking";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError("لطفاً یک نشانی ایمیل معتبر وارد کنید.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      trackFormSubmit("newsletter", { email: normalizedEmail });
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      setEmail("");
      toast.success("عضویت شما با موفقیت ثبت شد");
    } catch {
      setError("ثبت عضویت انجام نشد. لطفاً دوباره تلاش کنید.");
      toast.error("ثبت عضویت انجام نشد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className="bg-dark py-section-mobile text-white md:py-section-desktop"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,.8fr)_minmax(420px,1.2fr)] lg:px-8">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
            <Mail className="h-4 w-4" aria-hidden="true" />
            خبرنامه آتی فرزام
          </p>
          <h2
            id="newsletter-title"
            className="text-2xl font-bold leading-tight text-white sm:text-3xl"
          >
            پیشنهادها و راهنمای خرید را از دست ندهید
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
            آخرین محصولات، آموزش‌های کاربردی GPS و تخفیف‌های ویژه را مستقیم در
            ایمیل خود دریافت کنید.
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="flex min-h-28 items-center gap-4 rounded-2xl border border-accent/25 bg-accent/10 p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-dark">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-white">عضویت شما ثبت شد</p>
              <p className="mt-1 text-sm leading-6 text-white/65">
                از این پس تازه‌ترین خبرها و پیشنهادها را دریافت می‌کنید.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <label
              htmlFor="newsletter-email"
              className="block text-sm font-medium text-white"
            >
              نشانی ایمیل
            </label>
            <p
              id="newsletter-helper"
              className="mt-1 text-xs leading-5 text-white/55"
            >
              ایمیل شما فقط برای ارسال خبرنامه استفاده می‌شود.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Mail
                    className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    dir="ltr"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                      error ? "newsletter-error" : "newsletter-helper"
                    }
                    placeholder="name@example.com"
                    className="min-h-12 w-full rounded-xl border border-white/15 bg-white py-3 pl-4 pr-10 text-left text-base text-dark placeholder:text-text-muted"
                  />
                </div>
                {error && (
                  <p
                    id="newsletter-error"
                    role="alert"
                    className="mt-2 text-sm text-error-light"
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-dark transition-colors duration-200 hover:bg-accent-light disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-dark/25 border-t-dark"
                      aria-hidden="true"
                    />
                    در حال ثبت...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    عضویت در خبرنامه
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
