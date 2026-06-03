
//Add metadata to the tests

import{test, expect} from '@playwright/test';

test('login test wiht allure annotations', async({page}) => {

    //add description
    test.info().annotations.push({
        type: 'description',
        description: 'This test verifies the login functionality'
    });

    //add severity
    test.info().annotations.push({
        type: 'severity',
        description: 'critical'
    });

    //add issue link
    test.info().annotations.push({
        type: 'issue',
        description: 'JIRA-123'
    });

    //add tags
    test.info().annotations.push({
        type: 'tag',
        description: '@smoke @login'
    });


    // Test code
 
await page.goto('https://www.saucedemo.com/');
 
await page.fill('#user-name', 'standard_user');
 
await page.fill('#password', 'secret_sauce');
 
await page.click('#login-button');
 
await expect(page).toHaveURL(/inventory/);
 
});


//ALLURE STEPS

//import { test, expect } from '@playwright/test';

test('checkout with allure steps', async ({ page }) => {

    await test.step('navigate to login', async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Login', async() => {

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

    });

    await test.step('Add product to cart', async () => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    });

    await test.step('Go to cart', async () => {
        await page.click('.shopping_cart_link');
    });
 
    await test.step('Checkout', async () => {
 
        await page.click('#checkout');
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');       
        await page.fill('#postal-code', '12345');       
        await page.click('#continue');      
        await page.click('#finish');
    });

    await test.step('Verify success', async () => {
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });


});