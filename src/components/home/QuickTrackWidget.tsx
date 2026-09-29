import React, { useState } from 'react';
import { Search, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

interface QuickTrackWidgetProps {
  onNavigate: (path: string) => void;
}

export const QuickTrackWidget: React.FC<QuickTrackWidgetProps> = ({ onNavigate }) => {
  const [trackingCode, setTrackingCode] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const code = trackingCode.trim() || 'ASN-98241';
    onNavigate(`/track?code=${encodeURIComponent(code)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSelect = (code: string) => {
    setTrackingCode(code);
    onNavigate(`/track?code=${encodeURIComponent(code)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-20 bg-[#0A2540] text-white relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6B35] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
          <span>سامانه رصد برخط بارنامه آسانا لجستیک</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
          محموله خود را رهگیری کنید
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
          شماره بارنامه، شناسه پیگیری مرسوله یا کد کانتینر خود را وارد کنید تا موقعیت لحظه‌ای و زمان تخمینی تحویل را مشاهده کنید.
        </p>

        {/* Large Input Field (640px max width) */}
        <form onSubmit={handleTrack} className="max-w-[640px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
            <div className="relative w-full flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="مثال: ASN-98241 یا شماره بارنامه..."
                className="w-full bg-white text-neutral-900 pr-12 pl-4 py-3.5 rounded-xl text-sm sm:text-base font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-latin"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#FF6B35] hover:bg-[#e85a26] text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <span>رهگیری</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Sample Codes for Testing */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
          <span>کدهای نمونه جهت بررسی زنده:</span>
          <button
            onClick={() => handleQuickSelect('ASN-98241')}
            className="text-neutral-200 hover:text-[#FF6B35] underline font-latin cursor-pointer"
          >
            ASN-98241 (زمینی)
          </button>
          <span className="text-neutral-600">·</span>
          <button
            onClick={() => handleQuickSelect('ASN-45120')}
            className="text-neutral-200 hover:text-[#FF6B35] underline font-latin cursor-pointer"
          >
            ASN-45120 (کانتینر)
          </button>
          <span className="text-neutral-600">·</span>
          <button
            onClick={() => handleQuickSelect('ASN-77319')}
            className="text-neutral-200 hover:text-[#FF6B35] underline font-latin cursor-pointer"
          >
            ASN-77319 (هوایی)
          </button>
        </div>

        {/* Under-field support hotline */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>کد رهگیری را ندارید؟</span>
          </div>
          <div className="flex items-center gap-1.5 font-latin tabular-nums" dir="ltr">
            <Phone className="w-4 h-4 text-[#FF6B35]" />
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="hover:text-white font-semibold text-neutral-200"
            >
              با پشتیبانی تماس بگیرید: {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
