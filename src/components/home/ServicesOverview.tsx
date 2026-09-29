import React from 'react';
import {
  Truck,
  Plane,
  Ship,
  Warehouse,
  PackageCheck,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';
import { SERVICES } from '../../data/mockData';

interface ServicesOverviewProps {
  onNavigate: (path: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#FF6B35]" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#FF6B35]" />;
      case 'Ship':
        return <Ship className="w-6 h-6 text-[#FF6B35]" />;
      case 'Warehouse':
        return <Warehouse className="w-6 h-6 text-[#FF6B35]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-[#FF6B35]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-[#FF6B35]" />;
      default:
        return <Truck className="w-6 h-6 text-[#FF6B35]" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#FF6B35] tracking-wide">
            راهکارهای زنجیره تأمین
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
            خدمات لجستیکی آسانا
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            از حمل زمینی تا لجستیک بین‌المللی، همه‌چیز زیر یک سقف. پوشش جامع نیازهای صادرات، واردات، انبارداری و توزیع.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                onNavigate(`/services/${service.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl p-7 border border-neutral-200/90 hover:border-[#FF6B35] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#FF6B35] transition-colors">
                  {service.title}
                </h3>

                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-sm font-semibold text-[#0A2540] group-hover:text-[#FF6B35]">
                <span>جزئیات بیشتر و مشخصات</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hub CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-neutral-300 hover:border-[#0A2540] text-sm font-semibold text-[#0A2540] transition-colors shadow-xs cursor-pointer"
          >
            <span>مشاهده تمامی خدمات و مشخصات ناوگان آسانا لجستیک</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
