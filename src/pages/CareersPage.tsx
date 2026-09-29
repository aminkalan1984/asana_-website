import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { JOB_POSITIONS, COMPANY_INFO } from '../data/mockData';
import { JobPosition } from '../types';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  X,
  CheckCircle,
  UploadCloud,
  Send,
} from 'lucide-react';

interface CareersPageProps {
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const perks = [
    {
      title: 'بیمه درمان تکمیلی ممتاز',
      desc: 'پوشش کامل هزینه‌های درمانی و دندان‌پزشکی برای همکاران و افراد تحت تکفل.',
    },
    {
      title: 'مسیر رشد و ارتقای شفاف',
      desc: 'ارزیابی‌های عملکرد فصلی، دوره‌های آموزشی تخصصی و پاداش‌های مبتنی بر دستاورد.',
    },
    {
      title: 'تجهیزات کاری به‌روز',
      desc: 'محیط کاری مدرن در مرکز تهران همراه با ابزارهای دیجیتال روز دنیا.',
    },
    {
      title: 'فرهنگ احترام و شفافیت',
      desc: 'فضای صمیمی، بازخورد ۳۶۰ درجه و احترام به تعادل کار و زندگی شخصی.',
    },
  ];

  const handleApplyClick = (job: JobPosition) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicantName && applicantPhone) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'فرصت‌های شغلی' }]} onNavigate={onNavigate} />

        {/* Header */}
        <div className="max-w-3xl my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            به خانواده بزرگ نسل خلاق آسانا بپیوندید
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">
            فرصت‌های شغلی در آسانا لجستیک
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            ما در آسانا لجستیک به دنبال افراد باانگیزه، مسئولیت‌پذیر و نوآور هستیم تا آینده صنعت لجستیک کشور را با هم بسازیم.
          </p>
        </div>

        {/* Culture & Perks */}
        <div className="my-16">
          <h2 className="text-2xl font-bold text-[#0A2540] mb-8 text-center">
            مزایای همکاری با آسانا لجستیک
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B35] font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-base text-[#0A2540] mb-2">{p.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div className="my-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0A2540]">
                موقعیت‌های شغلی فعال
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                برای ارسال مستقیم رزومه می‌توانید با ایمیل {COMPANY_INFO.emails.careers} نیز در ارتباط باشید.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {JOB_POSITIONS.map((job) => (
              <div
                key={job.id}
                className="p-7 rounded-2xl border border-neutral-200 bg-white hover:border-[#FF6B35] transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                    <span className="font-semibold text-[#0A2540]">{job.department}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{job.location}</span>
                    </span>
                    <span>·</span>
                    <span>{job.type}</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-semibold">{job.experience}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A2540]">
                    {job.title}
                  </h3>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {job.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-semibold text-neutral-700 mb-1">
                      شرایط احراز اصلی:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-neutral-600">
                      {job.requirements.slice(0, 2).map((r, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                          <span className="line-clamp-1">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="w-full md:w-auto px-6 py-3 bg-[#0A2540] hover:bg-[#FF6B35] text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>ارسال رزومه برای این شغل</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {applyModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setApplyModalOpen(false)}
                className="absolute top-5 left-5 p-2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="text-xs font-semibold text-[#FF6B35]">
                  ارسال درخواست همکاری
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mt-1">
                  {selectedJob.title}
                </h3>
                <div className="text-xs text-neutral-500 mt-1">
                  {selectedJob.department} · {selectedJob.location}
                </div>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0A2540]">
                    رزومه شما با موفقیت ثبت شد
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
                    تیم منابع انسانی آسانا لجستیک پس از بررسی صلاحیت‌های حرفه‌ای، جهت هماهنگی جلسه مصاحبه با شما تماس خواهد گرفت.
                  </p>
                  <button
                    onClick={() => setApplyModalOpen(false)}
                    className="px-6 py-2.5 bg-[#0A2540] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    بستن پنجره
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="مثال: سارا کریمی"
                      className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        شماره تماس همراه *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="۰۹۱۲XXXXXXX"
                        className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        ایمیل *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="sara@domain.com"
                        className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#FF6B35] font-latin"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      بارگذاری فایل رزومه (PDF یا Word)
                    </label>
                    <div
                      onClick={() => setResumeUploaded(!resumeUploaded)}
                      className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors ${
                        resumeUploaded
                          ? 'border-emerald-500 bg-emerald-50/50'
                          : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                      }`}
                    >
                      <UploadCloud className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      {resumeUploaded ? (
                        <div className="text-emerald-700 font-semibold">
                          ✓ فایل رزومه انتخاب شد (Resume.pdf)
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-neutral-700">
                            کلیک کنید تا فایل رزومه انتخاب شود
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-1">
                            حداکثر حجم مجاز: ۵ مگابایت
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FF6B35] hover:bg-[#e85a26] text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>ثبت و ارسال نهایی رزومه</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
