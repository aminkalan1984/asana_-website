import React, { useState, useEffect } from 'react';
import { ASSET_MANIFEST, TIMELINE_CONFIG } from './manifest';

interface StageViewportProps {
  progress: number; // 0 to 1
  reducedMotion: boolean;
  children?: React.ReactNode;
}

export const StageViewport: React.FC<StageViewportProps> = ({
  progress,
  reducedMotion,
  children,
}) => {
  // Pointer mouse parallax coordinates [-1, 1]
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [reducedMotion]);

  // Interpolation helpers
  const p = progress;

  // Layer 00: Sky
  const skyScale = reducedMotion ? 1.02 : 1.0 + p * 0.06;
  const skyY = reducedMotion ? 0 : -p * 3;
  const skyPointerX = reducedMotion ? 0 : pointer.x * 6;
  const skyPointerY = reducedMotion ? 0 : pointer.y * 4;

  // Layer 10: Distant Horizon
  const distScale = reducedMotion ? 1.05 : 1.02 + p * 0.10;
  const distY = reducedMotion ? 0 : -p * 6;
  const distPointerX = reducedMotion ? 0 : pointer.x * 12;
  const distPointerY = reducedMotion ? 0 : pointer.y * 8;

  // Midground & Hero camera push-in calculations
  const midScale = reducedMotion ? 1.1 : 1.04 + p * 0.18;
  const midY = reducedMotion ? 0 : -p * 10;
  const midPointerX = reducedMotion ? 0 : pointer.x * 20;
  const midPointerY = reducedMotion ? 0 : pointer.y * 12;

  // Layer 30: Hero Carrier
  // From 0 to 0.44: camera drives closer, scaling up from 1.0 to 1.38
  // From 0.44 to 0.74: hero moves into comfortable mid-depth to let panorama breathe
  // From 0.75 to 1.0: hero docks slightly to the side or dims to let catalog shine
  let heroScale = 1.0;
  let heroY = 0;
  let heroX = 0;
  let heroOpacity = 1;

  if (p < 0.25) {
    const t = p / 0.25;
    heroScale = 1.0 + t * 0.25;
    heroY = -t * 6;
  } else if (p < 0.44) {
    const t = (p - 0.25) / 0.19;
    heroScale = 1.25 + t * 0.18;
    heroY = -6 - t * 8;
  } else if (p < 0.75) {
    const t = (p - 0.44) / 0.31;
    heroScale = 1.43 - t * 0.22;
    heroY = -14 + t * 8;
    heroX = t * 12; // gently drifts to give narrative B prominence
  } else {
    const t = (p - 0.75) / 0.25;
    heroScale = 1.21 - t * 0.12;
    heroY = -6 + t * 4;
    heroX = 12 + t * 6;
    heroOpacity = 1 - t * 0.45; // dims slightly behind the catalog rail
  }

  const heroPointerX = reducedMotion ? 0 : pointer.x * 28;
  const heroPointerY = reducedMotion ? 0 : pointer.y * 18;

  // Layer 40 & 41: Foreground Occluders Split (0.15 to 0.25)
  // 0.00 - 0.15: static framing framing the sides
  // 0.15 - 0.28: split wide apart and scale up as camera pushes through portal
  // > 0.28: fully offscreen
  let fgProgress = 0;
  if (p >= TIMELINE_CONFIG.foregroundSplit.start) {
    fgProgress = Math.min(
      Math.max((p - TIMELINE_CONFIG.foregroundSplit.start) / (TIMELINE_CONFIG.foregroundSplit.end - TIMELINE_CONFIG.foregroundSplit.start), 0),
      1
    );
  }
  // Smooth cubic ease out
  const fgEase = 1 - Math.pow(1 - fgProgress, 3);
  const fgTranslateLeft = -fgEase * 120; // moves left -120%
  const fgTranslateRight = fgEase * 120; // moves right +120%
  const fgScale = 1.0 + fgEase * 0.45;
  const fgOpacity = 1 - fgEase * 0.95;

  // Background blur and tint during narrative B (0.48 - 0.74)
  let sceneBlur = 0;
  let sceneBrightness = 1;
  if (p >= TIMELINE_CONFIG.narrativeBEnter.start && p <= TIMELINE_CONFIG.narrativeBExit.end) {
    let focusFactor = 0;
    if (p < TIMELINE_CONFIG.narrativeBHold.start) {
      focusFactor = (p - TIMELINE_CONFIG.narrativeBEnter.start) / (TIMELINE_CONFIG.narrativeBHold.start - TIMELINE_CONFIG.narrativeBEnter.start);
    } else if (p <= TIMELINE_CONFIG.narrativeBHold.end) {
      focusFactor = 1;
    } else {
      focusFactor = 1 - (p - TIMELINE_CONFIG.narrativeBHold.end) / (TIMELINE_CONFIG.narrativeBExit.end - TIMELINE_CONFIG.narrativeBHold.end);
    }
    sceneBlur = focusFactor * 3.5; // subtle editorial bokeh blur
    sceneBrightness = 1 - focusFactor * 0.18; // deep atmospheric contrast
  }

  // Assets from manifest
  const skyAsset = ASSET_MANIFEST.find((l) => l.role === '00_sky');
  const distAsset = ASSET_MANIFEST.find((l) => l.role === '10_distant');
  const midAsset = ASSET_MANIFEST.find((l) => l.role === '20_midground');
  const heroAsset = ASSET_MANIFEST.find((l) => l.role === '30_hero');
  const fgLeftAsset = ASSET_MANIFEST.find((l) => l.role === '40_foreground_left');
  const fgRightAsset = ASSET_MANIFEST.find((l) => l.role === '41_foreground_right');

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] overflow-hidden select-none bg-[#030914] z-0 pointer-events-none"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Container for world depth layers with hardware acceleration */}
      <div
        className="relative w-full h-full will-change-transform"
        style={{
          filter: `blur(${sceneBlur}px) brightness(${sceneBrightness})`,
          transition: reducedMotion ? 'none' : 'filter 0.3s ease-out',
        }}
      >
        {/* =========================================================================
            LAYER 00: SKY & ATMOSPHERE
            ========================================================================= */}
        {skyAsset && (
          <div
            className="absolute inset-0 w-full h-full origin-center pointer-events-none"
            style={{
              transform: `translate3d(${skyPointerX}px, ${skyY + skyPointerY}px, 0px) scale(${skyScale})`,
              transformOrigin: skyAsset.transformOrigin,
            }}
          >
            <img
              src={skyAsset.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center filter saturate-[1.1]"
              loading="eager"
            />
            {/* Soft atmospheric gradient sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-black/30 mix-blend-multiply pointer-events-none" />
          </div>
        )}

        {/* =========================================================================
            LAYER 10: DISTANT MARITIME PORT & MOUNTAINS
            ========================================================================= */}
        {distAsset && (
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: `translate3d(${distPointerX}px, ${distY + distPointerY}px, 0px) scale(${distScale})`,
              transformOrigin: distAsset.transformOrigin,
              opacity: 0.88,
            }}
          >
            <img
              src={distAsset.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-bottom filter contrast-[1.05] brightness-[0.92]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/40 via-transparent to-[#0A2540]/70 pointer-events-none" />
          </div>
        )}

        {/* =========================================================================
            LAYER 20: MIDGROUND CONTAINER TERMINAL YARD
            ========================================================================= */}
        {midAsset && (
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: `translate3d(${midPointerX}px, ${midY + midPointerY}px, 0px) scale(${midScale})`,
              transformOrigin: midAsset.transformOrigin,
              opacity: 0.95,
            }}
          >
            <img
              src={midAsset.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-bottom filter contrast-[1.1] brightness-[0.95]"
            />
          </div>
        )}

        {/* =========================================================================
            LAYER 30: HERO CARRIER (EURO 5 HEAVY TRANSPORT)
            ========================================================================= */}
        {heroAsset && (
          <div
            className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center"
            style={{
              transform: `translate3d(${heroX + heroPointerX}px, ${heroY + heroPointerY}px, 0px) scale(${heroScale})`,
              transformOrigin: heroAsset.transformOrigin,
              opacity: heroOpacity,
              transition: reducedMotion ? 'none' : 'opacity 0.2s linear',
            }}
          >
            <div className="relative w-full max-w-6xl h-[85vh] flex items-end justify-center">
              <img
                src={heroAsset.src}
                alt="کشنده پیشتاز آسانا لجستیک در کریدور ترانزیت"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.85)] filter contrast-[1.08] saturate-[1.05]"
              />
              {/* Ground contact shadow */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-black/60 blur-2xl rounded-full pointer-events-none" />
            </div>
          </div>
        )}

        {/* =========================================================================
            LAYER 40 & 41: FOREGROUND CONTAINER OCCLUDER PORTAL (SPLIT EFFECT)
            ========================================================================= */}
        {fgProgress < 1 && fgLeftAsset && (
          <div
            className="absolute top-0 bottom-0 left-0 w-[42vw] max-w-[620px] pointer-events-none z-20 origin-left"
            style={{
              transform: `translate3d(${fgTranslateLeft}%, 0px, 0px) scale(${fgScale})`,
              opacity: fgOpacity,
              display: fgOpacity <= 0.01 ? 'none' : 'block',
            }}
          >
            <div className="relative w-full h-full overflow-hidden shadow-[20px_0_60px_rgba(0,0,0,0.9)]">
              <img
                src={fgLeftAsset.src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-left filter brightness-[0.75] contrast-[1.25]"
              />
              {/* Subtle edge metallic rim highlight */}
              <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-[#FF6B35]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            </div>
          </div>
        )}

        {fgProgress < 1 && fgRightAsset && (
          <div
            className="absolute top-0 bottom-0 right-0 w-[42vw] max-w-[620px] pointer-events-none z-20 origin-right"
            style={{
              transform: `translate3d(${fgTranslateRight}%, 0px, 0px) scale(${fgScale})`,
              opacity: fgOpacity,
              display: fgOpacity <= 0.01 ? 'none' : 'block',
            }}
          >
            <div className="relative w-full h-full overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.9)]">
              <img
                src={fgRightAsset.src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-right filter brightness-[0.75] contrast-[1.25] scale-x-[-1]"
              />
              {/* Subtle edge metallic rim highlight */}
              <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-[#FF6B35]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/30 to-transparent" />
            </div>
          </div>
        )}

        {/* Ambient Vignette & Cinema Letterbox Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(3,9,20,0.7)_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#030914]/90 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#030914]/95 via-[#030914]/60 to-transparent pointer-events-none" />
      </div>

      {/* Semantic Content Slot (Narrative text, Catalog, Controls) */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-30">
        {children}
      </div>
    </div>
  );
};
