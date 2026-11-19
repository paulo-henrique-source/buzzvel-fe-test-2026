import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ContactForm } from '@/src/components/sections/contact-form';

const meta = {
  title: 'Forms/Contact Form',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible contact form with client-side validation and a local submission simulation. No message is stored or emailed.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520, marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

async function fillContactForm(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByRole('textbox', { name: 'Full name' }), 'Alex Morgan');
  await userEvent.type(canvas.getByRole('textbox', { name: /E-?mail/i }), 'alex@example.com');
  await userEvent.type(
    canvas.getByRole('textbox', { name: 'Your question' }),
    'I would like to learn more about the product design course.',
  );
}

export const Empty: Story = {};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));

    await expect(canvas.getByText('Please enter your name (at least 2 characters).')).toBeVisible();
    await expect(canvas.getByText('Please enter a valid email address.')).toBeVisible();
    await expect(
      canvas.getByText('Please tell us a little more (at least 10 characters).'),
    ).toBeVisible();
    await expect(canvas.getByRole('textbox', { name: 'Full name' })).toHaveFocus();
    await expect(canvas.getByRole('textbox', { name: 'Full name' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  },
};

export const Filled: Story = {
  play: async ({ canvasElement }) => {
    await fillContactForm(canvasElement);
    await expect(within(canvasElement).getByRole('textbox', { name: /E-?mail/i })).toHaveValue(
      'alex@example.com',
    );
  },
};

export const SuccessfulSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await fillContactForm(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));

    await expect(canvas.getByRole('button', { name: 'Sending message…' })).toBeDisabled();
    await expect(canvas.getByRole('form', { name: 'Contact us' })).toHaveAttribute(
      'aria-busy',
      'true',
    );
    const feedback = await canvas.findByText(
      'Demo complete. Your message was validated successfully; no email was sent.',
    );
    await waitFor(() => expect(feedback).toBeVisible());
    await expect(canvas.getByRole('textbox', { name: 'Full name' })).toHaveValue('');
    await expect(canvas.getByRole('textbox', { name: /E-?mail/i })).toHaveValue('');
    await expect(canvas.getByRole('textbox', { name: 'Your question' })).toHaveValue('');
    await expect(canvas.getByRole('button', { name: 'Send message' })).toBeEnabled();
  },
};
