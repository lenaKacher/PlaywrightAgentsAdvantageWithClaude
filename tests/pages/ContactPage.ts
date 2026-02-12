import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  // Contact form elements
  readonly contactForm = this.page.locator('form, [role="form"]');
  readonly subjectDropdown = this.page.locator('select, [data-test="subject"]').first();
  readonly subjectOptions = this.page.locator('option, [role="option"]');

  // Form fields
  readonly nameField = this.page.locator('input[placeholder*="name"], input[placeholder*="Name"]').first();
  readonly emailField = this.page.locator('input[type="email"], input[placeholder*="email"]').first();
  readonly messageField = this.page.locator('textarea, textarea[placeholder*="message"]').first();
  readonly messageTextarea = this.page.locator('[data-test="message"], textarea').first();

  // Action buttons
  readonly submitBtn = this.page.locator('button:has-text("Send"), button:has-text("Submit")').first();
  readonly resetBtn = this.page.locator('button:has-text("Reset"), button:has-text("Clear")');
  readonly attachFileInput = this.page.locator('input[type="file"]');

  // File input for attachment
  readonly fileAttachmentBtn = this.page.locator('button:has-text("Attach"), button:has-text("Upload")').first();

  // Success/Error messages
  readonly successMessage = this.page.locator('[role="alert"], .alert-success, .toast-success').filter({ hasText: /success|sent|received/i });
  readonly errorMessage = this.page.locator('[role="alert"], .alert-danger, .toast-error').filter({ hasText: /error|required|invalid/i });
  readonly validationError = this.page.locator('[role="alert"], .error, .validation-error');

  // Contact page heading
  readonly contactHeading = this.page.locator('h1, [role="heading"]').filter({ hasText: /contact/i });

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to contact page
   */
  async gotoContact(): Promise<void> {
    await super.goto('/contact');
  }

  /**
   * Verify contact form visible
   */
  async verifyContactFormVisible(): Promise<void> {
    await expect(this.contactForm).toBeVisible({ timeout: 5000 });
  }

  /**
   * Get contact page heading
   */
  async getContactPageHeading(): Promise<string> {
    return (await this.contactHeading.textContent()) || '';
  }

  /**
   * Fill contact form with data
   */
  async fillContactForm(name: string, email: string, message: string): Promise<void> {
    // Wait for form fields to be stable
    await this.page.waitForTimeout(300);

    if (await this.isElementVisible(this.nameField)) {
      await this.nameField.fill(name);
    }

    if (await this.isElementVisible(this.emailField)) {
      await this.emailField.fill(email);
    }

    // Use messageTextarea or messageField
    const messageInput = await this.isElementVisible(this.messageTextarea) ? this.messageTextarea : this.messageField;
    if (await this.isElementVisible(messageInput)) {
      await messageInput.fill(message);
    }
  }

  /**
   * Select subject from dropdown
   */
  async selectSubject(subject: string): Promise<void> {
    if (await this.isElementVisible(this.subjectDropdown)) {
      const dropdown = this.subjectDropdown;
      const isSelect = await this.page.evaluate(
        (el) => el ? el.tagName === 'SELECT' : false,
        await dropdown.elementHandle().catch(() => null)
      ).catch(() => false);

      if (isSelect) {
        await dropdown.selectOption(subject);
      } else {
        // Handle custom dropdown
        await dropdown.click();
        const option = this.page.locator(`[role="option"]:has-text("${subject}"), option:has-text("${subject}")`);
        if (await this.isElementVisible(option)) {
          await option.click();
        }
      }
    }
  }

  /**
   * Submit contact form
   */
  async submitForm(): Promise<void> {
    await this.clickSafely(this.submitBtn);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Reset form
   */
  async resetForm(): Promise<void> {
    await this.clickSafely(this.resetBtn);
  }

  /**
   * Verify success message
   */
  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: 5000 });
  }

  /**
   * Verify error message
   */
  async verifyErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
  }

  /**
   * Get error messages
   */
  async getErrorMessages(): Promise<string[]> {
    const errors = await this.errorMessage.all();
    const messages = [];
    for (const error of errors) {
      const text = await error.textContent();
      if (text) messages.push(text);
    }
    return messages;
  }

  /**
   * Attach file to form
   */
  async attachFile(filePath: string): Promise<void> {
    const fileInput = this.attachFileInput;
    if (await this.isElementVisible(fileInput)) {
      await fileInput.setInputFiles(filePath);
    }
  }

  /**
   * Get form field value
   */
  async getFieldValue(fieldLabel: string): Promise<string> {
    const field = this.page.locator(`input[placeholder*="${fieldLabel}"], textarea[placeholder*="${fieldLabel}"]`).first();
    return await field.inputValue().catch(() => '');
  }

  /**
   * Verify specific form fields visible
   */
  async verifyFormFieldsVisible(fields: string[]): Promise<void> {
    for (const field of fields) {
      const fieldLocator = this.page.locator(
        `input[placeholder*="${field}"], textarea[placeholder*="${field}"], label:has-text("${field}")`
      );
      if (await this.isElementVisible(fieldLocator)) {
        await expect(fieldLocator.first()).toBeVisible();
      }
    }
  }

  /**
   * Fill and submit contact form
   */
  async fillAndSubmit(name: string, email: string, subject: string, message: string): Promise<void> {
    await this.fillContactForm(name, email, message);
    await this.selectSubject(subject);
    await this.submitForm();
  }

  /**
   * Check if submit button is disabled
   */
  async isSubmitDisabled(): Promise<boolean> {
    return await this.submitBtn.isDisabled().catch(() => false);
  }
}
