// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Categories Deep Dive', () => {
  test('Browse Tablets Category', async ({ page }) => {
    // 1. Navigate to home page
    // Home page is displayed

    // 2. Click on Tablets category
    await page.getByRole('link', { name: 'TabletsCategory', exact: true }).click();

    // Tablets category page loads
    await page.getByRole('heading', { name: 'TABLETS', level: 3 }).waitFor({ state: 'visible' });

    // 3. Verify tablets are displayed
    // Multiple tablet products are visible
    const itemCount = page.locator('paragraph:has-text("ITEMS")').first();
    await itemCount.waitFor({ state: 'visible' });
  });
});
