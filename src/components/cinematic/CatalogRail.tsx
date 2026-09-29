import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CATALOG_CARDS } from './manifest';
import { CatalogCardItem } from './types';
import { ChevronRight, ChevronLeft, ArrowUpRight, Check, X, Shield, Clock, MapPin, Layers } from 'lucide-react';
import { TIMELINE_CONFIG } from './manifest';

interface CatalogRailProps {
  progress: number;
  reducedMotion: boolean;
  onNavigateToQuote: (serviceCategory?: string) => void;
  onNavigateToService: (actionUrl: string) => void;
}

export const CatalogRail: React.FC<CatalogRailProps> = ({
  progress,
  reducedMotion,
  onNavigateToQuote,
  onNavigateToService,
}) => {
  const p = progress;
  const railContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCard, setSelectedCard] = useState<CatalogCardItem | null>(null);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Entrance interpolation: enters from bottom-right (or bottom) horizontally between 0.75 and 0.96
  let railOpacity = 0;
  let railTranslateY = 100;
  let railTranslateX = 50;

  if (p >= TIMELINE_CONFIG.catalogEnter.start) {
    const t = Math.min((p - TIMELINE_CONFIG.catalogEnter.start) / (TIMELINE_CONFIG.catalogEnter.end - TIMELINE_CONFIG.catalogEnter.start), 1);
    railOpacity = t;
    railTranslateY = 100 * (1 - t);
    railTranslateX = 50 * (1 - t);
  }

  // Smooth scroll rail horizontally
  const scrollRail = useCallback((direction: 'left' | 'right') => {
    if (!railContainerRef.current) return;
    const scrollAmount = 380;
    const current = railContainerRef.current.scrollLeft;
    const target = direction === 'left' ? current - scrollAmount : current + scrollAmount;
    railContainerRef.current.scrollTo({
      left: target,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [reducedMotion]);

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!railContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - railContainerRef.current.offsetLeft);
    setScrollLeftState(railContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !railContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - railContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier
    railContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Keyboard navigation when rail is focused
  const handleRailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRail('right');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollRail('left');
    }
  };

  if (railOpacity <= 0.01) {
    return null;
  }

  return (
    <section
      aria-label="کاتالوگ راهکارها و خدمات کریدور آسانا لجستیک"
      className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 px-4 sm:px-8 md:px-12 pointer-events-auto"
      style={{
        opacity: railOpacity,
        transform: reducedMotion ? 'none' : `translate3d(${railTranslateX}px, ${railTranslateY}px, 0px)`,
        transition: reducedMotion ? 'none' : 'opacity 0.25s ease-out',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Rail Header with Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-3">
          <div>
            <div className="flex items-center gap-2 text-[#FF6B35] text-xs font-bold tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>شبکه عملیاتی یکپارچه • کاتالوگ تعاملی</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              راهکارهای شش‌گانه کریدور آسانا لجستیک
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
              برای مشاهده مشخصات فنی هر مسیر، کارت مورد نظر را بررسی کنید.
            </p>
          </div>

          {/* Rail Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRail('right')}
              aria-label="کارت قبلی"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-[#FF6B35] backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail('left')}
              aria-label="کارت بعدی"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-[#FF6B35] backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable / Draggable Cards Container */}
        <div
          ref={railContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onKeyDown={handleRailKeyDown}
          tabIndex={0}
          role="region"
          aria-label="لیست کارت‌های خدمات آسانا لجستیک"
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none scroll-smooth focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 rounded-2xl cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {CATALOG_CARDS.map((card, idx) => (
            <article
              key={card.id}
              tabIndex={0}
              aria-label={`${card.title} - ${card.category}`}
              className="group shrink-0 w-[290px] sm:w-[340px] md:w-[360px] bg-[#0A2540]/85 hover:bg-[#0d2e4f]/95 backdrop-blur-xl border border-white/15 hover:border-[#FF6B35]/60 rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_40px_rgba(255,107,53,0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Header */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/40 to-transparent" />
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#FF6B35] text-white shadow-md">
                  {card.badge}
                </span>
                <span className="absolute bottom-2 right-3 text-[11px] text-slate-300 font-mono">
                  {card.titleEn}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-[#FF8A50] font-semibold mb-1">
                    {card.category}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug line-clamp-1">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-2 mb-3">
                    {card.description}
                  </p>

                  {/* Route & Lead Time Pills */}
                  <div className="space-y-1.5 mb-3 text-[11px] text-slate-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                      <span className="truncate">{card.route}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>زمان تحویل: {card.leadTime}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(card);
                    }}
                    className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer text-center"
                  >
                    بررسی جزئیات
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToQuote(card.category);
                    }}
                    className="py-2 px-3 bg-[#FF6B35] hover:bg-[#e05622] active:bg-[#c24416] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                    title="استعلام قیمت این خدمت"
                  >
                    <span>استعلام</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* =======================================================================
          DETAIL INSPECTION MODAL (Interactive Final State)
          ======================================================================= */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div className="w-full max-w-2xl bg-[#0A2540] border border-white/20 rounded-2xl overflow-hidden shadow-2xl text-white">
            {/* Modal Header */}
            <div className="relative h-48 sm:h-56 w-full">
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/60 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                aria-label="بستن پنجره"
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-6">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#FF6B35] text-white">
                  {selectedCard.badge}
                </span>
                <h3 id="card-modal-title" className="text-2xl font-black text-white mt-1">
                  {selectedCard.title}
                </h3>
                <p className="text-xs text-slate-300 font-mono">{selectedCard.titleEn}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {selectedCard.description}
              </p>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-[#FF8A50] mb-1">شاخص‌های تضمین کیفیت (SLA):</div>
                {selectedCard.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {spec.label}
                    </span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const url = selectedCard.actionUrl;
                    setSelectedCard(null);
                    onNavigateToService(url);
                  }}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  صفحه اختصاصی این خدمت
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cat = selectedCard.category;
                    setSelectedCard(null);
                    onNavigateToQuote(cat);
                  }}
                  className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#e05622] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-lg"
                >
                  استعلام قیمت فوری
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
