import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GENERAL_FAQS, COMPANY_INFO } from '../data/mockData';
import { ChevronDown, HelpCircle, Phone, Search } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    '0-0': true,
    '2-0': true,
  });
  const [search, setSearch] = useState('');

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GENERAL_FAQS.flatMap((cat) =>
      cat.items.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: it.a,
        },
      }))
    ),
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'سوالات متداول' }]} onNavigate={onNavigate} />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            مرکز پاسخ به پرسش‌های رایج
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            سوالات متداول
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">
            پاسخ سریع به پرسش‌های پرتکرار مشتریان درباره حمل بار، انبارداری هوشمند، قوانین بیمه و شرایط رهگیری در آسانا لجستیک.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 my-8">
          {['همه', ...GENERAL_FAQS.map((c) => c.category)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0A2540] text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-8 mt-10">
          {GENERAL_FAQS.map((cat, catIdx) => {
            if (activeCategory !== 'همه' && activeCategory !== cat.category) {
              return null;
            }

            return (
              <div key={cat.category} className="space-y-4">
                <h2 className="text-lg font-bold text-[#0A2540] border-b border-neutral-100 pb-2">
                  {cat.category}
                </h2>

                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const isOpen = !!openItems[key];

                    return (
                      <div
                        key={itemIdx}
                        className="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all duration-200 shadow-xs"
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0A2540] hover:text-[#FF6B35] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-[#FF6B35]">؟</span>
                            <span>{item.q}</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 animate-in fade-in duration-150">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#F9FAFB] border border-neutral-200 text-center space-y-4">
          <h3 className="text-lg font-bold text-[#0A2540]">
            پاسخ سوال خود را پیدا نکردید؟
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto">
            تیم پشتیبانی ۲۴ ساعته آسانا لجستیک آماده راهنمایی شما در زمینه کلیه فرایندهای حمل و انبارداری است.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#e85a26] text-white rounded-xl text-xs font-semibold flex items-center gap-2"
              dir="ltr"
            >
              <span>{COMPANY_INFO.phone}</span>
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-2.5 bg-white border border-neutral-300 text-[#0A2540] rounded-xl text-xs font-semibold hover:bg-neutral-50 cursor-pointer"
            >
              ارسال پیام به پشتیبانی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
