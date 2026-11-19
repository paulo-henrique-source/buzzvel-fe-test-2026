import type { Preview } from '@storybook/nextjs-vite';
import { extendedFontFaces, fontClassName } from '@/src/lib/fonts';
import '@/src/styles/global.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: { appDirectory: true },
    controls: { expanded: true },
    a11y: { test: 'error' },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile · 402px',
          styles: { width: '402px', height: '874px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet · 768px',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop · 1280px',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
      },
    },
    options: { storySort: { order: ['Page', 'UI', 'Forms', 'Layout', 'Sections'] } },
  },
  decorators: [
    (Story) => (
      <div className={fontClassName} style={{ fontFamily: 'var(--font-inter), Arial, sans-serif' }}>
        <style>{extendedFontFaces}</style>
        <Story />
      </div>
    ),
  ],
};

export default preview;
