import type { CSSProperties } from 'react';

type Decoration = {
  name: string;
  source: readonly [x: number, y: number, width: number, height: number];
  placement: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-right';
};

const reference = { width: 1280, height: 469.5 };

// Regions of the original Figma SVG. Each ornament keeps its native shape as the viewport changes.
const decorations: readonly Decoration[] = [
  { name: 'large-ring', source: [0, 0, 160, 150], placement: 'top-left' },
  { name: 'outline-square', source: [300, 25, 110, 105], placement: 'top' },
  { name: 'upper-ring', source: [860, 30, 66, 60], placement: 'top' },
  { name: 'sun', source: [1000, 75, 90, 80], placement: 'top' },
  { name: 'upper-square', source: [1140, 0, 140, 120], placement: 'top-right' },
  { name: 'left-square', source: [0, 218, 48, 90], placement: 'top-left' },
  { name: 'speech-bubble', source: [130, 200, 55, 60], placement: 'top' },
  { name: 'cube', source: [1115, 215, 90, 90], placement: 'top' },
  { name: 'large-circle', source: [40, 360, 150, 140], placement: 'bottom' },
  { name: 'letter-b', source: [290, 365, 64, 90], placement: 'bottom' },
  { name: 'cassette', source: [950, 380, 80, 50], placement: 'bottom' },
  { name: 'lower-ring', source: [1190, 415, 66, 55], placement: 'bottom-right' },
  { name: 'clipped-circle', source: [1050, 460, 70, 50], placement: 'bottom' },
];

function decorationStyle({ source: [x, y, width, height], placement }: Decoration): CSSProperties {
  const style: CSSProperties = {
    width,
    height,
    backgroundPosition: `${-x}px ${-y}px`,
  };

  if (placement.endsWith('left')) {
    style.left = x;
  } else if (placement.endsWith('right')) {
    style.right = reference.width - x - width;
  } else {
    style.left = `${((x + width / 2) / reference.width) * 100}%`;
    style.transform = 'translateX(-50%)';
  }

  if (placement.startsWith('bottom')) {
    style.bottom = reference.height - y - height;
  } else {
    style.top = y;
  }

  return style;
}

export function FinalCtaBackground() {
  return (
    <div
      className="cta-decoration pointer-events-none absolute inset-0 -z-1 hidden lg:block"
      aria-hidden="true"
    >
      {decorations.map((decoration) => (
        <span
          key={decoration.name}
          className="cta-decoration-sprite absolute bg-[url('/images/final-cta-background.svg')] bg-no-repeat [background-size:1280px_470px]"
          style={decorationStyle(decoration)}
        />
      ))}
    </div>
  );
}
