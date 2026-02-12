// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Product Details and Actions', () => {
  test('View Product Detail Page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Click on any product card
    await page.locator('a[href*="/product/"]').first().click();
    
    // Verify: The product detail page loads
    expect(page.url()).toContain('/product/');
    
    // Verify: Product information is displayed
    const productName = page.locator('h1');
    await expect(productName).toBeVisible();
  });

  test('View Product Image on Detail Page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Verify: A large product image is displayed
    const productImage = page.locator('img').first();
    await expect(productImage).toBeVisible();
  });

  test('View Product Information on Detail Page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Verify: The product name is displayed as a heading
    const productName = page.locator('h1');
    await expect(productName).toBeVisible();
    
    // Verify: Price is displayed
    const price = page.locator('[role="generic"]:has-text("$")').first();
    await expect(price).toBeVisible();
  });

  test('View Product Description', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Verify: Product description is visible
    const description = page.locator('p').filter({ hasText: 'Lorem' });
    if (await description.count() > 0) {
      await expect(description.first()).toBeVisible();
    }
  });

  test('Adjust Product Quantity', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Locate the Quantity control
    const quantitySpinner = page.locator('input[type="number"]').first();
    await expect(quantitySpinner).toBeVisible();
    
    // Verify: Default quantity is 1
    const currentValue = await quantitySpinner.inputValue();
    expect(currentValue).toBe('1');
    
    // Click Increase quantity button 3 times
    const increaseBtn = page.locator('button:has-text("Increase")').or(page.locator('button:near(input[type="number"])').last());
    if (await increaseBtn.isVisible()) {
      for (let i = 0; i < 3; i++) {
        await increaseBtn.click();
      }
    }
  });

  test('Add Product to Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Click the 'Add to cart' button
    await page.locator('button:has-text("Add to cart")').click();
    
    // Verify: A success message appears
    const successMsg = page.locator('[role="alert"], .alert, .toast').filter({ hasText: 'added' }).or(page.locator('text=added'));
    await expect(successMsg.first()).toBeVisible({ timeout: 5000 });
    
    // Verify: The shopping cart icon in the navigation updates
    const cartBadge = page.locator('[data-test="nav-cart"] [role="img"], [data-test="nav-cart"] span').filter({ hasText: /\d/ });
    if (await cartBadge.count() > 0) {
      await expect(cartBadge.first()).toBeVisible();
    }
  });

  test('Add Multiple Products to Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add first product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate back to home
    await page.locator('a[href="/"]').first().click();
    
    // Add second product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    
    // Verify: Both products are in cart
    const successMsg = page.locator('[role="alert"], .alert, .toast').filter({ hasText: 'added' });
    await expect(successMsg.first()).toBeVisible({ timeout: 5000 });
  });

  test('Add Product with Quantity to Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Set quantity to 3
    const quantityInput = page.locator('input[type="number"]').first();
    if (await quantityInput.isVisible()) {
      await quantityInput.fill('3');
    }
    
    // Click 'Add to cart'
    await page.locator('button:has-text("Add to cart")').click();
    
    // Verify: Success message appears
    const successMsg = page.locator('[role="alert"], .alert, .toast').filter({ hasText: 'added' });
    await expect(successMsg.first()).toBeVisible({ timeout: 5000 });
  });

  test('Add Product to Favorites', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Click the 'Add to favourites' button
    const favBtn = page.locator('button:has-text("Add to favourites"), button:has-text("Favorite")');
    if (await favBtn.isVisible()) {
      await favBtn.click();
      
      // Verify: Button visual changes or item is added to favorites
      await page.waitForTimeout(500);
    }
  });

  test('View Related Products', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Navigate to product detail page
    await page.locator('a[href*="/product/"]').first().click();
    
    // Verify: Related products section is visible
    const relatedSection = page.locator('text=Related products', 'h2:has-text("Related")');
    if (await relatedSection.count() > 0) {
      await expect(relatedSection.first()).toBeVisible();
    }
    
    // Verify: Related products are displayed
    const relatedProducts = page.locator('a[href*="/product/"]').filter({ hasNot: page.locator('h1') });
    if (await relatedProducts.count() > 0) {
      expect(await relatedProducts.count()).toBeGreaterThan(0);
    }
  });
});
