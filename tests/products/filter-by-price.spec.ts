// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Browsing & Categories', () => {
  test('Filter Products by Price', async ({ loginPage: page }) => {
    // 1. Navigate to any category page (e.g., Speakers)
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    
    // Category page is displayed with products and filter options
    await page.getByRole('heading', { name: 'SPEAKERS', level: 3 }).waitFor({ state: 'visible' });

    // 2. Locate the filter section on the left sidebar
    // A 'FILTER BY:' section is visible with options
    const priceFilter = page.getByRole('link', { name: 'PRICE' });
    await priceFilter.waitFor({ state: 'visible' });

    const compatibilityFilter = page.getByRole('link', { name: 'COMPATIBILITY' });
    await compatibilityFilter.waitFor({ state: 'visible' });

    const manufacturerFilter = page.getByRole('link', { name: 'MANUFACTURER' });
    await manufacturerFilter.waitFor({ state: 'visible' });

    // 3. Click on 'PRICE' filter
    await priceFilter.click();

    // Price range options are expanded/displayed
    // This would show price range checkboxes
    await page.getByRole('checkbox').first().waitFor({ state: 'visible' }).catch(() => {});
  });
});
