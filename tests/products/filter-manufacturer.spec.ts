// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Browsing & Categories', () => {
  test('Filter Products by Manufacturer', async ({ loginPage: page }) => {
    // 1. Navigate to a category page
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    
    // Category page is displayed
    await page.getByRole('heading', { name: 'SPEAKERS', level: 3 }).waitFor({ state: 'visible' });

    // 2. Click on 'MANUFACTURER' filter
    const manufacturerFilter = page.getByRole('link', { name: 'MANUFACTURER' });
    await manufacturerFilter.waitFor({ state: 'visible' });
    await manufacturerFilter.click();

    // Manufacturer options are displayed
    // Options like Bose, HP would be shown
  });
});
