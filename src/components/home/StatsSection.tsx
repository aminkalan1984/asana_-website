import React from 'react';
import { Truck, Warehouse, Users, MapPin, CheckCircle, Headphones } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '۵۰۰+',
      label: 'ناوگان فعال',
      desc: 'انواع تریلی‌های چادری، کفی، یخچالی و کامیونت‌های مدرن',
      icon: Truck,
    },
    {
      value: '۱۵',
      label: 'انبار فعال',
      desc: 'مراکز توزیع مکانیزه و هاب‌های فولفیلمنت در استان‌های کلیدی',
      icon: Warehouse,
    },
    {
      value: '۲۵۰۰+',
      label: 'مشتری شرکتی',
      desc: 'تولیدکنندگان صنعتی، بازرگانان، برندها و فروشگاه‌های آنلاین',
      icon: Users,
    },
    {
      value: '۱۲۰+',
      label: 'شهر تحت پوشش',
      desc: 'شبکه مویرگی سراسری با نمایندگی‌های عملیاتی فعال',
      icon: MapPin,
    },
    {
      value: '۹۸٪',
      label: 'تحویل به‌موقع',
      desc: 'تعهد به زمان تحویل طبق توافقنامه سطح خدمات (SLA)',
      icon: CheckCircle,
    },
    {
      value: '۲۴/۷',
      label: 'پشتیبانی برخط',
      desc: 'مرکز کنترل عملیات و دیسپچ بدون حتی یک روز تعطیلی در سال',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F9FAFB] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35] tracking-wide">
            ظرفیت عملیاتی و دستاوردها
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            آسانا لجستیک در یک نگاه
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            زیرساخت واقعی، سرمایه‌گذاری پیوسته در ناوگان و سامانه یکپارچه نرم‌افزاری که پشتوانه اطمینان مشتریان است.
          </p>
        </div>

        {/* 6 Stats in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-neutral-200/90 shadow-xs flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-[#0A2540] shrink-0">
                  <Icon className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[#0A2540] tabular-nums font-latin tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-base font-semibold text-neutral-800">
                    {stat.label}
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
