import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { extendedFontFaces, fontClassName } from '@/src/lib/fonts';
import '@/src/styles/global.css';

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Luma — Build skills that move you forward',
  description:
    'Practical courses taught by people who do the work. Explore design, technology, business and creative skills, one focused lesson at a time.',
  applicationName: 'Luma Learning',
  icons: { icon: { url: '/icon.svg', type: 'image/svg+xml', sizes: '64x64' } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Luma Learning',
    title: 'Build skills that actually move you forward.',
    description: 'Learn at your own pace with practical, expert-led courses.',
  },
  twitter: { card: 'summary_large_image', title: 'Luma — Build skills that move you forward' },
};

export const viewport: Viewport = { themeColor: '#f9f8f3', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontClassName}>
      <head>
        <style>{extendedFontFaces}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
