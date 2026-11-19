import { preload } from 'react-dom';

const sizes =
  '(min-width: 1200px) 500px, (min-width: 1024px) 42vw, (min-width: 600px) 500px, calc(100vw - 56px)';

const sources = {
  avif: '/images/hero/learner-384.avif 384w, /images/hero/learner-640.avif 640w, /images/hero/learner-900.avif 900w',
  webp: '/images/hero/learner-384.webp 384w, /images/hero/learner-640.webp 640w, /images/hero/learner-900.webp 900w',
};

export function HeroImage() {
  preload('/images/hero/learner-640.avif', {
    as: 'image',
    type: 'image/avif',
    imageSrcSet: sources.avif,
    imageSizes: sizes,
    fetchPriority: 'high',
  });

  return (
    <picture>
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <img
        src="/images/hero/learner-900.webp"
        alt="A learner working on her laptop in a bright creative studio"
        width={900}
        height={1100}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="h-full w-full object-cover"
      />
    </picture>
  );
}
