import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { NEWS_ITEMS } from '../data/mockData';
import { Calendar, Clock, ArrowLeft, Search } from 'lucide-react';

interface NewsPageProps {
  onNavigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'همه اخبار' },
    { id: 'توسعه زیرساخت', label: 'توسعه ناوگان و زیرساخت' },
    { id: 'نوآوری و انبارداری', label: 'نوآوری و انبارداری' },
    { id: 'بین‌الملل و کشتیرانی', label: 'حمل بین‌الملل' },
  ];

  const filteredNews = NEWS_ITEMS.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      item.title.includes(searchQuery) ||
      item.summary.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'اخبار' }]} onNavigate={onNavigate} />

        {/* Page Header */}
        <div className="max-w-3xl my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            اتاق خبر رسمی شرکت نسل خلاق آسانا
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">
            اخبار آسانا لجستیک
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            تازه‌ترین اطلاعیه‌ها، گزارش‌های توسعه زیرساخت و دستاوردهای زنجیره تأمین در آسانا لجستیک.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="my-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          {/* Category Tabs (functional filter buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#0A2540] shadow-sm'
                    : 'text-neutral-600 hover:text-[#0A2540]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در اخبار..."
              className="w-full pr-10 pl-3 py-2 bg-neutral-50 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B35]"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              onClick={() => {
                onNavigate(`/news/${news.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-[#FF6B35]/70 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-video overflow-hidden bg-neutral-100 relative">
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

                <div className="p-6 space-y-3">
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

                  <h2 className="text-lg font-bold text-[#0A2540] group-hover:text-[#FF6B35] transition-colors leading-snug line-clamp-2">
                    {news.title}
                  </h2>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#0A2540] group-hover:text-[#FF6B35]">
                  <span>ادامه مطلب و تصاویر</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="py-16 text-center text-neutral-500 text-sm">
            موردی مطابق با جستجوی شما یافت نشد.
          </div>
        )}
      </div>
    </div>
  );
};
