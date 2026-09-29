import React from 'react';
import { Volume2, VolumeX, Eye, ArrowRight, Compass, ShieldAlert } from 'lucide-react';
import { CINEMATIC_BEATS } from './manifest';

interface CinematicControlsProps {
  progress: number;
  activeBeatIndex: number;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  onJumpToBeat: (index: number) => void;
  onExitCinematic: () => void;
}

export const CinematicControls: React.FC<CinematicControlsProps> = ({
  progress,
  activeBeatIndex,
  reducedMotion,
  onToggleReducedMotion,
  isAudioEnabled,
  onToggleAudio,
  onJumpToBeat,
  onExitCinematic,
}) => {
  const percent = Math.round(progress * 100);

  return (
    <>
      {/* =======================================================================
          TOP BAR NAVIGATION
          ======================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={onExitCinematic}
            className="flex items-center gap-2 group cursor-pointer text-white"
            title="بازگشت به پرتال سازمانی آسانا لجستیک"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A2540] to-[#1E3A8A] border border-[#FF6B35]/40 flex items-center justify-center shadow-md group-hover:border-[#FF6B35] transition-colors">
              <span className="text-white font-black text-sm">آ</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                آسانا لجستیک
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              </span>
              <span className="block text-[10px] text-slate-300 font-mono tracking-wider -mt-0.5">
                ASANA LOG • 2.5D CORRIDOR
              </span>
            </div>
          </button>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Reduced Motion Toggle */}
          <button
            type="button"
            onClick={onToggleReducedMotion}
            aria-pressed={reducedMotion}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
              reducedMotion
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                : 'bg-white/10 hover:bg-white/20 border-white/15 text-slate-200'
            }`}
            title={reducedMotion ? 'حرکت کاهش‌یافته فعال است' : 'کاهش انیمیشن و حرکت'}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {reducedMotion ? 'حرکت آرام' : 'کاهش حرکت'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            aria-pressed={isAudioEnabled}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
              isAudioEnabled
                ? 'bg-[#FF6B35]/20 border-[#FF6B35]/60 text-[#FF8A50]'
                : 'bg-white/10 hover:bg-white/20 border-white/15 text-slate-200'
            }`}
            title={isAudioEnabled ? 'قطع صدای محیطی' : 'پخش صدای اتمسفریک محیط'}
          >
            {isAudioEnabled ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#FF6B35]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span className="hidden md:inline">
              {isAudioEnabled ? 'صدا روشن' : 'اتمسفر صوتی'}
            </span>
          </button>

          {/* Exit Back to Main Corporate Portal */}
          <button
            type="button"
            onClick={onExitCinematic}
            className="px-4 py-1.5 bg-white/15 hover:bg-white/25 active:bg-[#FF6B35] text-white border border-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <span>خروج به سایت</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* =======================================================================
          BOTTOM TIMELINE SCRUBBER & BEAT CHECKPOINTS
          ======================================================================= */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 sm:px-8 py-2.5 bg-gradient-to-t from-[#030914] via-[#030914]/90 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          {/* Checkpoint Indicators */}
          <div className="flex items-center justify-between text-[11px] mb-1.5 px-1 font-medium text-slate-300">
            {CINEMATIC_BEATS.map((beat, idx) => {
              const isActive = activeBeatIndex === idx;
              return (
                <button
                  key={beat.id}
                  type="button"
                  onClick={() => onJumpToBeat(idx)}
                  className={`flex items-center gap-1.5 transition-all cursor-pointer py-1 px-2 rounded-md ${
                    isActive
                      ? 'text-[#FF8A50] font-bold bg-white/10 scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span className="hidden sm:inline">{beat.name}</span>
                  <span className="sm:hidden">{idx + 1}</span>
                </button>
              );
            })}

            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span>پیشروی:</span>
              <span className="text-white font-bold">{percent}%</span>
            </div>
          </div>

          {/* Scrub Track */}
          <div className="relative w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-sky-500 via-[#FF6B35] to-amber-400 transition-all duration-75 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Quick Keyboard Hint */}
          <div className="hidden lg:flex items-center justify-center gap-2 mt-1 text-[10px] text-slate-400 font-light">
            <Compass className="w-3 h-3 text-[#FF6B35]" />
            <span>نکته: با اسکرول ماوس یا کلیدهای جهت‌نما (↑ و ↓) در طول کریدور ترانزیت سفر کنید.</span>
          </div>
        </div>
      </footer>
    </>
  );
};
