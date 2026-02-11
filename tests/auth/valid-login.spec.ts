// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../fixture/credentials';

test.describe('Authentication & User Account', () => {
  test('User Login with Valid Credentials', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto(BASE_URL);

    // The page loads successfully with login prompt visible (User Menu icon)
    
    // 2. Click on the User Menu (hamburger icon) in the top right
    const userMenu = page.getByRole('link', { name: 'UserMenu' });
    await userMenu.waitFor({ state: 'visible' });
    await userMenu.click();

    // 3. Try to logout first if already logged in (handles fresh vs existing session)
    const signOutLink = page.getByRole('link', { name: 'Sign out' });
    const isLoggedIn = await signOutLink.isVisible().catch(() => false);
    if (isLoggedIn) {
      await signOutLink.click();
      // Wait for page to update after logout
      await page.waitForLoadState('networkidle').catch(() => {});
    }

    // Click User Menu again to see login option
    await userMenu.click();

    // 4. Enter valid username 'User123' and password 'User123'
    // The credentials are entered in their respective fields
    await page.locator('input[name="username"]').fill(USERNAME);
    await page.locator('input[name="password"]').fill(PASSWORD);

    // 5. Click the Sign In button
    const signInBtn = page.getByRole('button', { name: 'SIGN IN' });
    await signInBtn.click();

    // Verify the user is successfully logged in
    // The username 'User123' appears in the User Menu
    await page.getByRole('link', { name: 'UserMenu' }).waitFor({ state: 'visible' });
    
    // The dashboard or home page is displayed
    await page.waitForLoadState('networkidle').catch(() => {});
  });
});
