// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Categories Deep Dive', () => {
  test('Browse Laptops Category', async ({ page }) => {
    // 1. Navigate to home page
    // Home page is displayed

    // 2. Click on Laptops category
    await page.getByRole('link', { name: 'LaptopsCategory', exact: true }).click();

    // Laptops category page loads
    await page.getByRole('heading', { name: 'LAPTOPS', level: 3 }).waitFor({ state: 'visible' });

    // 3. Verify laptops are displayed with prices and details
    // Multiple laptop products are visible in a grid/list view
    const productCount = page.locator('paragraph:has-text("ITEMS")').first();
    await productCount.waitFor({ state: 'visible' });
  });
});
