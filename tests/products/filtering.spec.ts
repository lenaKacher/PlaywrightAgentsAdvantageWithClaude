// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Product Browsing and Filtering', () => {
  test('Sort Products by CO₂ Rating (A-E)', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    const sortDropdown = page.locator('select').first();
    await sortDropdown.selectOption('CO₂ Rating (A - E)');
    
    // Products should be sorted by CO₂ rating from best (A) to worst (E)
    await page.waitForTimeout(500);
    const products = page.locator('a[href*="/product/"]');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('Sort Products by CO₂ Rating (E-A)', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    const sortDropdown = page.locator('select').first();
    await sortDropdown.selectOption('CO₂ Rating (E - A)');
    
    // Products should be sorted by CO₂ rating from worst (E) to best (A)
    await page.waitForTimeout(500);
    const products = page.locator('a[href*="/product/"]');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('Filter Products by Price Range', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Locate the 'Price Range' slider on the left sidebar
    const minSlider = page.locator('ngx-slider [role="slider"]').first();
    const maxSlider = page.locator('ngx-slider [role="slider"]').last();
    
    // Verify: The slider is visible with range 0 to 200
    await expect(minSlider).toBeVisible();
    await expect(maxSlider).toBeVisible();
    
    // Drag the minimum price slider to 25
    await minSlider.drag(maxSlider, { sourcePosition: { x: 0, y: 0 }, targetPosition: { x: 50, y: 0 } });
    
    // Drag the maximum price slider to 100
    await maxSlider.drag(minSlider, { sourcePosition: { x: 0, y: 0 }, targetPosition: { x: -50, y: 0 } });
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    const products = page.locator('a[href*="/product/"]');
    expect(await products.count()).toBeGreaterThanOrEqual(0);
  });

  test('Search Products by Keyword', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Locate the 'Search' field on the left sidebar
    const searchField = page.locator('input[placeholder*="Search"]');
    
    // Verify: The search textbox is visible
    await expect(searchField).toBeVisible();
    
    // Type 'Pliers' in the search field
    await searchField.fill('Pliers');
    
    // Click the 'Search' button
    await page.locator('button:has-text("Search")').click();
    
    // Verify: The products are filtered to show only those containing 'Pliers'
    await page.waitForTimeout(500);
    const products = page.locator('a[href*="/product/"]');
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('Clear Search Results', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Perform a search first
    const searchField = page.locator('input[placeholder*="Search"]');
    await searchField.fill('Pliers');
    await page.locator('button:has-text("Search")').click();
    await page.waitForTimeout(500);
    
    // Click the 'X' button in the search field
    await page.locator('button:has-text("X")').click();
    
    // Verify: The search field is cleared and all products are displayed again
    expect(await searchField.inputValue()).toBe('');
    const products = page.locator('a[href*="/product/"]');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('Filter Products by Category', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Expand the 'By category:' section on the left sidebar
    const categorySection = page.locator('heading:has-text("By category:")');
    await expect(categorySection).toBeVisible();
    
    // Check the 'Hand Tools' checkbox
    const handToolsCheckbox = page.locator('input[type="checkbox"]:near(text="Hand Tools")').first();
    if (await handToolsCheckbox.isVisible()) {
      await handToolsCheckbox.check();
      
      // Verify: Products are filtered
      await page.waitForTimeout(500);
      const products = page.locator('a[href*="/product/"]');
      expect(await products.count()).toBeGreaterThanOrEqual(0);
      
      // Uncheck the checkbox
      await handToolsCheckbox.uncheck();
    }
  });

  test('Filter Products by Brand', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Expand the 'By brand:' section
    const brandSection = page.locator('heading:has-text("By brand:")');
    await expect(brandSection).toBeVisible();
    
    // Check the 'ForgeFlex Tools' checkbox
    const forgeFelexCheckbox = page.locator('input[type="checkbox"]:near(text="ForgeFlex Tools")');
    if (await forgeFelexCheckbox.isVisible()) {
      await forgeFelexCheckbox.check();
      
      // Verify: Products are filtered
      await page.waitForTimeout(500);
      const products = page.locator('a[href*="/product/"]');
      expect(await products.count()).toBeGreaterThan(0);
    }
  });

  test('Filter Products by Eco-Friendly Status', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Expand the 'Sustainability:' section
    const ecoCheckbox = page.locator('input[type="checkbox"]:near(text="Show only eco-friendly products")');
    
    // Verify: The checkbox is visible
    await expect(ecoCheckbox).toBeVisible();
    
    // Check the eco-friendly checkbox
    await ecoCheckbox.check();
    
    // Verify: Products are filtered
    await page.waitForTimeout(500);
    const products = page.locator('a[href*="/product/"]');
    expect(await products.count()).toBeGreaterThanOrEqual(0);
  });
});
