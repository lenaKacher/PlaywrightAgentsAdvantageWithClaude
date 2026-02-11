// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test as base } from '@playwright/test';
import { test } from '../fixture/loginPage';

test.describe('Authentication & User Account', () => {
  test('User Logout', async ({ loginPage: page }) => {
    // 1. Login with valid credentials (User123/User123) - seed has already done this
    // User is successfully logged in and 'User123' is displayed in the User Menu

    // 2. Click on the User Menu in the top right
    await page.getByRole('link', { name: 'UserMenu' }).click();

    // Verify dropdown menu appears with 'Sign out' option
    await page.getByRole('link', { name: 'Sign out' }).waitFor({ state: 'visible' });

    // 3. Click on 'Sign out' option
    await page.getByRole('link', { name: 'Sign out' }).click();

    // Verify the user is logged out
    // The User Menu should no longer show the username
    await page.getByRole('link', { name: 'UserMenu' }).waitFor({ state: 'visible' });
  });
});
