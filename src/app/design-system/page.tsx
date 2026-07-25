'use client';

import { useState, type ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import ProductCard from '@/components/product/ProductCard';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import { ShopStatusProvider } from '@/lib/store/shop-status';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const mockProducts = [
  {
    id: 1,
    name: 'گوشی هوشمند مدل X',
    price: 25000000,
    compare_price: 28000000,
    in_stock: true,
    stock: 15,
    slug: 'phone-x',
    rating: 4.5,
    review_count: 128,
  },
  {
    id: 2,
    name: 'هدفون بی‌سیم Pro',
    price: 3500000,
    in_stock: true,
    stock: 8,
    slug: 'headphones-pro',
    rating: 4.8,
    review_count: 64,
  },
  {
    id: 3,
    name: 'ساعت هوشمند Watch',
    price: 12000000,
    compare_price: 14000000,
    in_stock: false,
    stock: 0,
    slug: 'smart-watch',
    rating: 4.2,
    review_count: 32,
  },
];

const mockTestimonials = [
  {
    id: '1',
    name: 'علی رضایی',
    role: 'مدیر محصول',
    text: 'کیفیت محصولات فوق‌العاده بود و تحویل به موقع انجام شد. قطعاً خرید بعدی هم از این فروشگاه خواهد بود.',
    rating: 5,
  },
  {
    id: '2',
    name: 'مریم حسینی',
    role: 'طراح گرافیک',
    text: 'تجربه خرید بسیار خوبی داشتم، پشتیبانی عالی و ارسال سریع. به همه پیشنهاد می‌کنم.',
    rating: 5,
  },
  {
    id: '3',
    name: 'حسن کریمی',
    role: 'برنامه‌نویس',
    text: 'قیمت مناسب و کیفیت بالا، حتماً دوباره خرید می‌کنم. تنوع محصولات هم خوب است.',
    rating: 4,
  },
];

const faqItems = [
  {
    q: 'نحوه ارسال سفارشات چگونه است؟',
    a: 'سفارشات شما پس از تأیید، حداکثر ظرف ۲۴ ساعت ارسال می‌شوند و معمولاً بین ۲ تا ۵ روز کاری به دست شما می‌رسند.',
  },
  {
    q: 'آیا امکان بازگشت کالا وجود دارد؟',
    a: 'بله، شما می‌توانید تا ۷ روز پس از دریافت کالا، در صورت وجود مشکل آن را بازگردانید.',
  },
  {
    q: 'روش‌های پرداخت چه هستند؟',
    a: 'پرداخت از طریق درگاه آنلاین، کارت به کارت و پرداخت در محل (برای برخی شهرها) امکان‌پذیر است.',
  },
  {
    q: 'گارانتی محصولات چگونه است؟',
    a: 'تمامی محصولات دارای گارانتی اصالت و سلامت فیزیکی بوده و مدت گارانتی بسته به نوع محصول متفاوت است.',
  },
];

const colors = [
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Navy Dark', hex: '#162d4a' },
  { name: 'Navy Deep', hex: '#0f172a' },
  { name: 'Teal', hex: '#0e7490' },
  { name: 'Teal Dark', hex: '#155e6f' },
  { name: 'Teal Light', hex: '#cffafe' },
  { name: 'Rust', hex: '#9a3412' },
  { name: 'Warning', hex: '#b45309' },
  { name: 'Error', hex: '#ef4444' },
  { name: 'Info', hex: '#3b82f6' },
];

/* ------------------------------------------------------------------ */
/*  Local FAQ Accordion                                                */
/* ------------------------------------------------------------------ */

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="border border-border-default rounded-xl overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-right hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium text-lg text-foreground">{item.q}</span>
            <motion.span
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl flex-shrink-0 text-muted-foreground"
            >
              ▾
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="border-2 border-dashed border-border-default p-6 rounded-2xl">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DesignSystemPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-24" dir="rtl">
      {/* Page Title */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-foreground">
          طراحی سیستم (Design System)
        </h1>
        <p className="text-muted-foreground mt-2">
          نمایش کامپوننت‌ها، رنگ‌ها، تایپوگرافی و الگوهای طراحی پروژه
        </p>
      </header>

      {/* 1. Typography */}
      <Section
        title="۱. تایپوگرافی"
        description="فونت Vazirmatn — نمونه‌های هدینگ و متن"
      >
        <div className="space-y-6">
          <div>
            <span className="text-xs text-muted-foreground block mb-1">H1</span>
            <h1 className="text-4xl font-bold text-foreground">
              عنوان اصلی صفحه (H1)
            </h1>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">H2</span>
            <h2 className="text-3xl font-semibold text-foreground">
              عنوان بخش (H2)
            </h2>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">H3</span>
            <h3 className="text-2xl font-medium text-foreground">
              عنوان فرعی (H3)
            </h3>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-1">Body</span>
            <p className="text-base text-foreground leading-relaxed">
              این یک نمونه متن بدنه (Body) است که برای نمایش پاراگراف‌های معمولی در
              سراسر سایت استفاده می‌شود. فونت Vazirmatn به‌خوبی از زبان فارسی
              پشتیبانی می‌کند و خوانایی بالایی دارد.
            </p>
          </div>
        </div>
      </Section>

      {/* 2. Colors */}
      <Section
        title="۲. رنگ‌ها"
        description="پالت رنگی اصلی و رنگ‌های وضعیت"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {colors.map((color) => (
            <div
              key={color.hex}
              className="rounded-xl overflow-hidden border border-border-default"
            >
              <div
                className="h-24 w-full"
                style={{ backgroundColor: color.hex }}
              />
              <div className="p-3 text-center">
                <p className="font-medium text-sm text-foreground">
                  {color.name}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {color.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Navbar */}
      <Section
        title="۳. نوار ناوبری (Navbar)"
        description="کامپوننت نوار بالای صفحه"
      >
        <Navbar />
      </Section>

      {/* 4. Buttons */}
      <Section
        title="۴. دکمه‌ها (Buttons)"
        description="تمام واریانت‌ها و سایزها"
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="default" className="hover:scale-105 shadow-float">
            پیش‌فرض
          </Button>
          <Button variant="secondary" className="hover:scale-105 shadow-float">
            ثانویه
          </Button>
          <Button variant="outline" className="hover:scale-105 shadow-float">
            طرح‌دار
          </Button>
          <Button variant="ghost" className="hover:scale-105 shadow-float">
            Ghost
          </Button>
          <Button variant="destructive" className="hover:scale-105 shadow-float">
            خطرناک
          </Button>
          <Button variant="link" className="hover:scale-105 shadow-float">
            لینک
          </Button>
          <Button variant="gradient" className="hover:scale-105 shadow-float">
            گرادیان
          </Button>
          <Button
            variant="default"
            disabled
            className="hover:scale-105 shadow-float"
          >
            غیرفعال
          </Button>
        </div>

        <div className="mt-8">
          <span className="text-xs text-muted-foreground block mb-3">سایزها</span>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="default">
              کوچک
            </Button>
            <Button size="default" variant="default">
              متوسط
            </Button>
            <Button size="lg" variant="default">
              بزرگ
            </Button>
            <Button size="xl" variant="default">
              خیلی بزرگ
            </Button>
            <Button size="icon" variant="default" aria-label="آیکون">
              <Star className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* 5. Cards */}
      <Section
        title="۵. کارت محصولات (ProductCard)"
        description="نمایش کارت محصول در حالت گرید — بدون تصویر (پلیس‌هولدر)"
      >
        <ShopStatusProvider
          shopEnabled
          supportPhone="021-1234567"
          maxOrderQuantity={20}
          contactPhone="021-12345678"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                imageUrl={undefined}
                variant="grid"
              />
            ))}
          </div>
        </ShopStatusProvider>
      </Section>

      {/* 6. Testimonials */}
      <Section
        title="۶. نظرات مشتریان (Testimonials)"
        description="اسلایدر نظرات کاربران"
      >
        <TestimonialsCarousel testimonials={mockTestimonials} />
      </Section>

      {/* 7. FAQ */}
      <Section
        title="۷. سوالات متداول (FAQ)"
        description="آکاردئون با framer-motion AnimatePresence"
      >
        <FaqAccordion />
      </Section>

      {/* 8. Form Elements */}
      <Section
        title="۸. عناصر فرم"
        description="Input، Select، Textarea و Checkbox"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <div className="space-y-2">
            <Label htmlFor="ds-name">نام و نام خانوادگی</Label>
            <Input id="ds-name" placeholder="نام خود را وارد کنید" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ds-city">شهر</Label>
            <Select>
              <SelectTrigger id="ds-city">
                <SelectValue placeholder="شهر را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tehran">تهران</SelectItem>
                <SelectItem value="isfahan">اصفهان</SelectItem>
                <SelectItem value="shiraz">شیراز</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ds-message">پیام شما</Label>
            <Textarea
              id="ds-message"
              placeholder="پیام خود را اینجا بنویسید..."
              rows={4}
            />
          </div>

          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              id="ds-agree"
              className="h-5 w-5 rounded border-border-default text-accent-500 focus:ring-teal-500 cursor-pointer"
            />
            <Label htmlFor="ds-agree" className="cursor-pointer">
              با قوانین و مقررات سایت موافقم
            </Label>
          </div>
        </div>
      </Section>

      {/* 9. Footer */}
      <Section
        title="۹. فوتر (Footer)"
        description="کامپوننت فوتر پایین صفحه"
      >
        <Footer />
      </Section>
    </div>
  );
}
