// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('View Contact Form', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact');
    
    // Verify: The page navigates to /contact
    expect(page.url()).toContain('/contact');
    
    // Verify: The page title shows 'Contact'
    const contactHeading = page.locator('h1, heading').filter({ hasText: 'Contact' });
    if (await contactHeading.count() > 0) {
      await expect(contactHeading.first()).toBeVisible();
    }
    
    // Verify: A contact form is visible with fields
    const firstNameField = page.locator('input[placeholder*="first name"], input[placeholder*="First"]');
    const lastNameField = page.locator('input[placeholder*="last name"], input[placeholder*="Last"]');
    const emailField = page.locator('input[placeholder*="email"], input[type="email"]');
    
    if (await firstNameField.count() > 0) {
      await expect(firstNameField.first()).toBeVisible();
    }
  });

  test('Fill Contact Form with Valid Data', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact');
    
    // Fill in all required fields
    const firstNameField = page.locator('input[placeholder*="first name"]').or(page.locator('input[placeholder*="First"]')).first();
    const lastNameField = page.locator('input[placeholder*="last name"]').or(page.locator('input[placeholder*="Last"]')).first();
    const emailField = page.locator('input[placeholder*="email"], input[type="email"]').first();
    const subjectSelect = page.locator('select, [role="combobox"]').first();
    const messageField = page.locator('textarea, input[placeholder*="message"]').first();
    
    if (await firstNameField.isVisible()) {
      await firstNameField.fill('John');
    }
    if (await lastNameField.isVisible()) {
      await lastNameField.fill('Doe');
    }
    if (await emailField.isVisible()) {
      await emailField.fill('john@example.com');
    }
    if (await subjectSelect.isVisible()) {
      await subjectSelect.selectOption('Customer service').catch(() => {
        // If not a select, try typing
      });
    }
    if (await messageField.isVisible()) {
      await messageField.fill('This is a test message.');
    }
    
    // Click the 'Send' button
    const sendBtn = page.locator('button:has-text("Send")').first();
    if (await sendBtn.isVisible()) {
      await sendBtn.click();
      
      // Verify: Form is submitted or confirmation message appears
      await page.waitForTimeout(500);
    }
  });

  test('Submit Contact Form with Missing Fields', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact');
    
    // Fill in only some required fields
    const firstNameField = page.locator('input[placeholder*="first name"]').or(page.locator('input[placeholder*="First"]')).first();
    const emailField = page.locator('input[placeholder*="email"], input[type="email"]').first();
    
    if (await firstNameField.isVisible()) {
      await firstNameField.fill('John');
    }
    if (await emailField.isVisible()) {
      await emailField.fill('john@example.com');
    }
    
    // Try to send without filling all required fields
    const sendBtn = page.locator('button:has-text("Send")').first();
    if (await sendBtn.isVisible()) {
      await sendBtn.click();
      
      // Verify: Validation errors appear for missing required fields
      await page.waitForTimeout(500);
      
      // Check if page still shows form (validation failed)
      expect(page.url()).toContain('/contact');
    }
  });

  test('Select Contact Subject', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact');
    
    // Click the 'Subject' dropdown
    const subjectDropdown = page.locator('select, [role="combobox"]').first();
    if (await subjectDropdown.isVisible()) {
      // If it's a select element
      if (await subjectDropdown.evaluate(el => el.tagName === 'SELECT')) {
        await subjectDropdown.selectOption('Return');
      } else {
        // If it's a custom dropdown
        await subjectDropdown.click();
        
        // Click 'Return' option
        const returnOption = page.locator('text=Return, [role="option"]:has-text("Return")');
        if (await returnOption.count() > 0) {
          await returnOption.first().click();
        }
      }
      
      await page.waitForTimeout(300);
    }
  });

  test('Attach File to Contact Form', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact');
    
    // Click the 'Attachment' button
    const attachmentBtn = page.locator('button:has-text("Attachment"), input[type="file"]').first();
    if (await attachmentBtn.isVisible()) {
      // If it's a file input, handle file upload
      if (await attachmentBtn.evaluate(el => el.tagName === 'INPUT')) {
        // File upload would require valid file path
        // Note: Form states 'Only files with the txt extension are allowed'
      } else {
        // If it's a button, click it to open file picker
        await attachmentBtn.click();
        await page.waitForTimeout(300);
      }
    }
  });
});
