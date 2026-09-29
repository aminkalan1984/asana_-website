import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SERVICES, COMPANY_INFO } from '../data/mockData';
import {
  CheckCircle,
  MapPin,
  ArrowLeft,
  PhoneCall,
  Clock,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const service = SERVICES.find((s) => s.slug === slug) || SERVICES[0];

  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} با آسانا لجستیک`,
    provider: {
      '@type': 'Organization',
      name: 'آسانا لجستیک (Asana Log)',
      url: 'https://asana-log.com',
    },
    description: service.fullDesc,
    areaServed: 'IR',
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'خدمات', path: '/services' },
            { label: service.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Section of Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold text-[#FF6B35]">
              خدمات تخصصی شرکت نسل خلاق آسانا
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540] leading-tight">
              {service.title}{' '}
              <span className="text-[#FF6B35]">با آسانا لجستیک</span>
            </h1>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed pt-2">
              {service.fullDesc}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  onNavigate('/request-quote');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#FF6B35] hover:bg-[#e85a26] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>استعلام نرخ این خدمت</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-6 py-3.5 bg-neutral-50 hover:bg-neutral-100 text-[#0A2540] rounded-xl text-sm font-semibold transition-colors border border-neutral-200 flex items-center gap-2"
                dir="ltr"
              >
                <PhoneCall className="w-4 h-4 text-[#FF6B35]" />
                <span className="font-latin">{COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
              <img
                src={service.image}
                alt={`${service.title} آسانا لجستیک`}
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Benefits & Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Features */}
          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#FF6B35]" />
              <span>قابلیت‌ها و امکانات فنی</span>
            </h2>
            <ul className="space-y-3 pt-2">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                  <CheckCircle className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0A2540]" />
              <span>مزایای رقابتی برای کسب‌وکار شما</span>
            </h2>
            <ul className="space-y-3 pt-2">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coverage Network */}
        <div className="mt-16 p-8 rounded-2xl border border-neutral-200 bg-white">
          <div className="flex items-center gap-2 mb-4 text-[#0A2540]">
            <MapPin className="w-5 h-5 text-[#FF6B35]" />
            <h2 className="text-xl font-bold">شبکه پوشش و هاب‌های اصلی</h2>
          </div>
          <p className="text-neutral-600 text-sm mb-6">
            آسانا لجستیک با بهره‌گیری از شعب اختصاصی و پایانه‌های عملیاتی در نقاط مواصلاتی استراتژیک، پوشش حداکثری را محقق ساخته است:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {service.coverage.map((city, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200"
              >
                📍 {city}
              </span>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#0A2540] mb-8 text-center">
            مراحل اجرای خدمت {service.title} در آسانا لجستیک
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p) => (
              <div
                key={p.step}
                className="bg-white p-6 rounded-2xl border border-neutral-200 flex flex-col justify-start"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0A2540] text-white flex items-center justify-center font-bold text-sm font-latin mb-4">
                  0{p.step}
                </div>
                <h3 className="font-bold text-[#0A2540] text-base mb-2">{p.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ of this service */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mt-16 max-w-3xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#FF6B35]" />
              <span>سوالات متداول درباره {service.title}</span>
            </h2>
            <div className="space-y-3">
              {service.faqs.map((f, i) => (
                <div key={i} className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                  <div className="font-bold text-sm text-[#0A2540] mb-2">؟ {f.q}</div>
                  <div className="text-xs text-neutral-600 leading-relaxed">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Services */}
        <div className="mt-20 pt-12 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#0A2540]">
              سایر خدمات لجستیکی مرتبط
            </h2>
            <button
              onClick={() => onNavigate('/services')}
              className="text-xs font-semibold text-[#FF6B35] hover:underline"
            >
              مشاهده تمامی خدمات ←
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onNavigate(`/services/${rel.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-xl border border-neutral-200 hover:border-[#FF6B35] transition-colors cursor-pointer bg-white"
              >
                <h3 className="font-bold text-[#0A2540] text-base mb-1">{rel.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-2">{rel.shortDesc}</p>
                <div className="mt-3 text-xs font-semibold text-[#FF6B35] flex items-center gap-1">
                  <span>جزئیات خدمت</span>
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
