import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { COMPANY_INFO } from '../data/mockData';
import {
  Package,
  MapPin,
  User,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Phone,
  FileText,
} from 'lucide-react';

interface RequestQuotePageProps {
  onNavigate: (path: string) => void;
}

export const RequestQuotePage: React.FC<RequestQuotePageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Cargo Info
    cargoType: 'بسته تجاری',
    weightKg: '50',
    lengthCm: '60',
    widthCm: '40',
    heightCm: '40',
    packageCount: '5',
    declaredValueToman: '20000000',
    needsInsurance: 'yes',

    // Step 2: Route & Shipping
    originCity: 'تهران',
    destCity: 'مشهد',
    shippingMode: 'زمینی',
    shippingDate: '۱۴۰۵/۰۱/۱۵',
    serviceTier: 'سریع',

    // Step 3: Contact Info
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    notes: '',
    referralSource: 'گوگل',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.cargoType) newErrors.cargoType = 'انتخاب نوع محموله الزامی است';
      if (!formData.weightKg || Number(formData.weightKg) <= 0)
        newErrors.weightKg = 'وزن معتبر وارد کنید';
      if (!formData.packageCount || Number(formData.packageCount) <= 0)
        newErrors.packageCount = 'تعداد معتبر وارد کنید';
    } else if (currentStep === 2) {
      if (!formData.originCity.trim()) newErrors.originCity = 'شهر مبدأ الزامی است';
      if (!formData.destCity.trim()) newErrors.destCity = 'شهر مقصد الزامی است';
    } else if (currentStep === 3) {
      if (!formData.fullName.trim()) newErrors.fullName = 'نام و نام خانوادگی الزامی است';
      if (!formData.phone.trim() || formData.phone.length < 10)
        newErrors.phone = 'شماره تماس معتبر وارد کنید';
      if (!formData.email.trim() || !formData.email.includes('@'))
        newErrors.email = 'ایمیل معتبر وارد کنید';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => (prev + 1) as 2 | 3);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep((prev) => (prev - 1) as 1 | 2);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      const generatedId = `ASN-QUO-${Math.floor(10000 + Math.random() * 90000)}`;
      setQuoteReference(generatedId);
      setSubmitted(true);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  };

  // Estimated indicative calculation preview
  const estimatedCostMillion = Math.max(
    1.2,
    Number(formData.weightKg || 50) * 0.045 + (formData.serviceTier === 'فوری' ? 2 : 1)
  ).toFixed(1);

  return (
    <div className="pt-24 pb-20 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'استعلام قیمت' }]} onNavigate={onNavigate} />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            تضمین نرخ رقابتی و صدور پیش‌فاکتور رسمی
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            استعلام قیمت حمل با آسانا لجستیک
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">
            فرم ۳ مرحله‌ای زیر را تکمیل کنید تا کارشناسان قیمت‌گذاری آسانا لجستیک در کمتر از ۲ ساعت کاری پیش‌فاکتور دقیق را به شما ارائه دهند.
          </p>
        </div>

        {/* Success Modal / Card */}
        {submitted ? (
          <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 shadow-sm text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#0A2540]">
                درخواست استعلام قیمت شما با موفقیت ثبت شد
              </h2>
              <p className="text-neutral-600 text-sm max-w-lg mx-auto leading-relaxed">
                همکاران ما در واحد بازرگانی و قیمت‌گذاری آسانا لجستیک هم‌اکنون در حال بررسی اطلاعات بارنامه و شرایط مسیر هستند.
              </p>
            </div>

            {/* Reference Box */}
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 max-w-md mx-auto text-center space-y-3">
              <div className="text-xs text-neutral-500">کد پیگیری استعلام (Quote Reference):</div>
              <div className="text-2xl font-bold font-latin text-[#0A2540] tracking-wider">
                {quoteReference}
              </div>
              <div className="text-xs text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200">
                زمان پاسخگویی تضمینی: حداکثر ۲ ساعت کاری
              </div>
            </div>

            {/* Inquiry Summary Preview */}
            <div className="max-w-md mx-auto text-xs text-neutral-600 bg-neutral-50/50 p-4 rounded-xl border border-neutral-100 text-right space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-400">نام متقاضی:</span>
                <span className="font-semibold text-neutral-800">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">مسیر حمل:</span>
                <span className="font-semibold text-neutral-800">
                  {formData.originCity} به {formData.destCity} ({formData.shippingMode})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">نوع بار و وزن:</span>
                <span className="font-semibold text-neutral-800">
                  {formData.cargoType} · {formData.weightKg} کیلوگرم
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                ثبت استعلام جدید
              </button>
              <button
                onClick={() => onNavigate('/')}
                className="px-6 py-3 bg-[#0A2540] hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
            {/* Step Progress Bar */}
            <div className="bg-neutral-50 border-b border-neutral-200 p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm font-medium">
                <div
                  className={`flex items-center justify-center gap-2 pb-2 border-b-2 transition-colors ${
                    step >= 1
                      ? 'border-[#FF6B35] text-[#0A2540] font-bold'
                      : 'border-transparent text-neutral-400'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-latin ${
                      step >= 1 ? 'bg-[#FF6B35] text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    1
                  </span>
                  <span>اطلاعات محموله</span>
                </div>

                <div
                  className={`flex items-center justify-center gap-2 pb-2 border-b-2 transition-colors ${
                    step >= 2
                      ? 'border-[#FF6B35] text-[#0A2540] font-bold'
                      : 'border-transparent text-neutral-400'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-latin ${
                      step >= 2 ? 'bg-[#FF6B35] text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    2
                  </span>
                  <span>مسیر و نوع حمل</span>
                </div>

                <div
                  className={`flex items-center justify-center gap-2 pb-2 border-b-2 transition-colors ${
                    step === 3
                      ? 'border-[#FF6B35] text-[#0A2540] font-bold'
                      : 'border-transparent text-neutral-400'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-latin ${
                      step === 3 ? 'bg-[#FF6B35] text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    3
                  </span>
                  <span>اطلاعات تماس</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {/* STEP 1: CARGO */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-neutral-100 pb-4">
                    <h2 className="text-xl font-bold text-[#0A2540]">
                      مرحله ۱: مشخصات و نوع محموله
                    </h2>
                    <p className="text-neutral-500 text-xs mt-1">
                      اطلاعات دقیق ابعاد و وزن به محاسبه بهینه‌ترین هزینه کمک می‌کند.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Cargo Type */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        نوع محموله *
                      </label>
                      <select
                        value={formData.cargoType}
                        onChange={(e) =>
                          setFormData({ ...formData, cargoType: e.target.value })
                        }
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                      >
                        <option value="بسته تجاری">بسته تجاری / کارتن استاندارد</option>
                        <option value="پالت استاندارد">پالت چوبی یا پلاستیکی استاندارد</option>
                        <option value="کانتینر کامل (FCL)">کانتینر کامل دربست (FCL)</option>
                        <option value="خرده‌بار کانتینر (LCL)">خرده‌بار کانتینر دریایی (LCL)</option>
                        <option value="فله و کیسه‌ای">بار فله، کیسه‌ای یا صنعتی</option>
                        <option value="یخچالی و زنجیره سرد">محموله یخچالی و دارویی (زنجیره سرد)</option>
                      </select>
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        وزن تقریبی کل (کیلوگرم) *
                      </label>
                      <input
                        type="number"
                        value={formData.weightKg}
                        onChange={(e) =>
                          setFormData({ ...formData, weightKg: e.target.value })
                        }
                        placeholder="مثال: 150"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                      />
                      {errors.weightKg && (
                        <p className="text-red-500 text-xs mt-1">{errors.weightKg}</p>
                      )}
                    </div>

                    {/* Package Count */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        تعداد بسته / کارتن / پالت *
                      </label>
                      <input
                        type="number"
                        value={formData.packageCount}
                        onChange={(e) =>
                          setFormData({ ...formData, packageCount: e.target.value })
                        }
                        placeholder="مثال: 5"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                      />
                    </div>

                    {/* Declared Value */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        ارزش تقریبی کالا (تومان) — اختیاری
                      </label>
                      <input
                        type="number"
                        value={formData.declaredValueToman}
                        onChange={(e) =>
                          setFormData({ ...formData, declaredValueToman: e.target.value })
                        }
                        placeholder="جهت محاسبه دقیق پوشش بیمه باربری"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                      />
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">
                      ابعاد تخمینی هر بسته (سانتی‌متر): طول × عرض × ارتفاع
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        value={formData.lengthCm}
                        onChange={(e) =>
                          setFormData({ ...formData, lengthCm: e.target.value })
                        }
                        placeholder="طول (cm)"
                        className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-center font-latin"
                      />
                      <input
                        type="number"
                        value={formData.widthCm}
                        onChange={(e) =>
                          setFormData({ ...formData, widthCm: e.target.value })
                        }
                        placeholder="عرض (cm)"
                        className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-center font-latin"
                      />
                      <input
                        type="number"
                        value={formData.heightCm}
                        onChange={(e) =>
                          setFormData({ ...formData, heightCm: e.target.value })
                        }
                        placeholder="ارتفاع (cm)"
                        className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-center font-latin"
                      />
                    </div>
                  </div>

                  {/* Insurance Radio */}
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-neutral-800">
                        درخواست پوشش کامل بیمه باربری آسانا لجستیک
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        پوشش ۱۰۰٪ ارزش اظهاری کالا در برابر حوادث و مفقودی
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="insurance"
                          value="yes"
                          checked={formData.needsInsurance === 'yes'}
                          onChange={() => setFormData({ ...formData, needsInsurance: 'yes' })}
                        />
                        <span>بله، بیمه شود</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="insurance"
                          value="no"
                          checked={formData.needsInsurance === 'no'}
                          onChange={() => setFormData({ ...formData, needsInsurance: 'no' })}
                        />
                        <span>خیر</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: ROUTE */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-neutral-100 pb-4">
                    <h2 className="text-xl font-bold text-[#0A2540]">
                      مرحله ۲: مبدأ، مقصد و شیوه ترانزیت
                    </h2>
                    <p className="text-neutral-500 text-xs mt-1">
                      انتخاب مسیر دقیق و نوع سرویس زمان ترانزیت را مشخص می‌کند.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Origin */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        شهر یا پایانه مبدأ *
                      </label>
                      <input
                        type="text"
                        value={formData.originCity}
                        onChange={(e) =>
                          setFormData({ ...formData, originCity: e.target.value })
                        }
                        placeholder="مثال: تهران یا بندرعباس یا گوانگجو"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                      />
                      {errors.originCity && (
                        <p className="text-red-500 text-xs mt-1">{errors.originCity}</p>
                      )}
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        شهر یا انبار مقصد *
                      </label>
                      <input
                        type="text"
                        value={formData.destCity}
                        onChange={(e) =>
                          setFormData({ ...formData, destCity: e.target.value })
                        }
                        placeholder="مثال: مشهد یا اصفهان یا تبریز"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                      />
                      {errors.destCity && (
                        <p className="text-red-500 text-xs mt-1">{errors.destCity}</p>
                      )}
                    </div>

                    {/* Shipping Mode */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        نوع ترانزیت درخواستی *
                      </label>
                      <select
                        value={formData.shippingMode}
                        onChange={(e) =>
                          setFormData({ ...formData, shippingMode: e.target.value })
                        }
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                      >
                        <option value="زمینی">حمل زمینی جاده‌ای (ناوگان اختصاصی)</option>
                        <option value="هوایی">حمل هوایی بار (فرودگاهی / کارگو)</option>
                        <option value="دریایی">حمل دریایی کانتینر (FCL / LCL)</option>
                        <option value="ترکیبی">حمل چندوجهی ترکیبی (دریایی + زمینی)</option>
                      </select>
                    </div>

                    {/* Shipping Date */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        تاریخ تقریبی آماده بودن بار (شمسی)
                      </label>
                      <input
                        type="text"
                        value={formData.shippingDate}
                        onChange={(e) =>
                          setFormData({ ...formData, shippingDate: e.target.value })
                        }
                        placeholder="۱۴۰۵/۰۱/۱۵ یا آماده ارسال فوری"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                  </div>

                  {/* Service Tier Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-3">
                      سطح سرعت و اولویت سرویس (Service Tier)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div
                        onClick={() => setFormData({ ...formData, serviceTier: 'عادی' })}
                        className={`p-4 rounded-xl border text-right cursor-pointer transition-all ${
                          formData.serviceTier === 'عادی'
                            ? 'border-[#0A2540] bg-[#0A2540]/5'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#0A2540]">سرویس استاندارد</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          اقتصادی‌ترین تعرفه برای محموله‌های تجاری
                        </div>
                      </div>

                      <div
                        onClick={() => setFormData({ ...formData, serviceTier: 'سریع' })}
                        className={`p-4 rounded-xl border text-right cursor-pointer transition-all ${
                          formData.serviceTier === 'سریع'
                            ? 'border-[#FF6B35] bg-orange-50/50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#FF6B35]">سرویس سریع (پیشنهادی)</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          خط مستقیم بدون توقف در پایانه‌های میانی
                        </div>
                      </div>

                      <div
                        onClick={() => setFormData({ ...formData, serviceTier: 'فوری' })}
                        className={`p-4 rounded-xl border text-right cursor-pointer transition-all ${
                          formData.serviceTier === 'فوری'
                            ? 'border-[#0A2540] bg-[#0A2540]/5'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#0A2540]">سرویس اکسپرس فوری</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          اختصاصی‌ترین اولویت تحویل ۲۴ ساعته
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-neutral-100 pb-4">
                    <h2 className="text-xl font-bold text-[#0A2540]">
                      مرحله ۳: اطلاعات تماس و دریافت پیش‌فاکتور
                    </h2>
                    <p className="text-neutral-500 text-xs mt-1">
                      پیش‌فاکتور رسمی به همراه مشاوره تخصصی به این اطلاعات ارسال خواهد شد.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        نام و نام خانوادگی *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="مثال: مهندس علی محمدی"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        نام شرکت یا سازمان — اختیاری
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="مثال: صنایع پتروشیمی رازی"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        شماره تماس همراه یا ثابت *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="۰۹۱۲XXXXXXX یا ۰۲۱XXXXXXXX"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                        dir="ltr"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-2">
                        آدرس ایمیل کاری *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@company.com"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                        dir="ltr"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">
                      توضیحات و نیازمندی‌های تکمیلی بار (لیفتراک، زنجیره سرد، بسته‌بندی، ترخیص گمرکی)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="هرگونه نکته خاص درباره شرایط انبار، ساعت تخلیه یا اسناد بازرگانی..."
                      className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">
                      نحوه آشنایی با آسانا لجستیک
                    </label>
                    <select
                      value={formData.referralSource}
                      onChange={(e) =>
                        setFormData({ ...formData, referralSource: e.target.value })
                      }
                      className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B35]"
                    >
                      <option value="گوگل">جستجو در گوگل</option>
                      <option value="معرفی">معرفی همکاران و شرکای تجاری</option>
                      <option value="شبکه اجتماعی">شبکه‌های اجتماعی (لینکدین، اینستاگرام)</option>
                      <option value="نمایشگاه">نمایشگاه‌های حمل‌ونقل و لجستیک</option>
                      <option value="سایر">سایر موارد</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-3 rounded-xl border border-neutral-300 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>مرحله قبل</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-[#FF6B35] hover:bg-[#e85a26] text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>مرحله بعد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>تأیید نهایی و ارسال استعلام</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Commitment Badge */}
        <div className="mt-8 text-center text-xs text-neutral-500 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>حفظ کامل محرمانگی اطلاعات بازرگانی</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#FF6B35]" />
            <span>بررسی کمتر از ۲ ساعت کاری</span>
          </span>
        </div>
      </div>
    </div>
  );
};
