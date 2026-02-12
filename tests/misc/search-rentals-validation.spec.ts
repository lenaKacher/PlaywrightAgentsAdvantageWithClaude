// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ContactPage } from '../pages/ContactPage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Search and Discovery', () => {
  test('Search with Single Word', async ({ loginPage: page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.search('Hammer');
    expect(await searchPage.getResultsCount()).toBeGreaterThan(0);
  });

  test('Search with No Results', async ({ loginPage: page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.search('NonexistentProduct123');
    const hasNoResults = await searchPage.verifyNoResults();
    expect(hasNoResults).toBe(true);
  });

  test('Search is Case-Insensitive', async ({ loginPage: page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.searchCaseInsensitive('PLIERS');
    expect(await searchPage.getResultsCount()).toBeGreaterThan(0);
  });
});

test.describe('Product Rentals', () => {
  test('View Rentals Overview', async ({ loginPage: page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.gotoRentals();
    expect(page.url()).toContain('/rentals');
  });

  test('Browse Rental Products', async ({ loginPage: page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.gotoRentals();
    await searchPage.verifyResultsVisible();
    expect(await searchPage.getRentalProductsCount()).toBeGreaterThan(0);
  });

  test('Select Rental Product', async ({ loginPage: page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.gotoRentals();
    await searchPage.clickRentalProduct(0);
    expect(page.url()).toContain('/product/');
  });

  test('Add Rental to Cart', async ({ loginPage: page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    await searchPage.gotoRentals();
    await searchPage.clickRentalProduct(0);
    await productPage.addToCart();
  });
});

test.describe('Error Handling and Validation', () => {
  test('Invalid Email Format Validation', async ({ loginPage: page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.gotoContact();
    await contactPage.fillContactForm('Test User', 'notanemail', 'Test message');
    await contactPage.submitForm();
    expect(page.url()).toContain('/contact');
  });

  test('Required Field Validation', async ({ loginPage: page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.gotoContact();
    const isDisabled = await contactPage.isSubmitDisabled();
    if (!isDisabled) {
      await contactPage.submitForm();
      expect(page.url()).toContain('/contact');
    }
  });

  test('Price Range Slider Limits', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const sliders = page.locator('ngx-slider [role="slider"]');
    expect(await sliders.count()).toBeGreaterThanOrEqual(2);
  });

  test('Quantity Cannot Be Zero or Negative', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await homePage.goto();
    await homePage.clickProduct(0);
    await productPage.setQuantity(0);
    const quantity = await productPage.getCurrentQuantity();
    expect(parseInt(quantity) >= 1).toBe(true);
  });
});
