import { devices, expect, test, type Page } from '@playwright/test';

const destinations = [
  ['Courses', 'courses'],
  ['For Teams', 'contact'],
  ['Community', 'community'],
  ['About', 'how-it-works'],
  ['Log in', 'contact'],
  ['Start learning', 'courses'],
] as const;

async function expectSectionAligned(page: Page, id: string) {
  await expect(page).toHaveURL(new RegExp(`#${id}$`));
  await expect
    .poll(
      () =>
        page.locator(`#${id}`).evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
      { message: `Section ${id} should start at the top of the viewport` },
    )
    .toBeLessThanOrEqual(1);
  await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');
}

for (const layout of ['mobile', 'desktop'] as const) {
  test(`aligns ${layout} section links with the viewport in both scroll directions`, async ({
    browser,
    baseURL,
  }) => {
    for (const reducedMotion of ['reduce', 'no-preference'] as const) {
      const context = await browser.newContext({
        ...(layout === 'mobile' ? devices['Pixel 5'] : {}),
        viewport: layout === 'mobile' ? { width: 440, height: 956 } : { width: 1280, height: 900 },
        deviceScaleFactor: 1,
        baseURL,
        reducedMotion,
      });

      try {
        const page = await context.newPage();
        await page.goto('/');
        await page.evaluate(() => document.fonts.ready);
        const header = page.getByRole('banner');
        const menu = page.getByRole('dialog', { name: 'Navigation menu' });

        for (const [label, id] of destinations) {
          if (layout === 'mobile') {
            await header.getByRole('button', { name: 'Open navigation menu' }).click();
          }
          const container = layout === 'mobile' ? menu : header;
          await container.getByRole('link', { name: label, exact: true }).click();
          if (layout === 'mobile') {
            await expect(page.locator('#mobile-menu')).toHaveJSProperty('open', false);
          }
          await expectSectionAligned(page, id);
        }

        const categories = page
          .getByRole('contentinfo')
          .getByRole('link', { name: 'Categories', exact: true });
        await categories.scrollIntoViewIfNeeded();
        const beforeUpwardNavigation = await page.evaluate(() => window.scrollY);
        await categories.click();
        await expectSectionAligned(page, 'courses');
        expect(await page.evaluate(() => window.scrollY)).toBeLessThan(beforeUpwardNavigation);
      } finally {
        await context.close();
      }
    }
  });
}
