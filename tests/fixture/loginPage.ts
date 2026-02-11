import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from './credentials';

type TestFixtures = {
  loginPage: Page;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await page.locator('[data-test="nav-sign-in"]').click();
    await page.locator('[data-test="email"]').click();
    await page.locator('[data-test="email"]').fill(USERNAME);
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-submit"]').click();
    await page.locator('[data-test="page-title"]').isVisible();
    await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
    await use(page);
  },
});

export { expect };