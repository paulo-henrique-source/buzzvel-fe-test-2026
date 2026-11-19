import { AvatarGroup } from '@/src/components/ui/avatar-group';
import { ButtonLink } from '@/src/components/ui/button-link';
import { Container } from '@/src/components/ui/container';
import { HeroImage } from '@/src/components/ui/hero-image';
import { HeroBackdrop } from '@/src/components/ui/hero-backdrop';
import { StarIcon } from '@/src/components/ui/icons';
import { eyebrowClassName } from '@/src/components/ui/section-heading';

export function HeroSection() {
  return (
    <section
      className="hero-section overflow-clip bg-surface py-[60px] lg:py-[100px]"
      aria-labelledby="hero-title"
    >
      <Container className="hero-grid grid items-center gap-10 [--container-max-width:640px] lg:grid-cols-[1.12fr_1fr] lg:gap-[60px] lg:pr-[clamp(0px,calc((var(--content-max-width)-100vw)/2+60px),40px)] lg:[--container-max-width:var(--content-max-width)]">
        <div className="hero-copy min-w-0 lg:self-start">
          <p className={eyebrowClassName}>Learn at your own pace</p>
          <h1
            id="hero-title"
            className="mt-4 font-heading text-[40px] leading-[1.1] font-extrabold tracking-[-1px] lg:text-[clamp(48px,5vw,64px)] lg:leading-[1.09375] lg:tracking-[-1.6px] [@media(max-width:359px)]:text-[35px]"
          >
            Build skills that actually move you forward.
          </h1>
          <p className="hero-description mt-6 max-w-[500px] text-[16px]/[26px] text-muted lg:max-w-[480px] lg:text-[18px]/[28px]">
            Practical courses taught by people who do the work every day. Learn design, technology,
            business and more — one focused lesson at a time.
          </p>
          <div className="hero-actions mt-8 grid gap-3 sm:flex lg:[&_.button]:min-h-[54px]">
            <ButtonLink href="#courses">Explore courses</ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <div className="hero-trust mt-8 flex items-center justify-center gap-3 sm:justify-start [@media(max-width:359px)]:gap-2">
            <AvatarGroup />
            <p className="text-sm/[20px] text-muted [@media(max-width:359px)]:text-[12px]">
              <strong className="font-bold text-ink">Trusted by 24,000+</strong> learners
            </p>
          </div>
        </div>
        <div className="hero-visual relative isolate order-[-1] mx-auto aspect-[173/190] w-[calc(100%-16px)] max-w-[500px] sm:aspect-[25/26] lg:order-none lg:m-0 lg:w-full">
          <HeroBackdrop />
          <div className="hero-photo absolute inset-0 overflow-hidden rounded-[20px] lg:rounded-3xl">
            <HeroImage />
          </div>
          <div className="hero-course-badge absolute top-[6px] -left-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm/[20px] shadow-badge lg:top-4 lg:-left-[22px] [@media(max-width:359px)]:gap-2 [@media(max-width:359px)]:px-[10px] [@media(max-width:359px)]:text-[12px]">
            <strong className="rounded-lg bg-lavender px-[5px] py-[7px] text-[16px] font-bold text-brand-hover">
              120+
            </strong>
            <span>expert-led courses</span>
          </div>
          <div
            className="hero-rating absolute -right-[18px] bottom-[34px] flex items-center gap-3 rounded-xl bg-white px-4 py-[14px] text-sm/[20px] whitespace-nowrap shadow-badge lg:right-[clamp(-58px,calc((var(--content-max-width)-100vw)/2+var(--page-gutter)),0px)] lg:bottom-9 [@media(max-width:359px)]:gap-2 [@media(max-width:359px)]:px-[10px] [@media(max-width:359px)]:text-[12px]"
            role="img"
            aria-label="Rated 4.9 out of 5"
          >
            <span className="rating-stars flex gap-[3px] text-rating" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} />
              ))}
            </span>
            <span>4.9 avg rating</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
