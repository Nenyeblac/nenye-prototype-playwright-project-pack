# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/regression/e2e-checkout.spec.ts >> SauceDemo End-to-End Checkout Flow >> complete checkout flow with multiple products
- Location: tests/saucedemo/regression/e2e-checkout.spec.ts:9:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "2"
Received: Promise {}
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "2"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Bike Light" [ref=e34]:
              - /url: "#"
              - generic [ref=e35]: Sauce Labs Bike Light
            - generic [ref=e36]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e37]:
              - generic [ref=e38]: $9.99
              - button "Remove" [ref=e39] [cursor=pointer]
      - generic [ref=e40]:
        - button "Go back Continue Shopping" [ref=e41] [cursor=pointer]:
          - img "Go back" [ref=e42]
          - text: Continue Shopping
        - button "Checkout" [ref=e43] [cursor=pointer]
  - contentinfo [ref=e44]:
    - list [ref=e45]:
      - listitem [ref=e46]:
        - link "Twitter" [ref=e47]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e48]:
        - link "Facebook" [ref=e49]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e50]:
        - link "LinkedIn" [ref=e51]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e52]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import{test, expect} from '@playwright/test';
  2  | 
  3  | import{LoginPage} from '../../../page-objects/saucedemo/LoginPage';
  4  | import{ProductsPage} from '../../../page-objects/saucedemo/ProductsPage';
  5  | import{CartPage} from '../../../page-objects/saucedemo/CartPage';
  6  | import{CheckoutPage} from '../../../page-objects/saucedemo/CheckoutPage';
  7  | 
  8  | test.describe('SauceDemo End-to-End Checkout Flow', () => {
  9  |     test('complete checkout flow with multiple products', async({page}) => {
  10 | 
  11 |         //step 1: Login
  12 |         const loginPage = new LoginPage(page);
  13 |         await loginPage.goto();
  14 |         await loginPage.login('standard_user', 'secret_sauce');
  15 | 
  16 |         //step 2: Add products to cart
  17 | 
  18 |         const productsPage = new ProductsPage(page);
  19 |         await productsPage.addProductToCartByName('Sauce Labs Backpack');
  20 |         await productsPage.addProductToCartByName('Sauce Labs Bike Light');
  21 | 
  22 |         //Verify cart count
  23 |         const cartCount = await productsPage.getCartItemCount();
  24 |         expect(cartCount).toBe('2');
  25 | 
  26 |         //Step 3: Go to cart
  27 |         await productsPage.clickShoppingCart();
  28 | 
  29 |         //Step4: Verify cart contents
  30 |         const cartPage = new CartPage(page);
  31 |         const itemCount = cartPage.getCartItemCount();
> 32 |         expect(itemCount).toBe('2');
     |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  33 | 
  34 |         const itemNames = cartPage.getCartItemNames();
  35 |         expect(itemNames).toContain('Sauce Labs Backpack');
  36 |         expect(itemNames).toContain('Sauce Labs Bike Light');
  37 | 
  38 |         //Step 5: Proceed to checkout
  39 |         await cartPage.clickCheckout();
  40 | 
  41 |         //Step 6: Fill shipping information
  42 |         const checkoutPage = new CheckoutPage(page);
  43 |         await checkoutPage.fillShippingInformation('John', 'Doe', '12345');
  44 |         await checkoutPage.clickContinue();
  45 | 
  46 |         //Step 7: Complete order
  47 |         await checkoutPage.clickContinue();
  48 | 
  49 |         //Step ; Verify order completion
  50 |         const isComplete = await checkoutPage.isOrderComplete();
  51 |         expect(isComplete).toBeTruthy();
  52 | 
  53 |         const completeMessage = await checkoutPage.getCompleteMessage();
  54 |         expect(completeMessage).toContain('Thank you for your order');
  55 |     });
  56 | 
  57 |     test('checkout with single product', async({page}) => {
  58 |         const loginPage = new LoginPage(page);
  59 |         await loginPage.goto();
  60 |         await loginPage.login('standard_user', 'secret_sauce');
  61 | 
  62 |         const productsPage = new ProductsPage(page);
  63 |         await productsPage.addProductToCartByName('Sauce Labs Onesie');
  64 |         await productsPage.clickShoppingCart();
  65 |         
  66 |         const cartPage = new CartPage(page);
  67 |         await cartPage.clickCheckout();
  68 |         
  69 |         const checkoutPage = new CheckoutPage(page);
  70 |         await checkoutPage.fillShippingInformation('Jane', 'Smith', '54321');
  71 |         await checkoutPage.clickContinue();
  72 |         await checkoutPage.clickFinish();
  73 | 
  74 |         const completeMessage = await checkoutPage.getCompleteMessage();
  75 |         expect(completeMessage).toBe('Thank you for your order!');
  76 |         
  77 |     });
  78 | 
  79 |     test('cannot checkout with empty cart', async({page}) => {
  80 |         const loginPage = new LoginPage(page);
  81 |         await loginPage.goto();
  82 |         await loginPage.login('standard_user', 'secret_sauce');
  83 | 
  84 |         const productsPage = new ProductsPage(page);
  85 |         await productsPage.clickShoppingCart();
  86 | 
  87 |         const cartPage = new CartPage(page);
  88 |         const itemCount = await cartPage.getCartItemCount();
  89 |         expect(itemCount).toBe('0');
  90 | 
  91 |         //checkout button should still be clickable but cart is empty
  92 |         await cartPage.clickCheckout();
  93 | 
  94 |         //should be on checkout page
  95 |         await expect(page).toHaveURL(/.*checkout-step-one.*/);
  96 |     });
  97 | });
  98 | 
  99 | 
```