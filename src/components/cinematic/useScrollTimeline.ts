import { useState, useEffect, useRef, useCallback } from 'react';
import { CINEMATIC_BEATS } from './manifest';

export interface UseScrollTimelineOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  totalHeightMultiplier?: number;
}

export function useScrollTimeline(options: UseScrollTimelineOptions) {
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const rawProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Calculate current active beat based on progress
  useEffect(() => {
    let currentBeat = 0;
    for (let i = CINEMATIC_BEATS.length - 1; i >= 0; i--) {
      if (smoothProgress >= CINEMATIC_BEATS[i].pStart) {
        currentBeat = i;
        break;
      }
    }
    setActiveBeatIndex(currentBeat);
  }, [smoothProgress]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const el = options.containerRef.current;
      if (!el) {
        // Fallback to window scroll
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        const raw = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
        rawProgressRef.current = raw;
        setProgress(raw);
        return;
      }

      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const raw = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      rawProgressRef.current = raw;
      setProgress(raw);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [options.containerRef]);

  // Smooth lerp animation loop (60-120fps)
  useEffect(() => {
    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      const target = rawProgressRef.current;
      if (reducedMotion) {
        smoothProgressRef.current = target;
        setSmoothProgress(target);
      } else {
        // Linear interpolation with damping
        const delta = target - smoothProgressRef.current;
        if (Math.abs(delta) < 0.0002) {
          smoothProgressRef.current = target;
        } else {
          smoothProgressRef.current += delta * 0.12; // buttery responsive lerp
        }
        setSmoothProgress(smoothProgressRef.current);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [reducedMotion]);

  // Programmatic scroll to specific normalized progress [0, 1]
  const scrollToProgress = useCallback(
    (targetProgress: number, behavior: ScrollBehavior = 'smooth') => {
      const el = options.containerRef.current;
      const clamped = Math.min(Math.max(targetProgress, 0), 1);

      if (el) {
        const totalScrollable = el.offsetHeight - window.innerHeight;
        const targetScrollTop = el.offsetTop + clamped * totalScrollable;
        window.scrollTo({
          top: targetScrollTop,
          behavior: reducedMotion ? 'auto' : behavior,
        });
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: clamped * maxScroll,
          behavior: reducedMotion ? 'auto' : behavior,
        });
      }
    },
    [options.containerRef, reducedMotion]
  );

  // Jump to specific beat
  const jumpToBeat = useCallback(
    (index: number) => {
      if (index >= 0 && index < CINEMATIC_BEATS.length) {
        const target = CINEMATIC_BEATS[index].pHold || CINEMATIC_BEATS[index].pStart;
        scrollToProgress(target);
      }
    },
    [scrollToProgress]
  );

  // Subtle ambient sonic soundscape generator (Web Audio API)
  const toggleAudio = useCallback(() => {
    if (isAudioEnabled) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.3);
        setTimeout(() => {
          setIsAudioEnabled(false);
        }, 300);
      } else {
        setIsAudioEnabled(false);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A1 deep hum

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, ctx.currentTime); // Harmonic A2

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2); // Calm non-intrusive volume

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      gainNodeRef.current = gain;
      setIsAudioEnabled(true);
    } catch {
      // AudioContext unavailable or blocked
      setIsAudioEnabled(false);
    }
  }, [isAudioEnabled]);

  // Keyboard navigation listener (ArrowUp, ArrowDown, PageUp, PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (e.altKey || e.metaKey) return;
        const nextBeat = Math.min(activeBeatIndex + 1, CINEMATIC_BEATS.length - 1);
        if (nextBeat !== activeBeatIndex) {
          e.preventDefault();
          jumpToBeat(nextBeat);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (e.altKey || e.metaKey) return;
        const prevBeat = Math.max(activeBeatIndex - 1, 0);
        if (prevBeat !== activeBeatIndex) {
          e.preventDefault();
          jumpToBeat(prevBeat);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToProgress(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToProgress(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBeatIndex, jumpToBeat, scrollToProgress]);

  return {
    progress,
    smoothProgress,
    activeBeatIndex,
    reducedMotion,
    setReducedMotion,
    isAudioEnabled,
    toggleAudio,
    scrollToProgress,
    jumpToBeat,
  };
}
