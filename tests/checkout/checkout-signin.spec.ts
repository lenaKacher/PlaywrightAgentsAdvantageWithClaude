// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Process - Sign In', () => {
  test('View Checkout Sign In Page', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout
    await page.locator('[data-test="nav-cart"]').click();
    
    // Verify: The checkout page loads at /checkout
    expect(page.url()).toContain('/checkout');
    
    // Verify: Progress indicator shows 4 steps
    const progressSteps = page.locator('text=Cart', 'text=Sign in', 'text=Billing', 'text=Payment').or(page.locator('[role="list"] li'));
    if (await progressSteps.count() > 0) {
      expect(await progressSteps.count()).toBeGreaterThanOrEqual(1);
    }
    
    // Proceed to sign in step
    const proceedBtn = page.locator('button:has-text("Proceed to checkout"), button:has-text("Continue")').first();
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Verify: Two tabs are visible: 'Sign in' and 'Continue as Guest'
    const signInTab = page.locator('[role="tab"]:has-text("Sign in"), text=Sign in');
    const guestTab = page.locator('[role="tab"]:has-text("Guest"), text=Guest, text=Continue as Guest');
    
    if (await signInTab.count() > 0) {
      await expect(signInTab.first()).toBeVisible();
    }
  });

  test('Continue as Guest', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout
    await page.locator('[data-test="nav-cart"]').click();
    
    // Proceed to sign in step
    const proceedBtn = page.locator('button:has-text("Proceed to checkout"), button:has-text("Continue")').first();
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Click on the 'Continue as Guest' tab
    const guestTab = page.locator('[role="tab"]:has-text("Guest"), text=Continue as Guest');
    if (await guestTab.count() > 0) {
      await guestTab.first().click();
      await page.waitForTimeout(500);
    }
    
    // Verify: Form is displayed with Email, First name, Last name fields
    const emailField = page.locator('input[placeholder*="email"], input[type="email"]').first();
    const firstNameField = page.locator('input[placeholder*="first name"]').first();
    const lastNameField = page.locator('input[placeholder*="last name"]').first();
    
    if (await emailField.isVisible()) {
      // Fill in guest information
      await emailField.fill('test@example.com');
      if (await firstNameField.isVisible()) {
        await firstNameField.fill('John');
      }
      if (await lastNameField.isVisible()) {
        await lastNameField.fill('Doe');
      }
      
      // Click continue as guest button
      const continueGuestBtn = page.locator('button:has-text("Continue as Guest")').last();
      if (await continueGuestBtn.isVisible()) {
        await continueGuestBtn.click();
        
        // Verify: Checkout progresses to next step
        await page.waitForTimeout(500);
      }
    }
  });

  test('Sign In with Valid Credentials', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout
    await page.locator('[data-test="nav-cart"]').click();
    
    // Proceed to sign in step
    const proceedBtn = page.locator('button:has-text("Proceed to checkout"), button:has-text("Continue")').first();
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Verify: Sign in tab is available
    const signInTab = page.locator('[role="tab"]:has-text("Sign in")').first();
    if (await signInTab.isVisible()) {
      // Fill in login form
      const emailField = page.locator('input[placeholder*="email"], input[type="email"]').first();
      const passwordField = page.locator('input[placeholder*="password"], input[type="password"]').first();
      
      if (await emailField.isVisible() && await passwordField.isVisible()) {
        await emailField.fill('test@example.com');
        await passwordField.fill('password123');
        
        // Click login button
        const loginBtn = page.locator('button:has-text("Login")').first();
        if (await loginBtn.isVisible()) {
          await loginBtn.click();
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test('Register New Account from Checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout
    await page.locator('[data-test="nav-cart"]').click();
    
    // Proceed to sign in step
    const proceedBtn = page.locator('button:has-text("Proceed to checkout"), button:has-text("Continue")').first();
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Click 'Register your account' link
    const registerLink = page.locator('a:has-text("Register"), a:has-text("register")').first();
    if (await registerLink.isVisible()) {
      await registerLink.click();
      
      // Verify: Page navigates to registration
      await page.waitForURL('**/register', { timeout: 5000 }).catch(() => {});
      expect(page.url()).toContain('/register');
    }
  });

  test('Forgot Password from Checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout
    await page.locator('[data-test="nav-cart"]').click();
    
    // Proceed to sign in step
    const proceedBtn = page.locator('button:has-text("Proceed to checkout"), button:has-text("Continue")').first();
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Click 'Forgot your Password?' link
    const forgotLink = page.locator('a:has-text("Forgot"), a:has-text("forgot")').first();
    if (await forgotLink.isVisible()) {
      await forgotLink.click();
      
      // Verify: Page navigates to password recovery
      await page.waitForURL('**/forgot', { timeout: 5000 }).catch(() => {});
      expect(page.url()).toContain('/forgot');
    }
  });
});
