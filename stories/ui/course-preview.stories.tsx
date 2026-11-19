import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { CoursePreview } from '@/src/components/ui/course-preview';
import { categories, featuredCourse } from '@/src/data/courses';

const meta = {
  title: 'UI/Course Preview',
  component: CoursePreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      story: { inline: false, height: 640 },
      description: {
        component:
          'A course trigger and native dialog with immediate local content, keyboard dismissal and subtle opening and closing motion that respects reduced-motion preferences.',
      },
    },
  },
  argTypes: {
    courseId: { control: 'select', options: categories.map((category) => category.course.id) },
    variant: { control: 'select', options: ['text', 'primary', 'secondary', 'accent'] },
  },
  args: {
    courseId: featuredCourse.id,
    category: featuredCourse.category,
    title: featuredCourse.title,
    label: 'Explore',
    variant: 'text',
  },
} satisfies Meta<typeof CoursePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLink: Story = {};

export const Featured: Story = {
  args: { label: 'View course', variant: 'accent' },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: 'var(--color-brand)', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Explore Product Design' }));
    const dialog = await canvas.findByRole('dialog', { name: featuredCourse.title });

    await waitFor(async () => {
      await expect(within(dialog).getByText(featuredCourse.description)).toBeVisible();
    });
    await expect(
      within(dialog).getByRole('button', { name: 'Close course preview' }),
    ).toBeVisible();
    await expect(
      within(dialog).getByRole('link', { name: 'Ask about this course' }),
    ).toHaveAttribute('href', '#contact');
  },
};

export const UnavailableCourse: Story = {
  args: { courseId: 'unavailable-course', category: 'Course', title: 'Unavailable course' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Explore Course' }));
    const dialog = await canvas.findByRole('dialog', { name: 'Unavailable course' });

    await waitFor(async () => {
      await expect(
        within(dialog).getByText(
          'This course preview is unavailable. Please contact us for more information.',
        ),
      ).toBeVisible();
    });
    await expect(
      within(dialog).getByRole('button', { name: 'Close course preview' }),
    ).toBeVisible();
  },
};
