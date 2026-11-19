import { AvatarGroup } from '@/src/components/ui/avatar-group';
import { ButtonLink } from '@/src/components/ui/button-link';
import { Container } from '@/src/components/ui/container';
import { FinalCtaBackground } from './final-cta-background';

export function FinalCta() {
  return (
    <section
      id="start-learning"
      className="final-cta section-spacing relative isolate overflow-hidden bg-cta-background py-[60px] lg:py-[100px]"
      aria-labelledby="final-cta-title"
    >
      <FinalCtaBackground />
      <Container className="relative flex flex-col items-center text-center">
        <AvatarGroup count={4} size="large" />
        <h2
          id="final-cta-title"
          className="mt-8 max-w-[520px] font-heading text-[36px] leading-10 font-extrabold tracking-[-0.9px] sm:max-w-none lg:text-[56px] lg:leading-[62px] lg:tracking-[-1.4px]"
        >
          What will you learn next?
        </h2>
        <p className="mt-4 text-[16px] leading-6 text-muted lg:text-[18px] lg:leading-[27px]">
          Start with one course. Build from there.
        </p>
        <div className="final-cta-actions mt-10 grid w-full gap-3 sm:flex sm:w-auto [&_.button]:min-h-[52.5px]">
          <ButtonLink href="#courses">Explore all courses</ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Join Luma
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
