import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Checkout elements
  readonly checkoutTitle = this.page.locator('h1, [role="heading"]').filter({ hasText: /checkout/i });
  readonly checkoutContainer = this.page.locator('[data-test="checkout"], main');

  // Sign in / Register options
  readonly signInTab = this.page.locator('button:has-text("Sign In"), [role="tab"]:has-text("Sign In")');
  readonly registerTab = this.page.locator('button:has-text("Register"), [role="tab"]:has-text("Register")');
  readonly guestCheckoutBtn = this.page.locator('button:has-text("Continue as Guest"), button:has-text("guest")');

  // Sign in fields
  readonly checkoutEmailField = this.page.locator('input[type="email"][placeholder*="email"]').first();
  readonly checkoutPasswordField = this.page.locator('input[type="password"]').first();
  readonly signInSubmitBtn = this.page.locator('button:has-text("Sign In"), button:has-text("Login")').first();

  // Register fields
  readonly registerEmailField = this.page.locator('input[type="email"]').nth(1);
  readonly registerPasswordField = this.page.locator('input[type="password"]').nth(1);
  readonly confirmPasswordField = this.page.locator('input[placeholder*="confirm"], input[type="password"]').last();
  readonly registerSubmitBtn = this.page.locator('button:has-text("Register"), button:has-text("Create Account")');

  // Forgotten password
  readonly forgotPasswordLink = this.page.locator('a:has-text("Forgot"), button:has-text("Forgot")');
  readonly forgotPasswordForm = this.page.locator('form').filter({ hasText: /forgot|reset/i });

  // Billing/Shipping
  readonly billingAddressStep = this.page.locator('[data-test="billing"], [data-test="address"]');
  readonly billingFirstName = this.page.locator('input[placeholder*="First name"]').first();
  readonly billingLastName = this.page.locator('input[placeholder*="Last name"]').first();
  readonly billingAddress = this.page.locator('input[placeholder*="Address"]').first();
  readonly billingCity = this.page.locator('input[placeholder*="City"]').first();
  readonly billingPostCode = this.page.locator('input[placeholder*="Postal"]').first();
  readonly billingCountry = this.page.locator('select, input[placeholder*="Country"]').first();

  // Payment
  readonly paymentStep = this.page.locator('[data-test="payment"], [data-test="payment-step"]');
  readonly cardNumberField = this.page.locator('input[placeholder*="Card"], input[placeholder*="number"]').first();
  readonly expiryField = this.page.locator('input[placeholder*="MM/YY"], input[placeholder*="Expiry"]').first();
  readonly cvvField = this.page.locator('input[placeholder*="CVV"], input[placeholder*="CVC"]').first();
  readonly cardNameField = this.page.locator('input[placeholder*="Name"]').first();

  // Order confirmation
  readonly orderConfirmation = this.page.locator('[data-test="order-confirmation"], text=/order|thank/i');
  readonly orderNumber = this.page.locator('text=/Order #/').first();

  // Navigation
  readonly nextStepBtn = this.page.locator('button:has-text("Next"), button:has-text("Continue")');
  readonly prevStepBtn = this.page.locator('button:has-text("Back"), button:has-text("Previous")');
  readonly submitOrderBtn = this.page.locator('button:has-text("Place Order"), button:has-text("Submit")');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to checkout page
   */
  async gotoCheckout(): Promise<void> {
    await super.goto('/checkout');
  }

  /**
   * Verify checkout page loaded
   */
  async verifyCheckoutPageLoaded(): Promise<void> {
    await expect(this.checkoutContainer).toBeVisible({ timeout: 10000 });
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<void> {
    // Click sign in tab if available
    if (await this.isElementVisible(this.signInTab)) {
      await this.signInTab.click();
      await this.page.waitForTimeout(300);
    }

    if (await this.isElementVisible(this.checkoutEmailField)) {
      await this.checkoutEmailField.fill(email);
    }
    if (await this.isElementVisible(this.checkoutPasswordField)) {
      await this.checkoutPasswordField.fill(password);
    }

    await this.clickSafely(this.signInSubmitBtn);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Register new account
   */
  async register(email: string, password: string, confirmPassword: string): Promise<void> {
    // Click register tab if available
    if (await this.isElementVisible(this.registerTab)) {
      await this.registerTab.click();
      await this.page.waitForTimeout(300);
    }

    if (await this.isElementVisible(this.registerEmailField)) {
      await this.registerEmailField.fill(email);
    }
    if (await this.isElementVisible(this.registerPasswordField)) {
      await this.registerPasswordField.fill(password);
    }
    if (await this.isElementVisible(this.confirmPasswordField)) {
      await this.confirmPasswordField.fill(confirmPassword);
    }

    await this.clickSafely(this.registerSubmitBtn);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Continue as guest
   */
  async continueAsGuest(): Promise<void> {
    await this.clickSafely(this.guestCheckoutBtn);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.clickSafely(this.forgotPasswordLink);
  }

  /**
   * Verify forgot password form visible
   */
  async verifyForgotPasswordFormVisible(): Promise<void> {
    await expect(this.forgotPasswordForm).toBeVisible({ timeout: 5000 });
  }

  /**
   * Fill billing address
   */
  async fillBillingAddress(
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postCode: string,
    country?: string
  ): Promise<void> {
    if (await this.isElementVisible(this.billingFirstName)) {
      await this.billingFirstName.fill(firstName);
    }
    if (await this.isElementVisible(this.billingLastName)) {
      await this.billingLastName.fill(lastName);
    }
    if (await this.isElementVisible(this.billingAddress)) {
      await this.billingAddress.fill(address);
    }
    if (await this.isElementVisible(this.billingCity)) {
      await this.billingCity.fill(city);
    }
    if (await this.isElementVisible(this.billingPostCode)) {
      await this.billingPostCode.fill(postCode);
    }
    if (country && await this.isElementVisible(this.billingCountry)) {
      await this.billingCountry.selectOption(country).catch(() => {
        // If not a select, try filling as text
        this.billingCountry.fill(country);
      });
    }
  }

  /**
   * Fill payment information
   */
  async fillPaymentInfo(
    cardNumber: string,
    expiry: string,
    cvv: string,
    cardName: string
  ): Promise<void> {
    if (await this.isElementVisible(this.cardNumberField)) {
      await this.cardNumberField.fill(cardNumber);
    }
    if (await this.isElementVisible(this.expiryField)) {
      await this.expiryField.fill(expiry);
    }
    if (await this.isElementVisible(this.cvvField)) {
      await this.cvvField.fill(cvv);
    }
    if (await this.isElementVisible(this.cardNameField)) {
      await this.cardNameField.fill(cardName);
    }
  }

  /**
   * Click next step
   */
  async nextStep(): Promise<void> {
    await this.clickSafely(this.nextStepBtn);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click previous step
   */
  async prevStep(): Promise<void> {
    await this.clickSafely(this.prevStepBtn);
  }

  /**
   * Submit order
   */
  async submitOrder(): Promise<void> {
    await this.clickSafely(this.submitOrderBtn);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify billing address step visible
   */
  async verifyBillingAddressStepVisible(): Promise<void> {
    await expect(this.billingAddressStep).toBeVisible({ timeout: 5000 });
  }

  /**
   * Verify payment step visible
   */
  async verifyPaymentStepVisible(): Promise<void> {
    await expect(this.paymentStep).toBeVisible({ timeout: 5000 });
  }

  /**
   * Get order number
   */
  async getOrderNumber(): Promise<string> {
    return (await this.orderNumber.textContent()) || '';
  }

  /**
   * Verify order confirmation
   */
  async verifyOrderConfirmation(): Promise<void> {
    await expect(this.orderConfirmation).toBeVisible({ timeout: 10000 });
  }
}
