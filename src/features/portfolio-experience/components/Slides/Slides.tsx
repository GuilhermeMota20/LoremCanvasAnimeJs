import * as React from 'react';
import { MediaFallback } from '@/features/portfolio-experience/components/MediaFallback';
import type {
  PortfolioContent,
  PortfolioProject,
} from '@/features/portfolio-experience/data/portfolio';
import './Slides.css';

export function HeroSlide({
  content,
  go,
}: {
  content: PortfolioContent;
  go: (index: number) => void;
}) {
  const { hero } = content;

  return (
    <section className="slide slide--hero">
      <div className="hero">
        <div className="hero__text">
          <h1 className="hero__title">
            {hero.title.map((line) => (
              <span className="line" key={line.join('-')}>
                {line.map((word, index) => (
                  <React.Fragment key={word}>
                    {index > 0 && ' '}
                    <span className="word">{word}</span>
                  </React.Fragment>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero__sub">
            {hero.description.before}
            <strong>{hero.description.emphasis}</strong>
            {hero.description.after}
          </p>
          <div className="hero__cta">
            <button className="pill-btn pill-btn--dark" onClick={() => go(1)}>
              {hero.galleryLabel}
            </button>
            <button className="pill-btn" onClick={() => go(3)}>
              {hero.contactLabel}
            </button>
          </div>
        </div>
        <div className="hero__visual">
          <button className="badge" onClick={() => go(1)} aria-label={hero.projectsLabel}>
            <svg className="badge__ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path
                  id="badge-circle"
                  d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="488">
                  {' '}
                  {content.marquee.join(' · ')} ·
                </textPath>
              </text>
            </svg>
            <span className="badge__core">
              <i>★</i>
              <b>{hero.badgeLabel}</b>
              <i>★</i>
            </span>
          </button>
          <figure className="frame">
            <div className="frame__inner">
              <div className="frame__img">
                <MediaFallback
                  imageUrl={hero.media.imageUrl}
                  variant="hero"
                  label={hero.media.alt}
                />
              </div>
              <aside className="frame__bar">
                <span className="star">★</span>
                <span className="star">★</span>
                <button
                  className="frame__arrow"
                  onClick={() => go(1)}
                  aria-label={hero.projectsLabel}
                >
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </aside>
            </div>
          </figure>
        </div>
      </div>
      <Marquee items={content.marquee} />
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div
        className="marquee__track"
        style={{ '--marquee-shift': '16.6666667%' } as React.CSSProperties}
      >
        {Array.from({ length: 6 }, (_, groupIndex) => (
          <div className="marquee__group" key={groupIndex}>
            {items.map((item) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                <i>★</i>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSlide({
  content,
  open,
  preview,
  hidePreview,
}: {
  content: PortfolioContent;
  open: (project: PortfolioProject) => void;
  preview: (project: PortfolioProject, element: HTMLElement) => void;
  hidePreview: () => void;
}) {
  const { gallery, projects } = content;

  return (
    <section className="slide">
      <div className="section">
        <div className="section__head">
          <span className="ep">{gallery.eyebrow}</span>
          <h2>{gallery.title}</h2>
          <p>{gallery.description}</p>
        </div>
        <div className="grid">
          {projects.map((project) => (
            <button
              className="client"
              key={project.client}
              style={{ '--accent': project.color } as React.CSSProperties}
              onMouseEnter={(event) => preview(project, event.currentTarget)}
              onMouseLeave={hidePreview}
              onFocus={(event) => preview(project, event.currentTarget)}
              onBlur={hidePreview}
              onClick={() => open(project)}
            >
              <span className="client__cover">
                <i className="client__cover-icon fa-solid fa-window-maximize" aria-hidden="true" />
              </span>
              <span className="client__shade" />
              <span className="client__dots">•••</span>
              <strong className="client__logo">{project.client}</strong>
              <span className="client__hint">{gallery.viewMoreLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSlide({ content }: { content: PortfolioContent['about'] }) {
  return (
    <section className="slide">
      <div className="section about">
        <div className="section__head">
          <span className="ep">{content.eyebrow}</span>
          <h2>{content.title}</h2>
        </div>
        <div className="about__body">
          <figure className="about__photo">
            <MediaFallback
              imageUrl={content.media.imageUrl}
              variant="about"
              label={content.media.alt}
            />
            <figcaption className="about__sticker">
              <span className="dot" /> {content.stickerLabel}
            </figcaption>
          </figure>
          <div className="about__content">
            <div className="card card--cream about__card">
              <p className="about__lead">
                {content.lead.before}
                <strong>{content.lead.emphasis}</strong>
                {content.lead.after}
              </p>
              <p>{content.description}</p>
              <ul className="about__points">
                {content.points.map((point) => (
                  <li key={point.emphasis}>
                    <b>★</b>
                    <span>
                      <strong>{point.emphasis}</strong>
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="stack-box">
              <h3>{content.stackLabel}</h3>
              <ul className="stack">
                {content.featuredStack.map((item) => (
                  <li className="is-main" key={item}>
                    {item}
                  </li>
                ))}
                {content.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSlide({
  content,
  go,
}: {
  content: PortfolioContent['contact'];
  go: (index: number) => void;
}) {
  return (
    <section className="slide slide--center">
      <div className="section contact">
        <div className="card card--gold">
          <span className="card__tab">{content.eyebrow}</span>
          <span className="card__dots">•••</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <div className="contact__links">
            <ContactAction action={content.primaryAction} className="pill-btn pill-btn--dark" />
            <ContactAction action={content.secondaryAction} className="pill-btn" />
            <button className="pill-btn" onClick={() => go(0)}>
              {content.backToTopLabel}
            </button>
          </div>
        </div>
        <footer className="footer">{content.footerCredit}</footer>
      </div>
    </section>
  );
}

function ContactAction({
  action,
  className,
}: {
  action: PortfolioContent['contact']['primaryAction'];
  className: string;
}) {
  if (action.href) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noreferrer">
        {action.label}
      </a>
    );
  }

  return (
    <button className={className} type="button">
      {action.label}
    </button>
  );
}
