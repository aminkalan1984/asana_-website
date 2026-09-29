import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { COMPANY_INFO } from '../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Building2,
  Headphones,
  Briefcase,
  AlertCircle,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'sales',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'تماس با ما' }]} onNavigate={onNavigate} />

        {/* Header */}
        <div className="max-w-3xl my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            ارتباط مستقیم با کارشناسان شرکت نسل خلاق آسانا
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">
            تماس با آسانا لجستیک
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            جهت استعلام نرخ، مشاوره بازرگانی خارجی، پیگیری محموله‌ها یا هماهنگی جلسات کاری با ما در ارتباط باشید.
          </p>
        </div>

        {/* Two-Column Grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#F9FAFB] rounded-3xl p-8 sm:p-10 border border-neutral-200">
              <h2 className="text-xl font-bold text-[#0A2540] mb-2">
                ارسال پیام یا درخواست مشاوره
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm mb-6">
                پیام شما مستقیماً به دپارتمان مربوطه ارجاع داده شده و کارشناسان در کمتر از ۲ ساعت پاسخ خواهند داد.
              </p>

              {submitted ? (
                <div className="p-8 bg-white rounded-2xl border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A2540]">
                    پیام شما با موفقیت ثبت شد
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mx-auto">
                    همکاران ما در واحد انتخابی آسانا لجستیک پیام شما را بررسی کرده و از طریق ایمیل یا شماره تماس اعلامی پاسخ خواهند داد.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        department: 'sales',
                        message: '',
                      });
                    }}
                    className="px-5 py-2 text-xs font-semibold text-[#0A2540] bg-neutral-100 hover:bg-neutral-200 rounded-lg cursor-pointer"
                  >
                    ارسال پیام دیگر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        نام و نام خانوادگی *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="نام شما"
                        className="w-full p-3 bg-white rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        شماره تماس *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="۰۹۱۲XXXXXXX"
                        className="w-full p-3 bg-white rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        آدرس ایمیل *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@domain.com"
                        className="w-full p-3 bg-white rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        بخش مربوطه *
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({ ...formData, department: e.target.value })
                        }
                        className="w-full p-3 bg-white rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35]"
                      >
                        <option value="sales">واحد فروش و استعلام تعرفه (Sales)</option>
                        <option value="support">پشتیبانی و پیگیری بارنامه (Support)</option>
                        <option value="operations">عملیات ترخیص و امور گمرکی</option>
                        <option value="careers">جذب و استخدام (HR)</option>
                        <option value="press">روابط عمومی و امور رسانه (Press)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      متن پیام *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="پیام، شرح محموله یا پیشنهاد همکاری خود را به تفصیل بنویسید..."
                      className="w-full p-3 bg-white rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FF6B35] hover:bg-[#e85a26] text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>ارسال پیام به آسانا لجستیک</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="p-7 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0A2540]">
                    دفتر مرکزی آسانا لجستیک
                  </h3>
                  <div className="text-xs text-neutral-400">شرکت نسل خلاق آسانا</div>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-neutral-600 space-y-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{COMPANY_INFO.headquarters}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FF6B35] shrink-0" />
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="hover:text-[#0A2540] tabular-nums font-latin font-semibold text-neutral-800"
                    dir="ltr"
                  >
                    {COMPANY_INFO.phone} (خط ویژه ۳۰ کاناله)
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF6B35] shrink-0" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </div>

              {/* Department Direct Emails */}
              <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs">
                <div className="font-bold text-neutral-800 mb-2">ایمیل‌های رسمی دپارتمان‌ها:</div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">عمومی و دبیرخانه:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.emails.general}`}
                    className="font-latin text-[#0A2540] font-medium hover:underline"
                  >
                    {COMPANY_INFO.emails.general}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">فروش و قراردادها:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.emails.sales}`}
                    className="font-latin text-[#FF6B35] font-semibold hover:underline"
                  >
                    {COMPANY_INFO.emails.sales}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">پشتیبانی ۲۴ ساعته:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.emails.support}`}
                    className="font-latin text-[#0A2540] font-medium hover:underline"
                  >
                    {COMPANY_INFO.emails.support}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">استخدام و کارآموزی:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.emails.careers}`}
                    className="font-latin text-[#0A2540] font-medium hover:underline"
                  >
                    {COMPANY_INFO.emails.careers}
                  </a>
                </div>
              </div>
            </div>

            {/* Map Preview Placeholder */}
            <div className="rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100 p-6 relative">
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#0A2540] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                  <span>موقعیت مکانی ساختمان مرکزی آسانا (تهران، خیابان سرافراز)</span>
                </div>
                <div className="text-xs text-neutral-500">
                  دسترسی آسان از طریق ایستگاه متروی شهید بهشتی و خطوط اتوبوسرانی ولیعصر.
                </div>
              </div>

              {/* Styled clean map graphic placeholder */}
              <div className="mt-4 h-44 rounded-2xl bg-neutral-200 relative overflow-hidden flex items-center justify-center border border-neutral-300">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300" />
                <div className="relative z-10 text-center space-y-1">
                  <div className="w-9 h-9 rounded-full bg-[#FF6B35] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#0A2540]">ساختمان آسانا لجستیک</div>
                  <div className="text-[10px] text-neutral-600 font-latin">35.7314° N, 51.4239° E</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
