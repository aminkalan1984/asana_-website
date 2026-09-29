import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SAMPLE_SHIPMENTS, COMPANY_INFO } from '../data/mockData';
import { ShipmentData } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Calendar,
  AlertCircle,
  Phone,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface TrackPageProps {
  initialCode?: string;
  onNavigate: (path: string) => void;
}

export const TrackPage: React.FC<TrackPageProps> = ({ initialCode = '', onNavigate }) => {
  const [query, setQuery] = useState(initialCode || 'ASN-98241');
  const [activeCode, setActiveCode] = useState(initialCode || 'ASN-98241');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [searched, setSearched] = useState(true);

  useEffect(() => {
    if (initialCode) {
      setQuery(initialCode);
      setActiveCode(initialCode);
    }
  }, [initialCode]);

  useEffect(() => {
    const clean = activeCode.trim().toUpperCase();
    if (SAMPLE_SHIPMENTS[clean]) {
      setShipment(SAMPLE_SHIPMENTS[clean]);
    } else if (clean) {
      // Generate a realistic dynamic fallback shipment for any custom code entered
      setShipment({
        trackingCode: clean,
        currentStatus: 'in_transit',
        currentStatusText: 'در حال ترانزیت جاده‌ای به هاب میانی آسانا لجستیک',
        origin: 'تهران - پایانه بار غرب',
        destination: 'اصفهان - مرکز توزیع استان',
        sender: 'شرکت تجارت الکترونیک نوین',
        receiver: 'تأمین کالا خلیج فارس',
        packageType: 'بسته تجاری استاندارد دایکاتی',
        weightKg: 125,
        serviceTier: 'اکسپرس ۲۴ ساعته',
        carrierVehicle: 'کامیونت ایسوزو مسقف (پلاک ۵۵ - ایران ۸۸)',
        dispatchDate: 'امروز - ساعت ۰۸:۳۰',
        estimatedDelivery: 'فردا - ساعت ۱۲:۰۰',
        events: [
          {
            status: 'order_registered',
            title: 'ثبت بارنامه و الصاق شناسه RFID',
            description: 'محموله در پایانه مبدأ تحویل کارشناسان آسانا لجستیک گردید.',
            location: 'تهران، پایانه مرکزی',
            timestamp: 'امروز - ساعت ۰۸:۳۰',
            completed: true,
            current: false,
          },
          {
            status: 'processing',
            title: 'سورتینگ مکانیزه و بارگیری در خودروی خط',
            description: 'کنترل سلامت فیزیکی کارتن‌ها و پلمپ امنیتی انجام شد.',
            location: 'تهران، مرکز پردازش مکانیزه',
            timestamp: 'امروز - ساعت ۱۰:۴۵',
            completed: true,
            current: false,
          },
          {
            status: 'in_transit',
            title: 'خروج از پایانه مبدأ و سیر در محور مواصلاتی',
            description: 'ناوگان در حرکت با سرعت مطمئنه و پایش ماهواره‌ای است.',
            location: 'محور اتوبان قم - کاشان',
            timestamp: 'امروز - ساعت ۱۳:۱۵',
            completed: true,
            current: true,
          },
          {
            status: 'delivered',
            title: 'تحویل به گیرنده نهایی با امضای دیجیتال',
            description: 'در انتظار رسیدن به مقصد و تخلیه بار.',
            location: 'اصفهان، انبار تحویل‌گیرنده',
            timestamp: 'تخمین: فردا ساعت ۱۲:۰۰',
            completed: false,
            current: false,
          },
        ],
      });
    } else {
      setShipment(null);
    }
  }, [activeCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveCode(query.trim().toUpperCase());
      setSearched(true);
    }
  };

  const steps = [
    { key: 'order_registered', label: 'ثبت بارنامه' },
    { key: 'processing', label: 'آماده‌سازی و بارگیری' },
    { key: 'in_transit', label: 'در مسیر انتقال' },
    { key: 'delivered', label: 'تحویل شده' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const order = ['order_registered', 'processing', 'in_transit', 'delivered'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="pt-24 pb-20 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'رهگیری محموله' }]} onNavigate={onNavigate} />

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            پایش لحظه‌ای موقعیت بارنامه
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            رهگیری محموله آسانا لجستیک
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">
            شماره بارنامه یا شناسه پیگیری خود را وارد کنید تا آخرین وضعیت مکانی، زمان‌بندی و گزارشات ترانزیت را دریافت کنید.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="شماره پیگیری (مانند: ASN-98241)..."
                className="w-full pr-12 pl-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 text-sm font-medium focus:outline-none focus:border-[#FF6B35] font-latin"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#FF6B35] hover:bg-[#e85a26] text-white rounded-xl text-sm font-semibold transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              استعلام وضعیت
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span>کدهای نمونه آزمایشی:</span>
            <button
              onClick={() => {
                setQuery('ASN-98241');
                setActiveCode('ASN-98241');
              }}
              className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 font-latin text-neutral-800 cursor-pointer"
            >
              ASN-98241 (سیر جاده‌ای)
            </button>
            <button
              onClick={() => {
                setQuery('ASN-45120');
                setActiveCode('ASN-45120');
              }}
              className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 font-latin text-neutral-800 cursor-pointer"
            >
              ASN-45120 (تحویل کانتینر)
            </button>
            <button
              onClick={() => {
                setQuery('ASN-77319');
                setActiveCode('ASN-77319');
              }}
              className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 font-latin text-neutral-800 cursor-pointer"
            >
              ASN-77319 (هوایی بین‌المللی)
            </button>
          </div>
        </div>

        {/* Results Card */}
        {searched && shipment && (
          <div className="mt-8 space-y-6 animate-in fade-in duration-300">
            {/* Top Status Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
                <div>
                  <div className="text-xs text-neutral-500 mb-1">شماره پیگیری رسمی آسانا لجستیک:</div>
                  <div className="text-xl sm:text-2xl font-bold font-latin text-[#0A2540] flex items-center gap-2">
                    <span>{shipment.trackingCode}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      معتبر و فعال
                    </span>
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-xs text-neutral-500 mb-1">وضعیت کنونی:</div>
                  <div className="text-sm sm:text-base font-bold text-[#FF6B35]">
                    {shipment.currentStatusText}
                  </div>
                </div>
              </div>

              {/* 4-Step Visual Progress Timeline */}
              <div className="py-8 border-b border-neutral-100">
                <div className="grid grid-cols-4 gap-2 relative">
                  {steps.map((st, i) => {
                    const status = getStepStatus(st.key, shipment.currentStatus);
                    return (
                      <div key={st.key} className="flex flex-col items-center text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors mb-2 ${
                            status === 'completed'
                              ? 'bg-emerald-600 text-white'
                              : status === 'current'
                              ? 'bg-[#FF6B35] text-white ring-4 ring-orange-100'
                              : 'bg-neutral-100 text-neutral-400'
                          }`}
                        >
                          {status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span className="font-latin text-xs">0{i + 1}</span>
                          )}
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            status === 'completed' || status === 'current'
                              ? 'text-[#0A2540] font-bold'
                              : 'text-neutral-400'
                          }`}
                        >
                          {st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Waybill Details Grid */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-500 mb-1">مبدأ حرکت:</div>
                  <div className="font-bold text-[#0A2540]">{shipment.origin}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-500 mb-1">مقصد نهایی:</div>
                  <div className="font-bold text-[#0A2540]">{shipment.destination}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-500 mb-1">وزن محموله:</div>
                  <div className="font-bold text-[#0A2540] tabular-nums font-latin">
                    {shipment.weightKg} کیلوگرم
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="text-neutral-500 mb-1">تحویل تخمینی:</div>
                  <div className="font-bold text-[#0A2540]">{shipment.estimatedDelivery}</div>
                </div>
              </div>

              {/* Additional shipment info */}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-2">
                <div>
                  <span className="text-neutral-400">وسیله نقلیه حامل: </span>
                  <span className="font-medium text-neutral-800">{shipment.carrierVehicle}</span>
                </div>
                <div>
                  <span className="text-neutral-400">سرویس: </span>
                  <span className="font-medium text-[#FF6B35]">{shipment.serviceTier}</span>
                </div>
              </div>
            </div>

            {/* Checkpoint Logs (Timeline) */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF6B35]" />
                <span>گزارش زمانی ایستگاه‌های بازرسی و وقایع</span>
              </h2>

              <div className="space-y-6 relative before:absolute before:right-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {shipment.events.map((event, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pr-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        event.current
                          ? 'bg-[#FF6B35] text-white ring-4 ring-orange-100'
                          : event.completed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>

                    <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-sm text-[#0A2540]">
                          {event.title}
                        </span>
                        <span className="text-xs text-neutral-400 tabular-nums">
                          {event.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                        <span>موقعیت ثبت رویداد: {event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Support Hotline Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B35]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#0A2540]">
                کد رهگیری خود را در اختیار ندارید؟
              </div>
              <div className="text-xs text-neutral-500">
                با کارشناسان پشتیبانی ۲۴ ساعته آسانا لجستیک تماس بگیرید تا با نام فرستنده یا شماره بارنامه شما را راهنمایی کنند.
              </div>
            </div>
          </div>

          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="px-5 py-2.5 bg-[#0A2540] hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors tabular-nums"
            dir="ltr"
          >
            {COMPANY_INFO.phone}
          </a>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#FF6B35]" />
            <span>سوالات متداول رهگیری بار</span>
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs">
              <div className="font-bold text-neutral-800 mb-1">
                اطلاعات موقعیت مکانی بار هر چند وقت یک‌بار به‌روزرسانی می‌شود؟
              </div>
              <div className="text-neutral-600 leading-relaxed">
                سامانه رهگیری آسانا لجستیک از طریق GPS ناوگان هر ۱۵ دقیقه یک‌بار موقعیت جغرافیایی و در ایستگاه‌های بازرسی و باراندازها وضعیت عملیاتی را لحظه‌ای به‌روزرسانی می‌کند.
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs">
              <div className="font-bold text-neutral-800 mb-1">
                چگونه می‌توانم پیامک تحویل کالا را دریافت کنم؟
              </div>
              <div className="text-neutral-600 leading-relaxed">
                به‌محض تحویل بار به گیرنده نهایی و ثبت امضای دیجیتال رسید تحویل (POD)، پیامک تأییدیه همراه با نام تحویل‌گیرنده برای فرستنده ارسال می‌گردد.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
