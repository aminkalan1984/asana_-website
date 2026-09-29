import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BLOG_POSTS } from '../data/mockData';
import { Calendar, Clock, User, ArrowLeft, Search } from 'lucide-react';

interface BlogPageProps {
  initialCategory?: string;
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ initialCategory = 'all', onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'همه مقالات' },
    { id: 'international', label: 'حمل بین‌المللی' },
    { id: 'ecommerce', label: 'لجستیک ایکامرس' },
    { id: 'customs', label: 'قوانین گمرکی' },
    { id: 'warehousing', label: 'نکات انبارداری' },
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCategory =
      selectedCategory === 'all' || post.categorySlug === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      post.title.includes(searchQuery) ||
      post.summary.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'وبلاگ' }]} onNavigate={onNavigate} />

        {/* Page Header */}
        <div className="max-w-3xl my-8 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35]">
            دانشنامه لجستیک و بازرگانی
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">
            وبلاگ آسانا لجستیک
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            آموزش‌ها، تحلیل‌های تخصصی اینکوترمز، بهینه‌سازی زنجیره تأمین و ترخیص کالا به قلم کارشناسان آسانا لجستیک.
          </p>
        </div>

        {/* Category Controls and Search Bar */}
        <div className="my-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
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

          <div className="relative w-full md:w-64">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مقالات..."
              className="w-full pr-10 pl-3 py-2 bg-neutral-50 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#FF6B35]"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => {
                onNavigate(`/blog/${post.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-[#FF6B35]/60 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={post.image}
                    alt={`${post.title} - وبلاگ آسانا لجستیک`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#0A2540]/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.author.name}</span>
                  </div>

                  <h2 className="text-xl font-bold text-[#0A2540] group-hover:text-[#FF6B35] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#0A2540] group-hover:text-[#FF6B35]">
                  <span>مطالعه مقاله کامل</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
