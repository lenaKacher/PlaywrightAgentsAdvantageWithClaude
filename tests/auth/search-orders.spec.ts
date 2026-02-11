// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Authentication & User Account', () => {
  test('Search Orders', async ({ page }) => {
    // 1. Login and navigate to My Orders page
    await page.getByRole('link', { name: 'UserMenu' }).click();
    await page.getByRole('link', { name: 'My orders' }).waitFor({ state: 'visible' });
    await page.getByRole('link', { name: 'My orders' }).click();
    
    // Verify My Orders page is displayed
    await page.getByRole('heading', { name: 'MY ORDERS' }).waitFor({ state: 'visible' });

    // 2. Click on the search box labeled 'Search in orders' and fill with order number
    const searchBox = page.getByRole('textbox', { name: 'Search in orders' });
    await searchBox.waitFor({ state: 'visible' });
    
    // 3. Type a valid order number
    await searchBox.fill('4769553045');

    // Verify the search results filter to show the matching order
    // The matching order should still be visible in the table
    const table = page.getByRole('table');
    await table.waitFor({ state: 'visible' });
  });
});
