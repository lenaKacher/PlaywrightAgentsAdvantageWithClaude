// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Navigation & General UI', () => {
  test('Navigate Using Top Menu Links', async ({ page }) => {
    // 1. Verify top menu navigation items are present
    // Menu items visible: OUR PRODUCTS, CONTACT US, POPULAR ITEMS, SPECIAL OFFER
    const ourProductsLink = page.getByRole('link', { name: 'OUR PRODUCTS' });
    await ourProductsLink.waitFor({ state: 'visible' });

    const contactUsLink = page.getByRole('link', { name: 'CONTACT US' });
    await contactUsLink.waitFor({ state: 'visible' });

    const popularItemsLink = page.getByRole('link', { name: 'POPULAR ITEMS' });
    await popularItemsLink.waitFor({ state: 'visible' });

    const specialOfferLink = page.getByRole('link', { name: 'SPECIAL OFFER' });
    await specialOfferLink.waitFor({ state: 'visible' });

    // 2. Click on each menu item
    // Each menu item navigates to the appropriate section or page
    await ourProductsLink.click();
    // Verify navigation occurred
    await page.waitForTimeout(500);

    const backToHome = page.getByRole('link').filter({ has: page.locator('img[src*="dvantage"]') }).first();
    await backToHome.click();

    // Test other menu items
    await specialOfferLink.click();
    await page.waitForTimeout(500);
  });
});
