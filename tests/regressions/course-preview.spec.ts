import { expect, test } from '@playwright/test';

const previewTitle = 'Designing products people understand.';

// Headless Chromium hides scrollbars unless this default flag is removed.
test.use({ launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

test('opens complete local course details without downloading another script', async ({
  page,
  context,
}) => {
  const scriptRequests: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'script') scriptRequests.push(request.url());
  });
  await context.setOffline(true);

  await page.getByRole('button', { name: 'Explore Product Design', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: previewTitle });
  await expect(dialog).toContainText('8 lessons');
  await expect(dialog).toContainText('Maya Chen · Senior Product Designer');
  await expect(dialog).toContainText('Understanding people and their needs');
  await expect(dialog.getByRole('link', { name: 'Ask about this course' })).toBeVisible();
  await expect(dialog.getByRole('status')).toHaveCount(0);
  expect(scriptRequests).toEqual([]);
});

test('dismisses during opening motion and navigates from another preview after closing', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const trigger = page.getByRole('button', { name: 'Explore Product Design', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: previewTitle });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();

  await page.getByRole('button', { name: 'Explore Technology', exact: true }).click();
  const technology = page.getByRole('dialog', {
    name: 'Understand the tools shaping digital products.',
  });
  await expect(technology).toContainText('Choosing tools thoughtfully');
  await technology.getByRole('link', { name: 'Ask about this course' }).click();
  await expect(technology).not.toBeVisible();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('heading', { name: 'Get in touch', exact: true })).toBeInViewport();
});

test('keeps inside clicks open and restores focus and scrolling after a backdrop click', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const trigger = page.getByRole('button', { name: 'Explore Product Design', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: previewTitle });
  await dialog.getByText('Understanding people and their needs', { exact: true }).click();
  await expect(dialog).toBeVisible();

  await page.mouse.click(8, 8);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).overflowY))
    .not.toBe('hidden');
});

test('respects reduced motion and returns focus when closed with its button', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const trigger = page.getByRole('button', { name: 'Explore Product Design', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: previewTitle });
  await expect(dialog).toContainText('8 lessons');
  expect(
    await dialog.evaluate((element) =>
      element
        .getAnimations({ subtree: true })
        .some((animation) => animation.playState === 'running'),
    ),
  ).toBe(false);

  await dialog.getByRole('button', { name: 'Close course preview' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('keeps the background layout stable when the dialog hides a conventional scrollbar', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ content: 'html::-webkit-scrollbar { width: 16px; }' });
  await page.evaluate(() => document.fonts.ready);
  const gutter = await page.evaluate(() => innerWidth - document.documentElement.clientWidth);
  expect(
    gutter,
    'The browser must reserve scrollbar space to exercise the layout shift',
  ).toBeGreaterThan(0);

  const readLayout = () =>
    page
      .locator('header#home, .header-content, .hero-grid, #courses > .site-container')
      .evaluateAll((elements) =>
        elements.map((element) => {
          const { x, width } = element.getBoundingClientRect();
          return { x, width };
        }),
      );
  const before = await readLayout();
  expect(before).toHaveLength(4);

  const trigger = page.getByRole('button', { name: 'Explore Product Design', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: previewTitle });
  await expect(dialog).toBeVisible();
  expect(await readLayout()).toEqual(before);

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await readLayout()).toEqual(before);
});
