
import {test, expect} from '@playwright/test';
import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';

test.describe('FIle Download Tests', () => {

    test('download file and verify', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/download');

        //start waiting for download befor clicking
        const downloadPromise = page.waitForEvent('download');

        //click download link
        await page.locator('a[href*=".txt"]').first().click();

        //wait for download to complete
        const download = await downloadPromise;

        //get download filename
        const fileName = download.suggestedFilename();
        console.log('Downloaded file: ', fileName );

        //save to specific path
        const downloadPath = path.join(__dirname, '../downloads', fileName);
        await download.saveAs(downloadPath);

        //verify the file exists
        expect(fs.existsSync(downloadPath)).toBeTruthy();

        //verify file size
        const stats = fs.statSync(downloadPath);
        expect(stats.size).toBeGreaterThan(0);

        //clean up
        fs.unlinkSync(downloadPath);
        
    });

    test('download file and read content', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/download');
        
        const downloadPromise = page.waitForEvent('download');
        await page.locator('a[href*=".txt"]').first().click();
        
        const download = await downloadPromise;

        //get download as stream
        const stream = await download.createReadStream();
        const chunks: Buffer[] =[];

        for await (const chunk of stream){
            chunks.push(chunk);
        }

        const content = Buffer.concat(chunks).toString('utf-8');
        console.log('File content: ', content);
        expect(content.length).toBeGreaterThan(0);
    });

    test('handle download failure', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/download');

        const downloadPromise = page.waitForEvent('download');
        await page.locator('a[href*=".txt"]').first().click;

        const download = await downloadPromise;

        //wait download to complete or fail
        const failure = await download.failure();
        if(failure){
            console.log('Download failed: ', failure);
        } else{
            console.log('Download succeeded');
        }
    });
});