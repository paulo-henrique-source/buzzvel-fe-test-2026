export type Course = {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly topics: readonly string[];
  readonly instructor?: string;
  readonly lessons?: number;
  readonly duration?: string;
  readonly level?: string;
};

export type CourseCategory = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly course: Course;
};

export const featuredCourse = {
  id: 'product-design',
  category: 'Product Design',
  title: 'Designing products people understand.',
  description:
    'Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.',
  instructor: 'Maya Chen · Senior Product Designer',
  lessons: 8,
  duration: '2h 40min',
  level: 'Intermediate',
  topics: [
    'Understanding people and their needs',
    'Structuring complex workflows',
    'Designing thoughtful interactions',
  ],
} as const satisfies Course;

export const categories = [
  {
    id: 'product-design',
    number: '01',
    title: 'Product Design',
    description: 'Turn complex problems into clear, useful experiences.',
    course: featuredCourse,
  },
  {
    id: 'technology',
    number: '02',
    title: 'Technology',
    description: 'Build a stronger understanding of the tools shaping digital products.',
    course: {
      id: 'technology',
      category: 'Technology',
      title: 'Understand the tools shaping digital products.',
      description: 'Build a stronger understanding of the tools shaping digital products.',
      topics: [
        'How digital products work',
        'Choosing tools thoughtfully',
        'Connecting ideas with practical skills',
      ],
    },
  },
  {
    id: 'business',
    number: '03',
    title: 'Business',
    description: 'Develop practical skills for better decisions and stronger teams.',
    course: {
      id: 'business',
      category: 'Business',
      title: 'Make better decisions. Build stronger teams.',
      description: 'Develop practical skills for better decisions and stronger teams.',
      topics: [
        'Making informed decisions',
        'Communicating with your team',
        'Putting new knowledge into practice',
      ],
    },
  },
  {
    id: 'creative',
    number: '04',
    title: 'Creative',
    description: 'Explore new ways to communicate, create and tell stories.',
    course: {
      id: 'creative',
      category: 'Creative',
      title: 'Find new ways to tell your story.',
      description: 'Explore new ways to communicate, create and tell stories.',
      topics: [
        'Finding your creative direction',
        'Communicating ideas clearly',
        'Developing a creative practice',
      ],
    },
  },
] as const satisfies readonly CourseCategory[];

export function findCourse(courseId: string): Course | undefined {
  return categories.find((category) => category.course.id === courseId)?.course;
}
