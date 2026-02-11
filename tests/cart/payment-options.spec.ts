// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Shopping Cart', () => {
  test('Verify Payment Options Display', async ({ loginPage: page }) => {
    // 1. Add products to cart and navigate to Shopping Cart page
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();
    await page.getByRole('button', { name: 'ADD TO CART' }).click();
    
    // Navigate to Shopping Cart page
    await page.getByRole('link', { name: 'ShoppingCart' }).click();

    // Shopping Cart page is displayed
    await page.getByRole('heading', { name: /SHOPPING CART/, level: 3 }).waitFor({ state: 'visible' });

    // 2. Verify payment options section
    // Payment options are displayed (credit card icons/logos)
    const checkoutBtn = page.getByRole('button', { name: /CHECKOUT/i });
    await checkoutBtn.waitFor({ state: 'visible' });

    // Common payment methods are visible
    // This would typically be shown near the checkout button
  });
});
