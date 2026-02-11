// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Browsing & Categories', () => {
  test('Navigate to Category - Speakers', async ({ page }) => {
    // 1. Navigate to the home page (seed has already done this)
    // The home page is loaded

    // 2. Click on the Speakers category card or 'Shop Now' button
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();

    // Verify the Speakers category page loads
    // The page header shows 'SPEAKERS'
    await page.getByRole('heading', { name: 'SPEAKERS', level: 3 }).waitFor({ state: 'visible' });

    // 3. Verify product list is displayed
    // Verify the product count shows '7 ITEMS'
    const itemCount = page.getByText('7 ITEMS');
    await itemCount.waitFor({ state: 'visible' });

    // Verify A list of speaker products is visible with product name and price
    // Each product shows: product image, name, and price
    const firstProduct = page.getByText('Bose Soundlink Bluetooth Speaker III');
    await firstProduct.waitFor({ state: 'visible' });
    
    const secondProduct = page.getByText('Bose SoundLink Wireless Speaker');
    await secondProduct.waitFor({ state: 'visible' });

    // Verify 'SHOP NOW' button is visible for products
    const shopNowButtons = page.getByText('SHOP NOW');
    await shopNowButtons.first().waitFor({ state: 'visible' });
  });
});
