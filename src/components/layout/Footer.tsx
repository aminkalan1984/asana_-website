import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Linkedin,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../../data/mockData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A2540] text-neutral-300 pt-16 pb-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-neutral-800/80 text-sm">
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white font-bold text-xl shadow-md">
                آ
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white flex items-center">
                  آسانا لجستیک
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B35] mr-1.5"></span>
                </span>
                <span className="text-xs text-neutral-400 font-latin block tracking-wider">
                  Asana Log · نسل خلاق آسانا
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm pt-2">
              شریک لجستیکی مطمئن کسب‌وکارهای ایرانی. مدیریت و اجرای زنجیره تأمین یکپارچه،
              حمل‌ونقل چندوجهی بین‌المللی و داخلی، انبارداری هوشمند و توزیع شهری مویرگی با شفافیت کامل.
            </p>

            {/* Official Registration Data */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs space-y-1 text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">نام رسمی شرکت:</span>
                <span className="font-semibold text-white">{COMPANY_INFO.legalName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">شماره ثبت:</span>
                <span className="tabular-nums font-mono text-neutral-200">{COMPANY_INFO.registrationNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">شناسه ملی:</span>
                <span className="tabular-nums font-mono text-neutral-200">{COMPANY_INFO.nationalId}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#FF6B35] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="لینکدین آسانا لجستیک"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#FF6B35] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="اینستاگرام آسانا لجستیک"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#FF6B35] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="کانال تلگرام آسانا لجستیک"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-emerald-600 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="واتساپ پشتیبانی آسانا لجستیک"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide border-r-2 border-[#FF6B35] pr-2.5">
              خدمات لجستیک
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/services/${s.slug}`}
                    onClick={(e) => handleLink(e, `/services/${s.slug}`)}
                    className="hover:text-white transition-colors block py-0.5"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="/services"
                  onClick={(e) => handleLink(e, '/services')}
                  className="text-[#FF6B35] hover:underline text-xs font-semibold block"
                >
                  مرکز جامع خدمات ←
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide border-r-2 border-[#FF6B35] pr-2.5">
              شرکت
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  درباره آسانا لجستیک
                </a>
              </li>
              <li>
                <a
                  href="/about/story"
                  onClick={(e) => handleLink(e, '/about/story')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  داستان و مأموریت ما
                </a>
              </li>
              <li>
                <a
                  href="/about/team"
                  onClick={(e) => handleLink(e, '/about/team')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  تیم مدیریت
                </a>
              </li>
              <li>
                <a
                  href="/about/certificates"
                  onClick={(e) => handleLink(e, '/about/certificates')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  مجوزها و استانداردها
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  onClick={(e) => handleLink(e, '/news')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  اخبار شرکت
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleLink(e, '/blog')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  وبلاگ و مقالات تخصصی
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  onClick={(e) => handleLink(e, '/careers')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  فرصت‌های شغلی
                </a>
              </li>
              <li>
                <a
                  href="/brand-guide"
                  onClick={(e) => handleLink(e, '/brand-guide')}
                  className="text-amber-400 hover:underline text-xs font-semibold block pt-1"
                >
                  راهنمای هویت بصری برند
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Quick Actions (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide border-r-2 border-[#FF6B35] pr-2.5">
              پشتیبانی مشتریان
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a
                  href="/track"
                  onClick={(e) => handleLink(e, '/track')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  رهگیری زنده محموله
                </a>
              </li>
              <li>
                <a
                  href="/request-quote"
                  onClick={(e) => handleLink(e, '/request-quote')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  استعلام قیمت آنلاین
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleLink(e, '/faq')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  پرسش‌های متداول (FAQ)
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  تماس با کارشناسان
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                  حقوقی و مقررات
                </span>
                <a
                  href="/terms"
                  onClick={(e) => handleLink(e, '/terms')}
                  className="hover:text-white text-xs block py-0.5 text-neutral-400"
                >
                  شرایط و قوانین حمل
                </a>
                <a
                  href="/privacy"
                  onClick={(e) => handleLink(e, '/privacy')}
                  className="hover:text-white text-xs block py-0.5 text-neutral-400"
                >
                  حریم خصوصی و امانت‌داری
                </a>
                <a
                  href="/cookies"
                  onClick={(e) => handleLink(e, '/cookies')}
                  className="hover:text-white text-xs block py-0.5 text-neutral-400"
                >
                  سیاست کوکی‌ها
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Office (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide border-r-2 border-[#FF6B35] pr-2.5">
              دفتر مرکزی
            </h3>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-neutral-300">
                  {COMPANY_INFO.headquarters}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="hover:text-white tabular-nums font-latin text-sm text-neutral-200"
                  dir="ltr"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.emails.general}`}
                  className="hover:text-white font-latin text-neutral-300"
                >
                  {COMPANY_INFO.emails.general}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-neutral-800">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span className="text-[11px] text-neutral-400">
                  {COMPANY_INFO.workingHours}
                </span>
              </div>

              <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-lg p-2.5 text-white">
                <div className="text-[11px] text-[#FF6B35] font-semibold">پاسخگویی سریع</div>
                <div className="text-[11px] text-neutral-300">
                  بررسی استعلام قیمت در کمتر از ۲ ساعت کاری
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              ©️ ۱۴۰۴ تمامی حقوق مادی و معنوی متعلق به شرکت نسل خلاق آسانا (آسانا لجستیک | Asana Log) می‌باشد.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/terms"
              onClick={(e) => handleLink(e, '/terms')}
              className="hover:text-neutral-400 transition-colors"
            >
              قوانین و مقررات
            </a>
            <span className="text-neutral-700">·</span>
            <a
              href="/privacy"
              onClick={(e) => handleLink(e, '/privacy')}
              className="hover:text-neutral-400 transition-colors"
            >
              حریم خصوصی
            </a>
            <span className="text-neutral-700">·</span>
            <a
              href="/cookies"
              onClick={(e) => handleLink(e, '/cookies')}
              className="hover:text-neutral-400 transition-colors"
            >
              سیاست کوکی‌ها
            </a>
            <span className="text-neutral-700">·</span>
            <span className="text-neutral-600 font-latin">asana-log.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
