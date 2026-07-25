'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { landingData } from '@/data/landing'
import { PaperPlaneIllustration, IconMail } from '@/components/svg'
import { trackFormSubmit } from '@/lib/tracking'

export default function Newsletter() {
  const { newsletter } = landingData
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    trackFormSubmit('newsletter', { email })
    // TODO: Wire to backend newsletter API
    await new Promise((r) => setTimeout(r, 800))
    toast.success('عضویت شما با موفقیت ثبت شد')
    setEmail('')
    setSubmitting(false)
  }

  return (
    <div className="bg-light-tint rounded-2xl border border-hairline p-8 lg:p-12 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Illustration */}
        <div className="shrink-0 hidden md:block">
          <PaperPlaneIllustration className="w-44 h-44 lg:w-52 lg:h-52" />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-right">
          <h2 className="text-2xl lg:text-3xl font-bold text-dark mb-3">
            {newsletter.heading}
          </h2>
          <p className="text-text-secondary text-sm lg:text-base mb-6">
            {newsletter.subtitle}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg md:mr-0 mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">ایمیل</label>
            <div className="relative flex-1">
              <IconMail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletter.placeholder}
                className="w-full pr-10 pl-4 py-3 rounded-full border border-soft bg-white text-sm text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-dark text-white text-sm font-semibold hover:bg-dark-deeper transition-colors disabled:opacity-60 min-h-[44px]"
            >
              {submitting ? 'در حال ارسال...' : newsletter.button}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
