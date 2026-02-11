// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Authentication & User Account', () => {
  test('View Order History', async ({ loginPage: page }) => {
    // 1. Login with valid credentials - seed has already done this
    // User is successfully logged in

    // 2. Click on the User Menu
    await page.getByRole('link', { name: 'UserMenu' }).click();

    // Verify dropdown menu appears with 'My orders' option
    await page.getByRole('link', { name: 'My orders' }).waitFor({ state: 'visible' });

    // 3. Click on 'My orders'
    await page.getByRole('link', { name: 'My orders' }).click();

    // Verify the My Orders page loads with heading
    await page.getByRole('heading', { name: 'MY ORDERS' }).waitFor({ state: 'visible' });

    // Verify table is displayed with expected columns
    const table = page.getByRole('table');
    await table.waitFor({ state: 'visible' });
    
    // Verify order columns are present
    await page.getByRole('columnheader', { name: 'ORDER NUMBER' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'ORDER DATE' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'ORDER TIME' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'PRODUCT NAME' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'COLOR' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'QUANTITY' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'TOTAL PRICE' }).waitFor({ state: 'visible' });

    // 4. Verify at least one order is visible with complete information
    const rows = page.getByRole('row');
    await rows.nth(1).waitFor({ state: 'visible' });
  });
});
