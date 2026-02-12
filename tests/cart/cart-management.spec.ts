// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart Management', () => {
  test('View Shopping Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const productPage = require('../pages/ProductPage').ProductPage;
    const prodPage = new productPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Verify: The page navigates to checkout
    expect(page.url()).toContain('/checkout');
  });

  test('View Cart Items Table', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const ProductPage = require('../pages/ProductPage').ProductPage;
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const prodPage = new ProductPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Verify: Cart table is visible
    await cartPage.verifyCartTableVisible();
    
    // Verify: Cart has items
    const count = await cartPage.getCartItemsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('View Cart Total', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const ProductPage = require('../pages/ProductPage').ProductPage;
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const prodPage = new ProductPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Verify: Total is displayed
    const total = await cartPage.getCartTotal();
    expect(total).toBeTruthy();
  });

  test('Modify Product Quantity in Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const ProductPage = require('../pages/ProductPage').ProductPage;
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const prodPage = new ProductPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Modify quantity
    await cartPage.modifyQuantity(0, 3);
  });

  test('Remove Product from Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const ProductPage = require('../pages/ProductPage').ProductPage;
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const prodPage = new ProductPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Remove product
    await cartPage.removeFirstProduct();
  });

  test('Continue Shopping from Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const ProductPage = require('../pages/ProductPage').ProductPage;
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const prodPage = new ProductPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Continue shopping
    await cartPage.continueShopping();
  });

  test('Proceed to Checkout', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const ProductPage = require('../pages/ProductPage').ProductPage;
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const prodPage = new ProductPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Verify: Navigated to checkout
    expect(page.url()).toContain('/checkout');
  });

  test('Empty Cart', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const ProductPage = require('../pages/ProductPage').ProductPage;
    
    // Add a product to cart
    await homePage.clickProduct(0);
    const prodPage = new ProductPage(page);
    await prodPage.addToCart();
    
    // Navigate to cart
    await homePage.goToCart();
    
    // Empty cart
    await cartPage.emptyCart();
  });
});
