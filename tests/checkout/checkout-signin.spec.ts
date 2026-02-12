// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Process - Sign In', () => {
  test('View Checkout Sign In Page', async ({ loginPage: page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.gotoCheckout();
    await checkoutPage.verifyCheckoutPageLoaded();
  });

  test('Continue as Guest', async ({ loginPage: page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.gotoCheckout();
    await checkoutPage.continueAsGuest();
  });

  test('Sign In with Valid Credentials', async ({ loginPage: page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.gotoCheckout();
    await checkoutPage.signIn('test.user2@example.com', 'Sobaki2026!');
  });

  test('Register New Account from Checkout', async ({ loginPage: page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.gotoCheckout();
    const newEmail = `test${Date.now()}@example.com`;
    await checkoutPage.register(newEmail, 'TestPassword123!', 'TestPassword123!');
  });

  test('Forgot Password from Checkout', async ({ loginPage: page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.gotoCheckout();
    await checkoutPage.clickForgotPassword();
    await checkoutPage.verifyForgotPasswordFormVisible();
  });
});
