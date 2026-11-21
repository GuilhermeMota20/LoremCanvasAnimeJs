import './MediaFallback.css';

type MediaFallbackVariant = 'about' | 'hero' | 'project';

const iconByVariant: Record<MediaFallbackVariant, string> = {
  about: 'fa-user-astronaut',
  hero: 'fa-wand-magic-sparkles',
  project: 'fa-window-maximize',
};

export function MediaFallback({
  imageUrl,
  label,
  variant,
}: {
  imageUrl?: string;
  label?: string;
  variant: MediaFallbackVariant;
}) {
  return (
    <div className={`media-fallback media-fallback--${variant}`} role="img" aria-label={label}>
      {imageUrl && <img className="media-fallback__image" src={imageUrl} alt="" />}
      <span className="media-fallback__grid" aria-hidden="true" />
      <i className={`media-fallback__icon fa-solid ${iconByVariant[variant]}`} aria-hidden="true" />
      {label && <strong className="media-fallback__label">{label}</strong>}
      <span className="media-fallback__corner media-fallback__corner--top" aria-hidden="true" />
      <span className="media-fallback__corner media-fallback__corner--bottom" aria-hidden="true" />
    </div>
  );
}
