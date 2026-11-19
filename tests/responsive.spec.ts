import { expect, test } from '@playwright/test';

test('keeps content inside the viewport and clipping ancestors between breakpoints', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  for (const width of [
    320, 359, 360, 390, 402, 430, 639, 640, 767, 768, 1023, 1024, 1109, 1110, 1159, 1160, 1199,
    1200, 1235, 1236, 1279, 1280, 1440, 1920, 2560,
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    );
    const clippedContent = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const issues: string[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;

      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (
          !node.textContent?.trim() ||
          !parent?.checkVisibility() ||
          parent.closest(
            'script, style, .sr-only, .skip-link, dialog, nextjs-portal, [aria-hidden="true"]',
          )
        )
          continue;

        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (!rect.width || !rect.height) continue;
          if (rect.left < -1 || rect.right > viewportWidth + 1) {
            issues.push(`Outside viewport: ${node.textContent.trim()}`);
          }
          for (
            let ancestor: HTMLElement | null = parent;
            ancestor;
            ancestor = ancestor.parentElement
          ) {
            if (!['hidden', 'clip'].includes(getComputedStyle(ancestor).overflowX)) continue;
            const bounds = ancestor.getBoundingClientRect();
            if (rect.left < bounds.left - 1 || rect.right > bounds.right + 1) {
              issues.push(`Clipped by ${ancestor.tagName}: ${node.textContent.trim()}`);
              break;
            }
          }
        }
      }

      const rating = document.querySelector('.hero-rating')!.getBoundingClientRect();
      if (rating.left < 0 || rating.right > viewportWidth) issues.push('Rating badge is cut off');
      if (document.documentElement.scrollWidth > viewportWidth + 1)
        issues.push('Horizontal page overflow');
      return issues;
    });
    expect(clippedContent, `Content must stay readable at ${width}px`).toEqual([]);
  }
});

test('keeps the mobile menu and course actions reachable in a short landscape viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 667, height: 320 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const menu = page.getByRole('dialog', { name: 'Navigation menu' });
  await menu.getByRole('link', { name: 'Start learning' }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#courses$/);

  await page.getByRole('button', { name: 'Explore Product Design', exact: true }).click();
  const preview = page.getByRole('dialog', { name: 'Designing products people understand.' });
  await preview.getByRole('link', { name: 'Ask about this course' }).click();
  await expect(preview).not.toBeVisible();
  await expect(page).toHaveURL(/#contact$/);
});
