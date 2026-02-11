// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Navigation & General UI', () => {
  test('Navigate Using Logo', async ({ loginPage: page }) => {
    // 1. Navigate to any page in the application
    // Navigate to a product page
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();

    // The page loads

    // 2. Click on the Advantage DEMO logo in the header
    const logo = page.locator('link').filter({ has: page.locator('img[alt*="dvantage"]') }).first();
    await logo.click();

    // The user is redirected to the home page
    // URL shows '#/'
    await page.getByRole('heading', { name: /SPEAKERS|TABLETS|LAPTOPS/i }).first().waitFor({ state: 'visible' });
  });
});
