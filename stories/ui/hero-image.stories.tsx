import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroImage } from '@/src/components/ui/hero-image';
import { HeroBackdrop } from '@/src/components/ui/hero-backdrop';

const meta = {
  title: 'UI/Hero Image',
  component: HeroImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The landing page’s responsive AVIF/WebP picture, with its original alternative text and reserved display ratio.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 48, maxWidth: 596, marginInline: 'auto' }}>
        <div className="hero-visual relative isolate order-[-1] mx-auto aspect-[173/190] w-[calc(100%-16px)] max-w-[500px] sm:aspect-[25/26] lg:order-none lg:m-0 lg:w-full">
          <HeroBackdrop />
          <div className="hero-photo absolute inset-0 overflow-hidden rounded-[20px] lg:rounded-3xl">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof HeroImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
