// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and General Interface', () => {
  test('Verify Logo and Branding', async ({ page }) => {
    // 1. Click on the 'Practice Software Testing - Toolshop' logo in the top-left
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('a[href="/"]').first().click();
    
    // Verify: The user is navigated to the home page
    // Verify: The URL shows https://practicesoftwaretesting.com/
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
  });

  test('Language Selector', async ({ page }) => {
    // 1. Navigate to home page
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Locate the language selector button in the top-right (showing 'EN')
    // Verify: The language selector button is visible
    const languageButton = page.locator('button:has-text("EN")');
    await expect(languageButton).toBeVisible();
    
    // 2. Click on the language selector button
    await languageButton.click();
    
    // Verify: Language options are displayed
    // (The page interface language can be switched)
  });
});
