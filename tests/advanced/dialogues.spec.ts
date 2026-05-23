
import{test, expect} from '@playwright/test';

test.describe('Dialog handling', () => {

    test('handle JavaScript alert', async({page}) => {

        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        //setup dialog handler
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            await dialog.accept();
        });

        //trigger alert
        await page.locator('button:has-text("Click for JS Alert")').click();
        //await page.getByRole('button', {name: 'Click for JS Alert'}).click();

        //verify result
        await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    });

    test('handle JavaScript confirm - accept', async({page}) => {
        
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('I am a JS Confirm');
            await dialog.accept(); //Click OK
        });

        await page.locator('button:has-text("Click for JS Confirm")').click();
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');
    });

    test('handle JavaScript confirm - dismiss', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog => {
            await dialog.dismiss(); //click cancel
        });
        await page.locator('button:has-text("Click for JS Confirm")').click();
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
    });

    test('handle JavaScript prompt', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            expect(dialog.defaultValue()).toBe('');

            await dialog.accept('Test Input for Playwright');
        });

        await page.locator('button: has-text("Click for JS Prompt")').click();
        await expect(page.locator('#result')).toHaveText('You entered: Test Input for Playwright');
    });

    test('handle multiple dialogs', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        
        let dialogCount = 0;

        page.on('dialog', async dialog => {
            dialogCount++;
            await dialog.accept();
        });

        //trigger multiple alerts
        await page.locator('button:has-text("Click for JS Alert")').click();
        await page.locator('button:has-text("Click for JS Confirm")').click();

        expect(dialogCount).toBe(2);
    });

});