import { useEffect, useRef } from 'react';

type ParallaxItem = {
  currentX: number;
  currentY: number;
  depth: number;
  ease: number;
  element: HTMLElement;
  xDirection: number;
  yDirection: number;
};

const asNumber = (element: HTMLElement, property: string, fallback: number) => {
  const value = Number.parseFloat(element.style.getPropertyValue(property));
  return Number.isFinite(value) ? value : fallback;
};

export function useOrnamentsParallax(activeIndex: number) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!viewport || !canHover || reduceMotion) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let bounds: DOMRect | null = null;
    let items: ParallaxItem[] = [];

    const collect = () => {
      const activeSlide = viewport.querySelector<HTMLElement>(
        `.ornament-slide[data-index="${activeIndex}"]`,
      );
      items = activeSlide
        ? [...activeSlide.querySelectorAll<HTMLElement>('.fl')].map((element) => ({
            element,
            depth: asNumber(element, '--d', 1),
            xDirection: asNumber(element, '--parallax-x', 1),
            yDirection: asNumber(element, '--parallax-y', 1),
            ease: asNumber(element, '--parallax-ease', 0.08),
            currentX: 0,
            currentY: 0,
          }))
        : [];
    };

    const draw = () => {
      let moving = false;

      items.forEach((item) => {
        const expectedX = targetX * item.xDirection * item.depth;
        const expectedY = targetY * item.yDirection * item.depth;
        item.currentX += (expectedX - item.currentX) * item.ease;
        item.currentY += (expectedY - item.currentY) * item.ease;
        item.element.style.translate = `${item.currentX.toFixed(2)}px ${item.currentY.toFixed(2)}px`;

        if (Math.abs(expectedX - item.currentX) + Math.abs(expectedY - item.currentY) > 0.05) {
          moving = true;
        }
      });

      frame = moving ? window.requestAnimationFrame(draw) : 0;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const onPointerEnter = () => {
      bounds = viewport.getBoundingClientRect();
      collect();
    };

    const onPointerMove = (event: PointerEvent) => {
      bounds ??= viewport.getBoundingClientRect();
      if (!items.length) collect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * -30;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -30;
      schedule();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };

    const onResize = () => {
      bounds = null;
    };

    viewport.addEventListener('pointerenter', onPointerEnter);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerleave', reset);
    window.addEventListener('resize', onResize);

    return () => {
      viewport.removeEventListener('pointerenter', onPointerEnter);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerleave', reset);
      window.removeEventListener('resize', onResize);
      if (frame) window.cancelAnimationFrame(frame);
      items.forEach((item) => {
        item.element.style.translate = '';
      });
    };
  }, [activeIndex]);

  return viewportRef;
}
