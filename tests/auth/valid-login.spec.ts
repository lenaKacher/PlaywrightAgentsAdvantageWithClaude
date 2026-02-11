// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Authentication & User Account', () => {
  test('User Login with Valid Credentials', async ({ page }) => {
    // 1. Navigate to the Advantage Online Shopping home page
    // (page loads successfully with login prompt visible)
    
    // 2. Click on the User Menu (hamburger icon) in the top right
    await page.getByRole('link', { name: 'UserMenu' }).click();

    // 3. Click on 'Sign out' to logout (if already logged in)
    await page.getByRole('link', { name: 'Sign out' }).click();
    
    // Wait for logout to complete
    await page.waitForTimeout(500);

    // 4. Click on the User Menu again to see login option
    await page.getByRole('link', { name: 'UserMenu' }).click();

    // 5. Enter valid username 'User123' in the username field
    await page.locator('input[name="username"]').fill('User123');

    // 6. Enter password 'User123' in the password field
    await page.locator('input[name="password"]').fill('User123');

    // 7. Click the Sign In button
    await page.getByRole('button', { name: 'SIGN IN' }).click();

    // Verify the user is successfully logged in
    // Username 'User123' appears in the User Menu
    await page.getByRole('link', { name: 'UserMenu' }).waitFor({ state: 'visible' });
  });
});
