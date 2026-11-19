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
