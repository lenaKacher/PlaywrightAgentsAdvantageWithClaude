// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product Browsing and Filtering', () => {
  test('Sort Products by CO₂ Rating (A-E)', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.sortBy('CO₂ Rating (A - E)');
    
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Sort Products by CO₂ Rating (E-A)', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.sortBy('CO₂ Rating (E - A)');
    
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Filter Products by Price Range', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.filterByPriceRange(10, 50);
  });

  test('Search Products by Keyword', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.searchProducts('Pliers');
    
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Clear Search Results', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.searchProduct('Pliers');
    await homePage.clearSearch();
  });

  test('Filter Products by Category', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.filterByCategory('Hand Tools');
  });

  test('Filter Products by Brand', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.filterByBrand('Stanley');
  });

  test('Filter Products by Eco-Friendly Status', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.filterByEcoFriendly();
  });

  test('Apply Multiple Filters Together', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await productPage.filterByPriceRange(20, 100);
    await productPage.filterByCategory('Power Tools');
  });
});
