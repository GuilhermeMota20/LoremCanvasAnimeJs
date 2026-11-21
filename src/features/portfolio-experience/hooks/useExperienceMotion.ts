import { animate, stagger } from 'animejs';
import { useEffect, type RefObject } from 'react';

const motionTargets =
  '.section__head, .hero__text, .hero__visual, .client, .about__photo, .about__content, .contact__content';

export function useExperienceMotion(
  viewportRef: RefObject<HTMLDivElement | null>,
  activeIndex: number,
) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slide = viewportRef.current?.querySelector<HTMLElement>(
      `.track > .slide:nth-child(${activeIndex + 1})`,
    );
    const targets = slide ? [...slide.querySelectorAll<HTMLElement>(motionTargets)] : [];

    if (!targets.length) return;

    const entrance = animate(targets, {
      opacity: [0, 1],
      y: [24, 0],
      duration: 680,
      delay: stagger(70, { from: 'first' }),
      ease: 'out(4)',
    });

    return () => {
      entrance.revert();
    };
  }, [activeIndex, viewportRef]);
}
