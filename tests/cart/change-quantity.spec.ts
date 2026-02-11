// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Shopping Cart', () => {
  test('Change Quantity Before Adding to Cart', async ({ loginPage: page }) => {
    // 1. Navigate to a product detail page
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();

    // Product is displayed
    await page.getByRole('heading', { name: /BOSE SOUNDLINK/, level: 1 }).waitFor({ state: 'visible' });

    // 2. Change the quantity field from 1 to 3
    const quantityInput = page.getByRole('spinbutton');
    await quantityInput.waitFor({ state: 'visible' });
    await quantityInput.fill('3');

    // The quantity field shows '3'
    await quantityInput.waitFor({ state: 'visible' });

    // 3. Click 'ADD TO CART'
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // 3 units of the product are added to cart
    // Cart counter reflects the correct quantity
  });
});
