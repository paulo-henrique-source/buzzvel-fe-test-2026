import localFont from 'next/font/local';

const jakarta = localFont({
  src: '../../public/fonts/plus-jakarta-sans-core.woff2',
  variable: '--font-jakarta',
  display: 'swap',
  weight: '400 800',
  preload: false,
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0000-007F,U+00A9,U+00B7,U+2013-2014,U+2018-201D,U+2022,U+2026,U+20AC,U+2122,U+2212',
    },
  ],
});
const inter = localFont({
  src: '../../public/fonts/inter-core.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '400 700',
  preload: false,
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0000-007F,U+00A9,U+00B7,U+2013-2014,U+2018-201D,U+2022,U+2026,U+20AC,U+2122,U+2212',
    },
  ],
});

const extendedUnicodeRange =
  'U+0080-00A8,U+00AA-00B6,U+00B8-2012,U+2015-2017,U+201E-2021,U+2023-2025,U+2027-20AB,U+20AD-2121,U+2123-2211,U+2213-10FFFF';

export const extendedFontFaces = [
  { family: inter.style.fontFamily, src: '/fonts/inter.woff2', weight: '400 700' },
  { family: jakarta.style.fontFamily, src: '/fonts/plus-jakarta-sans.woff2', weight: '400 800' },
]
  .map(
    ({ family, src, weight }) => `@font-face {
      font-family: ${family.split(',')[0]};
      src: url('${src}') format('woff2');
      font-style: normal;
      font-weight: ${weight};
      font-display: swap;
      unicode-range: ${extendedUnicodeRange};
    }`,
  )
  .join('');

export const fontClassName = `${jakarta.variable} ${inter.variable}`;
