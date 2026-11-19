import type { CSSProperties } from 'react';
import { OptimizedImage } from '@/src/components/ui/optimized-image';
import { communityPhotos } from '@/src/data/page-content';
import { ButtonLink } from '@/src/components/ui/button-link';
import { Container } from '@/src/components/ui/container';
import { SectionHeading } from '@/src/components/ui/section-heading';

type CommunityPhoto = (typeof communityPhotos)[number];
type PhotoPlacementStyle = CSSProperties & Record<`--photo-${string}`, string>;

function getPhotoPlacement(photo: CommunityPhoto): PhotoPlacementStyle {
  return {
    '--photo-left': `${(photo.mobile.x / 362) * 100}%`,
    '--photo-top': `${(photo.mobile.y / 309.5) * 100}%`,
    '--photo-width': `${(photo.mobile.width / 362) * 100}%`,
    '--photo-height': `${(photo.mobile.height / 309.5) * 100}%`,
    '--photo-desktop-left': `${(photo.x / 530) * 100}%`,
    '--photo-desktop-top': `${(photo.y / 522.44) * 100}%`,
    '--photo-desktop-width': `${(photo.width / 530) * 100}%`,
    '--photo-desktop-height': `${(photo.height / 522.44) * 100}%`,
  };
}

function getPhotoSizes(photo: CommunityPhoto): string {
  // Portrait tiles crop landscape photos, so their uncropped image width can exceed the tile width.
  const mobileCoverWidth = Math.max(
    photo.mobile.width,
    photo.mobile.height * photo.sourceAspectRatio,
  );
  const desktopCoverWidth = Math.max(photo.width, photo.height * photo.sourceAspectRatio);
  const mobileScale = mobileCoverWidth / 362;
  const desktopScale = desktopCoverWidth / 530;

  // Collage widths: min(100vw - 40px, 530px), then min((100vw - 100px) / 2, 530px).
  return [
    `(min-width: 1024px) min(${desktopCoverWidth.toFixed(3)}px, calc(${(50 * desktopScale).toFixed(3)}vw - ${(50 * desktopScale).toFixed(3)}px))`,
    `min(${(530 * mobileScale).toFixed(3)}px, calc(${(100 * mobileScale).toFixed(3)}vw - ${(40 * mobileScale).toFixed(3)}px))`,
  ].join(', ');
}

export function CommunitySection() {
  return (
    <section
      id="community"
      className="community-section section-spacing bg-surface py-[60px] lg:py-[100px] [&_.community-link]:min-h-[54px] [&_.section-description]:mt-6 [&_.section-description]:text-ink [&_.section-title]:mt-2 lg:[&_.section-description]:mt-8 lg:[&_.section-description]:text-muted"
      aria-labelledby="community-title"
    >
      <Container className="community-grid grid items-center gap-8 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <SectionHeading
            id="community-title"
            eyebrow="The people"
            title="Meet international students & teachers"
            description="Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer."
          />
          <ButtonLink href="#contact" variant="secondary" className="community-link mt-6 lg:mt-8">
            Explore teachers and students
          </ButtonLink>
        </div>
        <div
          className="community-collage relative mx-auto aspect-[362/309.5] w-full max-w-[530px] lg:aspect-[530/522.44]"
          role="img"
          aria-label="A collage of students and teachers studying, collaborating and sharing their work"
        >
          <div className="collage-circle absolute top-[calc(50%+0.3px)] left-1/2 aspect-square w-[calc(330/362*100%)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-lavender lg:w-[calc(500/530*100%)]" />
          {communityPhotos.map((photo) => (
            <div
              key={photo.id}
              className="collage-photo absolute top-(--photo-top) left-(--photo-left) h-(--photo-height) w-(--photo-width) overflow-hidden rounded-[4px] shadow-collage lg:top-(--photo-desktop-top) lg:left-(--photo-desktop-left) lg:h-(--photo-desktop-height) lg:w-(--photo-desktop-width)"
              style={getPhotoPlacement(photo)}
            >
              <OptimizedImage
                src={photo.image}
                alt=""
                fill
                quality={90}
                sizes={getPhotoSizes(photo)}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
