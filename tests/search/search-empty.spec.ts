// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Search Functionality', () => {
  test('Search with Empty Query', async ({ page }) => {
    // 1. Click on the Search icon
    const searchBox = page.getByRole('textbox', { name: /Search/i });
    await searchBox.waitFor({ state: 'visible' });

    // Search box becomes active

    // 2. Leave search field empty and press Enter
    await page.press('input[placeholder*="Search"]', 'Enter');

    // Either nothing happens or an error message appears
    // No invalid results are displayed
  });
});
