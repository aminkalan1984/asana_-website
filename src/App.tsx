import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { TrackPage } from './pages/TrackPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPage';
import { BrandGuidePage } from './pages/BrandGuidePage';
import { CinematicMicrosite } from './components/cinematic/CinematicMicrosite';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [searchParams, setSearchParams] = useState<string>(() => {
    return window.location.search || '';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(window.location.search || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const [pathname, search] = path.split('?');
    window.history.pushState({}, '', path);
    setCurrentPath(pathname);
    setSearchParams(search ? `?${search}` : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic SEO Title & Meta tags updater based on path
  useEffect(() => {
    let title = 'آسانا لجستیک | Asana Log - لجستیک، آسان‌تر از همیشه';
    let description =
      'آسانا لجستیک (Asana Log)، شریک لجستیکی مطمئن کسب‌وکارهای ایرانی با خدمات جامع حمل‌ونقل چندوجهی، زمینی، هوایی، دریایی و انبارداری هوشمند.';

    if (currentPath === '/services') {
      title = 'خدمات لجستیکی آسانا | Asana Log';
      description =
        'مجموعه خدمات حمل زمینی، هوایی، دریایی کانتینر، انبارداری هوشمند و توزیع شهری آسانا لجستیک.';
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      title = `خدمات ${slug} | آسانا لجستیک`;
    } else if (currentPath === '/track') {
      title = 'رهگیری زنده محموله | آسانا لجستیک (Asana Log)';
      description =
        'سامانه آنلاین پایش بارنامه و رهگیری وضعیت محموله‌های جاده‌ای، هوایی و کانتینری آسانا لجستیک.';
    } else if (currentPath === '/request-quote') {
      title = 'استعلام قیمت حمل بار آنلاین | آسانا لجستیک';
      description =
        'محاسبه آنلاین نرخ حمل بار زمینی، دریایی و هوایی با تضمین پاسخگویی کمتر از ۲ ساعت توسط کارشناسان آسانا لجستیک.';
    } else if (currentPath.startsWith('/about')) {
      title = 'درباره آسانا لجستیک | تاریخچه، تیم و مجوزهای نسل خلاق آسانا';
    } else if (currentPath === '/news') {
      title = 'اخبار شرکت آسانا لجستیک | Asana Log News';
    } else if (currentPath.startsWith('/news/')) {
      title = 'خبر | اتاق خبر آسانا لجستیک';
    } else if (currentPath === '/blog') {
      title = 'وبلاگ تخصصی لجستیک و بازرگانی | آسانا لجستیک';
    } else if (currentPath.startsWith('/blog/')) {
      title = 'مقاله تخصصی زنجیره تأمین | وبلاگ آسانا لجستیک';
    } else if (currentPath === '/contact') {
      title = 'تماس با ما | دفتر مرکزی و شعب آسانا لجستیک';
    } else if (currentPath === '/careers') {
      title = 'فرصت‌های شغلی و استخدام | آسانا لجستیک';
    } else if (currentPath === '/faq') {
      title = 'سوالات متداول حمل بار و انبارداری | آسانا لجستیک';
    } else if (currentPath === '/terms') {
      title = 'قوانین و مقررات حمل بار | آسانا لجستیک';
    } else if (currentPath === '/privacy') {
      title = 'حریم خصوصی و امانت‌داری داده‌ها | آسانا لجستیک';
    } else if (currentPath === '/cookies') {
      title = 'سیاست کوکی‌ها | آسانا لجستیک';
    } else if (currentPath === '/brand-guide') {
      title = 'راهنمای هویت برند | آسانا لجستیک (Brand Manual)';
    } else if (currentPath === '/cinematic') {
      title = 'کریدور تعاملی ۲.۵ بعدی | آسانا لجستیک (Asana Log)';
      description =
        'پیمایش تعاملی و سینمایی کریدور ترانزیت آسانا لجستیک از آب‌های عمیق تا باراندازها و ناوگان پیشرفته جاده‌ای.';
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [currentPath]);

  // Route Rendering Logic
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Services Hub
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    // 3. Service Detail
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 4. Shipment Tracking
    if (currentPath === '/track') {
      const urlParams = new URLSearchParams(searchParams);
      const code = urlParams.get('code') || '';
      return <TrackPage initialCode={code} onNavigate={navigate} />;
    }

    // 5. Request Quote
    if (currentPath === '/request-quote') {
      return <RequestQuotePage onNavigate={navigate} />;
    }

    // 6. About
    if (currentPath === '/about') {
      return <AboutPage subTab="story" onNavigate={navigate} />;
    }
    if (currentPath === '/about/story') {
      return <AboutPage subTab="story" onNavigate={navigate} />;
    }
    if (currentPath === '/about/team') {
      return <AboutPage subTab="team" onNavigate={navigate} />;
    }
    if (currentPath === '/about/certificates') {
      return <AboutPage subTab="certificates" onNavigate={navigate} />;
    }

    // 7. News
    if (currentPath === '/news') {
      return <NewsPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/news/')) {
      const slug = currentPath.replace('/news/', '');
      return <NewsDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 8. Blog
    if (currentPath === '/blog') {
      const urlParams = new URLSearchParams(searchParams);
      const category = urlParams.get('category') || 'all';
      return <BlogPage initialCategory={category} onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      return <BlogDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 9. Contact
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // 10. Careers
    if (currentPath === '/careers') {
      return <CareersPage onNavigate={navigate} />;
    }

    // 11. FAQ
    if (currentPath === '/faq') {
      return <FAQPage onNavigate={navigate} />;
    }

    // 12. Legal
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/cookies') {
      return <LegalPage type="cookies" onNavigate={navigate} />;
    }

    // 13. Brand Guide
    if (currentPath === '/brand-guide') {
      return <BrandGuidePage onNavigate={navigate} />;
    }

    // 14. Cinematic 2.5D Transit Corridor
    if (currentPath === '/cinematic') {
      return <CinematicMicrosite onNavigate={navigate} />;
    }

    // Fallback to Home
    return <HomePage onNavigate={navigate} />;
  };

  // If on cinematic route, render pure immersive stage without standard chrome
  if (currentPath === '/cinematic') {
    return <CinematicMicrosite onNavigate={navigate} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1A1A1A]">
      {/* Top Header */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Main Page Content */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Floating WhatsApp Quick Contact */}
      <WhatsAppButton />

      {/* Enterprise 5-Column Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
