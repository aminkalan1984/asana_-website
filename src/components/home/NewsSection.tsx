import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { NEWS_ITEMS } from '../../data/mockData';

interface NewsSectionProps {
  onNavigate: (path: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#FF6B35] tracking-wide">
              اتاق خبر و رویدادها
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
              آخرین اخبار آسانا لجستیک
            </h2>
            <p className="text-neutral-600 text-base max-w-xl">
              از توسعه شبکه ناوگان تا افتتاح مراکز انبارداری و خطوط ترانزیت جدید در ایران و منطقه.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('/news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A2540] hover:text-[#FF6B35] transition-colors shrink-0 cursor-pointer"
          >
            <span>مشاهده همه اخبار شرکت</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 3 News Cards in 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ITEMS.slice(0, 3).map((news) => (
            <article
              key={news.id}
              onClick={() => {
                onNavigate(`/news/${news.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-[#FF6B35]/60 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* 16:9 Image */}
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src={news.image}
                    alt={`${news.title} - آسانا لجستیک`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#0A2540]/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                    {news.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{news.date}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{news.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-[#FF6B35] transition-colors line-clamp-2 leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#0A2540] group-hover:text-[#FF6B35]">
                  <span>ادامه مطلب و گزارش کامل</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <button
            onClick={() => onNavigate('/news')}
            className="w-full py-3 bg-neutral-100 text-sm font-semibold text-[#0A2540] rounded-xl"
          >
            مشاهده همه اخبار
          </button>
        </div>
      </div>
    </section>
  );
};
