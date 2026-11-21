import type { CSSProperties } from 'react';
import './Ornaments.css';

type FloaterKind = 'bolt' | 'halftone' | 'sparkle' | 'sun';
type FloaterLayer = 'back' | 'front';

type Floater = {
  depth: number;
  desktopOnly?: boolean;
  kind: FloaterKind;
  layer: FloaterLayer;
  mobileX?: number;
  mobileY?: number;
  rotation?: number;
  size: number;
  x: number;
  y: number;
};

// Coordenadas, tamanhos e camadas extraídos da composição do portfólio original.
const FLOATERS: readonly (readonly Floater[])[] = [
  [
    { kind: 'sparkle', x: 52, y: 44, size: 26, layer: 'front', depth: 1.3, desktopOnly: true },
    { kind: 'sparkle', x: 42, y: 90, size: 36, layer: 'front', depth: 0.9, desktopOnly: true },
    { kind: 'halftone', x: 28, y: 4, size: 288, layer: 'back', depth: 0.3, desktopOnly: true },
    { kind: 'halftone', x: 82, y: 4, size: 432, layer: 'back', depth: 0.4 },
    {
      kind: 'sparkle',
      x: 46,
      y: 12,
      mobileX: 88,
      mobileY: 7,
      size: 77,
      layer: 'front',
      depth: 1.2,
    },
    { kind: 'sparkle', x: 40, y: 5, size: 31, layer: 'front', depth: 0.8, desktopOnly: true },
    {
      kind: 'bolt',
      x: 97,
      y: 38,
      size: 55,
      layer: 'front',
      depth: 1,
      rotation: 12,
      desktopOnly: true,
    },
  ],
  [
    { kind: 'sparkle', x: 3, y: 30, size: 36, layer: 'front', depth: 1, desktopOnly: true },
    { kind: 'sun', x: 92, y: 88, size: 456, layer: 'back', depth: 0.3 },
    { kind: 'halftone', x: -2, y: 62, size: 312, layer: 'back', depth: 0.4 },
    { kind: 'sparkle', x: 33, y: 9, size: 58, layer: 'front', depth: 1.2 },
    { kind: 'sparkle', x: 72, y: 13, size: 29, layer: 'front', depth: 0.9, desktopOnly: true },
    {
      kind: 'bolt',
      x: 97,
      y: 34,
      size: 48,
      layer: 'front',
      depth: 1,
      rotation: -10,
      desktopOnly: true,
    },
  ],
  [
    { kind: 'sparkle', x: 46, y: 96, size: 41, layer: 'front', depth: 1, desktopOnly: true },
    { kind: 'halftone', x: 4, y: 78, size: 384, layer: 'back', depth: 0.4 },
    { kind: 'sun', x: 96, y: 92, size: 312, layer: 'back', depth: 0.3, desktopOnly: true },
    { kind: 'sparkle', x: 34, y: 18, size: 67, layer: 'front', depth: 1.1 },
    { kind: 'sparkle', x: 97, y: 58, size: 34, layer: 'front', depth: 0.9, desktopOnly: true },
  ],
  [
    { kind: 'sparkle', x: 30, y: 10, size: 34, layer: 'front', depth: 1, desktopOnly: true },
    { kind: 'sun', x: 84, y: 16, size: 408, layer: 'back', depth: 0.3 },
    { kind: 'halftone', x: 8, y: 84, size: 312, layer: 'back', depth: 0.4 },
    { kind: 'sparkle', x: 93, y: 72, size: 72, layer: 'front', depth: 1.1 },
    {
      kind: 'bolt',
      x: 4,
      y: 58,
      size: 48,
      layer: 'front',
      depth: 1,
      rotation: 14,
      desktopOnly: true,
    },
  ],
];

const PARALLAX = [
  [0.94, 0.72, 0.08],
  [-0.32, 1.08, 0.06],
  [0.78, -0.54, 0.1],
  [-0.82, -0.38, 0.05],
  [0.48, -0.92, 0.09],
  [-1.06, 0.44, 0.07],
  [0.36, 0.98, 0.11],
] as const;

function Sparkle() {
  return (
    <svg viewBox="-4 -4 108 108" aria-hidden="true">
      <path d="M50 0C54 34 66 46 100 50C66 54 54 66 50 100C46 66 34 54 0 50C34 46 46 34 50 0Z" />
    </svg>
  );
}

function Bolt() {
  return (
    <svg viewBox="-4 -4 72 108" aria-hidden="true">
      <path d="M40 0 4 58h24l-10 42 46-64H38L50 0Z" />
    </svg>
  );
}

function Sun({ id }: { id: string }) {
  const maskId = `sun-mask-${id}`;

  return (
    <svg viewBox="-3 -3 106 106" aria-hidden="true">
      <mask id={maskId}>
        <rect width="100" height="100" fill="var(--on-ink)" />
        <rect x="0" y="56" width="100" height="3" fill="var(--mask-solid)" />
        <rect x="0" y="64" width="100" height="4" fill="var(--mask-solid)" />
        <rect x="0" y="73" width="100" height="5" fill="var(--mask-solid)" />
        <rect x="0" y="83" width="100" height="6" fill="var(--mask-solid)" />
      </mask>
      <circle cx="50" cy="50" r="48" mask={`url(#${maskId})`} />
      <circle className="fl__sun-outline" cx="50" cy="50" r="48" />
    </svg>
  );
}

function FloaterGraphic({ kind, id }: { kind: FloaterKind; id: string }) {
  if (kind === 'halftone') return <span className="fl__halftone" />;
  if (kind === 'sparkle') return <Sparkle />;
  if (kind === 'bolt') return <Bolt />;
  return <Sun id={id} />;
}

function floaterStyle(floater: Floater, ordinal: number): CSSProperties {
  const [dx, dy, ease] = PARALLAX[ordinal % PARALLAX.length];
  const drift = ((ordinal * 17) % 24) - 12;

  return {
    '--x': `${floater.x}%`,
    '--y': `${floater.y}%`,
    '--mx': `${floater.mobileX ?? floater.x}%`,
    '--my': `${floater.mobileY ?? floater.y}%`,
    '--s': `${floater.size}px`,
    '--d': floater.depth,
    '--r': `${floater.rotation ?? 0}deg`,
    '--parallax-x': dx,
    '--parallax-y': dy,
    '--parallax-ease': ease,
    '--x1': `${drift}px`,
    '--y1': `${-8 + ((ordinal * 7) % 16)}px`,
    '--x2': `${-drift * 0.7}px`,
    '--y2': `${6 - ((ordinal * 11) % 13)}px`,
    '--x3': `${drift * 0.45}px`,
    '--y3': `${-4 + ((ordinal * 5) % 9)}px`,
    '--r1': `${-7 + ((ordinal * 3) % 14)}deg`,
    '--r2': `${-6 + ((ordinal * 5) % 12)}deg`,
    '--r3': `${-5 + ((ordinal * 7) % 10)}deg`,
    '--bob-d': `${5 + ((ordinal * 13) % 6)}s`,
    '--bob-dl': `${-(ordinal % 8)}s`,
    '--tw-d': `${0.7 + (ordinal % 5) * 0.2}s`,
  } as CSSProperties;
}

export function Ornaments({ index }: { index: number }) {
  const floaters = FLOATERS[index] ?? [];

  return (
    <div className="ornaments loops" aria-hidden="true">
      {(['back', 'front'] as const).map((layer) => (
        <div className={`floaters floaters--${layer}`} key={layer}>
          {floaters.map((floater, ordinal) => {
            if (floater.layer !== layer) return null;

            const id = `${index}-${ordinal}`;
            const classes = ['fl', `fl--${floater.kind}`, floater.desktopOnly ? 'fl--desk' : '']
              .filter(Boolean)
              .join(' ');

            return (
              <span className={classes} key={id} style={floaterStyle(floater, ordinal)}>
                <span className="fl__in">
                  <FloaterGraphic kind={floater.kind} id={id} />
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
