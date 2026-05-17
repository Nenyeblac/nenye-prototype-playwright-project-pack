
import {test as setup, expect} from '@playwright/test';
import { LoginPage } from '../page-objects/saucedemo/LoginPage';
import { SauceDemoUsers } from '../utils/saucedemo-data';

const authFile = 'playwright/.auth/user.json';

setup('authenticate as standard user', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        SauceDemoUsers.standard.username,
        SauceDemoUsers.standard.password
    );

    // Wait for successful login
    await page.waitForURL('**/inventory.html');

    // Save authentication state
    await page.context().storageState({path: authFile});
});

//Go to playwright.config.ts and set up project
