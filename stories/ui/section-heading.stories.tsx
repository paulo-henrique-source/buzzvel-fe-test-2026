import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeading } from '@/src/components/ui/section-heading';

const meta = {
  title: 'UI/Section Heading',
  component: SectionHeading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Section introductions with an eyebrow, heading and optional supporting copy.',
      },
    },
  },
  args: {
    id: 'heading-with-description',
    eyebrow: 'Find your next skill',
    title: 'Learn something worth knowing.',
    description: 'Short, practical courses designed around skills you can put to work immediately.',
  },
  argTypes: {
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    id: { control: 'text', description: 'The heading ID used by its section’s accessible label.' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDescription: Story = {};

export const WithoutDescription: Story = {
  args: {
    id: 'heading-without-description',
    eyebrow: 'Find your rhythm',
    title: 'Less browsing. More learning.',
    description: undefined,
  },
};

export const LongTitle: Story = {
  args: {
    id: 'heading-long-title',
    title: 'Build practical skills you can use in your next project and beyond.',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
