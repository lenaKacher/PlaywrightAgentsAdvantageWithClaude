# Practice Software Testing - Toolshop Comprehensive Test Plan

## Application Overview

Practice Software Testing - Toolshop is an e-commerce application for purchasing and renting tools. The application features product browsing with filters, shopping cart management, user authentication, checkout flows (guest and registered users), account management, contact forms, and various tool rental options. Users can filter products by category, brand, price range, and sustainability, search for items, add products to cart/favorites, and complete purchases through a multi-step checkout process.

## Test Scenarios

### 1. Navigation and General Interface

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Home Page Loads Successfully

**File:** `tests/navigation/home-page-loads.spec.ts`

**Steps:**
  1. Navigate to the home page at https://practicesoftwaretesting.com/
    - expect: The page loads successfully with status 200
    - expect: The page title displays 'Practice Software Testing - Toolshop - v5.0'
    - expect: The main navigation menu is visible with options: Home, Categories, Contact, Sign in
    - expect: The shopping cart icon is visible in the top-right with item count indicator
    - expect: Product listings are visible with product cards showing image, name, CO₂ rating, and price

#### 1.2. Navigate Between Main Menu Items

**File:** `tests/navigation/menu-navigation.spec.ts`

**Steps:**
  1. Click on the 'Categories' menu item
    - expect: A dropdown menu appears with category options
    - expect: Categories listed are: Hand Tools, Power Tools, Other, Special Tools, Rentals
  2. Click on 'Hand Tools' category
    - expect: The page navigates to /category/hand-tools
    - expect: Products in the Hand Tools category are displayed
    - expect: The page title updates to show 'Hand Tools'
  3. Click on 'Contact' in the main menu
    - expect: The page navigates to /contact
    - expect: The contact form is visible with fields: First name, Last name, Email, Subject, Message, Attachment
  4. Click on 'Home' link to return to home page
    - expect: The page navigates back to the home page
    - expect: All products are displayed again

#### 1.3. Verify Logo and Branding

**File:** `tests/navigation/logo-navigation.spec.ts`

**Steps:**
  1. Click on the 'Practice Software Testing - Toolshop' logo in the top-left
    - expect: The user is navigated to the home page
    - expect: The URL shows https://practicesoftwaretesting.com/

#### 1.4. Language Selector

**File:** `tests/navigation/language-selector.spec.ts`

**Steps:**
  1. Locate the language selector button in the top-right (showing 'EN')
    - expect: The language selector button is visible
  2. Click on the language selector button
    - expect: Language options are displayed
    - expect: The page interface language can be switched

### 2. Product Browsing and Filtering

**Seed:** `tests/seed.spec.ts`

#### 2.1. View Product Listings with Default Sort

**File:** `tests/products/view-products-default.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Multiple product cards are visible
    - expect: Each product card displays: product image, name, CO₂ rating (A-E scale), and price
    - expect: Products are displayed in a grid layout

#### 2.2. Sort Products by Name (A-Z)

**File:** `tests/products/sort-by-name-asc.spec.ts`

**Steps:**
  1. Locate the 'Sort' dropdown on the left sidebar
    - expect: The Sort dropdown is visible with default selection
  2. Click on the Sort dropdown and select 'Name (A - Z)'
    - expect: The products are re-sorted alphabetically from A to Z
    - expect: The first product name starts with a letter closer to 'A'
    - expect: The selected option is highlighted in the dropdown

#### 2.3. Sort Products by Name (Z-A)

**File:** `tests/products/sort-by-name-desc.spec.ts`

**Steps:**
  1. Click on the Sort dropdown and select 'Name (Z - A)'
    - expect: The products are re-sorted in reverse alphabetical order
    - expect: The first product name starts with a letter closer to 'Z'

#### 2.4. Sort Products by Price (High to Low)

**File:** `tests/products/sort-by-price-high-low.spec.ts`

**Steps:**
  1. Click on the Sort dropdown and select 'Price (High - Low)'
    - expect: The products are re-sorted with highest prices first
    - expect: The first product has the highest price on the page

#### 2.5. Sort Products by Price (Low to High)

**File:** `tests/products/sort-by-price-low-high.spec.ts`

**Steps:**
  1. Click on the Sort dropdown and select 'Price (Low - High)'
    - expect: The products are re-sorted with lowest prices first
    - expect: The first product has the lowest price on the page

#### 2.6. Sort Products by CO₂ Rating (A-E)

**File:** `tests/products/sort-by-co2-ae.spec.ts`

**Steps:**
  1. Click on the Sort dropdown and select 'CO₂ Rating (A - E)'
    - expect: The products are re-sorted by CO₂ rating from most to least environmentally friendly
    - expect: The first product has the best CO₂ rating (closest to A)

#### 2.7. Sort Products by CO₂ Rating (E-A)

**File:** `tests/products/sort-by-co2-ea.spec.ts`

**Steps:**
  1. Click on the Sort dropdown and select 'CO₂ Rating (E - A)'
    - expect: The products are re-sorted by CO₂ rating from least to most environmentally friendly
    - expect: The first product has the worst CO₂ rating (closest to E)

#### 2.8. Filter Products by Price Range

**File:** `tests/products/filter-by-price-range.spec.ts`

**Steps:**
  1. Locate the 'Price Range' slider on the left sidebar
    - expect: The slider is visible with range 0 to 200
    - expect: Two slider handles are present for min and max price
  2. Drag the minimum price slider to 25
    - expect: Products with price below $25 are filtered out
    - expect: Products displayed have prices >= $25
  3. Drag the maximum price slider to 100
    - expect: Products with price above $100 are filtered out
    - expect: Products displayed have prices <= $100

#### 2.9. Search Products by Keyword

**File:** `tests/products/search-by-keyword.spec.ts`

**Steps:**
  1. Locate the 'Search' field on the left sidebar
    - expect: The search textbox is visible with placeholder 'Search'
  2. Type 'Pliers' in the search field
    - expect: Input text 'Pliers' appears in the search field
  3. Click the 'Search' button next to the search field
    - expect: The products are filtered to show only those containing 'Pliers' in the name
    - expect: Multiple pliers products are displayed: Pliers, Combination Pliers, Long Nose Pliers, Slip Joint Pliers

#### 2.10. Clear Search Results

**File:** `tests/products/clear-search.spec.ts`

**Steps:**
  1. After performing a search, click the 'X' button in the search field
    - expect: The search field is cleared
    - expect: All products are displayed again (filter is removed)

#### 2.11. Filter Products by Category

**File:** `tests/products/filter-by-category.spec.ts`

**Steps:**
  1. Expand the 'By category:' section on the left sidebar
    - expect: Category filter options are visible with checkboxes
    - expect: Available categories include: Hand Tools (with subcategories), Power Tools (with subcategories), Other (with subcategories)
  2. Check the 'Hammer' checkbox under Hand Tools
    - expect: The checkbox is selected
    - expect: Products are filtered to show only Hammer products
  3. Uncheck the 'Hammer' checkbox
    - expect: The checkbox is unselected
    - expect: All products are displayed again

#### 2.12. Filter Products by Brand

**File:** `tests/products/filter-by-brand.spec.ts`

**Steps:**
  1. Expand the 'By brand:' section on the left sidebar
    - expect: Brand filter options are visible with checkboxes
    - expect: Available brands include: ForgeFlex Tools, MightyCraft Hardware
  2. Check the 'ForgeFlex Tools' checkbox
    - expect: The checkbox is selected
    - expect: Products are filtered to show only ForgeFlex Tools brand products

#### 2.13. Filter Products by Eco-Friendly Status

**File:** `tests/products/filter-eco-friendly.spec.ts`

**Steps:**
  1. Expand the 'Sustainability:' section on the left sidebar
    - expect: An 'Eco-Friendly Products' checkbox is visible with text 'Show only eco-friendly products'
  2. Check the 'Show only eco-friendly products' checkbox
    - expect: The checkbox is selected
    - expect: Products are filtered to display only eco-friendly items (typically A or B CO₂ ratings)

#### 2.14. Apply Multiple Filters Simultaneously

**File:** `tests/products/filter-multiple.spec.ts`

**Steps:**
  1. Apply price range filter (20-80), select 'Hand Tools' category, and set sort to 'Name (A-Z)'
    - expect: All filters are applied simultaneously
    - expect: Products shown are Hand Tools with price between $20-$80
    - expect: Products are sorted alphabetically
    - expect: Filter pills or indicators show active filters

### 3. Product Details and Actions

**Seed:** `tests/seed.spec.ts`

#### 3.1. View Product Detail Page

**File:** `tests/products/view-product-detail.spec.ts`

**Steps:**
  1. Click on any product card or heading (e.g., 'Combination Pliers')
    - expect: The product detail page loads
    - expect: The URL changes to /product/<product-id>
    - expect: Product information is displayed: image, name, category, brand, price, CO₂ rating, and description

#### 3.2. View Product Image on Detail Page

**File:** `tests/products/product-image.spec.ts`

**Steps:**
  1. Navigate to a product detail page
    - expect: A large product image is displayed at the top left
    - expect: The image is in a figure element with photo attribution
    - expect: The image loads completely without broken image errors

#### 3.3. View Product Information on Detail Page

**File:** `tests/products/product-information.spec.ts`

**Steps:**
  1. View the product detail page for 'Combination Pliers'
    - expect: The product name 'Combination Pliers' is displayed as a heading
    - expect: The category 'Pliers' is shown
    - expect: The brand 'ForgeFlex Tools' is shown
    - expect: The price '$14.15' is displayed
    - expect: The CO₂ rating scale (A-E) is shown with visual indicators

#### 3.4. View Product Description

**File:** `tests/products/product-description.spec.ts`

**Steps:**
  1. View the product detail page for any product
    - expect: The product description is visible below the basic information
    - expect: The description contains Lorem ipsum placeholder text

#### 3.5. Adjust Product Quantity

**File:** `tests/products/adjust-quantity.spec.ts`

**Steps:**
  1. On the product detail page, locate the Quantity control
    - expect: A quantity spinbutton is visible with Decrease and Increase buttons
    - expect: The default quantity is 1
  2. Click the Increase quantity button 3 times
    - expect: The quantity increases to 4
  3. Click the Decrease quantity button 2 times
    - expect: The quantity decreases to 2

#### 3.6. Add Product to Cart

**File:** `tests/products/add-to-cart.spec.ts`

**Steps:**
  1. On the product detail page, click the 'Add to cart' button
    - expect: A success message appears: 'Product added to shopping cart.'
    - expect: The shopping cart icon in the navigation updates with item count
    - expect: The cart count increases by 1 (or by the quantity selected)

#### 3.7. Add Multiple Products to Cart

**File:** `tests/products/add-multiple-to-cart.spec.ts`

**Steps:**
  1. Add one product (Combination Pliers) to cart
    - expect: The cart count shows 1
  2. Navigate to a different product (e.g., Pliers) and add it to cart
    - expect: A success message appears
    - expect: The cart count increases to 2

#### 3.8. Add Product with Quantity to Cart

**File:** `tests/products/add-quantity-to-cart.spec.ts`

**Steps:**
  1. On a product detail page, increase the quantity to 3
    - expect: The quantity field shows 3
  2. Click 'Add to cart'
    - expect: A success message appears
    - expect: The shopping cart icon updates with the correct item count (3)

#### 3.9. Add Product to Favorites

**File:** `tests/products/add-to-favorites.spec.ts`

**Steps:**
  1. On the product detail page, click the 'Add to favourites' button
    - expect: The button visual changes to indicate the item is favorited
    - expect: The product is added to the user's favorites list

#### 3.10. View Related Products

**File:** `tests/products/view-related-products.spec.ts`

**Steps:**
  1. On the product detail page, scroll to the bottom
    - expect: A 'Related products' section is visible
    - expect: Related products are displayed in a carousel or list format
    - expect: For 'Combination Pliers', related products include: Pliers, Bolt Cutters, Long Nose Pliers, Slip Joint Pliers
  2. Click on a related product
    - expect: The page navigates to the related product's detail page

### 4. Shopping Cart Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. View Shopping Cart

**File:** `tests/cart/view-cart.spec.ts`

**Steps:**
  1. Add a product to cart from the home page
    - expect: The cart count indicator appears with value 1
  2. Click on the shopping cart icon in the navigation
    - expect: The page navigates to /checkout
    - expect: The checkout page title displays 'Checkout'
    - expect: The cart step indicator shows step 1 (Cart) as current

#### 4.2. View Cart Items Table

**File:** `tests/cart/view-cart-items.spec.ts`

**Steps:**
  1. Navigate to the cart/checkout page with items in cart
    - expect: A table displays all cart items
    - expect: Table columns are: Item, Quantity, Price, Total, and a delete button
    - expect: Each row shows: product name, quantity spinbutton, unit price, total price

#### 4.3. View Cart Total

**File:** `tests/cart/view-cart-total.spec.ts`

**Steps:**
  1. View the cart page with items
    - expect: A Total row displays at the bottom of the cart table
    - expect: The total shows the sum of all item totals
    - expect: For 1x Combination Pliers at $14.15, the total shows $14.15

#### 4.4. Modify Product Quantity in Cart

**File:** `tests/cart/modify-quantity.spec.ts`

**Steps:**
  1. In the cart table, locate the quantity spinbutton for an item
    - expect: The spinbutton shows the current quantity
  2. Change the quantity from 1 to 3
    - expect: The quantity field updates to 3
    - expect: The item total updates (price x 3)
    - expect: The cart total recalculates automatically

#### 4.5. Remove Product from Cart

**File:** `tests/cart/remove-item.spec.ts`

**Steps:**
  1. In the cart table, click the delete/remove button (trash icon) for an item
    - expect: The item is removed from the cart
    - expect: The cart table no longer shows that product
    - expect: The cart total updates
    - expect: The cart count in navigation updates

#### 4.6. Continue Shopping from Cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. On the cart page, click the 'Continue Shopping' button
    - expect: The page navigates back to the home page
    - expect: The cart count in navigation still shows the items in cart
    - expect: Products are displayed again

#### 4.7. Proceed to Checkout

**File:** `tests/cart/proceed-to-checkout.spec.ts`

**Steps:**
  1. On the cart page with items, click the 'Proceed to checkout' button
    - expect: The page advances to the next step in checkout (Sign in step)
    - expect: The checkout progress indicator shows step 2 (Sign in) as current
    - expect: The cart items remain visible in the sidebar

#### 4.8. Empty Cart

**File:** `tests/cart/empty-cart.spec.ts`

**Steps:**
  1. Add a product to cart
    - expect: The cart shows 1 item
  2. Navigate to cart and remove all items
    - expect: The cart table is empty or shows 'No items' message
    - expect: The cart count in navigation shows 0 or is hidden

### 5. Checkout Process - Sign In

**Seed:** `tests/seed.spec.ts`

#### 5.1. View Checkout Sign In Page

**File:** `tests/checkout/view-signin-page.spec.ts`

**Steps:**
  1. Add a product to cart and click checkout
    - expect: The checkout page loads at /checkout
    - expect: The progress indicator shows 4 steps: Cart, Sign in, Billing Address, Payment
  2. Click 'Proceed to checkout' on the cart page
    - expect: The Sign in step is displayed
    - expect: Two tabs are visible: 'Sign in' and 'Continue as Guest'

#### 5.2. Sign In with Valid Credentials

**File:** `tests/checkout/signin-valid.spec.ts`

**Steps:**
  1. On the Sign in tab, enter a valid email and password and click 'Login'
    - expect: The login is processed
    - expect: The user is authenticated (credentials validation would depend on API)
    - expect: The checkout progresses to the next step or shows user information

#### 5.3. Sign In with Invalid Credentials

**File:** `tests/checkout/signin-invalid.spec.ts`

**Steps:**
  1. On the Sign in tab, enter invalid email/password and click 'Login'
    - expect: An error message displays indicating invalid credentials
    - expect: The user remains on the Sign in step
    - expect: The page does not proceed to the next step

#### 5.4. Register New Account from Checkout

**File:** `tests/checkout/register-from-checkout.spec.ts`

**Steps:**
  1. On the Sign in tab, click 'Register your account' link
    - expect: The page navigates to /auth/register
    - expect: A registration form is displayed

#### 5.5. Forgot Password from Checkout

**File:** `tests/checkout/forgot-password-checkout.spec.ts`

**Steps:**
  1. On the Sign in tab, click 'Forgot your Password?' link
    - expect: The page navigates to /auth/forgot-password
    - expect: A password recovery form is displayed

#### 5.6. Continue as Guest

**File:** `tests/checkout/continue-as-guest.spec.ts`

**Steps:**
  1. Click on the 'Continue as Guest' tab
    - expect: The tab is selected
    - expect: A form is displayed with fields: Email address, First name, Last name
    - expect: The 'Continue as Guest' button is visible
  2. Fill in Email: test@example.com, First name: John, Last name: Doe
    - expect: All fields are populated with the entered data
  3. Click 'Continue as Guest' button
    - expect: The form is submitted
    - expect: The checkout progresses to the Billing Address step
    - expect: The guest information is saved for the order

### 6. Checkout Process - Billing Address

**Seed:** `tests/seed.spec.ts`

#### 6.1. View Billing Address Step

**File:** `tests/checkout/view-billing-address.spec.ts`

**Steps:**
  1. Complete the Sign in/Guest step and proceed to Billing Address
    - expect: The checkout progress shows step 3 (Billing Address) as current
    - expect: A form for billing address entry is displayed

#### 6.2. Enter Billing Address

**File:** `tests/checkout/enter-billing-address.spec.ts`

**Steps:**
  1. Fill in all required address fields such as street, city, state, zip, country
    - expect: All entered data appears in the form fields
    - expect: The form is ready for submission

#### 6.3. Proceed to Payment Step

**File:** `tests/checkout/proceed-to-payment.spec.ts`

**Steps:**
  1. After entering billing address, click the proceed/next button
    - expect: The checkout progresses to the Payment step
    - expect: The progress indicator shows step 4 (Payment) as current

### 7. Checkout Process - Payment

**Seed:** `tests/seed.spec.ts`

#### 7.1. View Payment Step

**File:** `tests/checkout/view-payment-step.spec.ts`

**Steps:**
  1. Complete the Billing Address step and proceed to Payment
    - expect: The checkout progress shows step 4 (Payment) as current
    - expect: A payment form or payment method selection is displayed

#### 7.2. Enter Payment Information

**File:** `tests/checkout/enter-payment-info.spec.ts`

**Steps:**
  1. On the Payment step, enter payment details (card number, expiry, CVV, etc.)
    - expect: All entered data appears in the form fields
    - expect: Sensitive data may be masked for security

#### 7.3. Complete Purchase

**File:** `tests/checkout/complete-purchase.spec.ts`

**Steps:**
  1. After entering all payment information, click the 'Place Order' or 'Complete Purchase' button
    - expect: The payment is processed
    - expect: The page navigates to an order confirmation page
    - expect: An order number is displayed
    - expect: A success message appears: 'Your order has been placed successfully'

### 8. User Authentication

**Seed:** `tests/seed.spec.ts`

#### 8.1. View Sign In Page

**File:** `tests/auth/view-signin.spec.ts`

**Steps:**
  1. Click on 'Sign in' in the main menu
    - expect: The page navigates to /auth/login
    - expect: A login form is displayed with fields: Email address, Password
    - expect: A 'Login' button is visible

#### 8.2. Login with Valid Credentials

**File:** `tests/auth/login-valid.spec.ts`

**Steps:**
  1. On the login page, enter valid email and password and click 'Login'
    - expect: The login is successful
    - expect: The page redirects to the home page or account page
    - expect: The 'Sign in' menu item is replaced with 'Test User' menu
    - expect: The user is logged in and can access account features

#### 8.3. Login with Invalid Credentials

**File:** `tests/auth/login-invalid.spec.ts`

**Steps:**
  1. Enter incorrect email/password and click 'Login'
    - expect: An error message appears: 'Invalid email or password'
    - expect: The user remains on the login page
    - expect: The form is not submitted

#### 8.4. Login with Empty Fields

**File:** `tests/auth/login-empty.spec.ts`

**Steps:**
  1. Leave email and password fields empty and click 'Login'
    - expect: Field validation error messages appear
    - expect: The login button may be disabled until fields are filled
    - expect: The form is not submitted

#### 8.5. Navigate to Registration

**File:** `tests/auth/navigate-register.spec.ts`

**Steps:**
  1. On the login page, click 'Not yet an account?' or 'Register your account' link
    - expect: The page navigates to /auth/register
    - expect: A registration form is displayed

#### 8.6. Navigate to Forgot Password

**File:** `tests/auth/navigate-forgot-password.spec.ts`

**Steps:**
  1. On the login page, click 'Forgot your Password?' link
    - expect: The page navigates to /auth/forgot-password
    - expect: A password recovery form is displayed

#### 8.7. Logout

**File:** `tests/auth/logout.spec.ts`

**Steps:**
  1. After logging in, click on the 'Test User' menu
    - expect: A dropdown menu appears with options including 'Sign out'
  2. Click 'Sign out'
    - expect: The user is logged out
    - expect: The page may redirect to home or login page
    - expect: The 'Test User' menu is replaced with 'Sign in' menu
    - expect: The user is no longer authenticated

### 9. User Account Management

**Seed:** `tests/seed.spec.ts`

#### 9.1. View My Account Page

**File:** `tests/account/view-my-account.spec.ts`

**Steps:**
  1. After logging in, click on 'Test User' menu and select 'My account'
    - expect: The page navigates to /account
    - expect: The page title shows 'My account'
    - expect: Account overview section displays options: Favorites, Profile, Invoices, Messages

#### 9.2. View Favorites

**File:** `tests/account/view-favorites.spec.ts`

**Steps:**
  1. From 'Test User' menu, click 'My favorites' or on account page, click 'Favorites' button
    - expect: The page navigates to /account/favorites
    - expect: A list of favorite products is displayed
    - expect: If no favorites exist, a message 'You have no favorites yet' appears

#### 9.3. View Profile

**File:** `tests/account/view-profile.spec.ts`

**Steps:**
  1. From 'Test User' menu, click 'My profile' or on account page, click 'Profile' button
    - expect: The page navigates to /account/profile
    - expect: User profile information is displayed: name, email, phone, address, etc.

#### 9.4. View Invoices

**File:** `tests/account/view-invoices.spec.ts`

**Steps:**
  1. From 'Test User' menu, click 'My invoices' or on account page, click 'Invoices' button
    - expect: The page navigates to /account/invoices
    - expect: A list of invoices is displayed if the user has made purchases
    - expect: If no invoices exist, an appropriate message appears

#### 9.5. View Messages

**File:** `tests/account/view-messages.spec.ts`

**Steps:**
  1. From 'Test User' menu, click 'My messages' or on account page, click 'Messages' button
    - expect: The page navigates to /account/messages
    - expect: A messages or notifications inbox is displayed
    - expect: If no messages exist, an appropriate message appears

#### 9.6. Edit Profile Information

**File:** `tests/account/edit-profile.spec.ts`

**Steps:**
  1. On the Profile page, locate and click an 'Edit' or pencil icon
    - expect: The profile form becomes editable
    - expect: Form fields can be modified
  2. Change some profile information (e.g., name, phone) and save
    - expect: The changes are saved successfully
    - expect: A success message appears: 'Profile updated successfully'
    - expect: The new information is displayed on the profile

### 10. Contact Form

**Seed:** `tests/seed.spec.ts`

#### 10.1. View Contact Form

**File:** `tests/contact/view-contact-form.spec.ts`

**Steps:**
  1. Click 'Contact' in the main menu
    - expect: The page navigates to /contact
    - expect: The page title shows 'Contact'
    - expect: A contact form is visible with fields: First name, Last name, Email address, Subject, Message, Attachment

#### 10.2. Fill Contact Form with Valid Data

**File:** `tests/contact/fill-contact-form.spec.ts`

**Steps:**
  1. Fill in all required fields: First name, Last name, Email, Subject, Message
    - expect: All entered data appears in the respective fields
    - expect: The form is ready for submission
  2. Click the 'Send' button
    - expect: The form is submitted successfully
    - expect: A confirmation message appears: 'Your message has been sent'
    - expect: The form may reset or redirect to confirmation page

#### 10.3. Submit Contact Form with Missing Fields

**File:** `tests/contact/contact-missing-fields.spec.ts`

**Steps:**
  1. Fill in only some required fields (e.g., only First name and Email)
    - expect: The filled data appears in the fields
  2. Click the 'Send' button
    - expect: Validation errors appear for missing required fields
    - expect: The form is not submitted

#### 10.4. Select Contact Subject

**File:** `tests/contact/contact-subject.spec.ts`

**Steps:**
  1. On the contact form, click the 'Subject' dropdown
    - expect: A dropdown menu opens with options: Customer service, Webmaster, Return, Payments, Warranty, Status of my order
  2. Select 'Return' option
    - expect: The 'Return' option is selected and displayed in the dropdown

#### 10.5. Attach File to Contact Form

**File:** `tests/contact/contact-attach-file.spec.ts`

**Steps:**
  1. On the contact form, click the 'Attachment' button
    - expect: A file picker dialog opens
    - expect: Only txt files are allowed (as per form instructions)
  2. Note: Form states 'Only files with the txt extension are allowed, and files must be 0kb'
    - expect: This is a test constraint that should be validated

### 11. Product Rentals

**Seed:** `tests/seed.spec.ts`

#### 11.1. View Rentals Overview

**File:** `tests/rentals/view-rentals.spec.ts`

**Steps:**
  1. Navigate to Rentals via Categories menu or direct URL /rentals
    - expect: The page navigates to /rentals
    - expect: The page title shows 'Rentals Overview'
    - expect: Rental options or available rental products are displayed

#### 11.2. Browse Rental Products

**File:** `tests/rentals/browse-rental-products.spec.ts`

**Steps:**
  1. On the Rentals page, view the available rental products
    - expect: Rental products are displayed with images and details
    - expect: Rental pricing or terms are visible

#### 11.3. Select Rental Product

**File:** `tests/rentals/select-rental-product.spec.ts`

**Steps:**
  1. Click on a rental product
    - expect: The product detail page or rental details are displayed
    - expect: Rental information such as duration, price, and terms are shown

#### 11.4. Add Rental to Cart

**File:** `tests/rentals/add-rental-to-cart.spec.ts`

**Steps:**
  1. On a rental product page, click 'Add to cart' or similar action
    - expect: The rental is added to the shopping cart
    - expect: The cart count updates
    - expect: A success message appears

### 12. Search and Discovery

**Seed:** `tests/seed.spec.ts`

#### 12.1. Search with Single Word

**File:** `tests/search/search-single-word.spec.ts`

**Steps:**
  1. In the search field on the homepage, type 'Hammer'
    - expect: The search input displays 'Hammer'
  2. Click the Search button
    - expect: Products containing 'Hammer' are displayed
    - expect: The product list updates to show matching results

#### 12.2. Search with No Results

**File:** `tests/search/search-no-results.spec.ts`

**Steps:**
  1. Search for a term that doesn't match any products (e.g., 'NonexistentProduct123')
    - expect: The product list is empty or shows 'No products found' message

#### 12.3. Search is Case-Insensitive

**File:** `tests/search/search-case-insensitive.spec.ts`

**Steps:**
  1. Search for 'PLIERS' (all uppercase)
    - expect: Pliers products are displayed
    - expect: Search is case-insensitive and matches 'pliers', 'Pliers', 'PLIERS'

### 13. Error Handling and Validation

**Seed:** `tests/seed.spec.ts`

#### 13.1. Invalid Email Format Validation

**File:** `tests/validation/invalid-email.spec.ts`

**Steps:**
  1. On the contact form or login form, enter an invalid email (e.g., 'notanemail')
    - expect: A validation error appears: 'Please enter a valid email address'
    - expect: The form cannot be submitted with invalid email

#### 13.2. Required Field Validation

**File:** `tests/validation/required-fields.spec.ts`

**Steps:**
  1. On any form with required fields, try to submit without filling them
    - expect: Validation error messages appear for each empty required field
    - expect: The form is not submitted

#### 13.3. Price Range Slider Limits

**File:** `tests/validation/price-slider-limits.spec.ts`

**Steps:**
  1. On the product page, use the price range slider
    - expect: The minimum price cannot be set below 0
    - expect: The maximum price cannot be set above 200
    - expect: The min value cannot exceed the max value

#### 13.4. Quantity Cannot Be Zero or Negative

**File:** `tests/validation/quantity-validation.spec.ts`

**Steps:**
  1. On a product detail page, try to set quantity to 0 using the decrease button
    - expect: The quantity remains at 1
    - expect: The decrease button may be disabled when quantity is 1

### 14. Performance and UI/UX

**Seed:** `tests/seed.spec.ts`

#### 14.1. Page Load Performance

**File:** `tests/performance/page-load.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: The page loads within 3 seconds
    - expect: All visual elements (images, text, layout) are rendered

#### 14.2. Product Images Load Correctly

**File:** `tests/performance/product-images-load.spec.ts`

**Steps:**
  1. On the home page and product detail pages, verify product images
    - expect: All product images load completely
    - expect: No broken image icons appear
    - expect: Images are displayed with correct dimensions

#### 14.3. Responsive Design - Desktop

**File:** `tests/performance/responsive-desktop.spec.ts`

**Steps:**
  1. View the application on a desktop/laptop screen (1920x1080)
    - expect: The layout is properly centered and uses the full width appropriately
    - expect: Navigation menu is horizontal in the top bar
    - expect: Product grid displays multiple columns
    - expect: Sidebar filters are visible on the left

#### 14.4. Responsive Design - Tablet

**File:** `tests/performance/responsive-tablet.spec.ts`

**Steps:**
  1. View the application on a tablet screen (768x1024)
    - expect: The layout is responsive and readable
    - expect: Navigation may be adjusted for tablet size
    - expect: Product grid may show fewer columns
    - expect: All elements are accessible

#### 14.5. Responsive Design - Mobile

**File:** `tests/performance/responsive-mobile.spec.ts`

**Steps:**
  1. View the application on a mobile screen (375x812 iPhone size)
    - expect: The layout is mobile-optimized
    - expect: Navigation may use hamburger menu or be stacked
    - expect: Product grid shows single or double column
    - expect: Content is readable without horizontal scrolling
    - expect: All buttons and inputs are appropriately sized for touch

### 15. Footer and Additional Pages

**Seed:** `tests/seed.spec.ts`

#### 15.1. View Footer Content

**File:** `tests/footer/view-footer.spec.ts`

**Steps:**
  1. Scroll to the bottom of any page
    - expect: Footer content is visible
    - expect: Footer includes information about the DEMO application with GitHub repo link
    - expect: Links to 'Support this project' and 'Privacy Policy' are visible

#### 15.2. GitHub Repository Link

**File:** `tests/footer/github-link.spec.ts`

**Steps:**
  1. Click the 'GitHub repo' link in the footer
    - expect: The link navigates to https://github.com/testsmith-io/practice-software-testing
    - expect: GitHub repository page opens in the browser

#### 15.3. Support This Project Link

**File:** `tests/footer/support-link.spec.ts`

**Steps:**
  1. Click the 'Support this project' link in the footer
    - expect: The link navigates to https://testwithroy.com/b/support
    - expect: Support page opens in the browser

#### 15.4. Privacy Policy Page

**File:** `tests/footer/privacy-policy.spec.ts`

**Steps:**
  1. Click the 'Privacy Policy' link in the footer
    - expect: The page navigates to /privacy
    - expect: Privacy Policy content is displayed

#### 15.5. Photo Attribution Links

**File:** `tests/footer/photo-attribution.spec.ts`

**Steps:**
  1. In the footer, click the photographer attribution links (Barn Images, Unsplash)
    - expect: The links navigate to external attribution pages
    - expect: Photographer profile and photo source pages open correctly

### 16. Chat Feature

**Seed:** `tests/seed.spec.ts`

#### 16.1. Open Chat Widget

**File:** `tests/chat/open-chat.spec.ts`

**Steps:**
  1. Locate and click the 'Open chat' button (usually bottom-right with chat icon)
    - expect: A chat widget or dialog appears
    - expect: The chat interface is ready for user interaction

#### 16.2. Close Chat Widget

**File:** `tests/chat/close-chat.spec.ts`

**Steps:**
  1. After opening chat, click the close or X button
    - expect: The chat widget closes
    - expect: The page content is fully visible again
