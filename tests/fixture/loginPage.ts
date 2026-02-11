import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from './credentials';

type TestFixtures = {
  loginPage: Page;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await page.click('#menuUser');
    await page.fill('[name="username"]', USERNAME);
    await page.fill('[name="password"]', PASSWORD);
    await page.click('#sign_in_btn');
    await expect(page.locator('#menuUserLink .hi-user')).toHaveText('User123');
    await use(page);
  },
});

export { expect };