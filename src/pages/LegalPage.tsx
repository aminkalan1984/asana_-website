import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'cookies';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const contentMap = {
    terms: {
      title: 'قوانین و مقررات آسانا لجستیک',
      subtitle: 'شرایط عمومی استفاده از خدمات حمل، انبارداری و توافقنامه سطح خدمات (SLA)',
      breadcrumb: 'قوانین و مقررات',
      sections: [
        {
          title: '۱. تعاریف و کلیات',
          desc: '«آسانا لجستیک» برند تجاری شرکت نسل خلاق آسانا (شماره ثبت ۴۹۸۲۱۰) می‌باشد. صاحب کالا به هر شخص حقیقی یا حقوقی اطلاق می‌شود که تقاضای حمل، ترانزیت یا انبارداری بار را در سامانه‌های شرکت ثبت نموده باشد.',
        },
        {
          title: '۲. شرایط پذیرش و اظهار محموله',
          desc: 'صاحب کالا موظف است نوع، وزن، حجم و ارزش واقعی بار را به‌طور دقیق اظهار نماید. جابه‌جایی هرگونه کالای قاچاق، ممنوعه طبق قوانین جمهوری اسلامی ایران، مواد منفجره غیرمجاز یا اقلام فاقد اسناد مثبته گمرکی در شبکه آسانا لجستیک اکیداً ممنوع بوده و مسئولیت حقوقی آن بر عهده فرستنده است.',
        },
        {
          title: '۳. تعهدات بیمه و مسئولیت مدنی',
          desc: 'کلیه محموله‌ها طبق بارنامه رسمی تمبردار دولتی و اسناد بین‌المللی تا سقف ارزش اظهاری بیمه می‌شوند. در صورت بروز هرگونه سانحه ناشی از حوادث قهری یا نقایص ترانزیت، شرکت مطابق با شرایط عمومی بیمه‌نامه کشوری و ظرف حداکثر ۷ روز کاری پرونده خسارت را تسویه می‌نماید.',
        },
        {
          title: '۴. زمان‌بندی تحویل و تعهد SLA',
          desc: 'آسانا لجستیک متعهد به رعایت زمان‌بندی اعلام‌شده در پیش‌فاکتور رسمی است. در صورت تأخیر غیرموجه ناشی از عملیات ناوگان، جریمه دیرکرد روزانه طبق مفاد قرارداد فی‌مابین محاسبه و از کرایه حمل کسر خواهد شد.',
        },
      ],
    },
    privacy: {
      title: 'سیاست حفظ حریم خصوصی',
      subtitle: 'تعهد آسانا لجستیک به حفظ محرمانگی اطلاعات تجاری، زنجیره تأمین و اسناد بازرگانی مشتریان',
      breadcrumb: 'حریم خصوصی',
      sections: [
        {
          title: '۱. امنیت اطلاعات بازرگانی و پکینگ‌لیست',
          desc: 'آسانا لجستیک اطلاعات فاکتور تجاری، نشانی فرستندگان و خریداران، حجم مبادلات و کدهای رهگیری را جزو اسرار تجاری مشتری تلقی کرده و تحت هیچ شرایطی در اختیار اشخاص ثالث یا رقبای بازار قرار نخواهد داد.',
        },
        {
          title: '۲. جمع‌آوری و پردازش داده‌ها',
          desc: 'اطلاعات دریافتی در فرم‌های استعلام قیمت صرفاً جهت صدور پیش‌فاکتور، تماس کارشناسان، صدور بارنامه رسمی و ارسال نوتیفیکیشن‌های پیامکی موقعیت بار استفاده می‌گردد.',
        },
        {
          title: '۳. پروتکل‌های امنیتی ذخیره‌سازی ابری',
          desc: 'سامانه‌های نرم‌افزاری آسانا لجستیک بر بستر سرورهای امن با پروتکل رمزنگاری SSL/TLS و دسترسی چندمرحله‌ای احراز هویت نگهداری می‌شوند تا از هرگونه نفوذ و سرقت اطلاعات محافظت گردد.',
        },
      ],
    },
    cookies: {
      title: 'سیاست استفاده از کوکی‌ها',
      subtitle: 'نحوه استفاده از کوکی‌های فنی جهت بهبود تجربه کاربری و حفظ وضعیت رهگیری بار',
      breadcrumb: 'سیاست کوکی‌ها',
      sections: [
        {
          title: '۱. کوکی‌های ضروری سامانه',
          desc: 'این کوکی‌ها برای عملکرد صحیح پورتال رهگیری آنلاین، ذخیره آخرین کدهای رهگیری واردشده و تنظیمات زبان و جهت متن ضروری هستند.',
        },
        {
          title: '۲. کوکی‌های تحلیلی و آماری',
          desc: 'ما از ابزارهای تحلیلی بدون ذخیره هویت فردی جهت سنجش سرعت بارگذاری صفحات و بهبود کارایی فرم‌های استعلام قیمت استفاده می‌کنیم.',
        },
        {
          title: '۳. مدیریت و غیرفعال‌سازی',
          desc: 'شما می‌توانید در هر زمان از طریق تنظیمات مرورگر خود ذخیره کوکی‌ها را محدود نمایید، هرچند ممکن است ذخیره خودکار کدهای پیگیری شما در مراجعات بعدی با محدودیت روبرو شود.',
        },
      ],
    },
  };

  const current = contentMap[type] || contentMap.terms;

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: current.breadcrumb }]} onNavigate={onNavigate} />

        <div className="my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            تعهدات و استانداردهای حقوقی
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            {current.title}
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {current.sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3"
            >
              <h2 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#FF6B35]" />
                <span>{sec.title}</span>
              </h2>
              <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                {sec.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-4">
          <div>تاریخ آخرین به‌روزرسانی: اسفند ۱۴۰۴</div>
          <div>شرکت نسل خلاق آسانا (آسانا لجستیک | Asana Log)</div>
        </div>
      </div>
    </div>
  );
};
