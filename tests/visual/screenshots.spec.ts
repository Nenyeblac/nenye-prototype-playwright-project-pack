import {test, expect} from '@playwright/test';

test('manual screenshots', async({page}) => {

    await page.goto('https://www.saucedemo.com/');

    //screenshots of entire screen
    await page.screenshot({
        path: 'screenshots/saucedemo/login-page.png',
        fullPage: true
    });

    //screenshot of specific element
    const loginButton = page.locator('#login-button');
    await loginButton.screenshot({
        path: 'screenshots/saucedemo/login-button.png'
    });

    //login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    //screenshot before clicking
    await page.screenshot({path: 'screenshots/saucedemo/before-loginButton.png'});

    await page.click('#login-button');

    //screenshot after login
    await page.screenshot({path: 'screenshots/saucedemo/after-login.png'});
});

//Automatic screenshots on failure

test.afterEach(async({page}, testInfo) => {

    if(testInfo.status !== testInfo.expectedStatus){

        //take screenshot on failure
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', {
            body: screenshot,
            contentType: 'image/png'
        });
    }
});

test('test that might fail', async({page}) => {
    await page.goto('https://www.saucedemo.com/');

    //write test code here and test
});


//Video Recording
//Videos are automatically saved when configured and can be accessed from test results:

test.afterEach(async({page}, testInfo) => {

    // Video is automatically recorded based on config
 
    // Access video path if needed
    const videoPath = await page.video()?.path();
    console.log('Video saved at: ', videoPath);

});