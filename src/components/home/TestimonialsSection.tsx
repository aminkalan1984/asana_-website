import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35] tracking-wide">
            صدای مشتریان و شرکای تجاری
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            مشتریان آسانا لجستیک چه می‌گویند؟
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            روایت مدیران صنایع پیشرو، بازرگانان و بنیان‌گذاران برندهایی که زنجیره تأمین خود را به آسانا لجستیک سپرده‌اند.
          </p>
        </div>

        {/* 3 Testimonials in 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-50/70 rounded-2xl p-7 border border-neutral-200/90 flex flex-col justify-between hover:border-neutral-300 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#FF6B35]/40" />
                <p className="text-neutral-700 text-sm leading-relaxed">
                  «{item.quote}»
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-200/80 space-y-2">
                <div>
                  <div className="font-bold text-[#0A2540] text-sm">{item.author}</div>
                  <div className="text-xs text-neutral-500">
                    {item.role} · <span className="font-medium text-neutral-700">{item.company}</span>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                  ✓ {item.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
