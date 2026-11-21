import { useCallback, useEffect, useRef, useState } from 'react';

const totalSlides = 4;
export function usePortfolioNavigation(onChange?: () => void) {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const touchStart = useRef<number | null>(null);
  const transition = useRef(false);
  const go = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(totalSlides - 1, index));
      if (transition.current || next === active) return;
      transition.current = true;
      onChange?.();
      setLocked(true);
      window.setTimeout(() => setActive(next), 510);
      window.setTimeout(() => {
        setLocked(false);
        transition.current = false;
      }, 1150);
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
