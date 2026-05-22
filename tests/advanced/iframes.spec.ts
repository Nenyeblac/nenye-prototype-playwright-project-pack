import{test, expect} from '@playwright/test';

test.describe('Iframe Tests', () =>{

    test('interact with iframe content', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/iframe');

        //wait for iframe to load
        const iframe = page.frameLocator('#mce_0_ifr');

        //interact with content inside iframe
        const editor = iframe.locator('#tinymce');
        await editor.clear();
        await editor.fill('Hello world from England!');

        //verify content
        await expect(editor).toHaveText('Hello world from England!');
    });

    test('work with nested iframe', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/nested_frames');

        //access top frame
        const topFrame = page.frameLocator('frame[name="frame-top"]');

        //access left frame inside top frame
        const leftFrame = topFrame.frameLocator('frame[name="frame-left"]');
        const leftBody = leftFrame.locator('body');
        await expect(leftBody).toContainText('LEFT');

        //access middle frame
        const middleFrame = topFrame.frameLocator('frame[name="frame-midle"]');
        const middleBody = middleFrame.locator('body');
        await expect(middleBody).toContainText('MIDDLE');

        //access right frame
        const rightFrame = topFrame.frameLocator('frame[name="frame-right"]');
        const rightBody = rightFrame.locator('body');
        await expect(rightBody).toContainText('RIGHT');
    });

    test('switch between main page and iframe', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/iframe');

        //interact with main page
        const heading = page.locator('h3');
        await expect(heading).toContainText('An iFrame');

        //switch to iframe
        const iframe = page.frameLocator('#mce_0_ifr');
        const editor = iframe.locator('#tinymce');
        await editor.fill('Test content check');

        //back to main page
        await expect(heading).toBeVisible();
    });
});