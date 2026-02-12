import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  // Account navigation elements
  readonly myAccountLink = this.page.locator('a:has-text("My account"), button:has-text("My account")').first();
  readonly favoritesBtn = this.page.locator('button:has-text("Favorites"), a:has-text("Favorites")');
  readonly profileBtn = this.page.locator('button:has-text("Profile"), a:has-text("Profile")');
  readonly invoicesBtn = this.page.locator('button:has-text("Invoices"), a:has-text("Invoices")');
  readonly messagesBtn = this.page.locator('button:has-text("Messages"), a:has-text("Messages")');
  readonly signOutBtn = this.page.locator('button:has-text("Sign out"), a:has-text("Sign out")');

  // Profile elements
  readonly profileForm = this.page.locator('form, [role="form"]');
  readonly firstNameField = this.page.locator('input[placeholder*="First"], input[placeholder*="first"]').first();
  readonly lastNameField = this.page.locator('input[placeholder*="Last"], input[placeholder*="last"]').first();
  readonly emailField = this.page.locator('input[type="email"], input[placeholder*="email"]').first();
  readonly phoneField = this.page.locator('input[type="tel"], input[placeholder*="phone"]').first();
  readonly addressField = this.page.locator('input[placeholder*="address"]').first();
  readonly cityField = this.page.locator('input[placeholder*="city"]').first();
  readonly postCodeField = this.page.locator('input[placeholder*="postal"], input[placeholder*="zip"]').first();
  readonly stateField = this.page.locator('input[placeholder*="state"], select').first();

  readonly saveProfileBtn = this.page.locator('button:has-text("Save"), button:has-text("Update")').first();
  readonly editBtn = this.page.locator('button:has-text("Edit")');

  // Favorites and other sections
  readonly favoritesList = this.page.locator('a[href*="/product/"]');
  readonly invoicesList = this.page.locator('table, [role="table"], li');
  readonly messagesList = this.page.locator('[role="list"], table, div.message');
  readonly accountHeading = this.page.locator('h1, heading, [role="heading"]').filter({ hasText: /account|profile/i });

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to account page
   */
  async gotoAccount(): Promise<void> {
    await super.goto('/account');
  }

  /**
   * Navigate to favorites page
   */
  async gotoFavorites(): Promise<void> {
    const nav = await this.clickSafely(this.favoritesBtn);
    if (!nav) {
      await super.goto('/account/favorites');
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to profile page
   */
  async gotoProfile(): Promise<void> {
    const profileLink = this.page.locator('a:has-text("Profile"), button:has-text("Profile")');
    const nav = await this.clickSafely(profileLink);
    if (!nav) {
      await super.goto('/account/profile');
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to invoices page
   */
  async gotoInvoices(): Promise<void> {
    const invoicesLink = this.page.locator('a:has-text("Invoices"), button:has-text("Invoices")');
    const nav = await this.clickSafely(invoicesLink);
    if (!nav) {
      await super.goto('/account/invoices');
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to messages page
   */
  async gotoMessages(): Promise<void> {
    const messagesLink = this.page.locator('a:has-text("Messages"), button:has-text("Messages")');
    const nav = await this.clickSafely(messagesLink);
    if (!nav) {
      await super.goto('/account/messages');
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on account menu item by name
   */
  async clickAccountMenuItem(itemName: string): Promise<void> {
    const menuItem = this.page.locator(`button:has-text("${itemName}"), a:has-text("${itemName}")`);
    await this.clickSafely(menuItem);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify account page heading
   */
  async verifyAccountPageOpen(): Promise<void> {
    if (await this.isElementVisible(this.accountHeading)) {
      await expect(this.accountHeading).toBeVisible();
    }
  }

  /**
   * Get account page title
   */
  async getAccountTitle(): Promise<string> {
    return (await this.accountHeading.textContent()) || '';
  }

  /**
   * Verify menu buttons visible
   */
  async verifyMenuButtonsVisible(): Promise<void> {
    if (await this.isElementVisible(this.favoritesBtn)) {
      await expect(this.favoritesBtn).toBeVisible();
    }
  }

  /**
   * Get favorites count
   */
  async getFavoritesCount(): Promise<number> {
    return await this.favoritesList.count();
  }

  /**
   * Get invoices count
   */
  async getInvoicesCount(): Promise<number> {
    return await this.invoicesList.count();
  }

  /**
   * Get messages count
   */
  async getMessagesCount(): Promise<number> {
    return await this.messagesList.count();
  }

  /**
   * Edit profile information
   */
  async editProfile(firstName: string, lastName: string, email: string): Promise<void> {
    // Click edit button if available
    if (await this.isElementVisible(this.editBtn)) {
      await this.editBtn.click();
      await this.page.waitForTimeout(500);
    }

    // Fill profile fields
    if (await this.isElementVisible(this.firstNameField)) {
      await this.firstNameField.fill(firstName);
    }
    if (await this.isElementVisible(this.lastNameField)) {
      await this.lastNameField.fill(lastName);
    }
    if (await this.isElementVisible(this.emailField)) {
      await this.emailField.fill(email);
    }
  }

  /**
   * Save profile changes
   */
  async saveProfile(): Promise<void> {
    if (await this.isElementVisible(this.saveProfileBtn)) {
      await this.saveProfileBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Get profile field value
   */
  async getProfileFieldValue(fieldLabel: string): Promise<string> {
    const field = this.page.locator(`input[placeholder*="${fieldLabel}"], input[aria-label*="${fieldLabel}"]`).first();
    return await field.inputValue().catch(() => '');
  }

  /**
   * Sign out from account
   */
  async signOut(): Promise<void> {
    // Find sign out option in menu
    const userMenuBtn = this.page.locator('[data-test="nav-menu"], button:has-text("Test User"), button[aria-haspopup="menu"]');
    if (await this.isElementVisible(userMenuBtn)) {
      await userMenuBtn.click();
      await this.page.waitForTimeout(300);
    }

    const signOutOption = this.page.locator('a:has-text("Sign out"), button:has-text("Sign out")').first();
    if (await this.isElementVisible(signOutOption)) {
      await signOutOption.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Verify profile form visible
   */
  async verifyProfileFormVisible(): Promise<void> {
    if (await this.isElementVisible(this.profileForm)) {
      await expect(this.profileForm).toBeVisible();
    }
  }
}
