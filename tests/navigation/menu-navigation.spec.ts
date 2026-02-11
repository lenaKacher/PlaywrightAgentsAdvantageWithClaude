// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and General Interface', () => {
  test('Navigate Between Main Menu Items', async ({ page }) => {
    // 1. Click on the 'Categories' menu item
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-categories"]').click();
    
    // Verify: A dropdown menu appears with category options
    const categoriesList = page.locator('[data-test="nav-categories"] + ul, .nav-categories ul');
    await expect(categoriesList.locator('text=Hand Tools')).toBeVisible();
    await expect(categoriesList.locator('text=Power Tools')).toBeVisible();
    await expect(categoriesList.locator('text=Other')).toBeVisible();
    await expect(categoriesList.locator('text=Special Tools')).toBeVisible();
    await expect(categoriesList.locator('text=Rentals')).toBeVisible();
    
    // 2. Click on 'Hand Tools' category
    await page.locator('a:has-text("Hand Tools")').click();
    
    // Verify: The page navigates to /category/hand-tools
    expect(page.url()).toContain('/category/hand-tools');
    
    // Verify: Products in the Hand Tools category are displayed
    const productCards = page.locator('a[href*="/product/"]');
    await expect(productCards.first()).toBeVisible();
    
    // 3. Click on 'Contact' in the main menu
    await page.locator('[data-test="nav-contact"]').click();
    
    // Verify: The page navigates to /contact
    expect(page.url()).toContain('/contact');
    
    // Verify: The contact form is visible with fields
    await expect(page.locator('input[placeholder*="first name"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="last name"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="email"]')).toBeVisible();
    
    // 4. Click on 'Home' link to return to home page
    await page.locator('[data-test="nav-home"]').click();
    
    // Verify: The page navigates back to the home page
    expect(page.url()).toBe('https://practicesoftwaretesting.com/');
    
    // Verify: All products are displayed again
    const products = page.locator('a[href*="/product/"]');
    await expect(products.first()).toBeVisible();
  });
});
