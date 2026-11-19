import { expect, test } from '@playwright/test';

for (const desktopWidth of [1024, 1280]) {
  test(`closes the mobile menu and restores the page when resized to ${desktopWidth}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto('/');

    const trigger = page.getByRole('button', {
      name: 'Open navigation menu',
      includeHidden: true,
    });
    const dialog = page.locator('#mobile-menu');
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveJSProperty('open', true);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('html')).toHaveCSS('overflow-y', 'hidden');

    await page.setViewportSize({ width: desktopWidth, height: 900 });
    await expect(dialog).not.toBeVisible();
    await expect(dialog).toHaveJSProperty('open', false);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');

    const desktopLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Courses', exact: true });
    await desktopLink.focus();
    await expect(desktopLink).toBeFocused();
    await page.mouse.move(desktopWidth / 2, 600);
    await page.mouse.wheel(0, 400);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.setViewportSize({ width: 768, height: 900 });
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveJSProperty('open', true);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(dialog).toHaveJSProperty('open', false);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
    await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');
  });
}

test('keeps the menu modal until its exit finishes and restores focus after dismissal', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.addStyleTag({
    content: '.mobile-menu[data-state="closing"] { animation-play-state: paused; }',
  });

  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  const dialog = page.getByRole('dialog', { name: 'Navigation menu' });

  for (const dismissal of ['button', 'Escape', 'backdrop']) {
    await trigger.click();
    await expect(dialog).toBeVisible();

    if (dismissal === 'button') {
      await dialog.getByRole('button', { name: 'Close navigation menu' }).click();
    } else if (dismissal === 'Escape') {
      await page.keyboard.press('Escape');
    } else {
      await page.mouse.click(8, 80);
    }

    await expect(dialog).toHaveAttribute('data-state', 'closing');
    await expect(dialog).toHaveJSProperty('open', true);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('html')).toHaveCSS('overflow-y', 'hidden');
    await expect
      .poll(() =>
        dialog.evaluate((element) =>
          element.getAnimations().some((animation) => animation.playState === 'paused'),
        ),
      )
      .toBe(true);

    await dialog.evaluate((element) => {
      for (const animation of element.getAnimations()) animation.finish();
    });
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');
  }
});

test('opens and closes without motion when reduced motion is preferred', async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 874 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
  await expect(dialog).toBeVisible();
  expect(
    await dialog.evaluate((element) =>
      element.getAnimations().some((animation) => animation.playState === 'running'),
    ),
  ).toBe(false);

  await dialog.getByRole('button', { name: 'Close navigation menu' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');
});

test('closes before following section links even when exit motion would be paused', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.addStyleTag({
    content: '.mobile-menu[data-state="closing"] { animation-play-state: paused; }',
  });

  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
  await dialog.getByRole('link', { name: 'Community', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#community$/);
  await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');
  await expect(
    page.getByRole('heading', { name: 'Meet international students & teachers' }),
  ).toBeInViewport();
});

test('releases a closing menu immediately when entering the desktop layout', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.addStyleTag({
    content: '.mobile-menu[data-state="closing"] { animation-play-state: paused; }',
  });

  const trigger = page.getByRole('button', { name: 'Open navigation menu', includeHidden: true });
  const dialog = page.locator('#mobile-menu');
  await trigger.click();
  await dialog.getByRole('button', { name: 'Close navigation menu' }).click();
  await expect(dialog).toHaveAttribute('data-state', 'closing');
  await expect(dialog).toHaveJSProperty('open', true);

  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(dialog).toHaveJSProperty('open', false);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');

  await page.setViewportSize({ width: 768, height: 900 });
  await trigger.click();
  await expect(dialog).toHaveJSProperty('open', true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
