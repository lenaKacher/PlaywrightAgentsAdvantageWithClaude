// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Categories Deep Dive', () => {
  test('Browse Mice Category', async ({ page }) => {
    // 1. Navigate to home page
    // Home page is displayed

    // 2. Click on Mice category
    await page.getByRole('link', { name: 'MiceCategory', exact: true }).click();

    // Mice category page loads
    await page.getByRole('heading', { name: 'MICE', level: 3 }).waitFor({ state: 'visible' });

    // 3. Verify mice products are displayed
    // Products are shown in the Mice category
    const itemCount = page.locator('paragraph:has-text("ITEMS")').first();
    await itemCount.waitFor({ state: 'visible' });
  });
});
