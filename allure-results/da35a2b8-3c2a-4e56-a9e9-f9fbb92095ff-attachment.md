# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo/regression/e2e-checkout.spec.ts >> SauceDemo End-to-End Checkout Flow >> checkout with single product
- Location: tests/saucedemo/regression/e2e-checkout.spec.ts:57:9

# Error details

```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#postal-cod')

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
        - generic [ref=e14]: "1"
      - generic [ref=e16]: "Checkout: Your Information"
    - generic [ref=e19]:
      - generic [ref=e20]:
        - textbox "First Name" [ref=e22]: Jane
        - textbox "Last Name" [active] [ref=e24]: Smith
        - textbox "Zip/Postal Code" [ref=e26]
      - generic [ref=e28]:
        - button "Go back Cancel" [ref=e29] [cursor=pointer]:
          - img "Go back" [ref=e30]
          - text: Cancel
        - button "Continue" [ref=e31] [cursor=pointer]
  - contentinfo [ref=e32]:
    - list [ref=e33]:
      - listitem [ref=e34]:
        - link "Twitter" [ref=e35] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e36]:
        - link "Facebook" [ref=e37] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e38]:
        - link "LinkedIn" [ref=e39] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e40]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import{Page, Locator} from '@playwright/test';
  2  | 
  3  | export class CheckoutPage {
  4  | 
  5  |     readonly page: Page;
  6  |     readonly firstNameInput: Locator;
  7  |     readonly lastNameInput: Locator;
  8  |     readonly postalCodeInput: Locator;
  9  |     readonly continueButton: Locator;
  10 |     readonly finishButton: Locator;
  11 |     readonly completeHeader: Locator;
  12 |     readonly completeText: Locator;
  13 |     readonly backHomeButton: Locator;
  14 |     readonly errorMessage: Locator;
  15 | 
  16 |     constructor(page: Page){
  17 | 
  18 |         this.page = page;
  19 |         this.firstNameInput = page.locator('#first-name');
  20 |         this.lastNameInput = page.locator('#last-name');
  21 |         this.postalCodeInput = page.locator('#postal-cod');
  22 |         this.continueButton = page.locator('#continue');
  23 |         this.finishButton = page.locator('#finish');
  24 |         this.completeHeader = page.locator('.complete-header');
  25 |         this.completeText = page.locator('.complete-text');
  26 |         this.backHomeButton = page.locator('#back-to-products');
  27 |         this.errorMessage = page.locator('[data-test="erro"]');
  28 |     }
  29 | 
  30 |     async fillShippingInformation(firstName: string, lastName: string, postalCode: string){
  31 |         await this.firstNameInput.fill(firstName);
  32 |         await this.lastNameInput.fill(lastName);
> 33 |         await this.postalCodeInput.fill(postalCode);
     |                                    ^ TimeoutError: locator.fill: Timeout 10000ms exceeded.
  34 |     }
  35 | 
  36 |     async clickContinue(){
  37 |         await this.continueButton.click();
  38 |     }
  39 | 
  40 |     async clickFinish(){
  41 |         await this.finishButton.click();
  42 |     }
  43 | 
  44 |     async getCompleteMessage(): Promise<string>{
  45 |         return await this.completeHeader.textContent() || '';
  46 |     }
  47 | 
  48 |     async isOrderComplete (): Promise<boolean>{
  49 |         return await this.completeHeader.isVisible();
  50 |     }
  51 | 
  52 |     async clickBackHome(){
  53 |         await this.backHomeButton.click();
  54 |     }
  55 | 
  56 |     async getErrorMessage(): Promise<string>{
  57 |         return await this.errorMessage.textContent() || '';
  58 |     }
  59 | }
```