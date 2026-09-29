import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { NEWS_ITEMS } from '../data/mockData';
import { Calendar, Clock, User, Share2, ArrowLeft, Tag } from 'lucide-react';

interface NewsDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ slug, onNavigate }) => {
  const news = NEWS_ITEMS.find((n) => n.slug === slug) || NEWS_ITEMS[0];
  const relatedNews = NEWS_ITEMS.filter((n) => n.slug !== news.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    image: [news.image],
    datePublished: '2026-03-15T08:00:00+03:30',
    dateModified: '2026-03-15T09:00:00+03:30',
    author: [
      {
        '@type': 'Organization',
        name: 'آسانا لجستیک',
        url: 'https://asana-log.com',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'آسانا لجستیک',
      logo: {
        '@type': 'ImageObject',
        url: 'https://asana-log.com/logo.png',
      },
    },
    description: news.summary,
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('لینک خبر در کلیپ‌بورد کپی شد.');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'اخبار', path: '/news' },
            { label: news.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Article Header */}
        <header className="my-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#FF6B35] font-semibold">
            <span>●</span>
            <span>{news.category}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-neutral-500">اخبار رسمی آسانا لجستیک</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A2540] leading-tight">
            {news.title}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-6 border-b border-neutral-100 text-xs text-neutral-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>{news.author}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{news.date}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{news.readTime}</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-neutral-600 hover:text-[#0A2540] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>اشتراک‌گذاری</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md mb-8">
          <img
            src={news.image}
            alt={`${news.title} - آسانا لجستیک`}
            className="w-full aspect-[16/9] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed text-sm sm:text-base space-y-5">
          {news.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-2">
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>برچسب‌ها:</span>
          </span>
          {news.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs text-neutral-600 bg-neutral-100 hover:bg-neutral-200 px-3 py-1 rounded-md transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <h2 className="text-xl font-bold text-[#0A2540] mb-6">
              سایر اخبار شرکت آسانا لجستیک
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedNews.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onNavigate(`/news/${rel.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl border border-neutral-200 hover:border-[#FF6B35] transition-colors cursor-pointer bg-neutral-50/50"
                >
                  <div className="text-xs text-neutral-400 mb-1">{rel.date}</div>
                  <h3 className="font-bold text-sm text-[#0A2540] line-clamp-2 mb-2">
                    {rel.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#FF6B35] flex items-center gap-1">
                    <span>مشاهده خبر</span>
                    <ArrowLeft className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
