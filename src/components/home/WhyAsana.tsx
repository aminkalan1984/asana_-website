import React from 'react';
import { Eye, Clock, Cpu, Headphones } from 'lucide-react';

export const WhyAsana: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'شفافیت رادیکال',
      desc: 'مشتری در هر لحظه دقیقاً می‌داند کالایش کجاست. دسترسی آنلاین به موقعیت GPS، شرایط دمایی و اسناد گمرکی بدون نیاز به پیگیری تلفنی.',
    },
    {
      icon: Clock,
      title: 'تعهد به زمان',
      desc: 'وعده ما، قرارداد ماست. با برنامه‌ریزی دقیق مسیر، ناوگان جایگزین آماده و قراردادهای SLA شفاف، ریسک تأخیر به حداقل مطلق می‌رسد.',
    },
    {
      icon: Cpu,
      title: 'فناوری محور',
      desc: 'سامانه یکپارچه ابری، بارنامه الکترونیک، وب‌هوک اتصال به فروشگاه‌های آنلاین و الگوریتم‌های هوشمند توزیع شهری جهت بهینه‌سازی مسیر.',
    },
    {
      icon: Headphones,
      title: 'پشتیبانی ۲۴/۷',
      desc: 'پاسخگویی شبانه‌روزی کارشناسان لجستیک و مدیر اختصاصی حساب برای مشتریان سازمانی، حتی در روزهای تعطیل رسمی و ساعات غیراداری.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35] tracking-wide">
            ارزش‌های بنیادین
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            چرا کسب‌وکارها آسانا لجستیک را انتخاب می‌کنند؟
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            ما فقط بار جابه‌جا نمی‌کنیم؛ ما زنجیره تأمین شما را به یک مزیت رقابتی پایدار تبدیل می‌کنیم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-white hover:border-[#FF6B35]/50 transition-all duration-200 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#FF6B35] mb-5 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
