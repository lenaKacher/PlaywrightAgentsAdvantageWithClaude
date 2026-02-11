// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Categories Deep Dive', () => {
  test('Browse Headphones Category', async ({ page }) => {
    // 1. Navigate to home page
    // Home page is displayed

    // 2. Click on Headphones category
    await page.getByRole('link', { name: 'HeadphonesCategory', exact: true }).click();

    // Headphones category page loads
    await page.getByRole('heading', { name: 'HEADPHONES', level: 3 }).waitFor({ state: 'visible' });

    // 3. Verify headphones products are displayed
    // Multiple headphone products are visible
    const itemCount = page.locator('paragraph:has-text("ITEMS")').first();
    await itemCount.waitFor({ state: 'visible' });
  });
});
