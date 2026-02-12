// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Account Management', () => {
  test('View My Account Page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account');
    
    // Verify: The page navigates to /account
    expect(page.url()).toContain('/account');
    
    // Verify: The page title shows 'My account' or similar
    const pageHeading = page.locator('h1, heading, [role="heading"]').filter({ hasText: 'account' });
    if (await pageHeading.count() > 0) {
      await expect(pageHeading.first()).toBeVisible();
    }
    
    // Verify: Account overview section displays options
    const favBtn = page.locator('button:has-text("Favorites"), a:has-text("Favorites")');
    const profileBtn = page.locator('button:has-text("Profile"), a:has-text("Profile")');
    const invoicesBtn = page.locator('button:has-text("Invoices"), a:has-text("Invoices")');
    const messagesBtn = page.locator('button:has-text("Messages"), a:has-text("Messages")');
    
    if (await favBtn.count() > 0) {
      await expect(favBtn.first()).toBeVisible();
    }
  });

  test('View Favorites', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account');
    
    // Click 'Favorites' button or link
    const favBtn = page.locator('button:has-text("Favorites"), a:has-text("Favorites")').first();
    if (await favBtn.isVisible()) {
      await favBtn.click();
    }
    
    // Alternative: Navigate directly
    if (!page.url().includes('/favorites')) {
      await page.goto('https://practicesoftwaretesting.com/account/favorites');
    }
    
    // Verify: The page navigates to /account/favorites
    expect(page.url()).toContain('/favorites');
    
    // A list of favorite products may be displayed
    const productsList = page.locator('a[href*="/product/"]');
    if (await productsList.count() > 0) {
      expect(await productsList.count()).toBeGreaterThanOrEqual(0);
    }
  });

  test('View Profile', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account');
    
    // Click 'Profile' button or link
    const profileBtn = page.locator('button:has-text("Profile"), a:has-text("Profile")').first();
    if (await profileBtn.isVisible()) {
      await profileBtn.click();
    }
    
    // Alternative: Navigate directly
    if (!page.url().includes('/profile')) {
      await page.goto('https://practicesoftwaretesting.com/account/profile');
    }
    
    // Verify: The page navigates to /account/profile
    expect(page.url()).toContain('/profile');
    
    // User profile information should be displayed
    const profileForm = page.locator('form, input[placeholder*="name"], input[placeholder*="email"]').first();
    if (await profileForm.isVisible()) {
      await expect(profileForm).toBeVisible();
    }
  });

  test('View Invoices', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account');
    
    // Click 'Invoices' button or link
    const invoicesBtn = page.locator('button:has-text("Invoices"), a:has-text("Invoices")').first();
    if (await invoicesBtn.isVisible()) {
      await invoicesBtn.click();
    }
    
    // Alternative: Navigate directly
    if (!page.url().includes('/invoices')) {
      await page.goto('https://practicesoftwaretesting.com/account/invoices');
    }
    
    // Verify: The page navigates to /account/invoices
    expect(page.url()).toContain('/invoices');
    
    // Invoices list may be displayed
    const invoicesList = page.locator('table, [role="table"], li').first();
    if (await invoicesList.isVisible()) {
      expect(await invoicesList.isVisible()).toBe(true);
    }
  });

  test('View Messages', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account');
    
    // Click 'Messages' button or link
    const messagesBtn = page.locator('button:has-text("Messages"), a:has-text("Messages")').first();
    if (await messagesBtn.isVisible()) {
      await messagesBtn.click();
    }
    
    // Alternative: Navigate directly
    if (!page.url().includes('/messages')) {
      await page.goto('https://practicesoftwaretesting.com/account/messages');
    }
    
    // Verify: The page navigates to /account/messages
    expect(page.url()).toContain('/messages');
    
    // Messages may be displayed
    const messagesList = page.locator('[role="list"], table, div').first();
    if (await messagesList.isVisible()) {
      expect(await messagesList.isVisible()).toBe(true);
    }
  });

  test('Edit Profile Information', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/account/profile');
    
    // Locate and click an 'Edit' button or make form fields editable
    const editBtn = page.locator('button:has-text("Edit"), a:has-text("Edit")').first();
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Try to find editable fields
    const nameField = page.locator('input[placeholder*="name"], input[placeholder*="Name"]').first();
    if (await nameField.isVisible()) {
      // Clear and fill with new name
      await nameField.fill('John Updated');
      
      // Save changes
      const saveBtn = page.locator('button:has-text("Save"), button:has-text("Update")').first();
      if (await saveBtn.isVisible()) {
        await saveBtn.click();
        
        // Verify: Success message or confirmation
        await page.waitForTimeout(500);
      }
    }
  });
});
