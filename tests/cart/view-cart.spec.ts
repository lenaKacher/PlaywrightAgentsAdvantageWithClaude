// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Shopping Cart', () => {
  test('View Shopping Cart', async ({ page }) => {
    // 1. Add at least one product to cart
    // Navigate to product and add to cart
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // Product is added and cart counter shows quantity

    // 2. Click on the Shopping Cart icon/link in the header
    await page.getByRole('link', { name: 'ShoppingCart' }).click();

    // The Shopping Cart page loads
    await page.getByRole('heading', { name: /SHOPPING CART/, level: 3 }).waitFor({ state: 'visible' });

    // 3. Verify cart contents
    // A table displays all items in cart
    const table = page.getByRole('table');
    await table.waitFor({ state: 'visible' });

    // Verify columns are present
    await page.getByRole('columnheader', { name: 'PRODUCT NAME' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'COLOR' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'QUANTITY' }).waitFor({ state: 'visible' });
    await page.getByRole('columnheader', { name: 'PRICE' }).waitFor({ state: 'visible' });

    // Each row shows correct product information
    const productName = page.getByText(/BOSE SOUNDLINK/i);
    await productName.waitFor({ state: 'visible' });

    // A 'TOTAL' row displays the sum
    const totalRow = page.locator('text=/TOTAL/');
    await totalRow.first().waitFor({ state: 'visible' });

    // A 'CHECKOUT' button is visible
    const checkoutBtn = page.getByRole('button', { name: /CHECKOUT/i });
    await checkoutBtn.waitFor({ state: 'visible' });
  });
});
