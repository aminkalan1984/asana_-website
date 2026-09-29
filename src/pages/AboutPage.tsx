import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { COMPANY_INFO, TEAM_MEMBERS, CERTIFICATES } from '../data/mockData';
import {
  ShieldCheck,
  Award,
  Users,
  Building,
  Target,
  Compass,
  ArrowLeft,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface AboutPageProps {
  subTab?: 'story' | 'team' | 'certificates';
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ subTab = 'story', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'team' | 'certificates'>(subTab);

  useEffect(() => {
    if (subTab) {
      setActiveTab(subTab);
    }
  }, [subTab]);

  const handleTabChange = (tab: 'story' | 'team' | 'certificates') => {
    setActiveTab(tab);
    onNavigate(tab === 'story' ? '/about' : `/about/${tab}`);
  };

  const coreValues = [
    {
      num: '۰۱',
      title: 'شفافیت رادیکال',
      desc: 'مشتری در هر لحظه باید بداند کالایش کجاست، با چه سرعتی در حرکت است و چه زمانی تحویل می‌شود.',
    },
    {
      num: '۰۲',
      title: 'تعهد تزلزل‌ناپذیر به زمان',
      desc: 'وعده ما، قرارداد ماست. زمان‌بندی اعلام‌شده برای تحویل کالا خط قرمز تمامی تیم‌های عملیاتی است.',
    },
    {
      num: '۰۳',
      title: 'فناوری‌محوری در فرایندها',
      desc: 'حذف کامل کاغذبازی سنتی، بارنامه‌های تمام الکترونیک و ارتباط بی‌واسطه API با سامانه‌های مشتریان.',
    },
    {
      num: '۰۴',
      title: 'مسئولیت‌پذیری جامع',
      desc: 'پاسخگویی بی‌قیدوشرط در قبال هر محموله، پایش مداوم سلامت فیزیکی و جبران آنی در شرایط اضطراری.',
    },
    {
      num: '۰۵',
      title: 'رشد پایدار و اخلاق حرفه‌ای',
      desc: 'توسعه متوازن شبکه بدون قربانی کردن کیفیت خدمات و ایجاد شراکت‌های برد-برد بلندمدت.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'درباره ما', path: '/about' },
            ...(activeTab !== 'story'
              ? [
                  {
                    label:
                      activeTab === 'team'
                        ? 'تیم مدیریت'
                        : 'مجوزها و گواهینامه‌ها',
                  },
                ]
              : []),
          ]}
          onNavigate={onNavigate}
        />

        {/* Page Header */}
        <div className="max-w-3xl my-8 space-y-4">
          <div className="text-xs font-semibold text-[#FF6B35]">
            هویت و رسالت شرکت نسل خلاق آسانا
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">
            درباره آسانا لجستیک
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            آسانا لجستیک (شرکت نسل خلاق آسانا، شماره ثبت ۴۹۸۲۱۰) از سال ۱۳۹۴ با هدف دگرگونی در ارائه خدمات لجستیک، حمل چندوجهی و انبارداری هوشمند در ایران و منطقه آغاز به کار کرده است.
          </p>
        </div>

        {/* Interactive Filter Tabs (allowed buttons with functional click handler) */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-100 rounded-xl max-w-md my-8">
          <button
            onClick={() => handleTabChange('story')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'story'
                ? 'bg-white text-[#0A2540] shadow-sm'
                : 'text-neutral-600 hover:text-[#0A2540]'
            }`}
          >
            داستان و مأموریت ما
          </button>

          <button
            onClick={() => handleTabChange('team')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'team'
                ? 'bg-white text-[#0A2540] shadow-sm'
                : 'text-neutral-600 hover:text-[#0A2540]'
            }`}
          >
            تیم مدیریت
          </button>

          <button
            onClick={() => handleTabChange('certificates')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-white text-[#0A2540] shadow-sm'
                : 'text-neutral-600 hover:text-[#0A2540]'
            }`}
          >
            مجوزها و استانداردها
          </button>
        </div>

        {/* TAB 1: STORY & VALUES */}
        {activeTab === 'story' && (
          <div className="space-y-16 animate-in fade-in duration-200">
            {/* Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5 text-neutral-700 leading-relaxed text-sm sm:text-base">
                <h2 className="text-2xl font-bold text-[#0A2540]">
                  داستان شکل‌گیری و فلسفه آسانا لجستیک
                </h2>
                <p>
                  صنعت حمل‌ونقل و لجستیک در کشور سال‌ها با چالش‌هایی نظیر عدم شفافیت در قیمت‌گذاری، فقدان ردیابی مکانی دقیق، اتلاف وقت در باراندازها و بوروکراسی سنگین کاغذی مواجه بوده است. بنیان‌گذاران شرکت <strong>نسل خلاق آسانا</strong> در سال ۱۳۹۴ بر آن شدند تا با تلفیق دانش مهندسی صنایع، زیرساخت فیزیکی ناوگان و فناوری‌های نرم‌افزاری نوین، مفهومی نو از «لجستیک آسان» را خلق نمایند.
                </p>
                <p>
                  امروز پس از یک دهه تلاش پیوسته، آسانا لجستیک به یکی از معتبرترین اپراتورهای یکپارچه زنجیره تأمین تبدیل شده که بیش از ۵۰۰ دستگاه ناوگان جاده‌ای، ۱۵ هاب انبارداری مکانیزه و دفاتر نمایندگی فعال در تمامی بنادر و فرودگاه‌های اصلی کشور را مدیریت می‌کند.
                </p>

                {/* Registration Callout */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1">
                  <div><strong>نام رسمی ثبتی:</strong> {COMPANY_INFO.legalName}</div>
                  <div><strong>شناسه ملی:</strong> {COMPANY_INFO.nationalId} · <strong>شماره ثبت:</strong> {COMPANY_INFO.registrationNumber}</div>
                  <div><strong>دفتر مرکزی:</strong> {COMPANY_INFO.headquarters}</div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
                  <img
                    src="/src/assets/images/hero_logistics_hub_1790687056911.jpg"
                    alt="تاریخچه و توسعه آسانا لجستیک"
                    className="w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-[#0A2540] text-white space-y-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#FF6B35]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">مأموریت ما (Mission)</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  فراهم‌سازی بستری مطمئن، سریع و فناورانه برای انتقال کالا و اطلاعات در سراسر زنجیره ارزش، تا تولیدکنندگان و بازرگانان ایرانی بدون دغدغه عملیاتی بر رشد کسب‌وکار خود تمرکز کنند.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B35]">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2540]">چشم‌انداز ما (Vision)</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  تبدیل شدن به کارآمدترین و نوآورانه‌ترین پلتفرم چندوجهی لجستیک در منطقه غرب آسیا با دستیابی به شفافیت صددرصدی دیجیتال تا افق ۱۴۰۸.
                </p>
              </div>
            </div>

            {/* 5 Core Values */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">
                  ارزش‌های کلیدی برند آسانا لجستیک
                </h2>
                <p className="text-neutral-600 text-sm">
                  اصول راهنمای تصمیم‌گیری در تمام سطوح سازمانی ما
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {coreValues.map((val) => (
                  <div
                    key={val.num}
                    className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-start"
                  >
                    <div className="text-2xl font-bold text-[#FF6B35] font-latin mb-2">
                      {val.num}
                    </div>
                    <h3 className="font-bold text-[#0A2540] text-base mb-2">
                      {val.title}
                    </h3>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TEAM */}
        {activeTab === 'team' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-bold text-[#0A2540]">
                تیم راهبری و مدیران ارشد آسانا لجستیک
              </h2>
              <p className="text-neutral-600 text-sm">
                متخصصان باتجربه صنعت لجستیک، هوانوردی، کشتیرانی و فناوری اطلاعات که ستون فقرات توسعه آسانا لجستیک را تشکیل می‌دهند.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="bg-neutral-50 rounded-2xl p-7 border border-neutral-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold text-lg">
                        {member.name.slice(0, 2)}
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {member.experience}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#0A2540]">{member.name}</h3>
                      <div className="text-xs font-semibold text-[#FF6B35] mt-0.5">
                        {member.role}
                      </div>
                    </div>

                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-bold text-[#0A2540]">
                مجوزهای قانونی و گواهینامه‌های بین‌المللی
              </h2>
              <p className="text-neutral-600 text-sm">
                فعالیت کاملاً شفاف و دارای پروانه‌های رسمی از وزارت راه و شهرسازی، گمرک جمهوری اسلامی ایران و فدراسیون فیاتا (ژنو).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl p-7 border border-neutral-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B35]">
                      <Award className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-bold text-[#0A2540]">{cert.title}</h3>

                    <div className="text-xs text-neutral-500 space-y-1">
                      <div>
                        مرجع صادرکننده: <span className="font-semibold text-neutral-700">{cert.issuer}</span>
                      </div>
                      <div>
                        شماره ثبت مجوز: <span className="font-mono text-neutral-800 font-latin">{cert.regNumber}</span>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-xs leading-relaxed pt-2">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>دارای اعتبار رسمی و تمدیدشده</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#0A2540] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <h3 className="text-2xl font-bold">می‌خواهید با آسانا لجستیک همکاری کنید؟</h3>
            <p className="text-neutral-300 text-sm">
              همکاران بازرگانی ما آماده مذاکره و برگزاری جلسه حضوری در دفتر مرکزی هستند.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 bg-[#FF6B35] hover:bg-[#e85a26] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
            >
              هماهنگی جلسه با ما
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
