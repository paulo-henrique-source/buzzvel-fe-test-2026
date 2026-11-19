import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
});

test('presents every required section and resolves its internal links', async ({ page }) => {
  await expect(page).toHaveTitle('Luma — Build skills that move you forward');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Build skills that actually move you forward.',
  );
  for (const name of [
    'Learn something worth knowing.',
    'Designing products people understand.',
    'Less browsing. More learning.',
    'Meet international students & teachers',
    'Get in touch',
    'What will you learn next?',
  ]) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await expect(page.getByRole('contentinfo')).toContainText('© 2026 Luma Learning');
  const unresolvedLinks = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute('href') ?? '')
        .filter((href) => href.length < 2 || !document.getElementById(href.slice(1))),
    );
  expect(unresolvedLinks).toEqual([]);
});

test('adapts the hero order and keeps the page inside the viewport', async ({ page, viewport }) => {
  const title = await page.getByRole('heading', { level: 1 }).boundingBox();
  const image = await page
    .getByRole('img', { name: 'A learner working on her laptop in a bright creative studio' })
    .boundingBox();
  expect(title).not.toBeNull();
  expect(image).not.toBeNull();
  if (viewport && viewport.width < 1024) expect(image!.y + image!.height).toBeLessThan(title!.y);
  else expect(title!.x).toBeLessThan(image!.x);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('opens a course preview and returns focus to its trigger with Escape', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Explore Product Design', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Designing products people understand.' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('8 lessons');
  await page.keyboard.press('Tab');
  await expect(dialog.locator(':focus')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('the mobile menu supports keyboard dismissal and navigation', async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width >= 1024, 'The desktop layout uses inline navigation.');
  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'Community', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#community$/);
  await expect(
    page.getByRole('heading', { name: 'Meet international students & teachers' }),
  ).toBeInViewport();
});

test('invalid submissions explain the errors and focus the first invalid field', async ({
  page,
}) => {
  const form = page.getByRole('form', { name: 'Contact us' });
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByLabel('Full name')).toBeFocused();
  await expect(form.getByLabel('Full name')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByText('Please enter a valid email address.')).toBeVisible();
  await form.getByLabel('Full name').fill('Alex Morgan');
  await form.getByLabel(/E-?mail/i, { exact: true }).fill('invalid@');
  await form.getByLabel('Your question').fill('I would like to learn more about this course.');
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByLabel(/E-?mail/i, { exact: true })).toBeFocused();
});

test('valid submissions show progress, prevent duplicate sends and reset the form', async ({
  page,
}) => {
  const form = page.getByRole('form', { name: 'Contact us' });
  await form.getByLabel('Full name').fill('Alex Morgan');
  await form.getByLabel(/E-?mail/i, { exact: true }).fill('alex@example.com');
  await form.getByLabel('Your question').fill('I would like to learn more about this course.');
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByRole('button', { name: 'Sending message…' })).toBeDisabled();
  await expect(form.getByRole('status')).toContainText('Demo complete.');
  await expect(form.getByLabel('Full name')).toHaveValue('');
  await expect(form.getByLabel(/E-?mail/i, { exact: true })).toHaveValue('');
  await expect(form.getByRole('button', { name: 'Send message' })).toBeEnabled();
});

test('has no WCAG A/AA violations or inconclusive contrast checks', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(results.incomplete.filter(({ id }) => id === 'color-contrast')).toEqual([]);
});

test('the course preview has no automatically detectable accessibility violations', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'Explore Product Design', exact: true }).click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
