import { useCallback, useEffect, useRef, useState } from 'react';

const totalSlides = 4;
export type SlideDirection = 1 | -1;

export function usePortfolioNavigation(onChange?: () => void) {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const touchStart = useRef<number | null>(null);
  const transition = useRef(false);
  const go = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(totalSlides - 1, index));
      if (transition.current || next === active) return;
      transition.current = true;
      onChange?.();
      setDirection(next > active ? 1 : -1);
      setLocked(true);
      setActive(next);
      window.setTimeout(() => {
        setLocked(false);
        transition.current = false;
      }, 1_550);
    },
    [active, onChange],
  );
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') go(active + 1);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') go(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, go]);
  return {
    active,
    direction,
    locked,
    go,
    onTouchStart: (x: number) => {
      touchStart.current = x;
    },
    onTouchEnd: (x: number) => {
      if (touchStart.current === null) return;
      const delta = touchStart.current - x;
      if (Math.abs(delta) > 42) go(active + (delta > 0 ? 1 : -1));
      touchStart.current = null;
    },
  };
}
