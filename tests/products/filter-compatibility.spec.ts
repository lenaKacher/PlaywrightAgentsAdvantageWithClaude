// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Browsing & Categories', () => {
  test('Filter Products by Compatibility', async ({ loginPage: page }) => {
    // 1. Navigate to a category page with filter options
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    
    // The filter panel is visible
    const compatibilityFilter = page.getByRole('link', { name: 'COMPATIBILITY' });
    await compatibilityFilter.waitFor({ state: 'visible' });

    // 2. Click on 'COMPATIBILITY' filter
    await compatibilityFilter.click();

    // Compatibility options are expanded
    // This would display compatibility options
  });
});
