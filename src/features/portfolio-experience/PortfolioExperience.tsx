import { useEffect } from 'react';
import { Header } from '@/features/portfolio-experience/components/Header/Header';
import { Ornaments } from '@/features/portfolio-experience/components/Ornaments/Ornaments';
import { ProjectOverlay } from '@/features/portfolio-experience/components/ProjectOverlay/ProjectOverlay';
import {
  AboutSlide,
  ContactSlide,
  HeroSlide,
  ProjectsSlide,
} from '@/features/portfolio-experience/components/Slides/Slides';
import { usePortfolioNavigation } from '@/features/portfolio-experience/hooks/usePortfolioNavigation';
import { usePortfolioContent } from '@/features/portfolio-experience/hooks/usePortfolioContent';
import { useExperienceMotion } from '@/features/portfolio-experience/hooks/useExperienceMotion';
import { useOrnamentsParallax } from '@/features/portfolio-experience/hooks/useOrnamentsParallax';
import { useProjectOverlay } from '@/features/portfolio-experience/hooks/useProjectOverlay';
import './styles/ExperienceLayout.css';
import './PortfolioExperience.css';

export function PortfolioExperience() {
  const content = usePortfolioContent();
  const overlay = useProjectOverlay();
  const navigation = usePortfolioNavigation(overlay.close);
  const viewportRef = useOrnamentsParallax(navigation.active);
  useExperienceMotion(viewportRef, navigation.active, navigation.direction);

  useEffect(() => {
    document.title = content.meta.productName;
  }, [content.meta.productName]);

  return (
    <main className="panel min-h-[calc(100svh-28px)] overflow-hidden rounded-(--radius) bg-cream text-ink">
      <Header active={navigation.active} content={content.header} go={navigation.go} />
      <div
        className="viewport relative flex-1"
        ref={viewportRef}
        onTouchStart={(event) => navigation.onTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => navigation.onTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className="track">
          <HeroSlide content={content} go={navigation.go} />
          <ProjectsSlide
            content={content}
            open={overlay.open}
            preview={overlay.preview}
            hidePreview={overlay.hidePreview}
          />
          <AboutSlide content={content.about} />
          <ContactSlide content={content.contact} go={navigation.go} />
        </div>
        <div className="ornament-track">
          {content.header.navigation.map((page, index) => (
            <div className="ornament-slide" data-index={index} key={page.id}>
              <Ornaments index={index} />
            </div>
          ))}
        </div>
        <div className={navigation.locked ? 'wipe is-active' : 'wipe'} aria-hidden="true">
          <div className="wipe__bar wipe__bar--gold" />
          <div className="wipe__bar wipe__bar--ink">
            <span className="wipe__label">
              {content.header.navigation[navigation.active].number}
            </span>
            <span className="wipe__sub">{content.header.navigation[navigation.active].name}</span>
          </div>
          <div className="wipe__bar wipe__bar--cream" />
        </div>
      </div>
      <ProjectOverlay
        project={overlay.project}
        content={content.overlay}
        mode={overlay.mode}
        anchor={overlay.anchor}
        close={overlay.close}
        cancelHide={overlay.cancelHide}
      />
    </main>
  );
}
