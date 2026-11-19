import { OptimizedImage } from '@/src/components/ui/optimized-image';
import { metrics } from '@/src/data/page-content';
import { Container } from '@/src/components/ui/container';

export function TestimonialSection() {
  return (
    <section
      id="stories"
      className="section-spacing py-[60px] lg:py-[100px]"
      aria-labelledby="testimonial-title"
    >
      <h2 id="testimonial-title" className="sr-only">
        From our learners
      </h2>
      <Container className="testimonial-grid grid items-center gap-[60px] lg:grid-cols-[3fr_2fr] lg:gap-[120px]">
        <figure className="testimonial">
          <OptimizedImage
            src="/images/testimonial-quote.svg"
            alt=""
            width={24}
            height={22}
            className="quote-mark block"
          />
          <blockquote className="mt-4 font-heading text-[20px] leading-[32px] font-semibold tracking-normal lg:text-[30px] lg:leading-[44px] lg:tracking-[-0.75px]">
            <p>
              The lessons are short enough to fit into my week, but detailed enough that I actually
              leave with something I can use.
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <OptimizedImage
              src="/images/alex-morgan.webp"
              alt=""
              width={48}
              height={48}
              className="shrink-0 rounded-[50%] object-cover"
            />
            <div>
              <p className="testimonial-name text-[16px] leading-[26px] font-bold">Alex Morgan</p>
              <p className="testimonial-role text-[14px] leading-6 text-muted">Product Manager</p>
            </div>
          </figcaption>
        </figure>
        <dl className="metrics-list grid grid-cols-3 gap-0 lg:grid-cols-1 lg:gap-5 lg:border-l lg:border-line lg:pl-12 [@media(max-width:359px)]:gap-3">
          {metrics.map((metric) => (
            <div key={metric.value} className="metric flex min-w-0 flex-col">
              <dt className="mt-1 text-[14px] leading-6 text-muted lg:leading-[21px] [@media(max-width:359px)]:text-[12px] [@media(max-width:359px)]:leading-5">
                {metric.description}
              </dt>
              <dd className="-order-1 font-heading text-[clamp(29px,10vw,40px)] leading-[1.1] font-extrabold tracking-[-1px] text-brand lg:text-[64px] lg:leading-[70px] lg:tracking-[-1.6px]">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
