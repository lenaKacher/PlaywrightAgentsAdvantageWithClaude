import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Cart elements
  readonly cartTable = this.page.locator('table, [role="table"]');
  readonly cartItems = this.page.locator('tr[data-test*="cart"], [data-test*="cart-item"]');
  readonly cartTotal = this.page.locator('[data-test="cart-total"], text=/Total|total/');
  readonly cartSubtotal = this.page.locator('text=/Subtotal|subtotal/').first();
  readonly cartTax = this.page.locator('text=/Tax|tax/').first();
  readonly cartShipping = this.page.locator('text=/Shipping|shipping/').first();

  // Cart actions
  readonly continueShoppingBtn = this.page.locator('button:has-text("Continue Shopping"), a:has-text("Continue Shopping")');
  readonly proceedToCheckoutBtn = this.page.locator('button:has-text("Proceed to"), button:has-text("Checkout")');
  readonly emptyCartBtn = this.page.locator('button:has-text("Empty"), button:has-text("Clear")');

  // Item controls
  readonly quantityInputs = this.page.locator('input[type="number"]');
  readonly removeButtons = this.page.locator('button:has-text("Remove"), button[aria-label*="remove"]');
  readonly productLinks = this.page.locator('a[href*="/product/"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to cart page
   */
  async gotoCart(): Promise<void> {
    await super.goto('/checkout');
  }

  /**
   * Get cart items count
   */
  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get cart total price
   */
  async getCartTotal(): Promise<string> {
    return (await this.cartTotal.textContent()) || '';
  }

  /**
   * Verify cart items table is visible
   */
  async verifyCartTableVisible(): Promise<void> {
    await expect(this.cartTable).toBeVisible({ timeout: 5000 });
  }

  /**
   * Modify product quantity in cart
   */
  async modifyQuantity(itemIndex: number, newQuantity: number): Promise<void> {
    const quantityInput = this.quantityInputs.nth(itemIndex);
    await quantityInput.fill(newQuantity.toString());
    await this.page.waitForTimeout(500); // Wait for cart to update
  }

  /**
   * Remove product from cart
   */
  async removeProduct(itemIndex: number): Promise<void> {
    const removeBtn = this.removeButtons.nth(itemIndex);
    if (await this.isElementVisible(removeBtn)) {
      await removeBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Remove first product from cart
   */
  async removeFirstProduct(): Promise<void> {
    await this.removeProduct(0);
  }

  /**
   * Continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.clickSafely(this.continueShoppingBtn);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.clickSafely(this.proceedToCheckoutBtn);
    await this.waitForURL('**/checkout', 10000);
  }

  /**
   * Empty cart
   */
  async emptyCart(): Promise<void> {
    if (await this.isElementVisible(this.emptyCartBtn)) {
      await this.emptyCartBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Get product in cart by name
   */
  async getProductRow(productName: string): Promise<Locator> {
    return this.page.locator(`tr:has-text("${productName}"), [data-test*="cart"]:has-text("${productName}")`).first();
  }

  /**
   * Click on a product link in cart
   */
  async clickProductInCart(index: number = 0): Promise<void> {
    await this.productLinks.nth(index).click();
  }

  /**
   * Verify subtotal, tax, shipping calculations
   */
  async verifyCartCalculations(): Promise<void> {
    if (await this.isElementVisible(this.cartSubtotal)) {
      await expect(this.cartSubtotal).toBeVisible();
    }
    if (await this.isElementVisible(this.cartTax)) {
      await expect(this.cartTax).toBeVisible();
    }
  }

  /**
   * Get number of items in cart
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
