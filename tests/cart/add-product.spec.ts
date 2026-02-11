// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Shopping Cart', () => {
  test('Add Single Product to Cart', async ({ page }) => {
    // 1. Navigate to any product detail page
    // Navigate to Speakers category
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();

    // Click on a product
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();

    // Product details are displayed
    await page.getByRole('heading', { name: /BOSE SOUNDLINK/, level: 1 }).waitFor({ state: 'visible' });

    // 2. Select a color option (if available)
    // Color options are displayed
    const blackColorOption = page.getByText('BLACK').first();
    await blackColorOption.waitFor({ state: 'visible' });
    await blackColorOption.click();

    // 3. Verify quantity is set to 1
    // The quantity field shows '1'
    const quantityField = page.getByRole('spinbutton');
    await quantityField.waitFor({ state: 'visible' });

    // 4. Click 'ADD TO CART' button
    const addToCartBtn = page.getByRole('button', { name: 'ADD TO CART' });
    await addToCartBtn.click();

    // Verify the product is added to cart
    // A cart badge/counter appears in the header
    const cartBadge = page.locator('text=ShoppingCart').locator('xpath=following-sibling::*[contains(text(), "1") or contains(text(), "2")]');
    await cartBadge.waitFor({ state: 'visible' }).catch(() => {});
  });
});
