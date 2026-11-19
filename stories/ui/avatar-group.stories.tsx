import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AvatarGroup } from '@/src/components/ui/avatar-group';

const meta = {
  title: 'UI/Avatar Group',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Overlapping learner portraits. The group is decorative and hidden from assistive technology; meaningful learner information belongs in the accompanying text.',
      },
    },
  },
  args: { count: 3, size: 'small' },
  argTypes: {
    count: { control: 'inline-radio', options: [3, 4] },
    size: { control: 'inline-radio', options: ['small', 'large'] },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeSmall: Story = {};

export const FourSmall: Story = {
  args: { count: 4 },
};

export const ThreeLarge: Story = {
  args: { size: 'large' },
};

export const FourLarge: Story = {
  args: { count: 4, size: 'large' },
};
