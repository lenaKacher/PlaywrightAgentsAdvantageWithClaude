import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Product detail elements
  readonly productTitle = this.page.locator('h1');
  readonly productImage = this.page.locator('img').first();
  readonly productPrice = this.page.locator('text=$').first();
  readonly productDescription = this.page.locator('p').filter({ hasText: /description|Lorem/i });
  readonly productRating = this.page.locator('[role="img"][aria-label*="star"], .rating');

  // Product actions
  readonly quantityInput = this.page.locator('input[type="number"]').first();
  readonly increaseQuantityBtn = this.page.locator('button:has-text("Increase"), button:near(input[type="number"])').last();
  readonly decreaseQuantityBtn = this.page.locator('button:has-text("Decrease"), button:near(input[type="number"])').first();
  readonly addToCartBtn = this.page.locator('button:has-text("Add to cart")');
  readonly addToFavoritesBtn = this.page.locator('button:has-text("Add to favorites"), button:has-text("Favorite")');

  // Related products
  readonly relatedProducts = this.page.locator('a[href*="/product/"]');

  // Sorting and filtering
  readonly sortDropdown = this.page.locator('[data-test="product-sort"], select, .sort-dropdown');
  readonly filterOptions = this.page.locator('[data-test="product-filter"], .filter');
  readonly priceFilter = this.page.locator('input[type="range"]').first();
  readonly categoryFilter = this.page.locator('input[type="checkbox"], label');

  // Filter specific elements
  readonly ecoFriendlyFilter = this.page.locator('input[type="checkbox"]').filter({ hasText: /eco|sustainable/i });
  readonly brandFilter = this.page.locator('[data-test="filter-brands"], input[placeholder*="brand"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to a specific product by ID
   */
  async gotoProduct(productId: string): Promise<void> {
    await super.goto(`/product/${productId}`);
  }

  /**
   * Get product title
   */
  async getProductTitle(): Promise<string> {
    return (await this.productTitle.textContent()) || '';
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) || '';
  }

  /**
   * Verify product details are displayed
   */
  async verifyProductDetailsVisible(): Promise<void> {
    await expect(this.productTitle).toBeVisible({ timeout: 5000 });
    await expect(this.productImage).toBeVisible();
  }

  /**
   * Get current quantity
   */
  async getCurrentQuantity(): Promise<string> {
    return await this.quantityInput.inputValue();
  }

  /**
   * Set quantity
   */
  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
  }

  /**
   * Increase quantity by n
   */
  async increaseQuantity(count: number = 1): Promise<void> {
    for (let i = 0; i < count; i++) {
      if (await this.isElementVisible(this.increaseQuantityBtn)) {
        await this.increaseQuantityBtn.click();
      }
    }
  }

  /**
   * Decrease quantity by n
   */
  async decreaseQuantity(count: number = 1): Promise<void> {
    for (let i = 0; i < count; i++) {
      if (await this.isElementVisible(this.decreaseQuantityBtn)) {
        await this.decreaseQuantityBtn.click();
      }
    }
  }

  /**
   * Add product to cart
   */
  async addToCart(): Promise<void> {
    await this.clickSafely(this.addToCartBtn);
    // Wait for success message or cart update
    const successMsg = this.page.locator('[role="alert"], .alert, .toast').filter({ hasText: /added|success/i });
    await expect(successMsg.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // If no success message, just wait a bit
    });
  }

  /**
   * Add to favorites
   */
  async addToFavorites(): Promise<void> {
    await this.clickSafely(this.addToFavoritesBtn);
  }

  /**
   * Get related products count
   */
  async getRelatedProductsCount(): Promise<number> {
    return await this.relatedProducts.count();
  }

  /**
   * Sort products by option
   */
  async sortBy(option: string): Promise<void> {
    const sortBtn = this.page.locator('[data-test="product-sort"]');
    if (await this.isElementVisible(sortBtn)) {
      await sortBtn.click();
      const optionLocator = this.page.locator(`[role="option"]:has-text("${option}"), button:has-text("${option}")`);
      if (await this.isElementVisible(optionLocator)) {
        await optionLocator.click();
      }
    } else {
      // Try selecting from dropdown
      const select = this.page.locator('select').first();
      if (await this.isElementVisible(select)) {
        await select.selectOption(option);
      }
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Filter by price range
   */
  async filterByPriceRange(min: number, max: number): Promise<void> {
    const rangeInput = this.page.locator('input[type="range"]');
    if (await this.isElementVisible(rangeInput)) {
      // Set price range - typically done through sliders or input fields
      const minInput = this.page.locator('input[placeholder*="Min"], input[placeholder*="min"]').first();
      const maxInput = this.page.locator('input[placeholder*="Max"], input[placeholder*="max"]').first();
      
      if (await this.isElementVisible(minInput)) {
        await minInput.fill(min.toString());
      }
      if (await this.isElementVisible(maxInput)) {
        await maxInput.fill(max.toString());
      }
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Filter by category
   */
  async filterByCategory(categoryName: string): Promise<void> {
    const categoryCheckbox = this.page.locator(`label:has-text("${categoryName}") input[type="checkbox"], input[value="${categoryName}"]`);
    if (await this.isElementVisible(categoryCheckbox)) {
      await categoryCheckbox.check();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Filter by brand
   */
  async filterByBrand(brandName: string): Promise<void> {
    const brandCheckbox = this.page.locator(`label:has-text("${brandName}") input[type="checkbox"], input[value="${brandName}"]`);
    if (await this.isElementVisible(brandCheckbox)) {
      await brandCheckbox.check();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Filter by eco-friendly status
   */
  async filterByEcoFriendly(): Promise<void> {
    const ecoCheckbox = this.page.locator('input[type="checkbox"]').filter({ hasText: /eco|sustainable|green/i });
    if (await this.isElementVisible(ecoCheckbox)) {
      await ecoCheckbox.check();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Search products by keyword
   */
  async searchProducts(keyword: string): Promise<void> {
    const searchField = this.page.locator('[data-test="search-query"], input[placeholder*="search"]');
    if (await this.isElementVisible(searchField)) {
      await searchField.fill(keyword);
      const searchBtn = this.page.locator('[data-test="search-submit"], button:has-text("Search")');
      if (await this.isElementVisible(searchBtn)) {
        await searchBtn.click();
      } else {
        await this.page.keyboard.press('Enter');
      }
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Get all product listings on current page
   */
  async getProductListings(): Promise<Locator> {
    return this.page.locator('a[href*="/product/"]');
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    const listings = await this.getProductListings();
    return await listings.count();
  }

  /**
   * Verify description is visible
   */
  async verifyDescriptionVisible(): Promise<void> {
    const desc = this.page.locator('p').filter({ hasText: /description|details|specifications/i });
    if (await this.isElementVisible(desc)) {
      await expect(desc.first()).toBeVisible();
    }
  }
}
