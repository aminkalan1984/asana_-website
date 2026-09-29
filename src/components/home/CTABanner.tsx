import React from 'react';
import { ArrowLeft, PhoneCall, ShieldAlert, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

interface CTABannerProps {
  onNavigate: (path: string) => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#0A2540] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-[#FF6B35]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6B35] bg-white/5 px-3 py-1 rounded-md border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>تضمین نرخ رقابتی و پاسخگویی زیر ۲ ساعت</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          آماده‌اید لجستیک کسب‌وکارتان را به آسانا بسپارید؟
        </h2>

        <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          همین حالا استعلام قیمت بگیرید. کارشناسان آسانا لجستیک در کمتر از ۲ ساعت کاری با شما تماس گرفته و دقیق‌ترین برآورد هزینه و زمان ترانزیت را ارائه خواهند داد.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              onNavigate('/request-quote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF6B35] hover:bg-[#e85a26] text-white font-semibold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>استعلام قیمت رایگان</span>
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              onNavigate('/contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-[#FF6B35]" />
            <span>تماس با مشاوران بازرگانی</span>
          </button>
        </div>

        <div className="pt-4 text-xs text-neutral-400">
          دفتر مرکزی: {COMPANY_INFO.phone} · ایمیل فروش: {COMPANY_INFO.emails.sales}
        </div>
      </div>
    </section>
  );
};
