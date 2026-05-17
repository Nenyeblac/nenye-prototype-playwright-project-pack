import {test as setup} from '@playwright/test';
import { LoginPage } from '../page-objects/saucedemo/LoginPage';;
import { SauceDemoUsers } from '../utils/saucedemo-data';

// Standard user auth

setup('authenticate as standard user', async({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        SauceDemoUsers.standard.username,
        SauceDemoUsers.standard.password
    );
    await page.waitForURL('**/inventory.html');
    await page.context().storageState({path: 'playwright/.auth/standard.json'});
});

// Performance user auth

setup('authenticate as performance user', async({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        SauceDemoUsers.performance.username,
        SauceDemoUsers.performance.password
    );
    await page.waitForURL('**/inventory.html/');
    await page.context().storageState({path: 'playwright/.auth/perfomances.json'});
});

//Go to playwright.config.ts and set up project