import { animate, stagger } from 'animejs';
import { useLayoutEffect, useRef, type RefObject } from 'react';
import type { SlideDirection } from './usePortfolioNavigation';

const motionTargets =
  '.section__head, .hero__text, .hero__visual, .client, .about__photo, .about__content, .contact__content';

const transitionTiming = {
  trackDelay: 180,
  trackDuration: 1_240,
  entranceDelay: 340,
  entranceDuration: 960,
} as const;

export function useExperienceMotion(
  viewportRef: RefObject<HTMLDivElement | null>,
  activeIndex: number,
  direction: SlideDirection,
) {
  const previousIndexRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slide = viewport.querySelector<HTMLElement>(
      `.track > .slide:nth-child(${activeIndex + 1})`,
    );
    const incomingTargets = slide ? [...slide.querySelectorAll<HTMLElement>(motionTargets)] : [];
    const track = viewport.querySelector<HTMLElement>('.track');
    const ornamentTrack = viewport.querySelector<HTMLElement>('.ornament-track');
    const previousIndex = previousIndexRef.current;
    const tracks = [track, ornamentTrack].filter(
      (element): element is HTMLElement => element !== null,
    );

    const placeTracks = (index: number) => {
      const offset = -index * viewport.clientWidth;
      tracks.forEach((element) => {
        element.style.transform = `translateX(${offset}px)`;
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      placeTracks(activeIndex);
      previousIndexRef.current = activeIndex;
      return;
    }

    // No modo Strict do React, o efeito de montagem é preparado, limpo e preparado
    // novamente. Como o índice não mudou, tratamos a segunda passagem como estreia,
    // nunca como uma transição do slide para ele mesmo.
    if (previousIndex === null || previousIndex === activeIndex) {
      placeTracks(activeIndex);
      previousIndexRef.current = activeIndex;
      if (!incomingTargets.length) return;

      const intro = animate(incomingTargets, {
        opacity: [0, 1],
        x: [direction * 90, 0],
        skewX: [-10 * direction, 0],
        duration: transitionTiming.entranceDuration,
        delay: stagger(70),
        ease: 'outExpo',
      });

      return () => intro.revert();
    }

    const outgoingSlide = viewport.querySelector<HTMLElement>(
      `.track > .slide:nth-child(${previousIndex + 1})`,
    );
    const outgoingTargets = outgoingSlide
      ? [...outgoingSlide.querySelectorAll<HTMLElement>(motionTargets)]
      : [];
    const startingOffset = -previousIndex * viewport.clientWidth;
    const endingOffset = -activeIndex * viewport.clientWidth;

    previousIndexRef.current = activeIndex;
    incomingTargets.forEach((target) => {
      target.style.opacity = '0';
    });

    const exit = animate(outgoingTargets, {
      opacity: [1, 0],
      x: [0, -70 * direction],
      skewX: [0, 8 * direction],
      duration: 440,
      delay: stagger(35),
      ease: 'inQuad',
    });
    const slideTransition = animate(tracks, {
      x: [startingOffset, endingOffset],
      duration: transitionTiming.trackDuration,
      delay: transitionTiming.trackDelay,
      ease: 'inOutExpo',
    });

    const enterTimeout = window.setTimeout(() => {
      animate(incomingTargets, {
        opacity: [0, 1],
        x: [direction * 90, 0],
        skewX: [-10 * direction, 0],
        duration: transitionTiming.entranceDuration,
        delay: stagger(70),
        ease: 'outExpo',
      });
      outgoingTargets.forEach((target) => {
        target.style.opacity = '';
        target.style.transform = '';
      });
    }, transitionTiming.entranceDelay);

    return () => {
      window.clearTimeout(enterTimeout);
      exit.revert();
      slideTransition.revert();
    };
  }, [activeIndex, direction, viewportRef]);
}
