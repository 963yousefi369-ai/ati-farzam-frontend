'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import { landingData } from '@/data/landing'
import { PaperPlaneIllustration, IconMail } from '@/components/svg'
import { trackFormSubmit } from '@/lib/tracking'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Newsletter() {
  const { newsletter } = landingData
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const prefersReducedMotion = useReducedMotion()

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
    <div
      className="relative rounded-3xl overflow-hidden border border-accent/10 hover-glow"
      style={{
        boxShadow: '0 4px 14px rgba(59,90,128,0.06), 0 8px 24px rgba(59,90,128,0.03)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-tint via-white to-accent/[0.03]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,90,128,0.12) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Animated accent glows */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute top-1/2 right-1/4 w-[300px] h-[300px] -translate-y-1/2 rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[250px] h-[250px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </div>
      )}

      <div className="relative p-8 lg:p-12">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Illustration */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="shrink-0 hidden md:block"
          >
            <PaperPlaneIllustration className="w-44 h-44 lg:w-52 lg:h-52" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="flex-1 text-center md:text-right"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-accent-dark">خبرنامه</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-semibold text-text-heading mb-3 leading-tight">
              {newsletter.heading}
            </h2>
            <p className="text-[#6B7280] text-sm lg:text-base mb-8 leading-[1.8] max-w-lg md:mr-0 mx-auto">
              {newsletter.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg md:mr-0 mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">ایمیل</label>
              <div className="relative flex-1 group">
                <IconMail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors duration-200" />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletter.placeholder}
                  className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-border-soft bg-white text-sm text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200 cursor-text"
                  dir="ltr"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-300 disabled:opacity-60 min-h-[44px] active:scale-[0.98] cursor-pointer"
                style={{ boxShadow: '0 4px 14px rgba(59,90,128,0.2)' }}
              >
                {submitting ? 'در حال ارسال...' : newsletter.button}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
