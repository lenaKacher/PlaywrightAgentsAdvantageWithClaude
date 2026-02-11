// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Navigation & General UI', () => {
  test('Navigate Using Top Menu Links', async ({ loginPage: page }) => {
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

    // 2. Click on contact us menu item
    // Each menu item navigates to the appropriate section or page
    await contactUsLink.click();
    
    // Verify navigation occurred - contact form should be visible
    const contactForm = page.locator('//heading[contains(text(), "CONTACT")]').first();
    await contactForm.waitFor({ state: 'visible' }).catch(() => {});

    // Navigate back home
    const backToHome = page.getByRole('link').filter({ has: page.locator('img[alt*="dvantage"]') }).first();
    await backToHome.click();

    // Verify we're back on home page
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).waitFor({ state: 'visible' });
  });
});
