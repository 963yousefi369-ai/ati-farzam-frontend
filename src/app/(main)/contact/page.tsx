'use client'

import ContactForm from '@/components/contact/ContactForm'
import BreadcrumbTrail from '@/components/trail/BreadcrumbTrail'
import { Phone, Mail, MapPin } from 'lucide-react'

const contactCards = [
  { icon: Phone, title: 'تلفن پشتیبانی', value: '۰۲۱-۱۲۳۴۵۶۷۸', href: 'tel:02112345678' },
  { icon: Mail, title: 'ایمیل', value: 'info@atifarzam.ir', href: 'mailto:info@atifarzam.ir' },
  { icon: MapPin, title: 'آدرس دفتر', value: 'تهران، ایران', href: null },
]

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'آتی فرزام ایرانیان',
            description: 'فروش و نصب ردیاب GPS خودرو و ناوگان',
            url: 'https://farzamgps.ir',
            telephone: '+98-21-12345678',
            email: 'info@atifarzam.ir',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'تهران',
              addressCountry: 'IR',
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
              opens: '09:00',
              closes: '18:00',
            },
          }),
        }}
      />
      <section
        className="py-section-mobile md:py-section-desktop relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom left, #0a1019, #0f172a, #1e3a5f)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center relative z-10">
          <BreadcrumbTrail />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 mb-3 leading-[1.15]" style={{ color: 'white' }}>تماس با ما</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            سوال، پیشنهاد یا نیاز به پشتیبانی دارید؟ ما اینجاییم.
          </p>
        </div>
      </section>

      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {contactCards.map(({ icon: Icon, title, value, href }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-5 border border-border-soft flex items-start gap-3 hover-lift hover-glow"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-text-heading text-sm mb-0.5">{title}</h3>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline break-all font-medium"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-[#6B7280]">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-heading mb-4">ارسال پیام</h2>
              <div className="h-[3px] w-16 rounded-full mb-4 bg-gradient-to-l from-accent via-primary/40 to-transparent" />
              <div className="rounded-2xl bg-white p-5 border border-border-soft">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-heading mb-4">موقعیت ما</h2>
              <div className="h-[3px] w-16 rounded-full mb-4 bg-gradient-to-l from-accent via-primary/40 to-transparent" />
              <div className="rounded-2xl overflow-hidden border border-border-soft bg-bg-muted aspect-[16/9] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">تهران، ایران</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <a
                  href="https://maps.google.com/?q=Tehran,Iran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  مشاهده در گوگل مپ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
