import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HomePage from '@/src/app/page';

const meta = {
  title: 'Page/Luma Learning',
  component: HomePage,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The complete landing page using the original application components.',
      },
    },
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
