# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/regression/cart.spec.ts >> Cart Item Display Details >> should display product descriptions in cart
- Location: tests/saucedemo/regression/cart.spec.ts:49:9

# Error details

```
TypeError: c is not iterable
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
            - link "Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Onesie" [ref=e34] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e35]: Sauce Labs Onesie
            - generic [ref=e36]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
            - generic [ref=e37]:
              - generic [ref=e38]: $7.99
              - button "Remove" [ref=e39] [cursor=pointer]
      - generic [ref=e40]:
        - button "Go back Continue Shopping" [ref=e41] [cursor=pointer]:
          - img "Go back" [ref=e42]
          - text: Continue Shopping
        - button "Checkout" [ref=e43] [cursor=pointer]
  - contentinfo [ref=e44]:
    - list [ref=e45]:
      - listitem [ref=e46]:
        - link "Twitter" [ref=e47] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e48]:
        - link "Facebook" [ref=e49] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e50]:
        - link "LinkedIn" [ref=e51] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e52]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import {test, expect } from "@playwright/test"
  2  | import{LoginPage} from '../../../page-objects/saucedemo/LoginPage';
  3  | import { ProductsPage } from "../../../page-objects/saucedemo/ProductsPage";
  4  | import { CartPage } from '../../../page-objects/saucedemo/CartPage';
  5  | 
  6  | 
  7  | //Cart Item Display Tests
  8  | 
  9  | test.describe('Cart Item Display Details', () => {
  10 |     let loginPage: LoginPage;
  11 |     let productsPage: ProductsPage;
  12 |     let cartPage: CartPage;
  13 | 
  14 |     test.beforeEach(async({page}) => {
  15 |         loginPage = new LoginPage(page);
  16 |         productsPage = new ProductsPage(page);
  17 |         cartPage = new CartPage(page);
  18 | 
  19 |         //login before each test
  20 |         await loginPage.goto();
  21 |         await loginPage.login('standard_user', 'secret_sauce');
  22 |     });
  23 | 
  24 |     test('should diplay correct quantity for each cart item', async({page}) => {
  25 | 
  26 |         //Add multiple items
  27 |         await productsPage.addProductToCartByName('Sauce Labs Backpack');
  28 |         await productsPage.addProductToCartByName('Sauce Labs Bike Light');
  29 |         await productsPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
  30 |         
  31 |         await productsPage.clickShoppingCart();
  32 | 
  33 |         //Each item should have a quantity of 1
  34 |         const backPackDetails = await cartPage.getCartItemDetails('Sauce Labs Backpack');
  35 |         const bikeLightDetails = await cartPage.getCartItemDetails('Sauce Labs Bike Light');
  36 |         const tshirtDetails = await cartPage.getCartItemDetails('Sauce Labs Bolt T-Shirt');
  37 | 
  38 |         //Verify quantities
  39 |         expect(backPackDetails).toBe(1)
  40 |         expect(bikeLightDetails).toBe(1);
  41 |         expect(tshirtDetails).toBe(1);
  42 | 
  43 |         //verify names match expected
  44 |         expect(backPackDetails).toBe('Sauce Labs Backpack');
  45 |         expect(bikeLightDetails).toBe('Sauce Labs Bike Light');
  46 |         expect(tshirtDetails).toBe('Sauce Labs Bolt T-Shirt');
  47 |     });
  48 | 
  49 |     test('should display product descriptions in cart', async({page}) => {
  50 |         await productsPage.addProductToCartByName('Sauce Labs Backpack')
  51 |         await productsPage.addProductToCartByName('Sauce Labs Onesie')
  52 |         await productsPage.clickShoppingCart();
  53 | 
  54 |         //get descriptions from cart
  55 |         const backPackDescription = cartPage.getProductDescription('Sauce Labs Backpack');
  56 |         const onesieDescription = cartPage.getProductDescription('Sauce Labs Onesie');
  57 | 
  58 |         //verify descriptions exist and have content
  59 |         expect(backPackDescription).toBeTruthy();
  60 |         expect((await backPackDescription).length).toBeGreaterThan(0);
> 61 |         expect(backPackDescription).toContain('carry.allTheThings()');
     |                                     ^ TypeError: c is not iterable
  62 |         expect(onesieDescription).toBeTruthy();
  63 |         expect((await onesieDescription).length).toBeGreaterThan(0);
  64 |         expect(onesieDescription).toContain('Rin snap');
  65 |     });
  66 |     
  67 | });
```