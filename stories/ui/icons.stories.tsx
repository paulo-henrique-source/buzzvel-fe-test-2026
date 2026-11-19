import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  ArrowRightIcon,
  ClockIcon,
  CloseIcon,
  MenuIcon,
  MessageIcon,
  StarIcon,
} from '@/src/components/ui/icons';

const icons = [
  { label: 'Arrow right', Icon: ArrowRightIcon },
  { label: 'Menu', Icon: MenuIcon },
  { label: 'Close', Icon: CloseIcon },
  { label: 'Message', Icon: MessageIcon },
  { label: 'Clock', Icon: ClockIcon },
  { label: 'Star', Icon: StarIcon },
] as const;

function IconGallery({ color = 'var(--color-ink)' }: { color?: string }) {
  return (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        padding: 0,
        margin: 0,
        listStyle: 'none',
        color,
      }}
    >
      {icons.map(({ label, Icon }) => (
        <li key={label} style={{ display: 'grid', justifyItems: 'center', gap: 12, minWidth: 80 }}>
          <Icon width={24} height={24} />
          <span style={{ fontSize: 14 }}>{label}</span>
        </li>
      ))}
    </ul>
  );
}

const meta = {
  title: 'UI/Icons',
  component: IconGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The six decorative SVG icons used by the page. Icons inherit currentColor; accessible button names are provided by their parent controls.',
      },
    },
  },
  argTypes: { color: { control: 'color' } },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {};
