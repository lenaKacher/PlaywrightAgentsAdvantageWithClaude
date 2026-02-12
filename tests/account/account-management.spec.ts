// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { AccountPage } from '../pages/AccountPage';

test.describe('User Account Management', () => {
  test('View My Account Page', async ({ loginPage: page }) => {
    const accountPage = new AccountPage(page);
    
    // Navigate to account page
    await accountPage.gotoAccount();
    
    // Verify: The page navigates to /account
    expect(page.url()).toContain('/account');
    
    // Verify: Account overview section displays options
    await accountPage.verifyAccountPageOpen();
    await accountPage.verifyMenuButtonsVisible();
  });

  test('View Favorites', async ({ loginPage: page }) => {
    const accountPage = new AccountPage(page);
    
    await accountPage.gotoFavorites();
    
    // Verify: The page navigates to /account/favorites
    expect(page.url()).toContain('/favorites');
    
    // Get favorites count
    const count = await accountPage.getFavoritesCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('View Profile', async ({ loginPage: page }) => {
    const accountPage = new AccountPage(page);
    
    await accountPage.gotoProfile();
    
    // Verify: The page navigates to /account/profile
    expect(page.url()).toContain('/profile');
    
    // Verify: User profile information should be displayed
    await accountPage.verifyProfileFormVisible();
  });

  test('View Invoices', async ({ loginPage: page }) => {
    const accountPage = new AccountPage(page);
    
    await accountPage.gotoInvoices();
    
    // Verify: The page navigates to /account/invoices
    expect(page.url()).toContain('/invoices');
    
    // Get invoices count
    const count = await accountPage.getInvoicesCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('View Messages', async ({ loginPage: page }) => {
    const accountPage = new AccountPage(page);
    
    await accountPage.gotoMessages();
    
    // Verify: The page navigates to /account/messages
    expect(page.url()).toContain('/messages');
    
    // Get messages count
    const count = await accountPage.getMessagesCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Edit Profile Information', async ({ loginPage: page }) => {
    const accountPage = new AccountPage(page);
    
    await accountPage.gotoProfile();
    
    // Edit profile with sample data
    await accountPage.editProfile('John', 'Doe', 'john.doe@example.com');
    
    // Save profile changes
    await accountPage.saveProfile();
  });
});
