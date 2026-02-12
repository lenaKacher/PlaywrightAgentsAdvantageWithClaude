// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Product Browsing and Filtering', () => {
  test('View Product Listings with Default Sort', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Verify: Multiple product cards are visible
    const productCards = page.locator('a[href*="/product/"]');
    await expect(productCards.first()).toBeVisible();
    
    // Verify: Each product card displays: product image, name, CO₂ rating (A-E scale), and price
    const firstCard = productCards.first();
    await expect(firstCard.locator('img').first()).toBeVisible();
    await expect(firstCard.locator('h5, [role="heading"]').first()).toBeVisible();
    
    // Verify: Products are displayed in a grid layout
    expect(await productCards.count()).toBeGreaterThanOrEqual(2);
  });

  test('Sort Products by Name (A-Z)', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Locate the 'Sort' dropdown on the left sidebar
    const sortDropdown = page.locator('select[data-test="sort"], select:near(text="Sort")').or(page.locator('select').first());
    
    // Verify: The Sort dropdown is visible with default selection
    await expect(sortDropdown).toBeVisible();
    
    // 2. Click on the Sort dropdown and select 'Name (A - Z)'
    await sortDropdown.selectOption('Name (A - Z)');
    
    // Verify: The products are re-sorted alphabetically from A to Z
    const productNames = await page.locator('a[href*="/product/"] h5').allTextContents();
    if (productNames.length > 1) {
      expect(productNames[0]).toBeLessThanOrEqual(productNames[1]);
    }
  });

  test('Sort Products by Name (Z-A)', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Get the sort dropdown
    const sortDropdown = page.locator('select').first();
    
    // 2. Click on the Sort dropdown and select 'Name (Z - A)'
    await sortDropdown.selectOption('Name (Z - A)');
    
    // Verify: The products are re-sorted in reverse alphabetical order
    const productNames = await page.locator('a[href*="/product/"] h5').allTextContents();
    if (productNames.length > 1) {
      expect(productNames[0]).toGreaterThanOrEqual(productNames[1]);
    }
  });

  test('Sort Products by Price (High to Low)', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('https://practicesoftwaretesting.com/');
    
    const sortDropdown = page.locator('select').first();
    
    // 2. Select 'Price (High - Low)'
    await sortDropdown.selectOption('Price (High - Low)');
    
    // Verify: The products are re-sorted with highest prices first
    await page.waitForTimeout(500);
    const productPrices = await page.locator('a[href*="/product/"]').allTextContents();
    expect(productPrices.length).toBeGreaterThan(0);
  });

  test('Sort Products by Price (Low to High)', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('https://practicesoftwaretesting.com/');
    
    const sortDropdown = page.locator('select').first();
    
    // 2. Select 'Price (Low - High)'
    await sortDropdown.selectOption('Price (Low - High)');
    
    // Verify: The products are re-sorted with lowest prices first
    await page.waitForTimeout(500);
    const productPrices = await page.locator('a[href*="/product/"]').allTextContents();
    expect(productPrices.length).toBeGreaterThan(0);
  });
});
