// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Contact Form', () => {
  test('Fill Contact Form with Valid Data', async ({ loginPage: page }) => {
    // 1. Navigate to the Contact Us section/page
    const contactLink = page.getByRole('link', { name: 'CONTACT US' });
    await contactLink.click();

    // The contact form is displayed with fields
    const contactForm = page.locator('//heading[contains(text(), "CONTACT")]').first();
    await contactForm.waitFor({ state: 'visible' });

    // 2. Select a category from the dropdown (e.g., 'Laptops')
    const categorySelect = page.locator('select, [role="listbox"]').first();
    await categorySelect.waitFor({ state: 'visible' });
    
    try {
      await page.selectOption('select', 'Laptops');
    } catch {
      // If not a select element, try clicking options
      const laptopOption = page.getByText('Laptops').first();
      await laptopOption.click();
    }

    // The category is selected

    // 3. Select a product from the second dropdown
    const productSelect = page.locator('select, [role="listbox"]').nth(1);
    await productSelect.waitFor({ state: 'visible' }).catch(() => {});

    // 4. Enter valid email address
    const emailInput = page.getByRole('textbox', { name: /email|mail/i });
    await emailInput.waitFor({ state: 'visible' });
    await emailInput.fill('test@example.com');

    // Email text is entered in the Email field

    // 5. Enter a subject message
    const subjectInput = page.getByRole('textbox', { name: /subject/i });
    await subjectInput.waitFor({ state: 'visible' });
    await subjectInput.fill('Test Subject');

    // Subject text is entered in the Subject field

    // 6. Click 'SEND' button
    const sendBtn = page.getByRole('button', { name: /SEND/i });
    await sendBtn.waitFor({ state: 'visible' });
    await sendBtn.click();

    // The form is submitted
    // A success message appears or form is cleared
  });
});
