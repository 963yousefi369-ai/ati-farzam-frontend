'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { Send, Sparkles } from 'lucide-react'
import { trackFormSubmit } from '@/lib/tracking'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('لطفاً یک ایمیل معتبر وارد کنید')
      return
    }
    setLoading(true)
    trackFormSubmit('newsletter', { email })
    await new Promise((r) => setTimeout(r, 800))
    toast.success('عضویت شما با موفقیت ثبت شد!')
    setSubmitted(true)
    setEmail('')
    setLoading(false)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section
      className="py-section-mobile md:py-section-desktop"
      style={{
        background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(16,185,129,0.12) 0%, transparent 65%), #1e3a5f',
      }}
    >
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-white font-semibold text-3xl md:text-4xl" style={{ textWrap: 'balance' }}>
          عضویت در خبرنامه
        </h2>
        <p className="text-white/80 text-base md:text-lg mt-3 mb-6">
          آخرین اخبار محصولات و تخفیف‌های ویژه GPS را دریافت کنید
        </p>

        <div className="flex gap-2.5 flex-col sm:flex-row max-w-md mx-auto">
          <div className="relative flex-1">
            <label htmlFor="newsletter-email" className="sr-only">ایمیل</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              dir="ltr"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/40 focus:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary-500 hover:bg-primary-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-[transform,box-shadow,background-color,color,border-color] shadow-teal hover:shadow-lg hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-60 w-full sm:w-auto"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  در حال ثبت...
                </span>
              ) : submitted ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  ثبت شد!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  عضویت
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
