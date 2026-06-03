//Debugging Using Console Logs

import {test, expect} from '@playwright/test';

test('debug with console logs', async({page}) => {

    //enable console logging
    page.on('console', msg => {
        console.log('Browser console: ', msg.text());
    });

    await page.goto('https://www.saucedemo.com/');
    console.log('Current URL: ', page.url());

    await page.fill('#user-name', 'standard_user');
    console.log('Filled username');

    await page.fill('#password', 'secret_sauce');
    console.log('Filled password');

    await page.click('#login-button');
    console.log('Clicked login button');

    //log page state
    const title = await page.title();
    console.log('Page title: ', title);

    await expect(page).toHaveURL(/inventory/);
});


// Debugging Selectors

test('debug selectors', async({page}) => {
    await page.goto('https://www.saucedemo.com/');

    //pause test and explore
    await page.pause();

    //or check if element exists
    const loginButton = page.locator('#login-button');
    console.log('Login button exists: ', await loginButton.count() > 0);

    //get element details
    console.log('Login button text: ', await loginButton.textContent())
    console.log('Login button enabled: ', await loginButton.isEnabled());
});


// Test Artifacts

test('attach debugging artifacts', async({page}, testInfo) => {
    await page.goto('https://www.saucedemo.com/');

    //attach page source
    const html = await page.content();
    await testInfo.attach('page-source', {
        body: html,
        contentType: 'text/html'
    });

    //attach console logs
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));

    //do test actions
    await page.fill('#user-name', 'standard_user');

    //attach logs
    await testInfo.attach('console-logs', {
        body: logs.join('\n'),
        contentType: 'text/plain'
    });

});