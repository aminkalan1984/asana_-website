import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Zap, Radio, Truck } from 'lucide-react';
import { TIMELINE_CONFIG } from './manifest';

interface NarrativeOverlayProps {
  progress: number;
  reducedMotion: boolean;
  onExploreCatalog: () => void;
  onRequestQuote: () => void;
}

export const NarrativeOverlay: React.FC<NarrativeOverlayProps> = ({
  progress,
  reducedMotion,
  onExploreCatalog,
  onRequestQuote,
}) => {
  const p = progress;

  // ---------------------------------------------------------------------------
  // BEAT 0: ESTABLISHING HERO (0.00 to 0.18)
  // ---------------------------------------------------------------------------
  let beat0Opacity = 1;
  let beat0TranslateY = 0;
  if (p > TIMELINE_CONFIG.introExit.start) {
    const t = Math.min((p - TIMELINE_CONFIG.introExit.start) / (TIMELINE_CONFIG.introExit.end - TIMELINE_CONFIG.introExit.start), 1);
    beat0Opacity = 1 - t;
    beat0TranslateY = -t * 40;
  }

  // ---------------------------------------------------------------------------
  // BEAT 1: NARRATIVE A (0.22 to 0.44)
  // ---------------------------------------------------------------------------
  let beat1Opacity = 0;
  let beat1TranslateY = 30;
  if (p >= 0.20 && p <= 0.46) {
    if (p < TIMELINE_CONFIG.narrativeAHold.start) {
      // Enter
      const t = (p - 0.20) / (TIMELINE_CONFIG.narrativeAHold.start - 0.20);
      beat1Opacity = t;
      beat1TranslateY = 30 * (1 - t);
    } else if (p <= TIMELINE_CONFIG.narrativeAHold.end) {
      // Hold
      beat1Opacity = 1;
      beat1TranslateY = 0;
    } else {
      // Exit
      const t = (p - TIMELINE_CONFIG.narrativeAHold.end) / (0.46 - TIMELINE_CONFIG.narrativeAHold.end);
      beat1Opacity = 1 - t;
      beat1TranslateY = -30 * t;
    }
  }

  // ---------------------------------------------------------------------------
  // BEAT 2: NARRATIVE B (0.48 to 0.74)
  // ---------------------------------------------------------------------------
  let beat2Opacity = 0;
  let beat2TranslateY = 30;
  if (p >= TIMELINE_CONFIG.narrativeBEnter.start && p <= TIMELINE_CONFIG.narrativeBExit.end) {
    if (p < TIMELINE_CONFIG.narrativeBHold.start) {
      // Enter
      const t = (p - TIMELINE_CONFIG.narrativeBEnter.start) / (TIMELINE_CONFIG.narrativeBHold.start - TIMELINE_CONFIG.narrativeBEnter.start);
      beat2Opacity = t;
      beat2TranslateY = 30 * (1 - t);
    } else if (p <= TIMELINE_CONFIG.narrativeBHold.end) {
      // Hold
      beat2Opacity = 1;
      beat2TranslateY = 0;
    } else {
      // Exit
      const t = (p - TIMELINE_CONFIG.narrativeBHold.end) / (TIMELINE_CONFIG.narrativeBExit.end - TIMELINE_CONFIG.narrativeBHold.end);
      beat2Opacity = 1 - t;
      beat2TranslateY = -30 * t;
    }
  }

  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* =======================================================================
          BEAT 0: ESTABLISHING HERO HEADLINE & SCROLL PROMPT
          ======================================================================= */}
      {beat0Opacity > 0.01 && (
        <section
          aria-label="آسانا لجستیک - معرفی کریدور ترانزیت"
          className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20 pointer-events-none"
          style={{
            opacity: beat0Opacity,
            transform: reducedMotion ? 'none' : `translate3d(0px, ${beat0TranslateY}px, 0px)`,
            transition: reducedMotion ? 'none' : 'opacity 0.2s linear',
          }}
        >
          {/* Top Brand Pill & Subtitle */}
          <div className="pt-16 md:pt-20 max-w-3xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF6B35] font-semibold text-xs tracking-wider mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
              <span>پایانه چندوجهی هوشمند • نسل خلاق آسانا</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              کریدور پیوسته ترانزیت <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-200">
                آسانا لجستیک
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              اتصال اسکله‌های آب‌های عمیق خلیج فارس به شاهراه‌های اقتصادی اوراسیا.
              <span className="block mt-1 font-medium text-[#FF8A50]">
                لجستیک، آسان‌تر از همیشه • Asana Log
              </span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRequestQuote}
                className="px-6 py-3 bg-[#FF6B35] hover:bg-[#e05622] text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer"
              >
                استعلام قیمت و مشاوره حمل
              </button>
              <button
                type="button"
                onClick={onExploreCatalog}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm rounded-lg transition-all cursor-pointer"
              >
                کاتالوگ راهکارها
              </button>
            </div>
          </div>

          {/* Bottom Scroll Cue */}
          <div className="pb-8 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-300 bg-[#0A2540]/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-lg">
              <span>برای ورود به کریدور اسکرول کنید</span>
              <ArrowDown className="w-4 h-4 text-[#FF6B35] animate-bounce" />
            </div>
          </div>
        </section>
      )}

      {/* =======================================================================
          BEAT 1: NARRATIVE A (INTERMODAL CONVERGENCE INSIDE PORTAL)
          ======================================================================= */}
      {beat1Opacity > 0.01 && (
        <section
          aria-label="ترانزیت چندوجهی آسانا لجستیک"
          className="absolute inset-0 flex items-center justify-start p-6 md:p-16 z-20 pointer-events-none"
          style={{
            opacity: beat1Opacity,
            transform: reducedMotion ? 'none' : `translate3d(0px, ${beat1TranslateY}px, 0px)`,
          }}
        >
          <div className="w-full max-w-xl bg-[#0A2540]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-auto">
            <div className="flex items-center gap-2 text-[#FF6B35] text-xs font-bold tracking-wider mb-3">
              <Zap className="w-4 h-4" />
              <span>مرحله ۰۱ • ترانزیت بدون اصطکاک</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
              سرعت بدون اصطکاک در باراندازها
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-6">
              ترخیص یکسره مستقیم از کشتی به ناوگان جاده‌ای آسانا لجستیک در بنادر شهید رجایی، امام خمینی و چابهار. بدون انبارداری تحمیلی و کاهش اتلاف زمان زنجیره تأمین.
            </p>

            {/* Bulleted feature checks */}
            <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>۲۱ روز معافیت دموراژ کانتینری (Free Time) در مبادی و بنادر تجاری</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>پلمپ الکترونیک هوشمند و نظارت یکپارچه گمرکی سبز</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>بیمه مسئولیت بین‌المللی CMR تا سقف ارزش اظهاری صاحب کالا</span>
              </div>
            </div>

            {/* Key KPI Stats */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/15 text-center">
              <div className="bg-white/5 rounded-lg p-2.5">
                <div className="text-lg sm:text-xl font-bold text-[#FF8A50]">۲۱ روز</div>
                <div className="text-[11px] text-slate-300">معافیت دموراژ</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2.5">
                <div className="text-lg sm:text-xl font-bold text-emerald-400">۹۸.۴٪</div>
                <div className="text-[11px] text-slate-300">دقت زمان تحویل</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2.5">
                <div className="text-lg sm:text-xl font-bold text-sky-400">۲۴/۷</div>
                <div className="text-[11px] text-slate-300">دیسپچ آنلاین</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =======================================================================
          BEAT 2: NARRATIVE B (TELEMATICS & COLD CHAIN OVER FOCUS WORLD)
          ======================================================================= */}
      {beat2Opacity > 0.01 && (
        <section
          aria-label="پایش هوشمند مسیر و ناوگان هوشمند آسانا"
          className="absolute inset-0 flex items-center justify-end p-6 md:p-16 z-20 pointer-events-none"
          style={{
            opacity: beat2Opacity,
            transform: reducedMotion ? 'none' : `translate3d(0px, ${beat2TranslateY}px, 0px)`,
          }}
        >
          <div className="w-full max-w-xl bg-[#071728]/95 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-6 sm:p-8 text-white shadow-[0_25px_60px_rgba(0,0,0,0.9)] pointer-events-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold tracking-wider">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>مرحله ۰۲ • تله‌ماتیک و هوشمندی ناوگان</span>
              </div>
              <span className="text-[11px] bg-sky-500/10 border border-sky-500/30 text-sky-300 px-2.5 py-0.5 rounded-full font-mono">
                LIVE TELEMETRY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
              نظارت بلادرنگ و تله‌ماتیک ماهواره‌ای
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-6">
              هر دستگاه در شبکه آسانا لجستیک مجهز به حسگرهای بی‌سیم دما، شتاب‌سنج سه‌محوره، پایش باد تایر و سیستم هشدار انحراف از مسیر است. بارنامه تمام دیجیتال با استعلام برخط گمرک و راهداری.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">زنجیره سرد ۲ تا ۸ درجه</div>
                  <div className="text-[11px] text-slate-300">گواهی کالیبراسیون GDP</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">پایش GPS هر ۱۵ ثانیه</div>
                  <div className="text-[11px] text-slate-300">هشدار توقف غیرمجاز</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-4 border-t border-white/10">
              <span>بارنامه رسمی دولتی آنلاین</span>
              <span className="text-[#FF8A50] font-medium">پایش مستمر در پنل مشتریان آسانا</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
