# Advantage Online Shopping - Comprehensive Test Plan

## Application Overview

Advantage Online Shopping is an e-commerce application that allows users to browse and purchase technology products including laptops, tablets, speakers, headphones, and mice. The application features user authentication, product browsing with filters, shopping cart management, order tracking, and a contact form. Users can view product details, add items to cart, checkout, track orders, and manage their account profile.

## Test Scenarios

### 1. Authentication & User Account

**Seed:** `tests/seed.spec.ts`

#### 1.1. User Login with Valid Credentials

**File:** `tests/auth/valid-login.spec.ts`

**Steps:**
  1. Navigate to the Advantage Online Shopping home page
    - expect: The page loads successfully
    - expect: The user sees the login prompt (User Menu icon)
  2. Click on the User Menu (hamburger icon) in the top right
    - expect: A login form or login link appears
  3. Click on the login button/menu
    - expect: The login form is displayed with username and password fields
  4. Enter valid username 'User123' and password 'User123'
    - expect: The credentials are entered in their respective fields
  5. Click the Sign In button
    - expect: The user is successfully logged in
    - expect: The username 'User123' appears in the User Menu
    - expect: The dashboard or home page is displayed

#### 1.2. User Logout

**File:** `tests/auth/logout.spec.ts`

**Steps:**
  1. Login with valid credentials (User123/User123)
    - expect: User is successfully logged in and 'User123' is displayed in the User Menu
  2. Click on the User Menu in the top right
    - expect: A dropdown menu appears with options including 'Sign out'
  3. Click on 'Sign out' option
    - expect: The user is logged out
    - expect: The page redirects to home page or login page
    - expect: The User Menu no longer shows the username

#### 1.3. Access My Account Page

**File:** `tests/auth/my-account.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is successfully logged in
  2. Click on the User Menu
    - expect: A dropdown menu appears with 'My account' option
  3. Click on 'My account'
    - expect: The My Account page loads
    - expect: User can view their account information

#### 1.4. View Order History

**File:** `tests/auth/order-history.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is successfully logged in
  2. Click on the User Menu
    - expect: A dropdown menu appears with 'My orders' option
  3. Click on 'My orders'
    - expect: The My Orders page loads
    - expect: A table displaying order history is visible with columns: Order Number, Order Date, Order Time, Product Name, Color, Quantity, Total Price
  4. Verify order data is displayed
    - expect: At least one order is visible with complete information

#### 1.5. Search Orders

**File:** `tests/auth/search-orders.spec.ts`

**Steps:**
  1. Login and navigate to My Orders page
    - expect: My Orders page is displayed
  2. Click on the search box labeled 'Search in orders'
    - expect: The search box is focused and ready for input
  3. Type a valid order number
    - expect: The search results filter to show the matching order

### 2. Product Browsing & Categories

**Seed:** `tests/seed.spec.ts`

#### 2.1. View Product Categories

**File:** `tests/products/view-categories.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: The home page loads with category cards visible
    - expect: Available categories include: Speakers, Tablets, Laptops, Mice, Headphones
  2. Verify each category card displays product count and 'Shop Now' button
    - expect: Each category card has proper formatting and CTA button

#### 2.2. Navigate to Category - Speakers

**File:** `tests/products/category-speakers.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: The home page is loaded
  2. Click on the Speakers category card or 'Shop Now' button
    - expect: The Speakers category page loads
    - expect: URL changes to contain 'category/Speakers'
    - expect: The page header shows 'SPEAKERS'
  3. Verify product list is displayed
    - expect: A list of speaker products is visible
    - expect: Each product shows: product image, name, price, and 'SHOP NOW' button
    - expect: The product count shows '7 ITEMS'

#### 2.3. View Product Details

**File:** `tests/products/product-details.spec.ts`

**Steps:**
  1. Navigate to Speakers category
    - expect: Speakers category page is displayed with product list
  2. Click on any product (e.g., 'Bose Soundlink Bluetooth Speaker III')
    - expect: The product detail page loads
    - expect: URL changes to show the product ID
    - expect: Product name, price, and description are displayed
  3. Verify product specifications section
    - expect: Product specifications are displayed including: Compatibility, Connector, Manufacturer, Weight, Wireless Technology
  4. Verify color/option selection is available
    - expect: Color options are displayed and selectable
  5. Verify quantity selector and Add to Cart button
    - expect: A quantity input field is visible
    - expect: An 'ADD TO CART' button is displayed and clickable

#### 2.4. Filter Products by Price

**File:** `tests/products/filter-by-price.spec.ts`

**Steps:**
  1. Navigate to any category page (e.g., Speakers)
    - expect: Category page is displayed with products and filter options
  2. Locate the filter section on the left sidebar
    - expect: A 'FILTER BY:' section is visible with options: PRICE, COMPATIBILITY, MANUFACTURER, WEIGHT, WIRELESS TECHNOLOGY, COLOR
  3. Click on 'PRICE' filter
    - expect: Price range options are expanded/displayed
  4. Select a price range
    - expect: Products are filtered to show only items within the selected price range
    - expect: Product count updates accordingly

#### 2.5. Filter Products by Compatibility

**File:** `tests/products/filter-compatibility.spec.ts`

**Steps:**
  1. Navigate to a category page with filter options
    - expect: The filter panel is visible
  2. Click on 'COMPATIBILITY' filter
    - expect: Compatibility options are expanded
  3. Select a compatibility option
    - expect: Products are filtered accordingly
    - expect: Only compatible products are shown

#### 2.6. Filter Products by Manufacturer

**File:** `tests/products/filter-manufacturer.spec.ts`

**Steps:**
  1. Navigate to a category page
    - expect: Category page is displayed
  2. Click on 'MANUFACTURER' filter
    - expect: Manufacturer options are displayed
  3. Select a manufacturer (e.g., Bose, HP)
    - expect: Products from the selected manufacturer are displayed

### 3. Shopping Cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add Single Product to Cart

**File:** `tests/cart/add-product.spec.ts`

**Steps:**
  1. Navigate to any product detail page
    - expect: Product details are displayed
  2. Select a color option (if available)
    - expect: The color option is selected and highlighted
  3. Verify quantity is set to 1
    - expect: The quantity field shows '1'
  4. Click 'ADD TO CART' button
    - expect: The product is added to cart
    - expect: A cart badge/counter appears in the header showing '1'
    - expect: A confirmation message or visual feedback is provided

#### 3.2. Add Multiple Products to Cart

**File:** `tests/cart/add-multiple-products.spec.ts`

**Steps:**
  1. Add first product to cart (e.g., Bose speaker)
    - expect: Product 1 is added with cart count showing 1
  2. Navigate to another product
    - expect: Product detail page is displayed
  3. Add second product to cart
    - expect: Product 2 is added
    - expect: Cart counter updates to show 2

#### 3.3. Change Quantity Before Adding to Cart

**File:** `tests/cart/change-quantity.spec.ts`

**Steps:**
  1. Navigate to a product detail page
    - expect: Product is displayed
  2. Change the quantity field from 1 to 3
    - expect: The quantity field shows '3'
  3. Click 'ADD TO CART'
    - expect: 3 units of the product are added to cart
    - expect: Cart counter reflects the correct quantity

#### 3.4. View Shopping Cart

**File:** `tests/cart/view-cart.spec.ts`

**Steps:**
  1. Add at least one product to cart
    - expect: Product is added and cart counter shows quantity
  2. Click on the Shopping Cart icon/link in the header
    - expect: The Shopping Cart page loads
    - expect: URL shows '#/shoppingCart'
  3. Verify cart contents
    - expect: A table displays all items in cart with columns: Product Image, Product Name, Color, Quantity, Price
    - expect: Each row shows correct product information
    - expect: A 'TOTAL' row displays the sum
    - expect: A 'CHECKOUT' button is visible

#### 3.5. Edit Cart Item

**File:** `tests/cart/edit-item.spec.ts`

**Steps:**
  1. Navigate to Shopping Cart with items
    - expect: Cart page is displayed with items
  2. Click 'EDIT' link on a cart item
    - expect: The product detail page loads with 'pageState=edit' in URL
    - expect: Current quantity and color are pre-populated
  3. Change the quantity to 5
    - expect: Quantity field shows 5
  4. Click 'ADD TO CART' to save changes
    - expect: The cart is updated with the new quantity

#### 3.6. Remove Item from Cart

**File:** `tests/cart/remove-item.spec.ts`

**Steps:**
  1. Navigate to Shopping Cart with items
    - expect: Cart page displays items with REMOVE link
  2. Click 'REMOVE' link on an item
    - expect: The item is removed from the cart
    - expect: The cart is updated and item count decreases
    - expect: Total price is recalculated

#### 3.7. Verify Payment Options Display

**File:** `tests/cart/payment-options.spec.ts`

**Steps:**
  1. Add products to cart and navigate to Shopping Cart page
    - expect: Shopping Cart page is displayed
  2. Verify payment options section
    - expect: Payment options are displayed (credit card icons/logos)
    - expect: Common payment methods are visible

### 4. Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 4.1. Search for Product

**File:** `tests/search/search-product.spec.ts`

**Steps:**
  1. Click on the Search icon in the header
    - expect: The search box becomes active/visible
  2. Type 'laptop' in the search field
    - expect: The text 'laptop' is entered in the search box
  3. Press Enter or click search button
    - expect: The page navigates to search results page
    - expect: URL contains 'search' and 'viewAll=laptop'
  4. Verify search results
    - expect: Search results are displayed showing products matching 'laptop'

#### 4.2. Search with Empty Query

**File:** `tests/search/search-empty.spec.ts`

**Steps:**
  1. Click on the Search icon
    - expect: Search box becomes active
  2. Leave search field empty and press Enter
    - expect: Either nothing happens or an error message appears
    - expect: No invalid results are displayed

#### 4.3. Search Special Characters

**File:** `tests/search/search-special-chars.spec.ts`

**Steps:**
  1. Click on Search icon
    - expect: Search box is active
  2. Type special characters like '@#$%' and press Enter
    - expect: The search either returns no results or handles gracefully
    - expect: No errors crash the application

### 5. Contact Form

**Seed:** `tests/seed.spec.ts`

#### 5.1. Access Contact Form

**File:** `tests/contact/access-form.spec.ts`

**Steps:**
  1. Click on 'CONTACT US' link in the header or scroll to Contact Us section
    - expect: The Contact Us form is displayed
    - expect: Form fields are visible and accessible

#### 5.2. Fill Contact Form with Valid Data

**File:** `tests/contact/valid-form.spec.ts`

**Steps:**
  1. Navigate to the Contact Us section/page
    - expect: The contact form is displayed with fields: Category, Product, Email, Subject
  2. Select a category from the dropdown (e.g., 'Laptops')
    - expect: The category is selected
  3. Select a product from the second dropdown
    - expect: A product list appears and a product can be selected
  4. Enter valid email address
    - expect: Email text is entered in the Email field
  5. Enter a subject message
    - expect: Subject text is entered in the Subject field
  6. Click 'SEND' button
    - expect: The form is submitted
    - expect: A success message appears or form is cleared
    - expect: The SEND button is no longer disabled

#### 5.3. Submit Contact Form with Missing Required Fields

**File:** `tests/contact/missing-fields.spec.ts`

**Steps:**
  1. Navigate to Contact Form
    - expect: Contact form is displayed
  2. Leave Email field empty and click SEND
    - expect: Form validation error appears indicating Email is required
    - expect: Form is not submitted
  3. Fill Email but leave Subject empty and click SEND
    - expect: Validation error appears for Subject field
    - expect: Form is not submitted

#### 5.4. Submit Contact Form with Invalid Email

**File:** `tests/contact/invalid-email.spec.ts`

**Steps:**
  1. Navigate to Contact Form
    - expect: Contact form is displayed
  2. Enter invalid email format (e.g., 'notanemail')
    - expect: Email text is entered
  3. Fill other required fields and click SEND
    - expect: Email validation error appears
    - expect: Form is not submitted

### 6. Navigation & General UI

**Seed:** `tests/seed.spec.ts`

#### 6.1. Navigate Using Logo

**File:** `tests/navigation/logo-navigation.spec.ts`

**Steps:**
  1. Navigate to any page in the application
    - expect: The page loads
  2. Click on the Advantage DEMO logo in the header
    - expect: The user is redirected to the home page
    - expect: URL shows '#/'

#### 6.2. Navigate Using Breadcrumbs

**File:** `tests/navigation/breadcrumbs.spec.ts`

**Steps:**
  1. Navigate to a product detail page
    - expect: Breadcrumb navigation is visible showing: HOME / CATEGORY / PRODUCT
  2. Click on 'HOME' in breadcrumb
    - expect: User is redirected to home page
  3. Navigate to product page again and click on category in breadcrumb
    - expect: User is redirected to the category page

#### 6.3. Navigate Using Top Menu Links

**File:** `tests/navigation/top-menu.spec.ts`

**Steps:**
  1. Verify top menu navigation items are present
    - expect: Menu items visible: OUR PRODUCTS, CONTACT US, POPULAR ITEMS, SPECIAL OFFER
  2. Click on each menu item
    - expect: Each menu item navigates to the appropriate section or page

#### 6.4. Verify Social Media Links

**File:** `tests/navigation/social-links.spec.ts`

**Steps:**
  1. Scroll to the footer section
    - expect: Footer is displayed with 'FOLLOW US' section
  2. Verify social media icons are present
    - expect: Social media icons are visible for: Facebook, Twitter, LinkedIn
  3. Click on Facebook icon
    - expect: The link opens Facebook page (or appropriate social media page)

### 7. Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 7.1. Initiate Checkout

**File:** `tests/checkout/initiate-checkout.spec.ts`

**Steps:**
  1. Add a product to cart
    - expect: Product is added and cart shows count
  2. Navigate to Shopping Cart page
    - expect: Cart page is displayed with items and CHECKOUT button
  3. Click 'CHECKOUT' button
    - expect: The checkout process begins or checkout page loads

### 8. Product Categories Deep Dive

**Seed:** `tests/seed.spec.ts`

#### 8.1. Browse Laptops Category

**File:** `tests/categories/laptops.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page is displayed
  2. Click on Laptops category
    - expect: Laptops category page loads
    - expect: URL contains 'category/Laptops'
  3. Verify laptops are displayed with prices and details
    - expect: Multiple laptop products are visible in a grid/list view

#### 8.2. Browse Tablets Category

**File:** `tests/categories/tablets.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page is displayed
  2. Click on Tablets category
    - expect: Tablets category page loads
  3. Verify tablets are displayed
    - expect: Multiple tablet products are visible

#### 8.3. Browse Mice Category

**File:** `tests/categories/mice.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page is displayed
  2. Click on Mice category
    - expect: Mice category page loads
  3. Verify mice products are displayed
    - expect: Products are shown in the Mice category

#### 8.4. Browse Headphones Category

**File:** `tests/categories/headphones.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page is displayed
  2. Click on Headphones category
    - expect: Headphones category page loads
  3. Verify headphones products are displayed
    - expect: Multiple headphone products are visible

### 9. Special Offers & Featured Content

**Seed:** `tests/seed.spec.ts`

#### 9.1. View Special Offer Banner

**File:** `tests/special-offers/banner.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads
  2. Verify Special Offer section is visible
    - expect: A featured product banner is displayed with 'SPECIAL OFFER'
    - expect: Banner contains product image, name, description, and 'SEE OFFER' button

#### 9.2. Click Special Offer Product

**File:** `tests/special-offers/special-offer-product.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Special Offer section is visible
  2. Click on 'SEE OFFER' button in Special Offer banner
    - expect: User is taken to the special offer product detail page

#### 9.3. View Popular Items

**File:** `tests/special-offers/popular-items.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads
  2. Scroll to 'POPULAR ITEMS' section
    - expect: A section displaying popular/best-selling products is visible
    - expect: Products show: image, name, and 'View Details' link
  3. Click 'View Details' on a popular item
    - expect: Product detail page loads for that product

### 10. Error Handling & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 10.1. Navigate to Non-existent Product

**File:** `tests/edge-cases/nonexistent-product.spec.ts`

**Steps:**
  1. Try to navigate directly to a non-existent product URL (e.g., /product/99999)
    - expect: The application handles the error gracefully
    - expect: Either a 404 error page is shown or user is redirected to home page

#### 10.2. Add Out of Stock Product to Cart

**File:** `tests/edge-cases/out-of-stock.spec.ts`

**Steps:**
  1. Navigate to a product marked as 'SOLD OUT'
    - expect: Product is displayed with 'SOLD OUT' indicator
  2. Verify 'ADD TO CART' button is disabled or unavailable
    - expect: The button is disabled and user cannot add out-of-stock items

#### 10.3. Verify Page Load Time

**File:** `tests/edge-cases/page-load.spec.ts`

**Steps:**
  1. Navigate to various pages in the application
    - expect: All pages load within acceptable time (< 5 seconds)
    - expect: No hung or unresponsive pages

#### 10.4. Cart Persistence After Logout

**File:** `tests/edge-cases/cart-persistence.spec.ts`

**Steps:**
  1. Add products to cart while logged in
    - expect: Products are added to cart successfully
  2. Log out from the application
    - expect: User is logged out
  3. Verify cart state after logout
    - expect: Cart items are retained or cleared based on application design
