import React from 'react';
import { ArrowLeft, Search, Shield, Zap, Clock } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-neutral-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Clean unboxed kicker metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0A2540] tracking-wide">
              <span className="text-[#FF6B35]">●</span>
              <span>نسل خلاق آسانا</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>شبکه یکپارچه ترانزیت، انبارداری و توزیع</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-[#0A2540] leading-[1.2] tracking-tight">
              لجستیک، آسان‌تر از همیشه{' '}
              <span className="text-[#FF6B35] inline-block">با آسانا لجستیک</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              شریک لجستیکی کسب‌وکار شما از مبدأ تا مقصد نهایی — با شفافیت کامل، رهگیری لحظه‌ای
              و پشتیبانی ۲۴/۷. اتصال بی‌وقفه حمل‌ونقل جاده‌ای، دریایی، هوایی و انبارداری هوشمند.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onNavigate('/request-quote')}
                className="px-6 py-3.5 bg-[#FF6B35] hover:bg-[#e85a26] active:scale-[0.98] text-white font-semibold text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>استعلام قیمت سریع</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/cinematic')}
                className="px-6 py-3.5 bg-[#0A2540] hover:bg-[#13385e] active:scale-[0.98] text-white font-semibold text-base rounded-xl border border-[#FF6B35]/40 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
                <span>کریدور تعاملی (2.5D)</span>
              </button>

              <button
                onClick={() => onNavigate('/track')}
                className="px-5 py-3.5 bg-white hover:bg-neutral-50 active:scale-[0.98] text-[#0A2540] font-semibold text-base rounded-xl border border-neutral-300 hover:border-[#0A2540] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#FF6B35]" />
                <span>رهگیری بار</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-neutral-200/80 max-w-lg text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>۱۰۰٪ پوشش بیمه بار</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <span>پاسخگویی زیر ۲ ساعت</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>رهگیری زنده ماهواره‌ای</span>
              </div>
            </div>
          </div>

          {/* Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-[#0A2540]">
              <img
                src="/src/assets/images/hero_logistics_hub_1790687056911.jpg"
                alt="پایانه چندوجهی و کانتینری آسانا لجستیک"
                className="w-full aspect-[4/3] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-transparent to-black/20" />

              {/* Inset Badge */}
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/20 shadow-md">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0A2540] block text-sm">هاب یکپارچه آسانا لجستیک</span>
                    <span className="text-neutral-500 font-latin">Tehran Intermodal Gateway</span>
                  </div>
                  <div className="text-left font-latin tabular-nums font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    24/7 Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
