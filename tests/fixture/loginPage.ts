import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';

type TestFixtures = {
  loginPage: Page;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto('https://www.advantageonlineshopping.com/#/');
    await page.click('#menuUser');
    await page.fill('[name="username"]', 'User123');
    await page.fill('[name="password"]', 'User123');
    await page.click('#sign_in_btn');
    await expect(page.locator('#menuUserLink .hi-user')).toHaveText('User123');
    await use(page);
  },
});

export { expect };