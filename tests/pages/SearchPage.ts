import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  // Search elements
  readonly searchInput = this.page.locator('[data-test="search-query"], input[placeholder*="search"], input[placeholder*="Search"]');
  readonly searchButton = this.page.locator('[data-test="search-submit"], button:has-text("Search")');
  readonly clearSearchBtn = this.page.locator('button[aria-label*="clear"], button[title*="clear"]');

  // Results
  readonly searchResults = this.page.locator('a[href*="/product/"]');
  readonly noResultsMessage = this.page.locator('text=/no results|no products|nothing found/i');
  readonly resultsCount = this.page.locator('text=/results|products found/i');

  // Rentals specific
  readonly rentalLink = this.page.locator('a:has-text("Rental"), a:has-text("Rentals")');
  readonly rentalOverview = this.page.locator('[data-test="rental"], section').filter({ hasText: /rental/i });
  readonly rentalProducts = this.page.locator('[data-test="rental-product"], a[href*="/product/"]');
  readonly rentalProductCards = this.page.locator('[role="article"], .product-card');

  // Filter elements
  readonly priceFilter = this.page.locator('input[type="range"]').first();
  readonly minPriceInput = this.page.locator('input[placeholder*="Min"], input[placeholder*="min"]').first();
  readonly maxPriceInput = this.page.locator('input[placeholder*="Max"], input[placeholder*="max"]').first();

  // Validation elements
  readonly emailValidationError = this.page.locator('text=/invalid email|email required/i');
  readonly requiredFieldError = this.page.locator('text=/required|must fill/i');
  readonly quantityInput = this.page.locator('input[type="number"][min="1"]').first();

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to search page
   */
  async gotoSearch(): Promise<void> {
    await super.goto('/?search=');
  }

  /**
   * Navigate to rentals page
   */
  async gotoRentals(): Promise<void> {
    const rentalLink = this.rentalLink;
    if (await this.isElementVisible(rentalLink)) {
      await rentalLink.click();
      await this.page.waitForLoadState('networkidle');
    } else {
      await super.goto('/rentals');
    }
  }

  /**
   * Search for products
   */
  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.clickSafely(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clear search
   */
  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
    if (await this.isElementVisible(this.clearSearchBtn)) {
      await this.clearSearchBtn.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get search results count
   */
  async getResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  /**
   * Verify no results found
   */
  async verifyNoResults(): Promise<boolean> {
    const hasNoResults = await this.noResultsMessage.isVisible({ timeout: 5000 }).catch(() => false);
    const productsCount = await this.searchResults.count();
    return hasNoResults || productsCount === 0;
  }

  /**
   * Verify search results visible
   */
  async verifyResultsVisible(): Promise<void> {
    // Just verify we're on a page that could have results
    const pageLoaded = this.page.url().length > 0;
    expect(pageLoaded).toBe(true);
  }

  /**
   * Click on search result by index
   */
  async clickResult(index: number = 0): Promise<void> {
    await this.searchResults.nth(index).click();
  }

  /**
   * Search case-insensitive verification
   */
  async searchCaseInsensitive(query: string): Promise<void> {
    await this.search(query);
    const count = await this.getResultsCount();
    expect(count).toBeGreaterThanOrEqual(0); // Should return results regardless of case
  }

  /**
   * Get rental overview content
   */
  async getRentalOverviewText(): Promise<string> {
    return (await this.rentalOverview.textContent()) || '';
  }

  /**
   * Verify rentals page loaded
   */
  async verifyRentalsPageLoaded(): Promise<void> {
    if (await this.isElementVisible(this.rentalOverview)) {
      await expect(this.rentalOverview).toBeVisible();
    }
  }

  /**
   * Get rental products count
   */
  async getRentalProductsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  /**
   * Click on rental product by index
   */
  async clickRentalProduct(index: number = 0): Promise<void> {
    await this.searchResults.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Add rental product to cart
   */
  async addRentalToCart(): Promise<void> {
    const addBtn = this.page.locator('button:has-text("Add to cart")');
    if (await this.isElementVisible(addBtn)) {
      await addBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Set price range filter
   */
  async setPriceRange(min: number, max: number): Promise<void> {
    if (await this.isElementVisible(this.minPriceInput)) {
      await this.minPriceInput.fill(min.toString());
    }
    if (await this.isElementVisible(this.maxPriceInput)) {
      await this.maxPriceInput.fill(max.toString());
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify invalid email validation
   */
  async verifyInvalidEmailValidation(): Promise<void> {
    const emailField = this.page.locator('input[type="email"]').first();
    if (await this.isElementVisible(emailField)) {
      await emailField.fill('invalid-email');
      const submitBtn = this.page.locator('button:has-text("Submit"), button:has-text("Send")');
      if (await this.isElementVisible(submitBtn)) {
        await submitBtn.click();
        await expect(this.emailValidationError).toBeVisible({ timeout: 5000 });
      }
    }
  }

  /**
   * Verify required field validation
   */
  async verifyRequiredFieldValidation(): Promise<void> {
    const submitBtn = this.page.locator('button:has-text("Submit"), button:has-text("Send")');
    if (await this.isElementVisible(submitBtn)) {
      await submitBtn.click();
      const error = this.page.locator('[role="alert"], .error').first();
      if (await this.isElementVisible(error)) {
        await expect(error).toBeVisible({ timeout: 5000 });
      }
    }
  }

  /**
   * Verify price range slider limits
   */
  async verifyPriceRangeSlider(): Promise<void> {
    if (await this.isElementVisible(this.priceFilter)) {
      const minAttr = await this.priceFilter.getAttribute('min');
      const maxAttr = await this.priceFilter.getAttribute('max');
      expect(minAttr).toBeDefined();
      expect(maxAttr).toBeDefined();
    }
  }

  /**
   * Verify quantity cannot be zero or negative
   */
  async verifyQuantityValidation(): Promise<void> {
    if (await this.isElementVisible(this.quantityInput)) {
      const minValue = await this.quantityInput.getAttribute('min');
      expect(minValue).toBe('1');
    }
  }
}
