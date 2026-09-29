import React from 'react';

export const TrustBar: React.FC = () => {
  const metrics = [
    { value: '۵۰۰+', label: 'ناوگان فعال جاده‌ای' },
    { value: '۱۰+', label: 'سال سابقه تخصصی' },
    { value: '۲۵۰۰+', label: 'مشتری فعال سازمانی' },
    { value: '۹۸٪', label: 'رضایت مندی و تحویل به‌موقع' },
  ];

  return (
    <section className="border-y border-neutral-200 bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-neutral-200">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`text-center py-4 md:py-2 ${
                index % 2 === 0 ? 'pr-2 pl-4' : 'pl-2 pr-4'
              } md:px-6`}
            >
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0A2540] tabular-nums tracking-tight font-latin">
                {item.value}
              </div>
              <div className="text-sm font-medium text-neutral-600 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
