import {test, expect} from "@playwright/test";
import { Buffer } from "buffer";
import path from 'path';

test.describe('FIle Upload Tests', () => {

    //Note: created test-data/sample.txt (assuming that has been created)
    test('upload single file', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/upload');

        //create or use existing file, eg.
        const filePath = path.join(__dirname, '../test-data/sample.txt');

        //upload file
        const fileInput = page.locator('#fule-upload');
        await fileInput.setInputFiles(filePath);

        //click upload button
        await page.locator('#file-submit').click();

        //verify successful upload
        await expect(page.locator('#uploaded-file')).toContainText('sample.txt');
    });

    test('upload multiple files', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
        const files = [
            path.join(__dirname, '../test-data/file1.txt'),
            path.join(__dirname, '../test-data/file2.txt'),
        ];

        const fileInput = page.locator('#file-upload');
        await fileInput.setInputFiles(files);

        await page.locator('#file-submit').click();

        //verify both files uploaded
        const uploadedFiles = page.locator('#uploaded-files')
        await expect(uploadedFiles).toContainText('file1.txt');
    });

    test('create and upload file on the fly', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/upload');

        //create file buffer
        const fileContent = 'This is dynamically created content';
        const buffer = Buffer.from(fileContent, 'utf-8');

        const fileInput = page.locator('#file-upload');
        await fileInput.setInputFiles({
            name: 'dynamic-file.txt',
            mimeType: 'text/palain',
            buffer: buffer,
        });
        await page.locator('#file-submit').click();
        await expect(page.locator('#uploaded-files')).toContainText('dynamic-file.txt');
    });

    test('remove uploaded files', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/upload');

        const filePath = path.join(__dirname, '../test-data/sample.txt');
        const fileInput = page.locator('#file-upload');

        //upload file
        await fileInput.setInputFiles(filePath);

        //clear the input
        await fileInput.setInputFiles([]);

        //verify input is empty
        const files = await fileInput.inputValue();
        expect(files).toBe('');
    });
});