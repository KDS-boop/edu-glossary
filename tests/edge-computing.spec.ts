import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

const articlePath = '/articles/edge-computing/';

test('Edge Computing article renders correctly and has a valid author profile', async ({ page, request }) => {
  const response = await page.goto(articlePath);
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Edge Computing: A Technical Overview');
  await expect(page.locator('.article-meta a[href="/authors/eduglossary-team/"]')).toBeVisible();
  await expect(page.locator('a[href="/authors/kds-boop/"]')).toHaveCount(0);
  await expect(page.locator('main img, article img').first()).toBeVisible();

  const authorResponse = await request.get('/authors/eduglossary-team/');
  expect(authorResponse.status()).toBe(200);
});

test('Edge Computing article has no horizontal page overflow', async ({ page }) => {
  await page.goto(articlePath);
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(dimensions.document, `Horizontal overflow: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport + 1);
});

test('Edge Computing comparison table is keyboard-focusable and labelled', async ({ page }) => {
  await page.goto(articlePath);
  const table = page.getByRole('table', { name: 'Comparison of edge computing and traditional cloud computing' });
  await expect(table).toBeVisible();
  await expect(table).toHaveAttribute('tabindex', '0');
  await table.focus();
  await expect(table).toBeFocused();
});

test('Edge Computing article has no serious or critical axe violations', async ({ page }) => {
  await page.goto(articlePath);
  const results = await new AxeBuilder({ page }).analyze();
  const severeViolations = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(severeViolations, JSON.stringify(severeViolations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(({ target }) => target) })), null, 2)).toEqual([]);
});
