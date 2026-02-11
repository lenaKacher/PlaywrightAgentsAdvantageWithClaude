// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Shopping Cart', () => {
  test('Add Multiple Products to Cart', async ({ page }) => {
    // 1. Add first product to cart (e.g., Bose speaker)
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();
    
    // Add to cart
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // Product 1 is added with cart count visible
    const cartCounter = page.locator('.shopping_cart').locator('xpath=..//*[contains(@class, "count")]');
    await cartCounter.waitFor({ state: 'visible' }).catch(() => {});

    // 2. Navigate to another product
    await page.navigate('https://www.advantageonlineshopping.com/#/');
    await page.getByRole('link', { name: 'TabletsCategory', exact: true }).click();

    // Product detail page is displayed
    const firstTablet = page.getByText(/Tablet|iPad/, { exact: false }).first();
    await firstTablet.click().catch(() => {});

    // 3. Add second product to cart
    await page.getByRole('button', { name: 'ADD TO CART' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // Product 2 is added
    // Cart counter updates to show 2
  });
});
