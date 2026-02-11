// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Checkout Flow', () => {
  test('Initiate Checkout', async ({ page }) => {
    // 1. Add a product to cart
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // Product is added and cart shows count

    // 2. Navigate to Shopping Cart page
    await page.getByRole('link', { name: 'ShoppingCart' }).click();

    // Cart page is displayed with items and CHECKOUT button
    await page.getByRole('heading', { name: /SHOPPING CART/, level: 3 }).waitFor({ state: 'visible' });

    // 3. Click 'CHECKOUT' button
    const checkoutBtn = page.getByRole('button', { name: /CHECKOUT/i });
    await checkoutBtn.click();

    // The checkout process begins or checkout page loads
    // This would navigate to a checkout confirmation or payment page
  });
});
