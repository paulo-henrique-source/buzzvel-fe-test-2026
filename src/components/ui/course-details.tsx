'use client';

import { findCourse } from '@/src/data/courses';
import { buttonClassName } from './button-link';

type CourseDetailsProps = {
  courseId: string;
  descriptionId: string;
  onEnroll: () => void;
};

export function CourseDetails({ courseId, descriptionId, onEnroll }: CourseDetailsProps) {
  const course = findCourse(courseId);

  if (!course) {
    return (
      <p id={descriptionId} className="text-muted leading-relaxed">
        This course preview is unavailable. Please contact us for more information.
      </p>
    );
  }

  return (
    <>
      <p id={descriptionId} className="text-muted leading-relaxed">
        {course.description}
      </p>
      {course.instructor && <p className="mt-5 font-medium">with {course.instructor}</p>}
      {course.lessons && (
        <ul
          className="course-facts mt-6 flex flex-wrap gap-3 text-sm/[20px] text-brand [&_li]:rounded-lg [&_li]:border [&_li]:border-current [&_li]:px-3 [&_li]:py-2"
          aria-label="Course information"
        >
          <li>{course.lessons} lessons</li>
          <li>{course.duration}</li>
          <li>{course.level}</li>
        </ul>
      )}
      <h3 className="mt-8 font-heading text-lg font-semibold">What you can explore</h3>
      <ul className="mt-4 grid list-disc gap-3 pl-5 text-muted">
        {course.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <a href="#contact" className={buttonClassName('primary', 'mt-8 w-full')} onClick={onEnroll}>
        Ask about this course
      </a>
    </>
  );
}
