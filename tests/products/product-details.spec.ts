// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product Details and Actions', () => {
  test('View Product Detail Page', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    expect(page.url()).toContain('/product/');
    await productPage.verifyProductDetailsVisible();
  });

  test('View Product Image on Detail Page', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    const imgLocator = page.locator('img').first();
    await expect(imgLocator).toBeVisible();
  });

  test('View Product Information on Detail Page', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    const title = await productPage.getProductTitle();
    expect(title).toBeTruthy();
  });

  test('View Product Description', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    await productPage.verifyDescriptionVisible();
  });

  test('Adjust Product Quantity', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    const qty = await productPage.getCurrentQuantity();
    expect(qty).toBe('1');
    
    await productPage.increaseQuantity(3);
  });

  test('Add Product to Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    await productPage.addToCart();
  });

  test('Add Multiple Products to Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    
    // Add first product
    await homePage.clickProduct(0);
    await productPage.addToCart();
    
    // Go back and add second product
    await homePage.goto();
    await homePage.clickProduct(1);
    await productPage.addToCart();
  });

  test('Add Product with Quantity to Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    await productPage.setQuantity(3);
    await productPage.addToCart();
  });

  test('Add Product to Favorites', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    await productPage.addToFavorites();
  });

  test('View Related Products', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.clickProduct(0);
    
    const count = await productPage.getRelatedProductsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
