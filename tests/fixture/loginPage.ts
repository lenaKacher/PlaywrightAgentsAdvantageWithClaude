import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from './credentials';

type TestFixtures = {
  loginPage: Page;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await page.locator('#menuUser').click();
    await page.locator('[name="username"]').fill(USERNAME);
    await page.locator('[name="password"]').fill(PASSWORD);
    await page.locator('#sign_in_btn').click();
    await expect(page.locator('#menuUserLink .hi-user')).toHaveText('User123');
    await use(page);
  },
});

export { expect };