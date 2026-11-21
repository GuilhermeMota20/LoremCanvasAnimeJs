import { Header } from '@/features/portfolio-experience/components/Header/Header';
import { Ornaments } from '@/features/portfolio-experience/components/Ornaments/Ornaments';
import { ProjectOverlay } from '@/features/portfolio-experience/components/ProjectOverlay/ProjectOverlay';
import {
  AboutSlide,
  ContactSlide,
  HeroSlide,
  ProjectsSlide,
} from '@/features/portfolio-experience/components/Slides/Slides';
import { portfolio } from '@/features/portfolio-experience/data/portfolio';
import { usePortfolioNavigation } from '@/features/portfolio-experience/hooks/usePortfolioNavigation';
import { useExperienceMotion } from '@/features/portfolio-experience/hooks/useExperienceMotion';
import { useOrnamentsParallax } from '@/features/portfolio-experience/hooks/useOrnamentsParallax';
import { useProjectOverlay } from '@/features/portfolio-experience/hooks/useProjectOverlay';
import './styles/ExperienceLayout.css';
import './PortfolioExperience.css';

export function PortfolioExperience() {
  const overlay = useProjectOverlay();
  const navigation = usePortfolioNavigation(overlay.close);
  const viewportRef = useOrnamentsParallax(navigation.active);
  useExperienceMotion(viewportRef, navigation.active);

  return (
    <main className="panel">
      <Header active={navigation.active} go={navigation.go} />
      <div
        className="viewport"
        ref={viewportRef}
        onTouchStart={(event) => navigation.onTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => navigation.onTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className="track" style={{ transform: `translateX(-${navigation.active * 100}%)` }}>
          <HeroSlide go={navigation.go} />
          <ProjectsSlide
            open={overlay.open}
            preview={overlay.preview}
            hidePreview={overlay.hidePreview}
          />
          <AboutSlide />
          <ContactSlide go={navigation.go} />
        </div>
        <div
          className="ornament-track"
          style={{ transform: `translateX(-${navigation.active * 100}%)` }}
        >
          {portfolio.navigation.map((page, index) => (
            <div className="ornament-slide" data-index={index} key={page.id}>
              <Ornaments index={index} />
            </div>
          ))}
        </div>
        <div className={navigation.locked ? 'wipe is-active' : 'wipe'} aria-hidden="true">
          <div className="wipe__bar wipe__bar--gold" />
          <div className="wipe__bar wipe__bar--ink">
            <span className="wipe__label">{portfolio.navigation[navigation.active].japanese}</span>
            <span className="wipe__sub">{portfolio.navigation[navigation.active].name}</span>
          </div>
          <div className="wipe__bar wipe__bar--cream" />
        </div>
      </div>
      <ProjectOverlay
        project={overlay.project}
        mode={overlay.mode}
        anchor={overlay.anchor}
        close={overlay.close}
        cancelHide={overlay.cancelHide}
      />
    </main>
  );
}
