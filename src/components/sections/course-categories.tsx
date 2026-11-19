import { categories } from '@/src/data/courses';
import { Container } from '@/src/components/ui/container';
import { CoursePreview } from '@/src/components/ui/course-preview';
import { SectionHeading } from '@/src/components/ui/section-heading';

export function CourseCategories() {
  return (
    <section
      id="courses"
      className="section-spacing py-[60px] lg:py-[100px]"
      aria-labelledby="categories-title"
    >
      <Container>
        <SectionHeading
          id="categories-title"
          eyebrow="Find your next skill"
          title="Learn something worth knowing."
          description="Short, practical courses designed around skills you can put to work immediately."
          className="categories-heading max-w-[720px] lg:max-w-[560px]"
        />
        <ul className="category-grid mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="category-card relative flex min-h-[227.19px] min-w-0 flex-col items-start rounded-2xl border border-line p-6 lg:min-h-[264.5px] lg:p-7 [&>.text-link]:mt-4 [&>.text-link]:min-h-6"
            >
              <span
                className="category-number inline-flex min-h-6 items-center rounded-[5px] bg-lavender px-2 py-[2px] text-[12px] leading-[1.5] font-semibold tracking-[1.2px] text-brand-hover"
                aria-hidden="true"
              >
                {category.number}
              </span>
              <h3 className="mt-5 font-heading text-[20px]/[28px] font-bold tracking-[-0.5px] lg:leading-8">
                {category.title}
              </h3>
              <p className="mt-3 grow text-sm/[24px] text-muted lg:min-h-[72px]">
                {category.description}
              </p>
              <CoursePreview
                courseId={category.course.id}
                category={category.course.category}
                title={category.course.title}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
