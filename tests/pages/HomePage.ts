import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Navigation elements
  readonly signInButton = this.page.locator('[data-test="nav-sign-in"]');
  readonly accountButton = this.page.locator('[data-test="nav-account"], button:has-text("Account"), a:has-text("Account")');
  readonly cartButton = this.page.locator('[data-test="nav-cart"]');
  readonly cartBadge = this.page.locator('[data-test="nav-cart"] span, [data-test="nav-cart"] [role="img"]');
  readonly contactButton = this.page.locator('a:has-text("Contact"), button:has-text("Contact")');
  readonly logoButton = this.page.locator('[data-test="nav-logo"], img[alt*="logo"]').first();

  // Search elements
  readonly searchField = this.page.locator('[data-test="search-query"], input[placeholder*="search"], input[placeholder*="Search"]');
  readonly searchButton = this.page.locator('[data-test="search-submit"], button:has-text("Search")');

  // Menu elements
  readonly categoryLinks = this.page.locator('a[href*="/category/"]');
  readonly handToolsLink = this.page.locator('a:has-text("Hand Tools")');
  readonly powerToolsLink = this.page.locator('a:has-text("Power Tools")');
  readonly specialToolsLink = this.page.locator('a:has-text("Special Tools")');

  // Product listing
  readonly productCards = this.page.locator('a[href*="/product/"]');
  readonly productImages = this.page.locator('a[href*="/product/"] img');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to home page
   */
  async goto(): Promise<void> {
    await super.goto();
  }

  /**
   * Navigate to a specific category
   */
  async navigateToCategory(categoryName: string): Promise<void> {
    const categoryLink = this.page.locator(`a:has-text("${categoryName}")`);
    if (await this.isElementVisible(categoryLink)) {
      await categoryLink.click();
    } else {
      // Fallback to direct navigation
      const categoryPath = categoryName.toLowerCase().replace(/\s+/g, '-');
      await super.goto(`/category/${categoryPath}`);
    }
  }

  /**
   * Click on a product by index
   */
  async clickProduct(index: number = 0): Promise<void> {
    await this.productCards.nth(index).click();
  }

  /**
   * Click on a product by partial name
   */
  async clickProductByName(productName: string): Promise<void> {
    const productLink = this.page.locator(`a[href*="/product/"]:has-text("${productName}")`);
    await this.clickSafely(productLink);
  }

  /**
   * Get number of products shown
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Search for a product
   */
  async searchProduct(query: string): Promise<void> {
    await this.searchField.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clear search results
   */
  async clearSearch(): Promise<void> {
    await this.searchField.clear();
    // Find and click the X/Clear button if available
    const clearBtn = this.page.locator('button[aria-label*="clear"], button[title*="clear"]').first();
    if (await this.isElementVisible(clearBtn)) {
      await clearBtn.click();
    }
  }

  /**
   * Navigate to account page
   */
  async goToAccount(): Promise<void> {
    await this.clickSafely(this.accountButton);
    await this.waitForURL('**/account', 10000);
  }

  /**
   * Navigate to cart page
   */
  async goToCart(): Promise<void> {
    await this.clickSafely(this.cartButton);
  }

  /**
   * Navigate to contact page
   */
  async goToContact(): Promise<void> {
    await this.clickSafely(this.contactButton);
  }

  /**
   * Get cart badge count
   */
  async getCartCount(): Promise<string> {
    const badge = this.cartBadge;
    if (await this.isElementVisible(badge)) {
      return await badge.textContent() || '0';
    }
    return '0';
  }

  /**
   * Verify home page loaded
   */
  async verifyHomePageLoaded(): Promise<void> {
    const products = this.page.locator('a[href*="/product/"]');
    await expect(products.first()).toBeVisible({ timeout: 10000 });
  }

  /**
   * Get page title or heading
   */
  async getPageTitle(): Promise<string> {
    const title = this.page.locator('h1, [role="heading"]').first();
    return (await title.textContent()) || '';
  }

  /**
   * Click on logo to go home
   */
  async clickLogo(): Promise<void> {
    await this.clickSafely(this.logoButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get viewport and verify responsive design
   */
  async setViewport(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify product images load
   */
  async verifyProductImagesLoad(): Promise<void> {
    const images = this.productImages;
    const count = await this.getElementCount(images);
    expect(count).toBeGreaterThan(0);
  }
}
