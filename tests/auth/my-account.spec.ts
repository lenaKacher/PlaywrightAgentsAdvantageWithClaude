// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Authentication & User Account', () => {
  test('Access My Account Page', async ({ page }) => {
    // 1. Login with valid credentials - seed has already done this
    // User is successfully logged in

    // 2. Click on the User Menu
    await page.getByRole('link', { name: 'UserMenu' }).click();

    // Verify dropdown menu appears with 'My account' option
    await page.getByRole('link', { name: 'My account' }).waitFor({ state: 'visible' });

    // 3. Click on 'My account'
    await page.getByRole('link', { name: 'My account' }).click();

    // Verify the My Account page loads
    // Page should contain "MY ACCOUNT" heading and account information
    await page.getByRole('heading', { name: 'MY ACCOUNT' }).waitFor({ state: 'visible' });
    
    // Verify account information is visible
    await page.getByRole('heading', { name: /Account details/ }).waitFor({ state: 'visible' });
  });
});
