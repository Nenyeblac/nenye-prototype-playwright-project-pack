import {test, expect} from '@playwright/test';
import {ProductsPage} from '../../../page-objects/saucedemo/ProductsPage';

test('test with saved auth state', async({page}) => {

    // Already authenticated

    await page.goto('https://www.saucedemo.com/inventory.html');

    const productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).toHaveText('Products');
});