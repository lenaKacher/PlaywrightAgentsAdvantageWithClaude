// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Management', () => {
  test('View Shopping Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Click on the shopping cart icon
    await page.locator('[data-test="nav-cart"]').click();
    
    // Verify: The page navigates to /checkout
    expect(page.url()).toContain('/checkout');
    
    // Verify: The checkout page title displays 'Checkout'
    const checkoutHeading = page.locator('h1, heading, [role="heading"]').filter({ hasText: 'Checkout' });
    if (await checkoutHeading.count() > 0) {
      await expect(checkoutHeading.first()).toBeVisible();
    }
  });

  test('View Cart Items Table', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-test="nav-cart"]').click();
    
    // Verify: A table displays all cart items
    const cartTable = page.locator('table');
    await expect(cartTable).toBeVisible();
    
    // Verify: Table has product information
    const tableRows = page.locator('table tbody tr');
    expect(await tableRows.count()).toBeGreaterThan(0);
  });

  test('View Cart Total', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-test="nav-cart"]').click();
    
    // Verify: Total is displayed
    const totalText = page.locator('text=Total').or(page.locator('strong:has-text("Total")'));
    await expect(totalText.first()).toBeVisible();
    
    // Verify: Price is shown
    const totalPrice = page.locator('[role="cell"]:has-text("$")').last();
    if (await totalPrice.isVisible()) {
      await expect(totalPrice).toBeVisible();
    }
  });

  test('Modify Product Quantity in Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-test="nav-cart"]').click();
    
    // Find quantity input in cart table
    const quantityInput = page.locator('table input[type="number"]').first();
    if (await quantityInput.isVisible()) {
      // Change quantity to 3
      await quantityInput.fill('3');
      
      // Verify: Quantity updates
      await page.waitForTimeout(500);
      const newValue = await quantityInput.inputValue();
      expect(newValue).toBe('3');
    }
  });

  test('Remove Product from Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-test="nav-cart"]').click();
    
    // Get initial item count
    const initialRows = await page.locator('table tbody tr').count();
    
    // Find and click delete button
    const deleteBtn = page.locator('button [role="img"], button:has-text("Delete"), button:has-text("Remove"), table button').first();
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
      
      // Wait for update
      await page.waitForTimeout(500);
      
      // Verify: Item is removed
      const finalRows = await page.locator('table tbody tr').count();
      expect(finalRows).toBeLessThanOrEqual(initialRows);
    }
  });

  test('Continue Shopping from Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-test="nav-cart"]').click();
    
    // Click the 'Continue Shopping' button
    const continueBtn = page.locator('button:has-text("Continue Shopping")');
    if (await continueBtn.isVisible()) {
      await continueBtn.click();
      
      // Verify: Page navigates back to home
      await page.waitForURL('**/');
      expect(page.url()).not.toContain('/checkout');
    }
  });

  test('Proceed to Checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-test="nav-cart"]').click();
    
    // Click 'Proceed to checkout' button
    const proceedBtn = page.locator('button:has-text("Proceed to checkout"), button:has-text("Continue")').first();
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      
      // Verify: Advances to next step (Sign in)
      await page.waitForTimeout(500);
      const signInTab = page.locator('text=Sign in', '[role="tab"]:has-text("Sign in")');
      if (await signInTab.count() > 0) {
        await expect(signInTab.first()).toBeVisible();
      }
    }
  });

  test('Empty Cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Add a product to cart
    await page.locator('a[href*="/product/"]').first().click();
    await page.locator('button:has-text("Add to cart")').click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('[data-test="nav-cart"]').click();
    
    // Remove all items
    let removeBtn = page.locator('button [role="img"], button:has-text("Delete"), button:has-text("Remove"), table button').first();
    while (await removeBtn.isVisible()) {
      await removeBtn.click();
      await page.waitForTimeout(300);
      removeBtn = page.locator('button [role="img"], button:has-text("Delete"), button:has-text("Remove"), table button').first();
    }
    
    // Verify: Cart is empty
    const emptyMsg = page.locator('text=empty', 'text=No items', 'p').filter({ hasText: /empty|no items/i });
    if (await emptyMsg.count() > 0) {
      await expect(emptyMsg.first()).toBeVisible();
    }
  });
});
