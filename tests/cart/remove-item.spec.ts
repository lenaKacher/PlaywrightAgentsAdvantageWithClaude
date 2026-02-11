// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Shopping Cart', () => {
  test('Remove Item from Cart', async ({ loginPage: page }) => {
    // 1. Add products to cart
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();
    await page.getByRole('button', { name: 'ADD TO CART' }).click();
    
    // Navigate to Shopping Cart with items
    await page.getByRole('link', { name: 'ShoppingCart' }).click();

    // Cart page displays items with REMOVE link
    await page.getByRole('heading', { name: /SHOPPING CART/, level: 3 }).waitFor({ state: 'visible' });

    // 2. Click 'REMOVE' link on an item
    // Find and click remove link
    const table = page.getByRole('table').first();
    const cells = table.locator('td, th');
    const removeLink = cells.locator('text=/REMOVE/i').first();
    await removeLink.click();

    // The item is removed from the cart
    // The cart is updated and item count decreases
    // Total price is recalculated
  });
});
