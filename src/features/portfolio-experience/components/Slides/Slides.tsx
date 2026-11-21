import * as React from 'react';
import { MediaFallback } from '@/features/portfolio-experience/components/MediaFallback';
import type { PortfolioProject } from '@/features/portfolio-experience/data/portfolio';
import { portfolio } from '@/features/portfolio-experience/data/portfolio';
import './Slides.css';
export function HeroSlide({ go }: { go: (index: number) => void }) {
  return (
    <section className="slide slide--hero">
      <div className="hero">
        <div className="hero__text">
          <h1 className="hero__title">
            <span className="line">
              <span className="word">Lorem</span> <span className="word">Ipsum</span>
            </span>
            <span className="line">
              <span className="word">Dolor</span> <span className="word">Sit</span>
            </span>
            <span className="line">
              <span className="word">Amet!</span>
            </span>
          </h1>
          <p className="hero__sub">
            Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore.
          </p>
          <div className="hero__cta">
            <button className="pill-btn pill-btn--dark" onClick={() => go(1)}>
              Ver galeria
            </button>
            <button className="pill-btn" onClick={() => go(3)}>
              Lorem ipsum
            </button>
          </div>
        </div>
        <div className="hero__visual">
          <button className="badge" onClick={() => go(1)} aria-label="Ver projetos">
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
                  Lorem ipsum · Dolor sit amet · Consectetur ·
                </textPath>
              </text>
            </svg>
            <span className="badge__core">
              <i>★</i>
              <b>
                VER
                <br />
                GALERIA
              </b>
              <i>★</i>
            </span>
          </button>
          <figure className="frame">
            <div className="frame__inner">
              <div className="frame__img">
                <MediaFallback variant="hero" label="Lorem ipsum dolor sit amet" />
              </div>
              <aside className="frame__bar">
                <span className="star">★</span>
                <span className="star">★</span>
                <button className="frame__arrow" onClick={() => go(1)} aria-label="Ver projetos">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </aside>
            </div>
          </figure>
        </div>
      </div>
      <Marquee />
    </section>
  );
}
function Marquee() {
  const items = ['Lorem', 'Ipsum', 'Dolor', 'Sit amet', 'Consectetur', 'Adipiscing', 'Elit'];

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
  open,
  preview,
  hidePreview,
}: {
  open: (project: PortfolioProject) => void;
  preview: (project: PortfolioProject, element: HTMLElement) => void;
  hidePreview: () => void;
}) {
  return (
    <section className="slide">
      <div className="section">
        <div className="section__head">
          <span className="ep">02</span>
          <h2>Galeria</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="grid">
          {portfolio.projects.map((project) => (
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
              <span className="client__hint">Ver mais</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AboutSlide() {
  return (
    <section className="slide">
      <div className="section about">
        <div className="section__head">
          <span className="ep">03</span>
          <h2>Lorem ipsum</h2>
        </div>
        <div className="about__body">
          <figure className="about__photo">
            <MediaFallback variant="about" label="Lorem ipsum dolor sit amet" />
            <figcaption className="about__sticker">
              <span className="dot" /> Lorem ipsum
            </figcaption>
          </figure>
          <div className="about__content">
            <div className="card card--cream about__card">
              <p className="about__lead">
                Lorem ipsum <strong>dolor sit amet</strong>, consectetur adipiscing elit.
              </p>
              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <ul className="about__points">
                <li>
                  <b>★</b>
                  <span>
                    <strong>Lorem ipsum</strong>, dolor sit amet consectetur.
                  </span>
                </li>
                <li>
                  <b>★</b>
                  <span>
                    <strong>Dolor sit amet</strong>, adipiscing elit sed do eiusmod.
                  </span>
                </li>
                <li>
                  <b>★</b>
                  <span>
                    <strong>Consectetur elit</strong>, tempor incididunt ut labore.
                  </span>
                </li>
              </ul>
            </div>
            <div className="stack-box">
              <h3>Stack</h3>
              <ul className="stack">
                {portfolio.featuredStack.map((item) => (
                  <li className="is-main" key={item}>
                    {item}
                  </li>
                ))}
                {portfolio.stack.map((item) => (
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
export function ContactSlide({ go }: { go: (index: number) => void }) {
  return (
    <section className="slide slide--center">
      <div className="section contact">
        <div className="card card--gold">
          <span className="card__tab">04</span>
          <span className="card__dots">•••</span>
          <h2>Lorem ipsum dolor sit amet?</h2>
          <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
          <div className="contact__links">
            <button className="pill-btn pill-btn--dark" type="button">
              Lorem ipsum
            </button>
            <button className="pill-btn" type="button">
              Dolor sit amet
            </button>
            <button className="pill-btn" onClick={() => go(0)}>
              Voltar ao início
            </button>
          </div>
        </div>
        <footer className="footer">Feito por Guilherme Mota</footer>
      </div>
    </section>
  );
}
