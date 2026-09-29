import React, { useRef, useEffect } from 'react';
import { useScrollTimeline } from './useScrollTimeline';
import { StageViewport } from './StageViewport';
import { NarrativeOverlay } from './NarrativeOverlay';
import { CatalogRail } from './CatalogRail';
import { CinematicControls } from './CinematicControls';

interface CinematicMicrositeProps {
  onNavigate: (path: string) => void;
}

export const CinematicMicrosite: React.FC<CinematicMicrositeProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = 'کریدور تعاملی ۲.۵ بعدی ترانزیت | آسانا لجستیک - Asana Log';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'تجربه سینمایی و پایش عمقی کریدور ترانزیت آسانا لجستیک (نسل خلاق آسانا) از آب‌های عمیق خلیج فارس تا قطب‌های اقتصادی اوراسیا.'
      );
    }
  }, []);

  const {
    progress,
    smoothProgress,
    activeBeatIndex,
    reducedMotion,
    setReducedMotion,
    isAudioEnabled,
    toggleAudio,
    scrollToProgress,
    jumpToBeat,
  } = useScrollTimeline({
    containerRef,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#030914] text-white min-h-[550vh] selection:bg-[#FF6B35] selection:text-white"
      dir="rtl"
    >
      {/* Pinned Sticky 2.5D Viewport Stage */}
      <StageViewport progress={smoothProgress} reducedMotion={reducedMotion}>
        {/* Narrative HTML Content Layers */}
        <NarrativeOverlay
          progress={smoothProgress}
          reducedMotion={reducedMotion}
          onExploreCatalog={() => scrollToProgress(0.85)}
          onRequestQuote={() => onNavigate('/request-quote')}
        />

        {/* Horizontal Catalog Rail & Inspection Modals (0.75 - 1.00) */}
        <CatalogRail
          progress={smoothProgress}
          reducedMotion={reducedMotion}
          onNavigateToQuote={(category) => {
            onNavigate('/request-quote');
          }}
          onNavigateToService={(url) => {
            onNavigate(url);
          }}
        />

        {/* Global Controls, Scrubber & Checkpoint Navigation */}
        <CinematicControls
          progress={smoothProgress}
          activeBeatIndex={activeBeatIndex}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
          isAudioEnabled={isAudioEnabled}
          onToggleAudio={toggleAudio}
          onJumpToBeat={jumpToBeat}
          onExitCinematic={() => onNavigate('/')}
        />
      </StageViewport>
    </div>
  );
};
