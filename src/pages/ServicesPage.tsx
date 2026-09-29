import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SERVICES } from '../data/mockData';
import {
  Truck,
  Plane,
  Ship,
  Warehouse,
  PackageCheck,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#FF6B35]" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#FF6B35]" />;
      case 'Ship':
        return <Ship className="w-6 h-6 text-[#FF6B35]" />;
      case 'Warehouse':
        return <Warehouse className="w-6 h-6 text-[#FF6B35]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-[#FF6B35]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-[#FF6B35]" />;
      default:
        return <Truck className="w-6 h-6 text-[#FF6B35]" />;
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'چگونه بهترین روش حمل را برای بار تجاری خود انتخاب کنم؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'کارشناسان آسانا لجستیک با تحلیل وزن، حجم، ارزش کالا و زمان‌بندی تحویل مورد نظر شما، بهترین ترکیب بین سرعت و هزینه (هوایی، دریایی یا زمینی) را پیشنهاد می‌دهند.',
        },
      },
      {
        '@type': 'Question',
        name: 'آیا خدمات انبارداری آسانا لجستیک شامل بسته‌بندی با برند اختصاصی می‌شود؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'بله، در تمامی مراکز فولفیلمنت آسانا لجستیک امکان بسته‌بندی سفارشی با کارتن، برچسب و کارت‌های تشکر برند شما فراهم است.',
        },
      },
    ],
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'خدمات' }]} onNavigate={onNavigate} />

        {/* Header */}
        <div className="max-w-3xl my-8 space-y-4">
          <div className="text-xs font-semibold text-[#FF6B35]">
            سبد جامع راهکارهای زنجیره تأمین
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">
            خدمات لجستیکی آسانا
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            آسانا لجستیک مجموعه کاملی از خدمات حمل‌ونقل بین‌المللی، ترانزیت جاده‌ای، انبارداری و توزیع مویرگی را برای کسب‌وکارهای ایرانی فراهم می‌کند. تمام فرایندها از ثبت سفارش تا تحویل نهایی تحت پایش ۲۴ ساعته قرار دارند.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:border-[#FF6B35] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
                  <img
                    src={service.image}
                    alt={`${service.title} - آسانا لجستیک`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                      {getIcon(service.iconName)}
                    </div>
                    <h2 className="text-xl font-bold text-[#0A2540]">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-neutral-100">
                    <div className="text-xs font-semibold text-[#0A2540]">ویژگی‌های شاخص:</div>
                    <ul className="space-y-1.5 text-xs text-neutral-600">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    onNavigate(`/services/${service.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 bg-neutral-50 hover:bg-[#0A2540] text-[#0A2540] hover:text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-neutral-200 hover:border-[#0A2540]"
                >
                  <span>مشاهده اطلاعات کامل و تعرفه</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Operational Process in 4 Steps */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#F9FAFB] border border-neutral-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">
              فرایند یکپارچه ارائه خدمات در آسانا لجستیک
            </h2>
            <p className="text-neutral-600 text-sm">
              از ثبت اولیه تا تحویل کالا، ۴ گام شفاف و تضمین‌شده
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="w-8 h-8 rounded-lg bg-[#0A2540] text-white flex items-center justify-center font-bold text-sm font-latin mb-4">
                01
              </div>
              <h3 className="font-bold text-[#0A2540] text-base mb-2">استعلام و صدور پیش‌فاکتور</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">
                بررسی پکینگ‌لیست، اعلام بهترین نرخ و اختصاص کارشناس بازرگانی ظرف کمتر از ۲ ساعت.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="w-8 h-8 rounded-lg bg-[#0A2540] text-white flex items-center justify-center font-bold text-sm font-latin mb-4">
                02
              </div>
              <h3 className="font-bold text-[#0A2540] text-base mb-2">بارگیری و صدور بارنامه</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">
                کنترل ایمنی، بسته‌بندی، پلمپ الکترونیک و صدور اسناد رسمی دولتی و بین‌المللی.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="w-8 h-8 rounded-lg bg-[#0A2540] text-white flex items-center justify-center font-bold text-sm font-latin mb-4">
                03
              </div>
              <h3 className="font-bold text-[#0A2540] text-base mb-2">ترانزیت و رهگیری زنده</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">
                رصد ماهواره‌ای سرعت، موقعیت و دما همراه با پیامک‌های خودکار در ایستگاه‌های کلیدی.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm font-latin mb-4">
                04
              </div>
              <h3 className="font-bold text-[#0A2540] text-base mb-2">تحویل و تسویه رسید دیجیتال</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">
                تخلیه ایمن در مقصد، اخذ امضای دیجیتال تحویل‌گیرنده و ارائه گزارش تحویل (POD).
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center bg-[#0A2540] text-white rounded-3xl p-8 sm:p-12 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold">
            نیاز به مشاوره برای انتخاب روش حمل دارید؟
          </h2>
          <p className="text-neutral-300 text-sm max-w-xl mx-auto">
            کارشناسان لجستیک آسانا آماده‌اند بهترین راهکار ترکیبی از نظر قیمت و زمان ترانزیت را به شما پیشنهاد دهند.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/request-quote')}
              className="px-6 py-3 bg-[#FF6B35] hover:bg-[#e85a26] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              استعلام نرخ آنلاین
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-semibold transition-colors border border-white/20"
            >
              تماس با واحد بازرگانی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
