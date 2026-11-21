import { useRef, useState } from 'react';
import type { PortfolioProject } from '@/features/portfolio-experience/data/portfolio';

type OverlayMode = 'preview' | 'sheet';

export function useProjectOverlay() {
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [mode, setMode] = useState<OverlayMode>('sheet');
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const hideTimer = useRef<number | null>(null);

  const clearHide = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
  };
  const preview = (next: PortfolioProject, element: HTMLElement) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    clearHide();
    setMode('preview');
    setAnchor(element.getBoundingClientRect());
    setProject(next);
  };
  const hidePreview = () => {
    clearHide();
    hideTimer.current = window.setTimeout(
      () => setProject((current) => (mode === 'preview' ? null : current)),
      160,
    );
  };
  const open = (next: PortfolioProject) => {
    clearHide();
    setMode('sheet');
    setAnchor(null);
    setProject(next);
  };
  const close = () => {
    clearHide();
    setProject(null);
  };

  return { project, mode, anchor, open, close, preview, hidePreview, cancelHide: clearHide };
}
