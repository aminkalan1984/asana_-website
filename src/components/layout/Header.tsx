import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowLeft, ShieldCheck, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'خانه', path: '/' },
    { label: 'کریدور تعاملی (2.5D)', path: '/cinematic', isBadge: true },
    { label: 'خدمات', path: '/services', hasDropdown: true },
    { label: 'رهگیری محموله', path: '/track' },
    { label: 'اخبار', path: '/news' },
    { label: 'وبلاگ', path: '/blog' },
    { label: 'درباره ما', path: '/about' },
    { label: 'تماس با ما', path: '/contact' },
  ];

  const serviceSubLinks = [
    { title: 'حمل زمینی سراسری', path: '/services/ground-freight' },
    { title: 'حمل هوایی بار', path: '/services/air-freight' },
    { title: 'حمل دریایی کانتینر', path: '/services/sea-freight' },
    { title: 'انبارداری و فولفیلمنت', path: '/services/warehousing' },
    { title: 'توزیع شهری و مویرگی', path: '/services/last-mile-delivery' },
    { title: 'لجستیک ایکامرس', path: '/services/ecommerce-logistics' },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'h-[72px] bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm'
            : 'h-[72px] bg-white/85 backdrop-blur-md border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Right Zone: Single Brand Wordmark Contract */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="group flex items-center gap-2.5 text-right cursor-pointer"
              title="آسانا لجستیک | Asana Log"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0A2540] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-[#FF6B35] transition-colors">
                <span className="font-bold tracking-tight">آ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#0A2540] group-hover:text-[#FF6B35] transition-colors flex items-center">
                  آسانا لجستیک
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B35] mr-1.5 animate-pulse"></span>
                </span>
                <span className="text-[11px] font-medium text-neutral-500 font-latin tracking-wider -mt-1">
                  Asana Log
                </span>
              </div>
            </a>
          </div>

          {/* Middle Zone: Clean Text Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-neutral-700">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setServicesDropdown(true)}
                onMouseLeave={() => link.hasDropdown && setServicesDropdown(false)}
              >
                <a
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`flex items-center gap-1.5 py-2 transition-colors relative ${
                    isActive(link.path)
                      ? 'text-[#0A2540] font-semibold'
                      : 'text-neutral-600 hover:text-[#0A2540]'
                  }`}
                >
                  {link.isBadge && (
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping shrink-0" />
                  )}
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#FF6B35] rounded-full"></span>
                  )}
                </a>

                {/* Services Dropdown */}
                {link.hasDropdown && servicesDropdown && (
                  <div className="absolute top-full right-0 w-64 bg-white rounded-xl shadow-lg border border-neutral-100 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 border-b border-neutral-100 mb-1">
                      خدمات لجستیکی آسانا
                    </div>
                    {serviceSubLinks.map((sub) => (
                      <a
                        key={sub.path}
                        href={sub.path}
                        onClick={(e) => handleLinkClick(e, sub.path)}
                        className="block px-3 py-2 text-sm text-neutral-700 hover:text-[#0A2540] hover:bg-neutral-50 rounded-lg transition-colors"
                      >
                        {sub.title}
                      </a>
                    ))}
                    <div className="pt-1 border-t border-neutral-100">
                      <a
                        href="/services"
                        onClick={(e) => handleLinkClick(e, '/services')}
                        className="block px-3 py-2 text-xs font-semibold text-[#FF6B35] hover:bg-orange-50 rounded-lg"
                      >
                        مشاهده تمامی خدمات ←
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Left Zone: CTA and Direct Phone Contact */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-[#0A2540] transition-colors tabular-nums"
              dir="ltr"
            >
              <span className="font-latin text-sm font-semibold">{COMPANY_INFO.phone}</span>
              <Phone className="w-4 h-4 text-[#FF6B35]" />
            </a>

            <a
              href="/request-quote"
              onClick={(e) => handleLinkClick(e, '/request-quote')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#FF6B35] hover:bg-[#e85a26] active:scale-[0.98] transition-all rounded-lg shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>استعلام قیمت</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="/request-quote"
              onClick={(e) => handleLinkClick(e, '/request-quote')}
              className="sm:hidden px-3.5 py-1.5 text-xs font-semibold text-white bg-[#FF6B35] rounded-md whitespace-nowrap"
            >
              استعلام قیمت
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-[#0A2540] rounded-lg border border-neutral-200"
              aria-label="باز کردن منو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 bottom-0 right-0 w-5/6 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-[#0A2540] flex items-center justify-center text-white font-bold text-sm">
                    آ
                  </div>
                  <div>
                    <div className="font-bold text-[#0A2540] text-base">آسانا لجستیک</div>
                    <div className="text-[10px] text-neutral-500 font-latin">Asana Log</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-700"
                  aria-label="بستن"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      className={`block px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                        isActive(link.path)
                          ? 'bg-neutral-100 text-[#0A2540] font-semibold'
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {link.label}
                    </a>
                    {link.hasDropdown && (
                      <div className="pr-4 py-1 space-y-1 border-r-2 border-neutral-100 my-1">
                        {serviceSubLinks.map((sub) => (
                          <a
                            key={sub.path}
                            href={sub.path}
                            onClick={(e) => handleLinkClick(e, sub.path)}
                            className="block px-3 py-1.5 text-sm text-neutral-600 hover:text-[#0A2540]"
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a
                  href="/careers"
                  onClick={(e) => handleLinkClick(e, '/careers')}
                  className="block px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg"
                >
                  فرصت‌های شغلی
                </a>
                <a
                  href="/brand-guide"
                  onClick={(e) => handleLinkClick(e, '/brand-guide')}
                  className="block px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg"
                >
                  راهنمای برند
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <a
                href="/request-quote"
                onClick={(e) => handleLinkClick(e, '/request-quote')}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-[#FF6B35] rounded-lg block shadow-sm"
              >
                استعلام قیمت سریع
              </a>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-[#0A2540] font-medium border border-neutral-200 rounded-lg tabular-nums"
                dir="ltr"
              >
                <span>{COMPANY_INFO.phone}</span>
                <Phone className="w-4 h-4 text-[#FF6B35]" />
              </a>

              <div className="text-[12px] text-center text-neutral-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>نسل خلاق آسانا · ثبت ۴۹۸۲۱۰</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
