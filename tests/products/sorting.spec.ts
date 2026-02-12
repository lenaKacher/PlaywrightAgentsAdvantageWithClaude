// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product Browsing and Filtering', () => {
  test('View Product Listings with Default Sort', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('Sort Products by Name (A-Z)', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.sortBy('Name (A - Z)');
  });

  test('Sort Products by Name (Z-A)', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.sortBy('Name (Z - A)');
  });

  test('Sort Products by Price (High to Low)', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.sortBy('Price (High - Low)');
  });

  test('Sort Products by Price (Low to High)', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.sortBy('Price (Low - High)');
  });

  test('Sort and Filter Combined', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.sortBy('Price (Low - High)');
    await productPage.filterByPriceRange(10, 100);
  });
});
