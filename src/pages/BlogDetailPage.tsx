import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BLOG_POSTS } from '../data/mockData';
import { Calendar, Clock, User, Share2, ArrowLeft, Tag, Link2 } from 'lucide-react';

interface BlogDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.image],
    datePublished: '2026-03-10T10:00:00+03:30',
    dateModified: '2026-03-12T11:00:00+03:30',
    author: [
      {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role,
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
    description: post.summary,
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('لینک مقاله در کلیپ‌بورد کپی شد.');
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
            { label: 'وبلاگ', path: '/blog' },
            { label: post.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Article Header */}
        <header className="my-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#FF6B35] font-semibold">
            <span>●</span>
            <span>{post.category}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-neutral-500">دانشنامه تخصصی آسانا لجستیک</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A2540] leading-tight">
            {post.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-6 border-b border-neutral-100 text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">
                {post.author.name.slice(0, 1)}
              </div>
              <div>
                <div className="font-bold text-neutral-900">{post.author.name}</div>
                <div className="text-[11px] text-neutral-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
              <span>·</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-neutral-600 hover:text-[#0A2540] cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>اشتراک</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md mb-8">
          <img
            src={post.image}
            alt={`${post.title} - وبلاگ آسانا لجستیک`}
            className="w-full aspect-[16/9] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed text-sm sm:text-base space-y-5">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h2
                  key={index}
                  className="text-xl font-bold text-[#0A2540] pt-4 border-b border-neutral-100 pb-2"
                >
                  {paragraph.replace('### ', '')}
                </h2>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Strategic Internal Links (Section 3 technical SEO: 3+ internal links) */}
        <div className="my-10 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0A2540]">
            <Link2 className="w-4 h-4 text-[#FF6B35]" />
            <span>صفحات و خدمات مرتبط با این مقاله در آسانا لجستیک:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {post.internalLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.url);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 bg-white rounded-xl border border-neutral-200 hover:border-[#FF6B35] text-xs font-semibold text-[#0A2540] hover:text-[#FF6B35] transition-colors flex items-center justify-between"
              >
                <span>{link.text}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-2">
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>کلیدواژه‌ها:</span>
          </span>
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs text-neutral-600 bg-neutral-100 px-3 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <h2 className="text-xl font-bold text-[#0A2540] mb-6">
              سایر مقالات تخصصی
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onNavigate(`/blog/${rel.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl border border-neutral-200 hover:border-[#FF6B35] transition-colors cursor-pointer bg-neutral-50/50"
                >
                  <div className="text-xs text-neutral-400 mb-1">{rel.date}</div>
                  <h3 className="font-bold text-sm text-[#0A2540] line-clamp-2 mb-2">
                    {rel.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#FF6B35] flex items-center gap-1">
                    <span>مطالعه مقاله</span>
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
