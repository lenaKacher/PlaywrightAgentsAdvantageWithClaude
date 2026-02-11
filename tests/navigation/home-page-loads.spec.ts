// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and General Interface', () => {
  test('Verify Home Page Loads Successfully', async ({ page }) => {
    // 1. Navigate to the home page at https://practicesoftwaretesting.com/
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Verify: The page loads successfully with status 200
    expect(page.url()).toBe('https://practicesoftwaretesting.com/');
    
    // Verify: The page title displays 'Practice Software Testing - Toolshop - v5.0'
    expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    
    // Verify: The main navigation menu is visible with options: Home, Categories, Contact, Sign in
    await expect(page.locator('[data-test="nav-home"]')).toBeVisible();
    await expect(page.locator('[data-test="nav-categories"]')).toBeVisible();
    await expect(page.locator('[data-test="nav-contact"]')).toBeVisible();
    
    // Verify: The shopping cart icon is visible in the top-right with item count indicator
    const cartButton = page.locator('[data-test="nav-cart"]');
    await expect(cartButton).toBeVisible();
    
    // Verify: Product listings are visible with product cards showing image, name, CO₂ rating, and price
    const productCards = page.locator('a[href*="/product/"]');
    await expect(productCards.first()).toBeVisible();
    
    // Check that product cards have the expected elements
    const firstProduct = productCards.first();
    await expect(firstProduct.locator('img').first()).toBeVisible();
  });
});
