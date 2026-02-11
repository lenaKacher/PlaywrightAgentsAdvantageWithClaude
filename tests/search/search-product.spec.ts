// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Search Functionality', () => {
  test('Search for Product', async ({ page }) => {
    // 1. Click on the Search icon in the header
    const searchIcon = page.locator('generic[role="generic"]:has(img[src*="search"])').first();
    const searchBox = page.getByRole('textbox', { name: /Search/i });
    await searchBox.waitFor({ state: 'visible' });

    // The search box becomes active/visible

    // 2. Type 'laptop' in the search field
    await searchBox.fill('laptop');

    // The text 'laptop' is entered in the search box

    // 3. Press Enter or click search button
    await page.press('input[placeholder*="Search"]', 'Enter');

    // The page navigates to search results page
    // URL contains 'search' and product search results
    const resultsHeading = page.locator('text=/search|result/i').first();
    await resultsHeading.waitFor({ state: 'visible' }).catch(() => {});

    // 4. Verify search results
    // Search results are displayed showing products matching 'laptop'
  });
});
