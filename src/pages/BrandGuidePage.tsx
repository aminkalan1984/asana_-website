import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { COMPANY_INFO } from '../data/mockData';
import { Palette, Type, Shield, Sparkles, Check, X, ArrowLeft } from 'lucide-react';

interface BrandGuidePageProps {
  onNavigate: (path: string) => void;
}

export const BrandGuidePage: React.FC<BrandGuidePageProps> = ({ onNavigate }) => {
  const colors = [
    { name: 'Primary Navy', hex: '#0A2540', role: 'اعتماد، پایداری، هدر، تیترهای اصلی (۶۰٪ استراکچر)' },
    { name: 'Primary Orange', hex: '#FF6B35', role: 'انرژی، حرکت، دکمه‌های اقدام (۱۰٪ CTA)' },
    { name: 'Background Subtle', hex: '#F9FAFB', role: 'پس‌زمینه سکشن‌های متناوب و کارت‌ها (۳۰٪ سطوح)' },
    { name: 'Text Primary', hex: '#1A1A1A', role: 'متن‌های اصلی و عناوین فرعی' },
    { name: 'Text Secondary', hex: '#6B7280', role: 'پاراگراف‌ها و توضیحات تکمیلی' },
    { name: 'Border Light', hex: '#E5E7EB', role: 'جداکننده‌ها و حاشیه‌های خط مویی' },
    { name: 'Success Green', hex: '#10B981', role: 'نشانگر تحویل موفق و وضعیت مثبت' },
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'راهنمای هویت برند' }]} onNavigate={onNavigate} />

        <div className="my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            سند رسمی هویت بصری و کلامی
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">
            راهنمای برند آسانا لجستیک (Brand Manual)
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            اصول استاندارد هویت بصری، پالت رنگ، تایپوگرافی، قواعد لوگو و لحن کلام برند «آسانا لجستیک» و «Asana Log».
          </p>
        </div>

        {/* 1. Core Brand Identity */}
        <section className="mt-12 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6">
          <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FF6B35]" />
            <span>۱. ارکان هویت برند</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block mb-1">نام رسمی شرکت:</span>
              <span className="font-bold text-sm text-[#0A2540]">{COMPANY_INFO.legalName}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block mb-1">نام تجاری فارسی:</span>
              <span className="font-bold text-sm text-[#0A2540]">{COMPANY_INFO.brandNameFa}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block mb-1">نام تجاری انگلیسی:</span>
              <span className="font-bold text-sm font-latin text-[#0A2540]">{COMPANY_INFO.brandNameEn}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
              <span className="text-neutral-400 block mb-1">دامنه اینترنتی:</span>
              <span className="font-bold text-sm font-latin text-[#FF6B35]">{COMPANY_INFO.domain}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-2">
            <div>
              <span className="font-bold text-[#0A2540]">شعار برند فارسی: </span>
              <span className="text-neutral-700">«{COMPANY_INFO.taglineFa}»</span>
            </div>
            <div>
              <span className="font-bold text-[#0A2540]">شعار برند انگلیسی: </span>
              <span className="font-latin text-neutral-700">"{COMPANY_INFO.taglineEn}"</span>
            </div>
          </div>
        </section>

        {/* 2. Color Palette */}
        <section className="mt-12 p-8 rounded-3xl bg-white border border-neutral-200 space-y-6">
          <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#FF6B35]" />
            <span>۲. پالت رنگی سازمانی (Corporate Palette)</span>
          </h2>
          <p className="text-xs text-neutral-600">
            قانون ۶۰-۳۰-۱۰: ۶۰٪ پس‌زمینه سفید و خاکستری بسیار ملایم، ۳۰٪ ساختارهای نیوی و خاکستری تیره، ۱۰٪ نارنجی برای نقاط کلیدی اقدام (CTA).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((c, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 overflow-hidden bg-neutral-50 p-4 space-y-2">
                <div
                  className="h-16 rounded-xl shadow-inner border border-black/5"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex items-center justify-between font-bold text-xs text-[#0A2540]">
                  <span>{c.name}</span>
                  <span className="font-latin font-mono text-[11px]">{c.hex}</span>
                </div>
                <div className="text-[11px] text-neutral-500 leading-tight">
                  {c.role}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Typography */}
        <section className="mt-12 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6">
          <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
            <Type className="w-5 h-5 text-[#FF6B35]" />
            <span>۳. تایپوگرافی رسمی (Vazirmatn + Inter)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-neutral-200 space-y-3">
              <span className="text-xs font-semibold text-[#FF6B35]">فونت فارسی رسمی</span>
              <h3 className="text-2xl font-bold text-[#0A2540]">فونت وزیرمتن (Vazirmatn)</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                قلم هندسی مدرن با خوانایی عالی برای متون سازمانی، هدلاین‌های درشت و فرم‌های وب. وزن‌های مجاز: Regular (۴۰۰) و Bold (۷۰۰).
              </p>
              <div className="text-xl font-bold text-neutral-800 pt-2 border-t border-neutral-100">
                آسانا لجستیک؛ لجستیک آسان‌تر از همیشه
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200 space-y-3">
              <span className="text-xs font-semibold text-[#FF6B35]">فونت انگلیسی و ارقام</span>
              <h3 className="text-2xl font-bold text-[#0A2540] font-latin">Inter Variable</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                برای کدهای پیگیری، اعداد و ارقام بارنامه، متون انگلیسی و داشبوردها با خاصیت Tabular Figures.
              </p>
              <div className="text-xl font-bold text-neutral-800 pt-2 border-t border-neutral-100 font-latin">
                Asana Log · Tracking: ASN-98241
              </div>
            </div>
          </div>
        </section>

        {/* 4. Do's and Don'ts */}
        <section className="mt-12 p-8 rounded-3xl bg-white border border-neutral-200 space-y-6">
          <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF6B35]" />
            <span>۴. قواعد کاربرد لوگو و لحن کلام</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
              <div className="font-bold text-emerald-800 flex items-center gap-1.5 text-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>الزامات (Do)</span>
              </div>
              <ul className="space-y-1.5 text-neutral-700">
                <li>✓ درج نام کامل «آسانا لجستیک» در تمامی متون و مکاتبات رسمی.</li>
                <li>✓ استفاده از نقطه نارنجی اختصاصی در کنار نشان نوشتاری.</li>
                <li>✓ لحن مقتدر، حرفه‌ای، بدون حاشیه‌پردازی و مبتنی بر اعداد دقیق.</li>
                <li>✓ رعایت فضای خالی و حریم امن دور لوگو معادل ارتفاع حرف «آ».</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-2.5">
              <div className="font-bold text-red-800 flex items-center gap-1.5 text-sm">
                <X className="w-4 h-4 text-red-600" />
                <span>ممنوعیت‌ها (Don't)</span>
              </div>
              <ul className="space-y-1.5 text-neutral-700">
                <li>✕ تغییر در تناسب رنگی یا کج کردن نشان لوگو.</li>
                <li>✕ استفاده از کلمات کلیشه‌ای توخالی یا اغراق‌آمیز بدون ارائه آمار.</li>
                <li>✕ قرار دادن لوگو بر روی تصاویر شلوغ بدون لایه تیره یا پس‌زمینه شفاف.</li>
                <li>✕ حذف کلمه «لجستیک» از نام برند فارسی.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="px-6 py-3 bg-[#0A2540] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            بازگشت به صفحه اصلی آسانا لجستیک
          </button>
        </div>
      </div>
    </div>
  );
};
