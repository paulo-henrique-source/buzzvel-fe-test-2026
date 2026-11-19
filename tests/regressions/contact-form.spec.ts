import { expect, test } from '@playwright/test';

test.describe('contact form without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('keeps personal details out of native requests and the URL', async ({ page }) => {
    await page.goto('/');
    const form = page.getByRole('form', { name: 'Contact us' });
    const submit = form.getByRole('button', { name: 'Send message' });

    await expect(form.getByLabel('Full name')).toBeDisabled();
    await expect(form.getByLabel(/E-?mail/i, { exact: true })).toBeDisabled();
    await expect(form.getByLabel('Your question')).toBeDisabled();
    await expect(submit).toBeDisabled();
    const fallback = page.getByText('Please enable JavaScript to use this form');
    await expect(fallback).toBeVisible();
    await expect(fallback.getByRole('link', { name: 'contact@luma.com' })).toHaveAttribute(
      'href',
      'mailto:contact@luma.com',
    );

    const nativeSubmissions: string[] = [];
    page.on('request', (request) => {
      if (request.isNavigationRequest()) nativeSubmissions.push(request.url());
    });
    const originalUrl = page.url();
    await submit.click({ force: true });
    await page.waitForLoadState('networkidle');

    expect(page.url()).toBe(originalUrl);
    expect(nativeSubmissions).toEqual([]);
  });
});
