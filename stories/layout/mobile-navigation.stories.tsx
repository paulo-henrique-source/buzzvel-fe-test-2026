import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { MobileNavigation } from '@/src/components/layout/mobile-navigation';

const meta = {
  title: 'Layout/Mobile Navigation',
  component: MobileNavigation,
  tags: ['autodocs'],
  globals: { viewport: { value: 'mobile', isRotated: false } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: 680 },
      description: {
        component:
          'Mobile navigation drawer using a native modal dialog. View at a mobile width; desktop navigation is a separate component.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 20,
          minHeight: 120,
          background: 'var(--color-surface)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MobileNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open navigation menu' });
    await userEvent.click(trigger);
    const dialog = await canvas.findByRole('dialog', { name: 'Navigation menu' });

    await expect(dialog).toBeVisible();
    await expect(
      within(dialog).getByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeVisible();
    await expect(within(dialog).getByRole('link', { name: 'Courses' })).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

export const CloseAndRestoreFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open navigation menu' });
    await userEvent.click(trigger);
    const dialog = await canvas.findByRole('dialog', { name: 'Navigation menu' });
    await userEvent.click(within(dialog).getByRole('button', { name: 'Close navigation menu' }));

    await waitFor(async () => {
      await expect(
        canvas.queryByRole('dialog', { name: 'Navigation menu' }),
      ).not.toBeInTheDocument();
      await expect(trigger).toHaveFocus();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  },
};
