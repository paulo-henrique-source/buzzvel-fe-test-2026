import { OptimizedImage } from '@/src/components/ui/optimized-image';
import { learnerAvatars } from '@/src/data/page-content';

type AvatarGroupProps = { count?: 3 | 4; size?: 'small' | 'large' };

export function AvatarGroup({ count = 3, size = 'small' }: AvatarGroupProps) {
  const pixels = size === 'large' ? 40 : 32;
  const imageClassName =
    size === 'large'
      ? '-ml-2 size-10 rounded-full border-2 border-accent object-cover'
      : '-ml-2 size-8 rounded-full border-2 border-surface object-cover';

  return (
    <div
      className={`avatar-group avatar-group--${size} inline-flex shrink-0 items-center pl-2`}
      aria-hidden="true"
    >
      {learnerAvatars.slice(0, count).map((src) => (
        <OptimizedImage
          key={src}
          src={src}
          alt=""
          width={pixels}
          height={pixels}
          className={imageClassName}
        />
      ))}
    </div>
  );
}
