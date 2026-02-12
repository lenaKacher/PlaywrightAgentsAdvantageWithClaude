import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../fixture/credentials';

/**
 * Base page class containing common functionality for all pages
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL path
   */
  async goto(path: string = BASE_URL): Promise<void> {
    const url = path.startsWith('http') ? path : `${BASE_URL.replace(/\/$/, '')}${path}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the current URL
   */
  getURL(): string {
    return this.page.url();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForURL(urlPattern: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for a specific timeout
   */
  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    return await locator.isVisible({ timeout }).catch(() => false);
  }

  /**
   * Check element visibility with multiple selector options
   */
  async isElementVisibleWithFallback(locators: Locator[], timeout: number = 2000): Promise<boolean> {
    for (const locator of locators) {
      if (await this.isElementVisible(locator, timeout)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Click element with retry logic
   */
  async clickSafely(locator: Locator, timeout: number = 3000): Promise<boolean> {
    try {
      if (await this.isElementVisible(locator, timeout)) {
        await locator.click({ timeout });
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  /**
   * Get element count
   */
  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  /**
   * Take a screenshot for debugging
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
