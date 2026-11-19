import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonLink } from '@/src/components/ui/button-link';

const meta = {
  title: 'UI/Button Link',
  component: ButtonLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Navigation links styled with the three button variants used on the landing page.',
      },
    },
  },
  args: {
    children: 'Explore courses',
    href: '#courses',
    variant: 'primary',
  },
  argTypes: {
    children: { control: 'text', description: 'The visible link label.' },
    href: { control: 'text', description: 'The navigation destination.' },
    variant: { control: 'select', options: ['primary', 'secondary', 'accent'] },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { children: 'See how it works', href: '#how-it-works', variant: 'secondary' },
};

export const Accent: Story = {
  args: { children: 'View course', href: '#featured-course', variant: 'accent' },
};

export const LongLabel: Story = {
  args: { children: 'Explore every course and find your next skill' },
  decorators: [
    (Story) => (
      <div style={{ width: 240, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
