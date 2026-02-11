// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Shopping Cart', () => {
  test('Edit Cart Item', async ({ loginPage: page }) => {
    // 1. Navigate to Shopping Cart with items
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();
    await page.getByRole('button', { name: 'ADD TO CART' }).click();
    
    await page.getByRole('link', { name: 'ShoppingCart' }).click();

    // Cart page is displayed with items
    await page.getByRole('heading', { name: /SHOPPING CART/, level: 3 }).waitFor({ state: 'visible' });

    // 2. Click 'EDIT' link on a cart item
    // This would be a link to edit the product details
    const editLinks = page.locator('a[href*="pageState=edit"]');
    await editLinks.first().click();

    // The product detail page loads with 'pageState=edit' in URL
    // Current quantity and color are pre-populated

    // 3. Change the quantity to 5
    const quantityInput = page.getByRole('spinbutton');
    await quantityInput.waitFor({ state: 'visible' });
    await quantityInput.fill('5');

    // 4. Click 'ADD TO CART' to save changes
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // The cart is updated with the new quantity
  });
});
