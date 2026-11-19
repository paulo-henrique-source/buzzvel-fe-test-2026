import { learningSteps } from '@/src/data/page-content';
import { Container } from '@/src/components/ui/container';
import { SectionHeading } from '@/src/components/ui/section-heading';

const stepShapes = {
  focus: {
    outer: 'rounded-full bg-lavender',
    inner: 'top-2 left-2 size-6 rounded-[6px] bg-brand',
  },
  experience: {
    outer: '[transform:rotate(12deg)] rounded-lg bg-peach',
    inner: 'right-1 bottom-1 size-7 rounded-full bg-orange',
  },
  practice: {
    outer: 'rounded-xl bg-cta-background',
    inner: 'bottom-2 left-2 size-5 rounded-full bg-step-accent',
  },
} as const;

const stepNumberClassName =
  'step-number mt-6 text-xs/[17px] font-semibold tracking-[1.4px] text-muted uppercase lg:leading-4';

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="how-section section-spacing bg-surface py-[60px] lg:py-[100px]"
      aria-labelledby="how-title"
    >
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How Luma works"
          title="Less browsing. More learning."
          className="text-center"
        />
        <ol className="steps-list mt-10 grid gap-[76px] lg:relative lg:mt-20 lg:grid-cols-3 lg:gap-20 lg:py-7">
          {learningSteps.map((step) => (
            <li key={step.id} className="learning-step relative">
              <span
                className={`step-shape relative block size-14 lg:[outline:8px_solid_var(--color-surface)] ${stepShapes[step.shape].outer}`}
                aria-hidden="true"
              >
                <span className={`absolute block ${stepShapes[step.shape].inner}`} />
              </span>
              <p className={`${stepNumberClassName} lg:hidden`}>Step {step.number}</p>
              {/* The desktop reference repeats 01; mobile uses sequential numbers. */}
              <p className={`${stepNumberClassName} hidden lg:block`}>Step 01</p>
              <h3 className="mt-2 font-heading text-[20px]/[30px] font-bold tracking-[-0.5px] lg:leading-8">
                {step.title}
              </h3>
              <p className="step-description mt-3 text-sm/[24px] text-muted lg:text-[16px]/[28px]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
