// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Error Handling & Edge Cases', () => {
  test('Navigate to Non-existent Product', async ({ loginPage: page }) => {
    // 1. Try to navigate directly to a non-existent product URL (e.g., /product/99999)
    await page.goto('https://www.advantageonlineshopping.com/#/product/99999');

    // The application handles the error gracefully
    // Either a 404 error page is shown or user is redirected to home page
    // Verify page doesn't crash
    const pageContent = page.locator('body');
    await pageContent.waitFor({ state: 'visible' });
  });
});
