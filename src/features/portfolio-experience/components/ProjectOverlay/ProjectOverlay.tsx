import type { PortfolioProject } from '@/features/portfolio-experience/data/portfolio';
import { MediaFallback } from '@/features/portfolio-experience/components/MediaFallback';
import './ProjectOverlay.css';
export function ProjectOverlay({
  project,
  close,
  mode,
  anchor,
  cancelHide,
}: {
  project: PortfolioProject | null;
  close: () => void;
  mode: 'preview' | 'sheet';
  anchor: DOMRect | null;
  cancelHide: () => void;
}) {
  if (!project) return null;
  const previewStyle = (() => {
    if (!anchor) return { opacity: 1 };
    const margin = 12;
    const gap = 18;
    const width = Math.min(420, window.innerWidth - margin * 2);
    const roomRight = window.innerWidth - anchor.right - gap - margin;
    const roomLeft = anchor.left - gap - margin;
    const left =
      roomRight >= width
        ? anchor.right + gap
        : roomLeft >= width
          ? anchor.left - gap - width
          : Math.max(
              margin,
              Math.min(
                anchor.left + anchor.width / 2 - width / 2,
                window.innerWidth - width - margin,
              ),
            );
    return {
      left,
      top: Math.max(
        margin,
        Math.min(anchor.top + anchor.height / 2 - 230, window.innerHeight - 500),
      ),
      width,
      opacity: 1,
    };
  })();
  return (
    <>
      {mode === 'sheet' && (
        <div className="pop-backdrop is-open" role="presentation" onClick={close} />
      )}
      <div
        className={`pop is-open ${mode === 'sheet' ? 'is-sheet' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes do projeto"
        style={previewStyle}
        onClick={(event) => event.stopPropagation()}
        onMouseEnter={cancelHide}
        onMouseLeave={mode === 'preview' ? close : undefined}
      >
        <button className="pop__close" onClick={close} aria-label="Fechar">
          ✕
        </button>
        <div className="pop__media">
          <div className="browser">
            <span className="browser__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="browser__url">
              {project.url?.replace(/^https?:\/\//, '') ?? 'lorem-ipsum.example'}
            </span>
          </div>
          <div className="shot shot--ph">
            <MediaFallback variant="project" label="Lorem ipsum dolor" />
          </div>
        </div>
        <div className="pop__body">
          <span className="pop__brand">{project.client}</span>
          <h3 className="pop__title">{project.title}</h3>
          <p className="pop__desc">{project.description}</p>
          <ul className="tags pop__tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.url ? (
            <a
              className="pill-btn pill-btn--dark pop__link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Visitar projeto ↗
            </a>
          ) : (
            <span className="pop__private">Lorem ipsum dolor sit amet.</span>
          )}
        </div>
      </div>
    </>
  );
}
