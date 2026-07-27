"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { landingData } from "@/data/landing";
import { trackFormSubmit } from "@/lib/tracking";

export default function Newsletter() {
  const { newsletter } = landingData;
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("یک ایمیل معتبر وارد کنید.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      trackFormSubmit("newsletter", { email: value });
      await new Promise((resolve) => setTimeout(resolve, 800));
      setEmail("");
      setSubmitted(true);
      toast.success("عضویت شما ثبت شد");
    } catch {
      setError("ثبت عضویت انجام نشد. دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border-soft bg-white shadow-card">
      <div className="grid items-center gap-7 p-6 sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:p-10">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-accent-dark">
            <Mail className="h-4 w-4" aria-hidden="true" />
            خبرنامه
          </p>
          <h2 className="text-2xl font-bold leading-tight text-dark sm:text-3xl">
            {newsletter.heading}
          </h2>
          <p className="mt-3 text-sm leading-7 text-text-muted">
            {newsletter.subtitle}
          </p>
        </div>
        {submitted ? (
          <div
            role="status"
            className="flex min-h-24 items-center gap-3 rounded-2xl bg-success-light p-5 text-accent-dark"
          >
            <CheckCircle2 className="h-6 w-6 shrink-0" />
            <div>
              <p className="font-semibold">عضویت ثبت شد</p>
              <p className="mt-1 text-sm">
                خبرهای بعدی را در ایمیل خود دریافت می‌کنید.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl bg-bg-soft p-4"
          >
            <label
              htmlFor="home-newsletter-email"
              className="block text-sm font-medium text-dark"
            >
              نشانی ایمیل
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="home-newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                dir="ltr"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                placeholder={newsletter.placeholder}
                className="min-h-12 flex-1 rounded-xl border border-border-base bg-white px-4 text-left text-base text-dark"
              />
              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
              >
                {submitting ? (
                  "در حال ثبت..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {newsletter.button}
                  </>
                )}
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-2 text-sm text-error-text">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
