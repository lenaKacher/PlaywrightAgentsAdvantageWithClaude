# Page Object Model (POM) Refactoring Guide

## Overview
All tests have been refactored to use the Page Object Model pattern. This guide explains the structure and how to maintain it.

## POM Structure

### Base Classes
- **BasePage** (`tests/pages/BasePage.ts`) - Contains common methods for all pages

### Page Objects
- **HomePage** - Home page and product listings
- **ProductPage** - Product details, filtering, sorting
- **CartPage** - Shopping cart operations
- **AccountPage** - User account and profile
- **CheckoutPage** - Checkout and payment
- **ContactPage** - Contact form
- **SearchPage** - Search and rentals

## Key Benefits

1. **Maintainability**: Selectors are centralized in one place
2. **Readability**: Tests read like business scenarios, not technical steps
3. **Reusability**: Common methods can be shared across tests
4. **Scalability**: Easy to add new pages or methods
5. **Debugging**: Clear separation between test logic and UI interaction

## Test File Examples

### Before (Inline selectors)
```typescript
test('Add Product to Cart', async ({ loginPage: page }) => {
  await page.locator('a[href*="/product/"]').first().click();
  const quantityInput = page.locator('input[type="number"]').first();
  const currentValue = await quantityInput.inputValue();
  expect(currentValue).toBe('1');
  await page.locator('button:has-text("Add to cart")').click();
});
```

### After (Using POM)
```typescript
test('Add Product to Cart', async ({ loginPage: page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  
  await homePage.clickProduct(0);
  const qty = await productPage.getCurrentQuantity();
  expect(qty).toBe('1');
  await productPage.addToCart();
});
```

## Creating a New Page Object

1. Create a new file in `tests/pages/` directory:
```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  // Define locators
  readonly myButton = this.page.locator('button:has-text("My Button")');
  
  // Define methods
  async myAction() {
    await this.clickSafely(this.myButton);
  }
}
```

2. Import and use in tests:
```typescript
import { MyPage } from '../pages/MyPage';

test('My Test', async ({ loginPage: page }) => {
  const myPage = new MyPage(page);
  await myPage.myAction();
});
```

## Common Page Object Methods

From **BasePage**:
- `goto(path)` - Navigate to a page
- `getURL()` - Get current URL
- `isElementVisible(locator)` - Check element visibility
- `clickSafely(locator)` - Click with error handling
- `waitForTimeout(ms)` - Wait for duration
- `getElementCount(locator)` - Count elements

From **HomePage**:
- `clickProduct(index)` - Click a product by index
- `searchProduct(query)` - Search for products
- `navigateToCategory(name)` - Navigate to category
- `goToCart()`, `goToAccount()`, `goToContact()` - Navigate to pages
- `getProductCount()` - Get number of products
- `setViewport(width, height)` - Set viewport

From **ProductPage**:
- `addToCart()` - Add product to cart
- `addToFavorites()` - Add to favorites
- `sortBy(option)` - Sort products
- `filterByPriceRange(min, max)` - Filter by price
- `setQuantity(amount)` - Set product quantity

From **CartPage**:
- `verifyCartTableVisible()` - Verify cart table
- `modifyQuantity(index, qty)` - Change item quantity
- `removeProduct(index)` - Remove item from cart
- `proceedToCheckout()` - Go to checkout
- `emptyCart()` - Remove all items

From **AccountPage**:
- `gotoAccount()`, `gotoProfile()`, `gotoFavorites()`, etc. - Navigate to sections
- `editProfile(...)` - Edit profile information
- `saveProfile()` - Save profile changes
- `signOut()` - Sign out from account

From **CheckoutPage**:
- `signIn(email, password)` - Sign in
- `continueAsGuest()` - Continue as guest
- `fillBillingAddress(...)` - Fill billing address
- `fillPaymentInfo(...)` - Fill payment details
- `submitOrder()` - Place order

From **ContactPage**:
- `fillContactForm(...)` - Fill contact form
- `selectSubject(subject)` - Select contact subject
- `submitForm()` - Submit form
- `attachFile(path)` - Attach file

From **SearchPage**:
- `search(query)` - Search for products
- `gotoRentals()` - Go to rentals
- `setPriceRange(min, max)` - Filter by price

## Refactoring Checklist

When refactoring a test file:

- [ ] Create or identify the appropriate page object(s)
- [ ] Replace all `page.locator()` calls with page object locators
- [ ] Replace navigation with page object methods
- [ ] Replace element interactions with page object methods
- [ ] Update imports to include page objects
- [ ] Verify test still passes
- [ ] Remove any redundant comments
- [ ] Add type hints where applicable

## Locator Naming Conventions

In Page Objects, use descriptive names:
- Button: `readonly myButton = ...`
- Input field: `readonly emailField = ...`
- List/table: `readonly itemsList = ...`
- Container: `readonly formContainer = ...`

## Error Handling

Page objects include built-in error handling:
- `isElementVisible()` returns boolean instead of throwing
- `clickSafely()` tries to click and returns success status
- `waitForURL()` has timeout handling

This makes tests more resilient to timing issues.

## Best Practices

1. **One responsibility per method** - Each method should do one clear thing
2. **Descriptive method names** - Use names that describe the action
3. **No assertions in page objects** - Keep assertions in tests
4. **Reusable methods** - Create general methods that can be used in multiple tests
5. **Avoid hardcoding** - Use parameters for values
6. **Clear comments** - Document complex selectors or workarounds

## Migration Status

All test files have been refactored to use POM:
- ✅ Navigation tests
- ✅ Product tests (filtering, sorting, details)
- ✅ Cart management
- ✅ Checkout
- ✅ Account management
- ✅ Contact form
- ✅ Search and rentals

## Maintenance

When the application changes:
1. Update selectors ONLY in the page object files
2. Tests don't need to change if the functionality stays the same
3. If new functionality is added, create new methods in page objects
4. Keep page objects focused on the page they represent
