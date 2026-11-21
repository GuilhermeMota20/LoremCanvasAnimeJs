import { useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { PortfolioContent } from '@/features/portfolio-experience/data/portfolio';
import './Header.css';

type Props = { active: number; content: PortfolioContent['header']; go: (index: number) => void };

export function Header({ active, content, go }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const sync = () => {
      const list = listRef.current;
      const link = linkRefs.current[active];
      if (list && link) setIndicator({ left: link.offsetLeft, width: link.offsetWidth });
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [active]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    go(index);
  };

  return (
    <header className="header">
      <a className="logo" href="#inicio" onClick={(event) => navigate(event, 0)}>
        {content.brand.primary}
        <span>{content.brand.accent}</span>
      </a>
      <nav className="notch" aria-label={content.navigationLabel}>
        <ul ref={listRef}>
          {content.navigation.map((link, index) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === index ? 'active' : ''}
                ref={(element) => {
                  linkRefs.current[index] = element;
                }}
                aria-current={active === index ? 'page' : undefined}
                onClick={(event) => navigate(event, index)}
              >
                <i className={`notch__ic fa-solid ${link.icon}`} aria-hidden="true" />
                <span>{link.name}</span>
              </a>
            </li>
          ))}
          <li className="notch__ind" style={{ left: indicator.left, width: indicator.width }} />
        </ul>
      </nav>
      <div className="header__right">
        <div className="pager">
          <button
            className="pager__btn"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label={content.previousLabel}
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </button>
          <span className="pager__dots">
            {content.navigation.map((link, index) => (
              <i className={active === index ? 'on' : ''} key={link.id} />
            ))}
          </span>
          <button
            className="pager__btn"
            onClick={() => go(active + 1)}
            disabled={active === content.navigation.length - 1}
            aria-label={content.nextLabel}
          >
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
        <button className="pill-btn pill-btn--li" type="button" onClick={() => go(3)}>
          <i className="li-ic fa-solid fa-envelope" aria-hidden="true" />
          <span className="lbl">{content.contactLabel}</span>
        </button>
      </div>
    </header>
  );
}
