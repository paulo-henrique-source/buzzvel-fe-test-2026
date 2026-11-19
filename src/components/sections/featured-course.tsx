import { OptimizedImage } from '@/src/components/ui/optimized-image';
import { featuredCourse } from '@/src/data/courses';
import { Container } from '@/src/components/ui/container';
import { CoursePreview } from '@/src/components/ui/course-preview';
import { ArrowRightIcon } from '@/src/components/ui/icons';
import { textLinkClassName } from '@/src/components/ui/button-link';
import { eyebrowClassName, sectionTitleClassName } from '@/src/components/ui/section-heading';

export function FeaturedCourse() {
  return (
    <section
      id="featured-course"
      className="featured-section section-spacing bg-brand py-[60px] text-white lg:py-[100px] [&_:focus-visible]:outline-accent"
      aria-labelledby="featured-title"
    >
      <Container className="featured-grid grid items-center gap-9 lg:grid-cols-[1.03fr_1fr] lg:gap-[60px]">
        <div className="featured-visual relative min-w-0">
          <div className="featured-photo relative aspect-[362/280] overflow-hidden rounded-2xl lg:aspect-[538/408]">
            <OptimizedImage
              src="/images/featured-course.webp"
              alt="Hands-on product design work with materials, sketches and prototypes"
              fill
              quality={90}
              sizes="(min-width: 1200px) 538px, (min-width: 1024px) 45vw, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <span className="featured-badge absolute -top-3 -left-3 rounded bg-accent px-3 py-[6px] text-xs/[16px] font-semibold tracking-[1.2px] text-ink uppercase">
            Featured course
          </span>
        </div>
        <div className="featured-copy [&>.eyebrow]:text-white">
          <p className={eyebrowClassName}>Most popular this month</p>
          <h2 id="featured-title" className={sectionTitleClassName}>
            {featuredCourse.title}
          </h2>
          <p className="featured-description mt-5 text-sm/[24px] lg:text-[16px]/[28px]">
            {featuredCourse.description}
          </p>
          <p className="featured-instructor mt-6 text-sm/[24px] lg:text-[16px]/[28px]">
            with {featuredCourse.instructor}
          </p>
          <ul
            className="course-facts mt-6 flex flex-wrap gap-3 text-sm/[20px] [&>li]:rounded-lg [&>li]:border [&>li]:border-current [&>li]:px-3 [&>li]:py-2"
            aria-label="Course information"
          >
            <li>{featuredCourse.lessons} lessons</li>
            <li>{featuredCourse.duration}</li>
            <li>{featuredCourse.level}</li>
          </ul>
          <div className="featured-actions mt-8 grid gap-3 lg:flex lg:items-center [&>.text-link]:min-h-[50px] [&>.text-link]:justify-center lg:[&>.text-link]:gap-2 lg:[&>.text-link]:px-4 lg:[&>.text-link]:py-[14px] lg:[&>.text-link]:leading-6">
            <CoursePreview
              courseId={featuredCourse.id}
              category={featuredCourse.category}
              title={featuredCourse.title}
              label="View course"
              variant="accent"
            />
            <a href="#courses" className={textLinkClassName}>
              Browse all courses
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
